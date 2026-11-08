/* ============================================================
   Leuchtturm – Lernangebot: Vorlagen Teil 3 (Lernen lernen, Gemischt)
   ============================================================ */
window.SOZIAL_VORLAGEN.push(

/* ============================== LERNEN LERNEN ============================== */
SOZIAL_EINHEIT({
    id: "l-konzentration",
    titel: "Konzentrations-Training",
    kategorie: "Lernen lernen",
    ziel12: "Genau hinschauen und hinhören – eine Aufgabe bis zum Ende schaffen",
    ziel34: "Konzentration trainieren und merken, was beim Konzentrieren hilft",
    material: "Timer an der Tafel",
    ohneVorbereitung: true,
    warmup12: "Ohren-Spitzen: Augen zu, 30 Sekunden still – wer hat welche Geräusche gehört?",
    warmup34: "Zahlen rückwärts: von 30 in Dreierschritten (30, 27, 24 …) – reihum",
    tafel: [
        { werkzeug: "timer", titel: "Konzentrations-Timer 3 Minuten", fuer: "", einstellung: { minuten: 3 } },
        { werkzeug: "blitzlesen", titel: "Merk-Blitz: Wörter", fuer: "", einstellung: { art: "woerter12" } }
    ],
    lerntext12: { titel: "Die Katze und die Maus", text:
`Kater Karlo will eine Maus fangen. Er setzt sich vor das Mauseloch und wartet.

Da fliegt ein Schmetterling vorbei. Karlo schaut hin – und die Maus huscht weg. Mist!

Am nächsten Tag versucht Karlo es wieder. Ein Vogel singt. Karlo hört nicht hin. Ein Blatt fällt. Karlo schaut nicht hin. Er schaut nur auf das Loch.

Und dann – die Maus kommt heraus! Karlo hat sie genau im Blick. Die Maus erschrickt und flitzt zurück. „Na gut“, sagt Karlo, „aber ich habe sie gesehen. Ich war konzentriert!“

**Nach dem Vorlesen:**
1. Warum hat es beim ersten Mal nicht geklappt?
2. Was hat Karlo am zweiten Tag anders gemacht?
3. Was lenkt dich beim Lernen ab?` },
    lerntext34: { titel: "Der Elfmeter", text:
`Letzte Minute, Elfmeter. Aylin legt den Ball auf den Punkt. Die Fans schreien, der Torwart hüpft hin und her.

Aylin atmet tief ein. Sie hört die Fans nicht mehr. Sie sieht nur noch den Ball und die linke Ecke. Ein, zwei Schritte – Tor!

Nach dem Spiel fragt eine Reporterin: „Wie bleibst du so ruhig?“ Aylin zuckt mit den Schultern: „Ich mache mir einen Tunnel im Kopf. Nur ich und das Ziel. Alles andere ist egal.“

Beim Mathe-Test denkt Aylin manchmal an diesen Tunnel.

**Fragen zum Gespräch:**
1. Wie schafft Aylin es, sich zu konzentrieren?
2. Was ist dein „Tunnel“ beim Lernen?
3. Was hilft dir, wenn es laut ist?` },
    uebungen: [
        { titel: "Augen-Detektive", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Starte den „Merk-Blitz“ an der Tafel: Wörter oder Bilder erscheinen kurz nacheinander. Danach sagen oder schreiben die Kinder, was sie sich gemerkt haben. Kl. 1/2: 4 Bilder, Kl. 3/4: 6 Wörter in der richtigen Reihenfolge.",
          folie: "Schau **genau** hin – gleich ist alles weg! 👀\n\nWas hast du dir gemerkt?", emoji: "👀", warum: "Konzentration kann man trainieren wie einen Muskel." },
        { titel: "Stopp-Spiel", fuer: "alle", dauer: "5 Min",
          text: "Du sagst Wörter. Bei einem bestimmten Zielwort (z. B. bei jedem Tier, Kl. 3/4: bei jedem Verb) klopfen alle einmal auf den Tisch. Wer zu früh oder falsch klopft, macht trotzdem weiter. Das Tempo langsam steigern.",
          folie: "Hör genau zu: Bei jedem **Tier** klopfst du einmal auf den Tisch. ✊", folie34: "Hör genau zu: Bei jedem **Verb** klopfst du einmal auf den Tisch. ✊", emoji: "✊" },
        { titel: "Was hilft mir?", fuer: "34", dauer: "4 Min",
          text: "Sammelt gemeinsam an der Tafel: Was hilft beim Konzentrieren? (Handy weg, Tisch frei, kurze Pause, Wasser trinken, eine Aufgabe nach der anderen …) Jedes Kind sucht sich einen Tipp aus, den es diese Woche ausprobiert.",
          folie: "Was hilft **dir** beim Konzentrieren? 💡", emoji: "💡" }
    ],
    ab12: { titel: "Genau hinschauen", aufgaben: [
        { typ: "ankreuzen", text: "Finde alle Katzen. Kreuze an.", nebeneinander: true, optionen: ["[bild:katze]", "[bild:hund]", "[bild:katze]", "[bild:maus]", "[bild:katze]", "[bild:hase]", "[bild:fuchs]", "[bild:katze]"] },
        { typ: "luecken", text: "Kreise jede 3 ein. Wie viele sind es?", nur: "", nummern: false, saetze: ["3 8 1 3 5 3 9 2 3 6 3 4 7 3 1 3", "Es sind ___ Dreien."] },
        { typ: "malen", text: "Male genau dasselbe noch einmal daneben: ein Haus mit 2 Fenstern, einer Tür und einem Baum.", bild: "" }
    ]},
    ab34: { titel: "Konzentrations-Check", aufgaben: [
        { typ: "luecken", text: "Streiche jedes „b“ durch. Wie viele sind es? Achtung: d, p und q sind Fallen!", nummern: false, saetze: ["d  b  p  b  q  d  b  d  p  b  q  b  d  d  b  p  q  d  b  p", "Anzahl: ___"] },
        { typ: "luecken", text: "Rechne alle Aufgaben. Kreise dann jedes gerade Ergebnis ein.", nummern: false, saetze: ["7 + 5 = ___   9 + 4 = ___   6 · 3 = ___   15 − 6 = ___   8 · 4 = ___   27 + 9 = ___"] },
        { typ: "tabelle", text: "Mein Konzentrations-Plan.", spalten: ["Das lenkt mich ab", "Das mache ich dagegen"], zeilen: [["", ""], ["", ""]] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-arbeitsplatz",
    titel: "Startklar! Mein Arbeitsplatz",
    kategorie: "Lernen lernen",
    ziel12: "Den eigenen Platz ordnen und wissen, was man zum Arbeiten braucht",
    ziel34: "Arbeitsmaterial organisieren und eine Aufgabe planvoll beginnen",
    material: "Federmäppchen der Kinder",
    ohneVorbereitung: true,
    warmup12: "Ich packe meinen Schulranzen: reihum ein Ding mehr nennen",
    warmup34: "Ich packe meinen Schulranzen – mit allen vorherigen Dingen in richtiger Reihenfolge",
    tafel: [{ werkzeug: "timer", titel: "Aufräum-Timer 2 Minuten", fuer: "", einstellung: { minuten: 2 } }],
    lerntext12: { titel: "Das Chaos-Mäppchen", text:
`Finn will malen. Er öffnet sein Mäppchen – und alles fällt heraus! Der Bleistift ist abgebrochen, der Radiergummi ist weg, und der rote Stift … ist ein grüner.

„So kann ich nicht arbeiten“, sagt Finn traurig.

Seine Freundin Hanna zeigt ihm ihr Mäppchen: Jeder Stift hat seinen Platz. Der Bleistift ist spitz. Der Radiergummi liegt in seinem Fach.

Am Nachmittag räumt Finn sein Mäppchen auf. Am nächsten Morgen ist er als Erster fertig mit seinem Bild.

**Nach dem Vorlesen:**
1. Was war mit Finns Mäppchen los?
2. Was macht Hanna anders?
3. Was gehört in ein gutes Mäppchen?` },
    lerntext34: { titel: "Der Fehlstart", text:
`Die Klassenarbeit beginnt. Leon sucht seinen Füller. Dann das Lineal. Dann merkt er: Die Patrone ist leer. Bis er anfangen kann, sind schon sieben Minuten weg.

Seine Banknachbarin Sophie hat schon drei Aufgaben geschafft. Sie hat vorher alles bereitgelegt: Füller mit Ersatzpatrone, Lineal, Bleistift. Und sie liest zuerst alle Aufgaben kurz durch, bevor sie beginnt.

„Wie beim Sport“, sagt Sophie danach. „Ein guter Start ist schon die halbe Miete.“

**Fragen zum Gespräch:**
1. Warum hat Leon so viel Zeit verloren?
2. Was macht Sophie vor dem Start?
3. Was legst du vor einer wichtigen Aufgabe bereit?` },
    uebungen: [
        { titel: "Mäppchen-Check", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Du nennst Dinge, die ins Mäppchen gehören. Wer es hat und es funktioniert, hält es kurz hoch. Fehlt etwas, merkt sich das Kind es für zu Hause.\n- Bleistift (gespitzt)\n- Radiergummi\n- Spitzer\n- Buntstifte\n- Lineal\n- Kleber\n- Schere",
          quiz: "liste",
          folie: "Mäppchen-Check! ✏️\n\nHalte hoch, was ich sage – wenn es da ist und funktioniert.", emoji: "🎒", warum: "Wer alles dabei hat, kann sofort loslegen." },
        { titel: "Startklar in 3 Schritten", fuer: "alle", dauer: "6 Min",
          text: "Gemeinsam an der Tafel: 1. Tisch frei (nur was ich brauche). 2. Material bereit. 3. Aufgabe lesen – Was soll ich tun? Dann üben: Alle räumen den Tisch leer, du sagst eine Aufgabe (z. B. „Wir malen gleich mit Buntstiften“), und mit dem 2-Minuten-Timer legen alle genau das Richtige bereit.",
          folie: "1️⃣ Tisch frei\n2️⃣ Material bereit\n3️⃣ Aufgabe lesen: Was soll ich tun?", emoji: "🚀" }
    ],
    ab12: { titel: "Startklar!", aufgaben: [
        { typ: "ankreuzen", text: "Was brauchst du zum Malen? Kreuze an.", nebeneinander: true, optionen: ["[bild:wachsmal]", "[bild:fussball]", "[bild:pinsel]", "[bild:teddy]", "[bild:stift]", "[bild:pizza]"] },
        { typ: "daumen", text: "Ist das gut für einen Arbeitsplatz? Kreise ein.", art: "ampel", zeilen: ["[bild:stift] Der Stift ist spitz.", "[bild:teddy] Viele Spielsachen auf dem Tisch.", "[bild:heft] Das Heft liegt bereit."] },
        { typ: "malen", text: "Male deinen Tisch – startklar zum Arbeiten.", bild: "" }
    ]},
    ab34: { titel: "Mein Start-Plan", aufgaben: [
        { typ: "tabelle", text: "Mein Mäppchen-Check.", spalten: ["Material", "da und okay", "fehlt / kaputt"], zeilen: [["Füller / Patronen", "", ""], ["Bleistift + Spitzer", "", ""], ["Radiergummi", "", ""], ["Lineal / Geodreieck", "", ""], ["Buntstifte", "", ""], ["Kleber / Schere", "", ""]] },
        { typ: "luecken", text: "Bringe die Schritte in die richtige Reihenfolge (1–4).", nummern: false, saetze: ["___ Aufgabe genau lesen     ___ Tisch frei räumen", "___ Arbeit kontrollieren     ___ Material bereitlegen"] },
        { typ: "schreiben", text: "Was nehme ich mir vor, damit ich schneller starten kann?", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-merk-tricks",
    titel: "Merk-Tricks",
    kategorie: "Lernen lernen",
    ziel12: "Sich Dinge mit Bildern und Bewegungen merken",
    ziel34: "Merk-Strategien kennen und ausprobieren (Bildergeschichte, Eselsbrücke, Wiederholen)",
    material: "–",
    ohneVorbereitung: true,
    warmup12: "Kim-Spiel an der Tafel: Bilder anschauen – eins verschwindet – welches fehlt?",
    warmup34: "Kim-Spiel mit 8 Wörtern",
    tafel: [{ werkzeug: "kim", titel: "Kim-Spiel: Was fehlt?", fuer: "", einstellung: {} }],
    lerntext12: { titel: "Ole geht einkaufen", text:
`Ole soll für Mama einkaufen: Brot, Milch, Bananen und Käse. Einen Zettel hat er nicht.

„Wie soll ich mir das merken?“, jammert Ole. Mama lacht: „Mach dir eine lustige Geschichte daraus!“

Ole denkt: Ein **Brot** springt in einen Eimer voll **Milch**. Da kommt ein Affe und wirft **Bananen**. Und alle landen auf einem riesigen **Käse**!

Im Laden muss Ole nur an die Geschichte denken. Er bringt alles mit – und muss den ganzen Weg lachen.

**Nach dem Vorlesen:**
1. Was sollte Ole kaufen?
2. Wie hat er sich das gemerkt?
3. Erzählt die Geschichte noch einmal – ohne nachzuschauen!` },
    lerntext34: { titel: "Das Geheimnis der Gedächtnis-Meisterin", text:
`Im Fernsehen sieht Nele eine Frau, die sich 100 Zahlen in fünf Minuten merken kann. „Das ist doch unmöglich!“

Die Frau erklärt ihren Trick: „Ich mache aus allem Bilder. Die 2 ist für mich ein Schwan, die 8 ein Schneemann. Und dann laufe ich in Gedanken durch meine Wohnung und lege die Bilder an bestimmte Orte.“

Nele probiert es mit ihren Vokabeln: „Dog“ – ein Hund sitzt auf ihrem Bett. „Cat“ – eine Katze im Kühlschrank. Am nächsten Tag weiß sie alle noch.

**Fragen zum Gespräch:**
1. Welchen Trick benutzt die Gedächtnis-Meisterin?
2. Kennst du eine Eselsbrücke? (z. B. „Wer nämlich mit h schreibt, ist dämlich.“)
3. Wofür könntest du einen Merk-Trick gebrauchen?` },
    uebungen: [
        { titel: "Kim-Spiel", fuer: "alle", dauer: "7 Min", kern: ["12", "34"],
          text: "Starte das Kim-Spiel an der Tafel: Die Kinder sehen Bilder (Kl. 1/2: 5, Kl. 3/4: 8) für 20 Sekunden. Dann verschwindet eins. Wer weiß, was fehlt? Danach besprechen: Wie hast du es dir gemerkt?",
          folie: "Schau dir die Bilder **genau** an. 🧠\n\nGleich verschwindet eins – welches?", emoji: "🧠", warum: "Mit Tricks merkst du dir viel mehr." },
        { titel: "Geschichten-Trick", fuer: "alle", dauer: "6 Min",
          text: "Du nennst 5 (Kl. 3/4: 8) Wörter. Die Kinder erfinden mit dem Nachbarn eine verrückte Geschichte, in der alle Wörter vorkommen. Nach zwei Minuten: Wer kann die Wörter in der richtigen Reihenfolge aufzählen?\n- Hund, Rakete, Eis, Schuh, Sonne\n- Kl. 3/4 zusätzlich: Gitarre, Pizza, Bus",
          quiz: "keine",
          folie: "Erfindet eine **verrückte Geschichte** mit allen Wörtern! 🚀🐶🍦", emoji: "🚀" }
    ],
    ab12: { titel: "Merk-Tricks", aufgaben: [
        { typ: "zuordnen", text: "Merk-Paare: Was gehört zusammen? Verbinde.", links: ["[bild:hund]", "[bild:biene]", "[bild:kuh]", "[bild:stift]"], rechts: ["[bild:milch]", "[bild:heft]", "[bild:honig]", "[bild:haus]"] },
        { typ: "malen", text: "Male Oles Einkaufs-Geschichte: Brot, Milch, Bananen, Käse.", bild: "" }
    ]},
    ab34: { titel: "Merk-Tricks ausprobieren", aufgaben: [
        { typ: "schreiben", text: "Merke dir die Wörter mit einer Geschichte: Fahrrad – Krokodil – Regenschirm – Torte – Telefon – Berg. Schreibe deine Geschichte in Stichworten.", zeilen: 3 },
        { typ: "luecken", text: "Kennst du diese Eselsbrücken? Ergänze.", nummern: true, saetze: ["„Nie ohne Seife waschen“ – das sind die ___", "Eine eigene Eselsbrücke: ___"] },
        { typ: "tabelle", text: "Welcher Trick passt für dich?", spalten: ["Trick", "probiere ich aus (Kreuz)"], zeilen: [["Bilder im Kopf", ""], ["Geschichte erfinden", ""], ["laut wiederholen", ""], ["aufschreiben", ""], ["jemandem erklären", ""]] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-fehler-helfer",
    titel: "Fehler sind Helfer",
    kategorie: "Lernen lernen",
    ziel12: "Erfahren, dass Fehler zum Lernen gehören – und die eigene Arbeit kontrollieren",
    ziel34: "Fehler finden, verstehen und daraus lernen (Kontroll-Strategien)",
    material: "Rote und grüne Karten (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Blitzrechnen – mit absichtlichen Fehlern: Die Kinder rufen „Stopp!“, wenn die Lösung falsch ist",
    warmup34: "Fehler-Blitz: Du schreibst ein Wort falsch an die Tafel – wer findet den Fehler?",
    tafel: [{ werkzeug: "blitzrechnen", titel: "Blitzrechnen (Stimmt das?)", fuer: "", einstellung: { art: "plusminus", bis: 20, fehler: true } }],
    lerntext12: { titel: "Der kleine Turm", text:
`Mila baut einen Turm aus Bauklötzen. Sie stapelt und stapelt – und rumms! Der Turm fällt um.

Mila ist sauer. „Blöder Turm!“ Dann schaut sie genau hin. Unten hat sie einen kleinen Klotz genommen, oben einen großen. „Ah – so geht das nicht.“

Beim zweiten Mal nimmt sie unten die großen Klötze. Der Turm wird höher und höher – und bleibt stehen!

„Der Fehler hat mir gezeigt, wie es richtig geht“, sagt Mila.

**Nach dem Vorlesen:**
1. Warum ist der Turm umgefallen?
2. Was hat Mila beim zweiten Mal anders gemacht?
3. Wann hat dir ein Fehler schon einmal geholfen?` },
    lerntext34: { titel: "Das Level, das nie klappt", text:
`Jan hängt in seinem Lieblingsspiel seit Tagen im selben Level fest. Immer an derselben Stelle stürzt er ab.

Erst ist er wütend. Dann schaut er genau hin: Er springt immer zu früh. Er probiert es eine halbe Sekunde später – und schafft es!

Am Montag bekommt Jan seinen Diktat zurück. Viele rote Striche. „Ich kann das einfach nicht“, denkt er. Dann fällt ihm das Spiel ein. Er schaut genau hin: Fast alle Fehler sind bei Wörtern mit „ie“. „Das ist mein Level“, grinst Jan. „Das schaffe ich auch.“

**Fragen zum Gespräch:**
1. Wie hat Jan das Level geschafft?
2. Was hat er bei seinem Diktat entdeckt?
3. Was ist dein „Level“, das du noch knacken willst?` },
    uebungen: [
        { titel: "Fehler-Detektive", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du zeigst Aufgaben oder Wörter. Stimmt alles, heben die Kinder grün – ist ein Fehler drin, rot. Bei Rot: Wer findet den Fehler und erklärt ihn?\n- 3 + 4 = 7\n- 5 + 5 = 11\n- Hunt\n- Mama\n- 9 − 3 = 5\n- Sonne",
          text34: "Du zeigst Aufgaben oder Wörter. Stimmt alles, heben die Kinder grün – ist ein Fehler drin, rot. Bei Rot: Wer findet den Fehler und erklärt ihn?\n- 7 · 8 = 56\n- Fahrad\n- 300 − 125 = 185\n- Schmetterling\n- Ich spiele mit meinem freund.\n- 48 : 6 = 8",
          quiz: "ampel", loesungen12: ["1", "2", "2", "1", "2", "1"], loesungen34: ["1", "2", "2", "1", "2", "1"],
          folie: "Ist da ein **Fehler** versteckt?\n\n🟢 alles richtig · 🔴 Fehler gefunden", emoji: "🔎", warum: "Wer Fehler findet, lernt dazu." },
        { titel: "Mein Kontroll-Trick", fuer: "alle", dauer: "5 Min",
          text: "Besprecht gemeinsam: Wie kann ich meine Arbeit kontrollieren? Kl. 1/2: noch einmal mit dem Finger zeigen und nachzählen. Kl. 3/4: Umkehraufgabe rechnen (7 + 5 = 12 → 12 − 5 = 7), Wörter Silbe für Silbe mitsprechen, ein zweites Mal langsam lesen. Jedes Kind wählt einen Trick für das Arbeitsblatt.",
          folie: "Wie kontrollierst **du** deine Arbeit? ✅", emoji: "✅" }
    ],
    ab12: { titel: "Fehler sind Helfer", aufgaben: [
        { typ: "daumen", text: "Stimmt das? Kreise 👍 oder 👎 ein.", nur: "", zeilen: ["●● + ● = 3", "●●● + ●● = 4", "2 + 2 = 4", "5 + 1 = 7", "3 + 3 = 6"] },
        { typ: "luecken", text: "Finde den Fehler und schreibe das Wort richtig.", nur: "2", nummern: true, saetze: ["Hunt → ___", "mama → ___", "Sone → ___"] },
        { typ: "malen", text: "Male etwas, das du am Anfang nicht konntest und jetzt kannst.", bild: "" }
    ]},
    ab34: { titel: "Fehler-Detektive", aufgaben: [
        { typ: "tabelle", text: "Finde die Fehler und verbessere.", spalten: ["Aufgabe", "richtig oder falsch?", "Verbesserung"], zeilen: [["45 + 38 = 73", "", ""], ["6 · 7 = 42", "", ""], ["500 − 175 = 325", "", ""], ["9 · 8 = 74", "", ""]] },
        { typ: "luecken", text: "In diesem Text sind 5 Fehler. Unterstreiche sie und schreibe die Wörter richtig.", nummern: false, saetze: ["Am montag geht Lisa mit iren Freunden ins Schwimbad. Das Wasser ist kallt, aber alle haben spas.", "___"] },
        { typ: "schreiben", text: "Ein Fehler, aus dem ich gelernt habe:", zeilen: 2 }
    ]}
}),

/* ============================== GEMISCHT & SPIELERISCH ============================== */
SOZIAL_EINHEIT({
    id: "l-lern-quiz",
    titel: "Das große Lern-Quiz",
    kategorie: "Gemischt & spielerisch",
    ziel12: "Gelerntes aus Deutsch und Mathe spielerisch wiederholen",
    ziel34: "Wissen aus Deutsch, Mathe und Sachunterricht im Team-Quiz wiederholen",
    material: "Zahlenkarten 1–4 (Universal-Set)",
    ohneVorbereitung: true,
    warmup12: "Blitzrechnen bis 10",
    warmup34: "Blitzrechnen gemischt",
    tafel: [
        { werkzeug: "gluecksrad", titel: "Glücksrad: Welche Kategorie?", fuer: "", einstellung: { felder: ["Rechnen", "Lesen", "Reimen", "Formen", "Silben", "Joker"] } },
        { werkzeug: "blitzrechnen", titel: "Blitzrechnen bis 20", fuer: "12", einstellung: { art: "plusminus", bis: 20 } },
        { werkzeug: "blitzrechnen", titel: "Einmaleins", fuer: "34", einstellung: { art: "mal", reihen: [3, 4, 6, 7, 8, 9] } }
    ],
    lerntext12: { titel: "Die Quiz-Show", text:
`Heute ist Quiz-Show im Klassenzimmer! Der Moderator ist ein Papagei mit Fliege. Er heißt Professor Plapper.

„Willkommen, willkommen!“, krächzt er. „Wer schlau ist, gewinnt – und wer etwas nicht weiß, lernt etwas Neues. Dann gewinnen alle!“

Er dreht am Glücksrad. Es bleibt stehen bei: Rechnen! „Die erste Frage: Wie viel ist 3 und 3?“

Alle Kinder rufen gleichzeitig: „Sechs!“ Professor Plapper flattert vor Freude.

**Nach dem Vorlesen:**
1. Wer ist der Moderator?
2. Warum gewinnen bei Professor Plapper alle?
3. Welche Frage würdest du stellen?` },
    lerntext34: { titel: "Quiz-Nacht", text:
`Einmal im Monat gibt es im Jugendclub eine Quiz-Nacht. Teams treten gegeneinander an: Mathe, Wörter, Wissen.

Das Team „Die Füchse“ gewinnt fast immer. Ihr Geheimnis? „Wir reden leise miteinander, bevor wir antworten“, sagt Emre. „Jeder weiß etwas anderes. Zusammen wissen wir fast alles.“

Und wenn sie etwas nicht wissen? „Dann raten wir klug. Welche Antwort kann gar nicht stimmen? Die streichen wir zuerst.“

**Fragen zum Gespräch:**
1. Was ist das Geheimnis der Füchse?
2. Wie kann man „klug raten“?
3. Was ist an einem Team besser als allein?` },
    uebungen: [
        { titel: "Quiz-Runde", fuer: "alle", dauer: "14 Min", kern: ["12", "34"],
          text: "Jede Frage erscheint auf einer eigenen Folie. Alle überlegen leise und antworten auf dein Zeichen gleichzeitig (Finger, Flüstern zum Nachbarn oder Schmierzettel). Pro richtiger Antwort bekommt die ganze Gruppe einen Punkt – Ziel: mindestens 5 Punkte. Mit dem Glücksrad an der Tafel kannst du die Kategorie auslosen.\n- 4 + 5\n- Wie viele Silben hat „Banane“?\n- Was reimt sich auf Haus?\n- Wie viele Ecken hat ein Dreieck?\n- 10 − 6\n- Welcher Buchstabe kommt nach B?",
          text34: "In Tischgruppen (Teams): Jede Frage erscheint auf einer eigenen Folie. Die Teams besprechen sich leise und schreiben ihre Antwort auf einen Zettel. Auf dein Zeichen halten alle Teams ihren Zettel hoch – jede richtige Antwort = ein Punkt.\n- 7 · 8\n- Ist „lustig“ ein Nomen, ein Verb oder ein Adjektiv?\n- Wie viele Minuten hat eine Stunde?\n- Welches Satzzeichen gehört hinter eine Frage?\n- 1000 − 350\n- Wie viele Flächen hat ein Würfel?",
          quiz: "karten",
          frage: "Überlegt leise – auf mein Zeichen antworten alle!",
          folie: "🎉 **Quiz-Zeit!** 🎉\n\nÜberlegt leise – auf mein Zeichen sagt oder zeigt ihr die Antwort.", emoji: "🏆", warum: "Wiederholen macht schlau – und im Quiz macht es Spaß." }
    ],
    ab12: { titel: "Quiz-Rallye", aufgaben: [
        { typ: "tabelle", text: "Wie viele Silben? Kreuze an.", nur: "", spalten: ["Bild", "1", "2", "3"], zeilen: [["[bild:hund]", "", "", ""], ["[bild:tomate]", "", "", ""], ["[bild:apfel]", "", "", ""]] },
        { typ: "zuordnen", text: "Rechne und verbinde.", links: ["2 + 3", "6 − 2", "4 + 4"], rechts: ["8", "5", "4"] },
        { typ: "luecken", text: "Lies und schreibe.", nur: "2", nummern: true, saetze: ["Was reimt sich auf Maus? ___", "Welcher Buchstabe fehlt: A B ___ D", "Das Doppelte von 6: ___"] },
        { typ: "malen", text: "Male einen Pokal für dich.", bild: "pokal" }
    ]},
    ab34: { titel: "Quiz-Rallye", aufgaben: [
        { typ: "luecken", text: "Mathe.", nummern: true, saetze: ["8 · 7 = ___     450 + 380 = ___     1000 − 465 = ___", "Die Hälfte von 360: ___     2 Std. = ___ Min."] },
        { typ: "luecken", text: "Deutsch.", nummern: true, saetze: ["Ein Nomen, ein Verb, ein Adjektiv: ___", "Ordne nach dem ABC: Birne, Apfel, Banane → ___", "Setze das Satzzeichen: Wann kommst du ___"] },
        { typ: "schreiben", text: "Erfinde eine Quiz-Frage mit Lösung für die nächste Stunde.", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-lerntheke",
    titel: "Mini-Lerntheke",
    kategorie: "Gemischt & spielerisch",
    ziel12: "An drei kleinen Stationen selbstständig üben (Rechnen, Silben, Malen)",
    ziel34: "Selbstständig an Stationen arbeiten und die eigene Arbeit mit Lösungen kontrollieren",
    material: "Arbeitsblätter als Stationen (das Arbeitsblatt dieser Stunde zerschneiden oder je Aufgabe ein Stapel)\nTimer an der Tafel",
    warmup12: "Ablauf an der Tafel zeigen: Station 1 – 2 – 3, Klingel = weiter",
    warmup34: "Ablauf an der Tafel zeigen, Regeln für Stationen klären",
    tafel: [
        { werkzeug: "timer", titel: "Stationen-Timer 6 Minuten", fuer: "", einstellung: { minuten: 6 } },
        { werkzeug: "wuerfel", titel: "Würfel", fuer: "", einstellung: { anzahl: 1 } }
    ],
    lerntext12: { titel: "Der Jahrmarkt", text:
`Auf dem Jahrmarkt gibt es drei Buden. An der ersten Bude wirft man Bälle und zählt die Punkte. An der zweiten Bude klatscht man Wörter in Silben. An der dritten Bude malt man ein Bild.

Wenn die Glocke läutet, gehen alle zur nächsten Bude. Ding-dong!

Am Ende hat jedes Kind alle drei Buden geschafft. „Das war der beste Jahrmarkt der Welt!“, rufen alle.

**Nach dem Vorlesen:**
1. Welche Buden gibt es?
2. Was passiert, wenn die Glocke läutet?
3. Welche Bude würdest du zuerst besuchen?` },
    lerntext34: { titel: "Das Trainingslager", text:
`Im Trainingslager des Fußballvereins gibt es keinen langen Vortrag. Es gibt Stationen: Passen, Dribbeln, Torschuss. Alle 6 Minuten pfeift der Trainer – dann wird gewechselt.

„An jeder Station liegt eine Karte mit der Übung und eine Lösungskarte“, erklärt die Trainerin. „Ihr kontrolliert euch selbst. Ich komme rum und helfe.“

Am Ende sagt Malik: „Ich habe heute mehr geschafft als in drei normalen Trainings.“

**Fragen zum Gespräch:**
1. Wie funktioniert das Training an Stationen?
2. Warum gibt es Lösungskarten?
3. Was ist wichtig, damit Stationsarbeit gut klappt?` },
    uebungen: [
        { titel: "Stationen-Regeln", fuer: "alle", dauer: "3 Min", kern: ["12", "34"],
          text: "Kurz klären: 1. Leise arbeiten. 2. Klingel/Timer = Stifte weg, zur nächsten Station (im Uhrzeigersinn). 3. Fertig? Dann die Zusatzaufgabe auf der Rückseite. 4. Hilfe? Hand heben oder Nachbarn fragen. Da die Kinder an ihren Plätzen sitzen, wandern die Blätter statt der Kinder: Jeder Tisch bekommt nacheinander die drei Stationen.",
          folie: "🤫 leise arbeiten\n🔔 Klingel = weiter\n⭐ fertig? Zusatzaufgabe\n🙋 Hilfe? Hand heben", emoji: "📋", warum: "Mit klaren Regeln klappt Stationsarbeit." },
        { titel: "Stationen (3 × 6 Min)", fuer: "alle", dauer: "18 Min", kern: ["12", "34"],
          text: "Die Arbeitsblatt-Aufgaben sind die drei Stationen. Starte den 6-Minuten-Timer. Nach dem Signal werden die Blätter (oder Stapel) eine Station weitergegeben. Du gehst herum und hilfst. Kl. 3/4 kontrollieren mit der Lösung auf deinem Pult.",
          folie: "**Station 1 → 2 → 3**\n\nNach dem Klingeln geht es weiter! 🔔", emoji: "🎪" }
    ],
    verlauf: [
        { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Ablauf der Stationen zeigen", k34: "Begrüßung, Ablauf der Stationen zeigen" },
        { zeit: "5–10",  phase: "Einstieg",     k12: "„Der Jahrmarkt“ vorlesen", k34: "„Das Trainingslager“ lesen, Regeln klären" },
        { zeit: "10–13", phase: "Übung",        k12: "Stationen-Regeln", k34: "Stationen-Regeln" },
        { zeit: "13–35", phase: "Arbeitsblatt", k12: "3 Stationen à 6 Min (AB Kl. 1/2)", k34: "3 Stationen à 6 Min (AB 3/4), Selbstkontrolle" },
        { zeit: "35–40", phase: "Abschluss",    k12: "Lern-Daumen: Welche Station war am schönsten?", k34: "Lern-Daumen, Stationen-Feedback" }
    ],
    ab12: { titel: "Mini-Lerntheke", aufgaben: [
        { typ: "tabelle", text: "Station 1 – Rechnen: Wie viele sind es zusammen?", nur: "", spalten: ["Aufgabe", "Ergebnis"], zeilen: [["●●● + ●●", ""], ["●●●● + ●●●", ""], ["3 + 4", ""], ["6 + 2", ""]] },
        { typ: "tabelle", text: "Station 2 – Silben: Wie viele Silben? Kreuze an.", nur: "", spalten: ["Bild", "1", "2", "3"], zeilen: [["[bild:maus]", "", "", ""], ["[bild:banane]", "", "", ""], ["[bild:katze]", "", "", ""]] },
        { typ: "malen", text: "Station 3 – Malen: Male 3 Bäume und 2 Vögel.", bild: "" }
    ]},
    ab34: { titel: "Mini-Lerntheke", aufgaben: [
        { typ: "luecken", text: "Station 1 – Rechnen.", nummern: false, saetze: ["67 + 28 = ___     92 − 45 = ___     8 · 6 = ___     72 : 9 = ___"] },
        { typ: "tabelle", text: "Station 2 – Wörter: Sortiere.", woerter: ["Schule", "rennen", "leise", "Hund", "lachen", "groß"], spalten: ["Nomen", "Verben", "Adjektive"], zeilen: [["", "", ""], ["", "", ""]] },
        { typ: "luecken", text: "Station 3 – Knobeln: Zahlenfolge fortsetzen und Regel finden.", nummern: false, saetze: ["5, 9, 13, 17, ___, ___   Regel: ___"] },
        { typ: "schreiben", text: "Zusatz: Welche Station war für dich am schwersten – und warum?", zeilen: 1 }
    ]}
})

);
