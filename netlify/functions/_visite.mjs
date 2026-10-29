/* Quante persone guardano il sito, senza cookie e senza salvare niente nel loro browser.

   Come si riconosce la stessa persona durante un giorno, senza sapere chi è:
   impronta = SHA-256(chiave del giorno + indirizzo IP + browser), tagliata a 16 caratteri.
   La chiave del giorno è casuale e si butta a mezzanotte: domani la stessa persona ha
   un'impronta diversa e quella di ieri non si può più ricostruire. L'indirizzo IP non
   viene mai salvato. A fine giornata restano solo i totali (quanti, da dove, che pagine).
   È lo stesso metodo che usano gli strumenti di statistica "senza cookie". */

import { createHash, randomBytes } from "node:crypto";
import { cassetto } from "./_magazzino.mjs";
import { FUSO, oggiISO, piuGiorni } from "./_comune.mjs";

const C = () => cassetto("visite");

/* Le pagine del sito e il passo del percorso verso la prenotazione che rappresentano. */
export const PAGINE = ["home", "privati", "ristoranti", "corso", "info", "contatto", "carrello", "pagamento", "ticket", "impressum", "datenschutz"];
const PASSO = { carrello: 1, pagamento: 2, ticket: 3 };   // 0 = ha visitato

/* Da dove arriva: un nome leggibile, mai l'indirizzo completo. */
export function fonte(grezza) {
  const f = String(grezza || "").toLowerCase().trim().slice(0, 80);
  if (!f) return "Diretto o app";
  if (/(^|\.)instagram\.com$|^ig$|instagram/.test(f)) return "Instagram";
  if (/(^|\.)facebook\.com$|^fb$|facebook/.test(f)) return "Facebook";
  if (/(^|\.)google\.|^google$/.test(f)) return "Google";
  if (/whatsapp|^wa\.me$|^wa$/.test(f)) return "WhatsApp";
  if (/(^|\.)bing\.com$|duckduckgo|ecosia|yahoo|qwant/.test(f)) return "Altri motori di ricerca";
  if (/volantino|flyer|qr/.test(f)) return "Volantino (QR)";
  if (/tiktok/.test(f)) return "TikTok";
  if (/kleinanzeigen|ebay/.test(f)) return "Kleinanzeigen";
  if (/partenope/.test(f)) return "Partenope";
  const host = f.replace(/^www\./, "").replace(/[^a-z0-9.\-]/g, "").slice(0, 40);
  return host || "Diretto o app";
}

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp\/|headless|lighthouse|pingdom|uptime|curl|wget|python|node-fetch|axios/i;

function giornoEOra(ms = Date.now()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false
  }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return { giorno: `${p.year}-${p.month}-${p.day}`, ora: String(+p.hour % 24).padStart(2, "0") };
}
/* secchiello di un minuto, in UTC, solo cifre: 202610291405 */
const minuto = (ms) => new Date(ms).toISOString().slice(0, 16).replace(/\D/g, "");

async function chiaveDelGiorno(giorno) {
  const k = `sale/${giorno}`;
  let s = await C().leggi(k);
  if (!s || !s.v) { s = { v: randomBytes(24).toString("hex") }; await C().scrivi(k, s); }
  return s.v;
}

/** Una visita o un "sono ancora qui". Ritorna true se è stata contata. */
export async function registra(req, b) {
  const ua = req.headers.get("user-agent") || "";
  if (!ua || BOT.test(ua)) return false;
  const e = b && b.e === "ping" ? "ping" : b && b.e === "vista" ? "vista" : null;
  if (!e) return false;
  const pagina = PAGINE.includes(b.p) ? b.p : "home";
  const ip = req.headers.get("x-nf-client-connection-ip") || "0";
  const ora = Date.now(), { giorno, ora: h } = giornoEOra(ora);
  const sale = await chiaveDelGiorno(giorno);
  const id = createHash("sha256").update(sale + "|" + ip + "|" + ua).digest("hex").slice(0, 16);

  /* "adesso sul sito": un segno per minuto, sovrascritto se la stessa persona ripassa */
  await C().scrivi(`live/${minuto(ora)}/${id}`, { p: pagina, t: ora });
  if (e !== "vista") return true;

  /* i totali del giorno */
  const k = `giorno/${giorno}`;
  const g = (await C().leggi(k)) || { giorno, viste: 0, ore: {}, pagine: {}, fonti: {}, disp: { m: 0, d: 0 }, ids: {} };
  if (g.chiuso) return true;                 /* giorno già archiviato: non si riapre */
  g.viste = (g.viste || 0) + 1;
  g.ore[h] = (g.ore[h] || 0) + 1;
  g.pagine[pagina] = (g.pagine[pagina] || 0) + 1;
  const passo = PASSO[pagina] || 0;
  if (!(id in g.ids)) {
    g.fonti[fonte(b.f)] = (g.fonti[fonte(b.f)] || 0) + 1;
    g.disp[b.d === "m" ? "m" : "d"]++;
    g.ids[id] = passo;
  } else if (passo > g.ids[id]) g.ids[id] = passo;
  if (Object.keys(g.ids).length > 20000) return true;   /* freno: un attacco non gonfia il file all'infinito */
  await C().scrivi(k, g);
  return true;
}

