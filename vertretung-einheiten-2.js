/* Leuchtturm – Vertretungsstunden: Vorlagen Teil 2
   (Sachunterricht entspannt, Kreativ & Gestalten, Spiele & Bewegung, Konzentration & Ruhe) */
window.SOZIAL_VORLAGEN.push(

/* ============================== SACHUNTERRICHT ENTSPANNT ============================== */
SOZIAL_EINHEIT({
    id: "w-jahreszeiten",
    titel: "Jahreszeiten-Bingo",
    kategorie: "Sachunterricht entspannt",
    ohneVorbereitung: true,
    ziel12: "Die vier Jahreszeiten an typischen Dingen erkennen",
    ziel34: "Merkmale und Monate den Jahreszeiten zuordnen",
    material: "Pro Kind ein leeres Blatt für das Bingo-Feld",
    lerntext12: { titel: "Der kleine Baum erzählt", text:
`Ich bin ein kleiner Baum. Im **Frühling** wachsen an mir grüne Blätter und weiße Blüten. Die Bienen summen.

Im **Sommer** ist es heiß. Kinder sitzen in meinem Schatten und essen Eis.

Im **Herbst** werden meine Blätter gelb, rot und braun. Der Wind weht sie herunter. Die Kinder springen in den Blätterhaufen.

Im **Winter** bin ich ganz kahl. Schnee liegt auf meinen Ästen. Neben mir steht ein Schneemann.

Und dann? Dann kommt wieder der Frühling!

**Nach dem Vorlesen:** Welche Jahreszeit ist gerade? Woran erkennst du das?` },
    lerntext34: { titel: "Vier Briefe", text:
`Liebe Kinder, ich bin der **Frühling**. Bei mir werden die Tage länger, die Tulpen blühen, und die Vögel kommen zurück. Meine Monate: März, April, Mai.

Hallo! Hier ist der **Sommer**. Bei mir gibt es Ferien, Freibad und Gewitter. Meine Monate: Juni, Juli, August.

Grüße vom **Herbst**: Ich bringe Drachenwetter, Kastanien und Laternen. Meine Monate: September, Oktober, November.

Brrr, der **Winter** schreibt: Bei mir ist es kalt und früh dunkel, der Igel hält Winterschlaf. Meine Monate: Dezember, Januar, Februar.

**Fragen zum Gespräch:**
1. In welcher Jahreszeit hast du Geburtstag?
2. Was machen Tiere im Winter?
3. Welche Jahreszeit magst du am liebsten – und warum?` },
    uebungen: [
        { titel: "Jahreszeiten-Pantomime", fuer: "alle", dauer: "5 Min",
          text: "Ein Kind kommt nach vorn und spielt eine Tätigkeit vor (Schlitten fahren, Drachen steigen lassen, schwimmen, Blumen pflanzen, Laterne tragen). Die anderen raten die Jahreszeit." },
        { titel: "Jahreszeiten-Bingo", fuer: "alle", dauer: "8 Min",
          text: "An der Tafel stehen 12 Wörter (Schneemann, Eis, Drachen, Tulpe, Schlitten, Freibad, Kastanie, Ostern, Laterne, Sonnenbrille, Handschuhe, Regenschirm). Jedes Kind malt auf ein Blatt ein Feld mit 3 × 3 Kästchen und trägt 9 davon ein (Kl. 1/2 malen kleine Bilder). Du rufst die Wörter in zufälliger Reihenfolge – wer zuerst eine Reihe hat, ruft „Bingo!“" }
    ],
    ab12: { titel: "Wann ist das?", aufgaben: [
        { typ: "ankreuzen", text: "Was passt zum Winter? Kreuze an.", nebeneinander: true, optionen: ["Schneemann", "Sonnenblume", "Schlitten", "Eis"] },
        { typ: "zuordnen", nur: "2", text: "Wann ist das? Verbinde.", links: ["Schneemann", "Tulpe", "Sonne", "Herbstlaub"], rechts: ["Herbst", "Winter", "Sommer", "Frühling"] },
        { typ: "malen", text: "Male deine Lieblings-Jahreszeit.", bild: "" }
    ]},
    ab34: { titel: "Das Jahr im Überblick", aufgaben: [
        { typ: "tabelle", text: "Trage die Monate und typische Dinge ein.", spalten: ["Jahreszeit", "Monate", "Typisch ist …"],
          zeilen: [["Frühling", "", ""], ["Sommer", "", ""], ["Herbst", "", ""], ["Winter", "", ""]] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Meine Lieblings-Jahreszeit ist ___, weil ___."] },
        { typ: "luecken", text: "Was machen diese Tiere im Winter?", nummern: false, saetze: ["Igel: ___", "Zugvögel: ___", "Eichhörnchen: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-fantasietier",
    titel: "Erfinde ein Fantasie-Tier",
    kategorie: "Sachunterricht entspannt",
    ohneVorbereitung: true,
    ziel12: "Körperteile und Fähigkeiten von Tieren kennen und neu kombinieren",
    ziel34: "Einen Tier-Steckbrief mit Lebensraum, Nahrung und Fähigkeiten erstellen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Der Elefanten-Pinguin", text:
`Im Zauberwald lebt ein ganz besonderes Tier: der Elefanten-Pinguin!

Er hat den Rüssel von einem **Elefanten** und den Körper von einem **Pinguin**. Mit dem Rüssel spritzt er Wasser. Mit seinen kurzen Flügeln rutscht er auf dem Bauch über das Eis.

Am liebsten isst er Fischstäbchen mit Erdbeeren. Und wenn er sich freut, tutet er laut: „Törööö!“

**Nach dem Vorlesen:** Aus welchen zwei Tieren besteht der Elefanten-Pinguin? Welche zwei Tiere würdest du mischen?` },
    lerntext34: { titel: "Forscherin Frieda entdeckt ein neues Tier", text:
`Tief im Regenwald entdeckt Forscherin Frieda ein Tier, das noch niemand kennt. Sofort schreibt sie einen Steckbrief.

**Name:** Glitzer-Flatterfrosch. **Aussehen:** grün mit goldenen Punkten, Flügel wie eine Fledermaus. **Lebensraum:** Baumkronen im Regenwald. **Nahrung:** Mücken und reife Mangos. **Besondere Fähigkeit:** Er leuchtet nachts, damit er seine Familie findet.

Frieda schickt den Steckbrief an das Naturkundemuseum. Dort sind alle begeistert.

**Fragen zum Gespräch:**
1. Was gehört in einen Tier-Steckbrief?
2. Welche echten Tiere haben besondere Fähigkeiten? (Gepard: schnell, Eule: sieht nachts, Chamäleon: Farbe wechseln)
3. Welchen Lebensraum hätte dein Fantasie-Tier?` },
    uebungen: [
        { titel: "Tier-Mix", fuer: "alle", dauer: "6 Min",
          text: "Du nennst zwei Tiere (Hase + Fisch, Giraffe + Schnecke, Löwe + Biene). Die Kinder erfinden vom Platz aus einen Namen für die Mischung und sagen, was das Tier kann. Ein Kind darf es vorn vorspielen." },
        { titel: "Tier-Superkräfte", fuer: "34", dauer: "5 Min",
          text: "Sammelt an der Tafel echte Tier-Superkräfte: Gepard rennt über 100 km/h, Eulen sehen nachts, Chamäleons wechseln die Farbe, Bienen tanzen, um den Weg zu zeigen. Welche Kraft bekommt euer Fantasie-Tier?" }
    ],
    ab12: { titel: "Mein Fantasie-Tier", aufgaben: [
        { typ: "malen", text: "Male ein Tier aus zwei Tieren.", bild: "" },
        { typ: "ankreuzen", text: "Mein Tier kann …", nebeneinander: true, optionen: ["fliegen", "schwimmen", "klettern", "hüpfen", "leuchten"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Tier heißt: ___"] }
    ]},
    ab34: { titel: "Tier-Steckbrief", aufgaben: [
        { typ: "tabelle", text: "Steckbrief deines Fantasie-Tiers", spalten: ["Merkmal", "Mein Tier"],
          zeilen: [["Name", ""], ["Aus welchen Tieren?", ""], ["Aussehen", ""], ["Lebensraum", ""], ["Nahrung", ""], ["Superkraft", ""]] },
        { typ: "malen", text: "Male dein Fantasie-Tier.", bild: "" }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-tier-raten",
    titel: "Tier-Raten: Wer bin ich?",
    kategorie: "Sachunterricht entspannt",
    ziel12: "Tiere an Merkmalen erkennen",
    ziel34: "Mit geschickten Ja-/Nein-Fragen Tiere herausfinden",
    material: "Tierkarten für „Wer bin ich?“ (unter Arbeitsmaterial ausdrucken)",
    materialIds: ["tier-karten"],
    lerntext12: { titel: "Rate mal, wer ich bin!", text:
`Ich bin klein und rund. Auf meinem Rücken habe ich viele Stacheln. Im Winter schlafe ich unter einem Laubhaufen. Wer bin ich? – Ein **Igel**!

Ich bin sehr groß. Mein Hals ist so lang, dass ich die Blätter ganz oben im Baum fressen kann. Wer bin ich? – Eine **Giraffe**!

Ich kann nicht fliegen, obwohl ich ein Vogel bin. Dafür schwimme ich super schnell im eiskalten Wasser. Wer bin ich? – Ein **Pinguin**!

**Nach dem Vorlesen:** Welches Tier-Rätsel kannst du dir ausdenken?` },
    lerntext34: { titel: "Das Spiel mit den 20 Fragen", text:
`Im Ferienlager spielen die Kinder „Wer bin ich?“. Jonas bekommt eine Tierkarte an die Stirn geklebt – alle sehen das Tier, nur er nicht.

„Bin ich ein Tier mit Fell?“ – „Nein.“ – „Kann ich fliegen?“ – „Nein.“ – „Lebe ich im Wasser?“ – „Ja, auch.“ – „Habe ich viele Zähne?“ – „Jaaa!“ – „Bin ich ein Krokodil?“ – „Richtig!“

Jonas hat nur fünf Fragen gebraucht. Sein Trick: Erst große Gruppen ausschließen (Fell? Federn? Wasser?), dann genauer fragen.

**Fragen zum Gespräch:**
1. Warum war „Hat es Fell?“ eine gute erste Frage?
2. Welche Fragen helfen, schnell auf das Tier zu kommen?
3. Welche Fragen sind ungeschickt? (z. B. „Bin ich ein Hamster?“ ganz am Anfang)` },
    uebungen: [
        { titel: "Tier-Rätsel", fuer: "alle", dauer: "6 Min",
          text: "Du liest Rätsel vor (Merkmale, Lebensraum, Nahrung). Die Kinder raten vom Platz. Wer richtig rät, bekommt die passende Tierkarte gezeigt. Kl. 3/4 dürfen danach eigene Rätsel stellen." },
        { titel: "Wer bin ich?", fuer: "alle", dauer: "8 Min",
          text: "Ein Kind kommt nach vorn und zieht verdeckt eine Tierkarte. Kl. 1/2: Das Kind beschreibt das Tier, die anderen raten. Kl. 3/4: Du hältst die Karte hinter das Kind, die Klasse sieht sie – das Kind stellt Ja-/Nein-Fragen, bis es das Tier errät." }
    ],
    ab12: { titel: "Welches Tier ist das?", aufgaben: [
        { typ: "ankreuzen", text: "Hör gut zu: Ich habe einen sehr langen Hals.", nebeneinander: true, optionen: ["Giraffe", "Elefant", "Hase"] },
        { typ: "ankreuzen", text: "Hör gut zu: Ich kann nachts besonders gut sehen.", nebeneinander: true, optionen: ["Eule", "Affe", "Pinguin"] },
        { typ: "ankreuzen", text: "Hör gut zu: Ich habe einen Panzer und bin sehr langsam.", nebeneinander: true, optionen: ["Frosch", "Schildkröte", "Igel"] },
        { typ: "malen", text: "Male dein Lieblingstier.", bild: "" }
    ]},
    ab34: { titel: "Tier-Detektive", aufgaben: [
        { typ: "tabelle", text: "Schreib in jedes Feld ja oder nein.", spalten: ["Frage", "Igel", "Pinguin", "Krokodil"],
          zeilen: [["Legt es Eier?", "", "", ""], ["Hat es Federn?", "", "", ""], ["Lebt es auch im Wasser?", "", "", ""], ["Hält es Winterschlaf?", "", "", ""]] },
        { typ: "luecken", text: "Schreibe ein eigenes Tier-Rätsel:", nummern: false, saetze: ["Ich habe ___", "Ich lebe ___", "Ich kann ___", "Wer bin ich? (Lösung: ___)"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-erfinder-fahrzeug",
    titel: "Mein Erfinder-Fahrzeug",
    kategorie: "Sachunterricht entspannt",
    ohneVorbereitung: true,
    ziel12: "Fahrzeuge und ihre Teile kennen und ein eigenes erfinden",
    ziel34: "Einen beschrifteten Bauplan mit Funktionen erstellen",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Oskars Wunder-Auto", text:
`Oskar baut ein Auto. Aber nicht irgendein Auto – ein Wunder-Auto!

Es hat vier große Räder, damit es über Steine fahren kann. Es hat Flügel, damit es über den Stau fliegen kann. Und es hat einen Propeller, damit es im See schwimmen kann.

Vorne hat es zwei Lampen wie Augen. Und hinten eine Rutsche, damit man aussteigen kann – schwupp!

„Wohin fahren wir?“, fragt Oskars kleine Schwester. „Zum Spielplatz – über den Wolken!“

**Nach dem Vorlesen:** Was konnte Oskars Auto alles? Was soll dein Fahrzeug können?` },
    lerntext34: { titel: "Die Erfinder-Messe", text:
`Bei der Erfinder-Messe in der Turnhalle stellen alle Kinder ihre Fahrzeug-Ideen vor. Ayse hat einen Schulbus mit Hausaufgaben-Tischen gezeichnet. Leon einen Roller, der mit Sonnenlicht fährt. Und Sophie ein U-Boot für Haustiere.

Die Jury achtet auf drei Dinge: Ist der Bauplan gut beschriftet? Ist klar, wozu jedes Teil da ist? Und ist die Idee besonders?

Leon gewinnt. Auf seinem Plan steht bei jedem Teil eine Erklärung: „Solarzelle – sammelt Sonnenstrom“, „Akku – speichert Strom für den Abend“, „Klingel – damit mich alle hören“.

**Fragen zum Gespräch:**
1. Was braucht jedes Fahrzeug? (Räder oder Kufen, Lenkung, Bremse, Antrieb)
2. Warum hat Leon gewonnen?
3. Welches Problem könnte dein Fahrzeug lösen?` },
    uebungen: [
        { titel: "Fahrzeug-Geräusche", fuer: "alle", dauer: "5 Min",
          text: "Ein Kind macht ein Fahrzeug-Geräusch nach (Feuerwehr, Zug, Hubschrauber, Motorrad, Fahrradklingel). Die anderen raten vom Platz. Wer richtig rät, ist als Nächstes dran." },
        { titel: "Was braucht ein Fahrzeug?", fuer: "alle", dauer: "5 Min",
          text: "Sammelt an der Tafel Fahrzeugteile: Räder, Lenkrad, Bremse, Motor, Licht, Sitz, Klingel, Hupe. Kl. 3/4 überlegen zu jedem Teil, wozu es da ist." }
    ],
    ab12: { titel: "Mein Fantasie-Fahrzeug", aufgaben: [
        { typ: "ankreuzen", text: "Was hat dein Fahrzeug? Kreuze an.", nebeneinander: true, optionen: ["Räder", "Flügel", "Propeller", "Segel", "Rutsche", "___"] },
        { typ: "malen", text: "Male dein Fahrzeug.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Fahrzeug heißt: ___"] }
    ]},
    ab34: { titel: "Mein Bauplan", aufgaben: [
        { typ: "malen", text: "Zeichne dein Fahrzeug und beschrifte die Teile mit Pfeilen.", bild: "" },
        { typ: "tabelle", text: "Wozu sind die Teile da?", spalten: ["Teil", "Wozu ist es da?"], zeilen: [["", ""], ["", ""], ["", ""], ["", ""]] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Fahrzeug ist besonders, weil ___"] }
    ]}
}),

/* ============================== KREATIV & GESTALTEN ============================== */
SOZIAL_EINHEIT({
    id: "w-kritzel-monster",
    titel: "Kritzel-Monster",
    kategorie: "Kreativ & Gestalten",
    ohneVorbereitung: true,
    ziel12: "Aus einem Zufallskritzel ein Fantasie-Monster gestalten",
    ziel34: "Ein Monster gestalten und ihm eine Geschichte geben",
    material: "Pro Kind ein weißes A4-Blatt (oder das Arbeitsblatt), Bunt- und Filzstifte, ein schwarzer Stift",
    lerntext12: { titel: "Das Monster im Kritzel", text:
`Luna kritzelt mit geschlossenen Augen auf ihr Blatt. Hin und her, rund und zackig.

Dann macht sie die Augen auf. Sie dreht das Blatt. Und dreht es noch einmal. Da! In dem Kritzel versteckt sich ein Monster!

Luna malt zwei große Augen. Dann ein Maul mit einem einzigen Zahn. Dann sechs Beine und lila Haare. „Hallo, Kringel!“, sagt Luna. Denn so heißt ihr Monster jetzt.

Kringel ist gar nicht gruselig. Kringel mag Pfannkuchen und kitzelt gern.

**Nach dem Vorlesen:** Wie hat Luna ihr Monster gefunden? Heute probieren wir das selbst!` },
    lerntext34: { titel: "Das Monster-Museum", text:
`In einer kleinen Stadt gibt es ein ungewöhnliches Museum: das Monster-Museum. Jedes Bild darin ist aus einem Kritzel entstanden.

Da hängt „Schnurz, der Socken-Fresser“, der nachts einzelne Socken stiehlt. Daneben „Gwendolin“, ein Monster mit sieben Augen, das nie etwas verpasst. Und „Herr Brummel“, der so laut schnarcht, dass die Fenster wackeln.

Unter jedem Bild steht ein kleines Schild: Name, was das Monster mag und was es nicht mag.

**Fragen zum Gespräch:**
1. Welches Monster aus dem Museum gefällt dir am besten?
2. Was macht ein Monster lustig statt gruselig?
3. Welche Geschichte könnte dein Monster erleben?` },
    uebungen: [
        { titel: "Monster an der Tafel", fuer: "alle", dauer: "5 Min",
          text: "Du kritzelst mit geschlossenen Augen 5 Sekunden lang an die Tafel. Gemeinsam dreht ihr den Kopf: Wo versteckt sich ein Monster? Die Kinder rufen vom Platz, wo Augen, Maul und Beine hinkommen – du malst sie dazu." },
        { titel: "Kritzeln und entdecken", fuer: "alle", dauer: "5 Min",
          text: "Alle kritzeln mit dem schwarzen Stift und geschlossenen Augen, während du langsam bis 5 zählst. Dann drehen sie ihr Blatt, bis sie „ihr“ Monster entdecken – danach geht es ans Gestalten auf dem Arbeitsblatt." },
        { titel: "Monster-Show", fuer: "alle", dauer: "5 Min",
          text: "Zum Abschluss halten die Kinder nacheinander am Platz ihr Bild hoch. Die anderen raten: „Was frisst dein Monster? Ist es lieb oder frech?“ Danach stellt das Kind es kurz vor." }
    ],
    ab12: { titel: "Mein Kritzel-Monster", aufgaben: [
        { typ: "malen", text: "Kritzle mit geschlossenen Augen. Finde dein Monster und male es fertig.", bild: "" },
        { typ: "ankreuzen", text: "Mein Monster ist …", nebeneinander: true, optionen: ["lieb", "frech", "lustig", "müde"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Monster heißt: ___"] }
    ]},
    ab34: { titel: "Mein Monster-Steckbrief", aufgaben: [
        { typ: "malen", text: "Kritzle mit geschlossenen Augen. Finde dein Monster und gestalte es.", bild: "" },
        { typ: "luecken", text: "Monster-Steckbrief:", nummern: false, saetze: ["Name: ___", "Es mag: ___", "Es mag gar nicht: ___", "Seine Superkraft: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-baumhaus",
    titel: "Mein Traum-Baumhaus",
    kategorie: "Kreativ & Gestalten",
    ohneVorbereitung: true,
    ziel12: "Ein Traum-Baumhaus mit vielen Ideen gestalten",
    ziel34: "Ein Baumhaus planen, gestalten und Regeln dafür aufstellen",
    material: "Nur das Arbeitsblatt, Buntstifte",
    lerntext12: { titel: "Das Baumhaus von Tim und Ida", text:
`Tim und Ida wünschen sich ein Baumhaus. Sie überlegen, was hinein soll.

„Eine Strickleiter zum Hochklettern!“, ruft Tim. „Und eine Rutsche zum Runterrutschen!“, ruft Ida.

„Ein Fenster, damit wir die Vögel sehen.“ – „Eine Hängematte zum Schaukeln.“ – „Und einen Korb an einem Seil, damit Mama uns Kekse hochschicken kann!“

Papa lacht. „Das wird das beste Baumhaus der Welt.“

**Nach dem Vorlesen:** Was haben sich Tim und Ida gewünscht? Was hätte dein Baumhaus?` },
    lerntext34: { titel: "Der Baumhaus-Club", text:
`Vier Freunde haben ein Baumhaus gebaut. Doch schon am ersten Tag gibt es Streit: Wer darf mit hinein? Darf man oben essen? Wer räumt auf?

Mira schlägt vor: „Wir brauchen Baumhaus-Regeln!“ Gemeinsam schreiben sie auf ein Brett:
1. Höchstens vier Kinder gleichzeitig.
2. Wer hochkommt, sagt das Passwort.
3. Wer isst, nimmt den Müll wieder mit.
4. Jeder darf einen Freund einladen.

Seitdem ist das Baumhaus der schönste Ort der Straße.

**Fragen zum Gespräch:**
1. Warum hat der Club Regeln gebraucht?
2. Welche Regel findest du am wichtigsten?
3. Was dürfte in deinem Baumhaus auf keinen Fall fehlen?` },
    uebungen: [
        { titel: "Baumhaus-Ideen sammeln", fuer: "alle", dauer: "6 Min",
          text: "Sammelt an der Tafel, was ein Traum-Baumhaus haben könnte: Strickleiter, Rutsche, Hängematte, Fernrohr, Seilbahn, Briefkasten, Geheimtür … Kl. 1/2 dürfen Ideen auch vormachen." },
        { titel: "Baumhaus-Passwort", fuer: "34", dauer: "4 Min",
          text: "Die Tischnachbarn erfinden ein lustiges Passwort und eine geheime Klopf-Folge für ihr Baumhaus. Ein paar Paare stellen sie vor." }
    ],
    ab12: { titel: "Mein Traum-Baumhaus", aufgaben: [
        { typ: "ankreuzen", text: "Was hat dein Baumhaus? Kreuze an.", nebeneinander: true, optionen: ["Leiter", "Rutsche", "Fenster", "Schaukel", "Fernrohr", "___"] },
        { typ: "malen", text: "Male dein Traum-Baumhaus.", bild: "" }
    ]},
    ab34: { titel: "Mein Baumhaus-Plan", aufgaben: [
        { typ: "malen", text: "Zeichne dein Traum-Baumhaus und beschrifte die besonderen Teile.", bild: "" },
        { typ: "luecken", text: "Meine Baumhaus-Regeln:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Das Passwort lautet: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-comic",
    titel: "Comic in drei Bildern",
    kategorie: "Kreativ & Gestalten",
    ohneVorbereitung: true,
    ziel12: "Eine kleine Geschichte in drei Bildern malen",
    ziel34: "Einen Comic mit Sprechblasen gestalten",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Der Hund und der Ball", text:
`Bild 1: Ein Hund spielt mit einem roten Ball im Garten.

Bild 2: Der Ball rollt in den Teich. Platsch! Der Hund schaut traurig ins Wasser.

Bild 3: Eine Ente schiebt den Ball mit dem Schnabel zurück ans Ufer. Der Hund wedelt mit dem Schwanz.

Drei Bilder – und schon ist es eine ganze Geschichte!

**Nach dem Vorlesen:** Was passiert am Anfang, was in der Mitte, was am Ende? Welche Geschichte malst du?` },
    lerntext34: { titel: "Wie ein Comic entsteht", text:
`Comiczeichnerin Kim zeigt der Klasse ihre Tricks. „Ein guter Comic braucht drei Dinge“, sagt sie.

„Erstens: eine klare Reihenfolge. Was passiert zuerst, was dann, was am Ende? Zweitens: Sprechblasen. Darin steht, was die Figuren sagen – kurz und knackig. Und drittens: Geräusche! BUMM, PLATSCH, KNACK – die schreibt man groß und bunt mitten ins Bild.“

Sie zeichnet in zwei Minuten einen Mini-Comic: Eine Katze will einen Fisch fangen (Bild 1), fällt ins Aquarium (Bild 2: PLATSCH!), sitzt nass und beleidigt auf dem Sofa (Bild 3: „Ich mag eh lieber Trockenfutter.“).

**Fragen zum Gespräch:**
1. Welche drei Tricks verrät Kim?
2. Was ist der Unterschied zwischen einer Sprechblase und einer Denkblase?
3. Welche Geräusch-Wörter kennt ihr?` },
    uebungen: [
        { titel: "Geräusch-Wörter", fuer: "alle", dauer: "4 Min",
          text: "Sammelt Comic-Geräusche an der Tafel und macht sie gemeinsam nach: BUMM, PLATSCH, KNACK, ZISCH, HATSCHI, RUMS, KLINGEL. Kl. 1/2 machen die Geräusche, Kl. 3/4 erfinden neue." },
        { titel: "Comic an der Tafel", fuer: "alle", dauer: "6 Min",
          text: "Du malst drei leere Kästen an die Tafel. Die Klasse erfindet gemeinsam eine Mini-Geschichte, du (oder ein Kind) zeichnest Strichmännchen in die Kästen. Kl. 3/4 ergänzen Sprechblasen." }
    ],
    ab12: { titel: "Meine Bilder-Geschichte", aufgaben: [
        { typ: "malen", text: "Bild 1: Am Anfang …", bild: "" },
        { typ: "malen", text: "Bild 2: Dann …", bild: "" },
        { typ: "malen", text: "Bild 3: Am Ende …", bild: "" }
    ]},
    ab34: { titel: "Mein Comic", aufgaben: [
        { typ: "luecken", text: "Titel meines Comics:", nummern: false, saetze: ["___"] },
        { typ: "malen", text: "Bild 1 (mit Sprechblase)", bild: "" },
        { typ: "malen", text: "Bild 2 (mit Geräusch-Wort)", bild: "" },
        { typ: "malen", text: "Bild 3 (mit Sprechblase)", bild: "" }
    ]}
}),

/* ============================== SPIELE & BEWEGUNG ============================== */
SOZIAL_EINHEIT({
    id: "w-montagsmaler",
    titel: "Montagsmaler & Co.",
    kategorie: "Spiele & Bewegung",
    ziel12: "Begriffe malen und erraten",
    ziel34: "Begriffe zeichnen, umschreiben und erraten",
    material: "Begriffskarten für Montagsmaler (unter Arbeitsmaterial ausdrucken), Tafel und Kreide",
    materialIds: ["montagsmaler-begriffe"],
    lerntext12: { titel: "Das Bilder-Rätsel", text:
`Opa malt einen Kreis an die Tafel. Dann viele Striche rundherum.

„Ein Igel!“, ruft Emma. „Nein.“ – „Ein Gänseblümchen!“, ruft Ben. „Auch nicht.“

Opa malt den Kreis gelb an. „Die Sonne!“, rufen beide gleichzeitig. Opa nickt.

Jetzt ist Emma dran. Sie malt ein Viereck und ein Dreieck darauf …

**Nach dem Vorlesen:** Was malt Emma wohl? Spielen wir das auch!` },
    lerntext34: { titel: "Die Spieleshow", text:
`Willkommen bei der großen Spieleshow „Mal es, sag es, zeig es!“ Drei Runden warten auf die Teams.

Runde 1 – **Malen:** Ein Kind zeichnet einen Begriff an die Tafel. Buchstaben und Zahlen sind verboten!

Runde 2 – **Erklären:** Ein Kind beschreibt einen Begriff, ohne das Wort selbst zu sagen. „Es ist kalt, weiß, hat eine Möhre als Nase …“

Runde 3 – **Pantomime:** Nur mit dem Körper, ohne Geräusche.

Das Team mit den meisten Punkten gewinnt – aber am wichtigsten ist: Alle lachen.

**Fragen zum Gespräch:**
1. Welche Runde findest du am schwersten?
2. Wie erklärt man „Schneemann“, ohne das Wort zu sagen?
3. Wie bleibt so ein Spiel fair?` },
    uebungen: [
        { titel: "Montagsmaler", fuer: "alle", dauer: "10 Min",
          text: "Ein Kind kommt nach vorn, zieht verdeckt eine Begriffskarte (das Bild hilft, wenn es noch nicht liest) und malt den Begriff an die Tafel – ohne Buchstaben. Die anderen raten vom Platz. Wer es errät, darf als Nächstes malen. Kl. 3/4 spielen in zwei Teams mit Punkten." },
        { titel: "Begriffe erklären", fuer: "34", dauer: "5 Min",
          text: "Ein Kind erklärt einen Begriff, ohne ihn zu sagen. Die anderen raten. Schwerer: Drei verbotene Wörter, die nicht vorkommen dürfen (bei „Schneemann“: Schnee, Winter, Möhre)." }
    ],
    ab12: { titel: "Mal mal!", aufgaben: [
        { typ: "malen", text: "Male etwas. Dein Nachbar rät, was es ist.", bild: "" },
        { typ: "malen", text: "Male noch etwas – diesmal ganz schnell!", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Nachbar hat geraten: ___"] }
    ]},
    ab34: { titel: "Montagsmaler-Werkstatt", aufgaben: [
        { typ: "tabelle", text: "Erfinde neue Begriffe für Montagsmaler – leicht, mittel, schwer.", spalten: ["leicht", "mittel", "schwer"], zeilen: [["", "", ""], ["", "", ""], ["", "", ""]] },
        { typ: "malen", text: "Zeichne deinen schwersten Begriff so, dass man ihn trotzdem errät.", bild: "" },
        { typ: "luecken", text: "Erkläre einen Begriff, ohne ihn zu nennen:", nummern: false, saetze: ["___", "(Lösung: ___)"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-bewegung",
    titel: "Bewegungs-Würfel",
    kategorie: "Spiele & Bewegung",
    ziel12: "Sich zwischendurch bewegen und Bewegungen nachmachen",
    ziel34: "Eine eigene Bewegungspause erfinden und anleiten",
    material: "Bewegungskarten (unter Arbeitsmaterial ausdrucken), ein Würfel",
    materialIds: ["bewegungs-karten"],
    lerntext12: { titel: "Die müde Klasse", text:
`Es ist Montag. Die Klasse 2a ist sooo müde. Alle gähnen.

Da kommt Herr Hopp in die Klasse. „Guten Morgen! Wir wecken jetzt unsere Körper auf!“

Er würfelt eine 3. „Drei Mal hüpfen wie ein Frosch!“ Alle hüpfen. Er würfelt eine 5. „Fünf Sekunden auf einem Bein stehen!“ Alle wackeln und lachen.

Danach sind alle wach. „Jetzt können wir lernen“, sagt Herr Hopp.

**Nach dem Vorlesen:** Wie fühlt sich dein Körper an, wenn du lange sitzt? Wecken wir ihn auf!` },
    lerntext34: { titel: "Warum Bewegung schlau macht", text:
`Wusstest du, dass dein Gehirn bei Bewegung besser arbeitet? Wenn du dich bewegst, schlägt dein Herz schneller. Es pumpt mehr Blut – und damit mehr Sauerstoff – auch in deinen Kopf.

Deshalb machen viele Schulen kurze Bewegungspausen. Schon zwei Minuten Hampelmann, Strecken oder Balancieren helfen, dass man danach wieder besser aufpassen kann.

Profi-Sportler machen das übrigens auch: Vor dem Spiel wärmen sie sich auf, damit Körper und Kopf bereit sind.

**Fragen zum Gespräch:**
1. Warum helfen Bewegungspausen beim Lernen?
2. Welche Bewegungen kann man im Klassenzimmer machen?
3. Was solltet ihr beachten, damit sich niemand wehtut?` },
    uebungen: [
        { titel: "Bewegungs-Würfel", fuer: "alle", dauer: "8 Min",
          text: "Ein Kind würfelt, ein anderes zieht eine Bewegungskarte. Die Augenzahl sagt, wie oft die Bewegung gemacht wird (z. B. 4 × klatschen und stampfen). Alle machen am Platz mit. Achtet auf genug Platz zum Nachbarn." },
        { titel: "Spiegel-Spiel", fuer: "alle", dauer: "4 Min",
          text: "Die Tischnachbarn stehen sich gegenüber. Einer macht langsame Bewegungen vor, der andere spiegelt sie genau. Nach einer Minute wechseln." },
        { titel: "Eigene Bewegungspause", fuer: "34", dauer: "5 Min",
          text: "In Tischpaaren erfinden die Kinder eine Bewegungspause aus drei Übungen. Ein Paar darf sie vorn anleiten." }
    ],
    ab12: { titel: "Ich bewege mich gern", aufgaben: [
        { typ: "ankreuzen", text: "Was machst du gern? Kreuze an.", nebeneinander: true, optionen: ["hüpfen", "rennen", "tanzen", "klettern", "schwimmen", "Fahrrad fahren"] },
        { typ: "malen", text: "Male dich bei deiner Lieblingsbewegung.", bild: "" }
    ]},
    ab34: { titel: "Meine Bewegungspause", aufgaben: [
        { typ: "tabelle", text: "Erfinde eine Bewegungspause aus drei Übungen.", spalten: ["Übung", "Wie oft / wie lange?", "Worauf achten?"], zeilen: [["", "", ""], ["", "", ""], ["", "", ""]] },
        { typ: "malen", text: "Zeichne deine Lieblingsübung als Strichmännchen.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Nach Bewegung fühle ich mich ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-schatzsuche",
    titel: "Schatzsuche im Klassenzimmer",
    kategorie: "Spiele & Bewegung",
    ziel12: "Hinweise verstehen und gemeinsam einen Schatz finden",
    ziel34: "Rätsel-Hinweise lösen und eine eigene Schatzsuche planen",
    material: "Hinweiskarten (unter Arbeitsmaterial ausdrucken, von Hand ausfüllen), ein kleiner „Schatz“ (z. B. Gummibärchen-Tüte, Sticker oder ein Stern aus Papier)",
    materialIds: ["schatz-hinweise"],
    lerntext12: { titel: "Die Schatzkarte von Kapitän Kralle", text:
`Kapitän Kralle hat einen Schatz versteckt. Aber wo?

Auf seinem ersten Zettel steht: „Geh zu dem Ding, an das man mit Kreide schreibt.“ Die Kinder laufen zur Tafel. Dort liegt der zweite Zettel: „Schau unter dem Ding, auf dem die Lehrerin sitzt.“ Unter dem Stuhl klebt der dritte Zettel: „Der Schatz ist dort, wo die Bücher wohnen.“

Im Bücherregal finden sie eine kleine Kiste. Darin: Sticker für alle!

**Nach dem Vorlesen:** Wo waren die Hinweise versteckt? Heute suchen wir einen Schatz in unserem Klassenzimmer!` },
    lerntext34: { titel: "Die Rätsel-Rallye", text:
`Für die Rätsel-Rallye hat die Lehrerin fünf Hinweise versteckt. Jeder Hinweis ist ein kleines Rätsel.

Hinweis 1: „Ich habe Zeiger, aber keine Hände.“ (Die Uhr.) Hinweis 2: „Ich bin voller Löcher und halte trotzdem Wasser fern.“ (Der Schirm? Nein – die Fußmatte an der Tür!) Hinweis 3: „Ich lasse Licht herein, aber keinen Regen.“ (Das Fenster.)

Die Kinder müssen zusammenarbeiten: Nur wer gut überlegt und zuhört, kommt weiter.

**Fragen zum Gespräch:**
1. Löst die Rätsel gemeinsam – worauf zeigen sie?
2. Was macht ein gutes Rätsel aus?
3. Welche Regeln braucht eine Schatzsuche im Klassenzimmer? (leise, nicht rennen, nichts kaputt machen)` },
    uebungen: [
        { titel: "Schatzsuche", fuer: "alle", dauer: "10 Min",
          text: "Vor der Stunde (oder während die Kinder die Augen schließen) versteckst du 4–6 Hinweiskarten und den Schatz im Raum. Ein Kind liest den ersten Hinweis vor (Kl. 1/2: du liest vor). Immer ein anderes Kind darf den nächsten Hinweis holen – die anderen bleiben am Platz und helfen beim Raten. Am Ende teilt die Klasse den Schatz." },
        { titel: "Warm – kalt", fuer: "12", dauer: "4 Min",
          text: "Ein Kind sucht einen kleinen versteckten Gegenstand. Die Klasse hilft nur mit „warm“, „wärmer“, „heiß“ oder „kalt“." }
    ],
    ab12: { titel: "Meine Schatzkarte", aufgaben: [
        { typ: "malen", text: "Male eine Schatzkarte von unserem Klassenzimmer. Mach ein Kreuz, wo dein Schatz liegt.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Schatz ist versteckt: ___"] }
    ]},
    ab34: { titel: "Meine eigene Schatzsuche", aufgaben: [
        { typ: "luecken", text: "Schreibe drei Rätsel-Hinweise für Orte im Klassenzimmer.", nummern: true, saetze: ["___ (Lösung: ___)", "___ (Lösung: ___)", "___ (Lösung: ___)"] },
        { typ: "malen", text: "Zeichne eine Schatzkarte vom Klassenzimmer mit dem Weg zum Schatz.", bild: "" }
    ]}
}),

/* ============================== KONZENTRATION & RUHE ============================== */
SOZIAL_EINHEIT({
    id: "w-fantasiereise",
    titel: "Fantasiereise mit Malen",
    kategorie: "Konzentration & Ruhe",
    ohneVorbereitung: true,
    ziel12: "Zur Ruhe kommen, zuhören und Bilder im Kopf malen",
    ziel34: "Einer Fantasiereise folgen und Eindrücke gestalten und beschreiben",
    material: "Nur das Arbeitsblatt, eventuell ruhige Musik",
    lerntext12: { titel: "Die Reise ins Meer", text:
`Setz dich bequem hin. Leg deine Hände auf den Tisch. Wenn du magst, schließ die Augen. Atme ruhig ein … und aus.

Stell dir vor, du stehst an einem warmen Strand. Der Sand kitzelt an deinen Füßen. Du gehst langsam ins Wasser. Es ist angenehm warm.

Du kannst unter Wasser atmen! Du tauchst hinab. Um dich herum schwimmen bunte Fische. Ein Seepferdchen winkt dir zu. Eine Schildkröte schwimmt ganz langsam neben dir her.

Auf dem Meeresboden liegt eine glänzende Muschel. Du nimmst sie in die Hand. Sie ist ganz glatt.

Langsam schwimmst du wieder nach oben. Du bist zurück am Strand. Du atmest tief ein und aus. Bewege deine Finger und Zehen. Öffne langsam die Augen.

**Nach der Reise:** Was hast du gesehen? Male es!` },
    lerntext34: { titel: "Die Reise in den Wolkenpalast", text:
`Setz dich bequem hin, die Füße auf dem Boden. Schließ die Augen, wenn du magst. Atme dreimal tief ein und langsam aus.

Stell dir vor, du liegst auf einer Wiese. Über dir zieht eine große, weiche Wolke heran. Sie senkt sich, und du kletterst hinauf. Sie fühlt sich an wie warme Watte.

Die Wolke trägt dich hoch über die Felder, über einen Wald, über einen glitzernden See. Ganz oben siehst du einen Palast aus Wolken. Das Tor öffnet sich von selbst. Drinnen ist es hell und ruhig. In der Mitte steht eine Truhe. Du öffnest sie – darin liegt etwas, das nur dir gehört. Schau es dir in Ruhe an.

Langsam trägt dich die Wolke zurück auf die Wiese. Du spürst den Boden unter dir. Atme tief ein und aus. Strecke dich und öffne die Augen.

**Fragen zum Gespräch:**
1. Was lag in deiner Truhe? (Nur wer mag, erzählt.)
2. Wie hat sich dein Körper während der Reise angefühlt?
3. Wann könnte dir so eine Reise im Kopf helfen?` },
    uebungen: [
        { titel: "Ankommen in der Stille", fuer: "alle", dauer: "3 Min",
          text: "Licht etwas dämpfen, wenn möglich. Alle sitzen bequem, Hände auf dem Tisch. Gemeinsam dreimal tief atmen. Wer nicht die Augen schließen mag, schaut auf einen Punkt auf dem Tisch." },
        { titel: "Fantasiereise vorlesen", fuer: "alle", dauer: "6 Min",
          text: "Lies die passende Fantasiereise langsam und ruhig vor (Kl. 1/2: „Die Reise ins Meer“, Kl. 3/4: „Die Reise in den Wolkenpalast“). Mach an jedem Absatz eine kleine Pause. Danach malen die Kinder ihre Bilder – ohne zu sprechen." }
    ],
    ab12: { titel: "Meine Reise ins Meer", aufgaben: [
        { typ: "malen", text: "Male, was du im Meer gesehen hast.", bild: "" },
        { typ: "ankreuzen", text: "Wie fühlst du dich jetzt?", nebeneinander: true, optionen: ["ruhig", "froh", "müde", "___"] }
    ]},
    ab34: { titel: "Mein Wolkenpalast", aufgaben: [
        { typ: "malen", text: "Male deinen Wolkenpalast und was in deiner Truhe lag.", bild: "" },
        { typ: "luecken", text: "Beschreibe deine Reise mit drei Wörtern:", nummern: false, saetze: ["___, ___, ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["So hat sich mein Körper angefühlt: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "w-konzentration",
    titel: "Konzentrations-Olympiade",
    kategorie: "Konzentration & Ruhe",
    ohneVorbereitung: true,
    ziel12: "Spielerisch genau hinsehen und hinhören",
    ziel34: "Konzentrationsaufgaben lösen und eigene Strategien entdecken",
    material: "Nur das Arbeitsblatt",
    lerntext12: { titel: "Die Adleraugen-Prüfung", text:
`Im Wald gibt es eine Prüfung für die besten Augen. Die Eule, der Fuchs und die kleine Maus machen mit.

„Findet alle roten Beeren!“, ruft der Bär. Der Fuchs rennt los und findet drei. Die Eule findet fünf. Und die Maus? Die geht ganz langsam und schaut ganz genau hin. Sie findet sieben!

„Wie hast du das gemacht?“, fragt der Fuchs. Die Maus lächelt: „Ich habe nicht gerannt. Ich habe genau hingeschaut.“

**Nach dem Vorlesen:** Warum hat die Maus gewonnen? Heute sind wir alle Adleraugen!` },
    lerntext34: { titel: "Das Geheimnis der Konzentration", text:
`Profi-Torhüterin Lara wird oft gefragt: „Wie hältst du so viele Bälle?“ Ihre Antwort: „Konzentration ist wie ein Muskel. Man kann sie trainieren.“

Ihre drei Tipps: Erstens – eine Sache nach der anderen. Wer zwei Dinge gleichzeitig macht, macht beide nur halb gut. Zweitens – Ablenkungen wegräumen. Drittens – kurze Pausen: Nach einer Weile kurz strecken, tief atmen, dann geht es weiter.

Heute ist Olympiade: Wer schafft die Aufgaben ganz genau – nicht am schnellsten, sondern am genauesten?

**Fragen zum Gespräch:**
1. Welche Tipps gibt Lara?
2. Was lenkt dich beim Lernen am meisten ab?
3. Was hilft dir, wieder konzentriert zu sein?` },
    uebungen: [
        { titel: "Hör-Disziplin", fuer: "alle", dauer: "5 Min",
          text: "Du sagst Wörter. Immer wenn ein Tier kommt, stehen alle kurz auf und setzen sich wieder: Tisch – Hund – Ball – Katze – Auto – Maus – Lampe – Igel … Kl. 3/4: Bei Tieren aufstehen, bei Obst klatschen." },
        { titel: "Zahlen-Klatsch-Kette", fuer: "alle", dauer: "5 Min",
          text: "Der Reihe nach wird gezählt. Kl. 1/2: Bei jeder 5 wird geklatscht statt gesprochen. Kl. 3/4: Bei Zahlen mit einer 7 oder in der 7er-Reihe wird geklatscht. Wer sich vertut, beginnt von vorn – ohne Ausscheiden." }
    ],
    ab12: { titel: "Adleraugen", aufgaben: [
        { typ: "ankreuzen", text: "Welches Bild ist anders? Kreuze an.", nebeneinander: true, optionen: ["🐱", "🐱", "🐶", "🐱"] },
        { typ: "ankreuzen", text: "Welches Bild ist anders? Kreuze an.", nebeneinander: true, optionen: ["⭐", "⭐", "⭐", "🌙", "⭐"] },
        { typ: "tabelle", text: "Zähle genau: Wie viele Äpfel sind es?", spalten: ["Bilder", "Anzahl"],
          zeilen: [["🍎 🍐 🍎 🍎 🍐 🍎", ""], ["🍐 🍎 🍐 🍐 🍎 🍐 🍎", ""]] },
        { typ: "malen", text: "Male genau 5 Kreise, 3 Dreiecke und 2 Sterne.", bild: "" }
    ]},
    ab34: { titel: "Konzentrations-Olympiade", aufgaben: [
        { typ: "luecken", text: "Disziplin 1 – Zähle, wie oft das „e“ vorkommt:", nummern: false, saetze: ["„Der kleine Elefant geht heute gerne Eis essen.“ → ___ mal"] },
        { typ: "luecken", text: "Disziplin 2 – Welche Zahl fehlt?", nummern: false, saetze: ["3 · 6 · 9 · ___ · 15 · 18", "50 · 45 · ___ · 35 · 30"] },
        { typ: "luecken", text: "Disziplin 3 – Lies rückwärts:", nummern: false, saetze: ["NEGNULUREDNÄWNOSSOREG = ___"] },
        { typ: "luecken", text: "Disziplin 4 – Finde die drei Fehler im Satz:", nummern: false, saetze: ["„Im Wintre fält der schne vom Himmel.“ → ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Das hilft mir, mich zu konzentrieren: ___"] }
    ]}
})

);
