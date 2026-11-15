/* ============================================================
   Leuchtturm – Lernangebot: Grundlage + Vorlagen Teil 1 (Deutsch)
   Gleiches Format wie sozial-einheiten.js. Jede Stunde: 40 Minuten,
   Klasse 1/2 und 3/4. Arbeitsblatt Kl. 1/2: „gemischt“ (Kl. 1, ohne
   Lesen/Schreiben, vorlesen) und „nur Kl. 2“ (mit Schreibaufgaben).
   Aufgaben mit nur: "1" erscheinen nur auf dem gemischten Blatt,
   nur: "2" nur auf dem Kl.-2-Blatt, nur: "" auf beiden.
   tafel: passende Tafel-Übungen (lernangebot-tafel.js), schon eingestellt.
   Weitere Dateien: lernangebot-einheiten-2.js … werden automatisch geladen.
   ============================================================ */

window.SOZIAL_KATEGORIEN = [
    "Deutsch: Lesen", "Deutsch: Schreiben & Rechtschreiben",
    "Mathe: Zahlen & Rechnen", "Mathe: Formen, Größen & Knobeln",
    "Lernen lernen", "Gemischt & spielerisch", "Sonstiges"
];

window.SOZIAL_RITUALE_STANDARD = "";

window.SOZIAL_VERLAUF_STANDARD = [
    { zeit: "0–5",   phase: "Ankommen",      k12: "Begrüßung, Kopf-Start (Blitzrunde), Ziel nennen", k34: "Begrüßung, Kopf-Start (Blitzrunde), Ziel nennen" },
    { zeit: "5–12",  phase: "Einstieg",      k12: "", k34: "" },
    { zeit: "12–25", phase: "Übung",         k12: "", k34: "" },
    { zeit: "25–36", phase: "Arbeitsblatt",  k12: "AB Kl. 1 bzw. Kl. 2", k34: "AB 3/4" },
    { zeit: "36–40", phase: "Abschluss",     k12: "Lern-Daumen, Applauswelle", k34: "Lern-Daumen, „Heute habe ich gelernt …“" }
];

