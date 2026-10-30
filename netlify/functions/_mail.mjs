/* Le mail che partono verso i clienti e verso di te.
   Tutti i testi stanno qui: per cambiare una frase si tocca solo questo file.
   Ogni mail esiste in italiano, tedesco, inglese e spagnolo: la lingua è quella scelta sul sito. */

import { posta, ics, versoUTC, indirizzo } from "./_comune.mjs";

/* ---------- dati fissi ---------- */
const LUOGO = { nome: "Partenope 081", via: "Simon-Dach-Straße 39, 10245 Berlin" };
const BANCA = {
  titolare: process.env.BANCA_TITOLARE || "Christian Scognamiglio",
  iban: process.env.BANCA_IBAN || "DE86 1001 2345 0565 1323 01",
  bic: process.env.BANCA_BIC || "TRBKDEBBXXX"
};
const SITO = () => indirizzo(process.env.SITO) || "https://lartedelvino.de";
const link = (u) => `<a href="${u}" style="color:#7a1230">${u.replace(/^https?:\/\//, "")}</a>`;

/* In inglese gli orari si scrivono 6 pm, 6:30 pm. */
function ora12(o) {
  const [h, m] = String(o).split(":").map(Number);
  if (!Number.isFinite(h)) return String(o);
  const hh = h % 12 || 12, ap = h < 12 ? "am" : "pm";
  return m ? `${hh}:${String(m).padStart(2, "0")} ${ap}` : `${hh} ${ap}`;
}

