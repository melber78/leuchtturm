/* ============================================================
   Leuchtturm – Vertretungsstunden: Grundlage + Vorlagen Teil 1
   (Deutsch entspannt, Mathe entspannt)
   Gleiches Format wie sozial-einheiten.js. Jede Stunde: 40 Minuten,
   Klasse 1/2 und 3/4. Weitere Dateien: vertretung-einheiten-2.js …
   ============================================================ */

window.SOZIAL_KATEGORIEN = [
    "Deutsch entspannt", "Mathe entspannt", "Sachunterricht entspannt",
    "Kreativ & Gestalten", "Spiele & Bewegung", "Konzentration & Ruhe", "Sonstiges"
];

window.SOZIAL_RITUALE_STANDARD = "";

window.SOZIAL_VERLAUF_STANDARD = [
    { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, kurz erzählen, was heute passiert", k34: "Begrüßung, kurz erzählen, was heute passiert" },
    { zeit: "5–12",  phase: "Einstieg",     k12: "", k34: "" },
    { zeit: "12–25", phase: "Spiel / Übung", k12: "", k34: "" },
    { zeit: "25–35", phase: "Arbeitsblatt", k12: "AB 1/2", k34: "AB 3/4" },
    { zeit: "35–40", phase: "Abschluss",    k12: "Ergebnisse zeigen, Applauswelle", k34: "Ergebnisse zeigen, Applauswelle" }
];

window.SOZIAL_EINHEIT = function (o) {
    o.dauer = o.dauer || 40;
    if (!o.verlauf) {
        const namen = stufe => (o.uebungen || []).filter(u => u.fuer === "alle" || u.fuer === stufe).map(u => u.titel).join(", ");
        o.verlauf = [
            { zeit: "0–5",   phase: "Ankommen",      k12: "Begrüßung, kurz erzählen, was heute passiert", k34: "Begrüßung, kurz erzählen, was heute passiert" },
            { zeit: "5–12",  phase: "Einstieg",      k12: "„" + o.lerntext12.titel + "“ vorlesen", k34: "„" + o.lerntext34.titel + "“ vorlesen, Fragen besprechen" },
            { zeit: "12–25", phase: "Spiel / Übung", k12: namen("12"), k34: namen("34") },
            { zeit: "25–35", phase: "Arbeitsblatt",  k12: "AB 1/2: " + o.ab12.titel, k34: "AB 3/4: " + o.ab34.titel },
            { zeit: "35–40", phase: "Abschluss",     k12: "Ergebnisse zeigen, Applauswelle", k34: "Ergebnisse zeigen, Applauswelle" }
        ];
    }
    return o;
};

window.SOZIAL_VORLAGEN = [

/* ============================== DEUTSCH ENTSPANNT ============================== */
SOZIAL_EINHEIT({
    id: "w-geschichtenwuerfel",
    titel: "Der Geschichten-Würfel",
    kategorie: "Deutsch entspannt",
    ziel12: "Zu drei Bildern mündlich eine kleine Geschichte erzählen",
    ziel34: "Aus drei Bildern eine Geschichte mit Anfang, Mitte und Schluss schreiben",
    material: "Bildkarten für den Geschichten-Würfel (unter Arbeitsmaterial ausdrucken)",
    materialIds: ["geschichten-bildkarten"],
    lerntext12: { titel: "Das Einhorn und der Schlüssel", text:
`Ein kleines Einhorn findet im Gras einen goldenen Schlüssel. „Wozu passt der wohl?“, fragt es sich.

Es probiert ihn an der Gartentür. Nichts. Es probiert ihn am Briefkasten. Nichts.

Da sieht es eine kleine Kiste unter dem Baum. Der Schlüssel passt! Klick – die Kiste geht auf. Darin liegt … ein riesiger Schokoladenkuchen!

Das Einhorn lädt alle seine Freunde ein. Und alle essen zusammen Kuchen.

**Nach dem Vorlesen:** Welche drei Dinge kamen in der Geschichte vor? (Einhorn, Schlüssel, Kuchen) Heute erfindest du selbst so eine Geschichte!` },
    lerntext34: { titel: "Die Rakete im Garten", text:
`Als Lina am Samstagmorgen aus dem Fenster schaut, traut sie ihren Augen nicht: Mitten im Garten steht eine silberne Rakete. Die Tür geht auf, und heraus watschelt – ein Pinguin mit einer goldenen Krone auf dem Kopf.

„Entschuldigung“, sagt der Pinguin, „ich bin König Pingo vom Eisplaneten. Mein Navi ist kaputt. Weißt du, wo der Nordpol ist?“

Lina holt ihren Globus. Zusammen suchen sie den Weg. Zum Dank darf Lina eine Runde mitfliegen – einmal um den Mond und zurück, bevor das Mittagessen fertig ist.

**Fragen zum Gespräch:**
1. Welche drei Dinge haben die Geschichte „gemacht“? (Rakete, Pinguin, Krone)
2. Was passiert am Anfang, in der Mitte, am Schluss?
3. Was macht eine Geschichte spannend?` },
    uebungen: [
        { titel: "Geschichten-Kette", fuer: "alle", dauer: "8 Min",
          text: "Du ziehst drei Bildkarten und hängst sie an die Tafel. Die Kinder erzählen gemeinsam eine Geschichte: Jedes Kind sagt vom Platz aus einen Satz, der Reihe nach. Alle drei Bilder müssen vorkommen. Kl. 1/2 dürfen kurze Sätze sagen, Kl. 3/4 achten auf einen guten Schluss." },
        { titel: "Meine drei Bilder", fuer: "alle", dauer: "4 Min",
          text: "Jedes Kind (oder jedes Tischpaar) zieht verdeckt drei neue Bildkarten. Damit geht es aufs Arbeitsblatt. Kl. 1/2 erzählen ihre Geschichte erst dem Nachbarn, dann malen sie." }
    ],
    ab12: { titel: "Meine Bilder-Geschichte", aufgaben: [
        { typ: "malen", text: "Am Anfang …", bild: "" },
        { typ: "malen", text: "Dann …", bild: "" },
        { typ: "malen", text: "Am Ende …", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Meine Geschichte heißt: ___"] }
    ]},
    ab34: { titel: "Meine Würfel-Geschichte", kontext: "Ziehe drei Bildkarten. Aus diesen drei Bildern wird deine Geschichte.", aufgaben: [
        { typ: "luecken", text: "Meine drei Bilder:", nummern: false, saetze: ["1. ___   2. ___   3. ___"] },
        { typ: "luecken", text: "Überschrift:", nummern: false, saetze: ["___"] },
        { typ: "schreiben", text: "Schreibe deine Geschichte. Denk an Anfang, Mitte und Schluss.", zeilen: 10 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-reimkoenig",
    titel: "Der Reim-König",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Reime hören und Reimpaare finden",
    ziel34: "Reime finden und einen eigenen Zweizeiler dichten",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "König Reim", text:
`Es war einmal ein König, der sprach nur ein wenig.
Doch was er sprach, das reimte sich – das fand er selbst ganz königlich.

Er rief: „Bringt mir die **Maus** in mein schönes **Haus**!“
Er rief: „Holt mir den **Hut**, der steht mir gut!“

Eines Tages kam ein Kind ins Schloss. Der König fragte: „Kannst du reimen?“
Das Kind lachte: „Na klar! Ich reime **Katze** auf **Tatze** und **Hose** auf **Rose**!“

Da war der König so froh, dass er das Kind zur Reim-Prinzessin machte.

**Nach dem Vorlesen:** Welche Wörter haben sich gereimt? Wer findet einen Reim auf „Baum“?` },
    lerntext34: { titel: "Die Reim-Maschine", text:
`Erfinderin Ella hat eine Maschine gebaut. Oben wirft man ein Wort hinein – unten kommen Reime heraus. Sie wirft „Stern“ hinein: Es rattert und pfeift, und heraus purzeln „gern“, „fern“ und „Kern“.

Dann wirft ihr kleiner Bruder „Orange“ hinein. Die Maschine rattert, raucht – und gibt auf. „Auf Orange reimt sich fast nichts!“, lacht Ella. „Das ist das schwierigste Reimwort der Welt.“

Am Abend schreibt Ella mit der Maschine ein Gedicht für ihre Oma:
„Liebe Oma, du bist toll, mein Herz ist immer liebevoll.“

**Fragen zum Gespräch:**
1. Woran erkennst du, dass sich zwei Wörter reimen?
2. Findest du Reime auf „Haus“, „Bein“ und „Hund“?
3. Gibt es einen Reim auf „Orange“? (Probiert es!)` },
    uebungen: [
        { titel: "Reim-Kette", fuer: "alle", dauer: "6 Min",
          text: "Du sagst ein Wort (Haus, Bein, Ball, Hund, Stern). Die Kinder melden sich und sagen vom Platz aus einen Reim. Wer keinen weiß, darf „Weiter!“ sagen. Auch Quatsch-Wörter zählen, wenn sie sich reimen (Haus – Maus – Klaus – Schmaus – Flaus)." },
        { titel: "Reimt sich das?", fuer: "12", dauer: "4 Min",
          text: "Du sagst zwei Wörter. Reimen sie sich, zeigen die Kinder Daumen hoch, sonst runter:\n\n- Maus – Haus\n- Ball – Fisch\n- Hose – Rose\n- Sonne – Mond\n- Kerze – Herz" },
        { titel: "Reim-Gedicht der Klasse", fuer: "34", dauer: "5 Min",
          text: "Gemeinsam dichtet ihr an der Tafel vier Zeilen über die Klasse oder das Wetter. Jede zweite Zeile muss sich reimen. Am Ende tragen alle das Gedicht vor." }
    ],
    ab12: { titel: "Was reimt sich?", aufgaben: [
        { typ: "zuordnen", text: "Was reimt sich? Verbinde.", links: ["Maus", "Igel", "Rose", "Krone"], rechts: ["Zitrone", "Haus", "Hose", "Spiegel"] },
        { typ: "malen", text: "Male zwei Dinge, die sich reimen.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Meine Reim-Wörter: ___ und ___"] }
    ]},
    ab34: { titel: "Reim-Werkstatt", aufgaben: [
        { typ: "tabelle", text: "Finde zu jedem Wort zwei Reime.", spalten: ["Wort", "Reim 1", "Reim 2"],
          zeilen: [["Haus", "", ""], ["Bein", "", ""], ["Hund", "", ""], ["Kanne", "", ""], ["Stern", "", ""]] },
        { typ: "luecken", text: "Ergänze die Reime.", nummern: true,
          saetze: ["Im Garten steht ein großer Baum, // ich liege drunter wie im ___.", "Die Katze läuft im Zimmer rum // und stößt die Vase: Bumm – wie ___!", "Der Hund, der bellt ganz laut: „Wau, wau!“ // Da kommt die nette alte ___."] },
        { typ: "luecken", text: "Dichte einen eigenen Zweizeiler:", nummern: false, saetze: ["___", "___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-woerter-detektive",
    titel: "Wörter-Detektive",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Anlaute hören und Wörter mit M entdecken",
    ziel34: "In langen Wörtern versteckte Wörter finden und neue Wörter zusammensetzen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Detektiv Fips und das verlorene M", text:
`Detektiv Fips hat ein Problem. Das **M** ist verschwunden! Überall fehlt es.

Die **M**aus heißt jetzt nur noch „aus“. Der **M**ond heißt nur noch „ond“. Und die **M**ilch heißt „ilch“. Das klingt komisch!

Fips sucht überall. Unter dem Bett. Im Schrank. Im Garten. Da – im Briefkasten liegt das M! Es hatte sich versteckt, weil alle immer nur das A gelobt haben.

„Du bist auch wichtig!“, sagt Fips. Das M freut sich und springt zurück an seinen Platz: **M**aus, **M**ond, **M**ilch.

**Nach dem Vorlesen:** Welche Wörter fangen mit M an? Wer hat ein M im Namen?` },
    lerntext34: { titel: "Das Wort-Versteck", text:
`Detektivin Mira hat eine Spezialbrille. Wenn sie ein langes Wort ansieht, leuchten darin versteckte Wörter auf.

Sie schaut auf das Wort SCHNEEMANN – und sieht darin „Schnee“, „Mann“ und sogar „See“! Sie schaut auf REGENBOGEN – und findet „Regen“, „Bogen“ und „Gen“.

Ihr Assistent Tom staunt. „Und was ist mit FUSSBALLSPIEL?“ Mira grinst: „Fuß, Ball, Spiel – und wer genau hinschaut, findet sogar ‚all‘.“

Am Ende des Tages haben die beiden 50 versteckte Wörter gefunden. Rekord!

**Fragen zum Gespräch:**
1. Welche Wörter hat Mira in SCHNEEMANN gefunden?
2. Aus welchen Wörtern besteht HAUSTÜR?
3. Erfindet zusammen ein Quatsch-Wort aus drei Wörtern!` },
    uebungen: [
        { titel: "Ich sehe was mit …", fuer: "alle", dauer: "6 Min",
          text: "„Ich sehe was, was du nicht siehst, und das fängt mit T an.“ Die Kinder raten vom Platz aus (Tafel, Tisch, Tür …). Wer richtig rät, darf das nächste Rätsel stellen. Kl. 1/2: Du sprichst den Anlaut deutlich („Tttt“)." },
        { titel: "Anlaut-Klatschen", fuer: "12", dauer: "4 Min",
          text: "Du sagst Wörter. Fängt eins mit M an, klatschen alle: Maus, Hund, Mond, Milch, Auto, Mama, Ball, Melone, Mütze, Fisch." },
        { titel: "Wörter im Wort", fuer: "34", dauer: "6 Min",
          text: "An der Tafel steht ein langes Wort: SONNENBLUMENFELD. Die Kinder suchen in Tischpaaren alle Wörter, die darin stecken (Buchstaben nebeneinander): Sonne, Blume, Feld, Blumen … Welches Paar findet die meisten?" }
    ],
    ab12: { titel: "Was fängt mit M an?", aufgaben: [
        { typ: "ankreuzen", text: "Kreuze alles an, was mit M anfängt.", nebeneinander: true,
          optionen: ["Maus", "Hund", "Mond", "Milch", "Auto", "Melone"] },
        { typ: "luecken", text: "Schreibe zwei M-Wörter ab.", nummern: false, saetze: ["___", "___"] },
        { typ: "malen", text: "Male noch etwas, das mit M anfängt.", bild: "" }
    ]},
    ab34: { titel: "Versteckte Wörter", aufgaben: [
        { typ: "luecken", text: "Welche Wörter sind versteckt?", nummern: false,
          saetze: ["SCHNEEMANN: ___, ___, ___", "REGENBOGEN: ___, ___, ___", "FUSSBALLSPIEL: ___, ___, ___"] },
        { typ: "tabelle", text: "Setze zusammen: Was ergibt das?", spalten: ["Wort 1", "Wort 2", "Neues Wort"],
          zeilen: [["Haus", "Tür", ""], ["Schnee", "Ball", ""], ["Apfel", "Baum", ""], ["Sonne", "Brille", ""]] },
        { typ: "luecken", text: "Erfinde ein eigenes langes Wort (auch Quatsch ist erlaubt):", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-abc-tierparade",
    titel: "ABC-Tierparade",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Zu Buchstaben Tiere finden – erzählend und malend",
    ziel34: "„Stadt-Land-Fluss“ in einer Kinderversion spielen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die große Tierparade", text:
`Heute ist Tierparade im Zoo! Alle Tiere laufen hintereinander – im ABC.

Vorne läuft der **A**ffe. Dann kommt der **B**är. Danach der **D**ino – ein ganz kleiner. Dann der **E**lefant, der laut tutet. Dann der **F**rosch, der hüpft.

Nur die **Z**iege ist traurig. „Ich bin immer die Letzte!“ Da ruft der Affe: „Heute drehen wir es um!“

Und so läuft die Ziege ganz vorne. Die Kinder klatschen und jubeln.

**Nach dem Vorlesen:** Welches Tier fängt so an wie dein Name?` },
    lerntext34: { titel: "Das ABC-Rennen", text:
`„Stadt-Land-Fluss ist langweilig“, mault Jonas. „Ich kenne keine Flüsse.“ Seine große Schwester Merve hat eine Idee: „Dann machen wir unsere eigenen Spalten!“

Sie zeichnet eine Tabelle: Tier – Essen – Name – Spielzeug. Jonas sagt leise das ABC auf, Merve ruft „Stopp!“. Jonas war beim K.

„Katze!“ – „Käse!“ – „Kevin!“ – „Kreisel!“, schreibt Jonas. Merve hat „Koala, Kuchen, Klara, Kran“. Für jedes Wort, das nur einer hat, gibt es 10 Punkte, für gleiche Wörter 5.

Am Ende gewinnt Jonas mit 35 Punkten. „Das spielen wir jetzt jeden Tag!“

**Fragen zum Gespräch:**
1. Wie funktioniert das Spiel? Erklärt es euch gegenseitig.
2. Welche Spalten würdet ihr noch erfinden?
3. Welche Buchstaben sind besonders schwer?` },
    uebungen: [
        { titel: "ABC-Tier-Kette", fuer: "alle", dauer: "6 Min",
          text: "Der Reihe nach nennt jedes Kind vom Platz aus ein Tier zum nächsten Buchstaben: Affe – Bär – C? (Chamäleon) – Dino … Wer nicht weiterweiß, darf die Klasse um Hilfe bitten. Kl. 1/2 dürfen statt Tiernamen auch Dinge nennen." },
        { titel: "Tier-Pantomime nach Buchstaben", fuer: "12", dauer: "6 Min",
          text: "Du nennst einen Buchstaben (E, F, H, K, S). Ein Kind kommt nach vorn und spielt ein Tier mit diesem Anfangsbuchstaben vor. Die anderen raten." },
        { titel: "Stadt-Land-Fluss für Kinder", fuer: "34", dauer: "8 Min",
          text: "Die Kinder spielen auf dem Arbeitsblatt. Ein Kind sagt leise das ABC auf, ein anderes ruft „Stopp!“. Wer zuerst alle Spalten hat, ruft „Fertig!“ – dann zählt ihr: 10 Punkte für Wörter, die nur einer hat, 5 Punkte für gleiche Wörter." }
    ],
    ab12: { titel: "Mein ABC-Tier", aufgaben: [
        { typ: "ankreuzen", text: "Welches Tier fängt mit E an? Kreuze an.", nebeneinander: true, optionen: ["Elefant", "Affe", "Ente", "Igel"] },
        { typ: "malen", text: "Male ein Tier, das so anfängt wie dein Name.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Tier heißt: ___"] }
    ]},
    ab34: { titel: "Stadt-Land-Fluss für Kinder", aufgaben: [
        { typ: "tabelle", text: "Spielt mehrere Runden. 10 Punkte = nur du hast das Wort, 5 Punkte = jemand hat dasselbe.", spalten: ["Buchstabe", "Tier", "Essen", "Name", "Spielzeug", "Punkte"],
          zeilen: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]] },
        { typ: "luecken", text: "Mein bestes Wort heute:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-geheimschrift",
    titel: "Geheimschrift",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Eine Botschaft aus Bildzeichen lesen und selbst malen",
    ziel34: "Mit einem Zahlen-Code Botschaften entschlüsseln und verschlüsseln",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die Botschaft im Baum", text:
`Mia und Ben finden im Baumloch einen Zettel. Darauf stehen keine Buchstaben – nur Bilder!

Eine **Sonne**. Ein **Baum**. Ein **Kuchen**.

Ben kratzt sich am Kopf. Mia überlegt laut: „Sonne – vielleicht heißt das: morgen, wenn die Sonne scheint. Baum – wir treffen uns am Baum. Und Kuchen …“ – „… es gibt Kuchen!“, ruft Ben.

Am nächsten Tag scheint die Sonne. Am Baum wartet Oma Erna mit einem großen Blech Kuchen. „Ihr habt meine Geheimschrift geknackt!“

**Nach dem Vorlesen:** Was bedeuteten die drei Bilder? Welche Bilder würdest du für eine Geheimbotschaft malen?` },
    lerntext34: { titel: "Agenten-Code A1", text:
`Geheimagentin Zora bekommt eine Nachricht: 8 – 1 – 12 – 12 – 15. Nur Zahlen! Doch Zora kennt den Agenten-Code: Jeder Buchstabe hat eine Zahl. A ist 1, B ist 2, C ist 3 – bis Z, das ist 26.

Sie rechnet: 8 ist H, 1 ist A, 12 ist L, noch einmal L, 15 ist O. „HALLO!“, liest sie. Die Nachricht ist von ihrem Partner Rico.

Zora schreibt zurück: 4 – 1 – 14 – 11 – 5. Rico braucht eine Weile – dann lacht er. Was hat Zora geantwortet?

**Fragen zum Gespräch:**
1. Wie funktioniert der Agenten-Code?
2. Was hat Zora geantwortet? (4 – 1 – 14 – 11 – 5 = DANKE)
3. Wie könnte man den Code noch schwerer machen?` },
    uebungen: [
        { titel: "Bilder-Botschaft", fuer: "12", dauer: "6 Min",
          text: "Du malst drei einfache Bilder an die Tafel (z. B. Ball – Sonne – Haus: „Wir spielen draußen Ball und gehen dann nach Hause“). Die Kinder raten die Botschaft. Danach malt ein Kind eine Botschaft, die anderen raten." },
        { titel: "Code knacken", fuer: "34", dauer: "8 Min",
          text: "An der Tafel steht eine Zahlen-Botschaft im Agenten-Code, z. B. 16 – 1 – 21 – 19 – 5 (PAUSE). Die Kinder entschlüsseln in Tischpaaren. Wer fertig ist, verschlüsselt eine eigene Nachricht für den Nachbarn." },
        { titel: "Klatsch-Code", fuer: "alle", dauer: "4 Min",
          text: "Abgemacht: einmal klatschen = Ja, zweimal = Nein, auf den Tisch trommeln = Weiß ich nicht. Du stellst Fragen („Ist heute Montag?“, „Können Fische fliegen?“), die Klasse antwortet nur im Klatsch-Code." }
    ],
    ab12: { titel: "Meine Bilder-Botschaft", aufgaben: [
        { typ: "malen", text: "Male eine geheime Botschaft mit drei Bildern. Dein Nachbar rät, was sie bedeutet.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Meine Botschaft heißt: ___"] }
    ]},
    ab34: { titel: "Agenten-Code", aufgaben: [
        { typ: "luecken", text: "Der Agenten-Code:", nummern: false,
          saetze: ["A=1 · B=2 · C=3 · D=4 · E=5 · F=6 · G=7 · H=8 · I=9", "J=10 · K=11 · L=12 · M=13 · N=14 · O=15 · P=16 · Q=17 · R=18", "S=19 · T=20 · U=21 · V=22 · W=23 · X=24 · Y=25 · Z=26"] },
        { typ: "luecken", text: "Entschlüssele die Botschaften!", nummern: true,
          saetze: ["8 – 1 – 12 – 12 – 15 = ___", "19 – 15 – 14 – 14 – 5 = ___", "6 – 18 – 5 – 21 – 14 – 4 = ___"] },
        { typ: "luecken", text: "Verschlüssele deinen Vornamen:", nummern: false, saetze: ["___"] },
        { typ: "luecken", text: "Schreibe eine geheime Nachricht für deinen Nachbarn:", nummern: false, saetze: ["___"] }
    ]}
}),

/* ============================== MATHE ENTSPANNT ============================== */
SOZIAL_EINHEIT({
    id: "w-zahlen-schatz",
    titel: "Zahlen-Schatzsuche",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Spielerisch zählen und Mengen erfassen",
    ziel34: "Zahlenrätsel lösen und eigene erfinden",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Pirat Paul zählt seinen Schatz", text:
`Pirat Paul hat eine Schatzkiste gefunden. Er macht sie auf und staunt.

Er zählt: 1, 2, 3, 4, 5 Goldmünzen. Dann 1, 2, 3 glitzernde Edelsteine. Und ganz unten liegt 1 Krone.

„Wie viele Schätze sind das zusammen?“, fragt sein Papagei. Paul zählt alles noch einmal. „Neun!“, ruft er.

Da hüpft der Papagei in die Kiste und kommt mit noch einer Münze heraus. „Zehn!“, lacht Paul. „Du bist der beste Schatzsucher!“

**Nach dem Vorlesen:** Wie viele Goldmünzen waren es am Anfang? Und am Ende? Zählt gemeinsam an den Fingern nach.` },
    lerntext34: { titel: "Die Schatzkarte mit Zahlen", text:
`Auf dem Dachboden findet Max eine alte Schatzkarte. Darauf steht: „Die Kiste öffnet nur, wer meine Zahl errät.“

Darunter stehen drei Hinweise:
- Ich bin größer als 20, aber kleiner als 30.
- Meine beiden Ziffern zusammen ergeben 5.
- Ich bin ungerade.

Max überlegt. 21? 2 + 1 = 3, passt nicht. 22? Ist gerade. 23? 2 + 3 = 5 – und ungerade! Er dreht das Zahlenschloss auf 23 – klick! In der Kiste liegen alte Murmeln und ein Brief vom Opa: „Gut gerechnet, Max!“

**Fragen zum Gespräch:**
1. Wie hat Max die Zahl gefunden?
2. Warum war 22 falsch?
3. Wer erfindet ein eigenes Zahlen-Rätsel für die Klasse?` },
    uebungen: [
        { titel: "Zahlen-Klatschen", fuer: "alle", dauer: "5 Min",
          text: "Ihr zählt der Reihe nach von Platz zu Platz. Kl. 1/2: Bei 5 und 10 klatscht das Kind, statt die Zahl zu sagen. Kl. 3/4: Bei jeder Zahl der 3er-Reihe wird geklatscht (3, 6, 9 …). Wer sich vertut, fängt wieder bei 1 an." },
        { titel: "Ich denke mir eine Zahl", fuer: "alle", dauer: "7 Min",
          text: "Du denkst dir eine Zahl (Kl. 1/2 bis 20, Kl. 3/4 bis 100). Die Kinder raten, du sagst nur „größer“ oder „kleiner“. Wie viele Versuche braucht die Klasse? Danach darf ein Kind sich eine Zahl ausdenken." }
    ],
    ab12: { titel: "Der Schatz von Pirat Paul", aufgaben: [
        { typ: "tabelle", text: "Zähle und schreibe die Zahl.", spalten: ["Schatz", "Wie viele?"],
          zeilen: [["💰 💰 💰 💰", ""], ["💎 💎 💎 💎 💎 💎", ""], ["⭐ ⭐ ⭐", ""], ["🪙 🪙 🪙 🪙 🪙 🪙 🪙 🪙", ""]] },
        { typ: "malen", text: "Male deine Schatzkiste mit genau 7 Goldmünzen.", bild: "" }
    ]},
    ab34: { titel: "Zahlen-Rätsel", aufgaben: [
        { typ: "luecken", text: "Wer bin ich?", nummern: true,
          saetze: ["Ich bin größer als 20 und kleiner als 30. Meine Ziffern zusammen ergeben 5. // Ich bin ___.", "Ich bin das Doppelte von 15. // Ich bin ___.", "Wenn du mich halbierst, erhältst du 12. // Ich bin ___.", "Ich bin die größte zweistellige Zahl. // Ich bin ___."] },
        { typ: "luecken", text: "Erfinde ein eigenes Zahlen-Rätsel:", nummern: false, saetze: ["___", "___", "Lösung: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-muster",
    titel: "Muster und Reihen",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Einfache Muster erkennen und fortsetzen",
    ziel34: "Zahlen- und Formenmuster erkennen, fortsetzen und erfinden",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Omas Perlenkette", text:
`Oma Hilde fädelt eine Perlenkette: rot, blau, rot, blau, rot, blau.

Da springt Kater Moritz auf den Tisch. Er schnappt sich eine Perle und läuft davon!

„Oh nein“, ruft Oma. „Jetzt fehlt eine. Rot, blau, rot, blau, rot … und dann?“ Lena weiß es sofort: „Blau! Es ist immer abwechselnd.“

Lena holt eine blaue Perle aus der Dose. Die Kette ist wieder fertig. Und Moritz? Der spielt unter dem Sofa mit der geklauten Perle.

**Nach dem Vorlesen:** Welche Farbe fehlte? Wie hat Lena das gewusst?` },
    lerntext34: { titel: "Das Geheimnis der Zahlenreihe", text:
`An der Tafel steht: 2 – 4 – 6 – 8 – ? Die halbe Klasse ruft: „10!“ Zu leicht.

Dann schreibt Frau Klein: 1 – 2 – 4 – 8 – ? Jetzt wird es still. Leo flüstert: „Immer plus 1? Nein … 1, 2, 4 … es verdoppelt sich!“ Die Antwort ist 16.

Zum Schluss kommt die schwerste Reihe: 1 – 4 – 9 – 16 – ? Niemand weiß es. Dann ruft Aylin: „Das sind 1 mal 1, 2 mal 2, 3 mal 3, 4 mal 4! Also 25!“

**Fragen zum Gespräch:**
1. Wie geht es nach 2 – 4 – 6 – 8 weiter? Und nach 1 – 2 – 4 – 8?
2. Wie hat Aylin das letzte Muster entdeckt?
3. Wo findet man Muster im Alltag? (Fliesen, Kleidung, Musik …)` },
    uebungen: [
        { titel: "Klatsch-Muster", fuer: "alle", dauer: "5 Min",
          text: "Du machst ein Muster vor: klatschen – stampfen – klatschen – stampfen … Die Klasse macht es nach und setzt es fort. Dann schwerer: klatschen – klatschen – schnipsen. Ein Kind darf ein eigenes Muster erfinden." },
        { titel: "Menschen-Muster", fuer: "alle", dauer: "5 Min",
          text: "Die Kinder bilden der Reihe nach ein Muster am Platz: stehen – sitzen – stehen – sitzen … oder Arme hoch – Arme zur Seite. Bei jedem Kind fragst du: „Was kommt jetzt?“" }
    ],
    ab12: { titel: "Wie geht es weiter?", aufgaben: [
        { typ: "ankreuzen", text: "🔴 🔵 🔴 🔵 🔴 … Was kommt dann?", nebeneinander: true, optionen: ["🔵", "🔴", "🟢"] },
        { typ: "ankreuzen", text: "⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ⭐ … Was kommt dann?", nebeneinander: true, optionen: ["🌙", "⭐", "☀️"] },
        { typ: "ankreuzen", text: "🐶 🐱 🐭 🐶 🐱 … Was kommt dann?", nebeneinander: true, optionen: ["🐶", "🐱", "🐭"] },
        { typ: "malen", text: "Male eine eigene Perlenkette mit Muster.", bild: "" }
    ]},
    ab34: { titel: "Muster-Profis", aufgaben: [
        { typ: "luecken", text: "Setze die Reihe fort.", nummern: true,
          saetze: ["2 – 4 – 6 – 8 – ___ – ___", "5 – 10 – 15 – 20 – ___ – ___", "1 – 2 – 4 – 8 – ___ – ___", "30 – 27 – 24 – 21 – ___ – ___", "1 – 4 – 9 – 16 – ___ – ___"] },
        { typ: "luecken", text: "Formen-Muster:", nummern: false, saetze: ["▲ ■ ● ▲ ■ ● ___ ___ ___"] },
        { typ: "luecken", text: "Erfinde eine eigene Zahlenreihe – dein Nachbar setzt sie fort:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-formen-bilder",
    titel: "Bilder aus Formen",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Kreis, Dreieck und Quadrat erkennen und damit malen",
    ziel34: "Formen zählen, benennen und ein Formen-Bild planen",
    material: "Nur das Arbeitsblatt (Lineal für Kl. 3/4)",
    lerntext12: { titel: "Im Formen-Land", text:
`Im Formen-Land wohnen der Kreis, das Dreieck und das Quadrat. Sie streiten: „Ich bin die schönste Form!“

„Ich bin rund wie die Sonne“, sagt der Kreis. „Ich bin spitz wie ein Dach“, sagt das Dreieck. „Ich habe vier gleiche Seiten wie ein Fenster“, sagt das Quadrat.

Da hat das Quadrat eine Idee: „Lasst uns zusammen etwas bauen!“ Das Quadrat wird ein Haus. Das Dreieck setzt sich als Dach darauf. Und der Kreis wird die Sonne am Himmel.

Jetzt sehen alle: Zusammen sind sie ein wunderschönes Bild.

**Nach dem Vorlesen:** Welche Formen findest du hier im Raum?` },
    lerntext34: { titel: "Der Formen-Architekt", text:
`Robo-Architekt Q7 hat eine besondere Regel: Er baut nur mit Formen. Für sein neuestes Haus braucht er: 1 großes Quadrat für die Wand, 1 Dreieck fürs Dach, 4 kleine Quadrate als Fenster, 1 Rechteck als Tür und 1 Kreis als Türklinke.

„Wie viele Formen sind das insgesamt?“, fragt seine Kollegin. Q7 rechnet: 1 + 1 + 4 + 1 + 1 = 8. „Acht Formen für ein ganzes Haus!“

Als Nächstes plant Q7 eine Rakete. Doch dafür braucht er viel mehr Dreiecke …

**Fragen zum Gespräch:**
1. Was ist der Unterschied zwischen Quadrat und Rechteck?
2. Wie viele Formen braucht Q7 für sein Haus?
3. Welche Formen bräuchte man für eine Rakete?` },
    uebungen: [
        { titel: "Formen-Detektive", fuer: "alle", dauer: "6 Min",
          text: "Die Kinder suchen vom Platz aus Formen im Raum: Uhr = Kreis, Tafel = Rechteck, Fenster = Quadrat? Wer eine Form entdeckt, meldet sich und zeigt darauf." },
        { titel: "Luft-Formen", fuer: "12", dauer: "4 Min",
          text: "Alle malen mit dem Finger Formen in die Luft: einen großen Kreis, ein spitzes Dreieck, ein Quadrat. Dann mit geschlossenen Augen. Zum Schluss malt der Tischnachbar eine Form auf den Rücken – welche war es?" },
        { titel: "Formen-Diktat", fuer: "34", dauer: "5 Min",
          text: "Du diktierst: „Male ein großes Quadrat. Setze ein Dreieck darauf. Male links oben einen Kreis.“ Die Kinder zeichnen. Danach vergleichen die Tischnachbarn: Sehen eure Bilder gleich aus?" }
    ],
    ab12: { titel: "Mein Formen-Bild", aufgaben: [
        { typ: "ankreuzen", text: "Welche Form hat die Uhr?", nebeneinander: true, optionen: ["● Kreis", "▲ Dreieck", "■ Quadrat"] },
        { typ: "ankreuzen", text: "Welche Form hat ein Hausdach?", nebeneinander: true, optionen: ["● Kreis", "▲ Dreieck", "■ Quadrat"] },
        { typ: "malen", text: "Male ein Bild nur aus Kreisen, Dreiecken und Quadraten.", bild: "" }
    ]},
    ab34: { titel: "Formen-Architekt", aufgaben: [
        { typ: "tabelle", text: "Plane dein Formen-Bild: Wie viele Formen nimmst du – und wofür?", spalten: ["Form", "Anzahl", "Wofür?"],
          zeilen: [["● Kreis", "", ""], ["▲ Dreieck", "", ""], ["■ Quadrat", "", ""], ["▬ Rechteck", "", ""]] },
        { typ: "malen", text: "Zeichne dein Formen-Bild. Zusammen sind es ___ Formen.", bild: "" }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-klassen-umfrage",
    titel: "Unsere Klasse in Zahlen",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Mit einer Strichliste zählen",
    ziel34: "Eine Umfrage machen und als Säulendiagramm darstellen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Welches Obst mag die Klasse?", text:
`Frau Sommer will für das Klassenfest Obst kaufen. Aber welches? „Wir machen eine Umfrage!“, sagt sie.

Sie malt an die Tafel: einen Apfel, eine Banane, eine Erdbeere. Jedes Kind darf einmal zeigen, was es am liebsten mag. Für jedes Kind macht Frau Sommer einen Strich.

Beim Apfel sind es drei Striche. Bei der Banane zwei. Und bei der Erdbeere – fünf! „Dann kaufe ich viele Erdbeeren“, lacht Frau Sommer.

**Nach dem Vorlesen:** Was mögen wir am liebsten? Machen wir auch eine Strichliste!` },
    lerntext34: { titel: "Die große Klassen-Umfrage", text:
`Die 4b möchte wissen: Wer hat welches Haustier? Paul macht an der Tafel eine Strichliste. Für jedes Kind ein Strich. Nach fünf Strichen macht er einen Querstrich – so lässt es sich schneller zählen.

Das Ergebnis: 6 Kinder haben einen Hund, 4 eine Katze, 3 ein Meerschweinchen, 2 einen Fisch – und 7 Kinder haben gar kein Haustier.

Mia zeichnet daraus ein Säulendiagramm: Für jedes Kind ein Kästchen nach oben. Jetzt sieht man auf einen Blick, dass „kein Haustier“ die höchste Säule hat.

**Fragen zum Gespräch:**
1. Warum macht man bei einer Strichliste nach vier Strichen einen Querstrich?
2. Was sieht man in einem Säulendiagramm schneller als in einer Liste?
3. Was möchtet ihr über eure Klasse herausfinden?` },
    uebungen: [
        { titel: "Erst schätzen, dann zählen", fuer: "alle", dauer: "4 Min",
          text: "Frage: „Wie viele Kinder in unserer Gruppe haben Geschwister?“ Erst schätzen alle (Kl. 3/4 schreiben die Schätzung auf). Dann melden sich alle mit Geschwistern, ihr zählt gemeinsam. Wer lag am nächsten dran?" },
        { titel: "Hand hoch – Strichliste", fuer: "alle", dauer: "8 Min",
          text: "Du stellst eine Frage mit Antworten zum Melden (Lieblingsobst, Lieblingsfarbe, Wie kommst du zur Schule?). Die Kinder melden sich, ein Kind macht an der Tafel die Strichliste. Kl. 3/4 überlegen sich danach eigene Umfragen für das Arbeitsblatt." }
    ],
    ab12: { titel: "Unsere Strichliste", aufgaben: [
        { typ: "tabelle", text: "Lieblingsobst: Mache für jedes Kind einen Strich. Wie viele sind es?", spalten: ["Obst", "Striche", "Anzahl"],
          zeilen: [["Apfel", "", ""], ["Banane", "", ""], ["Erdbeere", "", ""], ["Birne", "", ""]] },
        { typ: "malen", text: "Male das Lieblingsobst unserer Klasse.", bild: "" }
    ]},
    ab34: { titel: "Unsere Klassen-Umfrage", aufgaben: [
        { typ: "luecken", text: "Unsere Frage:", nummern: false, saetze: ["___"] },
        { typ: "tabelle", text: "Mach für jede Antwort einen Strich. Zähle am Ende und schreib die Anzahl dazu.", spalten: ["Antwort", "Striche", "Anzahl"], zeilen: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]] },
        { typ: "malen", text: "Zeichne ein Säulendiagramm: Für jedes Kind ein Kästchen nach oben.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Die meisten Kinder ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-detektiv",
    titel: "Detektiv-Rätsel",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Genau zuhören und kleine Rätsel lösen",
    ziel34: "Logikrätsel mit Hinweisen lösen und eigene erfinden",
    material: "8 Gegenstände aus dem Klassenraum (für das Kim-Spiel), ein Tuch oder eine Jacke zum Abdecken",
    lerntext12: { titel: "Wer hat den Kuchen genascht?", text:
`Auf dem Tisch steht ein Schokoladenkuchen. Am Morgen fehlt ein großes Stück!

Detektivin Lilli schaut sich die Tiere an.

Der **Hase** hat lange Ohren. An seinem Mund klebt ein Stück Möhre.

Die **Maus** schläft tief und fest in ihrem Bett.

Der **Bär** hat braune Krümel an der Nase und einen dicken, runden Bauch.

Lilli lächelt. „Ich weiß, wer es war!“

**Nach dem Vorlesen:** Wer hat den Kuchen genascht? Woran hat Lilli es erkannt?` },
    lerntext34: { titel: "Der Fall des verschwundenen Balls", text:
`Nach der Pause fehlt der Klassenball. Vier Kinder waren als Letzte draußen: Ali, Ben, Cara und Dana.

Detektiv Emil sammelt Hinweise:
- Ali war am Klettergerüst. Seine Hände sind voller Rost.
- Ben hat nasse Schuhe. Er war am Teich.
- An Caras Schuhen klebt Sand – den gibt es nur am Fußballplatz.
- Dana hat auf der Bank gelesen.

Emil geht zum Fußballplatz – und findet den Ball im Tor. Cara wird rot: „Ich habe ihn liegen lassen, als es geklingelt hat.“

**Fragen zum Gespräch:**
1. Welcher Hinweis hat Emil auf die richtige Spur gebracht?
2. Warum konnten Ali, Ben und Dana es nicht gewesen sein?
3. Was braucht ein guter Detektiv?` },
    uebungen: [
        { titel: "Kim-Spiel: Was fehlt?", fuer: "alle", dauer: "6 Min",
          text: "Auf deinem Tisch liegen 8 Gegenstände. Die Kinder schauen 30 Sekunden genau hin. Dann deckst du alles ab und nimmst heimlich einen Gegenstand weg. Welcher fehlt? Kl. 3/4: Du nimmst zwei weg oder vertauschst die Reihenfolge." },
        { titel: "Ja-Nein-Rätsel", fuer: "alle", dauer: "6 Min",
          text: "Du denkst an einen Gegenstand im Raum. Die Kinder stellen Fragen, auf die du nur mit Ja oder Nein antwortest („Ist es rund?“ – „Kann man es essen?“). Wie viele Fragen braucht die Klasse?" }
    ],
    ab12: { titel: "Kleine Detektive", aufgaben: [
        { typ: "ankreuzen", text: "Wer hat den Kuchen genascht? Kreuze an.", nebeneinander: true, optionen: ["Hase", "Bär", "Maus"] },
        { typ: "ankreuzen", text: "Hör gut zu: Das Tier ist groß und grau und hat einen Rüssel.", nebeneinander: true, optionen: ["Elefant", "Giraffe", "Maus"] },
        { typ: "ankreuzen", text: "Hör gut zu: Das Tier ist klein, hat Stacheln und schläft im Winter.", nebeneinander: true, optionen: ["Hase", "Igel", "Frosch"] },
        { typ: "malen", text: "Male dich als Detektiv mit einer Lupe.", bild: "" }
    ]},
    ab34: { titel: "Detektiv-Akte", kontext: "Zum Fall: Nach der Pause ist der Klassenball weg. Ali hat Rost an den Händen, Ben nasse Schuhe, an Caras Schuhen klebt Sand vom Fußballplatz, Dana hat auf der Bank gelesen.", aufgaben: [
        { typ: "luecken", text: "Der Fall des verschwundenen Balls:", nummern: false, saetze: ["Der Ball war bei: ___", "Mein Beweis: ___"] },
        { typ: "tabelle", text: "Wer isst was am liebsten? Apfel · Nudeln · Gummibärchen. Hinweise: Mia mag kein Obst. Tom isst gern Süßes. Lea liebt Äpfel.", spalten: ["Kind", "Lieblingsessen"],
          zeilen: [["Mia", ""], ["Tom", ""], ["Lea", ""]] },
        { typ: "luecken", text: "Erfinde ein eigenes Detektiv-Rätsel:", nummern: false, saetze: ["___", "___", "Lösung: ___"] }
    ]}
})

];
