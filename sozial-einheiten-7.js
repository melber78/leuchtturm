/* ============================================================
   Leuchtturm – Sozialtraining: „Klartext“ Teil 2 – NUR Kl. 3/4
   Lügen, Erwachsene, Ausgrenzung, Wut-Eisberg, Rache, Freunde,
   Konsequenzen, Gefühle zeigen, Neid, Petzen, Schlichten, Ruf.
   ============================================================ */
(function () {
const KAT = "Klartext (Kl. 3/4)";
if (window.SOZIAL_KATEGORIEN && !window.SOZIAL_KATEGORIEN.includes(KAT)) {
    const i = window.SOZIAL_KATEGORIEN.indexOf("Sonstiges");
    window.SOZIAL_KATEGORIEN.splice(i < 0 ? window.SOZIAL_KATEGORIEN.length : i, 0, KAT);
}
function K(o){
    o.kategorie = KAT; o.nur34 = true; o.dauer = 40; o.ziel12 = "";
    o.lerntext12 = { titel: "", text: "" }; o.ab12 = { titel: "", aufgaben: [] };
    o.uebungen = (o.uebungen || []).map(u => Object.assign({ fuer: "34" }, u));
    o.verlauf = [
        { zeit: "0–5",   phase: "Ankommen",     k12: "–", k34: "Begrüßung, Gefühlsbarometer (ein Satz)" },
        { zeit: "5–13",  phase: "Lerntext",     k12: "–", k34: "Fall „" + o.lerntext34.titel + "“ lesen, Fragen besprechen" },
        { zeit: "13–25", phase: "Übung",        k12: "–", k34: o.uebungen.map(u => u.titel).join(", ") },
        { zeit: "25–35", phase: "Arbeitsblatt", k12: "–", k34: "AB 3/4: " + o.ab34.titel },
        { zeit: "35–40", phase: "Abschluss",    k12: "–", k34: "„Heute habe ich gelernt …“, Applauswelle" }
    ];
    return o;
}

window.SOZIAL_VORLAGEN.push(

/* ------------------------------------------------------------ */
K({
    id: "k-luegen",
    titel: "Lügen und Vertrauen",
    ziel34: "Verstehen, wie Lügen Vertrauen kaputt machen – und wie man Vertrauen zurückgewinnt",
    material: "Tafel: Vertrauens-Konto (Einzahlung / Abhebung)\nrote und grüne Karten",
    materialIds: ["rot-gruen"],
    lerntext34: { titel: "Die Ausrede", text:
`Niklas hat seiner Mutter erzählt, dass er nach der Schule bei Ben Hausaufgaben macht. In Wirklichkeit ist er mit älteren Jungs am Bahnhof. Seine Mutter ruft bei Bens Mutter an. Die Lüge fliegt auf.

Ab jetzt muss Niklas jeden Tag direkt nach Hause. Er findet das ungerecht: „Das war doch nur einmal!“ Seine Mutter sagt: „Ich weiß jetzt nicht mehr, wann ich dir glauben kann.“

In der Schule passiert etwas Ähnliches. Niklas sagt der Lehrerin, er habe die Hausaufgaben vergessen – dabei hat er sie gar nicht gemacht. Als er eine Woche später wirklich krank ist und eine Entschuldigung vergisst, glaubt ihm keiner.

Niklas merkt: Eine Lüge ist schnell erzählt. Vertrauen zurückzuholen dauert Wochen.

**Fragen zum Gespräch:**
1. Warum hat Niklas gelogen? Was wollte er erreichen?
2. Ist die Strafe der Mutter fair? Warum reagiert sie so?
3. Warum glaubt ihm die Lehrerin nicht, als er die Wahrheit sagt?
4. Gibt es Lügen, die okay sind? (z. B. um jemanden zu schützen)
5. Was müsste Niklas tun, damit man ihm wieder glaubt?` },
    uebungen: [
        { titel: "Das Vertrauens-Konto", dauer: "6 Min",
          text: "Male an die Tafel ein Konto. Jede ehrliche Handlung ist eine **Einzahlung**, jede Lüge eine **Abhebung** – und Abhebungen sind viel größer als Einzahlungen. Gemeinsam sammeln: Was zahlt ein? (Wort halten, Fehler zugeben, pünktlich sein …) Was hebt ab? (lügen, Versprechen brechen, hinter dem Rücken reden …)",
          folie: "Vertrauen ist wie ein **Konto** 🏦.\n\n➕ Was zahlt ein? · ➖ Was hebt ab?" },
        { titel: "Lüge oder nicht?", dauer: "6 Min",
          text: "Du liest Situationen vor, die Kinder zeigen rot (= Lüge, die schadet) oder grün (= ehrlich bzw. harmlos). Diskutiert die schwierigen Fälle.\n\n- „Ich hab die Hausaufgaben vergessen“ – obwohl man keine Lust hatte.\n- Oma fragt, ob dir der Pullover gefällt. Du sagst ja, obwohl er hässlich ist.\n- Du sagst, du warst es nicht, obwohl du das Fenster kaputt gemacht hast.\n- Du verrätst nicht, wo dein Freund sein Geburtstagsgeschenk versteckt hat.\n- Du erzählst, du hättest ein neues Handy – stimmt aber nicht.\n- Du sagst der Lehrerin nicht, wer die Wand beschmiert hat.",
          antworten: ["🔴 Lüge, die schadet", "🟢 ehrlich / harmlos"],
          folie: "Ist das eine **Lüge, die schadet** 🔴 – oder **ehrlich bzw. harmlos** 🟢?\n\nHalte die **rote oder grüne Karte** hoch." }
    ],
    ab34: { titel: "Mein Vertrauens-Konto", kontext: "Zum Fall: Niklas lügt seine Mutter und seine Lehrerin an. Als er später die Wahrheit sagt, glaubt ihm keiner mehr.", aufgaben: [
        { typ: "tabelle", text: "Was zahlt auf das Vertrauens-Konto ein – was hebt ab? Schreib in jede Spalte drei Beispiele.", spalten: ["Einzahlung (macht Vertrauen)", "Abhebung (macht Vertrauen kaputt)"], zeilen: [["", ""], ["", ""], ["", ""]] },
        { typ: "ankreuzen", text: "Warum lügen Menschen? Kreuze an, was du kennst.", optionen: ["um Ärger zu vermeiden", "um besser dazustehen", "um jemanden zu schützen", "aus Gewohnheit", "aus Angst"] },
        { typ: "luecken", text: "Niklas will Vertrauen zurückgewinnen. Gib ihm drei Tipps:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "schreiben", text: "Wem vertraust du – und warum?", zeilen: 3 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-erwachsene",
    titel: "Ärger mit Erwachsenen",
    ziel34: "Bei Ungerechtigkeit durch Erwachsene ruhig bleiben und sich trotzdem wirksam beschweren",
    material: "Tafel: „Was ich fühle“ – „Was ich tue“ – „Was dann passiert“",
    lerntext34: { titel: "Unfair!", text:
`In der Hofpause gibt es Gerangel an der Tischtennisplatte. Die Aufsicht kommt dazu und sieht nur, wie Selin einen Jungen schubst. Dass er sie vorher zweimal geschubst hat, hat sie nicht gesehen. „Selin, du gehst sofort rein!“

Selin ist außer sich. „Das ist voll unfair! Sie haben ja gar keine Ahnung!“ Sie schreit, knallt die Tür und tritt gegen den Mülleimer. Jetzt gibt es einen Anruf bei ihren Eltern.

Am nächsten Tag erzählt Selin alles ihrer Schulsozialarbeiterin. Die sagt: „Du hattest recht, dass es unfair war. Aber durch dein Ausrasten hat dir am Ende keiner mehr zugehört. Wie hättest du es schaffen können, dass man dir zuhört?“

**Fragen zum Gespräch:**
1. War die Entscheidung der Aufsicht fair? Warum nicht?
2. Was hat Selins Wut verständlich gemacht – und was hat sie ihr eingebracht?
3. Warum hört man jemandem, der schreit, schlechter zu?
4. Wie könnte Selin sich beschweren, ohne Ärger zu bekommen?
5. Wann hast du dich von einem Erwachsenen ungerecht behandelt gefühlt? (freiwillig)` },
    uebungen: [
        { titel: "Erst runter, dann reden", dauer: "6 Min",
          text: "Gemeinsam einen Plan in drei Schritten an die Tafel schreiben:\n\n- **Runterkommen:** tief atmen, Mund zu, nicht widersprechen – ja, auch wenn es unfair ist.\n- **Später reden:** „Kann ich Ihnen nachher erklären, was passiert ist?“\n- **Hilfe holen:** Klassenlehrkraft, Schulsozialarbeit oder Eltern einschalten.\n\nFrage: Warum ist Schritt 1 der schwerste?",
          quiz: "keine",
          folie: "Ärger mit einem Erwachsenen. 😤\n\nWas hilft wirklich? Wir schreiben einen Plan in drei Schritten." },
        { titel: "Sätze, die gehört werden", dauer: "6 Min",
          text: "Die Kinder formulieren Schimpf-Sätze in Sätze um, die ein Erwachsener ernst nimmt. Du liest den wütenden Satz vor, die Kinder machen Vorschläge.\n\n- „Sie haben ja gar keine Ahnung!“\n- „Immer bin ich schuld!“\n- „Das ist voll unfair, ich mach das nicht!“\n- „Der hat angefangen, nicht ich!“\n- „Lassen Sie mich in Ruhe!“",
          quiz: "karten",
          frage: "Wie sagst du das so, dass ein Erwachsener zuhört?",
          folie: "Mit Schimpfen hört dir kein Erwachsener zu.\n\nWie kannst du den Satz so sagen, dass er **ernst genommen** wird?" }
    ],
    ab34: { titel: "Wenn's unfair ist", aufgaben: [
        { typ: "tabelle", text: "Schreib den Satz so um, dass ein Erwachsener zuhört.", spalten: ["Wütender Satz", "Satz, der gehört wird"], zeilen: [["„Sie haben ja keine Ahnung!“", ""], ["„Immer bin ich schuld!“", ""], ["„Der hat angefangen!“", ""]] },
        { typ: "luecken", text: "Mein Plan, wenn ich mich ungerecht behandelt fühle:", nummern: true, saetze: ["Zuerst: ___", "Später: ___", "Wenn das nicht hilft: ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Dieser Erwachsene hört mir zu: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-ausgrenzung",
    titel: "Drinnen oder draußen?",
    ziel34: "Ausgrenzung erkennen, nachfühlen, wie sie wirkt, und andere bewusst einbeziehen",
    material: "Tafel: „Wie man jemanden ausschließt“ / „Wie man jemanden reinholt“",
    lerntext34: { titel: "Die Gruppe", text:
`In der 4b gibt es eine Clique: Lena, Merve, Sofia und Chantal. Sie sitzen zusammen, haben eine eigene Chatgruppe und tragen die gleichen Armbänder.

Dann zieht Anna in die Klasse. Sie fragt in der Pause, ob sie dazukommen kann. Lena sagt: „Hier ist kein Platz mehr.“ Die anderen kichern. Am nächsten Tag ist Annas Stuhl plötzlich am Rand. Im Sportunterricht wird sie als Letzte gewählt.

Eine Woche später hat Merve Streit mit Lena. Plötzlich ist sie raus aus der Chatgruppe. Merve sitzt jetzt auch allein. Sie merkt zum ersten Mal, wie sich Anna gefühlt haben muss.

**Fragen zum Gespräch:**
1. Woran merkt Anna, dass sie nicht dazugehört? Zählt alles auf.
2. Hat jemand Anna geschlagen oder beschimpft? Ist es trotzdem schlimm?
3. Wie fühlt sich Merve, als sie selbst draußen ist?
4. Warum brauchen manche Gruppen jemanden, der draußen ist?
5. Was könnte EINE Person in der Klasse für Anna tun?` },
    uebungen: [
        { titel: "Stille Ausgrenzung", dauer: "6 Min",
          text: "Sammelt an der Tafel alle Arten, wie man jemanden ausschließen kann, ohne ein böses Wort zu sagen (wegdrehen, nicht antworten, Augen verdrehen, Stuhl wegrücken, aus dem Chat werfen, „Hier ist besetzt“, zuletzt wählen …). Dann daneben: Wie holt man jemanden rein?",
          folie: "Wie kann man jemanden **ausschließen** – ohne ein böses Wort?\n\nUnd wie holt man jemanden **rein**?" },
        { titel: "Reinholen üben", dauer: "6 Min",
          text: "Jedes Kind sucht sich eine Möglichkeit aus, wie es jemanden reinholen kann, und sagt den Satz einmal laut vom Platz:\n\n- „Komm, setz dich zu uns.“\n- „Willst du mitspielen? Wir brauchen noch einen.“\n- „Du kannst mit in unsere Gruppe.“\n- Beim Wählen jemanden früh nehmen, der sonst als Letzter drankommt.\n\nAbmachung für die Woche: Jeder holt einmal jemanden rein.",
          quiz: "liste",
          folie: "Wie holst du jemanden **rein**? 🤝\n\nSuch dir einen Satz aus und sag ihn laut." }
    ],
    ab34: { titel: "Draußen – und wieder drinnen", kontext: "Zum Fall: Anna ist neu und möchte zur Clique dazu. „Hier ist kein Platz mehr“, sagt Lena – und Anna bleibt allein.", aufgaben: [
        { typ: "tabelle", text: "Sortiere die Begriffe aus dem Wortspeicher: Was schließt aus – was holt rein?", spalten: ["Schließt aus", "Holt rein"], zeilen: [["", ""], ["", ""], ["", ""], ["", ""]],
          woerter: ["wegdrehen", "„Setz dich zu uns.“", "aus dem Chat werfen", "zum Mitspielen fragen", "„Hier ist besetzt.“", "früh ins Team wählen", "als Letzten wählen", "in die Gruppe holen"] },
        { typ: "ankreuzen", text: "Wie fühlt sich jemand, der ausgeschlossen wird?", optionen: ["einsam", "wütend", "unsichtbar", "egal", "traurig", "beschämt"], nebeneinander: true },
        { typ: "schreiben", text: "Schreib Anna eine Nachricht, die ihr zeigt: Du gehörst dazu.", zeilen: 3 },
        { typ: "luecken", text: "", nummern: false, saetze: ["Diese Woche hole ich jemanden rein, indem ich ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-wut-eisberg",
    titel: "Was steckt hinter der Wut?",
    ziel34: "Erkennen, dass unter Wut oft andere Gefühle liegen (Angst, Scham, Traurigkeit)",
    material: "Tafel: großer Eisberg (oben Wut, unter Wasser leer)\nGefühlskarten klein (Arbeitsmaterial)",
    materialIds: ["gefuehlskarten-klein"],
    lerntext34: { titel: "Der Eisberg", text:
`Dennis ist bekannt dafür, dass er schnell explodiert. Heute in Mathe: Er soll an der Tafel rechnen. Er weiß die Lösung nicht. Jemand kichert. Dennis wirft die Kreide hin und brüllt: „Mathe ist sowieso scheiße!“

Später sitzt er beim Schulsozialarbeiter. Der malt einen Eisberg auf ein Blatt. „Das, was alle sehen, ist die Spitze: deine Wut. Aber unter Wasser ist viel mehr. Was war da heute?“

Dennis überlegt lange. Dann sagt er leise: „Ich hab mich geschämt. Ich hab Angst, dass alle denken, ich bin dumm. Und mein Vater sagt das auch manchmal.“

Der Sozialarbeiter nickt. „Wut ist oft ein Bodyguard für Gefühle, die wehtun.“

**Fragen zum Gespräch:**
1. Was haben die anderen in der Klasse von Dennis gesehen?
2. Welche Gefühle lagen unter der Wut?
3. Was meint der Sozialarbeiter mit „Wut ist ein Bodyguard“?
4. Warum zeigt man lieber Wut als Scham oder Angst?
5. Was hätte Dennis in der Situation geholfen?` },
    uebungen: [
        { titel: "Der Eisberg an der Tafel", dauer: "6 Min",
          text: "Oben in die Spitze schreibst du WUT. Gemeinsam sammeln die Kinder, was unter Wasser liegen kann: Angst, Scham, Traurigkeit, Enttäuschung, Eifersucht, sich ungerecht behandelt fühlen, Hunger, Müdigkeit, Stress zu Hause … Die Gefühlskarten können helfen.",
          folie: "Oben siehst du die **Wut**. 🧊\n\nWas kann **unter Wasser** liegen?" },
        { titel: "Unter die Oberfläche schauen", dauer: "6 Min",
          text: "Du liest Situationen vor. Die Kinder überlegen: Was könnte unter der Wut stecken?\n\n- Ein Junge rastet aus, weil er beim Fußball nicht gewählt wurde.\n- Ein Mädchen schreit ihre Freundin an, weil die mit einer anderen spielt.\n- Ein Kind zerreißt sein Arbeitsblatt, weil es die Aufgabe nicht versteht.\n- Ein Junge haut zu, als jemand etwas über seine Familie sagt.\n- Ein Kind ist schon morgens gereizt und motzt alle an.",
          quiz: "karten",
          frage: "Was könnte unter der Wut stecken?",
          folie: "Jemand ist wütend.\n\nWas könnte **unter der Wut** stecken? 🧊" }
    ],
    ab34: { titel: "Mein Wut-Eisberg", aufgaben: [
        { typ: "malen", text: "Zeichne einen Eisberg. Oben steht WUT. Schreib unter die Wasserlinie, welche Gefühle bei dir darunter liegen können.", bild: "" },
        { typ: "luecken", text: "", nummern: false, saetze: ["Wenn ich wütend bin, steckt oft dahinter: ___", "Das könnte mir in so einem Moment helfen: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-rache",
    titel: "Rache – zahlt sich das aus?",
    ziel34: "Den Kreislauf von Rache durchschauen und Wege finden, ihn zu unterbrechen",
    material: "Tafel: Rache-Kreislauf (Kreis mit Pfeilen)\nSituationskarten (Arbeitsmaterial)",
    lerntext34: { titel: "Zurückzahlen", text:
`Am Montag versteckt Ole die Mütze von Can. Am Dienstag kippt Can Wasser über Oles Heft. Am Mittwoch macht Ole ein peinliches Foto von Can und zeigt es herum. Am Donnerstag lauert Can Ole nach der Schule auf und schlägt ihn.

Am Freitag sitzen beide mit ihren Eltern bei der Schulleitung. Can sagt: „Er hat angefangen!“ Ole sagt: „Und du hast mich geschlagen!“ Keiner weiß mehr genau, worum es am Anfang ging.

Die Schulleiterin malt einen Kreis an die Tafel. „Jeder von euch hat gedacht, er macht es jetzt gerecht. Aber es wurde jeden Tag schlimmer. Wer von euch hätte den Kreis stoppen können?“

**Fragen zum Gespräch:**
1. Wie oft wurde zurückgezahlt? Was wurde jedes Mal schlimmer?
2. Warum fühlt sich Rache in dem Moment so gut an?
3. Hat Rache das Problem gelöst?
4. An welchem Tag hätte einer von beiden aussteigen können – und wie?
5. Ist Aussteigen dasselbe wie Verlieren?` },
    uebungen: [
        { titel: "Der Rache-Kreis", dauer: "6 Min",
          text: "Male den Kreis an die Tafel und tragt die Tage aus dem Fall ein. Dann markiert ihr mit einer anderen Farbe Ausstiegs-Punkte: Was hätte Ole oder Can an diesem Tag stattdessen tun können? (reden, Erwachsene einschalten, ignorieren, Sorry sagen, Abstand nehmen …)",
          folie: "Rache dreht sich im **Kreis** 🔄.\n\nWo hätten Ole oder Can aussteigen können?" },
        { titel: "Rache oder Lösung?", dauer: "6 Min",
          text: "Du liest Situationen vor. Die Kinder sagen zuerst ehrlich, was sie gern tun würden (Rache) – und dann, was das Problem wirklich löst.\n\n- Jemand hat dein Fahrrad zerkratzt.\n- Jemand hat dich im Chat lächerlich gemacht.\n- Jemand hat dir beim Fußball absichtlich ein Bein gestellt.\n- Jemand hat dein Geheimnis weitererzählt.\n- Jemand hat deinen kleinen Bruder geschubst.",
          quiz: "karten",
          frage: "Was würdest du gern tun – und was löst das Problem wirklich?",
          folie: "Sei ehrlich: Was würdest du **gern** tun?\n\nUnd was **löst** das Problem wirklich?" }
    ],
    ab34: { titel: "Den Kreis stoppen", kontext: "Zum Fall: Montag versteckt Ole Cans Mütze. Dienstag kippt Can Wasser über Oles Heft. Mittwoch zeigt Ole ein peinliches Foto von Can herum. Donnerstag schlägt Can Ole.", aufgaben: [
        { typ: "luecken", text: "Ole und Can – trag die Tage ein:", nummern: false, saetze: ["Montag: ___", "Dienstag: ___", "Mittwoch: ___", "Donnerstag: ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Hier hätte man aussteigen können: ___", "So hätte man aussteigen können: ___"] },
        { typ: "ankreuzen", text: "Was passiert oft nach Rache?", optionen: ["Der andere rächt sich auch.", "Der Streit ist vorbei.", "Es wird schlimmer.", "Am Ende haben beide Ärger.", "Man fühlt sich lange gut."] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-freunde-echt",
    titel: "Echte und falsche Freunde",
    ziel34: "Merkmale echter Freundschaft erkennen und Freundschaften kritisch prüfen",
    material: "Tafel: „Echter Freund“ / „Falscher Freund“\nrote und grüne Karten",
    materialIds: ["rot-gruen"],
    lerntext34: { titel: "Kumpel", text:
`Kevin ist seit den Sommerferien mit Tarek befreundet. Tarek ist zwei Jahre älter und cool. Er nimmt Kevin mit auf den Bolzplatz, zu den Großen.

Aber Kevin fällt einiges auf: Wenn Tarek Geld braucht, soll Kevin ihm etwas leihen – zurück bekommt er nie etwas. Vor den anderen macht Tarek Witze über Kevin. Und neulich sollte Kevin für ihn im Kiosk Zigaretten holen – „Du bist doch mein Kumpel.“

Kevins alter Freund Marc ist nicht so cool. Aber als Kevin krank war, hat Marc ihm die Hausaufgaben gebracht. Und als Kevin Ärger zu Hause hatte, hat Marc einfach zugehört.

**Fragen zum Gespräch:**
1. Woran merkt man, dass Tarek kein echter Freund ist?
2. Warum bleibt Kevin trotzdem bei ihm?
3. Was macht Marc zu einem echten Freund?
4. Kann man aus einer falschen Freundschaft wieder rauskommen? Wie?
5. Was ist dir bei einem Freund am wichtigsten?` },
    uebungen: [
        { titel: "Echt oder falsch?", dauer: "6 Min",
          text: "Du liest Verhaltensweisen vor, die Kinder zeigen grün (= echter Freund) oder rot (= falscher Freund).\n\n- Hält zu dir, auch wenn andere über dich lachen.\n- Will nur mit dir abhängen, wenn du etwas Neues hast.\n- Sagt dir ehrlich, wenn du Mist baust.\n- Erzählt deine Geheimnisse weiter.\n- Bringt dich dazu, Dinge zu tun, die du nicht willst.\n- Freut sich mit dir, wenn du etwas geschafft hast.",
          antworten: ["🟢 echter Freund", "🔴 falscher Freund"],
          folie: "**Echter Freund** 🟢 oder **falscher Freund** 🔴?\n\nHalte die **rote oder grüne Karte** hoch." },
        { titel: "Freundschafts-Test", dauer: "6 Min",
          text: "Gemeinsam fünf Fragen formulieren, mit denen man eine Freundschaft prüfen kann, z. B.: „Fühle ich mich wohl, wenn ich mit ihm/ihr zusammen bin?“ · „Kann ich Nein sagen, ohne Angst zu haben?“ · „Hört er/sie mir auch zu?“ Schreib sie an die Tafel.",
          folie: "Mit welchen **Fragen** kannst du prüfen, ob eine Freundschaft gut ist? ❓\n\nFindet fünf Fragen." }
    ],
    ab34: { titel: "Mein Freundschafts-Test", aufgaben: [
        { typ: "tabelle", text: "Was macht einen echten Freund aus – was einen falschen? Schreib in jede Spalte drei Beispiele.", spalten: ["Echter Freund", "Falscher Freund"], zeilen: [["", ""], ["", ""], ["", ""]] },
        { typ: "ankreuzen", text: "Denk an einen Freund oder eine Freundin. Was stimmt?", optionen: ["Ich kann Nein sagen.", "Er/sie hält zu mir.", "Er/sie hört mir zu.", "Ich fühle mich wohl.", "Ich muss mich verstellen.", "Ich habe manchmal Angst vor ihm/ihr."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Das bin ich für meine Freunde: ___", "Das wünsche ich mir von einem Freund: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-konsequenzen",
    titel: "Regeln, Strafen, Fairness",
    ziel34: "Den Sinn von Regeln und Konsequenzen verstehen und Strafe von Rache unterscheiden",
    material: "Tafel: drei Spalten „Regel“ – „Warum?“ – „Was passiert ohne?“",
    lerntext34: { titel: "Ohne Regeln", text:
`Die Klasse 4a darf einen Tag lang selbst bestimmen: keine Regeln. Am Anfang finden alle es super. Musik laut, Füße auf den Tisch, essen, wann man will.

Nach einer Stunde ist es so laut, dass Mia Kopfschmerzen hat. Die Jungs spielen Ball im Raum, ein Fenster geht kaputt. Beim Mittagessen nehmen sich die Ersten alles Gute, die Letzten bekommen nichts. Zwei geraten aneinander – keiner greift ein.

Am Nachmittag setzt sich die Klasse zusammen. „Wir brauchen ein paar Regeln“, sagt ausgerechnet Jonas, der morgens am lautesten gejubelt hat. „Aber nur Regeln, die Sinn machen.“

**Fragen zum Gespräch:**
1. Was ist ohne Regeln passiert? Für wen war das schlimm?
2. Warum hat ausgerechnet Jonas nach Regeln gefragt?
3. Welche Regeln in eurer Schule findet ihr sinnvoll – welche nicht?
4. Was ist der Unterschied zwischen einer Konsequenz und Rache?
5. Wann ist eine Strafe fair, wann unfair?` },
    uebungen: [
        { titel: "Regel-Check", dauer: "7 Min",
          text: "Ihr nehmt drei echte Regeln eurer Schule oder Klasse. Für jede an der Tafel: Warum gibt es sie? Was würde ohne sie passieren? Wem nützt sie? Danach Daumen: Sinnvoll oder nicht?",
          folie: "Nehmt drei echte Regeln eurer Schule.\n\nWarum gibt es sie? Was würde ohne sie passieren? Wem nützt sie?" },
        { titel: "Faire Konsequenz?", dauer: "5 Min",
          text: "Du liest Regelverstöße und Konsequenzen vor. Die Kinder zeigen mit Daumen: fair, geht so, unfair – und begründen.\n\n- Jemand macht das Klo dreckig – muss es sauber machen.\n- Jemand schwänzt – darf eine Woche nicht in die Pause.\n- Jemand schlägt – bekommt einen Elternanruf.\n- Jemand zerkratzt einen Tisch – muss ihn abschleifen helfen.\n- Die ganze Klasse wird bestraft, weil einer gestört hat.",
          quiz: "zahlen",
          antworten: ["1️⃣ fair", "2️⃣ geht so", "3️⃣ unfair"],
          folie: "Ist diese Konsequenz fair?\n\n**1** = fair · **2** = geht so · **3** = unfair\n\nHalte deine Zahlenkarte hoch und sag, warum." }
    ],
    ab34: { titel: "Regeln mit Sinn", aufgaben: [
        { typ: "tabelle", text: "Wähle drei Regeln aus deiner Schule.", spalten: ["Regel", "Warum gibt es sie?", "Was passiert ohne?"], zeilen: [["", "", ""], ["", "", ""], ["", "", ""]] },
        { typ: "ankreuzen", text: "Eine faire Konsequenz …", optionen: ["passt zur Tat.", "ist für alle gleich.", "soll wehtun.", "hilft, es wiedergutzumachen.", "wird vorher erklärt."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Eine Regel, die ich für unsere Gruppe vorschlage: ___", "Weil: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-gefuehle-zeigen",
    titel: "Harte Schale – weicher Kern?",
    ziel34: "Merken, dass jeder Gefühle hat, und dass es Stärke braucht, sie zu zeigen",
    material: "Tafel: Maske (außen / innen)\nGefühlskarten klein",
    materialIds: ["gefuehlskarten-klein"],
    lerntext34: { titel: "Hinter der Maske", text:
`Mo ist der Coolste in der Klasse. Ihm ist alles egal, sagt er. Wenn er eine Sechs bekommt, lacht er. Wenn jemand fies zu ihm ist, sagt er: „Juckt mich nicht.“

Eines Tages stirbt sein Hund. Mo kommt in die Schule und sagt kein Wort. In der Pause sitzt er allein auf der Treppe. Als Leon fragt, was los ist, schnauzt Mo ihn an: „Lass mich!“

Später findet die Lehrerin ihn auf dem Klo. Er hat geweint. „Erzähl das bloß keinem“, sagt er. „Sonst bin ich ein Weichei.“

Die Lehrerin sagt: „Weißt du, wer weint? Fußballprofis nach einem verlorenen Finale. Soldaten. Präsidenten. Weinen heißt nicht schwach sein. Es heißt, dass dir etwas wichtig war.“

**Fragen zum Gespräch:**
1. Warum spielt Mo immer den Coolen?
2. Warum hat er Leon angeschnauzt?
3. Stimmt es, dass Weinen schwach ist? Wer hat euch das beigebracht?
4. Welche Masken tragen Menschen, um ihre Gefühle zu verstecken?
5. Bei wem kannst du deine Maske abnehmen? (nur für dich)` },
    uebungen: [
        { titel: "Die Maske", dauer: "6 Min",
          text: "Male eine Maske an die Tafel. Außen: Was zeigen Menschen nach außen? (cool, lustig, egal, aggressiv, stark …) Innen: Was kann dahinter stecken? (Angst, Trauer, Unsicherheit, Einsamkeit …) Die Kinder rufen vom Platz zu.",
          folie: "Außen zeigen Menschen eine **Maske** 🎭. Was zeigen sie?\n\nUnd was kann **dahinter** stecken?" },
        { titel: "Stark oder schwach?", dauer: "6 Min",
          text: "Du liest vor, die Kinder entscheiden mit Daumen: Braucht das Mut (hoch) oder ist es schwach (runter)? Diskutiert.\n\n- Vor anderen zugeben, dass man Angst hat.\n- Weinen, wenn etwas Schlimmes passiert.\n- Sagen: „Das hat mich verletzt.“\n- Einem Freund sagen, dass man ihn mag.\n- Um Hilfe bitten.",
          antworten: ["👍 braucht Mut", "👎 ist schwach"],
          folie: "**Braucht das Mut** 👍 – oder ist es **schwach** 👎?" }
    ],
    ab34: { titel: "Meine Maske", kontext: "Zum Fall: Mo spielt immer den Coolen. Als sein Hund stirbt, weint er heimlich auf dem Klo und hat Angst, ein „Weichei“ zu sein.", aufgaben: [
        { typ: "tabelle", text: "Was zeigst du nach außen – und was fühlst du manchmal innen? Schreib drei Beispiele.", spalten: ["Außen (was andere sehen)", "Innen (was ich fühle)"], zeilen: [["", ""], ["", ""], ["", ""]] },
        { typ: "ankreuzen", text: "Bei wem kannst du deine Maske abnehmen?", optionen: ["Mutter", "Vater", "Geschwister", "Freund/Freundin", "Lehrkraft", "Schulsozialarbeit", "Haustier", "niemand"], nebeneinander: true },
        { typ: "schreiben", text: "Was würdest du Mo sagen, damit er sich nicht schämt?", zeilen: 3 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-neid",
    titel: "Neid und Vergleichen",
    ziel34: "Neid als Gefühl verstehen und Wege finden, mit Vergleichen (Marken, Handy, Zocken) umzugehen",
    material: "Tafel: „Was ich sehe“ / „Was ich nicht sehe“",
    lerntext34: { titel: "Das neue Handy", text:
`Leandro kommt mit dem neuesten Handy in die Schule. Alle stehen um ihn herum. Robin hat ein altes Handy mit kaputtem Display. Er spürt einen Stich im Bauch.

In der Pause sagt Robin: „Ist eh nur geklaut.“ Ein paar lachen. Später macht er Leandros Rucksack auf und versteckt das Handy. Leandro sucht panisch – es gibt eine riesige Aufregung.

Als alles herauskommt, erzählt Leandro: „Das Handy hab ich, weil meine Eltern sich getrennt haben. Mein Vater kauft mir jetzt dauernd Sachen. Ich hätte lieber, dass er wieder da ist.“

Robin ist still. Er hatte nur das Handy gesehen.

**Fragen zum Gespräch:**
1. Was hat Robin gefühlt, als er das Handy sah?
2. Was hat er mit dem Gefühl gemacht? Wem hat es geschadet?
3. Was wusste Robin nicht über Leandro?
4. Warum vergleichen wir uns ständig mit anderen?
5. Was hilft gegen den „Stich im Bauch“?` },
    uebungen: [
        { titel: "Was ich sehe – was ich nicht sehe", dauer: "6 Min",
          text: "Zwei Spalten an der Tafel. Links: Was sehen andere von uns? (Klamotten, Handy, Noten, Follower …) Rechts: Was sehen sie nicht? (Sorgen, Streit zu Hause, Angst, Einsamkeit …) Frage: Worauf beruht Neid meistens?",
          folie: "👀 **Was sehen andere von uns?**\n🙈 **Was sehen sie nicht?**\n\nWorauf beruht Neid meistens?" },
        { titel: "Neid in Energie umwandeln", dauer: "6 Min",
          text: "Neid zeigt oft, was einem wichtig ist. Gemeinsam umformulieren:\n\n- „Der ist so gut im Fußball, ich hasse ihn.“ → „Ich will auch besser werden – ich frag ihn mal nach Tipps.“\n- „Die hat immer die besten Noten, Streberin.“\n- „Der hat schon wieder neue Schuhe.“\n- „Die hat so viele Freunde.“\n- „Der darf viel länger zocken als ich.“",
          quiz: "karten",
          frage: "Mach daraus einen Satz, der dir hilft.",
          folie: "Neid zeigt oft, was dir **wichtig** ist.\n\nMach aus dem Neid-Satz einen Satz, der dir **hilft**. ⚡" }
    ],
    ab34: { titel: "Der Stich im Bauch", aufgaben: [
        { typ: "luecken", text: "Ehrlich zu mir:", nummern: false, saetze: ["Ich werde neidisch, wenn andere ___", "Das merke ich so: ___", "Was ich bei anderen oft nicht sehe: ___"] },
        { typ: "tabelle", text: "Wandle Neid in einen guten Gedanken um.", spalten: ["Neid-Gedanke", "Guter Gedanke"], zeilen: [["„Der ist besser als ich.“", ""], ["„Die hat mehr als ich.“", ""], ["„Warum der und nicht ich?“", ""]] },
        { typ: "schreiben", text: "Drei Dinge, die ich an meinem Leben gut finde:", zeilen: 3 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-verpetzen",
    titel: "Verpetzen oder Hilfe holen?",
    ziel34: "Unterscheiden, wann man Erwachsene einschalten muss – auch wenn es sich wie Verpetzen anfühlt",
    material: "Rote und grüne Karten\nPlakat „Die drei Hilfe-Fragen“ (Arbeitsmaterial)",
    materialIds: ["rot-gruen", "hilfe-fragen"],
    lerntext34: { titel: "Das Messer", text:
`Auf dem Heimweg zeigt Yannick seinem Freund Sami etwas in seinem Rucksack: ein Taschenmesser. „Nur zur Sicherheit“, sagt Yannick. „Wenn die aus der 6 mich wieder abziehen wollen.“

Sami hat ein ungutes Gefühl. Aber er sagt nichts. Petzen ist das Schlimmste, das hat er gelernt. Wer petzt, ist raus.

Am nächsten Tag gibt es auf dem Schulhof Streit mit den Sechstklässlern. Yannick greift in seinen Rucksack. Zum Glück kommt in dem Moment ein Lehrer um die Ecke.

Abends kann Sami nicht schlafen. Was, wenn der Lehrer nicht gekommen wäre?

**Fragen zum Gespräch:**
1. Warum hat Sami nichts gesagt?
2. Was hätte passieren können?
3. Was ist der Unterschied zwischen Petzen und Hilfe holen?
4. Hätte Sami Yannick verraten – oder ihn geschützt?
5. Wem hätte Sami sich anvertrauen können?` },
    uebungen: [
        { titel: "Petzen oder Hilfe holen?", dauer: "7 Min",
          text: "Du liest Situationen vor. Rot = das würde ich für mich behalten, grün = da hole ich Hilfe. Danach die Regel an die Tafel: **Petzen will jemandem Ärger machen. Hilfe holen will jemanden schützen.**\n\n- Jemand hat abgeschrieben.\n- Ein Kind wird jeden Tag auf dem Heimweg abgezogen.\n- Jemand hat ein Messer dabei.\n- Jemand hat einen Kaugummi unter den Tisch geklebt.\n- Ein Freund erzählt, dass er zu Hause geschlagen wird.\n- Im Chat droht jemand, einem anderen „aufzulauern“.",
          quiz: "ampel",
          antworten: ["🔴 für mich behalten", "🟢 Hilfe holen"],
          folie: "🔴 **Das behalte ich für mich.**\n🟢 **Da hole ich Hilfe.**\n\nHalte die **rote oder grüne Karte** hoch." },
        { titel: "Wie sag ich's?", dauer: "5 Min",
          text: "Sammelt: Wem kann man so etwas sagen? (Lehrkraft, Schulsozialarbeit, Eltern, Nummer gegen Kummer 116 111) Und wie, damit es keiner merkt? (nach der Stunde, Zettel, Eltern bitten anzurufen …)",
          folie: "Wem kannst du so etwas sagen?\n\nUnd **wie**, damit es keiner merkt?" }
    ],
    ab34: { titel: "Schützen statt schweigen", kontext: "Zum Fall: Yannick zeigt seinem Freund Sami ein Taschenmesser im Rucksack. Sami sagt niemandem etwas, weil er nicht petzen will.", aufgaben: [
        { typ: "tabelle", text: "Petzen oder Hilfe holen? Schreib in jede Spalte zwei Beispiele.", spalten: ["Petzen (will Ärger machen)", "Hilfe holen (will schützen)"], zeilen: [["", ""], ["", ""]] },
        { typ: "ankreuzen", text: "Hier hole ich auf jeden Fall Hilfe:", optionen: ["Jemand wird bedroht.", "Jemand hat eine Waffe.", "Jemand wird zu Hause verletzt.", "Jemand hat seine Hausaufgaben vergessen.", "Jemand wird ständig gemobbt."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Diesen Erwachsenen kann ich mich anvertrauen: ___", "Nummer gegen Kummer (kostenlos): 116 111"] },
        { typ: "schreiben", text: "Was hätte Sami tun können?", zeilen: 2 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-schlichten",
    titel: "Streit schlichten",
    ziel34: "Die Schritte einer Streitschlichtung kennen und als neutrale Person helfen können",
    material: "Plakat „Friedensweg“ (Arbeitsmaterial)\nTafel: 4 Schritte",
    materialIds: ["friedensweg"],
    lerntext34: { titel: "Die Schlichterin", text:
`In der 4c gibt es zwei Streitschlichter: Amira und Paul. Heute kommen Jonas und Elias zu ihnen. Sie haben sich in der Pause um den Ball gestritten, Elias hat Jonas getreten.

Amira erklärt die Regeln: „Jeder darf ausreden. Keine Beleidigungen. Wir sind auf keiner Seite.“ Dann erzählt zuerst Jonas, dann Elias. Paul fasst zusammen, was er gehört hat. „Jonas, du warst sauer, weil Elias den Ball nicht abgeben wollte. Elias, du hast dich bedrängt gefühlt.“

Dann fragt Amira: „Was wünscht ihr euch vom anderen?“ Am Ende einigen sich die beiden: Der Ball wird abwechselnd jede Pause von einem anderen mitgenommen, und Elias entschuldigt sich für den Tritt.

**Fragen zum Gespräch:**
1. Welche Regeln gibt es beim Schlichten? Warum sind sie wichtig?
2. Warum sind die Schlichter „auf keiner Seite“?
3. Was macht Paul, als er zusammenfasst? Warum hilft das?
4. Warum ist eine Lösung, die beide finden, besser als eine Strafe?
5. Was bräuchtest du, um ein guter Schlichter zu sein?` },
    uebungen: [
        { titel: "Die 4 Schritte", dauer: "5 Min",
          text: "Die vier Schritte an die Tafel schreiben:\n\n- Regeln klären (ausreden lassen, keine Beleidigungen).\n- Jeder erzählt seine Sicht.\n- Schlichter fasst zusammen: Was fühlen beide?\n- Gemeinsam eine Lösung finden, mit der beide leben können.",
          quiz: "keine",
          folie: "Wie schlichtet man einen **Streit**? ⚖️\n\nDie vier Schritte." },
        { titel: "Schlichtung üben", dauer: "8 Min",
          text: "Drei Kinder üben vom Platz aus: zwei Streitende, ein Schlichter (du hilfst). Ausgedachter, harmloser Streit, z. B.:\n\n- Wer darf an den PC?\n- Einer hat den Stift des anderen ausgeliehen und kaputt gemacht.\n- Beide wollen am Fenster sitzen.\n\nDie anderen achten darauf: Wurde jeder ausreden gelassen? Blieb der Schlichter neutral?",
          quiz: "karten",
          frage: "Zwei streiten, einer schlichtet. Wurde jeder ausreden gelassen? Blieb der Schlichter neutral?",
          folie: "Drei Kinder: **zwei streiten**, **einer schlichtet**.\n\nDie anderen achten: Wurde jeder ausreden gelassen? Blieb der Schlichter neutral?" }
    ],
    ab34: { titel: "So schlichte ich einen Streit", aufgaben: [
        { typ: "luecken", text: "Schreib die 4 Schritte der Schlichtung in der richtigen Reihenfolge auf:", nummern: true, saetze: ["___", "___", "___", "___"] },
        { typ: "ankreuzen", text: "Ein guter Schlichter …", optionen: ["hält zu seinem Freund.", "lässt beide ausreden.", "bleibt ruhig.", "bestimmt die Strafe.", "fragt, was beide sich wünschen."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Ein Streit, den ich schlichten könnte: ___", "Eine Lösung, mit der beide leben können: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-ruf",
    titel: "Mein Ruf – und wer ich sein will",
    ziel34: "Darüber nachdenken, wie man wahrgenommen wird, und eigene Ziele für das eigene Verhalten setzen",
    material: "Tafel: „So sehen mich andere“ / „So will ich sein“",
    lerntext34: { titel: "Der Neue Anfang", text:
`Marlon hat einen Ruf: Er ist der, der immer Stress macht. Wenn irgendwo etwas kaputt ist, schauen alle zuerst ihn an. Manchmal war er es wirklich. Manchmal nicht.

Nach den Sommerferien kommt Marlon auf eine neue Schule. Keiner kennt ihn. In der ersten Woche merkt er: Er kann ganz neu anfangen. Er hilft einem Jüngeren, der sich verlaufen hat. Er bleibt ruhig, als ihn einer anrempelt. Die Lehrerin sagt am Freitag: „Schön, dass du da bist, Marlon.“

Marlon denkt an seine alte Schule. Dort hätte das niemand gesagt. Er fragt sich: Bin ich wirklich der, der immer Stress macht? Oder bin ich nur in diese Rolle gerutscht?

**Fragen zum Gespräch:**
1. Wie ist Marlon zu seinem Ruf gekommen?
2. Warum fiel es ihm an der neuen Schule leichter, sich anders zu verhalten?
3. Kann man seinen Ruf auch ohne Schulwechsel ändern? Wie?
4. Warum fällt es anderen schwer, jemandem eine zweite Chance zu geben?
5. Welchen Ruf möchtest du haben? (freiwillig)` },
    uebungen: [
        { titel: "Rollen in der Gruppe", dauer: "6 Min",
          text: "Sammelt Rollen, die Kinder in Klassen bekommen (der Clown, der Stressmacher, die Streberin, der Stille, die Anführerin …). Frage: Sucht man sich die Rolle aus – oder rutscht man rein? Kann man sie wieder loswerden?",
          folie: "Welche **Rollen** gibt es in einer Klasse? 🎭\n\nSucht man sie sich aus – oder rutscht man rein?" },
        { titel: "Zweite Chance geben", dauer: "6 Min",
          text: "Gemeinsam überlegen: Was kann die GRUPPE tun, damit jemand seinen Ruf ändern kann? (nicht sofort beschuldigen, Gutes bemerken und sagen, Vergangenes ruhen lassen …) Abmachung: Diese Woche sagt jeder einem anderen etwas Gutes, das ihm aufgefallen ist.",
          folie: "Was kann die **Gruppe** tun, damit jemand seinen Ruf ändern kann?\n\nDiese Woche: Sag jemandem etwas Gutes, das dir aufgefallen ist." }
    ],
    ab34: { titel: "Wer ich sein will", aufgaben: [
        { typ: "tabelle", text: "Sei ehrlich zu dir und schreib je drei Wörter oder Sätze:", spalten: ["So sehen mich andere vielleicht", "So will ich gesehen werden"], zeilen: [["", ""], ["", ""], ["", ""]] },
        { typ: "luecken", text: "Mein Ziel für die nächsten vier Wochen:", nummern: false, saetze: ["Ich will ___", "Daran merken andere es: ___", "Das hilft mir dabei: ___"] },
        { typ: "schreiben", text: "Ein Brief an mich selbst in vier Wochen:", zeilen: 3 }
    ]}
})

);
})();