/* ---------- i testi, lingua per lingua ---------- */
const X = {
  it: {
    hi: "Ciao", saluta: (n) => (n ? `Ciao ${n},` : "Ciao,"), loc: "it-IT", ora: (o) => `ore ${o}`, ciao: "A presto", firma: "Serate di vino a Berlino",
    ku: "Kleinunternehmer ai sensi del § 19 UStG: IVA non applicata.",
    nomi: { vino: "Serata Vino", bolle: "Serata Champagne", fort: "Serata Vini fortificati" },
    sotto: { vino: "rossi e bianchi a confronto", bolle: "Champagne e bollicine", fort: "Porto, Sherry e compagni" },
    pers: (n) => (n === 1 ? "1 persona" : `${n} persone`), posti: (n) => (n === 1 ? "1 posto" : `${n} posti`),
    k: { serata: "Serata", quando: "Quando", dove: "Dove", posti: "Posti", rif: "Prenotazione",
         tit: "Intestatario", imp: "Importo", caus: "Causale", ics: "Prenotazione " },
    mezzi: "U5 Frankfurter Tor oppure S+U Warschauer Straße, circa 10 minuti a piedi",
    ric: { ogg: (s, g) => `Posti bloccati · ${s}, ${g}`, tit: "Ho bloccato i tuoi posti",
      riga: (posti, entro) => `che bello averti con noi! Ti ho bloccato ${posti}. Perché diventino tuoi, fai il bonifico <b>entro ${entro}</b>.`,
      dopo: ["Come causale scrivi solo il numero di prenotazione: così riconosco subito il tuo pagamento.",
        "Appena arriva, ti mando la conferma con tutte le informazioni sulla serata e l'appuntamento per il calendario.",
        "Se il bonifico non arriva entro quella data, i posti tornano liberi da soli. Non devi disdire niente.",
        "Domande? Rispondi pure a questa mail."] },
    conf: { ogg: (s, g) => `Confermata · ${s}, ${g}`, tit: "Tutto a posto, ci vediamo!",
      riga: "il tuo bonifico è arrivato, grazie! La prenotazione è confermata.", come: "Come si svolge la serata", arr: "Come arrivare",
      prima: (o) => `Arriva una decina di minuti prima, così iniziamo puntuali alle ${o}.`,
      calici: (fort) => `Alle 18:30 arriva il primo calice, poi uno ogni mezz'ora: cinque in tutto, ${fort ? "assaggi da 50 ml" : "da 100 ml"}, l'ultimo alla cieca. Sul tavolo trovi gli stuzzichini di Partenope e l'acqua.`,
      vini: "Di ogni vino ti racconto da dove viene, come si degusta e cosa lo rende speciale. Le domande sono benvenute, e non serve sapere niente prima.",
      fine: "Alle 21:00 la degustazione finisce. Dopo puoi restare da Partenope a cena o per un altro bicchiere.",
      porta: "All'ingresso basta mostrare il numero di prenotazione, anche dal telefono.",
      cal: "In allegato trovi l'appuntamento per il calendario.",
      canc: (c) => `Hai un imprevisto? Fino a 14 giorni prima la cancellazione è gratuita: basta rispondere a questa mail. Tutte le condizioni: ${c}`,
      saluto: "Non vedo l'ora di conoscerti!" },
    ann: { ogg: (r) => `Annullata · prenotazione ${r}`, tit: "La prenotazione è stata annullata",
      riga: (r, s, g) => `la prenotazione <b>${r}</b> per la ${s} di ${g} è stata annullata.`,
      rimb: "Se avevi già fatto il bonifico, ti scrivo io per il rimborso.", altra: (u) => `Ti va un'altra serata? Trovi tutte le date su ${u}.` },
    scad: { ogg: (r) => `Prenotazione scaduta · ${r}`, tit: "La prenotazione è scaduta",
      riga: (r, s, g) => `per la prenotazione <b>${r}</b> (${s}, ${g}) il bonifico non è arrivato, quindi i posti sono tornati liberi.`,
      gia: "L'hai già fatto? Rispondi a questa mail e sistemo tutto subito.", di: (u) => `Puoi prenotare di nuovo quando vuoi su ${u}.` }
  },
  de: {
    hi: "Ciao", saluta: (n) => (n ? `Ciao ${n},` : "Hallo,"), loc: "de-DE", ora: (o) => `${o} Uhr`, ciao: "Bis bald", firma: "Weinabende in Berlin",
    ku: "Kleinunternehmer gemäß § 19 UStG – es wird keine Umsatzsteuer berechnet.",
    nomi: { vino: "Weinabend", bolle: "Champagnerabend", fort: "Likörwein-Abend" },
    sotto: { vino: "Rot und Weiß im Vergleich", bolle: "Champagner und Schaumwein", fort: "Portwein, Sherry und Co." },
    pers: (n) => (n === 1 ? "1 Person" : `${n} Personen`), posti: (n) => (n === 1 ? "1 Platz" : `${n} Plätze`),
    k: { serata: "Abend", quando: "Wann", dove: "Wo", posti: "Plätze", rif: "Buchungsnummer",
         tit: "Empfänger", imp: "Betrag", caus: "Verwendungszweck", ics: "Buchungsnummer " },
    mezzi: "U5 Frankfurter Tor oder S+U Warschauer Straße, jeweils ca. 10 Minuten zu Fuß",
    ric: { ogg: (s, g) => `Plätze reserviert · ${s} am ${g}`, tit: "Deine Plätze sind reserviert",
      riga: (posti, entro) => `schön, dass du dabei bist! Ich habe ${posti} für dich reserviert. Damit sie dir sicher sind, überweise bitte <b>bis ${entro} Uhr</b>.`,
      dopo: ["Bitte gib als Verwendungszweck nur die Buchungsnummer an – so ordne ich deine Zahlung sofort zu.",
        "Sobald das Geld da ist, bekommst du eine Bestätigung mit allen Infos zum Abend und dem Termin für deinen Kalender.",
        "Kommt bis dahin keine Überweisung an, werden die Plätze automatisch wieder frei. Du musst nichts absagen.",
        "Fragen? Antworte einfach auf diese Mail."] },
    conf: { ogg: (s, g) => `Bestätigt · ${s} am ${g}`, tit: "Alles klar – wir sehen uns!",
      riga: "deine Überweisung ist angekommen, danke! Deine Buchung ist bestätigt.", come: "So läuft der Abend ab", arr: "Anfahrt",
      prima: (o) => `Komm am besten 10 Minuten früher, dann starten wir pünktlich um ${o} Uhr.`,
      calici: (fort) => `Um 18:30 Uhr kommt das erste Glas, danach alle halbe Stunde eins: fünf insgesamt, ${fort ? "Proben à 50 ml" : "jeweils 100 ml"}, das letzte als Blindprobe. Auf dem Tisch stehen Snacks von Partenope und Wasser.`,
      vini: "Ich erzähle dir zu jedem Wein, woher er kommt, wie man ihn verkostet und was ihn besonders macht. Fragen sind ausdrücklich erwünscht – Vorwissen brauchst du keins.",
      fine: "Um 21:00 Uhr ist die Verkostung zu Ende. Danach kannst du gern noch bei Partenope bleiben – zum Essen oder auf ein weiteres Glas.",
      porta: "Am Eingang reicht es, deine Buchungsnummer zu zeigen – gern auf dem Handy.",
      cal: "Den Termin für deinen Kalender findest du im Anhang.",
      canc: (c) => `Kommt etwas dazwischen? Bis 14 Tage vorher stornierst du kostenlos – antworte einfach auf diese Mail. Alle Bedingungen: ${c}`,
      saluto: "Ich freue mich auf dich!" },
    ann: { ogg: (r) => `Storniert · Buchung ${r}`, tit: "Deine Buchung wurde storniert",
      riga: (r, s, g) => `deine Buchung <b>${r}</b> für den ${s} am ${g} wurde storniert.`,
      rimb: "Falls du schon überwiesen hast, melde ich mich wegen der Rückzahlung bei dir.", altra: (u) => `Lust auf einen anderen Abend? Alle Termine findest du auf ${u}.` },
    scad: { ogg: (r) => `Reservierung abgelaufen · ${r}`, tit: "Deine Reservierung ist abgelaufen",
      riga: (r, s, g) => `für deine Reservierung <b>${r}</b> (${s}, ${g}) ist leider keine Überweisung angekommen. Deshalb sind die Plätze wieder frei.`,
      gia: "Hast du schon überwiesen? Dann antworte kurz auf diese Mail, ich kläre das sofort.", di: (u) => `Neu buchen kannst du jederzeit auf ${u}.` }
  },
  en: {
    hi: "Hi", saluta: (n) => (n ? `Hi ${n},` : "Hi,"), loc: "en-GB", ora: (o) => ora12(o), ciao: "See you soon", firma: "Wine evenings in Berlin",
    ku: "Small business under § 19 UStG: no VAT is charged.",
    nomi: { vino: "Wine evening", bolle: "Champagne evening", fort: "Fortified wine evening" },
    sotto: { vino: "reds and whites side by side", bolle: "Champagne and sparkling wine", fort: "Port, Sherry and friends" },
    pers: (n) => (n === 1 ? "1 person" : `${n} people`), posti: (n) => (n === 1 ? "1 seat" : `${n} seats`),
    k: { serata: "Evening", quando: "When", dove: "Where", posti: "Seats", rif: "Booking",
         tit: "Account holder", imp: "Amount", caus: "Reference", ics: "Booking " },
    mezzi: "U5 Frankfurter Tor or S+U Warschauer Straße, about a 10-minute walk",
    ric: { ogg: (s, g) => `Seats on hold · ${s}, ${g}`, tit: "Your seats are on hold",
      riga: (posti, entro) => `Great to have you! I'm holding ${posti} for you. To make them yours, please make the bank transfer <b>by ${entro}</b>.`,
      dopo: ["Please use only the booking number as the payment reference, so I can match your payment straight away.",
        "As soon as it arrives, I'll send you the confirmation with everything about the evening and a calendar invite.",
        "If the transfer hasn't arrived by then, the seats are released automatically. You don't need to cancel anything.",
        "Questions? Just reply to this email."] },
    conf: { ogg: (s, g) => `Confirmed · ${s}, ${g}`, tit: "All set – see you there!",
      riga: "Your bank transfer has arrived – thank you! Your booking is confirmed.", come: "How the evening goes", arr: "Getting there",
      prima: (o) => `Arrive about ten minutes early, so we can start on time at ${ora12(o)}.`,
      calici: (fort) => `The first glass is poured at 6:30 pm, then one every half hour: five in all, ${fort ? "50 ml pours" : "100 ml each"}, the last one blind. You'll find snacks from Partenope and water on the table.`,
      vini: "For every wine I'll tell you where it comes from, how to taste it and what makes it special. Questions are very welcome, and you don't need to know anything beforehand.",
      fine: "The tasting ends at 9 pm. Afterwards you're welcome to stay at Partenope for dinner or another glass.",
      porta: "At the door, just show your booking number – on your phone is fine.",
      cal: "You'll find the calendar invite attached.",
      canc: (c) => `Something come up? Cancellation is free up to 14 days before the evening – just reply to this email. All terms: ${c}`,
      saluto: "Looking forward to meeting you!" },
    ann: { ogg: (r) => `Cancelled · booking ${r}`, tit: "Your booking has been cancelled",
      riga: (r, s, g) => `Your booking <b>${r}</b> for the ${s} on ${g} has been cancelled.`,
      rimb: "If you've already made the transfer, I'll get in touch about the refund.", altra: (u) => `Fancy another evening? You'll find all the dates at ${u}.` },
    scad: { ogg: (r) => `Booking expired · ${r}`, tit: "Your booking has expired",
      riga: (r, s, g) => `We haven't received a bank transfer for your booking <b>${r}</b> (${s}, ${g}), so the seats have been released.`,
      gia: "Already paid? Just reply to this email and I'll sort it out straight away.", di: (u) => `You can book again any time at ${u}.` }
  },
  es: {
    hi: "Hola", saluta: (n) => (n ? `Hola, ${n}:` : "Hola:"), loc: "es-ES", ora: (o) => `${o} h`, ciao: "Hasta pronto", firma: "Noches de vino en Berlín",
    ku: "Pequeño empresario según el § 19 UStG: no se aplica IVA.",
    nomi: { vino: "Noche de vino", bolle: "Noche de Champagne", fort: "Noche de vinos generosos" },
    sotto: { vino: "tintos y blancos frente a frente", bolle: "Champagne y espumosos", fort: "Oporto, Jerez y compañía" },
    pers: (n) => (n === 1 ? "1 persona" : `${n} personas`), posti: (n) => (n === 1 ? "1 plaza" : `${n} plazas`),
    k: { serata: "Noche", quando: "Cuándo", dove: "Dónde", posti: "Plazas", rif: "Reserva",
         tit: "Titular", imp: "Importe", caus: "Concepto", ics: "Reserva " },
    mezzi: "U5 Frankfurter Tor o S+U Warschauer Straße, unos 10 minutos a pie",
    ric: { ogg: (s, g) => `Plazas reservadas · ${s}, ${g}`, tit: "Tus plazas están reservadas",
      riga: (posti, entro) => `¡Qué bien que vengas! Te he reservado ${posti}. Para que sean tuyas, haz la transferencia <b>antes del ${entro}</b>.`,
      dopo: ["Como concepto escribe solo el número de reserva: así reconozco tu pago enseguida.",
        "En cuanto llegue, te envío la confirmación con toda la información de la noche y la cita para el calendario.",
        "Si la transferencia no llega antes de esa fecha, las plazas se liberan automáticamente. No tienes que cancelar nada.",
        "¿Tienes alguna pregunta? Responde a este correo."] },
    conf: { ogg: (s, g) => `Confirmada · ${s}, ${g}`, tit: "¡Todo listo, nos vemos!",
      riga: "Tu transferencia ha llegado, ¡gracias! La reserva está confirmada.", come: "Cómo es la noche", arr: "Cómo llegar",
      prima: (o) => `Llega unos diez minutos antes, así empezamos puntuales a las ${o}.`,
      calici: (fort) => `A las 18:30 llega la primera copa, luego una cada media hora: cinco en total, ${fort ? "copas de 50 ml" : "de 100 ml"}, la última a ciegas. En la mesa encuentras el picoteo de Partenope y agua.`,
      vini: "De cada vino te cuento de dónde viene, cómo se cata y qué lo hace especial. Las preguntas son bienvenidas, y no hace falta saber nada antes.",
      fine: "A las 21:00 termina la cata. Después puedes quedarte en Partenope a cenar o a tomar otra copa.",
      porta: "En la entrada basta con enseñar el número de reserva, también en el móvil.",
      cal: "Te adjunto la cita para el calendario.",
      canc: (c) => `¿Te ha surgido un imprevisto? La cancelación es gratuita hasta 14 días antes: responde a este correo. Todas las condiciones: ${c}`,
      saluto: "¡Tengo ganas de conocerte!" },
    ann: { ogg: (r) => `Cancelada · reserva ${r}`, tit: "La reserva se ha cancelado",
      riga: (r, s, g) => `La reserva <b>${r}</b> para la ${s} del ${g} se ha cancelado.`,
      rimb: "Si ya habías hecho la transferencia, te escribo para el reembolso.", altra: (u) => `¿Te apetece otra noche? Encontrarás todas las fechas en ${u}.` },
    scad: { ogg: (r) => `Reserva caducada · ${r}`, tit: "La reserva ha caducado",
      riga: (r, s, g) => `No ha llegado la transferencia de la reserva <b>${r}</b> (${s}, ${g}), así que las plazas han quedado libres.`,
      gia: "¿Ya la has hecho? Responde a este correo y lo soluciono enseguida.", di: (u) => `Puedes reservar de nuevo cuando quieras en ${u}.` }
  }
};

