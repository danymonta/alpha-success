# successi.percorsoalpha.com: messa online

Tempo di lavoro: circa un'ora, più l'attesa del DNS. Serve solo il browser.

---

## 1. Le tue domande

**Progetto separato dalla dashboard?** Sì, sempre separato.

- La pagina successi è pubblica. La dashboard è uno strumento privato con login.
- Le pubblicazioni sono indipendenti: un errore su una non tocca l'altra.
- I domini sono diversi: `dashboard.percorsoalpha.com` e `successi.percorsoalpha.com`.
- La dashboard ha database e credenziali. La pagina successi è solo testo e immagini, e cambierà spesso.

**Su GitHub?** È già creato. Il repository è `danymonta/alpha-success`, privato, e contiene già la pagina.

**Sul computer?** Non serve creare nulla. Tutto si gestisce dal browser, su GitHub e Vercel. Il computer serve solo se vuoi modificare i file in locale: in quel caso usi GitHub Desktop (facoltativo) e scarichi `alpha-success` in una cartella separata da quella della dashboard.

---

## 2. Come funziona

```
GitHub   (danymonta/alpha-success)   dove vive il codice
   ->
Vercel   (progetto alpha-success)    pubblica la pagina online
   ->
DNS di percorsoalpha.com             fa puntare successi.percorsoalpha.com a Vercel
```

1. Modifichi un file su GitHub.
2. Vercel se ne accorge e pubblica la nuova versione da solo, in circa un minuto.
3. Il record DNS indirizza chi scrive `successi.percorsoalpha.com` verso Vercel.

Il DNS si configura una volta sola. Dopo, lavori solo su GitHub.

---

## 3. Prima di andare online

La pagina contiene 5 storie esempio. Servono a vedere la struttura, non vanno pubblicate.

1. **Storie reali.** Sostituisci le 5 storie esempio con testimonianze vere dei tuoi allievi (punto 9). Per ognuno serve il consenso scritto: nome, testo e foto. Basta un messaggio o una mail in cui l'allievo scrive che accetta la pubblicazione. Conservalo.
2. **La tua foto.** Caricala in `assets/img/` con il nome esatto `dany.jpg`, tutto minuscolo. Formato JPG, verticale, volto ben visibile, peso sotto 500 KB. Su GitHub: apri la cartella `assets/img` > **Add file** > **Upload files** > trascina la foto > **Commit changes**.
3. **Link di candidatura.** Apri `assets/js/testimonianze.js`, trova la voce del link di candidatura e incolla l'indirizzo completo, con `https://`.

Finché nel file restano storie esempio, la pagina mostra in alto una fascia di anteprima. È voluta: impedisce di andare online con storie finte. Quando le sostituisci tutte, la fascia sparisce.

Puoi fare questi passaggi anche dopo il punto 4, direttamente su `main`. Finché non colleghi il dominio, la pagina è visibile solo sull'indirizzo provvisorio `.vercel.app`.

Checklist:
- [ ] 5 storie reali, ognuna con consenso scritto
- [ ] `assets/img/dany.jpg` caricata
- [ ] link di candidatura inserito
- [ ] fascia di anteprima sparita

---

## 4. Porta il lavoro sul branch principale

I file della pagina sono sul branch `claude/practical-brown-aabh3d`. Vercel pubblica il branch `main`. Vanno uniti.

1. Apri github.com > `danymonta/alpha-success`.
2. Se compare il riquadro giallo con **Compare & pull request**, premilo. Altrimenti: **Pull requests** > **New pull request** > in **base** scegli `main`, in **compare** scegli `claude/practical-brown-aabh3d`.
3. Premi **Create pull request**.
4. Premi **Merge pull request** > **Confirm merge**. Usa l'unione standard (merge commit), non "Squash".
5. Controlla: nella pagina principale del repository, sul branch `main`, ora vedi `index.html`.

Se preferisci, Claude può aprire la pull request al posto tuo: chiediglielo. Il merge finale lo fai tu, dal tuo account. Serve anche a Vercel (punto 10, autore del commit).

---

## 5. Crea il progetto su Vercel

Prima di questo passaggio leggi il punto 11: riguarda il piano Vercel da usare.

1. vercel.com > **Add New...** > **Project**.
2. Nella lista **Import Git Repository** cerca `alpha-success`.
   - Non c'è? Premi **Configure GitHub App** (o **Adjust GitHub App Permissions**). In alternativa: GitHub > **Settings** > **Applications** > Vercel > **Configure** > **Repository access** > aggiungi `alpha-success` > **Save**. Torna su Vercel e ricarica la lista.
