/* ============================================================
   Leuchtturm – Lernangebot: wechselnde Einstiege
   Damit nicht jede Stunde gleich abläuft, hat jede Vorlage einen
   von vier Einstiegen:
     geschichte – Vorlese-Geschichte mit Hör-Auftrag und Denk-Runden
     fehler     – Fehler-Detektiv: Ellas Heft mit versteckten Fehlern
                  (kommt NACH den Challenges als Profi-Check)
     knobel     – Knobel-Rätsel mit Tipps und Lösung
     erklaert   – Ella erklärt: Merksatz, Schritte, Mitmach-Aufgabe
   fehler.zeilen: [Aufgabe, Ellas Antwort, Korrektur ("" = richtig), Warum]
   ============================================================ */
(function(){
const L = window.LERN_EINSTIEG = {

/* ---------------- Fehler-Detektiv ---------------- */
"l-rechenprofis": { art: "fehler",
    "12": { zeilen: [["3 + 4", "7", ""], ["9 − 2", "6", "7", "Von 9 zwei zurück: 8, 7."], ["5 + 5", "10", ""], ["8 − 3", "11", "5", "Bei Minus wird es weniger!"]],
            frage: "Wie kann Ella prüfen, ob ihr Ergebnis stimmt?" },
    "34": { zeilen: [["45 + 30", "75", ""], ["62 − 8", "56", "54", "62 − 2 = 60, dann noch 6 weg → 54."], ["38 + 25", "53", "63", "38 + 20 = 58, + 5 = 63 – Zehnerübergang vergessen."], ["300 + 450", "750", ""]],
            frage: "Mit welcher Probe kann Ella eine Minusaufgabe kontrollieren?" } },
"l-wortarten": { art: "fehler",
    "12": { zeilen: [["🐶 Hund", "der hund", "der Hund", "Namenwörter schreibt man groß."], ["🐱 Katze", "die Katze", ""], ["🚗 Auto", "der Auto", "das Auto", "Der Begleiter heißt „das“."], ["⚽ Ball", "der Ball", ""]],
            frage: "Woran erkennst du ein Namenwort?" },
    "34": { zeilen: [["laufen", "Nomen", "Verb", "Was man tun kann → Verb (ich laufe)."], ["der Tisch", "Nomen", ""], ["schnell", "Verb", "Adjektiv", "Wie etwas ist → Adjektiv (das schnelle Auto)."], ["die Freude", "Verb", "Nomen", "Mit Begleiter → Nomen, großgeschrieben."], ["lachen", "Verb", ""]],
            frage: "Welche Proben helfen dir beim Sortieren?" } },
"l-satz-baumeister": { art: "fehler",
    "12": { zeilen: [["", "der hund bellt.", "Der Hund bellt.", "Satzanfang groß – und Hund ist ein Namenwort."], ["", "Mia malt ein Bild.", ""], ["", "Tom spielt Fußball", "Tom spielt Fußball.", "Am Ende fehlt der Punkt."], ["", "Die Sonne scheint.", ""]],
            frage: "Was gehört zu jedem Satz dazu?" },
    "34": { zeilen: [["Frage", "Wann kommst du nach Hause.", "Wann kommst du nach Hause?", "Fragesatz → Fragezeichen."], ["Aussage", "Lena liest ein Buch.", ""], ["Aufforderung", "Pass auf?", "Pass auf!", "Ausruf oder Aufforderung → Ausrufezeichen."], ["Umgestellt", "Ein Buch liest Lena.", ""]],
            frage: "Wie findest du heraus, welches Satzzeichen passt?" } },
"l-abc-training": { art: "fehler",
    "12": { zeilen: [["A, B, …", "C", ""], ["D, E, …", "G", "F", "D – E – F – G."], ["K, L, …", "M", ""], ["R, S, …", "U", "T", "R – S – T – U."]],
            frage: "Was hilft dir, wenn du nicht weißt, welcher Buchstabe kommt?" },
    "34": { zeilen: [["Apfel, Banane, Kirsche", "Apfel, Banane, Kirsche", ""], ["Maus, Hund, Esel", "Esel, Maus, Hund", "Esel, Hund, Maus", "H kommt vor M."], ["Ball, Baum, Bad", "Ball, Baum, Bad", "Bad, Ball, Baum", "Gleicher Anfang? Dann den 3. Buchstaben vergleichen: d – l – u."], ["Zebra, Affe, Igel", "Affe, Igel, Zebra", ""]],
            frage: "Was machst du, wenn zwei Wörter mit denselben Buchstaben anfangen?" } },
"l-verdoppeln": { art: "fehler",
    "12": { zeilen: [["Verdopple 3", "6", ""], ["Verdopple 5", "55", "10", "Verdoppeln heißt 5 + 5 – nicht die Ziffer zweimal schreiben."], ["Die Hälfte von 8", "4", ""], ["Die Hälfte von 6", "2", "3", "3 + 3 = 6, also ist 3 die Hälfte."]],
            frage: "Wie kannst du das mit deinen Fingern prüfen?" },
    "34": { zeilen: [["Verdopple 35", "70", ""], ["Verdopple 48", "86", "96", "40 + 40 = 80, 8 + 8 = 16, zusammen 96."], ["Halbiere 64", "32", ""], ["Halbiere 90", "40", "45", "Hälfte von 80 = 40, Hälfte von 10 = 5 → 45."]],
            frage: "Wie kann Ella beim Halbieren kontrollieren, ob es stimmt?" } },
"l-geld": { art: "fehler",
    "12": { zeilen: [["2 € + 2 €", "4 €", ""], ["5 € + 1 €", "51 €", "6 €", "5 € und 1 € zusammen sind 6 €."], ["1 € + 1 € + 1 €", "3 €", ""], ["10 € − 2 €", "12 €", "8 €", "Wer 2 € ausgibt, hat weniger."]],
            frage: "Wie kann Ella mit Spielgeld nachprüfen?" },
    "34": { zeilen: [["1 € = … ct", "100 ct", ""], ["2,50 € + 1,20 €", "3,70 €", ""], ["Du zahlst 3,40 € mit 5 €. Rückgeld?", "2,60 €", "1,60 €", "Bis 4 € sind es 60 ct, bis 5 € noch 1 € → 1,60 €."], ["0,50 € + 0,75 €", "0,125 €", "1,25 €", "50 ct + 75 ct = 125 ct = 1,25 €."]],
            frage: "Wie rechnest du Rückgeld am sichersten aus?" } },
"l-uhr": { art: "fehler",
    "12": { zeilen: [["☀️ Frühstück", "abends", "morgens", "Frühstück gibt es am Morgen."], ["🌙 Schlafen gehen", "abends", ""], ["Großer Zeiger auf 12, kleiner auf 3", "3 Uhr", ""], ["Großer Zeiger auf 6, kleiner zwischen 7 und 8", "halb 7", "halb 8", "Der kleine Zeiger ist schon auf dem Weg zur 8."]],
            frage: "Welcher Zeiger zeigt die Stunden?" },
    "34": { zeilen: [["Großer Zeiger auf 3, kleiner kurz nach 4", "4:15 Uhr", ""], ["Großer Zeiger auf 9, kleiner kurz vor 6", "6:45 Uhr", "5:45 Uhr", "Der kleine Zeiger ist noch nicht bei der 6."], ["Von 8:30 bis 9:15 Uhr", "45 min", ""], ["Von 10:40 bis 11:10 Uhr", "70 min", "30 min", "Bis 11:00 sind es 20 min, dann noch 10 min."]],
            frage: "Wie berechnest du eine Zeitspanne Schritt für Schritt?" } },
"l-fehler-helfer": { art: "fehler", spalten: ["Was passiert", "Was Ella macht"],
    "12": { zeilen: [["Ella rechnet 4 + 3 = 8.", "Sie gibt sofort ab.", "Noch einmal nachrechnen!", "Mit den Fingern geprüft: 4 + 3 = 7."], ["Ella hat einen Fehler gemacht.", "Sie wirft den Stift weg und hört auf.", "Sie probiert es noch einmal.", "Fehler sind Helfer: Sie zeigen, was ich noch üben kann."], ["Ella ist fertig.", "Sie schaut jede Aufgabe noch einmal an.", ""], ["Ella weiß nicht weiter.", "Sie fragt ihre Nachbarin leise.", ""]],
            frage: "Was machst du, wenn du einen Fehler entdeckst?" },
    "34": { zeilen: [["Das Diktat kommt zurück: 3 Fehler.", "Ella steckt das Heft schnell weg.", "Fehler anschauen und berichtigen.", "Wer seine Fehler versteht, macht sie seltener wieder."], ["56 − 19 = 47?", "Ella macht die Probe: 47 + 19 = 66. Stimmt nicht – sie rechnet neu.", ""], ["Ella schreibt „Farad“.", "Sie denkt: Egal, man versteht es ja.", "Im Wörterbuch nachschlagen: Fahrrad.", "Nachschlagen ist ein Kontroll-Trick."], ["Ella vertauscht oft ie und ei.", "Sie schreibt sich eine Merkkarte.", ""]],
            frage: "Welche Kontroll-Tricks kennst du?" } },

/* ---------------- Knobel-Rätsel ---------------- */
"l-zahlenland": { art: "knobel",
    "12": { bild: "🔢", frage: "Ich bin eine Zahl. Ich bin größer als 5 und kleiner als 7. Wer bin ich?", tipps: ["Zähle laut: 5, …, 7.", "Welche Zahl steht dazwischen?"], loesung: "6", warum: "6 kommt nach der 5 und vor der 7." },
    "34": { bild: "H | Z | E", frage: "Ich habe 4 Hunderter, keinen Zehner und 7 Einer. Welche Zahl bin ich?", tipps: ["Zeichne eine Stellenwerttafel: H | Z | E.", "„Kein Zehner“ heißt: an der Zehnerstelle steht eine 0."], loesung: "407", warum: "4 H, 0 Z, 7 E = 407 – nicht 47!" } },
"l-zahlenhaeuser": { art: "knobel",
    "12": { bild: "🏠 10 = 7 + ?", frage: "Im Zahlenhaus wohnen immer zwei Zahlen, die zusammen 10 sind. Die 7 wohnt schon da. Wer zieht dazu?", tipps: ["Zähle von 7 bis 10 weiter.", "7 Finger hoch – wie viele fehlen bis 10?"], loesung: "die 3", warum: "7 + 3 = 10" },
    "34": { bild: "❓ + 34 = 100", frage: "Ich bin eine Zahl. Bis zum nächsten Zehner fehlen mir 4, bis zur 100 fehlen mir 34. Wer bin ich?", tipps: ["Rechne zuerst: 100 − 34.", "Prüfe: Fehlen bis zum nächsten Zehner wirklich 4?"], loesung: "66", warum: "66 + 4 = 70 und 66 + 34 = 100." } },
"l-muster": { art: "knobel",
    "12": { bild: "🔴 🔵 🔵 🔴 🔵 🔵 🔴 ❓ ❓", frage: "Wie geht das Muster weiter?", tipps: ["Sprich laut mit: rot, blau, blau …", "Welcher Teil wiederholt sich immer wieder?"], loesung: "🔵 🔵", warum: "Das Muster heißt: rot – blau – blau, immer wieder." },
    "34": { bild: "2, 4, 8, 16, …", frage: "Wie geht die Zahlenfolge weiter?", tipps: ["Vergleiche immer zwei Nachbarzahlen.", "Es kommt nicht immer gleich viel dazu …"], loesung: "32, 64", warum: "Jede Zahl wird verdoppelt." } },
"l-formen": { art: "knobel",
    "12": { bild: "⬛ 🔺 ⚪", frage: "Ich habe 3 Ecken und 3 Seiten. Wer bin ich?", tipps: ["Zähle die Ecken mit dem Finger.", "Ein Kreis hat gar keine Ecke."], loesung: "das Dreieck 🔺", warum: "Drei Ecken, drei Seiten – darum heißt es Drei-Eck." },
    "34": { bild: "🎲 📦 ⚽", frage: "Ich bin ein Körper mit 6 Flächen. Alle Flächen sind gleich große Quadrate. Wer bin ich?", tipps: ["Mit mir spielt man oft Brettspiele.", "Zähle: oben, unten, vorne, hinten, links, rechts."], loesung: "der Würfel 🎲", warum: "Ein Würfel hat 6 quadratische Flächen, 8 Ecken und 12 Kanten." } },
"l-rechengeschichten": { art: "knobel",
    "12": { bild: "🐰 🐰 🐰 🐰", frage: "Auf der Wiese sitzen 4 Hasen. 2 hoppeln weg, dann kommen 3 dazu. Wie viele Hasen sind jetzt da?", tipps: ["Erst weg, dann dazu – Schritt für Schritt.", "4 − 2 = 2. Und dann?"], loesung: "5 Hasen", warum: "4 − 2 + 3 = 5" },
    "34": { bild: "🐔 🐄", frage: "Auf dem Hof sind Hühner und Kühe. Zusammen haben sie 5 Köpfe und 14 Beine. Wie viele Hühner und wie viele Kühe sind es?", tipps: ["Probiere: Was wäre, wenn alle 5 Tiere Hühner wären?", "Jede Kuh hat 2 Beine mehr als ein Huhn."], loesung: "3 Hühner und 2 Kühe", warum: "3 · 2 + 2 · 4 = 6 + 8 = 14 Beine." } },
"l-lese-detektive": { art: "knobel",
    "12": { bild: "🐟 🌳", frage: "Was ist hier Unsinn? „Der Fisch klettert auf den Baum.“", tipps: ["Kann ein Fisch klettern?", "Wo lebt ein Fisch?"], loesung: "Fische klettern nicht – sie schwimmen im Wasser.", warum: "Wer genau liest, merkt, wenn etwas nicht stimmen kann." },
    "34": { bild: "🤒 🏫", frage: "Lies genau: „Am Montag war Lena krank. Deshalb ging sie am Montag in die Schule.“ Was stimmt hier nicht?", tipps: ["Lies beide Sätze langsam.", "Achte auf das Wort „deshalb“."], loesung: "Wer krank ist, bleibt zu Hause – „deshalb“ passt nicht.", warum: "Kleine Wörter wie „deshalb“ oder „aber“ verraten, wie Sätze zusammenhängen." } },
"l-reim-zauber": { art: "knobel",
    "12": { bild: "🏠 🐭 🐶", frage: "Welches Wort reimt sich NICHT? Haus – Maus – Laus – Hund", tipps: ["Sprich alle Wörter laut.", "Hör auf das Ende: -aus …"], loesung: "Hund", warum: "Haus, Maus und Laus enden alle auf -aus." },
    "34": { bild: "🌙 ☀️", frage: "Zwei Reimpaare haben sich versteckt: Nacht – Sonne – lacht – Mond – Tonne. Welche sind es?", tipps: ["Ein Wort bleibt übrig.", "Hör auf das Ende: -acht und -onne."], loesung: "Nacht – lacht und Sonne – Tonne", warum: "Bei Reimen klingt das Ende ab dem betonten Selbstlaut gleich." } },
"l-lern-quiz": { art: "knobel",
    "12": { bild: "🕐", frage: "Ich habe Zeiger, aber keine Hände. Ich laufe, aber ich habe keine Füße. Wer bin ich?", tipps: ["Ich hänge oft an der Wand.", "Ich mache tick-tack."], loesung: "die Uhr 🕐", warum: "Die Zeiger zeigen die Zeit, und die Uhr „läuft“, ohne zu gehen." },
    "34": { bild: "🤔 → · 2 → + 3 → 15", frage: "Ella denkt sich eine Zahl. Sie verdoppelt sie und zählt 3 dazu. Heraus kommt 15. Welche Zahl hat sie sich gedacht?", tipps: ["Rechne rückwärts – von hinten nach vorn.", "15 − 3 = 12. Und was ist die Hälfte von 12?"], loesung: "6", warum: "6 · 2 = 12, 12 + 3 = 15." } },

/* ---------------- Ella erklärt ---------------- */
"l-anlaut-detektive": { art: "erklaert",
    "12": { merksatz: "Der Anlaut ist der erste Laut, den ich in einem Wort höre.", schritte: ["Sprich das Wort langsam: Mmmond.", "Halte den ersten Laut lange: Mmmm …", "Such den passenden Buchstaben: M."], aufgabe: "🐟 Fisch – welchen Anlaut hörst du?", loesung: "F – Fffisch" },
    "34": { merksatz: "Ich spreche ein Wort ganz langsam – dann höre ich jeden Laut: am Anfang, in der Mitte und am Ende.", schritte: ["Sprich das Wort in Zeitlupe: Sch – a – f.", "Zähle jeden Laut mit einem Finger.", "Benenne Anfang, Mitte und Ende."], aufgabe: "Wie viele Laute hörst du in „Schaf“?", loesung: "3 Laute: Sch – a – f (sch ist ein Laut!)" } },
"l-lesen-malen": { art: "erklaert",
    "12": { merksatz: "Erst lesen – dann malen!", schritte: ["Lies das Wort (oder hör genau zu).", "Schau: Welche Farbe? Wie viele?", "Male genau das – nicht mehr und nicht weniger."], aufgabe: "„2 rote Bälle“ – was malst du?", loesung: "Zwei Bälle, beide rot." },
    "34": { merksatz: "Ein Mal-Auftrag hat oft mehrere Teile. Ich erledige sie der Reihe nach.", schritte: ["Den ganzen Auftrag einmal lesen.", "Teile unterstreichen: Was? Wie viele? Welche Farbe? Wo?", "Einen Teil nach dem anderen malen und abhaken."], aufgabe: "„Male links neben das Haus einen grünen Baum und über das Haus drei Vögel.“ Welche Teile hat der Auftrag?", loesung: "① grüner Baum links neben dem Haus · ② drei Vögel über dem Haus" } },
"l-einmaleins": { art: "erklaert",
    "12": { merksatz: "Mal-Aufgaben sind Plus-Aufgaben mit gleich großen Gruppen.", schritte: ["Wie viele Gruppen sind es?", "Wie viele sind in jeder Gruppe?", "3 Gruppen mit je 2: 2 + 2 + 2 = 3 · 2 = 6"], aufgabe: "🍎🍎  🍎🍎  🍎🍎  🍎🍎 – Wie viele Äpfel? Wie heißt die Mal-Aufgabe?", loesung: "4 · 2 = 8 (2 + 2 + 2 + 2)" },
    "34": { merksatz: "Kernaufgaben helfen: Aus 1 ·, 2 ·, 5 · und 10 · kann ich schwere Aufgaben ableiten. Und Tauschaufgaben haben dasselbe Ergebnis: 3 · 7 = 7 · 3.", schritte: ["Suche eine Kernaufgabe in der Nähe: 6 · 8 → 5 · 8 = 40.", "Nimm noch eine Reihe dazu: + 8.", "40 + 8 = 48 – also ist 6 · 8 = 48."], aufgabe: "Rechne mit einer Kernaufgabe: 9 · 6", loesung: "10 · 6 = 60, minus 6 → 54" } },
"l-arbeitsplatz": { art: "erklaert",
    "12": { merksatz: "Auf meinem Tisch liegt nur, was ich gerade brauche.", schritte: ["Alles weg, was ich nicht brauche.", "Blatt in die Mitte, Stift daneben.", "Mäppchen zu – jetzt kann ich starten!"], aufgabe: "Mathe-Arbeitsblatt: Was brauchst du? Bleistift – Radiergummi – Spielzeugauto – Lineal", loesung: "Bleistift, Radiergummi, Lineal. Das Auto bleibt im Ranzen." },
    "34": { merksatz: "Gut starten in 3 Schritten: Platz frei – Material bereit – Auftrag lesen.", schritte: ["Platz frei: Nur was ich für diese Aufgabe brauche.", "Material bereit: Habe ich alles?", "Auftrag lesen und überlegen: Womit fange ich an?"], aufgabe: "Du sollst ein Wort im Wörterbuch nachschlagen und abschreiben. Was liegt auf deinem Tisch?", loesung: "Wörterbuch, Heft und Stift – sonst nichts." } },
"l-merk-tricks": { art: "erklaert",
    "12": { merksatz: "Mit Bildern und Bewegungen merkt sich mein Kopf Dinge viel besser.", schritte: ["Ich mache mir ein Bild im Kopf.", "Ich mache eine Bewegung dazu.", "Ich sage es laut – und wiederhole."], aufgabe: "Merkt euch: Apfel – Schuh – Sonne. Macht zu jedem Wort eine Bewegung! Augen zu – wer weiß noch alle drei?", loesung: "Apfel – Schuh – Sonne (mit Bewegung klappt es besser!)" },
    "34": { merksatz: "Eselsbrücken helfen beim Merken – ein Merksatz, ein Reim oder eine kleine Geschichte.", schritte: ["Was soll ich mir merken? Zum Beispiel die Himmelsrichtungen N – O – S – W.", "Ich baue einen Merksatz: Nie Ohne Seife Waschen.", "Oft wiederholen – dann sitzt es."], aufgabe: "Denkt euch eine Eselsbrücke aus für: Montag – Dienstag – Mittwoch.", loesung: "Zum Beispiel „Mama Darf Mitfahren“ – jede gute Idee zählt!" } },
"l-lerntheke": { art: "erklaert",
    "12": { merksatz: "An der Lerntheke arbeite ich allein: holen – lösen – kontrollieren – zurückbringen.", schritte: ["Eine Station holen.", "Leise lösen.", "Mit der Lösungskarte kontrollieren.", "Zurückbringen und auf dem Laufzettel abhaken."], aufgabe: "Du bist mit einer Station fertig. Was machst du jetzt?", loesung: "Kontrollieren, zurückbringen, abhaken – dann die nächste Station holen." },
    "34": { merksatz: "Ich kontrolliere mit der Lösung und verbessere selbst – ohne abzuschreiben.", schritte: ["Station holen und lösen.", "Mit der Lösungskarte vergleichen.", "Fehler suchen und mit Farbstift verbessern.", "Abhaken und die nächste Station holen."], aufgabe: "Deine Lösung passt nicht zur Lösungskarte. Was tust du?", loesung: "Fehler suchen, verstehen und mit Farbe verbessern – nicht einfach abschreiben." } },
"l-auftraege-verstehen": { art: "erklaert",
    "12": { merksatz: "Signalwörter sagen mir, was ich tun soll: kreuze an ✗ · verbinde ↔ · male 🖍️ · kreise ein ◯", schritte: ["Schau auf das Zeichen beim Auftrag.", "Sag leise, was du tun sollst.", "Erst dann loslegen."], aufgabe: "„Kreise alle Äpfel ein.“ – Was machst du?", loesung: "Um jeden Apfel einen Kreis ziehen – nicht ankreuzen, nicht anmalen." },
    "34": { merksatz: "Erst den Auftrag ganz lesen, Signalwörter unterstreichen, dann Schritt für Schritt arbeiten.", schritte: ["Den Auftrag ganz lesen.", "Signalwörter unterstreichen: unterstreiche, ordne, begründe …", "Teilaufträge nummerieren und abhaken."], aufgabe: "„Unterstreiche alle Verben rot und schreibe sie in der Grundform auf.“ Wie viele Teilaufträge sind das?", loesung: "2: ① Verben rot unterstreichen ② in der Grundform aufschreiben" } },
"l-ueben-portionen": { art: "erklaert",
    "12": { merksatz: "Lieber jeden Tag ein bisschen üben als einmal ganz lange.", schritte: ["Jeden Tag 5 Minuten üben.", "Dann eine Pause.", "Morgen noch einmal wiederholen."], aufgabe: "Was ist besser? A: Am Sonntag eine Stunde üben. B: Jeden Tag 10 Minuten.", loesung: "B – in kleinen Portionen merkt sich der Kopf mehr." },
    "34": { merksatz: "Die Lernbox: Gewusste Karten wandern ein Fach weiter, nicht gewusste wieder ganz nach vorn.", schritte: ["Karte ziehen, Frage lesen, antworten.", "Gewusst? Ein Fach weiter.", "Nicht gewusst? Zurück in Fach 1 – morgen noch mal."], aufgabe: "Eine Karte aus Fach 3 wusstest du nicht. Wohin kommt sie?", loesung: "Zurück in Fach 1." } },

/* ---------------- Geschichte (vorhandener Lerntext) ---------------- */
"l-silben-schwingen": { art: "geschichte" }, "l-konzentration": { art: "geschichte" }, "l-hilfe-holen": { art: "geschichte" },
"l-pausen": { art: "geschichte" }, "l-dranbleiben": { art: "geschichte" }, "l-ziele": { art: "geschichte" },
"l-lernweg": { art: "geschichte" }, "l-zuhoeren": { art: "geschichte" }
};

const NAME = { geschichte: "Geschichte", fehler: "Fehler-Detektiv", knobel: "Knobel-Rätsel", erklaert: "Ella erklärt" };
/* Einstieg einer Stunde: angepasste Vorlagen behalten den Einstieg des Originals; eigene Stunden haben die Geschichte */
window.lernEinstieg = function (e, st){
    const x = L[e && e.id] || L[e && e.ersetzt];
    if (!x || x.art === "geschichte" || !x[st]) return { art: "geschichte", name: NAME.geschichte };
    return Object.assign({ art: x.art, name: NAME[x.art], spalten: x.spalten }, x[st]);
};
window.lernEinstiegName = NAME;

/* Stundenverlauf der Vorlagen anpassen (Fehler-Detektiv kommt nach den Übungen) */
(window.SOZIAL_VORLAGEN || []).forEach(e => {
    const x = L[e.id]; if (!x || x.art === "geschichte" || !Array.isArray(e.verlauf)) return;
    const v = e.verlauf, ein = v.find(r => /einstieg/i.test(r.phase)), ueb = v.find(r => /übung/i.test(r.phase));
    if (!ein || !ueb) return;
    const txt = st => { const d = x[st] || {};
        if (x.art === "knobel") return "Knobel-Rätsel: „" + d.frage + "“ – erst allein, dann zu zweit knobeln";
        if (x.art === "erklaert") return "Ella erklärt: " + d.merksatz + " – Mitmach-Aufgabe";
        return "Fehler-Detektiv: Ellas Heft – " + (d.zeilen || []).filter(z => z[2]).length + " Fehler finden und verbessern"; };
    ein.phase = NAME[x.art]; ein.k12 = txt("12"); ein.k34 = txt("34");
    if (x.art === "fehler") {   // erst üben, dann Profi-Check
        const i = v.indexOf(ein), j = v.indexOf(ueb);
        ueb.zeit = "5–18"; ein.zeit = "18–25";
        v[i] = ueb; v[j] = ein;
    }
});
})();

