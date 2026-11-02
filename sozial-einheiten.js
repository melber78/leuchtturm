/* ============================================================
   Leuchtturm – Sozialtraining: fertige Stunden (Vorlagen)
   Diese Datei kommt per Update und wird dabei ersetzt.
   Eigene und bearbeitete Stunden liegen NICHT hier, sondern auf
   dem Server in material-daten/sozialtraining.json.

   Textfelder verstehen eine kleine Schreibweise:
     Leerzeile = neuer Absatz · "- " = Aufzählung · "1. " = Nummerierung
     **fett** · *kursiv* · "### " = Zwischenüberschrift

   Aufgabentypen der Arbeitsblätter:
     schreiben   {text, zeilen}
     ankreuzen   {text, optionen[], nebeneinander}
     zuordnen    {text, links[], rechts[]}
     tabelle     {text, spalten[], zeilen[[…]]}   leere Zelle = Schreiblinie
     luecken     {text, saetze[], nummern}        ___ = Schreiblinie
     gesichter   {text, gefuehle[], leer}         leer = Kinder malen selbst
     malen       {text, bild}                     Malfeld füllt den Rest der Seite
   ============================================================ */

window.SOZIAL_KATEGORIEN = [
    "Gefühle", "Konflikte lösen", "Freundschaft", "Regeln & Miteinander",
    "Selbstwert & Stärken", "Kommunikation", "Kooperation & Teamgeist",
    "Achtsamkeit & Ruhe", "Vielfalt & Respekt", "Sonstiges"
];

window.SOZIAL_RITUALE_STANDARD =
`### Begrüßung (1 Min)
Alle sitzen an ihrem Platz. Du gehst mit dem Redestein durch die Reihe; das Kind, bei dem er liegt, steht kurz auf und sagt „Hallo, ich bin da!“ – die anderen winken zurück. Kl. 3/4 ergänzen: „… und heute freue ich mich auf …“

### Gefühlsbarometer (4 Min)
Ein Plakat mit vier Feldern (froh – traurig – wütend – ängstlich), dazu in der Mitte „ruhig“. Die Kinder kommen nacheinander nach vorn und stecken ihre Namensklammer an ein Feld. Kl. 1/2 dürfen nur zeigen, Kl. 3/4 sagen einen Satz dazu. Niemand muss erklären.

### Gesprächsregeln (hängen sichtbar)
1. Wer den Redestein hat, spricht.
2. Wir hören zu und lachen niemanden aus.
3. Ich darf „Ich passe“ sagen.
4. Was hier gesagt wird, bleibt hier.

### Abschluss (5 Min)
Jedes Kind nennt einen Satz: „Heute habe ich gelernt …“ (Kl. 1/2 auch per Daumen hoch/mittel/runter). Danach die **Applauswelle**: Du zeigst nacheinander auf jeden Platz, das Kind klatscht einmal – so läuft eine Welle durch den Raum, zum Schluss klatschen alle gemeinsam.

### Belohnung (optional)
Ein Sammelglas für die Gruppe. Für jede gelungene Stunde kommt eine Murmel hinein; bei 10 Murmeln gibt es ein Gruppenspiel nach Wahl.`;