window.SOZIAL_EINHEIT = function (o) {
    o.dauer = o.dauer || 40;
    if (!o.verlauf) {
        const namen = stufe => (o.uebungen || []).filter(u => u.fuer === "alle" || u.fuer === stufe).map(u => u.titel).join(", ");
        o.verlauf = [
            { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Kopf-Start: " + (o.warmup12 || o.warmup || "Blitzrunde"), k34: "Begrüßung, Kopf-Start: " + (o.warmup34 || o.warmup || "Blitzrunde") },
            { zeit: "5–12",  phase: "Einstieg",     k12: "„" + o.lerntext12.titel + "“ vorlesen, Fragen besprechen", k34: "„" + o.lerntext34.titel + "“ lesen, Fragen besprechen" },
            { zeit: "12–25", phase: "Übung",        k12: namen("12"), k34: namen("34") },
            { zeit: "25–36", phase: "Arbeitsblatt", k12: "AB Kl. 1/2: " + o.ab12.titel, k34: "AB 3/4: " + o.ab34.titel },
            { zeit: "36–40", phase: "Abschluss",    k12: "Lern-Daumen, Applauswelle", k34: "Lern-Daumen, „Heute habe ich gelernt …“" }
        ];
    }
    return o;
};

window.SOZIAL_VORLAGEN = [

/* ============================== DEUTSCH ==============================
   Jede Stunde hat EINE Strategie: Ella erklärt sie, dann wird an der Tafel
   geübt. Jede Aufgabe hat Antworten zum Antippen (fragen12 / fragen34):
   ["Frage", ["richtig", "falsch", …]] – richtig = Punkt für die Klasse,
   daneben = Punkt für Ella. Die richtige Antwort steht in den Daten zuerst.
   ===================================================================== */
SOZIAL_EINHEIT({
    id: "l-silben-schwingen",
    titel: "Silben lesen – lange Wörter knacken",
    kategorie: "Deutsch: Lesen",
    ziel12: "Wörter in Silben schwingen, Silben zählen und Silbe für Silbe lesen",
    ziel34: "Lange Wörter in Silben zerlegen, lesen und am Zeilenende richtig trennen",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.",
    warmup12: "Namen schwingen – jedes Kind schwingt seinen Vornamen in Silben, alle machen mit",
    warmup34: "Blitzlesen an der Tafel (lange Wörter)",
    tafel: [
        { werkzeug: "silben", titel: "Silben zählen mit Bildern", fuer: "12", einstellung: {} },
        { werkzeug: "blitzlesen", titel: "Blitzlesen: lange Wörter", fuer: "34", einstellung: { art: "woerter34" } }
    ],
    lerntext12: { titel: "Silben schwingen", text: "Ba – na – ne. Jeder Schwung ist eine Silbe." },
    lerntext34: { titel: "Lange Wörter knacken", text: "Fuß – ball – spiel. Jede Silbe hat einen Selbstlaut-Kern." },
    uebungen: [
        { titel: "Silben zählen", fuer: "alle", dauer: "7 Min", kern: ["12", "34"],
          text: "Das Wort steht an der Tafel. Alle schwingen es gemeinsam mit dem Arm in Silben (laut mitsprechen!). Dann zeigt jedes Kind mit den Fingern, wie viele Silben es sind – erst dann tippt ein Kind die Antwort an der Tafel an.",
          folie: "Lies das Wort und **schwinge** es mit dem Arm. 👋\n\nJeder Schwung = eine Silbe. Wie viele sind es?",
          fragen12: [
            ["Wie viele Silben hat **Sonne**?", ["2", "1", "3"]],
            ["Wie viele Silben hat **Hund**?", ["1", "2", "3"]],
            ["Wie viele Silben hat **Banane**?", ["3", "2", "4"]],
            ["Wie viele Silben hat **Auto**?", ["2", "1", "3"]],
            ["Wie viele Silben hat **Tomate**?", ["3", "2", "4"]],
            ["Wie viele Silben hat **Fisch**?", ["1", "2", "3"]],
            ["Wie viele Silben hat **Schokolade**?", ["4", "3", "5"]],
            ["Wie viele Silben hat **Elefant**?", ["3", "2", "4"]]
          ],
          fragen34: [
            ["Wie viele Silben hat **Fußballspiel**?", ["3", "2", "4"]],
            ["Wie viele Silben hat **Klassenzimmer**?", ["4", "3", "5"]],
            ["Wie viele Silben hat **Schwimmbad**?", ["2", "1", "3"]],
            ["Wie viele Silben hat **Feuerwehrauto**?", ["5", "4", "6"]],
            ["Wie viele Silben hat **Hausaufgaben**?", ["4", "3", "5"]],
            ["Wie viele Silben hat **Taschenlampe**?", ["4", "3", "5"]],
            ["Wie viele Silben hat **Geburtstagsfeier**?", ["5", "4", "6"]],
            ["Wie viele Silben hat **Strumpf**?", ["1", "2", "3"]]
          ],
          emoji: "👋", warum: "Wer Silben hört, kann lange Wörter lesen." },
        { titel: "Silben-Lesen", fuer: "12", dauer: "6 Min", kern: ["12"],
          text: "Die Silben stehen an der Tafel. Alle lesen sie gemeinsam – erst langsam Silbe für Silbe, dann schnell zusammen. Dann tippt ein Kind das passende Bild an.",
          folie: "Lies die Silben – erst **langsam**, dann **schnell zusammen**. 🐢 ➜ 🐇\n\nWelches Bild passt?",
          fragen12: [
            ["Lies: **Ba – na – ne**", ["🍌", "🍎", "🍐"]],
            ["Lies: **Ra – ke – te**", ["🚀", "🚗", "🚲"]],
            ["Lies: **To – ma – te**", ["🍅", "🥕", "🥒"]],
            ["Lies: **Zi – tro – ne**", ["🍋", "🍊", "🍇"]],
            ["Lies: **Pa – pa – gei**", ["🦜", "🐧", "🦆"]],
            ["Lies: **Me – lo – ne**", ["🍉", "🍓", "🍒"]]
          ],
          emoji: "🐢", warum: "Silbe für Silbe lesen – so klappt jedes Wort." },
        { titel: "Welche Silbe fehlt?", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Ein langes Wort mit einer Lücke steht an der Tafel. Alle lesen es in Silben – mit „hmm“ an der Lücke. Welche Silbe fehlt? Ein Kind tippt an.",
          folie: "Lies das Wort in Silben. 🔍\n\nAn einer Stelle fehlt ein Stück – **welche Silbe** gehört hinein?",
          fragen34: [
            ["Schmet – **?** – ling", ["ter", "ten", "tor"]],
            ["Ta – schen – **?** – pe", ["lam", "lom", "lan"]],
            ["Kin – der – **?** – ten", ["gar", "gor", "ger"]],
            ["Feu – er – **?** – mann", ["wehr", "wer", "wär"]],
            ["Ge – **?** – tag", ["burts", "burst", "buts"]],
            ["Re – gen – **?** – gen", ["bo", "ba", "bu"]]
          ],
          emoji: "🧩", warum: "Wer in Silben liest, findet jedes fehlende Stück." },
        { titel: "Trenn-Profis", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Am Zeilenende wird zwischen den Silben getrennt. Wichtig: Doppelte Mitlaute werden getrennt (Son-ne), ck bleibt zusammen (Zu-cker), ein einzelner Selbstlaut am Anfang wird nicht abgetrennt. Ein Kind tippt die richtige Trennung an.",
          folie: "Das Wort passt nicht mehr in die Zeile. ✂️\n\n**Wo** trennst du richtig?",
          fragen34: [
            ["Trenne: **Sonne**", ["Son-ne", "So-nne", "Sonn-e"]],
            ["Trenne: **Zucker**", ["Zu-cker", "Zuc-ker", "Zuck-er"]],
            ["Trenne: **Fenster**", ["Fens-ter", "Fe-nster", "Fenst-er"]],
            ["Trenne: **Katze**", ["Kat-ze", "Ka-tze", "Katz-e"]],
            ["Trenne: **Schule**", ["Schu-le", "Sch-ule", "Schul-e"]],
            ["Trenne: **Apfel**", ["Ap-fel", "A-pfel", "Apf-el"]]
          ],
          emoji: "✂️", warum: "So trennst du Wörter am Zeilenende richtig." }
    ],
    ab12: { titel: "Silben lesen", aufgaben: [
        { typ: "tabelle", text: "Sprich das Wort in Silben. Wie viele Silben? Kreuze an.", spalten: ["Bild", "1", "2", "3"], zeilen: [["[bild:hund]", "", "", ""], ["[bild:banane]", "", "", ""], ["[bild:sonne]", "", "", ""], ["[bild:elefant]", "", "", ""], ["[bild:maus]", "", "", ""], ["[bild:tomate]", "", "", ""]] },
        { typ: "zuordnen", text: "Lies die Silben. Verbinde mit dem Bild.", nur: "2", links: ["Ra – ke – te", "Ba – na – ne", "To – ma – te"], rechts: ["[bild:banane]", "[bild:tomate]", "[bild:rakete]"] },
        { typ: "luecken", text: "Schreibe das Wort und male Silbenbögen darunter.", nummern: true, saetze: ["[bild:auto] ___", "[bild:igel] ___", "[bild:tomate] To – ma – ___"] },
        { typ: "malen", text: "Male etwas mit drei Silben.", bild: "" }
    ]},
    ab34: { titel: "Lange Wörter knacken", aufgaben: [
        { typ: "tabelle", text: "Zerlege die Wörter in Silben und zähle sie.", spalten: ["Wort", "in Silben", "Anzahl"], zeilen: [["Fußballspiel", "", ""], ["Klassenzimmer", "", ""], ["Feuerwehrauto", "", ""], ["Hausaufgaben", "", ""], ["Taschenlampe", "", ""], ["Geburtstagsfeier", "", ""]] },
        { typ: "luecken", text: "Welche Silbe fehlt? Schreibe das ganze Wort.", nummern: true, saetze: ["Schmet – ___ – ling → ___", "Kin – der – ___ – ten → ___", "Re – gen – ___ – gen → ___"] },
        { typ: "luecken", text: "Trenne die Wörter am Zeilenende.", nummern: true, saetze: ["Sonne → ___", "Zucker → ___", "Fenster → ___", "Apfel → ___"] },
        { typ: "schreiben", text: "Finde das längste Wort, das du kennst. Schreibe es in Silben auf.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-anlaut-detektive",
    titel: "Mitsprechen – jeden Laut hören",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Laute am Anfang, am Ende und in der Mitte hören und dem Buchstaben zuordnen",
    ziel34: "Mit der Strategie „Mitsprechen“ Wörter vollständig schreiben und fehlende Laute finden",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.",
    warmup12: "Ich sehe was, was du nicht siehst – und das fängt mit M an",
    warmup34: "Blitzrunde: Wörter mit „Schr“ am Anfang – wer findet in 1 Minute die meisten?",
    tafel: [
        { werkzeug: "anlaute", titel: "Anlaut-Raten mit Bildern", fuer: "12", einstellung: { modus: "auswahl" } },
        { werkzeug: "anlaute", titel: "Anlaut schnell nennen", fuer: "34", einstellung: { modus: "blitz" } }
    ],
    lerntext12: { titel: "Laute hören", text: "Mmm – aaa – uuu – sss: Maus." },
    lerntext34: { titel: "Mitsprechen", text: "Ich schwinge das Wort und spreche jeden Laut mit." },
    uebungen: [
        { titel: "Erster Laut", fuer: "12", dauer: "6 Min", kern: ["12"],
          text: "Das Bild steht an der Tafel. Alle sprechen das Wort langsam und halten den ersten Laut lange: Mmmm-ond. Dann tippt ein Kind den Buchstaben an.",
          folie: "Sprich das Wort **langsam**. Halte den ersten Laut lange: **Mmmm**-ond. 🔍\n\nWelcher Buchstabe passt?",
          fragen12: [
            ["🐟 Womit fängt **Fisch** an?", ["F", "W", "S"]],
            ["🌙 Womit fängt **Mond** an?", ["M", "N", "W"]],
            ["🍌 Womit fängt **Banane** an?", ["B", "D", "P"]],
            ["🦁 Womit fängt **Löwe** an?", ["L", "R", "M"]],
            ["🚗 Womit fängt **Auto** an?", ["A", "O", "U"]],
            ["🍦 Womit fängt **Eis** an?", ["Ei", "Au", "Eu"]],
            ["🐭 Womit fängt **Maus** an?", ["M", "N", "H"]],
            ["🌹 Womit fängt **Rose** an?", ["R", "L", "H"]]
          ],
          emoji: "🔍", warum: "Wer genau hinhört, findet den richtigen Buchstaben." },
        { titel: "Letzter Laut & Lücke", fuer: "12", dauer: "6 Min", kern: ["12"],
          text: "Jetzt wird es schwerer: Der letzte Laut – oder ein Laut in der Mitte fehlt. Alle sprechen das Wort langsam mit, dann tippt ein Kind an.",
          folie: "Sprich das Wort **ganz langsam** bis zum Schluss. 🐢\n\nWelcher Buchstabe fehlt?",
          fragen12: [
            ["🌳 Bau**_** – was hörst du am Ende?", ["m", "n", "l"]],
            ["⚽ Bal**_** – was hörst du am Ende?", ["l", "m", "n"]],
            ["🛋️ Sof**_** – was hörst du am Ende?", ["a", "e", "o"]],
            ["🐭 Ma**_**s – was fehlt?", ["u", "o", "a"]],
            ["👖 Ho**_**e – was fehlt?", ["s", "f", "n"]],
            ["☀️ So**_**ne – was fehlt?", ["n", "m", "l"]]
          ],
          emoji: "🐢", warum: "Mitsprechen bis zum letzten Laut." },
        { titel: "Fehlt ein Laut?", fuer: "34", dauer: "7 Min", kern: ["34"],
          text: "Drei Schreibweisen stehen an der Tafel – nur eine ist vollständig. Alle schwingen das Wort und sprechen jeden Laut mit. Ein Kind tippt die richtige Schreibweise an. Frag nach: Welcher Laut fehlte bei den anderen?",
          folie: "Schwinge das Wort und sprich **jeden Laut** mit. 🗣️\n\nWelche Schreibweise ist **vollständig**?",
          fragen34: [
            ["Welches Wort ist richtig?", ["Schrank", "Schank", "Scharnk"]],
            ["Welches Wort ist richtig?", ["Fenster", "Fenter", "Fesnter"]],
            ["Welches Wort ist richtig?", ["Pflanze", "Planze", "Flanze"]],
            ["Welches Wort ist richtig?", ["Gespenst", "Gespent", "Gepsenst"]],
            ["Welches Wort ist richtig?", ["Strumpf", "Strupf", "Stumpf"]],
            ["Welches Wort ist richtig?", ["Krokodil", "Kokodil", "Krokdil"]],
            ["Welches Wort ist richtig?", ["Spaziergang", "Spazigang", "Sparziergang"]]
          ],
          emoji: "🗣️", warum: "Mitsprechen schützt vor vergessenen Buchstaben." },
        { titel: "Satz-Detektive", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Ein Satz steht an der Tafel. In einem Wort fehlt ein Laut. Alle lesen den Satz leise und sprechen mit. Ein Kind tippt das falsche Wort an und sagt, wie es richtig heißt.",
          folie: "Lies den Satz leise und sprich mit. 🕵️\n\nIn **einem** Wort fehlt ein Buchstabe. Welches?",
          fragen34: [
            ["Der Hund **spingt** über den Zaun.", ["spingt", "Hund", "Zaun"]],
            ["Wir gehen heute ins **Kno**.", ["Kno", "gehen", "heute"]],
            ["Mein Bruder spielt gern **Fußbal** im Garten.", ["Fußbal", "Bruder", "Garten"]],
            ["Im Winter trage ich eine **Müze**.", ["Müze", "Winter", "trage"]],
            ["Die **Blmen** im Garten blühen.", ["Blmen", "Garten", "blühen"]],
            ["Am Abend **schlaft** das Baby schnell ein.", ["schlaft", "Abend", "Baby"]]
          ],
          emoji: "🕵️", warum: "Beim Kontrollieren hilft Mitsprechen auch." }
    ],
    ab12: { titel: "Laute hören", aufgaben: [
        { typ: "tabelle", text: "Womit fängt das Wort an? Schreibe den Buchstaben.", spalten: ["Bild", "Anfang"], zeilen: [["[bild:maus]", ""], ["[bild:banane]", ""], ["[bild:sonne]", ""], ["[bild:auto]", ""], ["[bild:igel]", ""], ["[bild:tomate]", ""]] },
        { typ: "luecken", text: "Sprich langsam mit. Welcher Buchstabe fehlt?", nummern: true, nur: "2", saetze: ["Ma_s", "Ho_e", "So_ne", "Ba_m"] },
        { typ: "malen", text: "Male drei Dinge, die mit M anfangen.", bild: "" }
    ]},
    ab34: { titel: "Mitsprechen", aufgaben: [
        { typ: "ankreuzen", text: "Kreuze die richtige Schreibweise an.", optionen: ["Schrank", "Scharnk", "Pflanze", "Planze", "Gespenst", "Gespent", "Krokodil", "Kokodil"], nebeneinander: true },
        { typ: "luecken", text: "In jedem Satz fehlt ein Buchstabe. Schreibe das Wort richtig.", nummern: true, saetze: ["Der Hund spingt über den Zaun. → ___", "Im Winter trage ich eine Müze. → ___", "Die Blmen im Garten blühen. → ___"] },
        { typ: "schreiben", text: "Schreibe drei lange Wörter. Schwinge sie vorher und sprich jeden Laut mit.", zeilen: 3 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-lesen-malen",
    titel: "Genau lesen – Wörter und Sätze verstehen",
    kategorie: "Deutsch: Lesen",
    ziel12: "Wörter lesen und verstehen, ähnliche Wörter genau unterscheiden",
    ziel34: "Sätze genau lesen und auf kleine Wörter (nicht, kein, unter …) achten",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.",
    warmup12: "Blitzlesen an der Tafel (kurze Wörter)",
    warmup34: "Blitzlesen an der Tafel (lange Wörter)",
    tafel: [
        { werkzeug: "blitzlesen", titel: "Blitzlesen: kurze Wörter", fuer: "12", einstellung: { art: "silben12" } },
        { werkzeug: "blitzlesen", titel: "Blitzlesen: lange Wörter", fuer: "34", einstellung: { art: "woerter34" } }
    ],
    lerntext12: { titel: "Genau lesen", text: "Haus oder Maus? Ein Buchstabe macht den Unterschied." },
    lerntext34: { titel: "Genau lesen", text: "Mia hat keinen Hund – kleine Wörter verändern alles." },
    uebungen: [
        { titel: "Lies und tipp!", fuer: "12", dauer: "6 Min", kern: ["12"],
          text: "Ein Wort steht an der Tafel. Alle lesen es leise (Silbe für Silbe), dann laut zusammen. Ein Kind tippt das passende Bild an. Die Wörter sehen sich ähnlich – genau hinschauen!",
          folie: "Lies das Wort **genau** – erst leise, dann laut. 👀\n\nWelches Bild passt?",
          fragen12: [
            ["Lies: **Haus**", ["🏠", "🐭", "🐶"]],
            ["Lies: **Maus**", ["🐭", "🏠", "🌽"]],
            ["Lies: **Tisch**", ["🪑", "🐟", "🛏️"]],
            ["Lies: **Fisch**", ["🐟", "🪑", "🐸"]],
            ["Lies: **Rose**", ["🌹", "👖", "🥫"]],
            ["Lies: **Hose**", ["👖", "🌹", "🐰"]],
            ["Lies: **Mond**", ["🌙", "👄", "⭐"]],
            ["Lies: **Mund**", ["👄", "🌙", "👃"]]
          ],
          emoji: "👀", warum: "Ein Buchstabe – ein ganz anderes Wort." },
        { titel: "Welches Wort passt?", fuer: "12", dauer: "6 Min", kern: ["12"],
          text: "Ein Bild steht an der Tafel, darunter drei ähnliche Wörter. Alle lesen die Wörter leise. Ein Kind tippt das richtige Wort an.",
          folie: "Schau das Bild an. 🖼️\n\nLies **alle drei** Wörter – welches passt?",
          fragen12: [
            ["🍎", ["Apfel", "Ampel", "Affe"]],
            ["🐻", ["Bär", "Beere", "Bart"]],
            ["🐰", ["Hase", "Nase", "Vase"]],
            ["🌽", ["Mais", "Maus", "Haus"]],
            ["🦶", ["Fuß", "Fisch", "Fass"]],
            ["⭐", ["Stern", "Stein", "Stuhl"]]
          ],
          emoji: "🖼️", warum: "Wir lesen genau – nicht nur den Anfang." },
        { titel: "Genau-Leser", fuer: "34", dauer: "8 Min", kern: ["34"],
          text: "Ein Satz mit Frage steht an der Tafel. Alle lesen leise bis zum Punkt. Achtung auf kleine Wörter: nicht, kein, unter, hinter, vor, nur. Ein Kind tippt die Antwort an – und zeigt, welches Wort den Unterschied macht.",
          folie: "Lies den Satz **bis zum Punkt**. 🔎\n\nAchte auf die kleinen Wörter: **nicht · kein · unter · hinter · nur**",
          fragen34: [
            ["**Mia hat keinen Hund, aber zwei Katzen.**\nWas hat Mia?", ["zwei Katzen", "einen Hund", "einen Hund und zwei Katzen"]],
            ["**Der Ball liegt nicht unter dem Bett, sondern hinter dem Schrank.**\nWo liegt der Ball?", ["hinter dem Schrank", "unter dem Bett", "im Schrank"]],
            ["**Tom kommt erst nach der Pause zurück.**\nWann ist Tom wieder da?", ["nach der Pause", "vor der Pause", "in der Pause"]],
            ["**Nur Lena und Paul dürfen heute an den Computer.**\nWer darf an den Computer?", ["Lena und Paul", "alle Kinder", "nur Lena"]],
            ["**Ben ist größer als Max, aber kleiner als Lea.**\nWer ist am größten?", ["Lea", "Ben", "Max"]],
            ["**Das Spiel fällt aus, weil es regnet.**\nWarum fällt das Spiel aus?", ["Es regnet.", "Es ist zu kalt.", "Keiner hat Zeit."]],
            ["**Opa trinkt morgens Tee, abends aber Kakao.**\nWas trinkt Opa am Abend?", ["Kakao", "Tee", "Saft"]],
            ["**Die Bücherei hat montags geschlossen.**\nWann kannst du NICHT hin?", ["am Montag", "am Dienstag", "am Samstag"]]
          ],
          emoji: "🔎", warum: "Kleine Wörter verändern den ganzen Satz." },
        { titel: "Welches Wort fehlt?", fuer: "34", dauer: "5 Min", kern: ["34"],
          text: "Ein Satz mit Lücke steht an der Tafel. Alle lesen ihn leise und überlegen, welches Wort Sinn ergibt. Ein Kind tippt an und liest den ganzen Satz laut vor.",
          folie: "Lies den Satz. Welches Wort ergibt **Sinn**? 🧠",
          fragen34: [
            ["Im Winter trage ich eine warme ___.", ["Mütze", "Sonnenbrille", "Badehose"]],
            ["Der Bäcker backt jeden Morgen frisches ___.", ["Brot", "Gemüse", "Papier"]],
            ["Weil Mila Fieber hat, bleibt sie im ___.", ["Bett", "Schwimmbad", "Kino"]],
            ["Die Feuerwehr kommt mit lauter ___.", ["Sirene", "Musik", "Klingel"]],
            ["Im Herbst fallen die ___ von den Bäumen.", ["Blätter", "Blüten", "Vögel"]],
            ["Nach dem Sport habe ich großen ___.", ["Durst", "Schnupfen", "Ärger"]]
          ],
          emoji: "🧠", warum: "Wer mitdenkt, versteht den Satz." }
    ],
    ab12: { titel: "Genau lesen", aufgaben: [
        { typ: "zuordnen", text: "Lies genau. Verbinde Wort und Bild.", links: ["Haus", "Maus", "Hose", "Rose"], rechts: ["[bild:maus]", "[bild:haus]", "🌹", "👖"] },
        { typ: "ankreuzen", text: "Kreuze das richtige Wort an: 🍎", nur: "2", optionen: ["Apfel", "Ampel", "Affe"], nebeneinander: true },
        { typ: "malen", text: "Lies und male: ein Haus und eine Maus.", bild: "" }
    ]},
    ab34: { titel: "Genau-Leser", aufgaben: [
        { typ: "luecken", text: "Lies genau und beantworte die Frage.", nummern: true, saetze: ["Mia hat keinen Hund, aber zwei Katzen. Was hat Mia? ___", "Der Ball liegt nicht unter dem Bett, sondern hinter dem Schrank. Wo liegt der Ball? ___", "Ben ist größer als Max, aber kleiner als Lea. Wer ist am kleinsten? ___"] },
        { typ: "luecken", text: "Welches Wort ergibt Sinn? Schreibe es in die Lücke.", nummern: true, saetze: ["Im Winter trage ich eine warme ___.", "Weil Mila Fieber hat, bleibt sie im ___.", "Im Herbst fallen die ___ von den Bäumen."] },
        { typ: "schreiben", text: "Schreibe selbst einen Satz mit „nicht“ und einen mit „nur“.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-lese-detektive",
    titel: "Lese-Detektive: Texte verstehen",
    kategorie: "Deutsch: Lesen",
    ziel12: "Einen kurzen Text mitlesen und Fragen dazu beantworten",
    ziel34: "Einen Sachtext lesen, Informationen finden und prüfen: stimmt – stimmt nicht – steht nicht im Text",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.",
    warmup12: "Stimmt das? Unsinn-Sätze",
    warmup34: "Stimmt das? Unsinn-Sätze",
    lerntext12: { titel: "Ausflug zum See", text:
`Lena fährt mit Opa zum See. Sie nehmen Brote und Äpfel mit.

Auf dem See schwimmen Enten. Lena will sie füttern. Aber Opa sagt: „Brot macht Enten krank.“ Also füttert Lena sie nicht.

Opa hat eine Angel dabei. Er wartet lange. Aber er fängt keinen Fisch.

Dafür findet Lena am Ufer einen roten Stein. Den nimmt sie mit nach Hause.

**Nach dem Lesen:**
1. Was hättest du am See gemacht?` },
    lerntext34: { titel: "Der Wanderfalke", text:
`Der Wanderfalke ist ein Greifvogel. Er ist etwa so groß wie eine Krähe. Sein Rücken ist grau, sein Bauch hell mit dunklen Streifen.

Der Wanderfalke ist das schnellste Tier der Welt. Wenn er von hoch oben auf seine Beute herabstürzt, wird er über 300 Kilometer pro Stunde schnell – schneller als ein Rennauto.

Er jagt vor allem andere Vögel, zum Beispiel Tauben. Früher brütete er nur an hohen Felsen. Heute wohnt er auch in Städten: auf Kirchtürmen, Hochhäusern und Fabrik-Schornsteinen. Dort findet er genug Tauben.

Vor etwa 50 Jahren gab es in Deutschland fast keine Wanderfalken mehr. Gift in der Natur hatte ihre Eier zerstört. Heute ist das Gift verboten – und die Wanderfalken sind zurück.

**Fragen zum Gespräch:**
1. Was hat dich am meisten überrascht?` },
    uebungen: [
        { titel: "Detektiv-Fragen", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Der Text war gerade an der Tafel (Kl. 1/2: du liest vor, die Kinder lesen mit; Kl. 3/4: alle lesen leise, dann ein Kind laut). Jetzt kommen die Fragen. Wer unsicher ist, darf zurückblättern und im Text nachschauen – genau das machen Lese-Detektive!",
          folie: "Lese-Detektive suchen **Beweise im Text**. 🕵️\n\nUnsicher? Zurück zum Text und nachschauen!",
          fragen12: [
            ["Mit wem fährt Lena zum See?", ["mit Opa", "mit Mama", "mit ihrer Freundin"]],
            ["Was schwimmt auf dem See?", ["Enten", "Schwäne", "Boote"]],
            ["Warum füttert Lena die Enten nicht?", ["Brot macht Enten krank.", "Sie hat kein Brot.", "Die Enten schlafen."]],
            ["Fängt Opa einen Fisch?", ["Nein", "Ja, einen", "Ja, zwei"]],
            ["Was findet Lena am Ufer?", ["einen roten Stein", "eine Feder", "einen Fisch"]],
            ["Was nehmen Lena und Opa mit?", ["Brote und Äpfel", "Kuchen und Saft", "Pizza"]]
          ],
          fragen34: [
            ["Wie groß ist ein Wanderfalke ungefähr?", ["so groß wie eine Krähe", "so groß wie ein Spatz", "so groß wie ein Adler"]],
            ["Wie schnell wird er im Sturzflug?", ["über 300 km/h", "etwa 100 km/h", "etwa 50 km/h"]],
            ["Was jagt der Wanderfalke vor allem?", ["andere Vögel", "Mäuse", "Fische"]],
            ["Warum leben Wanderfalken heute auch in Städten?", ["Dort gibt es genug Tauben.", "Dort ist es wärmer.", "Dort gibt es keine Menschen."]],
            ["Warum gab es früher fast keine Wanderfalken mehr?", ["Gift hat ihre Eier zerstört.", "Sie wurden alle gejagt.", "Es gab keine Felsen mehr."]],
            ["Welche Überschrift passt auch zum Text?", ["Der Rekord-Flieger kehrt zurück", "Ein Tag im Zoo", "Wie man Tauben füttert"]]
          ],
          emoji: "🕵️", warum: "Gute Leser finden die Antwort im Text." },
        { titel: "Steht das im Text?", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Jetzt wird es kniffliger: Es gibt drei Antworten. „Stimmt“ – steht so im Text. „Stimmt nicht“ – im Text steht etwas anderes. „Steht nicht im Text“ – davon sagt der Text gar nichts (auch wenn es vielleicht stimmt!). Bei Streit: im Text nachschauen.",
          folie: "Drei Möglichkeiten: 🧐\n\n✅ **stimmt** · ❌ **stimmt nicht** · ❓ **steht nicht im Text**\n\nBeweis gesucht: Wo steht das?",
          fragen34: [
            ["Der Wanderfalke hat einen grauen Rücken.", ["✅ stimmt", "❌ stimmt nicht", "❓ steht nicht im Text"]],
            ["Der Wanderfalke frisst am liebsten Mäuse.", ["❌ stimmt nicht", "✅ stimmt", "❓ steht nicht im Text"]],
            ["Wanderfalken werden etwa 15 Jahre alt.", ["❓ steht nicht im Text", "✅ stimmt", "❌ stimmt nicht"]],
            ["Wanderfalken wohnen heute auch auf Kirchtürmen.", ["✅ stimmt", "❌ stimmt nicht", "❓ steht nicht im Text"]],
            ["Das Gift in der Natur ist heute erlaubt.", ["❌ stimmt nicht", "✅ stimmt", "❓ steht nicht im Text"]],
            ["Ein Wanderfalke legt drei bis vier Eier.", ["❓ steht nicht im Text", "✅ stimmt", "❌ stimmt nicht"]]
          ],
          emoji: "🧐", warum: "Wir prüfen genau, was wirklich im Text steht." }
    ],
    ab12: { titel: "Ausflug zum See", aufgaben: [
        { typ: "ankreuzen", text: "Mit wem fährt Lena zum See? Kreuze an.", optionen: ["mit Opa", "mit Mama", "mit Tom"], nebeneinander: true },
        { typ: "ankreuzen", text: "Was findet Lena? Kreuze an.", optionen: ["einen roten Stein", "einen Fisch", "eine Feder"], nebeneinander: true },
        { typ: "luecken", text: "Lies und ergänze.", nur: "2", nummern: true, saetze: ["Auf dem See schwimmen ___.", "Opa fängt keinen ___."] },
        { typ: "malen", text: "Male Lena und Opa am See.", bild: "" }
    ]},
    ab34: { titel: "Der Wanderfalke", aufgaben: [
        { typ: "luecken", text: "Beantworte die Fragen mit dem Text.", nummern: true, saetze: ["Wie schnell wird der Wanderfalke im Sturzflug? ___", "Wo brütet er heute auch? ___", "Warum gab es früher fast keine Wanderfalken? ___"] },
        { typ: "tabelle", text: "Stimmt (✓), stimmt nicht (✗) oder steht nicht im Text (?)", spalten: ["Satz", "✓ / ✗ / ?"], zeilen: [["Der Wanderfalke jagt Tauben.", ""], ["Er ist größer als ein Adler.", ""], ["Er mag Regen.", ""], ["Er wohnt auch in Städten.", ""]] },
        { typ: "schreiben", text: "Schreibe eine eigene Frage zum Text – dein Nachbar beantwortet sie.", zeilen: 2 }
    ]}
}),

/* ============================== DEUTSCH: SCHREIBEN & RECHTSCHREIBEN ============================== */
SOZIAL_EINHEIT({
    id: "l-reim-zauber",
    titel: "Reimen & Verlängern",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Reime hören und finden",
    ziel34: "Mit der Strategie „Verlängern“ b/p, d/t und g/k am Wortende richtig schreiben",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.",
    warmup12: "Reim-Ping-Pong: Ich sage ein Wort, ihr ruft ein Reimwort",
    warmup34: "Blitzrunde: Mehrzahl-Ping-Pong (Hund – Hunde, Korb – Körbe …)",
    tafel: [
        { werkzeug: "reime", titel: "Reimt sich das?", fuer: "12", einstellung: {} }
    ],
    lerntext12: { titel: "Reime", text: "Haus – Maus: Hinten klingt es gleich." },
    lerntext34: { titel: "Verlängern", text: "Hund – Hun-de: Beim Verlängern hörst du das d." },
    uebungen: [
        { titel: "Reimt sich das?", fuer: "12", dauer: "5 Min", kern: ["12"],
          text: "Zwei Wörter stehen an der Tafel. Alle sprechen sie laut und hören auf das Ende. Ein Kind tippt an: reimt sich – reimt sich nicht.",
          folie: "Sprich beide Wörter laut. 👂\n\nKlingen sie **hinten gleich**?",
          fragen12: [
            ["🏠 Haus – 🐭 Maus", ["👍 reimt sich", "👎 reimt sich nicht"]],
            ["⚽ Ball – 🐟 Fisch", ["👎 reimt sich nicht", "👍 reimt sich"]],
            ["🌹 Rose – 👖 Hose", ["👍 reimt sich", "👎 reimt sich nicht"]],
            ["🐶 Hund – 👄 Mund", ["👍 reimt sich", "👎 reimt sich nicht"]],
            ["🌙 Mond – ⭐ Stern", ["👎 reimt sich nicht", "👍 reimt sich"]],
            ["🍰 Kuchen – 🔍 suchen", ["👍 reimt sich", "👎 reimt sich nicht"]]
          ],
          emoji: "👂", warum: "Reime hören heißt: genau aufs Ende hören." },
        { titel: "Reim-Zauber", fuer: "12", dauer: "5 Min", kern: ["12"],
          text: "Ein Wort steht an der Tafel. Welches der drei Wörter reimt sich darauf? Alle sprechen leise, ein Kind tippt an.",
          folie: "Welches Wort **reimt sich**? 🪄\n\nSprich alle Wörter leise vor dich hin.",
          fragen12: [
            ["Was reimt sich auf **Katze**?", ["Tatze", "Kater", "Maus"]],
            ["Was reimt sich auf **Stein**?", ["Bein", "Stern", "Stuhl"]],
            ["Was reimt sich auf **Fisch**?", ["Tisch", "Frosch", "Fuß"]],
            ["Was reimt sich auf **Wand**?", ["Sand", "Wind", "Wolke"]],
            ["Was reimt sich auf **Bett**?", ["nett", "Brot", "Bus"]],
            ["Was reimt sich auf **Hose**?", ["Dose", "Hase", "Socke"]]
          ],
          emoji: "🪄", warum: "Wir zaubern Reime." },
        { titel: "Verlängern: Was hörst du?", fuer: "34", dauer: "8 Min", kern: ["34"],
          text: "Am Wortende klingt b wie p, d wie t, g wie k. Darum: verlängern! Nomen → Mehrzahl (Korb → Kör-be), Verben → wir-Form (er lebt → wir le-ben), Adjektive → mit Nomen (wild → der wil-de Bär). Alle verlängern laut, dann tippt ein Kind den Buchstaben an.",
          folie: "Am Ende unsicher? **Verlängern!** 🔊\n\nKorb → Kör-**b**e · Hund → Hun-**d**e · Zug → Zü-**g**e",
          fragen34: [
            ["Kor**_** (Kör-?e)", ["b", "p"]],
            ["Hun**_** (Hun-?e)", ["d", "t"]],
            ["Zwer**_** (Zwer-?e)", ["g", "k"]],
            ["Bro**_** (Bro-?e)", ["t", "d"]],
            ["Wal**_** (Wäl-?er)", ["d", "t"]],
            ["Die**_** (Die-?e)", ["b", "p"]],
            ["Ber**_** (Ber-?e)", ["g", "k"]],
            ["er le**_**t (wir le-?en)", ["b", "p"]]
          ],
          emoji: "🔊", warum: "Verlängern macht leise Buchstaben hörbar." },
        { titel: "Verlängern im Satz", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Ein Satz steht an der Tafel, ein Wort ist unsicher. Alle verlängern das Wort laut – erst dann tippt ein Kind die richtige Schreibweise an.",
          folie: "Lies den Satz. Verlängere das unsichere Wort **laut**. 🔊\n\nWelche Schreibweise stimmt?",
          fragen34: [
            ["Im ___ wohnen Rehe und Füchse.", ["Wald", "Walt"]],
            ["Der ___ fährt pünktlich ab.", ["Zug", "Zuk"]],
            ["Mein Hund ist sehr ___.", ["lieb", "liep"]],
            ["Wir klettern auf den ___.", ["Berg", "Berk"]],
            ["Das ___ hat einen Platten.", ["Rad", "Rat"]],
            ["Der Hase ist schnell und ___.", ["wild", "wilt"]]
          ],
          emoji: "✍️", warum: "Wir nutzen den Trick beim Schreiben." }
    ],
    ab12: { titel: "Reime", aufgaben: [
        { typ: "zuordnen", text: "Was reimt sich? Verbinde.", links: ["[bild:haus]", "Hose", "Fisch"], rechts: ["Tisch", "[bild:maus]", "Rose"] },
        { typ: "luecken", text: "Finde ein Reimwort.", nur: "2", nummern: true, saetze: ["Hand – ___", "Bein – ___", "Kuchen – ___"] },
        { typ: "malen", text: "Male zwei Dinge, die sich reimen.", bild: "" }
    ]},
    ab34: { titel: "Verlängern", aufgaben: [
        { typ: "tabelle", text: "Verlängere und setze ein: b/p, d/t, g/k.", spalten: ["Wort", "verlängert", "richtig"], zeilen: [["Kor_", "Körbe", "Korb"], ["Hun_", "", ""], ["Zwer_", "", ""], ["Wal_", "", ""], ["Die_", "", ""], ["Ber_", "", ""]] },
        { typ: "luecken", text: "Setze richtig ein. Verlängere vorher!", nummern: true, saetze: ["Im Wal_ wohnen Rehe.", "Der Zu_ fährt ab.", "Mein Hund ist lie_.", "Das Ra_ hat einen Platten."] },
        { typ: "schreiben", text: "Finde drei eigene Wörter mit d, g oder b am Ende und schreibe die Verlängerung dazu.", zeilen: 3 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-abc-training",
    titel: "ABC & Nachschlagen",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Das ABC sicher kennen und Wörter nach dem ersten Buchstaben ordnen",
    ziel34: "Wörter nach dem 2. und 3. Buchstaben ordnen und im Wörterbuch die Grundform suchen",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.\nZum Ausdrucken für die Mappen (optional): siehe Arbeitsmaterial",
    warmup12: "ABC-Lied oder ABC im Chor sprechen",
    warmup34: "ABC rückwärts im Chor – von Z bis A",
    tafel: [
        { werkzeug: "abc", titel: "ABC-Reihe", fuer: "alle", einstellung: {} }
    ],
    lerntext12: { titel: "Das ABC", text: "A, B, C … Jeder Buchstabe hat seinen Platz." },
    lerntext34: { titel: "Nachschlagen", text: "Im Wörterbuch stehen die Wörter in der Grundform." },
    uebungen: [
        { titel: "ABC-Duell", fuer: "12", dauer: "6 Min", kern: ["12"],
          text: "Die Frage steht an der Tafel. Wer unsicher ist, sagt das ABC leise bis zu dem Buchstaben auf. Ein Kind tippt an.",
          folie: "Unsicher? Sag das ABC **leise** auf – bis du da bist. 🔤",
          fragen12: [
            ["Was kommt **nach** E?", ["F", "D", "G"]],
            ["Was kommt **vor** M?", ["L", "N", "K"]],
            ["Was kommt **nach** R?", ["S", "Q", "T"]],
            ["Was kommt **vor** C?", ["B", "D", "A"]],
            ["Was kommt **zwischen** G und I?", ["H", "J", "F"]],
            ["Was kommt **nach** T?", ["U", "S", "V"]]
          ],
          emoji: "🔤", warum: "Das ABC ist die Ordnung für alle Wörter." },
        { titel: "Wer steht vorne?", fuer: "12", dauer: "5 Min", kern: ["12"],
          text: "Drei Wörter stehen an der Tafel. Welches kommt im ABC zuerst? Tipp: Schau nur auf den ersten Buchstaben.",
          folie: "Welches Wort kommt im ABC **zuerst**? 🥇\n\nSchau auf den **ersten** Buchstaben.",
          fragen12: [
            ["Welches Wort kommt zuerst?", ["Apfel", "Hund", "Sonne"]],
            ["Welches Wort kommt zuerst?", ["Ball", "Maus", "Tisch"]],
            ["Welches Wort kommt zuerst?", ["Esel", "Igel", "Uhu"]],
            ["Welches Wort kommt zuerst?", ["Katze", "Nase", "Rose"]],
            ["Welches Wort kommt zuerst?", ["Dose", "Fisch", "Lampe"]],
            ["Welches Wort kommt zuerst?", ["Mond", "Pilz", "Zebra"]]
          ],
          emoji: "🥇", warum: "So sind Wörter im Wörterbuch sortiert." },
        { titel: "Wörterbuch-Profis", fuer: "34", dauer: "7 Min", kern: ["34"],
          text: "Gleicher Anfangsbuchstabe? Dann entscheidet der zweite – und wenn der auch gleich ist, der dritte. Ein Kind tippt das Wort an, das im Wörterbuch zuerst steht.",
          folie: "Gleicher Anfang? Dann entscheidet der **2.** – oder der **3.** Buchstabe! 📖\n\n**Ba**d · **Ba**ll · **Ba**um → d · l · u",
          fragen34: [
            ["Was steht zuerst?", ["Bad", "Ball", "Baum"]],
            ["Was steht zuerst?", ["Hafen", "Hemd", "Hose"]],
            ["Was steht zuerst?", ["Schaf", "Schere", "Schule"]],
            ["Was steht zuerst?", ["Strand", "Straße", "Strumpf"]],
            ["Was steht zuerst?", ["Kino", "Kirche", "Kissen"]],
            ["Was steht zuerst?", ["Tante", "Tanz", "Tasse"]]
          ],
          emoji: "📖", warum: "So findest du Wörter schnell im Wörterbuch." },
        { titel: "Grundform suchen", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Im Wörterbuch steht nicht „lief“ oder „Häuser“, sondern die Grundform: Verben in der Grundform (laufen), Nomen in der Einzahl (Haus), Adjektive ohne Endung (schnell). Ein Kind tippt an, unter welchem Wort man nachschlagen muss.",
          folie: "Im Wörterbuch steht die **Grundform**. 🔎\n\nlief → **laufen** · Häuser → **Haus** · schneller → **schnell**",
          fragen34: [
            ["Unter welchem Wort findest du **lief**?", ["laufen", "lief", "liefen"]],
            ["Unter welchem Wort findest du **Bäume**?", ["Baum", "Bäume", "Bäumchen"]],
            ["Unter welchem Wort findest du **größer**?", ["groß", "größer", "Größe"]],
            ["Unter welchem Wort findest du **fiel**?", ["fallen", "fiel", "Fell"]],
            ["Unter welchem Wort findest du **Mäuse**?", ["Maus", "Mäuse", "Mäuschen"]],
            ["Unter welchem Wort findest du **gesungen**?", ["singen", "gesungen", "Sänger"]]
          ],
          emoji: "🔎", warum: "Wer die Grundform kennt, findet jedes Wort." }
    ],
    ab12: { titel: "Das ABC", aufgaben: [
        { typ: "luecken", text: "Welcher Buchstabe fehlt?", nummern: true, saetze: ["A B ___ D", "K L ___ N", "R ___ T U", "W X ___ Z"] },
        { typ: "luecken", text: "Ordne nach dem ABC.", nur: "2", nummern: true, saetze: ["Hund, Apfel, Sonne → ___", "Tisch, Maus, Ball → ___"] },
        { typ: "malen", text: "Male etwas, das mit dem ersten Buchstaben deines Namens anfängt.", bild: "" }
    ]},
    ab34: { titel: "Wörterbuch-Profi", aufgaben: [
        { typ: "luecken", text: "Ordne nach dem ABC (2. oder 3. Buchstabe).", nummern: true, saetze: ["Baum, Bad, Ball → ___", "Schule, Schaf, Schere → ___", "Tasse, Tanz, Tante → ___"] },
        { typ: "tabelle", text: "Schreibe die Grundform – so steht das Wort im Wörterbuch.", spalten: ["Wort", "Grundform"], zeilen: [["lief", ""], ["Bäume", ""], ["größer", ""], ["gesungen", ""], ["Mäuse", ""]] },
        { typ: "schreiben", text: "Schlage drei Wörter im Wörterbuch nach und schreibe die Seitenzahl dazu.", zeilen: 3 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-wortarten",
    titel: "Groß oder klein? Nomen erkennen",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Nomen (Namenwörter) mit der Begleiter-Probe erkennen und großschreiben",
    ziel34: "Nomen, Verben und Adjektive mit Proben erkennen und Nomen im Satz großschreiben",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.",
    warmup12: "der, die oder das? – Begleiter-Blitz an der Tafel",
    warmup34: "der, die oder das? – Begleiter-Blitz an der Tafel",
    tafel: [
        { werkzeug: "begleiter", titel: "der, die oder das?", fuer: "12", einstellung: {} },
        { werkzeug: "wortarten", titel: "Wortarten sortieren", fuer: "34", einstellung: {} }
    ],
    lerntext12: { titel: "Die Begleiter-Probe", text: "Kann ich der, die oder das davor sagen? Dann schreibe ich groß." },
    lerntext34: { titel: "Die Wortarten-Proben", text: "der/die/das … → Nomen · ich … → Verb · ganz … → Adjektiv" },
    uebungen: [
        { titel: "Groß oder klein?", fuer: "12", dauer: "7 Min", kern: ["12"],
          text: "Ein Wort steht an der Tafel. Alle machen die Begleiter-Probe laut: „der …? die …? das …?“ Passt ein Begleiter, schreibt man groß. Ein Kind tippt an.",
          folie: "Mach die **Begleiter-Probe**: der? die? das? 🏷️\n\nPasst einer → **groß**. Passt keiner → **klein**.",
          fragen12: [
            ["hund", ["groß: Hund", "klein: hund"]],
            ["laufen", ["klein: laufen", "groß: Laufen"]],
            ["sonne", ["groß: Sonne", "klein: sonne"]],
            ["rot", ["klein: rot", "groß: Rot"]],
            ["tisch", ["groß: Tisch", "klein: tisch"]],
            ["springen", ["klein: springen", "groß: Springen"]],
            ["blume", ["groß: Blume", "klein: blume"]],
            ["schnell", ["klein: schnell", "groß: Schnell"]]
          ],
          emoji: "🏷️", warum: "Mit der Probe weißt du es sicher." },
        { titel: "Welches ist das Nomen?", fuer: "12", dauer: "5 Min", kern: ["12"],
          text: "Drei Wörter stehen an der Tafel – nur eins ist ein Namenwort. Alle machen leise die Begleiter-Probe. Ein Kind tippt an.",
          folie: "Nur **ein** Wort ist ein Namenwort. 🔍\n\nDer Begleiter verrät es!",
          fragen12: [
            ["Welches Wort ist ein Namenwort?", ["Ball", "rund", "rollen"]],
            ["Welches Wort ist ein Namenwort?", ["Katze", "weich", "schlafen"]],
            ["Welches Wort ist ein Namenwort?", ["Auto", "fahren", "schnell"]],
            ["Welches Wort ist ein Namenwort?", ["Apfel", "rot", "essen"]],
            ["Welches Wort ist ein Namenwort?", ["Haus", "groß", "wohnen"]],
            ["Welches Wort ist ein Namenwort?", ["Lehrerin", "lesen", "nett"]]
          ],
          emoji: "🔍", warum: "Namenwörter erkennen – dann klappt die Großschreibung." },
        { titel: "Wortarten-Proben", fuer: "34", dauer: "7 Min", kern: ["34"],
          text: "Ein Wort steht an der Tafel. Alle probieren laut die drei Proben: „der/die/das …“ (Nomen) – „ich …“ (Verb) – „ganz …“ (Adjektiv). Welche passt? Ein Kind tippt an.",
          folie: "Drei Proben: 🧪\n\n**der/die/das …** → Nomen · **ich …** → Verb · **ganz …** → Adjektiv",
          fragen34: [
            ["Freude", ["Nomen", "Verb", "Adjektiv"]],
            ["schwimmen", ["Verb", "Nomen", "Adjektiv"]],
            ["mutig", ["Adjektiv", "Nomen", "Verb"]],
            ["Angst", ["Nomen", "Adjektiv", "Verb"]],
            ["erzählen", ["Verb", "Nomen", "Adjektiv"]],
            ["dunkel", ["Adjektiv", "Verb", "Nomen"]],
            ["Geburtstag", ["Nomen", "Verb", "Adjektiv"]],
            ["vergessen", ["Verb", "Adjektiv", "Nomen"]]
          ],
          emoji: "🧪", warum: "Proben statt Raten." },
        { titel: "Fehler im Satz", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Ein Satz steht an der Tafel, ein Wort ist falsch geschrieben (groß/klein). Alle lesen leise und machen bei verdächtigen Wörtern die Probe. Ein Kind tippt das falsche Wort an.",
          folie: "Ein Wort ist **falsch** geschrieben – groß oder klein. 🕵️\n\nMach die Probe!",
          fragen34: [
            ["Am Morgen trinkt Tom einen **kakao**.", ["kakao", "Morgen", "trinkt"]],
            ["Meine Schwester **Spielt** gern Fußball.", ["Spielt", "Schwester", "Fußball"]],
            ["Im **winter** bauen wir einen Schneemann.", ["winter", "bauen", "Schneemann"]],
            ["Der Hund hat ein **Weiches** Fell.", ["Weiches", "Hund", "Fell"]],
            ["Nach der Schule mache ich meine **hausaufgaben**.", ["hausaufgaben", "Schule", "mache"]],
            ["Lena hat heute große **Angst** vor dem **Test**.", ["Alles richtig!", "Angst", "Test"]]
          ],
          emoji: "🕵️", warum: "Beim Kontrollieren helfen die Proben." }
    ],
    ab12: { titel: "Groß oder klein?", aufgaben: [
        { typ: "tabelle", text: "Mach die Begleiter-Probe. Groß oder klein? Kreuze an.", spalten: ["Wort", "groß", "klein"], zeilen: [["hund", "", ""], ["laufen", "", ""], ["sonne", "", ""], ["rot", "", ""], ["tisch", "", ""]] },
        { typ: "luecken", text: "Schreibe mit Begleiter.", nur: "2", nummern: true, saetze: ["___ Ball", "___ Katze", "___ Auto"] },
        { typ: "malen", text: "Male drei Namenwörter und schreibe den Begleiter dazu.", bild: "" }
    ]},
    ab34: { titel: "Wortarten-Proben", aufgaben: [
        { typ: "tabelle", text: "Mach die Proben und sortiere.", spalten: ["Wort", "Nomen", "Verb", "Adjektiv"], zeilen: [["Freude", "", "", ""], ["schwimmen", "", "", ""], ["mutig", "", "", ""], ["Angst", "", "", ""], ["erzählen", "", "", ""], ["dunkel", "", "", ""]] },
        { typ: "luecken", text: "Schreibe die Sätze richtig ab.", nummern: true, saetze: ["im winter bauen wir einen schneemann. → ___", "der hund hat ein weiches fell. → ___"] },
        { typ: "schreiben", text: "Schreibe einen Satz mit einem Nomen, einem Verb und einem Adjektiv.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-satz-baumeister",
    titel: "Sätze bauen & Satzzeichen",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Wörter zu einem sinnvollen Satz ordnen; Satzanfang groß, am Ende ein Punkt",
    ziel34: "Aussage-, Frage- und Ausrufesätze erkennen und das passende Satzzeichen setzen",
    material: "Alles kommt über die Tafel – du brauchst nichts extra.",
    warmup12: "Stimmt das? Unsinn-Sätze",
    warmup34: "Satzzeichen-Blitz: Punkt, Fragezeichen oder Ausrufezeichen?",
    lerntext12: { titel: "Ein Satz", text: "Groß anfangen – sinnvoll ordnen – Punkt am Ende." },
    lerntext34: { titel: "Satzzeichen", text: "Aussage → Punkt · Frage → Fragezeichen · Ausruf/Aufforderung → Ausrufezeichen" },
    uebungen: [
        { titel: "Welcher Satz stimmt?", fuer: "12", dauer: "7 Min", kern: ["12"],
          text: "Drei Sätze stehen an der Tafel – nur einer ist richtig gebaut. Alle lesen leise. Ein Kind tippt den richtigen Satz an und liest ihn laut vor.",
          folie: "Lies alle drei Sätze. 🧱\n\nWelcher ist **richtig** gebaut?",
          fragen12: [
            ["Welcher Satz stimmt?", ["Tom spielt Ball.", "Ball spielt Tom.", "Spielt Ball Tom."]],
            ["Welcher Satz stimmt?", ["Die Katze schläft.", "Schläft die Katze die.", "Katze die schläft."]],
            ["Welcher Satz stimmt?", ["Mia malt ein Bild.", "Ein Bild malt Mia Mia.", "Malt Mia Bild ein."]],
            ["Welcher Satz stimmt?", ["Der Hund bellt laut.", "Laut Hund der bellt.", "Bellt der laut Hund."]],
            ["Welcher Satz ist richtig geschrieben?", ["Wir gehen in den Zoo.", "wir gehen in den Zoo.", "Wir gehen in den Zoo"]],
            ["Welcher Satz ist richtig geschrieben?", ["Papa kocht Nudeln.", "papa kocht Nudeln.", "Papa kocht Nudeln"]]
          ],
          emoji: "🧱", warum: "Ein Satz braucht die richtige Reihenfolge." },
        { titel: "Welches Zeichen?", fuer: "alle", dauer: "6 Min", kern: ["34"],
          text: "Ein Satz ohne Satzzeichen steht an der Tafel. Du liest ihn mit passender Betonung vor (Kl. 3/4 lesen selbst). Ein Kind tippt das passende Zeichen an.",
          folie: "Welches Satzzeichen fehlt? 🎯\n\n**.** erzählt · **?** fragt · **!** ruft oder fordert auf",
          fragen12: [
            ["Kommst du mit ins Kino", ["?", ".", "!"]],
            ["Heute ist Montag", [".", "?", "!"]],
            ["Pass auf", ["!", ".", "?"]],
            ["Wie heißt du", ["?", ".", "!"]]
          ],
          fragen34: [
            ["Kommst du mit ins Kino", ["?", ".", "!"]],
            ["Pass auf, da kommt ein Auto", ["!", ".", "?"]],
            ["Heute ist Mittwoch", [".", "?", "!"]],
            ["Wie spät ist es", ["?", ".", "!"]],
            ["Räum sofort dein Zimmer auf", ["!", ".", "?"]],
            ["Wann beginnt das Fußballspiel", ["?", ".", "!"]],
            ["Morgen fahren wir ans Meer", [".", "?", "!"]],
            ["Hilfe, mein Fahrrad ist weg", ["!", "?", "."]]
          ],
          emoji: "🎯", warum: "Das Satzzeichen zeigt, wie ein Satz gemeint ist." },
        { titel: "Frage-Profis", fuer: "34", dauer: "6 Min", kern: ["34"],
          text: "Ein Aussagesatz steht an der Tafel. Welche Frage passt dazu? Ein Kind tippt an. Danach: Woran erkennst du eine Frage? (Fragewort oder Verb vorn, Fragezeichen)",
          folie: "Welche **Frage** passt zum Satz? ❓\n\nTipp: Fragewörter – wer · was · wann · wo · warum · wie",
          fragen34: [
            ["**Lena wohnt in Leipzig.**", ["Wo wohnt Lena?", "Wann wohnt Lena?", "Wer wohnt in Lena?"]],
            ["**Das Spiel beginnt um 3 Uhr.**", ["Wann beginnt das Spiel?", "Wo beginnt das Spiel?", "Warum beginnt das Spiel?"]],
            ["**Max weint, weil er hingefallen ist.**", ["Warum weint Max?", "Wer ist Max?", "Wo weint Max?"]],
            ["**Opa repariert das Fahrrad.**", ["Was repariert Opa?", "Wann repariert Opa?", "Wo ist das Fahrrad?"]],
            ["**Die Katze schläft auf dem Sofa.**", ["Wo schläft die Katze?", "Wie heißt die Katze?", "Wann schläft die Katze?"]],
            ["**Paula fährt mit dem Bus zur Schule.**", ["Wie fährt Paula zur Schule?", "Wann fährt Paula?", "Wer ist Paula?"]]
          ],
          emoji: "❓", warum: "Gute Fragen helfen beim Lesen und Schreiben." }
    ],
    ab12: { titel: "Sätze bauen", aufgaben: [
        { typ: "luecken", text: "Ordne die Wörter zu einem Satz.", nummern: true, saetze: ["Ball. – Tom – spielt → ___", "schläft. – Katze – Die → ___"] },
        { typ: "luecken", text: "Setze den Punkt und schreibe den Anfang groß.", nur: "2", nummern: true, saetze: ["wir gehen in den Zoo → ___", "papa kocht Nudeln → ___"] },
        { typ: "malen", text: "Male: Der Hund spielt mit dem Ball.", bild: "" }
    ]},
    ab34: { titel: "Satzzeichen", aufgaben: [
        { typ: "luecken", text: "Setze das richtige Satzzeichen.", nummern: true, saetze: ["Kommst du mit ins Kino ___", "Pass auf, da kommt ein Auto ___", "Morgen fahren wir ans Meer ___", "Wann beginnt das Spiel ___"] },
        { typ: "luecken", text: "Schreibe eine passende Frage.", nummern: true, saetze: ["Lena wohnt in Leipzig. → ___", "Max weint, weil er hingefallen ist. → ___"] },
        { typ: "schreiben", text: "Schreibe je einen Satz mit . ? und !", zeilen: 3 }
    ]}
})
];
