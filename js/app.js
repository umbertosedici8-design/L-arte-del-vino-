
/* =====================================================================
   1. TESTI IT/DE (T) · DATI · LISTINO (P) · EMAIL (MAIL)
   2. FOGLI DEL DOCK (SHEETS)
   3. LOGICA: lingua, router, scroll, builder, configuratore, form, sheet
   ===================================================================== */
const LOGO="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22v%22%3E%3Crect%20x%3D%2224%22%20y%3D%2238%22%20width%3D%2252%22%20height%3D%2220%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cpath%20d%3D%22M31.8%2026.8C31.8%2045.8%2040.3%2054.3%2050%2054.8C59.7%2054.3%2068.2%2045.8%2068.2%2026.8Z%22%20fill%3D%22%23EDC6D2%22%20clip-path%3D%22url%28%23v%29%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%237A1230%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2246%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240.5%22%20stroke-width%3D%220.75%22%2F%3E%3Cpath%20d%3D%22M31.8%2026.8C31.8%2045.8%2040.3%2054.3%2050%2054.8C59.7%2054.3%2068.2%2045.8%2068.2%2026.8%22%2F%3E%3Cpath%20d%3D%22M31.8%2026.8H68.2%22%2F%3E%3Cpath%20d%3D%22M50%2054.8V70.9%22%2F%3E%3Cpath%20d%3D%22M38.4%2073.2C38.4%2070.2%2061.6%2070.2%2061.6%2073.2%22%2F%3E%3Cpath%20d%3D%22M38.4%2073.2H61.6%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2221.2%22%20r%3D%221.5%22%20fill%3D%22%237A1230%22%2F%3E%3C%2Fsvg%3E";
const LOGO_L="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22v%22%3E%3Crect%20x%3D%2224%22%20y%3D%2238%22%20width%3D%2252%22%20height%3D%2220%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cpath%20d%3D%22M31.8%2026.8C31.8%2045.8%2040.3%2054.3%2050%2054.8C59.7%2054.3%2068.2%2045.8%2068.2%2026.8Z%22%20fill%3D%22%238E2545%22%20clip-path%3D%22url%28%23v%29%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23F0C544%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2246%22%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240.5%22%20stroke-width%3D%220.75%22%2F%3E%3Cpath%20d%3D%22M31.8%2026.8C31.8%2045.8%2040.3%2054.3%2050%2054.8C59.7%2054.3%2068.2%2045.8%2068.2%2026.8%22%2F%3E%3Cpath%20d%3D%22M31.8%2026.8H68.2%22%2F%3E%3Cpath%20d%3D%22M50%2054.8V70.9%22%2F%3E%3Cpath%20d%3D%22M38.4%2073.2C38.4%2070.2%2061.6%2070.2%2061.6%2073.2%22%2F%3E%3Cpath%20d%3D%22M38.4%2073.2H61.6%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2221.2%22%20r%3D%221.5%22%20fill%3D%22%23F0C544%22%2F%3E%3C%2Fsvg%3E";
const T={
it:{
 loading:"Un attimo, verso…",caAdded:"Nel carrello: %",caOpen:"Apri",caPill:"Passo 1 di 3 · Carrello",caT:"Cosa hai scelto",caShort:"Carrello",caS:"Aggiungi tutte le serate che vuoi: si paga una volta sola e ogni serata ha il suo biglietto.",
caMore:"Aggiungi un'altra serata",caSum:"Riepilogo",caApply:"Applica",caGo:"Vai al pagamento",caN:"Non paghi ancora nulla: al passo successivo scegli come pagare.",
caAdd:"Aggiungi al carrello",caAddConf:"Metti nel carrello",caEmpty:"Il carrello è vuoto",caEmptyS:"Scegli una serata e torna qui.",caCode:"Hai un codice?",
uPax:"a persona",uH:"all'ora",uS:"a sessione",uE:"a serata",uV:"a buono",each:"·",mkT:"Cantina, tavola, parole semplici",mkP:"Ogni serata parte dal bicchiere: si assaggia, si ragiona e alla fine si sa dire perché un vino piace.",prT2:"sulla prima prenotazione, codice attivo",prLine:"Sconto primo cliente",calT:"Il calendario delle serate",calS:"Lunedì vino, martedì Champagne, mercoledì vini fortificati, sempre alle 18:00. Tocca una data per prenotare il tuo posto.",
lgF:"posti liberi",lgL:"ultimi posti",lgO:"esaurito",calGo:"Prenota questa serata",
chatL:"Chat",chT:"Chiedi pure",chS:"Risposte rapide dalle FAQ · Christian risponde su WhatsApp",chHi:"Ciao! Ti rispondo su prezzi, date, posti e su come funzionano le serate. Cosa ti serve?",
chNo:"Questa non la so ancora. Scrivila a Christian: di solito risponde entro poche ore.",chWA:"Scrivi a Christian su WhatsApp",chPh:"Scrivi qui…",pmCard:"Carta",pmCardS:"Visa · Mastercard · Apple Pay",pmHolder:"CHRISTIAN S.",pmNum:"Numero carta",pmExp:"Scadenza",
pmCardN:"Il pagamento con carta non è ancora attivo: niente di quello che scrivi qui esce da questo telefono. Intanto puoi pagare con bonifico.",
pmPP:"PayPal",pmPPS:"veloce, dal tuo conto PayPal",pmPP1:"Premi il bottone giallo: PayPal si apre con l'importo già scritto",pmPP2:"Nella nota del pagamento scrivi il codice della prenotazione",pmPP3:"Appena ricevo il pagamento, la serata è confermata",
pmPPN:"Se organizzi tu per un gruppo, puoi pagare tutti i posti in una volta sola.",
 e_nome:"Serve almeno il nome, per sapere con chi parlo.",e_email:"Controlla l'indirizzo: manca la chiocciola o il punto.",
 e_tel:"Lascia una mail oppure un numero, uno dei due basta.",fFix:"Manca qualcosa: guarda i campi segnati.",
 mailPay:"Pagamento scelto",demoApi:"Prenotazione vera: il posto resta tuo per 48 ore, il tempo di fare il bonifico, e la serata entra in agenda da sola.",
 demoPsp:"Il pagamento con carta prosegue sulla pagina protetta del fornitore.",
 payDay:"La sera",payWho:"Chi siete",payPlace:"Dove (via e quartiere)",
 payNoDay:"Nessuna sera libera nei prossimi giorni: scrivimi e troviamo una data.",payOther:"Altre date \u2192",
 payPickDay:"Scegli prima la sera, poi i tuoi dati.",payWait:"Sto bloccando il posto\u2026",
 payTaken:"Quella sera \u00e8 appena stata presa da qualcun altro: scegline un'altra.",
 payErr:"Qualcosa non ha funzionato. Riprova, oppure scrivimi su WhatsApp.",
 payOff:"Non riesco a raggiungere il server. Controlla la rete e riprova.",
 payDone:"Pagato: la serata \u00e8 tua.",payBack:"Pagamento annullato, il posto resta libero.",
 tkAttesa:"In attesa di pagamento",tkPagato:"Pagato",
 pmHold:"Intestatario",pmHoldP:"Nome sulla carta",pmCardP:"Il pagamento prosegue sulla pagina protetta del fornitore: numero, scadenza e CVC non passano da questo sito.",
 pmAmount:"Importo",pmPPGo:"Paga con PayPal",pmPPMail:"Indirizzo PayPal di Christian",pmPPYours:"Il tuo indirizzo PayPal (facoltativo, per abbinare il pagamento)",
 giroT:"Inquadra con l'app della banca",giroS:"Il GiroCode compila da solo IBAN, importo e causale. Funziona con quasi tutte le banche tedesche.",
 giroOff:"Metti il tuo IBAN nel blocco PAGA, in cima al file, e qui comparirà il GiroCode da inquadrare.",
 payFix:"Controlla i campi segnati prima di confermare.",
 eHold:"Scrivi nome e cognome come stanno sulla carta.",eNum:"Questo numero non torna: ricontrolla le cifre.",
 eExp:"Scadenza non valida: formato MM/AA e non passata.",eCvc:"Il CVC è di 3 cifre (4 per American Express).",
 eMail:"Indirizzo non valido.",
pmBank:"Bonifico",pmBankS:"nessuna commissione",pmCopy:"copia",pmCopied:"copiato",
pmBankN:"Usa il codice come causale, così riconosco subito la tua prenotazione. Aziende e ristoranti: pagamento a 14 giorni dalla fattura.",
pmCash:"Contanti",pmCashS:"alla fine della serata",pmCash1:"Niente anticipo, niente commissioni",pmCash2:"Ricevuta e fattura sul posto",pmCash3:"Se siete in tanti, si può dividere al tavolo",
pmCashN:"È il modo più usato per le serate a casa. Porto il resto e la fattura già stampata.",pmPick:"Scelgo questo",payPill:"Passo 2 di 3 · Conferma",payH:"Come vuoi pagare",payS:"Si paga con bonifico, entro 48 ore dalla prenotazione e comunque prima della serata.",
demoF:"Paghi con bonifico: inquadri il QR con l'app della banca oppure copi i dati qui sotto. Nessun dato bancario viene salvato da questo sito.",payRec:"Il tuo riepilogo",iva2:"prezzo finale · nessuna IVA (§19 UStG)",
payWhen:"Quando",payHow:"Con cosa",payGo:"Conferma la prenotazione",payN:"Il biglietto arriva subito. La serata è confermata quando arriva il bonifico: se non arriva entro 48 ore, il posto torna libero. La fattura arriva per email.",
w1:"Tutto la sera stessa",w1s:"niente anticipo",w2:"Acconto 30 % adesso",w2s:"resto la sera",w3:"Tutto adesso",w3s:"fattura subito",
m1:"Contanti",m1s:"alla fine della serata",m2:"Bonifico",m2s:"IBAN qui sotto",m3:"PayPal",m3s:"link nella mail",m4:"Carta",m4s:"non ancora attiva",
ibanT:"Dati per il bonifico",ibanN:"Intestatario",ibanR:"Causale",
paySafeT:"Come funziona il pagamento",pay1b:"Nessun acconto: si salda in una volta sola",pay2b:"Bonifico entro 48 ore dalla prenotazione",pay3b:"Fattura sempre inclusa, con la dicitura del §19 UStG",pay4b:"Cancellazione gratuita fino a 14 giorni prima",
paySafeN:"I dati della carta non vengono né inviati né salvati da questo sito. Quando attiverò SumUp o Stripe, il pagamento con carta avverrà sulla loro pagina protetta.",
tkSave:"Salva nel telefono",wlT:"Nel portafoglio del telefono",wlP:"Come una carta d'imbarco. Richiede un pass firmato: si attiva quando il servizio è configurato.",wlN:"Nel frattempo «Salva nel telefono» mette il biglietto tra le foto, con il QR leggibile.",tkOf:"Biglietto %1 di %2",tkQtyH:"Ore",tkQtyS:"Sessioni",tkQtyE:"Serate",tkQtyV:"Buoni",
tkHeadU:"Preparazione all'esame",tkHeadS:"La vostra carta dei vini",tkHeadV:"Buono regalo",
tkInclC:"4 incontri · 24 vini · schede · glossario",tkInclE:"Conduzione · schede per gli ospiti",
tkInclU:"App di studio · quiz · simulazioni d'esame",tkInclS:"Scheda dei vostri vini · test per il team",tkInclGift:"Valido 3 anni · data a scelta",tkPill:"Passo 3 di 3 · Fatto",tkT:"Prenotazione confermata",tkS:"Mostra il codice all'arrivo, dallo schermo o stampato. Una serata, un biglietto.",
demoT:"Biglietto di esempio: il codice QR è reale e leggibile, i dati sono di prova.",
tkWhen:"Quando",tkWho:"Persone",tkWhere:"Dove",tkLang:"Lingua",tkIncl:"Incluso",tkInclV:"6 vini · calici · schede · acqua",
tkPaid:"saldo la sera stessa",tkScan:"Mostra questo codice all'arrivo",tkCal:"Aggiungi al calendario",tkPrint:"Stampa o salva in PDF",tkHome:"Torna alla home",
payLink:"Vedi il passaggio successivo (pagamento e biglietto)",langL:"Parlo quattro lingue: tocca una bandiera e la segno nella prenotazione.",langPick:"Lingua preferita: %",langNo:"Questa serata non la tengo in %",lesSoon:"Presto disponibile",pmSoon:"presto disponibile",payScaduto:"Sessione scaduta per inattivit\u00e0: i campi sono stati svuotati. Ricompilali quando sei pronto.",lesT:"Le serate, per tema",lesS:"Tre temi sono già in calendario: toccali per prenotare. Gli altri arriveranno presto.",lesN:"Scorri con il dito oppure fermalo con il puntatore.",lesGo:"Prenota questa serata",nav1:"Home",nav2:"Privati",nav3:"Ristoranti",nav4:"Info",nav5:"Richiedi",
 /* home */
 pill:"Berlino · WSET Level 2 · 4 lingue",h1a:"Il vino spiegato",h1b:"a tavola.",
 lede:"Tre serate fisse a settimana da Partenope 081: il lunedì il vino, il martedì lo Champagne, il mercoledì i vini fortificati. Quaranta posti, alle 18:00, con un sommelier che spiega senza salire in cattedra. E per ristoranti e aziende, formazione su misura.",
 cta1:"Richiedi una data",cta2:"Tutte le formule",
 b1:"Tutto incluso",b1s:"Vini, calici da degustazione, schede e acqua. Tu porti solo la curiosità.",b2:"Due ore che volano",b2s:"Un filo conduttore, nessuna lezione frontale: si assaggia, si confronta, si chiacchiera.",b3:"Nella tua lingua",b3s:"Italiano, tedesco, spagnolo o inglese: chiedi pure in quella che preferisci.",
 howT:"Come funziona",howS:"Tre passaggi e sei seduto al tavolo: niente moduli lunghi, niente sorprese sul prezzo.",
 st1:"Scegli la serata",st1p:"Lunedì vino, martedì Champagne, mercoledì vini fortificati. Scegli la data e quanti posti ti servono, da 1 a 10.",
 st2:"Paghi e ricevi il biglietto",st2p:"Paghi con bonifico entro 48 ore: inquadri il QR o copi i dati. Il biglietto con il codice arriva subito.",
 st3:"Ti siedi e assaggi",st3p:"Alle 18:00 da Partenope 081 trovi calici, schede e vini già alla temperatura giusta. Tu porti solo la voglia di assaggiare.",
 chiT:"Chi porta le bottiglie",photoPh:"Foto di Christian (ritratto verticale, 4:5)",chiTag:"WSET Level 2 Award in Wines",
 chi1:"Sono Christian, sommelier a Berlino. Lavoro in sala e dietro il banco di un'enoteca, dove conduco degustazioni guidate di vino, Champagne, birra, amari da aperitivo e vini analcolici, oltre agli abbinamenti con il Wagyu. Ho più di due anni di esperienza nella ristorazione: il servizio è il mio mestiere di ogni giorno.",
 chi2:"Insegno come ho imparato: si parte dal bicchiere, non dal manuale. Ogni concetto arriva insieme al vino che lo dimostra, e ogni domanda è benvenuta, anche quella che sembra banale.",
 chi4:"Degustazione sistematica, il metodo usato dai professionisti",chi5:"Italiano madrelingua; tedesco, spagnolo e inglese fluenti",chi6:"Materiale di studio digitale scritto da me: 29 vitigni, un glossario e oltre 200 domande di quiz",
 pickT:"Per chi è",pickS:"Due strade, due pagine: scegli la tua.",
 tz1a:"Serate di degustazione da Partenope 081",tz1b:"Corso serale in quattro incontri (presto)",tz1c:"Ripetizioni WSET 1 e 2 (presto)",tz2a:"Formazione del personale, a sessione",tz2b:"Serate a tema per i vostri clienti",tz2c:"La carta dei vini rivista insieme",
 tz1:"Per te e i tuoi amici",tz1p:"Le serate in sala del lunedì, martedì e mercoledì. Presto anche il corso in quattro incontri e le ripetizioni WSET.",tz1f:"da 49 € a persona",
 tz2:"Per ristoranti e aziende",tz2p:"Formazione del personale di sala, serate a tema per i vostri clienti, team building.",tz2f:"da 150 € a sessione",
 open:"Apri",quoT:"Chi c'è già stato",quoS:"Bigliettini lasciati dopo le serate. Scorrono da soli, oppure tocca per passare al prossimo.",galC:"Foto dalle serate da Partenope 081.",galT:"Dalle serate",galS:"Qualche foto dei tavoli, dei bicchieri e delle facce dopo il quarto vino.",
 g1:"Foto 1",g2:"Foto 2 (verticale)",g3:"Foto 3",g4:"Foto 4",g5:"Foto 5",
 bandT:"Pronto per un calice?",bandP:"Scegli la serata e prenota il tuo posto in un minuto. Per gruppi oltre 10 persone ed eventi privati scrivimi: rispondo entro 24 ore.",bandB:"Prenota un posto",
 /* privati */
 perT:"Per te e i tuoi amici",perS:"Tre serate fisse a settimana e nessun obbligo di sapere già qualcosa. Vieni da solo, in coppia o in compagnia: compleanni, cene tra colleghi, addii al nubilato.",
 p1tag:"Da Partenope 081 · 40 posti a serata",p1h:"Le serate in sala",p1p:"Lunedì vino, martedì Champagne, mercoledì vini fortificati, sempre alle 18:00. Vini, calici e schede inclusi; prenoti da 1 a 10 posti.",from:"a partire da",p1price:"a persona, vini inclusi",
 p2tag:"Corso serale · 3–8 persone",p2h:"Quattro incontri",p2p:"Otto ore in tutto: degustare con metodo, riconoscere i vitigni, capire i territori, abbinare. Ventiquattro vini nel percorso. In arrivo: scrivimi per sapere quando parte.",from2:"ciclo completo",p2price:"a persona, vini inclusi",p2go:"Vedi il programma",
 p3tag:"Uno a uno · online o dal vivo",p3h:"Ripetizioni WSET 1 e 2",p3p:"Preparazione indipendente all'esame, nella lingua che preferisci, con accesso alla mia app di studio e ai quiz. In arrivo a breve.",p3price:"all'ora · pacchetto da 5 ore 200 €",p3go:"Come funzionano",
 ust:"Prezzi finali. In base al §19 UStG non viene addebitata l'IVA (regime dei piccoli imprenditori, Kleinunternehmerregelung).",themT:"Temi per gruppi ed eventi privati",themS:"Per gruppi, aziende ed eventi su richiesta costruisco la serata su uno di questi temi, oppure sulla tua idea.",
 incT:"Cosa è incluso",inc1:"Tutti i vini della serata, già alla temperatura giusta",inc2:"Calici da degustazione, uno per ogni vino",inc3:"Schede stampate su cui prendere appunti",inc4:"Acqua, pane neutro e sputacchiera per chi guida",inc5:"Fattura regolare, anche per i regali aziendali",
 prepT:"Come si svolge la serata",prep1:"Arrivi qualche minuto prima delle 18:00: ti accolgo e ti accompagno al tuo posto",prep2:"Si assaggia un vino alla volta, ognuno con la sua storia e una domanda da risolvere insieme",prep3:"Alla fine c'è il giro alla cieca: chi indovina di più si porta a casa la gloria",
 vouT:"Regala una serata",vouP:"Un buono per un posto a una serata in sala: vale per tutte e tre, con la differenza per Champagne e fortificati. Arriva come PDF con il nome di chi lo riceve, vale tre anni e la data si sceglie dopo.",vouB:"Chiedi un buono",
 /* ristoranti */
 risT:"Per ristoranti, bar e aziende",risS:"Vengo da voi, lavoro sulla vostra carta e lascio al team strumenti che restano anche dopo la sessione.",
 r1tag:"Formazione · a sessione",r1h:"Il team di sala",r1p:"Come si presenta una bottiglia, come si consiglia, temperature e bicchieri, e come si risponde a «cosa mi consiglia?» senza improvvisare.",
 r1a:"Sessione da 2 ore (150 €) o da 4 ore (280 €)",r1b:"Fino a 8 persone, nella lingua della brigata",r1c:"Una scheda dei vostri vini che resta al locale",from3:"a partire da",r1price:"a sessione, con fattura",
 r2tag:"Evento · a serata",r2h:"Una serata per i vostri clienti",r2p:"Una degustazione a tema nel vostro locale: conduco io, voi riempite i coperti in una sera di solito tranquilla.",
 r2a:"Base: conduzione di 3–4 ore e schede stampate",r2b:"Plus: selezione dei vini dal mio fornitore e testi pronti per i vostri canali",r2c:"Tema a scelta: territorio, vitigno, bollicine o il vostro menù",from4:"base / plus",r2price:"a serata, vini esclusi",
 r3tag:"Aziende · team building",r3h:"Uffici e gruppi",r3p:"Degustazione a squadre in ufficio o in un locale partner: due ore, sei vini e una classifica finale. Funziona anche con inglese e tedesco mescolati.",
 r3a:"Da 8 a 30 persone",r3b:"Addii al nubilato e al celibato: versione con giochi",from5:"a partire da",r3price:"a persona, vini inclusi",
 leaveT:"Cosa resta al locale",leave1:"Una scheda plastificata dei vostri vini, con tre frasi per consigliare ciascuno",leave2:"Le temperature di servizio per ogni categoria della carta",leave3:"Un test di 10 domande per chi entra in squadra dopo",leave4:"Il mio numero: se un cameriere ha un dubbio prima del servizio, mi scrive",
 forT:"A chi serve davvero",for1:"Locali con una buona carta dei vini che vende poco",for2:"Brigate con molto ricambio e nuovi arrivi da formare",for3:"Sere infrasettimanali da riempire con un evento",for4:"Uffici che cercano un team building diverso dal solito bowling",
 /* configuratore */
 confT:"Fai il conto adesso",confS:"Muovi i numeri e vedi subito quanto costa. Il totale finisce già compilato nella richiesta.",
 lFormato:"Formula",oHome:"Serata in sala",oCorso:"🔒 Corso in quattro incontri (presto)",lTipo:"Tema",oTVino:"Lunedì · Vino (49 €)",oTBolle:"Martedì · Champagne (69 €)",oTFort:"Mercoledì · Vini fortificati (64 €)",lockSoon:"Presto disponibile",oTeam:"Team building / gruppo",oUno:"🔒 Ripetizioni WSET (presto)",
 lRFormato:"Servizio",oStaff:"Formazione del team",oEvening:"Serata per i clienti",lPersone:"Quante persone",lOre:"Quante ore",lVini:"Quanti vini",
 prevT:"Preventivo indicativo",noteConf:"Stima automatica e senza impegno. Per le serate in sala il prezzo è fisso; per team e gruppi dipende dai vini scelti.",ctaMail:"Usa questo totale nella richiesta",
 /* corso */
 corT:"Il corso e le ripetizioni",corS:"Otto moduli in quattro serate, oppure lezioni uno a uno per chi prepara l'esame. Entrambi in arrivo a breve.",
 progT:"Cosa si studia",progS:"Otto moduli: tutti in fila nel corso serale, oppure solo quelli che ti servono nelle ripetizioni.",
 tutT:"Come funzionano le ripetizioni",tut1:"Sessioni da 60 minuti, online o dal vivo, nella lingua in cui sosterrai l'esame",tut2:"Accesso alla mia app di studio: schede dei vitigni, glossario e quiz con oltre 200 domande",tut3:"Simulazioni d'esame a tempo, con correzione",tut4:"Pacchetto da 5 ore 200 €, ora singola 45 €",
 tempT:"Alla temperatura giusta",tempP:"Il primo errore a tavola non è la bottiglia, è il termometro. Tocca una categoria.",
 /* info */
 infT:"Le cose pratiche",infS:"Prezzi, pagamento, cancellazione, dove ci si trova e tutto quello che mi chiedono più spesso.",
 faqT:"Domande frequenti",payT:"Prezzi e pagamento",pay1:"Tutti i prezzi sono finali: niente IVA (§19 UStG, Kleinunternehmerregelung)",pay2:"Si paga con bonifico entro 48 ore dalla prenotazione, e comunque prima della serata; la fattura arriva per email",pay3:"Aziende e ristoranti: bonifico a 14 giorni dalla fattura",pay4:"Nessun acconto: paghi una volta sola",
 canT:"Se cambi idea",can1:"Fino a 14 giorni prima: cancellazione gratuita",can2:"Da 13 a 7 giorni prima: 50 %, oppure spostiamo la data senza costi",can3:"Meno di 7 giorni prima: 100 %, perché i vini sono già acquistati",can4:"Se sono io a dover annullare: rimborso completo o nuova data, scegli tu",
 zonT:"Dove ci si trova",zonP:"Le serate si tengono da Partenope 081, a Berlino, sempre alle 18:00. L'indirizzo preciso arriva insieme alla conferma. Per ristoranti e aziende vengo io da voi.",
 wsT:"Sul WSET",wsP:"Ho conseguito il WSET Level 2 Award in Wines. Non sono un WSET Approved Programme Provider: non tengo corsi né esami ufficiali WSET, e le mie ripetizioni sono una preparazione indipendente, non affiliata né approvata da WSET. Per la certificazione ufficiale, a Berlino ci si iscrive presso un provider accreditato.",
 alcT:"Sull'alcol",alcP:"Le degustazioni sono riservate ai maggiorenni. Le serate si tengono in un locale con licenza; nei vostri locali vale la vostra. Acqua e sputacchiera sono sempre sul tavolo.",
 /* contatto */
 cntT:"Scrivimi",cntP:"Per gruppi oltre 10 persone, eventi privati, ristoranti e aziende: rispondo entro 24 ore con una proposta e un prezzo fisso. Per le serate in sala puoi prenotare direttamente.",
 fName:"Nome",fTel:"Telefono / WhatsApp",fMail:"Email",fDate:"Data desiderata",fPlz:"Quartiere o locale (se vengo da voi)",fType:"Tipo di richiesta",
 ft1:"Serata in sala",ft2:"Corso serale",ft3:"Ripetizioni WSET",ft4:"Formazione del team",ft5:"Serata nel mio locale",ft6:"Team building / gruppo",ft7:"Buono regalo",
 fLang:"Lingua",fMsg:"Qualcosa in più (quante persone, tema, occasione)",fSend:"Invia la richiesta",fNote:"Il modulo apre la tua app di posta con il testo già scritto: i dati non passano da nessun server.",
 fOk:"Se l'app di posta non si è aperta, scrivimi direttamente all'indirizzo qui accanto.",chTel:"Telefono",quoteLbl:"Preventivo dal configuratore:",
 evT:"Le prossime serate",evS:"Le prossime date in calendario, con il tema della sera. Tocca per prenotare.",
 /* footer */
 fo1:"Sommelier a Berlino. Serate di degustazione, corsi e formazione per la sala, in quattro lingue.",fo2T:"Pagine",fo3T:"Legale",foAgb:"Condizioni e cancellazione",
 tot:"Totale",perPers:"a persona",iva:"prezzo finale · nessuna IVA (§19 UStG)",subj:"Richiesta",seats:"posti",evNoneT:"Nessuna data fissata al momento",evNoneP:"Le nuove date compaiono qui. Se vuoi una serata solo per il tuo gruppo, scrivimi: si organizza in pochi giorni.",evNoneB:"Scrivimi",soldout:"esaurito",mailIntro:"Ciao Christian, ti scrivo per:",
 lgVino:"lun · vino",
 lgBolle:"mar · Champagne",
 lgFort:"mer · fortificati",
 subL:"Subtotale",
 ivaL:"IVA 0 % · §19 UStG",
 ivaShort:"IVA 0 € · §19 UStG",
 tkSeats:"Posti",
 tkIncl_vino:"6 vini · calici · schede · acqua",
 tkIncl_bolle:"5 calici di bollicine · schede · acqua",
 tkIncl_fort:"5 vini fortificati · calici · schede · acqua",
 ctaBook:"Prenota un posto",
 ctaGroup:"Gruppo o evento privato",
 bandRT:"Parliamo del vostro locale?",
 bandRP:"Scrivetemi il giorno, quante persone e cosa vi serve: rispondo entro 24 ore con una proposta e un prezzo fisso.",
 bandRB:"Scrivimi",
 bandCT:"Vuoi sapere quando parte?",
 bandCP:"Il corso in quattro incontri e le ripetizioni WSET arrivano a breve. Lasciami un messaggio e ti avviso per primo.",
 bandCB:"Avvisami",
 bkT:"Prenota il tuo posto",
 bkS:"Scegli il giorno, la data e quanti siete. Quaranta posti a serata, alle 18:00 da Partenope 081.",
 bkDate:"Scegli la data",
 bkSeats:"Quanti posti",
 bkSala:"La sala: ogni calice è un posto",
 bkLeft:"% posti liberi",
 bkCap:"% posti",
 bkAdd:"Aggiungi al carrello",
 bkPick:"Scegli prima una data.",
 bkMax:"Online fino a 10 posti; per gruppi più grandi scrivimi.",
 bkNone:"Per questo tema non ci sono date in calendario: scrivimi e ti avviso.",
 bkGo:"Scegli la serata",
 gd_vino:"Lunedì",
 gd_bolle:"Martedì",
 gd_fort:"Mercoledì",
 nm_vino:"Serata Vino",
 nm_bolle:"Serata Champagne",
 nm_fort:"Serata Vini fortificati",
 nm_vinoS:"Vino",
 nm_bolleS:"Champagne",
 nm_fortS:"Fortificati",
 tf_vino:"Rossi e bianchi a confronto",
 tf_bolle:"Champagne e bollicine",
 tf_fort:"Porto, Sherry e compagni",
 tp_vino:"Sei vini in due ore: tannino, acidità, struttura e legno, per capire cosa c'è nel bicchiere e perché ti piace.",
 tp_bolle:"Cinque calici in due ore: metodo classico e Charmat, dosaggio e perlage. Champagne, Franciacorta e Sekt fianco a fianco.",
 tp_fort:"Cinque vini in novanta minuti: Porto, Sherry, Marsala e Madeira. Come nascono, quanto durano e con cosa aprirli.",
 prep4:"Domande sempre benvenute: nessuno ti interroga",
 caliceH:"Tocca il calice e fallo girare",
 caliceA:"Fai roteare il calice",
 n1:"posti a serata",
 n2:"serate a settimana",
 n3:"lingue al tavolo",
 n4:"vitigni nel mio materiale di studio",
 quizT:"Quale serata fa per te?",
 quizS:"Tre domande, dieci secondi. Alla fine ti consiglio il giorno giusto.",
 quizStep:"Domanda % di 3",
 quizRes:"La tua serata è",
 quizAgain:"Rifai il quiz",
 quizGo:"Prenota questa serata",
 aroT:"Allena il naso",
 aroS:"Otto famiglie di profumi che ritrovi nel bicchiere. Tocca uno spicchio della ruota.",
 aroIn:"Dove lo trovi",
 aroHint:"Scegli un profumo",
 aroGo:"Assaggialo il %",
 abbT:"Cosa mangi stasera?",
 abbS:"Scegli un piatto: ti dico che vino ci sta bene e in quale serata lo assaggi.",
 abbHint:"Tocca un piatto per vedere l'abbinamento.",
 colT:"Il colore racconta",
 colS:"Prima ancora del naso, l'occhio dice quanti anni ha un vino e come è stato fatto. Tocca un colore.",
 colB:"Bianchi",
 colR:"Rosati",
 colN:"Rossi",
 colHint:"Tocca una sfumatura per sapere cosa racconta.",
 raT:"La settimana in tre calici",
 raS:"Scorri: ogni sera ha il suo bicchiere, e più scendi più ne sai.",
 miT:"La serata, minuto per minuto",
 miS:"Gli orari della serata del lunedì; il mercoledì si chiude un po' prima.",
 raPiu:"Tocca per leggere tutto",
 bnBadge:"Senza commissioni · anche istantaneo",
 bnDa:"Da pagare con bonifico",
 bnS1:"Apri l'app della tua banca",
 bnS2:"Inquadra il QR oppure copia i dati",
 bnS3:"Conferma: il posto è tuo appena arriva il bonifico",
 bnQrT:"Paghi da un altro dispositivo?",
 bnQrS:"Inquadra il GiroCode con l'app della banca: IBAN, importo e causale si compilano da soli.",
 bnSave:"Salva il QR come immagine",
 bnBanks:"Funziona con Sparkasse, Volksbank, ING, DKB, Commerzbank e quasi tutte le banche tedesche.",
 bnTap:"Tocca un dato per copiarlo",
 bnScad:"Paga entro 48 ore: se il bonifico non arriva, il posto torna libero.",
 bnScadV:"La serata è vicina: paga entro oggi, prima della serata."
},
de:{
 loading:"Einen Moment, ich schenke ein…",caAdded:"%: in den Warenkorb gelegt",caOpen:"Öffnen",caPill:"Schritt 1 von 3 · Warenkorb",caT:"Deine Auswahl",caShort:"Warenkorb",caS:"Nimm so viele Abende mit, wie du willst: Du zahlst einmal, und jeder Abend bekommt sein eigenes Ticket.",
caMore:"Noch einen Abend hinzufügen",caSum:"Übersicht",caApply:"Einlösen",caGo:"Zur Zahlung",caN:"Noch wird nichts bezahlt: Im nächsten Schritt wählst du, wie du zahlst.",
caAdd:"In den Warenkorb",caAddConf:"In den Warenkorb",caEmpty:"Der Warenkorb ist leer",caEmptyS:"Wähl einen Abend aus und komm hierher zurück.",caCode:"Hast du einen Code?",
uPax:"pro Person",uH:"pro Stunde",uS:"pro Termin",uE:"pro Abend",uV:"pro Gutschein",each:"·",mkT:"Keller, Tisch, klare Worte",mkP:"Jeder Abend beginnt im Glas: probieren, einordnen und am Ende sagen können, warum einem ein Wein gefällt.",prT2:"auf die erste Buchung, Code aktiv",prLine:"Rabatt Erstbuchung",calT:"Der Kalender der Abende",calS:"Montag Wein, Dienstag Champagner, Mittwoch Likörweine, immer um 18:00 Uhr. Tipp ein Datum an, um deinen Platz zu buchen.",
lgF:"freie Plätze",lgL:"letzte Plätze",lgO:"ausgebucht",calGo:"Diesen Abend buchen",
chatL:"Chat",chT:"Frag einfach",chS:"Schnelle Antworten aus den FAQ · Christian antwortet per WhatsApp",chHi:"Hallo! Ich beantworte Fragen zu Preisen, Terminen, Plätzen und zum Ablauf der Abende. Was brauchst du?",
chNo:"Das weiß ich noch nicht. Schreib es Christian – er antwortet meist innerhalb weniger Stunden.",chWA:"Christian per WhatsApp schreiben",chPh:"Schreib hier…",pmCard:"Karte",pmCardS:"Visa · Mastercard · Apple Pay",pmHolder:"CHRISTIAN S.",pmNum:"Kartennummer",pmExp:"Gültig bis",
pmCardN:"Die Kartenzahlung ist noch nicht aktiv: Nichts von dem, was du hier eingibst, verlässt dieses Gerät. Bis dahin kannst du per Überweisung zahlen.",
pmPP:"PayPal",pmPPS:"schnell, über dein PayPal-Konto",pmPP1:"Tipp auf den gelben Button: PayPal öffnet sich mit dem Betrag bereits eingetragen",pmPP2:"Schreib den Buchungscode in die Nachricht zur Zahlung",pmPP3:"Sobald die Zahlung da ist, ist der Abend bestätigt",
pmPPN:"Wenn du für eine Gruppe organisierst, kannst du alle Plätze auf einmal bezahlen.",
 e_nome:"Mindestens der Name, damit ich weiß, mit wem ich spreche.",e_email:"Bitte die Adresse prüfen: @ oder Punkt fehlt.",
 e_tel:"Eine Mail oder eine Nummer genügt — eines von beiden.",fFix:"Da fehlt noch etwas: bitte die markierten Felder ansehen.",
 mailPay:"Gewählte Zahlung",demoApi:"Echte Buchung: Der Platz bleibt 48 Stunden für dich reserviert, Zeit genug für die Überweisung, und der Termin landet von selbst im Kalender.",
 demoPsp:"Die Kartenzahlung l\u00e4uft auf der gesch\u00fctzten Seite des Anbieters weiter.",
 payDay:"Der Abend",payWho:"Wer ihr seid",payPlace:"Wo (Stra\u00dfe und Kiez)",
 payNoDay:"In den n\u00e4chsten Tagen ist nichts frei \u2014 schreib mir, wir finden einen Termin.",payOther:"Weitere Termine \u2192",
 payPickDay:"Erst den Abend w\u00e4hlen, dann deine Daten.",payWait:"Ich halte den Platz fest\u2026",
 payTaken:"Dieser Abend wurde gerade vergeben \u2014 bitte einen anderen w\u00e4hlen.",
 payErr:"Da ist etwas schiefgegangen. Versuch es nochmal oder schreib mir per WhatsApp.",
 payOff:"Der Server ist nicht erreichbar. Netz pr\u00fcfen und nochmal versuchen.",
 payDone:"Bezahlt \u2014 der Abend geh\u00f6rt euch.",payBack:"Zahlung abgebrochen, der Platz bleibt frei.",
 tkAttesa:"Zahlung ausstehend",tkPagato:"Bezahlt",
 pmHold:"Karteninhaber",pmHoldP:"Name auf der Karte",pmCardP:"Die Zahlung läuft auf der geschützten Seite des Anbieters weiter: Nummer, Ablaufdatum und CVC berühren diese Website nicht.",
 pmAmount:"Betrag",pmPPGo:"Mit PayPal zahlen",pmPPMail:"PayPal-Adresse von Christian",pmPPYours:"Deine PayPal-Adresse (optional, zur Zuordnung der Zahlung)",
 giroT:"Mit der Banking-App scannen",giroS:"Der GiroCode füllt IBAN, Betrag und Verwendungszweck von selbst aus. Er funktioniert mit fast allen deutschen Banken.",
 giroOff:"Trag deine IBAN oben im Block PAGA ein, dann erscheint hier der GiroCode zum Scannen.",
 payFix:"Bitte die markierten Felder prüfen, bevor du bestätigst.",
 eHold:"Vor- und Nachname so schreiben, wie sie auf der Karte stehen.",eNum:"Diese Nummer stimmt nicht: bitte Ziffern prüfen.",
 eExp:"Ungültiges Datum — Format MM/JJ und nicht abgelaufen.",eCvc:"Der CVC hat 3 Ziffern (4 bei American Express).",
 eMail:"Ungültige Adresse.",
pmBank:"Überweisung",pmBankS:"ohne Gebühren",pmCopy:"kopieren",pmCopied:"kopiert",
pmBankN:"Nimm den Code als Verwendungszweck, dann ordne ich deine Buchung sofort zu. Firmen und Restaurants: Zahlung innerhalb von 14 Tagen nach Rechnung.",
pmCash:"Bar",pmCashS:"am Ende des Abends",pmCash1:"Keine Anzahlung, keine Gebühren",pmCash2:"Quittung und Rechnung vor Ort",pmCash3:"Bei größeren Gruppen könnt ihr am Tisch teilen",
pmCashN:"Der übliche Weg bei Abenden zu Hause. Ich bringe Wechselgeld und die gedruckte Rechnung mit.",pmPick:"Das nehme ich",payPill:"Schritt 2 von 3 · Bestätigung",payH:"Wie möchtest du zahlen?",payS:"Bezahlt wird per Überweisung, innerhalb von 48 Stunden nach der Buchung und in jedem Fall vor dem Abend.",
demoF:"Du zahlst per Überweisung: QR-Code mit der Banking-App scannen oder die Daten unten kopieren. Diese Website speichert keine Bankdaten.",payRec:"Deine Übersicht",iva2:"Endpreis · keine USt. (§ 19 UStG)",
payWhen:"Wann",payHow:"Womit",payGo:"Buchung bestätigen",payN:"Das Ticket kommt sofort. Bestätigt ist der Abend, sobald die Überweisung da ist: Kommt sie nicht innerhalb von 48 Stunden, wird der Platz wieder frei. Die Rechnung kommt per E-Mail.",
w1:"Alles am Abend",w1s:"keine Anzahlung",w2:"30 % Anzahlung jetzt",w2s:"Rest am Abend",w3:"Alles jetzt",w3s:"Rechnung sofort",
m1:"Bar",m1s:"am Ende des Abends",m2:"Überweisung",m2s:"IBAN unten",m3:"PayPal",m3s:"Link in der Mail",m4:"Karte",m4s:"noch nicht aktiv",
ibanT:"Daten für die Überweisung",ibanN:"Kontoinhaber",ibanR:"Verwendungszweck",
paySafeT:"So läuft die Bezahlung",pay1b:"Keine Anzahlung: einmal zahlen, fertig",pay2b:"Überweisung innerhalb von 48 Stunden nach der Buchung",pay3b:"Rechnung immer inklusive, mit Hinweis auf § 19 UStG",pay4b:"Kostenlose Stornierung bis 14 Tage vorher",
paySafeN:"Kartendaten werden von dieser Website weder gesendet noch gespeichert. Sobald SumUp oder Stripe angebunden ist, läuft die Kartenzahlung über deren geschützte Seite.",
tkSave:"Aufs Handy speichern",wlT:"In die Wallet des Handys",wlP:"Wie eine Bordkarte. Dafür braucht es einen signierten Pass: aktiv, sobald der Dienst eingerichtet ist.",wlN:"Bis dahin legt «Aufs Handy speichern» das Ticket in die Fotos — mit lesbarem QR-Code.",tkOf:"Ticket %1 von %2",tkQtyH:"Stunden",tkQtyS:"Termine",tkQtyE:"Abende",tkQtyV:"Gutscheine",
tkHeadU:"Prüfungsvorbereitung",tkHeadS:"Eure Weinkarte",tkHeadV:"Gutschein",
tkInclC:"4 Termine · 24 Weine · Bögen · Glossar",tkInclE:"Moderation · Bögen für die Gäste",
tkInclU:"Lern-App · Quiz · Prüfungssimulationen",tkInclS:"Übersicht eurer Weine · Team-Test",tkInclGift:"3 Jahre gültig · Termin frei wählbar",tkPill:"Schritt 3 von 3 · Fertig",tkT:"Buchung bestätigt",tkS:"Zeig den Code beim Ankommen, auf dem Display oder ausgedruckt. Ein Abend, ein Ticket.",
demoT:"Beispiel-Ticket: Der QR-Code ist echt und lesbar, die Daten sind Testdaten.",
tkWhen:"Wann",tkWho:"Personen",tkWhere:"Wo",tkLang:"Sprache",tkIncl:"Inklusive",tkInclV:"6 Weine · Gläser · Bögen · Wasser",
tkPaid:"Zahlung am Abend",tkScan:"Diesen Code beim Ankommen zeigen",tkCal:"Zum Kalender hinzufügen",tkPrint:"Drucken oder als PDF sichern",tkHome:"Zurück zur Startseite",
payLink:"Nächster Schritt ansehen (Zahlung und Ticket)",langL:"Ich spreche vier Sprachen: Tipp eine Flagge an, dann notiere ich sie bei der Buchung.",langPick:"Bevorzugte Sprache: %",langNo:"Diesen Abend biete ich nicht auf % an",lesSoon:"Bald verf\u00fcgbar",pmSoon:"bald verf\u00fcgbar",payScaduto:"Sitzung wegen Inaktivit\u00e4t abgelaufen \u2014 die Felder wurden geleert. Einfach neu ausf\u00fcllen.",lesT:"Die Abende nach Thema",lesS:"Drei Themen stehen schon im Kalender: antippen und buchen. Die anderen folgen bald.",lesN:"Mit dem Finger wischen oder mit dem Mauszeiger anhalten.",lesGo:"Diesen Abend buchen",nav1:"Start",nav2:"Privat",nav3:"Restaurants",nav4:"Info",nav5:"Anfragen",
 pill:"Berlin · WSET Level 2 · 4 Sprachen",h1a:"Wein, verständlich",h1b:"am Tisch.",
 lede:"Drei feste Abende pro Woche bei Partenope 081: montags Wein, dienstags Champagner, mittwochs Likörweine. Vierzig Plätze, um 18:00 Uhr, mit einem Sommelier, der erklärt, ohne zu dozieren. Und für Restaurants und Firmen: Schulungen nach Maß.",
 cta1:"Termin anfragen",cta2:"Alle Formate",
 b1:"Alles inklusive",b1s:"Weine, Verkostungsgläser, Bögen und Wasser. Du bringst nur Neugier mit.",b2:"Zwei Stunden, die fliegen",b2s:"Ein roter Faden, kein Frontalunterricht: probieren, vergleichen, plaudern.",b3:"In deiner Sprache",b3s:"Deutsch, Italienisch, Spanisch oder Englisch: Frag einfach in der Sprache, die dir liegt.",
 howT:"So läuft es ab",howS:"Drei Schritte, und du sitzt am Tisch: keine langen Formulare, keine Überraschungen beim Preis.",
 st1:"Abend wählen",st1p:"Montag Wein, Dienstag Champagner, Mittwoch Likörweine. Wähl das Datum und wie viele Plätze du brauchst, von 1 bis 10.",
 st2:"Zahlen, Ticket bekommen",st2p:"Du zahlst per Überweisung innerhalb von 48 Stunden: QR-Code scannen oder Daten kopieren. Das Ticket mit Code kommt sofort.",
 st3:"Hinsetzen und probieren",st3p:"Um 18:00 Uhr stehen bei Partenope 081 Gläser, Bögen und die Weine in der richtigen Temperatur bereit. Du bringst nur Lust aufs Probieren mit.",
 chiT:"Wer die Flaschen bringt",photoPh:"Foto von Christian (Hochformat, 4:5)",chiTag:"WSET Level 2 Award in Wines",
 chi1:"Ich bin Christian, Sommelier in Berlin. Ich arbeite im Service und hinter der Theke einer Weinhandlung und führe dort Verkostungen durch: Wein, Champagner, Bier, Aperitif-Liköre und alkoholfreie Weine, dazu Kombinationen mit Wagyu. Ich habe über zwei Jahre Erfahrung in der Gastronomie: Service ist mein tägliches Handwerk.",
 chi2:"Ich unterrichte so, wie ich gelernt habe: Wir starten im Glas, nicht im Lehrbuch. Jeder Begriff kommt mit dem Wein, der ihn zeigt, und jede Frage ist willkommen, auch die, die banal wirkt.",
 chi4:"Systematische Verkostung, die Methode der Profis",chi5:"Italienisch als Muttersprache; Deutsch, Spanisch und Englisch fließend",chi6:"Eigenes digitales Lernmaterial: 29 Rebsorten, ein Glossar und über 200 Quizfragen",
 pickT:"Für wen",pickS:"Zwei Wege, zwei Seiten: Wähl deinen.",
 tz1a:"Verkostungsabende bei Partenope 081",tz1b:"Abendkurs mit vier Terminen (bald)",tz1c:"WSET-Nachhilfe, Level 1 und 2 (bald)",tz2a:"Schulung des Personals, pro Termin",tz2b:"Themenabende für eure Gäste",tz2c:"Die Weinkarte gemeinsam überarbeiten",
 tz1:"Für dich und deine Gäste",tz1p:"Die Abende am Montag, Dienstag und Mittwoch. Bald auch der Kurs mit vier Terminen und die WSET-Nachhilfe.",tz1f:"ab 49 € pro Person",
 tz2:"Für Restaurants und Firmen",tz2p:"Schulung des Service-Teams, Themenabende für eure Gäste, Teambuilding.",tz2f:"ab 150 € pro Termin",
 open:"Öffnen",quoT:"Wer schon dabei war",quoS:"Zettel, die nach den Abenden liegen geblieben sind. Sie blättern von selbst – oder tippen, um weiterzublättern.",galC:"Fotos von den Abenden bei Partenope 081.",galT:"Von den Abenden",galS:"Ein paar Fotos von Tischen, Gläsern und Gesichtern nach dem vierten Wein.",
 g1:"Foto 1",g2:"Foto 2 (hoch)",g3:"Foto 3",g4:"Foto 4",g5:"Foto 5",
 bandT:"Lust auf ein Glas?",bandP:"Wähl den Abend und buch deinen Platz in einer Minute. Für Gruppen ab 11 Personen und private Events schreib mir: Ich antworte innerhalb von 24 Stunden.",bandB:"Platz buchen",
 perT:"Für dich und deine Freunde",perS:"Drei feste Abende pro Woche, kein Vorwissen nötig. Komm allein, zu zweit oder in Gesellschaft: Geburtstage, Abende unter Kollegen, Junggesellinnenabschiede.",
 p1tag:"Bei Partenope 081 · 40 Plätze pro Abend",p1h:"Die Abende im Saal",p1p:"Montag Wein, Dienstag Champagner, Mittwoch Likörweine, immer um 18:00 Uhr. Weine, Gläser und Bögen inklusive; du buchst 1 bis 10 Plätze.",from:"ab",p1price:"pro Person, inkl. Weine",
 p2tag:"Abendkurs · 3–8 Personen",p2h:"Vier Termine",p2p:"Acht Stunden insgesamt: mit Methode verkosten, Rebsorten erkennen, Regionen verstehen, kombinieren. 24 Weine im Kurs. Kommt bald: Schreib mir, wenn du wissen willst, wann es losgeht.",from2:"kompletter Kurs",p2price:"pro Person, inkl. Weine",p2go:"Zum Programm",
 p3tag:"Einzeln · online oder vor Ort",p3h:"Nachhilfe WSET 1 und 2",p3p:"Unabhängige Prüfungsvorbereitung in deiner Sprache, mit Zugang zu meiner Lern-App und den Quizfragen. Kommt bald.",p3price:"pro Stunde · 5er-Paket 200 €",p3go:"So läuft es",
 ust:"Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).",themT:"Themen für Gruppen und private Events",themS:"Für Gruppen, Firmen und Events auf Anfrage baue ich den Abend um eines dieser Themen – oder um deine Idee.",
 incT:"Was inklusive ist",inc1:"Alle Weine des Abends, bereits in der richtigen Temperatur",inc2:"Verkostungsgläser, eins pro Wein",inc3:"Gedruckte Bögen für deine Notizen",inc4:"Wasser, neutrales Brot und ein Spucknapf für alle, die fahren",inc5:"Ordentliche Rechnung, auch für Firmengeschenke",
 prepT:"So läuft der Abend",prep1:"Komm ein paar Minuten vor 18:00 Uhr: Ich begrüße dich und bringe dich an deinen Platz",prep2:"Wir probieren einen Wein nach dem anderen, jeder mit seiner Geschichte und einer Frage, die wir gemeinsam lösen",prep3:"Zum Schluss die Blindprobe: Wer am meisten errät, nimmt den Ruhm mit nach Hause",
 vouT:"Verschenk einen Abend",vouP:"Ein Gutschein für einen Platz an einem der Abende: gilt für alle drei, bei Champagner und Likörweinen mit Aufpreis. Kommt als PDF mit dem Namen der beschenkten Person, gilt drei Jahre, der Termin wird später gewählt.",vouB:"Gutschein anfragen",
 risT:"Für Restaurants, Bars und Firmen",risS:"Ich komme zu euch, arbeite mit eurer Weinkarte und lasse dem Team Werkzeuge da, die auch nach der Schulung bleiben.",
 r1tag:"Schulung · pro Termin",r1h:"Das Service-Team",r1p:"Eine Flasche präsentieren, empfehlen, Temperaturen und Gläser – und auf »Was empfehlen Sie?« antworten, ohne zu raten.",
 r1a:"Termin mit 2 Stunden (150 €) oder 4 Stunden (280 €)",r1b:"Bis 8 Personen, in der Sprache des Teams",r1c:"Eine Übersicht eurer Weine, die im Haus bleibt",from3:"ab",r1price:"pro Termin, mit Rechnung",
 r2tag:"Event · pro Abend",r2h:"Ein Abend für eure Gäste",r2p:"Eine Themenverkostung in eurem Lokal: Ich moderiere, ihr füllt die Plätze an einem sonst ruhigen Abend.",
 r2a:"Basis: Moderation über 3–4 Stunden, gedruckte Bögen",r2b:"Plus: Weinauswahl über meinen Lieferanten und fertige Texte für eure Kanäle",r2c:"Thema nach Wahl: Region, Rebsorte, Schaumwein oder euer Menü",from4:"Basis / Plus",r2price:"pro Abend, ohne Weine",
 r3tag:"Firmen · Teambuilding",r3h:"Büros und Gruppen",r3p:"Verkostung im Teamwettbewerb, im Büro oder in einem Partnerlokal: zwei Stunden, sechs Weine und eine Rangliste am Ende. Funktioniert auch gemischt auf Englisch und Deutsch.",
 r3a:"8 bis 30 Personen",r3b:"Junggesellinnen- und Junggesellenabschiede: Variante mit Spielen",from5:"ab",r3price:"pro Person, inkl. Weine",
 leaveT:"Was im Haus bleibt",leave1:"Eine laminierte Übersicht eurer Weine mit drei Sätzen, um jeden zu empfehlen",leave2:"Serviertemperaturen für jede Kategorie der Karte",leave3:"Ein Test mit 10 Fragen für alle, die später ins Team kommen",leave4:"Meine Nummer: Hat jemand vor dem Service eine Frage, schreibt er mir",
 forT:"Für wen es sich lohnt",for1:"Lokale mit guter Weinkarte, die wenig verkauft",for2:"Teams mit hoher Fluktuation und neuen Leuten, die eingearbeitet werden müssen",for3:"Wochentage, die ein Event füllen soll",for4:"Büros, die ein Teambuilding wollen, das kein Bowling ist",
 confT:"Preis direkt berechnen",confS:"Zahlen anpassen und den Preis sofort sehen. Die Summe landet direkt in der Anfrage.",
 lFormato:"Format",oHome:"Abend im Saal",oCorso:"🔒 Kurs mit vier Terminen (bald)",lTipo:"Thema",oTVino:"Montag · Wein (49 €)",oTBolle:"Dienstag · Champagner (69 €)",oTFort:"Mittwoch · Likörweine (64 €)",lockSoon:"Bald verfügbar",oTeam:"Teambuilding / Gruppe",oUno:"🔒 WSET-Nachhilfe (bald)",
 lRFormato:"Leistung",oStaff:"Team-Schulung",oEvening:"Abend für Gäste",lPersone:"Wie viele Personen",lOre:"Wie viele Stunden",lVini:"Wie viele Weine",
 prevT:"Unverbindliche Schätzung",noteConf:"Automatische, unverbindliche Schätzung. Für die Abende im Saal gilt ein Festpreis; bei Teams und Gruppen hängt er von den Weinen ab.",ctaMail:"Summe in die Anfrage übernehmen",
 corT:"Kurs und Nachhilfe",corS:"Acht Module an vier Abenden oder Einzelstunden für alle, die sich auf eine Prüfung vorbereiten. Beides kommt bald.",
 progT:"Was wir lernen",progS:"Acht Module: alle im Abendkurs, oder nur die, die du in der Nachhilfe brauchst.",
 tutT:"So läuft die Nachhilfe",tut1:"Einheiten à 60 Minuten, online oder vor Ort, in der Sprache deiner Prüfung",tut2:"Zugang zu meiner Lern-App: Rebsortenkarten, Glossar und Quiz mit über 200 Fragen",tut3:"Prüfungssimulationen auf Zeit, mit Korrektur",tut4:"5er-Paket 200 €, Einzelstunde 45 €",
 tempT:"Die richtige Temperatur",tempP:"Der erste Fehler am Tisch ist nicht die Flasche, sondern das Thermometer. Tipp eine Kategorie an.",
 infT:"Das Praktische",infS:"Preise, Bezahlung, Stornierung, Treffpunkt und alles, was am häufigsten gefragt wird.",
 faqT:"Häufige Fragen",payT:"Preise und Bezahlung",pay1:"Alle Preise sind Endpreise: keine USt. (§ 19 UStG, Kleinunternehmerregelung)",pay2:"Bezahlt wird per Überweisung innerhalb von 48 Stunden nach der Buchung, in jedem Fall vor dem Abend; die Rechnung kommt per E-Mail",pay3:"Firmen und Restaurants: Überweisung innerhalb von 14 Tagen nach Rechnung",pay4:"Keine Anzahlung: Du zahlst nur einmal",
 canT:"Wenn du absagen musst",can1:"Bis 14 Tage vorher: kostenlos",can2:"13 bis 7 Tage vorher: 50 %, oder wir verschieben kostenlos",can3:"Weniger als 7 Tage vorher: 100 %, weil die Weine schon gekauft sind",can4:"Wenn ich absagen muss: volle Erstattung oder neuer Termin, du entscheidest",
 zonT:"Wo wir uns treffen",zonP:"Die Abende finden bei Partenope 081 in Berlin statt, immer um 18:00 Uhr. Die genaue Adresse kommt mit der Bestätigung. Zu Restaurants und Firmen komme ich selbst.",
 wsT:"Zum WSET",wsP:"Ich habe den WSET Level 2 Award in Wines erworben. Ich bin kein WSET Approved Programme Provider: Ich biete keine offiziellen WSET-Kurse oder -Prüfungen an, und meine Nachhilfe ist eine unabhängige Vorbereitung, weder mit WSET verbunden noch von WSET genehmigt. Die offizielle Zertifizierung gibt es in Berlin bei akkreditierten Anbietern.",
 alcT:"Zum Alkohol",alcP:"Verkostungen nur für Volljährige. Die Abende finden in einem Lokal mit Konzession statt; in euren Räumen gilt eure. Wasser und Spucknapf stehen immer auf dem Tisch.",
 cntT:"Schreib mir",cntP:"Für Gruppen ab 11 Personen, private Events, Restaurants und Firmen: Innerhalb von 24 Stunden bekommst du einen Vorschlag mit Festpreis. Plätze für die Abende im Saal buchst du direkt.",
 fName:"Name",fTel:"Telefon / WhatsApp",fMail:"E-Mail",fDate:"Wunschtermin",fPlz:"Kiez oder Lokal (wenn ich zu euch komme)",fType:"Art der Anfrage",
 ft1:"Abend im Saal",ft2:"Abendkurs",ft3:"WSET-Nachhilfe",ft4:"Team-Schulung",ft5:"Abend in meinem Lokal",ft6:"Teambuilding / Gruppe",ft7:"Gutschein",
 fLang:"Sprache",fMsg:"Mehr dazu (Personenzahl, Thema, Anlass)",fSend:"Anfrage senden",fNote:"Das Formular öffnet dein Mailprogramm mit fertigem Text: Es werden keine Daten an einen Server geschickt.",
 fOk:"Falls sich dein Mailprogramm nicht geöffnet hat, schreib mir direkt an die Adresse nebenan.",chTel:"Telefon",quoteLbl:"Schätzung aus dem Rechner:",
 evT:"Die nächsten Abende",evS:"Die nächsten Termine im Kalender, mit dem Thema des Abends. Antippen und buchen.",
 fo1:"Sommelier in Berlin. Verkostungsabende, Kurse und Service-Schulungen, in vier Sprachen.",fo2T:"Seiten",fo3T:"Rechtliches",foAgb:"Bedingungen und Stornierung",
 tot:"Gesamt",perPers:"pro Person",iva:"Endpreis · keine USt. (§ 19 UStG)",subj:"Anfrage",seats:"Plätze",evNoneT:"Zurzeit kein Termin angesetzt",evNoneP:"Neue Termine erscheinen hier. Wenn du einen Abend nur für deine Gruppe willst, schreib mir: In wenigen Tagen steht er.",evNoneB:"Schreib mir",soldout:"ausgebucht",mailIntro:"Hallo Christian, ich schreibe dir wegen:",
 lgVino:"Mo · Wein",
 lgBolle:"Di · Champagner",
 lgFort:"Mi · Likörweine",
 subL:"Zwischensumme",
 ivaL:"USt. 0 % · § 19 UStG",
 ivaShort:"0 € USt. · § 19 UStG",
 tkSeats:"Plätze",
 tkIncl_vino:"6 Weine · Gläser · Bögen · Wasser",
 tkIncl_bolle:"5 Gläser Schaumwein · Bögen · Wasser",
 tkIncl_fort:"5 Likörweine · Gläser · Bögen · Wasser",
 ctaBook:"Platz buchen",
 ctaGroup:"Gruppe oder privates Event",
 bandRT:"Sprechen wir über euer Lokal?",
 bandRP:"Schreibt mir Tag, Personenzahl und was ihr braucht: Innerhalb von 24 Stunden bekommt ihr einen Vorschlag mit Festpreis.",
 bandRB:"Schreib mir",
 bandCT:"Willst du wissen, wann es losgeht?",
 bandCP:"Der Kurs mit vier Terminen und die WSET-Nachhilfe kommen bald. Schreib mir kurz, dann sage ich dir als Erstes Bescheid.",
 bandCB:"Benachrichtige mich",
 bkT:"Sichere dir deinen Platz",
 bkS:"Wähl Tag, Datum und Personenzahl. Vierzig Plätze pro Abend, um 18:00 Uhr bei Partenope 081.",
 bkDate:"Datum wählen",
 bkSeats:"Wie viele Plätze",
 bkSala:"Der Saal: Jedes Glas ist ein Platz",
 bkLeft:"noch % Plätze",
 bkCap:"% Plätze",
 bkAdd:"In den Warenkorb",
 bkPick:"Wähl zuerst ein Datum.",
 bkMax:"Online bis zu 10 Plätze; für größere Gruppen schreib mir.",
 bkNone:"Für dieses Thema steht gerade kein Datum im Kalender: Schreib mir, ich sage dir Bescheid.",
 bkGo:"Abend auswählen",
 gd_vino:"Montag",
 gd_bolle:"Dienstag",
 gd_fort:"Mittwoch",
 nm_vino:"Weinabend",
 nm_bolle:"Champagnerabend",
 nm_fort:"Likörwein-Abend",
 nm_vinoS:"Wein",
 nm_bolleS:"Champagner",
 nm_fortS:"Likörweine",
 tf_vino:"Rot und Weiß im Vergleich",
 tf_bolle:"Champagner und Schaumwein",
 tf_fort:"Portwein, Sherry und Co",
 tp_vino:"Sechs Weine in zwei Stunden: Tannin, Säure, Struktur und Holz, damit du verstehst, was im Glas ist und warum es dir schmeckt.",
 tp_bolle:"Fünf Gläser in zwei Stunden: traditionelle Methode und Tankgärung, Dosage und Perlage. Champagner, Franciacorta und Sekt nebeneinander.",
 tp_fort:"Fünf Weine in neunzig Minuten: Portwein, Sherry, Marsala und Madeira. Wie sie entstehen, wie lange sie halten und wozu man sie öffnet.",
 prep4:"Fragen sind immer willkommen: Niemand wird abgefragt",
 caliceH:"Tipp das Glas an und schwenk es",
 caliceA:"Das Glas schwenken",
 n1:"Plätze pro Abend",
 n2:"Abende pro Woche",
 n3:"Sprachen am Tisch",
 n4:"Rebsorten in meinem Lernmaterial",
 quizT:"Welcher Abend passt zu dir?",
 quizS:"Drei Fragen, zehn Sekunden. Am Ende empfehle ich dir den richtigen Tag.",
 quizStep:"Frage % von 3",
 quizRes:"Dein Abend ist",
 quizAgain:"Quiz neu starten",
 quizGo:"Diesen Abend buchen",
 aroT:"Trainier deine Nase",
 aroS:"Acht Aromafamilien, die du im Glas wiederfindest. Tipp ein Segment des Rads an.",
 aroIn:"Wo du es findest",
 aroHint:"Wähl ein Aroma",
 aroGo:"Probier es am %",
 abbT:"Was isst du heute Abend?",
 abbS:"Wähl ein Gericht: Ich sage dir, welcher Wein dazu passt und an welchem Abend du ihn probierst.",
 abbHint:"Tipp ein Gericht an, um die Kombination zu sehen.",
 colT:"Die Farbe erzählt",
 colS:"Noch vor der Nase verrät das Auge, wie alt ein Wein ist und wie er gemacht wurde. Tipp eine Farbe an.",
 colB:"Weißweine",
 colR:"Rosés",
 colN:"Rotweine",
 colHint:"Tipp eine Nuance an, um zu erfahren, was sie verrät.",
 raT:"Die Woche in drei Gläsern",
 raS:"Scroll weiter: Jeder Abend hat sein Glas, und je weiter du kommst, desto mehr erfährst du.",
 miT:"Der Abend, Minute für Minute",
 miS:"Die Zeiten des Montagsabends; mittwochs ist früher Schluss.",
 raPiu:"Antippen, um alles zu lesen",
 bnBadge:"Ohne Gebühren · auch in Echtzeit",
 bnDa:"Per Überweisung zu zahlen",
 bnS1:"Öffne deine Banking-App",
 bnS2:"QR-Code scannen oder Daten kopieren",
 bnS3:"Bestätigen: Der Platz gehört dir, sobald das Geld da ist",
 bnQrT:"Zahlst du mit einem anderen Gerät?",
 bnQrS:"Scanne den GiroCode mit deiner Banking-App: IBAN, Betrag und Verwendungszweck werden automatisch ausgefüllt.",
 bnSave:"QR-Code als Bild speichern",
 bnBanks:"Funktioniert mit Sparkasse, Volksbank, ING, DKB, Commerzbank und fast allen deutschen Banken.",
 bnTap:"Zum Kopieren einen Wert antippen",
 bnScad:"Zahle innerhalb von 48 Stunden: Kommt die Überweisung nicht, wird der Platz wieder frei.",
 bnScadV:"Der Abend ist bald: Bitte heute zahlen, vor dem Abend."
}};