/* Ablauf, mit dem jede neue Stunde startet */
window.SOZIAL_VERLAUF_STANDARD = [
    { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Gefühlsbarometer (zeigen)", k34: "Begrüßung, Gefühlsbarometer (ein Satz)" },
    { zeit: "5–13",  phase: "Lerntext",     k12: "", k34: "" },
    { zeit: "13–25", phase: "Übung",        k12: "", k34: "" },
    { zeit: "25–35", phase: "Arbeitsblatt", k12: "AB 1/2", k34: "AB 3/4" },
    { zeit: "35–40", phase: "Abschluss",    k12: "Daumenrunde, Applauswelle", k34: "„Heute habe ich gelernt …“, Applauswelle" }
];

/* Helfer für weitere Vorlagen-Dateien (sozial-einheiten-2.js usw.):
   ergänzt die Dauer und baut den Stundenverlauf aus Lerntexten, Übungen und
   Arbeitsblättern, wenn eine Stunde keinen eigenen Verlauf mitbringt. */
window.SOZIAL_EINHEIT = function (o) {
    o.dauer = o.dauer || 40;
    if (!o.verlauf) {
        const namen = stufe => (o.uebungen || []).filter(u => u.fuer === "alle" || u.fuer === stufe).map(u => u.titel).join(", ");
        o.verlauf = [
            { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Gefühlsbarometer (zeigen)", k34: "Begrüßung, Gefühlsbarometer (ein Satz)" },
            { zeit: "5–13",  phase: "Lerntext",     k12: "„" + o.lerntext12.titel + "“ hören, kurzes Gespräch", k34: "„" + o.lerntext34.titel + "“ hören, Fragen besprechen" },
            { zeit: "13–25", phase: "Übung",        k12: namen("12"), k34: namen("34") },
            { zeit: "25–35", phase: "Arbeitsblatt", k12: "AB 1/2: " + o.ab12.titel, k34: "AB 3/4: " + o.ab34.titel },
            { zeit: "35–40", phase: "Abschluss",    k12: "Daumenrunde, Applauswelle", k34: "„Heute habe ich gelernt …“, Applauswelle" }
        ];
    }
    return o;
};

window.SOZIAL_VORLAGEN = [

/* ------------------------------------------------------------ */
{
    id: "v-gefuehle-erkennen",
    titel: "Gefühle erkennen",
    kategorie: "Gefühle",
    dauer: 40,
    ziel12: "Vier Grundgefühle benennen und im Gesicht erkennen",
    ziel34: "Gefühle fein unterscheiden, Körpersignale deuten, Gefühle anderer einschätzen",
    material: "4 Gefühlskarten (froh, traurig, wütend, ängstlich), groß ausgedruckt\nHandspiegel (1–2 Stück)",
    verlauf: [
        { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Gefühlsbarometer (zeigen)", k34: "Begrüßung, Gefühlsbarometer (ein Satz)" },
        { zeit: "5–13",  phase: "Lerntext",     k12: "„Paul und der verlorene Ball“ hören, Gefühlskarten zuordnen", k34: "„Lena und der erste Tag“ hören, Fragen im Gespräch beantworten" },
        { zeit: "13–25", phase: "Übung",        k12: "Gefühle-Pantomime, Spiegelspiel", k34: "Gefühle-Pantomime als Rater, Gefühlsdetektiv" },
        { zeit: "25–35", phase: "Arbeitsblatt", k12: "AB 1/2: Gesichter malen und zuordnen", k34: "AB 3/4: Körpersignale und Situationen" },
        { zeit: "35–40", phase: "Abschluss",    k12: "Daumenrunde, Applauswelle", k34: "„Heute habe ich gelernt …“, Applauswelle" }
    ],
    lerntext12: {
        titel: "Paul und der verlorene Ball",
        text:
`Paul hat einen roten Ball. Er spielt jeden Tag damit. Paul ist **froh**.

Auf einmal ist der Ball weg. Paul sucht überall. Er findet ihn nicht. Paul ist **traurig**. Seine Augen werden nass.

Da sieht er Tom. Tom hat den Ball! „Das ist meiner!“, ruft Paul. Sein Gesicht wird rot. Er stampft mit dem Fuß. Paul ist **wütend**.

Tom sagt: „Ich habe ihn im Gebüsch gefunden. Hier, bitte.“ Paul atmet tief durch. Jetzt lacht er wieder. „Danke, Tom! Wollen wir zusammen spielen?“

**Nach dem Vorlesen:** Die Kinder halten bei jedem Gefühlswort die passende Gefühlskarte hoch. Frage: „Woran hast du gemerkt, wie Paul sich fühlt?“`
    },
    lerntext34: {
        titel: "Lena und der erste Tag",
        text:
`Lena ist neu in der Klasse. Als sie am Morgen vor der Tür steht, klopft ihr Herz schnell. Ihre Hände sind feucht, und im Bauch kribbelt es. Lena hat **Angst**, dass niemand mit ihr spricht.

In der Pause steht sie allein am Zaun. Die anderen Kinder spielen Fangen. Lena schaut auf den Boden und zieht die Schultern hoch. Sie fühlt sich **einsam** und ein bisschen **traurig**.

Dann kommt Jonas zu ihr. „Willst du mitspielen? Wir brauchen noch jemanden.“ Lena spürt, wie ihre Schultern locker werden. Sie lächelt. Nach der Pause ist sie **erleichtert** und **froh**.

Am Nachmittag erzählt Lena ihrer Mama: „Am Anfang war mein Bauch ganz komisch. Aber dann hat Jonas mich gefragt – und auf einmal war alles leichter.“

**Fragen zum Gespräch:**
1. Welche Gefühle hatte Lena im Laufe des Tages? Nenne mindestens drei.
2. Woran hat Lenas Körper gezeigt, wie sie sich fühlt?
3. Hat Jonas gemerkt, wie es Lena ging? Woran vielleicht?
4. Warst du schon einmal in einer ähnlichen Situation? (freiwillig)`
    },
    uebungen: [
        { titel: "Gefühle-Pantomime", fuer: "alle", dauer: "5 Min",
          text: "Ein Kind kommt nach vorn, zieht verdeckt eine Gefühlskarte und spielt das Gefühl nur mit Gesicht und Körper vor. Die anderen raten vom Platz aus (melden). Kl. 3/4 nennen zusätzlich, *woran* sie es erkannt haben (Augenbrauen, Mund, Schultern)." },
        { titel: "Spiegelspiel", fuer: "12", dauer: "4 Min",
          text: "Die Tischnachbarn drehen sich auf ihren Stühlen zueinander. Eins macht ein Gefühlsgesicht, das andere spiegelt es genau. Sitzt ein Kind allein, spiegelt es dich. Danach mit dem Handspiegel das eigene Gesicht anschauen: „So sehe ich aus, wenn ich wütend bin.“" },
        { titel: "Gefühlsdetektiv", fuer: "34", dauer: "7 Min",
          text: "Du liest kurze Situationen vor. Die Kinder zeigen auf das Gefühl am Barometer und erklären: „Ich glaube, sie fühlt sich …, weil …“\n\n- Mats hat sein Lieblingsbild zerrissen zurückbekommen.\n- Aylin darf zum ersten Mal bei der Freundin übernachten.\n- Ben muss morgen vor der Klasse ein Gedicht aufsagen.\n- Emma wurde beim Spiel nicht gewählt.\n- Leo hat ein Tor geschossen und alle jubeln." }
    ],
    ab12: {
        titel: "Wie fühlt sich das an?",
        aufgaben: [
            { typ: "gesichter", text: "Male die Gesichter fertig.", gefuehle: ["froh", "traurig", "wütend", "ängstlich"], leer: true },
            { typ: "zuordnen", text: "Wie fühlt sich das Kind? Verbinde.",
              links: ["Das Kind bekommt ein Geschenk.", "Das Eis fällt auf den Boden.", "Jemand nimmt das Spielzeug weg.", "Es donnert ganz laut."],
              rechts: ["traurig", "froh", "ängstlich", "wütend"] },
            { typ: "ankreuzen", text: "Heute fühle ich mich:", optionen: ["froh", "traurig", "wütend", "ängstlich", "ruhig"], nebeneinander: true },
            { typ: "malen", text: "Male dich: So sehe ich aus, wenn ich froh bin.", bild: "" }
        ]
    },
    ab34: {
        titel: "Gefühle verstehen",
        aufgaben: [
            { typ: "tabelle", text: "Was spürt der Körper? Schreibe das passende Gefühl dazu: Angst · Wut · Freude · Traurigkeit",
              spalten: ["Körpersignal", "Gefühl"],
              zeilen: [["Das Herz klopft schnell, die Hände sind feucht.", ""], ["Das Gesicht wird heiß, die Fäuste ballen sich.", ""], ["Ich möchte hüpfen und lachen.", ""], ["Mein Hals ist eng, ich möchte weinen.", ""]] },
            { typ: "luecken", text: "Gefühlsdetektiv: Wie fühlt sich das Kind? Schreibe einen Satz mit „weil“.", nummern: true,
              saetze: ["Finn hat seinen Hausschlüssel verloren.\n___", "Mia darf das Klassenmaskottchen übers Wochenende mitnehmen.\n___", "Noah wird ausgelacht, weil er sich verrechnet hat.\n___"] },
            { typ: "luecken", text: "Gefühle haben viele Namen. Finde zu jedem Gefühl ein anderes Wort.", nummern: false,
              saetze: ["froh → ___", "wütend → ___", "ängstlich → ___"] },
            { typ: "luecken", text: "Mein Gefühl.", nummern: false,
              saetze: ["Einmal war ich richtig ___, als ___", "___", "Das hat mir geholfen: ___"] }
        ]
    }
},

/* ------------------------------------------------------------ */
{
    id: "v-streit-loesen",
    titel: "Streit lösen",
    kategorie: "Konflikte lösen",
    dauer: 40,
    ziel12: "Stopp-Regel anwenden, Hilfe holen",
    ziel34: "Ich-Botschaften formulieren, Streit mit dem Friedensweg klären",
    material: "Stopp-Schild (rote Pappe am Stab)\nFriedensweg: 4 Bodenkarten (Stopp – Ich sage – Du sagst – Lösung)",
    verlauf: [
        { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Gefühlsbarometer", k34: "Begrüßung, Gefühlsbarometer" },
        { zeit: "5–13",  phase: "Lerntext",     k12: "„Die Schaukel“ hören, Stopp-Schild einführen", k34: "„Streit um den Fußball“ hören, Du- und Ich-Botschaft vergleichen" },
        { zeit: "13–25", phase: "Übung",        k12: "Stopp-Spiel, Friedensweg mitgehen", k34: "Friedensweg vorspielen, Ich-Botschaften-Werkstatt" },
        { zeit: "25–35", phase: "Arbeitsblatt", k12: "AB 1/2: Stopp-Regel und Hilfe holen", k34: "AB 3/4: Ich-Botschaften und Friedensweg" },
        { zeit: "35–40", phase: "Abschluss",    k12: "Daumenrunde, Applauswelle", k34: "„Heute habe ich gelernt …“, Applauswelle" }
    ],
    lerntext12: {
        titel: "Die Schaukel",
        text:
`Auf dem Schulhof gibt es nur eine Schaukel. Ella will schaukeln. Max will auch schaukeln.

Max schubst Ella weg. Ella fällt hin. Sie ist wütend und will Max hauen.

Da denkt Ella an das Stopp-Schild. Sie hebt die Hand und ruft laut: **„Stopp! Das will ich nicht!“**

Max bleibt stehen. Er schaut Ella an. Dann geht Ella zur Lehrerin und holt Hilfe.

Zusammen überlegen sie: Erst schaukelt Ella bis 50. Dann schaukelt Max bis 50. Max sagt: „Tut mir leid, dass ich dich geschubst habe.“

**Nach dem Vorlesen:** Was hat Ella gemacht, statt zu hauen? Alle üben gemeinsam: Hand hoch – „Stopp! Das will ich nicht!“`
    },
    lerntext34: {
        titel: "Streit um den Fußball",
        text:
`In der großen Pause wollen Kenan und Sophie mit dem Klassenfußball spielen. Beide haben ihn gleichzeitig gepackt. „Du bist so gemein, du nimmst immer alles!“, schreit Sophie. „Und du bist eine Petze!“, schreit Kenan zurück. Der Streit wird immer lauter.

Die Streitschlichterin Hanna kommt dazu. „Stopp. Wir gehen den Friedensweg.“

Zuerst darf Sophie sprechen, Kenan hört nur zu. Sophie atmet durch und sagt: „Ich bin wütend, weil ich gestern schon nicht spielen durfte. Ich wünsche mir, dass wir uns abwechseln.“

Dann ist Kenan dran: „Ich bin sauer, weil ich den Ball zuerst hatte. Ich wünsche mir, dass du mich nicht anschreist.“

Hanna fragt: „Was könnte eine Lösung sein, mit der ihr beide zufrieden seid?“ Nach kurzer Überlegung schlägt Kenan vor: „Wir spielen zusammen – jeder wählt drei Kinder für sein Team.“ Sophie nickt.

**Fragen zum Gespräch:**
1. Was haben Sophie und Kenan am Anfang gesagt? Wie wirkten diese Sätze?
2. Was ist anders an den Sätzen auf dem Friedensweg?
3. Warum darf immer nur einer sprechen?
4. Ist die Lösung fair? Fallen dir noch andere Lösungen ein?

**Tafelbild Ich-Botschaft:** Ich fühle mich …, weil … Ich wünsche mir, dass …`
    },
    uebungen: [
        { titel: "Stopp-Spiel", fuer: "alle", dauer: "4 Min",
          text: "Die Kinder bleiben an ihrem Platz. Du gehst langsam auf ein Kind nach dem anderen zu. Das Kind steht auf, hebt die Hand und sagt mit fester Stimme und Blickkontakt: „Stopp! Das will ich nicht!“ – und du bleibst sofort stehen. Ziel: Die Kinder erleben, dass ein klares Stopp wirkt." },
        { titel: "Friedensweg", fuer: "alle", dauer: "8 Min",
          text: "Lege vier Bodenkarten vorn hintereinander: **1. Stopp – 2. Ich sage, was ich fühle – 3. Du sagst, was du fühlst – 4. Wir finden eine Lösung.** Zwei Kinder aus Kl. 3/4 spielen einen Streit nach (z. B. vorgedrängelt in der Schlange) und gehen dabei Schritt für Schritt den Weg. Kl. 1/2 kommen danach einzeln nach vorn, gehen den Weg mit dir ab und sprechen die Sätze nach. Ein Kind aus Kl. 3/4 beobachtet und sagt, was gut geklappt hat." },
        { titel: "Ich-Botschaften-Werkstatt", fuer: "34", dauer: "4 Min",
          text: "Lies Du-Botschaften vor, die Kinder verwandeln sie mündlich:\n\n- „Du nervst!“\n- „Du lässt mich nie mitspielen!“\n- „Du hast meinen Stift kaputt gemacht, du Idiot!“" }
    ],
    ab12: {
        titel: "Stopp – so geht's!",
        aufgaben: [
            { typ: "malen", text: "Male das Stopp-Schild rot an.", bild: "stopp" },
            { typ: "ankreuzen", text: "Jemand nimmt mir mein Spielzeug weg. Was ist gut? Kreuze an.", nebeneinander: false,
              optionen: ["Ich haue zurück.", "Ich sage laut: „Stopp! Das will ich nicht!“", "Ich schreie ein böses Wort.", "Ich hole Hilfe bei einem Erwachsenen."] },
            { typ: "luecken", text: "Wer kann mir helfen? Schreibe oder male.", nummern: false,
              saetze: ["In der Schule hilft mir: ___", "Zu Hause hilft mir: ___"] },
            { typ: "zuordnen", nur: "2", text: "Was passiert dann? Verbinde.",
              links: ["Ich sage Stopp.", "Ich hole Hilfe.", "Wir finden eine Lösung."],
              rechts: ["Wir vertragen uns.", "Der andere hört auf.", "Ein Erwachsener kommt."] }
        ]
    },
    ab34: {
        titel: "Mit Worten statt mit Fäusten",
        aufgaben: [
            { typ: "tabelle", text: "Du-Botschaft oder Ich-Botschaft? Schreibe D oder I.",
              spalten: ["Satz", "D / I"],
              zeilen: [["Du bist immer so gemein!", ""], ["Ich bin traurig, weil du mich ausgelacht hast.", ""], ["Du machst alles kaputt!", ""], ["Ich ärgere mich, weil ich warten musste.", ""]] },
            { typ: "luecken", text: "Verwandle in eine Ich-Botschaft.", nummern: true,
              saetze: ["„Du lässt mich nie mitspielen!“\nIch fühle mich ___, weil ___.\nIch wünsche mir, dass ___.",
                       "„Du hast meine Zeichnung zerknittert!“\nIch fühle mich ___, weil ___.\nIch wünsche mir, dass ___."] },
            { typ: "luecken", text: "Der Friedensweg: Bringe die Schritte in die richtige Reihenfolge (1–4).", nummern: false,
              saetze: ["___ Wir finden eine Lösung, mit der beide zufrieden sind.", "___ Stopp – wir hören auf zu streiten.", "___ Der andere sagt, wie er sich fühlt.", "___ Ich sage, wie ich mich fühle."] },
            { typ: "luecken", text: "Zwei Kinder wollen gleichzeitig am Computer sitzen. Schreibe zwei faire Lösungen auf.", nummern: true,
              saetze: ["___", "___"] }
        ]
    }
},

/* ------------------------------------------------------------ */
{
    id: "v-freundschaft",
    titel: "Freundschaft",
    kategorie: "Freundschaft",
    dauer: 40,
    ziel12: "Freundliche Handlungen erkennen und benennen",
    ziel34: "Eigenschaften eines guten Freundes begründen, mit Enttäuschung umgehen",
    material: "Wollknäuel + Magnete (Freundschaftsnetz an der Tafel)\nKleine Zettel für Komplimente\nNamenszettel aller Kinder",
    verlauf: [
        { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Gefühlsbarometer", k34: "Begrüßung, Gefühlsbarometer" },
        { zeit: "5–13",  phase: "Lerntext",     k12: "„Der kleine Igel sucht einen Freund“ hören", k34: "„Das geplatzte Versprechen“ hören, Fragen besprechen" },
        { zeit: "13–25", phase: "Übung",        k12: "Daumen-Spiel „Freundlich oder nicht?“, Kompliment-Post", k34: "Daumen-Spiel mit Begründung, Freundschaftsnetz, Kompliment-Post" },
        { zeit: "25–35", phase: "Arbeitsblatt", k12: "AB 1/2: Was macht ein guter Freund?", k34: "AB 3/4: Freundschafts-Rezept" },
        { zeit: "35–40", phase: "Abschluss",    k12: "Daumenrunde, Applauswelle", k34: "„Heute habe ich gelernt …“, Applauswelle" }
    ],
    lerntext12: {
        titel: "Der kleine Igel sucht einen Freund",
        text:
`Der kleine Igel ist allein. Er möchte so gern einen Freund haben.

Er fragt den Hasen: „Spielst du mit mir?“ Der Hase lacht: „Nein, du bist so stachelig!“ Der Igel ist traurig.

Dann trifft er das Eichhörnchen. Das Eichhörnchen hat seine Nüsse verloren. „Ich helfe dir suchen“, sagt der Igel. Zusammen finden sie alle Nüsse.

Das Eichhörnchen teilt die Nüsse mit dem Igel. „Danke, dass du mir geholfen hast. Willst du mein Freund sein?“

Der Igel strahlt. Jetzt hat er einen Freund – auch mit Stacheln.

**Nach dem Vorlesen:** Was hat der Igel Gutes getan? Was hat das Eichhörnchen Gutes getan? Sammle die Antworten an der Tafel: helfen, teilen, danke sagen, mitspielen lassen.`
    },
    lerntext34: {
        titel: "Das geplatzte Versprechen",
        text:
`Seit dem Kindergarten sind Mila und Ida beste Freundinnen. Sie sitzen nebeneinander, teilen ihr Pausenbrot und kennen jedes Geheimnis der anderen.

Am Freitag sagt Mila: „Morgen gehen wir zusammen ins Schwimmbad, versprochen!“ Ida freut sich die ganze Woche darauf.

Am Samstag wartet Ida mit ihrer Badetasche vor der Tür. Mila kommt nicht. Am Nachmittag sieht Ida Fotos: Mila war mit Paula im Kino. Ida ist enttäuscht und wütend. „Mit der rede ich nie wieder!“, denkt sie.

Am Montag kommt Mila zu ihr. „Ida, es tut mir leid. Paula hatte eine Kinokarte übrig, und ich habe nicht nachgedacht. Ich hätte dir Bescheid sagen müssen.“

Ida schweigt kurz. Dann sagt sie: „Ich war richtig traurig. Aber ich finde gut, dass du dich entschuldigst. Gehen wir nächsten Samstag schwimmen?“

**Fragen zum Gespräch:**
1. Was hat Mila falsch gemacht? Was hat sie danach richtig gemacht?
2. Ist es okay, dass Ida wütend war?
3. Muss Ida die Entschuldigung annehmen? Was spricht dafür, was dagegen?
4. Darf man mehrere Freunde haben?`
    },
    uebungen: [
        { titel: "Daumen-Spiel „Freundlich oder nicht?“", fuer: "alle", dauer: "4 Min",
          text: "Du liest Situationen vor, die Kinder zeigen vom Platz aus Daumen hoch oder runter. Kl. 3/4 begründen einzelne Entscheidungen.\n\n- Lisa leiht Tom ihren Radiergummi.\n- Jan erzählt ein Geheimnis von Ali weiter.\n- Sara fragt das neue Kind, ob es mitspielt.\n- Ben lacht, als Mia hinfällt.\n- Emil tröstet Lea, weil sie traurig ist." },
        { titel: "Freundschaftsnetz", fuer: "34", dauer: "4 Min",
          text: "An der Tafel stehen die Vornamen aller Kinder. Ein Kind kommt nach vorn, nennt eine nette Sache, die ein anderes Kind schon einmal getan hat, und spannt einen Wollfaden (mit Magneten) zwischen den beiden Namen. So entsteht Faden für Faden ein Netz. Kl. 1/2 dürfen das Kind nennen, die Großen spannen den Faden." },
        { titel: "Kompliment-Post", fuer: "alle", dauer: "4 Min",
          text: "Jedes Kind zieht verdeckt einen Namenszettel. Kl. 1/2 malen für dieses Kind ein kleines Bild, Kl. 3/4 schreiben ein Kompliment („Ich finde toll, dass du …“). Du sammelst die Zettel ein und verteilst sie als „Postbote“ an die Plätze." }
    ],
    ab12: {
        titel: "Was macht ein guter Freund?",
        aufgaben: [
            { typ: "ankreuzen", text: "Ein guter Freund … Kreuze an.", nebeneinander: false,
              optionen: ["hilft mir.", "lacht mich aus.", "teilt mit mir.", "tröstet mich.", "nimmt mir etwas weg.", "spielt mit mir."] },
            { typ: "malen", text: "Male deinen Freund oder deine Freundin.", bild: "" },
            { typ: "luecken", text: "", nummern: false, saetze: ["Mein Freund / meine Freundin heißt: ___"] },
            { typ: "ankreuzen", text: "Was macht ihr gern zusammen?", nebeneinander: true,
              optionen: ["[bild:wuerfel] spielen", "[bild:pinsel] malen", "[gesicht:froh] lachen", "[bild:fussball] Fußball", "[bild:buch] lesen", "___"] },
            { typ: "luecken", text: "Ich bin ein guter Freund, weil ich …", nummern: false, saetze: ["___"] }
        ]
    },
    ab34: {
        titel: "Unser Freundschafts-Rezept",
        aufgaben: [
            { typ: "tabelle", text: "Das Freundschafts-Rezept: Schreibe in jede Zeile eine Zutat für eine gute Freundschaft und warum sie wichtig ist.",
              spalten: ["Zutat", "Warum ist sie wichtig?"],
              zeilen: [["1 Löffel Ehrlichkeit", ""], ["1 Prise ___", ""], ["1 Becher ___", ""], ["1 Handvoll ___", ""]] },
            { typ: "luecken", text: "Freund oder kein Freund? Schreibe F oder K und begründe.", nummern: true,
              saetze: ["Er sagt dir ehrlich, wenn dein Witz nicht lustig war.\n___ weil ___",
                       "Sie spielt nur mit dir, wenn du Süßigkeiten hast.\n___ weil ___",
                       "Er hilft dir, obwohl er selbst keine Lust hat.\n___ weil ___"] },
            { typ: "luecken", text: "Wenn Freunde streiten: Dein Freund hat dich enttäuscht. Was kannst du tun? Schreibe zwei Ideen.", nummern: true,
              saetze: ["___", "___"] },
            { typ: "luecken", text: "Ein Brief an einen Freund: Schreibe zwei Sätze, warum du diesen Menschen magst.", nummern: false,
              saetze: ["Liebe/r ___, ich mag dich, weil ___", "___"] }
        ]
    }
},

/* ------------------------------------------------------------ */
{
    id: "v-regeln-miteinander",
    titel: "Regeln & Miteinander",
    kategorie: "Regeln & Miteinander",
    dauer: 40,
    ziel12: "Verstehen, wofür Regeln da sind, und 3 Gruppenregeln vereinbaren",
    ziel34: "Regeln begründen und faire Folgen bei Regelverstößen aushandeln",
    material: "Plakat „Unsere Gruppenregeln“ (leer) + dicke Stifte\nWürfel (für das Regel-Chaos-Spiel)\nKleine Zettel für Regelvorschläge",
    verlauf: [
        { zeit: "0–5",   phase: "Ankommen",     k12: "Begrüßung, Gefühlsbarometer", k34: "Begrüßung, Gefühlsbarometer" },
        { zeit: "5–10",  phase: "Einstieg",     k12: "Regel-Chaos-Spiel", k34: "Regel-Chaos-Spiel" },
        { zeit: "10–16", phase: "Lerntext",     k12: "„Die Stadt ohne Ampeln“ hören", k34: "„Die Insel ohne Regeln“ hören, Fragen besprechen" },
        { zeit: "16–25", phase: "Übung",        k12: "Regeln vorschlagen, Regelplakat mitgestalten", k34: "Regeln begründen, faire Folgen aushandeln" },
        { zeit: "25–35", phase: "Arbeitsblatt", k12: "AB 1/2: Regeln im Alltag", k34: "AB 3/4: Regeln prüfen und erfinden" },
        { zeit: "35–40", phase: "Abschluss",    k12: "Plakat unterschreiben, Applauswelle", k34: "Plakat unterschreiben, Applauswelle" }
    ],
    lerntext12: {
        titel: "Die Stadt ohne Ampeln",
        text:
`In der Stadt Wirrwarr gibt es keine Ampeln und keine Regeln.

Die Autos fahren, wie sie wollen. Die Fahrräder fahren auf dem Fußweg. Die Kinder rennen über die Straße. Es hupt und quietscht. Alle haben Angst.

Da hat Lotta eine Idee. Sie malt ein großes Schild: **Rot heißt stehen. Grün heißt gehen.**

Alle machen mit. Jetzt warten die Autos, wenn die Kinder gehen. Niemand muss mehr Angst haben.

Die Leute sagen: „Regeln sind gut. Sie passen auf uns auf.“

**Nach dem Vorlesen:** Welche Regeln kennst du? Zu Hause, in der Schule, auf der Straße? Sammle an der Tafel.`
    },
    lerntext34: {
        titel: "Die Insel ohne Regeln",
        text:
`Nach einem Sturm stranden zehn Kinder auf einer einsamen Insel. Kein Erwachsener ist da. „Endlich keine Regeln!“, jubelt Moritz. Am ersten Tag spielen alle, essen so viele Kokosnüsse, wie sie wollen, und schlafen, wann sie müde sind.

Am dritten Tag sind die Kokosnüsse fast alle weg. Die Stärksten haben die meisten genommen. Das Feuer ist ausgegangen, weil niemand Holz gesammelt hat. Die Kinder streiten nur noch.

Abends setzt sich Selin auf einen Stein. „So geht das nicht weiter. Wir brauchen Regeln – aber welche, die wir alle gut finden.“ Gemeinsam beschließen sie: Das Essen wird gerecht geteilt. Jeden Tag sammeln zwei Kinder Holz. Bei Streit wird abgestimmt.

Nach einer Woche klappt das Inselleben richtig gut. Moritz sagt: „Komisch – mit Regeln fühle ich mich freier als ohne.“

**Fragen zum Gespräch:**
1. Warum ging am Anfang alles schief?
2. Was ist das Besondere an den Regeln, die die Kinder aufgestellt haben?
3. Was meint Moritz mit seinem letzten Satz?
4. Was sollte passieren, wenn jemand sich nicht an die Inselregeln hält?`
    },
    uebungen: [
        { titel: "Regel-Chaos-Spiel (Einstieg)", fuer: "alle", dauer: "5 Min",
          text: "Ankündigung: „Wir spielen ein Würfelspiel. Wer gewinnt? Das sage ich nicht.“ Der Würfel wandert von Platz zu Platz. Jedes Kind würfelt, du vergibst Punkte völlig willkürlich (eine 6 bringt mal 10 Punkte, mal 0; ein Kind darf zweimal würfeln, ein anderes gar nicht). Nach zwei Minuten stoppst du.\n\nFrage: „Wie hat sich das Spiel angefühlt? Was hat gefehlt?“ – Ziel: Die Kinder merken selbst, dass ohne Regeln Unfairness und Ärger entstehen." },
        { titel: "Unser Regelplakat", fuer: "alle", dauer: "9 Min",
          text: "**Schritt 1 – Vorschläge:** Jedes Kind überlegt an seinem Platz eine Regel für unsere Sozialtraining-Stunde. Kl. 1/2 sagen sie dir oder malen ein Symbol, Kl. 3/4 schreiben sie auf einen Zettel. Wichtig: Regeln positiv formulieren („Wir hören zu“ statt „Nicht reinreden“).\n\n**Schritt 2 – Abstimmen:** Du liest die Vorschläge vor. Abstimmung per Handzeichen vom Platz. Die drei bis fünf Regeln mit den meisten Stimmen kommen aufs Plakat.\n\n**Schritt 3 – Begründen und Folgen aushandeln (Kl. 3/4):** Zu jeder Regel erklärt ein Kind, warum sie wichtig ist. Dann überlegt die Gruppe: Was passiert, wenn jemand die Regel bricht? Die Folge muss fair sein und zur Regel passen (z. B. „Wer reinredet, wartet eine Runde mit dem Redestein“).\n\n**Schritt 4 – Gestalten (Kl. 1/2):** Während die Großen begründen, malen die Kleinen an ihrem Platz Symbole zu jeder Regel (Ohr für Zuhören, Herz für Freundlichkeit). Die Bilder kommen neben die Regeln aufs Plakat." }
    ],
    ab12: {
        titel: "Regeln im Alltag",
        aufgaben: [
            { typ: "zuordnen", text: "Wo gilt welche Regel? Verbinde.",
              links: ["Bei Rot bleibe ich stehen.", "Ich melde mich, wenn ich etwas sagen will.", "Ich räume mein Zimmer auf."],
              rechts: ["[bild:haus] zu Hause", "[bild:auto] Straße", "[bild:rucksack] Schule"] },
            { typ: "tabelle", text: "Richtig oder falsch? Male den Daumen hoch oder runter.",
              spalten: ["Was passiert?", "Daumen"],
              zeilen: [["Ich warte, bis ich dran bin.", ""], ["Ich drängle mich vor.", ""], ["Ich sage bitte und danke.", ""], ["Ich werfe Müll auf den Boden.", ""]] },
            { typ: "malen", text: "Meine wichtigste Regel: Male sie.", bild: "" },
            { typ: "luecken", text: "", nummern: false, saetze: ["Meine Regel: ___"] }
        ]
    },
    ab34: {
        titel: "Regeln prüfen und erfinden",
        aufgaben: [
            { typ: "tabelle", text: "Wozu ist die Regel gut? Schreibe den Grund auf.",
              spalten: ["Regel", "Grund"],
              zeilen: [["Im Schulhaus wird nicht gerannt.", ""], ["Wer spricht, hat den Redestein.", ""], ["Beim Spielen wird nicht geschummelt.", ""]] },
            { typ: "luecken", text: "Ist die Regel fair? Kreuze an und begründe.", nummern: true,
              saetze: ["„Nur die Großen dürfen auf den Fußballplatz.“\n☐ fair  ☐ unfair, weil ___",
                       "„Jeder darf einmal am Tag den Ball aussuchen.“\n☐ fair  ☐ unfair, weil ___"] },
            { typ: "tabelle", text: "Regel und Folge: Finde eine faire Folge, wenn jemand die Regel bricht.",
              spalten: ["Regel", "Faire Folge"],
              zeilen: [["Wir lachen niemanden aus.", ""], ["Wir räumen nach dem Spielen auf.", ""]] },
            { typ: "luecken", text: "Erfinde eine Regel für eure Klasse.", nummern: false,
              saetze: ["Regel: ___", "Diese Regel ist wichtig, weil ___"] }
        ]
    }
}

];
