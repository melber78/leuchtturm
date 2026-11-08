/* ============================================================
   Leuchtturm – Lernangebot: Vorlagen Teil 4 (Lernen lernen, Reihe 2)
   Arbeitsaufträge verstehen, Hilfe holen, Zuhören, Pausen,
   Üben in Portionen, Dranbleiben, Ziele, Mein Lernweg.
   ============================================================ */
window.SOZIAL_VORLAGEN.push(

SOZIAL_EINHEIT({
    id: "l-auftraege-verstehen",
    titel: "Was soll ich tun? Aufträge verstehen",
    kategorie: "Lernen lernen",
    ziel12: "Arbeitsaufträge an Bildzeichen und Signalwörtern erkennen (kreuze an, verbinde, male, kreise ein)",
    ziel34: "Arbeitsaufträge genau lesen: Signalwörter finden und Aufträge Schritt für Schritt erledigen",
    material: "Plakat „Auftrags-Zeichen“ (unter Arbeitsmaterial)\nZahlenkarten 1–4 (Universal-Set)",
    materialIds: ["lern-plakat-auftraege"],
    ohneVorbereitung: true,
    warmup12: "Mach-mit-Auftrag: Du sagst „Steh auf, klatsch zweimal, setz dich.“ – alle machen es in der richtigen Reihenfolge",
    warmup34: "Merk-Aufträge an der Tafel: drei Aufträge kurz lesen, dann aus dem Kopf ausführen",
    tafel: [
        { werkzeug: "auftraege", titel: "Merk-Aufträge (2 Schritte)", fuer: "12", einstellung: { schritte: 2 } },
        { werkzeug: "auftraege", titel: "Merk-Aufträge (3–4 Schritte)", fuer: "34", einstellung: { schritte: 4 } }
    ],
    lerntext12: { titel: "Pia macht alles falsch", text:
`Pia bekommt ein Arbeitsblatt. Ganz oben ist ein kleines Bild: ein Stift, der etwas verbindet.

Pia guckt nicht hin. Sie malt einfach alle Bilder bunt an. Fertig!

„Oh“, sagt die Lehrerin, „schau mal auf das Zeichen. Was sollst du hier tun?“ Pia schaut genau hin: zwei Punkte mit einem Strich dazwischen. „Verbinden!“

Beim nächsten Blatt schaut Pia zuerst auf das Zeichen. Ein Kästchen mit einem Kreuz. „Ankreuzen“, sagt sie – und macht es gleich richtig.

**Nach dem Vorlesen:**
1. Was hat Pia beim ersten Blatt falsch gemacht?
2. Was macht sie beim zweiten Blatt anders?
3. Welche Zeichen kennst du schon von deinen Arbeitsblättern?` },
    lerntext34: { titel: "Null Punkte – trotz richtiger Antworten", text:
`Bei der Mathearbeit steht: „Rechne die Aufgaben und kreise alle Ergebnisse ein, die größer als 50 sind.“

Jonas rechnet alles richtig. Aber er kreist nichts ein. Bei der Rückgabe hat er für diese Aufgabe nur die Hälfte der Punkte.

„Ich hab doch alles richtig!“, schimpft er. Seine Lehrerin zeigt auf den Auftrag. „Du hast den zweiten Teil nicht gelesen.“

Seitdem macht Jonas einen Trick: Er unterstreicht jedes Tu-Wort im Auftrag – „rechne“, „kreise ein“ – und hakt es ab, wenn er es erledigt hat.

**Fragen zum Gespräch:**
1. Warum hat Jonas Punkte verloren?
2. Welchen Trick benutzt er jetzt?
3. Welche Tu-Wörter stehen oft in Aufträgen?` },
    uebungen: [
        { titel: "Was soll ich tun?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du liest einen Auftrag vor (Kl. 1/2 zeigst du dazu das Zeichen vom Plakat). Die Kinder zeigen mit der Zahlenkarte, was zu tun ist.\n- Kreuze das richtige Bild an.\n- Verbinde, was zusammengehört.\n- Male das Bild aus.\n- Kreise alle Äpfel ein.",
          text34: "Du zeigst einen Auftrag. Die Kinder zeigen mit der Zahlenkarte, wie viele Dinge sie tun müssen.\n- Lies den Text und unterstreiche alle Nomen.\n- Rechne.\n- Rechne und kreise alle geraden Ergebnisse ein. Schreibe dann die größte Zahl auf.\n- Male das Bild aus und schreibe einen Satz dazu.",
          antworten: ["1️⃣ ankreuzen", "2️⃣ verbinden", "3️⃣ malen", "4️⃣ einkreisen"], loesungen12: ["1", "2", "3", "4"],
          antworten34: ["1️⃣ eine Sache", "2️⃣ zwei Sachen", "3️⃣ drei Sachen", "4️⃣ vier Sachen"], loesungen34: ["2", "1", "3", "2"],
          folie: "Was sollst du tun? Zeig deine **Zahlenkarte**! 📋", emoji: "📋", warum: "Wer den Auftrag versteht, macht es gleich richtig." },
        { titel: "Merk-Aufträge", fuer: "alle", dauer: "5 Min",
          text: "Starte „Merk-Aufträge“ an der Tafel. Die Aufträge erscheinen kurz (Kl. 1/2: 2 Schritte, Kl. 3/4: 3–4 Schritte), dann verschwinden sie. Alle führen sie aus dem Kopf am Platz aus (z. B. „Leg deinen Stift auf das Heft. Heb die rechte Hand.“). Danach zur Kontrolle wieder einblenden.",
          folie: "Lies die Aufträge – gleich sind sie weg! 🧠\n\nDann machst du sie **aus dem Kopf**.", emoji: "🧠" },
        { titel: "Tu-Wörter-Jagd", fuer: "34", dauer: "4 Min",
          text: "An der Tafel stehen drei lange Arbeitsaufträge aus Schulbüchern. Die Kinder schreiben nur die Tu-Wörter auf (lies, unterstreiche, schreibe …) und nummerieren sie in der richtigen Reihenfolge.",
          folie: "Finde alle **Tu-Wörter** im Auftrag und nummeriere sie: 1. … 2. … 3. …", emoji: "🔍" }
    ],
    ab12: { titel: "Was soll ich tun?", aufgaben: [
        { typ: "ankreuzen", text: "Kreuze den Hund an.", optionen: ["[bild:katze]", "[bild:hund]", "[bild:maus]"], nebeneinander: true },
        { typ: "zuordnen", text: "Verbinde: Was gehört zusammen?", links: ["[bild:stift]", "[bild:schere]"], rechts: ["[bild:heft]", "[bild:paket]"] },
        { typ: "luecken", text: "Kreise alle Sonnen ein. Wie viele sind es? Schreibe die Zahl.", nur: "", nummern: false, saetze: ["☀️  🌙  ☀️  ⭐  ☀️  🌙  ☀️  ⭐", "Es sind ___ Sonnen."] },
        { typ: "luecken", text: "Lies genau: Schreibe deinen Namen und unterstreiche den ersten Buchstaben.", nur: "2", nummern: false, saetze: ["___"] },
        { typ: "malen", text: "Male einen Baum und daneben einen Ball.", bild: "" }
    ]},
    ab34: { titel: "Aufträge genau lesen", kontext: "Unterstreiche in jedem Auftrag zuerst die Tu-Wörter. Hake jedes ab, wenn du es erledigt hast.", aufgaben: [
        { typ: "luecken", text: "Rechne. Kreise dann alle Ergebnisse ein, die größer als 50 sind.", nummern: false, saetze: ["34 + 19 = ___     72 − 25 = ___     6 · 9 = ___     88 − 43 = ___"] },
        { typ: "luecken", text: "Lies den Satz. Unterstreiche alle Nomen und schreibe das längste Nomen auf.", nummern: false, saetze: ["Nach der Schule fahren Tim und seine Schwester mit dem Fahrrad zum Schwimmbad.", "Das längste Nomen: ___"] },
        { typ: "luecken", text: "Schreibe drei Tiere auf. Ordne sie nach dem ABC.", nummern: false, saetze: ["Tiere: ___", "Nach dem ABC: ___"] },
        { typ: "tabelle", text: "Welche Tu-Wörter kommen in Aufträgen oft vor? Schreibe auf, was du dann tun musst.", kreuz: [], spalten: ["Tu-Wort", "Das mache ich"], zeilen: [["unterstreiche", ""], ["begründe", ""], ["vergleiche", ""]] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-hilfe-holen",
    titel: "Ich weiß nicht weiter – was nun?",
    kategorie: "Lernen lernen",
    ziel12: "Wissen, was ich tun kann, wenn ich nicht weiterkomme (erst selbst, dann Nachbar, dann Lehrerin)",
    ziel34: "Strategien bei Problemen kennen und eine Frage so stellen, dass man gute Hilfe bekommt",
    material: "Plakat „Hilfe-Treppe“ (unter Arbeitsmaterial)\nRote und grüne Karten (Universal-Set)",
    materialIds: ["lern-plakat-hilfe"],
    ohneVorbereitung: true,
    warmup12: "Daumen-Runde: Wer hat heute schon jemandem geholfen? Wer hat Hilfe bekommen?",
    warmup34: "Blitzrechnen – bei einer schweren Aufgabe kurz stoppen: Was machst du jetzt, wenn du es nicht weißt?",
    tafel: [{ werkzeug: "blitzrechnen", titel: "Blitzrechnen (Einstieg)", fuer: "", einstellung: { art: "plusminus", bis: 20 } }],
    lerntext12: { titel: "Leo steckt fest", text:
`Leo sitzt vor seiner Aufgabe. Er weiß nicht weiter. Er wird ganz rot und legt den Kopf auf den Tisch.

Da flüstert seine Freundin Ayla: „Du kannst die Hilfe-Treppe hochgehen!“

Erste Stufe: Selbst noch mal schauen. Leo liest die Aufgabe noch einmal. Hmm. Zweite Stufe: Ein Hilfsmittel nehmen. Er schaut auf die Rechenkette. Schon besser! Dritte Stufe: Den Nachbarn fragen. „Ayla, wie geht das hier?“

Und wenn das auch nicht klappt? Dann die vierte Stufe: Hand heben – die Lehrerin kommt.

Leo lacht. „Die Treppe ist super. Ich muss nie mehr einfach nur feststecken!“

**Nach dem Vorlesen:**
1. Was hat Leo am Anfang gemacht, als er nicht weiterwusste?
2. Welche Stufen hat die Hilfe-Treppe?
3. Was machst du, wenn du nicht weiterweißt?` },
    lerntext34: { titel: "„Ich check gar nichts!“", text:
`Mia hebt die Hand. „Ich check gar nichts!“ Der Lehrer kommt, aber er weiß nicht, wo er anfangen soll. Alles noch einmal erklären? Das dauert.

Am nächsten Tag probiert Mia es anders. „Ich habe Aufgabe 3 bis zur Hälfte. Ich weiß nicht, ob ich hier plus oder mal rechnen muss.“

Der Lehrer nickt. „Lies noch mal den letzten Satz der Aufgabe. Wie viele Gruppen sind es?“ – „Ah, vier Gruppen mit je sechs … also mal!“

Nach einer Minute arbeitet Mia weiter. „Eine genaue Frage bringt eine schnelle Antwort“, sagt der Lehrer.

**Fragen zum Gespräch:**
1. Warum konnte der Lehrer beim ersten Mal schlecht helfen?
2. Was war an Mias zweiter Frage besser?
3. Was kannst du tun, bevor du die Lehrkraft fragst?` },
    uebungen: [
        { titel: "Gute Idee?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du nennst, was ein Kind macht, wenn es nicht weiterkommt. Gute Idee: grün. Keine gute Idee: rot. Bei Rot: Was wäre besser?\n- Die Aufgabe noch einmal lesen.\n- Den Kopf auf den Tisch legen und warten.\n- Den Nachbarn leise fragen.\n- Einfach irgendwas hinschreiben.\n- Die Hand heben.\n- Das Blatt zerknüllen.",
          text34: "Du nennst, was ein Kind macht, wenn es nicht weiterkommt. Gute Idee: grün. Keine gute Idee: rot. Bei Rot: Was wäre besser?\n- Ein ähnliches Beispiel im Heft suchen.\n- Laut „Ich kann das nicht!“ rufen.\n- Die Aufgabe überspringen und später wiederkommen.\n- Beim Nachbarn abschreiben.\n- Genau sagen, an welcher Stelle man feststeckt.\n- Eine Skizze oder ein Bild zur Aufgabe malen.",
          quiz: "ampel", loesungen12: ["1", "2", "1", "2", "1", "2"], loesungen34: ["1", "2", "1", "2", "1", "1"],
          folie: "Ist das eine gute Idee, wenn du nicht weiterweißt?\n\n🟢 gute Idee · 🔴 keine gute Idee", emoji: "🪜", warum: "Feststecken ist normal – wichtig ist, was du dann machst." },
        { titel: "Frage-Profis", fuer: "34", dauer: "5 Min",
          text: "Du nennst eine schlechte Frage, die Kinder machen daraus mit dem Nachbarn eine genaue Frage.\n- „Ich versteh das nicht.“ → „Ich weiß bei Aufgabe 2 nicht, was ‚Umfang‘ bedeutet.“\n- „Wie geht das?“\n- „Hä?“",
          quiz: "karten",
          frage: "Mach daraus eine genaue Frage!",
          folie: "Mach aus der Frage eine **genaue Frage**: Welche Aufgabe? Welche Stelle? Was genau ist unklar?", emoji: "🎯" },
        { titel: "Hilfe-Treppe üben", fuer: "12", dauer: "5 Min",
          text: "Zeig das Plakat „Hilfe-Treppe“. Ihr geht die Stufen gemeinsam durch und macht zu jeder Stufe eine Handbewegung: 1. Augen (noch mal schauen), 2. Faust (Hilfsmittel greifen), 3. Flüstern-Hand (Nachbarn fragen), 4. Hand hoch (Lehrerin holen).",
          folie: "🪜 Die **Hilfe-Treppe**\n\n1. Noch mal schauen\n2. Hilfsmittel nehmen\n3. Nachbarn fragen\n4. Hand heben", emoji: "🪜" }
    ],
    ab12: { titel: "Die Hilfe-Treppe", aufgaben: [
        { typ: "daumen", text: "Ist das eine gute Idee, wenn du nicht weiterweißt? Kreise ein.", nur: "", art: "ampel", zeilen: ["Ich lese die Aufgabe noch einmal.", "Ich weine und mache nichts.", "Ich frage leise meinen Nachbarn.", "Ich hebe die Hand.", "Ich zerknülle mein Blatt."] },
        { typ: "luecken", text: "Was machst du zuerst? Schreibe die Zahlen 1 bis 4 in die richtige Reihenfolge.", nur: "2", nummern: false, saetze: ["___ Hand heben     ___ noch mal schauen", "___ Nachbarn fragen     ___ Hilfsmittel nehmen"] },
        { typ: "malen", text: "Male dich, wie du die Hilfe-Treppe hochgehst.", bild: "" }
    ]},
    ab34: { titel: "Ich weiß nicht weiter – was nun?", aufgaben: [
        { typ: "tabelle", text: "Meine Hilfe-Treppe: Was mache ich auf jeder Stufe?", kreuz: [], spalten: ["Stufe", "Das mache ich"], zeilen: [["1. selbst", ""], ["2. Hilfsmittel", ""], ["3. Mitschüler", ""], ["4. Lehrkraft", ""]] },
        { typ: "luecken", text: "Mache aus der schlechten Frage eine genaue Frage.", nummern: true, saetze: ["„Ich versteh das nicht.“ → ___", "„Wie geht das?“ → ___"] },
        { typ: "ankreuzen", text: "Welche Hilfsmittel kannst du benutzen? Kreuze an.", nebeneinander: true, optionen: ["Wörterbuch", "Einmaleins-Tabelle", "Beispiel im Heft", "Lösung abschreiben", "Rechenstrich"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-zuhoeren",
    titel: "Zuhören wie ein Profi",
    kategorie: "Lernen lernen",
    ziel12: "Genau zuhören und zwei Aufträge nacheinander behalten",
    ziel34: "Aktiv zuhören: Wichtiges heraushören, nachfragen und mehrere Aufträge behalten",
    material: "–",
    ohneVorbereitung: true,
    warmup12: "Geräusche-Detektive: Augen zu, 30 Sekunden lauschen – was habt ihr gehört?",
    warmup34: "Stille Post mit einer Zahlenreihe (vom Platz aus flüstern)",
    tafel: [{ werkzeug: "auftraege", titel: "Merk-Aufträge", fuer: "", einstellung: { schritte: 3 } }],
    lerntext12: { titel: "Die Ohren der Eule", text:
`Eule Ella hat die besten Ohren im ganzen Wald. Sie hört sogar, wenn eine Maus im Laub raschelt.

„Wie machst du das?“, fragt der Hase, der immer alles vergisst.

„Ich mache drei Dinge“, sagt Ella. „Erstens: Ich bin still. Zweitens: Ich schaue den an, der spricht. Drittens: Ich sage es noch mal leise in meinem Kopf.“

Der Hase probiert es aus. Mama Hase sagt: „Hol bitte zwei Möhren und einen Apfel.“ Der Hase ist still, schaut Mama an und flüstert in seinem Kopf: Zwei Möhren, ein Apfel. Und er bringt genau das Richtige!

**Nach dem Vorlesen:**
1. Welche drei Dinge macht Eule Ella beim Zuhören?
2. Was sollte der Hase holen?
3. Probiert es aus: Was hat der Hase geholt?` },
    lerntext34: { titel: "Die Durchsage", text:
`Auf dem Bahnhof knackt der Lautsprecher: „Achtung am Gleis 4: Der Zug nach Leipzig fährt heute von Gleis 7. Abfahrt 14:52 Uhr, mit zehn Minuten Verspätung.“

Ole und seine Mutter unterhalten sich weiter. Dann stehen sie an Gleis 4 – und der Zug ist weg.

„Hast du die Durchsage gehört?“, fragt die Mutter. Ole zuckt mit den Schultern. „Irgendwas mit Gleis …“

Beim nächsten Mal macht Ole es anders: Sobald es „Achtung“ heißt, hört er auf zu reden und achtet auf drei Dinge: Wo? Wann? Was ist anders?

**Fragen zum Gespräch:**
1. Welche drei wichtigen Infos waren in der Durchsage?
2. Warum hat Ole den Zug verpasst?
3. Wann ist Zuhören in der Schule besonders wichtig?` },
    uebungen: [
        { titel: "Auftrags-Kette", fuer: "alle", dauer: "7 Min", kern: ["12", "34"],
          text: "Du sagst Aufträge nur einmal. Alle führen sie am Platz aus – erst wenn du „Los!“ sagst. Kl. 1/2: zwei Schritte, Kl. 3/4: drei bis vier Schritte.\n- Leg deinen Stift auf den Kopf und schließ die Augen.\n- Heb die linke Hand, dann klopf zweimal auf den Tisch.\n- Steh auf, dreh dich einmal und setz dich wieder.\n- Zeig drei Finger, dann zeig auf die Tür.",
          text34: "Du sagst Aufträge nur einmal. Alle führen sie am Platz aus – erst wenn du „Los!“ sagst.\n- Schreib die Zahl 7 auf deinen Zettel, kreise sie ein und schreib dein Lieblingstier daneben.\n- Steh auf, zeig auf das Fenster, klatsch dreimal und setz dich.\n- Schreib das Datum, unterstreiche den Monat und male einen Stern dahinter.\n- Heb die rechte Hand, nenn deinem Nachbarn eine gerade Zahl und tippe dann zweimal auf deinen Tisch.",
          quiz: "karten",
          frage: "Erst zuhören – auf „Los!“ machen alle.",
          folie: "👂 Ich sage die Aufträge **nur einmal**.\n\nWarte auf „Los!“ – dann machst du alles in der richtigen Reihenfolge.", emoji: "👂", warum: "Gut zuhören spart Nachfragen und Fehler." },
        { titel: "Zuhör-Quiz", fuer: "alle", dauer: "6 Min",
          text: "Du liest einen kurzen Text (zum Beispiel die Geschichte noch einmal) und stellst danach Fragen. Die Kinder zeigen mit der Zahlenkarte die richtige Antwort. Kl. 3/4: Fragen zu Details der Durchsage.\n- Welches Gleis ist richtig?\n- Um wie viel Uhr fährt der Zug?",
          antworten: ["1️⃣ Gleis 4 / 14:42", "2️⃣ Gleis 7 / 14:52", "3️⃣ Gleis 10 / 15:02"], loesungen: ["2", "2"],
          folie: "Was hast du gehört? Zeig deine **Zahlenkarte**!", emoji: "🎧" },
        { titel: "Durchsagen fürs Arbeitsblatt", fuer: "34", dauer: "3 Min", quiz: "keine",
          text: "Lies diese beiden Durchsagen langsam und nur einmal vor, während die Kinder auf dem Arbeitsblatt mitschreiben.\n\n**Durchsage 1:** „Achtung, eine Durchsage für alle Klassen: Das Fußballturnier findet heute nicht auf dem Sportplatz statt, sondern in der großen Turnhalle. Beginn ist um 13:30 Uhr – eine halbe Stunde später als geplant.“\n\n**Durchsage 2:** „Liebe Kinder, die Bücherei ist morgen geschlossen. Ihr könnt eure Bücher am Donnerstag in der zweiten großen Pause zurückgeben – im Lehrerzimmer statt in der Bücherei.“",
          folie: "🎧 Hör genau zu – ich lese die Durchsage **nur einmal**.\n\nSchreib mit: **Wo? Wann? Was ist anders?**", emoji: "📢" }
    ],
    ab12: { titel: "Zuhören wie ein Profi", aufgaben: [
        { typ: "malen", text: "Hör genau zu und male (ich lese vor): Male eine Sonne oben rechts. Male unten ein Haus mit einer roten Tür. Neben das Haus kommt ein Baum mit drei Äpfeln.", bild: "" },
        { typ: "ankreuzen", text: "Was macht ein guter Zuhörer? Kreuze an.", nur: "", optionen: ["[bild:brille] Ich schaue den an, der spricht.", "[bild:handy] Ich spiele nebenbei.", "[bild:eule] Ich bin still und höre zu."] }
    ]},
    ab34: { titel: "Zuhören wie ein Profi", kontext: "Deine Lehrerin liest zwei kurze Durchsagen vor – nur einmal! Schreib beim Zuhören Stichworte mit.", aufgaben: [
        { typ: "tabelle", text: "Durchsage 1: Schreibe die wichtigen Infos auf.", kreuz: [], spalten: ["Wo?", "Wann?", "Was ist anders?"], zeilen: [["", "", ""]] },
        { typ: "tabelle", text: "Durchsage 2: Schreibe die wichtigen Infos auf.", kreuz: [], spalten: ["Wo?", "Wann?", "Was ist anders?"], zeilen: [["", "", ""]] },
        { typ: "ankreuzen", text: "Was hilft dir beim Zuhören? Kreuze an.", nebeneinander: true, optionen: ["den Sprecher anschauen", "Stichworte mitschreiben", "nebenbei malen", "im Kopf wiederholen", "nachfragen"] },
        { typ: "schreiben", text: "Wann ist Zuhören für dich schwer? Was kannst du dann tun?", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-pausen",
    titel: "Pause fürs Gehirn",
    kategorie: "Lernen lernen",
    ziel12: "Merken, wann der Kopf müde ist, und kleine Bewegungspausen kennen",
    ziel34: "Verstehen, warum das Gehirn Pausen braucht, und eigene Pausen sinnvoll einsetzen",
    material: "Bewegungspause an der Tafel\nPlakat „Pausen-Ideen“ (unter Arbeitsmaterial)",
    materialIds: ["lern-plakat-pausen"],
    ohneVorbereitung: true,
    warmup12: "Bewegungspause an der Tafel (2 Übungen)",
    warmup34: "Überkreuz-Bewegung: rechter Ellbogen zum linken Knie, 10-mal – dann Blitzrechnen",
    tafel: [
        { werkzeug: "bewegung", titel: "Bewegungspause (1 Minute)", fuer: "", einstellung: { sekunden: 60 } },
        { werkzeug: "timer", titel: "Arbeits-Timer 5 Minuten", fuer: "", einstellung: { minuten: 5 } }
    ],
    lerntext12: { titel: "Der Kopf-Akku", text:
`Sami lernt schon lange. Erst geht alles super. Doch dann rutschen die Buchstaben, und die Zahlen tanzen.

„Mein Kopf ist wie ein Handy-Akku“, sagt Sami. „Der ist jetzt fast leer.“

Seine Mama lacht. „Dann musst du ihn aufladen! Aber nicht mit Fernsehen – mit Bewegung und frischer Luft.“

Sami hüpft fünfmal wie ein Frosch, streckt sich wie eine Giraffe und trinkt ein Glas Wasser. Dann setzt er sich wieder hin. Und siehe da – die Buchstaben stehen wieder still!

**Nach dem Vorlesen:**
1. Woran hat Sami gemerkt, dass sein Kopf müde ist?
2. Wie hat er seinen Kopf-Akku aufgeladen?
3. Was machst du, wenn du müde wirst?` },
    lerntext34: { titel: "Drei Stunden am Stück", text:
`Lukas will für den Test alles auf einmal lernen. Drei Stunden sitzt er am Schreibtisch, ohne Pause. Am Ende weiß er weniger als nach der ersten halben Stunde.

Seine große Schwester Nina macht es anders: 20 Minuten lernen, 5 Minuten Pause. In der Pause steht sie auf, macht das Fenster auf, trinkt etwas – und nimmt bewusst nicht das Handy.

„Das Gehirn ist wie ein Muskel“, erklärt Nina. „Nach einer Weile wird es müde. Eine kurze Pause und es ist wieder fit. Aber wer in der Pause zockt, gibt dem Kopf gleich wieder neue Arbeit.“

**Fragen zum Gespräch:**
1. Warum hat Lukas trotz drei Stunden wenig behalten?
2. Wie macht Nina ihre Pausen?
3. Warum ist das Handy keine gute Pause?` },
    uebungen: [
        { titel: "Bewegungspause", fuer: "alle", dauer: "4 Min", kern: ["12", "34"],
          text: "Starte die „Bewegungspause“ an der Tafel. Die Übungen gehen alle am Platz (Hampelmann im Sitzen, Überkreuz-Bewegung, Arme kreisen, Liegende Acht in die Luft malen …). Du liest nur vor – die Tafel zeigt, was zu tun ist.",
          folie: "🤸 **Bewegungspause!**\n\nSteh hinter deinem Stuhl und mach mit, was die Tafel zeigt.", emoji: "🤸", warum: "Bewegung lädt den Kopf-Akku wieder auf." },
        { titel: "Gute Pause?", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Ist das eine gute Pause für den Kopf? Grün oder Rot.\n- Aufstehen und strecken\n- Wasser trinken\n- Ein Video schauen\n- Ans Fenster gehen und rausschauen\n- Ein Computerspiel spielen\n- Fünfmal tief atmen",
          quiz: "ampel", loesungen: ["1", "1", "2", "1", "2", "1"],
          folie: "Ist das eine **gute Pause** für den Kopf?\n\n🟢 ja · 🔴 eher nicht", emoji: "🔋" }
    ],
    ab12: { titel: "Pause fürs Gehirn", aufgaben: [
        { typ: "ankreuzen", text: "Was lädt deinen Kopf-Akku auf? Kreuze an.", nebeneinander: true, optionen: ["[bild:tropfen] trinken", "[bild:fernseher] fernsehen", "[bild:fussball] bewegen", "[bild:sonne] frische Luft"] },
        { typ: "gefuehle", text: "Wie fühlst du dich, wenn du lange gearbeitet hast? Kreise ein.", nur: "", zeilen: ["nach dem Lernen", "nach der Pause"], gefuehle: ["müde", "froh", "ruhig"] },
        { typ: "malen", text: "Male deine Lieblings-Pause.", bild: "" }
    ]},
    ab34: { titel: "Pause fürs Gehirn", aufgaben: [
        { typ: "tabelle", text: "Sortiere: gute Pause für den Kopf oder nicht?", woerter: ["strecken", "Handy", "Wasser trinken", "Fenster auf", "Video", "tief atmen", "Zocken", "Obst essen"], spalten: ["gute Pause", "keine gute Pause"], zeilen: [["", ""], ["", ""], ["", ""], ["", ""]] },
        { typ: "luecken", text: "Mein Lernplan für zu Hause: Wie lange lerne ich, wie lange mache ich Pause?", nummern: false, saetze: ["Ich lerne ___ Minuten.", "Dann mache ich ___ Minuten Pause.", "In der Pause mache ich: ___"] },
        { typ: "schreiben", text: "Woran merkst du, dass dein Kopf eine Pause braucht?", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-ueben-portionen",
    titel: "Üben in kleinen Portionen",
    kategorie: "Lernen lernen",
    ziel12: "Erfahren, dass öfter kurz üben besser hilft als einmal lange",
    ziel34: "Mit Lernkärtchen und Wiederholen in Portionen üben – die Lernbox-Methode",
    material: "Kleine Zettel oder Karteikarten (pro Kind ca. 6)\nTimer an der Tafel",
    warmup12: "Blitzlesen: Wörter von letzter Woche – was sitzt schon?",
    warmup34: "Einmaleins-Blitz: welche Aufgaben sind „Problem-Aufgaben“?",
    tafel: [
        { werkzeug: "blitzlesen", titel: "Blitzlesen (Wiederholung)", fuer: "12", einstellung: { art: "woerter12" } },
        { werkzeug: "blitzrechnen", titel: "Einmaleins-Blitz", fuer: "34", einstellung: { art: "mal", reihen: [6, 7, 8, 9] } }
    ],
    lerntext12: { titel: "Die Gießkanne", text:
`Opa und Lotta haben eine kleine Blume gepflanzt. „Wie oft müssen wir sie gießen?“, fragt Lotta.

Lotta hat eine Idee: „Wir gießen sie einmal ganz doll – dann ist es erledigt!“ Sie kippt die ganze Kanne aus. Das Wasser läuft über den Rand, und die Erde schwimmt weg.

Opa lacht. „Pflanzen mögen lieber jeden Tag ein bisschen Wasser. Dann wachsen sie gut.“

„Wie beim Lesen-Üben!“, ruft Lotta. „Jeden Tag ein bisschen – dann wächst es im Kopf!“

**Nach dem Vorlesen:**
1. Was hat Lotta mit der Gießkanne gemacht?
2. Was mögen Pflanzen lieber?
3. Was übst du jeden Tag ein bisschen?` },
    lerntext34: { titel: "Das Trainingsgeheimnis", text:
`Emir will im Basketball besser werfen. Am Samstag übt er drei Stunden lang. Am Sonntag hat er Muskelkater – und trifft schlechter als vorher.

Sein Trainer erklärt: „Profis üben jeden Tag ein bisschen. Und sie üben vor allem das, was noch nicht klappt.“

Zu Hause probiert Emir es beim Einmaleins aus: Jede Aufgabe kommt auf ein Kärtchen. Was er kann, kommt in ein Fach „kann ich“. Was er nicht kann, bleibt vorne und kommt morgen wieder dran. Jeden Tag 10 Minuten.

Nach zwei Wochen ist der Stapel „kann ich noch nicht“ fast leer.

**Fragen zum Gespräch:**
1. Warum hat das lange Üben am Samstag nicht geholfen?
2. Wie funktioniert Emirs Kärtchen-Trick?
3. Was könntest du mit Kärtchen üben?` },
    uebungen: [
        { titel: "Kärtchen basteln", fuer: "alle", dauer: "7 Min", kern: ["12", "34"],
          text: "Jedes Kind bekommt 6 Zettel. Kl. 1/2: Auf jede Karte ein Wort oder eine Plusaufgabe, die noch schwer ist (Kl. 1 darf Buchstaben oder Zahlen malen). Kl. 3/4: vorn eine Aufgabe (z. B. 7 · 8 oder ein schwieriges Wort), hinten die Lösung.",
          folie: "✍️ Schreib auf jede Karte **eine** Aufgabe, die noch schwer für dich ist.\n\nKl. 3/4: Lösung auf die Rückseite!", emoji: "🗂️", warum: "Mit eigenen Kärtchen übst du genau das, was du noch lernen musst." },
        { titel: "Zwei-Stapel-Training", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Mit dem Nachbarn: Ein Kind fragt, das andere antwortet. Richtig → Karte auf den Stapel „kann ich“. Falsch → Karte auf den Stapel „übe ich noch“. Nach 3 Minuten (Timer) tauschen. Zum Schluss: Wie viele Karten sind auf „übe ich noch“? Diese kommen nächste Stunde wieder dran.",
          folie: "🗂️ Zwei Stapel:\n\n✅ **kann ich** · 🔁 **übe ich noch**\n\nNach dem Signal: tauschen!", emoji: "🔁" }
    ],
    ab12: { titel: "Jeden Tag ein bisschen", aufgaben: [
        { typ: "ankreuzen", text: "Was hilft beim Lernen besser? Kreuze an.", nur: "", optionen: ["[bild:sonne] jeden Tag ein bisschen", "[bild:sanduhr] einmal ganz lange"] },
        { typ: "tabelle", text: "Mein Übe-Plan: Male jeden Tag ein Häkchen, wenn du geübt hast.", nur: "", kreuz: [1, 2, 3, 4, 5], spalten: ["Woche", "Mo", "Di", "Mi", "Do", "Fr"], zeilen: [["Woche 1", "", "", "", "", ""], ["Woche 2", "", "", "", "", ""]] },
        { typ: "luecken", text: "Das übe ich diese Woche:", nur: "2", nummern: false, saetze: ["___"] },
        { typ: "malen", text: "Male eine Blume, die jeden Tag ein bisschen wächst.", bild: "blume" }
    ]},
    ab34: { titel: "Üben in Portionen", aufgaben: [
        { typ: "tabelle", text: "Meine Lernbox: Trage ein, was in welches Fach gehört.", kreuz: [], spalten: ["Fach 1: übe ich noch", "Fach 2: fast sicher", "Fach 3: kann ich"], zeilen: [["", "", ""], ["", "", ""], ["", "", ""]] },
        { typ: "tabelle", text: "Mein 2-Wochen-Plan: Wie viele Minuten habe ich geübt?", kreuz: [], spalten: ["Woche", "Mo", "Di", "Mi", "Do", "Fr"], zeilen: [["1", "", "", "", "", ""], ["2", "", "", "", "", ""]] },
        { typ: "schreiben", text: "Was willst du in den nächsten zwei Wochen mit Kärtchen üben?", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-dranbleiben",
    titel: "Dranbleiben, wenn es schwer wird",
    kategorie: "Lernen lernen",
    ziel12: "Mut-Sätze kennen und bei schweren Aufgaben nicht gleich aufgeben",
    ziel34: "Mit Frust umgehen: „noch nicht“ statt „nicht“ und Strategien zum Durchhalten",
    material: "Plakat „Mut-Sätze“ (unter Arbeitsmaterial)\nRote und grüne Karten (Universal-Set)",
    materialIds: ["lern-plakat-mut"],
    ohneVorbereitung: true,
    warmup12: "Wer kann etwas, das er früher nicht konnte? (Fahrrad fahren, Schuhe binden …) – 3 Kinder erzählen",
    warmup34: "Blitzrechnen mit steigender Schwierigkeit – wo wird es schwer?",
    tafel: [{ werkzeug: "blitzrechnen", titel: "Blitzrechnen – immer schwerer", fuer: "", einstellung: { art: "plusminus", bis: 100 } }],
    lerntext12: { titel: "Das Wort „noch“", text:
`Emma will Fahrrad fahren. Sie steigt auf – und kippt um. Noch einmal – und wieder um. „Ich kann das nicht!“, ruft sie und wirft den Helm ins Gras.

Papa setzt sich zu ihr. „Du hast ein Wort vergessen“, sagt er. „Du kannst es NOCH nicht.“

Emma schnieft. „Und was ist der Unterschied?“ – „Mit ‚noch‘ geht es weiter“, sagt Papa. „Jeder kann Fahrrad fahren lernen. Es dauert nur unterschiedlich lange.“

Emma setzt den Helm wieder auf. Am Ende der Woche fährt sie einmal um den ganzen Spielplatz.

**Nach dem Vorlesen:**
1. Was hat Emma gerufen, als sie umgefallen ist?
2. Welches Wort hat sie vergessen?
3. Was kannst du NOCH nicht – aber bald?` },
    lerntext34: { titel: "Level 37", text:
`Seit einer Woche hängt Can bei Level 37 fest. 50 Versuche. Jedes Mal Game Over. Er hat den Controller schon zweimal in die Ecke geworfen.

Dann macht er etwas anderes: Er schaut sich an, wo genau er scheitert. Er übt nur diese eine Stelle. Und als er wütend wird, macht er zehn Minuten Pause.

Versuch 58: geschafft.

Am nächsten Tag hängt Can bei einer schwierigen Textaufgabe. Er merkt, wie die Wut kommt. „Okay“, denkt er. „Wie bei Level 37: Wo genau hänge ich? Erst diese Stelle. Und wenn ich sauer werde: kurz Pause.“

**Fragen zum Gespräch:**
1. Was hat Can anders gemacht, um das Level zu schaffen?
2. Wie überträgt er das auf die Schule?
3. Was hilft dir, wenn du wütend auf eine Aufgabe wirst?` },
    uebungen: [
        { titel: "Mut-Satz oder Stopp-Satz?", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Du sagst Sätze. Hilft der Satz beim Dranbleiben? Grün. Macht er mutlos? Rot. Bei Rot: Wie wird ein Mut-Satz daraus?\n- Ich kann das noch nicht.\n- Ich bin zu dumm dafür.\n- Ich probiere es noch einmal.\n- Das schaffe ich nie.\n- Ich frage, wenn ich nicht weiterkomme.\n- Fehler helfen mir beim Lernen.",
          text34: "Du sagst Sätze. Hilft der Satz beim Dranbleiben? Grün. Macht er mutlos? Rot. Bei Rot: Wie wird ein Mut-Satz daraus?\n- Das ist schwer – also lerne ich gerade etwas.\n- Andere können das sowieso besser.\n- Ich teile die Aufgabe in kleine Schritte.\n- Ist doch eh egal.\n- Gestern konnte ich das auch noch nicht.\n- Ich gebe auf, bevor es peinlich wird.",
          quiz: "ampel", loesungen12: ["1", "2", "1", "2", "1", "1"], loesungen34: ["1", "2", "1", "2", "1", "2"],
          folie: "Macht der Satz **Mut** – oder macht er **mutlos**?\n\n🟢 Mut-Satz · 🔴 Stopp-Satz", emoji: "💪", warum: "Was wir zu uns selbst sagen, hilft beim Dranbleiben." },
        { titel: "Mein Frust-Plan", fuer: "34", dauer: "5 Min",
          text: "Sammelt an der Tafel: Was tue ich, wenn die Wut über eine Aufgabe kommt? (3-mal tief atmen, kurz aufstehen, Aufgabe überspringen und später wiederkommen, in kleine Schritte teilen, Mut-Satz sagen). Jedes Kind wählt zwei für seinen Frust-Plan (Arbeitsblatt).",
          folie: "😤 → 😌 Was hilft, wenn die **Wut** kommt?", emoji: "🧯" }
    ],
    ab12: { titel: "Ich kann das NOCH nicht", aufgaben: [
        { typ: "daumen", text: "Macht der Satz Mut? Kreise ein.", nur: "", zeilen: ["Ich probiere es noch einmal.", "Ich kann das nie.", "Ich kann das noch nicht.", "Ich frage um Hilfe."] },
        { typ: "luecken", text: "Ergänze den Mut-Satz.", nur: "2", nummern: false, saetze: ["Ich kann ___ noch nicht, aber bald!"] },
        { typ: "malen", text: "Male etwas, das du früher nicht konntest – und jetzt kannst.", bild: "pokal" }
    ]},
    ab34: { titel: "Dranbleiben", aufgaben: [
        { typ: "tabelle", text: "Mache aus dem Stopp-Satz einen Mut-Satz.", kreuz: [], spalten: ["Stopp-Satz", "Mut-Satz"], zeilen: [["Ich kann das nicht.", ""], ["Das ist zu schwer.", ""], ["Ich mache zu viele Fehler.", ""]] },
        { typ: "luecken", text: "Mein Frust-Plan: Wenn ich bei einer Aufgabe wütend werde, dann …", nummern: true, saetze: ["___", "___"] },
        { typ: "schreiben", text: "Was hast du schon geschafft, obwohl es am Anfang schwer war?", zeilen: 2 }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-ziele",
    titel: "Mein Ziel für diese Woche",
    kategorie: "Lernen lernen",
    ziel12: "Sich ein kleines Lernziel vornehmen und daran denken",
    ziel34: "Ein klares, kleines Lernziel formulieren (konkret, machbar, überprüfbar) und einen Plan machen",
    material: "Ziel-Karten (unter Arbeitsmaterial), eine pro Kind",
    materialIds: ["lern-zielkarten"],
    ohneVorbereitung: true,
    warmup12: "Ziel-Wurf: Jedes Kind wirft in Gedanken einen Ball in einen Korb – was ist dein Korb heute?",
    warmup34: "Was ist ein Ziel? Zwei, drei Beispiele aus dem Sport sammeln",
    tafel: [{ werkzeug: "timer", titel: "Timer 3 Minuten (Ziel aufschreiben)", fuer: "", einstellung: { minuten: 3 } }],
    lerntext12: { titel: "Die Treppe zum Baumhaus", text:
`Im Garten steht ein Baumhaus. Ganz oben. Ben möchte so gern hinauf, aber die Leiter ist so hoch!

„Ich schaffe das nie“, sagt Ben. Oma zeigt auf die erste Sprosse. „Musst du auch nicht. Heute nur bis zur dritten Sprosse.“

Das schafft Ben. Am nächsten Tag bis zur sechsten. Am Tag danach bis zur neunten.

Und am Freitag sitzt Ben oben im Baumhaus und winkt. „Oma! Ich hab’s geschafft – Stufe für Stufe!“

**Nach dem Vorlesen:**
1. Warum dachte Ben, dass er es nie schafft?
2. Wie hat Oma ihm geholfen?
3. Was ist dein kleines Ziel für diese Woche?` },
    lerntext34: { titel: "„Besser werden“ ist kein Ziel", text:
`Leonie schreibt in ihr Heft: „Mein Ziel: besser in Mathe werden.“ Nach zwei Wochen weiß sie nicht, ob sie es geschafft hat.

Ihr Lehrer zeigt ihr einen Trick: Ein gutes Ziel ist **klein**, **genau** und man kann **prüfen**, ob man es geschafft hat.

Leonie schreibt neu: „Bis Freitag kann ich die 7er-Reihe in unter einer Minute aufsagen. Dafür übe ich jeden Tag 5 Minuten mit Kärtchen.“

Am Freitag stoppt ihre Freundin die Zeit: 52 Sekunden. Ziel erreicht – und Leonie weiß es genau.

**Fragen zum Gespräch:**
1. Warum war „besser in Mathe werden“ kein gutes Ziel?
2. Was macht Leonies zweites Ziel besser?
3. Welches kleine Ziel könntest du dir bis Freitag setzen?` },
    uebungen: [
        { titel: "Gutes Ziel?", fuer: "alle", dauer: "7 Min", kern: ["12", "34"],
          text: "Ist das ein gutes, kleines Ziel für eine Woche? Grün oder Rot.\n- Ich lerne alle Buchstaben auf einmal.\n- Ich übe jeden Tag 5 Wörter.\n- Ich werde der Beste der Welt.\n- Ich lese jeden Abend eine Seite.\n- Ich kann bis Freitag bis 20 zählen.",
          text34: "Ist das ein gutes Ziel? Klein, genau, überprüfbar? Grün oder Rot.\n- Ich werde besser in Deutsch.\n- Bis Freitag kann ich die 8er-Reihe ohne Fehler.\n- Ich lerne mehr.\n- Ich lese jeden Tag 10 Minuten und trage es in eine Liste ein.\n- Ich schreibe nie mehr Fehler.",
          quiz: "ampel", loesungen12: ["2", "1", "2", "1", "1"], loesungen34: ["2", "1", "2", "1", "2"],
          folie: "Ist das ein **gutes Ziel**?\n\n🟢 ja · 🔴 zu groß oder zu ungenau", emoji: "🎯", warum: "Kleine Ziele schafft man – und das macht Mut für die nächsten." },
        { titel: "Meine Ziel-Karte", fuer: "alle", dauer: "6 Min", kern: ["12", "34"],
          text: "Jedes Kind füllt seine Ziel-Karte aus (Kl. 1 malt sein Ziel). Kl. 3/4: Ziel + wie oft ich übe + woran ich merke, dass ich es geschafft habe. Die Karten sammelst du ein – nächste Woche schauen alle nach: geschafft?",
          folie: "🎯 Mein Ziel bis nächste Woche:\n\n**Was** übe ich? **Wie oft**? **Woran** merke ich, dass ich es kann?", emoji: "🗒️" }
    ],
    ab12: { titel: "Mein Ziel", aufgaben: [
        { typ: "ankreuzen", text: "Welches Ziel ist klein genug für eine Woche? Kreuze an.", nur: "", optionen: ["[bild:buch] jeden Tag eine Seite lesen", "[bild:rakete] zum Mond fliegen", "[bild:stift] jeden Tag 3 Wörter schreiben"] },
        { typ: "malen", text: "Male dein Ziel für diese Woche.", bild: "stern" },
        { typ: "luecken", text: "Schreibe dein Ziel auf.", nur: "2", nummern: false, saetze: ["Bis Freitag kann ich ___"] }
    ]},
    ab34: { titel: "Mein Wochenziel", aufgaben: [
        { typ: "tabelle", text: "Mein Ziel-Plan.", kreuz: [], spalten: ["Frage", "Meine Antwort"], zeilen: [["Was will ich können?", ""], ["Bis wann?", ""], ["Wie oft übe ich?", ""], ["Woran merke ich, dass ich es geschafft habe?", ""]] },
        { typ: "tabelle", text: "Übe-Tagebuch: Häkchen, wenn du geübt hast.", kreuz: [1, 2, 3, 4, 5], spalten: ["", "Mo", "Di", "Mi", "Do", "Fr"], zeilen: [["geübt", "", "", "", "", ""]] },
        { typ: "luecken", text: "Nach einer Woche: Hast du dein Ziel erreicht?", nummern: false, saetze: ["☐ ja   ☐ fast   ☐ noch nicht – Mein nächster Schritt: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "l-lernweg",
    titel: "Mein Lernweg – das hilft mir",
    kategorie: "Lernen lernen",
    ziel12: "Erzählen, was mir beim Lernen hilft und was ich schon gut kann",
    ziel34: "Über das eigene Lernen nachdenken: Stärken, Lern-Tricks und nächste Schritte",
    material: "–",
    ohneVorbereitung: true,
    warmup12: "Daumen-Runde: Ich kann schon gut lesen / rechnen / malen / zuhören …",
    warmup34: "Blitz-Umfrage mit Zahlenkarten: Welcher Lern-Trick aus den letzten Stunden hilft dir am meisten?",
    tafel: [{ werkzeug: "gluecksrad", titel: "Glücksrad: Wer erzählt?", fuer: "", einstellung: {} }],
    lerntext12: { titel: "Das Lern-Schatzkästchen", text:
`Frau Sommer stellt eine kleine Kiste auf den Tisch. „Das ist ein Schatzkästchen“, sagt sie. „Aber darin liegt kein Gold. Darin liegen Lern-Schätze.“

Sie holt einen Zettel heraus. Darauf ist eine Lupe gemalt. „Genau hinschauen – das ist ein Lern-Schatz.“

Dann ein Ohr. „Gut zuhören.“ Dann eine Treppe. „Hilfe holen, Stufe für Stufe.“ Dann eine Blume. „Jeden Tag ein bisschen üben.“

„Jeder von euch hat schon Lern-Schätze“, sagt Frau Sommer. „Welcher ist dein liebster?“

**Nach dem Vorlesen:**
1. Was liegt in dem Schatzkästchen?
2. Welche Lern-Schätze hat Frau Sommer gezeigt?
3. Welcher Lern-Schatz hilft dir am meisten?` },
    lerntext34: { titel: "Der Brief an mich selbst", text:
`Am Ende des Halbjahres bekommt die Klasse einen besonderen Auftrag: einen Brief an sich selbst – zu öffnen am letzten Schultag.

Amir schreibt: „Lieber Amir, das kannst du schon gut: Kopfrechnen und Zuhören. Das hat dir geholfen: Kärtchen für das Einmaleins und Pausen alle 20 Minuten. Das willst du noch schaffen: weniger Fehler bei Wörtern mit ie. Dein Trick dafür: Silben mitsprechen. Du schaffst das!“

Er faltet den Brief, klebt ihn zu und grinst. „Bin gespannt, was ich dann sage.“

**Fragen zum Gespräch:**
1. Was schreibt Amir in seinen Brief?
2. Warum könnte so ein Brief helfen?
3. Was würdest du dir selbst schreiben?` },
    uebungen: [
        { titel: "Lern-Schätze sammeln", fuer: "alle", dauer: "8 Min", kern: ["12", "34"],
          text: "Ihr sammelt an der Tafel alle Lern-Tricks aus den letzten Stunden (genau hinschauen, Hilfe-Treppe, Pause, Kärtchen, Mut-Satz, Aufträge unterstreichen, Merk-Geschichte …). Dann stimmen alle ab: Jedes Kind kommt nicht nach vorn, sondern zeigt mit den Fingern, welcher Trick (Nummer an der Tafel) ihm am meisten hilft.",
          folie: "💎 Unsere **Lern-Schätze**\n\nWelcher Trick hilft **dir** am meisten? Zeig die Nummer!", emoji: "💎", warum: "Wer seine Tricks kennt, kann sie immer wieder benutzen." },
        { titel: "Ich kann schon …", fuer: "alle", dauer: "5 Min",
          text: "Reihum (Glücksrad an der Tafel) sagt jedes Kind einen Satz: „Ich kann schon …“ – und ein anderes Kind darf ergänzen: „Und ich finde, du kannst auch gut …“. Wer nichts sagen möchte, darf passen.",
          folie: "⭐ „Ich kann schon …“\n\nund: „Ich finde, du kannst gut …“", emoji: "⭐" }
    ],
    ab12: { titel: "Mein Lern-Schatzkästchen", aufgaben: [
        { typ: "ankreuzen", text: "Welche Lern-Schätze hast du schon? Kreuze an.", nebeneinander: true, optionen: ["[bild:lupe] genau schauen", "[bild:eule] gut zuhören", "[bild:leiter] Hilfe holen", "[bild:tulpe] jeden Tag üben"] },
        { typ: "gefuehle", text: "Wie geht es dir beim … ? Kreise ein.", nur: "", zeilen: ["Lesen", "Rechnen", "Schreiben", "Malen"], gefuehle: ["froh", "ruhig", "traurig"] },
        { typ: "malen", text: "Male, was du schon richtig gut kannst.", bild: "" }
    ]},
    ab34: { titel: "Brief an mich selbst", aufgaben: [
        { typ: "luecken", text: "Schreibe deinen Brief. Am letzten Schultag liest du ihn wieder.", nummern: false, saetze: ["Liebe/r ___,", "Das kann ich schon gut: ___", "Diese Lern-Tricks helfen mir: ___", "Das will ich noch schaffen: ___", "Mein Plan dafür: ___", "Du schaffst das! Dein/e ___"] }
    ]}
})

);