3. Premi **Import** accanto a `danymonta/alpha-success`.
4. **Project Name**: `alpha-success` (oppure `successi-percorsoalpha`). Il nome decide l'indirizzo provvisorio `nome-progetto.vercel.app`.
5. **Framework Preset**: **Other**.
6. **Root Directory**: lascia `./`, la radice del repository.
7. **Build Command**: vuoto. Se il campo è precompilato, attiva **Override** e lascialo vuoto.
8. **Output Directory** e **Install Command**: lascia i valori predefiniti.
9. Nessuna variabile d'ambiente.
10. Premi **Deploy**. Attendi circa un minuto.
11. Apri `https://nome-progetto.vercel.app` e controlla la pagina da telefono e da computer.

Da ora ogni modifica su `main` viene pubblicata da sola.

Regola fissa: nel repository non creare mai una cartella chiamata `public`. Vercel pubblicherebbe solo quella. `index.html` resta nella radice.

Checklist:
- [ ] progetto Vercel nuovo, separato dalla dashboard
- [ ] pagina visibile su `.vercel.app`

---

## 6. Collega successi.percorsoalpha.com

### In Vercel

1. Apri il progetto nuovo, **non** quello della dashboard.
2. **Settings** > **Domains**.
3. Premi **Add Domain** (in alcune versioni **Add Existing**), scrivi `successi.percorsoalpha.com`, conferma. Lascialo collegato all'ambiente **Production** e non scegliere nessun redirect. Le voci esatte della finestra possono variare.
4. La scheda del dominio mostra **Invalid Configuration** e il record da creare. È normale: il record non esiste ancora.
5. Copia il valore che Vercel indica per il CNAME. Ha una forma simile a `d1d4fc829fe7bc7c.vercel-dns-017.com` (lettere e numero finale cambiano per ogni progetto). Copialo da questa scheda, non da quella della dashboard.

### Nel pannello DNS

Crea un solo record nuovo:

| Campo | Cosa scrivere |
|---|---|
| Tipo | `CNAME` |
| Nome / Host | `successi` |
| Valore / Punta a / Destinazione | il valore esatto copiato da Vercel |
| TTL | predefinito o Auto (3600 va bene) |

Regole:
- Lavora nello **stesso pannello** dove esiste già il record `dashboard`.
- Il record `dashboard` non si tocca: né modifiche, né cancellazioni.
- Il sito principale `percorsoalpha.com` non si tocca, e nemmeno `www` o i record della posta (MX).
- Nel campo Nome scrivi solo `successi`: il pannello aggiunge da solo `.percorsoalpha.com`. Unica eccezione: Register.it (punto 7).
- Mai un record A per il sottodominio quando Vercel indica un CNAME.

**Non ricordi dove hai creato il record `dashboard`?** Apri dnschecker.org, scegli **NS**, scrivi `percorsoalpha.com`. Il risultato indica chi gestisce il DNS:

| Nameserver | Pannello |
|---|---|
| `ns1.vercel-dns.com`, `ns2.vercel-dns.com` | Vercel |
| `dns.technorail.com`, `dns3.arubadns.net` | Aruba |
| `ns1.dns-parking.com` | Hostinger |
| `nsXX.domaincontrol.com` | GoDaddy |
| `ui-dns.com`, `ui-dns.de` e simili | IONOS |
| `nome.ns.cloudflare.com` | Cloudflare |
| `registrar-servers.com` | Namecheap |
| `register.it` | Register.it |

Il record va dove puntano i nameserver, anche se hai comprato il dominio altrove.

### Caso nameserver Vercel

Se i nameserver sono `ns1.vercel-dns.com` e `ns2.vercel-dns.com`, non crei nessun record. Aggiungere il dominio in **Settings** > **Domains** del progetto basta: Vercel crea il record da solo, la scheda diventa **Valid Configuration** e il certificato arriva in automatico. I record del dominio si vedono in Vercel > **Domains** > `percorsoalpha.com`.

### Verifica TXT (solo se richiesta)

Se Vercel dice che il dominio è in uso da un altro progetto o account, chiede un record `TXT` con nome `_vercel` e un valore da copiare. Crealo nello stesso pannello DNS. Dopo la verifica puoi cancellarlo.

---

## 7. Provider per provider

Le voci dei menu cambiano nel tempo. Se una voce non corrisponde, cerca quella con un nome simile.