/* ---------------- DATI ---------------- */
const THEMES={it:["Italia in sei bicchieri","Riesling contro tutti","Bollicine: Champagne, Franciacorta, Sekt","Vecchio e nuovo mondo","Rossi del Sud","Vini naturali senza pregiudizi","Alla cieca: gioco a squadre","Vino e formaggi","Analcolici che non fanno pena"],
de:["Italien in sechs Gläsern","Riesling gegen alle","Schaumwein: Champagner, Franciacorta, Sekt","Alte und neue Welt","Rotweine aus dem Süden","Naturwein ohne Vorurteile","Blindprobe im Teamspiel","Wein und Käse","Alkoholfrei, das schmeckt"]};

/* SEGNAPOSTO: sostituire con recensioni vere prima di pubblicare */
const QUOTES={it:[
["Non sapevo distinguere un Pinot da un Merlot. Dopo due ore di degustazione lo sapevo, e ho anche vinto il giro alla cieca.","[Nome], compleanno a Neukölln"],
["Ha preso la nostra carta e ce l'ha spiegata meglio di chi l'aveva scritta. Il team consiglia di più e con meno paura.","[Nome], gestore, ristorante a Kreuzberg"],
["Ripetizioni in tedesco per il WSET 2 mentre studiavo in inglese: mi ha fatto capire i termini nelle due lingue. Passato.","[Nome], WSET Level 2"],
["Abbiamo fatto l'addio al nubilato con la degustazione alla cieca. Nessuno guardava il telefono per due ore, cosa rara.","[Nome], serata tra amiche a Friedrichshain"],
["Serata Champagne nel nostro locale di martedì: sala piena e sei bottiglie vendute anche dopo.","[Nome], bar a Mitte"],
["Pensavo fosse roba da intenditori. Invece si ride, si assaggia e alla fine sai dire perché un vino ti piace.","[Nome], prima degustazione"]],
de:[
["Ich konnte Pinot nicht von Merlot unterscheiden. Nach zwei Stunden bei der Verkostung schon, und die Blindprobe habe ich auch gewonnen.","[Name], Geburtstag in Neukölln"],
["Er hat unsere Karte genommen und sie uns besser erklärt als der, der sie geschrieben hat. Das Team empfiehlt mehr und mit weniger Angst.","[Name], Betreiber, Restaurant in Kreuzberg"],
["Nachhilfe auf Deutsch für WSET 2, während ich auf Englisch gelernt habe: Er hat mir die Begriffe in beiden Sprachen erklärt. Bestanden.","[Name], WSET Level 2"],
["Wir haben den JGA mit einer Blindprobe gemacht. Zwei Stunden lang hat niemand aufs Handy geschaut — selten.","[Name], Mädelsabend in Friedrichshain"],
["Champagner-Abend bei uns an einem Dienstag: volles Haus und danach noch sechs Flaschen verkauft.","[Name], Bar in Mitte"],
["Ich dachte, das sei was für Kenner. Stattdessen wird gelacht, probiert — und am Ende kannst du sagen, warum dir ein Wein schmeckt.","[Name], erste Verkostung"]]};
/* SEGNAPOSTO: aggiornare a mano. seats=0 → esaurito */
const MESI={it:["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],
            de:["Jan","Feb","M\u00e4r","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]};
const MOD={it:[["Degustare con metodo","Vista, olfatto, gusto, equilibrio. Come si scrive una nota di degustazione che serve davvero e come si allena il naso."],
["I vitigni bianchi","Riesling, Chardonnay, Sauvignon Blanc, Pinot Grigio, Grüner Veltliner, Vermentino: cosa si riconosce nel bicchiere e perché."],
["I vitigni rossi","Pinot Nero, Nebbiolo, Sangiovese, Cabernet Sauvignon, Merlot, Syrah, Tempranillo, Aglianico: tannino, acidità, struttura."],
["Il posto conta","Clima, suolo, altitudine. Perché lo stesso vitigno cambia faccia tra Mosella, Alto Adige, Borgogna e Sicilia."],
["Dalla vigna alla bottiglia","Fermentazione, legno, malolattica, lieviti, zucchero residuo: cosa decide il produttore e come lo senti."],
["Bollicine e vini dolci","Metodo classico e Charmat, Sekt e Champagne, vendemmia tardiva, Porto e Sherry."],
["Servizio","Temperature, decantazione, bicchieri, ordine di servizio, gestione del vino al bicchiere e delle bottiglie aperte."],
["Cibo e vino","Le poche regole che funzionano, gli abbinamenti che si rompono, come si costruisce un menù in accordo con la carta."]],
de:[["Systematisch verkosten","Auge, Nase, Gaumen, Balance. Wie man einen brauchbaren Verkostungsbogen schreibt und die Nase trainiert."],
["Weiße Rebsorten","Riesling, Chardonnay, Sauvignon Blanc, Grauburgunder, Grüner Veltliner, Vermentino: was man im Glas erkennt und warum."],
["Rote Rebsorten","Spätburgunder, Nebbiolo, Sangiovese, Cabernet Sauvignon, Merlot, Syrah, Tempranillo, Aglianico: Tannin, Säure, Struktur."],
["Herkunft zählt","Klima, Boden, Höhe. Warum dieselbe Rebsorte an der Mosel, in Südtirol, im Burgund und auf Sizilien anders schmeckt."],
["Vom Weinberg in die Flasche","Gärung, Holz, Malolaktik, Hefe, Restzucker: welche Entscheidungen man im Glas wiederfindet."],
["Schaumwein und Süßwein","Traditionelle Methode und Tankgärung, Sekt und Champagner, Spätlese, Portwein und Sherry."],
["Service","Temperaturen, Dekantieren, Gläser, Reihenfolge, offener Wein und angebrochene Flaschen."],
["Wein und Essen","Die Regeln, die funktionieren, die typischen Fehlgriffe und wie Menü und Weinkarte zusammenpassen."]]};

const FAQ={it:[["Quanto vino si beve davvero?", "Assaggi da circa 50–60 ml: in tutto meno di mezza bottiglia a testa. Acqua e sputacchiera sono sempre sul tavolo, per chi guida."], ["Devo già sapere qualcosa di vino?", "No. Le serate sono pensate per chi parte da zero; chi ne sa di più trova comunque qualcosa da scoprire, soprattutto nel giro alla cieca."], ["Posso venire da solo?", "Certo. Le serate in sala sono aperte a tutti: ti siedi con altri curiosi e, dopo il primo calice, la conversazione parte da sola."], ["Quanti posti posso prenotare?", "Online da 1 a 10 posti per prenotazione; ogni serata ne ha 40 in tutto. Per gruppi più grandi o una serata solo per voi, scrivimi."], ["Che differenza c'è tra lunedì, martedì e mercoledì?", "Il lunedì si assaggiano vini fermi, rossi e bianchi; il martedì Champagne e altre bollicine; il mercoledì vini fortificati come Porto e Sherry. Cambia il tema, non lo stile: si assaggia e si capisce."], ["Devo portare qualcosa?", "Niente. Bottiglie, calici e schede sono già sul tavolo da Partenope 081. L'indirizzo preciso arriva con la conferma."], ["In che lingua si parla?", "Parlo italiano, tedesco, spagnolo e inglese: le domande sono benvenute in tutte e quattro."], ["Come si paga?","Con bonifico, entro 48 ore dalla prenotazione e comunque prima della serata: inquadri il QR con l'app della banca oppure copi i dati. Nessun acconto, nessuna commissione, fattura regolare. L'IVA non viene addebitata (§19 UStG)."], ["E se devo cancellare?", "Gratis fino a 14 giorni prima, 50 % fino a 7 giorni prima, poi 100 %, perché i vini sono già acquistati. Spostare la data è sempre gratuito, se me lo dici per tempo."], ["Sei un insegnante WSET ufficiale?", "No. Ho il WSET Level 2 e preparo agli esami in modo indipendente. L'esame si sostiene presso un provider accreditato: io ti aiuto ad arrivarci pronto."], ["Venite anche nel nostro locale o in ufficio?", "Sì: formazione del personale, serate per i vostri clienti e team building si fanno da voi, in tutta Berlino. Fuori città su richiesta."]],
de:[["Wie viel Wein trinkt man wirklich?", "Proben von etwa 50–60 ml: insgesamt weniger als eine halbe Flasche pro Person. Wasser und Spucknapf stehen immer bereit, für alle, die fahren."], ["Muss ich schon etwas über Wein wissen?", "Nein. Die Abende sind für Einsteiger gedacht; wer mehr weiß, entdeckt trotzdem etwas Neues, vor allem bei der Blindprobe."], ["Kann ich auch allein kommen?", "Natürlich. Die Abende im Saal sind offen für alle: Du sitzt mit anderen Neugierigen am Tisch, und nach dem ersten Glas läuft das Gespräch von selbst."], ["Wie viele Plätze kann ich buchen?", "Online 1 bis 10 Plätze pro Buchung; jeder Abend hat insgesamt 40. Für größere Gruppen oder einen Abend nur für euch schreib mir."], ["Was ist der Unterschied zwischen Montag, Dienstag und Mittwoch?", "Montags gibt es Stillweine, rot und weiß; dienstags Champagner und andere Schaumweine; mittwochs Likörweine wie Portwein und Sherry. Das Thema wechselt, der Stil nicht: probieren und verstehen."], ["Muss ich etwas mitbringen?", "Nichts. Flaschen, Gläser und Bögen stehen bei Partenope 081 schon auf dem Tisch. Die genaue Adresse kommt mit der Bestätigung."], ["In welcher Sprache wird gesprochen?", "Ich spreche Deutsch, Italienisch, Spanisch und Englisch: Fragen sind in allen vier willkommen."], ["Wie wird bezahlt?","Per Überweisung, innerhalb von 48 Stunden nach der Buchung und in jedem Fall vor dem Abend: QR-Code mit der Banking-App scannen oder Daten kopieren. Keine Anzahlung, keine Gebühren, ordentliche Rechnung. Umsatzsteuer wird nicht berechnet (§ 19 UStG)."], ["Und wenn ich absagen muss?", "Kostenlos bis 14 Tage vorher, 50 % bis 7 Tage vorher, danach 100 %, weil die Weine schon gekauft sind. Verschieben ist immer kostenlos, wenn du rechtzeitig Bescheid gibst."], ["Bist du ein offizieller WSET-Lehrer?", "Nein. Ich habe WSET Level 2 und bereite unabhängig auf die Prüfungen vor. Die Prüfung legst du bei einem akkreditierten Anbieter ab – ich helfe dir, gut vorbereitet hinzugehen."], ["Kommst du auch in unser Lokal oder Büro?", "Ja: Schulungen, Abende für eure Gäste und Teambuilding finden bei euch statt, in ganz Berlin. Außerhalb auf Anfrage."]]};


/* Lezioni del carosello: icona, titolo, riga, durata/vini */
/* ultimo valore: true = lezione attiva, false = lucchetto (cambia solo quello per aprirne una) */
const LESSONS={
 /* L'ultimo valore dice se la serata e' prenotabile: true = aperta,
    false = lucchetto e cartellino "presto". Aperte: vino (lun),
    Champagne (mar), fortificati (mer). */
 it:[
 ["calice", "Vino · lunedì", "Rossi e bianchi a confronto: tannino, acidità, struttura, legno. Come si capisce cosa c'è nel bicchiere.", "2 h · 6 vini · 49 €", "it de en es", 1, true],
 ["bolle", "Champagne · martedì", "Metodo classico e Charmat, dosaggio, perlage: Champagne, Franciacorta e Sekt.", "2 h · 5 calici · 69 €", "it de en es", 2, true],
 ["dolce", "Vini fortificati · mercoledì", "Porto, Sherry, Marsala, Madeira: come nascono, quando aprirli e con cosa.", "90 min · 5 vini · 64 €", "it de en es", 3, true],
 ["cibo", "Vino e cibo", "Le regole che reggono e gli abbinamenti che si rompono.", "2 h · 6 vini", "it de en es", 2, false],
 ["rose", "Rosé", "Salasso o pressatura diretta: come nasce e come si abbina.", "90 min · 4 vini", "it de en", 1, false],
 ["birra", "Birra", "Luppolo, malto, lieviti: stili tedeschi e italiani a confronto.", "2 h · 6 birre", "it de en", 1, false],
 ["zero", "Analcolici", "Vini dealcolati, kombucha, infusi: cosa funziona davvero.", "90 min · 5 bicchieri", "it de en", 1, false]],
 de:[
 ["calice", "Wein · Montag", "Rot und Weiß im Vergleich: Tannin, Säure, Struktur, Holz. Wie man erkennt, was im Glas ist.", "2 Std · 6 Weine · 49 €", "it de en es", 1, true],
 ["bolle", "Champagner · Dienstag", "Traditionelle Methode und Tankgärung, Dosage, Perlage: Champagner, Franciacorta und Sekt.", "2 Std · 5 Gläser · 69 €", "it de en es", 2, true],
 ["dolce", "Likörweine · Mittwoch", "Portwein, Sherry, Marsala, Madeira: wie sie entstehen, wann man sie öffnet und wozu.", "90 Min · 5 Weine · 64 €", "it de en es", 3, true],
 ["cibo", "Wein und Essen", "Die Regeln, die halten, und die Kombinationen, die kippen.", "2 Std · 6 Weine", "it de en es", 2, false],
 ["rose", "Rosé", "Saignée oder Direktpressung: wie er entsteht und wozu er passt.", "90 Min · 4 Weine", "it de en", 1, false],
 ["birra", "Bier", "Hopfen, Malz, Hefe: deutsche und italienische Stile im Vergleich.", "2 Std · 6 Biere", "it de en", 1, false],
 ["zero", "Alkoholfrei", "Entalkoholisierte Weine, Kombucha, Aufgüsse: was wirklich funktioniert.", "90 Min · 5 Gläser", "it de en", 1, false]]};
const FLAG={
 it:'<svg viewBox="0 0 9 6"><rect width="3" height="6" fill="#008C45"/><rect x="3" width="3" height="6" fill="#F4F5F0"/><rect x="6" width="3" height="6" fill="#CD212A"/></svg>',
 de:'<svg viewBox="0 0 9 6"><rect width="9" height="2" fill="#000"/><rect y="2" width="9" height="2" fill="#DD0000"/><rect y="4" width="9" height="2" fill="#FFCE00"/></svg>',
 en:'<svg viewBox="0 0 9 6"><rect width="9" height="6" fill="#012169"/><path d="M0 0 9 6M9 0 0 6" stroke="#fff" stroke-width="1.2"/><path d="M0 0 9 6M9 0 0 6" stroke="#C8102E" stroke-width=".7"/><path d="M4.5 0v6M0 3h9" stroke="#fff" stroke-width="2"/><path d="M4.5 0v6M0 3h9" stroke="#C8102E" stroke-width="1.2"/></svg>',
 es:'<svg viewBox="0 0 9 6"><rect width="9" height="6" fill="#AA151B"/><rect y="1.5" width="9" height="3" fill="#F1BF00"/></svg>'};
const LNAME={it:{it:"italiano",de:"tedesco",en:"inglese",es:"spagnolo"},de:{it:"Italienisch",de:"Deutsch",en:"Englisch",es:"Spanisch"}};
const LVL={it:["Per iniziare","Un passo avanti","Per chi ne sa"],de:["Zum Einstieg","Einen Schritt weiter","Für Kenner"]};
const LIDX={it:0,de:1,en:2,es:3};   /* posizione nella select del modulo */
let tasting=null,shuffle=null;
function flags(codes){
  const c=codes.split(" ");
  return `<span class="stack" data-codes="${codes}" role="group">`+c.map(x=>`<button type="button" class="flag" data-code="${x}" title="${LNAME[lang][x]}" aria-label="${LNAME[lang][x]}">${FLAG[x]}</button>`).join("")+`</span>`;
}
/* ordine visivo della pila: la scelta (o la prima del ciclo) sta davanti */
function layStacks(step){
  $$(".stack").forEach(s=>{
    const f=[...s.children],n=f.length;
    const first=tasting&&f.some(x=>x.dataset.code===tasting)?f.findIndex(x=>x.dataset.code===tasting):step%n;
    f.forEach((el,i)=>{
      const pos=(i-first+n)%n;
      el.style.transform=`translateX(${pos*17}px) translateY(${pos*-1}px) scale(${1-pos*.07}) rotate(${pos*2.5}deg)`;
      el.style.zIndex=n-pos;el.style.opacity=1-pos*.13;
      el.classList.toggle("front",pos===0);
      el.classList.toggle("picked",!!tasting&&el.dataset.code===tasting);
    });
    s.style.width=(26+(n-1)*17)+"px";
    const has=!tasting||s.dataset.codes.split(" ").includes(tasting);
    s.classList.toggle("nolang",!has);
    const host=s.closest(".lesson,.card");if(host)host.classList.toggle("dim",!has);
    if(!has)s.title=T[lang].langNo.replace("%",LNAME[lang][tasting]);else s.removeAttribute("title");
  });
}
function pickTasting(code){
  tasting=code;clearInterval(shuffle);shuffle=null;
  const sel=$("#flang");if(sel)sel.selectedIndex=LIDX[code];
  store.set("tasting",code);refreshSelects();
  $$("[data-pick]").forEach(el=>{el.textContent=T[lang].langPick.replace("%",LNAME[lang][code]);el.classList.add("on");});
  layStacks(0);
}
document.addEventListener("click",e=>{const b=e.target.closest(".flag");if(!b)return;e.preventDefault();pickTasting(b.dataset.code);});
function startShuffle(){
  clearInterval(shuffle);if(tasting)return;
  let s=0;layStacks(s);shuffle=setInterval(()=>layStacks(++s),2200);
}
function level(n){return `<span class="lvl" title="${LVL[lang][n-1]}">`+[1,2,3].map(i=>`<b class="${i<=n?'on':''}"></b>`).join("")+`<em>${LVL[lang][n-1]}</em></span>`;}
const LICON={
 calice:'<path class="liq" d="M8.1 6.2h7.8l-.8 4a3.7 3.7 0 0 1-6.2 0Z" fill="currentColor" stroke="none"/><path d="M7 3h10l-1.2 7.2a3.8 3.8 0 0 1-7.6 0ZM12 14v6M8.5 20h7"/>',
 "calice-b":'<path class="liq" d="M8.1 6.2h7.8l-.8 4a3.7 3.7 0 0 1-6.2 0Z" fill="currentColor" opacity=".32" stroke="none"/><path d="M7 3h10l-1.2 7.2a3.8 3.8 0 0 1-7.6 0ZM12 14v6M8.5 20h7"/>',
 bolle:'<path d="M9.5 2h5v3.6l1.2 3V20a2 2 0 0 1-2 2h-3.4a2 2 0 0 1-2-2V8.6l1.2-3Z"/><path d="M8.3 12h7.4"/><circle class="b1" cx="11" cy="18" r="1"/><circle class="b2" cx="13.4" cy="18" r=".8"/><circle class="b3" cx="12.1" cy="18" r=".6"/>',
 rose:'<path class="liq" d="M8.1 6.2h7.8l-.8 4a3.7 3.7 0 0 1-6.2 0Z" fill="currentColor" opacity=".55" stroke="none"/><path d="M7 3h10l-1.2 7.2a3.8 3.8 0 0 1-7.6 0ZM12 14v6M8.5 20h7"/>',
 birra:'<path class="liq" d="M6 11h9v8.6H6Z" fill="currentColor" opacity=".28" stroke="none"/><path d="M5 7h11v13H5z"/><path d="M16 10h2.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H16"/><path class="foam" d="M8 4.6a2 2 0 0 1 3 0 2 2 0 0 1 3 0 2 2 0 0 1 1 2.4H7a2 2 0 0 1 1-2.4Z"/><circle class="b1" cx="8.6" cy="17" r=".7"/><circle class="b2" cx="12.4" cy="17" r=".6"/>',
 dolce:'<path class="liq" d="M6.2 13h11.6l-1.3 6.6H7.5Z" fill="currentColor" opacity=".35" stroke="none"/><path d="M5 10h14l-2 10H7Z"/><path class="cork" d="M9.6 10V7.2a2.4 2.4 0 0 1 4.8 0V10"/>',
 zero:'<circle cx="12" cy="12" r="9"/><path class="slash" d="M6.2 17.8 17.8 6.2" stroke-dasharray="17" stroke-dashoffset="0"/>',
 cibo:'<g class="fork"><path d="M7 3v8a2 2 0 0 0 2 2v8M7 3v5M11 3v5M11 3v8a2 2 0 0 1-2 2"/></g><g class="knife"><path d="M17 3c-1.6 1-2.4 3-2.4 6 0 1.8 1 2.6 2.4 3v9"/></g>'};
const TEMPS={it:[["Spumante",6,8],["Bianco leggero",7,10],["Bianco strutturato",10,13],["Rosé",8,10],["Rosso leggero",12,14],["Rosso strutturato",15,18],["Dolce",6,9],["Fortificati",12,16]],
de:[["Schaumwein",6,8],["Leichter Weißwein",7,10],["Kräftiger Weißwein",10,13],["Rosé",8,10],["Leichter Rotwein",12,14],["Kräftiger Rotwein",15,18],["Süßwein",6,9],["Likörwein",12,16]]};

/* Listino: cambia qui e si aggiorna tutto il calcolo */
const P={home:49,homeBolle:69,homeFort:64,homeMin:1,extraWine:5,corso:179,team:55,teamMin:8,uno:45,uno5:200,
 staff2h:150,staff4h:280,staffHour:65,staffExtraPax:10,eveningBase:290,eveningPlus:390,ristWine:9};

const MAIL="christian@lartedelvino.de";

/* ---------------- DOVE TI PAGANO (da compilare) ----------------
   Il bonifico e PayPal funzionano subito, appena metti i tuoi dati qui.
   La carta ha bisogno di un fornitore: vedi PSP_URL più sotto. */
const PAGA={
  titolare :"Christian Scognamiglio",
  iban     :"DE86 1001 2345 0565 1323 01",   /* Trade Republic Bank */
  bic      :"TRBKDEBBXXX", /* facoltativo, serve solo fuori dall'area SEPA */
  paypal   :"",            /* solo il nome utente di paypal.me, es. "christianvino" */
  paypalMail:""            /* oppure l'indirizzo del tuo conto PayPal */
};
/* API: l'indirizzo delle funzioni che tengono l'agenda (cartella server-prenotazioni).
   Con "/api" il sito prenota da solo: blocca il posto, incassa, segna la serata
   e manda le mail. Lasciandolo a null il sito resta com'era, tutto a mano. */
const API="/api";

/* PSP_URL: quando apri un conto SumUp, Stripe o Mollie, metti qui l'indirizzo
   della loro pagina di pagamento. Il bottone della carta porterà lì, con importo
   e numero di prenotazione già scritti, e i dati della carta non passeranno da qui. */
const PSP_URL=null;


/* ---------------- UTILITÀ + LINGUA ---------------- */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* Disinnesca il testo scritto da chiunque prima di metterlo nella pagina.
   I cinque caratteri qui sotto sono quelli con cui si apre un tag o si esce
   da un attributo: trasformati in entità diventano lettere e basta. */
const esc=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------------- FOTO CHE NON ARRIVANO ----------------
   Quando una foto non si carica il browser mostra l'icona rotta, che è
   bruttissima. Questo ascoltatore parte prima di tutto il resto, e c'è
   anche una ripassata: le immagini possono fallire mentre la pagina si
   legge ancora, prima che qualunque codice sia in piedi. */
function fotoVuota(i){
  if(!i||i.dataset.ko)return;
  i.dataset.ko="1";i.style.display="none";
  const box=i.closest(".photo,.gallery div,.teaser");
  if(box){box.classList.add("vuota");box.setAttribute("data-alt",i.alt||"");}
}
document.addEventListener("error",e=>{
  const i=e.target;
  if(i.tagName==="IMG"&&!String(i.src).startsWith("data:"))fotoVuota(i);
},true);
function ripassaFoto(){
  document.querySelectorAll("img").forEach(i=>{
    if(String(i.src).startsWith("data:"))return;
    if(i.complete&&i.naturalWidth===0)fotoVuota(i);
  });
}
addEventListener("load",ripassaFoto);
/* se nella galleria non e' arrivata nemmeno una foto, la sezione si toglie
   di mezzo: sei caselle vuote dicono "sito non finito", il niente no */
function galleriaSeServe(){
  const g=document.querySelector(".gallery");if(!g)return;
  const viva=[...g.querySelectorAll("img")].some(i=>i.naturalWidth>0);
  const sez=g.closest("section");if(sez)sez.hidden=!viva;
}
addEventListener("load",()=>setTimeout(galleriaSeServe,500));
addEventListener("pageshow",ripassaFoto);
const store={get:k=>{try{return localStorage.getItem(k)}catch(_){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}}};
const sess={get:k=>{try{return sessionStorage.getItem(k)}catch(_){return window.__q||null}},set:(k,v)=>{try{sessionStorage.setItem(k,v)}catch(_){window.__q=v}}};
let lang=store.get("lang")||"it";if(!T[lang])lang="it";
let tempIdx=0;
function applyLang(){
  document.documentElement.lang=lang;store.set("lang",lang);
  $$("[data-i]").forEach(el=>{const k=el.dataset.i;if(T[lang][k]!==undefined)el.textContent=T[lang][k];});
  $$(".lang button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.lang===lang));
  build("#themes",()=>THEMES[lang].map(t=>`<span>${t}</span>`).join(""));
  buildDeck();
  buildEvents();
  renderBook();
  buildAcc("#moduli",MOD[lang],false);buildAcc("#faqs",FAQ[lang],true);
  refreshSelects();initPromo();buildCart();wireAdds();buildCal();chatChips();$("#chatin").placeholder=T[lang].chPh;buildPay();buildTicket();buildRail();$$("[data-flags-hero]").forEach(el=>el.innerHTML=flags("it de en es"));$$("[data-flags]").forEach(el=>{el.innerHTML=flags(el.dataset.flags)+level(+el.dataset.lvl);});fitDock();RISPARMIO.guarda();tasting=tasting||store.get("tasting");if(tasting)pickTasting(tasting);else startShuffle();buildTemps();$$("[data-conf]").forEach(calc);fillQuoteBox();
  if(typeof uiLang==="function")uiLang();
}

/* la dock si stringe da sola quando le etichette non ci stanno (p.es. in tedesco) */
function fitDock(){
  const d=$("#dockbar");if(!d)return;
  d.classList.remove("tight");
  const need=[...d.children].reduce((n,c)=>n+c.scrollWidth,0)+10;
  if(need>window.innerWidth-14)d.classList.add("tight");
}
addEventListener("resize",fitDock);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitDock);
$$(".lang button").forEach(b=>b.addEventListener("click",()=>{lang=b.dataset.lang;applyLang();}));


/* ============================================================
   RISPARMIO DI BATTERIA
   Un'animazione che gira dietro allo schermo costa come una che si vede.
   Qui si guarda cosa è davvero in vista e si ferma tutto il resto.
   ============================================================ */
const RISPARMIO=(()=>{
  const lento=matchMedia("(prefers-reduced-motion:reduce)");
  let occhio=null;
  function guarda(){
    if(!("IntersectionObserver" in window))return;
    occhio&&occhio.disconnect();
    occhio=new IntersectionObserver(voci=>{
      voci.forEach(v=>v.target.classList.toggle("fermo",!v.isIntersecting));
    },{rootMargin:"150px 0px"});
    $$(".bubbles,.rail,.deck,.cal,.track,.credit,.gallery,.markband,.foot,.lesson,.calice,.book-days,.onda,.ruota-box,.ra-palco").forEach(e=>occhio.observe(e));
  }
  /* scheda in secondo piano: non deve consumare niente */
  addEventListener("visibilitychange",()=>
    document.documentElement.classList.toggle("nascosto",document.hidden));
  if(lento.matches)document.documentElement.classList.add("nascosto");
  lento.addEventListener?.("change",e=>
    document.documentElement.classList.toggle("nascosto",e.matches||document.hidden));
  return {guarda};
})();
let ultimaY=0;
/* ---------------- ROUTER: una vista alla volta ---------------- */
const TITLES={home:"L'Arte del Vino — Degustazioni e lezioni di vino a Berlino",privati:"Per te e i tuoi amici",ristoranti:"Per ristoranti e aziende",corso:"Il corso e le ripetizioni",info:"Info",contatto:"Richiedi una data",carrello:"Carrello",pagamento:"Pagamento",ticket:"Il tuo biglietto",impressum:"Impressum",datenschutz:"Datenschutz"};
let current=null,target=null,ldT=null;
const loader=$("#loader");
function showLoader(ms){loader.classList.remove("show");void loader.offsetWidth;loader.classList.add("show");clearTimeout(ldT);ldT=setTimeout(()=>loader.classList.remove("show"),ms);}
function enterView(el){if(!el)return;el.classList.remove("enter");void el.offsetWidth;el.classList.add("enter");setTimeout(()=>el.classList.remove("enter"),1200);}
function route(dest){
  const raw=(dest??(location.hash.slice(1)||target||"home")).replace(/^#/,""),[pg,q]=raw.split("?"),[view,anchor]=pg.split("/");
  let v=$("#v-"+view)?view:"home";
  if((v==="pagamento"||v==="ticket")&&!CART.length)v="carrello";   /* senza carrello non c'è nulla da pagare */
  target=raw;
  const changed=v!==current,delay=changed&&current!==null?260:0;
  if(changed&&current!==null)showLoader(650);
  if(q){const sp=new URLSearchParams(q),t=sp.get("tipo");if(t!==null&&$("#ftype"))$("#ftype").selectedIndex=Math.max(0,Math.min(6,+t||0));
    const bt=sp.get("t"),bd=sp.get("d");
    if(bt&&TIPI.includes(bt)){BOOK.tipo=bt;BOOK.data=null;}
    if(bd&&dataValida(bd)){BOOK.data=bd;BOOK.tipo=temaDi(bd);}
    if(bt||bd)renderBook();}
  setTimeout(()=>{
    $$(".view").forEach(m=>m.hidden=m.id!=="v-"+v);
    if(changed){
      if(current!=="pagamento"&&typeof pulisciPagamento==="function")pulisciPagamento();
      enterView($("#v-"+v));
    }
    RISPARMIO.guarda();setTimeout(ripassaFoto,400);
    if(v==="contatto")fillQuoteBox();
    if(v==="carrello")buildCart();
    if(v==="pagamento")buildPay();
    if(v==="contatto")buildCal();
    if(v==="ticket")buildTicket();
    const el=anchor&&document.getElementById(anchor);
    if(el&&el.scrollIntoView)requestAnimationFrame(()=>el.scrollIntoView({behavior:"smooth",block:"start"}));
    else if(changed)window.scrollTo({top:0,behavior:"instant"});
    onScroll();
  },delay);
  document.title=TITLES[v]+(v==="home"?"":" — L'Arte del Vino");
  $$("#dock a").forEach(a=>a.classList.toggle("on",a.dataset.view===v));
  current=v;
}
/* ogni link interno passa dal router; l'hash si aggiorna se il browser lo permette */
document.addEventListener("click",e=>{
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  e.preventDefault();go(a.getAttribute("href"));
});
function go(dest){try{if(location.hash!==dest)history.pushState(null,"",dest);}catch(_){}route(dest);}
addEventListener("hashchange",()=>route());
addEventListener("popstate",()=>route(location.hash.slice(1)||"home"));

/* ---------------- SCROLL: barra di avanzamento + dock compatto ---------------- */
const prog=$("#progress"),dock=$("#dock");
let scorreT=0;
function onScroll(){
  const R=document.documentElement;
  if(!R.classList.contains("scorre"))R.classList.add("scorre");
  clearTimeout(scorreT);scorreT=setTimeout(()=>R.classList.remove("scorre"),260);
  const h=document.documentElement.scrollHeight-innerHeight,p=h>0?scrollY/h:0;
  prog.style.width=(p*100)+"%";prog.style.height=(3+p*4)+"px";
  dock.classList.toggle("compact",scrollY>120);$("#dockbar").classList.toggle("compact",scrollY>120);
  /* la barra del marchio si ritira scendendo e torna risalendo */
  const alto=$(".top");
  if(alto){
    const y=scrollY;
    if(y<90)alto.classList.remove("via");
    else if(y>ultimaY+6)alto.classList.add("via");
    else if(y<ultimaY-6)alto.classList.remove("via");
    ultimaY=y;
  }
}
addEventListener("scroll",onScroll,{passive:true});

/* ---------------- BUILDER ---------------- */
function build(sel,fn){const el=$(sel);if(el)el.innerHTML=fn();}
function buildAcc(sel,data,faq){
  const host=$(sel);if(!host)return;host.innerHTML="";
  data.forEach(m=>{
    const d=document.createElement("div");d.className="acc"+(faq?" faq":"");
    d.innerHTML=`<button aria-expanded="false"><span>${m[0]}</span><span class="sign">+</span></button><div class="body"><p>${m[1]}</p></div>`;
    const btn=d.querySelector("button"),body=d.querySelector(".body");
    btn.addEventListener("click",()=>{const o=body.style.maxHeight&&body.style.maxHeight!=="0px";body.style.maxHeight=o?"0px":body.scrollHeight+"px";btn.setAttribute("aria-expanded",!o);});
    host.appendChild(d);
  });
}
function buildTemps(){
  const host=$("#chips");if(!host)return;host.innerHTML="";
  TEMPS[lang].forEach((t,i)=>{const b=document.createElement("button");b.textContent=t[0];b.setAttribute("aria-pressed",i===tempIdx);b.addEventListener("click",()=>{tempIdx=i;buildTemps();});host.appendChild(b);});
  const[n,mi,ma]=TEMPS[lang][tempIdx],f=$("#fill");
  f.style.left=(mi/25*100)+"%";f.style.width=((ma-mi)/25*100)+"%";$("#read").textContent=`${n} · ${mi}–${ma} °C`;
}




/* ---------------- MENU A TENDINA IN STILE SITO (sostituisce quello di sistema) ---------------- */
function dressSelects(){
  $$("select").forEach(sel=>{
    if(sel.dataset.dressed)return;sel.dataset.dressed="1";
    const wrap=document.createElement("div");wrap.className="sel";
    sel.parentNode.insertBefore(wrap,sel);wrap.appendChild(sel);
    const btn=document.createElement("button");btn.type="button";btn.className="sel-btn";
    btn.setAttribute("aria-haspopup","listbox");btn.setAttribute("aria-expanded","false");
    btn.innerHTML='<span class="sel-val"></span><svg class="sel-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    const list=document.createElement("div");list.className="sel-list";list.setAttribute("role","listbox");
    wrap.append(btn,list);
    const fill=()=>{
      btn.querySelector(".sel-val").textContent=sel.options[sel.selectedIndex]?.text||"";
      list.innerHTML=[...sel.options].map((o,i)=>`<button type="button" role="option" class="sel-opt${i===sel.selectedIndex?" on":""}" data-i2="${i}" aria-selected="${i===sel.selectedIndex}"${o.disabled?' disabled aria-disabled="true"':''}><span>${esc(o.text)}</span><i class="tick"></i></button>`).join("");
    };
    fill();sel._fill=fill;
    const close=()=>{wrap.classList.remove("open");btn.setAttribute("aria-expanded","false");list.style.maxHeight="0px";};
    const open=()=>{
      $$(".sel.open").forEach(o=>{if(o!==wrap){o.classList.remove("open");o.querySelector(".sel-list").style.maxHeight="0px";o.querySelector(".sel-btn").setAttribute("aria-expanded","false");}});
      wrap.classList.add("open");btn.setAttribute("aria-expanded","true");
      list.style.maxHeight=Math.min(list.scrollHeight,300)+"px";
    };
    btn.addEventListener("click",e=>{e.stopPropagation();wrap.classList.contains("open")?close():open();});
    list.addEventListener("click",e=>{
      const o=e.target.closest(".sel-opt");if(!o)return;e.stopPropagation();
      if(o.disabled||sel.options[+o.dataset.i2]?.disabled)return;   /* formula chiusa: non si sceglie */
      sel.selectedIndex=+o.dataset.i2;fill();close();
      sel.dispatchEvent(new Event("input",{bubbles:true}));sel.dispatchEvent(new Event("change",{bubbles:true}));
    });
    btn.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
  });
  document.addEventListener("click",()=>$$(".sel.open").forEach(o=>{o.classList.remove("open");o.querySelector(".sel-list").style.maxHeight="0px";o.querySelector(".sel-btn").setAttribute("aria-expanded","false");}));
}
function refreshSelects(){$$("select").forEach(s=>s._fill&&s._fill());}



/* ---------------- CAROSELLO DEI METODI DI PAGAMENTO ---------------- */
/* Bonifico e PayPal funzionano davvero. La carta resta visibile ma col
   lucchetto: si accende il giorno che colleghi SumUp. I contanti non ci
   sono piu': le serate si tengono da Partenope 081 e si saldano prima. */
/* Solo bonifico. PayPal e carta restano nel codice: per riattivarli
   basta rimetterli qui, es. ["bank","paypal"]. */
const METHODS=["bank"];
const MLOCK={card:true};
const MICON={
 card:'<svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 9.5h19"/><path d="M6 15h4"/></svg>',
 paypal:'<svg viewBox="0 0 24 24"><path d="M7 19 9 5h5.2c2.4 0 3.8 1.3 3.4 3.5-.4 2.4-2.2 3.7-4.9 3.7h-2.3L9.6 19Z"/><path d="M5.5 21 7.2 9.8"/></svg>',
 bank:'<svg viewBox="0 0 24 24"><path d="M3 9.5 12 4l9 5.5"/><path d="M5 10.5v8M9.5 10.5v8M14.5 10.5v8M19 10.5v8M3 19.5h18"/></svg>',
 cash:'<svg viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="19" height="11" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/></svg>'};
const MKEY={card:"Card",paypal:"PP",bank:"Bank"};
function methodCard(k){
  const L=T[lang];
  const bloccato=!!MLOCK[k];
  /* <button> e non <div>: si raggiunge con il tabulatore e si attiva
     con Invio, senza bisogno di codice in piu'. */
  return `<button type="button" class="pm ${k}${PAY.how===k?" on":""}${bloccato?" locked":""}"
      data-m="${k}"${bloccato?' aria-disabled="true"':''}${PAY.how===k?' aria-current="true"':''}>
    <span class="pm-ic">${MICON[k]}</span>
    <span class="pm-txt"><b>${L["pm"+MKEY[k]]}</b><small>${bloccato?L.pmSoon:L["pm"+MKEY[k]+"S"]}</small></span>
    ${bloccato?'<span class="pm-lock">'+LOCKSVG+'</span>':'<span class="pm-tick"></span>'}</button>`;
}
const LOCKSVG='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.6"/><path d="M8.3 10.5V8a3.7 3.7 0 0 1 7.4 0v2.5"/></svg>';

/* ---------------- PAGAMENTI: controlli veri ---------------- */
const CARD={holder:"",num:"",exp:"",cvc:""},PAYER={pp:"",iban:""};

/* ---------------- SCADENZA DELLA SESSIONE DI PAGAMENTO ----------------
   I dati stanno solo qui, in memoria, e dopo due minuti di inattivita'
   spariscono da soli. Due minuti sono una via di mezzo: abbastanza per
   digitare con calma, poco perche' qualcosa resti sullo schermo quando
   ti allontani. Ogni tasto premuto fa ripartire il conto. */
const SCADENZA_MS=120000;
let orologioPag=0;
function vivoPagamento(){
  clearTimeout(orologioPag);
  const a=$("#payhint");if(a&&a.classList.contains("avviso")){a.classList.remove("avviso");a.textContent="";}
  orologioPag=setTimeout(scadiPagamento,SCADENZA_MS);
}
function scadiPagamento(){
  if(!$("#v-pagamento")||$("#v-pagamento").hidden)return;
  CARD.holder=CARD.num=CARD.exp=CARD.cvc="";PAYER.pp="";PAYER.iban="";
  $$("#paydetail input,#pname,#pmail,#ptel").forEach(i=>{i.value="";i.classList.remove("wrong");});
  const d=$("#paydetail");if(d){d.dataset.firma="";syncPay();}
  payTouched=false;refreshPayGo();
  /* l'avviso va scritto DOPO refreshPayGo, che riscrive la stessa riga */
  const avviso=$("#payhint");
  if(avviso){avviso.textContent=T[lang].payScaduto;avviso.classList.add("avviso");}
}
/* uscendo dalla pagina del pagamento si pulisce comunque */
function pulisciPagamento(){
  clearTimeout(orologioPag);
  CARD.holder=CARD.num=CARD.exp=CARD.cvc="";PAYER.pp="";PAYER.iban="";
}
let payTouched=false;
function luhn(v){const d=(v||"").replace(/\D/g,"");if(d.length<12)return false;
  let t=0,alt=false;for(let i=d.length-1;i>=0;i--){let n=+d[i];if(alt){n*=2;if(n>9)n-=9;}t+=n;alt=!alt;}
  return t%10===0;}
function brandOf(v){const d=(v||"").replace(/\D/g,"");
  if(/^4/.test(d))return "Visa";
  if(/^(5[1-5]|2[2-7])/.test(d))return "Mastercard";
  if(/^3[47]/.test(d))return "Amex";
  if(/^(30[0-5]|36|38)/.test(d))return "Diners";
  if(/^(6011|65|64[4-9])/.test(d))return "Discover";
  return "";}
function groupNum(v){
  const d=(v||"").replace(/\D/g,"").slice(0,brandOf(v)==="Amex"?15:19);
  if(brandOf(d)==="Amex")return [d.slice(0,4),d.slice(4,10),d.slice(10,15)].filter(Boolean).join(" ");
  return d.replace(/(\d{4})(?=\d)/g,"$1 ");}
function last4(v){const d=(v||"").replace(/\D/g,"");return d.slice(-4);}
function expOk(v){const m=/^(\d{2})\/(\d{2})$/.exec((v||"").trim());if(!m)return false;
  const mm=+m[1];if(mm<1||mm>12)return false;
  const fine=new Date(2000+ +m[2],mm,1);return fine>new Date();}
function cvcOk(v){const n=(v||"").replace(/\D/g,"");return brandOf(CARD.num)==="Amex"?n.length===4:n.length===3;}
function holderOk(v){return (v||"").trim().length>2&&/^[\p{L}' .-]+$/u.test(v.trim());}
function cardOk(){return holderOk(CARD.holder)&&luhn(CARD.num)&&expOk(CARD.exp)&&cvcOk(CARD.cvc);}
function ibanOk(v){
  const t=(v||"").replace(/\s+/g,"").toUpperCase();
  if(!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(t))return false;
  const r=t.slice(4)+t.slice(0,4);let rest=0;
  for(const ch of r){const num=/\d/.test(ch)?ch:String(ch.charCodeAt(0)-55);
    for(const x of num)rest=(rest*10+ +x)%97;}
  return rest===1;}
function ibanFmt(v){return (v||"").replace(/\s+/g,"").toUpperCase().replace(/(.{4})(?=.)/g,"$1 ");}
function mailOk(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v||"").trim());}
function payAmount(){return CART.length?cartTotals().tot:0;}
/* GiroCode EPC069-12: le app bancarie tedesche lo leggono e compilano il bonifico */
function giroPayload(){
  return ["BCD","002","1","SCT",
    (PAGA.bic||"").replace(/\s+/g,""),
    PAGA.titolare.slice(0,70),
    PAGA.iban.replace(/\s+/g,"").toUpperCase(),
    "EUR"+payAmount().toFixed(2),
    "","",
    bookingRef(),""].join("\n");}
function payValid(){
  if(!prenValid())return false;
  if(PAY.how==="card")return cardOk()||!!PSP_URL||!!API;
  if(PAY.how==="paypal")return PAYER.pp===""||mailOk(PAYER.pp);
  return true;}
function paySummary(){                        /* quello che finisce sul biglietto e nella mail */
  const L=T[lang];
  if(PAY.how==="card"){const b=brandOf(CARD.num)||L.pmCard;return last4(CARD.num)?b+" ···· "+last4(CARD.num):L.pmCard;}
  if(PAY.how==="paypal")return "PayPal"+(PAYER.pp?" · "+esc(PAYER.pp.slice(0,60)):"");
  if(PAY.how==="bank")return L.pmBank+" · "+bookingRef();
  return L.pmCash;}
function refreshPayGo(){
  const b=$("#paygo");if(!b)return;
  b.classList.toggle("off",!payValid());
  const h=$("#payhint");
  if(h&&!bloccoInCorso)h.textContent=payValid()?"":(API&&!SLOTPICK?T[lang].payPickDay:T[lang].payFix);}
function methodDetail(k){
  const L=T[lang],imp=euro(payAmount());
  if(k==="card"){
    const b=brandOf(CARD.num);
    return `<div class="credit"><div class="cr-face">
        <span class="cr-top"><span class="cr-chip"></span><em class="cr-brand">${b||""}</em></span>
        <span class="cr-num" id="crnum">${esc(groupNum(mascheraTesto(CARD.num,4)))||"•••• •••• •••• ••••"}</span>
        <span class="cr-row"><em id="crhold">${esc((CARD.holder||L.pmHolder).toUpperCase())}</em><em id="crexp">${esc(CARD.exp)||"MM/AA"}</em></span></div></div>
      <div class="pm-fields">
        <label>${L.pmHold}<input type="text" id="c-hold" autocomplete="cc-name" inputmode="text"
          placeholder="${esc(L.pmHoldP)}" value="${esc(CARD.holder)}"><em class="bad" id="e-hold"></em></label>
        <label>${L.pmNum}<input type="text" id="c-num" autocomplete="cc-number" inputmode="numeric"
          placeholder="0000 0000 0000 0000" value="${esc(groupNum(CARD.num))}"><em class="bad" id="e-num"></em></label>
        <div class="two">
          <label>${L.pmExp}<input type="text" id="c-exp" autocomplete="cc-exp" inputmode="numeric"
            placeholder="MM/AA" maxlength="5" value="${esc(CARD.exp)}"><em class="bad" id="e-exp"></em></label>
          <label>CVC<input type="text" id="c-cvc" autocomplete="cc-csc" inputmode="numeric"
            placeholder="123" maxlength="4" value="${esc(CARD.cvc)}"><em class="bad" id="e-cvc"></em></label>
        </div>
      </div>
      <p class="pm-note">${PSP_URL?L.pmCardP:L.pmCardN}</p>`;
  }
  if(k==="paypal"){
    const okUser=/^[A-Za-z0-9._-]{1,40}$/.test(PAGA.paypal||"");
    const dest=okUser?`https://paypal.me/${PAGA.paypal}/${payAmount().toFixed(2)}EUR`:"";
    const PPI='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 19 9 5h5.2c2.4 0 3.8 1.3 3.4 3.5-.4 2.4-2.2 3.7-4.9 3.7h-2.3L9.6 19Z"/><path d="M5.5 21 7.2 9.8"/></svg>';
    return `<div class="pm-pp">
        <div class="pm-amount"><span>${L.pmAmount}</span><b>${imp}</b></div>
        ${dest?`<a class="btn pp" id="ppgo" href="${dest}" target="_blank" rel="noopener noreferrer">${PPI}${L.pmPPGo} ${imp}</a>`
              :`<button type="button" class="btn pp off" id="ppgo" disabled aria-disabled="true">${PPI}${L.pmPPGo} · ${L.pmSoon}</button>`}
        ${PAGA.paypalMail?`<div class="pm-iban"><div><span>${L.pmPPMail}</span><em id="ppmail">${esc(PAGA.paypalMail)}</em><button type="button" class="cp" data-cp="ppmail">${L.pmCopy}</button></div>
           <div><span>${L.ibanR}</span><em id="ppref">${bookingRef()}</em><button type="button" class="cp" data-cp="ppref">${L.pmCopy}</button></div></div>`:
          `<div class="pm-iban"><div><span>${L.ibanR}</span><em id="ppref">${bookingRef()}</em><button type="button" class="cp" data-cp="ppref">${L.pmCopy}</button></div></div>`}
        <label class="pm-one">${L.pmPPYours}<input type="email" id="p-mail" inputmode="email"
          placeholder="tu@esempio.com" value="${esc(PAYER.pp)}"><em class="bad" id="e-pp"></em></label>
      </div>
      <ol class="pm-steps"><li>${L.pmPP1}</li><li>${L.pmPP2}</li><li>${L.pmPP3}</li></ol>
      <p class="pm-note">${L.pmPPN}</p>`;
  }
  if(k==="bank"){
    const ok=ibanOk(PAGA.iban),tot=payAmount(),ref=bookingRef();
    const cifra=tot.toFixed(2).replace(".",",");
    const cosa=CART.map(l=>lineName(l)+(l.meta&&l.meta.data?" · "+dataBreve(l.meta.data):"")+" × "+l.q).join(" + ");
    const IC={chi:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0"/>',
      iban:'<path d="M3 10 12 4l9 6M5 10v8M9.7 10v8M14.3 10v8M19 10v8M3 20h18"/>',
      bic:'<path d="M4 7h16M4 12h16M4 17h10"/>',
      euro:'<path d="M17 6.5A7 7 0 1 0 17 17.5M4 10.5h9M4 13.5h9"/>',
      tag:'<path d="M3 12V4h8l10 10-8 8Z"/><circle cx="7.5" cy="8" r="1.4"/>'};
    const COPIA='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>';
    const riga=(ic,lab,val,id,copia)=>`<button type="button" class="bn-tile"${copia!==null?` data-copia="${esc(copia)}"`:" disabled"}>
        <span class="bn-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[ic]}</svg></span>
        <span class="bn-txt"><span class="bn-lab">${esc(lab)}</span><b class="bn-val${id==="ibanval"&&!ok?" ph":""}"${id?` id="${id}"`:""}>${esc(val)}</b></span>
        ${copia!==null?`<span class="bn-cp" aria-hidden="true">${COPIA}</span>`:""}</button>`;
    return `<div class="bn">
      <div class="bn-head">
        <span class="bn-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7Z"/></svg>${esc(L.bnBadge)}</span>
        <span class="bn-da">${esc(L.bnDa)}</span>
        <b class="bn-imp num">${eur2(tot)}</b>
        <span class="bn-cosa">${esc(cosa)}</span>
        <i class="bn-b1"></i><i class="bn-b2"></i><i class="bn-b3"></i>
      </div>
      <ol class="bn-passi"><li>${esc(L.bnS1)}</li><li>${esc(L.bnS2)}</li><li>${esc(L.bnS3)}</li></ol>
      <p class="bn-scad"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg><span>${esc(serataVicina()?L.bnScadV:L.bnScad)}</span></p>
      <div class="bn-corpo">
        <div class="bn-dati">
          <span class="bn-tap">${esc(L.bnTap)}</span>
          ${riga("chi",L.ibanN,PAGA.titolare,"",PAGA.titolare)}
          ${riga("iban","IBAN",ibanFmt(PAGA.iban),"ibanval",ok?PAGA.iban.replace(/\s+/g,""):null)}
          ${PAGA.bic?riga("bic","BIC",PAGA.bic,"bicval",PAGA.bic):""}
          ${riga("euro",L.pmAmount,cifra+" €","impval",cifra)}
          ${riga("tag",L.ibanR,ref,"ibanref",ref)}
        </div>
        <div class="bn-qr">
          ${ok?`<b class="bn-qr-t">${esc(L.bnQrT)}</b>
          <div class="bn-cornice"><div class="giro-qr">${qrSVG(giroPayload(),"GiroCode")}</div><i class="bn-scan" aria-hidden="true"></i></div>
          <span class="bn-qr-s">${esc(L.bnQrS)}</span>
          <button type="button" class="btn line sm bn-save" data-salvaqr>${esc(L.bnSave)}</button>
          <span class="bn-banche">${esc(L.bnBanks)}</span>`
          :`<div class="bn-cornice vuota"><span>QR</span></div><p class="pm-note">${L.giroOff}</p>`}
        </div>
      </div>
      <p class="pm-note">${L.pmBankN}</p></div>`;
  }
  /* Nessun altro metodo e' previsto. Se ci si arriva, qualcosa non torna:
     meglio una riga onesta che un pannello vuoto. */
  return `<div class="pm-amount"><span>${L.pmAmount}</span><b>${imp}</b></div>
    <p class="pm-note">${L.pmSoon}</p>`;
}
/* ---------------- MASCHERA DEI DATI SENSIBILI ----------------
   Mentre scrivi vedi quello che digiti, altrimenti non puoi
   controllare. Appena lasci il campo restano visibili solo le
   ultime quattro cifre: se qualcuno guarda lo schermo da sopra
   la spalla, o se fai vedere il telefono a un amico, il numero
   per intero non c'e' piu'. Il valore vero resta in memoria.   */
const SENSIBILI={"c-num":"num","c-cvc":"cvc"};
function mascheraTesto(v,coda){
  const pulito=String(v||"").replace(/\s/g,"");
  if(pulito.length<=coda)return "\u2022".repeat(pulito.length);
  return "\u2022".repeat(pulito.length-coda)+pulito.slice(-coda);
}
function mascheraCampo(i){
  const campo=SENSIBILI[i.id];if(!campo)return;
  const vero=CARD[campo]||"";
  if(!vero)return;
  i.dataset.mascherato="1";
  i.value=campo==="cvc"?"\u2022".repeat(vero.replace(/\s/g,"").length):groupNum(mascheraTesto(vero,4));
}
function smascheraCampo(i){
  const campo=SENSIBILI[i.id];if(!campo||!i.dataset.mascherato)return;
  i.dataset.mascherato="";i.value=CARD[campo]||"";
}

/* ---------- i campi vivono: formattazione mentre scrivi, errori solo dopo ---------- */
function wirePayFields(){
  const on=(id,fn)=>{const el=$(id);if(el)el.addEventListener("input",fn);};
  on("#c-hold",e=>{CARD.holder=e.target.value;const p=$("#crhold");if(p)p.textContent=(CARD.holder||T[lang].pmHolder).toUpperCase();payCheck();});
  on("#c-num",e=>{
    const pos=e.target.selectionStart,prima=e.target.value.length;
    CARD.num=e.target.value;e.target.value=groupNum(CARD.num);CARD.num=e.target.value;
    const d=e.target.value.length-prima;try{e.target.setSelectionRange(pos+d,pos+d);}catch(_){}
    const p=$("#crnum");if(p)p.textContent=groupNum(mascheraTesto(CARD.num,4))||"•••• •••• •••• ••••";
    const br=$(".cr-brand");if(br)br.textContent=brandOf(CARD.num);
    payCheck();});
  on("#c-exp",e=>{
    let v=e.target.value.replace(/\D/g,"").slice(0,4);
    if(v.length>2)v=v.slice(0,2)+"/"+v.slice(2);
    e.target.value=v;CARD.exp=v;
    const p=$("#crexp");if(p)p.textContent=v||"MM/AA";payCheck();});
  on("#c-cvc",e=>{e.target.value=e.target.value.replace(/\D/g,"").slice(0,4);CARD.cvc=e.target.value;payCheck();});
  on("#p-mail",e=>{PAYER.pp=e.target.value.trim();payCheck();});
  ["pname","pmail","ptel"].forEach(id=>{
    const el=$("#"+id);if(!el||el.dataset.w)return;el.dataset.w="1";
    /* Nessun store.set: i dati non escono da questa pagina e non
       sopravvivono alla chiusura. Ogni sessione e' a se' stante. */
    el.addEventListener("input",()=>{vivoPagamento();refreshPayGo();});
  });
  $$("#paydetail input").forEach(i=>{
    i.addEventListener("blur",()=>{payTouched=true;payCheck();mascheraCampo(i);});
    i.addEventListener("focus",()=>smascheraCampo(i));
    i.addEventListener("input",vivoPagamento);
  });
  vivoPagamento();payCheck();
}
function payCheck(){
  const L=T[lang],set=(id,bad,msg)=>{const e=$(id);if(e)e.textContent=(payTouched&&bad)?msg:"";
    const inp=e&&e.parentElement.querySelector("input");if(inp)inp.classList.toggle("wrong",!!(payTouched&&bad));};
  if(PAY.how==="card"){
    set("#e-hold",CARD.holder&&!holderOk(CARD.holder),L.eHold);
    set("#e-num",CARD.num&&!luhn(CARD.num),L.eNum);
    set("#e-exp",CARD.exp&&!expOk(CARD.exp),L.eExp);
    set("#e-cvc",CARD.cvc&&!cvcOk(CARD.cvc),L.eCvc);
  }
  if(PAY.how==="paypal")set("#e-pp",PAYER.pp&&!mailOk(PAYER.pp),L.eMail);
  refreshPayGo();
}
function buildMethods(){
  const rail=$("#payrail");if(!rail)return;
  rail.innerHTML=METHODS.map(methodCard).join("");
  /* con un solo metodo non c'e' niente da scegliere: niente fila */
  const uno=METHODS.length<2;rail.hidden=uno;const h=$("[data-i=payHow]");if(h)h.hidden=uno;
  syncPay();
  deckIdx=Math.max(0,METHODS.indexOf(PAY.how));
}
function syncPay(){
  $$("#payrail .pm").forEach(el=>el.classList.toggle("on",el.dataset.m===PAY.how));
  const d=$("#paydetail");
  /* si ridisegna anche quando cambia l'importo, non solo il metodo */
  const firma=PAY.how+"|"+payAmount().toFixed(2);
  if(d&&d.dataset.firma!==firma){
    d.dataset.firma=firma;
    d.dataset.m=PAY.how;d.className="pm-detail "+PAY.how;
    d.innerHTML=methodDetail(PAY.how);
    const ref=$("#ibanref");if(ref)ref.textContent=bookingRef();
    d.classList.remove("in");void d.offsetWidth;d.classList.add("in");
    payTouched=false;wirePayFields();
  }
  const p=$("#paypick");if(p)p.textContent=T[lang]["pm"+MKEY[PAY.how]];
}
function scrollToMethod(i){
  const rail=$("#payrail"),el=rail.children[i];
  if(el)rail.scrollTo({left:el.offsetLeft-rail.offsetLeft-(rail.clientWidth-el.offsetWidth)/2,behavior:"smooth"});
}
document.addEventListener("click",e=>{
  const sc=e.target.closest(".slotchip[data-sd]");
  if(sc){SLOTPICK={d:sc.dataset.sd,o:sc.dataset.so};buildSlotStrip();refreshPayGo();return;}
  const face=e.target.closest("#payrail .pm");
  if(face){ if(!face.classList.contains("locked")) setMethod(METHODS.indexOf(face.dataset.m)); return; }
  const tile=e.target.closest(".bn-tile[data-copia]");
  if(tile){
    const v=tile.dataset.copia||"";
    const fatto=()=>{tile.classList.remove("ok");void tile.offsetWidth;tile.classList.add("ok");
      const lab=tile.querySelector(".bn-lab"),prima=lab.textContent;lab.textContent=T[lang].pmCopied+" ✓";
      clearTimeout(tile._t);tile._t=setTimeout(()=>{tile.classList.remove("ok");lab.textContent=prima;},1600);};
    try{navigator.clipboard.writeText(v).then(fatto,fatto);}catch(_){fatto();}
    return;
  }
  if(e.target.closest("[data-salvaqr]")){salvaQR();return;}
  const cp=e.target.closest(".cp");
  if(cp){const t=$("#"+cp.dataset.cp)?.textContent||"";
    try{navigator.clipboard.writeText(t);}catch(_){}
    cp.textContent=T[lang].pmCopied;setTimeout(()=>cp.textContent=T[lang].pmCopy,1600);}
});

/* ---------------- SCELTA DEL METODO ----------------
   Niente piu' mazzo da trascinare: si clicca la scheda. */
function setMethod(i,silent){
  const n=METHODS.length,k=METHODS[((i%n)+n)%n];
  if(MLOCK[k])return;                 /* le bloccate non si scelgono */
  deckIdx=((i%n)+n)%n;PAY.how=k;
  if(!silent)syncPay();
}
let deckIdx=0;
/* Prezzo a persona della degustazione, secondo il tema: vino, Champagne e
   bollicine, vini fortificati (Porto, Sherry, Marsala). */
const TIPI=["vino","bolle","fort"];
function homePP(t){return t==="bolle"?P.homeBolle:t==="fort"?P.homeFort:P.home;}
/* Formule ancora chiuse: si riaprono togliendo la voce da qui (e dal server). */
const LOCKED_K={corso:1,uno:1};

/* ============================================================
   LE SERATE DELLA SETTIMANA
   Lunedi' vino, martedi' Champagne, mercoledi' vini fortificati.
   Sempre alle 18:00 da Partenope 081, 40 posti a sera.
   Online si prenotano da 1 a 10 posti; i gruppi piu' grandi scrivono.
   Senza server (API=null) il sito NON conosce i posti gia' presi, e
   quindi non inventa numeri: mostra solo la capienza della sala.
   Con il server acceso arrivano i posti veri, sera per sera.
   ============================================================ */
const SERATE={1:"vino",2:"bolle",3:"fort"};      /* getDay(): 1 lun · 2 mar · 3 mer */
const ORA_SERATA="18:00",POSTI_SERATA=40,POSTI_MAX=10,POCHI_POSTI=8;
const LTIPO={calice:"vino",bolle:"bolle",dolce:"fort"};   /* icona del carosello → serata */
const BOOK={tipo:"vino",data:null,q:2};
function isoDi(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function dataDi(x){const [Y,M,D]=String(x).split("-").map(Number);return new Date(Y,M-1,D,12);}
function temaDi(x){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(x||"")))return null;const d=dataDi(x);return isoDi(d)===x?(SERATE[d.getDay()]||null):null;}
function dataValida(x){return !!temaDi(x)&&x>isoDi(new Date());}
function prossimeDate(tipo,n){
  const out=[],d=new Date();d.setHours(12,0,0,0);
  for(let i=1;i<200&&out.length<n;i++){const x=new Date(d.getTime()+i*864e5);if(!tipo||SERATE[x.getDay()]===tipo)if(SERATE[x.getDay()])out.push(isoDi(x));}
  return out;
}
function postiDi(x){const v=(typeof SLOTS==="object"&&SLOTS)?SLOTS[x]:null;return v&&Number.isFinite(v.posti)?Math.max(0,Math.min(POSTI_SERATA,v.posti)):null;}
function statoDi(x){const v=(typeof SLOTS==="object"&&SLOTS)?SLOTS[x]:null;const n=postiDi(x);
  if(n!==null)return n<=0?"out":n<=POCHI_POSTI?"low":"free";return v&&v.s==="out"?"out":"free";}
function nomeSerata(t){return T[lang]["nm_"+t]||T[lang].nm_vino;}
function dataBreve(x,lungo){return dataDi(x).toLocaleDateString(lang==="de"?"de-DE":"it-IT",lungo?{weekday:"long",day:"numeric",month:"long"}:{weekday:"short",day:"numeric",month:"short"});}
function lineName(l){return l.k==="home"&&l.meta&&l.meta.tipo?nomeSerata(l.meta.tipo):T[lang][ITEMS[l.k].name];}
function lineSub(l){
  if(l.k==="home"&&l.meta&&l.meta.data)return dataBreve(l.meta.data)+" · "+ORA_SERATA+" · "+euro(homePP(l.meta.tipo))+" "+T[lang].uPax;
  return l.meta&&l.meta.cfg?confSum(cfgOf(l)):euro(ITEMS[l.k].p())+" "+T[lang].each+" "+T[lang][ITEMS[l.k].u];
}
/* bottiglie disegnate per le tre schede dei giorni */
const BOTTLE={
 vino:'<svg viewBox="0 0 40 96" aria-hidden="true"><path class="vetro" d="M16 4h8v18c0 6 8 9 8 18v48a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V40c0-9 8-12 8-18Z"/><path class="liquido" d="M9 52h22v36a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3Z"/><rect class="etichetta" x="11" y="58" width="18" height="18" rx="2"/><path class="tappo" d="M16 4h8v7h-8z"/></svg>',
 bolle:'<svg viewBox="0 0 40 96" aria-hidden="true"><path class="vetro" d="M16 4h8v16c0 8 9 10 9 20v48a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V40c0-10 9-12 9-20Z"/><path class="liquido" d="M8 46h24v42a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3Z"/><rect class="etichetta" x="10" y="58" width="20" height="16" rx="2"/><path class="tappo stagnola" d="M15 3h10v13H15z"/><g class="bol"><circle cx="14" cy="86" r="1.6"/><circle cx="21" cy="84" r="1.2"/><circle cx="26" cy="87" r="1.4"/><circle cx="18" cy="88" r="1"/></g></svg>',
 fort:'<svg viewBox="0 0 40 96" aria-hidden="true"><path class="vetro" d="M16 16h8v8c0 4 10 6 10 16v48a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V40c0-10 10-12 10-16Z"/><path class="liquido" d="M7 50h26v38a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3Z"/><rect class="etichetta" x="9" y="60" width="22" height="16" rx="2"/><path class="tappo" d="M14 6h12v11H14z"/></svg>'};
const SEDUTE_PRESE=(x,n)=>{   /* dove sono seduti gli altri: sempre gli stessi per la stessa sera */
  let h=0;for(const c of String(x))h=(h*31+c.charCodeAt(0))>>>0;
  const idx=[...Array(POSTI_SERATA).keys()];
  for(let i=idx.length-1;i>0;i--){h=(h*1103515245+12345)>>>0;const j=h%(i+1);[idx[i],idx[j]]=[idx[j],idx[i]];}
  return new Set(idx.slice(0,n));
};
function setHTML(el,html){if(el&&el.__h!==html){el.innerHTML=html;el.__h=html;return true;}return false;}
function renderBook(){
  const host=$("#book");if(!host)return;
  const L=T[lang];
  if(!TIPI.includes(BOOK.tipo))BOOK.tipo="vino";
  const date=prossimeDate(BOOK.tipo,6);
  if(BOOK.data&&(temaDi(BOOK.data)!==BOOK.tipo||!dataValida(BOOK.data)))BOOK.data=null;
  if(!BOOK.data)BOOK.data=date.find(d=>statoDi(d)!=="out")||null;
  const liberi=BOOK.data?postiDi(BOOK.data):null;
  const maxQ=Math.max(1,Math.min(POSTI_MAX,liberi===null?POSTI_MAX:liberi));
  BOOK.q=Math.max(1,Math.min(maxQ,Math.round(+BOOK.q)||1));
  /* le tre bottiglie: si ridisegnano solo cambiando lingua; la scelta e' una classe */
  setHTML($("#bookdays"),TIPI.map(t=>`<button type="button" role="tab" class="day d-${t}" data-bt="${t}">
      <span class="bottle">${BOTTLE[t]}</span>
      <span class="day-txt"><small>${esc(L["gd_"+t])}</small><b>${esc(L["nm_"+t+"S"])}</b><em>${euro(homePP(t))} <i>${esc(L.uPax)}</i></em></span></button>`).join(""));
  $$("#bookdays .day").forEach(d=>{const on=d.dataset.bt===BOOK.tipo;d.classList.toggle("on",on);d.setAttribute("aria-selected",on);});
  if(setHTML($("#bookinfo"),`<b>${esc(L["tf_"+BOOK.tipo])}</b><span>${esc(L["tp_"+BOOK.tipo])}</span>`)){
    const bi=$("#bookinfo");bi.classList.remove("cambia");void bi.offsetWidth;bi.classList.add("cambia");}
  host.dataset.t=BOOK.tipo;
  setHTML($("#bookdates"),date.length?date.map((d,i)=>{
      const st=statoDi(d),n=postiDi(d),dd=dataDi(d);
      const giu=dd.toLocaleDateString(lang==="de"?"de-DE":"it-IT",{weekday:"short"}),num=dd.getDate(),mm=MESI[lang][dd.getMonth()];
      const info=n===null?ORA_SERATA:(n<=0?L.soldout:L.bkLeft.replace("%",n));
      return `<button type="button" class="dchip ${st}" data-bd="${d}" style="--n:${i}"${st==="out"?" disabled":""}>
        <small>${esc(giu)}</small><b>${num}</b><small>${esc(mm)}</small><em>${esc(info)}</em></button>`;}).join("")
    :`<p class="note">${esc(L.bkNone)}</p>`);
  $$("#bookdates .dchip").forEach(c=>{const on=c.dataset.bd===BOOK.data;c.classList.toggle("on",on);c.setAttribute("aria-pressed",on);});
  const qi=$("#bkq");if(qi){qi.value=BOOK.q;qi.max=maxQ;}
  $("#bkmax").textContent=(liberi!==null&&liberi<=POCHI_POSTI?L.bkLeft.replace("%",liberi)+" · ":"")+L.bkMax;
  const pp=homePP(BOOK.tipo),tot=pp*BOOK.q;
  $("#booksum").innerHTML=BOOK.data?`<span>${esc(nomeSerata(BOOK.tipo))} · ${esc(dataBreve(BOOK.data,true))} · ${ORA_SERATA}</span>
      <div class="bs-row"><span>${BOOK.q} × ${euro(pp)}</span><span>${euro(tot)}</span></div>
      <div class="bs-row iva"><span>${esc(L.ivaL)}</span><span>${eur2(0)}</span></div>
      <div class="bs-tot"><span>${esc(L.tot)}</span><b class="num">${euro(tot)}</b></div>`:`<span>${esc(L.bkPick)}</span>`;
  /* la sala: quaranta calici. Si ridisegna solo cambiando serata; i tuoi
     posti si accendono uno alla volta, solo quelli nuovi fanno l'animazione */
  const prese=liberi===null?0:POSTI_SERATA-liberi,occ=SEDUTE_PRESE(BOOK.data||"x",prese);
  const sala=$("#sala");
  if(sala){
    const chiave=BOOK.tipo+"|"+(BOOK.data||"")+"|"+prese;
    if(sala.dataset.k!==chiave){
      let html="";
      for(let i=0;i<POSTI_SERATA;i++)html+=`<i class="seat${occ.has(i)?" taken":""}" data-seat="${i}" style="--n:${i}"><svg viewBox="0 0 24 24"><use href="#gl"/></svg></i>`;
      sala.innerHTML=html;sala.dataset.k=chiave;
      sala.classList.remove("entra");void sala.offsetWidth;sala.classList.add("entra");
    }
    sala.dataset.t=BOOK.tipo;
    let mie=0;
    sala.querySelectorAll(".seat").forEach(st=>{
      if(st.classList.contains("taken"))return;
      const deve=!!BOOK.data&&mie<BOOK.q;if(deve)mie++;
      if(deve&&!st.classList.contains("mine")){st.classList.add("mine","nuovo");st.style.setProperty("--k",mie);}
      else if(!deve&&st.classList.contains("mine"))st.classList.remove("mine","nuovo");
    });
  }
  $("#salacount").textContent=liberi===null?L.bkCap.replace("%",POSTI_SERATA):L.bkLeft.replace("%",liberi)+" / "+POSTI_SERATA;
  const add=$("#bookadd");if(add){add.disabled=!BOOK.data;add.classList.toggle("off",!BOOK.data);}
}
function eur2(n){return new Intl.NumberFormat(lang==="de"?"de-DE":"it-IT",{style:"currency",currency:"EUR",minimumFractionDigits:2,maximumFractionDigits:2}).format(n);}
document.addEventListener("click",e=>{
  const bt=e.target.closest("[data-bt]");if(bt){BOOK.tipo=bt.dataset.bt;BOOK.data=null;renderBook();return;}
  const bd=e.target.closest("[data-bd]");if(bd&&!bd.disabled){BOOK.data=bd.dataset.bd;renderBook();return;}
  if(e.target.closest("#bkminus")){BOOK.q--;renderBook();return;}
  if(e.target.closest("#bkplus")){BOOK.q++;renderBook();return;}
  const st=e.target.closest(".seat");
  if(st&&!st.classList.contains("taken")&&BOOK.data){
    const i=+st.dataset.seat,prese=$$("#sala .seat");let n=0;
    for(let k=0;k<=i;k++)if(!prese[k].classList.contains("taken"))n++;
    BOOK.q=n;renderBook();return;
  }
  if(e.target.closest("#bookadd")){
    if(!BOOK.data||!dataValida(BOOK.data))return;
    addItem("home",BOOK.q,{data:BOOK.data,tipo:BOOK.tipo});
    go("#carrello");
  }
});
document.addEventListener("input",e=>{if(e.target.id==="bkq"){BOOK.q=+e.target.value||1;renderBook();}});
function prossimeSerate(n){return prossimeDate(null,n).map(x=>({iso:x,t:temaDi(x)}));}
function buildEvents(){
  const h=$("#events");if(!h)return;
  const v=prossimeSerate(6),L=T[lang];
  h.innerHTML=v.map(e=>{
    const d=dataDi(e.iso),n=postiDi(e.iso),st=statoDi(e.iso);
    const giu=d.toLocaleDateString(lang==="de"?"de-DE":"it-IT",{weekday:"long"});
    const lab=n===null?L.bkCap.replace("%",POSTI_SERATA):(n<=0?L.soldout:L.bkLeft.replace("%",n));
    return `<a class="event e-${e.t}" href="#privati/p-prenota?d=${e.iso}"><div class="d"><b>${d.getDate()}</b><small>${MESI[lang][d.getMonth()]}</small></div><div><h3>${esc(nomeSerata(e.t))}</h3><p>${esc(giu)} · ${ORA_SERATA} · ${euro(homePP(e.t))} ${esc(L.uPax)} · Partenope 081</p></div><span class="seats ${st}">${esc(lab)}</span></a>`;
  }).join("")||`<div class="event vuoto"><div><h3>${esc(L.evNoneT)}</h3><p>${esc(L.evNoneP)}</p></div><a class="btn sm" href="#contatto">${esc(L.evNoneB)}</a></div>`;
}
/* ---------------- CARRELLO ---------------- */
const ITEMS={
 home:{p:()=>P.home,u:"uPax",min:1,max:10,name:"p1h",tipo:0},
 corso:{p:()=>P.corso,u:"uPax",min:3,name:"p2h",tipo:1},
 uno:{p:()=>P.uno,u:"uH",min:1,name:"p3h",tipo:2},
 staff:{p:()=>P.staff2h,u:"uS",min:1,name:"r1h",tipo:3},
 evening:{p:()=>P.eveningBase,u:"uE",min:1,name:"r2h",tipo:4},
 team:{p:()=>P.team,u:"uPax",min:8,name:"r3h",tipo:5},
 voucher:{p:()=>P.home,u:"uV",min:1,max:20,name:"vouT",tipo:6}};
let CART=[];
function loadCart(){try{CART=JSON.parse(store.get("cart")||"[]");}catch(_){CART=[];}
  CART=(Array.isArray(CART)?CART:[]).filter(l=>l&&typeof l==="object"&&Object.prototype.hasOwnProperty.call(ITEMS,l.k)&&!LOCKED_K[l.k])
    /* una serata in sala vale solo con una data vera, futura, del suo giorno */
    .filter(l=>l.k!=="home"||(l.meta&&dataValida(l.meta.data)&&l.meta.tipo===temaDi(l.meta.data)))
    .map(l=>{const it=ITEMS[l.k];l.meta=l.meta&&typeof l.meta==="object"?l.meta:{};
      l.q=Math.max(it.min,Math.min(it.max||200,Math.round(+l.q)||it.min));return l;});}
function saveCart(){store.set("cart",JSON.stringify(CART));paintBadge();buildCart();}
function paintBadge(){
  const n=CART.reduce((s,l)=>s+1,0),b=$("#cartbadge");if(!b)return;
  b.textContent=n;b.style.display=n?"grid":"none";
  $("#cartbtn").classList.toggle("full",!!n);
}
function addItem(k,q,meta){
  const it=ITEMS[k];if(!it||LOCKED_K[k])return;
  const qty=Math.max(it.min,q||it.min);
  const same=(meta&&meta.cfg)?null:CART.find(l=>l.k===k&&!l.meta.cfg&&JSON.stringify(l.meta||{})===JSON.stringify(meta||{}));
  const riga=same||{k,q:0,meta:meta||{}};
  riga.q=Math.min(it.max||200,riga.q+qty);
  if(!same)CART.push(riga);
  saveCart();bump();toast(T[lang].caAdded.replace("%",esc(lineName(riga))));
}
function toast(msg){
  let t=$("#toast");
  if(!t){t=document.createElement("div");t.id="toast";document.body.appendChild(t);}
  t.innerHTML=`<img src="${LOGO}" alt=""><span>${msg}</span><a href="#carrello">${T[lang].caOpen}</a>`;
  t.classList.remove("on");void t.offsetWidth;t.classList.add("on");
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("on"),3800);
}
function wireAdds(){                       /* aggancio diretto, oltre alla delega */
  $$(".addc").forEach(b=>{if(b.dataset.wired)return;b.dataset.wired="1";
    b.addEventListener("click",ev=>{ev.preventDefault();ev.stopPropagation();addItem(b.dataset.add);});});
}
function bump(){
  const b=$("#cartbtn");b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump");
}
function cfgOf(l){                 /* la quantita' del carrello torna dentro la configurazione */
  const c=Object.assign({},l.meta.cfg);
  if(l.k==="home"||l.k==="corso"||l.k==="team")c.pax=l.q;
  else if(l.k==="uno"||l.k==="staff")c.ore=l.q;
  return c;
}
function lineTotal(l){
  if(l.k==="home"&&l.meta&&l.meta.tipo)return homePP(l.meta.tipo)*l.q;
  if(l.meta&&l.meta.cfg){
    const t=priceRows(cfgOf(l)).tot;
    return l.k==="evening"?t*l.q:t;
  }
  const it=ITEMS[l.k];let v=it.p()*l.q;
  if(l.k==="uno"&&l.q>=5)v=Math.round(P.uno5/5*l.q);
  if(l.k==="staff"&&l.q>1)v=P.staff2h*l.q;
  return v;
}
function cartTotals(){
  const sub=CART.reduce((s,l)=>s+lineTotal(l),0);
  const off=promo?Math.round(sub*PROMOS[promo].off):0;
  /* IVA: zero, perche' Kleinunternehmer (§19 UStG). La riga c'e' lo stesso,
     cosi' prima di pagare si vede nero su bianco che non viene aggiunto nulla. */
  return{sub,off,iva:0,tot:sub-off};
}
function righeTotali(t){
  const L=T[lang];
  return `<div class="subt"><span>${esc(L.subL)}</span><span>${euro(t.sub)}</span></div>`
    +(t.off?`<div class="neg"><span>${esc(L.prLine)} ${esc(promo)}</span><span>${euro(-t.off)}</span></div>`:"")
    +`<div class="iva"><span>${esc(L.ivaL)}</span><span>${eur2(0)}</span></div>`;
}
function buildCart(){
  const host=$("#cartlist");if(!host)return;
  if(!CART.length){
    host.innerHTML=`<div class="cart-empty"><img src="${LOGO}" alt=""><b>${T[lang].caEmpty}</b><span>${T[lang].caEmptyS}</span></div>`;
    $("#cartsum").innerHTML="";$("#carttot").textContent=euro(0);$("#cartgo").classList.add("off");
  }else{
    host.innerHTML=CART.map((l,i)=>{
      const it=ITEMS[l.k];
      return `<div class="citem${l.meta&&l.meta.tipo?" c-"+l.meta.tipo:""}"><img class="ci-art" src="${LOGO}" width="50" height="50" decoding="async" alt="">
        <div class="ci-txt"><b>${esc(lineName(l))}</b>
          <span>${esc(lineSub(l))}${l.meta&&l.meta.note?" · "+esc(String(l.meta.note).slice(0,60)):""}</span></div>
        <div class="ci-q"><button type="button" data-q="${i}" data-s="-1">−</button><b>${l.q}</b><button type="button" data-q="${i}" data-s="1">+</button></div>
        <div class="ci-p">${euro(lineTotal(l))}</div>
        <button type="button" class="ci-x" data-rm="${i}" aria-label="rimuovi">×</button></div>`;
    }).join("");
    const t=cartTotals();
    $("#cartsum").innerHTML=CART.map(l=>`<div><span>${esc(lineName(l))} × ${l.q}</span><span>${euro(lineTotal(l))}</span></div>`).join("")+righeTotali(t);
    $("#carttot").textContent=euro(t.tot);
    $("#cartgo").classList.remove("off");
  }
  const pi=$("#promoin");if(pi){pi.placeholder=T[lang].caCode;if(promo)pi.value=promo;}
}
document.addEventListener("click",e=>{
  if(e.target.closest("#cartbtn")){go("#carrello");return;}
  const a=e.target.closest(".addc");
  if(a){e.preventDefault();addItem(a.dataset.add);return;}
  const q=e.target.closest("[data-q]");
  if(q){const l=CART[+q.dataset.q];if(!l)return;
    let tetto=ITEMS[l.k].max||200;
    if(l.k==="home"&&l.meta&&l.meta.data){const n=postiDi(l.meta.data);if(n!==null)tetto=Math.min(tetto,n);}
    l.q=Math.max(ITEMS[l.k].min,Math.min(tetto,l.q+(+q.dataset.s)));saveCart();return;}
  const rm=e.target.closest("[data-rm]");
  if(rm){CART.splice(+rm.dataset.rm,1);saveCart();return;}
  if(e.target.closest("#promoadd")){
    const c=($("#promoin").value||"").trim().toUpperCase();
    if(PROMOS[c]){promo=c;store.set("promo",c);initPromo();buildCart();$$("[data-conf]").forEach(calc);}
    else{$("#promoin").classList.add("bad");setTimeout(()=>$("#promoin").classList.remove("bad"),900);}
  }
  const ac=e.target.closest("#addconf,#addconf2");
  if(ac){
    const root=ac.closest(".cards").querySelector("[data-conf]"),cfg=readConf(root);
    const k=cfg.mode==="priv"?(cfg.fmt==="uno"?"uno":cfg.fmt):(cfg.rf==="staff"?"staff":"evening");
    if(LOCKED_K[k])return;               /* formula ancora chiusa */
    if(k==="home"){                       /* la serata in sala vuole una data: si sceglie sotto */
      BOOK.tipo=TIPI.includes(cfg.tipo)?cfg.tipo:"vino";BOOK.q=Math.min(POSTI_MAX,cfg.pax);BOOK.data=null;
      renderBook();go("#privati/p-prenota");return;
    }
    const qty=(k==="uno"||k==="staff")?cfg.ore:(k==="evening"?1:cfg.pax);
    addItem(k,qty,{cfg,sum:confSum(cfg)});
    go("#carrello");
  }
});
/* ---------------- PAGAMENTO E BIGLIETTO (dimostrativi) ---------------- */
const PAY={how:"bank"};
function opt(g,id,t,s,on){return `<button type="button" class="opt${on?" on":""}" data-g="${g}" data-o="${id}"><span class="tick"></span><span class="ol"><b>${t}</b><small>${s}</small></span></button>`;}

/* ============================================================
   PRENOTAZIONE AUTOMATICA
   Con API acceso: scegli la sera, il posto viene bloccato 20 minuti,
   paghi, e la serata finisce in agenda da sola. Senza API, niente di
   tutto questo compare e il sito resta come prima.
   ============================================================ */
let SLOTPICK=null,REFSERVER=null,PRENSTATO=null,bloccoInCorso=false;

function slotLiberi(max=10){
  const oggi=iso(new Date()),out=[];
  for(const k of Object.keys(SLOTS).sort()){
    if(k<oggi)continue;
    const v=SLOTS[k];
    if(v.s!=="free"&&v.s!=="low")continue;
    for(const o of (v.ore&&v.ore.length?v.ore:["18:00"])){out.push({d:k,o});if(out.length>=max)return out;}
  }
  return out;
}
function buildSlotStrip(){
  const box=$("#prenbox"),strip=$("#slotstrip");
  if(!box||!strip)return;
  box.hidden=!API;
  /* la data ormai si sceglie prima, nella scheda della serata: qui restano solo i dati */
  strip.hidden=true;const hd=box.querySelector("[data-i=payDay]");if(hd)hd.hidden=true;
  return;
  const L=lang==="de"?"de-DE":"it-IT",libere=slotLiberi(10);
  strip.classList.toggle("vuota",!libere.length);
  strip.dataset.vuoto=T[lang].payNoDay;
  strip.innerHTML=libere.map(x=>{
    const d=new Date(x.d+"T12:00:00");
    const on=SLOTPICK&&SLOTPICK.d===x.d&&SLOTPICK.o===x.o;
    return `<button type="button" class="slotchip${on?" on":""}" data-sd="${x.d}" data-so="${x.o}">
      <b>${d.toLocaleDateString(L,{weekday:"short",day:"numeric",month:"short"})}</b><span>${x.o}</span></button>`;
  }).join("")+(libere.length?`<a class="slotchip altre" href="#contatto">${T[lang].payOther}</a>`:"");
  const h=$("#datehint");if(h)h.textContent="";
}
function prenValid(){
  if(!API)return true;
  const g=v=>($("#"+v)?.value||"").trim();
  if(g("pname").length<2)return false;
  return mailOk(g("pmail"))||g("ptel").replace(/\D/g,"").length>=6;
}
function corpoPrenotazione(l,primo){
  const g=v=>($("#"+v)?.value||"").trim();
  return {
    data:l.meta.data, ora:ORA_SERATA, titolo:nomeSerata(l.meta.tipo),
    luogo:"Partenope 081", nome:g("pname"), email:g("pmail"), tel:g("ptel"), lingua:lang,
    persone:l.q, articoli:[{k:"home",q:l.q,tipo:l.meta.tipo}],
    promo:primo&&promo?promo:null, totale:lineTotal(l), pagamento:PAY.how,
    note:primo&&promo?"codice "+promo:""
  };
}
async function bloccaEPaga(){
  if(bloccoInCorso)return;
  bloccoInCorso=true;
  const avviso=$("#payhint");
  const righe=CART.map((l,i)=>({l,i})).filter(x=>x.l.k==="home"&&x.l.meta&&x.l.meta.data);
  try{
    if(!righe.length){if(avviso)avviso.textContent=T[lang].payErr;bloccoInCorso=false;return;}
    if(avviso)avviso.textContent=T[lang].payWait;
    let primoRif=null;
    for(const [n,x] of righe.entries()){
      const r=await fetch(API+"/tieni",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(corpoPrenotazione(x.l,n===0))});
      const d=await r.json().catch(()=>({}));
      if(r.status===409){                    /* posti finiti nel frattempo */
        await pullSlots();renderBook();
        if(avviso)avviso.textContent=T[lang].payTaken;
        bloccoInCorso=false;return;
      }
      if(!r.ok){if(avviso)avviso.textContent=String(d.errore||T[lang].payErr).slice(0,160);bloccoInCorso=false;return;}
      const rif=esc(String(d.rif||"").slice(0,24));REFS[x.i]=rif;if(!primoRif)primoRif=rif;
    }
    REFSERVER=primoRif;store.set("rif",REFSERVER);
    if(PAY.how==="card"){
      const c=await fetch(API+"/checkout",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({rif:primoRif})});
      const cd=await c.json().catch(()=>({}));
      if(c.ok&&cd.url){location.href=cd.url;return;}
      if(avviso)avviso.textContent=String(cd.errore||T[lang].payErr).slice(0,160);
      bloccoInCorso=false;return;
    }
    PRENSTATO="attesa";                      /* bonifico, PayPal: confermi tu */
    if(avviso)avviso.textContent="";
    go("#ticket");
  }catch(_){
    if(avviso)avviso.textContent=T[lang].payOff;
  }
  bloccoInCorso=false;
}
/* ritorno dalla cassa */
function ritornoDallaCassa(){
  const q=new URLSearchParams(location.search);
  const ok=q.get("ok"),no=q.get("annullato");
  if(ok){REFSERVER=esc(ok.slice(0,24));REFS[0]=REFSERVER;PRENSTATO="pagata";store.set("rif",REFSERVER);
    setTimeout(()=>{go("#ticket");toast(T[lang].payDone);},400);}
  else if(no){setTimeout(()=>toast(T[lang].payBack),600);}
}
function buildPay(){
  if(!$("#v-pagamento"))return;
  buildSlotStrip();
  const df=$("[data-i=demoF]");
  if(df)df.textContent=API?T[lang].demoApi:(PSP_URL?T[lang].demoPsp:T[lang].demoF);
  /* niente ripristino da memoria: i campi partono sempre vuoti */
  buildMethods();
  if(CART.length){
    const t=cartTotals();
    $("#recap").innerHTML=CART.map(l=>`<div><span>${esc(lineName(l))} × ${l.q}${l.meta&&l.meta.data?" · "+esc(dataBreve(l.meta.data)):""}</span><span>${euro(lineTotal(l))}</span></div>`).join("")+righeTotali(t);
    $("#paytot").textContent=euro(t.tot);
  }else{
    const q=sess.get("quote")||"";
    $("#recap").innerHTML=q?q.split("\n").filter(l=>l.startsWith("- ")).map(l=>{const[a,b]=l.slice(2).split(": ");return `<div><span>${a}</span><span>${b}</span></div>`;}).join(""):`<div><span>${T[lang].ft1}</span><span>6 × 49 €</span></div>`;
    $("#paytot").textContent=(q.match(/:\s*([\d.,]+\s*€)\s*$/)||[])[1]||"294 €";
  }
}
document.addEventListener("click",e=>{
  const o=e.target.closest(".opt");if(!o||o.classList.contains("off"))return;
  PAY[o.dataset.g]=o.dataset.o;buildPay();
});
let REF=null;
function bookingRef(){
  if(!REF){const a="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<4;i++)s+=a[Math.floor(Math.random()*a.length)];REF="CS-"+new Date().getFullYear()+"-"+s;}
  return REF;
}
const TKINFO={
 home:{theme:1,incl:"tkInclV",unit:"tkWho"},
 team:{theme:1,incl:"tkInclV",unit:"tkWho"},
 corso:{theme:1,incl:"tkInclC",unit:"tkWho"},
 evening:{theme:1,incl:"tkInclE",unit:"tkQtyE"},
 uno:{theme:0,head:"tkHeadU",incl:"tkInclU",unit:"tkQtyH"},
 staff:{theme:0,head:"tkHeadS",incl:"tkInclS",unit:"tkQtyS"},
 voucher:{theme:0,head:"tkHeadV",incl:"tkInclGift",unit:"tkQtyV"}};
let REFS=[];
function refAt(i){
  const a="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  while(REFS.length<=i){let s="";for(let k=0;k<4;k++)s+=a[Math.floor(Math.random()*a.length)];REFS.push("CS-"+new Date().getFullYear()+"-"+s);}
  return REFS[i];
}
function bookingRef(){return refAt(0);}
function fmtDate(d){return d.toLocaleDateString(lang==="de"?"de-DE":"it-IT",{weekday:"long",day:"numeric",month:"long"})+" · 18:00";}
function ticketList(){
  const sel=id=>{const s=$("#"+id);return s?s.options[s.selectedIndex].text:"";};
  const d=$("#fdate")?.value, base=d?new Date(d+"T18:00:00"):new Date(Date.now()+12*864e5);
  const place="Partenope 081";   /* il luogo e' uno solo: non si chiede piu' al cliente */
  const lng=tasting?(sel("flang")||"Italiano"):(lang==="de"?"Deutsch":"Italiano");   /* senza scelta: la lingua del sito */
  const off=promo?PROMOS[promo].off:0;
  const lines=CART.length?CART:[{k:"home",q:2,meta:{data:prossimeDate("vino",1)[0],tipo:"vino"}}];
  return lines.map((l,i)=>{
    const info=TKINFO[l.k]||TKINFO.home;
    if(l.k==="home"&&l.meta&&l.meta.data){              /* serata in sala: tutto dalla riga */
      const tp=l.meta.tipo,d=dataDi(l.meta.data);d.setHours(18,0,0,0);
      return{ref:refAt(i),kind:nomeSerata(tp),lang:lng,date:d,q:l.q,head:T[lang]["tf_"+tp],
        incl:T[lang]["tkIncl_"+tp],unitLabel:T[lang].tkSeats,place,tipo:tp,
        price:euro(Math.round(lineTotal(l)*(1-off))),idx:i,total:lines.length};
    }
    const dt=new Date(base.getTime()+i*7*864e5);          /* serate diverse, una a settimana */
    return{ref:refAt(i),kind:T[lang][ITEMS[l.k].name],lang:lng,date:dt,q:l.q,
      head:info.theme?THEMES[lang][i%THEMES[lang].length]:T[lang][info.head],
      incl:T[lang][info.incl],unitLabel:T[lang][info.unit],place:l.k==="staff"||l.k==="evening"?(lang==="de"?"In eurem Lokal":"Nel vostro locale"):l.k==="uno"?(lang==="de"?"Online oder vor Ort":"Online o dal vivo"):l.k==="voucher"?(lang==="de"?"Termin frei wählbar":"Data a scelta"):place,
      price:euro(Math.round(lineTotal(l)*(1-off))),idx:i,total:lines.length};
  });
}
/* il GiroCode come immagine da salvare: per chi paga dal telefono
   e ha una banca che legge i codici dalle foto */
/* se una serata del carrello e' tra meno di 48 ore, il bonifico va fatto prima */
function serataVicina(){
  const lim=Date.now()+48*36e5;
  return CART.some(l=>l.meta&&l.meta.data&&dataDi(l.meta.data).setHours(18,0,0,0)<lim);
}
function salvaQR(){
  try{
    const q=qrcode(0,"M");q.addData(giroPayload());q.make();
    const n=q.getModuleCount(),px=16,pad=4*px,W=n*px+pad*2,H=W+150,C=QR_COL;
    const c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
    const rr=(X,Y,w,h,r)=>{x.beginPath();if(x.roundRect)x.roundRect(X,Y,w,h,r);else x.rect(X,Y,w,h);x.fill();};
    x.fillStyle="#F6EAD6";x.fillRect(0,0,W,H);
    x.fillStyle=C.fondo;rr(px,px,W-2*px,W-2*px,px*1.5);
    const occhio=(r,k)=>(r<7&&k<7)||(r<7&&k>=n-7)||(r>=n-7&&k<7);
    x.fillStyle=C.modulo;
    const D=(r,k)=>r>=0&&k>=0&&r<n&&k<n&&q.isDark(r,k);
    for(let r=0;r<n;r++)for(let k=0;k<n;k++){
      if(!D(r,k)||occhio(r,k))continue;
      const R=px*QR_STILE.tondo,X=pad+k*px,Y=pad+r*px;
      const rad=[!D(r-1,k)&&!D(r,k-1)?R:0,!D(r-1,k)&&!D(r,k+1)?R:0,!D(r+1,k)&&!D(r,k+1)?R:0,!D(r+1,k)&&!D(r,k-1)?R:0];
      x.beginPath();if(x.roundRect)x.roundRect(X,Y,px+(D(r,k+1)?.5:0),px+(D(r+1,k)?.5:0),rad);else x.rect(X,Y,px,px);x.fill();
    }
    for(const [r,k] of [[0,0],[0,n-7],[n-7,0]]){
      const X=pad+k*px,Y=pad+r*px;
      x.fillStyle=C.occhio;rr(X,Y,7*px,7*px,px*QR_STILE.occhio);
      x.fillStyle=C.fondo;rr(X+px,Y+px,5*px,5*px,px*QR_STILE.interno);
      x.fillStyle=C.pupilla;rr(X+2*px,Y+2*px,3*px,3*px,px*QR_STILE.pupilla);
    }
    x.fillStyle="#7A1230";x.font="700 40px Georgia,serif";x.textAlign="center";
    x.fillText("GiroCode · "+eur2(payAmount()),W/2,W+52);
    x.fillStyle="#655D56";x.font="600 28px Helvetica,Arial,sans-serif";
    x.fillText("L'Arte del Vino · "+bookingRef(),W/2,W+100);
    const a=document.createElement("a");a.href=c.toDataURL("image/png");a.download="GiroCode-"+bookingRef()+".png";
    document.body.appendChild(a);a.click();a.remove();
  }catch(_){}
}
/* I codici QR in colori caldi: moduli color vino arrotondati su fondo
   crema, occhi agli angoli con il centro dorato. Il contrasto resta
   alto (vino scuro su crema), quindi le app delle banche lo leggono. */
const QR_COL={fondo:"#FFF8EE",modulo:"#5A1230",occhio:"#7A1230",pupilla:"#7A5512"};
const QR_STILE={tondo:.5,occhio:1.8,interno:1.2,pupilla:1};   /* tondo .5 = puntini tondi (0 = quadrati); occhi arrotondati ma non cerchi: così le app lo leggono meglio */
function qrSVG(payload,label){
  const q=qrcode(0,"M");q.addData(payload);q.make();
  const n=q.getModuleCount(),px=4,pad=4*px,size=n*px+pad*2,C=QR_COL;   /* 4 moduli di margine, come vuole lo standard */
  const occhio=(r,c)=>(r<7&&c<7)||(r<7&&c>=n-7)||(r>=n-7&&c<7);
  let out=`<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="QR ${esc(label)}"><rect width="${size}" height="${size}" rx="${px*2}" fill="${C.fondo}"/><g fill="${C.modulo}">`;
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    if(!q.isDark(y,x)||occhio(y,x))continue;
    /* gli angoli si arrotondano solo dove il modulo non tocca un vicino */
    const su=y>0&&q.isDark(y-1,x),giu=y<n-1&&q.isDark(y+1,x),sx=x>0&&q.isDark(y,x-1),dx=x<n-1&&q.isDark(y,x+1);
    const X=pad+x*px,Y=pad+y*px,R=px*QR_STILE.tondo,W=px+(dx?.4:0),H=px+(giu?.4:0);
    const tl=!su&&!sx?R:0,tr=!su&&!dx?R:0,br=!giu&&!dx?R:0,bl=!giu&&!sx?R:0;
    out+=`<path d="M${X+tl} ${Y}H${X+W-tr}${tr?`Q${X+W} ${Y} ${X+W} ${Y+tr}`:""}V${Y+H-br}${br?`Q${X+W} ${Y+H} ${X+W-br} ${Y+H}`:""}H${X+bl}${bl?`Q${X} ${Y+H} ${X} ${Y+H-bl}`:""}V${Y+tl}${tl?`Q${X} ${Y} ${X+tl} ${Y}`:""}Z"/>`;
  }
  out+="</g>";
  for(const [r,c] of [[0,0],[0,n-7],[n-7,0]]){
    const X=pad+c*px,Y=pad+r*px;
    out+=`<rect x="${X}" y="${Y}" width="${7*px}" height="${7*px}" rx="${px*QR_STILE.occhio}" fill="${C.occhio}"/>
      <rect x="${X+px}" y="${Y+px}" width="${5*px}" height="${5*px}" rx="${px*QR_STILE.interno}" fill="${C.fondo}"/>
      <rect x="${X+2*px}" y="${Y+2*px}" width="${3*px}" height="${3*px}" rx="${px*QR_STILE.pupilla}" fill="${C.pupilla}"/>`;
  }
  return out+"</svg>";
}
function icsFor(t){
  const z=x=>String(x).padStart(2,"0"),f=d=>d.getUTCFullYear()+z(d.getUTCMonth()+1)+z(d.getUTCDate())+"T"+z(d.getUTCHours())+z(d.getUTCMinutes())+"00Z";
  const end=new Date(t.date.getTime()+2*36e5);
  return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//CS//IT","BEGIN:VEVENT","UID:"+t.ref,"DTSTAMP:"+f(new Date()),"DTSTART:"+f(t.date),"DTEND:"+f(end),
    "SUMMARY:"+t.kind+" — L'Arte del Vino","DESCRIPTION:"+t.ref+" · "+t.head,"LOCATION:"+t.place,"END:VEVENT","END:VCALENDAR"].join("\r\n");
}
function buildTicket(){
  const host=$("#tickets");if(!host)return;
  const list=ticketList(),L=T[lang];
  const paid=paySummary();        /* niente piu' "quando": si salda alla conferma */
  host.innerHTML=list.map(t=>`
   <article class="ticket${t.tipo?" k-"+t.tipo:""}" data-tk="${t.idx}">
    <div class="tk-main">
      <img class="tk-art" src="${LOGO}" loading="lazy" decoding="async" alt="" aria-hidden="true">
      <div class="tk-head"><span class="tk-brand">L'Arte del Vino</span><span class="tk-stato">${PRENSTATO?`<span class="tk-attesa"${PRENSTATO==="pagata"?' style="background:var(--green-soft);color:var(--green-ink)"':''}>${PRENSTATO==="pagata"?T[lang].tkPagato:T[lang].tkAttesa}</span>`:""}</span>${t.total>1?`<span class="tk-of">${L.tkOf.replace("%1",t.idx+1).replace("%2",t.total)}</span>`:""}<span class="tk-kind">${t.kind}</span></div>
      <h2>${t.head}</h2>
      <div class="tk-grid">
        <div><span>${L.tkWhen}</span><b>${fmtDate(t.date)}</b></div>
        <div><span>${t.unitLabel}</span><b>${t.q}</b></div>
        <div><span>${L.tkWhere}</span><b>${t.place}</b></div>
        <div><span>${L.tkLang}</span><b>${t.lang}</b></div>
      </div>
      <div class="tk-incl"><span>${L.tkIncl}</span><b>${t.incl}</b></div>
      <div class="tk-foot"><span>${t.price}<small class="tk-iva">${esc(L.ivaShort)}</small></span><span>${paid}</span></div>
    </div>
    <div class="tk-stub">
      <div class="qr">${qrSVG([t.ref,t.kind,t.date.toISOString().slice(0,10),t.q,t.lang].join(" | "),t.ref)}</div>
      <div class="tk-code">${t.ref}</div>
      <span class="tk-scan">${L.tkScan}</span>
      <div class="tk-acts">
        <button type="button" class="tkb" data-save="${t.idx}">${L.tkSave}</button>
        <button type="button" class="tkb" data-cal="${t.idx}">${L.tkCal}</button>
      </div>
    </div>
   </article>`).join("");
  const pr=$("#tkprint");if(pr)pr.onclick=()=>window.print();
  wireWallet();
}
document.addEventListener("click",e=>{
  const sv=e.target.closest("[data-save]");if(sv){shareTicket(+sv.dataset.save);return;}
  const cl=e.target.closest("[data-cal]");
  if(cl){const t=ticketList()[+cl.dataset.cal];
    const a=document.createElement("a");a.href="data:text/calendar;charset=utf-8,"+encodeURIComponent(icsFor(t));a.download=t.ref+".ics";a.click();}
});
const paygo=$("#paygo");
if(paygo)paygo.addEventListener("click",()=>{
  payTouched=true;payCheck();
  if(!payValid()){
    const d=$("#paydetail");if(d){d.classList.remove("shake");void d.offsetWidth;d.classList.add("shake");}
    const bad=$("#paydetail input.wrong");if(bad)bad.focus();
    return;
  }
  if(API){bloccaEPaga();return;}
  if(PAY.how==="card"&&PSP_URL){                 /* il fornitore incassa, noi passiamo solo i dati minimi */
    location.href=PSP_URL+(PSP_URL.includes("?")?"&":"?")
      +"amount="+payAmount().toFixed(2)+"&currency=EUR&ref="+encodeURIComponent(bookingRef());
    return;
  }
  go("#ticket");
});

