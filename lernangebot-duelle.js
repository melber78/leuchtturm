/* ============================================================
   Leuchtturm – Lernangebot: „Klasse gegen Eule Ella“ (Duelle)
   Fragen mit Antworten zum Antippen an der Tafel. Die richtige
   Antwort steht in den Daten immer ZUERST – auf der Tafel werden
   die Antworten gemischt (Zahlen der Größe nach sortiert).
   Richtig angetippt: Punkt für die Klasse · daneben: Punkt für Ella.
   Format je Frage: ["Frage", ["richtig", "falsch", …], { h: "Hörtext", b: "Bild" }]
   ersetzt: Übungen (Titel), die durch das Duell ersetzt werden
   ============================================================ */
"use strict";
(function () {
const D = {};
const duell = (id, d) => { D[id] = d; };

/* ---------------- Deutsch ---------------- */
duell("l-lesen-malen", {
    titel12: "Lies und tipp!", ersetzt12: ["Lies und zeig"],
    "12": [
        ["Lies: **Hund**", ["🐶", "🐱", "🐭"]],
        ["Lies: **Auto**", ["🚗", "🚲", "🚌"]],
        ["Lies: **Eis**", ["🍦", "🍎", "🍌"]],
        ["Lies: **Ball**", ["⚽", "🧸", "🎈"]],
        ["Lies: **Maus**", ["🐭", "🐘", "🐸"]],
        ["Lies: **Sonne**", ["☀️", "🌙", "⭐"]]
    ]
});
duell("l-abc-training", {
    titel12: "ABC-Duell", titel34: "Wörterbuch-Duell", ersetzt12: ["Wer kommt vorher?"], ersetzt34: ["Wer kommt vorher?"],
    "12": [
        ["Was kommt **nach** E?", ["F", "D", "G"]],
        ["Was kommt **vor** K?", ["J", "L", "I"]],
        ["Was kommt **nach** R?", ["S", "Q", "T"]],
        ["Was kommt **vor** H?", ["G", "I", "F"]],
        ["Welcher Buchstabe fehlt? M, N, __, P", ["O", "Q", "L"]],
        ["Welcher Buchstabe fehlt? A, B, __, D", ["C", "E", "F"]]
    ],
    "34": [
        ["Welches Wort kommt im ABC **zuerst**? Hund – Affe – Maus", ["Affe", "Hund", "Maus"]],
        ["Welches Wort kommt **zuerst**? Ball – Baum – Bad", ["Bad", "Ball", "Baum"]],
        ["Welches Wort kommt **zuerst**? Katze – Kamel – Kuh", ["Kamel", "Katze", "Kuh"]],
        ["Welches Wort kommt im ABC **zuletzt**? Zebra – Tiger – Wal", ["Zebra", "Tiger", "Wal"]],
        ["Wo steht „Sonne“ im Wörterbuch?", ["zwischen „Rose“ und „Tiger“", "vor „Rose“", "nach „Tiger“"]],
        ["Welcher Buchstabe kommt zwischen T und V?", ["U", "W", "S"]]
    ]
});
duell("l-wortarten", {
    titel12: "Groß oder klein?", ersetzt12: ["Groß oder klein?"],
    "12": [
        ["Welches Wort schreibt man **groß**?", ["Ball", "laufen", "lachen"]],
        ["Welches Wort schreibt man **groß**?", ["Tisch", "springen", "singen"]],
        ["Welches Wort schreibt man **groß**?", ["Mama", "malen", "essen"]],
        ["Welches Wort schreibt man **klein**?", ["lachen", "Hund", "Auto"]],
        ["Welcher Begleiter passt? ___ Sonne", ["die", "der", "das"]],
        ["Welcher Begleiter passt? ___ Auto", ["das", "der", "die"]]
    ]
});
duell("l-satz-baumeister", {
    titel12: "Satz-Duell",
    "12": [
        ["Welcher Satz ist richtig gebaut?", ["Tom spielt Ball.", "spielt Ball Tom.", "Ball. Tom spielt"]],
        ["Welcher Satz ist richtig gebaut?", ["Die Katze schläft.", "Katze die schläft.", "Die schläft Katze."]],
        ["Was fehlt am Ende? „Mama liest ein Buch“", ["ein Punkt .", "nichts", "ein Komma ,"]],
        ["Welcher Satz fängt richtig an?", ["Der Hund bellt.", "der Hund bellt.", "der hund bellt."]],
        ["Welches Wort passt? „Der Hund ___ laut.“", ["bellt", "Ball", "blau"]],
        ["Wie viele Wörter hat der Satz? „Ich esse ein Eis.“", ["4", "3", "5"]]
    ]
});

/* ---------------- Mathe ---------------- */
duell("l-zahlenland", {
    titel12: "Zahlen-Duell",
    "12": [
        ["Wie viele Punkte sind es?", ["7", "6", "8"], { b: "●●●●● ●●" }],
        ["Wie viele Punkte sind es?", ["13", "12", "15"], { b: "●●●●● ●●●●● ●●●" }],
        ["Welche Zahl kommt nach 9?", ["10", "8", "11"]],
        ["Welche Zahl ist am größten?", ["21", "12", "2"]],
        ["Welche Zahl kommt vor 15?", ["14", "16", "13"]],
        ["Wer sind die Nachbarn der 7?", ["6 und 8", "5 und 9", "7 und 8"]]
    ]
});
duell("l-einmaleins", {
    titel12: "Doppel-Duell",
    "12": [
        ["3 + 3 = ?", ["6", "5", "9"]],
        ["Das Doppelte von 5?", ["10", "7", "25"]],
        ["2 + 2 + 2 + 2 = ?", ["8", "6", "10"]],
        ["Wie viele Socken sind das?", ["6", "3", "8"], { b: "🧦🧦  🧦🧦  🧦🧦" }],
        ["2 Hände – wie viele Finger?", ["10", "5", "12"]],
        ["5 + 5 + 5 = ?", ["15", "10", "20"]]
    ]
});
duell("l-uhr", {
    titel34: "Uhr-Duell",
    "34": [
        ["Es ist 8:45 Uhr. Wie spät ist es in 20 Minuten?", ["9:05 Uhr", "9:15 Uhr", "8:65 Uhr"]],
        ["Viertel nach drei – wie schreibt man das?", ["3:15 Uhr", "3:45 Uhr", "2:45 Uhr"]],
        ["Viertel vor sieben – wie schreibt man das?", ["6:45 Uhr", "7:15 Uhr", "6:15 Uhr"]],
        ["Wie viele Minuten hat eine Stunde?", ["60", "100", "30"]],
        ["Halb neun – wie schreibt man das?", ["8:30 Uhr", "9:30 Uhr", "8:50 Uhr"]],
        ["Der Film beginnt um 16:30 Uhr und dauert 1 Stunde 15 Minuten. Wann ist er zu Ende?", ["17:45 Uhr", "17:15 Uhr", "18:00 Uhr"]]
    ]
});

/* ---------------- Lernen lernen ---------------- */
duell("l-konzentration", {
    titel12: "Adleraugen-Duell", titel34: "Adleraugen-Duell",
    "12": [
        ["Wie viele 🐟 siehst du?", ["4", "3", "5"], { b: "🐟🐠🐟🐡🐟🐠🐟" }],
        ["Welcher Apfel ist anders?", ["🍏", "🍎", "🍎 ", " 🍎"]],
        ["Welches Wort ist anders?", ["Mais", "Maus", "Maus ", " Maus"]],
        ["Wie oft steht die 7?", ["3", "2", "4"], { b: "1 7 4 7 9 7 2" }],
        ["Was kommt als Nächstes?", ["🔵", "🔴", "🟢"], { b: "🔴🔵🔴🔵🔴 …" }],
        ["Wie viele ⭐ siehst du?", ["4", "3", "5"], { b: "⭐🌙⭐⭐🌙⭐" }]
    ],
    "34": [
        ["Wie oft steht das **b**?", ["3", "2", "4"], { b: "d b p b d q b p d" }],
        ["Welche Zahl ist anders?", ["6969", "6996", "6996 ", " 6996"]],
        ["Rechne im Kopf: 7 + 8 − 5", ["10", "11", "9"]],
        ["Welches Wort ist falsch geschrieben?", ["Tafl", "Schule", "Fenster", "Stuhl"]],
        ["Wie viele Dreiecke zeigen nach oben?", ["4", "3", "5"], { b: "▲ ▼ ▲ ▼ ▲ ▼ ▲" }],
        ["Was hilft beim Konzentrieren?", ["Tisch frei räumen", "Handy neben das Heft legen", "Nebenbei reden"]]
    ]
});
duell("l-arbeitsplatz", {
    titel12: "Startklar-Duell", titel34: "Startklar-Duell",
    "12": [
        ["Was brauchst du zum Ausmalen?", ["🖍️ Buntstifte", "✂️ Schere", "📏 Lineal"]],
        ["Was machst du zuerst?", ["🧹 Tisch frei machen", "🚀 Loslegen", "✅ Kontrollieren"]],
        ["Was gehört **nicht** ins Mäppchen?", ["🍌 Banane", "✏️ Bleistift", "🧽 Radiergummi"]],
        ["Der Bleistift ist stumpf. Was hilft?", ["Spitzer", "Kleber", "Lineal"]],
        ["Womit schneidest du aus?", ["✂️ Schere", "🖍️ Buntstift", "📏 Lineal"]],
        ["Wann bist du startklar?", ["Nur das, was ich brauche, liegt bereit", "Der Tisch ist voll Spielzeug", "Ich suche noch meine Stifte"]]
    ],
    "34": [
        ["Was liegt auf einem guten Arbeitsplatz?", ["Nur Material für die Aufgabe", "Handy und Spielzeug", "Alles aus der Tasche"]],
        ["Was kommt nach „Tisch frei“?", ["Material bereitlegen", "Kontrollieren", "Pause machen"]],
        ["Womit ziehst du einen geraden Strich?", ["Lineal", "Radiergummi", "Kleber"]],
        ["Dein Füller ist leer. Was tust du?", ["Patrone wechseln oder Bleistift nehmen", "Gar nichts schreiben", "Ständig den Nachbarn stören"]],
        ["Was fragst du dich beim Schritt „Aufgabe lesen“?", ["Was soll ich tun?", "Wie spät ist es?", "Wer ist schon fertig?"]],
        ["Wann kontrollierst du deine Arbeit?", ["Wenn ich fertig bin", "Bevor ich anfange", "Nie"]]
    ]
});
duell("l-merk-tricks", {
    titel12: "Merk-Duell", titel34: "Merk-Duell",
    folie: "Ella fordert euch heraus! 🦉\n\nDrückt **🔊 Hör gut zu!** – merkt euch alles – dann tippt ein Kind die Antwort an.",
    "12": [
        ["Was kam **zuerst**?", ["Hund", "Sonne", "Auto"], { h: "Hund, Sonne, Auto" }],
        ["Was kam **zuletzt**?", ["Maus", "Eis", "Ball"], { h: "Ball, Eis, Baum, Maus" }],
        ["Welche Farbe war **in der Mitte**?", ["Gelb", "Rot", "Blau"], { h: "Rot, Gelb, Blau" }],
        ["Welche Zahlen waren es?", ["7, 3, 9", "7, 9, 3", "3, 7, 9"], { h: "7, 3, 9" }],
        ["Welcher Trick hilft beim Merken?", ["Ein Bild im Kopf machen", "Schnell weggucken", "Gar nicht hinhören"]],
        ["Welches Wort war **nicht** dabei?", ["Mond", "Hut", "Tasse"], { h: "Fisch, Hut, Stern, Tasse" }]
    ],
    "34": [
        ["Was kam an **dritter** Stelle?", ["Bus", "Pizza", "Rakete"], { h: "Gitarre, Pizza, Bus, Rakete, Schuh" }],
        ["Welche Zahlenreihe hast du gehört?", ["4, 8, 1, 6, 3", "4, 1, 8, 6, 3", "4, 8, 6, 1, 3"], { h: "4, 8, 1, 6, 3" }],
        ["Welcher Trick hilft beim Merken von Wörtern?", ["Eine verrückte Geschichte daraus machen", "Die Wörter einmal schnell überfliegen", "Nebenbei laut Musik hören"]],
        ["Was ist am **Dienstag**?", ["Musik", "Sport", "Kunst"], { h: "Montag Sport, Dienstag Musik, Mittwoch Kunst" }],
        ["Welches Wort war **nicht** dabei?", ["Stuhl", "Glas", "Feder"], { h: "Lampe, Kissen, Tor, Glas, Feder, Wolke" }],
        ["Warum hilft Wiederholen?", ["Das Gehirn speichert es fester", "Dann ist man schneller fertig", "Es hilft gar nicht"]]
    ]
});
duell("l-lern-quiz", {
    titel12: "Das große Ella-Quiz", titel34: "Das große Ella-Quiz", ersetzt12: ["Quiz-Runde"], ersetzt34: ["Quiz-Runde"],
    folie: "🎉 **Quiz-Zeit!** Klasse gegen Eule Ella! 🦉\n\nÜberlegt leise – dann tippt ein Kind die Antwort an. Richtig: Punkt für euch – daneben: Punkt für Ella.",
    "12": [
        ["4 + 5 = ?", ["9", "8", "10"]],
        ["Wie viele Silben hat „Banane“?", ["3", "2", "4"]],
        ["Was reimt sich auf **Haus**?", ["Maus", "Hund", "Hose"]],
        ["Wie viele Ecken hat ein Dreieck?", ["3", "4", "0"]],
        ["10 − 6 = ?", ["4", "5", "6"]],
        ["Welcher Buchstabe kommt nach B?", ["C", "A", "D"]]
    ],
    "34": [
        ["7 · 8 = ?", ["56", "54", "64"]],
        ["Welche Wortart ist „lustig“?", ["Adjektiv", "Nomen", "Verb"]],
        ["Wie viele Minuten hat eine Stunde?", ["60", "100", "24"]],
        ["Welches Satzzeichen gehört hinter eine Frage?", ["?", ".", "!"]],
        ["1000 − 350 = ?", ["650", "750", "550"]],
        ["Wie viele Flächen hat ein Würfel?", ["6", "4", "8"]]
    ]
});
duell("l-lerntheke", {
    titel12: "Stationen-Duell", titel34: "Stationen-Duell",
    "12": [
        ["Der Timer klingelt. Was tust du?", ["Stift weg, Blatt weitergeben", "Einfach weiterschreiben", "Aufstehen und herumlaufen"]],
        ["Du bist mit der Station fertig. Was nun?", ["Die Zusatzaufgabe machen", "Den Nachbarn stören", "Das Blatt zerknüllen"]],
        ["Du verstehst eine Aufgabe nicht. Was zuerst?", ["Noch einmal genau lesen", "Laut rufen", "Aufgeben"]],
        ["6 + 4 = ?", ["10", "9", "11"]],
        ["Wie viele Silben hat „Tomate“?", ["3", "2", "4"]],
        ["Welches Wort fängt mit **M** an?", ["Maus", "Sonne", "Igel"]]
    ],
    "34": [
        ["Der Timer klingelt. Was tust du?", ["Stift weg, Blatt weitergeben", "Einfach weiterschreiben", "Aufstehen und herumlaufen"]],
        ["Wie kontrollierst du 47 + 25 = 72?", ["72 − 25 rechnen", "Noch einmal 47 + 25 abschreiben", "Gar nicht"]],
        ["Wann machst du die Zusatzaufgabe?", ["Wenn ich mit der Station fertig bin", "Sofort am Anfang", "Nie"]],
        ["9 · 6 = ?", ["54", "56", "45"]],
        ["Welches Wort ist ein Nomen?", ["Freude", "rennen", "leise"]],
        ["3 Stationen mit je 6 Minuten – wie lange dauert das?", ["18 Minuten", "12 Minuten", "24 Minuten"]]
    ]
});
duell("l-zuhoeren", {
    titel12: "Zuhör-Duell", titel34: "Zuhör-Duell",
    folie: "Ella fordert euch heraus! 🦉\n\nDrückt **🔊 Hör gut zu!** – der Satz kommt nur einmal. Dann tippt ein Kind die Antwort an.",
    "12": [
        ["Welche Farbe hat der Ball?", ["rot", "blau", "grün"], { h: "Tim hat einen roten Ball und einen blauen Hut." }],
        ["Wie heißt der Hund?", ["Bello", "Lena", "Struppi"], { h: "Lena geht mit ihrem Hund Bello in den Park." }],
        ["Wie viele Bananen liegen im Korb?", ["2", "3", "5"], { h: "Im Korb liegen drei Äpfel und zwei Bananen." }],
        ["Was kommt zuerst?", ["👏 Klatschen", "🦶 Stampfen", "👋 Winken"], { h: "Klatsch zweimal, dann stampf einmal." }],
        ["Was ist am Montag?", ["Sport", "Musik", "Kunst"], { h: "Am Montag ist Sport, am Dienstag ist Musik." }],
        ["Wie hört ein Zuhör-Profi zu?", ["👀 Schaut hin und ist leise", "🗣️ Redet dazwischen", "🙈 Schaut weg"]]
    ],
    "34": [
        ["Wann fährt der Bus?", ["7:55 Uhr", "7:40 Uhr", "7:35 Uhr"], { h: "Der Bus fährt heute nicht um 7:40 Uhr, sondern um 7:55 Uhr – von Haltestelle 3." }],
        ["Von welcher Haltestelle fährt der Bus?", ["3", "1", "7"], { h: "Der Bus fährt heute nicht um 7:40 Uhr, sondern um 7:55 Uhr – von Haltestelle 3." }],
        ["Was sollt ihr **nicht** mitbringen?", ["Badesachen", "Handtuch", "Trinkflasche"], { h: "Bringt morgen bitte Turnschuhe, eine Trinkflasche und ein Handtuch mit – aber keine Badesachen." }],
        ["Wann ist die Bücherei geschlossen?", ["Mittwoch", "Donnerstag", "Freitag"], { h: "Die Bücherei ist am Mittwoch geschlossen, dafür am Donnerstag bis 16 Uhr geöffnet." }],
        ["Wo schreibst du deinen Namen hin?", ["oben rechts", "oben links", "unten"], { h: "Erst schreibst du deinen Namen oben rechts, dann unterstreichst du die Überschrift rot." }],
        ["Was hilft beim genauen Zuhören?", ["Wichtige Wörter im Kopf wiederholen", "Nebenbei malen", "Mit dem Nachbarn reden"]]
    ]
});
duell("l-ueben-portionen", {
    titel12: "Übe-Duell", titel34: "Übe-Duell",
    "12": [
        ["Was ist besser?", ["Jeden Tag ein bisschen üben", "Einmal ganz lange üben"]],
        ["Eine Karte war falsch. Wohin kommt sie?", ["📦 „übe ich noch“", "📦 „kann ich“", "🗑️ in den Müll"]],
        ["Wie viele Karten übst du auf einmal?", ["5 Karten", "100 Karten", "gar keine"]],
        ["Du kannst eine Karte sicher. Wohin kommt sie?", ["📦 „kann ich“", "📦 „übe ich noch“"]],
        ["Wann übst du die schweren Karten wieder?", ["Nächstes Mal wieder", "Nie mehr", "Nur in den Ferien"]],
        ["3 + 4 = ?", ["7", "6", "8"]]
    ],
    "34": [
        ["Was hilft beim Lernen von 7 · 8?", ["Jeden Tag kurz mit Kärtchen üben", "Einmal vor der Arbeit ganz lange", "Gar nicht üben"]],
        ["Was steht auf der Rückseite der Karte?", ["die Lösung", "dein Name", "nichts"]],
        ["Wie lange ist eine gute Übe-Portion?", ["5 bis 10 Minuten", "2 Stunden", "10 Sekunden"]],
        ["Welche Karten übst du am meisten?", ["die schweren", "die leichten", "alle auf einmal"]],
        ["7 · 8 = ?", ["56", "54", "58"]],
        ["Was machst du nach 3 Minuten Training?", ["Tauschen oder kurz Pause", "Weitermachen bis zum Umfallen", "Die Karten wegwerfen"]]
    ]
});
duell("l-lernweg", {
    titel12: "Lern-Profi-Duell", titel34: "Lern-Profi-Duell",
    "12": [
        ["Du steckst fest. Was hilft?", ["🙋 Die Hilfe-Treppe", "😠 Aufgeben", "💤 Schlafen"]],
        ["Welcher Satz ist ein Mut-Satz?", ["Ich kann das NOCH nicht.", "Ich bin zu dumm.", "Das schaffe ich nie."]],
        ["Was ist eine gute Kopf-Pause?", ["🙆 Aufstehen und strecken", "📱 Ein Video schauen", "🎮 Ein Spiel spielen"]],
        ["Fehler sind …", ["Helfer", "schlimm", "peinlich"]],
        ["Was machst du zuerst bei einer Aufgabe?", ["Genau lesen: Was soll ich tun?", "Sofort losschreiben", "Das Blatt abgeben"]],
        ["Womit merkst du dir Dinge gut?", ["Mit einem Bild im Kopf", "Mit Weggucken", "Gar nicht"]]
    ],
    "34": [
        ["Eine Aufgabe ist zu schwer. Was hilft?", ["Sie in kleine Schritte teilen", "Das Blatt umdrehen", "Einfach irgendwas hinschreiben"]],
        ["Welche Frage ist genau?", ["Was heißt ‚Umfang‘ bei Aufgabe 2?", "Hä?", "Ich versteh das alles nicht."]],
        ["Wie kontrollierst du 63 − 28 = 35?", ["35 + 28 rechnen", "63 + 28 rechnen", "Gar nicht"]],
        ["Welches Wochenziel ist gut?", ["Jeden Tag 5 Minuten Einmaleins", "Der Beste der Welt werden", "Alles auf einmal lernen"]],
        ["Was tust du bei Frust?", ["3-mal tief atmen", "Das Blatt zerreißen", "Den Nachbarn anschreien"]],
        ["Welche Pause hilft dem Kopf?", ["Wasser trinken und strecken", "Ein Handy-Spiel", "Ein Video schauen"]]
    ]
});

/* ---------------- Mischen (immer gleich für dieselbe Frage) ---------------- */
function mischen(frage, ant){
    const zahl = ant.every(a => /^-?\d+([.,]\d+)?$/.test(String(a).trim()));
    const idx = ant.map((a, k) => k);
    if (zahl) idx.sort((a, b) => parseFloat(String(ant[a]).replace(",", ".")) - parseFloat(String(ant[b]).replace(",", ".")));
    else {
        let s = 0; for (const c of frage + ant.join("")) s = (s * 31 + c.charCodeAt(0)) >>> 0;
        for (let i = idx.length - 1; i > 0; i--) { s = (s * 1103515245 + 12345) >>> 0; const j = s % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    }
    return { a: idx.map(k => String(ant[k]).trim()), r: idx.indexOf(0) };
}
window.LERN_DUELLE = D;
window.lernDuell = function (e, st) {
    const d = e && (D[e.ersetzt || e.id] || D[e.id]);
    if (!d || !d[st]) return null;
    return {
        titel: d["titel" + st] || "Ella-Duell", folie: d["folie" + st] || d.folie || "", emoji: "🦉",
        ersetzt: d["ersetzt" + st] || [],
        fragen: d[st].map(([f, ant, x]) => Object.assign({ f }, mischen(f, ant), x ? { h: x.h || "", b: x.b || "" } : {}))
    };
};
})();