**Aruba**
1. Area Clienti > seleziona `percorsoalpha.com` > pannello di gestione DNS (la voce può chiamarsi "Gestione DNS e name server").
2. **Aggiungi record** > tipo **CNAME (Canonical NAME)**.
3. **Nome host**: `successi`. **Nome CNAME**: il valore Vercel.
4. **Aggiungi** > **Prosegui** (in fondo alla pagina).
5. Torna alla pagina principale del pannello DNS > **Salva configurazione** > **Conferma**.
6. Prima di aggiungere, controlla che non esista già un record `successi`, ad esempio creato da un sottodominio dell'hosting Aruba. Aruba indica circa 24 ore di propagazione.

**Register.it**
1. Pannello del dominio > **DOMINIO & DNS** > **Configurazione DNS** > **Gestione avanzata**.
2. Scorri in basso > **AGGIUNGI RECORD** > Tipo **CNAME**.
3. **Nome**: il nome completo `successi.percorsoalpha.com`. Qui è l'eccezione.
4. **Valore**: il valore Vercel. TTL 900 va bene. Salva e conferma.
5. Dopo il salvataggio controlla che il record non risulti `successi.percorsoalpha.com.percorsoalpha.com`. Register.it indica fino a 48 ore.

**GoDaddy**
1. Accedi > **Domain Portfolio** > `percorsoalpha.com` > **DNS**.
2. **Add New Record** > Type **CNAME**.
3. **Name**: `successi`. **Value**: il valore Vercel. TTL predefinito.
4. **Save**.

**Hostinger (hPanel)**
1. hPanel > **Domains** > **Domain portfolio** > `percorsoalpha.com` > **DNS / Nameservers** > **DNS records**.
2. Type **CNAME**. **Name**: `successi`. **Points to** (o **Target**): il valore Vercel.
3. **Add record**.
4. Funziona solo se il dominio usa i nameserver Hostinger. Se `successi` esiste già come sottodominio dell'hosting, cancella prima il suo record A.

**IONOS**
1. **Domains & SSL** > accanto a `percorsoalpha.com` apri il menu azioni (tre puntini o ingranaggio) > **DNS**.
2. **Add record** > **CNAME**.
3. **Host name**: `successi` (il dominio è già precompilato). **Point to**: il valore Vercel.
4. **Save**. Se IONOS avvisa che record esistenti per quel nome verranno sostituiti, per un sottodominio nuovo è normale. IONOS indica da 24 a 72 ore.

**Cloudflare (solo DNS)**
1. Dashboard Cloudflare > `percorsoalpha.com` > **DNS** > **Records** > **Add record**.
2. Type **CNAME**. **Name**: `successi`. **Target**: il valore Vercel.
3. **Proxy status**: **DNS only**, nuvola grigia. Obbligatorio. Con la nuvola arancione Vercel non funziona.
4. TTL **Auto** > **Save**.

**Namecheap**
1. **Domain List** > **Manage** accanto a `percorsoalpha.com` > scheda **Advanced DNS**.
2. **Add New Record** > **CNAME Record**.
3. **Host**: solo `successi`. **Value**: il valore Vercel. TTL **Automatic**.
4. Conferma con la spunta verde o **Save All Changes**.

**Nameserver Vercel**
Nessun record da creare. Vedi punto 6, caso nameserver Vercel.

---

## 8. Verifica e HTTPS

1. **Attesa.** Per un sottodominio nuovo di solito bastano da pochi minuti a un'ora. Vercel indica fino a 24 ore; alcuni provider dichiarano tempi più lunghi (Register.it 48 ore, IONOS 72).
2. **Controllo DNS.** dnschecker.org > scegli **CNAME** > scrivi `successi.percorsoalpha.com`. Quando compare il valore Vercel in quasi tutto il mondo, il DNS è a posto.
3. **Vercel.** Torna su **Settings** > **Domains** del progetto. La scheda deve passare a **Valid Configuration**. Se non si aggiorna, usa l'icona di aggiornamento.
4. **HTTPS.** Il certificato è automatico e gratuito. Arriva di solito da 5 a 30 minuti dopo che il DNS risponde. Non devi fare nulla, e si rinnova da solo.
5. **Prova finale.** Dal telefono, Wi-Fi spento, dati mobili: apri `https://successi.percorsoalpha.com`. Deve comparire il lucchetto. Poi prova da una finestra in incognito sul computer.

Checklist:
- [ ] Valid Configuration su Vercel
- [ ] lucchetto HTTPS presente
- [ ] pagina corretta da telefono con dati mobili
- [ ] dashboard ancora funzionante

---

## 9. Aggiungere una nuova storia

Tutto dal browser. Ogni modifica su `main` viene pubblicata da sola in circa un minuto.

