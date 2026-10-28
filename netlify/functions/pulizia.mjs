/* Gira da sola ogni 10 minuti (vedi netlify.toml).
   Scioglie i blocchi di chi ha aperto il pagamento e poi è sparito,
   così il posto torna libero per tutti gli altri. */

import { salva, viva, json } from "./_comune.mjs";
import { tutte } from "./_magazzino.mjs";

export default async () => {
  const adesso = Date.now();
  let liberati = 0;
  for (const p of await tutte()) {
    if (p.stato === "tenuta" && p.scade && Date.parse(p.scade) < adesso) {
      p.stato = "scaduta";
      await salva(p);
      liberati++;
    }
  }
  if (liberati) console.log(`[pulizia] ${liberati} blocchi sciolti`);
  return json({ liberati });
};

export const config = { schedule: "*/10 * * * *" };
