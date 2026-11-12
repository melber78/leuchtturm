/* Leuchtturm – Vertretungsstunden: Vorlagen Teil 3
   (Deutsch entspannt, Mathe entspannt, Gemischt: Deutsch & Mathe, Konzentration & Ruhe)
   Alle Stunden ohne Zusatzmaterial: nur Arbeitsblatt, Tafel und Stifte aus dem Mäppchen. */

// Neue Kategorie „Gemischt“ vor „Sonstiges“ einreihen
(function () {
    const k = window.SOZIAL_KATEGORIEN || [];
    if (!k.includes("Gemischt: Deutsch & Mathe")) k.splice(Math.max(0, k.indexOf("Sonstiges")), 0, "Gemischt: Deutsch & Mathe");
})();

window.SOZIAL_VORLAGEN.push(

/* ============================== DEUTSCH ENTSPANNT ============================== */
SOZIAL_EINHEIT({
    id: "w-silben-koenig",
    titel: "Silben-Klatschen",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Wörter in Silben klatschen und Silben zählen",
    ziel34: "Wörter in Silben zerlegen und aus Silben neue Wörter bauen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Robo spricht in Stücken", text:
`Im Kinderzimmer von Lea steht ein kleiner Roboter. Er heißt Robo. Robo spricht ganz komisch – er sagt alle Wörter in Stücken.

„Gu – ten – Mor – gen“, sagt Robo. Und dabei klatscht er bei jedem Stück in die Hände.

Lea lacht. „Ro – bo, du – bist – lus – tig!“ Jetzt klatscht Lea auch.

Am Abend fragt Mama: „Was möchtest du essen?“ Lea und Robo rufen zusammen: „Nu – deln!“ – und klatschen zweimal.

**Nach dem Vorlesen:**
1. Wie spricht Robo?
2. Was macht er bei jedem Stück?
3. Wie oft klatschen Lea und Robo bei „Nu – deln“?
4. Klatsch deinen Namen! Wie oft musst du klatschen?` },
    lerntext34: { titel: "Das Silben-Labor", text:
`Professorin Silbia hat ein besonderes Labor. In großen Gläsern sammelt sie Silben: In einem Glas liegen „Ba“, „Ro“ und „Ta“. Im nächsten „na“, „se“ und „fel“. Im dritten „ne“, „sche“ und „ken“.

Jeden Morgen nimmt sie aus jedem Glas eine Silbe und setzt sie zusammen. „Ba – na – ne!“ – ein Wort. „Ro – se“ – auch ein Wort, nur mit zwei Silben. Aber „Ta – fel – ken“? „Quatsch!“, lacht Silbia und schreibt es in ihr Heft für lustige Fantasiewörter.

Ihr Trick: Jede Silbe hat mindestens einen Selbstlaut (a, e, i, o, u). Deshalb kann man Silben gut hören und klatschen.

**Fragen zum Gespräch:**
1. Welche Wörter hat Silbia gebaut?
2. Woran erkennt man eine Silbe?
3. Welches lange Wort kennt ihr? Klatscht es!` },
    uebungen: [
        { titel: "Namen klatschen", fuer: "alle", dauer: "5 Min",
          text: "Der Reihe nach sagt jedes Kind seinen Vornamen und klatscht ihn in Silben (Le – a, Ben, Ma – xi – mi – li – an). Die Klasse klatscht nach. Wer hat den Namen mit den meisten Silben?",
          folie: "Klatsch deinen **Namen** in Silben! 👏\n\nLe – a · Ben · Ma – xi – mi – li – an",
          kern: ["12", "34"],
          emoji: "👏",
          warum: "Wir klatschen unsere Namen in Silben." },
        { titel: "Silben-Hüpfen", fuer: "12", dauer: "5 Min",
          text: "Alle stehen hinter ihrem Stuhl. Du sagst ein Wort, die Kinder hüpfen bei jeder Silbe einmal leise auf der Stelle und rufen danach die Zahl.\n\n- Ball (1)\n- Hose (2)\n- Banane (3)\n- Schokolade (4)\n- Elefant (3)\n- Haus (1)\n- Tomate (3)\n- Katze (2)",
          quiz: "keine",
          folie: "Für jede **Silbe** einmal hüpfen! 🐸\n\nDann rufen alle: Wie oft?",
          emoji: "🐸",
          warum: "Wir hüpfen die Silben." },
        { titel: "Silben-Puzzle an der Tafel", fuer: "34", dauer: "6 Min",
          text: "Du schreibst Silben durcheinander an die Tafel: Blu – Ta – me – fel – Re – gen – Fens – ter. Die Kinder setzen sie in Tischpaaren zu Wörtern zusammen (Blume, Tafel, Regen, Fenster). Dann noch ein Fantasiewort aus übrigen Silben bauen.",
          folie: "**Blu · Ta · me · fel · Re · gen · Fens · ter**\n\nWelche Wörter könnt ihr bauen? 🧩",
          kern: ["34"],
          emoji: "🧩",
          warum: "Wir bauen Wörter aus Silben." }
    ],
    ab12: { titel: "Silben zählen", aufgaben: [
        { typ: "tabelle", text: "Klatsch das Wort leise. Wie viele Silben? Schreib die Zahl.", spalten: ["Wort", "Silben"],
          zeilen: [["🐟 Fisch", ""], ["☀️ Sonne", ""], ["🍌 Banane", ""], ["🐘 Elefant", ""], ["🍎 Apfel", ""], ["🏠 Haus", ""]] },
        { typ: "malen", text: "Male etwas mit zwei Silben (z. B. Ka – tze).", bild: "" }
    ]},
    ab34: { titel: "Silben-Labor", aufgaben: [
        { typ: "luecken", text: "Teile in Silben – mit Strichen.", nummern: true, saetze: ["Schmetterling = ___", "Erdbeere = ___", "Fußballspieler = ___"] },
        { typ: "tabelle", text: "Setze die Silben zu einem Wort zusammen.", spalten: ["Silben", "Wort"],
          zeilen: [["Scho – ko – la – de", ""], ["Kro – ko – dil", ""], ["Re – gen – bo – gen", ""], ["Tel – ler", ""]] },
        { typ: "luecken", text: "Erfinde ein Fantasiewort aus drei Silben:", nummern: false, saetze: ["___ – ___ – ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-wortschlange",
    titel: "Die Wörter-Schlange",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Laute am Wortende hören und Wörter aneinanderhängen",
    ziel34: "Wortschlangen und Wortketten aus zusammengesetzten Wörtern bilden",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Schlange Susi wird lang", text:
`Schlange Susi ist traurig. „Ich bin so kurz!“ Da hat die Eule eine Idee: „Du wirst länger, wenn du Wörter frisst – aber nur die richtigen!“

Susi frisst eine **Maus**. Das Wort hört mit **S** auf. Also muss das nächste Wort mit **S** anfangen: **Sonne**! Sonne hört mit **E** auf: **Esel**! Esel hört mit **L** auf: **Löwe**!

Mit jedem Wort wird Susi ein Stück länger. Am Abend ist sie die längste Schlange im ganzen Wald.

**Nach dem Vorlesen:**
1. Warum war Susi traurig?
2. Welches Wort hat Susi zuerst gefressen?
3. Wie geht es nach „Maus“ weiter?
4. Wer findet ein Wort, das mit E anfängt?` },
    lerntext34: { titel: "Die endlose Wortkette", text:
`Im Bus ist es langweilig. Da erfindet Tim ein Spiel: „Ich sage ein Wort, und du machst daraus ein neues. Der zweite Teil von meinem Wort wird der Anfang von deinem.“

Tim sagt: „**Hausschuh**.“ Jana überlegt: „**Schuhkarton**!“ Tim: „**Kartonbox**!“ Jana: „Hm … **Boxhandschuh**!“ Tim lacht: „Jetzt sind wir wieder beim Schuh!“

Bis zur Schule schaffen sie 14 Wörter. Ihr bestes: Schneeball – Ballspiel – Spielplatz – Platzregen – Regenbogen.

**Fragen zum Gespräch:**
1. Wie funktioniert das Spiel?
2. Wie geht es nach „Regenbogen“ weiter?
3. Bei welchem Wort wird es schwer?` },
    uebungen: [
        { titel: "Klassen-Wortschlange", fuer: "alle", dauer: "7 Min",
          text: "Du beginnst mit einem Wort (Maus). Der Reihe nach sagt jedes Kind vom Platz aus ein Wort, das mit dem letzten Laut anfängt (Maus – Sonne – Esel – Löwe …). Kl. 1/2: Du sprichst den letzten Laut deutlich nach („Mau-sss – mit S!“). Kl. 3/4: Ein Kind schreibt die Schlange an der Tafel mit. Wie lang wird sie?",
          folie: "Das neue Wort fängt mit dem **letzten Laut** an. 🐍\n\nMaus → Sonne → Esel → Löwe → …",
          kern: ["12", "34"],
          emoji: "🐍",
          warum: "Wir machen die Schlange so lang wie möglich." },
        { titel: "Wortketten", fuer: "34", dauer: "5 Min",
          text: "Wie im Bus bei Tim und Jana: Der zweite Teil wird der Anfang des neuen Wortes. Start: Schneeball. Die Klasse macht weiter (Ballspiel – Spielplatz – Platzregen …).",
          folie: "**Schneeball → Ballspiel → Spielplatz → …** ⛓️\n\nDer Schluss wird der Anfang!",
          kern: ["34"],
          emoji: "⛓️",
          warum: "Aus jedem Wort wird ein neues." }
    ],
    ab12: { titel: "Meine Wörter-Schlange", aufgaben: [
        { typ: "zuordnen", text: "Womit hört das Wort auf? Das nächste Wort fängt so an. Verbinde.", links: ["🐭 Maus", "🌳 Baum", "🦁 Löwe"], rechts: ["🐘 Elefant", "☀️ Sonne", "🌙 Mond"] },
        { typ: "malen", text: "Male Schlange Susi. In ihrem Bauch sind eine Maus, eine Sonne und ein Esel.", bild: "" },
        { typ: "luecken", text: "Schreibe deine Schlange:", nummern: false, saetze: ["___ → ___ → ___ → ___"] }
    ]},
    ab34: { titel: "Schlangen und Ketten", aufgaben: [
        { typ: "luecken", text: "Wörter-Schlange: Das nächste Wort fängt mit dem letzten Buchstaben an.", nummern: false, saetze: ["Hund → ___ → ___ → ___ → ___"] },
        { typ: "luecken", text: "Wortkette: Der zweite Teil wird der Anfang.", nummern: true, saetze: ["Haustür → Türklinke → ___", "Apfelbaum → Baumhaus → ___ → ___", "Schulbus → ___ → ___"] },
        { typ: "luecken", text: "Erfinde eine eigene Wortkette mit 4 Wörtern:", nummern: false, saetze: ["___ → ___ → ___ → ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-quatsch-saetze",
    titel: "Quatsch-Sätze",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Sätze aus Wer? Was? Wo? zusammensetzen und malen",
    ziel34: "Sätze aus Satzteilen bauen und verrückte Sätze schreiben",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die Satz-Maschine", text:
`Opa Fritz hat eine Satz-Maschine gebaut. Sie hat drei Schubladen.

In der ersten Schublade sind Tiere: ein Hund, eine Kuh, ein Pinguin. In der zweiten steht, was sie tun: tanzen, schlafen, Eis essen. In der dritten sind Orte: im Bett, auf dem Dach, im Schwimmbad.

Paula zieht aus jeder Schublade einen Zettel: „Die Kuh – tanzt – auf dem Dach.“ Alle lachen. Max zieht: „Der Pinguin – isst Eis – im Bett.“

„Das sind Quatsch-Sätze!“, ruft Paula. „Aber es sind richtige Sätze“, sagt Opa.

**Nach dem Vorlesen:**
1. Was war in den drei Schubladen?
2. Welchen Satz hat Paula gezogen?
3. Welchen Satz hat Max gezogen?
4. Erfinde einen eigenen Quatsch-Satz!` },
    lerntext34: { titel: "Wer? Was? Wo? Wann?", text:
`Ein Satz ist wie ein Zug mit Wagen. Der erste Wagen sagt, **wer** etwas tut: „Meine Oma“. Der zweite, **was** passiert: „fährt Skateboard“. Dann kann noch ein Wagen kommen: **wo** – „im Supermarkt“ – oder **wann** – „um Mitternacht“.

„Meine Oma fährt um Mitternacht im Supermarkt Skateboard.“

Man kann die Wagen sogar umstellen: „Um Mitternacht fährt meine Oma im Supermarkt Skateboard.“ Das Wort, das sagt, was passiert (fährt), bleibt dabei immer an zweiter Stelle.

**Fragen zum Gespräch:**
1. Welche Wagen hat ein Satz?
2. Stellt den Oma-Satz noch einmal anders um!
3. Was bleibt immer an zweiter Stelle?` },
    uebungen: [
        { titel: "Satz-Maschine der Klasse", fuer: "alle", dauer: "8 Min",
          text: "Drei Kinder sind die Schubladen. Sie flüstern dir nacheinander je einen Teil ins Ohr – keines weiß, was die anderen gesagt haben: Kind 1 sagt, **wer** (ein Tier oder eine Person), Kind 2, **was** jemand tut, Kind 3, **wo**. Dann sagst du den ganzen Satz laut. Die Klasse lacht – und ein Kind macht den Satz pantomimisch vor. Danach sind drei neue Kinder dran. Kl. 3/4: Du schreibst die Sätze an die Tafel, und die Kinder stellen sie um.",
          folie: "**Wer?** · **Was tut er?** · **Wo?** 🎰\n\nDrei Kinder flüstern je einen Teil – heraus kommt ein Quatsch-Satz!",
          kern: ["12", "34"],
          emoji: "🎰",
          warum: "Wir bauen verrückte Sätze." }
    ],
    ab12: { titel: "Mein Quatsch-Satz", aufgaben: [
        { typ: "ankreuzen", text: "Wer? Kreuze an.", nebeneinander: true, optionen: ["🐄 Kuh", "🐧 Pinguin", "👵 Oma", "🦖 Dino"] },
        { typ: "ankreuzen", text: "Was tut er oder sie? Kreuze an.", nebeneinander: true, optionen: ["💃 tanzt", "😴 schläft", "🍦 isst Eis", "🎤 singt"] },
        { typ: "ankreuzen", text: "Wo? Kreuze an.", nebeneinander: true, optionen: ["🛏️ im Bett", "🏠 auf dem Dach", "🏊 im Schwimmbad", "🌙 auf dem Mond"] },
        { typ: "malen", text: "Male deinen Quatsch-Satz.", bild: "" }
    ]},
    ab34: { titel: "Satz-Baustelle", aufgaben: [
        { typ: "tabelle", text: "Nimm aus jeder Spalte einen Teil und schreibe unten drei Quatsch-Sätze.", spalten: ["Wer?", "Was tut er/sie?", "Wo?", "Wann?"],
          zeilen: [["der Hausmeister", "jongliert", "im Kühlschrank", "um Mitternacht"], ["ein Krokodil", "putzt Zähne", "auf dem Schulhof", "am Montag"], ["meine Lehrerin", "singt laut", "im Zoo", "nach dem Frühstück"]] },
        { typ: "luecken", text: "Meine Quatsch-Sätze:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "Stelle deinen ersten Satz um – fang mit „Wann?“ an:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-ruecken-post",
    titel: "Rücken-Post",
    kategorie: "Deutsch entspannt",
    ohneVorbereitung: true,
    ziel12: "Buchstaben und Formen ertasten und erkennen",
    ziel34: "Buchstaben und kurze Wörter auf dem Rücken erkennen und Wörter bilden",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Ein Brief ohne Papier", text:
`Mia ist krank und liegt im Bett. Ihr kleiner Bruder Jonas will ihr einen Brief schreiben. Aber er findet kein Papier!

Da hat Jonas eine Idee. Er setzt sich hinter Mia und malt mit dem Finger auf ihren Rücken. Erst einen großen Kreis. „Ein O!“, ruft Mia. Dann einen Strich und einen Bauch. „Ein P!“ Dann ein A.

„O – P – A“, buchstabiert Mia. „Opa kommt?“ Jonas nickt. Und wirklich – da klingelt es schon an der Tür.

**Nach dem Vorlesen:**
1. Warum hat Jonas auf Mias Rücken geschrieben?
2. Welche Buchstaben hat er gemalt?
3. Was war die Nachricht?
4. Welchen Buchstaben würdest du auf einen Rücken malen?` },
    lerntext34: { titel: "Die Geheimsprache der Taucher", text:
`Unter Wasser kann man nicht sprechen. Deshalb haben Taucher eine Zeichensprache: Daumen hoch heißt „Wir tauchen auf“, ein Kreis aus Daumen und Zeigefinger heißt „Alles okay“.

Die Taucherin Ada hat noch einen Trick: Wenn ihre Partnerin direkt vor ihr schwimmt, schreibt sie ihr Buchstaben auf den Rücken. So kann sie sogar ganze Wörter schicken – zum Beispiel „HAI“. Dann wissen beide sofort: Ruhig bleiben und langsam zurück zum Boot.

Wer Buchstaben spüren will, muss sich gut konzentrieren. Große, langsame Buchstaben erkennt man am besten.

**Fragen zum Gespräch:**
1. Warum brauchen Taucher eine Zeichensprache?
2. Welche Buchstaben sind auf dem Rücken leicht zu erkennen, welche schwer?
3. Wie schreibt man, damit der andere es gut spürt?` },
    uebungen: [
        { titel: "Rücken-Post zu zweit", fuer: "alle", dauer: "8 Min",
          text: "Die Tischnachbarn setzen sich hintereinander (Stuhl drehen). Wer hinten sitzt, malt mit dem Finger groß und langsam auf den Rücken des anderen. Kl. 1/2: erst Formen (Kreis, Dreieck, Herz), dann Großbuchstaben (O, L, T, M). Kl. 3/4: Buchstaben, dann Wörter mit drei Buchstaben (OMA, HUT, EIS). Nach 3 Minuten wird getauscht. Regel: sanft malen, nicht kitzeln.",
          folie: "Mal mit dem Finger **groß und langsam** auf den Rücken. ✍️\n\nWas war es? Nach 3 Minuten tauschen.",
          folie12: "Mal mit dem Finger **groß und langsam** auf den Rücken: ⭕ 🔺 ❤️ – dann Buchstaben!\n\nNach 3 Minuten tauschen.",
          kern: ["12", "34"],
          emoji: "✍️",
          warum: "Wir schicken Post – auf dem Rücken." },
        { titel: "Luft-Buchstaben", fuer: "alle", dauer: "4 Min",
          text: "Ein Kind kommt nach vorn und schreibt mit dem ganzen Arm einen großen Buchstaben in die Luft (mit dem Rücken zur Klasse, damit er nicht spiegelverkehrt ist). Die anderen raten. Kl. 3/4: ein ganzes kurzes Wort.",
          folie: "Ein Kind schreibt einen **Buchstaben in die Luft**. ✨\n\nWelcher ist es?",
          emoji: "✨",
          warum: "Wir raten Buchstaben in der Luft." }
    ],
    ab12: { titel: "Buchstaben-Post", aufgaben: [
        { typ: "ankreuzen", text: "Diese Buchstaben habe ich heute gespürt. Kreuze an.", nebeneinander: true, optionen: ["O", "L", "T", "M", "A", "E"] },
        { typ: "malen", text: "Male ein Ding, das mit deinem Lieblingsbuchstaben anfängt.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Lieblingsbuchstabe: ___"] }
    ]},
    ab34: { titel: "Wörter aus wenigen Buchstaben", aufgaben: [
        { typ: "luecken", text: "Welche Wörter kannst du mit diesen Buchstaben legen? Jeder Buchstabe einmal pro Wort.", nummern: false,
          saetze: ["Buchstaben: R · O · S · E · T", "___, ___, ___, ___, ___"] },
        { typ: "luecken", text: "Ein Buchstabe ändert alles! Tausche einen Buchstaben aus:", nummern: true, saetze: ["HUT → ___ → ___", "MAUS → ___ → ___", "TISCH → ___"] },
        { typ: "luecken", text: "Diese Wörter würde ich auf einen Rücken schreiben (kurz!):", nummern: false, saetze: ["___, ___, ___"] }
    ]}
}),

/* ============================== MATHE ENTSPANNT ============================== */
SOZIAL_EINHEIT({
    id: "w-reise-um-die-welt",
    titel: "Reise um die Welt",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Plus- und Minusaufgaben bis 10 bzw. 20 im Kopf rechnen",
    ziel34: "Einmaleins und Kopfrechnen spielerisch üben",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die Rechen-Rakete", text:
`Kira hat eine Rakete gebaut. Aber sie fliegt nur, wenn man richtig rechnet!

„Countdown!“, ruft Kira. „Wie viel ist 3 plus 2?“ – „5!“, rufen die Kinder. Die Rakete brummt. „Und 10 minus 4?“ – „6!“ Die Rakete hebt ab.

Hoch über den Wolken fliegt sie, am Mond vorbei, bis zu den Sternen. Dort winkt ein kleines Mondmännchen. Es hält ein Schild hoch: „1 + 1 = ?“ Kira lacht: „Das ist leicht – 2!“

**Nach dem Vorlesen:**
1. Wann fliegt die Rakete?
2. Wie viel ist 3 plus 2?
3. Was hat das Mondmännchen gefragt?
4. Welche Aufgabe würdest du der Rakete geben?` },
    lerntext34: { titel: "Das Spiel aus Omas Schulzeit", text:
`Oma erzählt: „Als ich so alt war wie du, haben wir ‚Reise um die Welt‘ gespielt. Ein Kind stand hinter dem Stuhl vom Nachbarn. Die Lehrerin sagte eine Aufgabe – wer zuerst die richtige Antwort rief, durfte weiterreisen zum nächsten Stuhl. Wer am Ende die meisten Stühle geschafft hatte, war einmal um die Welt gereist.“

„Und wer hat gewonnen?“, fragt Luca. Oma lächelt: „Meistens Erwin. Er konnte das Einmaleins rückwärts.“

Luca überlegt: „7 mal 8 … 56! Und rückwärts: 56 geteilt durch 8 ist 7!“

**Fragen zum Gespräch:**
1. Wie geht das Spiel?
2. Was ist 7 · 8? Und 56 : 8?
3. Welche Einmaleins-Reihe findest du am schwersten?` },
    uebungen: [
        { titel: "Reise um die Welt", fuer: "alle", dauer: "12 Min",
          text: "Ein Kind (der Reisende) stellt sich neben den Platz eines Nachbarkindes. Du sagst eine Aufgabe. Wer zuerst richtig antwortet, reist weiter zum nächsten Platz – das andere Kind setzt sich. Nach einer Weile beginnt ein neuer Reisender, damit viele drankommen.\n\nKl. 1/2: 3 + 4 · 8 − 2 · 5 + 5 · 9 − 3 · 6 + 6 · 10 − 7 · 12 + 3 · 15 − 5\nKl. 3/4: 6 · 7 · 8 · 4 · 9 · 3 · 7 · 7 · 48 : 6 · 81 : 9 · 25 + 37 · 100 − 46",
          quiz: "keine",
          folie: "🌍 **Reise um die Welt!**\n\nWer zuerst richtig rechnet, reist zum nächsten Platz.",
          kern: ["12", "34"],
          emoji: "🌍",
          warum: "Wer rechnet am schnellsten?" },
        { titel: "Zahlen-Echo", fuer: "12", dauer: "3 Min",
          text: "Du klatschst eine Anzahl (z. B. 4-mal), die Kinder zeigen die Zahl mit den Fingern. Dann zwei Klatsch-Gruppen: 3 und 2 – wie viele zusammen?",
          folie: "Hör genau zu – wie oft wird **geklatscht**? 👏\n\nZeig die Zahl mit den Fingern!",
          emoji: "✋",
          warum: "Wir hören Zahlen." }
    ],
    ab12: { titel: "Rechen-Rakete", aufgaben: [
        { typ: "tabelle", text: "Rechne.", spalten: ["Aufgabe", "Ergebnis"],
          zeilen: [["2 + 3", ""], ["4 + 4", ""], ["7 − 2", ""], ["10 − 5", ""], ["6 + 3", ""], ["9 − 6", ""]] },
        { typ: "malen", text: "Male deine Rechen-Rakete. Schreib eine Aufgabe darauf.", bild: "" }
    ]},
    ab34: { titel: "Rechen-Weltreise", aufgaben: [
        { typ: "tabelle", text: "Reise um die Welt: Rechne jede Station.", spalten: ["Station", "Aufgabe", "Ergebnis"],
          zeilen: [["🗼 Paris", "7 · 6", ""], ["🗽 New York", "56 : 8", ""], ["🏯 Tokio", "9 · 9", ""], ["🦘 Sydney", "72 : 9", ""], ["🐘 Kenia", "125 + 75", ""], ["🏔️ Alpen", "1000 − 350", ""]] },
        { typ: "luecken", text: "Finde die fehlende Zahl:", nummern: true, saetze: ["8 · ___ = 48", "___ : 5 = 7", "___ + 250 = 600"] },
        { typ: "luecken", text: "Erfinde eine eigene Reise-Aufgabe:", nummern: false, saetze: ["___ = ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-rechengeschichten",
    titel: "Rechengeschichten",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Kleine Rechengeschichten hören, malen und lösen",
    ziel34: "Sachaufgaben verstehen, lösen und eigene erfinden",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Im Hühnerstall", text:
`Bauer Paul geht am Morgen in den Hühnerstall. Im ersten Nest liegen 3 Eier. Im zweiten Nest liegen 2 Eier.

„Wie viele Eier sind das?“, fragt seine Tochter Ida. Sie zählt: „1, 2, 3 … 4, 5. Fünf Eier!“

Auf dem Weg ins Haus stolpert Paul. Ein Ei fällt herunter – platsch! „Oh nein“, sagt Ida. „Jetzt sind es nur noch …?“

**Nach dem Vorlesen:**
1. Wie viele Eier lagen im ersten Nest? Und im zweiten?
2. Wie viele waren es zusammen?
3. Was ist auf dem Weg passiert?
4. Wie viele Eier sind am Ende noch da?` },
    lerntext34: { titel: "Der Klassenausflug", text:
`Die Klasse 4a plant einen Ausflug in den Zoo. Es kommen 24 Kinder und 2 Lehrerinnen mit.

Der Eintritt kostet für Kinder 5 Euro, für Erwachsene 9 Euro. Lina rechnet: 24 · 5 = 120 Euro für die Kinder. Dazu 2 · 9 = 18 Euro für die Lehrerinnen. Zusammen 138 Euro.

Im Zoo teilen sich die Kinder in Gruppen zu je 4 Kindern auf. „Das sind 6 Gruppen“, sagt Ben. „Und jede Gruppe darf ein Tier aussuchen, das sie zuerst besucht.“

**Fragen zum Gespräch:**
1. Wie hat Lina den Eintritt ausgerechnet?
2. Warum sind es 6 Gruppen?
3. Woran erkennt man in einer Geschichte, ob man plus, minus, mal oder geteilt rechnen muss?` },
    uebungen: [
        { titel: "Rechengeschichten im Kopf", fuer: "alle", dauer: "8 Min",
          text: "Du erzählst kurze Geschichten, die Kinder rechnen im Kopf und melden sich. Ein Kind erklärt, wie es gerechnet hat.\n\nKl. 1/2:\n- Auf dem Baum sitzen 4 Vögel. 2 fliegen weg. (2)\n- Tom hat 3 Murmeln, Lea gibt ihm 4 dazu. (7)\n- Im Bus sitzen 6 Kinder, an der Haltestelle steigen 3 ein. (9)\n\nKl. 3/4:\n- 5 Kinder haben je 4 Sticker. (20)\n- 36 Bonbons werden auf 4 Kinder verteilt. (9)\n- Ein Buch hat 120 Seiten, Mia hat 75 gelesen. (45)",
          quiz: "keine",
          folie: "Hör gut zu und **rechne im Kopf**. 🧠\n\nWie hast du gerechnet?",
          kern: ["12", "34"],
          emoji: "🧠",
          warum: "Wir lösen Rechengeschichten." },
        { titel: "Rechengeschichte vorspielen", fuer: "12", dauer: "4 Min",
          text: "Kinder spielen eine Geschichte vor: 4 Kinder stehen vorn als „Vögel auf dem Baum“, 1 „fliegt weg“ (setzt sich). Die Klasse sagt die Aufgabe: 4 − 1 = 3.",
          folie: "Wir spielen eine **Rechengeschichte**! 🐦\n\nWelche Aufgabe passt?",
          emoji: "🐦",
          warum: "Wir spielen Rechnen." }
    ],
    ab12: { titel: "Im Hühnerstall", aufgaben: [
        { typ: "malen", text: "Male die Eier: 3 im ersten Nest und 2 im zweiten Nest.", bild: "" },
        { typ: "ankreuzen", text: "Wie viele Eier sind es zusammen?", nebeneinander: true, optionen: ["4", "5", "6"] },
        { typ: "ankreuzen", text: "Ein Ei fällt herunter. Wie viele sind noch da?", nebeneinander: true, optionen: ["3", "4", "5"] },
        { typ: "luecken", text: "Schreibe die Aufgabe:", nummern: false, saetze: ["3 + 2 = ___", "5 − 1 = ___"] }
    ]},
    ab34: { titel: "Rechengeschichten", aufgaben: [
        { typ: "luecken", text: "Löse die Aufgaben. Schreibe die Rechnung und die Antwort.", nummern: true,
          saetze: ["Eine Packung hat 6 Eier. Mama kauft 4 Packungen.\nRechnung: ___   Antwort: ___", "Im Kino sind 80 Plätze. 57 sind besetzt.\nRechnung: ___   Antwort: ___", "35 Kinder fahren in Autos mit je 5 Plätzen.\nRechnung: ___   Antwort: ___"] },
        { typ: "schreiben", text: "Erfinde eine eigene Rechengeschichte. Dein Nachbar löst sie.", zeilen: 4 },
        { typ: "luecken", text: "", nummern: false, saetze: ["Lösung: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-nachbarzahlen",
    titel: "Zahlen-Nachbarn",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Vorgänger und Nachfolger finden, gerade und ungerade Zahlen",
    ziel34: "Nachbarzehner und Nachbarhunderter bestimmen, Zahlen ordnen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die Zahlen-Straße", text:
`In der Zahlen-Straße wohnt in jedem Haus eine Zahl. Die 5 wohnt zwischen der 4 und der 6.

Eines Morgens klingelt es bei der 5. Draußen steht die 4. „Guten Morgen, Nachbarin! Hast du Zucker?“ Kurz darauf klingelt es wieder. Diesmal ist es die 6: „Hast du Milch?“

Die 5 lacht. „Ihr seid meine Nachbarn – ich helfe euch gern.“

Am Abend feiern alle drei zusammen. Die 4 ist eins weniger als die 5. Die 6 ist eins mehr. Und die 5 ist genau in der Mitte.

**Nach dem Vorlesen:**
1. Wer sind die Nachbarn der 5?
2. Was wollte die 4 haben?
3. Wer ist eins mehr als die 5?
4. Wer sind die Nachbarn der 8?` },
    lerntext34: { titel: "Hausnummern-Chaos", text:
`Postbotin Nele hat ein Problem. Bei einem Sturm sind die Schilder der Häuser abgefallen. Sie weiß nur: In der Hauptstraße stehen die Häuser von 340 bis 360.

Sie findet ein Schild mit 347. „Das muss zwischen 346 und 348 hängen.“ Beim nächsten Schild überlegt sie: „358 – das liegt zwischen den Zehnern 350 und 360, aber näher an 360.“

Am Abend hängen alle Schilder wieder. Nele schreibt in ihr Heft: „Nachbarzahl: eins weniger, eins mehr. Nachbarzehner: der Zehner davor und danach.“

**Fragen zum Gespräch:**
1. Welche Nachbarn hat 347?
2. Zwischen welchen Zehnern liegt 358?
3. Zwischen welchen Hundertern liegt 358?` },
    uebungen: [
        { titel: "Aufstehen, setzen", fuer: "alle", dauer: "5 Min",
          text: "Du sagst Zahlen. Ist sie gerade, stehen alle auf. Ist sie ungerade, bleiben alle sitzen (oder setzen sich).\n\nKl. 1/2: 4 · 7 · 10 · 3 · 8 · 1 · 12 · 15\nKl. 3/4: 24 · 37 · 50 · 99 · 116 · 241 · 300 · 875",
          quiz: "keine",
          folie: "**Gerade** Zahl → aufstehen 🧍\n**Ungerade** Zahl → sitzen 🪑",
          kern: ["12", "34"],
          emoji: "🧍",
          warum: "Gerade oder ungerade?" },
        { titel: "Zahlen-Kette", fuer: "alle", dauer: "5 Min",
          text: "Ein Kind sagt eine Zahl, das nächste den Nachfolger, das nächste wieder den Nachfolger … Auf dein Zeichen (Hand hoch) geht es rückwärts. Kl. 3/4: in 10er-Schritten (230, 240, 250 …) oder 100er-Schritten.",
          folie: "Immer **eins mehr** – bis die Hand hochgeht. Dann **rückwärts**! ✋\n\nKl. 3/4: in 10er-Schritten",
          emoji: "🔢",
          warum: "Wir zählen weiter und zurück." }
    ],
    ab12: { titel: "Zahlen-Nachbarn", aufgaben: [
        { typ: "tabelle", text: "Wer wohnt daneben? Schreib die Nachbarn.", spalten: ["eins weniger", "Zahl", "eins mehr"],
          zeilen: [["", "5", ""], ["", "8", ""], ["", "3", ""], ["", "10", ""], ["", "14", ""]] },
        { typ: "malen", text: "Male die Zahlen-Straße mit drei Häusern: 6, 7, 8.", bild: "" }
    ]},
    ab34: { titel: "Nachbarn und Zehner", aufgaben: [
        { typ: "tabelle", text: "Trage die Nachbarzahlen ein.", spalten: ["Vorgänger", "Zahl", "Nachfolger"],
          zeilen: [["", "347", ""], ["", "500", ""], ["", "699", ""], ["", "1000", ""]] },
        { typ: "tabelle", text: "Zwischen welchen Zehnern liegt die Zahl?", spalten: ["Zehner davor", "Zahl", "Zehner danach"],
          zeilen: [["", "358", ""], ["", "72", ""], ["", "604", ""]] },
        { typ: "luecken", text: "Ordne der Größe nach – die kleinste zuerst:", nummern: false, saetze: ["508 · 85 · 850 · 58 → ___ < ___ < ___ < ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-einkaufen",
    titel: "Einkaufen im Kopf-Laden",
    kategorie: "Mathe entspannt",
    ohneVorbereitung: true,
    ziel12: "Mit Euro-Beträgen bis 20 rechnen",
    ziel34: "Mit Euro und Cent rechnen, Wechselgeld bestimmen",
    material: "Nur das Arbeitsblatt (die Preise schreibst du an die Tafel)",
    lerntext12: { titel: "Lottas Kiosk", text:
`Lotta hat im Garten einen Kiosk aufgebaut. An der Tafel stehen die Preise: ein Apfel 1 Euro, ein Keks 2 Euro, ein Saft 3 Euro.

Der erste Kunde ist Opa. „Einen Apfel und einen Saft, bitte.“ Lotta rechnet: 1 Euro plus 3 Euro – „4 Euro, bitte!“

Dann kommt ihr Bruder Max. „Ich habe 5 Euro. Was kann ich dafür kaufen?“ Lotta überlegt. „Zwei Kekse und einen Apfel. Das sind genau 5 Euro!“

**Nach dem Vorlesen:**
1. Was kostet ein Keks?
2. Was hat Opa gekauft – und wie viel hat er bezahlt?
3. Wie viel Geld hatte Max?
4. Was würdest du für 5 Euro kaufen?` },
    lerntext34: { titel: "Der Schulfest-Stand", text:
`Beim Schulfest betreut die 3b den Waffelstand. Die Preise: Waffel 1,50 €, Waffel mit Puderzucker 1,80 €, Apfelschorle 0,90 €.

Herr Yilmaz kauft zwei Waffeln und eine Schorle. Anna rechnet: 1,50 € + 1,50 € = 3,00 €, plus 0,90 € = 3,90 €. Herr Yilmaz bezahlt mit einem 5-Euro-Schein. „Sie bekommen 1,10 € zurück“, sagt Anna.

Am Ende zählen die Kinder die Kasse: 86,40 €. Davon kaufen sie neue Bälle für die Pause.

**Fragen zum Gespräch:**
1. Wie hat Anna gerechnet?
2. Wie bestimmt man das Wechselgeld?
3. Wie viele Cent sind ein Euro?` },
    uebungen: [
        { titel: "Der Kopf-Laden", fuer: "alle", dauer: "10 Min",
          text: "Du schreibst einen kleinen Laden an die Tafel.\n\nKl. 1/2: 🍎 Apfel 1 € · 🍪 Keks 2 € · 🧃 Saft 3 € · 🍦 Eis 4 € · ⚽ Ball 5 €\nKl. 3/4: 🍎 Apfel 0,40 € · 🥨 Brezel 0,80 € · 🧃 Saft 1,20 € · 🍦 Eis 1,50 € · 📒 Heft 2,30 €\n\nEin Kind ist Verkäuferin, eins kauft ein und sagt zwei Dinge. Die Klasse rechnet mit: Was kostet das? Kl. 3/4: Der Kunde bezahlt mit 5 € – wie viel Wechselgeld?",
          quiz: "keine",
          folie12: "🛒 **Der Kopf-Laden**\n\n🍎 1 € · 🍪 2 € · 🧃 3 € · 🍦 4 € · ⚽ 5 €\n\nWas kostet dein Einkauf?",
          folie34: "🛒 **Der Kopf-Laden**\n\n🍎 0,40 € · 🥨 0,80 € · 🧃 1,20 € · 🍦 1,50 € · 📒 2,30 €\n\nWas kostet es? Wie viel Wechselgeld von 5 €?",
          kern: ["12", "34"],
          emoji: "🛒",
          warum: "Wir kaufen ein – im Kopf." }
    ],
    ab12: { titel: "In Lottas Kiosk", kontext: "🍎 Apfel 1 € · 🍪 Keks 2 € · 🧃 Saft 3 € · 🍦 Eis 4 €", aufgaben: [
        { typ: "tabelle", text: "Was kostet das zusammen?", spalten: ["Einkauf", "Euro"],
          zeilen: [["🍎 + 🍪", ""], ["🧃 + 🍎", ""], ["🍦 + 🍪", ""], ["🍪 + 🍪 + 🍎", ""]] },
        { typ: "malen", text: "Du hast 5 €. Male, was du kaufst.", bild: "" }
    ]},
    ab34: { titel: "Am Waffelstand", kontext: "Waffel 1,50 € · Waffel mit Puderzucker 1,80 € · Apfelschorle 0,90 €", aufgaben: [
        { typ: "tabelle", text: "Rechne den Preis und das Wechselgeld aus.", spalten: ["Einkauf", "Preis", "bezahlt", "zurück"],
          zeilen: [["1 Waffel + 1 Schorle", "", "5 €", ""], ["2 Waffeln mit Puderzucker", "", "5 €", ""], ["3 Schorlen", "", "10 €", ""], ["2 Waffeln + 2 Schorlen", "", "10 €", ""]] },
        { typ: "luecken", text: "Wie viele Cent?", nummern: false, saetze: ["1 € = ___ ct     2,50 € = ___ ct     0,90 € = ___ ct"] },
        { typ: "luecken", text: "Du hast 10 €. Was kaufst du? Rechne:", nummern: false, saetze: ["___"] }
    ]}
}),

/* ============================== GEMISCHT: DEUTSCH & MATHE ============================== */
SOZIAL_EINHEIT({
    id: "w-quizshow",
    titel: "Die große Klassen-Quizshow",
    kategorie: "Gemischt: Deutsch & Mathe",
    ohneVorbereitung: true,
    ziel12: "Fragen aus Deutsch und Mathe im Team beantworten",
    ziel34: "Wissensfragen im Team lösen und eigene Quizfragen schreiben",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die Quizshow im Wald", text:
`Im Wald gibt es heute eine Quizshow! Der Fuchs ist der Quizmaster. Team Eichhörnchen spielt gegen Team Igel.

„Erste Frage“, ruft der Fuchs. „Wie viele Beine hat ein Vogel?“ – „Zwei!“, ruft das Eichhörnchen. Richtig – ein Punkt!

„Zweite Frage: Was reimt sich auf Maus?“ – „Haus!“, ruft der Igel. Auch richtig!

Am Ende steht es unentschieden. „Dann gewinnen heute alle“, sagt der Fuchs. Und alle bekommen eine Nuss.

**Nach dem Vorlesen:**
1. Wer war der Quizmaster?
2. Welche Teams haben gespielt?
3. Wie viele Beine hat ein Vogel?
4. Was reimt sich auf Maus?` },
    lerntext34: { titel: "Hinter den Kulissen", text:
`Bei einer Quizshow im Fernsehen arbeiten viele Menschen, die man nicht sieht. Die Fragen-Schreiber denken sich jede Woche hunderte Fragen aus. Dabei achten sie auf drei Dinge: Die Frage muss klar sein. Es darf nur eine richtige Antwort geben. Und die Antwort muss stimmen – das prüfen sie mit Büchern und Lexika.

Eine gute Frage ist zum Beispiel: „Wie viele Minuten hat eine Stunde?“ Eine schlechte Frage wäre: „Was ist das beste Tier?“ – darauf gibt es keine richtige Antwort.

**Fragen zum Gespräch:**
1. Worauf achten Fragen-Schreiber?
2. Warum ist „Was ist das beste Tier?“ keine gute Quizfrage?
3. Denkt euch eine gute Quizfrage aus!` },
    uebungen: [
        { titel: "Quizshow in zwei Teams", fuer: "alle", dauer: "14 Min",
          text: "Die Klasse wird in zwei Teams geteilt (Fensterseite gegen Türseite). Du liest abwechselnd eine Frage vor. Das Team berät sich 10 Sekunden leise, dann antwortet ein Kind. Richtig = Punkt an der Tafel. Falsch = das andere Team darf antworten.\n\nKl. 1/2: Was ist 4 + 4? (8) · Was reimt sich auf Hose? (Rose, Dose) · Wie viele Tage hat eine Woche? (7) · Mit welchem Buchstaben fängt Apfel an? (A) · Was ist 10 − 3? (7) · Wie viele Beine hat eine Spinne? (8) · Welches Tier sagt „Kikeriki“? (Hahn) · Was ist das Doppelte von 5? (10)\nKl. 3/4: Was ist 7 · 8? (56) · Wie heißt die Mehrzahl von Maus? (Mäuse) · Wie viele Minuten hat eine Stunde? (60) · Welches Wort ist ein Nomen: laufen, Tisch, schön? (Tisch) · Was ist die Hälfte von 90? (45) · Wie viele Monate haben 31 Tage? (7) · Wie heißt die Vergangenheit von „ich gehe“? (ich ging) · Was ist 1000 − 1? (999)",
          quiz: "keine",
          folie: "🎤 **Die große Quizshow!**\n\nTeam Fenster 🪟 gegen Team Tür 🚪\n\n10 Sekunden leise beraten – dann antwortet ein Kind.",
          kern: ["12", "34"],
          emoji: "🎤",
          warum: "Wir spielen Quizshow in zwei Teams." }
    ],
    ab12: { titel: "Mein Quiz", aufgaben: [
        { typ: "ankreuzen", text: "Was ist 3 + 4?", nebeneinander: true, optionen: ["6", "7", "8"] },
        { typ: "ankreuzen", text: "Was reimt sich auf Haus?", nebeneinander: true, optionen: ["🐭 Maus", "🐟 Fisch", "🌳 Baum"] },
        { typ: "ankreuzen", text: "Wie viele Beine hat ein Hund?", nebeneinander: true, optionen: ["2", "4", "6"] },
        { typ: "ankreuzen", text: "Womit fängt 🌞 Sonne an?", nebeneinander: true, optionen: ["S", "O", "N"] },
        { typ: "malen", text: "Male dich als Quizmaster.", bild: "" }
    ]},
    ab34: { titel: "Quiz-Werkstatt", aufgaben: [
        { typ: "luecken", text: "Beantworte die Fragen.", nummern: true,
          saetze: ["Was ist 9 · 7? ___", "Wie heißt die Mehrzahl von Buch? ___", "Wie viele Sekunden hat eine Minute? ___", "Welches Wort ist ein Verb: Hund, springen, grün? ___"] },
        { typ: "tabelle", text: "Schreibe eigene Quizfragen – eine richtige Antwort!", spalten: ["Fach", "Frage", "Antwort"],
          zeilen: [["Deutsch", "", ""], ["Mathe", "", ""], ["Tiere", "", ""]] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-namen-mathe",
    titel: "Namen-Mathe",
    kategorie: "Gemischt: Deutsch & Mathe",
    ohneVorbereitung: true,
    ziel12: "Buchstaben im eigenen Namen zählen und vergleichen",
    ziel34: "Buchstaben, Silben und Selbstlaute zählen und Namen vergleichen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Der längste Name", text:
`In der Klasse 1b gibt es einen Streit. „Mein Name ist der längste!“, sagt Ben. Alle lachen. „Ben ist doch ganz kurz!“

Die Lehrerin schreibt die Namen an die Tafel: BEN, EMMA, LUKAS, JOSEFINE. Dann zählen alle zusammen die Buchstaben. Ben hat 3. Emma hat 4. Lukas hat 5. Und Josefine hat – 8!

„Aber mein Name ist der schnellste“, grinst Ben. „Den kann man am schnellsten rufen.“

**Nach dem Vorlesen:**
1. Wer wollte den längsten Namen haben?
2. Wie viele Buchstaben hat Ben?
3. Welcher Name war der längste?
4. Wie viele Buchstaben hat dein Name?` },
    lerntext34: { titel: "Die Namens-Statistik", text:
`Die Klasse 4c macht eine Namens-Statistik. Jedes Kind schreibt seinen Vornamen und zählt dreierlei: Buchstaben, Silben und Selbstlaute (a, e, i, o, u).

Maximilian: 10 Buchstaben, 5 Silben, 5 Selbstlaute. Ida: 3 Buchstaben, 2 Silben, 2 Selbstlaute. Sie stellen fest: Jede Silbe hat mindestens einen Selbstlaut. Und: In der Klasse fangen gleich vier Namen mit L an.

Zum Schluss rechnen sie aus, wie viele Buchstaben alle Namen der Klasse zusammen haben: 137!

**Fragen zum Gespräch:**
1. Was hat die Klasse gezählt?
2. Warum hat jede Silbe einen Selbstlaut?
3. Wie viele Buchstaben, Silben und Selbstlaute hat dein Name?` },
    uebungen: [
        { titel: "Namen-Aufstellung", fuer: "alle", dauer: "8 Min",
          text: "Alle zählen die Buchstaben ihres Vornamens. Dann stellen sich die Kinder vorn in einer Reihe auf – vom kürzesten zum längsten Namen – ohne zu sprechen, nur mit Fingerzeichen! Danach rufen alle nacheinander ihren Namen und die Zahl. Gibt es gleich lange Namen?",
          folie: "Zähl die **Buchstaben** deines Namens. 🔢\n\nStellt euch auf – vom **kürzesten** zum **längsten** Namen. Ohne Sprechen!",
          kern: ["12", "34"],
          emoji: "🔢",
          warum: "Wer hat den längsten Namen?" },
        { titel: "Anfangsbuchstaben-Rechnen", fuer: "34", dauer: "4 Min",
          text: "Frage: „Wie viele Kinder haben einen Namen mit A? Mit L? Mit M?“ Ein Kind macht an der Tafel eine Strichliste. Welcher Anfangsbuchstabe ist am häufigsten?",
          folie: "Mit welchem Buchstaben fangen **unsere Namen** an? 🔤\n\nStrichliste an der Tafel!",
          emoji: "🔤",
          warum: "Wir zählen Anfangsbuchstaben." }
    ],
    ab12: { titel: "Mein Name", aufgaben: [
        { typ: "luecken", nur: "", text: "Schreibe deinen Namen. Male unter jeden Buchstaben einen Punkt.", nummern: false, saetze: ["___"] },
        { typ: "ankreuzen", text: "Wie viele Buchstaben hat dein Name?", nebeneinander: true, optionen: ["2", "3", "4", "5", "6", "7", "8 oder mehr"] },
        { typ: "malen", text: "Male dich und schreibe deinen Namen groß dazu.", bild: "" }
    ]},
    ab34: { titel: "Namens-Statistik", aufgaben: [
        { typ: "tabelle", text: "Zähle bei deinem Namen und bei zwei Nachbarn.", spalten: ["Name", "Buchstaben", "Silben", "Selbstlaute"],
          zeilen: [["", "", "", ""], ["", "", "", ""], ["", "", "", ""]] },
        { typ: "luecken", text: "Rechne:", nummern: false, saetze: ["Alle drei Namen haben zusammen ___ Buchstaben.", "Der längste Name hat ___ Buchstaben mehr als der kürzeste."] },
        { typ: "luecken", text: "Finde ein Wort, das genauso viele Buchstaben hat wie dein Name:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-kalender",
    titel: "Kalender-Detektive",
    kategorie: "Gemischt: Deutsch & Mathe",
    ohneVorbereitung: true,
    ziel12: "Wochentage kennen und in der richtigen Reihenfolge nennen",
    ziel34: "Wochentage und Monate ordnen, mit Tagen und Wochen rechnen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die Woche der kleinen Raupe", text:
`Am **Montag** schlüpft eine kleine Raupe aus dem Ei. Sie hat Hunger und frisst ein Blatt.

Am **Dienstag** frisst sie zwei Blätter. Am **Mittwoch** drei. Am **Donnerstag** vier. Am **Freitag** fünf. Sie wird dick und rund.

Am **Samstag** ist sie so satt, dass sie nur noch schläft. Und am **Sonntag** spinnt sie sich ein – in ein kleines Haus aus Fäden.

Was wohl in der nächsten Woche passiert?

**Nach dem Vorlesen:**
1. An welchem Tag ist die Raupe geschlüpft?
2. Wie viele Blätter hat sie am Mittwoch gefressen?
3. Was hat sie am Sonntag gemacht?
4. Welcher Tag ist heute?` },
    lerntext34: { titel: "Ein Rätsel aus dem Kalender", text:
`Jakob schaut auf den Kalender. „Mein Geburtstag ist in genau 3 Wochen“, sagt er. „Heute ist Dienstag, der 4. März.“

Seine Schwester rechnet: 3 Wochen sind 21 Tage. 4 + 21 = 25. „Dein Geburtstag ist am 25. März – und wieder an einem Dienstag! Denn nach genau 7 Tagen ist immer wieder derselbe Wochentag.“

Jakob grinst: „Und wann ist dein Geburtstag?“ – „Am 31. März. Das ist 6 Tage nach deinem – also an einem Montag.“

**Fragen zum Gespräch:**
1. Warum ist Jakobs Geburtstag wieder an einem Dienstag?
2. Wie viele Tage haben 3 Wochen?
3. Welcher Wochentag ist 6 Tage nach einem Dienstag?` },
    uebungen: [
        { titel: "Wochentags-Kette", fuer: "alle", dauer: "5 Min",
          text: "Der Reihe nach sagt jedes Kind den nächsten Wochentag (Montag, Dienstag …). Nach Sonntag geht es wieder mit Montag weiter. Dann rückwärts. Kl. 3/4: mit den Monaten, und zusätzlich: Wer an einem Monat mit 31 Tagen dran ist, steht kurz auf.",
          folie: "**Montag, Dienstag, Mittwoch …** 📅\n\nJeder sagt den nächsten Tag. Dann rückwärts!",
          folie34: "**Januar, Februar, März …** 📅\n\nJeder sagt den nächsten Monat. Bei 31 Tagen: aufstehen!",
          kern: ["12", "34"],
          emoji: "📅",
          warum: "Wir sagen die Tage und Monate auf." },
        { titel: "Gestern – heute – morgen", fuer: "12", dauer: "4 Min",
          text: "Du fragst: Welcher Tag ist heute? Welcher war gestern? Welcher ist morgen? Welcher ist übermorgen? Die Kinder zeigen Daumen hoch, wenn die Antwort stimmt.",
          folie: "**Gestern · heute · morgen · übermorgen** ⏳\n\nWelcher Tag ist das?",
          emoji: "⏳",
          warum: "Welcher Tag war gestern?" },
        { titel: "Knöchel-Kalender", fuer: "34", dauer: "4 Min",
          text: "Zeige den Trick mit den Fingerknöcheln: Faust machen, auf Knöchel und Lücken der Reihe nach die Monate zählen. Knöchel = 31 Tage, Lücke = 30 Tage (Februar 28/29). Alle probieren es aus.",
          folie: "✊ Der **Knöchel-Trick**:\n\nKnöchel = 31 Tage · Lücke = 30 Tage (Februar: 28 oder 29)",
          kern: ["34"],
          emoji: "✊",
          warum: "Ein Trick für die Monatstage." }
    ],
    ab12: { titel: "Die Woche der Raupe", aufgaben: [
        { typ: "tabelle", text: "Wie viele Blätter frisst die Raupe? Male die Blätter oder schreib die Zahl.", spalten: ["Tag", "Blätter"],
          zeilen: [["Montag", "🍃"], ["Dienstag", "🍃 🍃"], ["Mittwoch", ""], ["Donnerstag", ""], ["Freitag", ""]] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Heute ist ___."] },
        { typ: "malen", text: "Male, was du am liebsten am Wochenende machst.", bild: "" }
    ]},
    ab34: { titel: "Kalender-Rätsel", aufgaben: [
        { typ: "luecken", text: "Rechne mit dem Kalender.", nummern: true,
          saetze: ["Heute ist Montag. Welcher Tag ist in 3 Tagen? ___", "Heute ist Freitag. Welcher Tag war vor 2 Tagen? ___", "Wie viele Tage haben 4 Wochen? ___", "Ein Fest ist am 10. Mai. Heute ist der 3. Mai. Wie viele Tage noch? ___"] },
        { typ: "tabelle", text: "Schreibe die Monate in die richtige Jahreszeit.", spalten: ["Frühling", "Sommer", "Herbst", "Winter"],
          zeilen: [["", "", "", ""], ["", "", "", ""], ["", "", "", ""]] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Geburtstag ist im Monat ___. Er hat ___ Tage."] }
    ]}
}),

/* ============================== KONZENTRATION & RUHE ============================== */
SOZIAL_EINHEIT({
    id: "w-mal-diktat",
    titel: "Mal-Diktat",
    kategorie: "Konzentration & Ruhe",
    ohneVorbereitung: true,
    ziel12: "Genau zuhören und nach Anweisung malen (oben, unten, links, rechts)",
    ziel34: "Nach Anweisung zeichnen und selbst ein Mal-Diktat schreiben",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Das Bild von Oma Rosi", text:
`Oma Rosi wohnt weit weg. Am Telefon sagt sie zu Tim: „Ich male dir mein Haus. Aber du musst es selbst malen. Ich sage dir, wie.“

„Male ein großes Haus in die Mitte. Oben drauf ein rotes Dach. Links neben dem Haus steht ein Baum mit Äpfeln. Rechts oben scheint die Sonne. Und unten vor der Tür sitzt meine Katze.“

Tim malt und malt. Eine Woche später besucht er Oma Rosi. Er staunt: Ihr Haus sieht genauso aus wie auf seinem Bild!

**Nach dem Vorlesen:**
1. Was sollte Tim in die Mitte malen?
2. Was stand links neben dem Haus?
3. Wo schien die Sonne?
4. Wer saß vor der Tür?` },
    lerntext34: { titel: "Der Zeichner der Polizei", text:
`Bei der Polizei arbeitet ein besonderer Zeichner. Wenn jemand etwas beobachtet hat, beschreibt er es – und der Zeichner malt nur nach Worten.

„Das Fahrrad war rot. Vorne hatte es einen Korb, hinten einen Kindersitz. Am Lenker hing eine grüne Klingel.“

Damit das klappt, muss man genau beschreiben: Wo ist etwas – oben, unten, links, rechts? Wie groß ist es? Welche Farbe hat es?

Am Ende vergleicht man das Bild mit dem echten Fahrrad. Es passt fast perfekt!

**Fragen zum Gespräch:**
1. Wie kann man nur nach Worten malen?
2. Welche Wörter helfen beim Beschreiben? (oben, unten, neben, zwischen …)
3. Was ist schwer daran?` },
    uebungen: [
        { titel: "Mal-Diktat", fuer: "alle", dauer: "10 Min",
          text: "Die Kinder malen auf dem Arbeitsblatt. Du liest langsam vor, nach jedem Satz Pause. Nicht zum Nachbarn schauen!\n\nKl. 1/2:\n1. Male unten einen langen grünen Strich – das ist die Wiese.\n2. Male in die Mitte ein großes Haus.\n3. Setze ein Dreieck als Dach darauf.\n4. Male oben rechts eine Sonne.\n5. Male links neben das Haus einen Baum.\n6. Male eine Blume vor die Haustür.\n\nKl. 3/4:\n1. Zeichne in die Mitte einen großen Kreis – das ist ein Kopf.\n2. Male oben auf den Kopf drei Haare, die hochstehen.\n3. Das linke Auge ist ein Kreis, das rechte Auge ist zu (ein Strich).\n4. Zeichne einen Mund, der lacht, mit zwei Zähnen.\n5. Male links unten neben den Kopf einen Luftballon.\n6. Male rechts oben eine Wolke mit drei Regentropfen.\n\nDanach vergleichen die Tischnachbarn: Wie ähnlich sind die Bilder?",
          quiz: "keine",
          folie: "Hör genau zu und **male nur, was ich sage**. 👂✏️\n\nNicht zum Nachbarn schauen!",
          kern: ["12", "34"],
          emoji: "✏️",
          warum: "Wir malen genau nach Worten." }
    ],
    ab12: { titel: "Mein Mal-Diktat", aufgaben: [
        { typ: "malen", text: "Male genau, was vorgelesen wird.", bild: "" },
        { typ: "ankreuzen", text: "Wo ist die Sonne auf deinem Bild?", nebeneinander: true, optionen: ["oben links", "oben rechts", "unten"] }
    ]},
    ab34: { titel: "Mal-Diktat", aufgaben: [
        { typ: "malen", text: "Zeichne genau, was vorgelesen wird.", bild: "" },
        { typ: "schreiben", text: "Schreibe ein eigenes Mal-Diktat mit 4 Sätzen. Benutze oben, unten, links, rechts, neben.", zeilen: 4 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-leise-spiele",
    titel: "Leise Spiele",
    kategorie: "Konzentration & Ruhe",
    ohneVorbereitung: true,
    ziel12: "In ruhigen Spielen genau beobachten und leise sein",
    ziel34: "Ruhige Spiele spielen und Regeln für ein leises Spiel erfinden",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die leise Eule", text:
`Im Wald ist es laut. Die Vögel zwitschern, der Specht klopft, die Frösche quaken.

Nur Eule Ella ist ganz leise. „Warum bist du so still?“, fragt der Frosch.

„Wenn ich leise bin, kann ich alles hören“, flüstert Ella. „Ich höre den Wind in den Blättern. Ich höre die Maus im Gras. Und ich höre sogar, wie die Schnecke kriecht.“

Da werden alle Tiere still. Und plötzlich hören sie es auch: das Rauschen, das Rascheln, das ganz leise Schmatzen der Schnecke.

**Nach dem Vorlesen:**
1. Wer war im Wald laut?
2. Warum war Ella leise?
3. Was konnte Ella alles hören?
4. Was hörst du, wenn alle ganz leise sind?` },
    lerntext34: { titel: "Die Kunst der Stille", text:
`In manchen Klöstern sprechen die Menschen den ganzen Tag kaum ein Wort. Trotzdem verstehen sie sich – mit Blicken, Gesten und Zeichen.

Wer still ist, merkt mehr: Wie jemand guckt. Wer sich bewegt. Was im Raum passiert. Forscher haben herausgefunden, dass schon zwei Minuten Stille das Herz ruhiger schlagen lassen.

Heute probieren wir es aus: Spiele, bei denen man nichts sagen muss – nur genau hinschauen.

**Fragen zum Gespräch:**
1. Wie verständigen sich Menschen, die nicht sprechen?
2. Was merkt man, wenn man still ist?
3. Wann ist es dir zu laut?` },
    uebungen: [
        { titel: "Eine Minute hören", fuer: "alle", dauer: "3 Min",
          text: "Alle legen den Kopf auf die Arme oder schließen die Augen. Eine Minute ganz still sein und zählen, wie viele verschiedene Geräusche man hört. Danach erzählen ein paar Kinder.",
          folie: "Augen zu. **Eine Minute** ganz still. 🤫\n\nWie viele Geräusche hörst du?",
          kern: ["12", "34"],
          emoji: "🤫",
          warum: "Was hört man, wenn es ganz still ist?" },
        { titel: "Wer ist der Dirigent?", fuer: "alle", dauer: "8 Min",
          text: "Ein Kind geht kurz vor die Tür. Die Klasse bestimmt leise einen Dirigenten. Der macht am Platz Bewegungen vor (klopfen, Arme hoch, Nase reiben), alle machen sofort nach. Das Kind kommt herein und muss herausfinden, wer der Dirigent ist – es hat drei Versuche. Tipp für den Dirigenten: Bewegung wechseln, wenn das Kind gerade nicht hinschaut.",
          folie: "Alle machen nach, was der **Dirigent** macht. 🎼\n\nWer ist es? Drei Versuche!",
          kern: ["12", "34"],
          emoji: "🎼",
          warum: "Finde heraus, wer die Bewegungen vormacht." },
        { titel: "Stille Post", fuer: "alle", dauer: "4 Min",
          text: "Du flüsterst dem ersten Kind einen Satz ins Ohr (Kl. 1/2: „Der Hund frisst eine Banane.“ Kl. 3/4: „Am Mittwoch fliegt Oma mit dem Fahrrad nach Paris.“). Er wird von Kind zu Kind weitergeflüstert, nur einmal. Das letzte Kind sagt laut, was angekommen ist.",
          folie: "Ein Satz wird **geflüstert** – von Ohr zu Ohr. 👂\n\nWas kommt am Ende an?",
          emoji: "👂",
          warum: "Was kommt am Ende an?" }
    ],
    ab12: { titel: "Leise sein", aufgaben: [
        { typ: "ankreuzen", text: "Was hast du in der leisen Minute gehört? Kreuze an.", nebeneinander: true, optionen: ["🚗 Auto", "🐦 Vogel", "👣 Schritte", "💨 Wind", "🗣️ Stimmen", "👃 Atmen"] },
        { typ: "malen", text: "Male einen ganz leisen Ort.", bild: "" }
    ]},
    ab34: { titel: "Stille-Forscher", aufgaben: [
        { typ: "luecken", text: "Diese Geräusche habe ich in der leisen Minute gehört:", nummern: false, saetze: ["___"] },
        { typ: "luecken", text: "Erfinde ein eigenes leises Spiel:", nummern: false, saetze: ["Name: ___", "So geht es: ___", "___", "Regel: ___"] },
        { typ: "malen", text: "Male einen Ort, an dem du gern still bist.", bild: "" }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-vorlese-kino",
    titel: "Vorlese-Kino",
    kategorie: "Konzentration & Ruhe",
    ohneVorbereitung: true,
    ziel12: "Einer längeren Geschichte zuhören und das Wichtigste malen",
    ziel34: "Eine Geschichte genau hören, nacherzählen und ein Filmplakat gestalten",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Der Leuchtturm-Wärter und die kleine Möwe", text:
`Ganz oben im Leuchtturm wohnt Herr Hansen. Jeden Abend macht er das große Licht an, damit die Schiffe den Weg finden.

Eines Abends kommt ein Sturm. Der Wind heult, die Wellen sind riesig. Da klopft es am Fenster. Draußen sitzt eine kleine Möwe. Sie ist ganz nass und zittert.

Herr Hansen macht das Fenster auf. „Komm rein, kleine Möwe!“ Er trocknet sie mit einem Handtuch und gibt ihr ein Stück Brot.

Die ganze Nacht sitzen die beiden zusammen am Fenster und schauen auf das Meer. Das große Licht dreht sich und dreht sich. Und dann sieht Herr Hansen ein kleines Fischerboot. Es fährt dem Licht entgegen – sicher in den Hafen.

Am Morgen ist der Sturm vorbei. Die Sonne scheint. Die Möwe fliegt los. Aber am Abend kommt sie wieder. Und am nächsten Abend auch.

Seitdem ist Herr Hansen nie mehr allein im Leuchtturm.

**Nach dem Vorlesen:**
1. Wo wohnt Herr Hansen?
2. Wer klopft beim Sturm am Fenster?
3. Was hat das Licht dem Fischerboot gezeigt?
4. Warum ist Herr Hansen am Ende nicht mehr allein?` },
    lerntext34: { titel: "Das Geheimnis der Bibliothek", text:
`Jeden Dienstag geht Elif in die Stadtbibliothek. Sie mag den Geruch der Bücher und die Stille. Doch an diesem Dienstag ist etwas anders: Auf ihrem Lieblingsplatz am Fenster liegt ein Buch ohne Titel.

Elif schlägt es auf. Die erste Seite ist leer. Auf der zweiten steht in schöner Schrift: „Wer mich findet, bekommt eine Aufgabe.“ Auf der dritten: „Suche das Buch mit dem roten Drachen.“

Elif geht durch die Regale. Bei den Märchen findet sie es – ein dickes Buch mit einem Drachen auf dem Rücken. Darin steckt ein Zettel: „Gut gemacht! Jetzt suche das kleinste Buch der Bibliothek.“

Es dauert lange. Ganz unten im Regal für Gedichte findet sie es, kaum größer als eine Streichholzschachtel. Auf der letzten Seite steht: „Du hast die Bibliothek erforscht wie niemand vorher. Komm am Dienstag wieder – dann beginnt das nächste Rätsel.“

Elif lächelt. Hinter der Theke zwinkert ihr die Bibliothekarin zu.

**Fragen zum Gespräch:**
1. Was fand Elif auf ihrem Lieblingsplatz?
2. Welche zwei Bücher musste sie suchen?
3. Wer hat das Rätsel wohl versteckt – und woran merkt man das?
4. Wie könnte es am nächsten Dienstag weitergehen?` },
    uebungen: [
        { titel: "Kino-Ritual", fuer: "alle", dauer: "2 Min",
          text: "„Das Kino beginnt“: Alle setzen sich bequem hin, Hände auf den Tisch oder Kopf auf die Arme. Wer mag, schließt die Augen. Du dämpfst das Licht, wenn das geht.",
          folie: "🎬 **Das Vorlese-Kino beginnt!**\n\nSetz dich bequem hin. Hör gut zu – die Bilder entstehen in deinem Kopf.",
          kern: ["12", "34"],
          emoji: "🎬",
          warum: "Gleich beginnt das Kino im Kopf." },
        { titel: "Kino-Gespräch", fuer: "alle", dauer: "6 Min",
          text: "Nach dem Vorlesen erzählen die Kinder die Geschichte gemeinsam nach – jedes Kind einen Satz, in der richtigen Reihenfolge. Dann: Welche Stelle war am spannendsten? Welche Szene käme aufs Filmplakat?",
          folie: "Wir erzählen die Geschichte nach – **jeder einen Satz**. 🍿\n\nWelche Szene kommt aufs Filmplakat?",
          kern: ["12", "34"],
          emoji: "🍿",
          warum: "Wir erzählen die Geschichte nach." }
    ],
    ab12: { titel: "Mein Kino-Bild", kontext: "Der Leuchtturm-Wärter und die kleine Möwe", aufgaben: [
        { typ: "malen", text: "Male die schönste Stelle der Geschichte.", bild: "" },
        { typ: "ankreuzen", text: "Wer klopft beim Sturm ans Fenster?", nebeneinander: true, optionen: ["🐟 Fisch", "🐦 Möwe", "🐱 Katze"] },
        { typ: "ankreuzen", text: "Wie hat dir die Geschichte gefallen?", nebeneinander: true, optionen: ["😀", "🙂", "😐"] }
    ]},
    ab34: { titel: "Mein Filmplakat", kontext: "Das Geheimnis der Bibliothek", aufgaben: [
        { typ: "malen", text: "Gestalte ein Filmplakat zur Geschichte – mit Titel und der wichtigsten Szene.", bild: "" },
        { typ: "luecken", text: "Erzähle in drei Sätzen nach:", nummern: true, saetze: ["Am Anfang ___", "Dann ___", "Am Ende ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Am nächsten Dienstag findet Elif ___"] }
    ]}
})

);
