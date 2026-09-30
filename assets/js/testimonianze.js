/*
  ==========================================================================
  PERCORSO ALPHA, STORIE DEGLI ALLIEVI
  ==========================================================================

  Questo è l'unico file da modificare per aggiornare la pagina
  successi.percorsoalpha.com. Tutto il resto del sito legge i dati da qui.

  REGOLE D'ORO PER NON ROMPERE NULLA
  1. I testi vanno sempre tra virgolette doppie: "così".
  2. Se dentro un testo servono le virgolette, usa quelle tipografiche
     (« ») oppure l'apostrofo. Non usare mai le virgolette doppie dritte
     dentro un testo.
  3. Ogni riga con un valore finisce con una virgola, tranne l'ultima riga
     prima di una parentesi di chiusura.
  4. Ogni storia è racchiusa tra { e } ed è separata dalla successiva
     con una virgola.
  5. Le righe che iniziano con // sono note per te: il sito le ignora.

  Se dopo una modifica la pagina mostra il messaggio
  "Le storie non sono disponibili in questo momento.", in questo file c'è
  un errore di scrittura: di solito una virgola o una virgoletta mancante
  nell'ultima parte modificata. Correggi e salva di nuovo.
*/


/*
  --------------------------------------------------------------------------
  IMPOSTAZIONI GENERALI
  --------------------------------------------------------------------------
*/
window.ALPHA_CONFIG = {
  // Link dei pulsanti di candidatura (in alto, nel profilo e in fondo alla pagina).
  // Sostituisci con il link della candidatura o della call.
  linkCandidatura: "https://percorsoalpha.com",

  // Testo del pulsante in alto e del pulsante sotto la tua foto.
  testoBottone: "Candidati al percorso",

  // Link del tuo profilo Instagram, ad esempio "https://www.instagram.com/tuonome/".
  // Se resta vuoto ("") il link non compare nella pagina.
  instagram: "",

  // Percorso della tua foto. Carica il file in assets/img/ con il nome dany.jpg.
  // Finché il file non esiste, al suo posto compare un riquadro segnaposto.
  fotoDany: "assets/img/dany.jpg"
};


/*
  --------------------------------------------------------------------------
  MODELLO DA COPIARE PER UNA NUOVA STORIA
  --------------------------------------------------------------------------

  Come si usa:
  1. Copia tutto il blocco qui sotto, dalla { alla }, virgola finale compresa.
  2. Incollalo subito dopo la riga "window.ALPHA_STORIE = [" più in basso:
     le storie più recenti vanno in cima.
  3. Sostituisci i valori tra virgolette con i dati del tuo allievo.
  4. Carica le foto nella cartella assets/img/allievi/ e scrivi qui il percorso.
  5. Prima di pubblicare, fatti dare il consenso scritto dell'allievo
     per testi e foto.

  {
    id: "storia-nome",                 // Codice unico, minuscolo e senza spazi. Diventa il link diretto: successi.percorsoalpha.com/#storia-nome
    esempio: false,                    // Per le storie vere scrivi false. Con true compare il bollino "Esempio da sostituire".
    nome: "Nome",                      // Come vuoi che appaia l'allievo: nome, oppure nome e iniziale del cognome.
    eta: 35,                           // Età in numero, senza virgolette. Da 35 in su la storia compare anche nel filtro "Over 35".
    professione: "Professione",        // Il suo lavoro, ad esempio "Geometra".
    archetipo: "Situazione di partenza in poche parole", // Una riga che lo descrive, ad esempio "Padre di due figli, con poco tempo".
    obiettivo: "definizione",          // Scegli uno tra "massa", "definizione", "ricomposizione". Decide il filtro in cui compare.
    durataSettimane: 16,               // Durata del percorso in settimane, numero senza virgolette.
    titolo: "Risultato principale in una frase", // La frase grande della scheda, ad esempio "7 kg in meno in 16 settimane".
    metriche: [                        // Tre misure prima e dopo. Puoi toglierne o aggiungerne una riga.
      { etichetta: "Peso", prima: "89 kg", dopo: "82 kg" },
      { etichetta: "Girovita", prima: "100 cm", dopo: "92 cm" },
      { etichetta: "Piegamenti consecutivi", prima: "10", dopo: "30" }
    ],
    foto: {
      prima: "assets/img/allievi/nome-prima.jpg", // Foto di partenza. Lascia "" se non c'è.
      dopo: "assets/img/allievi/nome-dopo.jpg"    // Foto di oggi. Lascia "" se non c'è.
    },
    partenza: "Da dove partiva: fisico, abitudini, vincoli, come si sentiva.", // Blocco "Il punto di partenza".
    lavoro: "Cosa avete fatto insieme: allenamento, alimentazione, correzioni.", // Blocco "Il lavoro".
    oggi: "Dove è arrivato: numeri e cambiamenti nella vita di tutti i giorni.", // Blocco "Oggi".
    citazione: "Una frase dell'allievo, con parole sue.", // Compare in evidenza come citazione.
    video: "",                         // Link YouTube (anche Shorts) o altro link a un video. Lascia "" se non c'è.
    screenshot: []                     // Immagini di chat o feedback, ad esempio ["assets/img/allievi/nome-chat-1.jpg", "assets/img/allievi/nome-chat-2.jpg"]. Lascia [] se non ci sono.
  },
*/