/** Quanti ci sono adesso (ultimi 2 minuti) e su che pagina. */
export async function adesso() {
  const ora = Date.now(), ultimo = new Map();
  for (const m of [minuto(ora - 120000), minuto(ora - 60000), minuto(ora)]) {
    for (const k of await C().elenca(`live/${m}/`)) ultimo.set(k.split("/").pop(), k);   /* il minuto più recente vince */
  }
  const chiavi = [...ultimo.values()].slice(0, 300);
  const segni = await Promise.all(chiavi.map((k) => C().leggi(k)));
  const pagine = {};
  for (const s of segni) { const p = s && PAGINE.includes(s.p) ? s.p : "home"; pagine[p] = (pagine[p] || 0) + 1; }
  return { totale: ultimo.size, pagine };
}

/* I numeri di un giorno, senza impronte: è l'unica forma che esce dal server. */
function riassunto(g) {
  const stadi = g.stadi || [0, 0, 0, 0];
  if (g.ids) { stadi.fill(0); for (const s of Object.values(g.ids)) for (let i = 0; i <= s; i++) stadi[i]++; }
  return { giorno: g.giorno, viste: g.viste || 0, unici: g.ids ? Object.keys(g.ids).length : g.unici || 0,
           stadi, ore: g.ore || {}, pagine: g.pagine || {}, fonti: g.fonti || {}, disp: g.disp || { m: 0, d: 0 } };
}

export async function statistiche(giorni = 30) {
  const n = Math.max(1, Math.min(120, Math.round(+giorni) || 30));
  const oggi = oggiISO(FUSO), elenco = [];
  for (let i = n - 1; i >= 0; i--) elenco.push(piuGiorni(oggi, -i));
  const out = [];
  for (let i = 0; i < elenco.length; i += 12) {          /* a gruppi, per non aspettare un giorno alla volta */
    const pezzo = await Promise.all(elenco.slice(i, i + 12).map((g) => C().leggi(`giorno/${g}`)));
    pezzo.forEach((g, j) => out.push(g ? riassunto(g) : { giorno: elenco[i + j], viste: 0, unici: 0, stadi: [0, 0, 0, 0], ore: {}, pagine: {}, fonti: {}, disp: { m: 0, d: 0 } }));
  }
  return out;
}

/** Ogni 10 minuti: via i segni "live" vecchi, le chiavi dei giorni passati e le impronte di ieri. */
export async function pulisciVisite() {
  const ora = Date.now(), limite = minuto(ora - 10 * 60000), oggi = giornoEOra(ora).giorno;
  let via = 0;
  for (const k of await C().elenca("live/")) {
    if (k.split("/")[1] < limite) { await C().cancella(k); via++; }
  }
  for (const k of await C().elenca("sale/")) if (k.slice(5) < oggi) await C().cancella(k);
  /* i giorni finiti: si tengono solo i totali */
  const treGiorniFa = piuGiorni(oggi, -3);
  for (const k of await C().elenca("giorno/")) {
    const giorno = k.slice(7);
    if (giorno >= oggi) continue;
    if (giorno < piuGiorni(oggi, -400)) { await C().cancella(k); continue; }   /* oltre un anno: non serve più */
    if (giorno < treGiorniFa) continue;          /* già chiuso nei giri precedenti: non si rilegge ogni 10 minuti */
    const g = await C().leggi(k);
    if (g && g.ids) {
      const r = riassunto(g);
      await C().scrivi(k, { giorno, viste: r.viste, unici: r.unici, stadi: r.stadi, ore: r.ore, pagine: r.pagine, fonti: r.fonti, disp: r.disp, chiuso: true });
    }
  }
  return via;
}
