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
    const ps = (slug, titel, hinweis) => ({ titel, url: P + slug + "-film-100.html", quelle: "Planet Schule (SWR/WDR) · Knietzsche", hinweis: hinweis || "" });
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

    window.SOZIAL_MEDIEN = {
        "v-gefuehle-erkennen":  [F.gefuehle, F.srfGefuehle],
        "v-streit-loesen":      [F.stoppLied, F.miteinander],
        "v-freundschaft":       [F.freundschaft],
        "v-regeln-miteinander": [F.freiheit],
        "v-wut-werkzeugkasten": [F.wut],
        "v-traurig-troesten":   [F.traurigkeit],
        "v-angst-okay":         [F.angst],
        "v-empathie":           [F.gefuehle],
        "v-petzen-hilfe":       [F.gewissen],
        "v-entschuldigen":      [F.entschuldigung],
        "v-kompromisse":        [F.miteinander],
        "v-nein-sagen":         [F.stoppLied, F.selbstbewusst],
        "v-mitspielen-lassen":  [F.spielen],
        "v-teilen":             [F.glueck],
        "v-neue-freunde":       [F.freundschaft],
        "v-hoeflichkeit":       [F.hoeflichkeit],
        "v-verantwortung":      [F.verantwortung],
        "v-pause-fair":         [F.spielen],
        "v-meine-staerken":     [F.ich],
        "v-mutig-sein":         [F.mut],
        "v-fehler-lernhelfer":  [F.lernen, F.peinlichkeit],
        "v-stolz-auf-mich":     [F.selbstbewusst],
        "v-um-hilfe-bitten":    [F.vertrauen],
        "v-gemeinsam":          [F.solidaritaet],
        "v-jeder-ist-wichtig":  [F.miteinander],
        "v-ruhig-werden":       [F.stress],
        "v-dankbarkeit":        [F.dankbarkeit],
        "v-alle-verschieden":   [F.inklusion],
        "v-auslachen":          [F.mobbing, F.logoMobbing],
        "v-hilfsbereitschaft":  [F.solidaritaet],
        "v-gerecht":            [F.gerechtigkeit, F.inklusion],
        // Klartext (Kl. 3/4)
        "k-respekt":            [F.respekt, F.elliRespekt],
        "k-sprueche":           [F.respekt, F.mobbing],
        "k-eskalation":         [F.wut, F.miteinander],
        "k-wut-frueh":          [F.wut, F.stress],
        "k-gruppendruck":       [F.gewissen, F.selbstbewusst],
        "k-handyvideo":         [F.elliCyber, F.elliRespekt],
        "k-provokation":        [F.respekt, F.selbstbewusst],
        "k-mist-gebaut":        [F.verantwortung, F.entschuldigung],
        "k-stark":              [F.mut, F.selbstbewusst],
        "k-koerpergrenzen":     [F.selbstbewusst],
        "k-laestern":           [F.elliRespekt, F.mobbing],
        "k-gaming":             [F.wut],
        "k-luegen":             [F.vertrauen],
        "k-erwachsene":         [F.gerechtigkeit],
        "k-ausgrenzung":        [F.mobbing, F.inklusion],
        "k-wut-eisberg":        [F.wut, F.gefuehle],
        "k-rache":              [F.entschuldigung, F.gerechtigkeit],
        "k-freunde-echt":       [F.freundschaft],
        "k-konsequenzen":       [F.freiheit, F.gerechtigkeit],
        "k-gefuehle-zeigen":    [F.gefuehle, F.traurigkeit],
        "k-neid":               [F.glueck],
        "k-verpetzen":          [F.gewissen, F.logoMobbing],
        "k-schlichten":         [F.miteinander],
        "k-ruf":                [F.ich],
        "k-mutter":             [F.respekt],
        "k-schimpfwoerter":     [F.respekt, F.elliCyber],
        "k-sprachregel":        [F.respekt, F.freiheit]
    };
})();
