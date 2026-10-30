/* IL LISTINO, DALLA PARTE DEL SERVER.
   Prima il prezzo arrivava dal telefono del cliente e il server lo scriveva
   senza guardarlo: bastava cambiare un numero prima di premere Conferma per
   prenotare una serata da 354 € pagandone 1.
   Qui il conto lo rifà il server, con le stesse regole del sito, e il numero
   che arriva da fuori serve solo per accorgersi se qualcosa non torna. */

export const P = {
  home: 55, homeBolle: 75, homeFort: 64, homeMin: 1, extraWine: 5, corso: 179, team: 55, teamMin: 8,
  uno: 45, uno5: 200, staff2h: 150, staff4h: 280, staffHour: 65,
  staffExtraPax: 10, eveningBase: 290, eveningPlus: 390, ristWine: 9
};

/** Formule ancora chiuse: il server le rifiuta anche se qualcuno forza il browser. */
export const CHIUSE = new Set(["corso", "uno"]);

export const MINIMI = { home: 1, corso: 3, uno: 1, staff: 1, evening: 1, team: 8, voucher: 1 };

/** Tetti per riga: una prenotazione online arriva al massimo a 10 posti. */
export const MASSIMI = { home: 10, voucher: 20 };

export const PROMOS = { PRIMA10: { off: 0.10 } };

const ha = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const n = (v, d = 0) => (Number.isFinite(+v) ? +v : d);

/** Il prezzo di una riga, con o senza configurazione. */
export function prezzoRiga(riga) {
  const k = String(riga?.k || "");
  if (CHIUSE.has(k) || !ha(MINIMI, k)) return null;   /* chiave sconosciuta o di prototipo: si scarta */
  const q = Math.max(MINIMI[k], Math.min(MASSIMI[k] ?? 200, Math.round(n(riga?.q, 1))));
  const c = riga?.cfg || null;

  /* la serata in sala: prezzo a posto secondo il tema, niente configurazione */
  if (k === "home") {
    const tipo = riga?.tipo ?? c?.tipo;
    const pp = tipo === "bolle" ? P.homeBolle : tipo === "fort" ? P.homeFort : P.home;
    return pp * q;
  }

  if (c) {
    const pax = Math.max(1, Math.min(60, Math.round(n(c.pax, 1))));
    const ore = Math.max(1, Math.min(24, Math.round(n(c.ore, 1))));
    const vini = Math.max(0, Math.min(20, Math.round(n(c.vini, 0))));
    if (k === "home") { const m = Math.max(pax, P.homeMin);
      const pp = c.tipo === "bolle" ? P.homeBolle : c.tipo === "fort" ? P.homeFort : P.home;
      return pp * m + (vini > 6 ? (vini - 6) * P.extraWine * m : 0); }
    if (k === "team") { const m = Math.max(pax, P.teamMin); return P.team * m + (vini > 6 ? (vini - 6) * P.extraWine * m : 0); }
    if (k === "corso") return P.corso * Math.max(pax, MINIMI.corso);
    if (k === "uno")   return ore >= 5 ? Math.round(P.uno5 / 5 * ore) : P.uno * ore;
    if (k === "staff") { const base = ore <= 2 ? P.staff2h : ore <= 4 ? P.staff4h : P.staff4h + (ore - 4) * P.staffHour;
                         return base + (pax > 8 ? (pax - 8) * P.staffExtraPax : 0); }
    if (k === "evening") { const plus = vini > 0;
                           return (plus ? P.eveningPlus : P.eveningBase) + (plus ? P.ristWine * vini * Math.min(pax, 12) : 0); }
  }
  /* senza configurazione: le stesse regole del carrello */
  const base = { home: P.home, corso: P.corso, uno: P.uno, staff: P.staff2h,
                 evening: P.eveningBase, team: P.team, voucher: P.home }[k];
  if (base === undefined) return null;                 /* articolo sconosciuto: si scarta */
  if (k === "uno" && q >= 5) return Math.round(P.uno5 / 5 * q);
  if (k === "staff" && q > 1) return P.staff2h * q;
  return base * q;
}

/** Il totale vero, calcolato qui. Ritorna anche gli articoli ripuliti. */
export function conta(articoli, promo) {
  const righe = [];
  let sub = 0;
  for (const a of (Array.isArray(articoli) ? articoli.slice(0, 20) : [])) {
    const p = prezzoRiga(a);
    if (p === null || !Number.isFinite(p) || p <= 0) continue;
    righe.push({ k: String(a.k).slice(0, 20), q: Math.round(n(a.q, 1)), p, n: String(a.n ?? "").slice(0, 80) });
    sub += p;
  }
  const codice = String(promo || "").toUpperCase().slice(0, 20);
  const sconto = ha(PROMOS, codice) ? Math.round(sub * PROMOS[codice].off) : 0;
  return { righe, sub, sconto, promo: ha(PROMOS, codice) ? codice : null, totale: Math.max(0, sub - sconto) };
}
