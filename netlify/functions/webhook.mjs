/* POST /api/webhook
   Lo chiama Stripe quando un pagamento va a buon fine. È QUESTO il pezzo che
   mette la prenotazione in agenda senza che tu faccia niente.
   La firma viene controllata a mano con node:crypto: niente SDK da installare. */

import crypto from "node:crypto";
import { chiaveDi, salva, ics, posta, viva, json, errore } from "./_comune.mjs";
import { leggi, tutte } from "./_magazzino.mjs";

function firmaValida(grezzo, intestazione, segreto, tolleranzaSec = 300) {
  if (!intestazione) return false;
  const parti = Object.fromEntries(
    intestazione.split(",").map((x) => x.split("=").map((y) => y.trim()))
  );
  const t = Number(parti.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > tolleranzaSec) return false;
  const atteso = crypto.createHmac("sha256", segreto).update(`${t}.${grezzo}`).digest("hex");
  const dato = parti.v1 || "";
  if (dato.length !== atteso.length) return false;
  return crypto.timingSafeEqual(Buffer.from(dato), Buffer.from(atteso));
}

export default async (req) => {
  if (req.method !== "POST") return errore("solo POST", 405);

  const segreto = process.env.STRIPE_WEBHOOK_SECRET;
  const grezzo = await req.text();
  if (grezzo.length > 1_000_000) return errore("troppo grande", 413);

  if (segreto) {
    if (!firmaValida(grezzo, req.headers.get("stripe-signature"), segreto))
      return errore("firma non valida", 400);
  } else if (process.env.PROVA_LOCALE !== "1") {
    return errore("webhook non configurato", 503);
  }

  let ev; try { ev = JSON.parse(grezzo); } catch { return errore("JSON non leggibile"); }

  const interessanti = ["checkout.session.completed", "checkout.session.async_payment_succeeded"];
  if (!interessanti.includes(ev.type)) return json({ ignorato: ev.type });

  const s = ev.data?.object || {};
  const rif = s.client_reference_id || s.metadata?.rif;
  if (!rif) return json({ ignorato: "senza riferimento" });

  const p = await leggi(chiaveDi(rif));
  if (!p) return json({ ignorato: "prenotazione sconosciuta" });
  if (p.stato === "pagata" || p.stato === "confermata") return json({ gia: rif });  // Stripe può richiamare

  /* il blocco può essere scaduto mentre pagava: il pagamento vince, ma solo se
     nel frattempo nessun altro si è preso quel posto */
  if (!viva(p)) {
    const altre = (await tutte()).filter((x) => x.rif !== p.rif && x.data === p.data && x.ora === p.ora && viva(x));
    if (altre.length) {
      p.stato = "da_rimborsare";
      p.note = (p.note || "") + " [pagata ma il posto era già andato: va rimborsata]";
      await salva(p);
      await posta({
        a: process.env.MAIL_TUA, oggetto: `DA RIMBORSARE ${p.rif}`,
        testo: `${p.nome} ha pagato ${p.totale} € per il ${p.data} ${p.ora}, ma il posto era già occupato.\nRimborsa da Stripe.`
      });
      return json({ conflitto: rif });
    }
  }

  p.stato = "pagata";
  p.pagatoIl = new Date().toISOString();
  p.scade = null;
  p.incasso = { fornitore: "stripe", sessione: s.id, importo: (s.amount_total ?? p.totale * 100) / 100 };
  await salva(p);

  const invito = ics(p);
  await posta({
    a: process.env.MAIL_TUA,
    oggetto: `Nuova prenotazione · ${p.data} ${p.ora} · ${p.nome}`,
    testo: [
      `${p.titolo} — ${p.data} alle ${p.ora}`,
      `${p.persone} persone · lingua ${p.lingua}`,
      `${p.nome} · ${p.tel || "—"} · ${p.email || "—"}`,
      p.luogo ? `Dove: ${p.luogo}` : "",
      `Totale ${p.totale} € — PAGATO con Stripe`,
      p.note ? `Note: ${p.note}` : "",
      `Rif. ${p.rif}`
    ].filter(Boolean).join("\n"),
    allegaICS: invito
  });
  if (p.email) {
    await posta({
      a: p.email,
      oggetto: p.lingua === "de" ? `Buchung bestätigt · ${p.data}` : `Prenotazione confermata · ${p.data}`,
      testo: p.lingua === "de"
        ? `Danke! Dein Abend ist fix: ${p.data} um ${p.ora}.\nBuchungsnummer ${p.rif}.\nIm Anhang der Termin für deinen Kalender.\nBis bald — Christian · L'Arte del Vino`
        : `Grazie! La serata è fissata: ${p.data} alle ${p.ora}.\nNumero di prenotazione ${p.rif}.\nIn allegato l'appuntamento per il tuo calendario.\nA presto — Christian · L'Arte del Vino`,
      allegaICS: invito
    });
  }

  return json({ ok: rif });
};

export const config = { path: "/api/webhook" };
