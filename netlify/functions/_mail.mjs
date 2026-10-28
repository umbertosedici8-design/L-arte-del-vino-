/* Le mail che partono verso i clienti e verso di te.
   Tutti i testi stanno qui: per cambiare una frase si tocca solo questo file.
   Ogni mail esiste in italiano e in tedesco; la lingua è quella scelta sul sito. */

import { posta, ics, versoUTC } from "./_comune.mjs";

/* ---------- dati fissi ---------- */
const LUOGO = {
  nome: "Partenope 081",
  via: "Simon-Dach-Straße 39, 10245 Berlin",
  mezzi: {
    it: "U5 Frankfurter Tor oppure S+U Warschauer Straße, circa 10 minuti a piedi",
    de: "U5 Frankfurter Tor oder S+U Warschauer Straße, jeweils ca. 10 Minuten zu Fuß"
  }
};
const BANCA = {
  titolare: process.env.BANCA_TITOLARE || "Christian Scognamiglio",
  iban: process.env.BANCA_IBAN || "DE86 1001 2345 0565 1323 01",
  bic: process.env.BANCA_BIC || "TRBKDEBBXXX"
};
const SITO = () => (process.env.SITO || "https://lartedelvino.de").replace(/\/+$/, "");

const NOMI = {
  it: { vino: "Serata Vino", bolle: "Serata Champagne", fort: "Serata Vini fortificati" },
  de: { vino: "Weinabend", bolle: "Champagnerabend", fort: "Likörwein-Abend" }
};
const SOTTO = {
  it: { vino: "rossi e bianchi a confronto", bolle: "Champagne e bollicine", fort: "Porto, Sherry e compagni" },
  de: { vino: "Rot und Weiß im Vergleich", bolle: "Champagner und Schaumwein", fort: "Portwein, Sherry und Co." }
};

