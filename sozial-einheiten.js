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
`### Vor der Stunde
Stundenablauf-Karten untereinander an die Tafel, der Zeiger steht bei „Ankommen“. Gefühlsbarometer und Gesprächsregeln hängen, Redestein (oder Redekarte) liegt bereit.
*Material: Stundenablauf-Bildkarten, Ruhezeichen-Karte*

### Ruhezeichen
Du hebst die Hand und wartest. Wer es sieht, hebt auch die Hand und wird leise – bis alle still sind. Nicht reinrufen, nicht ermahnen: einfach warten. Gilt die ganze Stunde.

### Begrüßung (1 Min)
Alle sitzen an ihrem Platz. Du gehst mit dem Redestein durch die Reihe; das Kind, bei dem er liegt, steht kurz auf und sagt „Hallo, ich bin da!“ – die anderen winken zurück. Kl. 3/4 ergänzen: „… und heute freue ich mich auf …“
*Material: Redekarte, Plakat „So begrüßen wir uns“*

### Gefühlsbarometer (4 Min)
Ein Plakat mit fünf Feldern (froh – traurig – wütend – ängstlich – ruhig). Die Kinder kommen nacheinander nach vorn und stecken ihre Namensklammer an ein Feld. Kl. 1/2 dürfen nur zeigen, Kl. 3/4 sagen einen Satz dazu. Niemand muss erklären.
*Material: Gefühlsbarometer oder Plakat „Wie geht es mir heute?“, Namensschilder für die Klammern*

### Gesprächsregeln (hängen sichtbar)
1. Wer den Redestein hat, spricht.
2. Wir hören zu und lachen niemanden aus.
3. Ich darf „Ich passe“ sagen.
4. Was hier gesagt wird, bleibt hier.
*Material: Plakat „Gesprächsregeln“, rote und grüne Karten*

### Abschluss (5 Min)
Jedes Kind nennt einen Satz: „Heute habe ich gelernt …“ (Kl. 1/2 halten stattdessen eine Gesichter-Karte hoch: super – geht so – schwierig). Danach die **Applauswelle**: Du zeigst nacheinander auf jeden Platz, das Kind klatscht einmal – so läuft eine Welle durch den Raum, zum Schluss klatschen alle gemeinsam.
*Material: Satzstreifen für die Abschlussrunde, Abschluss-Gesichter*

### Belohnung (optional)
Ein Sammelglas für die Gruppe. Für jede gelungene Stunde kommt eine Murmel hinein (oder wird auf dem Plakat ausgemalt); bei 10 Murmeln gibt es ein Gruppenspiel nach Wahl.
*Material: Murmelglas zum Ausmalen, Gutschein*`;

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

