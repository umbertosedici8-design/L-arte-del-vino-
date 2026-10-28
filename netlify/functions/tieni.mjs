/* POST /api/tieni
   Il cliente ha scelto giorno e ora e sta per pagare: gli teniamo il posto.
   Il blocco dura 20 minuti, poi si scioglie da solo (vedi pulizia.mjs).
   Risponde { rif, scade }. Se nel frattempo il posto è andato, risponde 409. */

import { regole, disponibilita, nuovoRif, salva, json, errore, preflight, troppiTentativi, dataVera, corpo, oggiISO, piuGiorni, giornoSettimana, versoUTC } from "./_comune.mjs";
import { conta } from "./_listino.mjs";
import { tutte } from "./_magazzino.mjs";
import { viva } from "./_comune.mjs";

const str = (v, max = 200) =>
  String(v ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
const mailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

async function gestisci(req) {
  if (req.method === "OPTIONS") return preflight();
  if (req.method !== "POST") return errore("solo POST", 405);
  if (troppiTentativi(req, 12)) return errore("troppe richieste, riprova fra un minuto", 429);

  let b;
  try { b = await corpo(req); } catch (e) { return e.stato === 413 ? errore("richiesta troppo grande", 413) : errore("corpo non leggibile"); }
  if (!b || typeof b !== "object" || Array.isArray(b)) return errore("corpo non valido");

  const data = str(b.data, 10), ora = str(b.ora, 5);
  if (!dataVera(data) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(ora)) return errore("data o ora non valide");
  const R0 = await regole();
  if (data > piuGiorni(oggiISO(R0.fuso), R0.orizzonteGiorni)) return errore("data troppo lontana");

  const nome = str(b.nome, 80), email = str(b.email, 120), tel = str(b.tel, 40);
  if (nome.length < 2) return errore("manca il nome");
  if (!mailOk(email) && tel.replace(/\D/g, "").length < 6) return errore("serve una mail o un telefono");

  /* QUANTI POSTI e QUALE SERATA li decide il server: il tema viene dal giorno
     (lunedi' vino, martedi' Champagne, mercoledi' fortificati), non dal telefono. */
  const persone = Math.round(Number(b.persone) || 0);
  if (persone < 1 || persone > R0.maxPerPrenotazione) return errore(`da 1 a ${R0.maxPerPrenotazione} posti per prenotazione`);
  const tema = (R0.temi || {})[String(giornoSettimana(data))];
  if (!tema) return errore("quella sera non c'è degustazione", 409);

  /* IL PREZZO LO FA IL SERVER. Quello che arriva dal telefono serve solo
     per accorgersi se qualcuno ha provato a cambiarlo. */
  const conto = conta([{ k: "home", q: persone, tipo: tema }], b.promo);
  const dichiarato = Math.round(Number(b.totale) || 0);
  if (dichiarato && Math.abs(dichiarato - conto.totale) > 1)
    console.warn(`[prezzo] dichiarato ${dichiarato} \u20ac ma il conto giusto \u00e8 ${conto.totale} \u20ac`);
  const totale = conto.totale;

  /* ci sono ancora abbastanza posti? */
  const libero = await disponibilita(data, data);
  const g = libero[data];
  if (!g || g.s === "out" || !(g.ore || []).includes(ora)) return errore("quella sera è al completo", 409);
  if (g.posti < persone) return errore(`restano solo ${g.posti} posti`, 409);

  const R = await regole();
  const adesso = Date.now();
  /* Con il bonifico il posto resta tenuto fino a 48 ore (e comunque fino
     a due ore prima della serata); con la carta bastano pochi minuti. */
  const pagamento = ["bank", "paypal", "card"].includes(b.pagamento) ? b.pagamento : "bank";
  const inizio = versoUTC(data, ora).getTime();
  const scadeIl = pagamento === "card"
    ? adesso + R.minutiBlocco * 60000
    : Math.max(adesso + 60 * 60000, Math.min(adesso + (R.oreBonifico || 48) * 3600000, inizio - 2 * 3600000));
  const p = {
    rif: nuovoRif(),
    stato: "tenuta",
    data, ora, durata: R.durataMin,
    titolo: { vino: "Serata Vino", bolle: "Serata Champagne", fort: "Serata Vini fortificati" }[tema],
    luogo: str(b.luogo, 160),
    nome, email, tel,
    lingua: ["it", "de", "en", "es"].includes(b.lingua) ? b.lingua : "it",
    persone,
    tema,
    articoli: conto.righe.map((r) => ({ ...r, n: str(r.n, 80) })),
    totale,
    iva: 0,                       /* Kleinunternehmer, §19 UStG */
    scontoApplicato: conto.sconto,
    promo: conto.promo,
    pagamento,
    note: str(b.note, 500),
    creata: new Date(adesso).toISOString(),
    scade: new Date(scadeIl).toISOString()
  };

  await salva(p);

  /* Due persone possono prenotare nello stesso istante: si ricontrolla
     DOPO aver scritto. Se la sala e' andata oltre i posti, l'ultimo
     arrivato si ritira e riceve 409, invece di sedersi in piedi. */
  const prima = (await tutte()).filter((x) => x.rif !== p.rif && x.data === data && x.ora === ora && viva(x) &&
    (x.creata < p.creata || (x.creata === p.creata && x.rif < p.rif)));
  const occupatiPrima = prima.reduce((n, x) => n + Math.max(1, Math.round(Number(x.persone) || 1)), 0);
  if (occupatiPrima + persone > R.posti) {
    p.stato = "annullata"; p.scade = null; p.note = (p.note ? p.note + " " : "") + "[sala piena al controllo]";
    await salva(p);
    return errore("quella sera è appena andata al completo", 409);
  }
  return json({ rif: p.rif, scade: p.scade, data: p.data, ora: p.ora, posti: persone, tema });
};

export default async (req) => {
  try { return await gestisci(req); }
  catch (e) { console.error("[tieni]", e); return errore("errore interno, riprova", 500); }
};

export const config = { path: "/api/tieni" };