/* ---------------- SALVATAGGIO DEL BIGLIETTO ---------------- */
/* PASS_URL: quando avrai la funzione server che firma i pass, mettici il suo indirizzo
   (es. "/.netlify/functions/pass") e i due bottoni Wallet si attivano da soli. */
const PASS_URL=null;
function ticketPNG(i){
  const t=ticketList()[i||0],W=1000,H=1500,c=document.createElement("canvas");
  c.width=W;c.height=H;const x=c.getContext("2d");
  const F=(w,s,f)=>`${w} ${s}px ${f||"'Cabinet Grotesk',Helvetica,Arial,sans-serif"}`;
  x.fillStyle="#FBF5EF";x.fillRect(0,0,W,H);
  /* corpo */
  x.fillStyle="#fff";x.strokeStyle="#1E121A";x.lineWidth=5;
  const rr=(a,b,w2,h2,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w2,b,a+w2,b+h2,r);x.arcTo(a+w2,b+h2,a,b+h2,r);x.arcTo(a,b+h2,a,b,r);x.arcTo(a,b,a+w2,b,r);x.closePath();};
  rr(50,50,900,1400,44);x.fill();x.stroke();
  x.fillStyle="#1E121A";x.font=F(800,30);x.fillText("CHRISTIAN SCOGNAMIGLIO",90,130);
  x.fillStyle="#7E5772";x.font=F(700,26);x.fillText(t.kind.toUpperCase(),90,178);
  x.fillStyle="#3B2A33";x.font=F(800,64);
  (t.head.length>22?[t.head.slice(0,t.head.lastIndexOf(" ",22)),t.head.slice(t.head.lastIndexOf(" ",22)+1)]:[t.head])
    .forEach((ln,i)=>x.fillText(ln,90,270+i*70));
  const rows=[[T[lang].tkWhen,fmtDate(t.date)],[t.unitLabel,t.q],[T[lang].tkWhere,t.place],[T[lang].tkLang,t.lang]];
  rows.forEach((r,i)=>{const cx=90+(i%2)*430,cy=430+Math.floor(i/2)*120;
    x.fillStyle="#8b7d84";x.font=F(500,22);x.fillText(String(r[0]).toUpperCase(),cx,cy);
    x.fillStyle="#3B2A33";x.font=F(700,34);x.fillText(String(r[1]),cx,cy+42);});
  x.strokeStyle="rgba(30,18,26,.35)";x.setLineDash([12,10]);x.lineWidth=3;
  x.beginPath();x.moveTo(90,700);x.lineTo(910,700);x.stroke();x.setLineDash([]);
  x.fillStyle="#8b7d84";x.font=F(500,22);x.fillText(T[lang].tkIncl.toUpperCase(),90,750);
  x.fillStyle="#3B2A33";x.font=F(700,30);x.fillText(t.incl,90,792);
  x.font=F(800,52);x.fillText(t.price,90,880);
  /* tagliando col QR */
  x.fillStyle="#F4E7DA";rr(90,930,820,460,30);x.fill();x.strokeStyle="#1E121A";x.lineWidth=4;x.stroke();
  const q=qrcode(0,"M");q.addData([t.ref,t.kind,t.date.toISOString().slice(0,10),t.q,t.lang].join(" | "));q.make();
  const n=q.getModuleCount(),S=Math.floor(300/n),qs=n*S,qx=(W-qs)/2,qy=960;
  x.fillStyle="#fff";x.fillRect(qx-16,qy-16,qs+32,qs+32);
  x.fillStyle="#1E121A";
  for(let r2=0;r2<n;r2++)for(let c2=0;c2<n;c2++)if(q.isDark(r2,c2))x.fillRect(qx+c2*S,qy+r2*S,S,S);
  x.textAlign="center";x.fillStyle="#3B2A33";x.font=F(800,44);x.fillText(t.ref,W/2,qy+qs+70);
  x.fillStyle="#8b7d84";x.font=F(500,24);x.fillText(T[lang].tkScan,W/2,qy+qs+112);
  x.textAlign="left";
  return{canvas:c,ref:t.ref};
}
function saveTicketImage(i){
  const{canvas,ref}=ticketPNG(i);
  canvas.toBlob(b=>{
    const url=URL.createObjectURL(b),a=document.createElement("a");
    a.href=url;a.download="biglietto-"+ref+".png";a.click();
    setTimeout(()=>URL.revokeObjectURL(url),4000);
  },"image/png");
}
async function shareTicket(i){
  const{canvas,ref}=ticketPNG(i);
  canvas.toBlob(async b=>{
    const file=new File([b],"biglietto-"+ref+".png",{type:"image/png"});
    if(navigator.canShare&&navigator.canShare({files:[file]})){
      try{await navigator.share({files:[file],title:"Biglietto "+ref});return;}catch(_){}
    }
    saveTicketImage(i);
  },"image/png");
}
function wireWallet(){
  const box=$("#walletbox");if(!box)return;
  const on=!!PASS_URL;
  box.querySelectorAll("[data-pass]").forEach(b=>{
    b.classList.toggle("off",!on);
    b.onclick=on?()=>{location.href=PASS_URL+"?ref="+encodeURIComponent(bookingRef())+"&type="+b.dataset.pass;}:null;
  });
}


