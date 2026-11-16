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
        ["Das Doppelte von 5?", ["10", "7", "15"]],
        ["2 + 2 + 2 + 2 = ?", ["8", "6", "10"]],
        ["Wie viele Socken sind das?", ["6", "3", "8"], { b: "🧦🧦  🧦🧦  🧦🧦" }],
        ["2 Hände – wie viele Finger?", ["10", "8", "12"]],
        ["5 + 5 + 5 = ?", ["15", "10", "20"]]
    ]
});
duell("l-uhr", {
    titel34: "Uhr-Duell",
    "34": [
        ["Es ist 8:45 Uhr. Wie spät ist es in 20 Minuten?", ["9:05 Uhr", "9:15 Uhr", "8:65 Uhr"]],
        ["Viertel nach drei – wie schreibt man das?", ["3:15 Uhr", "3:45 Uhr", "2:45 Uhr"]],
        ["Viertel vor sieben – wie schreibt man das?", ["6:45 Uhr", "7:15 Uhr", "6:15 Uhr"]],
        ["Wie viele Minuten hat eine Stunde?", ["60", "100", "50"]],
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
        ["Was hilft beim Konzentrieren am meisten?", ["Nur das Material für die Aufgabe auf dem Tisch", "Leise Musik nebenbei", "Alle Stifte bereitlegen, falls man sie braucht"]]
    ]
});
duell("l-arbeitsplatz", {
    titel12: "Startklar-Duell", titel34: "Startklar-Duell",
    "12": [
        ["Womit malst du große Flächen am besten aus?", ["🖍️ Wachsmalstifte", "🖊️ Füller", "✏️ spitzer Bleistift"]],
        ["Was machst du zuerst?", ["🧹 Tisch frei machen", "🚀 Loslegen", "✅ Kontrollieren"]],
        ["Was gehört **nicht** ins Mäppchen?", ["🧸 Anhänger zum Spielen", "📏 kleines Lineal", "🖊️ Füller"]],
        ["Der Bleistift ist stumpf. Was ist am besten?", ["Vor der Stunde spitzen", "In der Stunde zum Mülleimer gehen und spitzen", "Den Nachbarn um seinen bitten"]],
        ["Wie schneidest du sicher?", ["✂️ Schere vom Körper weg", "✂️ Schere zu mir hin", "✂️ Papier ganz schnell drehen"]],
        ["Wann bist du startklar?", ["Material liegt bereit und ich schaue nach vorn", "Mein Mäppchen ist offen", "Ich habe meinen Platz gefunden"]]
    ],
    "34": [
        ["Was liegt auf einem guten Arbeitsplatz?", ["Nur Material für die Aufgabe", "Alle Hefte für den ganzen Tag", "Das Material und die Trinkflasche mitten auf dem Heft"]],
        ["Was kommt nach „Tisch frei“?", ["Material bereitlegen", "Kontrollieren", "Pause machen"]],
        ["Wie ziehst du einen geraden Strich?", ["Lineal festhalten, Stift am Lineal entlang", "Ohne Lineal ganz langsam", "Lineal locker hinlegen und schnell ziehen"]],
        ["Dein Füller ist leer. Was tust du?", ["Leise die Patrone wechseln", "Nach vorn gehen und fragen, was ich tun soll", "Warten, bis jemand es merkt"]],
        ["Was fragst du dich beim Schritt „Aufgabe lesen“?", ["Was soll ich tun?", "Wie spät ist es?", "Wer ist schon fertig?"]],
        ["Wann kontrollierst du deine Arbeit?", ["Wenn ich fertig bin – bevor ich abgebe", "Nur wenn die Lehrerin es sagt", "Wenn ich die Note bekomme"]]
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
        ["Welcher Trick hilft beim Merken?", ["Ein Bild im Kopf machen", "Es einmal laut sagen", "Es sich ganz fest vornehmen"]],
        ["Welches Wort war **nicht** dabei?", ["Mond", "Hut", "Tasse"], { h: "Fisch, Hut, Stern, Tasse" }]
    ],
    "34": [
        ["Was kam an **dritter** Stelle?", ["Bus", "Pizza", "Rakete"], { h: "Gitarre, Pizza, Bus, Rakete, Schuh" }],
        ["Welche Zahlenreihe hast du gehört?", ["4, 8, 1, 6, 3", "4, 1, 8, 6, 3", "4, 8, 6, 1, 3"], { h: "4, 8, 1, 6, 3" }],
        ["Welcher Trick hilft beim Merken von Wörtern?", ["Eine verrückte Geschichte daraus machen", "Die Wörter einmal schnell überfliegen", "Nebenbei laut Musik hören"]],
        ["Was ist am **Dienstag**?", ["Musik", "Sport", "Kunst"], { h: "Montag Sport, Dienstag Musik, Mittwoch Kunst" }],
        ["Welches Wort war **nicht** dabei?", ["Stuhl", "Glas", "Feder"], { h: "Lampe, Kissen, Tor, Glas, Feder, Wolke" }],
        ["Warum hilft Wiederholen?", ["Das Gehirn speichert es fester", "Dann ist man schneller fertig", "Dann muss man nicht mehr aufpassen"]]
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
        ["Wie viele Minuten hat eine Stunde?", ["60", "100", "50"]],
        ["Welches Satzzeichen gehört hinter eine Frage?", ["?", ".", "!"]],
        ["1000 − 350 = ?", ["650", "750", "550"]],
        ["Wie viele Flächen hat ein Würfel?", ["6", "4", "8"]]
    ]
});
duell("l-lerntheke", {
    titel12: "Stationen-Duell", titel34: "Stationen-Duell",
    "12": [
        ["Der Timer klingelt. Was tust du?", ["Stift weg, Blatt weitergeben", "Noch schnell den Satz fertig schreiben", "Erst alles einpacken"]],
        ["Du bist mit der Station fertig. Was nun?", ["Kontrollieren, dann die Zusatzaufgabe", "Sofort zur nächsten Station", "Leise warten, bis alle fertig sind"]],
        ["Du verstehst eine Aufgabe nicht. Was zuerst?", ["Noch einmal genau lesen", "Sofort die Lehrerin fragen", "Die Aufgabe überspringen"]],
        ["6 + 4 = ?", ["10", "9", "11"]],
        ["Wie viele Silben hat „Tomate“?", ["3", "2", "4"]],
        ["Welches Wort fängt mit **M** an?", ["Maus", "Sonne", "Igel"]]
    ],
    "34": [
        ["Der Timer klingelt. Was tust du?", ["Stift weg, Blatt weitergeben", "Noch schnell den Satz fertig schreiben", "Erst alles einpacken"]],
        ["Wie kontrollierst du 47 + 25 = 72?", ["72 − 25 rechnen", "72 + 25 rechnen", "47 − 25 rechnen"]],
        ["Wann machst du die Zusatzaufgabe?", ["Wenn ich fertig bin und kontrolliert habe", "Sofort am Anfang", "Wenn mir langweilig ist"]],
        ["9 · 6 = ?", ["54", "56", "45"]],
        ["Welches Wort ist ein Nomen?", ["freude", "freuen", "fröhlich"]],
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
        ["Wie hört ein Zuhör-Profi zu?", ["👀 Schaut hin und wartet, bis der andere fertig ist", "✋ Meldet sich sofort, wenn er etwas weiß", "✏️ Schreibt nebenbei weiter"]]
    ],
    "34": [
        ["Wann fährt der Bus?", ["7:55 Uhr", "7:40 Uhr", "7:35 Uhr"], { h: "Der Bus fährt heute nicht um 7:40 Uhr, sondern um 7:55 Uhr – von Haltestelle 3." }],
        ["Von welcher Haltestelle fährt der Bus?", ["3", "1", "7"], { h: "Der Bus fährt heute nicht um 7:40 Uhr, sondern um 7:55 Uhr – von Haltestelle 3." }],
        ["Was sollt ihr **nicht** mitbringen?", ["Badesachen", "Handtuch", "Trinkflasche"], { h: "Bringt morgen bitte Turnschuhe, eine Trinkflasche und ein Handtuch mit – aber keine Badesachen." }],
        ["Wann ist die Bücherei geschlossen?", ["Mittwoch", "Donnerstag", "Freitag"], { h: "Die Bücherei ist am Mittwoch geschlossen, dafür am Donnerstag bis 16 Uhr geöffnet." }],
        ["Wo schreibst du deinen Namen hin?", ["oben rechts", "oben links", "unten"], { h: "Erst schreibst du deinen Namen oben rechts, dann unterstreichst du die Überschrift rot." }],
        ["Was hilft beim genauen Zuhören?", ["Wichtige Wörter im Kopf wiederholen", "Die Augen zumachen", "Gleich die Antwort überlegen"]]
    ]
});
duell("l-ueben-portionen", {
    titel12: "Übe-Duell", titel34: "Übe-Duell",
    "12": [
        ["Was ist besser?", ["Jeden Tag ein bisschen üben", "Einmal ganz lange üben"]],
        ["Eine Karte war falsch. Wohin kommt sie?", ["📦 „übe ich noch“", "📦 „kann ich“", "📦 ganz nach hinten in den Stapel"]],
        ["Wie viele Karten übst du auf einmal?", ["5 bis 10 Karten", "alle Karten", "nur 1 Karte"]],
        ["Du kannst eine Karte sicher. Wohin kommt sie?", ["📦 „kann ich“", "📦 „übe ich noch“"]],
        ["Wann übst du die schweren Karten wieder?", ["Morgen wieder", "In einer Woche", "Erst vor der Arbeit"]],
        ["3 + 4 = ?", ["7", "6", "8"]]
    ],
    "34": [
        ["Was hilft beim Lernen von 7 · 8 am besten?", ["Jeden Tag kurz mit Kärtchen üben", "Einmal vor der Arbeit ganz lange", "Die Reihe einmal abschreiben"]],
        ["Was steht auf der Rückseite der Übe-Karte?", ["die Lösung", "eine neue Aufgabe", "ein Tipp"]],
        ["Wie lange ist eine gute Übe-Portion?", ["5 bis 10 Minuten", "eine Stunde", "1 Minute"]],
        ["Welche Karten übst du am meisten?", ["die schweren", "die leichten", "alle gleich oft"]],
        ["7 · 8 = ?", ["56", "54", "58"]],
        ["Was machst du nach 3 Minuten Training mit dem Partner?", ["Rollen tauschen", "Einfach weitermachen", "Neue Karten schreiben"]]
    ]
});
duell("l-lernweg", {
    titel12: "Lern-Profi-Duell", titel34: "Lern-Profi-Duell",
    "12": [
        ["Du steckst fest. Was ist der 1. Schritt der Hilfe-Treppe?", ["Noch einmal genau lesen", "Die Lehrerin fragen", "Den Nachbarn fragen"]],
        ["Welcher Satz ist ein Mut-Satz?", ["Ich kann das NOCH nicht.", "Das ist eben nicht mein Ding.", "Die anderen sind einfach schneller."]],
        ["Was ist die beste Kopf-Pause?", ["🙆 Aufstehen, strecken, Wasser trinken", "📖 Ein anderes Buch lesen", "✏️ Schnell die nächste Aufgabe anfangen"]],
        ["Fehler sind …", ["Helfer: Sie zeigen, was ich noch üben kann", "egal, Hauptsache fertig", "nur bei Arbeiten wichtig"]],
        ["Was machst du zuerst bei einer Aufgabe?", ["Genau lesen: Was soll ich tun?", "Das Beispiel abschreiben", "Schauen, was der Nachbar macht"]],
        ["Womit merkst du dir Dinge gut?", ["Mit einem Bild im Kopf", "Mit einmal Durchlesen", "Mit ganz schnellem Lesen"]]
    ],
    "34": [
        ["Eine Aufgabe ist zu schwer. Was hilft zuerst?", ["Sie in kleine Schritte teilen", "Die Lösung vom Nachbarn ansehen", "Mit der nächsten Aufgabe weitermachen"]],
        ["Welche Frage ist genau?", ["Was heißt ‚Umfang‘ bei Aufgabe 2?", "Wie geht Aufgabe 2?", "Können Sie das nochmal erklären?"]],
        ["Wie kontrollierst du 63 − 28 = 35?", ["35 + 28 rechnen", "63 + 28 rechnen", "63 − 35 rechnen"]],
        ["Welches Wochenziel ist gut?", ["Jeden Tag 5 Minuten die 7er-Reihe", "Besser in Mathe werden", "Mehr üben"]],
        ["Was hilft bei Frust zuerst?", ["3-mal tief atmen", "Schnell die Aufgabe beenden", "Die Aufgabe einfach weglassen"]],
        ["Welche Pause hilft dem Kopf am meisten?", ["Bewegen und Wasser trinken", "Sitzen bleiben und ausruhen", "Etwas Süßes essen"]]
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
window.lernMischen = (f, ant) => { const n = window.ltNeutral ? window.ltNeutral(f, ant) : { f, a: ant }; return Object.assign({ f: n.f }, mischen(n.f, n.a)); };
window.lernDuell = function (e, st) {
    const d = e && (D[e.ersetzt || e.id] || D[e.id]);
    if (!d || !d[st]) return null;
    return {
        titel: d["titel" + st] || "Ella-Duell", folie: d["folie" + st] || d.folie || "", emoji: "🦉",
        ersetzt: d["ersetzt" + st] || [],
        fragen: d[st].map(([f0, ant0, x]) => { const { f, a: ant } = window.ltNeutral ? window.ltNeutral(f0, ant0) : { f: f0, a: ant0 }; return Object.assign({ f }, mischen(f, ant), x ? { h: x.h || "", b: x.b || "" } : {}); })
    };
};
})();
