/* GET /api/slots            → i prossimi mesi
   GET /api/slots?mese=2026-11  → solo quel mese
   È quello che legge il calendario del sito. Non espone nomi né dati di nessuno:
   solo libero / ultimi / pieno. */

import { disponibilita, regole, oggiISO, piuGiorni, preflight, json, errore, CORS, troppiTentativi } from "./_comune.mjs";

async function gestisci(req) {
  if (req.method === "OPTIONS") return preflight();
  if (troppiTentativi(req, 120)) return errore("troppe richieste", 429);
  const R = await regole();
  const u = new URL(req.url);
  const mese = u.searchParams.get("mese");

  let da, a;
  if (/^\d{4}-\d{2}$/.test(mese || "")) {
    da = mese + "-01";
    const [Y, M] = mese.split("-").map(Number);
    a = new Date(Date.UTC(Y, M, 0)).toISOString().slice(0, 10);
  } else {
    da = oggiISO(R.fuso);
    a = piuGiorni(da, R.orizzonteGiorni);
  }

  const giorni = await disponibilita(da, a);
  return new Response(JSON.stringify(giorni), {
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60", ...CORS }
  });
};

export default async (req) => {
  try { return await gestisci(req); }
  catch (e) { console.error("[slots]", e); return errore("errore interno", 500); }
};

export const config = { path: "/api/slots" };
