/* Il cuore del sistema: che giorni sono liberi, chi li occupa, come si scrive
   una risposta. Qui non c'è niente di specifico a Netlify: gira anche in locale. */

import { leggi, scrivi, tutte } from "./_magazzino.mjs";

export const FUSO = "Europe/Berlin";

/* ---------- regole di disponibilità ---------- */
export const REGOLE_DI_PARTENZA = {
  fuso: FUSO,
  /* 0=domenica … 6=sabato. Le ore sono quelle in cui la serata comincia.
     Lunedi' vino, martedi' Champagne, mercoledi' vini fortificati, alle 18,
     da Partenope 081. Gli altri giorni non compaiono nel calendario. */
  settimana: { 0: [], 1: ["18:00"], 2: ["18:00"], 3: ["18:00"], 4: [], 5: [], 6: [] },
  temi: { 1: "vino", 2: "bolle", 3: "fort" },
  posti: 40,               // posti a sedere per serata
  maxPerPrenotazione: 10,  // quanti posti si prenotano online in una volta
  pochiPosti: 8,           // sotto questa soglia il calendario dice "ultimi posti"
  durataMin: 150,          // quanto dura una serata, per il calendario
  anticipoGiorni: 1,       // si prenota fino al giorno prima
  orizzonteGiorni: 120,    // fin dove si può guardare avanti
  chiusure: [],            // ["2026-12-24", …] sere in cui non si fa
  minutiBlocco: 20,        // quanto dura il blocco mentre uno paga con la carta
  oreBonifico: 48          // con il bonifico il posto resta tenuto fino a 48 ore
};

export async function regole() {
  const r = await leggi("regole", null);
  return { ...REGOLE_DI_PARTENZA, ...(r || {}) };
}

/* ---------- date, senza librerie ---------- */
export const oggiISO = (fuso = FUSO) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: fuso, year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date());

export function piuGiorni(iso, n) {
  const [Y, M, D] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(Y, M - 1, D + n));
  return d.toISOString().slice(0, 10);
}

/** Una data che esiste davvero nel calendario (non il 30 febbraio, non l'anno 9999). */
export function dataVera(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(iso))) return false;
  const [Y, M, D] = iso.split("-").map(Number);
  if (Y < 2000 || Y > 2100) return false;
  const d = new Date(Date.UTC(Y, M - 1, D));
  return d.getUTCFullYear() === Y && d.getUTCMonth() === M - 1 && d.getUTCDate() === D;
}

/** Le regole che arrivano da fuori: si tengono solo i campi noti, col tipo giusto. */
export function ripulisciRegole(x, base) {
  const out = {}, o = x && typeof x === "object" && !Array.isArray(x) ? x : {};
  const num = (v, min, max) => (Number.isFinite(+v) && +v >= min && +v <= max ? Math.round(+v) : undefined);
  if (o.settimana && typeof o.settimana === "object" && !Array.isArray(o.settimana)) {
    const s = {};
    for (let g = 0; g < 7; g++) {
      const ore = o.settimana[g] ?? o.settimana[String(g)];
      s[g] = Array.isArray(ore) ? ore.filter((h) => /^([01]\d|2[0-3]):[0-5]\d$/.test(h)).slice(0, 6) : [];
    }
    out.settimana = s;
  }
  for (const [k, lo, hi] of [["durataMin", 30, 600], ["anticipoGiorni", 0, 60], ["orizzonteGiorni", 7, 365],
                              ["posti", 1, 200], ["maxPerPrenotazione", 1, 40], ["pochiPosti", 0, 50], ["minutiBlocco", 5, 120], ["oreBonifico", 1, 168]]) {
    const v = num(o[k], lo, hi); if (v !== undefined) out[k] = v;
  }
  if (o.temi && typeof o.temi === "object" && !Array.isArray(o.temi)) {
    const tm = {};
    for (let g = 0; g < 7; g++) { const v = o.temi[g] ?? o.temi[String(g)]; if (["vino", "bolle", "fort"].includes(v)) tm[g] = v; }
    out.temi = tm;
  }
  if (Array.isArray(o.chiusure)) out.chiusure = o.chiusure.filter(dataVera).slice(0, 400);
  return { ...base, ...out };
}
export const giornoSettimana = (iso) => {
  const [Y, M, D] = iso.split("-").map(Number);
  return new Date(Date.UTC(Y, M - 1, D)).getUTCDay();
};

function scartoMinuti(ts, fuso) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: fuso, hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    }).formatToParts(new Date(ts)).filter((x) => x.type !== "literal").map((x) => [x.type, +x.value])
  );
  return (Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second) - ts) / 60000;
}

