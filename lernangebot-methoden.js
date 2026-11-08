/* ============================================================
   Leuchtturm – Lernangebot: Methodenpool + Stundenplaner
   Methoden nach Phase, Fach und Stufe filtern, per Klick in eine
   40-Minuten-Stunde legen, Zeiten anpassen, drucken oder als
   eigene Stunde in die Bibliothek speichern.
   Alle Methoden laufen vom Platz aus – du leitest an, musst
   nichts vormachen.
   Benötigt aus sozial-stunden.php: senden, DATEN, toast, gehe, md, esc.
   ============================================================ */
"use strict";
(function () {

const PHASEN = [
    { name: "Ankommen", min: 5, emoji: "👋" },
    { name: "Einstieg", min: 7, emoji: "💡" },
    { name: "Übung", min: 13, emoji: "🎯" },
    { name: "Arbeitsphase", min: 11, emoji: "✏️" },
    { name: "Abschluss", min: 4, emoji: "🏁" }
];
const FAECHER = ["Alle", "Deutsch", "Mathe", "Lernen lernen"];

// [id, titel, phase, fach, stufe, minuten, emoji, ohneVorbereitung, material, ablauf, tipp, tafel]
const M = [
/* ---------- Ankommen ---------- */
["kopfstart-rechnen", "Kopf-Start: Blitzrechnen", "Ankommen", "Mathe", "alle", 4, "⚡", true, "", "Starte „Blitzrechnen“ an der Tafel im passenden Zahlenraum. Alle rechnen still und zeigen die Lösung mit den Fingern (Kl. 1/2) oder auf dem Schmierzettel. Auf Tipp erscheint die Lösung. 6–8 Aufgaben reichen.", "Schnelle Kinder dürfen die nächste Aufgabe „ansagen“ – so bleiben alle dran.", { werkzeug: "blitzrechnen" }],
["kopfstart-lesen", "Kopf-Start: Blitzlesen", "Ankommen", "Deutsch", "alle", 4, "👀", true, "", "Starte „Blitzlesen“ an der Tafel. Silben, Wörter oder Sätze blitzen kurz auf. Alle lesen leise mit, auf dein Zeichen sagt die ganze Gruppe das Wort im Chor.", "Chorlesen nimmt die Angst vor dem Vorlesen.", { werkzeug: "blitzlesen" }],
["finger-blitz", "Finger-Blitz", "Ankommen", "Mathe", "12", 3, "✋", true, "", "Du zeigst eine Anzahl Finger. Die Kinder zeigen, wie viele bis 5 (bis 10) fehlen. Dann umgekehrt: Du sagst eine Zahl, alle zeigen sie so schnell wie möglich mit den Fingern – ohne einzeln zu zählen.", "", null],
["ich-sehe-was", "Ich sehe was …", "Ankommen", "Deutsch", "12", 4, "🔍", true, "", "„Ich sehe was, was du nicht siehst – und das fängt mit M an.“ Die Kinder raten vom Platz aus. Wer richtig rät, darf das nächste Rätsel stellen. Kl. 2: „… und das hat zwei Silben.“", "", null],
["zahl-des-tages", "Zahl des Tages", "Ankommen", "Mathe", "alle", 5, "📅", true, "", "Du schreibst eine Zahl an die Tafel (z. B. das Datum oder 24). Die Kinder sammeln alles, was ihnen dazu einfällt: Nachbarzahlen, Zerlegungen (20 + 4), Aufgaben mit diesem Ergebnis (6 · 4), gerade/ungerade, Würfelbild …", "Kl. 1/2: Zahlen bis 10, Kl. 3/4 auch dreistellig.", null],
["wort-des-tages", "Wort des Tages", "Ankommen", "Deutsch", "alle", 5, "📝", true, "", "Ein Wort steht an der Tafel. Die Kinder finden: Wie viele Silben? Erster Laut? Reimwörter? Kl. 3/4: Wortart, Mehrzahl, verwandte Wörter, ein Satz damit.", "", null],
["kim-start", "Kim-Spiel: Was fehlt?", "Ankommen", "Lernen lernen", "alle", 4, "🧠", true, "", "Starte das Kim-Spiel an der Tafel: Bilder anschauen, eins verschwindet – was fehlt? Danach kurz: Wie hast du es dir gemerkt?", "", { werkzeug: "kim" }],
["was-gelernt", "Was war letzte Woche?", "Ankommen", "Alle", "alle", 3, "🔙", true, "", "Kurze Rückschau: „Was haben wir letzte Stunde geübt?“ 2–3 Kinder erzählen, du schreibst ein Stichwort an die Tafel. Dann der Bogen zu heute: „Heute machen wir weiter mit …“", "Verbindet die Stunden – hilft besonders, wenn nicht immer alle da sind.", null],

["merk-auftraege", "Merk-Aufträge", "Ankommen", "Lernen lernen", "alle", 4, "📋", true, "", "Starte „Merk-Aufträge“ an der Tafel: 2–4 Aufträge erscheinen kurz und verschwinden. Alle führen sie aus dem Kopf am Platz aus. Danach einblenden: Hat es geklappt?", "Steigern: diese Woche 2 Schritte, nächste Woche 3.", { werkzeug: "auftraege" }],
["bewegungspause", "Bewegungspause", "Ankommen", "Lernen lernen", "alle", 2, "🤸", true, "", "Die Bewegungspause an der Tafel zeigt alle 15 Sekunden eine neue Übung am Platz (strecken, Überkreuz-Bewegung, liegende Acht …). Geht auch mitten in der Stunde, wenn die Konzentration nachlässt.", "Kurz vor der Arbeitsphase wirkt sie am besten.", { werkzeug: "bewegung" }],

/* ---------- Einstieg ---------- */
["geschichte", "Mini-Geschichte vorlesen", "Einstieg", "Alle", "alle", 6, "📖", true, "Eine kurze Geschichte zum Thema (z. B. aus einer fertigen Stunde)", "Du liest eine kurze Geschichte vor, in der das Thema vorkommt (der Silben-Roboter, das Haus der 10 …). Vorher einen Hör-Auftrag geben. Danach 2–3 Fragen: Was ist passiert? Was hat das mit uns zu tun?", "Die fertigen Stunden haben zu jedem Thema eine Geschichte – auch zum Ausleihen für eigene Stunden.", null],
["raetsel", "Rätsel an der Tafel", "Einstieg", "Alle", "alle", 5, "❓", true, "", "An der Tafel steht ein Rätsel zum Thema (z. B. „Ich bin eine Zahl zwischen 10 und 20. Ich bin gerade. Meine Ziffern zusammen ergeben 5.“). Die Kinder flüstern mit dem Nachbarn, dann löst ihr gemeinsam auf.", "", null],
["fehler-tafel", "Der Fehler an der Tafel", "Einstieg", "Alle", "alle", 5, "🕵️", true, "", "Du schreibst eine Aufgabe oder einen Satz mit einem versteckten Fehler an die Tafel (7 + 5 = 13, „der hund bellt“). Wer findet ihn? Wer kann erklären, warum es falsch ist? So kommt ihr direkt zum Thema.", "Kinder lieben es, Fehler bei der Lehrkraft zu finden.", null],
["bild-impuls", "Bild-Impuls", "Einstieg", "Alle", "alle", 5, "🖼️", true, "", "Ein Bild an der Tafel (z. B. ein Einkaufskorb, eine Uhr, ein Zahlenstrahl). Die Kinder sagen, was sie sehen und was sie wissen. Du sammelst Wörter und führst zum Thema: „Heute lernen wir …“", "", null],
["vorwissen-daumen", "Daumen-Check: Was weiß ich schon?", "Einstieg", "Alle", "alle", 3, "👍", true, "Rote und grüne Karten", "Du nennst 3–4 Aussagen zum Thema („Ich kann bis 20 zählen.“ „Ich weiß, was ein Nomen ist.“). Die Kinder zeigen Daumen hoch/zur Seite/runter oder die grüne/rote Karte. So siehst du, wo du anfangen musst.", "", null],
["handlung-material", "Mit den Händen begreifen", "Einstieg", "Mathe", "12", 7, "🧮", false, "Steckwürfel, Plättchen oder Steine", "Jedes Kind bekommt Material (10 Plättchen). Du stellst Aufträge: „Leg 7. Leg 3 dazu. Wie viele sind es?“ „Teile 8 gerecht auf zwei Haufen.“ Erst handeln, dann rechnen.", "", null],

/* ---------- Übung ---------- */
["ampel-quiz", "Ampel-Quiz (grün/rot)", "Übung", "Alle", "alle", 8, "🚦", true, "Rote und grüne Karten", "Du zeigst Aussagen oder Aufgaben mit Lösung. Stimmt es, heben alle grün, sonst rot. Alle sind gleichzeitig dran – du siehst sofort, wer es kann. Bei Rot: Wer weiß, wie es richtig heißt?", "Geht für alles: richtig gerechnet? reimt sich? groß oder klein? Unsinn?", null],
["zahlenkarten-quiz", "Zahlenkarten-Quiz (1–4)", "Übung", "Alle", "alle", 8, "🔢", true, "Zahlenkarten 1–4", "An der Tafel stehen zu jeder Frage 2–4 Antworten mit Nummern. Alle überlegen still und zeigen auf dein Zeichen gleichzeitig ihre Zahlenkarte.", "Tipp: Die Tafel-Übungen „Silben zählen“, „Formen-Blitz“, „Wortarten“, „der, die, das“ haben die Nummern schon eingebaut.", { werkzeug: "silben" }],
["blitzrechnen-runde", "Blitzrechen-Runde", "Übung", "Mathe", "alle", 8, "⚡", true, "Schmierzettel", "Blitzrechnen an der Tafel, aber diesmal 10 Aufgaben am Stück: Jedes Kind schreibt seine Lösungen auf einen Schmierzettel (1. … 2. …). Danach Lösungen gemeinsam vergleichen: Wie viele hast du richtig? Beim nächsten Mal versuchst du, einen mehr zu schaffen.", "Nicht vergleichen, wer die meisten hat – jeder gegen sich selbst.", { werkzeug: "blitzrechnen" }],
["stimmt-das-rechnen", "Stimmt das? Rechnen", "Übung", "Mathe", "alle", 6, "✅", true, "Rote und grüne Karten", "Starte „Blitzrechnen“ im Modus „Stimmt das?“. Die Aufgabe steht mit Lösung an der Tafel – manchmal richtig, manchmal falsch. Alle heben grün oder rot.", "", { werkzeug: "blitzrechnen", einstellung: { fehler: true } }],
["zwanzigerfeld-blitz", "Blitzblick Zwanzigerfeld", "Übung", "Mathe", "12", 6, "🔴", true, "", "Punkte im Zwanzigerfeld erscheinen kurz. Die Kinder zeigen mit den Fingern, wie viele es waren. Danach: Wie hast du es gesehen? (5 und 2!)", "", { werkzeug: "zwanzigerfeld" }],
["uhr-blitz", "Uhr-Blitz", "Übung", "Mathe", "alle", 6, "🕐", true, "", "Die Uhr an der Tafel zeigt eine Zeit. Die Kinder flüstern sie dem Nachbarn, dann rufst du ein Kind auf. Kl. 3/4: „Wie spät ist es in 20 Minuten?“", "", { werkzeug: "uhr" }],
["geld-blitz", "Geld-Blitz", "Übung", "Mathe", "alle", 6, "💶", true, "", "Münzen und Scheine erscheinen an der Tafel – wie viel Geld ist das? Kl. 3/4: Was bekommst du auf 20 € zurück?", "", { werkzeug: "geld" }],
["wuerfel-rechnen", "Würfel-Rechnen", "Übung", "Mathe", "alle", 6, "🎲", true, "", "Der digitale Würfel an der Tafel: Kl. 1/2 rechnen Plus (2 Würfel), Kl. 3/4 Mal. Wer die Lösung weiß, meldet sich. Variante: Jede Tischreihe sammelt Punkte.", "", { werkzeug: "wuerfel", einstellung: { anzahl: 2 } }],
["zahlen-ordnen", "Zahlen-Reihe", "Übung", "Mathe", "alle", 6, "🔢", false, "Zahlenkarten 0–20 (Lernangebot-Material)", "5 Kinder bekommen je eine Zahlenkarte und halten sie vom Platz aus hoch. Die anderen sagen, in welcher Reihenfolge sie stehen müssten (kleinste zuerst). Kl. 3/4: Du schreibst 5 dreistellige Zahlen an, die Kinder ordnen sie auf dem Zettel.", "", null],
["rechenkette", "Rechenkette", "Übung", "Mathe", "alle", 5, "🔗", true, "", "Du sagst eine Startzahl und eine Kette: „5 … plus 3 … minus 2 … das Doppelte … minus 4 …“. Alle rechnen im Kopf mit. Am Ende: Welche Zahl habt ihr? Langsam beginnen, dann schneller werden.", "", null],
["klatsch-silben", "Silben klatschen", "Übung", "Deutsch", "12", 6, "👏", true, "", "Bild an der Tafel zeigen („Silben zählen“), alle sprechen das Wort in Silben und klatschen mit. Mit der Zahlenkarte zeigen: Wie viele Silben?", "", { werkzeug: "silben" }],
["anlaut-raten", "Anlaut-Raten", "Übung", "Deutsch", "12", 6, "🔤", true, "", "Ein Bild erscheint an der Tafel. Mit welchem Laut fängt es an? Drei Buchstaben zur Wahl – die Kinder zeigen die Zahlenkarte.", "", { werkzeug: "anlaute" }],
["reim-ampel", "Reim-Ampel", "Übung", "Deutsch", "alle", 6, "🪄", true, "Rote und grüne Karten", "Zwei Bilder an der Tafel – reimen sie sich? Grün oder Rot. Danach: Wer findet ein drittes Reimwort?", "", { werkzeug: "reime" }],
["wortarten-sortieren", "Wortarten-Sortiermaschine", "Übung", "Deutsch", "34", 7, "🎮", true, "Zahlenkarten 1–4", "Ein Wort an der Tafel – Nomen (1), Verb (2) oder Adjektiv (3)? Alle zeigen die Zahlenkarte. Bei Unsicherheit die Test-Fragen: der/die/das …? ich …? ganz …?", "", { werkzeug: "wortarten" }],
["begleiter-quiz", "der, die oder das?", "Übung", "Deutsch", "12", 6, "🏷️", true, "Zahlenkarten 1–4", "Bild an der Tafel – welcher Begleiter passt? 1 = der, 2 = die, 3 = das.", "", { werkzeug: "begleiter" }],
["abc-blitz", "ABC-Blitz", "Übung", "Deutsch", "alle", 5, "🔠", true, "", "Ein Buchstabe an der Tafel – welcher kommt davor, welcher danach? Die Kinder flüstern es dem Nachbarn, dann löst ihr auf.", "", { werkzeug: "abc" }],
["lebende-saetze", "Lebende Sätze", "Übung", "Deutsch", "alle", 8, "🧱", false, "Wortkarten „Satz-Baumeister“ (Lernangebot-Material)", "3–5 Kinder halten je eine Wortkarte hoch – durcheinander. Die anderen sagen vom Platz aus, wer mit wem tauschen muss, bis der Satz stimmt. Kl. 3/4: danach umstellen.", "Wer nicht nach vorn möchte, ist „Bauleiter“ und gibt die Anweisungen.", null],
["diktat-partner", "Partner-Diktat (3 Sätze)", "Übung", "Deutsch", "34", 8, "🗣️", true, "Kurzer Text an der Tafel, abgedeckt", "Jedes Paar: Ein Kind diktiert dem anderen zwei Sätze von der Tafel (du deckst sie nur für den Diktierenden auf – oder du gibst einen Zettel). Dann wird getauscht. Am Ende kontrollieren beide mit dem Original.", "", null],
["stopp-spiel", "Stopp-Spiel (Konzentration)", "Übung", "Lernen lernen", "alle", 5, "✊", true, "", "Du sagst Wörter. Bei jedem Zielwort (ein Tier, eine gerade Zahl, ein Verb …) klopfen alle einmal auf den Tisch. Tempo langsam steigern.", "", null],
["hilfe-treppe", "Hilfe-Treppe üben", "Übung", "Lernen lernen", "alle", 5, "🪜", false, "Plakat „Hilfe-Treppe“ (Lernangebot-Material)", "Ihr geht die vier Stufen gemeinsam durch (selbst schauen – Hilfsmittel – Nachbar – Lehrerin). Dann nennst du Situationen („Du weißt bei Aufgabe 3 nicht weiter.“) und die Kinder zeigen mit den Fingern, welche Stufe jetzt dran ist.", "Danach in jeder Arbeitsphase ans Plakat erinnern: „Auf welcher Stufe bist du?“", null],
["auftrag-zeichen", "Was soll ich tun?", "Übung", "Lernen lernen", "alle", 6, "📋", false, "Plakat „Auftrags-Zeichen“, Zahlenkarten 1–4", "Du liest Arbeitsaufträge vor (Kl. 1/2 mit Zeichen vom Plakat). Die Kinder zeigen mit der Zahlenkarte: 1 ankreuzen, 2 verbinden, 3 malen, 4 einkreisen. Kl. 3/4: Wie viele Tu-Wörter stecken im Auftrag?", "", null],
["mut-oder-stopp", "Mut-Satz oder Stopp-Satz?", "Übung", "Lernen lernen", "alle", 6, "💪", true, "Rote und grüne Karten", "Du sagst Sätze wie „Ich kann das nicht“ oder „Ich probiere es noch einmal“. Grün = macht Mut, Rot = macht mutlos. Bei Rot formen die Kinder den Satz gemeinsam um.", "Das Wort „noch“ wirkt Wunder: „Ich kann das noch nicht.“", null],
["zwei-stapel", "Zwei-Stapel-Training", "Arbeitsphase", "Lernen lernen", "alle", 8, "🗂️", false, "Kärtchen der Kinder", "Paare fragen sich mit ihren Lernkärtchen ab: richtig → Stapel „kann ich“, falsch → Stapel „übe ich noch“. Nach 3 Minuten tauschen. Der Stapel „übe ich noch“ kommt nächste Stunde wieder dran.", "Die Kärtchen in einem Umschlag mit Namen aufbewahren.", { werkzeug: "timer", einstellung: { minuten: 3 } }],
["zuhoer-auftrag", "Nur einmal gesagt", "Übung", "Lernen lernen", "alle", 5, "👂", true, "", "Du sagst einen Mehrfach-Auftrag nur ein einziges Mal (Kl. 1/2: 2 Schritte, Kl. 3/4: 3–4 Schritte). Erst auf „Los!“ führen alle ihn aus. Wer möchte, wiederholt den Auftrag vorher laut für alle.", "", null],
["ziel-karte", "Wochenziel-Karte", "Abschluss", "Lernen lernen", "alle", 4, "🎯", false, "Ziel-Karten (Lernangebot-Material)", "Jedes Kind schreibt (Kl. 1 malt) ein kleines Ziel bis zur nächsten Stunde auf seine Karte. Du sammelst die Karten ein und gibst sie zu Beginn der nächsten Stunde zurück: geschafft?", "Kleine Ziele, die man schafft, machen Mut für größere.", null],
["blitzlicht-lernen", "Blitzlicht: Was hat mir geholfen?", "Abschluss", "Lernen lernen", "34", 4, "💡", true, "", "Reihum ein Satz: „Heute hat mir geholfen, dass …“ (ein Trick, eine Person, eine Pause). Wer nichts sagen möchte, sagt „Ich passe“.", "", null],
["merk-geschichte", "Merk-Geschichte", "Übung", "Lernen lernen", "alle", 6, "🚀", true, "", "Du nennst 5–8 Wörter. Die Kinder erfinden mit dem Nachbarn eine verrückte Geschichte mit allen Wörtern. Danach: Wer kann alle Wörter in der richtigen Reihenfolge nennen?", "", null],
["geschichten-erfinder", "Rechengeschichten erfinden", "Übung", "Mathe", "alle", 6, "💭", true, "", "Eine Aufgabe steht an der Tafel (4 + 3, 5 · 8). Paare erfinden eine Geschichte dazu. Zwei bis drei Paare erzählen – die anderen prüfen: Passt die Rechnung?", "", null],

/* ---------- Arbeitsphase ---------- */
["ab-differenziert", "Arbeitsblatt (Kl. 1 / Kl. 2 / Kl. 3/4)", "Arbeitsphase", "Alle", "alle", 11, "📄", false, "Arbeitsblätter aus dem Generator", "Jedes Kind arbeitet an seinem Blatt. Kl. 1: Aufgaben vorlesen, die Farbsymbole zeigen die Zeile. Wer fertig ist, kontrolliert mit dem Nachbarn oder macht die Zusatzaufgabe.", "Blätter dazu machst du im Reiter „Arbeitsblätter“ – passend zum Thema in 1 Minute.", null],
["lerntheke", "Mini-Lerntheke (3 Stationen)", "Arbeitsphase", "Alle", "alle", 18, "🎪", false, "3 Stapel Aufgaben, Timer", "Drei Aufgabenstapel wandern von Tisch zu Tisch (die Kinder bleiben sitzen). Alle 6 Minuten Signal – Blätter weitergeben. Du gehst herum und hilfst.", "Ideal, wenn die Gruppe sehr unterschiedlich ist.", { werkzeug: "timer", einstellung: { minuten: 6 } }],
["partner-kontrolle", "Arbeiten mit Partner-Kontrolle", "Arbeitsphase", "Alle", "alle", 10, "🤝", true, "Lösungsblatt auf dem Pult", "Jeder arbeitet allein. Fertig? Dann mit dem Nachbarn vergleichen. Wo ihr verschieden seid: gemeinsam nachrechnen/nachlesen. Erst dann am Pult mit dem Lösungsblatt kontrollieren.", "", null],
["eigene-aufgaben", "Ich erfinde Aufgaben", "Arbeitsphase", "Alle", "alle", 8, "✏️", true, "Leere Zettel", "Jedes Kind erfindet 3 eigene Aufgaben zum Thema (Rechnungen, Lückenwörter, Rätsel) und schreibt die Lösung auf die Rückseite. Dann tauschen und lösen.", "Super für schnelle Kinder – und zeigt dir, wer das Thema wirklich verstanden hat.", null],
["mal-diktat", "Mal-Diktat", "Arbeitsphase", "Deutsch", "alle", 8, "🎨", true, "Blatt, Buntstifte", "Du diktierst Mal-Aufträge („Male einen großen Baum in die Mitte. Links daneben ein Haus mit rotem Dach …“). Kl. 2 und 3/4 lesen die Aufträge selbst an der Tafel. Am Ende vergleichen: Wer hat alles genau umgesetzt?", "", null],
["leise-wald", "Leise-Wald", "Arbeitsphase", "Lernen lernen", "alle", 10, "🌳", true, "Laptop mit Mikrofon", "Starte den Leise-Wald an der Tafel und tippe auf „Start“. Solange es ruhig ist, kommen nach und nach Waldtiere hinter dem Hügel hervor. Wird es zu laut, versteckt sich ein Tier wieder. Ziel: Bis zum Ende der Arbeitsphase sind alle Tiere da.", "Mit dem Regler „streng – locker“ stellst du ein, wie laut es sein darf. Flüstern sollte noch gehen.", { werkzeug: "leise" }],
["stille-arbeit-timer", "Stille Arbeitszeit mit Timer", "Arbeitsphase", "Lernen lernen", "alle", 10, "⏱️", true, "", "Der Timer läuft groß an der Tafel. Regel: leise arbeiten, Hand heben für Hilfe. Nach Ablauf zeigt jedes Kind mit dem Daumen, wie weit es gekommen ist.", "Bei unruhigen Gruppen lieber 2 × 5 Minuten mit kurzer Bewegungspause.", { werkzeug: "timer", einstellung: { minuten: 10 } }],

/* ---------- Abschluss ---------- */
["lern-daumen", "Lern-Daumen", "Abschluss", "Alle", "alle", 3, "👍", true, "Plakat „Lern-Daumen“ (optional)", "Jedes Kind zeigt mit dem Daumen: Das kann ich jetzt sicher (hoch) – ein bisschen (Seite) – übe ich noch (runter). Du merkst dir die Daumen-runter-Kinder für die nächste Stunde.", "", null],
["heute-gelernt", "Heute habe ich gelernt …", "Abschluss", "Alle", "34", 4, "💬", true, "", "2–3 Kinder beenden den Satz: „Heute habe ich gelernt …“ oder „Ein Trick, den ich mir merke: …“. Wer mag, schreibt den Satz auf die Rückseite seines Blattes.", "", null],
["ein-wort", "Ein Wort, eine Aufgabe", "Abschluss", "Alle", "12", 3, "⭐", true, "", "Jedes Kind sagt oder zeigt eine Aufgabe oder ein Wort, das es heute geschafft hat. Die anderen klatschen einmal.", "", null],
["applauswelle", "Applauswelle", "Abschluss", "Alle", "alle", 2, "👏", true, "", "Du zeigst nacheinander auf jeden Platz, jedes Kind klatscht einmal – zum Schluss klatschen alle zusammen.", "Ein fester Schluss gibt Sicherheit.", null],
["exit-ticket", "Exit-Ticket", "Abschluss", "Alle", "alle", 4, "🎟️", true, "Kleine Zettel", "Jedes Kind löst zum Schluss eine einzige Aufgabe auf einem Zettel (z. B. 8 + 5 oder „Schreibe ein Nomen“) und gibt ihn beim Rausgehen ab. So siehst du, wer es kann.", "", null],
["gluecksrad-schluss", "Glücksrad: Wer erzählt?", "Abschluss", "Alle", "alle", 3, "🎡", true, "", "Das Glücksrad an der Tafel bestimmt 2–3 Plätze. Diese Kinder erzählen, was sie heute geübt haben.", "", { werkzeug: "gluecksrad" }]
].map(([id, titel, phase, fach, stufe, min, emoji, ohne, material, ablauf, tipp, tafel]) => ({ id, titel, phase, fach, stufe, min, emoji, ohne, material, ablauf, tipp, tafel }));

/* ---------------- Helfer ---------------- */
const esc = window.esc || (s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
const md = window.md || esc;
const toast = (t, f) => (typeof window.toast === "function" ? window.toast(t, f) : alert(t));
const STUFE = { alle: "Kl. 1–4", "12": "Kl. 1/2", "34": "Kl. 3/4" };
const SPEICHER = "lern-planer";
function laden(){ try { const p = JSON.parse(localStorage.getItem(SPEICHER) || "null"); if (p && Array.isArray(p.bausteine)) return p; } catch (e) {} return { titel: "", stufe: "12", ziel: "", thema: "", bausteine: [] }; }
let plan = laden();
function merken(){ try { localStorage.setItem(SPEICHER, JSON.stringify(plan)); } catch (e) {} }
const finde = id => M.find(m => m.id === id);
const summe = () => plan.bausteine.reduce((a, b) => a + (+b.min || 0), 0);
let filter = { q: "", phase: "", fach: "", stufe: "", ohne: false };

const CSS = `
.mp-raster{ display:grid; grid-template-columns:minmax(0,1fr) 380px; gap:20px; align-items:start; }
@media (max-width:1000px){ .mp-raster{ grid-template-columns:1fr; } }
.mp-filter{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:14px; }
.mp-filter input[type=search]{ flex:1 1 200px; width:auto; }
.mp-filter select{ flex:0 1 170px; width:auto; }
.mp-karten{ display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:12px; }
.mp-karte{ background:#fff; border-radius:16px; box-shadow:0 4px 18px rgba(22,50,74,.08); padding:14px 16px; display:flex; flex-direction:column; gap:7px; border:2px solid transparent; }
.mp-karte.drin{ border-color:#f6dfa6; background:#fffdf6; }
.mp-karte h4{ margin:0; font-size:16px; font-weight:900; display:flex; gap:8px; align-items:center; }
.mp-karte p{ margin:0; font-size:13.5px; color:#55636a; line-height:1.45; }
.mp-karte .mp-tipp{ background:#f3f8f3; border-radius:8px; padding:5px 9px; font-size:12.5px; }
.mp-karte .chips{ display:flex; gap:5px; flex-wrap:wrap; }
.mp-knoepfe{ display:flex; gap:6px; flex-wrap:wrap; margin-top:auto; }
.mp-planer{ position:sticky; top:12px; background:#fff; border-radius:20px; box-shadow:0 6px 24px rgba(22,50,74,.1); padding:18px; max-height:calc(100vh - 24px); overflow:auto; }
.mp-planer h2{ margin:0 0 10px; font-size:19px; font-weight:900; color:#16324a; }
.mp-phase{ border-top:2px solid #e3e9ee; padding:8px 0 4px; }
.mp-phase-kopf{ display:flex; justify-content:space-between; font-weight:900; font-size:14px; color:#7c8a85; text-transform:uppercase; letter-spacing:.03em; }
.mp-baustein{ display:flex; align-items:center; gap:6px; background:#f6f9fb; border-radius:10px; padding:6px 8px; margin:5px 0; font-weight:800; font-size:14px; }
.mp-baustein span.t{ flex:1; }
.mp-baustein input{ width:52px !important; padding:4px 6px !important; text-align:center; }
.mp-baustein button{ border:0; background:none; cursor:pointer; color:#7c8a85; font-size:14px; padding:2px 4px; }
.mp-leer{ font-size:13px; color:#a0aaa6; font-weight:700; padding:4px 0; }
.mp-summe{ border-radius:12px; padding:8px 12px; font-weight:900; margin:10px 0; display:flex; justify-content:space-between; }
.mp-summe.ok{ background:#e5f4e4; color:#1e6b3c; } .mp-summe.zu{ background:#fdecea; color:#c0392b; } .mp-summe.wenig{ background:#fff4dc; color:#8a5a12; }
.mp-balken{ display:flex; height:10px; border-radius:6px; overflow:hidden; background:#eef1f3; margin-bottom:10px; }
.mp-balken span{ display:block; height:100%; }
`;
function cssLaden(){ if (!document.getElementById("lernMethodenCss")) { const s = document.createElement("style"); s.id = "lernMethodenCss"; s.textContent = CSS; document.head.appendChild(s); } }
const PFARBE = { Ankommen: "#3d7ea6", Einstieg: "#c0399b", "Übung": "#f2a93b", Arbeitsphase: "#2e8b57", Abschluss: "#16324a" };

/* ---------------- Ansicht ---------------- */
let ziel = null;
function zeigen(el){
    ziel = el; cssLaden();
    el.innerHTML = `<div class="karte" style="margin-bottom:16px"><h2 style="margin:0 0 4px"><i class="fa-solid fa-shapes"></i> Methodenpool &amp; Stundenplaner</h2>
        <p style="margin:0;color:#7c8a85;font-weight:700">${M.length} Methoden für 40-Minuten-Stunden – alle vom Platz aus, du leitest nur an. Mit <b>+</b> legst du eine Methode in deine Stunde (rechts). Fertig? Drucken oder als eigene Stunde in die Bibliothek speichern – dort kannst du Arbeitsblätter ergänzen.</p></div>
        <div class="mp-raster"><div>
            <div class="mp-filter">
                <input type="search" id="mpSuche" placeholder="Methode suchen …" value="${esc(filter.q)}">
                <select id="mpPhase"><option value="">Alle Phasen</option>${PHASEN.map(p => `<option ${filter.phase === p.name ? "selected" : ""}>${p.name}</option>`).join("")}</select>
                <select id="mpFach"><option value="">Alle Fächer</option>${FAECHER.slice(1).map(f => `<option ${filter.fach === f ? "selected" : ""}>${f}</option>`).join("")}</select>
                <select id="mpStufe"><option value="">Kl. 1–4</option><option value="12" ${filter.stufe === "12" ? "selected" : ""}>Kl. 1/2</option><option value="34" ${filter.stufe === "34" ? "selected" : ""}>Kl. 3/4</option></select>
                <label class="ed-check" style="margin:0;background:white;border-radius:10px;padding:0 12px;width:auto"><input type="checkbox" id="mpOhne" ${filter.ohne ? "checked" : ""}> ohne Vorbereitung</label>
            </div>
            <div id="mpListe"></div></div>
            <aside class="mp-planer" id="mpPlaner"></aside></div>`;
    const an = (id, ev, f) => el.querySelector(id).addEventListener(ev, f);
    an("#mpSuche", "input", e => { filter.q = e.target.value; liste(); });
    an("#mpPhase", "change", e => { filter.phase = e.target.value; liste(); });
    an("#mpFach", "change", e => { filter.fach = e.target.value; liste(); });
    an("#mpStufe", "change", e => { filter.stufe = e.target.value; liste(); });
    an("#mpOhne", "change", e => { filter.ohne = e.target.checked; liste(); });
    liste(); planer();
}
function passend(m){
    const q = filter.q.toLowerCase();
    return (!filter.phase || m.phase === filter.phase) && (!filter.fach || m.fach === filter.fach || m.fach === "Alle") &&
        (!filter.stufe || m.stufe === "alle" || m.stufe === filter.stufe) && (!filter.ohne || m.ohne) &&
        (!q || [m.titel, m.ablauf, m.fach, m.phase].join(" ").toLowerCase().includes(q));
}
function liste(){
    const box = ziel.querySelector("#mpListe");
    const drin = new Set(plan.bausteine.map(b => b.id));
    let html = "";
    PHASEN.forEach(p => {
        const ms = M.filter(m => m.phase === p.name && passend(m));
        if (!ms.length) return;
        html += `<div class="kat-titel">${p.emoji} ${p.name}</div><div class="mp-karten">` + ms.map(m => {
            const t = m.tafel && window.lernTafel ? window.lernTafel.info(m.tafel.werkzeug) : null;
            return `<div class="mp-karte${drin.has(m.id) ? " drin" : ""}"><h4><span>${m.emoji}</span>${esc(m.titel)}</h4>
                <div class="chips"><span class="chip">${m.min} Min</span><span class="chip ${m.fach === "Mathe" ? "gold" : m.fach === "Deutsch" ? "lila" : "gruen"}">${esc(m.fach === "Alle" ? "jedes Fach" : m.fach)}</span><span class="chip">${STUFE[m.stufe]}</span>${m.ohne ? '<span class="chip gruen"><i class="fa-solid fa-bolt"></i> ohne Vorb.</span>' : ""}</div>
                <p>${esc(m.ablauf)}</p>${m.material ? `<p><b>Material:</b> ${esc(m.material)}</p>` : ""}${m.tipp ? `<p class="mp-tipp">💡 ${esc(m.tipp)}</p>` : ""}
                <div class="mp-knoepfe"><button class="btn klein gold" data-dazu="${m.id}"><i class="fa-solid fa-plus"></i> In meine Stunde</button>${t ? `<button class="btn klein" data-tafel="${m.id}">${t.emoji} Tafel</button>` : ""}</div></div>`;
        }).join("") + "</div>";
    });
    box.innerHTML = html || '<div class="leer">Keine Methode passt zum Filter.</div>';
    box.querySelectorAll("[data-dazu]").forEach(b => b.addEventListener("click", () => dazu(b.dataset.dazu)));
    box.querySelectorAll("[data-tafel]").forEach(b => b.addEventListener("click", () => { const m = finde(b.dataset.tafel); window.lernTafel.starten(m.tafel.werkzeug, m.tafel.einstellung || {}); }));
}
function dazu(id){
    const m = finde(id); if (!m) return;
    plan.bausteine.push({ id, min: m.min });
    plan.bausteine.sort((a, b) => PHASEN.findIndex(p => p.name === finde(a.id).phase) - PHASEN.findIndex(p => p.name === finde(b.id).phase));
    merken(); planer(); liste();
    toast("„" + m.titel + "“ ist in deiner Stunde");
}
function planer(){
    const box = ziel.querySelector("#mpPlaner"), s = summe();
    const kats = (window.SOZIAL_KATEGORIEN || []).filter(k => k !== "Sonstiges");
    box.innerHTML = `<h2><i class="fa-solid fa-clipboard-list"></i> Meine Stunde</h2>
        <label class="feld" style="margin-top:0">Titel</label><input type="text" id="mpTitel" value="${esc(plan.titel)}" placeholder="z. B. Plus bis 20">
        <div class="ed-paar"><div><label class="feld">Für</label><select id="mpPStufe"><option value="12" ${plan.stufe === "12" ? "selected" : ""}>Kl. 1/2</option><option value="34" ${plan.stufe === "34" ? "selected" : ""}>Kl. 3/4</option><option value="alle" ${plan.stufe === "alle" ? "selected" : ""}>beide</option></select></div>
            <div><label class="feld">Thema</label><select id="mpThema">${kats.map(k => `<option ${plan.thema === k ? "selected" : ""}>${esc(k)}</option>`).join("")}</select></div></div>
        <label class="feld">Ziel (in Kinder-Sprache)</label><input type="text" id="mpZiel" value="${esc(plan.ziel)}" placeholder="z. B. Plusaufgaben bis 20 sicher rechnen">
        <div class="mp-summe ${s === 40 ? "ok" : s > 40 ? "zu" : "wenig"}" style="margin-top:14px"><span>${s} von 40 Minuten</span><span>${s === 40 ? "✓ passt" : s > 40 ? (s - 40) + " Min zu viel" : (40 - s) + " Min frei"}</span></div>
        <div class="mp-balken">${plan.bausteine.map(b => `<span style="width:${Math.min(100, b.min / Math.max(40, s) * 100)}%;background:${PFARBE[finde(b.id).phase]}"></span>`).join("")}</div>
        ${PHASEN.map(p => { const bs = plan.bausteine.map((b, i) => ({ ...b, i })).filter(b => finde(b.id).phase === p.name);
            return `<div class="mp-phase"><div class="mp-phase-kopf"><span>${p.emoji} ${p.name}</span><span>${bs.reduce((a, b) => a + (+b.min || 0), 0) || "–"} Min</span></div>
            ${bs.length ? bs.map(b => `<div class="mp-baustein"><span class="t">${finde(b.id).emoji} ${esc(finde(b.id).titel)}</span><input type="number" min="1" max="40" value="${b.min}" data-min="${b.i}" title="Minuten"><button data-weg="${b.i}" title="Entfernen"><i class="fa-solid fa-xmark"></i></button></div>`).join("")
                : `<div class="mp-leer">noch leer – z. B. ${esc((M.find(m => m.phase === p.name && (plan.stufe === "alle" || m.stufe === "alle" || m.stufe === plan.stufe)) || {}).titel || "")}</div>`}</div>`; }).join("")}
        <div class="knopfleiste" style="margin-top:12px">
            <button class="btn blau klein" id="mpZufall"><i class="fa-solid fa-dice"></i> Vorschlag</button>
            <button class="btn klein" id="mpDruck" ${plan.bausteine.length ? "" : "disabled"}><i class="fa-solid fa-print"></i> Drucken</button>
            <button class="btn gold klein" id="mpSpeichern" ${plan.bausteine.length ? "" : "disabled"}><i class="fa-solid fa-floppy-disk"></i> Als Stunde speichern</button>
            <button class="btn rot klein" id="mpLeeren" ${plan.bausteine.length ? "" : "disabled"}><i class="fa-solid fa-trash"></i></button></div>
        <p class="ed-hilfe">„Vorschlag“ füllt leere Phasen passend zu Stufe und Thema. Der Entwurf wird in diesem Browser gemerkt.</p>`;
    const feld = (id, k) => box.querySelector(id).addEventListener("input", e => { plan[k] = e.target.value; merken(); });
    feld("#mpTitel", "titel"); feld("#mpZiel", "ziel");
    box.querySelector("#mpPStufe").addEventListener("change", e => { plan.stufe = e.target.value; merken(); planer(); });
    box.querySelector("#mpThema").addEventListener("change", e => { plan.thema = e.target.value; merken(); });
    if (!plan.thema && kats.length) plan.thema = kats[0];
    box.querySelectorAll("[data-min]").forEach(i => i.addEventListener("change", () => { plan.bausteine[+i.dataset.min].min = Math.max(1, Math.min(40, +i.value || 1)); merken(); planer(); }));
    box.querySelectorAll("[data-weg]").forEach(b => b.addEventListener("click", () => { plan.bausteine.splice(+b.dataset.weg, 1); merken(); planer(); liste(); }));
    box.querySelector("#mpZufall").addEventListener("click", vorschlag);
    box.querySelector("#mpDruck").addEventListener("click", drucken);
    box.querySelector("#mpSpeichern").addEventListener("click", speichern);
    box.querySelector("#mpLeeren").addEventListener("click", () => { if (confirm("Deine Stunde leeren?")) { plan = { titel: "", stufe: plan.stufe, ziel: "", thema: plan.thema, bausteine: [] }; merken(); planer(); liste(); } });
}
function vorschlag(){
    const fach = /^Mathe/.test(plan.thema) ? "Mathe" : /^Deutsch/.test(plan.thema) ? "Deutsch" : /Lernen/.test(plan.thema) ? "Lernen lernen" : "";
    PHASEN.forEach(p => {
        if (plan.bausteine.some(b => finde(b.id).phase === p.name)) return;
        const pool = M.filter(m => m.phase === p.name && (plan.stufe === "alle" ? m.stufe === "alle" : (m.stufe === "alle" || m.stufe === plan.stufe)) && (!fach || m.fach === fach || m.fach === "Alle"));
        const genau = pool.filter(m => m.fach === fach);
        const w = (genau.length && Math.random() < .7 ? genau : pool)[Math.floor(Math.random() * (genau.length && Math.random() < .7 ? genau.length : pool.length))] || pool[0];
        if (w) plan.bausteine.push({ id: w.id, min: w.min });
    });
    plan.bausteine.sort((a, b) => PHASEN.findIndex(p => p.name === finde(a.id).phase) - PHASEN.findIndex(p => p.name === finde(b.id).phase));
    // Minuten so verteilen, dass es 40 ergibt (Rest an die Übung / Arbeitsphase)
    let s = summe();
    const dehnbar = plan.bausteine.filter(b => /Übung|Arbeitsphase/.test(finde(b.id).phase));
    for (let k = 0; s !== 40 && dehnbar.length && k < 80; k++) { const b = dehnbar[k % dehnbar.length]; if (s < 40) { b.min++; s++; } else if (b.min > 3) { b.min--; s--; } }
    merken(); planer(); liste();
}
function zeiten(){ let t = 0; return plan.bausteine.map(b => { const von = t; t += +b.min || 0; return { ...b, m: finde(b.id), zeit: von + "–" + t }; }); }
function drucken(){
    const ziel2 = document.getElementById("druck"); if (!ziel2) return;
    const z = zeiten();
    ziel2.innerHTML = `<div class="lehrer-druck"><div class="ld-kopf"><div class="ld-meta">Lernangebot · ${esc(plan.thema)} · 40 Minuten · ${plan.stufe === "alle" ? "Klasse 1/2 und 3/4" : "Klasse " + (plan.stufe === "34" ? "3/4" : "1/2")}</div><h1>${esc(plan.titel || "Meine Stunde")}</h1></div>
        ${plan.ziel ? `<table><tr><th>Ziel</th></tr><tr><td>${esc(plan.ziel)}</td></tr></table>` : ""}
        <h2>Material</h2><ul>${[...new Set(z.map(x => x.m.material).filter(Boolean))].map(t => `<li>${esc(t)}</li>`).join("") || "<li>–</li>"}</ul>
        <h2>Stundenverlauf</h2><table><tr><th style="width:12%">Min</th><th style="width:18%">Phase</th><th>Ablauf</th></tr>${z.map(x => `<tr><td>${x.zeit}</td><td>${esc(x.m.phase)}</td><td><b>${esc(x.m.titel)}</b><br>${esc(x.m.ablauf)}${x.m.tipp ? `<br><i>Tipp: ${esc(x.m.tipp)}</i>` : ""}</td></tr>`).join("")}</table>
        <p style="font-size:8pt;color:#8a979c;margin-top:6mm;text-align:center">Melanie Bernshausen · Diplomierte Mediendidaktikerin (EÖDL)</p></div>`;
    const titel = document.title; document.title = (plan.titel || "Meine Stunde") + " – Lernangebot";
    window.addEventListener("afterprint", () => { ziel2.innerHTML = ""; document.title = titel; }, { once: true });
    setTimeout(() => window.print(), 60);
}
async function speichern(){
    if (!plan.titel.trim()) { toast("Bitte gib der Stunde zuerst einen Titel.", true); ziel.querySelector("#mpTitel").focus(); return; }
    const z = zeiten(), st = plan.stufe;
    const fuer = m => st === "alle" ? (m.stufe === "alle" ? "alle" : m.stufe) : st;
    const zeile = (x) => ({ zeit: x.zeit, phase: x.m.phase === "Arbeitsphase" ? "Arbeitsblatt" : x.m.phase, k12: st === "34" ? "" : x.m.titel, k34: st === "12" ? "" : x.m.titel });
    const einheit = {
        titel: plan.titel.trim(), kategorie: plan.thema || "Sonstiges", dauer: 40,
        ziel12: st === "34" ? "" : plan.ziel, ziel34: st === "12" ? "" : plan.ziel, nur34: st === "34" || undefined,
        material: [...new Set(z.map(x => x.m.material).filter(Boolean))].join("\n"),
        verlauf: z.map(zeile),
        lerntext12: { titel: "", text: "" }, lerntext34: { titel: "", text: "" },
        uebungen: z.filter(x => x.m.phase !== "Ankommen" && x.m.phase !== "Abschluss").map((x, k) => ({ titel: x.m.titel, fuer: fuer(x.m), dauer: x.min + " Min", text: x.m.ablauf + (x.m.tipp ? "\n\n**Tipp:** " + x.m.tipp : ""), emoji: x.m.emoji, kern: k === 0 ? ["12", "34"] : undefined })),
        tafel: z.filter(x => x.m.tafel).map(x => ({ werkzeug: x.m.tafel.werkzeug, titel: x.m.titel, einstellung: x.m.tafel.einstellung || {} })),
        ab12: { titel: plan.titel.trim(), aufgaben: [] }, ab34: { titel: plan.titel.trim(), aufgaben: [] }
    };
    if (!einheit.nur34) delete einheit.nur34;
    try {
        if (typeof senden !== "function") throw new Error("Speichern ist hier nicht verfügbar.");
        const r = await senden({ aktion: "einheit_speichern", einheit });
        einheit.id = r.id; einheit.geaendert = r.geaendert;
        if (typeof DATEN !== "undefined") DATEN.einheiten.push(einheit);
        toast("Gespeichert – Arbeitsblätter kannst du jetzt im Editor ergänzen");
        location.hash = "#stunde/" + encodeURIComponent(r.id);
    } catch (err) { toast(err.message, true); }
}

window.lernMethoden = { zeigen, methoden: M, phasen: PHASEN };
})();