/*
  --------------------------------------------------------------------------
  LE STORIE
  --------------------------------------------------------------------------

  L'ordine qui è l'ordine nella pagina: la prima storia della lista è la
  prima che si vede. Le cinque storie qui sotto sono ESEMPI con
  esempio: true. Sostituiscile con storie vere o cancellale: finché ne resta
  anche una sola con esempio: true, in cima alla pagina compare un avviso.
*/
window.ALPHA_STORIE = [

  // STORIA 1 (esempio da sostituire)
  {
    id: "storia-01",
    esempio: true,
    nome: "Allievo 01",
    eta: 36,
    professione: "Responsabile vendite",
    archetipo: "Padre di due figli, con poco tempo",
    obiettivo: "definizione",
    durataSettimane: 16,
    titolo: "7 kg in meno in 16 settimane, allenandosi in salotto prima che la casa si svegli",
    metriche: [
      { etichetta: "Peso", prima: "89 kg", dopo: "82 kg" },
      { etichetta: "Girovita", prima: "100 cm", dopo: "92 cm" },
      { etichetta: "Piegamenti consecutivi", prima: "10", dopo: "30" }
    ],
    foto: {
      prima: "",
      dopo: ""
    },
    partenza: "Due figli piccoli, un lavoro che lo teneva fuori casa fino a sera, la palestra abbandonata da sei anni. Pesava 89 kg, rimandava a ogni lunedì e si sentiva stanco prima ancora di cominciare la giornata.",
    lavoro: "Abbiamo costruito l'allenamento sulla sua giornata reale, non su quella ideale: sessioni brevi in salotto, la mattina presto, prima che la casa si svegliasse. Progressione chiara, dai piegamenti inclinati alle varianti complete. A tavola nessuna dieta separata dalla famiglia: stessi piatti, porzioni e proteine sistemate. Mi aggiornava sui progressi e correggevamo il tiro ogni volta che serviva.",
    oggi: "82 kg, 8 centimetri di girovita in meno e 30 piegamenti di fila. La differenza più grande si vede a casa: la sera ha ancora energia per i figli. In ufficio arriva lucido, non rimanda più le decisioni e ha smesso di sentirsi in ritardo su tutto.",
    citazione: "Pensavo di non avere tempo. In realtà non avevo un piano. Quando l'ho avuto, il tempo l'ho trovato.",
    video: "",
    screenshot: []
  },

  // STORIA 2 (esempio da sostituire)
  {
    id: "storia-02",
    esempio: true,
    nome: "Allievo 02",
    eta: 27,
    professione: "Sviluppatore software",
    archetipo: "Magro da sempre, vuole mettere massa",
    obiettivo: "massa",
    durataSettimane: 24,
    titolo: "Da 62 a 68 kg e da zero a 6 trazioni, senza integratori",
    metriche: [
      { etichetta: "Peso", prima: "62 kg", dopo: "68 kg" },
      { etichetta: "Circonferenza braccio", prima: "29 cm", dopo: "31 cm" },
      { etichetta: "Trazioni consecutive", prima: "0", dopo: "6" }
    ],
    foto: {
      prima: "",
      dopo: ""
    },
    partenza: "1,80 m per 62 kg, magliette sempre larghe per nascondere le braccia. Saltava la colazione, mangiava poco e male, ed era convinto che fosse una questione di genetica. Nelle foto di gruppo cercava sempre di stare dietro a qualcuno.",
    lavoro: "Prima di tutto abbiamo messo ordine nel piatto: tre pasti veri e due spuntini, più proteine da cibo normale, nessun barattolo di polvere. Poi una sbarra in casa e una progressione pensata per la massa: trazioni negative, piegamenti, dip tra due sedie, squat. Quando si bloccava, guardavamo insieme i numeri e cambiavamo una variabile alla volta.",
    oggi: "68 kg, braccia più piene e 6 trazioni pulite partendo da zero. Ha smesso di scegliere i vestiti per nascondersi. In riunione prende la parola e nelle foto di gruppo non cerca più l'ultima fila.",
    citazione: "Il giorno della prima trazione l'ho rifatta tre volte per essere sicuro. Da lì ho smesso di dirmi che non ero portato.",
    video: "",
    screenshot: []
  },

  // STORIA 3 (esempio da sostituire)
  {
    id: "storia-03",
    esempio: true,
    nome: "Allievo 03",
    eta: 44,
    professione: "Geometra",
    archetipo: "Over 40, fermo da anni per il mal di schiena",
    obiettivo: "ricomposizione",
    durataSettimane: 24,
    titolo: "Fermo da dieci anni per il mal di schiena, a 44 anni perde 9 cm di girovita",
    metriche: [
      { etichetta: "Peso", prima: "94 kg", dopo: "88 kg" },
      { etichetta: "Girovita", prima: "106 cm", dopo: "97 cm" },
      { etichetta: "Tenuta in plank", prima: "20 secondi", dopo: "90 secondi" }
    ],
    foto: {
      prima: "",
      dopo: ""
    },
    partenza: "Otto ore al giorno tra scrivania e cantieri, dieci anni senza allenarsi e un mal di schiena che lo bloccava due o tre volte l'anno. A 44 anni si era convinto che fosse tardi. Evitava perfino di giocare a calcio con il figlio per paura di bloccarsi.",
    lavoro: "Siamo partiti con il via libera del suo medico e senza fretta: mobilità, lavoro sul core, esercizi di base eseguiti bene prima di qualsiasi aumento di difficoltà. Per le prime sei settimane l'unico obiettivo era non saltare una sessione. Poi abbiamo aumentato volume e intensità una variabile alla volta, in base ai suoi riscontri. Sull'alimentazione pochi cambiamenti, ma mantenuti sempre.",
    oggi: "88 kg, 9 centimetri di girovita in meno e 90 secondi di plank. La schiena la gestisce, non la subisce più. Ha ripreso a giocare con il figlio e in cantiere segue di persona i sopralluoghi che prima delegava.",
    citazione: "Non mi serviva un programma da ventenne. Mi serviva qualcuno che mi facesse ripartire nel modo giusto e non mi lasciasse mollare.",
    video: "",
    screenshot: []
  },

  // STORIA 4 (esempio da sostituire)
  {
    id: "storia-04",
    esempio: true,
    nome: "Allievo 04",
    eta: 31,
    professione: "Infermiere turnista",
    archetipo: "Turnista, orari che cambiano ogni settimana",
    obiettivo: "definizione",
    durataSettimane: 12,
    titolo: "6 kg in meno in 12 settimane, con turni di notte e orari che cambiano ogni settimana",
    metriche: [
      { etichetta: "Peso", prima: "86 kg", dopo: "80 kg" },
      { etichetta: "Girovita", prima: "96 cm", dopo: "90 cm" },
      { etichetta: "Squat consecutivi", prima: "25", dopo: "60" }
    ],
    foto: {
      prima: "",
      dopo: ""
    },
    partenza: "Infermiere su tre turni, notti comprese. Mangiava quello che trovava alle macchinette e dormiva a pezzi. Ogni programma che aveva provato dava per scontato un orario fisso che lui non aveva.",
    lavoro: "Invece di un calendario fisso abbiamo stabilito delle regole: un numero di sessioni da completare nella settimana, incastrate dove il turno lo permetteva, anche al risveglio dopo la notte. Pasti preparati prima del turno e portati da casa, cibo normale organizzato meglio. Quando una settimana saltava, si ripartiva da quella dopo, senza drammi.",
    oggi: "80 kg e 6 centimetri di girovita in meno. Ha smesso di reggere le notti a caffè e zuccheri e arriva a fine turno meno svuotato. In reparto è quello che mantiene la calma quando la notte si complica, perché ha capito che la costanza non dipende dagli orari, ma dalle decisioni.",
    citazione: "Il mio problema non erano i turni. Era che aspettavo la settimana perfetta per cominciare.",
    video: "",
    screenshot: []
  },

  // STORIA 5 (esempio da sostituire)
  {
    id: "storia-05",
    esempio: true,
    nome: "Allievo 05",
    eta: 38,
    professione: "Consulente commerciale",
    archetipo: "Tre abbandoni in palestra, poca sicurezza",
    obiettivo: "ricomposizione",
    durataSettimane: 20,
    titolo: "8 cm di girovita in meno e da 1 a 7 trazioni, dopo tre abbonamenti in palestra lasciati a metà",
    metriche: [
      { etichetta: "Peso", prima: "84 kg", dopo: "81 kg" },
      { etichetta: "Girovita", prima: "97 cm", dopo: "89 cm" },
      { etichetta: "Trazioni consecutive", prima: "1", dopo: "7" }
    ],
    foto: {
      prima: "",
      dopo: ""
    },
    partenza: "Tre abbonamenti in palestra in cinque anni, tutti abbandonati entro il secondo mese. Ogni volta la stessa storia: entusiasmo iniziale, un imprevisto, poi la sensazione di aver fallito di nuovo. Con i clienti era preparato, ma entrava in riunione con le spalle chiuse e davanti allo specchio evitava di guardarsi.",
    lavoro: "Il problema non era la palestra: mancavano una struttura e qualcuno a cui rendere conto. Allenamento a casa, a corpo libero, con una progressione scritta: ogni esercizio un obiettivo misurabile, ogni settimana un passo avanti. Quando saltava una sessione ne parlavamo subito, senza giudizio e senza lasciar correre, prima che una settimana storta diventasse l'ennesimo abbandono.",
    oggi: "Sulla bilancia 3 kg in meno, ma il resto racconta altro: 8 centimetri di girovita in meno, spalle più piene, 7 trazioni partendo da una. Per la prima volta ha portato a termine un impegno preso con sé stesso. Con i clienti è più diretto, perché ha smesso di cercare approvazione.",
    citazione: "Non ho cambiato solo il fisico. Ho smesso di essere quello che molla.",
    video: "",
    screenshot: []
  }

];