/* ---------------- CODICE PROMOZIONALE DAI VOLANTINI ---------------- */
const PROMOS={PRIMA10:{off:.10,first:true}};
let promo=null;
function initPromo(){
  const q=new URLSearchParams(location.search).get("promo");
  const code=(q||store.get("promo")||"").toUpperCase();
  if(code&&PROMOS[code]){promo=code;store.set("promo",code);}
  const bar=$("#promobar");if(!bar)return;
  if(promo){bar.hidden=false;bar.innerHTML=`<b>-${Math.round(PROMOS[promo].off*100)}%</b><span>${T[lang].prT2}</span><em>${promo}</em><button type="button" id="promox" aria-label="chiudi">×</button>`;}
  else bar.hidden=true;
}
document.addEventListener("click",e=>{if(e.target.closest("#promox")){promo=null;store.set("promo","");$("#promobar").hidden=true;$$("[data-conf]").forEach(calc);buildCart();}});
/* ---------------- CALENDARIO DISPONIBILITÀ ---------------- */
/* SLOTS_URL: metti l'indirizzo di un file JSON (anche su Netlify o un foglio pubblicato)
   e il calendario si aggiorna da solo ogni minuto. Formato:
   { "2026-10-03": {"s":"low","n":"Italia in sei bicchieri · 18:00"} , "2026-10-05":{"s":"out"} } */
