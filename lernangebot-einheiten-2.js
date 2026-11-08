/* ============================================================
   Leuchtturm – Lernangebot: Vorlagen Teil 2 (Mathe)
   ============================================================ */
window.SOZIAL_VORLAGEN.push(

/* ============================== MATHE: ZAHLEN & RECHNEN ============================== */
SOZIAL_EINHEIT({
    id: "l-zahlenland",
    titel: "Im Zahlenland",
    kategorie: "Mathe: Zahlen & Rechnen",
    ziel12: "Mengen schnell erkennen und Zahlen bis 10 (Kl. 2: bis 20 und 100) sicher zuordnen",
    ziel34: "Zahlen bis 1000 mit Hundertern, Zehnern und Einern verstehen",
    material: "Zahlenkarten 1–4 (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Blitzblick: Punkte im Zwanzigerfeld kurz zeigen – wie viele waren es?",
    warmup34: "Zahlenstrahl: Wo steht die Zahl ungefähr?",
    tafel: [
        { werkzeug: "zwanzigerfeld", titel: "Blitzblick: Zwanzigerfeld bis 10", fuer: "12", einstellung: { bis: 10 } },
        { werkzeug: "zwanzigerfeld", titel: "Blitzblick bis 20", fuer: "12", einstellung: { bis: 20 } },
        { werkzeug: "stellenwert", titel: "Stellenwert-Tafel bis 1000", fuer: "34", einstellung: { bis: 1000 } },
        { werkzeug: "zahlenstrahl", titel: "Zahlenstrahl bis 1000", fuer: "34", einstellung: { bis: 1000 } }
    ],
    lerntext12: { titel: "Der Zähl-Zwerg", text:
`Im Zahlenland wohnt Zähl-Zwerg Zippo. Er ist sehr schnell. Er kann Dinge zählen, ohne einzeln zu zählen!

„Wie machst du das?“, fragt der Hase. Zippo lacht. „Schau mal: Fünf Punkte sehen aus wie eine Hand. Und zehn Punkte wie zwei Hände.“

Er zeigt dem Hasen eine Reihe mit fünf Punkten und noch zwei dazu. „Fünf und zwei – das sind sieben!“

Der Hase staunt. „Ich will auch so schnell zählen!“

**Nach dem Vorlesen:**
1. Wie zählt Zippo so schnell?
2. Wie viele Punkte sind eine Hand?
3. Zeig mit deinen Fingern: fünf und zwei.` },
    lerntext34: { titel: "Das Stadion", text:
`Im Stadion sitzen viele Fans. Die Sitzplätze sind in Blöcken: In jedem großen Block sitzen 100 Leute, in jeder Reihe 10.

Der Stadionsprecher sagt: „Heute sind drei volle Blöcke da, dazu vier volle Reihen und noch sieben einzelne Fans.“

Lina rechnet: „Drei Hunderter, vier Zehner, sieben Einer. Das sind 347!“

„Und wenn noch ein Block dazukommt?“, fragt ihr Bruder. „Dann ändert sich nur die erste Ziffer: 447.“

**Fragen zum Gespräch:**
1. Wie viele Fans sind im Stadion?
2. Was bedeutet die 3 in 347?
3. Was passiert, wenn noch drei Fans dazukommen?` },
    uebungen: [
        { titel: "Blitzblick", fuer: "12", dauer: "8 Min", kern: ["12"],
          text: "Starte an der Tafel das Werkzeug „Blitzblick: Zwanzigerfeld“. Die Punkte erscheinen nur kurz. Die Kinder zeigen die Anzahl mit den Fingern – nicht zählen, sondern „blitzen“! Danach auflösen: Wie hast du es so schnell gesehen? (5 und 2 …)",
          folie: "Die Punkte blitzen nur **kurz** auf. ⚡\n\nZeig mit den Fingern, wie viele es waren!",
          emoji: "⚡", warum: "Wer Mengen schnell sieht, rechnet schneller." },
        { titel: "Zahlen-Detektiv", fuer: "34", dauer: "8 Min", kern: ["34"],
          text: "Du zeigst eine Zahl. Die Kinder zeigen mit der Zahlenkarte die richtige Zerlegung.\n- 347\n- 470\n- 704\n- 407",
          antworten: ["1️⃣ 4 H, 0 Z, 7 E", "2️⃣ 3 H, 4 Z, 7 E", "3️⃣ 4 H, 7 Z, 0 E", "4️⃣ 7 H, 0 Z, 4 E"], loesungen: ["2", "3", "4", "1"],
          folie: "Welche Zerlegung passt zur Zahl?\n\nH = Hunderter · Z = Zehner · E = Einer",
          emoji: "🔎", warum: "Jede Ziffer hat ihren Platz und ihren Wert." },
        { titel: "Nachbarzahlen", fuer: "alle", dauer: "4 Min",
          text: "Du nennst eine Zahl. Ein Kind nennt den Vorgänger (eins weniger), ein anderes den Nachfolger (eins mehr). Kl. 1/2 im Zahlenraum bis 20, Kl. 3/4 bis 1000 (auch Nachbarzehner und -hunderter).",
          folie: "Wer wohnt **links** und **rechts** neben der Zahl? 🏠 🏠 🏠", emoji: "🏠" }
    ],
    ab12: { titel: "Im Zahlenland", aufgaben: [
        { typ: "zuordnen", text: "Verbinde die Punkte mit der Zahl.", nur: "1", links: ["●●●", "●●●●● ●", "●●●●● ●●●●", "●●"], rechts: ["9", "2", "6", "3"] },
        { typ: "tabelle", text: "Wie viele sind es? Schreibe die Zahl.", nur: "", kreuz: [], spalten: ["Bild", "Zahl"], zeilen: [["●●●●● ●●", ""], ["●●●●● ●●●●●", ""], ["●●●●", ""], ["●●●●● ●●●", ""]] },
        { typ: "tabelle", text: "Schreibe die Nachbarzahlen.", nur: "2", kreuz: [], spalten: ["Vorgänger", "Zahl", "Nachfolger"], zeilen: [["", "7", ""], ["", "13", ""], ["", "40", ""], ["", "99", ""]] },
        { typ: "malen", text: "Male 8 Äpfel – immer 5 in eine Reihe.", bild: "" }
    ]},
    ab34: { titel: "Zahlen bis 1000", aufgaben: [
        { typ: "tabelle", text: "Trage ein.", spalten: ["Zahl", "H", "Z", "E"], zeilen: [["347", "", "", ""], ["605", "", "", ""], ["", "8", "1", "2"], ["", "4", "0", "9"], ["990", "", "", ""]] },
        { typ: "luecken", text: "Nachbarzahlen, Nachbarzehner, Nachbarhunderter.", nummern: true, saetze: ["___ 456 ___", "___ < 372 < ___   (Zehner)", "___ < 538 < ___   (Hunderter)"] },
        { typ: "luecken", text: "Setze <, > oder = ein.", nummern: false, saetze: ["407 ___ 470     999 ___ 1000     350 ___ 305     600 ___ 6 H"] },
        { typ: "schreiben", text: "Bilde mit den Ziffern 3, 8 und 1 die größte und die kleinste Zahl.", zeilen: 1 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-zahlenhaeuser",
    titel: "Zahlenhäuser",
    kategorie: "Mathe: Zahlen & Rechnen",
    ziel12: "Zahlen bis 10 zerlegen (Kl. 2: Ergänzen bis 20)",
    ziel34: "Zahlen bis 100 zerlegen und zum nächsten Zehner/Hunderter ergänzen",
    material: "Zahlenkarten 1–4 (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Finger-Blitz: Du zeigst 3 Finger – die Kinder zeigen, wie viele noch bis 5 (bis 10) fehlen",
    warmup34: "Blitzrechnen: Ergänzen zum Zehner",
    tafel: [
        { werkzeug: "blitzrechnen", titel: "Ergänzen bis 10", fuer: "12", einstellung: { art: "ergaenzen", bis: 10 } },
        { werkzeug: "blitzrechnen", titel: "Ergänzen bis 100", fuer: "34", einstellung: { art: "ergaenzen", bis: 100 } }
    ],
    lerntext12: { titel: "Das Haus der 10", text:
`In der Zahlenstraße steht ein hohes Haus. Oben auf dem Dach steht die Zahl 10. In jedem Stockwerk wohnen zwei Zahlen. Zusammen sind sie immer 10.

Im ersten Stock wohnen die 9 und die 1. Im zweiten Stock die 8 und die 2. Im dritten Stock … klingelt es. Die 7 steht vor der Tür. „Wer wohnt mit mir zusammen?“

Die Kinder überlegen. 7 und … 3! „Genau“, sagt die 7 und geht hinein.

**Nach dem Vorlesen:**
1. Welche Zahl steht auf dem Dach?
2. Wer wohnt mit der 7 zusammen?
3. Wer wohnt mit der 6 zusammen? Zeig es mit den Fingern.` },
    lerntext34: { titel: "Das Taschengeld", text:
`Jakob spart auf ein Skateboard für 100 Euro. Er hat schon 64 Euro.

„Wie viel fehlt noch?“, fragt seine Oma. Jakob rechnet: „Erst bis zum nächsten Zehner: 64 plus 6 sind 70. Dann bis 100: noch 30. Zusammen 36 Euro.“

Oma lächelt. „Ergänzen in zwei Schritten – das ist schlau.“ Sie gibt ihm 6 Euro. „Damit bist du wenigstens schon bei 70.“

**Fragen zum Gespräch:**
1. Wie viel Geld fehlt Jakob am Anfang?
2. Wie hat Jakob gerechnet?
3. Wie viel fehlt ihm jetzt noch?` },
    uebungen: [
        { titel: "Wer wohnt im Haus?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst eine Aufgabe. Die Kinder zeigen mit der Zahlenkarte die richtige Lösung.\n- 7 + ? = 10\n- 4 + ? = 10\n- 2 + ? = 10\n- 5 + ? = 10",
          text34: "Du zeigst eine Aufgabe. Die Kinder zeigen mit der Zahlenkarte die richtige Lösung.\n- 64 + ? = 100\n- 47 + ? = 50\n- 380 + ? = 400\n- 25 + ? = 100",
          antworten: ["1️⃣ 3", "2️⃣ 6", "3️⃣ 8", "4️⃣ 5"], loesungen12: ["1", "2", "3", "4"],
          antworten34: ["1️⃣ 3", "2️⃣ 20", "3️⃣ 36", "4️⃣ 75"], loesungen34: ["3", "1", "2", "4"],
          folie: "Wie viel fehlt? Zeig deine **Zahlenkarte**!",
          emoji: "🏠", warum: "Wer Zahlen zerlegen kann, rechnet leichter." },
        { titel: "Schüttel-Box", fuer: "12", dauer: "5 Min",
          text: "Du nimmst 10 kleine Dinge (Steine, Radiergummis) in beide Hände. Eine Hand öffnest du – die Kinder sehen z. B. 4. Wie viele sind in der anderen Hand? Wer es weiß, zeigt die Zahl mit den Fingern.",
          folie: "In meinen Händen sind **10** Dinge. ✋🤚\n\nWie viele sind in der geschlossenen Hand?", emoji: "✋" }
    ],
    ab12: { titel: "Zahlenhäuser", aufgaben: [
        { typ: "tabelle", text: "Das Haus der 10: Wer wohnt zusammen?", nur: "", spalten: ["10", "10"], zeilen: [["9", ""], ["7", ""], ["5", ""], ["", "2"], ["", "6"]] },
        { typ: "zuordnen", text: "Verbinde: Zusammen sind es 5.", nur: "1", links: ["●", "●●", "●●●●"], rechts: ["●", "●●●●", "●●●"] },
        { typ: "luecken", text: "Ergänze bis 20.", nur: "2", nummern: false, saetze: ["15 + ___ = 20     12 + ___ = 20     18 + ___ = 20", "11 + ___ = 20     16 + ___ = 20     19 + ___ = 20"] },
        { typ: "malen", text: "Male ein Haus der 6 mit allen Bewohnern.", bild: "" }
    ]},
    ab34: { titel: "Zahlenhäuser bis 100", aufgaben: [
        { typ: "tabelle", text: "Das Haus der 100: Ergänze.", spalten: ["100", "100"], zeilen: [["60", ""], ["35", ""], ["", "48"], ["73", ""], ["", "9"]] },
        { typ: "luecken", text: "Ergänze zum nächsten Zehner, dann zum nächsten Hunderter.", nummern: false, saetze: ["47 + ___ = 50     83 + ___ = 90     26 + ___ = 30", "340 + ___ = 400     720 + ___ = 800     950 + ___ = 1000"] },
        { typ: "luecken", text: "Rechengeschichte: Mia hat 58 Sticker. Das Album hat Platz für 100. Wie viele fehlen?", nummern: false, saetze: ["Rechnung: ___", "Antwort: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-rechenprofis",
    titel: "Rechen-Profis: Plus & Minus",
    kategorie: "Mathe: Zahlen & Rechnen",
    ziel12: "Plus- und Minusaufgaben bis 10 (Kl. 2: bis 20, auch über den Zehner) lösen",
    ziel34: "Plus und Minus im Zahlenraum bis 100/1000 geschickt rechnen",
    material: "Rote und grüne Karten (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Blitzrechnen bis 10 an der Tafel",
    warmup34: "Blitzrechnen bis 100 an der Tafel",
    tafel: [
        { werkzeug: "blitzrechnen", titel: "Blitzrechnen Plus & Minus bis 10", fuer: "12", einstellung: { art: "plusminus", bis: 10 } },
        { werkzeug: "blitzrechnen", titel: "Blitzrechnen bis 20", fuer: "12", einstellung: { art: "plusminus", bis: 20 } },
        { werkzeug: "blitzrechnen", titel: "Blitzrechnen bis 100", fuer: "34", einstellung: { art: "plusminus", bis: 100 } },
        { werkzeug: "blitzrechnen", titel: "Blitzrechnen bis 1000", fuer: "34", einstellung: { art: "plusminus", bis: 1000 } }
    ],
    lerntext12: { titel: "Der Bus der Tiere", text:
`Ein kleiner Bus fährt durch den Wald. Am Anfang sitzen 3 Tiere drin: ein Hase, ein Fuchs und ein Igel.

An der ersten Haltestelle steigen 2 Mäuse ein. Jetzt sind es 5 Tiere.

An der zweiten Haltestelle steigt der Fuchs aus. Er wohnt dort. Jetzt sind es nur noch 4.

An der letzten Haltestelle steigen alle aus. Der Bus ist leer. Der Busfahrer ruft: „Tschüss, bis morgen!“

**Nach dem Vorlesen:**
1. Wie viele Tiere sind am Anfang im Bus?
2. Wie viele sind es, als die Mäuse einsteigen?
3. Was passiert an der zweiten Haltestelle? Rechne mit!` },
    lerntext34: { titel: "Der Highscore", text:
`Elif und Paul spielen ein Computerspiel. Elif hat 465 Punkte. Paul hat 389.

„Wie viele Punkte hast du mehr?“, fragt Paul. Elif rechnet im Kopf: „Von 389 bis 400 sind es 11. Von 400 bis 465 sind es 65. Zusammen 76.“

Paul ist beeindruckt. „Und wenn ich jetzt noch 80 Punkte schaffe?“ – „Dann hast du 469 und bist 4 vor mir.“

**Fragen zum Gespräch:**
1. Wer hat mehr Punkte, und wie viele mehr?
2. Wie hat Elif gerechnet?
3. Welchen Rechentrick kennst du für schwierige Aufgaben?` },
    uebungen: [
        { titel: "Blitzrechnen", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Starte das Tafel-Werkzeug „Blitzrechnen“ (Kl. 1/2 bis 10 oder 20, Kl. 3/4 bis 100). Alle rechnen still, zeigen die Lösung mit den Fingern (Kl. 1/2) oder schreiben sie auf einen Schmierzettel. Auf Tipp wird die Lösung gezeigt.",
          folie: "Rechne **im Kopf**. 🧠\n\nZeig die Lösung – erst auf mein Zeichen!",
          emoji: "⚡", warum: "Kopfrechnen trainiert wie Sport." },
        { titel: "Stimmt die Rechnung?", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Du zeigst Aufgaben mit Lösung. Stimmt sie, heben die Kinder grün, sonst rot. Bei Rot: Wer weiß die richtige Lösung?\n- 4 + 3 = 7\n- 6 − 2 = 3\n- 8 + 2 = 10\n- 9 − 4 = 5\n- 7 + 6 = 12\n- 15 − 5 = 10",
          text34: "Du zeigst Aufgaben mit Lösung. Stimmt sie, heben die Kinder grün, sonst rot. Bei Rot: Wer weiß die richtige Lösung?\n- 47 + 25 = 72\n- 83 − 38 = 55\n- 250 + 370 = 620\n- 600 − 245 = 365\n- 99 + 99 = 198\n- 1000 − 1 = 990",
          quiz: "ampel", loesungen12: ["1", "2", "1", "1", "2", "1"], loesungen34: ["1", "2", "1", "2", "1", "2"],
          folie: "Stimmt die Rechnung?\n\n🟢 richtig · 🔴 falsch", emoji: "✅" }
    ],
    ab12: { titel: "Rechen-Profis", aufgaben: [
        { typ: "tabelle", text: "Rechne.", nur: "1", spalten: ["Aufgabe", "Ergebnis"], zeilen: [["●●● + ●● = ", ""], ["2 + 3 =", ""], ["4 + 4 =", ""], ["6 − 1 =", ""], ["5 − 3 =", ""], ["7 + 2 =", ""]] },
        { typ: "luecken", text: "Rechne.", nur: "2", nummern: false, saetze: ["8 + 5 = ___     7 + 6 = ___     9 + 4 = ___", "13 − 5 = ___     15 − 7 = ___     12 − 4 = ___", "6 + ___ = 14     ___ + 9 = 17     20 − ___ = 11"] },
        { typ: "zuordnen", text: "Verbinde Aufgabe und Ergebnis.", links: ["3 + 3", "8 − 4", "5 + 4", "10 − 3"], rechts: ["7", "9", "6", "4"] },
        { typ: "malen", text: "Male eine Rechengeschichte zu 3 + 2.", bild: "" }
    ]},
    ab34: { titel: "Rechen-Profis", aufgaben: [
        { typ: "luecken", text: "Rechne geschickt.", nummern: false, saetze: ["47 + 25 = ___     68 + 17 = ___     99 + 36 = ___", "82 − 37 = ___     70 − 26 = ___     100 − 58 = ___", "340 + 280 = ___     710 − 350 = ___     505 − 98 = ___"] },
        { typ: "luecken", text: "Finde die fehlende Zahl.", nummern: false, saetze: ["45 + ___ = 81     ___ − 28 = 47     600 − ___ = 275"] },
        { typ: "tabelle", text: "Rechenkette: Rechne immer weiter.", kreuz: [], spalten: ["Start", "+ 35", "− 18", "+ 46", "− 70"], zeilen: [["50", "", "", "", ""], ["120", "", "", "", ""]] },
        { typ: "schreiben", text: "Welchen Rechentrick hast du benutzt? Erkläre an einem Beispiel.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-verdoppeln",
    titel: "Verdoppeln & Halbieren",
    kategorie: "Mathe: Zahlen & Rechnen",
    ziel12: "Zahlen bis 5 (Kl. 2: bis 10) verdoppeln und gerade Zahlen halbieren",
    ziel34: "Verdoppeln und Halbieren bis 100 – als Trick für das Einmaleins",
    material: "Ein Spiegel oder Handy-Kamera (optional)\nZahlenkarten 1–4 (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Finger-Spiegel: Du zeigst an einer Hand 3 Finger, die Kinder zeigen „doppelt so viele“ mit beiden Händen",
    warmup34: "Blitzrechnen: Verdoppeln bis 100",
    tafel: [
        { werkzeug: "blitzrechnen", titel: "Verdoppeln bis 10", fuer: "12", einstellung: { art: "verdoppeln", bis: 10 } },
        { werkzeug: "blitzrechnen", titel: "Halbieren bis 20", fuer: "12", einstellung: { art: "halbieren", bis: 20 } },
        { werkzeug: "blitzrechnen", titel: "Verdoppeln bis 100", fuer: "34", einstellung: { art: "verdoppeln", bis: 100 } },
        { werkzeug: "blitzrechnen", titel: "Halbieren bis 200", fuer: "34", einstellung: { art: "halbieren", bis: 200 } }
    ],
    lerntext12: { titel: "Der Zauberspiegel", text:
`Lena findet auf dem Dachboden einen alten Spiegel. Sie legt einen Apfel davor – und im Spiegel ist noch ein Apfel! Jetzt sind es zwei.

Sie legt zwei Bonbons davor. Im Spiegel sind noch zwei. „Zwei und zwei – vier!“, ruft Lena.

„Der Spiegel verdoppelt alles!“ Sie legt ihre Hand davor – und hat zehn Finger … nein, im Spiegel sind es fünf und fünf.

Dann teilt Lena ihre vier Bonbons mit ihrem Bruder. Jeder bekommt zwei. „Das ist das Gegenteil vom Spiegel“, sagt sie. „Halbieren!“

**Nach dem Vorlesen:**
1. Was macht der Spiegel?
2. Wie viele Bonbons sind es mit dem Spiegelbild?
3. Was bedeutet halbieren?` },
    lerntext34: { titel: "Die Pizza-Party", text:
`Für die Klassenparty bestellt Frau Yilmaz Pizza. Für 12 Kinder braucht sie 6 Pizzen. Doch dann kommen noch die Kinder der Parallelklasse – doppelt so viele Kinder!

„Dann brauchen wir doppelt so viele Pizzen“, sagt Can. „Das Doppelte von 6 ist 12.“

Am Ende bleiben 8 Stücke übrig. Zwei Kinder teilen sie gerecht: Die Hälfte von 8 ist 4. Jeder bekommt 4 Stücke.

„Verdoppeln und Halbieren – das braucht man ständig“, sagt Frau Yilmaz.

**Fragen zum Gespräch:**
1. Wie viele Pizzen werden am Ende gebraucht?
2. Wie viele Stücke bekommt jedes Kind am Schluss?
3. Wie kann Verdoppeln beim Einmaleins helfen? (2 · 7 = 14, also 4 · 7 = 28)` },
    uebungen: [
        { titel: "Doppelt oder halb?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst eine Aufgabe. Die Kinder zeigen mit der Zahlenkarte die Lösung.\n- Das Doppelte von 3\n- Das Doppelte von 4\n- Die Hälfte von 10\n- Die Hälfte von 8",
          text34: "Du zeigst eine Aufgabe. Die Kinder zeigen mit der Zahlenkarte die Lösung.\n- Das Doppelte von 35\n- Die Hälfte von 90\n- Das Doppelte von 48\n- Die Hälfte von 140",
          antworten: ["1️⃣ 6", "2️⃣ 8", "3️⃣ 5", "4️⃣ 4"], loesungen12: ["1", "2", "3", "4"],
          antworten34: ["1️⃣ 45", "2️⃣ 70", "3️⃣ 96", "4️⃣ 76"], loesungen34: ["2", "1", "3", "2"],
          folie: "Verdoppeln oder halbieren? Zeig deine **Zahlenkarte**! 🪞", emoji: "🪞", warum: "Verdoppeln ist ein Rechentrick, den du ständig brauchst." },
        { titel: "Spiegel-Partner", fuer: "12", dauer: "5 Min",
          text: "Je zwei Sitznachbarn: Ein Kind legt Finger auf den Tisch (z. B. 3), das andere „spiegelt“ mit genauso vielen. Gemeinsam sagen sie: „3 und 3 sind 6.“ Dann wechseln.",
          folie: "Zeig Finger – dein Nachbar ist dein **Spiegel**. 🪞\n\n3 und 3 sind …?", emoji: "👯" }
    ],
    ab12: { titel: "Verdoppeln & Halbieren", aufgaben: [
        { typ: "tabelle", text: "Verdopple: Male die Punkte noch einmal und schreibe die Zahl.", nur: "", kreuz: [], spalten: ["Punkte", "doppelt", "Zahl"], zeilen: [["●●", "", ""], ["●●●", "", ""], ["●●●●", "", ""], ["●●●●●", "", ""]] },
        { typ: "luecken", text: "Verdopple und halbiere.", nur: "2", nummern: false, saetze: ["6 + 6 = ___     7 + 7 = ___     9 + 9 = ___", "Die Hälfte von 10 = ___     von 16 = ___     von 20 = ___"] },
        { typ: "malen", text: "Teile gerecht: Male 6 Kekse auf zwei Teller.", bild: "" }
    ]},
    ab34: { titel: "Verdoppeln & Halbieren", aufgaben: [
        { typ: "tabelle", text: "Trage ein.", spalten: ["Zahl", "das Doppelte", "die Hälfte"], zeilen: [["40", "", ""], ["26", "", ""], ["50", "", ""], ["84", "", ""], ["120", "", ""]] },
        { typ: "luecken", text: "Einmaleins-Trick: Verdopple!", nummern: false, saetze: ["2 · 6 = 12  →  4 · 6 = ___  →  8 · 6 = ___", "2 · 7 = ___  →  4 · 7 = ___  →  8 · 7 = ___"] },
        { typ: "luecken", text: "Ein Fahrrad kostet 240 €. Im Angebot gibt es die Hälfte Rabatt. Wie viel kostet es jetzt?", nummern: false, saetze: ["Rechnung: ___", "Antwort: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-einmaleins",
    titel: "Einmaleins-Fit",
    kategorie: "Mathe: Zahlen & Rechnen",
    ziel12: "Gleich große Gruppen zählen (Kl. 2: erste Malaufgaben als Plusaufgaben)",
    ziel34: "Die Kernaufgaben des Einmaleins sicher können und Tauschaufgaben nutzen",
    material: "Zahlenkarten 1–4 (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Zählen in Zweierschritten (klatschen bei jeder Zahl)",
    warmup34: "Blitzrechnen: Einmaleins",
    tafel: [
        { werkzeug: "blitzrechnen", titel: "Einmaleins: Zweier, Fünfer, Zehner", fuer: "12", einstellung: { art: "mal", reihen: [2, 5, 10] } },
        { werkzeug: "blitzrechnen", titel: "Einmaleins gemischt", fuer: "34", einstellung: { art: "mal", reihen: [2, 3, 4, 5, 6, 7, 8, 9, 10] } },
        { werkzeug: "wuerfel", titel: "Würfel-Einmaleins (2 Würfel)", fuer: "34", einstellung: { anzahl: 2 } }
    ],
    lerntext12: { titel: "Die Socken-Schublade", text:
`Paula räumt ihre Socken auf. Socken gibt es immer zu zweit – ein Paar.

Sie legt 3 Paar Socken auf das Bett. „Wie viele Socken sind das?“, fragt Mama. Paula zählt: „2, 4, 6. Sechs Socken!“

Dann findet sie noch 2 Paar unter dem Bett. „2, 4, 6, 8, 10 – zehn Socken!“

Mama staunt. „Du zählst ja in Zweier-Schritten. Das ist Einmaleins!“

**Nach dem Vorlesen:**
1. Wie viele Socken sind ein Paar?
2. Wie hat Paula gezählt?
3. Zählt alle zusammen in Zweierschritten bis 20!` },
    lerntext34: { titel: "Der Trainingsplan", text:
`Deniz trainiert für das Fußballturnier: Jeden Tag macht er 7 Liegestütze. Nach 3 Tagen sind es 21. „3 mal 7“, sagt der Trainer.

„Und nach einer Woche?“ Deniz überlegt: „7 Tage mal 7 … 49!“

Dann trainiert seine Schwester mit. Sie macht 3 Liegestütze an 7 Tagen. „Das sind ja auch 21!“, ruft sie. „7 mal 3 ist dasselbe wie 3 mal 7.“

„Tauschaufgaben“, grinst der Trainer. „Damit musst du nur die Hälfte auswendig lernen.“

**Fragen zum Gespräch:**
1. Wie viele Liegestütze macht Deniz in einer Woche?
2. Was ist eine Tauschaufgabe?
3. Welche Einmaleins-Aufgabe findest du am schwersten?` },
    uebungen: [
        { titel: "Einmaleins-Abstimmung", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst eine Aufgabe. Die Kinder zeigen mit der Zahlenkarte die Lösung.\n- 2 + 2 + 2\n- 5 + 5\n- 3 Paar Socken\n- 10 + 10",
          text34: "Du zeigst eine Aufgabe. Die Kinder zeigen mit der Zahlenkarte die Lösung.\n- 6 · 7\n- 8 · 4\n- 9 · 6\n- 7 · 8",
          antworten: ["1️⃣ 6", "2️⃣ 10", "3️⃣ 20", "4️⃣ 8"], loesungen12: ["1", "2", "1", "3"],
          antworten34: ["1️⃣ 32", "2️⃣ 42", "3️⃣ 56", "4️⃣ 54"], loesungen34: ["2", "1", "4", "3"],
          folie: "Rechne und zeig deine **Zahlenkarte**! ✖️", emoji: "✖️", warum: "Das Einmaleins brauchst du immer wieder." },
        { titel: "Würfel-Duell", fuer: "34", dauer: "5 Min",
          text: "Starte an der Tafel den Würfel mit 2 Würfeln. Die Augenzahlen werden malgenommen. Wer zuerst richtig ruft (melden!), bekommt einen Punkt für seine Tischreihe.",
          folie: "🎲 🎲 Würfeln und **malnehmen**!\n\nWer weiß es zuerst? Melden!", emoji: "🎲" }
    ],
    ab12: { titel: "Gruppen zählen", aufgaben: [
        { typ: "tabelle", text: "Wie viele sind es zusammen?", nur: "", spalten: ["Gruppen", "zusammen"], zeilen: [["●● ●● ●●", ""], ["●●●●● ●●●●●", ""], ["●● ●● ●● ●●", ""], ["●●● ●●●", ""]] },
        { typ: "luecken", text: "Schreibe als Plus- und als Malaufgabe.", nur: "2", nummern: true, saetze: ["●● ●● ●●\n___ + ___ + ___ = ___     3 · 2 = ___", "●●●●● ●●●●●\n___ + ___ = ___     2 · 5 = ___"] },
        { typ: "malen", text: "Male 4 Teller mit je 2 Keksen.", bild: "" }
    ]},
    ab34: { titel: "Einmaleins-Fit", aufgaben: [
        { typ: "luecken", text: "Rechne.", nummern: false, saetze: ["6 · 7 = ___     8 · 4 = ___     9 · 6 = ___     7 · 8 = ___", "3 · 9 = ___     4 · 6 = ___     8 · 8 = ___     6 · 5 = ___", "___ · 7 = 35     ___ · 9 = 72     6 · ___ = 48     4 · ___ = 36"] },
        { typ: "tabelle", text: "Aufgabe und Tauschaufgabe.", spalten: ["Aufgabe", "Tauschaufgabe", "Ergebnis"], zeilen: [["3 · 8", "", ""], ["9 · 4", "", ""], ["7 · 6", "", ""]] },
        { typ: "luecken", text: "In einer Packung sind 6 Eier. Wie viele Eier sind in 8 Packungen?", nummern: false, saetze: ["Rechnung: ___", "Antwort: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-rechengeschichten",
    titel: "Rechengeschichten",
    kategorie: "Mathe: Zahlen & Rechnen",
    ziel12: "Zu Bildern und kleinen Geschichten eine Rechnung finden",
    ziel34: "Sachaufgaben lösen: Frage – Rechnung – Antwort",
    material: "–",
    ohneVorbereitung: true,
    warmup12: "Blitzrechnen bis 10",
    warmup34: "Blitzrechnen bis 100",
    tafel: [
        { werkzeug: "blitzrechnen", titel: "Blitzrechnen bis 10", fuer: "12", einstellung: { art: "plusminus", bis: 10 } },
        { werkzeug: "blitzrechnen", titel: "Blitzrechnen bis 100", fuer: "34", einstellung: { art: "plusminus", bis: 100 } }
    ],
    lerntext12: { titel: "Am Teich", text:
`Am Teich sitzen 4 Frösche auf einem Stein. Sie quaken laut.

Da hüpfen noch 2 Frösche dazu. Platsch, platsch! Jetzt ist der Stein ganz schön voll.

Plötzlich fliegt ein Storch vorbei. 3 Frösche bekommen Angst und springen ins Wasser.

**Nach dem Vorlesen:**
1. Wie viele Frösche sitzen am Anfang auf dem Stein?
2. Wie viele sind es, als die anderen dazukommen? (4 + 2 = 6)
3. Wie viele bleiben auf dem Stein sitzen? (6 − 3 = 3)` },
    lerntext34: { titel: "Der Klassenausflug", text:
`Die Klasse 4b fährt in den Freizeitpark. Es fahren 24 Kinder und 3 Erwachsene mit. Der Eintritt kostet für Kinder 8 Euro, für Erwachsene 12 Euro.

„Reicht das Geld in der Klassenkasse?“, fragt Herr Bauer. In der Kasse sind 250 Euro.

Ella nimmt einen Zettel: „Erst die Frage: Was kostet alles zusammen? Dann die Rechnung. Dann die Antwort.“

**Fragen zum Gespräch:**
1. Welche Zahlen brauchst du, welche nicht?
2. Wie viel kostet der Eintritt für alle Kinder? (24 · 8 = 192)
3. Reicht das Geld? (192 + 36 = 228 – ja, es bleiben 22 Euro)` },
    uebungen: [
        { titel: "Welche Rechnung passt?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du liest eine kurze Geschichte vor. Die Kinder zeigen mit der Zahlenkarte, welche Rechnung passt.\n- 3 Vögel sitzen im Baum. 2 fliegen dazu.\n- 5 Äpfel liegen im Korb. Tim isst einen.\n- Im Bus sitzen 6 Kinder. 4 steigen aus.\n- Lea hat 2 Euro und bekommt 3 Euro dazu.",
          text34: "Du liest eine kurze Aufgabe vor. Die Kinder zeigen mit der Zahlenkarte, welche Rechnung passt.\n- 4 Tische mit je 6 Kindern\n- 60 Sticker, 15 werden verschenkt\n- 36 Kinder auf 4 Busse verteilt\n- 45 Jungen und 39 Mädchen",
          antworten: ["1️⃣ 3 + 2", "2️⃣ 5 − 1", "3️⃣ 6 − 4", "4️⃣ 2 + 3"], loesungen12: ["1", "2", "3", "4"],
          antworten34: ["1️⃣ 36 : 4", "2️⃣ 4 · 6", "3️⃣ 45 + 39", "4️⃣ 60 − 15"], loesungen34: ["2", "4", "1", "3"],
          folie: "Welche **Rechnung** passt zur Geschichte? 📖", emoji: "📖", warum: "Mathe steckt überall im Alltag." },
        { titel: "Geschichten-Erfinder", fuer: "alle", dauer: "5 Min",
          text: "Du schreibst eine Aufgabe an die Tafel (Kl. 1/2: 4 + 3, Kl. 3/4: 5 · 8). Die Kinder erfinden mit ihrem Nachbarn eine passende Geschichte. Zwei bis drei Paare erzählen.",
          folie: "Erfinde eine **Geschichte** zur Aufgabe an der Tafel! 💭", emoji: "💭" }
    ],
    ab12: { titel: "Rechengeschichten", aufgaben: [
        { typ: "tabelle", text: "Hör zu und rechne. (Ich lese jede Geschichte vor.)", nur: "1", spalten: ["Geschichte", "Ergebnis"], zeilen: [["[bild:frosch] 4 Frösche und 2 Frösche", ""], ["[bild:apfel] 5 Äpfel, einer wird gegessen", ""], ["[bild:auto] 3 Autos und 3 Autos", ""]] },
        { typ: "luecken", text: "Lies und rechne.", nur: "2", nummern: true, saetze: ["Tim hat 7 Murmeln. Er bekommt 5 dazu.\nRechnung: ___\nTim hat ___ Murmeln.", "Im Korb sind 12 Eier. 4 gehen kaputt.\nRechnung: ___\nEs sind noch ___ Eier."] },
        { typ: "malen", text: "Male eine Rechengeschichte zu 4 + 2.", bild: "" }
    ]},
    ab34: { titel: "Frage – Rechnung – Antwort", aufgaben: [
        { typ: "luecken", text: "Ein Kinoticket kostet 7 €. Familie Sommer kauft 5 Tickets. Wie viel bezahlen sie?", nummern: false, saetze: ["Rechnung: ___", "Antwort: ___"] },
        { typ: "luecken", text: "In der Bibliothek stehen 480 Bücher. 125 sind ausgeliehen. Wie viele sind noch da?", nummern: false, saetze: ["Rechnung: ___", "Antwort: ___"] },
        { typ: "luecken", text: "32 Kinder werden in 4 gleich große Teams aufgeteilt. Wie viele Kinder sind in einem Team?", nummern: false, saetze: ["Rechnung: ___", "Antwort: ___"] },
        { typ: "schreiben", text: "Erfinde selbst eine Rechengeschichte mit Frage.", zeilen: 2 }
    ]}
}),

/* ============================== MATHE: FORMEN, GRÖSSEN & KNOBELN ============================== */
SOZIAL_EINHEIT({
    id: "l-formen",
    titel: "Formen-Detektive",
    kategorie: "Mathe: Formen, Größen & Knobeln",
    ziel12: "Kreis, Dreieck, Viereck und Rechteck erkennen und benennen",
    ziel34: "Flächen und Körper unterscheiden und Symmetrie entdecken",
    material: "Zahlenkarten 1–4 (Universal-Set)\nEvtl. Dinge aus dem Klassenzimmer (Würfel, Ball, Dose)",
    warmup12: "Formen in der Luft: Du sagst eine Form, die Kinder malen sie mit dem Finger in die Luft",
    warmup34: "Ich sehe was, was du nicht siehst – und das ist rund / hat Ecken",
    tafel: [{ werkzeug: "formen", titel: "Formen-Blitz", fuer: "", einstellung: {} }],
    lerntext12: { titel: "Das Formen-Fest", text:
`Im Formenland ist Fest. Alle Formen kommen.

Der Kreis rollt herein. Er hat keine Ecken und ist ganz rund. „Ich bin wie ein Ball!“, ruft er.

Das Dreieck kommt mit drei Ecken. „Ich bin wie ein Stück Pizza!“

Das Viereck hat vier Ecken. „Ich bin wie ein Fenster!“

Am Ende tanzen alle zusammen – und bauen ein Haus: Das Viereck ist die Wand, das Dreieck ist das Dach und der Kreis ist die Sonne darüber.

**Nach dem Vorlesen:**
1. Welche Form hat keine Ecken?
2. Wie viele Ecken hat ein Dreieck?
3. Welche Formen siehst du im Klassenzimmer?` },
    lerntext34: { titel: "Das Logo-Design", text:
`Noah soll für die Schülerzeitung ein Logo entwerfen. Er zeichnet einen Schmetterling. „Der ist symmetrisch“, sagt seine Lehrerin. „Wenn du ihn in der Mitte faltest, sind beide Seiten gleich.“

Dann braucht die Zeitung einen Würfel für das Gewinnspiel. „Ein Würfel ist keine Fläche, sondern ein Körper“, erklärt Noah. „Er hat 6 Flächen, 8 Ecken und 12 Kanten.“

Seine Freundin dreht einen Ball in der Hand. „Und die Kugel? Die hat gar keine Ecken.“

**Fragen zum Gespräch:**
1. Was bedeutet symmetrisch?
2. Was ist der Unterschied zwischen einem Quadrat und einem Würfel?
3. Welche Körper findest du im Klassenzimmer?` },
    uebungen: [
        { titel: "Welche Form ist das?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Starte an der Tafel den „Formen-Blitz“ oder halte Dinge hoch. Die Kinder zeigen mit der Zahlenkarte die Form.\n- Uhr\n- Pizzastück\n- Tür\n- Tafel\n- Teller\n- Verkehrsschild „Vorfahrt achten“",
          text34: "Du nennst einen Gegenstand. Die Kinder zeigen mit der Zahlenkarte den passenden Körper.\n- Fußball\n- Spielwürfel\n- Konservendose\n- Schuhkarton\n- Eistüte\n- Zelt (Dach)",
          antworten: ["1️⃣ Kreis", "2️⃣ Dreieck", "3️⃣ Rechteck"], loesungen12: ["1", "2", "3", "3", "1", "2"],
          antworten34: ["1️⃣ Kugel", "2️⃣ Würfel", "3️⃣ Zylinder", "4️⃣ Quader / andere"], loesungen34: ["1", "2", "3", "4", "4", "4"],
          folie: "Welche Form hat das? Zeig deine **Zahlenkarte**! 🔺⚪⬛", emoji: "🔺", warum: "Formen findest du überall." },
        { titel: "Formen-Jagd", fuer: "alle", dauer: "5 Min",
          text: "Jedes Kind sucht vom Platz aus im Raum einen Gegenstand mit einer bestimmten Form (du sagst an: „rund“, „drei Ecken“, „Kl. 3/4: ein Quader“). Reihum nennt jeder seinen Fund – niemand darf etwas doppelt nennen.",
          folie: "Such im Raum etwas, das **rund** ist! 🔍", emoji: "🔍" }
    ],
    ab12: { titel: "Formen-Detektive", aufgaben: [
        { typ: "zuordnen", text: "Verbinde jedes Ding mit seiner Form.", links: ["[bild:uhr]", "[bild:pizza]", "[bild:tuer]"], rechts: ["▭", "◯", "△"] },
        { typ: "tabelle", text: "Zähle die Ecken.", nur: "", spalten: ["Form", "Ecken"], zeilen: [["△", ""], ["□", ""], ["◯", ""], ["▭", ""]] },
        { typ: "malen", text: "Male ein Haus nur aus Formen: Viereck, Dreieck, Kreis.", bild: "" }
    ]},
    ab34: { titel: "Flächen, Körper, Symmetrie", aufgaben: [
        { typ: "tabelle", text: "Ergänze die Tabelle.", spalten: ["Körper", "Flächen", "Ecken", "Kanten"], zeilen: [["Würfel", "", "", ""], ["Quader", "", "", ""], ["Kugel", "", "", ""]] },
        { typ: "ankreuzen", text: "Welche Buchstaben sind symmetrisch? Kreuze an.", nebeneinander: true, optionen: ["A", "F", "H", "L", "M", "R", "T", "O"] },
        { typ: "malen", text: "Zeichne eine Hälfte eines symmetrischen Bildes. Dein Nachbar ergänzt die andere Hälfte.", bild: "" }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-uhr",
    titel: "Wie spät ist es?",
    kategorie: "Mathe: Formen, Größen & Knobeln",
    ziel12: "Kl. 1: Tagesablauf ordnen (morgens, mittags, abends) · Kl. 2: volle und halbe Stunden lesen",
    ziel34: "Uhrzeiten minutengenau lesen und Zeitspannen berechnen",
    material: "Zahlenkarten 1–4 (Universal-Set), evtl. Lernuhr",
    ohneVorbereitung: true,
    warmup12: "Was machst du, wenn …? (morgens – mittags – abends) Kinder zeigen pantomimisch",
    warmup34: "Uhr-Blitz an der Tafel",
    tafel: [
        { werkzeug: "uhr", titel: "Uhr lesen: volle & halbe Stunden", fuer: "12", einstellung: { genau: "halb" } },
        { werkzeug: "uhr", titel: "Uhr lesen: Viertelstunden", fuer: "34", einstellung: { genau: "viertel" } },
        { werkzeug: "uhr", titel: "Uhr lesen: minutengenau", fuer: "34", einstellung: { genau: "minuten" } }
    ],
    lerntext12: { titel: "Der verschlafene Wecker", text:
`Theo hat einen Wecker. Er ist rund und hat zwei Zeiger: einen kleinen und einen großen.

„Der kleine Zeiger zeigt die Stunde“, erklärt Papa. „Der große Zeiger zeigt die Minuten. Wenn der große Zeiger ganz oben steht, ist es eine volle Stunde.“

Am Morgen steht der kleine Zeiger auf der 7, der große ganz oben. „7 Uhr – aufstehen!“

Aber Theo dreht sich um. Als er aufwacht, steht der große Zeiger ganz unten. „Halb acht! Jetzt aber schnell!“

**Nach dem Vorlesen:**
1. Welcher Zeiger zeigt die Stunde?
2. Wo steht der große Zeiger bei einer vollen Stunde?
3. Wann stehst du morgens auf?` },
    lerntext34: { titel: "Der Bus fährt ab", text:
`Mert will mit dem Bus zum Training. Der Bus fährt um 14:47 Uhr. Jetzt ist es 14:25 Uhr.

„Wie viel Zeit habe ich noch?“, fragt Mert. Seine Schwester rechnet: „Von 14:25 bis 14:45 sind es 20 Minuten. Plus 2 – also 22 Minuten.“

Mert braucht 10 Minuten zur Haltestelle. „Dann kann ich noch 12 Minuten zocken!“ – „Oder du packst endlich deine Sporttasche“, sagt die Schwester.

**Fragen zum Gespräch:**
1. Wie viel Zeit hat Mert bis zur Abfahrt?
2. Wie hat die Schwester gerechnet?
3. Wann muss Mert spätestens losgehen?` },
    uebungen: [
        { titel: "Uhr-Blitz", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Starte das Tafel-Werkzeug „Uhr lesen“. Die Kinder flüstern die Uhrzeit ihrem Nachbarn, dann rufst du ein Kind auf. Kl. 1 zeigt pantomimisch: Ist das eher morgens, mittags oder abends? Kl. 3/4: Wie spät ist es in 20 Minuten?",
          folie: "Wie spät ist es? 🕐\n\nFlüstere es deinem Nachbarn!", emoji: "🕐", warum: "Die Uhr brauchst du jeden Tag." },
        { titel: "Mein Tag", fuer: "12", dauer: "5 Min",
          text: "Du nennst Tätigkeiten. Die Kinder zeigen mit der Zahlenkarte: 1 = morgens, 2 = mittags, 3 = abends.\n- Zähne putzen und Frühstück\n- Mittagessen\n- Schlafanzug anziehen\n- Zur Schule gehen",
          antworten: ["1️⃣ morgens", "2️⃣ mittags", "3️⃣ abends"], loesungen: ["1", "2", "3", "1"],
          folie: "Wann machst du das?\n\n1️⃣ morgens · 2️⃣ mittags · 3️⃣ abends", emoji: "☀️" }
    ],
    ab12: { titel: "Wie spät ist es?", aufgaben: [
        { typ: "zuordnen", text: "Wann machst du das? Verbinde.", nur: "1", links: ["[bild:sonne]", "[bild:nudeln]", "[bild:mond]"], rechts: ["mittags", "abends", "morgens"] },
        { typ: "tabelle", text: "Wie spät ist es? Schreibe die Uhrzeit.", nur: "2", kreuz: [], spalten: ["kleiner Zeiger", "großer Zeiger", "Uhrzeit"], zeilen: [["auf der 8", "auf der 12", ""], ["auf der 3", "auf der 12", ""], ["zwischen 6 und 7", "auf der 6", ""], ["zwischen 9 und 10", "auf der 6", ""]] },
        { typ: "malen", text: "Male eine Uhr, die 7 Uhr zeigt.", bild: "" }
    ]},
    ab34: { titel: "Uhrzeiten & Zeitspannen", aufgaben: [
        { typ: "tabelle", text: "Wie spät ist es? Schreibe digital.", spalten: ["so gesagt", "digital (vormittags)", "digital (nachmittags)"], zeilen: [["Viertel nach drei", "", ""], ["halb neun", "", ""], ["Viertel vor sieben", "", ""], ["zehn nach elf", "", ""]] },
        { typ: "tabelle", text: "Berechne die Zeitspanne.", spalten: ["Beginn", "Ende", "Dauer"], zeilen: [["8:15", "9:00", ""], ["13:40", "14:25", ""], ["16:50", "18:05", ""]] },
        { typ: "luecken", text: "Der Film beginnt um 15:30 Uhr und dauert 95 Minuten. Wann ist er zu Ende?", nummern: false, saetze: ["Antwort: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-geld",
    titel: "Einkaufen mit Geld",
    kategorie: "Mathe: Formen, Größen & Knobeln",
    ziel12: "Münzen und Scheine erkennen und kleine Beträge legen (Kl. 1 bis 10 €, Kl. 2 bis 20 €)",
    ziel34: "Mit Euro und Cent rechnen und Wechselgeld bestimmen",
    material: "Spielgeld (falls vorhanden) – sonst reicht die Tafel\nZahlenkarten 1–4 (Universal-Set)",
    warmup12: "Geld-Blitz an der Tafel: Wie viel Geld ist das?",
    warmup34: "Geld-Blitz mit Cent",
    tafel: [
        { werkzeug: "geld", titel: "Geld-Blitz bis 20 €", fuer: "12", einstellung: { bis: 20, cent: false } },
        { werkzeug: "geld", titel: "Geld-Blitz mit Cent", fuer: "34", einstellung: { bis: 50, cent: true } }
    ],
    lerntext12: { titel: "Im Spielzeugladen", text:
`Ella hat ein Sparschwein. Sie schüttelt es – klimper, klimper! Heraus fallen ein 2-Euro-Stück, ein 1-Euro-Stück und ein 5-Euro-Schein.

„Wie viel ist das?“, fragt Ella. Mama hilft: „5 und 2 sind 7. Und noch 1 – 8 Euro!“

Im Laden gibt es einen Ball für 6 Euro und ein Puzzle für 9 Euro. Ella überlegt. „Für das Puzzle reicht mein Geld nicht. Aber der Ball geht!“

**Nach dem Vorlesen:**
1. Welches Geld hatte Ella im Sparschwein?
2. Wie viel Geld ist das zusammen?
3. Warum kann Ella das Puzzle nicht kaufen?` },
    lerntext34: { titel: "Der Kiosk", text:
`Sinan arbeitet in den Ferien am Kiosk seines Onkels. Eine Kundin kauft eine Zeitschrift für 3,40 € und ein Wasser für 1,25 €.

„Das macht 4,65 €“, sagt Sinan. Die Kundin gibt ihm einen 10-Euro-Schein.

Sinan zählt das Wechselgeld vom Preis aus hoch: „4,65 … plus 35 Cent sind 5 Euro. Plus 5 Euro sind 10.“ Er gibt ihr 5,35 €.

Der Onkel nickt. „So macht man das – hochzählen statt abziehen.“

**Fragen zum Gespräch:**
1. Wie viel kostet der Einkauf?
2. Wie viel Wechselgeld bekommt die Kundin?
3. Wie zählt Sinan das Wechselgeld?` },
    uebungen: [
        { titel: "Geld-Blitz", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Starte an der Tafel den „Geld-Blitz“. Münzen und Scheine erscheinen. Die Kinder rechnen still und zeigen die Lösung (Finger oder Schmierzettel), dann auflösen.",
          folie: "Wie viel Geld ist das? 💶", emoji: "💶", warum: "Mit Geld umgehen brauchst du überall." },
        { titel: "Reicht das Geld?", fuer: "alle", dauer: "6 Min",
          text: "Du sagst, wie viel Geld jemand hat und was er kaufen möchte. Die Kinder heben grün (reicht) oder rot (reicht nicht).\n- 5 €, Ball für 4 €\n- 10 €, Buch für 12 €\n- 20 €, Puzzle für 15 € und Eis für 2 €\n- 3 €, zwei Brötchen für je 2 €",
          text34: "Du sagst, wie viel Geld jemand hat und was er kaufen möchte. Die Kinder heben grün (reicht) oder rot (reicht nicht).\n- 10 €: Pizza 7,50 € und Getränk 2,20 €\n- 5 €: drei Hefte für je 1,80 €\n- 20 €: Kinokarte 9,50 € und Popcorn 4,90 € und Cola 3,80 €\n- 2 €: vier Kaugummis für je 45 Cent",
          quiz: "ampel", loesungen12: ["1", "2", "1", "2"], loesungen34: ["1", "2", "1", "1"],
          folie: "Reicht das Geld?\n\n🟢 ja · 🔴 nein", emoji: "🛒" }
    ],
    ab12: { titel: "Einkaufen mit Geld", aufgaben: [
        { typ: "tabelle", text: "Wie viel Geld ist das? (Ich lese vor.)", nur: "", kreuz: [], spalten: ["Geld", "Euro"], zeilen: [["2 € + 1 €", ""], ["5 € + 2 € + 2 €", ""], ["10 € + 5 €", ""], ["1 € + 1 € + 1 € + 1 €", ""]] },
        { typ: "ankreuzen", text: "Du hast 5 €. Was kannst du kaufen? Kreuze an.", nur: "1", nebeneinander: true, optionen: ["[bild:eis] 2 €", "[bild:teddy] 9 €", "[bild:fussball] 4 €", "[bild:drachen] 7 €"] },
        { typ: "tabelle", text: "Du bezahlst mit 20 €. Wie viel bekommst du zurück?", nur: "2", kreuz: [], spalten: ["Du kaufst", "Preis", "zurück"], zeilen: [["[bild:fussball] Ball", "8 €", ""], ["[bild:buch] Buch", "13 €", ""], ["[bild:teddy] Teddy", "15 €", ""]] },
        { typ: "malen", text: "Male, was du dir für 10 € kaufen würdest.", bild: "" }
    ]},
    ab34: { titel: "Euro & Cent", aufgaben: [
        { typ: "luecken", text: "Schreibe in Cent bzw. in Euro.", nummern: false, saetze: ["3,50 € = ___ ct     1,05 € = ___ ct", "720 ct = ___ €     99 ct = ___ €"] },
        { typ: "tabelle", text: "Wechselgeld: Du bezahlst mit 10 €.", spalten: ["Preis", "Wechselgeld"], zeilen: [["6,40 €", ""], ["2,85 €", ""], ["9,99 €", ""], ["4,15 €", ""]] },
        { typ: "luecken", text: "Lena kauft 3 Hefte für je 1,20 € und einen Füller für 4,90 €. Sie bezahlt mit 10 €.", nummern: false, saetze: ["Wie viel kostet der Einkauf? ___", "Wie viel Wechselgeld bekommt sie? ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-muster",
    titel: "Muster & Zahlenfolgen",
    kategorie: "Mathe: Formen, Größen & Knobeln",
    ziel12: "Muster erkennen und fortsetzen",
    ziel34: "Regeln in Zahlenfolgen finden und eigene Folgen erfinden",
    material: "Buntstifte",
    ohneVorbereitung: true,
    warmup12: "Klatsch-Muster: Klatschen – Stampfen – Klatschen – … die Kinder machen weiter",
    warmup34: "Zahlenfolge an der Tafel: 3, 6, 9, … wer kennt die nächste Zahl?",
    tafel: [{ werkzeug: "muster", titel: "Muster & Folgen fortsetzen", fuer: "", einstellung: {} }],
    lerntext12: { titel: "Die Perlenkette", text:
`Oma Gerda fädelt eine Kette auf. Erst eine rote Perle, dann eine blaue. Dann wieder rot, wieder blau.

„Welche Perle kommt als Nächstes?“, fragt sie Ben. „Rot!“, ruft Ben.

Dann macht Oma es schwieriger: rot, rot, gelb – rot, rot, gelb – rot, rot …

Ben überlegt lange. Dann strahlt er: „Gelb!“

„Du hast das Muster entdeckt“, lacht Oma. „Ein Muster wiederholt sich immer wieder.“

**Nach dem Vorlesen:**
1. Wie geht die erste Kette weiter?
2. Wie geht die zweite Kette weiter?
3. Klatscht ein Muster: klatsch – klatsch – stampf …` },
    lerntext34: { titel: "Der Geheimcode", text:
`Am Tresor steht: 2 – 4 – 8 – 16 – ?

„Der Code hat ein Muster“, flüstert Maya. „Jede Zahl ist doppelt so groß wie die vorherige. Die nächste ist 32!“

Klick – der Tresor geht auf. Darin liegt ein zweiter Zettel: 50 – 45 – 40 – 35 – ?

„Jetzt immer 5 weniger“, sagt Jonas. „30!“

Im Tresor liegt … Schokolade. „Mathe lohnt sich“, grinst Maya.

**Fragen zum Gespräch:**
1. Welche Regel hatte der erste Code?
2. Welche Regel hatte der zweite?
3. Erfinde einen Code für deinen Nachbarn.` },
    uebungen: [
        { titel: "Was kommt als Nächstes?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst eine Folge. Die Kinder zeigen mit der Zahlenkarte, was als Nächstes kommt.\n- 🔴 🔵 🔴 🔵 🔴 …\n- ⭐ ⭐ 🌙 ⭐ ⭐ …\n- 1, 2, 3, 4, …\n- 2, 4, 6, 8, …",
          text34: "Du zeigst eine Zahlenfolge. Die Kinder zeigen mit der Zahlenkarte die nächste Zahl.\n- 5, 10, 15, 20, …\n- 100, 90, 80, 70, …\n- 1, 2, 4, 8, …\n- 3, 4, 6, 9, 13, …",
          antworten: ["1️⃣ 🔵", "2️⃣ 🌙", "3️⃣ 5", "4️⃣ 10"], loesungen12: ["1", "2", "3", "4"],
          antworten34: ["1️⃣ 25", "2️⃣ 60", "3️⃣ 16", "4️⃣ 18"], loesungen34: ["1", "2", "3", "4"],
          folie: "Was kommt als **Nächstes**? Zeig deine Zahlenkarte! 🔁", emoji: "🔁", warum: "Wer Muster erkennt, kann vorausdenken." },
        { titel: "Muster-Erfinder", fuer: "alle", dauer: "5 Min",
          text: "Jedes Kind erfindet auf einem Zettel ein eigenes Muster (Kl. 1/2: mit Farben oder Formen, Kl. 3/4: Zahlenfolge mit Regel) und lässt den Nachbarn weitermachen.",
          folie: "Erfinde ein **eigenes Muster** – dein Nachbar macht weiter! ✏️", emoji: "✏️" }
    ],
    ab12: { titel: "Muster fortsetzen", aufgaben: [
        { typ: "luecken", text: "Male weiter.", nur: "", nummern: true, saetze: ["○ ● ○ ● ○ ___ ___ ___", "△ △ □ △ △ □ ___ ___ ___", "☆ ○ ○ ☆ ○ ○ ___ ___ ___"] },
        { typ: "luecken", text: "Schreibe weiter.", nur: "2", nummern: true, saetze: ["2, 4, 6, ___, ___, ___", "10, 20, 30, ___, ___, ___", "15, 14, 13, ___, ___, ___"] },
        { typ: "malen", text: "Male eine Kette mit deinem eigenen Muster.", bild: "" }
    ]},
    ab34: { titel: "Zahlenfolgen", aufgaben: [
        { typ: "tabelle", text: "Setze fort und schreibe die Regel auf.", spalten: ["Folge", "weiter", "Regel"], zeilen: [["4, 8, 12, 16", "", ""], ["90, 81, 72, 63", "", ""], ["1, 3, 9, 27", "", ""], ["2, 3, 5, 8, 12", "", ""]] },
        { typ: "luecken", text: "Finde die fehlenden Zahlen.", nummern: false, saetze: ["7, ___, 21, 28, ___, 42     ___, 50, 100, 200, ___"] },
        { typ: "luecken", text: "Erfinde selbst eine Zahlenfolge mit Regel.", nummern: false, saetze: ["Folge: ___", "Regel: ___"] }
    ]}
})

);
