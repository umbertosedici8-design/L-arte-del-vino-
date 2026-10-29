/* L'agenda privata: la usa solo tu, con il token.
     GET  /api/agenda?token=…                    → prenotazioni + regole
     POST /api/agenda?token=…  {azione:…}        → conferma, annulla, chiudi/apri un giorno,
                                                   aggiungi a mano, cambia le regole
   Il token sta in una variabile d'ambiente, mai dentro il sito. */

import {
  ammesso, chiaveDi, salva, regole, ics, posta, nuovoRif, viva,
  json, errore, preflight, jsonPrivato, CORS_PRIVATO, troppiTentativi, giaTroppi, ripulisciRegole, dataVera, corpo, giornoSettimana
} from "./_comune.mjs";
import { mailConfermata, mailAnnullata, mailATeConfermata } from "./_mail.mjs";
import { leggi, scrivi, tutte } from "./_magazzino.mjs";
import { adesso as liveVisite, statistiche } from "./_visite.mjs";

async function gestisci(req) {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_PRIVATO });
  /* Due freni separati. Chi sbaglia password ha 10 tentativi ogni 15 minuti, e dopo
     non viene nemmeno controllato (così non può indovinarla a forza di provare).
     Tu, entrato, hai fino a 120 richieste al minuto: confermare dieci bonifici
     di fila non ti blocca. */
  const QUARTO = 15 * 60000;
  if (giaTroppi(req, 10, QUARTO, "agenda-ko:")) return jsonPrivato({ errore: "troppi tentativi, riprova fra 15 minuti" }, 429);
  if (!(await ammesso(req))) {
    troppiTentativi(req, 10, QUARTO, "agenda-ko:");
    return jsonPrivato({ errore: "non autorizzato" }, 401);
  }
  if (troppiTentativi(req, 120, 60000, "agenda:")) return jsonPrivato({ errore: "troppe richieste, aspetta un minuto" }, 429);

  if (req.method === "GET") {
    const u = new URL(req.url), vista = u.searchParams.get("vista");
    if (vista === "live") return jsonPrivato({ live: await liveVisite() });
    if (vista === "visite") return jsonPrivato({ live: await liveVisite(), giorni: await statistiche(u.searchParams.get("giorni")) });
    const pren = await tutte();
    const adesso = Date.now();
    return jsonPrivato({
      regole: await regole(),
      prenotazioni: pren.map((p) => ({ ...p, occupa: viva(p, adesso) }))
    });
  }

  if (req.method !== "POST") return jsonPrivato({ errore: "metodo non previsto" }, 405);

  let b; try { b = await corpo(req); } catch { return jsonPrivato({ errore: "corpo non leggibile" }, 400); }
  if (!b || typeof b !== "object" || Array.isArray(b)) return jsonPrivato({ errore: "corpo non valido" }, 400);
  const R = await regole();

  switch (b.azione) {
    case "conferma": {                       /* bonifico arrivato, contanti presi */
      const p = await leggi(chiaveDi(b.rif));
      if (!p) return jsonPrivato({ errore: "non trovata" }, 404);
      p.stato = "confermata"; p.scade = null; p.confermataIl = new Date().toISOString();
      await salva(p);
      try { await mailATeConfermata(p); } catch (e) { console.error("[mail a te]", e); }
      try { await mailConfermata(p); } catch (e) { console.error("[mail confermata]", e); }
      return jsonPrivato({ ok: true, prenotazione: p });
    }

    case "annulla": {
      const p = await leggi(chiaveDi(b.rif));
      if (!p) return jsonPrivato({ errore: "non trovata" }, 404);
      p.stato = "annullata"; p.scade = null; p.annullataIl = new Date().toISOString();
      if (b.motivo) p.note = (p.note || "") + " [" + String(b.motivo).slice(0, 200) + "]";
      await salva(p);
      if (b.avvisa !== false) { try { await mailAnnullata(p); } catch (e) { console.error("[mail annullata]", e); } }
      return jsonPrivato({ ok: true });
    }

    case "chiudi": {                         /* niente serate quel giorno */
      const g = String(b.data || "");
      if (!dataVera(g)) return jsonPrivato({ errore: "data non valida" }, 400);
      const chiusure = new Set(R.chiusure || []);
      chiusure.add(g);
      await scrivi("regole", { ...R, chiusure: [...chiusure].sort() });
      return jsonPrivato({ ok: true, chiusure: [...chiusure].sort() });
    }

    case "apri": {
      const g = String(b.data || "");
      const chiusure = (R.chiusure || []).filter((x) => x !== g);
      await scrivi("regole", { ...R, chiusure });
      return jsonPrivato({ ok: true, chiusure });
    }

    case "regole": {                         /* orari, anticipo, durata… */
      const nuove = ripulisciRegole(b.regole, R);          /* solo campi noti, col tipo giusto */
      await scrivi("regole", nuove);
      return jsonPrivato({ ok: true, regole: nuove });
    }

    case "aggiungi": {                       /* una serata presa al telefono */
      const p = {
        rif: await nuovoRif(), stato: "confermata",
        data: String(b.data || ""), ora: String(b.ora || ""), durata: R.durataMin,
        titolo: String(b.titolo || "Degustazione").slice(0, 80),
        nome: String(b.nome || "—").slice(0, 80),
        email: String(b.email || "").slice(0, 120), tel: String(b.tel || "").slice(0, 40),
        lingua: ["it", "de", "en", "es"].includes(b.lingua) ? b.lingua : "it", persone: Math.max(1, Math.round(Number(b.persone) || 1)),
        articoli: [], totale: Math.round(Number(b.totale) || 0),
        pagamento: ["bank", "paypal", "card", "cash"].includes(b.pagamento) ? b.pagamento : "bank",
        note: String(b.note || "").slice(0, 500),
        creata: new Date().toISOString(), scade: null, aMano: true
      };
      if (!dataVera(p.data) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(p.ora))
        return jsonPrivato({ errore: "data o ora non valide" }, 400);
      p.tema = (R.temi || {})[String(giornoSettimana(p.data))] || "vino";   /* lunedì vino, martedì Champagne… */
      await salva(p);
      return jsonPrivato({ ok: true, prenotazione: p });
    }

    default:
      return jsonPrivato({ errore: "azione sconosciuta" }, 400);
  }
};

export default async (req) => {
  try { return await gestisci(req); }
  catch (e) { console.error("[agenda]", e); return jsonPrivato({ errore: "errore interno" }, 500); }
};

export const config = { path: "/api/agenda" };