/* ---------- Dauer der Stunde (Lernangebot) ----------
   Manchmal sind es nur 20 oder 30 Minuten: Die gewählte Dauer wird gemerkt,
   der Stundenverlauf wird anteilig umgerechnet, die Präsentation kürzt mit. */
(function () {
    const DAUERN = [15, 20, 25, 30, 35, 40, 45, 50, 60];
    window.LERN_DAUERN = DAUERN;
    window.lernDauer = function () {
        let d = 0; try { d = parseInt(localStorage.getItem("lern_dauer"), 10); } catch (x) {}
        return d >= 10 && d <= 90 ? d : 40;
    };
    window.lernDauerSetzen = function (d) {
        d = Math.max(10, Math.min(90, parseInt(d, 10) || 40));
        try { localStorage.setItem("lern_dauer", String(d)); } catch (x) {}
        document.dispatchEvent(new CustomEvent("lerndauer", { detail: d }));
        return d;
    };
    const grenzen = v => { const m = String(v.zeit || "").match(/(\d+)\s*[–-]\s*(\d+)/); return m ? [+m[1], +m[2]] : null; };
    // Planungsbasis der Vorlage (Ende der letzten Phase, meist 40)
    window.lernBasis = function (e) {
        const g = (e.verlauf || []).map(grenzen).filter(Boolean);
        return g.length ? Math.max(...g.map(x => x[1])) : (+e.dauer || 40);
    };
    // Verlauf auf die gewählte Dauer umrechnen (jede Phase mind. 1–2 Minuten)
    window.lernVerlauf = function (e, dauer) {
        dauer = dauer || window.lernDauer();
        const vl = e.verlauf || [], basis = window.lernBasis(e);
        if (dauer === basis || !vl.every(grenzen)) return vl;
        const laengen = vl.map(v => { const [a, b] = grenzen(v); return b - a; });
        const roh = laengen.map(l => Math.max(1, l * dauer / basis));
        let ganz = roh.map(Math.floor), rest = dauer - ganz.reduce((a, b) => a + b, 0);
        const folge = roh.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]).map(x => x[1]);
        for (let k = 0; rest > 0; k++, rest--) ganz[folge[k % folge.length]]++;
        while (rest < 0) { const i = ganz.indexOf(Math.max(...ganz)); if (ganz[i] <= 1) break; ganz[i]--; rest++; }
        let t = 0;
        const kurz = dauer <= 30;
        return vl.map((v, i) => {
            const n = Object.assign({}, v, { zeit: t + "–" + (t + ganz[i]) }); t += ganz[i];
            if (kurz && /Übung|Challenge/i.test(v.phase)) { const z = dauer <= 20 ? " – heute kurz: nur 2 Challenges, ohne Bonus" : " – heute kurz: ohne Bonus-Level"; n.k12 = (v.k12 || "") + z; n.k34 = (v.k34 || "") + z; }
            return n;
        });
    };
    // Minuten einer Aktivität passend zur Dauer umrechnen
    window.lernMinuten = function (min, e) {
        const f = window.lernDauer() / (e ? window.lernBasis(e) : 40);
        return Math.max(1, Math.round(min * f));
    };
    // Auswahl-Feld (für die Stunden-Ansicht)
    window.lernDauerWahl = function (klasse) {
        const d = window.lernDauer(), liste = DAUERN.includes(d) ? DAUERN : DAUERN.concat(d).sort((a, b) => a - b);
        return `<label class="${klasse || ""}" style="display:inline-flex;align-items:center;gap:8px;font-weight:800">⏱ Meine Zeit heute: <select data-lerndauer style="width:auto">${liste.map(m => `<option value="${m}" ${m === d ? "selected" : ""}>${m} Minuten</option>`).join("")}</select></label>`;
    };
})();