### Foto dell'allievo

1. GitHub > `alpha-success` > apri la cartella `assets/img/allievi/`.
2. **Add file** > **Upload files** > trascina la foto.
3. Nome del file: minuscolo, senza spazi né accenti, ad esempio `marco-r.jpg`. Peso sotto 500 KB.
4. **Commit changes** con l'opzione **Commit directly to the main branch**.

Se la cartella `allievi` non esiste ancora: apri `assets/img`, **Add file** > **Upload files** e trascina una cartella chiamata `allievi` con dentro la foto.

### Testo della storia

1. Apri `assets/js/testimonianze.js`.
2. Premi l'icona della matita (**Edit this file**).
3. Copia il blocco modello presente nel file: parte da una graffa aperta `{` e finisce con una graffa chiusa e una virgola `},`.
4. Incollalo accanto agli altri blocchi, dopo la `},` di una storia esistente.
5. Compila solo i valori tra virgolette. Non cambiare i nomi dei campi a sinistra dei due punti.
6. Nel campo della foto scrivi il percorso esatto, ad esempio `assets/img/allievi/marco-r.jpg`.
7. **Commit changes...** > **Commit directly to the main branch** > **Commit changes**.
8. Dopo un minuto ricarica la pagina e controlla.

Regole di scrittura:
- Ogni blocco si chiude con `},`. Una virgola mancante tra due blocchi rompe tutto l'elenco.
- Dentro un testo non usare lo stesso tipo di virgolette che lo racchiude.
- Parole dell'allievo, non tue. Risultati reali, niente promesse.

### Se la pagina non mostra più nessuna storia

La pagina si apre ma l'elenco è vuoto: quasi sempre è una virgola mancante o una virgoletta di troppo nell'ultima modifica.

1. Su GitHub apri `assets/js/testimonianze.js` > **History** > ultimo commit. Le righe in verde sono quelle aggiunte: controlla virgole e virgolette lì.
2. Correggi con la matita e fai un nuovo commit.
3. In alternativa annulla l'ultimo commit. Con GitHub Desktop: **History** > tasto destro sull'ultimo commit > **Revert Changes in Commit** > **Push origin**.
4. Oppure chiedi a Claude: incolla il contenuto del file e ricevi la versione corretta.

---

## 10. Problemi comuni

**`alpha-success` non compare nella lista di import di Vercel.**
L'app Vercel su GitHub non ha accesso al repository. GitHub > **Settings** > **Applications** > Vercel > **Configure** > **Repository access** > aggiungi `alpha-success` > **Save**.

**Il deploy è bloccato con errori come "Git author must have access to the project" o "GitHub could not associate the committer with a GitHub user".**
Sul piano Hobby con repository privato, l'autore dell'ultimo commit deve essere il titolare dell'account Vercel. Alcuni commit di Claude risultano scritti da `Claude <noreply@anthropic.com>`. Soluzione: unisci sempre il lavoro di Claude con una pull request dal tuo account (punto 4), con merge standard. In alternativa: rilancia il deploy a mano da Vercel (**Deployments** > **Redeploy**), oppure passa a Pro (punto 11).

**La scheda del dominio resta su Invalid Configuration.**
Controlla in ordine: record creato nel pannello giusto (quello dei nameserver), nome `successi`, valore identico a quello di Vercel, nessun altro record con nome `successi`. Poi attendi la propagazione. Se il DNS risponde correttamente su dnschecker.org e la scheda non cambia, rimuovi il dominio dal progetto e aggiungilo di nuovo.

**Il record risulta `successi.percorsoalpha.com.percorsoalpha.com`.**
Hai scritto il nome completo in un pannello che aggiunge il dominio da solo. Cancella il record e ricrealo con Nome `successi`. Vale per Aruba, GoDaddy, Hostinger, IONOS, Cloudflare, Namecheap.

**Il valore salvato finisce con `.vercel-dns-017.com.percorsoalpha.com`.**
È il punto finale. Vercel a volte mostra il valore con un punto alla fine. Se il pannello lo accetta, tienilo. Dopo il salvataggio il valore deve essere identico a quello di Vercel, niente di più.

**Il pannello rifiuta il CNAME o Vercel segnala un conflitto.**
Esiste già un record con nome `successi` (A, AAAA, TXT, MX o un altro CNAME). Un CNAME non convive con altri record dello stesso nome: cancella quello vecchio. Un record jolly `*` (frequente su Aruba) non blocca, un vecchio `successi` sì.