/* ---------- piccoli aiuti ---------- */
const L = (p) => (X[p.lingua] ? p.lingua : "it");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
/* Solo il primo nome, solo lettere: nessuno può infilare link o testo strano in una mail che parte da noi. */
const nome = (p) => (String(p.nome || "").trim().split(/\s+/)[0] || "").replace(/[^\p{L}' -]/gu, "").slice(0, 30);
const euro = (n, l) => new Intl.NumberFormat(X[l].loc, { style: "currency", currency: "EUR" }).format(Number(n) || 0);
const giorno = (p, l) => versoUTC(p.data, p.ora).toLocaleDateString(X[l].loc,
  { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" });
const quando = (iso, l) => {
  const d = new Date(iso), f = (o) => d.toLocaleString(X[l].loc, { ...o, timeZone: "Europe/Berlin" });
  if (l === "es") return `${f({ weekday: "long" })} ${f({ day: "numeric" })} de ${f({ month: "long" })} a las ${f({ hour: "2-digit", minute: "2-digit" })}`;
  if (l === "en") return f({ weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true });
  return f({ weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
};
const serata = (p, l) => X[l].nomi[p.tema] || p.titolo || X[l].nomi.vino;
const n = (p) => Number(p.persone) || 1;

/* L'invito per il calendario del cliente: niente dati privati, solo serata e luogo. */
function icsCliente(p, l) {
  return ics({ ...p, luogo: `${LUOGO.nome}, ${LUOGO.via}` }).split("\r\n").map((r) =>
    r.startsWith("SUMMARY:") ? `SUMMARY:${serata(p, l)} · L'Arte del Vino`
    : r.startsWith("DESCRIPTION:") ? `DESCRIPTION:${X[l].k.ics + p.rif}`
    : r).join("\r\n");
}

/* ---------- impaginazione comune ---------- */
function pagina(l, { titolo, righe, riquadro, dopo }) {
  const t = X[l];
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
<tr><td style="padding:18px 28px 26px;color:#2b1a14;font-size:16px;font-family:Georgia,serif">${t.ciao},<br><b>Christian</b><br>
<span style="color:#8a6d5a;font-size:13px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">L'Arte del Vino · ${t.firma} · ${link(SITO())}</span></td></tr>
</table>
<p style="max-width:560px;color:#a08b7c;font-size:11px;line-height:1.5;font-family:-apple-system,Helvetica,Arial,sans-serif;margin:14px auto 0">${t.ku}</p>
</td></tr></table></body></html>`;
  const testo = [titolo, "", ...righe, "", ...(riquadro || []).map(([k, v]) => `${k}: ${v}`), "", ...(dopo || []),
    "", t.ciao + ",", "Christian", `L'Arte del Vino · ${SITO()}`]
    .map((r) => String(r).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&")).join("\n");
  return { html, testo };
}

const datiSerata = (p, l) => {
  const t = X[l], k = t.k;
  return [[k.serata, `${serata(p, l)} – ${t.sotto[p.tema] || ""}`], [k.quando, `${giorno(p, l)}, ${t.ora(p.ora)}`],
          [k.dove, `${LUOGO.nome}, ${LUOGO.via}`], [k.posti, t.pers(n(p))], [k.rif, p.rif]];
};

/* ================= 1. Posti tenuti, bonifico da fare ================= */
export async function mailRicevuta(p) {
  if (!p.email) return;
  const l = L(p), t = X[l];
  const m = pagina(l, {
    titolo: t.ric.tit,
    righe: [t.saluta(esc(nome(p))), t.ric.riga(t.posti(n(p)), esc(quando(p.scade, l)))],
    riquadro: [...datiSerata(p, l), [t.k.tit, BANCA.titolare], ["IBAN", BANCA.iban], ["BIC", BANCA.bic],
               [t.k.imp, euro(p.totale, l)], [t.k.caus, p.rif]],
    dopo: t.ric.dopo
  });
  await posta({ a: p.email, oggetto: t.ric.ogg(serata(p, l), giorno(p, l)), testo: m.testo, html: m.html });
}

/* ================= 2. Bonifico arrivato: confermata ================= */
export async function mailConfermata(p) {
  if (!p.email) return;
  const l = L(p), t = X[l], c = t.conf;
  const m = pagina(l, {
    titolo: c.tit,
    righe: [t.saluta(esc(nome(p))), c.riga],
    riquadro: datiSerata(p, l),
    dopo: [`<b>${c.come}</b>`, `• <b>${c.arr}:</b> ${t.mezzi}.`, "• " + c.prima(esc(p.ora)), "• " + c.calici(p.tema === "fort"),
      "• " + c.vini, "• " + c.fine, "• " + c.porta, c.cal, c.canc(link(`${SITO()}/#info/cancellazione`)), c.saluto]
  });
  await posta({ a: p.email, oggetto: c.ogg(serata(p, l), giorno(p, l)), testo: m.testo, html: m.html, allegaICS: icsCliente(p, l) });
}

/* ================= 3. Annullata da te ================= */
export async function mailAnnullata(p) {
  if (!p.email) return;
  const l = L(p), a = X[l].ann, t = X[l];
  const m = pagina(l, {
    titolo: a.tit,
    righe: [t.saluta(esc(nome(p))), a.riga(esc(p.rif), esc(serata(p, l)), esc(giorno(p, l))), a.rimb, a.altra(link(SITO()))]
  });
  await posta({ a: p.email, oggetto: a.ogg(p.rif), testo: m.testo, html: m.html });
}

/* ================= 4. Bonifico non arrivato: posti liberati ================= */
export async function mailScaduta(p) {
  if (!p.email || p.pagamento !== "bank") return;
  const l = L(p), s = X[l].scad, t = X[l];
  const m = pagina(l, {
    titolo: s.tit,
    righe: [t.saluta(esc(nome(p))), s.riga(esc(p.rif), esc(serata(p, l)), esc(giorno(p, l))), s.gia, s.di(link(SITO()))]
  });
  await posta({ a: p.email, oggetto: s.ogg(p.rif), testo: m.testo, html: m.html });
}

/* ================= Per te (sempre in italiano) ================= */
export async function mailATeNuova(p) {
  const a = process.env.MAIL_TUA; if (!a) return;
  await posta({ a, oggetto: `Nuova · ${p.data} · ${p.persone} pers. · ${p.nome} · ${p.rif}`,
    testo: [`${X.it.nomi[p.tema] || p.titolo} — ${giorno(p, "it")}, ore ${p.ora}`,
      `${X.it.pers(n(p))} · lingua ${p.lingua}`, `${p.nome} · ${p.tel || "—"} · ${p.email || "—"}`,
      `Totale ${euro(p.totale, "it")} — bonifico da controllare, causale ${p.rif}`,
      `Scade: ${quando(p.scade, "it")}`, p.note ? `Note: ${p.note}` : "",
      "", "Quando vedi il bonifico: agenda → Confermata."].join("\n") });
}
export async function mailATeConfermata(p) {
  const a = process.env.MAIL_TUA; if (!a) return;
  await posta({ a, oggetto: `Confermata · ${p.data} · ${p.persone} pers. · ${p.nome}`,
    testo: `${p.rif} — ${euro(p.totale, "it")}\n${p.nome} · ${p.tel || "—"} · ${p.email || "—"}`, allegaICS: ics(p) });
}