const SLOTS_URL=null;
let SLOTS={},calRef=new Date(),calPick=null;
function seedSlots(){
  /* Lunedi' vino, martedi' Champagne, mercoledi' fortificati, alle 18:00.
     Senza server non sappiamo quanti posti sono gia' presi: nessun
     numero inventato, nessun "esaurito" finto. Con il server (API o
     SLOTS_URL) questi valori vengono sostituiti da quelli veri. */
  const s={},d=new Date();d.setHours(12,0,0,0);
  for(let i=1;i<120;i++){
    const x=new Date(d.getTime()+i*864e5),t=SERATE[x.getDay()];
    if(t)s[iso(x)]={s:"free",tema:t,ore:[ORA_SERATA]};
  }
  return s;
}
function iso(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function buildCal(){
  const grid=$("#calgrid");if(!grid)return;
  if(!Object.keys(SLOTS).length)SLOTS=seedSlots();
  const L=lang==="de"?"de-DE":"it-IT";
  $("#calmonth").textContent=calRef.toLocaleDateString(L,{month:"long",year:"numeric"});
  $("#caldow").innerHTML=(lang==="de"?["Mo","Di","Mi","Do","Fr","Sa","So"]:["lun","mar","mer","gio","ven","sab","dom"]).map(x=>`<span>${x}</span>`).join("");
  const y=calRef.getFullYear(),m=calRef.getMonth(),first=new Date(y,m,1),start=(first.getDay()+6)%7,days=new Date(y,m+1,0).getDate();
  const today=iso(new Date());let out="";
  for(let i=0;i<start;i++)out+='<span class="cell empty"></span>';
  for(let n=1;n<=days;n++){
    const k=iso(new Date(y,m,n)),info=SLOTS[k],st=info?info.s:"none",past=k<today;
    const can=!past&&(st==="free"||st==="low");
    const tm=info?(info.tema||temaDi(k)):null;
    out+=`<button type="button" class="cell ${past?"past":st}${tm&&!past?" t-"+tm:""} ${calPick===k?"pick":""}" ${can?`data-d="${k}" aria-label="${esc(dataBreve(k,true)+" · "+nomeSerata(tm))}"`:"disabled"}><b>${n}</b><i></i></button>`;
  }
  grid.innerHTML=out;
  $("#calup").textContent=(lang==="de"?"Stand ":"aggiornato ")+new Date().toLocaleTimeString(L,{hour:"2-digit",minute:"2-digit"});
  showPick();
}
function showPick(){
  const el=$("#caldetail");if(!el)return;
  if(!calPick){el.className="cal-detail";el.innerHTML="";return;}
  const i=SLOTS[calPick]||{},L=lang==="de"?"de-DE":"it-IT";
  el.className="cal-detail on";
  const tm=i.tema||temaDi(calPick),n=postiDi(calPick);
  el.innerHTML=`<div><b>${esc(dataBreve(calPick,true))} · ${ORA_SERATA}</b><span>${esc(nomeSerata(tm))} · ${euro(homePP(tm))} ${esc(T[lang].uPax)} · ${n===null?esc(T[lang].bkCap.replace("%",POSTI_SERATA)):esc(T[lang].bkLeft.replace("%",n))}</span></div>
    <a class="btn dark" href="#privati/p-prenota?d=${calPick}">${esc(T[lang].calGo)}</a>`;
}
document.addEventListener("click",e=>{
  const c=e.target.closest(".cell[data-d]");
  if(c){calPick=c.dataset.d;const f=$("#fdate");if(f)f.value=calPick;buildCal();
    setTimeout(()=>$("#caldetail")?.scrollIntoView({behavior:"smooth",block:"center"}),60);return;}
  if(e.target.closest("#calprev")){calRef=new Date(calRef.getFullYear(),calRef.getMonth()-1,1);buildCal();}
  if(e.target.closest("#calnext")){calRef=new Date(calRef.getFullYear(),calRef.getMonth()+1,1);buildCal();}
});
const FONTE_SLOT=API?API+"/slots":SLOTS_URL;
async function pullSlots(){
  if(!FONTE_SLOT)return;
  try{
    const r=await fetch(FONTE_SLOT,{cache:"no-store"});
    if(r.ok){const j=await r.json();if(j&&typeof j==="object"&&!Array.isArray(j)){SLOTS=j;buildCal();renderBook();buildEvents();}}
  }catch(_){}
}
if(FONTE_SLOT){pullSlots();setInterval(pullSlots,60000);}

/* ---------------- CHAT ---------------- */
/* AGENT_URL: quando avrai una funzione server con la chiave Anthropic, mettila qui
   (es. "/.netlify/functions/agent") e l'assistente passa all'IA vera. */
const AGENT_URL=null;
let chatReady=false;
function chatSay(who,text,html){
  const m=document.createElement("div");m.className="m "+who;
  if(html){m.innerHTML=text;}                 /* solo i nostri bottoni, mai testo di fuori */
  else{const sp=document.createElement("span");sp.textContent=text;m.append(sp);}
  $("#msgs").append(m);$("#msgs").scrollTop=$("#msgs").scrollHeight;return m;
}
function chatThink(){const m=chatSay("bot",'<span class="typing"><i></i><i></i><i></i></span>',true);return m;}
function kb(){
  const base=FAQ[lang].map(q=>({q:q[0],a:q[1]}));
  const de=lang==="de";
  base.push(
   {q:de?"Preise Kosten wie viel kostet":"prezzi costo quanto costa",a:de?"Abende im Saal: Montag Wein 49 €, Dienstag Champagner 69 €, Mittwoch Likörweine 64 € pro Person, Weine inklusive. Teambuilding ab 55 € pro Person, Schulungen ab 150 € pro Termin, Abend in eurem Lokal 290–390 €. Keine USt. (§ 19 UStG).":"Serate in sala: lunedì vino 49 €, martedì Champagne 69 €, mercoledì vini fortificati 64 € a persona, vini inclusi. Team building da 55 € a persona, formazione da 150 € a sessione, serata nel vostro locale 290–390 €. Niente IVA (§19 UStG)."},
   {q:de?"Termin Termine frei Kalender wann Abende":"quando date serate calendario disponibilità",a:de?"Jeden Montag, Dienstag und Mittwoch um 18:00 Uhr bei Partenope 081, 40 Plätze pro Abend. Buchen kannst du unter Privat → Sichere dir deinen Platz; den Kalender findest du unter Anfragen.":"Ogni lunedì, martedì e mercoledì alle 18:00 da Partenope 081, 40 posti a serata. Prenoti da Privati → Prenota il tuo posto; il calendario completo è nella pagina Richiedi."},
   {q:de?"allein Gruppe Plätze wie viele Personen":"solo gruppo posti quante persone",a:de?"Du kannst auch allein kommen. Online buchst du 1 bis 10 Plätze; für größere Gruppen schreib mir.":"Puoi venire anche da solo. Online prenoti da 1 a 10 posti; per gruppi più grandi scrivimi."},
   {q:de?"Sprache Sprachen italienisch spanisch englisch":"lingue lingua spagnolo inglese tedesco",a:de?"Ich spreche Deutsch, Italienisch, Spanisch und Englisch: Fragen in allen vier sind willkommen.":"Parlo italiano, tedesco, spagnolo e inglese: le domande sono benvenute in tutte e quattro."},
   {q:de?"Gutschein verschenken Geschenk":"regalo buono voucher",a:de?"Es gibt Gutscheine als PDF, drei Jahre gültig, der Termin wird später gewählt.":"C'è il buono regalo in PDF: vale tre anni e la data si sceglie dopo."},
   {q:de?"wo Adresse Ort Partenope":"dove indirizzo luogo partenope",a:de?"Bei Partenope 081 in Berlin. Die genaue Adresse kommt mit der Bestätigung.":"Da Partenope 081, a Berlino. L'indirizzo preciso arriva con la conferma."});
  return base;
}
function answer(txt){
  const t=txt.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu," "),ws=t.split(/\s+/).filter(w=>w.length>3);
  let best=null,score=0;
  kb().forEach(e=>{
    const hay=(e.q+" "+e.a).toLowerCase();
    const s=ws.reduce((a,w)=>a+(hay.includes(w)?1:0),0)/Math.max(ws.length,1);
    if(s>score){score=s;best=e;}
  });
  return score>=0.34?best.a:null;
}
function chatChips(){
  const c=lang==="de"?["Preise","Wann sind die Abende?","Kann ich allein kommen?","Wie viel Wein?","Gutschein"]:["Prezzi","Quando ci sono le serate?","Posso venire da solo?","Quanto vino si beve?","Buono regalo"];
  $("#chatchips").innerHTML=c.map(x=>`<button type="button" class="cchip">${x}</button>`).join("");
}
async function chatAsk(txt){
  chatSay("me",txt);
  const think=chatThink();
  if(AGENT_URL){
    try{
      const r=await fetch(AGENT_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({q:txt,lang})});
      const j=await r.json();think.remove();chatSay("bot",j.a||T[lang].chNo);return;
    }catch(_){}
  }
  setTimeout(()=>{
    think.remove();
    const a=answer(txt);
    chatSay("bot",a||T[lang].chNo);
    if(!a)chatSay("bot",`<a class="btn dark sm" href="https://wa.me/4915207030279">${T[lang].chWA}</a>`,true);
  },600+Math.random()*500);
}
function openChat(){
  $("#chat").hidden=false;requestAnimationFrame(()=>$("#chat").classList.add("open"));
  $("#chatbtn").setAttribute("aria-expanded","true");$("#chatbadge").style.display="none";
  if(!chatReady){chatReady=true;chatChips();chatSay("bot",T[lang].chHi);}
  setTimeout(()=>$("#chatin")?.focus(),300);
}
function closeChat(){$("#chat").classList.remove("open");$("#chatbtn").setAttribute("aria-expanded","false");setTimeout(()=>$("#chat").hidden=true,320);}
document.addEventListener("click",e=>{
  if(e.target.closest("#chatbtn")){$("#chat").hidden?openChat():closeChat();return;}
  if(e.target.closest("#chatx")){closeChat();return;}
  const chip=e.target.closest(".cchip");if(chip){chatAsk(chip.textContent);return;}
  if(e.target.closest("#chatsend")){const i=$("#chatin");if(i.value.trim()){chatAsk(i.value.trim());i.value="";}}
});
document.addEventListener("keydown",e=>{
  if(e.key==="Enter"&&e.target.id==="chatin"&&e.target.value.trim()){chatAsk(e.target.value.trim());e.target.value="";}
  if(e.key==="Escape"&&!$("#chat").hidden)closeChat();
});
/* ---------------- MAZZO DELLE RECENSIONI ---------------- */
let deckI=0,deckT=null;
function buildDeck(){
  const d=$("#quotes");if(!d)return;
  /* Fuori le non compilate: una recensione con [Nome] al posto del nome
     e' un segnaposto mio, e una recensione inventata sul sito di chi
     vende e' vietata. Resta nascosta finche' non ci metti il nome vero. */
  const vere=(QUOTES[lang]||[]).filter(q=>!/\[(Nome|Name)\]/.test(q[1]||""));
  const sez=document.querySelector("#voci");
  if(sez)sez.hidden=!vere.length;
  if(!vere.length){d.innerHTML="";const dv=$("#dots");if(dv)dv.innerHTML="";return;}
  d.innerHTML=vere.map((q,i)=>`<article class="qnote" data-n="${i}"><div class="stars">★★★★★</div><p>${esc(q[0])}</p><footer>${esc(q[1])}</footer></article>`).join("");
  const dots=$("#dots");if(dots)dots.innerHTML=vere.map((_,i)=>`<button type="button" data-go="${i}" aria-label="${i+1}"></button>`).join("");
  if(deckI>=vere.length)deckI=0;
  layDeck();startDeck();
}
function layDeck(){
  const cards=$$("#quotes .qnote"),n=cards.length;if(!n)return;
  cards.forEach((el,i)=>{
    const pos=(i-deckI+n)%n,show=pos<3;
    el.classList.remove("out");
    el.style.transform=`translateY(${pos*7}px) scale(${1-pos*.028})`;
    el.style.zIndex=n-pos;el.style.opacity=show?1:0;el.style.pointerEvents=pos===0?"auto":"none";
    el.classList.toggle("sotto",pos>0);
  });
  $$("#dots button").forEach((b,i)=>b.classList.toggle("on",i===deckI));
}
function nextNote(){
  const cards=$$("#quotes .qnote"),n=cards.length;if(!n)return;
  const front=cards[deckI];front.classList.add("out");             /* scivola in alto e sparisce */
  setTimeout(()=>{deckI=(deckI+1)%n;layDeck();},420);
}
function startDeck(){clearInterval(deckT);deckT=setInterval(nextNote,5200);}
function pauseDeck(ms){clearInterval(deckT);deckT=setTimeout(startDeck,ms||6000);}
document.addEventListener("click",e=>{
  const dot=e.target.closest("#dots button");
  if(dot){pauseDeck();deckI=+dot.dataset.go;layDeck();return;}
  if(e.target.closest("#quotes .qnote")){pauseDeck();nextNote();}
});
(function deckSwipe(){
  const d=$("#quotes");if(!d)return;
  let y0=null;
  d.addEventListener("pointerdown",e=>{y0=e.clientY;pauseDeck();});
  d.addEventListener("pointerup",e=>{if(y0!==null&&y0-e.clientY>40)nextNote();y0=null;});
  d.addEventListener("pointerleave",()=>{y0=null;});
  d.addEventListener("mouseenter",()=>clearInterval(deckT));
  d.addEventListener("mouseleave",()=>startDeck());
})();
/* ---------------- CAROSELLO DELLE LEZIONI ---------------- */
function buildRail(){
  const t=$("#railtrack");if(!t)return;
  const LOCK='<svg class="lk" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.6"/><path d="M8.3 10.5V8a3.7 3.7 0 0 1 7.4 0v2.5"/><circle cx="12" cy="15.4" r="1.25"/></svg>';
  const card=l=>{
    const open=l[6]!==false;
    const inner=`<span class="top-row"><span class="ic"><svg viewBox="0 0 24 24" class="i-${l[0]}" aria-hidden="true">${LICON[l[0]]}</svg></span>${open?flags(l[4]):LOCK}</span>
      <h3>${l[1]}</h3><p>${l[2]}</p>${open?level(l[5]):`<span class="soon">${T[lang].lesSoon}</span>`}<span class="meta">${l[3]}</span>`;
    return open
      ? `<a class="lesson" href="#privati/p-prenota${LTIPO[l[0]]?"?t="+LTIPO[l[0]]:""}">${inner}<span class="golink">${T[lang].lesGo} →</span></a>`
      : `<div class="lesson locked" role="group" aria-disabled="true" title="${T[lang].lesSoon}">${inner}</div>`;
  };
  const set=LESSONS[lang].map(card).join("");
  /* La seconda serie serve solo a far girare lo scorrimento senza salto:
     e' un doppione, quindi la tastiera la salta e i lettori di schermo
     non la annunciano. Altrimenti si tabula dentro schede invisibili. */
  t.innerHTML=set+`<span class="doppio" aria-hidden="true">${set}</span>`;
  const dop=t.querySelector(".doppio");
  if(dop){
    if("inert" in HTMLElement.prototype)dop.inert=true;
    dop.querySelectorAll("a,button").forEach(e=>e.tabIndex=-1);  /* per i browser vecchi */
  }
}
(function railScorri(){
  const r=$("#rail");if(!r)return;
  const lento=matchMedia("(prefers-reduced-motion:reduce)").matches;
  const VELOCITA=24;                 /* pixel al secondo, da soli */
  let fermo=false,riprendi=0,ultimo=0,resto=0;
  let giu=false,x0=0,left0=0,mosso=0,attesa=null,mouse=false;

  const meta=()=>r.scrollWidth/2;    /* la serie di schede è doppia: a metà si ricomincia */
  function avvolgi(){
    const m=meta();if(m<=0)return;
    if(r.scrollLeft>=m)r.scrollLeft-=m;
    else if(r.scrollLeft<0)r.scrollLeft+=m;
  }
  function pausa(ms){
    fermo=true;clearTimeout(riprendi);
    riprendi=setTimeout(()=>{fermo=false;},ms);
  }

  /* un solo tocco allo scorrimento per fotogramma: è questo che toglie gli scatti */
  function battito(t){
    requestAnimationFrame(battito);
    if(attesa!==null){r.scrollLeft=attesa;attesa=null;avvolgi();ultimo=t;return;}
    if(fermo||giu||document.hidden||lento||!r.offsetParent||r.classList.contains("fermo")){ultimo=t;return;}
    const dt=ultimo?Math.min(64,t-ultimo):0;ultimo=t;
    resto+=VELOCITA*dt/1000;
    const passo=Math.floor(resto);
    if(passo>=1){resto-=passo;r.scrollLeft+=passo;avvolgi();}
  }
  requestAnimationFrame(battito);

  /* il dito: lo fa scorrere il browser da solo, con la sua inerzia */
  r.addEventListener("scroll",()=>{if(!giu)avvolgi();},{passive:true});
  r.addEventListener("pointerdown",e=>{
    pausa(2500);mosso=0;mouse=e.pointerType==="mouse";
    if(!mouse)return;                /* dito e penna: ci pensa il browser */
    giu=true;x0=e.clientX;left0=r.scrollLeft;r.classList.add("drag");
    try{r.setPointerCapture(e.pointerId);}catch(_){}
  });
  r.addEventListener("pointermove",e=>{
    if(!giu)return;
    const dx=e.clientX-x0;mosso=Math.abs(dx);
    attesa=left0-dx;                 /* applicato nel battito, non qui */
  });
  const su=()=>{if(!giu)return;giu=false;r.classList.remove("drag");pausa(1600);};
  r.addEventListener("pointerup",su);r.addEventListener("pointercancel",su);
  r.addEventListener("mouseenter",()=>pausa(99999));
  r.addEventListener("mouseleave",()=>pausa(300));
  r.addEventListener("touchstart",()=>pausa(2500),{passive:true});
  r.addEventListener("touchend",()=>pausa(1600),{passive:true});
  r.addEventListener("click",e=>{if(mosso>6)e.preventDefault();},true);
})();
/* ---------------- CONFIGURATORE (due istanze, ognuna nel suo blocco) ---------------- */
function euro(n){return new Intl.NumberFormat(lang==="de"?"de-DE":"it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);}
function syncFields(root){
  const mode=root.dataset.conf,q=s=>root.querySelector(s),fmt=q(".formato")?.value,rf=q(".rformato")?.value;
  const showHours=(mode==="priv"&&fmt==="uno")||(mode==="rist"&&rf==="staff");
  const showWines=(mode==="priv"&&fmt==="team")||(mode==="rist"&&rf==="evening");
  const btn=root.closest(".cards")?.querySelector("#addconf");
  if(btn&&mode==="priv")btn.textContent=fmt==="home"?T[lang].bkGo:T[lang].caAddConf;
  const ft=q(".f-tipo");if(ft)ft.style.display=(mode==="priv"&&fmt==="home")?"":"none";
  q(".f-hours").style.display=showHours?"":"none";q(".f-wines").style.display=showWines?"":"none";q(".f-people").style.display=(mode==="priv"&&fmt==="uno")?"none":"";
}
/* UN SOLO LISTINO: lo usano sia il preventivo sia il carrello, cosi' il prezzo non cambia mai strada */
function priceRows(cfg){
  const de=lang==="de",rows=[];
  const pax=Math.max(1,+cfg.pax||1),ore=Math.max(1,+cfg.ore||1),vini=Math.max(0,+cfg.vini||0);
  let perPax=true,n=pax;
  if(cfg.mode==="priv"){
    if(cfg.fmt==="home"){
      n=Math.max(pax,P.homeMin);
      const tp=TIPI.includes(cfg.tipo)?cfg.tipo:"vino",pp=homePP(tp);
      n=Math.min(n,POSTI_MAX);
      rows.push([`${nomeSerata(tp)} · ${n} ${de?"Pl.":"posti"} × ${euro(pp)}`,pp*n]);
    }else if(cfg.fmt==="corso"){
      n=Math.max(pax,3);
      rows.push([`${de?"Kurs, 4 Termine":"Corso, 4 incontri"} · ${n} × ${euro(P.corso)}`,P.corso*n]);
    }else if(cfg.fmt==="team"){
      n=Math.max(pax,P.teamMin);
      rows.push([`Teambuilding · ${n} ${de?"Pers.":"pers."} × ${euro(P.team)}`,P.team*n]);
      if(vini>6)rows.push([`${vini-6} ${de?"Extra-Weine":"vini extra"} · ${n} ${de?"Pers.":"pers."}`,(vini-6)*P.extraWine*n]);
    }else{
      perPax=false;
      const x=ore>=5?Math.round(P.uno5/5*ore):P.uno*ore;
      rows.push([`${de?"Nachhilfe":"Ripetizioni"} · ${ore} h${ore>=5?(de?" (Paketpreis)":" (prezzo pacchetto)"):""}`,x]);
    }
  }else{
    perPax=false;
    if(cfg.rf==="staff"){
      const x=ore<=2?P.staff2h:ore<=4?P.staff4h:P.staff4h+(ore-4)*P.staffHour;
      rows.push([`${de?"Team-Schulung":"Formazione team"} · ${ore} h`,x]);
      if(pax>8)rows.push([de?"Team über 8 Personen":"Team oltre 8 persone",(pax-8)*P.staffExtraPax]);
    }else{
      const plus=vini>0;
      rows.push([`${de?"Abend für Gäste":"Serata per i clienti"} · ${plus?"Plus":"Base"}`,plus?P.eveningPlus:P.eveningBase]);
      if(plus)rows.push([`${vini} ${de?"Weine über mich":"vini dal mio fornitore"} · ${Math.min(pax,12)} ${de?"Pers.":"pers."}`,P.ristWine*vini*Math.min(pax,12)]);
    }
  }
  return {rows,tot:rows.reduce((t,r)=>t+r[1],0),perPax,n};
}
function readConf(root){
  const q=s=>root.querySelector(s);
  return {mode:root.dataset.conf,
    pax:Math.max(1,+q(".persone").value||1),
    ore:Math.max(1,+q(".ore").value||1),
    vini:Math.max(0,+q(".vini").value||0),
    tipo:q(".tipo")?.value,fmt:q(".formato")?.value,rf:q(".rformato")?.value};
}
function confSum(cfg){                      /* la riga corta che compare nel carrello */
  const de=lang==="de",p=de?"Pers.":"pers.",b=[];
  if(cfg.mode==="priv"){
    if(cfg.fmt==="uno")b.push(cfg.ore+" h");
    else{b.push(Math.max(cfg.pax,cfg.fmt==="home"?P.homeMin:cfg.fmt==="team"?P.teamMin:3)+" "+p);
         if(cfg.fmt!=="corso")b.push(cfg.vini+(de?" Weine":" vini"));}
  }else if(cfg.rf==="staff"){b.push(cfg.ore+" h");b.push(cfg.pax+" "+p);}
  else{b.push(cfg.vini>0?"Plus":"Base");b.push(cfg.pax+" "+p);if(cfg.vini>0)b.push(cfg.vini+(de?" Weine":" vini"));}
  return b.join(" · ");
}
function calc(root){
  if(root.dataset.conf)syncFields(root);
  const out=root.parentElement,o=s=>out.querySelector(s);
  const cfg=readConf(root),r=priceRows(cfg),rows=r.rows.slice();
  if(promo)rows.push([`${T[lang].prLine} ${promo}`,-Math.round(r.tot*PROMOS[promo].off)]);
  const tot=rows.reduce((t,x)=>t+x[1],0);
  o(".breakdown").innerHTML=rows.map(x=>`<div class="${x[1]<0?"neg":""}"><span>${x[0]}</span><span>${euro(x[1])}</span></div>`).join("");
  const el=o(".totale");el.style.opacity=".35";setTimeout(()=>{el.textContent=euro(tot);el.style.opacity="1";},90);
  o(".totale-sub").textContent=(r.perPax?`${euro(Math.round(tot/r.n))} ${T[lang].perPers} · `:"")+T[lang].iva;
  const view=root.closest(".view");if(view&&!view.hidden)sess.set("quote",rows.map(x=>`- ${x[0]}: ${euro(x[1])}`).join("\n")+`\n${T[lang].tot}: ${euro(tot)}`);
}
$$("[data-conf]").forEach(root=>{
  root.querySelectorAll(".stepper button").forEach(b=>b.addEventListener("click",()=>{const i=root.querySelector(b.dataset.t);i.value=Math.min(+i.max,Math.max(+i.min,(+i.value||0)+(+b.dataset.step)));calc(root);}));
  root.querySelectorAll("select,input").forEach(e=>e.addEventListener("input",()=>{syncFields(root);calc(root);}));
  syncFields(root);
});


/* =====================================================================
   ELEMENTI DI VINO: ruota degli aromi, colori, abbinamenti, quiz,
   calice dell'hero, numeri, carte che si inclinano. Tutto qui dentro,
   niente librerie e niente risorse esterne.
   ===================================================================== */
const AROMI=[
 {c:"#C2334F",t:"vino",it:["Frutta rossa","ciliegia, fragola, lampone, ribes","Tipica di Pinot Nero, Sangiovese e di molti rosé: freschezza e vivacità."],
  de:["Rote Früchte","Kirsche, Erdbeere, Himbeere, Johannisbeere","Typisch für Spätburgunder, Sangiovese und viele Rosés: frisch und lebendig."]},
 {c:"#4A1A3A",t:"vino",it:["Frutta nera","mora, mirtillo, prugna, cassis","La trovi in Cabernet Sauvignon, Syrah e Aglianico: rossi più scuri e strutturati."],
  de:["Schwarze Früchte","Brombeere, Heidelbeere, Pflaume, Cassis","Steckt in Cabernet Sauvignon, Syrah und Aglianico: dunklere, kräftigere Rote."]},
 {c:"#E3B23C",t:"bolle",it:["Agrumi e frutta bianca","limone, pompelmo, mela verde, pera","Il cuore di Riesling, Vermentino e dei Blanc de Blancs: un'acidità che fa venire l'acquolina."],
  de:["Zitrus und Kernobst","Zitrone, Grapefruit, grüner Apfel, Birne","Das Herz von Riesling, Vermentino und Blanc de Blancs: eine Säure, die Appetit macht."]},
 {c:"#B07AA1",t:"vino",it:["Fiori","rosa, violetta, fiori d'arancio, sambuco","Il Nebbiolo profuma di rosa e violetta, il Moscato di fiori d'arancio."],
  de:["Blüten","Rose, Veilchen, Orangenblüte, Holunder","Nebbiolo duftet nach Rose und Veilchen, Moscato nach Orangenblüte."]},
 {c:"#8C3B1E",t:"vino",it:["Spezie","pepe nero, chiodi di garofano, liquirizia, vaniglia","Il pepe è la firma del Syrah; vaniglia e chiodi di garofano arrivano spesso dal legno."],
  de:["Gewürze","schwarzer Pfeffer, Nelke, Lakritz, Vanille","Pfeffer ist die Handschrift des Syrah; Vanille und Nelke kommen oft vom Holz."]},
 {c:"#5E8C4A",t:"vino",it:["Erbe e note verdi","erba tagliata, salvia, peperone, menta","Sauvignon Blanc e Cabernet Franc: freschezza vegetale, a volte quasi balsamica."],
  de:["Kräuter und Grünes","frisches Gras, Salbei, Paprika, Minze","Sauvignon Blanc und Cabernet Franc: grüne Frische, manchmal fast balsamisch."]},
 {c:"#C9A26B",t:"bolle",it:["Lievito e tostato","crosta di pane, brioche, nocciola, caffè","Arriva dai mesi passati sui lieviti: è il profumo che distingue uno Champagne affinato."],
  de:["Hefe und Röstnoten","Brotkruste, Brioche, Haselnuss, Kaffee","Entsteht in den Monaten auf der Hefe: der Duft, der einen gereiften Champagner verrät."]},
 {c:"#9A5418",t:"fort",it:["Frutta secca e caramello","fico, uvetta, noce, caramello, mandorla","Il mondo dei fortificati: Porto Tawny, Sherry Oloroso, Marsala e Madeira."],
  de:["Trockenfrüchte und Karamell","Feige, Rosine, Walnuss, Karamell, Mandel","Die Welt der Likörweine: Tawny Port, Oloroso-Sherry, Marsala und Madeira."]}];
let aromaSel=-1;
function giornoDi(t){const g=T[lang]["gd_"+t];return lang==="it"?g.toLowerCase():g;}
function buildAromi(){
  const svg=$("#ruota");if(!svg)return;
  const n=AROMI.length,R1=104,R0=50,gap=.012;
  const pt=(r,a)=>[(r*Math.sin(a)).toFixed(2),(-r*Math.cos(a)).toFixed(2)];
  svg.innerHTML=AROMI.map((a,i)=>{
    const a0=i/n*2*Math.PI+gap,a1=(i+1)/n*2*Math.PI-gap;
    const [x0,y0]=pt(R1,a0),[x1,y1]=pt(R1,a1),[x2,y2]=pt(R0,a1),[x3,y3]=pt(R0,a0);
    const am=(a0+a1)/2,[lx,ly]=pt((R0+R1)/2,am);
    return `<g class="spicchio${i===aromaSel?" on":""}" data-aroma="${i}" style="--c:${a.c}">
      <path d="M${x0} ${y0}A${R1} ${R1} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${R0} ${R0} 0 0 0 ${x3} ${y3}Z"/>
      <circle cx="${lx}" cy="${ly}" r="4.2"/></g>`;
  }).join("")+`<circle class="ruota-buco" r="${R0-6}"/>`;
  $("#arochips").innerHTML=AROMI.map((a,i)=>`<button type="button" data-aroma="${i}" aria-pressed="${i===aromaSel}" style="--c:${a.c}"><i></i>${esc(a[lang][0])}</button>`).join("");
  const L=T[lang],c=$("#aromacard"),cc=$("#ruotac");
  if(aromaSel<0){c.innerHTML=`<p class="note">${esc(L.aroHint)}</p>`;cc.textContent="";c.style.removeProperty("--c");return;}
  const a=AROMI[aromaSel],[nome,note,dove]=a[lang];
  if(cc.textContent!==nome){cc.textContent=nome;cc.classList.remove("cambia");void cc.offsetWidth;cc.classList.add("cambia");}
  c.style.setProperty("--c",a.c);
  c.innerHTML=`<span class="tagline">${esc(nome)}</span><h3>${esc(note)}</h3><p><b>${esc(L.aroIn)}:</b> ${esc(dove)}</p>
    <a class="btn sm" href="#privati/p-prenota?t=${a.t}">${esc(L.aroGo.replace("%",giornoDi(a.t)))}</a>`;
}
document.addEventListener("click",e=>{const g=e.target.closest("[data-aroma]");if(!g)return;
  aromaSel=+g.dataset.aroma;buildAromi();
  const r=$("#ruota");if(r){r.classList.remove("pulse");void r.getBoundingClientRect();r.classList.add("pulse");}});

const COLORI={
 it:[["colB",[["Verdolino","#E4EBA6","Giovane e fresco: riflessi verdi, spesso un vino di pochi mesi, senza legno."],["Paglierino","#F0DE93","Il colore più comune dei bianchi: maturità giusta, frutta pulita."],["Dorato","#E1B84C","Più maturo: affinamento in legno, qualche anno in bottiglia o uve molto mature."],["Ambrato","#C2802A","Ossidazione voluta o tempo lungo: vini dolci, Marsala, Sherry, vini macerati."]]],
     ["colR",[["Petalo di rosa","#F5CFD1","Pressatura diretta e contatto brevissimo con le bucce: delicato, stile provenzale."],["Salmone","#EDA189","Qualche ora sulle bucce in più: profumi di fragola e pesca."],["Cerasuolo","#D2465E","Il più carico dei rosati: quasi un rosso leggero, con più struttura."]]],
     ["colN",[["Porpora","#5A1546","Giovanissimo: riflessi violacei, il vino dell'ultima vendemmia."],["Rubino","#8E1B2E","Giovane ma pronto: il rosso classico, uno o due anni."],["Granato","#7A2622","Qualche anno sulle spalle: il colore vira all'arancio sull'unghia del bicchiere."],["Aranciato","#9C4E26","Lunga evoluzione: grandi rossi invecchiati, profumi di cuoio e frutta secca."]]]],
 de:[["colB",[["Grünlich","#E4EBA6","Jung und frisch: grüne Reflexe, oft ein Wein von wenigen Monaten, ohne Holz."],["Strohgelb","#F0DE93","Die häufigste Farbe bei Weißweinen: richtige Reife, klare Frucht."],["Goldgelb","#E1B84C","Reifer: Holzausbau, ein paar Jahre auf der Flasche oder sehr reife Trauben."],["Bernstein","#C2802A","Gewollte Oxidation oder viel Zeit: Süßweine, Marsala, Sherry, maischevergorene Weine."]]],
     ["colR",[["Zartrosa","#F5CFD1","Direktpressung und kürzester Schalenkontakt: zart, im Stil der Provence."],["Lachs","#EDA189","Ein paar Stunden länger auf der Schale: Aromen von Erdbeere und Pfirsich."],["Kirschrot","#D2465E","Der kräftigste Rosé: fast ein leichter Roter, mit mehr Struktur."]]],
     ["colN",[["Purpur","#5A1546","Ganz jung: violette Reflexe, der Wein der letzten Lese."],["Rubin","#8E1B2E","Jung, aber trinkreif: der klassische Rote, ein bis zwei Jahre."],["Granat","#7A2622","Ein paar Jahre alt: Am Rand des Glases zieht die Farbe ins Orange."],["Ziegelrot","#9C4E26","Lange Reifung: große gereifte Rotweine, Aromen von Leder und Trockenfrüchten."]]]]};
let coloreSel=null;
function buildColori(){
  const h=$("#colori-box");if(!h)return;const L=T[lang];
  h.innerHTML=COLORI[lang].map(([k,v],r)=>`<div class="col-riga"><span class="col-nome">${esc(L[k])}</span><div class="col-strip">${v.map((c,i)=>{
    const id=r+"-"+i;return `<button type="button" class="col-sw${coloreSel===id?" on":""}" data-col="${id}" style="--c:${c[1]}" aria-pressed="${coloreSel===id}"><i></i><span>${esc(c[0])}</span></button>`;}).join("")}</div></div>`).join("");
  const rd=$("#colread");
  if(!coloreSel){rd.innerHTML=`<p class="note">${esc(L.colHint)}</p>`;rd.style.removeProperty("--c");return;}
  const [r,i]=coloreSel.split("-").map(Number),c=COLORI[lang][r][1][i];
  rd.style.setProperty("--c",c[1]);
  rd.innerHTML=`<span class="col-goccia" aria-hidden="true"></span><div><b>${esc(c[0])}</b><p>${esc(c[2])}</p></div>`;
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-col]");if(!b)return;coloreSel=b.dataset.col;buildColori();});

const PIATTI={
 it:[["Pizza margherita","bolle","Una bollicina metodo classico o un bianco fresco e sapido: acidità e bolle puliscono la bocca dalla mozzarella."],
     ["Frittura di pesce","bolle","Champagne o Franciacorta brut: le bollicine sgrassano e rinfrescano a ogni boccone."],
     ["Pasta al ragù","vino","Un rosso di media struttura, come un Sangiovese o un Aglianico giovane: tannino e acidità reggono il sugo."],
     ["Carne alla griglia","vino","Rossi strutturati come Syrah o Cabernet: il tannino trova nelle proteine il compagno ideale."],
     ["Sushi","bolle","Riesling secco o Champagne Blanc de Blancs: freschezza e sapidità, senza coprire il pesce crudo."],
     ["Formaggi stagionati","fort","Un classico: Porto con gli erborinati, oppure un rosso importante con i formaggi più stagionati."],
     ["Dolci al cioccolato","fort","Porto Ruby o un altro rosso fortificato: il vino deve essere dolce almeno quanto il dessert."],
     ["Cantucci e pasticceria secca","fort","Marsala, Vin Santo o uno Sherry dolce: note di frutta secca che parlano la stessa lingua."]],
 de:[["Pizza Margherita","bolle","Ein Schaumwein aus traditioneller Flaschengärung oder ein frischer, salziger Weißer: Säure und Perlage reinigen den Gaumen vom Mozzarella."],
     ["Frittierter Fisch","bolle","Champagner oder Franciacorta Brut: Die Perlage nimmt das Fett und erfrischt bei jedem Bissen."],
     ["Pasta mit Ragù","vino","Ein mittelkräftiger Roter wie ein junger Sangiovese oder Aglianico: Tannin und Säure halten der Soße stand."],
     ["Gegrilltes Fleisch","vino","Kräftige Rote wie Syrah oder Cabernet: Tannin findet im Eiweiß den idealen Partner."],
     ["Sushi","bolle","Trockener Riesling oder Champagner Blanc de Blancs: Frische und Salzigkeit, ohne den rohen Fisch zu überdecken."],
     ["Gereifter Käse","fort","Ein Klassiker: Portwein zum Blauschimmelkäse oder ein großer Roter zu lange gereiftem Käse."],
     ["Schokoladendesserts","fort","Ruby Port oder ein anderer roter Likörwein: Der Wein muss mindestens so süß sein wie das Dessert."],
     ["Cantucci und Gebäck","fort","Marsala, Vin Santo oder ein süßer Sherry: Trockenfrucht-Noten, die dieselbe Sprache sprechen."]]};
let piattoSel=-1;
function buildAbbina(){
  const h=$("#piatti");if(!h)return;const L=T[lang];
  h.innerHTML=PIATTI[lang].map((x,i)=>`<button type="button" class="piatto p-${x[1]}${i===piattoSel?" on":""}" data-piatto="${i}" aria-pressed="${i===piattoSel}"><span class="pt-ic" aria-hidden="true">${PIATTO_IC[i]}</span>${esc(x[0])}</button>`).join("");
  const c=$("#abbcard");
  if(piattoSel<0){c.className="abb-card";c.innerHTML=`<p class="note">${esc(L.abbHint)}</p>`;return;}
  const [nome,t,txt]=PIATTI[lang][piattoSel];
  c.className="abb-card a-"+t;
  c.innerHTML=`<span class="abb-bott" aria-hidden="true">${BOTTLE[t]}</span><div><span class="tagline">${esc(nome)} + ${esc(T[lang]["nm_"+t+"S"])}</span><p>${esc(txt)}</p>
    <a class="btn sm" href="#privati/p-prenota?t=${t}">${esc(L.aroGo.replace("%",giornoDi(t)))}</a></div>`;
}
const PIATTO_IC=[
 '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.4"/><circle cx="14.5" cy="9" r="1.2"/><circle cx="13" cy="14.5" r="1.4"/></svg>',
 '<svg viewBox="0 0 24 24"><path d="M3 12c4-5 10-5 14 0-4 5-10 5-14 0Z"/><path d="M17 12l4-3v6Z"/><circle cx="8" cy="11.5" r=".8"/></svg>',
 '<svg viewBox="0 0 24 24"><path d="M4 12h16a8 8 0 0 1-16 0Z"/><path d="M8 9c1-2 3-2 4 0s3 2 4 0"/></svg>',
 '<svg viewBox="0 0 24 24"><path d="M5 9h14M5 13h14M5 17h14"/><path d="M8 5v14M16 5v14"/></svg>',
 '<svg viewBox="0 0 24 24"><rect x="4" y="9" width="16" height="7" rx="3.5"/><path d="M8 9v7M16 9v7"/></svg>',
 '<svg viewBox="0 0 24 24"><path d="M3 17 21 9v8Z"/><circle cx="14" cy="14" r="1"/><circle cx="18" cy="13" r=".8"/></svg>',
 '<svg viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="10" rx="1.5"/><path d="M9.7 7v10M14.3 7v10M5 12h14"/></svg>',
 '<svg viewBox="0 0 24 24"><path d="M4 15c3-6 13-6 16 0l-2 3H6Z"/><path d="M9 13l1-2M13 12.5l.5-2"/></svg>'];
document.addEventListener("click",e=>{const b=e.target.closest("[data-piatto]");if(!b)return;piattoSel=+b.dataset.piatto;buildAbbina();});

const QUIZ={
 it:[["Il tuo aperitivo ideale?",[["Un calice di rosso","vino"],["Un brindisi con le bollicine","bolle"],["Un vermouth o un amaro","fort"]]],
     ["A fine cena preferisci…",[["Un formaggio stagionato","vino"],["Qualcosa di fresco, come un sorbetto","bolle"],["Il dolce, con calma","fort"]]],
     ["Che serata cerchi?",[["Imparare le basi","vino"],["Festeggiare qualcosa","bolle"],["Scoprire qualcosa di raro","fort"]]]],
 de:[["Dein idealer Aperitif?",[["Ein Glas Rotwein","vino"],["Anstoßen mit Schaumwein","bolle"],["Ein Wermut oder ein Bitter","fort"]]],
     ["Zum Abschluss des Essens lieber…",[["Gereifter Käse","vino"],["Etwas Frisches, wie ein Sorbet","bolle"],["Das Dessert, in Ruhe","fort"]]],
     ["Was für einen Abend suchst du?",[["Die Grundlagen lernen","vino"],["Etwas feiern","bolle"],["Etwas Seltenes entdecken","fort"]]]]};
const QZ={passo:0,punti:{vino:0,bolle:0,fort:0},ordine:[]};
function buildQuiz(){
  const h=$("#quizbox");if(!h)return;const L=T[lang];
  if(QZ.passo<3){
    const [dom,risp]=QUIZ[lang][QZ.passo];
    h.innerHTML=`<div class="qz-top"><span class="tagline">${esc(L.quizStep.replace("%",QZ.passo+1))}</span>
      <span class="qz-bar" aria-hidden="true">${[0,1,2].map(i=>`<i class="${i<QZ.passo?"ok":i===QZ.passo?"now":""}"></i>`).join("")}</span></div>
      <h3>${esc(dom)}</h3><div class="qz-risp">${risp.map(([t,k])=>`<button type="button" class="qz-r" data-qz="${k}">${esc(t)}</button>`).join("")}</div>`;
    return;
  }
  const max=Math.max(...Object.values(QZ.punti));
  const t=QZ.ordine.find(k=>QZ.punti[k]===max)||"vino";
  h.innerHTML=`<div class="qz-esito e-${t}"><span class="abb-bott" aria-hidden="true">${BOTTLE[t]}</span>
    <div><span class="tagline">${esc(L.quizRes)}</span><h3>${esc(L["gd_"+t])} · ${esc(nomeSerata(t))}</h3><p>${esc(L["tp_"+t])}</p>
    <div class="go"><a class="btn" href="#privati/p-prenota?t=${t}">${esc(L.quizGo)}</a><button type="button" class="btn line" data-qzreset>${esc(L.quizAgain)}</button></div></div></div>`;
}
document.addEventListener("click",e=>{
  const r=e.target.closest("[data-qz]");
  if(r){const k=r.dataset.qz;QZ.punti[k]++;QZ.ordine.push(k);QZ.passo++;buildQuiz();return;}
  if(e.target.closest("[data-qzreset]")){QZ.passo=0;QZ.punti={vino:0,bolle:0,fort:0};QZ.ordine=[];buildQuiz();}
});

/* il calice dell'hero: si riempie scorrendo, gira se lo tocchi */
(function calice(){
  const c=$("#calice");if(!c)return;
  /* l'onda del vino si muove solo quando succede qualcosa (caricamento,
     scorrimento, tocco) e poi si ferma: a pagina ferma non consuma nulla */
  let sveglia=0;
  const vivo=ms=>{c.classList.add("vivo");clearTimeout(sveglia);sveglia=setTimeout(()=>c.classList.remove("vivo"),ms);};
  vivo(5000);
  c.addEventListener("click",()=>{c.classList.remove("gira");void c.offsetWidth;c.classList.add("gira");vivo(4000);
    clearTimeout(c._t);c._t=setTimeout(()=>c.classList.remove("gira"),1700);});
  let ultimo=-1;
  function livello(){
    if(current!=="home")return;
    const v=Math.min(1,Math.max(0,scrollY/(innerHeight*1.4)));
    if(Math.abs(v-ultimo)<.01)return;ultimo=v;c.style.setProperty("--lvl",v.toFixed(3));
  }
  addEventListener("scroll",livello,{passive:true});livello();
})();

/* i numeri si "versano" quando entrano in vista */
(function numeri(){
  const box=$("#numeri");if(!box)return;
  const lento=matchMedia("(prefers-reduced-motion:reduce)").matches;
  const fai=()=>{box.classList.add("pieno");
    box.querySelectorAll("b[data-to]").forEach(b=>{
      const to=+b.dataset.to;if(lento){b.textContent=to;return;}
      const t0=performance.now(),dur=1300;
      const step=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);b.textContent=Math.round(to*e);if(k<1)requestAnimationFrame(step);};
      b.textContent="0";requestAnimationFrame(step);});};
  if(!("IntersectionObserver" in window)||lento){fai();return;}
  const io=new IntersectionObserver(v=>{if(v.some(x=>x.isIntersecting)){io.disconnect();fai();}},{threshold:.4});
  io.observe(box);
})();

