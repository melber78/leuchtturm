/* ============================================================
   Leuchtturm – Vertretung „Die Schatzkarte“: Stationen
   Jede Station ist ein Ort auf der Wanderkarte von Fuchs Fritz.
   typ:   bewegung · stille · raetsel · rechnen · lesen · woerter · wissen
   stufe: "12" (Kl. 1/2) · "34" (Kl. 3/4) · "alle"
   lk:    genau EIN Satz für die Lehrkraft
   auftrag: steht groß an der Tafel
   items: einzeln an der Tafel – f = Aufgabe, a = Lösung (zum Aufdecken)
   gen:   Name eines Generators (Mathe wird jedes Mal neu gewürfelt)
   Ohne Zusatzmaterial – alles passiert an der Tafel.
   ============================================================ */
(function(){

const S = [];
const st = o => S.push(o);

/* ============================== BEWEGUNG ============================== */
st({ id: "b-wer", typ: "bewegung", stufe: "alle", titel: "Wer …, steht auf!",
  lk: "Die Sätze erscheinen nacheinander an der Tafel (🔊 liest vor) – wer gemeint ist, steht kurz auf und setzt sich wieder hin.",
  auftrag: "Hört genau hin: Wer gemeint ist, steht auf – und setzt sich wieder.",
  items: [
    { f: "Wer ein Haustier hat, steht auf." },
    { f: "Wer Geschwister hat, steht auf." },
    { f: "Wer heute vor 7 Uhr wach war, steht auf." },
    { f: "Wer schon einmal auf einem Baum geklettert ist, steht auf." },
    { f: "Wer lieber Nudeln als Pizza isst, steht auf." },
    { f: "Wer heute etwas Grünes anhat, steht auf." },
    { f: "Wer gern im Schnee spielt, steht auf." },
    { f: "Wer heute schon gelacht hat, steht auf – und alle anderen auch!" }
  ]});

st({ id: "b-waldtiere", typ: "bewegung", stufe: "12", titel: "Waldtiere am Platz",
  lk: "Alle stehen hinter ihrem Stuhl und machen das Tier nach – ohne Geräusche, ohne herumzulaufen.",
  auftrag: "Stellt euch hinter euren Stuhl. Bewegt euch wie …",
  items: [
    { f: "… ein Fuchs, der ganz leise schleicht." },
    { f: "… ein Hase, der dreimal hüpft." },
    { f: "… ein Bär, der schwer stapft." },
    { f: "… ein Specht, der an den Baum klopft." },
    { f: "… eine Eule, die den Kopf langsam dreht." },
    { f: "… ein Baum im Sturm." },
    { f: "… eine Schnecke – und jetzt alle ganz langsam hinsetzen." }
  ]});

st({ id: "b-stopp", typ: "bewegung", stufe: "alle", titel: "Lauf und Stopp",
  lk: "Das Kommando steht an der Tafel, mit 🔊 ruft die Tafel es – auch das „Stopp!“; dann frieren alle ein.",
  auftrag: "Lauft auf der Stelle. Bei „Stopp!“ friert ihr ein wie Eiszapfen.",
  items: [
    { f: "Ganz normal auf der Stelle laufen … Stopp!" },
    { f: "Wie ein Roboter laufen … Stopp!" },
    { f: "Auf Zehenspitzen laufen … Stopp!" },
    { f: "Ganz schnell, aber leise … Stopp!" },
    { f: "In Zeitlupe … Stopp!" },
    { f: "Wie über heißen Sand … Stopp!" }
  ]});

st({ id: "b-stimmt-steh", typ: "bewegung", stufe: "12", titel: "Stimmt? Dann steh auf!",
  lk: "Der Satz steht an der Tafel (🔊 liest vor): Wer meint, er stimmt, steht auf – sonst bleibt man sitzen; dann tippst du auf „Lösung zeigen“.",
  auftrag: "Stimmt der Satz? Dann steh auf. Quatsch? Dann bleib sitzen.",
  items: [
    { f: "Eine Woche hat sieben Tage.", a: "Stimmt! Montag bis Sonntag – das sind 7 Tage." },
    { f: "Ein Dreieck hat vier Ecken.", a: "Quatsch! Ein Dreieck hat drei Ecken." },
    { f: "Hühner legen Eier.", a: "Stimmt!" },
    { f: "Im Sommer ist es meistens kälter als im Winter.", a: "Quatsch! Im Sommer ist es meistens wärmer." },
    { f: "Ein Hund hat vier Beine.", a: "Stimmt!" },
    { f: "Nach dem Montag kommt der Mittwoch.", a: "Quatsch! Nach dem Montag kommt der Dienstag." }
  ]});

st({ id: "b-stimmt-steh34", typ: "bewegung", stufe: "34", titel: "Stimmt? Dann steh auf!",
  lk: "Der Satz steht an der Tafel (🔊 liest vor): Wer meint, er stimmt, steht auf – sonst bleibt man sitzen; dann tippst du auf „Lösung zeigen“.",
  auftrag: "Stimmt der Satz? Dann steh auf. Quatsch? Dann bleib sitzen.",
  items: [
    { f: "Ein Jahr hat 52 Wochen.", a: "Stimmt! Genauer: 52 Wochen und 1 Tag (im Schaltjahr 2 Tage)." },
    { f: "Ein Viereck mit vier gleich langen Seiten ist immer ein Quadrat.", a: "Quatsch! Es kann auch eine Raute sein – beim Quadrat müssen auch alle Ecken rechte Winkel sein." },
    { f: "Der Februar ist der kürzeste Monat.", a: "Stimmt! Er hat 28 Tage, im Schaltjahr 29." },
    { f: "7 · 8 = 54", a: "Quatsch! 7 · 8 = 56." },
    { f: "„Laufen“ ist ein Verb.", a: "Stimmt! Laufen ist ein Tun-Wort." },
    { f: "Ein Liter ist mehr als 1000 Milliliter.", a: "Quatsch! 1 Liter ist genau 1000 Milliliter." }
  ]});

st({ id: "b-zaehlen12", typ: "bewegung", stufe: "12", titel: "Zähl-Hüpfer",
  lk: "Die Regel steht an der Tafel – die Kinder zählen gemeinsam und hüpfen bei den genannten Zahlen.",
  auftrag: "Zählt zusammen. Bei diesen Zahlen hüpft ihr nur – ohne etwas zu sagen!",
  items: [
    { f: "Zählt bis 10. Bei 5 und 10 hüpfen." },
    { f: "Zählt bis 10. Bei jeder geraden Zahl (2, 4, 6 …) klatschen." },
    { f: "Zählt rückwärts von 10 bis 0. Bei 0 springen alle hoch!" },
    { f: "Zählt in Zweierschritten bis 20: 2, 4, 6 … – bei 10 und 20 hüpfen." }
  ]});

st({ id: "b-zaehlen34", typ: "bewegung", stufe: "34", titel: "Zähl-Klatscher",
  lk: "Die Klasse zählt der Reihe nach, jedes Kind sagt eine Zahl – bei der Regel an der Tafel wird geklatscht statt gesprochen.",
  auftrag: "Der Reihe nach sagt jedes Kind eine Zahl. Bei der Regel wird geklatscht statt gesprochen!",
  items: [
    { f: "Zählt bis 30. Bei jeder Zahl aus der 3er-Reihe: klatschen." },
    { f: "Zählt bis 40. Bei jeder Zahl mit einer 7 oder aus der 7er-Reihe: klatschen." },
    { f: "Zählt in 4er-Schritten bis 40. Bei 20 und 40 stehen alle auf." },
    { f: "Zählt rückwärts von 50 in 5er-Schritten. Bei 0 alle Arme hoch!" }
  ]});

st({ id: "b-spiegel", typ: "bewegung", stufe: "alle", titel: "Tafel-Kommando",
  lk: "Die Aufträge stehen an der Tafel (🔊 liest vor) – die Kinder machen sie am Platz.",
  auftrag: "Die Tafel gibt das Kommando: Macht genau das, was hier steht – am Platz.",
  items: [
    { f: "Beide Arme langsam hoch – und wieder runter." },
    { f: "Mit dem Kopf „Ja“ nicken, dann „Nein“ schütteln." },
    { f: "Auf einem Bein stehen – und das andere Bein." },
    { f: "Mit den Fingern Regen spielen: erst leise, dann ein Gewitter, dann wieder leise." },
    { f: "Ein trauriges, ein erstauntes und ein fröhliches Gesicht." },
    { f: "Ganz langsam strecken – so groß, wie ihr könnt." }
  ]});

/* ============================== STILLE ============================== */
st({ id: "s-atem", typ: "stille", stufe: "alle", titel: "Atem-Lichtung", art: "atem",
  lk: "Die Kinder atmen mit dem Kreis an der Tafel – du musst nichts sagen, nur ruhig mitmachen.",
  auftrag: "Setzt euch bequem hin. Atmet mit dem Kreis: Wird er groß – einatmen. Wird er klein – ausatmen." });

st({ id: "s-lauschen", typ: "stille", stufe: "alle", titel: "Lausch-Station",
  lk: "Alle schließen die Augen und lauschen – nach etwa einer Minute tippst du auf „Lösung zeigen“, dort steht „Augen auf!“.",
  auftrag: "Augen zu. Ganz still sein. Wie viele Geräusche könnt ihr hören?",
  items: [
    { f: "Augen zu … und lauschen. 👂", a: "Augen auf! Welche Geräusche habt ihr gehört? Was war am leisesten?" },
    { f: "Noch einmal: Augen zu. Jetzt hört ihr nur auf Geräusche von draußen.", a: "Was war draußen zu hören? Wer hat etwas gehört, das sonst niemand bemerkt hat?" }
  ]});

st({ id: "s-wald", typ: "stille", stufe: "12", titel: "Im Moos-Wald", art: "text",
  lk: "Tippe auf „Vorlesen lassen“ – die Tafel liest die Reise vor, die Kinder legen den Kopf auf die Arme und hören zu.",
  auftrag: "Legt den Kopf auf die Arme. Augen zu. Hört nur zu.",
  text:
`Stell dir vor, du gehst ganz langsam in einen Wald.
Unter deinen Füßen ist weiches Moos. Es federt bei jedem Schritt.
Die Sonne scheint durch die Blätter. Auf deiner Nase kitzelt ein warmer Lichtfleck.
Irgendwo klopft ein Specht. Tock … tock … tock.
Du setzt dich an einen dicken, alten Baum. Die Rinde ist rau und warm.
Du atmest ein … und aus. Ein … und aus.
Ein kleiner Fuchs schaut hinter einem Busch hervor. Er nickt dir zu, als wollte er sagen: „Gut gemacht.“
Dann huscht er davon.
Du bleibst noch einen Moment sitzen. Ganz ruhig.
Und jetzt kommst du langsam zurück in die Klasse. Du bewegst deine Finger … deine Füße … und öffnest die Augen.` });

st({ id: "s-zeitlupe", typ: "stille", stufe: "12", titel: "Schnecken-Zeitlupe",
  lk: "Die Aufträge stehen an der Tafel – alle machen sie so langsam und leise wie möglich.",
  auftrag: "Alles in Zeitlupe – so langsam wie eine Schnecke und so leise wie eine Feder.",
  items: [
    { f: "Steht so langsam auf, wie ihr könnt." },
    { f: "Hebt einen Arm – so langsam, dass man es kaum sieht." },
    { f: "Dreht euch einmal um euch selbst – ganz leise." },
    { f: "Setzt euch so leise hin, dass der Stuhl nichts sagt." },
    { f: "Legt die Hände auf den Tisch und seid zehn Atemzüge lang ganz still." }
  ]});

st({ id: "s-stillezahl", typ: "stille", stufe: "alle", titel: "Stille-Zahlen",
  lk: "Die Zahl steht an der Tafel – alle zählen mit geschlossenen Augen in Gedanken und öffnen dann leise die Augen.",
  auftrag: "Augen zu. Zählt in Gedanken bis zur Zahl – dann öffnet ihr ganz leise die Augen.",
  items: [
    { f: "Zählt in Gedanken bis 10." },
    { f: "Zählt in Gedanken bis 20 – ganz langsam." },
    { f: "Zählt in Gedanken rückwärts von 15 bis 0." },
    { f: "Atmet fünfmal tief ein und aus – dann Augen auf." }
  ]});

/* ============================== RÄTSEL ============================== */
st({ id: "r-dinge12", typ: "raetsel", stufe: "12", titel: "Rätsel-Höhle",
  lk: "Das Rätsel steht an der Tafel (🔊 liest vor) – erst wenn drei Ideen genannt sind, tippst du auf „Lösung zeigen“.",
  auftrag: "Was bin ich? Hört gut zu – und meldet euch.",
  items: [
    { f: "Ich habe Zähne, aber ich beiße nicht. Ich mache deine Haare ordentlich.", a: "Der Kamm" },
    { f: "Ich bin nass, wenn ich dich trocken mache.", a: "Das Handtuch" },
    { f: "Ich habe vier Beine, aber ich kann nicht laufen. Auf mir steht dein Teller.", a: "Der Tisch" },
    { f: "Ich habe ein Gesicht und zwei Zeiger, aber keine Augen.", a: "Die Uhr" },
    { f: "Ich bin voller Löcher und kann trotzdem Wasser halten.", a: "Der Schwamm" },
    { f: "Ich trage mein Haus immer auf dem Rücken. Ich bin langsam und hinterlasse eine Spur.", a: "Die Schnecke" }
  ]});

st({ id: "r-natur12", typ: "raetsel", stufe: "12", titel: "Wald-Rätsel",
  lk: "Das Rätsel steht an der Tafel (🔊 liest vor) – erst wenn drei Ideen genannt sind, tippst du auf „Lösung zeigen“.",
  auftrag: "Wer oder was bin ich? Hört gut zu!",
  items: [
    { f: "Ich bin klein und stachelig. Im Winter schlafe ich unter einem Laubhaufen.", a: "Der Igel" },
    { f: "Ich habe einen buschigen Schwanz und verstecke im Herbst Nüsse im Boden.", a: "Das Eichhörnchen" },
    { f: "Im Frühling bin ich grün, im Herbst bunt, und im Winter falle ich herunter.", a: "Das Blatt" },
    { f: "Ich klopfe mit meinem Schnabel Löcher in die Bäume.", a: "Der Specht" },
    { f: "Ich bin am Tag unsichtbar. Nachts leuchte ich am Himmel und bin manchmal rund und manchmal krumm.", a: "Der Mond" },
    { f: "Ich falle vom Himmel, aber ich tue niemandem weh. Danach gibt es Pfützen.", a: "Der Regen" }
  ]});

st({ id: "r-knobel34", typ: "raetsel", stufe: "34", titel: "Knobel-Höhle",
  lk: "Das Rätsel steht an der Tafel (🔊 liest vor) – erst flüstern die Kinder mit dem Nachbarn, dann tippst du auf „Lösung zeigen“.",
  auftrag: "Knobelt! Erst mit dem Nachbarn flüstern – dann melden.",
  items: [
    { f: "Was hat Städte ohne Häuser, Wälder ohne Bäume und Flüsse ohne Wasser?", a: "Eine Landkarte" },
    { f: "Was gehört dir, aber andere benutzen es viel öfter als du?", a: "Dein Name" },
    { f: "Ich habe viele Tasten, aber ich spiele keine Musik. Mit mir schreibt man am Computer.", a: "Die Tastatur" },
    { f: "Was kommt einmal in jeder Minute, zweimal in jedem Moment, aber nie in tausend Jahren?", a: "Der Buchstabe M" },
    { f: "Je mehr davon da ist, desto weniger siehst du.", a: "Die Dunkelheit (oder Nebel)" },
    { f: "Was kann man brechen, ohne es anzufassen?", a: "Ein Versprechen (oder das Schweigen)" }
  ]});

st({ id: "r-logik34", typ: "raetsel", stufe: "34", titel: "Denk-Höhle",
  lk: "Die Aufgabe steht an der Tafel (🔊 liest vor) – wer eine Lösung hat, sagt auch, warum.",
  auftrag: "Genau zuhören, genau denken! Wer eine Lösung hat, sagt auch, warum.",
  items: [
    { f: "Ein Bauer hat 7 Schafe. Alle bis auf 3 laufen weg. Wie viele Schafe hat er noch?", a: "3 – „alle bis auf 3“ heißt: 3 bleiben da." },
    { f: "Wie viele Monate haben 28 Tage?", a: "Alle 12! Jeder Monat hat mindestens 28 Tage." },
    { f: "Paula ist größer als Jonas. Jonas ist größer als Emma. Wer ist am kleinsten?", a: "Emma" },
    { f: "Ein Seil hat zwei Enden. Du schneidest es einmal in der Mitte durch. Wie viele Enden gibt es jetzt?", a: "4 – zwei Stücke mit je zwei Enden." },
    { f: "Vor dir liegen 3 Äpfel. Du nimmst 2 weg. Wie viele Äpfel hast du?", a: "2 – die zwei, die du genommen hast." },
    { f: "Eine Schnecke klettert am Tag 3 m eine 5 m hohe Mauer hoch und rutscht nachts 2 m zurück. Am wievielten Tag ist sie oben?", a: "Am 3. Tag: Nach 2 Tagen ist sie bei 2 m, am 3. Tag klettert sie 3 m und ist oben." }
  ]});

/* ============================== RECHNEN (Generatoren) ============================== */
st({ id: "m-schatz", typ: "rechnen", stufe: "alle", titel: "Zahlen-Mühle", gen: "schatzrechnen",
  lk: "Die Kinder rechnen im Kopf und melden sich – du tippst auf „Lösung“, dann geht es weiter.",
  auftrag: "Die Mühle dreht sich nur, wenn ihr richtig rechnet. Im Kopf rechnen – dann melden!" });

st({ id: "m-detektiv", typ: "rechnen", stufe: "alle", titel: "Zahlen-Detektiv", gen: "detektiv",
  lk: "Die Hinweise stehen an der Tafel (🔊 liest vor) – die Kinder sagen, welche Zahlen noch gehen.",
  auftrag: "Ich denke mir eine Zahl. Findet sie mit den Hinweisen!" });

st({ id: "m-muster", typ: "rechnen", stufe: "alle", titel: "Zahlen-Pfad", gen: "muster",
  lk: "Die Kinder sagen, wie es weitergeht, und vor allem, welche Regel dahintersteckt.",
  auftrag: "Auf dem Pfad liegen Zahlensteine. Wie geht es weiter? Und welche Regel steckt dahinter?" });

st({ id: "m-sach", typ: "rechnen", stufe: "alle", titel: "Rechen-Wiese", gen: "sachaufgaben",
  lk: "Die Aufgabe steht an der Tafel (🔊 liest vor) – die Kinder rechnen im Kopf und sagen den Rechenweg.",
  auftrag: "Rechengeschichten von der Wiese: Erst überlegen, dann rechnen, dann den Rechenweg sagen." });

/* ============================== LESEN ============================== */
st({ id: "l-karte12", typ: "lesen", stufe: "12", titel: "Lese-Baum",
  lk: "Ein Kind nach dem anderen liest einen Satz vor (oder du tippst auf Vorlesen) – danach kommen die Fragen.",
  auftrag: "Lest die Geschichte. Dann beantwortet ihr die Fragen.",
  text:
`Fritz ist ein kleiner Fuchs.
Er hat eine Karte.
Da kommt ein Wind.
Der Wind nimmt die Karte mit.
Die Karte fliegt über die Wiese.
Sie bleibt an einem Ast hängen.
Ein Eichhörnchen holt sie herunter.
Fritz sagt: „Danke!“`,
  items: [
    { f: "Was hat Fritz?", a: "Eine Karte" },
    { f: "Wer nimmt die Karte mit?", a: "Der Wind" },
    { f: "Wo bleibt die Karte hängen?", a: "An einem Ast" },
    { f: "Wer holt die Karte herunter?", a: "Ein Eichhörnchen" },
    { f: "Was sagt Fritz zum Schluss?", a: "„Danke!“" }
  ]});

st({ id: "l-igel12", typ: "lesen", stufe: "12", titel: "Lese-Baum",
  lk: "Ein Kind nach dem anderen liest einen Satz vor (oder du tippst auf Vorlesen) – danach kommen die Fragen.",
  auftrag: "Lest die Geschichte. Dann beantwortet ihr die Fragen.",
  text:
`Im Herbst wird es kalt.
Der Igel sucht ein Bett.
Unter dem Baum liegt Laub.
Der Igel kriecht in das Laub.
Er rollt sich zu einer Kugel.
Dann schläft er ein.
Er schläft bis zum Frühling.`,
  items: [
    { f: "Wann wird es kalt?", a: "Im Herbst" },
    { f: "Was sucht der Igel?", a: "Ein Bett (einen Platz zum Schlafen)" },
    { f: "Wo kriecht der Igel hinein?", a: "In das Laub unter dem Baum" },
    { f: "Wie liegt der Igel beim Schlafen?", a: "Zu einer Kugel gerollt" },
    { f: "Wie lange schläft der Igel?", a: "Bis zum Frühling" }
  ]});

st({ id: "l-bach12", typ: "lesen", stufe: "12", titel: "Lese-Baum",
  lk: "Ein Kind nach dem anderen liest einen Satz vor (oder du tippst auf Vorlesen) – danach kommen die Fragen.",
  auftrag: "Lest die Geschichte. Dann beantwortet ihr die Fragen.",
  text:
`Mia und Ben gehen zum Bach.
Ben hat ein Boot aus Papier.
Mia hat ein Boot aus Holz.
Sie setzen die Boote auf das Wasser.
Das Papierboot wird nass und geht unter.
Das Holzboot schwimmt weiter.
Ben ist traurig.
Mia sagt: „Wir bauen morgen ein Holzboot für dich.“`,
  items: [
    { f: "Wohin gehen Mia und Ben?", a: "Zum Bach" },
    { f: "Woraus ist das Boot von Ben?", a: "Aus Papier" },
    { f: "Welches Boot geht unter?", a: "Das Papierboot" },
    { f: "Warum ist Ben traurig?", a: "Sein Boot ist untergegangen." },
    { f: "Was will Mia morgen machen?", a: "Mit Ben ein Holzboot für ihn bauen" }
  ]});

st({ id: "l-karte34", typ: "lesen", stufe: "aus", titel: "Lese-Baum",
  lk: "Kinder lesen reihum je einen Satz laut vor – bei den Fragen müssen sie die Stelle im Text zeigen können.",
  auftrag: "Lest den Text genau. Bei jeder Antwort: Wo steht das im Text?",
  text:
`Fuchs Fritz zeichnet seit vielen Jahren Karten vom Wald. Auf seiner wichtigsten Karte ist ein Weg eingezeichnet, der zu einem alten Schatz führt.
An einem stürmischen Dienstag sitzt Fritz auf dem Hügel und ergänzt gerade die Mühle am Bach. Plötzlich reißt eine Windböe ihm die Karte aus den Pfoten. Sie zerreißt in mehrere Stücke, die in alle Richtungen fliegen.
Fritz ist verzweifelt. Allein findet er die Stücke nie, denn manche liegen in der Höhle, andere auf der Wiese und eines sogar am Brunnen.
Da hat er eine Idee: Eine ganze Schulklasse könnte ihm helfen! Wenn alle zusammenarbeiten, ist die Karte bald wieder ganz.`,
  items: [
    { f: "Was macht Fritz seit vielen Jahren?", a: "Er zeichnet Karten vom Wald." },
    { f: "An welchem Tag passiert das Unglück?", a: "An einem (stürmischen) Dienstag" },
    { f: "Was zeichnet Fritz gerade, als die Böe kommt?", a: "Die Mühle am Bach" },
    { f: "Warum findet Fritz die Stücke nicht allein?", a: "Sie liegen an vielen verschiedenen Orten verteilt." },
    { f: "Was ist Fritz' Idee?", a: "Eine Schulklasse soll ihm helfen." }
  ]});

st({ id: "l-eiche34", typ: "lesen", stufe: "34", titel: "Lese-Baum",
  lk: "Kinder lesen reihum je einen Satz laut vor – bei den Fragen müssen sie die Stelle im Text zeigen können.",
  auftrag: "Lest den Sachtext genau. Bei jeder Antwort: Wo steht das im Text?",
  text:
`Eichen gehören zu den ältesten Bäumen in unseren Wäldern. Manche Eichen sind mehrere hundert Jahre alt. Wie alt ein Baum ist, kann man an einem Baumstumpf erkennen: Jedes Jahr wächst ein neuer Ring dazu. Man nennt sie Jahresringe.
Eine große Eiche ist ein Zuhause für viele Tiere. In ihrer Rinde leben Käfer und Spinnen. Spechte bauen Höhlen in den Stamm. Eichhörnchen und Eichelhäher sammeln im Herbst die Früchte der Eiche, die Eicheln. Sie verstecken sie als Vorrat im Boden. Manche Eicheln werden vergessen – und daraus wächst irgendwann eine neue Eiche.`,
  items: [
    { f: "Woran erkennt man, wie alt ein Baum ist?", a: "An den Jahresringen im Baumstumpf" },
    { f: "Wie heißen die Früchte der Eiche?", a: "Eicheln" },
    { f: "Wer baut Höhlen in den Stamm?", a: "Spechte" },
    { f: "Welche Tiere sammeln Eicheln? Nenne zwei.", a: "Eichhörnchen und Eichelhäher" },
    { f: "Wie hilft das Vergessen der Tiere dem Wald?", a: "Aus vergessenen Eicheln wachsen neue Eichen." }
  ]});

st({ id: "l-muehle34", typ: "lesen", stufe: "34", titel: "Lese-Baum",
  lk: "Kinder lesen reihum je einen Satz laut vor – bei den Fragen müssen sie die Stelle im Text zeigen können.",
  auftrag: "Lest den Text genau. Bei jeder Antwort: Wo steht das im Text?",
  text:
`Früher gab es in fast jedem Dorf eine Mühle. Dorthin brachten die Bauern ihr Getreide. Der Müller mahlte es zwischen zwei schweren Steinen zu Mehl.
Damit sich die Steine drehten, brauchte die Mühle Kraft. Eine Windmühle bekam die Kraft vom Wind, eine Wassermühle vom Wasser eines Baches. Das Wasser floss über ein großes Rad und drehte es.
Wenn kein Wind wehte oder der Bach im Sommer zu wenig Wasser hatte, stand die Mühle still. Dann mussten die Bauern warten. Heute wird Mehl meistens in großen Fabriken mit Strom gemahlen.`,
  items: [
    { f: "Was brachten die Bauern zur Mühle?", a: "Ihr Getreide" },
    { f: "Womit mahlte der Müller das Getreide?", a: "Mit zwei schweren Steinen" },
    { f: "Woher bekam eine Wassermühle ihre Kraft?", a: "Vom Wasser eines Baches, das ein Rad drehte" },
    { f: "Wann stand eine Wassermühle still?", a: "Wenn der Bach (im Sommer) zu wenig Wasser hatte" },
    { f: "Wie wird Mehl heute meistens gemahlen?", a: "In großen Fabriken mit Strom" }
  ]});

/* ============================== WÖRTER ============================== */
st({ id: "w-salat", typ: "woerter", stufe: "alle", titel: "Buchstaben-Brücke", gen: "salat",
  lk: "Die Buchstaben sind durcheinander – die Kinder melden sich mit dem Wort, ein Kind darf es buchstabieren.",
  auftrag: "Der Wind hat die Buchstaben durcheinander gepustet. Welches Wort ist es?" });

st({ id: "w-bau12", typ: "woerter", stufe: "12", titel: "Wörter-Werkstatt",
  lk: "Die Frage steht an der Tafel (🔊 liest vor) – die Kinder bauen aus zwei Wörtern ein neues Wort.",
  auftrag: "Aus zwei Wörtern wird ein neues Wort. Wie heißt es?",
  items: [
    { f: "Ein Mann aus Schnee ist ein …", a: "Schneemann" },
    { f: "Eine Tasche für die Schule ist eine …", a: "Schultasche" },
    { f: "Ein Haus oben im Baum ist ein …", a: "Baumhaus" },
    { f: "Eine Brille gegen die Sonne ist eine …", a: "Sonnenbrille" },
    { f: "Ein Topf für Blumen ist ein …", a: "Blumentopf" },
    { f: "Eine Hütte für den Hund ist eine …", a: "Hundehütte" },
    { f: "Ein Schuh für die Hand ist ein …", a: "Handschuh" }
  ]});

st({ id: "w-bruecke34", typ: "woerter", stufe: "34", titel: "Wort-Brücke",
  lk: "Das fehlende Wort passt hinten an das erste und vorn an das zweite Wort – die Kinder flüstern erst mit dem Nachbarn.",
  auftrag: "Welches Wort baut die Brücke? Es passt hinten an das erste und vorn an das zweite Wort.",
  items: [
    { f: "Fuß ▢ Spiel", a: "Ball → Fußball, Ballspiel" },
    { f: "Tür ▢ Bund", a: "Schlüssel → Türschlüssel, Schlüsselbund" },
    { f: "Apfel ▢ Haus", a: "Baum → Apfelbaum, Baumhaus" },
    { f: "Kinder ▢ Zaun", a: "Garten → Kindergarten, Gartenzaun" },
    { f: "Hand ▢ Karton", a: "Schuh → Handschuh, Schuhkarton" },
    { f: "Sonnen ▢ Topf", a: "Blume(n) → Sonnenblume, Blumentopf" },
    { f: "Regen ▢ Schütze", a: "Bogen → Regenbogen, Bogenschütze" },
    { f: "Schnee ▢ Schaft", a: "Mann → Schneemann, Mannschaft" }
  ]});

st({ id: "w-unsinn12", typ: "woerter", stufe: "12", titel: "Quatsch-Brücke",
  lk: "Ein Kind liest den Satz vor – die Klasse sagt, was daran Quatsch ist, und wie der Satz richtig heißt.",
  auftrag: "Lest genau! Was ist an dem Satz Quatsch?",
  items: [
    { f: "Der Fisch klettert auf den Baum.", a: "Fische können nicht klettern – sie schwimmen im Wasser." },
    { f: "Im Winter baden wir im See und essen Eis.", a: "Im Winter ist es zu kalt zum Baden – das machen wir im Sommer." },
    { f: "Die Katze bellt laut.", a: "Katzen miauen – Hunde bellen." },
    { f: "Ich putze mir mit der Gabel die Zähne.", a: "Zum Zähneputzen nimmt man eine Zahnbürste." },
    { f: "Der Mond scheint am Mittag hell in mein Zimmer.", a: "Mittags scheint die Sonne – der Mond leuchtet nachts." }
  ]});

st({ id: "w-unsinn34", typ: "woerter", stufe: "34", titel: "Quatsch-Brücke",
  lk: "Ein Kind liest den Satz vor – die Klasse findet den Fehler und begründet ihn.",
  auftrag: "Genau lesen! Ein Teil des Satzes passt nicht. Welcher – und warum?",
  items: [
    { f: "Im Dezember blühen auf der Wiese die Kirschbäume.", a: "Kirschbäume blühen im Frühling (April/Mai), nicht im Dezember." },
    { f: "Weil es so heiß war, zog Lena ihre dicke Winterjacke an.", a: "Bei Hitze zieht man keine Winterjacke an – „weil“ passt nicht." },
    { f: "Der Igel sammelte im Herbst Nüsse und versteckte sie im Boden.", a: "Das macht das Eichhörnchen. Der Igel frisst Insekten, Würmer und Schnecken." },
    { f: "Nach dem Abendessen frühstückte die Familie.", a: "Nach dem Abendessen kommt kein Frühstück – das gibt es morgens." },
    { f: "Der Hahn legte jeden Morgen ein Ei.", a: "Eier legen die Hennen – ein Hahn legt keine Eier." },
    { f: "Tom war der Kleinste der Klasse, deshalb holte er das Buch vom obersten Regal.", a: "„Deshalb“ passt nicht – der Kleinste kommt am schwersten an das oberste Regal." }
  ]});

st({ id: "w-reim12", typ: "woerter", stufe: "12", titel: "Reim-Brunnen",
  lk: "Die Kinder rufen Reimwörter in den Brunnen – erst danach deckst du die Beispiele auf.",
  auftrag: "Was reimt sich auf das Wort? Ruft so viele Reimwörter, wie ihr findet!",
  items: [
    { f: "Haus", a: "Maus, Laus, raus, Klaus, Strauß …" },
    { f: "Baum", a: "Traum, Schaum, Raum, kaum, Saum …" },
    { f: "Hand", a: "Sand, Wand, Band, Land, Rand …" },
    { f: "Hose", a: "Rose, Dose, lose, Soße …" },
    { f: "Kuchen", a: "suchen, fluchen, buchen …" },
    { f: "Stein", a: "Bein, klein, fein, mein, Schwein, nein …" }
  ]});

st({ id: "w-kette34", typ: "woerter", stufe: "34", titel: "Wort-Kette",
  lk: "Reihum sagt jedes Kind ein Nomen, das mit dem letzten Buchstaben des vorigen Wortes beginnt – wer hängt, darf einen Joker fragen.",
  auftrag: "Das neue Wort beginnt mit dem letzten Buchstaben des alten Wortes. Nur Nomen! Wie lang wird eure Kette?",
  items: [
    { f: "Start: WALD", a: "Zum Beispiel: Wald → Drache → Esel → Löwe → Eule → Elefant → …" },
    { f: "Start: SCHATZ", a: "Zum Beispiel: Schatz → Zahn → Nase → Esel → Laterne → …" },
    { f: "Schwer: Nur Tiere! Start: FUCHS", a: "Zum Beispiel: Fuchs → Schaf → Frosch → Hase → Esel → Lama → …" }
  ]});

/* ============================== WISSEN (Sachunterricht) ============================== */
st({ id: "k-wald12", typ: "wissen", stufe: "12", titel: "Forscher-Hügel",
  lk: "Der Satz steht an der Tafel (🔊 liest vor): Daumen hoch für „stimmt“, runter für „Quatsch“ – dann tippst du auf „Lösung zeigen“.",
  auftrag: "Stimmt das – oder ist es Quatsch? Zeigt es mit dem Daumen! 👍 👎",
  items: [
    { f: "Igel halten im Winter einen Winterschlaf.", a: "Stimmt! Sie schlafen von etwa November bis März in einem Laubhaufen." },
    { f: "Spinnen sind Insekten.", a: "Quatsch! Spinnen haben 8 Beine, Insekten nur 6." },
    { f: "Ein Fuchs ist mit dem Hund verwandt.", a: "Stimmt! Füchse gehören zur Familie der Hunde." },
    { f: "Regenwürmer haben Augen.", a: "Quatsch! Sie haben keine Augen. Sie spüren Licht mit ihrer Haut." },
    { f: "Aus einer Kaulquappe wird ein Frosch.", a: "Stimmt! Ihr wachsen Beine und der Schwanz verschwindet." },
    { f: "Eichhörnchen schlafen den ganzen Winter durch.", a: "Quatsch! Sie ruhen viel, wachen aber auf und fressen ihre Vorräte." }
  ]});

st({ id: "k-himmel12", typ: "wissen", stufe: "12", titel: "Forscher-Hügel",
  lk: "Der Satz steht an der Tafel (🔊 liest vor): Daumen hoch für „stimmt“, runter für „Quatsch“ – dann tippst du auf „Lösung zeigen“.",
  auftrag: "Stimmt das – oder ist es Quatsch? Zeigt es mit dem Daumen! 👍 👎",
  items: [
    { f: "Der Mond leuchtet selbst wie eine Lampe.", a: "Quatsch! Der Mond wird von der Sonne angestrahlt." },
    { f: "Fledermäuse sind Vögel.", a: "Quatsch! Fledermäuse sind Säugetiere – ihre Babys trinken Milch." },
    { f: "Am Baumstumpf kann man zählen, wie alt der Baum war.", a: "Stimmt! Jedes Jahr kommt ein Ring dazu." },
    { f: "Pinguine leben am Nordpol.", a: "Quatsch! Pinguine leben im Süden, zum Beispiel am Südpol." },
    { f: "Bienen machen Honig aus dem Saft von Blüten.", a: "Stimmt! Den Blütensaft nennt man Nektar." },
    { f: "Ein Schmetterling war vorher eine Raupe.", a: "Stimmt! Die Raupe verpuppt sich und wird zum Schmetterling." }
  ]});

st({ id: "k-natur34", typ: "wissen", stufe: "34", titel: "Forscher-Hügel",
  lk: "Der Satz steht an der Tafel (🔊 liest vor): Daumen hoch oder runter – erst wenn ein Kind begründet hat, tippst du auf „Lösung zeigen“.",
  auftrag: "Stimmt das – oder ist es Quatsch? Daumen zeigen – und begründen! 👍 👎",
  items: [
    { f: "Schnecken haben Zähne.", a: "Stimmt! Auf ihrer Raspelzunge sitzen tausende winzige Zähnchen." },
    { f: "Wale sind Fische.", a: "Quatsch! Wale sind Säugetiere: Sie atmen Luft und säugen ihre Jungen." },
    { f: "Ein Maulwurf frisst die Wurzeln von Pflanzen.", a: "Quatsch! Er frisst vor allem Regenwürmer und Insektenlarven." },
    { f: "Eine Eiche kann über 500 Jahre alt werden.", a: "Stimmt! Manche Eichen werden sogar über 1000 Jahre alt." },
    { f: "Wenn man einen Regenwurm teilt, entstehen zwei Regenwürmer.", a: "Quatsch! Meistens stirbt der Wurm – höchstens das vordere Stück kann überleben." },
    { f: "Ameisen können viel mehr tragen, als sie selbst wiegen.", a: "Stimmt! Ein Vielfaches ihres eigenen Gewichts." }
  ]});

st({ id: "k-erde34", typ: "wissen", stufe: "34", titel: "Forscher-Hügel",
  lk: "Der Satz steht an der Tafel (🔊 liest vor): Daumen hoch oder runter – erst wenn ein Kind begründet hat, tippst du auf „Lösung zeigen“.",
  auftrag: "Stimmt das – oder ist es Quatsch? Daumen zeigen – und begründen! 👍 👎",
  items: [
    { f: "Die Sonne geht im Westen auf.", a: "Quatsch! Sie geht im Osten auf und im Westen unter." },
    { f: "Die Erde dreht sich an einem Tag einmal um die Sonne.", a: "Quatsch! An einem Tag dreht sie sich einmal um sich selbst. Um die Sonne braucht sie ein Jahr." },
    { f: "Ein Blitz ist heißer als die Oberfläche der Sonne.", a: "Stimmt! Ein Blitz ist ungefähr fünfmal so heiß." },
    { f: "Auf einem hohen Berg kocht Wasser schon bei weniger als 100 Grad.", a: "Stimmt! Oben ist weniger Luftdruck – darum kocht Wasser früher." },
    { f: "Eis ist schwerer als Wasser und geht deshalb unter.", a: "Quatsch! Eis ist leichter und schwimmt oben – darum frieren Seen von oben zu." },
    { f: "Pflanzen brauchen Licht, um zu wachsen.", a: "Stimmt! Mit Licht stellen sie in den Blättern ihre Nahrung her." }
  ]});

/* ============================== GENERATOREN ============================== */
const z = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const misch = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const GEN = {
    schatzrechnen(stufe){
        const it = [], schon = new Set();
        while (it.length < 6){
            let f, a;
            if (stufe === "12"){
                const art = it.length % 3;
                if (art === 0){ const x = z(3, 12), y = z(2, 20 - x); f = `${x} + ${y}`; a = x + y; }
                else if (art === 1){ const x = z(8, 20), y = z(2, x - 1); f = `${x} − ${y}`; a = x - y; }
                else { const x = z(2, 9), y = z(2, 9); const s = x + y; f = `${x} + ▢ = ${s}`; a = y; }
            } else {
                const art = it.length % 3;
                if (art === 0){ const x = z(3, 9), y = z(3, 9); f = `${x} · ${y}`; a = x * y; }
                else if (art === 1){ const x = z(12, 89), y = z(11, 99 - x); f = `${x} + ${y}`; a = x + y; }
                else { const y = z(3, 9), e = z(3, 9); f = `${y * e} : ${y}`; a = e; }
            }
            if (schon.has(f)) continue; schon.add(f);
            it.push({ f: f + (String(f).includes("▢") ? "" : " = ?"), a: String(a) });
        }
        return it;
    },
    detektiv(stufe){
        const it = [];
        for (let n = 0; n < 3; n++){
            const max = stufe === "12" ? 20 : 100;
            const zahl = z(stufe === "12" ? 5 : 15, max - 2);
            const lo = Math.max(1, zahl - z(2, stufe === "12" ? 4 : 12)), hi = Math.min(max, zahl + z(2, stufe === "12" ? 4 : 12));
            const tipps = [`Meine Zahl ist größer als ${lo} und kleiner als ${hi}.`];
            let kand = []; for (let k = lo + 1; k < hi; k++) kand.push(k);
            const gerade = zahl % 2 === 0;
            tipps.push(`Meine Zahl ist ${gerade ? "gerade" : "ungerade"}.`); kand = kand.filter(k => (k % 2 === 0) === gerade);
            if (stufe === "34" && kand.length > 1){
                const qs = String(zahl).split("").reduce((s, c) => s + +c, 0);
                tipps.push(`Wenn man ihre Ziffern zusammenzählt, kommt ${qs} heraus.`);
                kand = kand.filter(k => String(k).split("").reduce((s, c) => s + +c, 0) === qs);
            }
            while (kand.length > 1){
                const weg = misch(kand.filter(k => k !== zahl))[0];
                tipps.push(`Meine Zahl ist nicht ${weg}.`);
                kand = kand.filter(k => k !== weg);
            }
            it.push({ f: tipps.join("\n"), a: `Die Zahl ist ${zahl}.` });
        }
        return it;
    },
    muster(stufe){
        const it = [];
        const regeln = stufe === "12"
            ? [() => { const s = z(1, 6), d = 2; return [s, d, `immer + ${d}`]; }, () => { const s = z(0, 5), d = 5; return [s, d, `immer + ${d}`]; },
               () => { const s = z(15, 20), d = -1; return [s, d, "immer − 1"]; }, () => { const s = z(1, 4), d = 3; return [s, d, "immer + 3"]; },
               () => { const s = z(20, 24), d = -2; return [s, d, "immer − 2"]; }]
            : [() => { const s = z(2, 5); return [s, "x2", "immer · 2 (verdoppeln)"]; }, () => { const s = z(10, 40), d = 25; return [s, d, "immer + 25"]; },
               () => { const s = z(90, 100), d = -7; return [s, d, "immer − 7"]; }, () => { const s = z(1, 9); return [s, "+1+2", "+ 1, + 2, + 3, + 4 … (immer eins mehr dazu)"]; },
               () => { const s = z(5, 20); return [s, "+10-5", "abwechselnd + 10 und − 5"]; }];
        misch(regeln).slice(0, 4).forEach(r => {
            const [s, d, text] = r(); const reihe = [s];
            for (let i = 1; i < 6; i++){
                const v = reihe[i - 1];
                if (d === "x2") reihe.push(v * 2);
                else if (d === "+1+2") reihe.push(v + i);
                else if (d === "+10-5") reihe.push(v + (i % 2 ? 10 : -5));
                else reihe.push(v + d);
            }
            it.push({ f: reihe.slice(0, 4).join(" · ") + " · ? · ?", a: `${reihe[4]} und ${reihe[5]} – Regel: ${text}` });
        });
        return it;
    },
    sachaufgaben(stufe){
        const A12 = [
            () => { const a = z(3, 8), b = z(2, 7); return [`Fritz findet ${a} Pilze. Dann findet er noch ${b} Pilze. Wie viele Pilze hat er jetzt?`, `${a} + ${b} = ${a + b} Pilze`]; },
            () => { const a = z(9, 18), b = z(2, a - 3); return [`Auf der Wiese sitzen ${a} Vögel. ${b} Vögel fliegen weg. Wie viele sitzen noch da?`, `${a} − ${b} = ${a - b} Vögel`]; },
            () => { const a = z(2, 5); return [`${a} Hasen sitzen am Bach. Jeder Hase hat 2 lange Ohren. Wie viele Ohren sind das?`, `${a} · 2 = ${a * 2} Ohren (oder ${Array(a).fill(2).join(" + ")})`]; },
            () => { const a = z(4, 9), b = z(2, 4); return [`Am Brunnen stehen ${a} Kinder. ${b} Kinder kommen dazu, dann gehen 2 Kinder nach Hause. Wie viele Kinder sind jetzt am Brunnen?`, `${a} + ${b} − 2 = ${a + b - 2} Kinder`]; },
            () => { const a = z(2, 4) * 2; return [`Fritz hat ${a} Nüsse. Er teilt sie gerecht mit seiner Schwester. Wie viele bekommt jeder?`, `${a} : 2 = ${a / 2} Nüsse`]; }
        ];
        const A34 = [
            () => { const a = z(4, 9), p = z(3, 8); return [`Fritz kauft ${a} Äpfel. Jeder Apfel kostet ${p}0 Cent. Wie viel muss er bezahlen?`, `${a} · ${p}0 ct = ${a * p * 10} ct = ${(a * p / 10).toFixed(2).replace(".", ",")} €`]; },
            () => { const k = z(3, 6), j = z(4, 8); return [`In der Höhle liegen ${k} Kisten. In jeder Kiste sind ${j} Goldmünzen. Fritz nimmt 5 Münzen heraus. Wie viele bleiben übrig?`, `${k} · ${j} = ${k * j}, ${k * j} − 5 = ${k * j - 5} Münzen`]; },
            () => { const s = z(8, 10), m = z(15, 40); return [`Die Wanderung beginnt um ${s}:00 Uhr und dauert ${m} Minuten. Wann ist die Gruppe am Ziel?`, `${s}:${String(m).padStart(2, "0")} Uhr`]; },
            () => { const n = z(3, 8), e = 4; return [`${n * e} Kinder wollen Boot fahren. In ein Boot passen ${e} Kinder. Wie viele Boote brauchen sie?`, `${n * e} : ${e} = ${n} Boote`]; },
            () => { const n = z(2, 6) * 6 + z(1, 5); const b = Math.ceil(n / 6); return [`${n} Kinder fahren mit Autos zum Wald. In jedes Auto passen 6 Kinder. Wie viele Autos brauchen sie?`, `${n} : 6 = ${Math.floor(n / 6)} Rest ${n % 6} – also ${b} Autos, damit niemand zurückbleibt!`]; },
            () => { const a = z(120, 380), b = z(110, 400); return [`Fritz läuft am Vormittag ${a} m und am Nachmittag ${b} m. Wie weit ist er insgesamt gelaufen? Ist das mehr als ein Kilometer?`, `${a} + ${b} = ${a + b} m – ${a + b > 1000 ? "ja, mehr als 1 km" : "nein, weniger als 1 km (1 km = 1000 m)"}`]; }
        ];
        return misch(stufe === "12" ? A12 : A34).slice(0, 4).map(g => { const [f, a] = g(); return { f, a }; });
    },
    salat(stufe){
        const W = stufe === "12"
            ? [["BAUM", "im Wald"], ["HASE", "ein Tier"], ["MAUS", "ein Tier"], ["NASE", "im Gesicht"], ["ROSE", "eine Blume"], ["SONNE", "am Himmel"], ["BALL", "zum Spielen"], ["FUCHS", "ein Tier"], ["WALD", "viele Bäume"], ["HAND", "am Körper"]]
            : [["SCHATZ", "liegt in der Kiste"], ["WIESE", "voller Blumen"], ["BRÜCKE", "über den Bach"], ["KOMPASS", "zeigt die Richtung"], ["HÖHLE", "dunkel und im Fels"], ["EICHHÖRNCHEN", "ein Tier im Baum"], ["WANDERN", "ein Tun-Wort"], ["SCHMETTERLING", "fliegt bunt"], ["LANDKARTE", "zeigt den Weg"], ["SPECHT", "klopft am Baum"]];
        return misch(W).slice(0, 5).map(([w, h]) => {
            let s = w; let n = 0;
            while ((s === w || s.slice(0, 2) === w.slice(0, 2)) && n++ < 30) s = misch(w.split("")).join("");
            return { f: s.split("").join(" ") + "\n(Tipp: " + h + ")", a: w };
        });
    }
};

window.VK_STATIONEN = S;
window.VK_GEN = GEN;
})();
