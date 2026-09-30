# Percorso Alpha, storie di trasformazione

Pagina unica con le testimonianze degli allievi di Percorso Alpha, pensata per il sottodominio **successi.percorsoalpha.com**.

È un sito statico: niente framework, niente installazioni, niente build. Sono file HTML, CSS e JavaScript che qualsiasi hosting può pubblicare così come sono. Il progetto è separato dalla dashboard: ha la sua cartella, il suo repository GitHub (`danymonta/alpha-success`) e il suo sottodominio.

Tutti i contenuti che cambiano nel tempo (storie, foto, link di candidatura) stanno in un solo file: `assets/js/testimonianze.js`.

## Struttura delle cartelle

```
alpha-success/
  index.html                  la pagina: testi fissi, profilo, struttura
  README.md                   questa guida
  GUIDA-DOMINIO.md            dominio, hosting e pubblicazione passo passo
  assets/
    css/style.css             grafica e colori del brand
    js/testimonianze.js       IL FILE DA MODIFICARE: impostazioni e storie
    js/main.js                costruisce le schede, non serve toccarlo
    img/
      logo-percorso-alpha.webp
      og-image.jpg            immagine di anteprima quando condividi il link
      favicon.ico
      apple-touch-icon.png
      dany.jpg                la tua foto (da caricare)
      allievi/                foto prima e dopo, screenshot dei feedback
```

## Aggiungere una storia

1. Raccogli il materiale: età, lavoro, situazione di partenza, durata del percorso, tre misure prima e dopo (peso, girovita, un esercizio), una frase dell'allievo con parole sue.
2. Fatti dare il **consenso scritto** dell'allievo per la pubblicazione di testi e foto. Basta un messaggio in cui lo conferma: conservalo.
3. Prepara le foto:
   - formato verticale 4:5 (ad esempio 800 x 1000 pixel), stessa posa e stessa luce tra prima e dopo;
   - JPG o WebP, sotto i 400 KB ciascuna;
   - nomi in minuscolo, senza spazi né accenti, ad esempio `allievo-marco-prima.jpg` e `allievo-marco-dopo.jpg`.
4. Su GitHub apri il repository del progetto, entra in `assets/img/allievi/`, premi **Add file** e poi **Upload files**, trascina le foto e conferma con **Commit changes**.
5. Sempre su GitHub apri `assets/js/testimonianze.js` e premi l'icona a forma di matita (**Edit this file**).
6. Trova il blocco **MODELLO DA COPIARE PER UNA NUOVA STORIA**. Copia tutto, dalla `{` alla `},` compresa.
7. Scendi fino alla riga `window.ALPHA_STORIE = [` e incolla il blocco subito sotto: le storie più recenti vanno in cima.
8. Sostituisci i valori tra virgolette con i dati del tuo allievo. Per le storie vere scrivi `esempio: false`. Nel campo `foto` scrivi il percorso delle foto caricate, ad esempio `"assets/img/allievi/allievo-marco-prima.jpg"`.
9. Quando le storie vere sono pronte, cancella i cinque esempi (le storie con `esempio: true`). Finché ne resta anche una, in cima alla pagina compare un avviso.
10. Premi **Commit changes** sul branch `main`. Vercel pubblica la nuova versione da solo, in circa un minuto (vedi [GUIDA-DOMINIO.md](GUIDA-DOMINIO.md)).

Se la pagina mostra "Le storie non sono disponibili in questo momento.", nel file c'è un errore di scrittura: quasi sempre una virgola o una virgoletta mancante nell'ultima parte modificata. Su GitHub apri la scheda **History** del file per confrontare con la versione precedente.

Campi facoltativi di ogni storia:

- `video`: link YouTube (anche Shorts) o qualsiasi altro link a un video. Con YouTube il video si apre dentro la pagina.
- `screenshot`: elenco di immagini di chat o feedback, ad esempio `["assets/img/allievi/allievo-marco-chat-1.jpg"]`.

Ogni storia ha un link diretto, utile da mandare in privato o nelle risposte: `https://successi.percorsoalpha.com/#storia-03` apre direttamente la storia con `id: "storia-03"`.

## Caricare la tua foto

1. Scegli una foto verticale 4:5, almeno 800 x 1000 pixel, con il viso ben visibile. Meglio sotto i 500 KB.
2. Rinominala `dany.jpg`, tutto minuscolo.
3. Su GitHub entra in `assets/img/`, premi **Add file**, poi **Upload files**, carica la foto e conferma con **Commit changes**.

Finché il file non esiste, al suo posto compare un riquadro segnaposto con la scritta "Foto di Dany". Se preferisci un altro nome o formato, ad esempio `dany.webp`, cambia la riga `fotoDany` in `assets/js/testimonianze.js`.

## Cambiare il link di candidatura

In `assets/js/testimonianze.js`, all'inizio, trovi:

```js
linkCandidatura: "https://percorsoalpha.com",
```

Sostituisci il link tra virgolette con quello della candidatura o della call (modulo, pagina di prenotazione, WhatsApp). Tutti i pulsanti della pagina si aggiornano insieme. Nello stesso blocco puoi cambiare `testoBottone` e aggiungere il link del tuo profilo `instagram`.

## Anteprima sul computer

Facoltativa, serve solo se vuoi vedere le modifiche prima di pubblicarle.

1. Apri il Terminale nella cartella del progetto.
2. Avvia un piccolo server locale:

   ```
   python3 -m http.server
   ```

3. Apri il browser su `http://localhost:8000`.
4. Per fermare il server premi `Ctrl` e `C` nel Terminale.

## Pubblicazione

Dominio, sottodominio `successi.percorsoalpha.com`, hosting e collegamento con GitHub sono spiegati passo passo in [GUIDA-DOMINIO.md](GUIDA-DOMINIO.md).
