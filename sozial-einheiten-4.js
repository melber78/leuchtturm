/* Leuchtturm – Sozialtraining: Vorlagen Teil 4 (Selbstwert & Stärken, Kommunikation)
   Format wie in sozial-einheiten.js beschrieben. */
window.SOZIAL_VORLAGEN.push(

/* ============================== SELBSTWERT & STÄRKEN ============================== */
SOZIAL_EINHEIT({
    id: "v-meine-staerken",
    titel: "Meine Stärken",
    kategorie: "Selbstwert & Stärken",
    ziel12: "Eigene Stärken entdecken und benennen",
    ziel34: "Stärken bei sich und anderen erkennen – nicht nur in der Schule",
    material: "Kleine Karten für die Stärken-Dusche (eine pro Kind)\nHinweis: Die Stärken-Dusche schafft nicht alle Kinder in einer Stunde – die übrigen kommen in den nächsten Wochen beim Ankommen dran.",
    lerntext12: { titel: "Erna, die Ente", text:
`Erna ist eine Ente. Sie wäre gern so schnell wie der Hase. Aber mit ihren Watschelfüßen fällt sie immer hin.

Sie wäre gern so gut im Klettern wie das Eichhörnchen. Aber sie kommt nicht mal auf den kleinsten Ast. Erna denkt: „Ich kann gar nichts.“

Eines Tages spielen die Tiere am Teich. Der Wind weht dem Hasen den Hut vom Kopf. Er landet mitten im Wasser! „Mein Lieblingshut!“, ruft der Hase.

Der Hase kann nicht schwimmen. Das Eichhörnchen auch nicht. Aber Erna! Sie gleitet über das Wasser und holt den Hut zurück.

„Danke, Erna! Du kannst ja toll schwimmen!“, sagt der Hase. Erna lacht. „Stimmt“, sagt sie. „Jeder kann etwas anderes gut.“

**Nach dem Vorlesen:**
1. Was wollte Erna gern können?
2. Warum dachte Erna: „Ich kann gar nichts“?
3. Wie hat Erna dem Hasen geholfen?
4. Was kannst du gut?` },
    lerntext34: { titel: "Die Stärken-Liste", text:
`Oskar ist überzeugt: Ich kann nichts. In Mathe hat er eine Vier, beim Sport wird er immer als Letzter gewählt, und sein Diktat war voller Fehler.

Eines Tages verteilt Frau Lindner Zettel. Auf jedem steht ein Name. „Schreibt eine echte Stärke von diesem Kind auf. Etwas, das ihr an ihm schätzt.“ Die Zettel werden eingesammelt und jedes Kind bekommt seine.

Oskar liest seine Zettel – und kann es kaum glauben: „Du bist der Lustigste in der Klasse.“ – „Du hilfst immer, wenn jemand was sucht.“ – „Du kannst richtig gut zuhören.“ – „Deine Drachen-Zeichnungen sind die besten.“ – „Du bist nie gemein.“

„Aber das sind doch keine richtigen Stärken“, sagt Oskar leise. Frau Lindner lächelt. „Doch. Stärken sind nicht nur Noten. Dass andere sich bei dir wohlfühlen – das ist eine der wichtigsten Stärken überhaupt.“

Oskar klebt die Zettel zu Hause über seinen Schreibtisch.

**Fragen zum Gespräch:**
1. Warum dachte Oskar, er kann nichts?
2. Welche Arten von Stärken standen auf den Zetteln?
3. Warum sieht man die eigenen Stärken manchmal selbst nicht?
4. Welche Stärke siehst du bei deinem Tischnachbarn?` },
    uebungen: [
        { titel: "Steh auf, wenn du gut …", fuer: "alle", dauer: "4 Min",
          text: "Du liest vor. Alle, die sich angesprochen fühlen, stehen auf. Kl. 3/4 nennen ein Beispiel dazu.\n\n- Steh auf, wenn du gut zuhören kannst.\n- Steh auf, wenn du gut malen kannst.\n- Steh auf, wenn du andere zum Lachen bringst.\n- Steh auf, wenn du schnell rennen kannst.\n- Steh auf, wenn du gut basteln kannst.\n- Steh auf, wenn du jemanden trösten kannst.\n- Steh auf, wenn du gut bauen kannst.",
          quiz: "karten",
          frage: "Steh auf, wenn das für dich stimmt!",
          folie: "Steh auf, wenn das für dich stimmt! 🙋\n\nDu darfst stolz sein." },
        { titel: "Stärken-Dusche", fuer: "alle", dauer: "8 Min",
          text: "Ein Kind bleibt an seinem Platz sitzen und schließt die Augen (wenn es mag). Die anderen „duschen“ es mit Stärken: „Du kannst …“ – „Ich finde toll, dass du …“ Du schreibst die Stärken auf eine Karte, die das Kind behalten darf. Pro Stunde schafft ihr etwa 3–4 Kinder. Regel: Nur ehrliche, nette Sätze – keine Witze.",
          folie: "Ein Kind bekommt eine **Stärken-Dusche** 🚿.\n\nDie anderen sagen: **„Du kannst …“** oder **„Ich finde toll, dass du …“**\n\nNur ehrliche, nette Sätze!" }
    ],
    ab12: { titel: "Das kann ich gut", aufgaben: [
        { typ: "ankreuzen", text: "Ich kann gut … Kreuze an.", nebeneinander: true,
          optionen: ["[bild:pinsel] malen", "[bild:turnschuh] rennen", "helfen", "[gesicht:froh] lachen", "zuhören", "[bild:hammer] bauen", "[bild:gitarre] singen", "___"] },
        { typ: "malen", text: "Male etwas, das du richtig gut kannst.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Ich bin stolz, dass ich ___ kann."] }
    ]},
    ab34: { titel: "Meine Stärken-Schatzkiste", aufgaben: [
        { typ: "luecken", text: "Drei Stärken von mir – und woran man sie erkennt:", nummern: true,
          saetze: ["___, weil ___", "___, weil ___", "___, weil ___"] },
        { typ: "tabelle", text: "Stärken gibt es überall. Finde zu jedem Bereich eine Stärke von dir.", spalten: ["Bereich", "Meine Stärke"],
          zeilen: [["In der Schule", ""], ["Zu Hause", ""], ["Mit Freunden", ""], ["Beim Sport oder Hobby", ""]] },
        { typ: "luecken", text: "Eine Stärke, die ich noch üben möchte:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-mutig-sein",
    titel: "Mutig sein",
    kategorie: "Selbstwert & Stärken",
    ziel12: "Verschiedene Arten von Mut kennen und von eigenen mutigen Momenten erzählen",
    ziel34: "Mut und Leichtsinn unterscheiden und Mut zeigen, um für andere einzustehen",
    material: "Tafel: „Mut hat viele Gesichter“",
    lerntext12: { titel: "Leo, der leise Löwe", text:
`Leo ist ein Löwe. Aber Leo brüllt nie. Er ist ganz leise und ein bisschen schüchtern. Die anderen Löwen lachen: „Ein Löwe, der nicht brüllt? Du bist doch kein richtiger Löwe!“

Eines Tages hört Leo ein Piepsen. Eine kleine Maus steckt in einem Loch fest. Sie kommt nicht heraus.

Leo hat Angst vor dem großen Elefanten. Der Elefant ist so riesig! Aber Leo weiß: Nur der Elefant kann der Maus mit seinem Rüssel helfen.

Leo nimmt allen Mut zusammen. Er geht zum Elefanten und sagt: „Bitte hilf der Maus!“ Der Elefant zieht die Maus vorsichtig heraus.

Die Maus sagt: „Danke, Leo. Du bist der mutigste Löwe von allen.“ Leo lächelt. Mutig sein heißt nicht, laut zu brüllen.

**Nach dem Vorlesen:**
1. Warum haben die anderen Löwen über Leo gelacht?
2. Wovor hatte Leo Angst?
3. Was hat Leo trotzdem gemacht?
4. Wann warst du schon einmal mutig?` },
    lerntext34: { titel: "Mutig oder leichtsinnig?", text:
`Auf der Klassenfahrt sagt Kevin: „Ich klettere aufs Dach vom Schuppen. Wer traut sich noch?“ Ein paar Kinder jubeln. Kevin klettert hoch, rutscht fast ab und hält sich gerade noch an der Regenrinne fest. Die Lehrerin ist außer sich. „Das war nicht mutig, das war leichtsinnig!“

Am Abend sitzen alle in der Jugendherberge. Ein paar Jungen aus der Gruppe machen sich über Ben lustig, weil er ein Kuscheltier mitgebracht hat. Sie werfen es sich zu. Ben ist den Tränen nahe. Alle anderen schauen weg.

Da steht Jule auf. Ihr Herz klopft. „Gebt das zurück. Das ist nicht lustig.“ Einer der Jungen sagt: „Und? Was willst du machen?“ Jule bleibt stehen. „Ich sag's der Lehrerin, wenn ihr nicht aufhört.“ Die Jungen geben das Kuscheltier zurück.

Später sagt die Lehrerin: „Kevin wollte bewundert werden und hat sich in Gefahr gebracht. Jule hatte Angst – und hat trotzdem das Richtige getan. Das ist Mut.“

**Fragen zum Gespräch:**
1. Was ist der Unterschied zwischen Kevins und Jules Verhalten?
2. Warum war das, was Jule getan hat, so schwer?
3. Warum haben die anderen weggeschaut?
4. Wann warst du schon einmal mutig?`,
          antworten: ["👍 mutig", "👎 leichtsinnig"],
          folie: "Ist das **mutig** 👍 oder **leichtsinnig** 👎?\n\nSag, warum." },
    uebungen: [
        { titel: "Mut hat viele Gesichter", fuer: "alle", dauer: "5 Min",
          text: "Sammelt an der Tafel Arten von Mut: etwas Neues probieren – einen Fehler zugeben – Nein sagen – jemandem helfen – vor anderen sprechen – um Entschuldigung bitten. Die Kinder erzählen vom Platz aus von einem eigenen mutigen Moment (freiwillig).",
          folie: "Was ist **mutig**? 🦁\n\nWann warst du schon einmal mutig? (Du musst nicht erzählen.)" },
        { titel: "Mut-Pose", fuer: "12", dauer: "3 Min",
          text: "Alle stehen am Platz auf und machen die Superhelden-Pose: Beine fest, Hände in die Hüften, Kopf hoch. Ein paar Sekunden halten und gemeinsam sagen: „Ich bin mutig!“ Frage: „Wie fühlt sich dein Körper jetzt an?“",
          folie: "Steh auf und mach die **Superhelden-Pose** 🦸:\n\nBeine fest · Hände in die Hüften · Kopf hoch\n\nAlle zusammen: **„Ich bin mutig!“**" },
        { titel: "Mutig oder leichtsinnig?", fuer: "34", dauer: "4 Min",
          text: "Situationen vorlesen, die Kinder zeigen Daumen hoch (mutig) oder runter (leichtsinnig) und begründen:\n\n- über eine stark befahrene Straße rennen, um als Erster da zu sein\n- vor der Klasse sagen, dass man etwas nicht verstanden hat\n- auf einen hohen Baum klettern, weil alle zuschauen\n- einem ausgelachten Kind beistehen\n- zugeben, dass man die Vase umgestoßen hat" }
    ],
    ab12: { titel: "Ich bin mutig", aufgaben: [
        { typ: "ankreuzen", text: "Was ist mutig? Kreuze an.", nebeneinander: false,
          optionen: ["Ich sage „Stopp!“", "Ich probiere etwas Neues.", "Ich klettere aufs Dach.", "Ich helfe einem Kind.", "Ich sage die Wahrheit."] },
        { typ: "malen", text: "Male, wann du schon einmal mutig warst.", bild: "" }
    ]},
    ab34: { titel: "Mutig oder leichtsinnig?", aufgaben: [
        { typ: "tabelle", text: "Mutig (M) oder leichtsinnig (L)? Kreuze die richtige Spalte an.", spalten: ["Situation", "M", "L"],
          zeilen: [["Ich gebe zu, dass ich gelogen habe.", "", ""], ["Ich springe vom Dreier, obwohl ich nicht schwimmen kann.", "", ""], ["Ich frage nach, wenn ich etwas nicht verstehe.", "", ""], ["Ich fahre ohne Helm, damit die anderen mich cool finden.", "", ""], ["Ich sage Erwachsenen Bescheid, wenn jemand gemobbt wird.", "", ""]] },
        { typ: "luecken", text: "Ein Kind wird ausgelacht. Was kannst du mutig tun?", nummern: true, saetze: ["___", "___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Ich war mutig, als ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-fehler-lernhelfer",
    titel: "Fehler sind Lernhelfer",
    kategorie: "Selbstwert & Stärken",
    ziel12: "Fehler als normal erleben und nicht gleich aufgeben",
    ziel34: "Aus Fehlern lernen und mit dem Wort „noch“ an sich glauben",
    material: "Tafel: großes Wort „NOCH“",
    lerntext12: { titel: "Pia und das Fahrrad", text:
`Pia hat ein Fahrrad bekommen. Ohne Stützräder! Pia steigt auf. Sie tritt in die Pedale – und **plumps!** – fällt sie um.

Pia probiert es noch einmal. Wieder fällt sie hin. Ihr Knie tut weh. „Ich kann das nicht!“, ruft sie und weint.

Papa setzt sich zu ihr. „Du kannst es **noch** nicht“, sagt er. „Weißt du, wie oft ich hingefallen bin, als ich klein war? Hundert Mal!“

Pia muss lachen. Sie steigt wieder auf. Papa hält das Fahrrad fest. Sie fährt ein kleines Stück. Dann ein größeres. Am Abend fährt sie ganz allein eine Runde!

„Ich kann es!“, ruft Pia. „Und das Hinfallen hat mir beim Lernen geholfen.“

**Nach dem Vorlesen:**
1. Was ist passiert, als Pia das erste Mal gefahren ist?
2. Was hat Papa zu Pia gesagt?
3. Was bedeutet das kleine Wort „noch“?
4. Was kannst du heute, obwohl es am Anfang schwer war?` },
    lerntext34: { titel: "Das Wörtchen „noch“", text:
`Emil bekommt sein Diktat zurück. Unter dem Text steht eine Fünf. Er knüllt das Blatt zusammen. „Ich bin einfach zu dumm für Rechtschreibung“, flüstert er.

Frau Brandt hat es gehört. Nach der Stunde schreibt sie etwas an die Tafel: „Ich kann das nicht.“ Dann fügt sie ein Wort hinzu: „Ich kann das **noch** nicht.“

„Weißt du, was der Unterschied ist?“, fragt sie. „Der erste Satz ist eine Sackgasse. Der zweite ist ein Weg.“ Sie erzählt von Thomas Edison, der unzählige Versuche brauchte, bis seine Glühbirne endlich leuchtete. Jeder misslungene Versuch hat ihm gezeigt, wie es nicht geht.

Gemeinsam schauen Emil und Frau Brandt sich die Fehler an. Die meisten sind bei Wörtern mit „ie“. „Das ist kein Zeichen, dass du dumm bist“, sagt sie. „Das ist ein Hinweis, was du üben kannst.“

Emil übt jeden Tag fünf Minuten „ie“-Wörter. Das nächste Diktat ist eine Drei. Er grinst. „Rechtschreibung kann ich noch nicht perfekt. Aber ich bin auf dem Weg.“

**Fragen zum Gespräch:**
1. Warum hat Emil gedacht, er sei dumm?
2. Was ist der Unterschied zwischen „Ich kann das nicht“ und „Ich kann das noch nicht“?
3. Wie können Fehler beim Lernen helfen?
4. Wie fühlst du dich, wenn dir ein Fehler passiert? Was hilft dir dann?` },
    uebungen: [
        { titel: "Noch-nicht-Sätze", fuer: "alle", dauer: "4 Min",
          text: "Du liest die Sätze vor. Die Kinder rufen gemeinsam: „… NOCH nicht!“ Danach dürfen Kinder eigene Sätze sagen, die anderen ergänzen das „noch“.\n\n- „Ich kann nicht Fahrrad fahren …“\n- „Ich kann nicht schwimmen …“\n- „Ich kann nicht schreiben …“\n- „Ich kann keinen Salto …“",
          quiz: "karten",
          frage: "Alle rufen: „… NOCH nicht!“",
          folie: "Hör gut zu! Wenn jemand sagt **„Ich kann nicht …“**, rufen alle:\n\n**„… NOCH nicht!“** 💪" },
        { titel: "Fehler-Feier", fuer: "alle", dauer: "5 Min",
          text: "Wer mag, erzählt vom Platz aus von einem Fehler, der ihm passiert ist – und was er daraus gelernt hat. Nach jeder Geschichte rufen alle: „Juhu – gelernt!“ und klatschen. Du fängst selbst an und erzählst einen eigenen Fehler. Kl. 1/2 dürfen auch nur den Fehler erzählen, die anderen helfen beim „Was lernen wir?“.",
          folie: "Erzähl von einem **Fehler** – und was du daraus gelernt hast.\n\nDanach rufen alle: **„Juhu – gelernt!“** 🎉" },
        { titel: "Was hilft beim Weitermachen?", fuer: "34", dauer: "3 Min",
          text: "Sammelt Strategien: kurze Pause machen – um Hilfe bitten – in kleinen Schritten üben – sich an frühere Erfolge erinnern – Fehler genau anschauen.",
          folie: "Etwas klappt nicht. Was hilft dir, **weiterzumachen**?\n\nSammelt Ideen." }
    ],
    ab12: { titel: "Ich übe noch", aufgaben: [
        { typ: "ankreuzen", text: "Wenn etwas nicht klappt, … Kreuze an, was hilft.", nebeneinander: false,
          optionen: ["… gebe ich sofort auf.", "… übe ich weiter.", "… frage ich um Hilfe.", "… mache ich eine kleine Pause.", "… werfe ich alles hin."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Das kann ich noch nicht: ___"] },
        { typ: "malen", text: "Male etwas, das du früher nicht konntest – und jetzt kannst!", bild: "" }
    ]},
    ab34: { titel: "Aus Fehlern lernen", aufgaben: [
        { typ: "tabelle", text: "Verwandle die Sackgassen-Sätze in Weg-Sätze.", spalten: ["Statt …", "sage ich …"],
          zeilen: [["„Ich bin zu dumm dafür.“", ""], ["„Ich gebe auf.“", ""], ["„Das schaffe ich nie.“", ""], ["„Fehler sind peinlich.“", ""]] },
        { typ: "luecken", text: "Ein Fehler, aus dem ich gelernt habe:", nummern: false,
          saetze: ["Mein Fehler: ___", "Das habe ich gelernt: ___"] },
        { typ: "luecken", text: "Das kann ich noch nicht – so übe ich es:", nummern: false, saetze: ["___", "___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-stolz-auf-mich",
    titel: "Stolz auf mich",
    kategorie: "Selbstwert & Stärken",
    ziel12: "Sich über eigene Erfolge freuen und Lob annehmen",
    ziel34: "Stolz und Angeben unterscheiden und sich selbst wertschätzen",
    material: "Tafel",
    lerntext12: { titel: "Junas Schleife", text:
`Juna will ihre Schuhe allein zubinden. Aber die Schleife ist so schwer! Die Bänder rutschen immer wieder auseinander.

Jeden Morgen übt Juna. Erst klappt es gar nicht. Dann wird die Schleife ganz schief. Dann geht sie nach zwei Schritten wieder auf.

Aber Juna gibt nicht auf. Eines Morgens macht sie eine Schlaufe, wickelt das andere Band herum, zieht – und die Schleife hält!

Juna springt auf. „Papa! Ich kann es! Ganz allein!“ Papa freut sich mit ihr. „Du hast so lange geübt. Darauf kannst du richtig **stolz** sein.“

Juna lächelt den ganzen Tag. Und sie bindet ihre Schuhe noch fünfmal auf und wieder zu – einfach, weil sie es kann.

**Nach dem Vorlesen:**
1. Was wollte Juna lernen?
2. Warum war das so schwer?
3. Warum ist Juna am Ende stolz?
4. Worauf bist du stolz?` },
    lerntext34: { titel: "Stolz oder Angeber?", text:
`Leonie hat den Vorlesewettbewerb der Schule gewonnen. Sie hat eine Urkunde und ein Buch bekommen. In der Pause erzählt sie es allen – zum zehnten Mal. „Ihr habt ja alle schlechter gelesen. Ich bin halt einfach die Beste.“ Ein paar Kinder verdrehen die Augen und gehen weg.

Max hat in Mathe lange eine Vier gehabt. Er hat jeden Tag geübt. In der letzten Arbeit hat er eine Zwei. Er lächelt still, zeigt die Arbeit zu Hause seiner Oma und sagt: „Das Üben hat sich gelohnt.“ Als Frau Kühn ihn in der Klasse lobt, sagt er erst: „Ach, war nur Glück.“ Dann korrigiert er sich: „Nein – danke. Ich habe viel geübt.“

Am Nachmittag erzählt Leonie ihrer Freundin Fatma, dass keiner mehr mit ihr reden will. Fatma sagt ehrlich: „Wir freuen uns doch für dich. Aber du hast so getan, als wären wir alle schlecht.“

**Fragen zum Gespräch:**
1. Worauf sind Leonie und Max stolz?
2. Was ist der Unterschied zwischen stolz sein und angeben?
3. Warum hat Max zuerst „War nur Glück“ gesagt? Warum war es gut, dass er sich verbessert hat?
4. Darf man stolz auf sich sein? Wann ist Stolz gut?` },
    uebungen: [
        { titel: "Stolz-Runde", fuer: "alle", dauer: "5 Min",
          text: "Jedes Kind steht kurz an seinem Platz auf und sagt: „Ich bin stolz auf mich, weil …“ Die anderen klatschen. Kl. 1/2 dürfen auch Kleines nennen („… ich allein die Schuhe binden kann“), Kl. 3/4 sagen, wie sie es geschafft haben.",
          folie: "Steh auf und sag:\n\n**„Ich bin stolz auf mich, weil …“**\n\nDie anderen klatschen. 👏",
          folie34: "Steh auf und sag:\n\n**„Ich bin stolz auf mich, weil …“** – und wie du es geschafft hast.\n\nDie anderen klatschen. 👏" },
        { titel: "Lob annehmen", fuer: "alle", dauer: "4 Min",
          text: "Du sagst einzelnen Kindern ein ehrliches Lob. Die Kinder üben, es anzunehmen: Anschauen, lächeln, „Danke!“ sagen – ohne „Ach, das war nix“. Danach dürfen die Tischnachbarn sich gegenseitig loben.",
          folie: "Wenn dich jemand lobt:\n\n👀 anschauen · 🙂 lächeln · **„Danke!“**\n\nNicht: „Ach, das war doch nix.“" },
        { titel: "Stolz oder angeben?", fuer: "34", dauer: "3 Min",
          text: "Du sagst Sätze, die Kinder entscheiden mit Daumen hoch (stolz) oder runter (angeben):\n\n- „Ich habe geübt und jetzt kann ich es.“\n- „Ihr seid alle schlechter als ich.“\n- „Mein Bild ist schön geworden, finde ich.“\n- „Ich hab das teuerste Handy der Klasse.“",
          antworten: ["👍 stolz", "👎 angeben"],
          folie: "Ist das **stolz** 👍 oder **angeben** 👎?" }
    ],
    ab12: { titel: "Darauf bin ich stolz", aufgaben: [
        { typ: "gesichter", text: "So sehe ich aus, wenn ich stolz bin. Male dein Gesicht.", gefuehle: ["stolz"], leer: true },
        { typ: "malen", text: "Male den Pokal an. Wofür bekommst du ihn?", bild: "pokal" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Pokal ist für: ___"] }
    ]},
    ab34: { titel: "Mein Stolz-Tagebuch", aufgaben: [
        { typ: "luecken", text: "Darauf bin ich stolz:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "tabelle", text: "Stolz sein (S) oder angeben (A)? Kreuze die richtige Spalte an.", spalten: ["Satz", "S", "A"],
          zeilen: [["„Ich habe lange geübt und jetzt kann ich es.“", "", ""], ["„Ohne mich hättet ihr verloren, ihr Nieten.“", "", ""], ["„Ich freue mich, dass mein Bild so schön geworden ist.“", "", ""], ["„Ich kann alles besser als du.“", "", ""]] },
        { typ: "luecken", text: "Jemand lobt dich. Was antwortest du?", nummern: false, saetze: ["„___“"] }
    ]}
}),

/* ============================== KOMMUNIKATION ============================== */
SOZIAL_EINHEIT({
    id: "v-zuhoeren",
    titel: "Richtig zuhören",
    kategorie: "Kommunikation",
    ziel12: "Mit Augen, Ohren und ruhigem Körper zuhören",
    ziel34: "Aktiv zuhören: anschauen, nachfragen, mit eigenen Worten wiederholen",
    material: "Klangschale oder Glöckchen (für die Geräusche-Detektive)",
    lerntext12: { titel: "Olga, die Eule", text:
`Im Wald wohnt Olga, die Eule. Alle Tiere erzählen ihr gern etwas. Weißt du, warum?

Die kleine Maus kommt angelaufen. „Olga, ich habe heute einen riesigen Käse gefunden!“ Der Fuchs unterbricht: „Na und? Ich habe gestern zwei gefunden!“ Der Specht klopft laut dazwischen. Die Maus wird ganz leise.

Olga sagt: „Psst. Jetzt erzählt die Maus.“ Olga schaut die Maus an. Ihre großen Augen sind ganz ruhig. Sie sagt nichts dazwischen. Sie nickt nur.

Am Ende fragt Olga: „Und was hast du mit dem Käse gemacht?“ Die Maus strahlt. „Ich habe ihn mit meiner Familie geteilt!“

Die Maus fühlt sich wichtig. Darum erzählen alle Olga so gern etwas: Weil sie richtig zuhört.

**Nach dem Vorlesen:**
1. Was haben der Fuchs und der Specht gemacht, als die Maus erzählt hat?
2. Was macht Olga beim Zuhören?
3. Wie hat sich die Maus gefühlt?
4. Woran merkst du, dass dir jemand richtig zuhört?

**Tipp für dich:** Mögliche Antworten: anschauen, still sein, nicken, nachfragen.` },
    lerntext34: { titel: "Hörst du mir überhaupt zu?", text:
`Ben kommt aufgeregt in die Klasse. „Lea, stell dir vor, meine Oma ist ins Krankenhaus gekommen, und …“ Lea malt weiter an ihrem Bild. „Mhm.“ Ben erzählt weiter. Lea schaut aus dem Fenster. „Mhm. Hast du eigentlich die Hausaufgaben?“

Ben verstummt. Er fühlt sich, als hätte er mit einer Wand gesprochen.

In der Pause erzählt er es Kai. Kai legt seinen Ball weg, dreht sich zu Ben und schaut ihn an. Er hört zu, ohne zu unterbrechen. Dann sagt er: „Deine Oma liegt also im Krankenhaus? Das klingt echt schlimm. Wie geht es ihr jetzt?“ Ben erzählt mehr – und merkt, wie es ihm ein bisschen leichter wird.

Am Nachmittag entschuldigt sich Lea. „Ich war heute Morgen total in Gedanken. Tut mir leid. Willst du es mir nochmal erzählen? Diesmal höre ich richtig zu.“

**Fragen zum Gespräch:**
1. Woran hat Ben gemerkt, dass Lea nicht zuhört?
2. Was hat Kai anders gemacht? Zählt alles auf!
3. Was ist „aktives Zuhören“?
4. Wann fällt dir Zuhören schwer?` },
    uebungen: [
        { titel: "Geräusche-Detektive", fuer: "alle", dauer: "3 Min",
          text: "Alle schließen am Platz die Augen. Du schlägst die Klangschale an. Bis der Ton ganz verklungen ist, lauschen alle. Danach: Welche Geräusche habt ihr noch gehört? (Uhr, Vogel, Heizung, Schritte auf dem Flur …)",
          folie: "Schließ die Augen. 🔔\n\nHör zu, bis der Ton ganz weg ist. Welche Geräusche hörst du noch?" },
        { titel: "Stille Post", fuer: "alle", dauer: "4 Min",
          text: "Das erste Kind flüstert einen Satz an seinen Sitznachbarn, der gibt ihn weiter – Platz für Platz durch die Reihe. Das letzte Kind sagt laut, was angekommen ist. Frage: Warum kam der Satz anders an? Was braucht gutes Zuhören?",
          folie: "Flüster den Satz deinem Nachbarn ins Ohr. 🤫\n\nDas letzte Kind sagt laut, was angekommen ist." },
        { titel: "Zuhör-Körper", fuer: "12", dauer: "4 Min",
          text: "Gemeinsam zeigt ihr am Platz: Augen schauen den anderen an – Ohren hören – Mund ist still – Hände und Füße sind ruhig. Danach erzählst du eine kurze Geschichte, und die Kinder halten den Zuhör-Körper. Wer hat gut zugehört? Stell drei Fragen zur Geschichte.",
          folie: "So hörst du richtig zu:\n\n👀 Augen schauen · 👂 Ohren hören · 🤐 Mund ist still · ✋ Hände und Füße sind ruhig" },
        { titel: "Zuhör-Paare", fuer: "34", dauer: "5 Min",
          text: "Die Tischnachbarn: A erzählt eine Minute von seinem Wochenende, B hört nur zu. Dann wiederholt B drei Dinge, die er sich gemerkt hat, und stellt eine Nachfrage. Dann Wechsel.",
          folie: "**A** erzählt eine Minute von seinem Wochenende. **B** hört nur zu.\n\nDann sagt B drei Dinge, die er sich gemerkt hat, und stellt eine Frage. Dann wechseln." }
    ],
    ab12: { titel: "Ich höre gut zu", aufgaben: [
        { typ: "ankreuzen", text: "So höre ich gut zu. Kreuze an.", nebeneinander: false,
          optionen: ["Ich schaue den anderen an.", "Ich rede dazwischen.", "Ich bin leise.", "Ich spiele mit meinem Stift.", "Ich nicke."] },
        { typ: "malen", text: "Male das Ohr an. Was hörst du gern?", bild: "ohr" }
    ]},
    ab34: { titel: "Aktiv zuhören", aufgaben: [
        { typ: "tabelle", text: "Hört das Kind gut zu? Kreuze ja oder nein an.", spalten: ["Verhalten", "ja", "nein"],
          zeilen: [["Es schaut beim Zuhören auf sein Handy.", "", ""], ["Es fragt nach: „Wie meinst du das?“", "", ""], ["Es unterbricht und erzählt von sich.", "", ""], ["Es wiederholt: „Du meinst also …“", "", ""], ["Es nickt und schaut den anderen an.", "", ""]] },
        { typ: "luecken", text: "Dein Freund sagt: „Mein Hamster ist krank.“ Was kannst du nachfragen?", nummern: true, saetze: ["„___“", "„___“"] },
        { typ: "luecken", text: "Zuhören fällt mir schwer, wenn …", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-komplimente",
    titel: "Komplimente machen",
    kategorie: "Kommunikation",
    ziel12: "Anderen etwas Nettes sagen und sich darüber freuen",
    ziel34: "Ehrliche, genaue Komplimente formulieren und annehmen",
    material: "Eine kleine Schachtel als „Kompliment-Kiste“ mit Namenszetteln",
    lerntext12: { titel: "Die Kompliment-Kiste", text:
`Frau Sonne hat eine Kiste mitgebracht. „Das ist unsere Kompliment-Kiste“, sagt sie. „Jeder zieht einen Namen und sagt diesem Kind etwas Nettes.“

Max ist heute schlecht gelaunt. Er verschränkt die Arme. „So ein Quatsch“, brummt er.

Lina zieht Max' Namen. Sie überlegt kurz. Dann sagt sie: „Max, du kannst die besten Papierflieger der Welt bauen. Deiner ist neulich bis zur Tafel geflogen!“

Max schaut überrascht auf. Seine Arme werden locker. Und dann – ein kleines Lächeln.

Max zieht Paulas Namen. „Paula, du hast mir gestern deinen Stift geliehen. Das war nett.“ Paula wird ein bisschen rot – und freut sich.

**Nach dem Vorlesen:**
1. Wie war Max am Anfang gelaunt?
2. Was hat Lina zu Max gesagt?
3. Warum hat Max gelächelt?
4. Wie fühlt es sich an, ein Kompliment zu bekommen?` },
    lerntext34: { titel: "Mehr als „Du bist cool“", text:
`Sophie hat Geburtstag. Den ganzen Tag hört sie: „Du bist cool.“ – „Du bist nett.“ – „Schönes T-Shirt.“ Sie freut sich, aber irgendwie rauscht das alles an ihr vorbei.

Dann kommt Can. „Ich fand es richtig toll, wie du letzte Woche dem neuen Mädchen die ganze Schule gezeigt hast. Du hast sogar gewartet, bis sie ihren Spind gefunden hat. Das hätte nicht jeder gemacht.“

Sophie ist gerührt. Dieses Kompliment geht ihr den ganzen Tag nicht aus dem Kopf.

Am Abend überlegt sie, warum. Cans Kompliment war **genau** – er hat etwas Bestimmtes gesehen. Es war **ehrlich** – man hat gemerkt, dass er es so meint. Und es ging um etwas, das sie **getan** hat, nicht nur um ihr Aussehen.

Am nächsten Tag probiert Sophie es selbst aus. „Can, deine Idee mit dem Regenwasser-Experiment war echt clever.“ Can grinst. „Danke!“

**Fragen zum Gespräch:**
1. Warum hat Cans Kompliment Sophie so berührt?
2. Was macht ein gutes Kompliment aus?
3. Wie kann man ein Kompliment annehmen, ohne es kleinzureden?
4. Gibt es Komplimente, die nicht nett gemeint sind?` },
    uebungen: [
        { titel: "Kompliment-Kette", fuer: "alle", dauer: "6 Min",
          text: "Jedes Kind sagt dem Kind auf dem nächsten Platz (der Reihe nach) ein Kompliment. Das Kind, das es bekommt, schaut den anderen an und sagt „Danke!“. Kl. 1/2 dürfen auch einfache Komplimente sagen („Du malst schön“), Kl. 3/4 machen es genauer („Mir gefällt, wie du …“).",
          folie: "Sag dem Kind neben dir ein **Kompliment**.\n\nWer es bekommt, schaut den anderen an und sagt **„Danke!“**",
          folie34: "Sag dem Kind neben dir ein **genaues Kompliment**: „Mir gefällt, wie du …“\n\nWer es bekommt, schaut den anderen an und sagt **„Danke!“**" },
        { titel: "Komplimente genauer machen", fuer: "34", dauer: "4 Min",
          text: "Du sagst allgemeine Komplimente, die Kinder machen sie genauer:\n\n- „Du bist nett.“ → „Ich finde nett, dass du …“\n- „Du bist gut in Sport.“ → „Wie du gestern den Ball …“\n- „Schönes Bild.“ → „Die Farben vom Himmel …“",
          quiz: "karten",
          frage: "Mach das Kompliment genauer: Was genau gefällt dir?",
          folie: "Ein Kompliment wird schöner, wenn es **genau** ist.\n\nAus „Du bist nett“ wird: **„Ich finde nett, dass du …“**" },
        { titel: "Kompliment an mich selbst", fuer: "12", dauer: "3 Min",
          text: "Die Kinder legen die Hand aufs Herz und sagen leise zu sich selbst: „Ich bin gut, so wie ich bin.“ Wer mag, sagt laut ein Kompliment an sich selbst („Ich kann toll …“).",
          folie: "Leg die Hand aufs Herz. ❤️\n\nSag leise zu dir: **„Ich bin gut, so wie ich bin.“**" }
    ],
    ab12: { titel: "Etwas Nettes sagen", aufgaben: [
        { typ: "ankreuzen", text: "Was ist ein Kompliment? Kreuze an.", nebeneinander: false,
          optionen: ["„Du malst schön.“", "„Du bist doof.“", "„Du kannst toll rennen.“", "„Danke für deine Hilfe!“", "„Geh weg!“"] },
        { typ: "malen", text: "Male das Herz an. Male hinein, was du an einem Kind aus der Gruppe toll findest.", bild: "herz" }
    ]},
    ab34: { titel: "Komplimente, die ankommen", aufgaben: [
        { typ: "tabelle", text: "Mach das Kompliment genauer.", spalten: ["Allgemein", "Genauer"],
          zeilen: [["„Du bist nett.“", ""], ["„Du bist gut in Sport.“", ""], ["„Dein Bild ist schön.“", ""]] },
        { typ: "luecken", text: "Schreibe drei Komplimente an Kinder aus unserer Gruppe.", nummern: true,
          saetze: ["An ___: ___", "An ___: ___", "An ___: ___"] },
        { typ: "luecken", text: "Wenn ich ein Kompliment bekomme, sage ich:", nummern: false, saetze: ["„___“"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-koerpersprache",
    titel: "Körpersprache",
    kategorie: "Kommunikation",
    ziel12: "Gefühle an der Körperhaltung erkennen",
    ziel34: "Körpersprache deuten und bewusst einsetzen (Blick, Haltung, Stimme)",
    material: "Optional: Bild eines Hundes (für den Lerntext 1/2)",
    lerntext12: { titel: "Was Bello erzählt", text:
`Bello ist ein Hund. Bello kann nicht sprechen. Aber Bello erzählt trotzdem ganz viel – mit seinem Körper.

Wenn Mila nach Hause kommt, wedelt Bello mit dem Schwanz und springt hoch. Bello ist **froh**.

Wenn es donnert, zieht Bello den Schwanz ein und versteckt sich unter dem Tisch. Bello hat **Angst**.

Wenn ein fremder Hund an seinen Knochen will, knurrt Bello und zeigt die Zähne. Bello ist **wütend**.

Mila sagt: „Bei Menschen ist es genauso! Wenn Opa die Schultern hängen lässt, ist er müde oder traurig. Wenn meine Schwester hüpft, freut sie sich.“

**Nach dem Vorlesen:**
1. Wie zeigt Bello, dass er froh ist?
2. Wie zeigt Bello, dass er Angst hat?
3. Wie zeigt Bello, dass er wütend ist?
4. Zeig am Platz mit deinem Körper: Ich bin froh!` },
    lerntext34: { titel: "Was der Körper verrät", text:
`Lukas hat ein tolles Referat über Haie vorbereitet. Er weiß alles über Hammerhaie und Walhaie. Doch als er vorn steht, schaut er auf den Boden, hält die Hände vor dem Bauch und murmelt so leise, dass hinten keiner etwas versteht. Ein paar Kinder fangen an zu tuscheln.

Frau Meier sagt: „Lukas, dein Inhalt ist super. Probier es noch einmal: Stell dich gerade hin, Füße fest auf den Boden, und such dir zwei Kinder, die du anschaust.“ Lukas atmet durch. Er stellt sich aufrecht hin und schaut zu Emma und Kerem. Seine Stimme wird lauter. Plötzlich hören alle gespannt zu.

In der Pause fragt Lukas seine Freundin Hanna, ob alles okay ist. „Mir geht's gut“, sagt Hanna. Aber ihre Arme sind verschränkt, sie schaut weg, und ihre Stimme klingt dünn. Lukas merkt: Ihr Körper sagt etwas anderes als ihr Mund. „Sicher? Du siehst traurig aus.“ Da erzählt Hanna, dass ihre Eltern sich gestritten haben.

**Fragen zum Gespräch:**
1. Was hat Lukas' Körper beim ersten Versuch verraten?
2. Was hat sich beim zweiten Versuch verändert?
3. Woran hat Lukas gemerkt, dass Hanna nicht die Wahrheit sagt?
4. Was glauben wir eher: den Worten oder dem Körper?` },
    uebungen: [
        { titel: "Statuen raten", fuer: "alle", dauer: "5 Min",
          text: "Ein Kind steht an seinem Platz auf und erstarrt zu einer „Statue“, die ein Gefühl zeigt (müde, stolz, ängstlich, gelangweilt, froh, wütend) – nur mit dem Körper, ohne Worte. Die anderen raten. Wer richtig rät, ist als Nächstes dran.",
          folie: "Ein Kind wird zur **Statue** 🗿 und zeigt ein Gefühl – nur mit dem Körper.\n\nRate: Welches Gefühl ist das?" },
        { titel: "Gefühle zeigen", fuer: "12", dauer: "3 Min",
          text: "Du nennst ein Gefühl, alle zeigen es am Platz nur mit dem Körper. Dann vergleicht ihr: Was machen die Schultern? Der Kopf? Die Hände?",
          folie: "Zeig das Gefühl nur mit deinem Körper.\n\nWas machen deine Schultern? Dein Kopf? Deine Hände?" },
        { titel: "Gleicher Satz – andere Wirkung", fuer: "34", dauer: "4 Min",
          text: "Ein Kind sagt den Satz „Ich weiß die Antwort“ – einmal geduckt mit Blick auf den Boden, einmal gerade mit Blickkontakt, einmal mit verschränkten Armen und Augenrollen. Die anderen beschreiben, wie jede Version wirkt.",
          folie: "Ein Kind sagt dreimal: **„Ich weiß die Antwort.“**\n\nJedes Mal mit anderer Körperhaltung. Wie wirkt es?" }
    ],
    ab12: { titel: "Was sagt der Körper?", aufgaben: [
        { typ: "zuordnen", text: "Wie fühlt sich das Kind? Verbinde.",
          links: ["Die Schultern hängen.", "Das Kind hüpft.", "Die Fäuste sind geballt.", "Das Kind zittert."],
          rechts: ["froh", "ängstlich", "traurig", "wütend"] },
        { typ: "malen", text: "Male dich: So stehe ich, wenn ich stolz bin.", bild: "" }
    ]},
    ab34: { titel: "Mein Körper spricht mit", aufgaben: [
        { typ: "tabelle", text: "Was könnte die Körpersprache bedeuten?", spalten: ["Körpersprache", "Bedeutung"],
          zeilen: [["Arme verschränkt, Blick zur Seite", ""], ["Blick auf den Boden, leise Stimme", ""], ["Lächeln, offene Arme", ""], ["Gähnen, auf die Uhr schauen", ""]] },
        { typ: "luecken", text: "So wirke ich sicher, wenn ich vor der Klasse spreche:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "Wenn Worte und Körper nicht zusammenpassen, kann ich …", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-um-hilfe-bitten",
    titel: "Um Hilfe bitten",
    kategorie: "Kommunikation",
    ziel12: "Sich trauen, um Hilfe zu bitten",
    ziel34: "Klar sagen, wobei man Hilfe braucht, und wissen, wer helfen kann",
    material: "Tafel für die Hilfe-Sätze und die Helfer-Landkarte",
    lerntext12: { titel: "Ella und der hohe Schrank", text:
`Ella möchte ihr Lieblingsbuch lesen. Aber das Buch liegt oben auf dem Schrank. Ganz hoch!

Ella holt einen Stuhl. Sie stellt sich auf die Zehenspitzen. Der Stuhl wackelt. Oh nein – fast wäre Ella heruntergefallen!

Da denkt Ella: „Das ist zu gefährlich. Ich brauche Hilfe.“ Sie geht zu Papa. „Papa, kannst du mir bitte das Buch vom Schrank holen? Ich komme nicht dran.“

Papa holt das Buch herunter. „Gut, dass du gefragt hast“, sagt er. „Hilfe holen ist schlau.“

Dann setzen sich beide auf das Sofa. Und Papa liest Ella das Buch vor.

**Nach dem Vorlesen:**
1. Wo lag Ellas Buch?
2. Was ist fast passiert?
3. Wen hat Ella um Hilfe gebeten – und wie?
4. Wobei hast du schon einmal um Hilfe gebeten?` },
    lerntext34: { titel: "Das schaffe ich allein!", text:
`Tom bittet nie um Hilfe. „Wer fragen muss, ist schwach“, findet er. Seit Wochen versteht er das schriftliche Dividieren nicht. Im Unterricht nickt er, als hätte er alles verstanden. Zu Hause sitzt er abends vor den Aufgaben und ist verzweifelt.

Eines Abends kommt seine Oma vorbei und findet ihn mit Tränen in den Augen über dem Heft. Sie setzt sich zu ihm. „Weißt du, wie Astronauten auf den Mond gekommen sind? Nicht allein. Hunderte Menschen haben sich gegenseitig geholfen. Um Hilfe zu bitten ist keine Schwäche – es ist klug.“

Am nächsten Tag nimmt Tom allen Mut zusammen. Er fragt seine Tischnachbarin Elif: „Kannst du mir bitte zeigen, wie du die zweite Aufgabe gerechnet hast? Ich komme beim Teilen durch 7 nicht weiter.“ Elif erklärt es ihm. Nach der Stunde geht er auch noch zu Frau Yilmaz und sagt genau, wo er hängt.

Eine Woche später rechnet Tom die Aufgaben allein. Und als Elif bei Englisch nicht weiterweiß, hilft er ihr.

**Fragen zum Gespräch:**
1. Warum hat Tom so lange nicht gefragt?
2. Was hat Toms Oma gemeint?
3. Was war gut an der Art, wie Tom Elif gefragt hat?
4. Wer kann dir in der Schule und zu Hause helfen?` },
    uebungen: [
        { titel: "Hilfe-Sätze", fuer: "alle", dauer: "4 Min",
          text: "Sammelt an der Tafel Sätze, mit denen man um Hilfe bittet: „Kannst du mir bitte helfen?“ – „Ich verstehe … nicht.“ – „Ich komme hier nicht weiter.“ Kl. 3/4 ergänzen: „Ich habe schon … versucht.“ Alle sprechen ihren Lieblingssatz laut.",
          folie: "Wie bittet man um **Hilfe**? 🙋\n\nSuch dir deinen Lieblingssatz aus und sag ihn laut." },
        { titel: "Helfer-Landkarte", fuer: "alle", dauer: "5 Min",
          text: "Male an die Tafel eine Landkarte mit „Inseln“: Schule, Zuhause, Pause, Freunde. Die Kinder rufen vom Platz aus, wer auf jeder Insel helfen kann (Lehrerin, Hausmeister, Schulsozialarbeit, Eltern, Oma, große Geschwister, Freunde, Pausenaufsicht). Kl. 1/2 dürfen Symbole dazu malen.",
          folie: "Auf der Tafel sind Inseln: 🏫 Schule · 🏠 Zuhause · ⚽ Pause · 👫 Freunde\n\n**Wer kann dir auf jeder Insel helfen?**" },
        { titel: "Bitten üben", fuer: "34", dauer: "3 Min",
          text: "Die Tischnachbarn bekommen eine Situation (z. B. Hausaufgabe nicht verstanden, Fahrradkette ab, jemand ärgert mich ständig) und üben eine genaue Bitte: Was brauche ich? Was habe ich schon versucht?",
          folie: "Ihr bekommt eine Situation. Übt eine **genaue Bitte**:\n\n**Was brauche ich? Was habe ich schon versucht?**" }
    ],
    ab12: { titel: "Kannst du mir helfen?", aufgaben: [
        { typ: "ankreuzen", text: "Um Hilfe bitten ist … Kreuze an.", nebeneinander: true, optionen: ["mutig", "peinlich", "schlau", "gut"] },
        { typ: "luecken", text: "So bitte ich um Hilfe:", nummern: false, saetze: ["„Kannst du mir bitte ___?“"] },
        { typ: "malen", text: "Male dich und einen Menschen, der dir hilft.", bild: "" }
    ]},
    ab34: { titel: "Hilfe holen ist Stärke", aufgaben: [
        { typ: "tabelle", text: "Meine Helfer-Landkarte: Wer kann dir helfen?", spalten: ["Wobei?", "Wer kann helfen?"],
          zeilen: [["Bei den Hausaufgaben", ""], ["Bei Streit mit Freunden", ""], ["Wenn ich traurig bin", ""], ["Wenn ich mich verletzt habe", ""]] },
        { typ: "luecken", text: "Formuliere eine gute Bitte um Hilfe zu einer Aufgabe, die du schwer findest.", nummern: false,
          saetze: ["„Kannst du mir bitte helfen? Ich ___", "Ich habe schon ___“"] },
        { typ: "luecken", text: "Warum fällt es manchen Kindern schwer, um Hilfe zu bitten?", nummern: false, saetze: ["___"] }
    ]}
})

);
