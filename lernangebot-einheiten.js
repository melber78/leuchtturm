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

/* ============================== DEUTSCH: LESEN ============================== */
SOZIAL_EINHEIT({
    id: "l-silben-schwingen",
    titel: "Silben-Schwingen",
    kategorie: "Deutsch: Lesen",
    ziel12: "Wörter in Silben klatschen und die Silben zählen",
    ziel34: "Lange Wörter sicher in Silben zerlegen und richtig trennen",
    material: "Rote und grüne Karten, Zahlenkarten 1–4 (Universal-Set)\nBildkarten „Silben“ (unter Arbeitsmaterial)",
    materialIds: ["lern-silben-bildkarten"],
    warmup12: "Namen klatschen – jedes Kind klatscht seinen Vornamen in Silben, alle machen nach",
    warmup34: "Blitzlesen an der Tafel (lange Wörter)",
    tafel: [
        { werkzeug: "silben", titel: "Silben zählen mit Bildern", fuer: "12", einstellung: {} },
        { werkzeug: "blitzlesen", titel: "Blitzlesen: lange Wörter", fuer: "34", einstellung: { art: "woerter34" } }
    ],
    lerntext12: { titel: "Der Silben-Roboter", text:
`Im Klassenzimmer steht ein kleiner Roboter. Er heißt Robo. Robo kann sprechen – aber nur ganz langsam.

Wenn Robo „Banane“ sagt, dann klingt das so: „Ba – na – ne.“ Bei jedem Stück klatscht er einmal in die Hände.

„Warum sprichst du so komisch?“, fragt Mia. Robo blinkt. „Ich spreche in Silben! So kann ich jedes Wort genau hören.“

Mia probiert es aus: „Scho – ko – la – de!“ Vier Mal klatschen! Robo leuchtet grün vor Freude.

**Nach dem Vorlesen:**
1. Wie spricht Robo?
2. Wie oft klatscht Robo bei „Banane“?
3. Sprecht alle zusammen wie Robo: Ba – na – ne. Klatscht dazu!` },
    lerntext34: { titel: "Die Nachricht im Funkgerät", text:
`Ben und Aylin spielen Agenten. Ihr Funkgerät rauscht – jedes Wort kommt nur in Stücken an: „Ge – heim – ver – steck … hin – ter … der … Turn – hal – le.“

„Das sind Silben!“, ruft Aylin. „Wir müssen sie nur zusammensetzen.“

Ben schreibt mit. Jedes Stück bekommt einen Bogen unter dem Wort. „Geheimversteck hat vier Silben. Turnhalle hat drei.“

Am Zeilenende reicht der Platz nicht. Aylin trennt das Wort einfach zwischen zwei Silben: „Turn-“ in die eine Zeile, „halle“ in die nächste. Passt!

**Fragen zum Gespräch:**
1. Wie viele Silben hat „Geheimversteck“?
2. Wo darf man ein Wort am Zeilenende trennen?
3. Welches lange Wort fällt dir ein? Klatsche es in Silben.` },
    uebungen: [
        { titel: "Klatsch-Quiz", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst ein Wort. Alle sprechen es in Silben und klatschen leise mit. Dann zeigt jedes Kind mit der Zahlenkarte, wie viele Silben es sind. Erst wenn alle Karten oben sind, löst du auf.\n- Sonne\n- Banane\n- Hund\n- Elefant\n- Tomate\n- Schokolade",
          text12: "Du zeigst ein Bild und sagst das Wort. Alle sprechen es in Silben und klatschen leise mit. Dann zeigt jedes Kind mit der Zahlenkarte, wie viele Silben es sind. Erst wenn alle Karten oben sind, löst du auf.\n- Sonne\n- Banane\n- Hund\n- Elefant\n- Tomate\n- Maus",
          text34: "Du zeigst ein Wort. Alle sprechen es in Silben und klatschen leise mit. Dann zeigt jedes Kind mit der Zahlenkarte, wie viele Silben es sind. Erst wenn alle Karten oben sind, löst du auf.\n- Schokolade\n- Klassenzimmer\n- Regenbogen\n- Fußball\n- Marienkäfer\n- Bushaltestelle",
          quiz: "zahlen",
          antworten: ["1️⃣ eine", "2️⃣ zwei", "3️⃣ drei", "4️⃣ vier"],
          loesungen12: ["2", "3", "1", "3", "3", "1"],
          loesungen34: ["4", "4", "4", "2", "4", "4"],
          folie: "Sprich das Wort in **Silben** und klatsche mit. 👏\n\nWie viele Silben? Zeig deine **Zahlenkarte**!",
          emoji: "👏", warum: "Wir hören, aus wie vielen Stücken ein Wort besteht." },
        { titel: "Silben-Roboter", fuer: "12", dauer: "5 Min",
          text: "Ein Kind zieht verdeckt eine Bildkarte und spricht das Wort wie ein Roboter (in Silben, mit abgehackten Roboter-Bewegungen). Die anderen raten, was auf der Karte ist. Wer richtig rät, darf als Nächstes ziehen.",
          folie: "🤖 Sprich wie ein Roboter: **Ba – na – ne**.\n\nDie anderen raten das Wort!",
          emoji: "🤖", warum: "Wer gut zuhört, erkennt das Wort." },
        { titel: "Trenn-Profis", fuer: "34", dauer: "5 Min",
          text: "Du schreibst drei lange Wörter an die Tafel. Die Kinder schreiben sie auf einen Zettel und setzen Silbenbögen darunter. Dann kommt je ein Kind nach vorn und trennt ein Wort an der Tafel mit Strichen: Fahr|rad|helm. Tipp: Wenn zwei gleiche Buchstaben zusammenstehen, wird dazwischen getrennt (Son-ne, Mut-ter).",
          folie: "Schreib die Wörter ab und zeichne **Silbenbögen** darunter. ⌒⌒⌒\n\nDoppelte Buchstaben? Dazwischen trennen: **Son-ne**",
          emoji: "✂️", warum: "So trennst du Wörter am Zeilenende richtig." }
    ],
    ab12: { titel: "Silben-Schwingen", aufgaben: [
        { typ: "tabelle", text: "Sprich das Wort in Silben. Wie viele Silben? Kreuze an.", spalten: ["Bild", "1", "2", "3"], zeilen: [["[bild:hund]", "", "", ""], ["[bild:banane]", "", "", ""], ["[bild:sonne]", "", "", ""], ["[bild:elefant]", "", "", ""], ["[bild:maus]", "", "", ""], ["[bild:tomate]", "", "", ""]] },
        { typ: "zuordnen", text: "Verbinde jedes Bild mit der passenden Silbenzahl.", nur: "1", links: ["[bild:katze]", "[bild:fisch]", "[bild:rakete]"], rechts: ["●", "● ●", "● ● ●"] },
        { typ: "luecken", text: "Schreibe das Wort und male Silbenbögen darunter.", nummern: true, saetze: ["[bild:auto] ___", "[bild:igel] ___", "[bild:tomate] To – ma – ___"] },
        { typ: "malen", text: "Male etwas mit drei Silben.", bild: "" }
    ]},
    ab34: { titel: "Silben-Profis", aufgaben: [
        { typ: "tabelle", text: "Zerlege die Wörter in Silben und zähle sie.", spalten: ["Wort", "in Silben", "Anzahl"], zeilen: [["Schokolade", "", ""], ["Regenbogen", "", ""], ["Turnhalle", "", ""], ["Marienkäfer", "", ""], ["Hausaufgaben", "", ""], ["Fußballspiel", "", ""]] },
        { typ: "luecken", text: "Setze die Silben zu Wörtern zusammen.", nummern: true, saetze: ["Ge – burts – tag → ___", "Schmet – ter – ling → ___", "Kin – der – gar – ten → ___", "Ta – schen – lam – pe → ___"] },
        { typ: "luecken", text: "Trenne die Wörter am Zeilenende – setze den Strich an die richtige Stelle.", nummern: true, saetze: ["Sonne → ___", "Fenster → ___", "Mutter → ___", "Schule → ___"] },
        { typ: "schreiben", text: "Finde selbst das längste Wort, das du kennst. Schreibe es in Silben auf.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-anlaut-detektive",
    titel: "Anlaut-Detektive",
    kategorie: "Deutsch: Lesen",
    ziel12: "Den ersten Laut eines Wortes hören und dem Buchstaben zuordnen",
    ziel34: "Laute am Anfang, in der Mitte und am Ende eines Wortes genau hören",
    material: "Rote und grüne Karten (Universal-Set)\nAnlaut-Bildkarten (unter Arbeitsmaterial), evtl. Anlauttabelle der Klasse",
    materialIds: ["lern-anlaut-karten"],
    warmup12: "Ich sehe was, was du nicht siehst – und das fängt mit M an",
    warmup34: "Blitzrunde: Wörter, die mit „Sch“ anfangen – wer findet in 1 Minute die meisten?",
    tafel: [
        { werkzeug: "anlaute", titel: "Anlaut-Raten mit Bildern", fuer: "12", einstellung: { modus: "auswahl" } },
        { werkzeug: "anlaute", titel: "Anlaut schnell nennen", fuer: "34", einstellung: { modus: "blitz" } }
    ],
    lerntext12: { titel: "Detektiv Mo und das M", text:
`Detektiv Mo hat eine Lupe. Damit findet er alles. Heute sucht er Dinge, die mit **M** anfangen.

Er schaut unter den Tisch – da sitzt eine **Maus**! „Mmmmaus“, sagt Mo. „Das fängt mit M an!“

Er schaut aus dem Fenster – da scheint der **Mond**. „Mmmmond. Auch mit M!“

Dann sieht er einen **Hund**. „Hhhhund …“ Mo schüttelt den Kopf. „Nein, der fängt nicht mit M an.“

**Nach dem Vorlesen:**
1. Was hat Mo gefunden, das mit M anfängt?
2. Warum passt der Hund nicht?
3. Wer findet im Klassenzimmer etwas mit M?` },
    lerntext34: { titel: "Der verschwundene Buchstabe", text:
`Auf dem Schulhof liegt ein Zettel. Darauf steht: „Treffpunkt am _ußballplatz um _ier Uhr. Bring den _all mit!“

Lena runzelt die Stirn. „Hier fehlen immer die Anfangsbuchstaben.“ Tarik grinst: „Kein Problem. Wir sprechen die Wörter laut – dann hören wir, was fehlt.“

Fff-ußballplatz. Vvv-ier – nein, das schreibt man mit V! Und Bbb-all.

„Aber Achtung“, sagt Lena. „Man hört nicht immer genau, wie man schreibt. Bei vier hört man F – aber man schreibt V.“

**Fragen zum Gespräch:**
1. Welche Buchstaben fehlen auf dem Zettel?
2. Warum ist „vier“ eine Falle?
3. Welche Wörter kennst du noch, die man anders schreibt, als man sie hört?` },
    uebungen: [
        { titel: "Anlaut-Ampel", fuer: "12", dauer: "8 Min", kern: ["12"],
          text: "Du sagst einen Buchstaben-Laut (z. B. „Mmm“) und dann Wörter. Fängt das Wort mit dem Laut an, heben die Kinder die grüne Karte, sonst die rote.\n- Maus\n- Mond\n- Hund\n- Messer\n- Sonne\n- Mama",
          quiz: "ampel", loesungen: ["1", "1", "2", "1", "2", "1"],
          folie: "Hör genau hin: Fängt das Wort mit **M** an?\n\n🟢 ja · 🔴 nein",
          emoji: "🕵️", warum: "Wir hören den ersten Laut im Wort." },
        { titel: "Wo steckt der Laut?", fuer: "34", dauer: "8 Min", kern: ["34"],
          text: "Du nennst einen Laut (z. B. „L“) und ein Wort. Die Kinder zeigen mit der Zahlenkarte, wo sie den Laut hören: 1 = am Anfang, 2 = in der Mitte, 3 = am Ende.\n- Lampe (L)\n- Ball (L)\n- Igel (L)\n- Rose (R)\n- Tür (R)\n- Garten (R)",
          antworten: ["1️⃣ Anfang", "2️⃣ Mitte", "3️⃣ Ende"], loesungen: ["1", "3", "3", "1", "3", "2"],
          folie: "Wo hörst du den Laut?\n\n1️⃣ Anfang · 2️⃣ Mitte · 3️⃣ Ende",
          emoji: "👂", warum: "Wer genau hört, schreibt richtig." },
        { titel: "Anlaut-Kette", fuer: "alle", dauer: "5 Min",
          text: "Ein Kind sagt ein Wort. Das nächste Kind sagt ein Wort, das mit dem letzten Laut des vorherigen Wortes anfängt (Maus → Sonne → Esel …). Kl. 1/2 dürfen auch nur Wörter mit dem gleichen Anfangslaut sagen.",
          folie: "Maus → **S**onne → **E**sel → **L**öwe …\n\nDas neue Wort fängt mit dem **letzten Laut** an!",
          emoji: "🔗", warum: "Ein Wortspiel zum Hören." }
    ],
    ab12: { titel: "Anlaut-Detektive", aufgaben: [
        { typ: "ankreuzen", text: "Kreuze alle Bilder an, die mit M anfangen.", nebeneinander: true, optionen: ["[bild:maus]", "[bild:hund]", "[bild:mond]", "[bild:melone]", "[bild:sonne]", "[bild:mais]"] },
        { typ: "zuordnen", text: "Verbinde das Bild mit seinem Anfangsbuchstaben.", nur: "1", links: ["[bild:auto]", "[bild:sonne]", "[bild:igel]", "[bild:lama]"], rechts: ["L", "A", "I", "S"] },
        { typ: "tabelle", text: "Schreibe den Anfangsbuchstaben.", nur: "", spalten: ["Bild", "Buchstabe"], zeilen: [["[bild:tiger]", ""], ["[bild:rose]", ""], ["[bild:nudeln]", ""], ["[bild:ente]", ""], ["[bild:ufo]", ""], ["[bild:fisch]", ""]] },
        { typ: "schreiben", text: "Schreibe zwei Wörter, die mit M anfangen.", zeilen: 2 }
    ]},
    ab34: { titel: "Laut-Detektive", aufgaben: [
        { typ: "luecken", text: "Ergänze den fehlenden Anfangsbuchstaben.", nummern: true, saetze: ["___ußball   ___ier   ___ogel", "___uppe   ___isch   ___ater", "___rot   ___aum   ___ase"] },
        { typ: "tabelle", text: "Wo hörst du das L? Kreuze an.", kreuz: [1, 2, 3], spalten: ["Wort", "Anfang", "Mitte", "Ende"], zeilen: [["Lampe", "", "", ""], ["Ball", "", "", ""], ["Salat", "", "", ""], ["Igel", "", "", ""], ["Löwe", "", "", ""], ["Wolke", "", "", ""]] },
        { typ: "luecken", text: "Hört man F oder schreibt man V? Ergänze.", nummern: false, saetze: ["___ater   ___ogel   ___euer   ___ier   ___isch   ___orsicht"] },
        { typ: "schreiben", text: "Finde drei Wörter mit „Sch“ am Anfang.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-lesen-malen",
    titel: "Lesen & Malen",
    kategorie: "Deutsch: Lesen",
    ziel12: "Kurze Wörter (Kl. 1: Bilder und Anlaute) lesen und passend malen",
    ziel34: "Genau lesen: Mal-Aufträge Schritt für Schritt umsetzen",
    material: "Buntstifte",
    ohneVorbereitung: true,
    warmup12: "Blitzlesen: Silben (ma, mi, mo …) – alle lesen im Chor",
    warmup34: "Blitzlesen: Sätze – wer kann den Satz nach 3 Sekunden wiederholen?",
    tafel: [
        { werkzeug: "blitzlesen", titel: "Blitzlesen: Silben", fuer: "12", einstellung: { art: "silben12" } },
        { werkzeug: "blitzlesen", titel: "Blitzlesen: Wörter Kl. 1/2", fuer: "12", einstellung: { art: "woerter12" } },
        { werkzeug: "blitzlesen", titel: "Blitzlesen: Sätze Kl. 3/4", fuer: "34", einstellung: { art: "saetze34" } }
    ],
    lerntext12: { titel: "Das leere Bild", text:
`Lotte hat ein großes, leeres Blatt. „Was soll ich malen?“, fragt sie.

Da kommt ein Zettel geflogen. Darauf steht nur ein Wort: **Sonne**. Lotte liest und malt eine gelbe Sonne.

Dann kommt noch ein Zettel: **Haus**. Lotte malt ein Haus unter die Sonne.

Und noch einer: **Hund**. Ein kleiner Hund kommt vor das Haus.

Am Ende ist das Blatt voll. „Lesen ist wie Zaubern“, sagt Lotte. „Ein Wort – und schon ist ein Bild da!“

**Nach dem Vorlesen:**
1. Was stand auf den Zetteln?
2. Was hat Lotte gemalt?
3. Welches Wort würdest du gern malen?` },
    lerntext34: { titel: "Die Schatzkarte", text:
`Jonas hat eine alte Schatzkarte gefunden. Aber es ist keine Zeichnung – nur Text: „Male einen großen Baum in die Mitte. Rechts neben den Baum kommt ein Felsen. Unter den Felsen malst du ein rotes Kreuz. Da liegt der Schatz.“

Jonas malt schnell los. Baum, Felsen, Kreuz – fertig! Doch seine Schwester lacht: „Dein Kreuz ist ja links! Und es ist blau!“

Jonas liest noch einmal – diesmal ganz genau. Wort für Wort. „Okay … rechts. Rot. Unter dem Felsen.“

**Fragen zum Gespräch:**
1. Was hat Jonas beim ersten Mal falsch gemacht?
2. Warum ist genaues Lesen bei einer Schatzkarte so wichtig?
3. Wo im Alltag musst du ganz genau lesen? (Rezept, Spielregel, Bauanleitung …)` },
    uebungen: [
        { titel: "Lies und zeig", fuer: "12", dauer: "8 Min", kern: ["12"],
          text: "Du zeigst ein Wort an der Tafel (Blitzlesen). Kl. 2 liest leise, Kl. 1 schaut auf den ersten Buchstaben. Alle zeigen dann ohne zu reden pantomimisch, was das Wort ist (Hund: bellen, Auto: lenken, Eis: schlecken). Du sagst das Wort zur Kontrolle laut.\n- Hund\n- Auto\n- Eis\n- Ball\n- Maus\n- Sonne",
          quiz: "karten",
          folie: "Lies das Wort. 👀\n\nZeig **ohne Worte**, was es ist!",
          emoji: "👀", warum: "Wir lesen und zeigen, was wir verstanden haben." },
        { titel: "Genau-Leser", fuer: "34", dauer: "8 Min", kern: ["34"],
          text: "Du zeigst Sätze. Stimmt der Satz zum Bild an der Tafel? Male dafür vorher ein einfaches Bild an die Tafel: ein Haus, links ein Baum, auf dem Dach ein Vogel, rechts eine Sonne. Die Kinder heben grün (stimmt) oder rot (stimmt nicht).\n- Der Baum steht links neben dem Haus.\n- Die Sonne ist links.\n- Auf dem Dach sitzt ein Vogel.\n- Unter dem Baum liegt ein Ball.",
          quiz: "ampel", loesungen: ["1", "2", "1", "2"],
          folie: "Lies genau: Stimmt der Satz zum Bild?\n\n🟢 stimmt · 🔴 stimmt nicht",
          emoji: "🔍", warum: "Ein Wort kann alles verändern." }
    ],
    ab12: { titel: "Lesen & Malen", aufgaben: [
        { typ: "zuordnen", text: "Verbinde das Bild mit dem Anfangsbuchstaben.", nur: "1", links: ["[bild:sonne]", "[bild:haus]", "[bild:mond]"], rechts: ["M", "S", "H"] },
        { typ: "zuordnen", text: "Lies und verbinde.", nur: "2", links: ["Sonne", "Haus", "Mond", "Eis"], rechts: ["[bild:eis]", "[bild:mond]", "[bild:sonne]", "[bild:haus]"] },
        { typ: "malen", text: "Male: eine Sonne, ein Haus und einen Hund.", bild: "" }
    ]},
    ab34: { titel: "Genau lesen – genau malen", aufgaben: [
        { typ: "malen", text: "Lies jeden Satz genau und male: 1. Male einen großen Baum in die Mitte. 2. Links neben den Baum kommt ein kleines Haus mit rotem Dach. 3. Auf den Baum malst du drei Äpfel. 4. Rechts unten liegt ein blauer Ball. 5. Am Himmel fliegen zwei Vögel.", bild: "" },
        { typ: "ankreuzen", text: "Kontrolle: Was hast du gemalt? Kreuze an.", nebeneinander: true, optionen: ["drei Äpfel", "ein grünes Dach", "einen blauen Ball", "zwei Vögel"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-lese-detektive",
    titel: "Lese-Detektive: Unsinn gesucht!",
    kategorie: "Deutsch: Lesen",
    ziel12: "Merken, ob ein Wort oder Satz zum Bild passt",
    ziel34: "Unsinn in Sätzen finden und Fragen zu einem kurzen Text beantworten",
    material: "Rote und grüne Karten (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Stimmt das? Du sagst Sätze („Ein Fisch kann fliegen.“), die Kinder zeigen Daumen hoch oder runter",
    warmup34: "Blitzlesen: Sätze",
    tafel: [{ werkzeug: "blitzlesen", titel: "Blitzlesen: Sätze", fuer: "34", einstellung: { art: "saetze34" } }],
    lerntext12: { titel: "Die verrückte Zeitung", text:
`Opa liest Zeitung. Plötzlich lacht er laut.

„Hört mal! Hier steht: Die Kuh fliegt über das Dach.“ Die Kinder kichern. „Eine Kuh kann doch nicht fliegen!“

„Und hier: Der Fisch fährt Fahrrad.“ – „Quatsch!“, rufen alle.

„Und hier: Der Hund bellt.“ Die Kinder überlegen. „Das stimmt!“

Opa zwinkert. „Ihr seid echte Lese-Detektive. Ihr merkt sofort, wenn etwas Unsinn ist.“

**Nach dem Vorlesen:**
1. Was war Unsinn in der Zeitung?
2. Welcher Satz hat gestimmt?
3. Erfinde selbst einen Unsinn-Satz!` },
    lerntext34: { titel: "Fake News auf dem Schulhof", text:
`In der Pause geht ein Gerücht herum: „Morgen fällt die Schule aus, weil im Keller ein Krokodil wohnt!“

Emil glaubt es sofort. Sara nicht. „Lies doch mal den Aushang an der Tür“, sagt sie.

Auf dem Aushang steht: „Morgen findet der Sporttag statt. Bitte Turnschuhe und Trinkflasche mitbringen.“ Von einem Krokodil steht da nichts.

„Siehst du“, sagt Sara. „Wer genau liest, fällt nicht auf jeden Quatsch rein.“

**Fragen zum Gespräch:**
1. Was war das Gerücht?
2. Was stand wirklich auf dem Aushang?
3. Woran merkst du, dass etwas nicht stimmen kann?` },
    uebungen: [
        { titel: "Stimmt das?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst Sätze. Die Kinder lesen (Kl. 1 hört zu) und heben grün, wenn der Satz stimmen kann, rot bei Unsinn.\n- Der Hund bellt.\n- Die Kuh fliegt.\n- Im Winter schneit es.\n- Ein Fisch fährt Fahrrad.\n- Die Sonne scheint am Tag.\n- Die Maus ist größer als der Elefant.",
          text34: "Du zeigst Sätze. Die Kinder lesen leise und heben grün, wenn der Satz stimmen kann, rot bei Unsinn. Bei Rot: Wer kann den Satz richtig machen?\n- Im Sommer trägt Lea dicke Handschuhe gegen die Hitze.\n- Nach dem Regen sind die Straßen nass.\n- Der Bäcker backt in der Nacht frisches Brot.\n- Tom putzt sich die Zähne mit Senf.\n- Die Feuerwehr löscht den Brand mit Wasser.\n- Weil er müde war, ging Ali mittags um zwölf ins Kino schlafen.",
          quiz: "ampel", loesungen12: ["1", "2", "1", "2", "1", "2"], loesungen34: ["2", "1", "1", "2", "1", "2"],
          folie: "Lies genau: **Stimmt** das – oder ist es **Unsinn**?\n\n🟢 stimmt · 🔴 Unsinn",
          emoji: "🕵️", warum: "Lese-Detektive merken sofort, wenn etwas nicht stimmt." },
        { titel: "Unsinn-Werkstatt", fuer: "34", dauer: "4 Min",
          text: "Jedes Kind schreibt auf einen Zettel einen Unsinn-Satz, der fast richtig klingt. Zettel einsammeln, mischen und vorlesen – die anderen finden das Unsinn-Wort.",
          folie: "Schreib einen Satz, der **fast** richtig klingt. 🤪\n\nDie anderen finden den Fehler!", emoji: "🤪" }
    ],
    ab12: { titel: "Stimmt das?", aufgaben: [
        { typ: "daumen", text: "Passt das Bild zum Wort? Kreise 👍 oder 👎 ein.", nur: "1", zeilen: ["[bild:hund] Hund", "[bild:katze] Maus", "[bild:auto] Auto", "[bild:apfel] Banane", "[bild:sonne] Sonne"] },
        { typ: "daumen", text: "Lies. Stimmt das? Kreise 👍 oder 👎 ein.", nur: "2", zeilen: ["Der Hund bellt.", "Die Kuh fliegt.", "Im Winter schneit es.", "Ein Fisch fährt Rad.", "Oma liest ein Buch.", "Das Eis ist heiß."] },
        { typ: "malen", text: "Male ein Unsinn-Bild (z. B. ein Fisch auf dem Fahrrad).", bild: "" }
    ]},
    ab34: { titel: "Lese-Detektive", kontext: "Lies den Text genau. Achtung: Zwei Sätze sind Unsinn!", aufgaben: [
        { typ: "luecken", text: "Lies den Text. Unterstreiche die zwei Unsinn-Sätze.", nummern: false, saetze: ["Am Samstag fährt Familie Kaya an den See. Papa packt die Badesachen ein. Mama nimmt Wintermützen mit, weil es so heiß ist. Am See ist das Wasser warm und klar. Die Kinder bauen eine Sandburg. Am Abend geht die Sonne im Norden unter. Müde fahren alle nach Hause."] },
        { typ: "luecken", text: "Beantworte die Fragen in ganzen Sätzen.", nummern: true, saetze: ["Wohin fährt die Familie? ___", "Was bauen die Kinder? ___", "Wie ist das Wasser? ___"] },
        { typ: "luecken", text: "Verbessere einen Unsinn-Satz.", nummern: false, saetze: ["___"] }
    ]}
}),

/* ============================== DEUTSCH: SCHREIBEN & RECHTSCHREIBEN ============================== */
SOZIAL_EINHEIT({
    id: "l-reim-zauber",
    titel: "Reim-Zauber",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Reimwörter hören und finden",
    ziel34: "Reimwörter finden und einen kurzen Reim selbst schreiben",
    material: "Rote und grüne Karten (Universal-Set)\nReim-Bildkarten (unter Arbeitsmaterial)",
    materialIds: ["lern-reim-karten"],
    warmup12: "Reim-Ping-Pong: Du sagst „Maus“, die Kinder rufen ein Reimwort (Haus, Laus …)",
    warmup34: "Reim-Ping-Pong mit Unsinnwörtern erlaubt (Bus – Kuss – Fluss – Pluss)",
    tafel: [{ werkzeug: "reime", titel: "Reimt sich das?", fuer: "", einstellung: {} }],
    lerntext12: { titel: "Die Reim-Hexe", text:
`Die kleine Hexe Rosa kann nur zaubern, wenn sie reimt.

„Hokus Pokus Haus – heraus kommt eine **Maus**!“ Puff – da sitzt eine Maus auf dem Tisch.

„Hokus Pokus Stein – jetzt komm, kleines **Schwein**!“ Puff – ein rosa Schwein grunzt.

Dann will Rosa eine Katze zaubern. „Hokus Pokus Baum – komm, Katze!“ Aber nichts passiert. Rosa überlegt. „Baum … Katze … das reimt sich ja gar nicht!“

**Nach dem Vorlesen:**
1. Welche Tiere hat Rosa gezaubert?
2. Warum hat die Katze nicht geklappt?
3. Was reimt sich auf Katze? (Tatze, Glatze, Matratze …)` },
    lerntext34: { titel: "Rap-Battle in der Pause", text:
`Kemal und Jule machen einen Rap-Battle. Kemal beginnt: „Ich bin schnell wie der Wind – schneller als jedes Kind!“

Jule kontert: „Du redest ganz schön viel – ich gewinne jedes Spiel!“

Die anderen klatschen den Takt. „Das Geheimnis“, erklärt Jule, „ist der Reim am Zeilenende. Wind – Kind, viel – Spiel. Die letzten Laute müssen gleich klingen.“

Kemal grinst: „Und wer keinen Reim findet, hat verloren!“

**Fragen zum Gespräch:**
1. Welche Wörter haben sich gereimt?
2. Woran erkennt man einen Reim?
3. Findest du eine Reimzeile auf „Schule“ oder „Pause“?` },
    uebungen: [
        { titel: "Reimt sich das?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du nennst zwei Wörter (Kl. 1/2 mit Bildern an der Tafel). Reimen sie sich, heben die Kinder grün, sonst rot.\n- Maus – Haus\n- Hose – Rose\n- Hund – Katze\n- Schal – Wal\n- Mond – Sonne\n- Schwein – Stein",
          quiz: "ampel", loesungen: ["1", "1", "2", "1", "2", "1"],
          folie: "Reimen sich die Wörter?\n\n🟢 ja · 🔴 nein",
          emoji: "🪄", warum: "Reime klingen am Ende gleich." },
        { titel: "Reim-Memory", fuer: "12", dauer: "5 Min",
          text: "Die Reim-Bildkarten liegen verdeckt an der Tafel (Magnete) oder auf dem Pult. Ein Kind nennt zwei Kartennummern, du deckst auf. Reimen sich die Bilder, bekommt die Klasse einen Punkt.",
          folie: "🃏 Welche zwei Bilder **reimen** sich?", emoji: "🃏" },
        { titel: "Reim-Zeilen", fuer: "34", dauer: "5 Min",
          text: "An der Tafel stehen Zeilenanfänge. Die Kinder schreiben auf einen Zettel ein Ende, das sich reimt. Wer mag, liest vor.\n- In der Pause auf dem Hof …\n- Mein Hund heißt Fred …\n- Heute regnet's in der Stadt …",
          quiz: "liste", folie: "Ergänze eine Zeile, die sich **reimt**! ✍️", emoji: "✍️" }
    ],
    ab12: { titel: "Reim-Zauber", aufgaben: [
        { typ: "zuordnen", text: "Was reimt sich? Verbinde.", links: ["[bild:maus]", "[bild:hose]", "[bild:schal]", "[bild:schwein]"], rechts: ["[bild:stein]", "[bild:haus]", "[bild:wal]", "[bild:rose]"] },
        { typ: "ankreuzen", text: "Was reimt sich auf Mais? Kreuze an.", nur: "1", nebeneinander: true, optionen: ["[bild:eis]", "[bild:hund]", "[bild:apfel]"] },
        { typ: "luecken", text: "Finde ein Reimwort.", nummern: true, saetze: ["Maus – ___", "Hand – ___", "Bein – ___"] },
        { typ: "malen", text: "Male zwei Dinge, die sich reimen.", bild: "" }
    ]},
    ab34: { titel: "Reim-Werkstatt", aufgaben: [
        { typ: "tabelle", text: "Finde zu jedem Wort zwei Reimwörter.", spalten: ["Wort", "Reimwort 1", "Reimwort 2"], zeilen: [["Ball", "", ""], ["Tisch", "", ""], ["Pause", "", ""], ["Schuh", "", ""], ["Nacht", "", ""]] },
        { typ: "ankreuzen", text: "Welches Wort reimt sich NICHT? Kreuze es an.", nebeneinander: true, optionen: ["Hund", "Mund", "rund", "Hand"] },
        { typ: "luecken", text: "Schreibe einen eigenen Reim mit zwei Zeilen.", nummern: false, saetze: ["___", "___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-abc-training",
    titel: "Das ABC-Training",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Buchstaben erkennen und das ABC in der richtigen Reihenfolge üben",
    ziel34: "Wörter nach dem ABC ordnen – fit fürs Wörterbuch",
    material: "Evtl. ABC-Leiste der Klasse",
    ohneVorbereitung: true,
    warmup12: "ABC-Lied singen oder sprechen – bei jedem fünften Buchstaben aufstehen",
    warmup34: "Welcher Buchstabe kommt vor/nach …? (Tafel: ABC-Blitz)",
    tafel: [{ werkzeug: "abc", titel: "ABC-Blitz: vorher und nachher", fuer: "", einstellung: {} }],
    lerntext12: { titel: "Die Buchstaben-Schlange", text:
`Im Zoo wohnt eine lange Schlange. Sie heißt Abby. Auf jedem Stück ihres Körpers steht ein Buchstabe: A, B, C, D … bis Z.

Eines Morgens ist Abby ganz durcheinander. Das M ist vorne, das A in der Mitte, das Z ganz hinten bei B.

„Hilfe!“, zischt Abby. „Wer bringt meine Buchstaben in Ordnung?“

Die Kinder singen das ABC-Lied. Und bei jedem Buchstaben rutscht ein Stück von Abby an den richtigen Platz. A, B, C … Am Ende ist Abby wieder ordentlich – und kann endlich lächeln.

**Nach dem Vorlesen:**
1. Was steht auf Abbys Körper?
2. Wie haben die Kinder Abby geholfen?
3. Welcher Buchstabe ist der erste in deinem Namen?` },
    lerntext34: { titel: "Das Spielerverzeichnis", text:
`Der Fußballtrainer braucht eine Liste aller Spieler – nach dem ABC sortiert. Denis soll helfen.

„Ali, Ben, Can, Dana … easy!“ Doch dann kommen Mia, Max und Mika. Alle fangen mit M an!

„Dann schaust du auf den zweiten Buchstaben“, sagt der Trainer. „Ma kommt vor Mi.“ Max kommt also vor Mia und Mika. „Und Mia oder Mika? Dann der dritte Buchstabe: a kommt vor k.“

Denis nickt. „Wie beim Wörterbuch!“

**Fragen zum Gespräch:**
1. Was macht man, wenn zwei Namen mit dem gleichen Buchstaben anfangen?
2. In welcher Reihenfolge stehen Max, Mia und Mika?
3. Wo braucht man das ABC im Alltag?` },
    uebungen: [
        { titel: "Wer kommt vorher?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst einen Buchstaben. Die Kinder flüstern ihrem Nachbarn, welcher Buchstabe direkt davor und danach kommt – dann rufst du ein Kind auf. Kl. 1/2 dürfen auf der ABC-Leiste nachschauen.\n- E\n- K\n- R\n- H",
          quiz: "karten",
          folie: "Welcher Buchstabe kommt **vorher**? Welcher **danach**? 🔤", emoji: "🔤", warum: "Das ABC sitzt bald ganz sicher." },
        { titel: "ABC-Reihe am Platz", fuer: "34", dauer: "5 Min",
          text: "Jedes Kind schreibt seinen Vornamen groß auf einen Zettel. Dann ordnet die Klasse die Namen gemeinsam nach dem ABC – du schreibst die Reihenfolge an die Tafel. Gleiche Anfangsbuchstaben? Zweiten Buchstaben anschauen!",
          folie: "Wir ordnen unsere Namen nach dem **ABC**. 📋", emoji: "📋" }
    ],
    ab12: { titel: "Das ABC-Training", aufgaben: [
        { typ: "luecken", text: "Welcher Buchstabe fehlt?", nur: "", nummern: true, saetze: ["A  B  ___  D", "E  ___  G  H", "K  L  ___  N", "R  S  ___  U"] },
        { typ: "zuordnen", text: "Verbinde gleiche Buchstaben.", nur: "1", links: ["A", "M", "O", "S"], rechts: ["s", "a", "m", "o"] },
        { typ: "luecken", text: "Schreibe die Buchstaben in der richtigen Reihenfolge.", nur: "2", nummern: true, saetze: ["C  A  B → ___", "F  D  E → ___", "M  O  N → ___"] },
        { typ: "malen", text: "Male etwas, das mit dem ersten Buchstaben deines Namens anfängt.", bild: "" }
    ]},
    ab34: { titel: "Fit fürs Wörterbuch", aufgaben: [
        { typ: "luecken", text: "Ordne die Wörter nach dem ABC.", nummern: true, saetze: ["Hund, Affe, Zebra, Katze → ___", "Ball, Brot, Blume, Bär → ___", "Maus, Mond, Milch, Mantel → ___"] },
        { typ: "luecken", text: "Welcher Buchstabe kommt davor, welcher danach?", nummern: false, saetze: ["___ G ___     ___ P ___     ___ U ___     ___ L ___"] },
        { typ: "schreiben", text: "Schreibe fünf Kinder aus deiner Klasse (nur Vornamen) nach dem ABC geordnet auf.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-wortarten",
    titel: "Wort-Sortiermaschine",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Namenwörter erkennen: Dinge, die man anfassen kann, schreibt man groß (mit Begleiter der/die/das)",
    ziel34: "Nomen, Verben und Adjektive erkennen und sortieren",
    material: "Zahlenkarten 1–4 (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Begleiter-Spiel: Du zeigst auf Dinge im Raum, die Kinder rufen der, die oder das",
    warmup34: "Pantomime: Ein Kind macht ein Verb vor, die anderen raten",
    tafel: [{ werkzeug: "wortarten", titel: "Wortarten-Sortiermaschine", fuer: "34", einstellung: {} }, { werkzeug: "begleiter", titel: "der, die oder das?", fuer: "12", einstellung: {} }],
    lerntext12: { titel: "Die Groß-Mach-Maschine", text:
`Im Keller von Professor Pfiffig steht eine Maschine. Sie ist rund und rot und hat einen großen Knopf.

Wenn man ein Wort hineinwirft, macht sie: Rummel-di-bummel – und das Wort kommt mit einem großen Buchstaben heraus! Aber nur, wenn es ein Ding, ein Tier oder ein Mensch ist.

„Hund“ – Rummel-di-bummel – groß! „Ball“ – groß! „Mama“ – groß!

„rennen“ – die Maschine piept. „Nein, nein“, sagt sie. „Rennen kann man nicht anfassen. Das bleibt klein.“

**Nach dem Vorlesen:**
1. Welche Wörter macht die Maschine groß?
2. Warum bleibt „rennen“ klein?
3. Was im Klassenzimmer würde die Maschine groß machen?` },
    lerntext34: { titel: "Das Level-System", text:
`Nils programmiert ein Spiel. Jedes Wort bekommt eine Farbe: Nomen werden blau, Verben rot, Adjektive grün.

„Der schnelle Fuchs springt über den Zaun.“ Fuchs und Zaun – blau, das sind Nomen, man kann einen Begleiter davorsetzen. Springt – rot, das ist ein Verb, es sagt, was jemand tut. Schnell – grün, ein Adjektiv, es sagt, wie etwas ist.

„Und der Trick?“, fragt seine Schwester. „Teste es: Kann man ‚der, die, das‘ davor sagen? Dann Nomen. Kann man ‚ich …‘ sagen? Dann Verb. Kann man ‚ganz …‘ sagen? Dann Adjektiv.“

**Fragen zum Gespräch:**
1. Welche drei Wortarten gibt es im Spiel?
2. Wie testest du, ob ein Wort ein Nomen ist?
3. Finde in diesem Satz ein Verb: „Die müde Katze schläft auf dem Sofa.“` },
    uebungen: [
        { titel: "Groß oder klein?", fuer: "12", dauer: "8 Min", kern: ["12"],
          text: "Du sagst Wörter. Kann man es anfassen oder ist es ein Tier oder Mensch, stehen die Kinder auf (groß!). Sonst bleiben sie sitzen und machen sich klein.\n- Hund\n- laufen\n- Ball\n- Mama\n- lachen\n- Tisch",
          quiz: "karten",
          folie: "Kann man es **anfassen**? Dann schreibt man es **groß**!\n\n⬆️ aufstehen = groß · ⬇️ sitzen bleiben = klein",
          emoji: "🤖", warum: "Namenwörter schreibt man groß." },
        { titel: "Wortarten-Abstimmung", fuer: "34", dauer: "8 Min", kern: ["34"],
          text: "Du zeigst ein Wort. Die Kinder zeigen mit der Zahlenkarte: 1 = Nomen, 2 = Verb, 3 = Adjektiv.\n- Fahrrad\n- springen\n- lustig\n- Pause\n- schreiben\n- dunkel",
          antworten: ["1️⃣ Nomen", "2️⃣ Verb", "3️⃣ Adjektiv"], loesungen: ["1", "2", "3", "1", "2", "3"],
          folie: "Welche Wortart?\n\n1️⃣ Nomen · 2️⃣ Verb · 3️⃣ Adjektiv",
          emoji: "🎮", warum: "Wer die Wortarten kennt, schreibt richtig groß und klein." }
    ],
    ab12: { titel: "Groß-Mach-Maschine", aufgaben: [
        { typ: "tabelle", text: "Sprich: der, die oder das? Kreuze an.", nur: "", spalten: ["Bild", "der", "die", "das"], zeilen: [["[bild:hund]", "", "", ""], ["[bild:sonne]", "", "", ""], ["[bild:auto]", "", "", ""], ["[bild:fussball]", "", "", ""], ["[bild:katze]", "", "", ""]] },
        { typ: "luecken", text: "Schreibe der, die oder das davor.", nummern: true, saetze: ["___ Maus", "___ Haus", "___ Ball", "___ Katze"] }
    ]},
    ab34: { titel: "Wort-Sortiermaschine", aufgaben: [
        { typ: "tabelle", text: "Sortiere die Wörter in die Tabelle.", woerter: ["Freund", "lachen", "laut", "Garten", "malen", "müde", "Tafel", "springen", "bunt"], spalten: ["Nomen", "Verben", "Adjektive"], zeilen: [["", "", ""], ["", "", ""], ["", "", ""]] },
        { typ: "luecken", text: "Groß oder klein? Schreibe die Sätze richtig ab.", nummern: true, saetze: ["DER HUND SPIELT IM GARTEN. → ___", "DIE KLEINE KATZE SCHLÄFT. → ___"] },
        { typ: "luecken", text: "Setze passende Adjektive ein.", nummern: false, saetze: ["Der ___ Elefant trinkt ___ Wasser."] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-satz-baumeister",
    titel: "Satz-Baumeister",
    kategorie: "Deutsch: Schreiben & Rechtschreiben",
    ziel12: "Aus Wörtern einen Satz bauen – groß anfangen, Punkt am Ende",
    ziel34: "Sätze umstellen, erweitern und das richtige Satzzeichen setzen",
    material: "Wortkarten „Satz-Baumeister“ (unter Arbeitsmaterial)",
    materialIds: ["lern-satz-karten"],
    warmup12: "Satz-Kette: Jedes Kind sagt ein Wort, zusammen wird ein Satz daraus",
    warmup34: "Punkt, Fragezeichen oder Ausrufezeichen? Du sprichst Sätze mit Betonung, die Kinder malen das Zeichen in die Luft",
    lerntext12: { titel: "Die wackeligen Wörter", text:
`Die Wörter „Tom“, „spielt“ und „Ball“ liegen durcheinander auf dem Tisch. „Ball spielt Tom“, sagt der Ball. „Das klingt komisch“, sagt Tom.

Da kommt die Baumeisterin Bea. „Ein Satz ist wie ein Turm“, sagt sie. „Jedes Wort braucht seinen Platz.“

Sie stellt die Wörter neu auf: „Tom spielt Ball.“ Ganz vorne steht ein großer Buchstabe. Und ganz am Ende setzt sie einen kleinen Punkt – wie einen Deckel auf den Turm.

„Jetzt hält der Satz!“, ruft Tom.

**Nach dem Vorlesen:**
1. Was hat bei „Ball spielt Tom“ nicht gestimmt?
2. Was kommt an den Anfang und was ans Ende eines Satzes?
3. Baue einen Satz mit „Mama“ und „lacht“.` },
    lerntext34: { titel: "Die Textnachricht", text:
`Mira schreibt ihrer Freundin: „kommst du heute zum training ich hab neue schuhe“

Die Antwort kommt sofort: „Häh? Was willst du?“

Mira liest ihre Nachricht noch einmal. Kein Großbuchstabe, kein Satzzeichen – alles läuft zusammen. Sie schreibt neu: „Kommst du heute zum Training? Ich hab neue Schuhe!“

„Ah, jetzt versteh ich’s“, antwortet die Freundin. „Klar komme ich!“

**Fragen zum Gespräch:**
1. Warum hat die Freundin die erste Nachricht nicht verstanden?
2. Welche Satzzeichen hat Mira beim zweiten Mal gesetzt?
3. Wann setzt man ein Fragezeichen, wann ein Ausrufezeichen?` },
    uebungen: [
        { titel: "Lebende Sätze", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Drei bis fünf Kinder bekommen je eine Wortkarte und stellen sich vorn in eine Reihe – erst durcheinander. Die anderen sagen, wer mit wem tauschen muss, bis der Satz stimmt. Kl. 3/4: Danach den Satz umstellen (Der Hund bellt laut. → Laut bellt der Hund.). Wer nicht nach vorn möchte, ist Bauleiter und sagt vom Platz aus, wer tauscht.",
          folie: "Die Wörter sind durcheinander! 🧱\n\nWer muss mit wem **tauschen**, damit der Satz stimmt?",
          emoji: "🧱", warum: "Jedes Wort braucht seinen Platz im Satz." },
        { titel: "Welches Zeichen?", fuer: "34", dauer: "5 Min",
          text: "Du liest Sätze ohne Satzzeichen vor – mit passender Betonung. Die Kinder zeigen die Zahlenkarte: 1 = Punkt, 2 = Fragezeichen, 3 = Ausrufezeichen.\n- Kommst du mit ins Kino\n- Pass auf, da kommt ein Auto\n- Heute ist Mittwoch\n- Wie spät ist es",
          antworten: ["1️⃣ Punkt .", "2️⃣ Fragezeichen ?", "3️⃣ Ausrufezeichen !"], loesungen: ["2", "3", "1", "2"],
          folie: "Welches Satzzeichen fehlt?\n\n1️⃣ **.** · 2️⃣ **?** · 3️⃣ **!**", emoji: "❓" }
    ],
    ab12: { titel: "Satz-Baumeister", aufgaben: [
        { typ: "ankreuzen", text: "Welcher Satz passt zum Bild? Kreuze an. (Ich lese vor.)", nur: "1", optionen: ["[bild:hund] Der Hund bellt.", "[bild:hund] Der Hund fliegt."] },
        { typ: "luecken", text: "Ordne die Wörter zu einem Satz. Denk an den Punkt!", nummern: true, saetze: ["malt   Lea → ___", "Eis   isst   Tom   ein → ___", "rennt   Hund   der → ___"] },
        { typ: "malen", text: "Male ein Bild zu: Tom spielt Ball.", bild: "" }
    ]},
    ab34: { titel: "Satz-Baumeister", aufgaben: [
        { typ: "luecken", text: "Ordne die Wörter zu einem Satz.", nummern: true, saetze: ["spielen – Pause – in – wir – der – Fußball → ___", "Katze – die – Baum – auf – klettert – den → ___"] },
        { typ: "luecken", text: "Stelle den Satz zweimal um.", nummern: false, saetze: ["Ali fährt morgen mit dem Bus zur Schule.", "→ ___", "→ ___"] },
        { typ: "luecken", text: "Setze . ? oder ! ein.", nummern: false, saetze: ["Wo ist mein Turnbeutel ___   Ich habe Hunger ___   Vorsicht, heiß ___   Morgen ist Sporttag ___"] },
        { typ: "schreiben", text: "Schreibe eine Frage an deine Lehrerin.", zeilen: 1 }
    ]}
})

];