/* ---------- piccoli aiuti ---------- */
const L = (p) => (p.lingua === "de" ? "de" : "it");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
/* Solo il primo nome, solo lettere: nessuno può infilare link o testo strano in una mail che parte da noi. */
const nome = (p) => (String(p.nome || "").trim().split(/\s+/)[0] || "").replace(/[^\p{L}' -]/gu, "").slice(0, 30);
const euro = (n, l) => new Intl.NumberFormat(l === "de" ? "de-DE" : "it-IT", { style: "currency", currency: "EUR" }).format(Number(n) || 0);
const giorno = (p, l) => versoUTC(p.data, p.ora).toLocaleDateString(l === "de" ? "de-DE" : "it-IT",
  { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" });
const quando = (iso, l) => new Date(iso).toLocaleString(l === "de" ? "de-DE" : "it-IT",
  { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });
const serata = (p, l) => NOMI[l][p.tema] || p.titolo || NOMI[l].vino;
const persone = (p, l) => { const n = Number(p.persone) || 1; return l === "de" ? (n === 1 ? "1 Person" : `${n} Personen`) : (n === 1 ? "1 persona" : `${n} persone`); };
const posti = (p, l) => { const n = Number(p.persone) || 1; return l === "de" ? (n === 1 ? "1 Platz" : `${n} Plätze`) : (n === 1 ? "1 posto" : `${n} posti`); };
const ora = (p, l) => (l === "de" ? `${p.ora} Uhr` : `ore ${p.ora}`);

/* L'invito per il calendario del cliente: niente dati privati, solo serata e luogo. */
function icsCliente(p, l) {
  return ics({ ...p, luogo: `${LUOGO.nome}, ${LUOGO.via}` }).split("\r\n").map((r) =>
    r.startsWith("SUMMARY:") ? `SUMMARY:${serata(p, l)} · L'Arte del Vino`
    : r.startsWith("DESCRIPTION:") ? `DESCRIPTION:${(l === "de" ? "Buchungsnummer " : "Prenotazione ") + p.rif}`
    : r).join("\r\n");
}

/* ---------- impaginazione comune ---------- */
function pagina(l, { titolo, righe, riquadro, dopo }) {
  const blocco = (r) => r.map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#8a6d5a;font-size:13px;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;color:#2b1a14;font-size:15px;font-weight:600">${esc(v)}</td></tr>`).join("");
  const html = `<!doctype html><html lang="${l}"><body style="margin:0;background:#f6eee4;font-family:Georgia,'Times New Roman',serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6eee4;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffaf3;border-radius:18px;overflow:hidden">
<tr><td style="background:#5a1230;padding:26px 28px;color:#f3d9a4;font-size:12px;letter-spacing:3px">L'ARTE DEL VINO
<div style="color:#fff;font-size:26px;letter-spacing:0;margin-top:8px;line-height:1.25">${esc(titolo)}</div></td></tr>
<tr><td style="padding:26px 28px 8px;color:#2b1a14;font-size:16px;line-height:1.6;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
${righe.map((r) => `<p style="margin:0 0 14px">${r}</p>`).join("")}</td></tr>
${riquadro ? `<tr><td style="padding:4px 28px 10px"><table role="presentation" width="100%" style="background:#f6eadb;border-radius:12px;padding:14px 16px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">${blocco(riquadro)}</table></td></tr>` : ""}
${dopo ? `<tr><td style="padding:14px 28px 6px;color:#2b1a14;font-size:15px;line-height:1.6;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">${dopo.map((r) => `<p style="margin:0 0 12px">${r}</p>`).join("")}</td></tr>` : ""}
<tr><td style="padding:18px 28px 26px;color:#2b1a14;font-size:16px;font-family:Georgia,serif">${l === "de" ? "Bis bald" : "A presto"},<br><b>Christian</b><br>
<span style="color:#8a6d5a;font-size:13px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">L'Arte del Vino · ${l === "de" ? "Weinabende in Berlin" : "Serate di vino a Berlino"} · <a href="${SITO()}" style="color:#7a1230">${SITO().replace(/^https?:\/\//, "")}</a></span></td></tr>
</table>
<p style="max-width:560px;color:#a08b7c;font-size:11px;line-height:1.5;font-family:-apple-system,Helvetica,Arial,sans-serif;margin:14px auto 0">${l === "de" ? "Kleinunternehmer gemäß § 19 UStG – es wird keine Umsatzsteuer berechnet." : "Kleinunternehmer ai sensi del § 19 UStG: IVA non applicata."}</p>
</td></tr></table></body></html>`;
  const testo = [titolo, "", ...righe, "", ...(riquadro || []).map(([k, v]) => `${k}: ${v}`), "", ...(dopo || []),
    "", l === "de" ? "Bis bald," : "A presto,", "Christian", `L'Arte del Vino · ${SITO()}`]
    .map((r) => String(r).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&")).join("\n");
  return { html, testo };
}

const datiSerata = (p, l) => l === "de"
  ? [["Abend", `${serata(p, l)} – ${SOTTO.de[p.tema] || ""}`], ["Wann", `${giorno(p, l)}, ${ora(p, l)}`],
     ["Wo", `${LUOGO.nome}, ${LUOGO.via}`], ["Plätze", persone(p, l)], ["Buchungsnummer", p.rif]]
  : [["Serata", `${serata(p, l)} – ${SOTTO.it[p.tema] || ""}`], ["Quando", `${giorno(p, l)}, ${ora(p, l)}`],
     ["Dove", `${LUOGO.nome}, ${LUOGO.via}`], ["Posti", persone(p, l)], ["Prenotazione", p.rif]];

/* ================= 1. Posti tenuti, bonifico da fare ================= */
export async function mailRicevuta(p) {
  if (!p.email) return;
  const l = L(p), n = nome(p), entro = quando(p.scade, l) + (l === "de" ? " Uhr" : "");
  const m = l === "de" ? pagina(l, {
    titolo: "Deine Plätze sind reserviert",
    righe: [`Ciao ${esc(n)},`,
      `schön, dass du dabei bist! Ich habe ${posti(p, l)} für dich reserviert. Damit sie fest dir gehören, überweise bitte <b>bis ${esc(entro)}</b>.`],
    riquadro: [...datiSerata(p, l), ["Empfänger", BANCA.titolare], ["IBAN", BANCA.iban], ["BIC", BANCA.bic],
               ["Betrag", euro(p.totale, l)], ["Verwendungszweck", p.rif]],
    dopo: ["Bitte gib als Verwendungszweck nur die Buchungsnummer an – so ordne ich deine Zahlung sofort zu.",
      "Sobald das Geld da ist, bekommst du eine Bestätigung mit allen Infos zum Abend und dem Termin für deinen Kalender.",
      "Kommt bis dahin keine Überweisung an, werden die Plätze automatisch wieder frei. Du musst nichts absagen.",
      "Fragen? Antworte einfach auf diese Mail."]
  }) : pagina(l, {
    titolo: "I tuoi posti sono tenuti",
    righe: [`Ciao ${esc(n)},`,
      `che bello averti con noi! Ti ho tenuto ${posti(p, l)}. Perché siano tuoi, fai il bonifico <b>entro ${esc(entro)}</b>.`],
    riquadro: [...datiSerata(p, l), ["Intestatario", BANCA.titolare], ["IBAN", BANCA.iban], ["BIC", BANCA.bic],
               ["Importo", euro(p.totale, l)], ["Causale", p.rif]],
    dopo: ["Come causale scrivi solo il numero di prenotazione: così riconosco subito il tuo pagamento.",
      "Appena arriva, ti mando la conferma con tutte le informazioni sulla serata e l'appuntamento per il calendario.",
      "Se il bonifico non arriva entro quella data, i posti tornano liberi da soli. Non devi disdire niente.",
      "Domande? Rispondi pure a questa mail."]
  });
  await posta({ a: p.email, oggetto: l === "de" ? `Plätze reserviert · ${serata(p, l)} am ${giorno(p, l)}` : `Posti tenuti · ${serata(p, l)}, ${giorno(p, l)}`,
                testo: m.testo, html: m.html });
}

/* ================= 2. Bonifico arrivato: confermata ================= */
export async function mailConfermata(p) {
  if (!p.email) return;
  const l = L(p), n = nome(p), cond = `${SITO()}/#info/cancellazione`;
  const m = l === "de" ? pagina(l, {
    titolo: "Alles klar – wir sehen uns!",
    righe: [`Ciao ${esc(n)},`, "deine Überweisung ist angekommen, danke! Deine Buchung ist bestätigt."],
    riquadro: datiSerata(p, l),
    dopo: ["<b>So läuft der Abend</b>",
      `• <b>Anfahrt:</b> ${LUOGO.mezzi.de}.`,
      `• Komm am besten 10 Minuten früher, dann starten wir pünktlich um ${esc(p.ora)} Uhr.`,
      "• Ich führe dich durch die Weine des Abends: woher sie kommen, wie man sie verkostet und was sie besonders macht. Fragen sind ausdrücklich erwünscht – Vorwissen brauchst du keins.",
      "• Der Abend dauert etwa zweieinhalb Stunden. Danach kannst du gern noch bei Partenope bleiben, essen oder ein Glas weitertrinken.",
      "• Zeig am Eingang einfach deine Buchungsnummer, auf dem Handy reicht.",
      "Den Termin für deinen Kalender findest du im Anhang.",
      `Kommt etwas dazwischen? Bis 14 Tage vorher stornierst du kostenlos – antworte einfach auf diese Mail. Alle Bedingungen: <a href="${cond}" style="color:#7a1230">${cond.replace(/^https?:\/\//, "")}</a>`,
      "Ich freue mich auf dich!"]
  }) : pagina(l, {
    titolo: "Tutto a posto, ci vediamo!",
    righe: [`Ciao ${esc(n)},`, "il tuo bonifico è arrivato, grazie! La prenotazione è confermata."],
    riquadro: datiSerata(p, l),
    dopo: ["<b>Com'è la serata</b>",
      `• <b>Come arrivare:</b> ${LUOGO.mezzi.it}.`,
      `• Arriva una decina di minuti prima, così iniziamo puntuali alle ${esc(p.ora)}.`,
      "• Ti accompagno nei vini della serata: da dove vengono, come si degustano e cosa li rende speciali. Le domande sono benvenute, e non serve sapere niente prima.",
      "• La serata dura circa due ore e mezza. Dopo puoi restare da Partenope a cena o per un altro bicchiere.",
      "• All'ingresso basta mostrare il numero di prenotazione, anche dal telefono.",
      "In allegato trovi l'appuntamento per il calendario.",
      `Ti salta un imprevisto? Fino a 14 giorni prima la cancellazione è gratuita: rispondi a questa mail. Tutte le condizioni: <a href="${cond}" style="color:#7a1230">${cond.replace(/^https?:\/\//, "")}</a>`,
      "Non vedo l'ora di conoscerti!"]
  });
  await posta({ a: p.email, oggetto: l === "de" ? `Bestätigt · ${serata(p, l)} am ${giorno(p, l)}` : `Confermata · ${serata(p, l)}, ${giorno(p, l)}`,
                testo: m.testo, html: m.html, allegaICS: icsCliente(p, l) });
}

/* ================= 3. Annullata da te ================= */
export async function mailAnnullata(p) {
  if (!p.email) return;
  const l = L(p), n = nome(p);
  const m = l === "de" ? pagina(l, {
    titolo: "Deine Buchung wurde storniert",
    righe: [`Ciao ${esc(n)},`, `deine Buchung <b>${esc(p.rif)}</b> für den ${esc(serata(p, l))} am ${esc(giorno(p, l))} wurde storniert.`,
      "Falls du schon überwiesen hast, melde ich mich wegen der Rückzahlung bei dir.",
      `Lust auf einen anderen Abend? Alle Termine findest du auf <a href="${SITO()}" style="color:#7a1230">${SITO().replace(/^https?:\/\//, "")}</a>.`]
  }) : pagina(l, {
    titolo: "La prenotazione è stata annullata",
    righe: [`Ciao ${esc(n)},`, `la prenotazione <b>${esc(p.rif)}</b> per la ${esc(serata(p, l))} di ${esc(giorno(p, l))} è stata annullata.`,
      "Se avevi già fatto il bonifico, ti scrivo io per il rimborso.",
      `Ti va un'altra serata? Trovi tutte le date su <a href="${SITO()}" style="color:#7a1230">${SITO().replace(/^https?:\/\//, "")}</a>.`]
  });
  await posta({ a: p.email, oggetto: l === "de" ? `Storniert · Buchung ${p.rif}` : `Annullata · prenotazione ${p.rif}`, testo: m.testo, html: m.html });
}

/* ================= 4. Bonifico non arrivato: posti liberati ================= */
export async function mailScaduta(p) {
  if (!p.email || p.pagamento !== "bank") return;
  const l = L(p), n = nome(p);
  const m = l === "de" ? pagina(l, {
    titolo: "Deine Reservierung ist abgelaufen",
    righe: [`Ciao ${esc(n)},`, `für deine Reservierung <b>${esc(p.rif)}</b> (${esc(serata(p, l))}, ${esc(giorno(p, l))}) ist leider keine Überweisung angekommen. Deshalb sind die Plätze wieder frei.`,
      "Hast du schon überwiesen? Dann antworte kurz auf diese Mail, ich kläre das sofort.",
      `Du kannst jederzeit neu buchen auf <a href="${SITO()}" style="color:#7a1230">${SITO().replace(/^https?:\/\//, "")}</a>.`]
  }) : pagina(l, {
    titolo: "La prenotazione è scaduta",
    righe: [`Ciao ${esc(n)},`, `per la prenotazione <b>${esc(p.rif)}</b> (${esc(serata(p, l))}, ${esc(giorno(p, l))}) il bonifico non è arrivato, quindi i posti sono tornati liberi.`,
      "L'hai già fatto? Rispondimi a questa mail e sistemo subito.",
      `Puoi prenotare di nuovo quando vuoi su <a href="${SITO()}" style="color:#7a1230">${SITO().replace(/^https?:\/\//, "")}</a>.`]
  });
  await posta({ a: p.email, oggetto: l === "de" ? `Reservierung abgelaufen · ${p.rif}` : `Prenotazione scaduta · ${p.rif}`, testo: m.testo, html: m.html });
}

/* ================= Per te ================= */
export async function mailATeNuova(p) {
  const a = process.env.MAIL_TUA; if (!a) return;
  await posta({ a, oggetto: `Nuova · ${p.data} · ${p.persone} pers. · ${p.nome} · ${p.rif}`,
    testo: [`${NOMI.it[p.tema] || p.titolo} — ${giorno(p, "it")}, ore ${p.ora}`,
      `${persone(p, "it")} · lingua ${p.lingua}`, `${p.nome} · ${p.tel || "—"} · ${p.email || "—"}`,
      `Totale ${euro(p.totale, "it")} — bonifico da controllare, causale ${p.rif}`,
      `Scade: ${quando(p.scade, "it")}`, p.note ? `Note: ${p.note}` : "",
      "", "Quando vedi il bonifico: agenda → Confermata."].filter((x) => x !== null).join("\n") });
}
export async function mailATeConfermata(p) {
  const a = process.env.MAIL_TUA; if (!a) return;
  await posta({ a, oggetto: `Confermata · ${p.data} · ${p.persone} pers. · ${p.nome}`,
    testo: `${p.rif} — ${euro(p.totale, "it")}\n${p.nome} · ${p.tel || "—"} · ${p.email || "—"}`, allegaICS: ics(p) });
}
