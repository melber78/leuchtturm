/* Leuchtturm – Sozialtraining: Vorlagen Teil 2 (Gefühle, Konflikte lösen)
   Format wie in sozial-einheiten.js beschrieben. */
window.SOZIAL_VORLAGEN.push(

/* ============================== GEFÜHLE ============================== */
SOZIAL_EINHEIT({
    id: "v-wut-werkzeugkasten",
    titel: "Mein Wut-Werkzeugkasten",
    kategorie: "Gefühle",
    ziel12: "Merken, wann ich wütend werde, und zwei Beruhigungs-Tricks kennen",
    ziel34: "Warnsignale der Wut erkennen und eigene Wut-Werkzeuge auswählen",
    material: "Bild eines Vulkans (Tafel)\nKärtchen mit Wut-Werkzeugen (atmen, zählen, weggehen, erzählen, Kissen drücken, malen, hauen, schreien) – je ein Satz pro Tischpaar",
    lerntext12: { titel: "Vulki, der kleine Vulkan", text:
`Vulki ist ein kleiner Vulkan. Meistens ist er ganz friedlich.

Aber manchmal ärgert er sich. Dann brodelt es in seinem Bauch. Es wird heiß und immer heißer. Und dann – **BUMM!** – spuckt Vulki Feuer. Alle Tiere laufen weg.

Danach ist Vulki allein. Das findet er doof.

Die Eule sagt: „Vulki, wenn es in dir brodelt, mach es so: Atme tief ein und langsam aus. Zähle bis zehn. Oder geh kurz weg.“

Am nächsten Tag ärgert sich Vulki wieder. Es brodelt. Aber diesmal atmet er tief ein … und aus. Er zählt bis zehn. Das Feuer bleibt drin. Vulki ist stolz.

**Nach dem Vorlesen:**
1. Was passiert mit Vulki, wenn er sich ärgert?
2. Warum war Vulki nach dem BUMM allein?
3. Welchen Tipp hat die Eule Vulki gegeben?
4. Wo spürst du Wut in deinem Körper? Zeig es am Platz.` },
    lerntext34: { titel: "Jonas und die Wutwelle", text:
`Beim Fußball in der Pause schießt Jonas am leeren Tor vorbei. Kevin lacht laut: „Wie kann man den denn nicht reinmachen?“

Jonas spürt sofort die Wutwelle. Sein Gesicht wird heiß, seine Hände werden zu Fäusten, sein Herz rast. In seinem Kopf ist nur noch ein Gedanke: Dem zeig ich's!

Doch dann erinnert er sich an das, was sie im Sozialtraining besprochen haben: **Stopp – Atmen – Denken.** Er bleibt stehen. Er atmet dreimal tief durch. Und er denkt: Wenn ich jetzt haue, bekomme ich Ärger – und Kevin hat gewonnen.

Jonas geht ein paar Schritte weg und trinkt einen Schluck Wasser. Nach der Pause sagt er zu Kevin: „Das hat mich echt geärgert, dass du mich ausgelacht hast.“ Kevin zuckt mit den Schultern. „Sorry. War blöd.“

Jonas merkt: Die Wut war trotzdem da. Aber diesmal hat er entschieden, was passiert.

**Fragen zum Gespräch:**
1. Woran hat Jonas gemerkt, dass er wütend wird?
2. Was bedeuten die drei Schritte Stopp – Atmen – Denken?
3. War es richtig, dass Jonas später mit Kevin gesprochen hat? Warum?
4. Ist Wut ein schlechtes Gefühl? Was meinst du?` },
    uebungen: [
        { titel: "Ballon-Atmen", fuer: "alle", dauer: "3 Min",
          text: "Alle sitzen aufrecht am Platz, eine Hand liegt auf dem Bauch. Einatmen durch die Nase – der Bauch wird ein dicker Ballon. Langsam durch den Mund ausatmen – die Luft geht aus dem Ballon. Fünfmal. Frage danach: „Wie fühlt sich dein Körper jetzt an?“",
          folie: "Setz dich gerade hin. Leg eine Hand auf den Bauch. 🎈\n\nDurch die Nase einatmen – der Bauch wird ein dicker Ballon.\nLangsam durch den Mund ausatmen – die Luft geht raus.\n\n**5-mal.**",
          kern: ["12"],
          emoji: "🎈",
          warum: "Wir lernen einen Trick, der hilft, wenn die Wut kommt." },
        { titel: "Wut-Thermometer", fuer: "alle", dauer: "4 Min",
          text: "Du liest Situationen vor. Die Kinder zeigen am Platz mit dem Arm, wie wütend sie das machen würde: Hand auf dem Tisch = gar nicht, Arm ganz hoch = kochend heiß.\n\n- Jemand schubst mich in der Schlange.\n- Mein Bruder isst meinen Nachtisch.\n- Ich verliere beim Spiel.\n- Jemand lacht über mein Bild.\n\nWichtig: Jeder darf anders wütend sein – das ist normal.",
          antworten: ["✋ gar nicht wütend", "💪 etwas wütend", "🙌 kochend heiß"],
          folie: "Wie **wütend** würde dich das machen?\n\nHand auf dem Tisch = gar nicht · Arm halb hoch = etwas · Arm ganz hoch = kochend heiß! 🌡️\n\nJeder darf anders wütend sein.",
          emoji: "🌡️",
          warum: "Nicht alles macht gleich wütend. Wir messen: Wie heiß wird es bei dir?" },
        { titel: "Werkzeugkasten sortieren", fuer: "34", dauer: "5 Min",
          text: "Die Tischnachbarn bekommen die Werkzeug-Kärtchen und legen zwei Häufchen: „Hilft mir und schadet keinem“ und „Macht es schlimmer“. Danach stellt jedes Paar ein Werkzeug vor, das es selbst ausprobieren will. Kl. 1/2 zeigen in derselben Zeit am Platz ihren Lieblings-Trick vor (z. B. Fäuste ganz fest drücken und wieder loslassen).",
          folie: "Ihr bekommt Werkzeug-Kärtchen. Legt zwei Häufchen:\n\n✅ **Hilft mir und schadet keinem**\n❌ **Macht es schlimmer**\n\nWelches Werkzeug willst du ausprobieren?",
          kern: ["34"],
          emoji: "🧰",
          warum: "Wir sortieren: Was hilft gegen Wut – und was macht es schlimmer?" }
    ],
    ab12: {
      "titel": "Wenn ich wütend bin",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gesichter",
          "text": "Male die Gesichter fertig: wütend – und wieder ruhig.",
          "gefuehle": [
            "wütend",
            "ruhig"
          ],
          "leer": true
        },
        {
          "typ": "daumen",
          "text": "Was hilft, wenn du wütend bist? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "tief atmen",
            "bis 10 zählen",
            "jemanden hauen",
            "kurz weggehen",
            "laut schreien und treten"
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male deinen besten Wut-Trick.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Mein Wut-Werkzeugkasten", aufgaben: [
        { typ: "luecken", text: "Meine Wut-Warnsignale: Woran merkst du, dass du wütend wirst?", nummern: false,
          saetze: ["In meinem Körper: ___", "In meinem Gesicht: ___", "In meinem Kopf denke ich: ___"] },
        { typ: "tabelle", text: "Hilft das (H) oder macht es schlimmer (S)? Kreuze die richtige Spalte an.", spalten: ["Was ich tue", "H", "S"],
          zeilen: [["Ich atme dreimal tief durch.", "", ""], ["Ich werfe mit Sachen.", "", ""], ["Ich gehe kurz aus der Situation.", "", ""], ["Ich beschimpfe den anderen.", "", ""], ["Ich erzähle es später einem Erwachsenen.", "", ""], ["Ich drücke ganz fest ein Kissen.", "", ""]] },
        { typ: "luecken", text: "Wähle deine drei besten Wut-Werkzeuge.", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "Stopp – Atmen – Denken: Wann probierst du es diese Woche aus?", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-traurig-troesten",
    titel: "Traurig sein und trösten",
    kategorie: "Gefühle",
    ziel12: "Traurigkeit erkennen und wissen, wie man jemanden tröstet",
    ziel34: "Verstehen, dass Traurigkeit dazugehört, und passende Trostworte finden",
    material: "Ein Kuscheltier als „trauriger Teddy“ auf deinem Tisch\nKleine Karten oder Zettel für die Trost-Post\nHinweis: Hat ein Kind gerade einen Verlust erlebt, vorher behutsam mit ihm sprechen.",
    lerntext12: { titel: "Emmas Luftballon", text:
`Emma hat auf dem Fest einen roten Luftballon bekommen. Sie hält ihn ganz fest.

Plötzlich weht ein Wind. Die Schnur rutscht aus Emmas Hand. Der Ballon fliegt weg – hoch in den Himmel. Emma weint. Sie ist **traurig**.

Ben sieht das. Er lacht nicht. Er setzt sich neben Emma. Er gibt ihr ein Taschentuch und sagt: „Das ist echt doof. Dein Ballon war so schön.“

Emma schnieft. Ben bleibt einfach bei ihr sitzen. Nach einer Weile sagt Emma: „Danke, dass du da bist.“ Und sie lächelt ein kleines bisschen.

**Nach dem Vorlesen:**
1. Warum war Emma traurig?
2. Was hat Ben gemacht, als er Emma weinen sah?
3. Warum hat Ben nicht gelacht?
4. Was hilft dir, wenn du traurig bist?

**Tipp für dich:** Sammle an der Tafel: da sein, Taschentuch geben, nicht lachen, freundlich reden.` },
    lerntext34: { titel: "Der leere Käfig", text:
`Als Finn am Montag in die Klasse kommt, ist er ganz still. Er setzt sich an seinen Platz und schaut aus dem Fenster. In der Pause bleibt er sitzen.

Leon fragt: „Was ist denn mit dir?“ Finn zuckt mit den Schultern. Dann sagt er leise: „Hoppel ist gestorben.“ Hoppel war sein Kaninchen.

„Ach, das ist doch nur ein Kaninchen“, sagt Leon. „Du kriegst bestimmt ein neues.“ Finn dreht sich weg. Er fühlt sich noch schlechter.

Aylin hat zugehört. Sie setzt sich zu Finn und sagt erst mal gar nichts. Dann fragt sie: „Willst du mir von Hoppel erzählen?“ Finn nickt. Er erzählt, wie Hoppel immer Löwenzahn aus seiner Hand gefressen hat. Dabei weint er ein bisschen – und lacht auch ein bisschen.

Am Ende sagt Finn: „Danke, Aylin. Das hat gutgetan.“

**Fragen zum Gespräch:**
1. Warum hat Leons Satz Finn nicht geholfen, obwohl Leon es vielleicht gut gemeint hat?
2. Was hat Aylin anders gemacht?
3. Ist es in Ordnung, traurig zu sein und zu weinen – auch für Jungen?
4. Was hilft dir, wenn du traurig bist?` },
    uebungen: [
        { titel: "Trostworte sammeln", fuer: "alle", dauer: "4 Min",
          text: "Sammle an der Tafel Sätze und Taten, die trösten. Die Kinder melden sich vom Platz. Kl. 1/2 dürfen auch Taten vorspielen (Hand auf die Schulter legen, Taschentuch reichen). Am Ende: „Welcher Trost passt zu dir am besten?“",
          folie: "Was hilft, wenn jemand **traurig** ist?\n\nSag einen Satz oder etwas, das man tun kann.",
          folie12: "Was hilft, wenn jemand **traurig** ist?\n\nSag einen Satz – oder zeig, was man tun kann.",
          emoji: "💙",
          warum: "Wir sammeln, was hilft, wenn jemand traurig ist." },
        { titel: "Hilft das wirklich?", fuer: "34", dauer: "4 Min",
          text: "Du liest Reaktionen vor, die Kinder zeigen Daumen hoch oder runter und begründen kurz:\n\n- „Hör auf zu heulen!“\n- „Ich bin für dich da.“\n- „Ist doch nicht so schlimm.“\n- „Willst du darüber reden?“\n- Einfach still daneben sitzen.",
          antworten: ["👍 hilft", "👎 hilft nicht"],
          folie: "Jemand ist traurig. Hilft dieser Satz?\n\n👍 hilft · 👎 hilft nicht – und warum?",
          kern: ["34"],
          loesungen: ["2", "1", "2", "1", "1"],
          emoji: "🤔",
          warum: "Nicht jeder Satz tröstet. Wir prüfen: Hilft das wirklich?" },
        { titel: "Trost-Post für den Teddy", fuer: "alle", dauer: "4 Min",
          text: "Auf deinem Tisch sitzt der „traurige Teddy“ – er hat seinen besten Freund verloren. Jedes Kind macht ihm an seinem Platz eine Trostkarte: Kl. 1/2 malen, Kl. 3/4 schreiben zwei Sätze. Die Karten werden vorn neben den Teddy gelegt.",
          text12: "Auf deinem Tisch sitzt der „traurige Teddy“ – er hat seinen besten Freund verloren. Jedes Kind malt ihm an seinem Platz eine Trostkarte. Die Karten werden vorn neben den Teddy gelegt.",
          text34: "Auf deinem Tisch sitzt der „traurige Teddy“ – er hat seinen besten Freund verloren. Jedes Kind schreibt ihm an seinem Platz eine Trostkarte mit zwei Sätzen. Die Karten werden vorn neben den Teddy gelegt.",
          folie12: "Der Teddy ist traurig. Er hat seinen besten Freund verloren. 🧸\n\nMal ihm eine **Trostkarte**.",
          folie34: "Der Teddy ist traurig. Er hat seinen besten Freund verloren. 🧸\n\nSchreib ihm eine **Trostkarte** mit zwei Sätzen.",
          kern: ["12"],
          emoji: "🧸",
          warum: "Der Teddy ist traurig. Wir trösten ihn mit einer Karte." }
    ],
    ab12: {
      "titel": "Ich kann trösten",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gesichter",
          "text": "So fühlt sich Emma vorher – und nachher. Male die Gesichter an.",
          "gefuehle": [
            "traurig",
            "froh"
          ],
          "leer": false
        },
        {
          "typ": "daumen",
          "text": "Jemand ist traurig. Hilft das? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Ich setze mich daneben.",
            "Ich lache.",
            "Ich gebe ein Taschentuch.",
            "Ich laufe weg.",
            "Ich frage: „Was ist los?“"
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male, wie du jemanden tröstest.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Trösten – aber wie?", kontext: "Zur Geschichte: Finns Kaninchen Hoppel ist gestorben. Leon sagt: „Ist doch nur ein Kaninchen.“ Aylin setzt sich zu Finn und hört ihm zu.", aufgaben: [
        { typ: "tabelle", text: "Hilft der Satz einem traurigen Kind? Schreibe ja oder nein und warum.", spalten: ["Satz", "Hilft das? Warum?"],
          zeilen: [["„Ist doch nicht so schlimm!“", ""], ["„Ich bin für dich da.“", ""], ["„Hör auf zu weinen!“", ""], ["„Willst du erzählen, was passiert ist?“", ""]] },
        { typ: "luecken", text: "Wenn ich traurig bin …", nummern: false,
          saetze: ["… hilft mir: ___", "… mag ich nicht, wenn ___", "… gehe ich gern zu: ___"] },
        { typ: "luecken", text: "Schreibe Finn eine Trostkarte.", nummern: false, saetze: ["Lieber Finn, ___", "___", "___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-angst-okay",
    titel: "Angst haben ist okay",
    kategorie: "Gefühle",
    ziel12: "Angst als Gefühl kennen und sagen, was mir Mut macht",
    ziel34: "Unterscheiden, wann Angst schützt und wann sie bremst, und Mutmacher sammeln",
    material: "Kleine Taschenlampe oder Nachtlicht (für den Lerntext 1/2)\nTafel für die Mutmacher-Sätze",
    lerntext12: { titel: "Bruno und die Nacht", text:
`Bruno ist ein kleiner Bär. Am Abend liegt er in seinem Bett. Das Licht ist aus. Es ist ganz dunkel.

Da knackt es! Bruno zieht die Decke über den Kopf. Sein Herz klopft schnell. Bruno hat **Angst**.

„Mama!“, ruft er. Mama Bär kommt. Sie setzt sich auf das Bett. „Angst haben ist okay“, sagt sie. „Das knackt nur der alte Schrank.“

Mama macht ein kleines Licht an. Bruno nimmt seinen Kuschelhasen in den Arm. Er atmet tief ein und aus. Jetzt ist er ruhiger.

„Morgen“, sagt Bruno, „bin ich vielleicht schon ein bisschen mutiger.“

**Nach dem Vorlesen:**
1. Wovor hatte Bruno Angst?
2. Woran hast du gemerkt, dass Bruno Angst hatte?
3. Was hat Bruno gegen die Angst geholfen?
4. Was hilft dir, wenn du Angst hast?

**Tipp für dich:** Mögliche Antworten: Mama holen, Licht, Kuscheltier, atmen.` },
    lerntext34: { titel: "Mila im Kletterwald", text:
`Die Klasse 4b macht einen Ausflug in den Kletterwald. Alle sind aufgeregt. Mila steht vor der ersten Leiter und schaut nach oben. Die Plattform ist sehr hoch. Ihre Knie werden weich, ihr Mund ist trocken.

„Na los, Mila, du Angsthase!“, ruft Marvin. Mila möchte am liebsten nach Hause.

Die Trainerin kommt zu ihr. „Angst ist nicht peinlich“, sagt sie leise. „Angst ist wie ein Alarm in deinem Körper. Manchmal schützt er dich – zum Beispiel vor einer heißen Herdplatte. Und manchmal ist er zu laut, obwohl du sicher bist. Du bist hier doppelt gesichert.“

Sie schlägt vor: „Du musst nicht gleich ganz nach oben. Wie wäre es mit dem niedrigen Parcours?“ Mila nickt. Sie klettert Schritt für Schritt. Beim dritten Hindernis merkt sie: Es geht! Am Ende des Tages schafft sie sogar den mittleren Parcours.

Auf der Heimfahrt sagt Mila: „Mutig sein heißt nicht, keine Angst zu haben. Mutig ist, wenn man es trotzdem versucht.“

**Fragen zum Gespräch:**
1. Woran hat Mila ihre Angst gemerkt?
2. Wann schützt uns Angst? Wann ist sie zu laut?
3. Wie hat die Trainerin Mila geholfen? Wie fandest du Marvins Satz?
4. Was meint Mila mit ihrem letzten Satz?` },
    uebungen: [
        { titel: "Angst-Barometer", fuer: "alle", dauer: "4 Min",
          text: "Du liest Situationen vor, die Kinder zeigen am Platz mit 0 bis 5 Fingern, wie viel Angst sie hätten:\n\n- Ein großer Hund bellt mich an.\n- Ich soll vor der Klasse etwas vorlesen.\n- Ich bin nachts allein wach.\n- Ich gehe zum Zahnarzt.\n\nWichtig: Jede Zahl ist richtig. Menschen haben vor verschiedenen Dingen Angst.",
          antworten: ["✊ keine Angst", "✌️ ein bisschen", "🖐️ viel Angst"],
          folie: "Wie viel **Angst** hättest du?\n\nZeig es mit deinen Fingern: **0** = gar keine · **5** = ganz viel.\n\nJede Zahl ist richtig!",
          emoji: "📊",
          warum: "Jeder hat vor anderen Dingen Angst. Wir zeigen, wie viel." },
        { titel: "Mutmacher-Satz", fuer: "alle", dauer: "4 Min",
          text: "Sammelt Mutmacher-Sätze an der Tafel („Ich schaff das!“, „Eins nach dem anderen“, „Ich darf es versuchen“). Jedes Kind sucht sich einen aus, steht am Platz auf und sagt ihn mit starker Stimme. Die anderen antworten: „Ja, das schaffst du!“",
          folie: "Welcher Satz macht dir **Mut**?\n\nSuch dir einen aus, steh auf und sag ihn mit starker Stimme. 💪",
          quiz: "liste",
          kern: ["12"],
          emoji: "💪",
          warum: "Wir suchen Sätze, die Mut machen." },
        { titel: "Schützt mich die Angst?", fuer: "34", dauer: "4 Min",
          text: "Situationen vorlesen. Die Kinder entscheiden mit Daumen: Daumen hoch = „Die Angst schützt mich, ich höre auf sie“, Daumen zur Seite = „Die Angst ist zu laut, ich probiere es in kleinen Schritten“.\n\n- Ein Fremder bietet mir Süßigkeiten an.\n- Ich soll ein neues Kind ansprechen.\n- Das Eis auf dem Teich ist dünn.\n- Ich soll bei der Theateraufführung mitspielen.",
          antworten: ["👍 Angst schützt mich", "👉 kleine Schritte probieren"],
          folie: "**Daumen hoch 👍** = Die Angst passt auf mich auf. Ich höre auf sie.\n\n**Daumen zur Seite 👉** = Die Angst ist zu laut. Ich probiere es in kleinen Schritten.",
          kern: ["34"],
          loesungen: ["1", "2", "1", "2"],
          emoji: "🛡️",
          warum: "Manchmal passt Angst auf uns auf – manchmal ist sie zu laut. Wir prüfen das." }
    ],
    ab12: {
      "titel": "Was macht mir Mut?",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gesichter",
          "text": "Male die Gesichter fertig: ängstlich – und wieder ruhig.",
          "gefuehle": [
            "ängstlich",
            "ruhig"
          ],
          "leer": true
        },
        {
          "typ": "ankreuzen",
          "text": "Was hilft dir gegen Angst? Kreuze an.",
          "optionen": [
            "[bild:teddy] Kuscheltier",
            "[bild:lampe] Licht",
            "[bild:haus] Mama oder Papa",
            "[bild:herz] tief atmen"
          ],
          "nebeneinander": true
        },
        {
          "typ": "malen",
          "text": "Male: Davor hatte ich Angst – und dann war ich mutig.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Mutig mit meiner Angst", aufgaben: [
        { typ: "tabelle", text: "Schützt mich die Angst (S) oder ist sie zu laut (L)? Kreuze die richtige Spalte an.", spalten: ["Situation", "S", "L"],
          zeilen: [["Ein fremder Hund knurrt mich an.", "", ""], ["Ich soll vor der Klasse sprechen.", "", ""], ["Die Herdplatte ist rot.", "", ""], ["Ich spreche ein neues Kind an.", "", ""], ["Ich will bei Rot über die Straße.", "", ""]] },
        { typ: "luecken", text: "Meine Mut-Treppe: Schreibe eine Angst auf und drei kleine Schritte, um mutiger zu werden.", nummern: false,
          saetze: ["Meine Angst: ___", "Schritt 1: ___", "Schritt 2: ___", "Schritt 3: ___"] },
        { typ: "luecken", text: "Mein Mutmacher-Satz:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-empathie",
    titel: "Wie fühlt sich der andere?",
    kategorie: "Gefühle",
    ziel12: "Gefühle anderer am Gesicht erkennen und freundlich reagieren",
    ziel34: "Sich in andere hineinversetzen und eine Situation aus zwei Blickwinkeln sehen",
    material: "Eine „Perspektiv-Brille“ (alte Brille ohne Gläser oder aus Pappe)\nSituationskarten (siehe Übungen)",
    lerntext12: { titel: "Der Turm", text:
`Lio baut einen Turm aus Bausteinen. Er ist schon ganz hoch. Lio ist **stolz**.

Ella läuft vorbei. Sie stößt aus Versehen an den Tisch. Der Turm fällt um!

Lio sagt nichts. Er macht ein langes Gesicht. Seine Augen werden nass.

Ella bleibt stehen. Sie schaut Lio an. Sie denkt: „Lio ist traurig. So würde ich mich auch fühlen.“

„Oh nein, das wollte ich nicht“, sagt Ella. „Soll ich dir helfen? Wir bauen ihn zusammen wieder auf – noch höher!“ Lio wischt sich die Augen. „Okay“, sagt er. Zusammen bauen sie den höchsten Turm der Klasse.

**Nach dem Vorlesen:**
1. Warum war Lio stolz?
2. Was ist mit dem Turm passiert?
3. Woran hat Ella gemerkt, dass Lio traurig ist?
4. Was hat Ella dann gemacht?` },
    lerntext34: { titel: "Zwei Seiten einer Geschichte", text:
`**Laras Seite:** Lara winkt Tim morgens am Schultor zu. Tim schaut sie nicht an und geht einfach weiter. In der Pause fragt sie, ob er mitspielt – er schüttelt nur den Kopf. Lara ist sauer. „Der ist total eingebildet“, sagt sie zu ihrer Freundin.

**Tims Seite:** Tim hat in der Nacht kaum geschlafen. Sein Opa ist ins Krankenhaus gekommen. Am Morgen ist Tim so in Gedanken, dass er Lara gar nicht sieht. In der Pause will er einfach nur seine Ruhe. Als er hört, dass Lara ihn „eingebildet“ nennt, ist er noch trauriger.

Am Nachmittag erzählt die Lehrerin der Klasse, dass Tims Opa krank ist. Lara wird rot. Nach der Stunde geht sie zu Tim. „Tut mir leid, ich wusste das nicht. Ich dachte, du bist sauer auf mich.“ Tim lächelt müde. „Schon okay. Danke, dass du fragst.“

**Fragen zum Gespräch:**
1. Was dachte Lara über Tim? Was war wirklich los?
2. Hätte Lara es anders wissen können? Was hätte sie fragen können?
3. Kennst du das: Jemand verhält sich komisch, und du weißt nicht, warum?
4. Was bedeutet „sich in jemanden hineinversetzen“?` },
    uebungen: [
        { titel: "Gesichter lesen", fuer: "alle", dauer: "4 Min",
          text: "Ein Kind kommt nach vorn und zeigt verdeckt ein Gefühl (froh, traurig, wütend, ängstlich, überrascht). Die anderen raten vom Platz und überlegen: „Was könnte dieses Kind jetzt brauchen?“ (trösten, Ruhe, sich mitfreuen, Hilfe).",
          folie: "Ein Kind zeigt ein Gefühl – ohne Worte.\n\nRate: **Wie fühlt es sich? Was könnte es jetzt brauchen?**",
          emoji: "👀",
          warum: "Wir schauen in Gesichter und überlegen: Was braucht der andere jetzt?" },
        { titel: "Was braucht er jetzt?", fuer: "12", dauer: "4 Min",
          text: "Du liest kurz vor, wie es einem Kind geht. Die Kinder zeigen am Platz: Hand aufs Herz = trösten, Daumen hoch = mitfreuen, Hand flach = in Ruhe lassen, Hand ausstrecken = helfen.\n\n- Paul ist hingefallen und weint.\n- Mia hat ein Tor geschossen.\n- Ben ist wütend, weil sein Bild zerrissen ist.\n- Lea kommt mit ihrer Matheaufgabe nicht weiter.\n- Tom sitzt allein und will gerade niemanden sehen.",
          quiz: "karten",
          frage: "❤️ trösten · 👍 mitfreuen · ✋ in Ruhe lassen · 🤲 helfen",
          folie: "Was braucht das Kind jetzt? Zeig es:\n\n❤️ Hand aufs Herz = **trösten**\n👍 Daumen hoch = **mitfreuen**\n✋ Hand flach = **in Ruhe lassen**\n🤲 Hand ausstrecken = **helfen**",
          kern: ["12"],
          emoji: "🤲",
          warum: "Wir überlegen: Trösten, mitfreuen, helfen – oder in Ruhe lassen?" },
        { titel: "Die Perspektiv-Brille", fuer: "34", dauer: "5 Min",
          text: "Du liest eine Situation vor. Ein Kind setzt die Perspektiv-Brille auf und erzählt in der Ich-Form, was die andere Person fühlt und denkt. Danach gibt es die Brille weiter.\n\n- Ein neues Kind sitzt in der Pause allein auf der Bank.\n- Die Lehrerin schimpft, obwohl sie sonst nett ist.\n- Dein Freund hat beim Spiel verloren und knallt die Tür zu.",
          quiz: "karten",
          frage: "Setz die Brille auf: Was fühlt und denkt die andere Person?",
          folie: "Wer die **Perspektiv-Brille** 👓 aufsetzt, schlüpft in eine andere Person.\n\nErzähl in der Ich-Form: **„Ich fühle mich … Ich denke …“**",
          kern: ["34"],
          emoji: "👓",
          warum: "Wir schlüpfen in einen anderen und schauen mit seinen Augen." }
    ],
    ab12: {
      "titel": "Wie geht es dir?",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gefuehle",
          "text": "Wie fühlt sich das Kind? Kreise ein Gesicht ein.",
          "zeilen": [
            "Paul ist hingefallen.",
            "Mia hat Geburtstag.",
            "Ben wird ausgelacht.",
            "Ein Hund bellt Lea an."
          ]
        },
        {
          "typ": "daumen",
          "text": "Lio ist traurig. Was machst du? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Ich frage: „Was ist los?“",
            "Ich lache.",
            "Ich helfe ihm.",
            "Ich setze mich zu ihm."
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male, wie Ella und Lio zusammen den Turm bauen.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Mit anderen Augen sehen", aufgaben: [
        { typ: "luecken", text: "Versetze dich in die Person: Was fühlt und denkt sie?", nummern: true,
          saetze: ["Paula wird beim Fußball als Letzte gewählt.\nSie fühlt sich ___, weil ___.\nSie denkt: „___“",
                   "Dein Freund hat seinen Hausschlüssel verloren und muss warten.\nEr fühlt sich ___, weil ___.\nEr denkt: „___“"] },
        { typ: "luecken", text: "Zwei Seiten: Erzähle von einer Situation, in der du jemanden zuerst falsch verstanden hast.", nummern: false,
          saetze: ["Ich dachte: ___", "In Wirklichkeit war: ___"] },
        { typ: "luecken", text: "Eine gute Frage, wenn sich jemand komisch verhält:", nummern: false, saetze: ["„___“"] }
    ]}
}),

/* ============================== KONFLIKTE ============================== */
SOZIAL_EINHEIT({
    id: "v-petzen-hilfe",
    titel: "Petzen oder Hilfe holen?",
    kategorie: "Konflikte lösen",
    ziel12: "Wissen, wann ich sofort Hilfe holen muss",
    ziel34: "Petzen und Hilfe holen sicher unterscheiden und begründen",
    material: "Pro Kind eine rote und eine grüne Karte\nDie drei Hilfe-Fragen groß an der Tafel",
    lerntext12: { titel: "Die Klettergerüst-Geschichte", text:
`In der Pause spielt Tom mit einem roten Stift. Mia sieht das. Sie läuft zur Lehrerin. „Frau Krause, Tom hat einen roten Stift!“ Frau Krause sagt: „Mia, das ist Toms Sache. Da passiert niemandem etwas.“

Kurz danach klettert Ben auf das Klettergerüst. Er rutscht ab und fällt herunter. Sein Knie blutet. Ben weint.

Diesmal läuft Paul zur Lehrerin. „Frau Krause, schnell! Ben ist runtergefallen und blutet!“ Frau Krause kommt sofort. „Danke, Paul. Gut, dass du Hilfe geholt hast!“

**Merksatz:** Ist jemand in Gefahr oder tut jemandem etwas weh? Dann hole ich Hilfe!

**Nach dem Vorlesen:**
1. Warum ist Mia zur Lehrerin gelaufen?
2. Warum ist Paul zur Lehrerin gelaufen?
3. Wer von beiden hat Hilfe geholt – und warum?
4. Wann holst du sofort einen Erwachsenen?` },
    lerntext34: { titel: "Ist Lukas eine Petze?", text:
`Jeden Tag nach der Schule passiert es: Zwei Jungen aus der fünften Klasse nehmen Jannes die Mütze weg. Sie werfen sie hin und her, Jannes rennt hinterher, und alle lachen. Jannes sagt nie etwas. Aber Lukas sieht, dass Jannes morgens schon Bauchweh hat.

„Sag bloß nichts den Lehrern“, sagen die anderen zu Lukas. „Sonst bist du eine Petze.“

Lukas überlegt lange. Dann denkt er an die drei Hilfe-Fragen: Ist jemand in Gefahr? Wird jemandem wehgetan? Können wir das allein lösen? Die Antwort ist klar: Jannes geht es schlecht – und er schafft es nicht allein.

Lukas geht zu seiner Lehrerin. Am nächsten Tag hört das mit der Mütze auf. Jannes sagt leise: „Danke.“

Später fragt Lukas: „War ich jetzt eine Petze?“ Die Lehrerin schüttelt den Kopf. „Petzen will jemanden in Schwierigkeiten bringen. Hilfe holen will jemanden schützen. Du hast Jannes geschützt.“

**Fragen zum Gespräch:**
1. Warum hat Lukas lange überlegt?
2. Was ist der Unterschied zwischen Petzen und Hilfe holen?
3. Warum haben die anderen „Petze“ gesagt?
4. Fällt dir ein Beispiel ein, wo man selbst eine Lösung finden kann, ohne Erwachsene?` },
    uebungen: [
        { titel: "Die drei Hilfe-Fragen", fuer: "alle", dauer: "3 Min",
          text: "Stehen an der Tafel: **1. Ist jemand in Gefahr? 2. Wird jemandem wehgetan? 3. Kann ich es allein lösen?** Alle sprechen sie gemeinsam. Kl. 1/2 merken sich die Kurzform: „Gefahr oder Weh – dann Hilfe!“",
          folie: "**1.** Ist jemand in Gefahr?\n**2.** Wird jemandem wehgetan?\n**3.** Kann ich es allein lösen?\n\nAlle sprechen zusammen.",
          folie12: "**1.** Ist jemand in Gefahr?\n**2.** Wird jemandem wehgetan?\n**3.** Kann ich es allein lösen?\n\nMerk dir: **„Gefahr oder Weh – dann Hilfe!“**",
          emoji: "❓",
          warum: "Drei Fragen helfen dir zu entscheiden: Hole ich Hilfe?" },
        { titel: "Rote Karte – grüne Karte", fuer: "alle", dauer: "6 Min",
          text: "Du liest Situationen vor. Rot = sofort Hilfe holen, Grün = selbst lösen oder geht mich nichts an. Kl. 3/4 begründen.\n\n- Ein Kind steht auf der Fensterbank.\n- Jemand hat seine Hausaufgaben vergessen.\n- Zwei Kinder prügeln sich.\n- Mein Nachbar malt außerhalb der Linien.\n- Ein Kind wird jeden Tag ausgelacht und weint.\n- Jemand drängelt sich vor.",
          quiz: "ampel",
          antworten: ["🔴 sofort Hilfe holen", "🟢 selbst lösen / geht mich nichts an"],
          folie: "🔴 **Rot** = sofort Hilfe holen\n🟢 **Grün** = selbst lösen oder geht mich nichts an\n\nHalt die passende Karte hoch.",
          kern: ["12", "34"],
          loesungen: ["1", "2", "1", "2", "1", "2"],
          emoji: "🚨",
          warum: "Wir üben: Wann hole ich sofort Hilfe – und wann nicht?" },
        { titel: "Hilfe holen üben", fuer: "12", dauer: "3 Min",
          text: "Einzelne Kinder stehen an ihrem Platz auf und sagen den Hilfe-Satz laut zur Klasse: „Frau/Herr …, ich brauche Hilfe! … ist … passiert.“ Laut, deutlich, Blick nach vorn. Die anderen zeigen Daumen hoch, wenn man es gut verstehen konnte.",
          folie: "Steh auf und sag laut und deutlich:\n\n**„Frau/Herr …, ich brauche Hilfe! … ist … passiert.“**\n\nDie anderen: 👍 wenn man es gut verstanden hat.",
          emoji: "🙋",
          warum: "Wir üben den Satz, mit dem du Hilfe holst – laut und klar." }
    ],
    ab12: {
      "titel": "Hilfe holen",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Muss ich Hilfe holen? Kreise ein: grün = ja, rot = nein.",
          "zeilen": [
            "Ein Kind blutet.",
            "Mein Stift ist runtergefallen.",
            "Ein Kind wird gehauen.",
            "Tom hat einen roten Stift.",
            "Ein Kind steht auf dem Fensterbrett."
          ],
          "art": "ampel"
        },
        {
          "typ": "malen",
          "text": "Male die Ampel an: Rot heißt „Stopp – Hilfe holen!“",
          "bild": "ampel"
        },
        {
          "typ": "malen",
          "text": "Male: Bei wem holst du in der Schule Hilfe?",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Petzen oder Hilfe holen?", aufgaben: [
        { typ: "tabelle", text: "Petzen (P) oder Hilfe holen (H)? Kreuze die richtige Spalte an.", spalten: ["Situation", "P", "H"],
          zeilen: [["Ich erzähle, dass Ali beim Diktat abgeschrieben hat.", "", ""], ["Ich sage, dass ein Kind auf der Toilette eingesperrt ist.", "", ""], ["Ich melde, dass Lena ihr Pausenbrot nicht isst.", "", ""], ["Ich erzähle, dass ein Kind seit Wochen bedroht wird.", "", ""], ["Ich sage, dass Paul gerannt ist.", "", ""]] },
        { typ: "luecken", text: "Erkläre den Unterschied mit eigenen Worten.", nummern: false,
          saetze: ["Petzen ist, wenn ___", "Hilfe holen ist, wenn ___"] },
        { typ: "luecken", text: "Jemand nennt dich „Petze“, weil du Hilfe geholt hast. Was antwortest du?", nummern: false, saetze: ["„___“"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-entschuldigen",
    titel: "Entschuldigen und verzeihen",
    kategorie: "Konflikte lösen",
    ziel12: "Sich ehrlich entschuldigen und etwas wieder gutmachen",
    ziel34: "Eine gute Entschuldigung in vier Stufen formulieren und verstehen, dass Verzeihen Zeit braucht",
    material: "Die Entschuldigungs-Treppe (4 Stufen) an der Tafel\nSituationskarten für die Tischpaare",
    lerntext12: { titel: "Das Malwasser", text:
`Lea malt ein Bild mit einem großen Regenbogen. Es ist fast fertig.

Sam will an ihr vorbei. Er stößt an das Malwasser. Das Wasser läuft über Leas Bild! Die Farben verschwimmen.

„’Tschuldigung“, murmelt Sam schnell und geht weiter. Lea ist trotzdem traurig. Das hat sich nicht wie eine echte Entschuldigung angefühlt.

Sam merkt das. Er kommt zurück. Er schaut Lea an und sagt: „Es tut mir wirklich leid, dass ich dein Bild nass gemacht habe. Soll ich dir helfen, ein neues zu malen?“

Lea nickt. Zusammen malen sie einen neuen Regenbogen – mit noch mehr Farben.

**Nach dem Vorlesen:**
1. Was ist mit Leas Bild passiert?
2. Warum hat sich die erste Entschuldigung nicht echt angefühlt?
3. Was hat Sam beim zweiten Mal anders gemacht?
4. Wie geht eine echte Entschuldigung?

**Tipp für dich:** Mögliche Antworten: anschauen, sagen was passiert ist, wieder gutmachen.` },
    lerntext34: { titel: "Das verratene Geheimnis", text:
`Merve hat Nora ein Geheimnis erzählt: Sie ist in Jonas verliebt. Zwei Tage später weiß es die halbe Klasse. Nora hatte es nur ihrer Freundin Paula erzählt – „aber nicht weitersagen!“. Paula hat es natürlich weitererzählt.

Merve ist verletzt und wütend. Sie spricht nicht mehr mit Nora.

Nora fühlt sich schrecklich. Sie überlegt, wie sie sich richtig entschuldigen kann. Dann geht sie zu Merve: „Ich habe dein Geheimnis weitererzählt. Das war falsch, du hast mir vertraut. Ich verstehe, dass du dich verraten fühlst und wütend bist. Ich werde nie wieder etwas weitersagen, und ich sage den anderen, dass sie dich in Ruhe lassen sollen.“

Merve schaut sie lange an. „Ich weiß nicht, ob ich dir gleich verzeihen kann“, sagt sie. „Ich brauche ein bisschen Zeit.“ Nora nickt. „Okay. Ich warte.“

Eine Woche später setzt Merve sich in der Pause wieder neben Nora.

**Fragen zum Gespräch:**
1. Welche vier Teile hat Noras Entschuldigung? (Was ich getan habe – dass es falsch war – wie du dich fühlst – wie ich es gut mache)
2. Warum hat Merve nicht sofort verziehen? Ist das in Ordnung?
3. Muss man eine Entschuldigung immer annehmen?
4. Was kann man tun, wenn man etwas nicht wieder gutmachen kann?` },
    uebungen: [
        { titel: "Echt oder unecht?", fuer: "alle", dauer: "4 Min",
          text: "Du liest vor, wie sich jemand entschuldigt. Die Kinder zeigen Daumen hoch (echt) oder runter (unecht) und sagen, woran sie es merken.\n\n- Tim rollt mit den Augen und murmelt: „Jaja, sorry.“\n- Ben schaut Lea an und sagt ruhig: „Es tut mir leid, dass ich dein Bild zerknittert habe.“\n- Mia schaut auf den Boden und flüstert: „Tschuldigung.“\n- Ali sagt: „Sorry – aber du hast angefangen!“\n- Emma sagt: „Entschuldigung. Ich helfe dir, die Stifte aufzuheben.“",
          antworten: ["👍 echt", "👎 unecht"],
          folie: "Ist diese Entschuldigung **echt**? 👍\nOder **unecht**? 👎\n\nWoran merkst du das?",
          loesungen: ["2", "1", "2", "2", "1"],
          emoji: "🙏",
          warum: "Nicht jedes Sorry ist echt. Wir hören genau hin." },
        { titel: "Die Entschuldigungs-Treppe", fuer: "alle", dauer: "6 Min",
          text: "An der Tafel: **1. Ich sage, was ich getan habe. 2. Ich sage, dass es falsch war. 3. Ich verstehe, wie du dich fühlst. 4. Ich mache es wieder gut.** Die Tischnachbarn bekommen je eine Situationskarte (z. B. Radiergummi kaputt gemacht, jemanden geschubst, über ein Bild gelacht) und üben die Entschuldigung. Kl. 1/2 nutzen die Stufen 1 und 4, Kl. 3/4 alle vier. Zwei Paare zeigen sie vorn.",
          text12: "An der Tafel: **1. Ich sage, was ich getan habe. 4. Ich mache es wieder gut.** (Die Stufen 2 und 3 lässt du weg.) Die Tischnachbarn bekommen je eine Situationskarte (z. B. Radiergummi kaputt gemacht, jemanden geschubst, über ein Bild gelacht) und üben die Entschuldigung: „Ich habe … – Ich mache es wieder gut, indem …“. Zwei Paare zeigen sie vorn.",
          text34: "An der Tafel: **1. Ich sage, was ich getan habe. 2. Ich sage, dass es falsch war. 3. Ich verstehe, wie du dich fühlst. 4. Ich mache es wieder gut.** Die Tischnachbarn bekommen je eine Situationskarte (z. B. Radiergummi kaputt gemacht, jemanden geschubst, über ein Bild gelacht) und üben die Entschuldigung mit allen vier Stufen. Zwei Paare zeigen sie vorn.",
          folie12: "So geht eine echte Entschuldigung:\n\n**1.** Ich sage, was ich getan habe.\n**2.** Ich mache es wieder gut.\n\nÜbt mit eurer Situationskarte.",
          folie34: "So geht eine echte Entschuldigung:\n\n**1.** Ich sage, was ich getan habe.\n**2.** Ich sage, dass es falsch war.\n**3.** Ich verstehe, wie du dich fühlst.\n**4.** Ich mache es wieder gut.\n\nÜbt mit eurer Situationskarte.",
          kern: ["12", "34"],
          emoji: "🪜",
          warum: "Wir üben, wie eine echte Entschuldigung geht – Stufe für Stufe." },
        { titel: "Wiedergutmach-Ideen", fuer: "34", dauer: "2 Min",
          text: "Sammelt an der Tafel, wie man etwas wieder gutmachen kann: helfen, ersetzen, etwas Nettes tun, den anderen verteidigen, eine Karte schreiben.",
          folie: "Ein „Sorry“ ist gut – aber wie kann man es **wieder gutmachen**? 🔧\n\nSammelt Ideen.",
          emoji: "🔧",
          warum: "Ein Sorry ist der Anfang. Wir sammeln, wie man es wieder gutmacht." }
    ],
    ab12: {
      "titel": "Es tut mir leid",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Ist das eine gute Entschuldigung? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Ich schaue den anderen an.",
            "Ich sage es genervt.",
            "Ich sage, was passiert ist.",
            "Ich mache es wieder gut."
          ],
          "art": "daumen"
        },
        {
          "typ": "gesichter",
          "text": "So fühlt sich Lea vorher – und nachher. Male die Gesichter an.",
          "gefuehle": [
            "traurig",
            "froh"
          ],
          "leer": false
        },
        {
          "typ": "malen",
          "text": "Male, wie Sam es wieder gutmacht.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Die Entschuldigungs-Treppe", aufgaben: [
        { typ: "luecken", text: "Du hast aus Versehen die Federmappe deines Tischnachbarn kaputt gemacht. Schreibe deine Entschuldigung in vier Stufen.", nummern: true,
          saetze: ["Was ich getan habe: ___", "Dass es falsch war: ___", "Wie du dich fühlst: ___", "Wie ich es wieder gutmache: ___"] },
        { typ: "tabelle", text: "Echt (E) oder unecht (U)? Kreuze die richtige Spalte an.", spalten: ["Entschuldigung", "E", "U"],
          zeilen: [["„Sorry, aber du hast angefangen!“", "", ""], ["„Es tut mir leid, dass ich dich geschubst habe.“", "", ""], ["„Ja, ja, ’tschuldigung.“", "", ""]] },
        { typ: "luecken", text: "Verzeihen …", nummern: false,
          saetze: ["… fällt mir leicht, wenn ___", "… fällt mir schwer, wenn ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-kompromisse",
    titel: "Kompromisse finden",
    kategorie: "Konflikte lösen",
    ziel12: "Erkennen, dass bei einem Streit beide etwas bekommen können",
    ziel34: "Kompromisse aushandeln und prüfen, ob sie für beide fair sind",
    material: "Ein Gegenstand zum Tauschen (z. B. Redestein, Kuscheltier, Ball)\nZahlenkarten 1–4 (Antwort-Set)\nPlakat „So finden wir einen Kompromiss“",
    lerntext12: { titel: "Die rote Schaukel", text:
`Große Pause. Auf dem Schulhof gibt es eine rote Schaukel. Mia rennt hin. Tom rennt auch hin.

„Ich war zuerst da!“, ruft Mia. „Nein, ich!“, ruft Tom. Beide ziehen an der Kette. Sie zerren und schreien. Die Schaukel wackelt hin und her.

Da kommt die Aufsicht. „So geht das nicht. Heute schaukelt keiner.“ Mia ist sauer. Tom auch. Die ganze Pause sitzen sie auf der Bank.

Am nächsten Tag stehen beide wieder an der Schaukel. Tom sagt: „Wollen wir uns abwechseln? Ich zähle bis 20, dann bist du dran.“ Mia sagt: „Okay. Du darfst anfangen.“

Tom schaukelt. Mia zählt laut: „… 18, 19, 20!“ Dann tauschen sie. So geht es die ganze Pause. Beide schaukeln – und keiner muss auf der Bank sitzen.

**Nach dem Vorlesen:**
1. Was ist am ersten Tag passiert?
2. Warum durfte keiner schaukeln?
3. Was haben Mia und Tom am zweiten Tag anders gemacht?
4. Sind beide zufrieden? Warum?` },
    lerntext34: { titel: "Zoo oder Schwimmbad?", text:
`Die Klasse 3a darf über den Wandertag abstimmen. Die eine Hälfte will in den Zoo, die andere Hälfte ins Schwimmbad. Es steht 11 zu 11. Niemand will nachgeben.

„Dann fahren wir eben gar nicht!“, ruft Emil. „Oder die Lehrerin bestimmt“, meint Sara.

Frau Weber schreibt an die Tafel: **Kompromiss – jeder gibt ein bisschen nach, und alle bekommen etwas.** „Habt ihr eine Idee?“

Erst ist es still. Dann meldet sich Can: „Der Zoo hat doch einen Wasserspielplatz. Wir könnten morgens die Tiere anschauen und nachmittags planschen.“ Ein paar finden das gut. „Aber das ist nicht dasselbe wie Schwimmbad“, sagt Jule. Jana schlägt vor: „Dann gehen wir diesmal in den Zoo, und im Sommer machen wir den Schwimmbad-Tag.“

Am Ende stimmen alle 22 Kinder dafür. Niemand hat alles bekommen, was er wollte – aber alle sind zufrieden.

**Fragen zum Gespräch:**
1. Warum war „Dann fahren wir gar nicht!“ keine gute Lösung?
2. Was ist ein Kompromiss? Erkläre mit eigenen Worten.
3. Woran erkennt man, dass ein Kompromiss fair ist?
4. Wann ist ein Kompromiss vielleicht nicht möglich?` },
    uebungen: [
        { titel: "Zählen und tauschen", fuer: "alle", dauer: "4 Min",
          text: "**Material:** ein Gegenstand, den alle gern hätten (z. B. Redestein, Kuscheltier oder Ball).\n\nZwei Kinder kommen nach vorn – beide „wollen“ den Gegenstand. Eines hält ihn, die ganze Klasse zählt laut bis 10, dann wird getauscht – ohne Ziehen und Meckern. Danach kurz fragen: „War das fair? Wie hat sich das Warten angefühlt?“ Mehrere Paare sind dran (Glücksrad).",
          text34: "**Material:** ein Gegenstand, den alle gern hätten (z. B. Redestein, Kuscheltier oder Ball).\n\nZwei Kinder kommen nach vorn – beide „wollen“ den Gegenstand. Sie handeln selbst eine Tauschregel aus (z. B. „bis 10 zählen“, „jeder eine Runde“) und sagen sie laut. Die Klasse zählt bzw. achtet darauf, dass die Regel eingehalten wird. Danach: „War das fair? Was war schwer am Warten?“ Mehrere Paare sind dran (Glücksrad).",
          folie: "Zwei Kinder wollen **dasselbe**. 🔁\n\nEiner hat es – **alle zählen laut bis 10** – dann wird getauscht.\n\nOhne Ziehen. Ohne Meckern.",
          folie34: "Zwei Kinder wollen **dasselbe**. 🔁\n\nIhr macht eine **Tauschregel** aus und sagt sie laut.\n\nDie Klasse passt auf, dass sie eingehalten wird.",
          emoji: "🔁",
          warum: "Wie bei Mia und Tom: Abwechseln klappt, wenn klar ist, wann getauscht wird.",
          warum34: "Abwechseln klappt, wenn vorher klar ist, wann getauscht wird." },
        { titel: "Kompromiss-Werkstatt", fuer: "alle", dauer: "8 Min",
          text: "**Material:** Zahlenkarten 1–4 (Antwort-Set). Auf der Folie bzw. dem Plakat stehen die vier Kompromiss-Ideen: **1 = Abwechseln** · **2 = Teilen** · **3 = Zusammen machen** · **4 = Losen**. Du liest nur vor.\n\n**So geht's:** Eine Situation erscheint. Auf „1, 2, 3 – hoch!“ zeigen die Kinder die Karte. Dann fragst du ein Kind: „Wie genau würdet ihr das machen?“ – und alle prüfen: **Bekommen beide etwas?** Dann auflösen. Oft passen mehrere Ideen – Hauptsache: fair für beide.\n\n- Beide wollen zuerst schaukeln.\n- Es gibt nur noch ein Stück Kuchen.\n- Einer will Fußball spielen, der andere Fangen.\n- Beide wollen mit dem Lego-Bagger spielen.\n- Beide wollen am Fenster sitzen.\n- Es gibt nur noch eine Tüte Gummibärchen für zwei.\n- Beide wollen beim Theater die Prinzessin sein.\n- Ihr wollt beide die große Kiste Bausteine.",
          quiz: "zahlen",
          antworten: ["🔄 1 · Abwechseln", "✂️ 2 · Teilen", "🤝 3 · Zusammen machen", "🎲 4 · Losen"],
          loesungen: ["1", "2", "1", "1,3", "1,4", "2", "1,4", "2,3"],
          folie: "Leg deine **Zahlenkarten 1–4** vor dich. So finden wir einen **Kompromiss**:\n\n🔄 **1** Abwechseln\n✂️ **2** Teilen\n🤝 **3** Zusammen machen\n🎲 **4** Losen\n\nFair ist es, wenn **beide** etwas bekommen. Auf **„1, 2, 3 – hoch!“** zeigst du deine Karte.",
          kern: ["12", "34"],
          emoji: "🤝",
          warum: "Zwei wollen dasselbe. Wir suchen Lösungen, bei denen beide etwas bekommen." }
    ],
    ab12: {
      "titel": "Beide bekommen etwas",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Lea und Ben wollen beide das rote Auto. Ist das fair? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Lea nimmt es einfach weg.",
            "Sie spielen abwechselnd.",
            "Ben schreit, bis er es bekommt.",
            "Sie spielen zusammen damit."
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male Mia und Tom an der Schaukel: Einer schaukelt, einer zählt.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Kompromisse finden", aufgaben: [
        { typ: "tabelle", text: "Finde für jeden Streit einen Kompromiss.", spalten: ["Streit", "Kompromiss"],
          zeilen: [["Leo will Fußball spielen, Kim lieber Fangen.", ""], ["Beide Geschwister wollen den Fernseher.", ""], ["Zwei Kinder wollen das Klassenamt „Tafeldienst“.", ""]] },
        { typ: "luecken", text: "Ist das ein Kompromiss? Kreuze an und begründe.", nummern: true,
          saetze: ["„Ich darf heute bestimmen, du morgen.“\n☐ ja  ☐ nein, weil ___",
                   "„Wir machen, was ich will, weil ich älter bin.“\n☐ ja  ☐ nein, weil ___"] },
        { typ: "luecken", text: "Ein Kompromiss ist gut, wenn …", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-nein-sagen",
    titel: "Nein sagen",
    kategorie: "Konflikte lösen",
    ziel12: "Laut und deutlich Nein sagen, wenn ich etwas nicht will",
    ziel34: "Eigene Grenzen spüren und bestimmt Nein sagen – auch wenn die Gruppe drängt",
    material: "Tafel für die Nein-Sätze",
    lerntext12: { titel: "Lotte sagt Nein", text:
`Lotte spielt mit Paul. Paul kitzelt sie. Erst ist es lustig. Lotte lacht.

Aber Paul hört nicht auf. Jetzt ist es nicht mehr lustig. Lottes Bauch fühlt sich komisch an. Ihr Bauch sagt: **Nein!**

Lotte steht auf. Sie streckt die Hand aus und sagt ganz laut: „**Nein! Hör auf! Das will ich nicht!**“

Paul hört sofort auf. „Oh, Entschuldigung“, sagt er. „Ich dachte, das ist noch lustig.“

„Jetzt nicht mehr“, sagt Lotte. „Lass uns lieber etwas anderes spielen.“

**Nach dem Vorlesen:**
1. Wann war das Kitzeln für Lotte nicht mehr lustig?
2. Woran hat Lotte gemerkt, dass sie Nein sagen will?
3. Wie hat Lotte Nein gesagt?
4. Was hat Paul danach gemacht?` },
    lerntext34: { titel: "Die Mutprobe", text:
`Nach der Schule hängt Elias mit ein paar Älteren am Spielplatz herum. Er ist stolz, dass sie ihn mitnehmen. Da sagt Kai: „Wir machen jetzt einen Klingelstreich bei der alten Frau Berger. Elias, du klingelst!“

Elias spürt ein Ziehen im Bauch. Frau Berger ist nett. Sie erschrickt bestimmt. „Ich weiß nicht …“, murmelt er.

„Komm schon, sei kein Baby!“, lacht Kai. „Alle haben das schon gemacht.“

Elias' Herz klopft. Er will dazugehören. Aber sein Bauch sagt klar: Nein. Er atmet durch und sagt: „Nein. Ich mach da nicht mit. Frau Berger hat euch nichts getan.“

Kurz ist es still. Dann sagt Tarek, der auch dabei ist: „Ich auch nicht. Kommt, wir spielen lieber Basketball.“ Kai murrt – aber dann gehen alle zum Basketballkorb.

Elias merkt: Nein sagen war schwer. Aber hinterher fühlt er sich stark.

**Fragen zum Gespräch:**
1. Woran hat Elias gemerkt, dass er nicht mitmachen will?
2. Warum war das Nein so schwer für ihn?
3. Was hat Tarek gemacht? Warum war das wichtig?
4. Wie kann man Nein sagen und trotzdem freundlich bleiben?` },
    uebungen: [
        { titel: "Die Nein-Stimme", fuer: "alle", dauer: "4 Min",
          text: "Alle stehen an ihrem Platz. Zuerst sagen alle ein ganz leises, unsicheres „nein …“ und schauen dabei auf den Boden. Dann das starke Nein: gerade stehen, Hand ausstrecken, Blick nach vorn, laute Stimme: „Nein! Das will ich nicht!“ Frage: „Welches Nein glaubt man eher?“",
          folie: "Steh auf.\n\n**1.** Leise und unsicher: „nein …“ – Blick auf den Boden.\n**2.** Stark: gerade stehen, Hand nach vorn, Blick nach vorn: **„Nein! Das will ich nicht!“**\n\nWelches Nein glaubt man eher?",
          kern: ["12"],
          emoji: "✋",
          warum: "Wir üben ein Nein, das man ernst nimmt." },
        { titel: "Ja-Gefühl oder Nein-Gefühl?", fuer: "alle", dauer: "4 Min",
          text: "Du liest Situationen vor, die Kinder zeigen Daumen hoch (Ja-Gefühl im Bauch) oder runter (Nein-Gefühl):\n\n- Oma gibt mir einen Kuss, obwohl ich das nicht mag.\n- Mein Freund fragt, ob ich mitspiele.\n- Jemand will mein Handy-Passwort.\n- Ein Kind soll für die Gruppe Süßigkeiten klauen.\n\nWichtig: Auch bei Oma darf man freundlich Nein sagen – zum Beispiel lieber die Hand geben.",
          antworten: ["👍 Ja-Gefühl", "👎 Nein-Gefühl"],
          folie: "Was sagt dein Bauch?\n\n👍 **Ja-Gefühl** · 👎 **Nein-Gefühl**",
          kern: ["34"],
          loesungen: ["2", "1", "2", "2"],
          emoji: "🫃",
          warum: "Dein Bauch sagt dir, was okay ist. Wir hören auf ihn." },
        { titel: "Nein-Sätze sammeln", fuer: "34", dauer: "4 Min",
          text: "Sammelt an der Tafel verschiedene Arten, Nein zu sagen: „Nein, das will ich nicht.“ – „Ohne mich.“ – „Da mache ich nicht mit.“ – „Ich hab keine Lust darauf, lass uns lieber …“ Jedes Kind wählt seinen Lieblingssatz und sagt ihn laut vom Platz.",
          folie: "Es gibt viele Arten, **Nein** zu sagen.\n\nWelcher Satz passt zu dir? Sag ihn laut.",
          emoji: "🗣️",
          warum: "Es gibt viele Arten, Nein zu sagen. Wir suchen deine." }
    ],
    ab12: {
      "titel": "Ich darf Nein sagen",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Darfst du hier Nein sagen? Kreise ein: grün = ja, rot = nein.",
          "zeilen": [
            "Jemand kitzelt mich, und ich mag das nicht mehr.",
            "Ein Fremder will, dass ich mitkomme.",
            "Jemand will mir etwas wegnehmen.",
            "Meine Freundin sagt: „Hallo!“"
          ],
          "art": "ampel"
        },
        {
          "typ": "malen",
          "text": "Male die Sprechblase bunt an. Sag dabei laut: „NEIN!“",
          "bild": "sprechblase"
        },
        {
          "typ": "malen",
          "text": "Male dich, wie du stark Nein sagst.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Nein sagen – auch wenn's schwer ist", aufgaben: [
        { typ: "luecken", text: "Woran merkst du, dass du Nein sagen möchtest?", nummern: false,
          saetze: ["In meinem Bauch: ___", "In meinen Gedanken: ___"] },
        { typ: "tabelle", text: "Finde eine starke Nein-Antwort.", spalten: ["Die anderen sagen …", "Ich antworte …"],
          zeilen: [["„Komm, sei kein Baby!“", ""], ["„Alle machen mit!“", ""], ["„Sonst bist du nicht mehr unser Freund.“", ""]] },
        { typ: "luecken", text: "Wenn mein Nein nicht reicht, hole ich Hilfe bei:", nummern: false, saetze: ["___"] }
    ]}
})

);