/* le carte si inclinano verso il puntatore, con un riflesso di luce */
(function inclina(){
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
  const SEL=".card:not(.conf),.event,.aroma-card,.abb-card,.quiz,.lesson";
  let el=null,raf=0,ev=null;
  function reset(t){t.style.removeProperty("--rx");t.style.removeProperty("--ry");t.classList.remove("tilting");}
  function muovi(){
    raf=0;const t=ev&&ev.target&&ev.target.closest?ev.target.closest(SEL):null;
    if(el&&el!==t){reset(el);el=null;}
    if(!t)return;el=t;
    if(!t.querySelector(":scope>.sheen")){const s=document.createElement("span");s.className="sheen";s.setAttribute("aria-hidden","true");t.appendChild(s);t.classList.add("tilt");}
    const r=t.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width,y=(ev.clientY-r.top)/r.height;
    t.classList.add("tilting");
    t.style.setProperty("--rx",((.5-y)*4).toFixed(2)+"deg");t.style.setProperty("--ry",((x-.5)*5).toFixed(2)+"deg");
    t.style.setProperty("--mx",(x*100).toFixed(1)+"%");t.style.setProperty("--my",(y*100).toFixed(1)+"%");
  }
  document.addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;ev=e;if(!raf)raf=requestAnimationFrame(muovi);},{passive:true});
  document.addEventListener("pointerleave",()=>{if(el){reset(el);el=null;}});
})();
function uiLang(){
  const c=$("#calice");if(c)c.setAttribute("aria-label",T[lang].caliceA);
  buildAromi();buildColori();buildAbbina();buildQuiz();buildRacconti();
  if(window.__rivela)window.__rivela();
}


