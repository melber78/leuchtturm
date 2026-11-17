/* ============================================================
   Leuchtturm – Vertretungsstunden: ENGLISCH (Kl. 3/4)
   Für Vertretungslehrkräfte ohne Englisch-Ausbildung: jede Stunde mit
   Aussprachehilfe in deutscher Lautschrift („sprich: …“).
   Alles läuft über die Tafel: Wortkarten mit Bild zum Aufdecken,
   „What's this?“ zum Antippen, „Right or wrong?“ mit Daumen, ein Spiel.
   Arbeitsblatt nur optional für die Mappe.
   ============================================================ */
(function () {
const KAT = "Englisch (Kl. 3/4)";
if (window.SOZIAL_KATEGORIEN && !window.SOZIAL_KATEGORIEN.includes(KAT)) {
    const i = window.SOZIAL_KATEGORIEN.indexOf("Sonstiges");
    window.SOZIAL_KATEGORIEN.splice(i < 0 ? window.SOZIAL_KATEGORIEN.length : i, 0, KAT);
}
const NUM = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
const REIHE = [3, 0, 5, 1, 4, 2];           // feste „Misch“-Reihenfolge für die Abfrage

// o.woerter: [Bild, Englisch, Deutsch, sprich]
function E(o){
    const W = o.woerter, sechs = W.slice(0, 6);
    o.kategorie = KAT; o.nur34 = true; o.dauer = 40; o.ziel12 = ""; o.ohneVorbereitung = true;
    o.lerntext12 = { titel: "", text: "" };
    o.ab12 = { titel: "", aufgaben: [] };
    o.material = "Alles kommt über die Tafel – du brauchst nichts extra. Die Aussprache steht bei jedem Wort dabei (sprich: …).\nZum Ausdrucken für die Mappen (optional): das Arbeitsblatt";
    o.uebungen = [
        { titel: "New words", fuer: "34", dauer: "8 Min", quiz: "karten", loesKnopf: "💡 Wort zeigen",
          text: "Zeige das Bild. Frage: **What's this?** Wer das Wort schon kennt, darf es sagen. Dann tippst du auf „Wort zeigen“, sprichst das Wort deutlich vor – die Klasse spricht im Chor nach: einmal laut, einmal flüsternd, einmal mit Robo-Stimme.\n\n" +
              W.slice(0, 10).map(w => `- ${w[0]} (**${w[1]}** – ${w[2]} · sprich: ${w[3]})`).join("\n"),
          folie: "**What's this?** 🤔\n\nHör gut zu und sprich nach! 🗣️\n\nlaut 📢 · flüsternd 🤫 · Robo-Stimme 🤖",
          emoji: "🗣️", warum: "Wir lernen neue englische Wörter." },
        { titel: "What's this?", fuer: "34", dauer: "6 Min", quiz: "zahlen",
          text: "Ein Kind kommt nach vorn und tippt auf das richtige englische Wort. Die Klasse sagt das Wort im Chor.\n\n" +
              REIHE.filter(k => k < sechs.length).map(k => `- ${sechs[k][0]} What's this?`).join("\n"),
          antworten: sechs.map((w, k) => `${NUM[k]} ${w[1]}`),
          loesungen: REIHE.filter(k => k < sechs.length).map(k => String(k + 1)),
          folie: "**What's this?**\n\nKomm nach vorn und **tippe auf das richtige Wort**. 👆\nDann sagen es alle zusammen.",
          emoji: "👆", warum: "Wir finden das richtige englische Wort." },
        { titel: "Right or wrong?", fuer: "34", dauer: "6 Min", quiz: "daumen",
          text: "Lies den Satz deutlich vor (zweimal). Die Kinder zeigen mit dem Daumen: 👍 right · 👎 wrong. Beim Auflösen erscheint die Erklärung.\n\n" +
              o.tf.map(t => `- ${t[0]} (${t[2]})`).join("\n"),
          antworten: ["👍 right", "👎 wrong"],
          loesungen: o.tf.map(t => t[1] ? "1" : "2"),
          folie: "**Right or wrong?**\n\n👍 right · 👎 wrong\n\nHör genau hin – und zeig es mit dem Daumen!",
          emoji: "👍", warum: "Stimmt der Satz? Wir hören genau hin." },
        Object.assign({ fuer: "34", dauer: "8 Min", quiz: "keine" }, o.spiel)
    ];
    o.verlauf = [
        { zeit: "0–5",   phase: "Hello!",        k12: "–", k34: "Hello everybody! – How are you? 👍 I'm fine · 🤏 I'm okay · 👎 I'm not so good" },
        { zeit: "5–12",  phase: "Story",         k12: "–", k34: "„" + o.lerntext34.titel + "“ vorlesen (Englisch, dann Deutsch)" },
        { zeit: "12–20", phase: "New words",     k12: "–", k34: "Wortkarten: zeigen, vorsprechen, im Chor nachsprechen" },
        { zeit: "20–30", phase: "Quiz & Spiel",  k12: "–", k34: "What's this? · Right or wrong? · " + o.spiel.titel },
        { zeit: "30–38", phase: "Arbeitsblatt",  k12: "–", k34: "AB: " + o.ab34.titel + " (optional)" },
        { zeit: "38–40", phase: "Goodbye!",      k12: "–", k34: "Goodbye, everybody! – Goodbye! See you! 👋" }
    ];
    // Arbeitsblatt: immer zuerst Englisch – Deutsch verbinden
    const de = sechs.map(w => w[2]), gemischt = REIHE.filter(k => k < de.length).map(k => de[k]);
    o.ab34.aufgaben.unshift({ typ: "zuordnen", text: "Verbinde: Englisch – Deutsch.", links: sechs.map(w => w[0] + " " + w[1]), rechts: gemischt });
    return o;
}

window.SOZIAL_VORLAGEN.push(

/* ------------------------------------------------------------ */
E({
    id: "e-family",
    titel: "My family",
    ziel34: "Familienmitglieder auf Englisch benennen und vorstellen: This is my …",
    woerter: [["👩", "mum", "Mama", "mamm"], ["👨", "dad", "Papa", "dädd"], ["👧", "sister", "Schwester", "ßisster"], ["👦", "brother", "Bruder", "bradder"],
              ["👵", "grandma", "Oma", "gränd-maa"], ["👴", "grandpa", "Opa", "gränd-paa"], ["👶", "baby", "Baby", "bejbi"], ["👨‍👩‍👧‍👦", "family", "Familie", "fämili"],
              ["👩‍🦰", "aunt", "Tante", "aant"], ["👨‍🦱", "uncle", "Onkel", "anggl"]],
    lerntext34: { titel: "Tom's family", text:
`Hello! I'm Tom. 👦 I'm nine.
*(Hallo! Ich bin Tom. Ich bin neun.)*

This is my mum. 👩 And this is my dad. 👨
*(Das ist meine Mama. Und das ist mein Papa.)*

This is my sister Emma. 👧 She is seven. And this is our baby Ben. 👶
*(Das ist meine Schwester Emma. Sie ist sieben. Und das ist unser Baby Ben.)*

This is my grandma 👵 and this is my grandpa. 👴 And this is our dog Max. 🐶
*(Das ist meine Oma und das ist mein Opa. Und das ist unser Hund Max.)*

I love my family! ❤️
*(Ich hab meine Familie lieb!)*

**Nach dem Vorlesen:**
1. How old is Tom? *(Wie alt ist Tom?)* – He is nine.
2. Who is Emma? – Tom's sister.
3. Who is Ben? – The baby.
4. Wer gehört noch zu Toms Familie?` },
    tf: [["👦 This is my sister.", false, "Das ist ein Junge – brother!"], ["👵 This is my grandma.", true, "Richtig – grandma ist die Oma."],
         ["👨 This is my mum.", false, "Das ist der Papa – dad!"], ["👶 This is a baby.", true, "Richtig – baby."],
         ["👴 This is my grandpa.", true, "Richtig – grandpa ist der Opa."], ["👧 This is my brother.", false, "Das ist ein Mädchen – sister!"]],
    spiel: { titel: "Stand up if …", emoji: "🧍",
        text: "Du sagst einen Satz – wer das hat, steht auf. Erst auf Englisch, nur bei Bedarf auf Deutsch helfen. Vormachen: Du stehst selbst auf, wenn es für dich stimmt.\n\n- Stand up if you have got a sister. *(… eine Schwester hast)*\n- Stand up if you have got a brother.\n- Stand up if you have got a grandma.\n- Stand up if you have got a baby at home.\n- Stand up if you have got a dog.\n- Stand up if you have got a cat.\n\nZum Schluss: Zwei, drei Kinder stellen ihre Familie vor: **This is my …**",
        folie: "**Stand up if …** 🧍\n\n*Steh auf, wenn …*\n\n… you have got a **sister** 👧 · a **brother** 👦 · a **grandma** 👵 · a **baby** 👶 · a **dog** 🐶" },
    ab34: { titel: "My family", aufgaben: [
        { typ: "luecken", text: "Schreibe das richtige Wort. Wortspeicher: mum · dad · sister · brother · grandma", nummern: true,
          saetze: ["👩 This is my ___.", "👦 This is my ___.", "👵 This is my ___.", "👨 This is my ___.", "👧 This is my ___."] },
        { typ: "malen", text: "Draw your family! Male deine Familie und schreibe zu jedem: This is my …", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["I have got ___ brother(s) and ___ sister(s)."] }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-colours",
    titel: "Colours",
    ziel34: "Farben auf Englisch nennen und verstehen: What colour is it? – It's red.",
    woerter: [["🔴", "red", "rot", "redd"], ["🔵", "blue", "blau", "bluu"], ["🟢", "green", "grün", "grien"], ["🟡", "yellow", "gelb", "jelloh"],
              ["🟠", "orange", "orange", "orrindsch"], ["🟣", "purple", "lila", "pörpl"], ["🟤", "brown", "braun", "braun"], ["⚫", "black", "schwarz", "bläck"],
              ["⚪", "white", "weiß", "wait"], ["🩷", "pink", "rosa", "pink"]],
    lerntext34: { titel: "The rainbow", text:
`Look! 👀 A rainbow! 🌈
*(Schau! Ein Regenbogen!)*

It is red, orange and yellow. 🔴🟠🟡
*(Er ist rot, orange und gelb.)*

It is green, blue and purple. 🟢🔵🟣
*(Er ist grün, blau und lila.)*

My favourite colour is blue. 🔵 What is your favourite colour?
*(Meine Lieblingsfarbe ist blau. Was ist deine Lieblingsfarbe?)*

**Nach dem Vorlesen:**
1. Wie viele Farben hat der Regenbogen in der Geschichte?
2. What is your favourite colour? – My favourite colour is …` },
    tf: [["🍌 The banana is yellow.", true, "Richtig – yellow."], ["🍅 The tomato is blue.", false, "Die Tomate ist rot – red!"],
         ["🐸 The frog is green.", true, "Richtig – green."], ["🌙 The night is white.", false, "Die Nacht ist schwarz – black!"],
         ["🐷 The pig is pink.", true, "Richtig – pink."], ["🍊 The orange is purple.", false, "Die Orange ist orange – orange!"]],
    spiel: { titel: "Touch something …!", emoji: "👉",
        text: "Du rufst: **Touch something red!** Alle Kinder suchen vom Platz aus etwas Rotes (Kleidung, Federmappe, Heft …) und tippen darauf. Wer zuerst richtig tippt, darf die nächste Farbe rufen.\n\n- Touch something red! 🔴\n- Touch something blue! 🔵\n- Touch something green! 🟢\n- Touch something yellow! 🟡\n- Touch something black! ⚫\n- Touch something white! ⚪\n\nZum Schluss: **What colour is your pencil case?** – It's …",
        folie: "**Touch something …!** 👉\n\n*Tippe auf etwas …*\n\n🔴 red · 🔵 blue · 🟢 green · 🟡 yellow · ⚫ black · ⚪ white" },
    ab34: { titel: "Colours", aufgaben: [
        { typ: "luecken", text: "Colour it! Male in der richtigen Farbe an und schreibe die Farbe dazu.", nummern: true,
          saetze: ["🍌 The banana is ___.", "🐸 The frog is ___.", "🍅 The tomato is ___.", "🐘 The elephant is ___."] },
        { typ: "malen", text: "Draw a rainbow 🌈 and write the colours: red, orange, yellow, green, blue, purple.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["My favourite colour is ___."] }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-numbers",
    titel: "Numbers 1–20",
    ziel34: "Zahlen bis 20 auf Englisch sprechen, hören und schreiben",
    woerter: [["3️⃣", "three", "drei", "thrie – Zunge zwischen die Zähne"], ["7️⃣", "seven", "sieben", "ßewwn"], ["5️⃣", "five", "fünf", "faiv"], ["🔟", "ten", "zehn", "tenn"],
              ["2️⃣", "two", "zwei", "tuu"], ["8️⃣", "eight", "acht", "äjt"], ["1️⃣1️⃣", "eleven", "elf", "iléwwn"], ["1️⃣2️⃣", "twelve", "zwölf", "twelv"],
              ["1️⃣5️⃣", "fifteen", "fünfzehn", "fifftien"], ["2️⃣0️⃣", "twenty", "zwanzig", "twenti"]],
    lerntext34: { titel: "Count with me!", text:
`One, two, three – count with me! 🖐️
*(Eins, zwei, drei – zähl mit mir!)*

Four, five, six – pick up sticks. 🪵
*(Vier, fünf, sechs – heb Stöcke auf.)*

Seven, eight, nine – stand in line. 🧍🧍🧍
*(Sieben, acht, neun – stell dich in die Reihe.)*

Ten! 🔟 Now sit down and be fine.
*(Zehn! Jetzt setz dich hin.)*

**Nach dem Vorlesen:**
1. Zählt zusammen auf Englisch von 1 bis 10 – erst langsam, dann schnell.
2. Und jetzt rückwärts: ten, nine, eight …
3. Wer schafft es bis twenty?` },
    tf: [["🖐️ This is five.", true, "Richtig – five."], ["✌️ This is three.", false, "Das sind zwei Finger – two!"],
         ["🔟 This is ten.", true, "Richtig – ten."], ["7️⃣ This is nine.", false, "Das ist die Sieben – seven!"],
         ["1️⃣2️⃣ This is twelve.", true, "Richtig – twelve."], ["2️⃣0️⃣ This is twelve.", false, "Das ist zwanzig – twenty!"]],
    spiel: { titel: "Show me …!", emoji: "🖐️",
        text: "**Runde 1 – Show me!** Du sagst eine Zahl, die Kinder zeigen sie mit den Fingern: Show me three! · Show me seven! · Show me ten!\n\n**Runde 2 – Zahlenkette:** Die Klasse zählt reihum auf Englisch bis twenty. Bei jeder Zahl mit 5 (five, fifteen) wird stattdessen geklatscht! 👏\n\n**Runde 3 – Mathe auf Englisch:** two plus three? – five! · ten minus four? – six!",
        folie: "**Show me …!** 🖐️\n\nZeig die Zahl mit den Fingern!\n\nDann: Wir zählen bis **twenty** – bei **five** und **fifteen** klatschen! 👏" },
    ab34: { titel: "Numbers", aufgaben: [
        { typ: "tabelle", text: "Schreibe die Zahl als Wort. Wortspeicher hilft!", spalten: ["Zahl", "English"],
          zeilen: [["4", ""], ["9", ""], ["6", ""], ["13", ""], ["16", ""], ["20", ""]],
          woerter: ["four", "nine", "six", "thirteen", "sixteen", "twenty"] },
        { typ: "luecken", text: "Rechne und schreibe das Ergebnis auf Englisch.", nummern: true,
          saetze: ["two + three = ___", "five + five = ___", "ten – two = ___", "six + six = ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["I am ___ years old."] }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-animals",
    titel: "Animals",
    ziel34: "Tiere auf Englisch benennen und sagen, welches Tier man mag: I like …",
    woerter: [["🐶", "dog", "Hund", "dogg"], ["🐱", "cat", "Katze", "kätt"], ["🐭", "mouse", "Maus", "maus"], ["🐴", "horse", "Pferd", "hoors"],
              ["🐮", "cow", "Kuh", "kau"], ["🐷", "pig", "Schwein", "pigg"], ["🐦", "bird", "Vogel", "börd"], ["🐟", "fish", "Fisch", "fisch"],
              ["🐰", "rabbit", "Kaninchen", "räbbit"], ["🐸", "frog", "Frosch", "frogg"]],
    lerntext34: { titel: "On the farm", text:
`Welcome to the farm! 🚜
*(Willkommen auf dem Bauernhof!)*

The cow says moo. 🐮 The pig says oink. 🐷
*(Die Kuh macht muh. Das Schwein macht oink.)*

The horse is big. 🐴 The mouse is small. 🐭
*(Das Pferd ist groß. Die Maus ist klein.)*

The cat is black. 🐈‍⬛ The dog is brown. 🐶
*(Die Katze ist schwarz. Der Hund ist braun.)*

I like the rabbit. 🐰 It is so cute!
*(Ich mag das Kaninchen. Es ist so süß!)*

**Nach dem Vorlesen:**
1. Which animal is big? – The horse.
2. Which animal is small? – The mouse.
3. What does the cow say? – Moo!
4. Which animal do you like? – I like …` },
    tf: [["🐮 The cow says moo.", true, "Richtig – moo!"], ["🐭 The mouse is big.", false, "Die Maus ist klein – small!"],
         ["🐶 This is a cat.", false, "Das ist ein Hund – dog!"], ["🐟 A fish can swim.", true, "Richtig – ein Fisch kann schwimmen."],
         ["🐦 A bird can fly.", true, "Richtig – ein Vogel kann fliegen."], ["🐸 This is a horse.", false, "Das ist ein Frosch – frog!"]],
    spiel: { titel: "Animal moves", emoji: "🐸",
        text: "Alle stehen neben dem Platz. Du sagst, wie sich die Kinder bewegen sollen – und machst es vor:\n\n- Hop like a frog! 🐸 *(Hüpf wie ein Frosch)*\n- Fly like a bird! 🐦\n- Swim like a fish! 🐟\n- Walk like a cat! 🐱\n- Run like a horse! 🐴 *(auf der Stelle)*\n- Sleep like a mouse! 🐭 *(ganz leise – Ende)*\n\nRunde 2: Ein Kind macht ein Tier vor – die anderen raten auf Englisch: **It's a …!**",
        folie: "**Animal moves** 🐾\n\nHop like a **frog**! 🐸 · Fly like a **bird**! 🐦\nSwim like a **fish**! 🐟 · Walk like a **cat**! 🐱" },
    ab34: { titel: "Animals", aufgaben: [
        { typ: "luecken", text: "Wie heißt das Tier? Wortspeicher: dog · cat · cow · pig · horse", nummern: true,
          saetze: ["🐮 It's a ___.", "🐶 It's a ___.", "🐷 It's a ___.", "🐴 It's a ___.", "🐱 It's a ___."] },
        { typ: "ankreuzen", text: "Which animal can fly? Kreuze an.", nebeneinander: true, optionen: ["🐦 bird", "🐟 fish", "🐭 mouse", "🦆 duck"] },
        { typ: "malen", text: "Draw your favourite animal. Write: I like …", bild: "" }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-body",
    titel: "My body",
    ziel34: "Körperteile auf Englisch benennen und Anweisungen verstehen: Touch your nose!",
    woerter: [["🗣️", "head", "Kopf", "hedd"], ["👃", "nose", "Nase", "nous"], ["👄", "mouth", "Mund", "mauth – Zunge zwischen die Zähne"], ["👀", "eyes", "Augen", "ais"],
              ["👂", "ears", "Ohren", "iers"], ["✋", "hand", "Hand", "händ"], ["💪", "arm", "Arm", "aarm"], ["🦵", "leg", "Bein", "legg"],
              ["🦶", "foot", "Fuß", "futt"], ["💇", "hair", "Haare", "häär"]],
    lerntext34: { titel: "The funny monster", text:
`Look at my monster! 👾
*(Schau dir mein Monster an!)*

It has got one big head. 🗣️ It has got three eyes. 👀👁️
*(Es hat einen großen Kopf. Es hat drei Augen.)*

It has got two noses 👃👃 and a big, big mouth. 👄
*(Es hat zwei Nasen und einen großen, großen Mund.)*

It has got four arms 💪 and only one leg. 🦵
*(Es hat vier Arme und nur ein Bein.)*

My monster is green and it is very funny! 😂
*(Mein Monster ist grün und sehr lustig!)*

**Nach dem Vorlesen:**
1. How many eyes has the monster got? – Three.
2. How many legs? – One.
3. Malt das Monster an die Tafel – so, wie es in der Geschichte steht!` },
    tf: [["👃 This is my nose.", true, "Richtig – nose."], ["👂 These are my eyes.", false, "Das sind die Ohren – ears!"],
         ["🦶 This is my foot.", true, "Richtig – foot."], ["✋ This is my leg.", false, "Das ist eine Hand – hand!"],
         ["👀 These are my eyes.", true, "Richtig – eyes."], ["👄 This is my nose.", false, "Das ist der Mund – mouth!"]],
    spiel: { titel: "Simon says", emoji: "🙋",
        text: "Alle stehen. Du sagst Anweisungen. **Nur wenn du vorher „Simon says“ sagst**, machen die Kinder es. Ohne „Simon says“ bleiben alle stehen – wer trotzdem tippt, setzt sich (oder macht beim nächsten Mal wieder mit).\n\n- Simon says: touch your nose! 👃\n- Simon says: touch your ears! 👂\n- Touch your head! *(ohne Simon says – nicht machen!)*\n- Simon says: wave your hand! ✋\n- Simon says: shake your leg! 🦵\n- Close your eyes! *(ohne Simon says!)*\n- Simon says: open your mouth! 👄",
        folie: "**Simon says …** 🙋\n\nNur wenn **Simon says** davor steht, machst du mit!\n\ntouch your **nose** 👃 · your **ears** 👂 · your **head** 🗣️" },
    ab34: { titel: "My body", aufgaben: [
        { typ: "malen", text: "Draw a monster! Male ein Monster nach dem Diktat: It has got two heads, four eyes, one nose, three arms and two legs.", bild: "" },
        { typ: "luecken", text: "Schreibe das richtige Wort. Wortspeicher: nose · ears · hand · eyes", nummern: true,
          saetze: ["👃 This is my ___.", "✋ This is my ___.", "👀 These are my ___.", "👂 These are my ___."] }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-clothes",
    titel: "Clothes",
    ziel34: "Kleidungsstücke auf Englisch benennen und mit Farbe beschreiben: I'm wearing a red jumper.",
    woerter: [["👕", "T-shirt", "T-Shirt", "tie-schört"], ["👖", "trousers", "Hose", "trausers"], ["🧥", "jacket", "Jacke", "dschäckit"], ["👗", "dress", "Kleid", "dress"],
              ["🧦", "socks", "Socken", "ßocks"], ["👟", "shoes", "Schuhe", "schuus"], ["🧢", "cap", "Mütze (Schirmmütze)", "käpp"], ["🧣", "scarf", "Schal", "skaaf"],
              ["🧤", "gloves", "Handschuhe", "glaws"], ["🥾", "boots", "Stiefel", "buuts"]],
    lerntext34: { titel: "It's cold!", text:
`Brrr! It's cold today! 🥶
*(Brrr! Heute ist es kalt!)*

Mum says: "Put on your jacket!" 🧥
*(Mama sagt: „Zieh deine Jacke an!“)*

"And your scarf and your gloves!" 🧣🧤
*(„Und deinen Schal und deine Handschuhe!“)*

I put on my boots. 🥾 Now I'm ready!
*(Ich ziehe meine Stiefel an. Jetzt bin ich fertig!)*

Oh no – where is my cap? 🧢
*(Oh nein – wo ist meine Mütze?)*

**Nach dem Vorlesen:**
1. Is it hot or cold? – It's cold.
2. Was zieht das Kind alles an?
3. What are you wearing today? – I'm wearing …` },
    tf: [["🧦 These are socks.", true, "Richtig – socks."], ["👗 This is a T-shirt.", false, "Das ist ein Kleid – dress!"],
         ["🧣 This is a scarf.", true, "Richtig – scarf."], ["👟 These are gloves.", false, "Das sind Schuhe – shoes!"],
         ["🧥 This is a jacket.", true, "Richtig – jacket."], ["👖 This is a cap.", false, "Das ist eine Hose – trousers!"]],
    spiel: { titel: "Stand up if you're wearing …", emoji: "👕",
        text: "Du sagst einen Satz – wer das anhat, steht auf. Schau dich vorher in der Klasse um und wähle Dinge, die wirklich jemand trägt.\n\n- Stand up if you're wearing blue trousers! 👖\n- Stand up if you're wearing a black T-shirt! 👕\n- Stand up if you're wearing white socks! 🧦\n- Stand up if you're wearing a jumper! \n- Stand up if you're wearing red shoes! 👟\n\nZum Schluss: Ein Kind beschreibt eine Person aus der Klasse – **She/He is wearing …** – die anderen raten.",
        folie: "**Stand up if you're wearing …** 🧍\n\n*Steh auf, wenn du … anhast*\n\n**blue** trousers 👖 · a **black** T-shirt 👕 · **white** socks 🧦" },
    ab34: { titel: "Clothes", aufgaben: [
        { typ: "luecken", text: "Schreibe das richtige Wort. Wortspeicher: jacket · socks · scarf · shoes · dress", nummern: true,
          saetze: ["🧥 This is a ___.", "🧣 This is a ___.", "👗 This is a ___.", "🧦 These are ___.", "👟 These are ___."] },
        { typ: "malen", text: "Dress the doll! Male eine Person an: a red T-shirt, blue trousers, a green cap and black shoes.", bild: "" }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-food",
    titel: "Food and drinks",
    ziel34: "Essen und Getränke auf Englisch benennen und sagen, was man mag: I like … / I don't like …",
    woerter: [["🍎", "apple", "Apfel", "äppl"], ["🍌", "banana", "Banane", "benaana"], ["🍞", "bread", "Brot", "bredd"], ["🧀", "cheese", "Käse", "tschies"],
              ["🥛", "milk", "Milch", "milk"], ["💧", "water", "Wasser", "wooter"], ["🍕", "pizza", "Pizza", "pietsa"], ["🍰", "cake", "Kuchen", "kejk"],
              ["🥕", "carrot", "Möhre", "kärrot"], ["🍫", "chocolate", "Schokolade", "tschocklet"]],
    lerntext34: { titel: "Lunch time", text:
`It's lunch time! 🍽️ I'm hungry!
*(Es ist Mittagszeit! Ich habe Hunger!)*

I like pizza. 🍕 Yummy!
*(Ich mag Pizza. Lecker!)*

I like apples 🍎 and bananas. 🍌
*(Ich mag Äpfel und Bananen.)*

I don't like carrots. 🥕 Yuck!
*(Ich mag keine Möhren. Igitt!)*

And to drink? Milk, please! 🥛
*(Und zu trinken? Milch, bitte!)*

**Nach dem Vorlesen:**
1. What does the child like? – Pizza, apples, bananas.
2. What does the child not like? – Carrots.
3. What do you like? – I like …` },
    tf: [["🍎 This is an apple.", true, "Richtig – apple."], ["🧀 This is bread.", false, "Das ist Käse – cheese!"],
         ["🥛 This is milk.", true, "Richtig – milk."], ["🍌 This is a carrot.", false, "Das ist eine Banane – banana!"],
         ["🍰 This is cake.", true, "Richtig – cake."], ["🍕 This is water.", false, "Das ist Pizza – pizza!"]],
    spiel: { titel: "Yummy or yuck?", emoji: "😋",
        text: "Du nennst ein Essen. Die Kinder zeigen: 👍 und rufen **Yummy!** (mag ich) oder 👎 und rufen **Yuck!** (mag ich nicht). Dann sagen zwei Kinder einen ganzen Satz: **I like …** / **I don't like …**\n\n- pizza 🍕\n- carrots 🥕\n- chocolate 🍫\n- cheese 🧀\n- apples 🍎\n- milk 🥛\n\nRunde 2 – Restaurant: Ein Kind ist Kellner und fragt **What would you like?** – ein anderes antwortet **Pizza, please!** – **Here you are!** – **Thank you!**",
        folie: "**Yummy or yuck?** 😋🤢\n\n👍 Yummy! = Lecker! · 👎 Yuck! = Igitt!\n\n**I like …** · **I don't like …**" },
    ab34: { titel: "Food and drinks", aufgaben: [
        { typ: "tabelle", text: "Sortiere: Was magst du, was magst du nicht? Schreibe die englischen Wörter.", spalten: ["I like 👍", "I don't like 👎"],
          zeilen: [["", ""], ["", ""], ["", ""]], woerter: ["apple", "banana", "bread", "cheese", "milk", "pizza", "cake", "carrot"] },
        { typ: "malen", text: "Draw your favourite lunch. Write: I like …", bild: "" }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-school",
    titel: "My school things",
    ziel34: "Schulsachen auf Englisch benennen und fragen: Have you got a …?",
    woerter: [["🖊️", "pen", "Füller / Stift", "penn"], ["✏️", "pencil", "Bleistift", "penssl"], ["📏", "ruler", "Lineal", "ruuler"], ["📕", "book", "Buch", "buck"],
              ["🎒", "school bag", "Schulranzen", "skuul bägg"], ["✂️", "scissors", "Schere", "ßissors"], ["🧴", "glue", "Kleber", "gluu"], ["🖍️", "crayon", "Wachsmalstift", "krejon"],
              ["🧽", "rubber", "Radiergummi", "rabber"], ["📓", "exercise book", "Heft", "exersais buck"]],
    lerntext34: { titel: "Where is my pencil?", text:
`Oh no! Where is my pencil? ✏️
*(Oh nein! Wo ist mein Bleistift?)*

Is it in my school bag? 🎒 No!
*(Ist er in meinem Schulranzen? Nein!)*

Is it under my book? 📕 No!
*(Ist er unter meinem Buch? Nein!)*

Is it in my pencil case? No!
*(Ist er in meiner Federmappe? Nein!)*

Ha! It's behind my ear! 👂✏️
*(Ha! Er steckt hinter meinem Ohr!)*

**Nach dem Vorlesen:**
1. What is lost? – The pencil.
2. Where is it? – Behind the ear.
3. Was hast du heute in deinem Ranzen? Zeig es und sag es auf Englisch!` },
    tf: [["✂️ These are scissors.", true, "Richtig – scissors."], ["📏 This is a pencil.", false, "Das ist ein Lineal – ruler!"],
         ["🎒 This is a school bag.", true, "Richtig – school bag."], ["📕 This is glue.", false, "Das ist ein Buch – book!"],
         ["🖍️ This is a crayon.", true, "Richtig – crayon."], ["✏️ This is a rubber.", false, "Das ist ein Bleistift – pencil!"]],
    spiel: { titel: "Show me your …!", emoji: "🎒",
        text: "Du sagst: **Show me your …!** Alle Kinder halten den Gegenstand so schnell wie möglich hoch. Wer es zuerst hat, darf die nächste Aufforderung sagen.\n\n- Show me your pencil! ✏️\n- Show me your ruler! 📏\n- Show me your rubber! 🧽\n- Show me your glue! 🧴\n- Show me your scissors! ✂️\n- Show me a book! 📕\n\nRunde 2 – Kim-Spiel: Leg 5 Schulsachen aufs Pult. Alle schließen die Augen (**Close your eyes!**), du nimmst eins weg. **Open your eyes! What's missing?** – The …!",
        folie: "**Show me your …!** 🎒\n\nHalte es hoch – so schnell du kannst!\n\npencil ✏️ · ruler 📏 · rubber 🧽 · glue 🧴 · scissors ✂️" },
    ab34: { titel: "My school things", aufgaben: [
        { typ: "luecken", text: "Schreibe das richtige Wort. Wortspeicher: pencil · ruler · book · glue · scissors", nummern: true,
          saetze: ["✏️ This is a ___.", "📏 This is a ___.", "📕 This is a ___.", "🧴 This is ___.", "✂️ These are ___."] },
        { typ: "malen", text: "Draw your school bag and what is in it. Write: In my school bag there is a …", bild: "" }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-weather",
    titel: "Weather and days",
    ziel34: "Das Wetter beschreiben (It's sunny.) und die Wochentage kennen",
    woerter: [["☀️", "sunny", "sonnig", "ßanni"], ["🌧️", "rainy", "regnerisch", "rejni"], ["☁️", "cloudy", "bewölkt", "klaudi"], ["💨", "windy", "windig", "windi"],
              ["❄️", "snowy", "verschneit", "snoui"], ["🥶", "cold", "kalt", "kould"], ["🥵", "hot", "heiß", "hott"], ["📅 Mo", "Monday", "Montag", "mandej"],
              ["📅 Fr", "Friday", "Freitag", "fraidej"], ["📅 So", "Sunday", "Sonntag", "ßandej"]],
    lerntext34: { titel: "What's the weather like?", text:
`On Monday it's sunny. ☀️ Let's go to the park!
*(Am Montag ist es sonnig. Lass uns in den Park gehen!)*

On Tuesday it's rainy. 🌧️ Take your umbrella! ☂️
*(Am Dienstag regnet es. Nimm deinen Regenschirm!)*

On Wednesday it's windy. 💨 Let's fly a kite! 🪁
*(Am Mittwoch ist es windig. Lass uns einen Drachen steigen lassen!)*

On Thursday it's snowy. ❄️ Let's build a snowman! ⛄
*(Am Donnerstag schneit es. Lass uns einen Schneemann bauen!)*

And on Friday? It's cloudy and cold. ☁️🥶 Let's stay at home!
*(Und am Freitag? Es ist bewölkt und kalt. Lass uns zu Hause bleiben!)*

**Nach dem Vorlesen:**
1. What's the weather like on Monday? – It's sunny.
2. On which day can you build a snowman? – On Thursday.
3. Look out of the window: What's the weather like today? – It's …` },
    tf: [["☀️ It's sunny.", true, "Richtig – sunny."], ["❄️ It's hot.", false, "Schnee ist kalt – cold / snowy!"],
         ["🌧️ It's rainy.", true, "Richtig – rainy."], ["💨 It's cloudy.", false, "Das ist Wind – windy!"],
         ["Sunday is Sonntag.", true, "Richtig – Sunday."], ["Monday is Freitag.", false, "Monday ist Montag!"]],
    spiel: { titel: "Weather dance", emoji: "🌦️",
        text: "Zu jedem Wetter gibt es eine Bewegung. Erst alle zusammen üben, dann rufst du das Wetter immer schneller.\n\n- It's sunny! ☀️ → Arme als große Sonne über dem Kopf\n- It's rainy! 🌧️ → mit den Fingern trommeln\n- It's windy! 💨 → hin und her schwanken\n- It's snowy! ❄️ → mit den Fingern Schneeflocken fallen lassen\n- It's cold! 🥶 → zittern, Arme reiben\n- It's hot! 🥵 → sich Luft zufächeln\n\nZum Schluss die Wochentage im Chor: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday!",
        folie: "**Weather dance** 🌦️\n\n☀️ sunny · 🌧️ rainy · 💨 windy\n❄️ snowy · 🥶 cold · 🥵 hot" },
    ab34: { titel: "Weather and days", aufgaben: [
        { typ: "luecken", text: "What's the weather like? Wortspeicher: sunny · rainy · windy · snowy", nummern: true,
          saetze: ["☀️ It's ___.", "🌧️ It's ___.", "❄️ It's ___.", "💨 It's ___."] },
        { typ: "tabelle", text: "My weather week: Male für jeden Tag das Wetter.", spalten: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], zeilen: [["", "", "", "", ""]] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Today is ___. It's ___."] }
    ]}
}),

/* ------------------------------------------------------------ */
E({
    id: "e-christmas",
    titel: "Christmas",
    ziel34: "Weihnachtswörter auf Englisch kennen und Weihnachtswünsche sagen: Merry Christmas! I wish for …",
    woerter: [["🎄", "Christmas tree", "Weihnachtsbaum", "krissmes trie"], ["⭐", "star", "Stern", "staar"], ["🎁", "present", "Geschenk", "presnt"], ["🕯️", "candle", "Kerze", "kändl"],
              ["🎅", "Father Christmas", "Weihnachtsmann", "faader krissmes"], ["⛄", "snowman", "Schneemann", "snoumän"], ["🔔", "bell", "Glocke", "bell"], ["🦌", "reindeer", "Rentier", "rejndier"],
              ["👼", "angel", "Engel", "ejndschl"], ["🧦", "stocking", "Strumpf", "stocking"]],
    lerntext34: { titel: "A letter to Father Christmas", text:
`Dear Father Christmas, 🎅
*(Lieber Weihnachtsmann,)*

my name is Lisa. I am nine. 👧
*(ich heiße Lisa. Ich bin neun.)*

I have been very good this year. 😇
*(Ich war dieses Jahr sehr brav.)*

For Christmas I wish for a red bike 🚲 and a big book about horses. 🐴📕
*(Zu Weihnachten wünsche ich mir ein rotes Fahrrad und ein dickes Buch über Pferde.)*

Say hello to your reindeer! 🦌 Merry Christmas!
*(Grüß deine Rentiere! Frohe Weihnachten!)*

Love, Lisa ❤️

**Nach dem Vorlesen:**
1. Who is the letter for? – Father Christmas.
2. What does Lisa wish for? – A red bike and a book about horses.
3. What do you wish for? – I wish for …` },
    tf: [["🎄 This is a Christmas tree.", true, "Richtig – Christmas tree."], ["🎁 This is a candle.", false, "Das ist ein Geschenk – present!"],
         ["⭐ This is a star.", true, "Richtig – star."], ["⛄ This is an angel.", false, "Das ist ein Schneemann – snowman!"],
         ["🦌 This is a reindeer.", true, "Richtig – reindeer."], ["🔔 This is a stocking.", false, "Das ist eine Glocke – bell!"]],
    spiel: { titel: "Pack the present", emoji: "🎁",
        text: "Ein Merk-Spiel im Kreis oder reihum vom Platz: Das erste Kind sagt **In my present there is a teddy.** Das nächste wiederholt und ergänzt: **In my present there is a teddy and a ball.** Wie lang wird die Kette? Hilfe-Wörter stehen an der Tafel.\n\n- teddy 🧸\n- ball ⚽\n- book 📕\n- doll 🪆\n- bike 🚲\n- game 🎲\n\nZum Schluss rufen alle zusammen: **Merry Christmas!** 🎄",
        folie: "**Pack the present** 🎁\n\n*In my present there is a …*\n\nteddy 🧸 · ball ⚽ · book 📕 · doll 🪆 · bike 🚲 · game 🎲" },
    ab34: { titel: "Christmas", aufgaben: [
        { typ: "luecken", text: "Schreibe das richtige Wort. Wortspeicher: star · present · candle · snowman · bell", nummern: true,
          saetze: ["⭐ This is a ___.", "🎁 This is a ___.", "🕯️ This is a ___.", "⛄ This is a ___.", "🔔 This is a ___."] },
        { typ: "luecken", text: "Write a letter to Father Christmas!", nummern: false, saetze: ["Dear Father Christmas,", "my name is ___. I am ___.", "For Christmas I wish for ___.", "Merry Christmas! Love, ___"] },
        { typ: "malen", text: "Draw your Christmas tree 🎄 with a star on top.", bild: "" }
    ]}
})

);
})();
