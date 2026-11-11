/* ============================================================
   Leuchtturm – Sozialtraining: Filme zu den fertigen Stunden
   Recherchiert und geprüft im November 2026. Mediathek-Links
   können ablaufen – vor der Stunde kurz prüfen. Die Planet-Schule-
   Filme waren laut Seite mindestens bis 2028 online.
   Eigene Filme trägst du im Editor einer Stunde ein; sie ersetzen
   dann die Liste hier für diese Stunde.
   ============================================================ */
(function () {
    const P = "https://www.planet-schule.de/schwerpunkt/knietzsche-der-kleinste-philosoph-der-welt/";
    const ps = (slug, titel, hinweis) => ({ titel, url: P + slug + "-film-100.html", quelle: "Planet Schule (SWR/WDR) · Knietzsche", dauer: "ca. 3–4 Min.", hinweis: hinweis || "" });
    const yt = (id, titel, quelle, hinweis) => ({ titel, url: "https://www.youtube.com/watch?v=" + id, quelle, hinweis: hinweis || "" });

    const F = {
        gefuehle:      ps("knietzsche-und-die-gefuehle", "Knietzsche und die Gefühle"),
        wut:           ps("knietzsche-und-die-wut", "Knietzsche und die Wut"),
        angst:         ps("knietzsche-und-die-angst", "Knietzsche und die Angst"),
        mut:           ps("knietzsche-und-der-mut", "Knietzsche und der Mut"),
        traurigkeit:   ps("knietzsche-und-traurigkeit", "Knietzsche und die Traurigkeit"),
        freundschaft:  ps("knietzsche-und-die-freundschaft", "Knietzsche und die Freundschaft"),
        mobbing:       ps("knietzsche-und-das-mobbing", "Knietzsche und das Mobbing"),
        entschuldigung:ps("knietzsche-und-die-entschuldigung", "Knietzsche und die Entschuldigung"),
        hoeflichkeit:  ps("knietzsche-und-die-hoeflichkeit", "Knietzsche und die Höflichkeit"),
        verantwortung: ps("knietzsche-und-die-verantwortung", "Knietzsche und die Verantwortung"),
        gerechtigkeit: ps("knietzsche-und-die-gerechtigkeit", "Knietzsche und die Gerechtigkeit"),
        solidaritaet:  ps("knietzsche-und-die-solidaritaet", "Knietzsche und die Solidarität"),
        mausStreit:    { titel: "Die Sendung mit der Maus: Streiten", url: "https://www.wdrmaus.de/filme/sachgeschichten/streiten.php5", quelle: "WDR · Die Seite mit der Maus", hinweis: "Nur den 1. Teil zeigen: Kinder erzählen, was beim Streit passiert und wie man sich wieder verträgt. Den 2. Teil (Erwachsene) weglassen." },
        stoppLied:     Object.assign(yt("9meP8fF0Ebg", "Stopp heißt Stopp – Mitmachlied zum Grenzen-Setzen", "YouTube · Kindermusikwelt (Dän Dickopf)", "Bärenfiguren zeigen die Bewegungen vor – die Kinder machen im Sitzen mit (Stopp-Hand). Ideal für Kl. 1/2 zum Stopp-Schild."), { fuer: "Kl. 1/2" }),
        selbstbewusst: ps("knietzsche-und-das-selbstbewusstsein", "Knietzsche und das Selbstbewusstsein"),
        dankbarkeit:   ps("knietzsche-und-die-dankbarkeit", "Knietzsche und die Dankbarkeit"),
        vertrauen:     ps("knietzsche-und-das-vertrauen", "Knietzsche und das Vertrauen"),
        spielen:       ps("knietzsche-und-das-spielen", "Knietzsche und das Spielen"),
        ich:           ps("knietzsche-und-das-ich", "Knietzsche und das Ich"),
        lernen:        ps("knietzsche-und-das-lernen", "Knietzsche und das Lernen"),
        peinlichkeit:  ps("knietzsche-und-die-peinlichkeit", "Knietzsche und die Peinlichkeit"),
        freiheit:      ps("knietzsche-und-die-freiheit", "Knietzsche und die Freiheit", "Passt zum Gedanken „Mit Regeln fühle ich mich freier“."),
        gewissen:      ps("knietzsche-und-das-gewissen", "Knietzsche und das Gewissen", "Die innere Stimme: Was ist richtig?"),
        geduld:        ps("knietzsche-und-die-geduld", "Knietzsche und die Geduld", "Warten können, ohne zu explodieren."),
        wahrheit:      ps("knietzsche-und-die-wahrheit", "Knietzsche und die Wahrheit", "Wahrheit ist meist gut – kann aber auch wehtun."),
        entscheidung:  ps("knietzsche-und-die-entscheidung", "Knietzsche und die Entscheidung"),
        privatsphaere: ps("knietzsche-und-die-privatsphaere", "Knietzsche und die Privatsphäre"),
        sprache:       ps("knietzsche-und-die-sprache", "Knietzsche und die Sprache", "Was Wörter mit uns machen."),
        glueck:        { titel: "Knietzsche – Hallo Glück!", url: P + "knietzsche-hallo-glueck-film-100.html", quelle: "Planet Schule (SWR/WDR) · Knietzsche", hinweis: "Darin auch „Das geteilte Glück“." },
        miteinander:   yt("vCh-hn4oOJ8", "Knietzsche und das Miteinander", "YouTube · offizieller Knietzsche-Kanal"),
        inklusion:     yt("DXUfs3IXIYw", "Knietzsche und die Inklusion", "YouTube · offizieller Knietzsche-Kanal"),
        stress:        { titel: "Knietzsche und die Tricks gegen Stress", url: "https://www.bmbfsfj.bund.de/bmbfsfj/mediathek/knietzsche-und-die-tricks-gegen-stress-279844", quelle: "Mediathek des Bundesfamilienministeriums", hinweis: "" },
        logoMobbing:   yt("oBNmY6E0-jo", "Was Mobbing ist – logo! erklärt", "YouTube · ZDFtivi / logo!", "Eher für Kl. 3/4."),
        respekt:       yt("Lah73VwTLvo", "Knietzsche und der Respekt", "YouTube · offizieller Knietzsche-Kanal (WDR)", "ca. 3 Min. Jeder Mensch ist gleich viel wert – wer niemanden respektiert, ist irgendwann allein."),
        elliRespekt:   { titel: "Elli Online: Immer cool bleiben! Respekt im Internet", url: "https://www.planet-schule.de/schwerpunkt/elli-online/immer-cool-bleiben-respekt-im-internet-film-100.html", quelle: "Planet Schule (SWR)", hinweis: "Kl. 3–7. Ein falscher Verdacht wird online verbreitet – Shitstorm, dann Entschuldigung." },
        elliCyber:     { titel: "Elli Online: Cybermobbing!", url: "https://www.planet-schule.de/schwerpunkt/elli-online/cybermobbing-film-100.html", quelle: "Planet Schule (SWR)", hinweis: "Kl. 3–7, online bis Dezember 2027. Beleidigungen im Netz – und wie man sie stoppt." },
        srfGefuehle:   { titel: "Meine Gefühle (6 kurze Folgen)", url: "https://www.srf.ch/sendungen/school/freude-wut-oder-angst-meine-gefuehle", quelle: "SRF school", hinweis: "Ab 5 Jahren. Schweizer Angebot – vorher testen, ob es in Deutschland abspielbar ist." }
    };

    // Jeder Film kommt nur in EINER Stunde vor – die Kinder merken Wiederholungen sofort.
    // Stunden ohne passenden eigenen Film haben keinen (spart Zeit).
    window.SOZIAL_MEDIEN = {
        "v-gefuehle-erkennen":  [F.gefuehle],
        "v-empathie":           [F.srfGefuehle],
        "v-streit-loesen":      [Object.assign({}, F.wut, { hinweis: "Passt zu „Es kocht in mir“: Was passiert bei Wut – und was hilft?" })],
        "v-wut-werkzeugkasten": [F.stress],
        "v-ruhig-werden":       [F.geduld],
        "v-freundschaft":       [F.freundschaft],
        "v-regeln-miteinander": [F.freiheit],
        "v-traurig-troesten":   [F.traurigkeit],
        "v-angst-okay":         [F.angst],
        "v-petzen-hilfe":       [F.gewissen],
        "v-entschuldigen":      [F.entschuldigung],
        "v-kompromisse":        [F.miteinander],
        "v-nein-sagen":         [F.stoppLied],
        "v-mitspielen-lassen":  [F.spielen],
        "v-teilen":             [F.glueck],
        "v-hoeflichkeit":       [F.hoeflichkeit],
        "v-verantwortung":      [F.verantwortung],
        "v-meine-staerken":     [F.ich],
        "v-mutig-sein":         [F.mut],
        "v-fehler-lernhelfer":  [F.lernen],
        "v-stolz-auf-mich":     [F.selbstbewusst],
        "v-um-hilfe-bitten":    [F.vertrauen],
        "v-gemeinsam":          [F.solidaritaet],
        "v-dankbarkeit":        [F.dankbarkeit],
        "v-alle-verschieden":   [F.inklusion],
        "v-auslachen":          [Object.assign({}, F.peinlichkeit, { hinweis: "Wie fühlt es sich an, wenn man ausgelacht wird?" })],
        "v-gerecht":            [F.gerechtigkeit],
        // Klartext (Kl. 3/4)
        "k-respekt":            [F.respekt],
        "k-handyvideo":         [F.elliCyber],
        "k-laestern":           [F.elliRespekt],
        "k-ausgrenzung":        [F.mobbing],
        "k-verpetzen":          [F.logoMobbing],
        "k-luegen":             [F.wahrheit],
        "k-gruppendruck":       [F.entscheidung],
        "k-koerpergrenzen":     [F.privatsphaere],
        "k-schimpfwoerter":     [F.sprache]
    };
    // Sicherheitsnetz: falls doch ein Film doppelt eingetragen ist, behält ihn nur die erste Stunde
    (function () {
        const gesehen = new Set();
        Object.keys(window.SOZIAL_MEDIEN).forEach(id => {
            window.SOZIAL_MEDIEN[id] = window.SOZIAL_MEDIEN[id].filter(m => { if (!m || gesehen.has(m.url)) return false; gesehen.add(m.url); return true; });
        });
    })();
})();