/* ============================================================
   COMPARSA ALLO SCORRIMENTO
   Ogni blocco entra con un piccolo movimento quando arriva sullo
   schermo, una volta sola. Finita l'entrata la classe se ne va, cosi'
   le carte tornano libere di inclinarsi. Con "riduci movimento"
   attivo sul telefono, non si muove niente.
   ============================================================ */
(function rivela(){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches||!("IntersectionObserver" in window))return;
  document.documentElement.classList.add("anima");
  const SEL=[".view>section>h2",".view>section>.wrap>h2",".view>section>.sub",".view>section>.wrap>.sub",
    ".cards>*",".steps>.step",".two-col>.card",".numeri",".events",".piatti",".abb-card",".colori",".aromi",".quiz",
    ".book",".ctaband",".markband",".voucher","#faqs>.acc","#moduli>.acc",".bio>*",".themes",".cal",".contact>*"].join(",");
  const io=new IntersectionObserver(voci=>voci.forEach(v=>{
    if(!v.isIntersecting)return;
    const el=v.target;io.unobserve(el);el.classList.add("visto");
    setTimeout(()=>el.classList.remove("rivela","visto"),1700);
  }),{rootMargin:"0px 0px -6% 0px",threshold:.06});
  function guarda(){
    $$(SEL).forEach(el=>{
      if(el.dataset.rv)return;el.dataset.rv="1";
      if(el.closest(".hero,.phero"))return;
      const fr=el.parentElement?[...el.parentElement.children].indexOf(el):0;
      if(el.parentElement&&(el.parentElement.matches(".cards,.steps,.two-col,#faqs,#moduli,.bio,.contact")))el.style.setProperty("--d",Math.min(fr,5));
      el.classList.add("rivela");io.observe(el);
    });
  }
  guarda();window.__rivela=guarda;
  addEventListener("hashchange",()=>setTimeout(guarda,350));
})();


