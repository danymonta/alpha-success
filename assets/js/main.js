/*
  Percorso Alpha, pagina delle storie di trasformazione.

  Questo file costruisce le schede delle storie leggendo i dati da
  assets/js/testimonianze.js. Per aggiornare la pagina non serve toccarlo:
  si lavora solo su testimonianze.js.

  JavaScript puro, nessuna libreria esterna. Ogni testo che arriva dai dati
  viene inserito con textContent, quindi non può mai diventare codice HTML.
*/
(() => {
  "use strict";

  /* ------------------------------------------------------------------------
     Valori predefiniti e testi fissi dell'interfaccia
     ------------------------------------------------------------------------ */
  const CONFIG_PREDEFINITA = {
    linkCandidatura: "https://percorsoalpha.com",
    testoBottone: "Candidati al percorso",
    instagram: "",
    fotoDany: "assets/img/dany.jpg"
  };

  const TESTI = {
    badgeEsempio: "Esempio da sostituire",
    erroreStorie: "Le storie non sono disponibili in questo momento.",
    partenza: "Il punto di partenza",
    lavoro: "Il lavoro",
    oggi: "Oggi",
    prima: "Prima",
    dopo: "Dopo",
    fotoPrima: "Foto prima",
    fotoDopo: "Foto dopo",
    guardaVideo: "Guarda il video",
    linkStoria: "Link a questa storia"
  };

  const OBIETTIVI = {
    massa: "Massa",
    definizione: "Definizione",
    ricomposizione: "Ricomposizione"
  };

  const FILTRI = [
    { chiave: "tutte", etichetta: "Tutte", prova: () => true },
    { chiave: "massa", etichetta: "Massa", prova: (s) => s.obiettivo === "massa" },
    { chiave: "definizione", etichetta: "Definizione", prova: (s) => s.obiettivo === "definizione" },
    { chiave: "ricomposizione", etichetta: "Ricomposizione", prova: (s) => s.obiettivo === "ricomposizione" },
    { chiave: "over-35", etichetta: "Over 35", prova: (s) => s.eta !== null && s.eta >= 35 }
  ];

  const SVG_NS = "http://www.w3.org/2000/svg";

  /* ------------------------------------------------------------------------
     Funzioni di supporto
     ------------------------------------------------------------------------ */

  // Restituisce sempre una stringa pulita: numeri e testi vanno bene, il resto diventa "".
  const testo = (valore) => {
    if (typeof valore === "string") return valore.trim();
    if (typeof valore === "number" && Number.isFinite(valore)) return String(valore);
    return "";
  };

  const numeroPositivo = (valore) => {
    const n = Number(valore);
    return valore !== "" && valore !== null && Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  };

  const eOggetto = (valore) => valore !== null && typeof valore === "object" && !Array.isArray(valore);

  // Blocca i link pericolosi (javascript:, data:, vbscript:) e restituisce "" se il link non va usato.
  const urlSicuro = (valore) => {
    const url = testo(valore);
    if (!url) return "";
    if (/^(javascript|data|vbscript):/i.test(url.replace(/\s+/g, ""))) return "";
    return url;
  };

  const eEsterno = (url) => {
    try {
      return new URL(url, window.location.href).origin !== window.location.origin;
    } catch (errore) {
      return false;
    }
  };

  // Trasforma un testo in un codice adatto a un link diretto: minuscolo, senza spazi né accenti.
  const codice = (valore) =>
    testo(valore)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Crea un elemento HTML. "text" imposta il testo, "class" la classe, il resto diventa attributo.
  const el = (tag, attributi, figli) => {
    const nodo = document.createElement(tag);
    if (attributi) {
      Object.keys(attributi).forEach((nome) => {
        const valore = attributi[nome];
        if (valore === null || valore === undefined || valore === false) return;
        if (nome === "text") nodo.textContent = String(valore);
        else if (nome === "class") nodo.className = valore;
        else nodo.setAttribute(nome, valore === true ? "" : String(valore));
      });
    }
    (figli || []).forEach((figlio) => {
      if (figlio === null || figlio === undefined || figlio === "") return;
      nodo.append(typeof figlio === "string" ? document.createTextNode(figlio) : figlio);
    });
    return nodo;
  };

  const svg = (viewBox, disegni, classe) => {
    const nodo = document.createElementNS(SVG_NS, "svg");
    nodo.setAttribute("viewBox", viewBox);
    nodo.setAttribute("aria-hidden", "true");
    nodo.setAttribute("focusable", "false");
    if (classe) nodo.setAttribute("class", classe);
    disegni.forEach(([tag, attributi]) => {
      const parte = document.createElementNS(SVG_NS, tag);
      Object.keys(attributi).forEach((nome) => parte.setAttribute(nome, attributi[nome]));
      nodo.append(parte);
    });
    return nodo;
  };

  const iconaPlay = () => svg("0 0 24 24", [["path", { d: "M8 5.5v13l10.5-6.5z" }]]);

  const iconaSagoma = () =>
    svg("0 0 24 24", [
      ["circle", { cx: "12", cy: "8", r: "3.5", fill: "none", "stroke-width": "1.5" }],
      ["path", { d: "M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5", fill: "none", "stroke-width": "1.5", "stroke-linecap": "round" }]
    ]);

  const idYouTube = (url) => {
    const trovato = url.match(
      /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i
    );
    return trovato ? trovato[1] : "";
  };

  /* ------------------------------------------------------------------------
     Lettura e pulizia dei dati
     ------------------------------------------------------------------------ */
  const leggiConfig = () => {
    const dalFile = eOggetto(window.ALPHA_CONFIG) ? window.ALPHA_CONFIG : {};
    return Object.assign({}, CONFIG_PREDEFINITA, dalFile);
  };

  const normalizzaStoria = (grezza, indice, codiciUsati) => {
    if (!eOggetto(grezza)) {
      console.warn(`Percorso Alpha: la storia numero ${indice + 1} non è scritta correttamente ed è stata saltata.`);
      return null;
    }

    let id = codice(grezza.id) || `storia-${String(indice + 1).padStart(2, "0")}`;
    if (codiciUsati.has(id)) {
      console.warn(`Percorso Alpha: il codice "${id}" è usato da più storie. Dai a ogni storia un id diverso.`);
      let n = 2;
      while (codiciUsati.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }
    codiciUsati.add(id);

    const obiettivo = testo(grezza.obiettivo).toLowerCase();
    const foto = eOggetto(grezza.foto) ? grezza.foto : {};
    const metriche = Array.isArray(grezza.metriche) ? grezza.metriche : [];
    let screenshot = grezza.screenshot;
    if (typeof screenshot === "string") screenshot = [screenshot];
    if (!Array.isArray(screenshot)) screenshot = [];

    return {
      id,
      esempio: grezza.esempio === true,
      nome: testo(grezza.nome) || `Allievo ${String(indice + 1).padStart(2, "0")}`,
      eta: numeroPositivo(grezza.eta),
      professione: testo(grezza.professione),
      archetipo: testo(grezza.archetipo),
      obiettivo: Object.prototype.hasOwnProperty.call(OBIETTIVI, obiettivo) ? obiettivo : "",
      durata: numeroPositivo(grezza.durataSettimane),
      titolo: testo(grezza.titolo),
      metriche: metriche
        .filter(eOggetto)
        .map((m) => ({ etichetta: testo(m.etichetta), prima: testo(m.prima), dopo: testo(m.dopo) }))
        .filter((m) => m.etichetta && (m.prima || m.dopo)),
      foto: { prima: urlSicuro(foto.prima), dopo: urlSicuro(foto.dopo) },
      partenza: testo(grezza.partenza),
      lavoro: testo(grezza.lavoro),
      oggi: testo(grezza.oggi),
      citazione: testo(grezza.citazione),
      video: urlSicuro(grezza.video),
      screenshot: screenshot.map(urlSicuro).filter(Boolean)
    };
  };

  /* ------------------------------------------------------------------------
     Parti della scheda
     ------------------------------------------------------------------------ */
  const creaFotoVuota = (tipo, etichetta) =>
    el("div", { class: `foto foto--vuota foto--${tipo}` }, [
      el("span", { class: "foto__segnaposto" }, [iconaSagoma(), el("span", { text: etichetta })])
    ]);

  const creaFoto = (storia) => {
    const tipi = [
      { tipo: "prima", etichetta: TESTI.prima, vuota: TESTI.fotoPrima, alt: `${storia.nome} prima del percorso` },
      {
        tipo: "dopo",
        etichetta: TESTI.dopo,
        vuota: TESTI.fotoDopo,
        alt: storia.durata
          ? `${storia.nome} dopo ${storia.durata} ${storia.durata === 1 ? "settimana" : "settimane"} di percorso`
          : `${storia.nome} dopo il percorso`
      }
    ];

    const coppia = el("div", { class: "foto-coppia" });

    tipi.forEach((voce) => {
      const src = storia.foto[voce.tipo];
      if (!src) {
        if (storia.esempio) coppia.append(creaFotoVuota(voce.tipo, voce.vuota));
        return;
      }
      const img = el("img", { src, alt: voce.alt, loading: "lazy", decoding: "async", width: 800, height: 1000 });
      const figura = el("figure", { class: `foto foto--${voce.tipo}` }, [
        img,
        el("figcaption", { class: "foto__etichetta", text: voce.etichetta })
      ]);
      img.addEventListener(
        "error",
        () => {
          console.warn(
            `Percorso Alpha: foto non trovata "${src}" nella storia "${storia.id}". Controlla nome ed estensione del file in assets/img/allievi/.`
          );
          if (storia.esempio) {
            figura.replaceWith(creaFotoVuota(voce.tipo, voce.vuota));
          } else {
            figura.remove();
            if (!coppia.children.length) coppia.remove();
          }
        },
        { once: true }
      );
      coppia.append(figura);
    });

    return coppia.children.length ? coppia : null;
  };

  const creaMetriche = (storia) => {
    if (!storia.metriche.length) return null;
    const righe = storia.metriche.map((m) =>
      el("tr", null, [
        el("th", { scope: "row", text: m.etichetta }),
        el("td", { class: "metriche__prima", text: m.prima }),
        el("td", { class: "metriche__dopo", text: m.dopo })
      ])
    );
    return el("table", { class: "metriche" }, [
      el("caption", { class: "sr", text: `Misure di ${storia.nome}, prima e dopo il percorso` }),
      el("thead", null, [
        el("tr", null, [
          el("th", { scope: "col" }, [el("span", { class: "sr", text: "Misura" })]),
          el("th", { scope: "col", text: TESTI.prima }),
          el("th", { scope: "col", text: TESTI.dopo })
        ])
      ]),
      el("tbody", null, righe)
    ]);
  };

  const creaRacconto = (storia) => {
    const blocchi = [
      [TESTI.partenza, storia.partenza],
      [TESTI.lavoro, storia.lavoro],
      [TESTI.oggi, storia.oggi]
    ]
      .filter(([, contenuto]) => contenuto)
      .map(([titolo, contenuto]) =>
        el("div", { class: "blocco" }, [el("h4", { class: "blocco__titolo", text: titolo }), el("p", { text: contenuto })])
      );
    return blocchi.length ? el("div", { class: "racconto" }, blocchi) : null;
  };

  const creaVideo = (storia) => {
    if (!storia.video) return null;
    const id = idYouTube(storia.video);

    if (!id) {
      return el("a", {
        class: "video-link",
        href: storia.video,
        target: "_blank",
        rel: "noopener",
        text: TESTI.guardaVideo
      });
    }

    const verticale = /\/shorts\//i.test(storia.video);
    const riquadro = el("div", { class: verticale ? "video video--verticale" : "video" });
    const avvia = el(
      "button",
      { type: "button", class: "video__avvia", "aria-label": `${TESTI.guardaVideo}: ${storia.nome}` },
      [
        el("img", {
          src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          alt: "",
          loading: "lazy",
          decoding: "async",
          width: 480,
          height: 360
        }),
        el("span", { class: "video__icona" }, [iconaPlay()])
      ]
    );

    avvia.addEventListener("click", () => {
      const iframe = el("iframe", {
        src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`,
        title: `Video della storia di ${storia.nome}`,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowfullscreen: true,
        referrerpolicy: "strict-origin-when-cross-origin"
      });
      riquadro.replaceChildren(iframe);
      iframe.focus();
    });

    riquadro.append(avvia);
    return riquadro;
  };

  const creaScreenshot = (storia) => {
    if (!storia.screenshot.length) return null;
    const totale = storia.screenshot.length;
    const elenco = el("ul", { class: "screenshot", "aria-label": `Messaggi e feedback di ${storia.nome}` });

    storia.screenshot.forEach((src, indice) => {
      const img = el("img", {
        src,
        alt: `Messaggio di ${storia.nome}, immagine ${indice + 1} di ${totale}`,
        loading: "lazy",
        decoding: "async"
      });
      const voce = el("li", null, [el("a", { href: src, target: "_blank", rel: "noopener" }, [img])]);
      img.addEventListener(
        "error",
        () => {
          console.warn(`Percorso Alpha: immagine non trovata "${src}" nella storia "${storia.id}".`);
          voce.remove();
          if (!elenco.children.length) elenco.remove();
        },
        { once: true }
      );
      elenco.append(voce);
    });

    return elenco;
  };

  const creaStoria = (storia) => {
    const etichette = [];
    if (storia.esempio) etichette.push(el("span", { class: "etichetta etichetta--esempio", text: TESTI.badgeEsempio }));
    if (storia.obiettivo) etichette.push(el("span", { class: "etichetta", text: OBIETTIVI[storia.obiettivo] }));
    if (storia.durata) {
      etichette.push(
        el("span", { class: "etichetta", text: `${storia.durata} ${storia.durata === 1 ? "settimana" : "settimane"}` })
      );
    }

    const chi = [storia.professione, storia.archetipo].filter(Boolean).map((voce) => el("span", { text: voce }));

    const foto = creaFoto(storia);
    const metriche = creaMetriche(storia);
    const dati = foto || metriche ? el("div", { class: "storia__dati" }, [foto, metriche]) : null;

    const citazione = storia.citazione
      ? el("blockquote", { class: "citazione" }, [el("p", { text: storia.citazione })])
      : null;

    return el("article", { class: "storia", id: storia.id, "aria-labelledby": `${storia.id}-nome` }, [
      etichette.length ? el("div", { class: "storia__etichette" }, etichette) : null,
      el("h3", { class: "storia__nome", id: `${storia.id}-nome` }, [
        storia.nome,
        storia.eta ? el("span", { class: "storia__eta", text: `, ${storia.eta} anni` }) : null
      ]),
      chi.length ? el("p", { class: "storia__chi" }, chi) : null,
      storia.titolo ? el("p", { class: "storia__titolo", text: storia.titolo }) : null,
      dati,
      creaRacconto(storia),
      citazione,
      creaVideo(storia),
      creaScreenshot(storia),
      el("div", { class: "storia__piede" }, [
        el("a", { class: "storia__link", href: `#${storia.id}`, text: TESTI.linkStoria })
      ])
    ]);
  };

  /* ------------------------------------------------------------------------
     Filtri
     ------------------------------------------------------------------------ */
  const preparaFiltri = (storie, schede) => {
    const contenitore = document.getElementById("filtri");
    const stato = document.getElementById("storie-stato");
    const totale = storie.length;
    const bottoni = [];

    const aggiornaStato = (visibili) => {
      if (stato) stato.textContent = `${visibili} ${visibili === 1 ? "storia" : "storie"} su ${totale}`;
    };

    const applica = (chiave) => {
      const filtro = FILTRI.find((f) => f.chiave === chiave) || FILTRI[0];
      let visibili = 0;
      storie.forEach((storia, indice) => {
        const mostra = filtro.prova(storia);
        schede[indice].hidden = !mostra;
        if (mostra) visibili += 1;
      });
      bottoni.forEach((b) => b.setAttribute("aria-pressed", b.dataset.filtro === filtro.chiave ? "true" : "false"));
      aggiornaStato(visibili);
    };

    if (contenitore) {
      FILTRI.forEach((filtro) => {
        const quante = storie.filter(filtro.prova).length;
        if (filtro.chiave !== "tutte" && quante === 0) return;
        const bottone = el(
          "button",
          { type: "button", class: "filtro", "aria-pressed": filtro.chiave === "tutte" ? "true" : "false", "data-filtro": filtro.chiave },
          [el("span", { text: filtro.etichetta }), el("span", { class: "filtro__conteggio", text: String(quante) })]
        );
        bottone.addEventListener("click", () => applica(filtro.chiave));
        bottoni.push(bottone);
        contenitore.append(bottone);
      });
      contenitore.hidden = bottoni.length < 2;
    }

    aggiornaStato(totale);
    return applica;
  };

  /* ------------------------------------------------------------------------
     Link diretto a una storia (#storia-03)
     ------------------------------------------------------------------------ */
  const gestisciLinkDiretto = (applicaFiltro) => {
    const vai = (primoCaricamento) => {
      let id = "";
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch (errore) {
        return;
      }
      document.querySelectorAll(".storia--evidenziata").forEach((n) => n.classList.remove("storia--evidenziata"));
      if (!id) return;
      const bersaglio = document.getElementById(id);
      if (!bersaglio || !bersaglio.classList.contains("storia")) return;
      const eraNascosta = bersaglio.hidden;
      if (eraNascosta) applicaFiltro("tutte");
      bersaglio.classList.add("storia--evidenziata");
      // Al primo caricamento la scheda non esisteva ancora quando il browser ha letto il link: si scorre a mano.
      if (primoCaricamento || eraNascosta) bersaglio.scrollIntoView({ block: "start" });
    };
    vai(true);
    window.addEventListener("hashchange", () => vai(false));
  };

  /* ------------------------------------------------------------------------
     Parti fisse della pagina
     ------------------------------------------------------------------------ */
  const applicaConfig = (config) => {
    const link = urlSicuro(config.linkCandidatura) || CONFIG_PREDEFINITA.linkCandidatura;
    const esterno = eEsterno(link);
    document.querySelectorAll("[data-candidatura]").forEach((a) => {
      a.setAttribute("href", link);
      if (esterno) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      } else {
        a.removeAttribute("target");
        a.removeAttribute("rel");
      }
    });

    const testoBottone = testo(config.testoBottone);
    if (testoBottone) {
      document.querySelectorAll("[data-testo-config]").forEach((a) => {
        a.textContent = testoBottone;
      });
    }

    const social = document.getElementById("profilo-social");
    let instagram = urlSicuro(config.instagram);
    if (social && instagram) {
      if (/^@?[A-Za-z0-9._]+$/.test(instagram)) instagram = `https://www.instagram.com/${instagram.replace(/^@/, "")}/`;
      const profilo = (instagram.match(/instagram\.com\/([A-Za-z0-9._]+)/i) || [])[1];
      social.replaceChildren(
        el("a", { href: instagram, target: "_blank", rel: "noopener", text: profilo ? `Instagram @${profilo}` : "Instagram" })
      );
      social.hidden = false;
    }
  };

  const caricaFotoDany = (config) => {
    const figura = document.getElementById("foto-dany");
    const img = document.getElementById("foto-dany-img");
    const percorso = document.getElementById("foto-dany-percorso");
    const src = urlSicuro(config.fotoDany);
    if (percorso && src) percorso.textContent = src;
    if (!figura || !img || !src) return;

    img.addEventListener(
      "load",
      () => {
        if (!img.naturalWidth) return;
        img.hidden = false;
        figura.classList.add("foto-dany--caricata");
      },
      { once: true }
    );
    img.addEventListener(
      "error",
      () => {
        img.removeAttribute("src");
        img.hidden = true;
        console.info(
          `Percorso Alpha: la foto di Dany non è ancora presente (${src}). Finché non viene caricata resta il riquadro segnaposto.`
        );
      },
      { once: true }
    );
    img.setAttribute("src", src);
  };

  // Su computer il profilo resta fermo di lato mentre si scorre.
  // Se è più alto dello schermo, si ferma quando se ne vede il fondo, così il pulsante resta sempre raggiungibile.
  const profiloFisso = () => {
    const profilo = document.querySelector(".profilo");
    const topbar = document.querySelector(".topbar");
    if (!profilo || !window.matchMedia) return;
    const computer = window.matchMedia("(min-width: 1024px)");

    const aggiorna = () => {
      if (!computer.matches) {
        profilo.style.removeProperty("--profilo-top");
        return;
      }
      const sopra = (topbar ? topbar.offsetHeight : 0) + 24;
      const perVedereIlFondo = window.innerHeight - profilo.offsetHeight - 24;
      profilo.style.setProperty("--profilo-top", `${Math.round(Math.min(sopra, perVedereIlFondo))}px`);
    };

    aggiorna();
    window.addEventListener("resize", aggiorna, { passive: true });
    if (typeof computer.addEventListener === "function") computer.addEventListener("change", aggiorna);
    if ("ResizeObserver" in window) new ResizeObserver(aggiorna).observe(profilo);
  };

  const mostraErrore = (elenco, dettaglio) => {
    if (elenco) elenco.replaceChildren(el("p", { class: "avviso", role: "status", text: TESTI.erroreStorie }));
    console.error(
      `Percorso Alpha: le storie non sono state caricate. ${dettaglio} ` +
        "Controlla il file assets/js/testimonianze.js: di solito manca una virgola, una virgoletta o una parentesi nell'ultima parte modificata. " +
        "La lista deve iniziare con window.ALPHA_STORIE = [ e finire con ];"
    );
  };

  /* ------------------------------------------------------------------------
     Avvio
     ------------------------------------------------------------------------ */
  const avvia = () => {
    const anno = document.getElementById("anno");
    if (anno) anno.textContent = String(new Date().getFullYear());

    const config = leggiConfig();
    applicaConfig(config);
    caricaFotoDany(config);
    profiloFisso();

    const elenco = document.getElementById("storie-elenco");
    const grezze = window.ALPHA_STORIE;

    if (!Array.isArray(grezze)) {
      mostraErrore(elenco, "La variabile ALPHA_STORIE non esiste o non è una lista.");
      return;
    }

    const codiciUsati = new Set();
    const storie = [];
    const schede = [];

    grezze.forEach((grezza, indice) => {
      try {
        const storia = normalizzaStoria(grezza, indice, codiciUsati);
        if (!storia) return;
        const scheda = creaStoria(storia);
        storie.push(storia);
        schede.push(scheda);
      } catch (errore) {
        console.error(`Percorso Alpha: la storia numero ${indice + 1} contiene un errore ed è stata saltata.`, errore);
      }
    });

    if (!storie.length) {
      mostraErrore(elenco, "La lista delle storie è vuota.");
      return;
    }

    if (elenco) elenco.replaceChildren(...schede);

    const banner = document.getElementById("banner-esempi");
    if (banner && storie.some((s) => s.esempio)) banner.hidden = false;

    const applicaFiltro = preparaFiltri(storie, schede);
    gestisciLinkDiretto(applicaFiltro);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", avvia);
  } else {
    avvia();
  }
})();
