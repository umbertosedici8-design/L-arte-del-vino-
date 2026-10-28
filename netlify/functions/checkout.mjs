/* POST /api/checkout  { rif }
   Apre la cassa di Stripe per una prenotazione già tenuta e risponde { url }.
   Il sito ci manda il cliente; al pagamento riuscito Stripe chiama webhook.mjs.
   Niente SDK: è una sola chiamata HTTP. */

import { chiaveDi, json, errore, preflight, viva, troppiTentativi, corpo } from "./_comune.mjs";
import { leggi } from "./_magazzino.mjs";

const form = (o, pre = "", out = []) => {
  for (const [k, v] of Object.entries(o)) {
    const key = pre ? `${pre}[${k}]` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) form(v, key, out);
    else if (Array.isArray(v)) v.forEach((x, i) => form(x, `${key}[${i}]`, out));
    else if (v !== undefined && v !== null) out.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
  }
  return out.join("&");
};

async function gestisci(req) {
  if (req.method === "OPTIONS") return preflight();
  if (req.method !== "POST") return errore("solo POST", 405);

  if (troppiTentativi(req, 10)) return errore("troppe richieste, riprova fra un minuto", 429);
  let b; try { b = await corpo(req, 4096); } catch { return errore("corpo non leggibile"); }
  const rif = typeof b?.rif === "string" ? b.rif.trim() : "";
  if (!/^CS-\d{4}-[A-Z0-9]{4}$/.test(rif)) return errore("prenotazione sconosciuta", 404);
  const p = await leggi(chiaveDi(rif));
  if (!p) return errore("prenotazione sconosciuta", 404);
  if (!viva(p)) return errore("il blocco è scaduto: riprova a scegliere la data", 410);
  if (p.totale <= 0) return errore("importo non valido");

  const chiave = process.env.STRIPE_SECRET_KEY;
  if (!chiave) {
    /* sul tuo computer non c'è Stripe: si passa dalla cassa finta, che però
       chiama lo stesso webhook. Online, senza chiave, si risponde e basta. */
    if (process.env.PROVA_LOCALE === "1") return json({ url: `/finta/cassa?rif=${p.rif}`, finta: true });
    return errore("Stripe non è ancora collegato", 503);
  }

  const sito = process.env.SITO || new URL(req.url).origin;
  const corpo = form({
    mode: "payment",
    locale: p.lingua === "de" ? "de" : "it",
    client_reference_id: p.rif,
    customer_email: p.email || undefined,
    success_url: `${sito}/?ok=${p.rif}`,
    cancel_url: `${sito}/?annullato=${p.rif}`,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: p.totale * 100,
        product_data: { name: `${p.titolo} · ${p.data} ${p.ora}`, description: `Rif. ${p.rif} · ${p.persone} persone` }
      }
    }],
    payment_intent_data: { metadata: { rif: p.rif } },
    metadata: { rif: p.rif },
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60
  });

  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${chiave}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: corpo
  });
  const s = await r.json();
  if (!r.ok) {
    console.error("[stripe]", s);
    return errore(s?.error?.message || "Stripe ha rifiutato", 502);
  }
  return json({ url: s.url });
};

export default async (req) => {
  try { return await gestisci(req); }
  catch (e) { console.error("[checkout]", e); return errore("errore interno, riprova", 500); }
};

export const config = { path: "/api/checkout" };