/** "2026-11-07" + "19:30" ora di Berlino → Date in UTC (ora legale compresa) */
export function versoUTC(data, ora, fuso = FUSO) {
  const [Y, M, D] = data.split("-").map(Number);
  const [h, m] = ora.split(":").map(Number);
  const grezzo = Date.UTC(Y, M - 1, D, h, m);
  let ts = grezzo;
  for (let i = 0; i < 3; i++) ts = grezzo - scartoMinuti(ts, fuso) * 60000;
  return new Date(ts);
}

/* ---------- stato delle prenotazioni ---------- */
export const OCCUPANTI = ["tenuta", "pagata", "confermata"];

export const viva = (p, adesso = Date.now()) =>
  OCCUPANTI.includes(p.stato) && !(p.stato === "tenuta" && p.scade && Date.parse(p.scade) < adesso);

/* ---------- calendario ---------- */
/** Ritorna { "2026-11-07": {s:"free|low|out", n:"riga di dettaglio", ore:[...]}, … } */
/** Quanti posti sono gia' presi quella sera (prenotazioni vive). */
export async function postiPresi(data, ora, escludi = null) {
  return (await tutte())
    .filter((p) => p.data === data && p.ora === ora && p.rif !== escludi && viva(p))
    .reduce((n, p) => n + Math.max(1, Math.round(Number(p.persone) || 1)), 0);
}

/* ---------- calendario ---------- */
/** { "2026-11-02": {s:"free|low|out", tema:"vino", posti:33, ore:["18:00"], n:"…"}, … }
    Dice solo quanti posti restano: mai nomi, mai chi ha prenotato. */
export async function disponibilita(da, a) {
  if (!dataVera(da) || !dataVera(a) || da > a) return {};
  const R = await regole();
  const pren = (await tutte()).filter((p) => viva(p));
  const presi = {};
  for (const p of pren) presi[p.data + " " + p.ora] = (presi[p.data + " " + p.ora] || 0) + Math.max(1, Math.round(Number(p.persone) || 1));

  const minimo = piuGiorni(oggiISO(R.fuso), R.anticipoGiorni);
  const out = {};
  let giri = 0;
  for (let g = da; g <= a && giri < 400; g = piuGiorni(g, 1), giri++) {
    const gs = String(giornoSettimana(g));
    const ore = R.settimana[gs] || [];
    if (!ore.length) continue;                       // sera senza degustazione: non compare
    const tema = (R.temi || {})[gs] || "vino";
    if ((R.chiusure || []).includes(g)) { out[g] = { s: "out", tema, posti: 0, ore: [], n: testo("chiuso") }; continue; }
    if (g < minimo) continue;                        // troppo a ridosso
    const ora = ore[0];
    const liberi = Math.max(0, R.posti - (presi[g + " " + ora] || 0));
    const s = liberi <= 0 ? "out" : liberi <= R.pochiPosti ? "low" : "free";
    out[g] = { s, tema, posti: liberi, ore: liberi > 0 ? [ora] : [], n: testo(s, liberi, ora) };
  }
  return out;
}

function testo(stato, liberi = 0, ora = "") {
  return { free: `Posti liberi: ${liberi} · ${ora}`, low: `Ultimi ${liberi} posti · ${ora}`,
           out: "Esaurito", chiuso: "Chiuso" }[stato];
}

/* ---------- numero di prenotazione ---------- */
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function nuovoRif() {
  let s = "";
  for (let i = 0; i < 4; i++) s += ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
  return `CS-${new Date().getFullYear()}-${s}`;
}

export const chiaveDi = (rif) => `prenotazioni/${rif}`;
export const salva = (p) => scrivi(chiaveDi(p.rif), p);

/* ---------- invito per il calendario ---------- */
export function ics(p) {
  const z = (x) => String(x).padStart(2, "0");
  const f = (d) => d.getUTCFullYear() + z(d.getUTCMonth() + 1) + z(d.getUTCDate()) + "T" +
                   z(d.getUTCHours()) + z(d.getUTCMinutes()) + "00Z";
  const inizio = versoUTC(p.data, p.ora);
  const fine = new Date(inizio.getTime() + (p.durata || 150) * 60000);
  const esc = (s) => String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//L'Arte del Vino//Prenotazioni//IT",
    "METHOD:PUBLISH", "BEGIN:VEVENT",
    `UID:${p.rif}@christian-vino`,
    `DTSTAMP:${f(new Date())}`, `DTSTART:${f(inizio)}`, `DTEND:${f(fine)}`,
    `SUMMARY:${esc(p.titolo || "Degustazione")} · ${esc(p.nome)}`,
    `DESCRIPTION:${esc(`${p.persone || ""} persone · ${p.lingua || "it"} · ${p.totale} € · ${p.pagamento}\\nRif. ${p.rif}\\n${p.tel || ""} ${p.email || ""}`)}`,
    `LOCATION:${esc(p.luogo || "")}`,
    "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n");
}