**Nach dem Vorlesen:**
1. Wie hat sich Paul am Anfang gefühlt?
2. Warum war Paul traurig?
3. Woran hast du gemerkt, dass Paul wütend war?
4. Was hat Tom gemacht – und wie ging es Paul danach?
5. Halte bei jedem Gefühl die passende Gefühlskarte hoch.`
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
          text: "Ein Kind kommt nach vorn, zieht verdeckt eine Gefühlskarte und spielt das Gefühl nur mit Gesicht und Körper vor. Die anderen raten vom Platz aus (melden). Kl. 3/4 nennen zusätzlich, *woran* sie es erkannt haben (Augenbrauen, Mund, Schultern).",
          folie: "Ein Kind zieht eine Gefühlskarte und zeigt das Gefühl – nur mit Gesicht und Körper, ohne Worte.\n\nDie anderen raten: **Welches Gefühl ist das?**",
          folie34: "Ein Kind zieht eine Gefühlskarte und zeigt das Gefühl – nur mit Gesicht und Körper, ohne Worte.\n\nDie anderen raten: **Welches Gefühl ist das? Woran hast du es erkannt?**",
          kern: ["12"] },
        { titel: "Spiegelspiel", fuer: "12", dauer: "4 Min",
          text: "Die Tischnachbarn drehen sich auf ihren Stühlen zueinander. Eins macht ein Gefühlsgesicht, das andere spiegelt es genau. Sitzt ein Kind allein, kommt es als Dritter zu einem Paar. Danach mit dem Handspiegel das eigene Gesicht anschauen: „So sehe ich aus, wenn ich wütend bin.“",
          folie: "Dreh dich zu deinem Nachbarn.\n\nEiner macht ein Gefühlsgesicht. Der andere ist der **Spiegel** und macht es genau nach. Dann wechseln." },
        { titel: "Gefühlsdetektiv", fuer: "34", dauer: "7 Min",
          text: "Du liest kurze Situationen vor. Die Kinder zeigen auf das Gefühl am Barometer und erklären: „Ich glaube, sie fühlt sich …, weil …“\n\n- Mats hat sein Lieblingsbild zerrissen zurückbekommen.\n- Aylin darf zum ersten Mal bei der Freundin übernachten.\n- Ben muss morgen vor der Klasse ein Gedicht aufsagen.\n- Emma wurde beim Spiel nicht gewählt.\n- Leo hat ein Tor geschossen und alle jubeln.",
          folie: "Hör gut zu. Wie fühlt sich das Kind?\n\nZeig auf das Gefühl am Barometer und sag: **„Ich glaube, … fühlt sich …, weil …“**",
          kern: ["34"] }
    ],
    ab12: {
      "titel": "Wie fühlt sich das an?",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gesichter",
          "text": "Male die Gesichter fertig.",
          "gefuehle": [
            "froh",
            "traurig",
            "wütend",
            "ängstlich"
          ],
          "leer": true
        },
        {
          "typ": "gefuehle",
          "text": "Wie fühlt sich das Kind? Kreise ein Gesicht ein.",
          "zeilen": [
            "Das Kind bekommt ein Geschenk.",
            "Das Eis fällt auf den Boden.",
            "Jemand nimmt das Spielzeug weg.",
            "Es donnert ganz laut."
          ]
        },
        {
          "typ": "malen",
          "text": "Male dich: So sehe ich aus, wenn ich froh bin.",
          "bild": ""
        }
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
    titel: "Streit: Erst raus, dann reden",
    kategorie: "Konflikte lösen",
    dauer: 40,
    ziel12: "Im Streit aussteigen: weggehen und Hilfe holen statt hauen",
    ziel34: "Merken, wann es kocht, rechtzeitig aussteigen und den Streit später mit Hilfe klären",
    material: "Zahlenkarten 1–3 (Antwort-Set)\nPlakat „Erst raus, dann reden“ (Arbeitsmaterial)",
    verlauf: [
      {
        "zeit": "0–5",
        "phase": "Ankommen",
        "k12": "Begrüßung, Gefühlsbarometer",
        "k34": "Begrüßung, Gefühlsbarometer"
      },
      {
        "zeit": "5–15",
        "phase": "Geschichte",
        "k12": "„Die Schaukel“ hören, die 4 Schritte an der Tafel",
        "k34": "„Kein Tor!“ hören, Tafelbild Merken – Raus – Holen – Später reden"
      },
      {
        "zeit": "15–23",
        "phase": "Übung",
        "k12": "Was jetzt? (Zahlenkarten)",
        "k34": "Was jetzt? (Zahlenkarten)"
      },
      {
        "zeit": "23–33",
        "phase": "Arbeitsblatt",
        "k12": "AB 1/2: Erst raus, dann reden",
        "k34": "AB 3/4: Mein Notfall-Plan"
      },
      {
        "zeit": "33–40",
        "phase": "Abschluss",
        "k12": "Daumenrunde, Applauswelle",
        "k34": "„Mein Raus-Satz ist …“, Applauswelle"
      }
    ],
    lerntext12: {
      "titel": "Die Schaukel",
      "text": "Auf dem Schulhof gibt es nur eine Schaukel. Ella will schaukeln. Max will auch schaukeln.\n\nMax schubst Ella weg. Ella fällt hin. Ihr Bauch wird heiß. Ihre Hände werden zu Fäusten. Ella ist **wütend**. Sie will Max hauen.\n\nDa merkt Ella: „Es kocht in mir!“ Sie macht ihre Fäuste auf. Sie sagt nur: **„Stopp!“** – und dann **geht sie weg**. Weit weg von Max.\n\nElla läuft zur Lehrerin. „Max hat mich geschubst. Ich bin so wütend!“ Die Lehrerin sagt: „Gut, dass du weggegangen bist. Komm, wir atmen erst einmal.“\n\nNach der Pause sitzen Ella, Max und die Lehrerin zusammen. Jetzt sind alle ruhig. Max sagt: „Tut mir leid, dass ich dich geschubst habe.“ Morgen schaukelt Ella zuerst.\n\n**Nach dem Vorlesen:**\n1. Warum war Ella so wütend?\n2. Woran hat Ella gemerkt, dass es in ihr kocht?\n3. Was hat Ella gemacht, statt Max zu hauen?\n4. Wann haben Ella und Max den Streit geklärt – und wer hat geholfen?\n\n**Tipp für dich:** Schreib die vier Schritte an die Tafel: Merken – Raus – Holen – Später reden."
    },
    lerntext34: {
      "titel": "Kein Tor!",
      "text": "In der großen Pause spielen Kenan und Sophie Fußball. Kenan schießt aufs Tor. Sophie ruft: „Kein Tor! Der war daneben!“ Kenan: „Spinnst du? Der war drin!“\n\nSophie schubst ihn. Ein paar Kinder rufen: „Lass dir das nicht gefallen, Kenan!“ Kenan spürt, wie sein Kopf heiß wird. Sein Kiefer ist fest, seine Fäuste auch. Er ist kurz vorm Explodieren.\n\nKenan weiß: Wenn er jetzt bleibt, gibt es eine Prügelei. Und dann ist er wieder der Schuldige. Er sagt nur: „Ich hab keinen Bock auf Stress.“ Dann dreht er sich um und geht zur Bank. Die anderen lachen. Es kostet ihn viel Kraft, nicht zurückzugehen.\n\nAn der Bank atmet Kenan tief durch. Er zählt die Autos auf dem Parkplatz. Langsam wird sein Kopf kühler. Dann geht er zur Pausenaufsicht: „Mit Sophie gab es Stress. Ich bin weggegangen.“\n\nNach der Pause setzen sich Kenan, Sophie und die Schulsozialarbeiterin zusammen. Jetzt können beide in Ruhe sagen, was sie geärgert hat. Sie verabreden: Beim nächsten Streit um ein Tor entscheidet die Aufsicht.\n\n**Fragen zum Gespräch:**\n1. Woran hat Kenan gemerkt, dass er kurz vorm Explodieren ist?\n2. Warum war es so schwer für ihn, wegzugehen?\n3. Was hat ihm an der Bank geholfen, ruhig zu werden?\n4. Warum klappt das Klären erst nach der Pause – und nicht mitten im Streit?\n\n**Tafelbild:** Merken – Raus – Holen – Später reden"
    },
    uebungen: [
      {
        "titel": "Was jetzt?",
        "fuer": "alle",
        "dauer": "8 Min",
        "kern": [
          "12",
          "34"
        ],
        "text": "**Material:** Zahlenkarten 1–3 (aus dem Antwort-Set). An der Tafel bzw. auf der Folie: **1 = Weggehen · 2 = Hilfe holen · 3 = Später reden.** Du liest nur vor.\n\n**So geht's:** Du liest eine Situation vor. Auf „1, 2, 3 – hoch!“ zeigen die Kinder die Karte: Was machst du **jetzt**? Danach fragst du: „Was ist daran schwer?“ Ehrliche Antworten sind erlaubt („Weggehen ist peinlich“) – genau darüber lohnt es sich zu reden.\n\n- Beim Fußball sagt einer, dein Tor zählt nicht. Alle schauen zu.\n- Jemand sagt einen Spruch über deine Mutter.\n- Einer rempelt dich im Flur an und grinst.\n- Im Klassenchat lachen alle über ein Foto von dir.\n- Jemand stellt sich dir in den Weg und sagt: „Was willst du?“\n\n**Wichtig:** Bei Gewalt, Drohung oder Bloßstellen ist immer auch 2 richtig: Hilfe holen.",
        "text12": "**Material:** Zahlenkarten 1–3 (aus dem Antwort-Set). An der Tafel bzw. auf der Folie: **1 = Weggehen · 2 = Hilfe holen · 3 = Später reden.** Du liest nur vor.\n\n**So geht's:** Du liest einen Streit vor. Auf „1, 2, 3 – hoch!“ zeigen die Kinder die Karte: Was machst du jetzt? Oft passen mehrere – frag ein, zwei Kinder: „Warum?“\n\n- Jemand schubst dich in der Schlange.\n- Jemand nimmt dir den Ball weg.\n- Jemand sagt: „Du bist doof!“\n- Ein Kind haut dich.\n- Jemand macht deinen Turm kaputt.\n\n**Wichtig:** Wenn jemand haut oder wehtut, ist immer auch 2 richtig: Hilfe holen.",
        "text34": "**Material:** Zahlenkarten 1–3 (aus dem Antwort-Set). An der Tafel bzw. auf der Folie: **1 = Weggehen · 2 = Hilfe holen · 3 = Später reden.** Du liest nur vor.\n\n**So geht's:** Du liest eine Situation vor. Auf „1, 2, 3 – hoch!“ zeigen die Kinder die Karte: Was machst du **jetzt**? Danach fragst du: „Was ist daran schwer?“ Ehrliche Antworten sind erlaubt („Weggehen ist peinlich“) – genau darüber lohnt es sich zu reden.\n\n- Beim Fußball sagt einer, dein Tor zählt nicht. Alle schauen zu.\n- Jemand sagt einen Spruch über deine Mutter.\n- Einer rempelt dich im Flur an und grinst.\n- Im Klassenchat lachen alle über ein Foto von dir.\n- Jemand stellt sich dir in den Weg und sagt: „Was willst du?“\n\n**Wichtig:** Bei Gewalt, Drohung oder Bloßstellen ist immer auch 2 richtig: Hilfe holen.",
        "quiz": "zahlen",
        "antworten": [
          "1️⃣ Weggehen",
          "2️⃣ Hilfe holen",
          "3️⃣ Später reden"
        ],
        "folie": "Leg deine **Zahlenkarten 1–3** vor dich:\n\n**1** 🚶 Weggehen · **2** 🙋 Hilfe holen · **3** 🗣️ Später reden\n\nGleich kommt ein Streit. Was machst du **jetzt**? Auf **„1, 2, 3 – hoch!“** zeigst du deine Karte."
      },
      {
        "titel": "Mein Raus-Satz",
        "fuer": "alle",
        "dauer": "4 Min",
        "text": "Jedes Kind sucht sich einen kurzen Satz aus, mit dem es aus einem Streit aussteigt, und sagt ihn einmal laut vom Platz – ruhig, Blick nach vorn, dann Kopf zur Seite drehen (= weggehen). Die anderen klatschen.\n\n- „Stopp. Ich geh jetzt.“\n- „Ich hab keinen Bock auf Stress.“\n- „Ich hol jetzt einen Erwachsenen.“\n- „Wir reden später.“",
        "text12": "Jedes Kind sucht sich einen kurzen Satz aus und sagt ihn einmal laut vom Platz – ruhig, Blick nach vorn, dann Kopf zur Seite drehen (= weggehen). Die anderen klatschen.\n\n- „Stopp. Ich geh jetzt.“\n- „Ich hol die Lehrerin.“\n- „Wir reden später.“",
        "quiz": "liste",
        "folie": "Wenn es in dir kocht, sagst du einen **kurzen Satz** – und gehst.\n\nSuch dir deinen Satz aus und sag ihn laut. Dann dreh den Kopf zur Seite."
      },
      {
        "titel": "Unser Ruheplatz",
        "fuer": "alle",
        "dauer": "4 Min",
        "text": "Gemeinsam legt ihr fest: Wohin kann man im Klassenraum und auf dem Schulhof gehen, wenn es kocht? (Leseecke, Fensterbank, Bank neben der Aufsicht …) Wer mag, geht einmal langsam vom Platz zum Ruheplatz im Raum und wieder zurück – so üben alle den Weg. Abmachung: Wer am Ruheplatz ist, wird in Ruhe gelassen.",
        "folie": "Wohin kannst du gehen, wenn es in dir **kocht**? 🪑\n\nWir suchen einen **Ruheplatz** – hier im Raum und auf dem Schulhof.\n\nAbmachung: Wer dort ist, wird in Ruhe gelassen."
      }
    ],
    ab12: {
      "titel": "Erst raus, dann reden",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Es kocht in dir. Ist das gut? Kreise ein: 👍 oder 👎.",
          "art": "daumen",
          "zeilen": [
            "Ich haue.",
            "Ich gehe weg.",
            "Ich hole Hilfe.",
            "Ich schreie ein böses Wort.",
            "Ich atme tief."
          ]
        },
        {
          "typ": "malen",
          "text": "Male deinen Ruheplatz.",
          "bild": ""
        },
        {
          "typ": "malen",
          "text": "Male den Erwachsenen, den du holst.",
          "bild": ""
        }
      ]
    },
    ab34: {
      "titel": "Mein Notfall-Plan bei Streit",
      "aufgaben": [
        {
          "typ": "ankreuzen",
          "text": "Es kocht. Was hilft wirklich? Kreuze an.",
          "nebeneinander": false,
          "optionen": [
            "zurückschubsen",
            "weggehen",
            "bis 10 zählen",
            "einen Erwachsenen holen",
            "laut beleidigen",
            "tief atmen"
          ]
        },
        {
          "typ": "luecken",
          "text": "Mein Notfall-Plan.",
          "nummern": true,
          "saetze": [
            "Ich merke, dass es kocht, wenn mein Körper ___.",
            "Mein Raus-Satz: „___“",
            "Mein Ruheplatz: ___",
            "Diesen Erwachsenen hole ich: ___"
          ]
        },
        {
          "typ": "luecken",
          "text": "Später, wenn ich ruhig bin, sage ich:",
          "nummern": false,
          "saetze": [
            "Ich war wütend, weil ___.",
            "Ich wünsche mir, dass ___."
          ]
        }
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

**Nach dem Vorlesen:**
1. Warum war der Igel am Anfang allein?
2. Wie hat sich der Igel gefühlt, als der Hase gelacht hat?
3. Was hat der Igel für das Eichhörnchen getan?
4. Woran merkst du, dass jemand ein guter Freund ist?

**Tipp für dich:** Sammle an der Tafel: helfen, teilen, danke sagen, mitspielen lassen.`
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
          text: "Du liest Situationen vor, die Kinder zeigen vom Platz aus Daumen hoch oder runter. Kl. 3/4 begründen einzelne Entscheidungen.\n\n- Lisa leiht Tom ihren Radiergummi.\n- Jan erzählt ein Geheimnis von Ali weiter.\n- Sara fragt das neue Kind, ob es mitspielt.\n- Ben lacht, als Mia hinfällt.\n- Emil tröstet Lea, weil sie traurig ist.",
          antworten: ["👍 freundlich", "👎 nicht freundlich"],
          folie: "Ist das **freundlich**? Dann Daumen hoch 👍\n\nIst das **nicht freundlich**? Dann Daumen runter 👎",
          folie34: "Ist das **freundlich**? Daumen hoch 👍 – **nicht freundlich**? Daumen runter 👎\n\nSag auch, warum.",
          kern: ["12", "34"] },
        { titel: "Freundschaftsnetz", fuer: "34", dauer: "4 Min",
          text: "An der Tafel stehen die Vornamen aller Kinder. Ein Kind kommt nach vorn, nennt eine nette Sache, die ein anderes Kind schon einmal getan hat, und spannt einen Wollfaden (mit Magneten) zwischen den beiden Namen. So entsteht Faden für Faden ein Netz. Kl. 1/2 dürfen das Kind nennen, die Großen spannen den Faden.",
          folie: "An der Tafel stehen eure Namen.\n\nSag, was ein anderes Kind schon einmal **Nettes** getan hat – und spann einen Faden zwischen euren Namen. So wächst unser **Freundschaftsnetz**." },
        { titel: "Kompliment-Post", fuer: "alle", dauer: "4 Min",
          text: "Jedes Kind zieht verdeckt einen Namenszettel. Kl. 1/2 malen für dieses Kind ein kleines Bild, Kl. 3/4 schreiben ein Kompliment („Ich finde toll, dass du …“). Du sammelst die Zettel ein und verteilst sie als „Postbote“ an die Plätze.",
          folie12: "Zieh einen Namenszettel. Verrate den Namen nicht!\n\nMal für dieses Kind ein kleines Bild. 📬 Danach kommt die Post.",
          folie34: "Zieh einen Namenszettel. Verrate den Namen nicht!\n\nSchreib diesem Kind ein Kompliment: **„Ich finde toll, dass du …“** 📬 Danach kommt die Post." }
    ],
    ab12: {
      "titel": "Was macht ein guter Freund?",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Macht das ein guter Freund? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Er hilft mir.",
            "Er lacht mich aus.",
            "Er teilt mit mir.",
            "Er nimmt mir etwas weg.",
            "Er spielt mit mir."
          ],
          "art": "daumen"
        },
        {
          "typ": "ankreuzen",
          "text": "Was macht ihr gern zusammen? Kreuze an.",
          "optionen": [
            "[bild:wuerfel] spielen",
            "[bild:pinsel] malen",
            "[bild:fussball] Fußball",
            "[bild:buch] lesen"
          ],
          "nebeneinander": true
        },
        {
          "typ": "malen",
          "text": "Male dich und deinen Freund oder deine Freundin.",
          "bild": ""
        }
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

