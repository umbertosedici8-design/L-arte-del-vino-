/* POST /api/visita   { e: "vista" | "ping", p: "home", f: "instagram.com", d: "m" | "d" }
   Lo manda il sito: "vista" quando si apre una pagina, "ping" ogni 40 secondi
   finché la pagina resta aperta. Niente cookie, niente dati salvati nel browser.
   Risponde sempre 204 e non dice niente a chi chiama. */

import { troppiTentativi, corpo } from "./_comune.mjs";
import { registra } from "./_visite.mjs";

const vuota = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export default async (req) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });
  /* stesso sito soltanto: da un altro dominio non si gonfiano i numeri */
  const da = req.headers.get("origin");
  if (da && da !== new URL(req.url).origin && da !== process.env.SITO && da !== process.env.ORIGINE) return vuota();
  if (troppiTentativi(req, 40, 60000, "visita:")) return vuota();
  try {
    const b = await corpo(req, 1024);
    if (b && typeof b === "object" && !Array.isArray(b)) await registra(req, b);
  } catch (e) { if (!/troppo grande|JSON/.test(String(e && e.message))) console.error("[visita]", e); }
  return vuota();
};

export const config = { path: "/api/visita" };