/* ---------- posta ---------- */
/* Usa Resend (resend.com): chiave gratuita, 3.000 mail al mese.
   Senza RESEND_API_KEY non manda niente e lo scrive nel log: il resto funziona lo stesso. */
export async function posta({ a, oggetto, testo: corpo, allegaICS }) {
  const chiave = process.env.RESEND_API_KEY;
  const da = process.env.MAIL_MITTENTE || "prenotazioni@example.com";
  if (!chiave) { console.log("[posta saltata]", a, oggetto); return { saltata: true }; }
  const body = {
    from: da, to: Array.isArray(a) ? a : [a], subject: oggetto, text: corpo,
    ...(allegaICS ? { attachments: [{ filename: "serata.ics", content: Buffer.from(allegaICS).toString("base64") }] } : {})
  };
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chiave}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!r.ok) console.error("[posta fallita]", r.status, await r.text());
  return { ok: r.ok };
}

/* ---------- risposte ---------- */
/* ORIGINE: metti l'indirizzo del tuo sito (es. https://lartedelvino.de).
   Con "*" chiunque può chiamare queste funzioni dal proprio sito. */
export const CORS = {
  "Access-Control-Allow-Origin": process.env.ORIGINE || "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};
/** Il corpo di una richiesta, con un tetto: oltre 64 KB non si legge nemmeno. */
export async function corpo(req, max = 65536) {
  const dichiarato = Number(req.headers.get("content-length"));
  if (dichiarato > max) throw Object.assign(new Error("troppo grande"), { stato: 413 });
  const t = await req.text();
  if (t.length > max) throw Object.assign(new Error("troppo grande"), { stato: 413 });
  return JSON.parse(t);
}
export const json = (dati, stato = 200) =>
  new Response(JSON.stringify(dati), { status: stato, headers: { "Content-Type": "application/json", ...CORS } });
export const errore = (msg, stato = 400) => json({ errore: msg }, stato);
export const preflight = () => new Response(null, { status: 204, headers: CORS });

/* ---------- chi entra nell'agenda ---------- */
export async function ammesso(req) {
  const atteso = process.env.AGENDA_TOKEN;
  if (!atteso || atteso.length < 16) return false;      /* token corto = nessun token */
  const u = new URL(req.url);
  const dato = u.searchParams.get("token") || (req.headers.get("authorization") || "").replace(/^Bearer /, "");
  if (!dato) return false;
  /* Confronto a tempo costante: con === si può indovinare il token una lettera
     alla volta misurando quanto ci mette a rispondere. */
  const crypto = await import("node:crypto");
  const a = crypto.createHash("sha256").update(String(dato)).digest();
  const b = crypto.createHash("sha256").update(atteso).digest();
  return crypto.timingSafeEqual(a, b);
}

/* L'agenda non la si apre da un altro sito, mai. */
export const CORS_PRIVATO = {
  "Access-Control-Allow-Origin": process.env.ORIGINE || "null",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow"
};
export const jsonPrivato = (dati, stato = 200) =>
  new Response(JSON.stringify(dati), { status: stato,
    headers: { "Content-Type": "application/json", ...CORS_PRIVATO } });

/* Freno semplice: tanti tentativi dallo stesso indirizzo = porta chiusa.
   Non ferma un attacco serio, ma toglie di mezzo i tentativi a tappeto. */
const colpi = new Map();
export function troppiTentativi(req, max = 20, finestra = 60000) {
  if (process.env.PROVA_LOCALE === "1") max *= 40;   /* sul tuo computer non dà fastidio */
  max = Number(process.env.LIMITE_AL_MINUTO) || max;
  /* Solo l'indirizzo che mette Netlify: X-Forwarded-For lo scrive chi chiama,
     quindi non ci si può fidare (cambiandolo ogni volta si aggira il freno). */
  const ip = req.headers.get("x-nf-client-connection-ip") || "ignoto";
  const ora = Date.now();
  const v = (colpi.get(ip) || []).filter(t => ora - t < finestra);
  v.push(ora); colpi.set(ip, v);
  if (colpi.size > 2000) colpi.clear();
  return v.length > max;
}