**Nach dem Vorlesen:**
1. Warum hatten in Wirrwarr alle Angst?
2. Was hat Lotta auf das Schild gemalt?
3. Was war anders, als sich alle an die Regel gehalten haben?
4. Welche Regeln kennst du in der Schule – und warum gibt es sie?

**Tipp für dich:** Sammle Regeln an der Tafel: zu Hause, in der Schule, auf der Straße.`
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
          text: "Ankündigung: „Wir spielen ein Würfelspiel. Wer gewinnt? Das sage ich nicht.“ Der Würfel wandert von Platz zu Platz. Jedes Kind würfelt, du vergibst Punkte völlig willkürlich (eine 6 bringt mal 10 Punkte, mal 0; ein Kind darf zweimal würfeln, ein anderes gar nicht). Nach zwei Minuten stoppst du.\n\nFrage: „Wie hat sich das Spiel angefühlt? Was hat gefehlt?“ – Ziel: Die Kinder merken selbst, dass ohne Regeln Unfairness und Ärger entstehen.",
          folie: "Wir spielen ein Würfelspiel. 🎲\n\nWer gewinnt? Das wird nicht verraten …" },
        { titel: "Unser Regelplakat", fuer: "alle", dauer: "9 Min",
          text: "**Schritt 1 – Vorschläge:** Jedes Kind überlegt an seinem Platz eine Regel für unsere Sozialtraining-Stunde. Kl. 1/2 sagen sie dir oder malen ein Symbol, Kl. 3/4 schreiben sie auf einen Zettel. Wichtig: Regeln positiv formulieren („Wir hören zu“ statt „Nicht reinreden“).\n\n**Schritt 2 – Abstimmen:** Du liest die Vorschläge vor. Abstimmung per Handzeichen vom Platz. Die drei bis fünf Regeln mit den meisten Stimmen kommen aufs Plakat.\n\n**Schritt 3 – Begründen und Folgen aushandeln (Kl. 3/4):** Zu jeder Regel erklärt ein Kind, warum sie wichtig ist. Dann überlegt die Gruppe: Was passiert, wenn jemand die Regel bricht? Die Folge muss fair sein und zur Regel passen (z. B. „Wer reinredet, wartet eine Runde mit dem Redestein“).\n\n**Schritt 4 – Gestalten (Kl. 1/2):** Während die Großen begründen, malen die Kleinen an ihrem Platz Symbole zu jeder Regel (Ohr für Zuhören, Herz für Freundlichkeit). Die Bilder kommen neben die Regeln aufs Plakat.",
          text12: "**Schritt 1 – Vorschläge:** Jedes Kind überlegt an seinem Platz eine Regel für unsere Sozialtraining-Stunde und sagt sie dir oder malt ein Symbol. Wichtig: Regeln positiv formulieren („Wir hören zu“ statt „Nicht reinreden“).\n\n**Schritt 2 – Abstimmen:** Du liest die Vorschläge vor. Abstimmung per Handzeichen vom Platz. Die drei bis fünf Regeln mit den meisten Stimmen schreibst du aufs Plakat.\n\n**Schritt 3 – Gestalten:** Die Kinder malen an ihrem Platz Symbole zu jeder Regel (Ohr für Zuhören, Herz für Freundlichkeit). Die Bilder kommen neben die Regeln aufs Plakat.",
          text34: "**Schritt 1 – Vorschläge:** Jedes Kind überlegt an seinem Platz eine Regel für unsere Sozialtraining-Stunde und schreibt sie auf einen Zettel. Wichtig: Regeln positiv formulieren („Wir hören zu“ statt „Nicht reinreden“).\n\n**Schritt 2 – Abstimmen:** Du liest die Vorschläge vor. Abstimmung per Handzeichen vom Platz. Die drei bis fünf Regeln mit den meisten Stimmen kommen aufs Plakat.\n\n**Schritt 3 – Begründen und Folgen aushandeln:** Zu jeder Regel erklärt ein Kind, warum sie wichtig ist. Dann überlegt die Gruppe: Was passiert, wenn jemand die Regel bricht? Die Folge muss fair sein und zur Regel passen (z. B. „Wer reinredet, wartet eine Runde mit dem Redestein“).",
          folie12: "Welche Regel hilft, dass es uns hier gut geht?\n\nSag deine Regel oder mal ein Bild dazu. Danach stimmen wir ab. ✋",
          folie34: "Welche Regel hilft, dass es uns hier gut geht?\n\nSchreib deine Regel auf einen Zettel – so: **„Wir …“** (nicht: „Nicht …“). Danach stimmen wir ab. ✋",
          kern: ["12", "34"] }
    ],
    ab12: {
      "titel": "Regeln helfen uns",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Ist das gut? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Ich warte, bis ich dran bin.",
            "Ich drängle mich vor.",
            "Ich sage bitte und danke.",
            "Ich werfe Müll auf den Boden."
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male die Ampel an: oben rot, unten grün.",
          "bild": "ampel"
        },
        {
          "typ": "malen",
          "text": "Male deine wichtigste Regel.",
          "bild": ""
        }
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