/* =====================================================================
   RACCONTI A SCORRIMENTO
   Un'immagine resta ferma (il calice, l'orologio) e cambia mentre i
   capitoli scorrono accanto. Ogni capitolo mostra prima il riassunto;
   quando arriva al centro dello schermo si apre con tutti i dettagli
   e resta aperto: piu' scendi, piu' informazioni hai.
   ===================================================================== */
const RACCONTI={
 settimana:{tipo:"calice",
  v:[{c:"#E9DCCB",lv:0,b:0,lab:"18:00",pc:"rgba(201,161,59,.20)"},
     {c:"#9B1B3A",lv:.78,b:0,lab:"LUN",pc:"rgba(155,27,58,.22)"},
     {c:"#E4B84A",lv:.82,b:1,lab:"MAR",pc:"rgba(228,184,74,.30)"},
     {c:"#A85A1C",lv:.45,b:0,lab:"MER",pc:"rgba(168,90,28,.26)"},
     {c:"#9B1B3A",lv:.95,b:0,lab:{it:"Salute!",de:"Prost!"},pc:"rgba(155,27,58,.18)",brinda:1}],
  it:[{tag:"La settimana",h:"Tre sere, tre bicchieri",sum:"Da Partenope 081, sempre alle 18:00, quaranta posti a sera.",
       piu:["Lunedì: vini fermi, rossi e bianchi","Martedì: Champagne e altre bollicine","Mercoledì: vini fortificati","Prenoti da 1 a 10 posti, anche da solo"]},
      {tag:"Lunedì · 49 €",h:"Vino",sum:"Sei vini in due ore, tra bianchi e rossi.",
       piu:["Cosa impari: riconoscere tannino, acidità, struttura e legno","Come si svolge: un vino alla volta, poi il giro alla cieca","Durata: circa due ore","Ideale per chi parte da zero"],cta:"vino"},
      {tag:"Martedì · 69 €",h:"Champagne e bollicine",sum:"Cinque calici: Champagne, Franciacorta e Sekt fianco a fianco.",
       piu:["Cosa impari: metodo classico e Charmat, dosaggio, perlage","Perché il prezzo è più alto: le bottiglie costano di più","Durata: circa due ore","Ideale per festeggiare qualcosa"],cta:"bolle"},
      {tag:"Mercoledì · 64 €",h:"Vini fortificati",sum:"Cinque vini: Porto, Sherry, Marsala e Madeira.",
       piu:["Cosa impari: come nascono, quanto durano, con cosa aprirli","Assaggi più piccoli: sono vini più intensi","Durata: circa novanta minuti","Ideale per chi cerca qualcosa di raro"],cta:"fort"},
      {tag:"E dopo",h:"La serata continua",sum:"Finita la degustazione puoi restare da Partenope 081 a cena o per un altro bicchiere.",
       piu:["Le consumazioni dopo la degustazione si pagano al locale","Per gruppi oltre 10 persone o una serata solo per voi, scrivimi"],cta:"tutte"}],
  de:[{tag:"Die Woche",h:"Drei Abende, drei Gläser",sum:"Bei Partenope 081, immer um 18:00 Uhr, vierzig Plätze pro Abend.",
       piu:["Montag: Stillweine, rot und weiß","Dienstag: Champagner und andere Schaumweine","Mittwoch: Likörweine","Du buchst 1 bis 10 Plätze, auch allein"]},
      {tag:"Montag · 49 €",h:"Wein",sum:"Sechs Weine in zwei Stunden, weiß und rot.",
       piu:["Was du lernst: Tannin, Säure, Struktur und Holz erkennen","Ablauf: ein Wein nach dem anderen, dann die Blindprobe","Dauer: etwa zwei Stunden","Ideal für Einsteiger"],cta:"vino"},
      {tag:"Dienstag · 69 €",h:"Champagner und Schaumwein",sum:"Fünf Gläser: Champagner, Franciacorta und Sekt nebeneinander.",
       piu:["Was du lernst: traditionelle Methode und Tankgärung, Dosage, Perlage","Warum der Preis höher ist: Die Flaschen kosten mehr","Dauer: etwa zwei Stunden","Ideal, um etwas zu feiern"],cta:"bolle"},
      {tag:"Mittwoch · 64 €",h:"Likörweine",sum:"Fünf Weine: Portwein, Sherry, Marsala und Madeira.",
       piu:["Was du lernst: wie sie entstehen, wie lange sie halten, wozu man sie öffnet","Kleinere Proben: Es sind intensivere Weine","Dauer: etwa neunzig Minuten","Ideal für alle, die etwas Seltenes suchen"],cta:"fort"},
      {tag:"Danach",h:"Der Abend geht weiter",sum:"Nach der Verkostung kannst du bei Partenope 081 zum Essen oder auf ein weiteres Glas bleiben.",
       piu:["Was nach der Verkostung bestellt wird, zahlst du direkt im Lokal","Für Gruppen ab 11 Personen oder einen Abend nur für euch: schreib mir"],cta:"tutte"}]},
 minuti:{tipo:"orologio",
  v:[{c:"#9B1B3A",lv:0,b:0,lab:"17:50",h:17,m:50,pc:"rgba(201,161,59,.18)"},
     {c:"#9B1B3A",lv:.2,b:0,lab:"18:00",h:18,m:0,pc:"rgba(155,27,58,.14)"},
     {c:"#9B1B3A",lv:.75,b:0,lab:"18:15",h:18,m:15,pc:"rgba(155,27,58,.2)"},
     {c:"#6E1530",lv:.5,b:0,lab:"19:30",h:19,m:30,pc:"rgba(110,21,48,.22)"},
     {c:"#9B1B3A",lv:.15,b:0,lab:"20:00",h:20,m:0,pc:"rgba(201,161,59,.2)"}],
  it:[{tag:"Arrivo",h:"Ti accolgo all'ingresso",sum:"Arrivi qualche minuto prima e ti accompagno al tuo posto.",
       piu:["Sul tavolo trovi calici, scheda e acqua","Se siete in gruppo, vi sedete vicini","Si parte puntuali alle 18:00"]},
      {tag:"Si comincia",h:"Come si degusta",sum:"Due minuti per imparare a guardare, annusare e assaggiare.",
       piu:["Niente lezione frontale: si impara assaggiando","Le domande sono benvenute, anche quelle che sembrano banali"]},
      {tag:"I vini",h:"Un vino alla volta",sum:"Ogni bicchiere arriva con la sua storia e una domanda da risolvere insieme.",
       piu:["Assaggi da circa 50–60 ml","Acqua e sputacchiera sempre a disposizione","Sulla scheda annoti cosa ti piace e perché"]},
      {tag:"Alla cieca",h:"Il giro finale",sum:"Bottiglie coperte: indovina vitigno, paese o metodo.",
       piu:["Si gioca da soli o a squadre","Chi indovina di più si porta a casa la gloria"]},
      {tag:"E poi",h:"La serata non finisce",sum:"La degustazione si chiude, ma puoi restare da Partenope 081 per cena.",
       piu:["Le consumazioni dopo la degustazione si pagano al locale","Il biglietto della prossima serata lo trovi qui sopra"],cta:"tutte"}],
  de:[{tag:"Ankunft",h:"Ich empfange dich am Eingang",sum:"Du kommst ein paar Minuten früher, und ich bringe dich an deinen Platz.",
       piu:["Auf dem Tisch stehen Gläser, Bogen und Wasser","Als Gruppe sitzt ihr zusammen","Wir beginnen pünktlich um 18:00 Uhr"]},
      {tag:"Los geht's",h:"Wie man verkostet",sum:"Zwei Minuten, um Sehen, Riechen und Schmecken zu lernen.",
       piu:["Kein Frontalunterricht: Man lernt beim Probieren","Fragen sind willkommen, auch die, die banal wirken"]},
      {tag:"Die Weine",h:"Ein Wein nach dem anderen",sum:"Jedes Glas kommt mit seiner Geschichte und einer Frage, die wir gemeinsam lösen.",
       piu:["Proben von etwa 50–60 ml","Wasser und Spucknapf stehen immer bereit","Auf dem Bogen notierst du, was dir schmeckt und warum"]},
      {tag:"Blindprobe",h:"Die Schlussrunde",sum:"Verdeckte Flaschen: Rebsorte, Land oder Methode erraten.",
       piu:["Allein oder im Team","Wer am meisten errät, nimmt den Ruhm mit nach Hause"]},
      {tag:"Und dann",h:"Der Abend ist nicht vorbei",sum:"Die Verkostung endet, aber du kannst bei Partenope 081 zum Essen bleiben.",
       piu:["Was danach bestellt wird, zahlst du direkt im Lokal","Den nächsten Abend buchst du gleich hier oben"],cta:"tutte"}]}};

function palcoSVG(id,tipo){
  return `<svg class="ra-calice" viewBox="0 0 160 260" aria-hidden="true">
    <defs><clipPath id="${id}-cp"><path d="M30 20h100c0 62-16 100-50 106-34-6-50-44-50-106Z"/></clipPath>
      <linearGradient id="${id}-lg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <path d="M30 20h100c0 62-16 100-50 106-34-6-50-44-50-106Z" class="ra-vetro"/>
    <g clip-path="url(#${id}-cp)"><g class="ra-liv"><g class="ra-mosso">
      <path class="ra-vino" d="M-30 0 Q-15 -6 0 0 T30 0 T60 0 T90 0 T120 0 T150 0 T180 0 T210 0 V150 H-30Z"/>
      <path d="M-30 0 Q-15 -6 0 0 T30 0 T60 0 T90 0 T120 0 T150 0 T180 0 T210 0 V40 H-30Z" fill="url(#${id}-lg)"/>
      <g class="ra-bolle"><circle cx="58" cy="90" r="2.4"/><circle cx="80" cy="96" r="1.8"/><circle cx="98" cy="88" r="2.2"/><circle cx="70" cy="100" r="1.6"/><circle cx="90" cy="102" r="2"/></g>
    </g></g></g>
    <path d="M30 20h100c0 62-16 100-50 106-34-6-50-44-50-106Z" class="ra-bordo"/>
    <path d="M80 126v92M50 232c0-10 60-10 60 0Z" class="ra-bordo"/>
    <path d="M44 32c-1 26 5 48 15 62" class="ra-riflesso"/>
  </svg>${tipo==="orologio"?`<svg class="ra-orologio" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="27"/>
    ${[...Array(12)].map((_,i)=>`<path d="M30 6v4" transform="rotate(${i*30} 30 30)"/>`).join("")}
    <path class="ra-ore" d="M30 30V17"/><path class="ra-min" d="M30 30V10"/><circle cx="30" cy="30" r="2.2" class="ra-perno"/></svg>`:""}`;
}
function buildRacconti(){
  $$("[data-racconto]").forEach(box=>{
    const R=RACCONTI[box.dataset.racconto];if(!R)return;
    const id="ra-"+box.dataset.racconto,cap=R[lang],L=T[lang];
    const ora=+(box.dataset.ora||0),aperti=(box.dataset.aperti||"0").split(",").map(Number);
    box.innerHTML=`<div class="ra-palco t-${R.tipo}" aria-hidden="true">
        <div class="ra-scena">${palcoSVG(id,R.tipo)}</div>
        <div class="ra-testa"><b class="ra-lab"></b><span class="ra-sotto"></span></div>
        <div class="ra-punti">${cap.map((_,i)=>`<i data-p="${i}"></i>`).join("")}</div></div>
      <div class="ra-capitoli">${cap.map((c,i)=>`<article class="cap${aperti.includes(i)?" aperto":""}" data-cap="${i}">
        <div class="cap-in"><span class="tagline">${esc(c.tag)}</span><h3>${esc(c.h)}</h3><p class="cap-sum">${esc(c.sum)}</p>
          <button type="button" class="cap-apri">${esc(L.raPiu)} ↓</button>
          <div class="cap-piu"><div><ul class="check">${c.piu.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
          ${c.cta?`<a class="btn sm" href="${c.cta==="tutte"?"#privati/p-prenota":"#privati/p-prenota?t="+c.cta}">${esc(c.cta==="tutte"?L.ctaBook:L.lesGo)}</a>`:""}</div></div></div></article>`).join("")}</div>`;
    mettiScena(box,ora,true);
    if(!box.__io&&"IntersectionObserver" in window){
      box.__io=new IntersectionObserver(voci=>{
        voci.forEach(v=>{if(v.isIntersecting)mettiScena(box,+v.target.dataset.cap);});
      },{rootMargin:"-42% 0px -48% 0px",threshold:0});
    }
    if(box.__io){box.__io.disconnect();box.querySelectorAll(".cap").forEach(c=>box.__io.observe(c));}
    else box.querySelectorAll(".cap").forEach(c=>c.classList.add("aperto"));
    if(matchMedia("(prefers-reduced-motion:reduce)").matches)box.querySelectorAll(".cap").forEach(c=>c.classList.add("aperto"));
  });
}
function mettiScena(box,i,subito){
  const R=RACCONTI[box.dataset.racconto],v=R.v[i],cap=R[lang][i];if(!v)return;
  const prima=+(box.dataset.ora||0);box.dataset.ora=i;
  const ap=new Set((box.dataset.aperti||"0").split(",").map(Number));ap.add(i);box.dataset.aperti=[...ap].join(",");
  box.querySelectorAll(".cap").forEach(c=>{const k=+c.dataset.cap;c.classList.toggle("ora",k===i);if(k===i)c.classList.add("aperto");});
  box.querySelectorAll(".ra-punti i").forEach(p=>{const k=+p.dataset.p;p.classList.toggle("on",k===i);p.classList.toggle("fatto",k<i);});
  const pal=box.querySelector(".ra-palco");if(!pal)return;
  pal.style.setProperty("--vc",v.c);pal.style.setProperty("--lv",v.lv);pal.style.setProperty("--pc",v.pc);
  pal.classList.toggle("bolle",!!v.b);pal.classList.toggle("brinda",!!v.brinda);
  if(v.h!==undefined){pal.style.setProperty("--hr",((v.h%12)*30+v.m*.5)+"deg");pal.style.setProperty("--mr",(v.m*6)+"deg");}
  const lab=typeof v.lab==="object"?v.lab[lang]:v.lab,el=pal.querySelector(".ra-lab");
  if(el.textContent!==lab){el.textContent=lab;if(!subito){el.classList.remove("cambia");void el.offsetWidth;el.classList.add("cambia");}}
  pal.querySelector(".ra-sotto").textContent=cap.tag;
  if(!subito&&prima!==i){pal.classList.remove("scossa");void pal.offsetWidth;pal.classList.add("scossa");}
}
document.addEventListener("click",e=>{
  const b=e.target.closest(".cap-apri");if(!b)return;
  const c=b.closest(".cap"),box=b.closest("[data-racconto]");mettiScena(box,+c.dataset.cap);
});

/* ---------------- FORM → MAILTO ---------------- */
function fillQuoteBox(){const box=$("#quotebox"),q=sess.get("quote");if(box&&q){box.style.display="block";box.textContent=T[lang].quoteLbl+"\n"+q;}}
function markField(id,bad){
  const inp=$("#"+id);if(!inp)return;
  inp.classList.toggle("wrong",bad);
  let e=inp.parentElement.querySelector(".bad");
  if(!e){e=document.createElement("em");e.className="bad";inp.parentElement.appendChild(e);}
  e.textContent=bad?T[lang]["e_"+id]:"";
}
function formOk(){
  const g=id=>($("#"+id)?.value||"").trim();
  const noNome=g("nome").length<2;
  const mail=g("email"),tel=g("tel");
  const noRecapito=!(mailOk(mail)||tel.replace(/[^\d]/g,"").length>=6);
  const mailStorta=!!mail&&!mailOk(mail);
  markField("nome",noNome);
  markField("email",mailStorta||noRecapito&&!tel);
  markField("tel",noRecapito&&!mail);
  return !noNome&&!noRecapito&&!mailStorta;
}
["nome","email","tel"].forEach(id=>{const e=$("#"+id);if(e)e.addEventListener("blur",()=>{if(e.value.trim())formOk();});});
$("#send").addEventListener("click",()=>{
  if(!formOk()){
    const bad=$("#v-contatto input.wrong");
    if(bad){bad.focus();bad.scrollIntoView({behavior:"smooth",block:"center"});}
    const h=$("#formhint");if(h)h.textContent=T[lang].fFix;
    return;
  }
  const h=$("#formhint");if(h)h.textContent="";
  const g=id=>($("#"+id)?.value||"").trim(),sel=id=>{const s=$("#"+id);return s.options[s.selectedIndex].text;},L=T[lang],q=sess.get("quote");
  const body=[L.mailIntro,"",`${L.fType}: ${sel("ftype")}`,`${L.fDate}: ${g("fdate")||"-"}`,`${L.fPlz}: ${g("fplz")||"-"}`,`${L.fLang}: ${sel("flang")}`,"",g("fmsg"),...(q?["",L.quoteLbl,q]:[]),...(CART.length?["",L.mailPay+": "+paySummary()]:[]),"",`${L.fName}: ${g("nome")}`,`${L.fTel}: ${g("tel")}`,`${L.fMail}: ${g("email")}`].join("\n");
  location.href=`mailto:${MAIL}?subject=${encodeURIComponent(L.subj+" · "+sel("ftype"))}&body=${encodeURIComponent(body)}`;
  $("#ok").style.display="block";
});

/* se una foto non arriva, sparisce e resta la sua didascalia: niente icona rotta */
document.documentElement.style.setProperty("--marchio",`url("${LOGO}")`);
$$(".hero-art,.foot-art,.phero-art,.ava-art").forEach(i=>i.src=LOGO_L);
$$(".tk-art,.brand-art,.ld-back,.ld-fill,.vou-art,.pay-art,.mk-art").forEach(i=>i.src=LOGO);
document.head.insertAdjacentHTML("beforeend",'<link rel="apple-touch-icon" href="'+LOGO+'">');
document.head.insertAdjacentHTML("beforeend",'<link rel="icon" href="'+LOGO+'">');
loadCart();paintBadge();wireAdds();dressSelects();applyLang();initPromo();route();enterView($("#v-"+current));
ritornoDallaCassa();
addEventListener("load",()=>loader.classList.remove("show"));