**Con Cloudflare: Invalid Configuration, "Failed to Generate Cert" o pagina che si ricarica all'infinito.**
Il record è in modalità proxy, nuvola arancione. Mettilo su **DNS only**, nuvola grigia.

**Hai creato il record ma non succede nulla, anche dopo un giorno.**
Il record è nel pannello sbagliato: il dominio usa nameserver di un altro fornitore. Controlla i nameserver (punto 6) e crea il record lì.

**Il dominio è finito sul progetto della dashboard.**
Toglilo da **Settings** > **Domains** della dashboard e aggiungilo al progetto `alpha-success`. Non toccare `dashboard.percorsoalpha.com`.

**Il certificato non arriva.**
Se `percorsoalpha.com` ha record CAA personalizzati, devono includere `0 issue "letsencrypt.org"`. Con un CNAME verso Vercel succede raramente.

**Su un dispositivo funziona, su un altro no.**
È la cache DNS locale. Prova con dati mobili, in incognito o su dnschecker.org prima di cambiare qualcosa.

**Vercel pubblica una pagina vuota o un errore 404.**
Controlla che `index.html` sia nella radice del repository e che non esista una cartella `public`.

**La fascia di anteprima è ancora visibile.**
Nel file restano storie esempio. Sostituiscile tutte (punto 3).

---

## 11. Piano Vercel

Le condizioni di Vercel dicono che il piano gratuito Hobby è riservato all'uso personale e non commerciale. Definiscono commerciale ogni sito usato per un guadagno economico e citano tra gli esempi la pubblicità della vendita di un prodotto o servizio.

La pagina successi presenta un percorso a pagamento. Letta alla lettera, la regola la classifica come uso commerciale. È un'interpretazione del testo, non una decisione di Vercel. Lo stesso ragionamento, con buona probabilità, vale anche per la dashboard.

Le due strade corrette:

**A. Vercel Pro.**
- Circa 20 dollari al mese per ogni utente che pubblica. Include 20 dollari al mese di consumo.
- Un solo utente copre tutti i progetti: successi e dashboard.
- I punti 5 e 6 restano identici.
- Per passare: su Vercel, impostazioni del team > sezione **Billing** > passaggio a Pro.
- Prezzo da confermare su vercel.com/pricing: una fonte indica 24 dollari con pagamento mensile.

**B. Cloudflare Pages, gratuito.**
- Consente l'uso commerciale secondo la community Cloudflare e fonti esterne. Le condizioni ufficiali vanno lette da te prima di scegliere.
- Limiti ampi: 500 pubblicazioni al mese, traffico senza limite.
- Funziona con il DNS attuale, con un CNAME.
- Passaggi: Cloudflare > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** > autorizza GitHub > `danymonta/alpha-success` > **Begin setup**. **Framework preset**: None. **Build command**: vuoto (o `exit 0`). **Build output directory**: la radice (`/`). **Save and Deploy**.
- Poi: progetto > **Custom domains** > **Set up a domain** > `successi.percorsoalpha.com` > **Continue**.
- Solo dopo, nel pannello DNS: CNAME, Nome `successi`, Valore `nome-progetto.pages.dev`. L'ordine conta: al contrario compare l'errore 522.

Netlify gratuito consente l'uso commerciale, ma ha crediti mensili stretti: quando finiscono, il sito si ferma fino al mese successivo. Non adatto.

**Scelta consigliata: Vercel Pro.** Un solo pannello per successi e dashboard, entrambi i progetti in regola, nessun passaggio nuovo da imparare. Se vuoi costo zero per la sola pagina successi, usa Cloudflare Pages e lascia la dashboard dov'è.

---

## Checklist finale

- [ ] Piano deciso: Vercel Pro oppure Cloudflare Pages
- [ ] Pull request dal branch `claude/practical-brown-aabh3d` unita su `main`
- [ ] 5 storie reali al posto degli esempi, con consenso scritto
- [ ] Foto `assets/img/dany.jpg` caricata
- [ ] Link di candidatura inserito in `assets/js/testimonianze.js`
- [ ] Fascia di anteprima sparita
- [ ] Progetto Vercel nuovo, separato dalla dashboard, pagina visibile su `.vercel.app`
- [ ] Dominio `successi.percorsoalpha.com` aggiunto al progetto nuovo
- [ ] Record CNAME `successi` creato nello stesso pannello del record `dashboard`
- [ ] Record `dashboard` e sito principale intatti
- [ ] Valid Configuration su Vercel
- [ ] HTTPS attivo, prova da telefono con dati mobili superata
- [ ] Dashboard ancora funzionante
