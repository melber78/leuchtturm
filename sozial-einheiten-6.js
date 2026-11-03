/* ============================================================
   Leuchtturm – Sozialtraining: „Klartext“ – Stunden NUR für Kl. 3/4
   Für ältere, weit entwickelte Kinder (Förderschwerpunkt emotionale
   und soziale Entwicklung): echte Fälle aus dem Schulalltag statt
   Bildergeschichten, Dilemmata, Eskalation, Gruppendruck, Handy.
   nur34: true → keine Kl.-1/2-Teile (Druck, Präsentation, Ablauf).
   ============================================================ */
(function () {
const KAT = "Klartext (Kl. 3/4)";
if (window.SOZIAL_KATEGORIEN && !window.SOZIAL_KATEGORIEN.includes(KAT)) {
    const i = window.SOZIAL_KATEGORIEN.indexOf("Sonstiges");
    window.SOZIAL_KATEGORIEN.splice(i < 0 ? window.SOZIAL_KATEGORIEN.length : i, 0, KAT);
}
function K(o){
    o.kategorie = KAT;
    o.nur34 = true;
    o.dauer = 40;
    o.ziel12 = "";
    o.lerntext12 = { titel: "", text: "" };
    o.ab12 = { titel: "", aufgaben: [] };
    o.uebungen = (o.uebungen || []).map(u => Object.assign({ fuer: "34" }, u));
    const namen = o.uebungen.map(u => u.titel).join(", ");
    o.verlauf = [
        { zeit: "0–5",   phase: "Ankommen",     k12: "–", k34: "Begrüßung, Gefühlsbarometer (ein Satz)" },
        { zeit: "5–13",  phase: "Lerntext",     k12: "–", k34: "Fall „" + o.lerntext34.titel + "“ lesen, Fragen besprechen" },
        { zeit: "13–25", phase: "Übung",        k12: "–", k34: namen },
        { zeit: "25–35", phase: "Arbeitsblatt", k12: "–", k34: "AB 3/4: " + o.ab34.titel },
        { zeit: "35–40", phase: "Abschluss",    k12: "–", k34: "„Heute habe ich gelernt …“, Applauswelle" }
    ];
    return o;
}

window.SOZIAL_VORLAGEN.push(

/* ------------------------------------------------------------ */
K({
    id: "k-respekt",
    titel: "Respekt – verdient oder erzwungen?",
    ziel34: "Unterscheiden, ob jemand respektiert oder gefürchtet wird – und wie man echten Respekt bekommt",
    material: "Tafel: zwei Spalten „Angst“ und „Respekt“\nrote und grüne Karten",
    materialIds: ["rot-gruen"],
    lerntext34: { titel: "Der Boss vom Schulhof", text:
`Kai ist in der 4. Klasse und alle nennen ihn den Boss. Wenn er in der Pause kommt, machen die anderen Platz an der Tischtennisplatte. Wer nicht spurt, wird geschubst oder vor allen „Opfer“ genannt. Kai sagt: „Die haben Respekt vor mir.“

Elif ist auch in der 4. Klasse. Sie ist nicht die Lauteste. Aber wenn es Streit gibt, holen die Jüngeren oft sie. Sie hört zu, sagt ehrlich ihre Meinung und hält, was sie verspricht. Als Elif einmal krank ist, fragen drei Kinder nach, wo sie bleibt.

Eines Tages bricht Kai sich den Arm und fehlt zwei Wochen. An der Tischtennisplatte ist es auf einmal entspannt. Keiner vermisst ihn.

**Fragen zum Gespräch:**
1. Haben die anderen wirklich Respekt vor Kai – oder etwas anderes?
2. Woran merkt man, dass Elif respektiert wird?
3. Was ist der Unterschied zwischen „jemand hat Angst vor mir“ und „jemand respektiert mich“?
4. Vor wem hast du echten Respekt – und warum? (freiwillig)` },
    uebungen: [
        { titel: "Angst oder Respekt?", dauer: "7 Min",
          text: "Du liest die Situationen vor. Die Kinder halten die rote Karte hoch (= Angst/Druck) oder die grüne (= echter Respekt). Danach kurz begründen lassen.\n\n- Alle lachen über Ömers Witz, weil sie sonst Ärger mit ihm bekommen.\n- Lea hört zu, wenn ein Jüngerer etwas erzählt, und nimmt ihn ernst.\n- Tim bekommt immer das beste Fahrrad, weil er sonst droht.\n- Der Trainer ist streng, aber fair – und hilft, wenn es jemandem schlecht geht.\n- Jonas gibt nach einem Streit als Erster die Hand.\n- Mia sagt: „Wenn du mich verpetzt, bist du dran.“",
          antworten: ["🔴 Angst / Druck", "🟢 echter Respekt"],
          folie: "Ist das **echter Respekt** 🟢 – oder **Angst und Druck** 🔴?\n\nHalte die **rote oder grüne Karte** hoch. Danach: Warum?",
          kern: ["34"] },
        { titel: "Respekt-Sammlung", dauer: "5 Min",
          text: "An der Tafel zwei Spalten: **So macht man anderen Angst** und **So bekommt man Respekt**. Die Kinder rufen Ideen vom Platz aus zu (melden). Zum Schluss die Frage: Was davon hält länger?",
          folie: "Zwei Spalten:\n\n😨 **So macht man anderen Angst**\n🤝 **So bekommt man Respekt**\n\nWas davon hält länger?" }
    ],
    ab34: { titel: "Respekt oder Angst?", aufgaben: [
        { typ: "tabelle", text: "Sortiere die Begriffe aus dem Wortspeicher: Was macht Angst – was bringt echten Respekt?", spalten: ["Macht anderen Angst", "Bringt echten Respekt"], zeilen: [["", ""], ["", ""], ["", ""], ["", ""]],
          woerter: ["drohen", "zuhören", "schubsen", "ehrlich sein", "auslachen", "Wort halten", "„Opfer“ sagen", "fair sein"] },
        { typ: "ankreuzen", text: "Welche Sätze zeigen echten Respekt? Kreuze an.", optionen: ["„Ich hör dir zu.“", "„Mach Platz, sonst …“", "„Das war fair von dir.“", "„Du Opfer.“", "„Sorry, das war nicht okay von mir.“"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Eine Person, die ich respektiere: ___", "Ich respektiere sie, weil ___", "So will ich respektiert werden: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-sprueche",
    titel: "Sprüche, die treffen",
    ziel34: "Merken, wann aus Spaß Ernst wird, und eigene Grenzen klar sagen",
    material: "Drei Schilder an der Tafel: „Spaß“ – „Grenze“ – „Zu weit“\nKarten mit Sprüchen (Situationskarten unter Arbeitsmaterial)",
    lerntext34: { titel: "Nur Spaß?", text:
`Jamal und Deniz sind beste Kumpels. In der Pause machen sie ein „Battle“: Wer hat den besseren Spruch? Erst geht es um Fußball. „Dein Verein steigt ab!“ – „Und deiner spielt wie Oma!“ Beide lachen.

Dann wird es härter. Deniz macht einen Witz über Jamals Turnschuhe, die schon alt sind. Jamal lacht nicht mehr so laut. Die anderen stehen jetzt um sie herum und johlen. Deniz legt nach – diesmal über Jamals Mutter.

Jamal wird still. Dann schubst er Deniz so heftig, dass der hinfällt. „Bist du bescheuert? War doch nur Spaß!“, schreit Deniz.

**Fragen zum Gespräch:**
1. Ab wann war es für Jamal kein Spaß mehr? Woran konnte man das merken?
2. Warum hat Deniz weitergemacht?
3. Welche Rolle spielen die Zuschauer?
4. Was hätte Jamal statt Schubsen tun können?
5. Wie merkst du bei dir selbst: Jetzt ist meine Grenze erreicht?` },
    uebungen: [
        { titel: "Spaß – Grenze – zu weit", dauer: "7 Min",
          text: "Du liest Sprüche und Situationen vor. Die Kinder zeigen mit den Fingern: 1 = Spaß, 2 = Grenze, 3 = zu weit. Wichtig: Es gibt unterschiedliche Meinungen – genau darum geht es. Frag nach: „Warum ist das für dich schon eine 3?“\n\n- „Du hast heute mal wieder verpennt, oder?“\n- Ein Witz über die Klamotten von jemandem.\n- Ein Spruch über die Familie von jemandem.\n- „Du kannst ja nicht mal richtig lesen.“\n- Ein Spitzname, den der andere nicht mag.\n- Lachen, wenn jemand beim Fußball hinfällt.\n- Ein Foto von jemandem in die Gruppe schicken und lästern.",
          quiz: "zahlen",
          antworten: ["1️⃣ Spaß", "2️⃣ Grenze", "3️⃣ zu weit"],
          folie: "Wie findest du diesen Spruch?\n\n**1** = Spaß · **2** = Grenze · **3** = zu weit\n\nHalte deine Zahlenkarte hoch. Es gibt unterschiedliche Meinungen – genau darum geht es.",
          kern: ["34"] },
        { titel: "Grenze klar sagen", dauer: "5 Min",
          text: "Sammelt Sätze, mit denen man eine Grenze setzt – kurz, klar, ohne Beleidigung. Schreib sie an die Tafel. Beispiele:\n\n- „Stopp. Das ist nicht mehr lustig.“\n- „Über meine Familie redest du nicht.“\n- „Lass es. Ich hab keinen Bock mehr.“\n\nZwei, drei Kinder sagen ihren Satz laut vom Platz aus – mit fester Stimme, Blick nach vorn.",
          quiz: "liste",
          folie: "So setzt du eine **Grenze** – kurz, klar, ohne Beleidigung:\n\nSuch dir einen Satz aus und sag ihn mit fester Stimme." }
    ],
    ab34: { titel: "Wo ist meine Grenze?", kontext: "Zum Fall: Jamal und Deniz machen ein Spruch-Battle. Es wird immer härter – bis Deniz über Jamals Mutter redet und Jamal ihn schubst.", aufgaben: [
        { typ: "tabelle", text: "Schreib in jede Spalte ein Beispiel (einen Spruch oder eine Situation): Was ist noch Spaß, was ist an der Grenze, was geht zu weit?", spalten: ["Spaß", "Grenze", "Zu weit"], zeilen: [["", "", ""], ["", "", ""]] },
        { typ: "ankreuzen", text: "Woran merkst du, dass es für jemanden kein Spaß mehr ist?", optionen: ["Er lacht nicht mehr mit.", "Er wird still oder rot.", "Er geht weg.", "Er sagt „Stopp“.", "Er wird plötzlich wütend."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Satz, wenn mir jemand zu weit geht: ___", "Das mache ich, wenn er trotzdem weitermacht: ___"] },
        { typ: "schreiben", text: "Was hättest du an Jamals Stelle gemacht, statt zu schubsen?", zeilen: 3 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-eskalation",
    titel: "Die Eskalationstreppe",
    ziel34: "Erkennen, wie ein Streit Stufe für Stufe hochkocht – und an welcher Stelle man aussteigen kann",
    material: "Große Treppe mit 6 Stufen an der Tafel (gezeichnet)\nKarten mit den Stufen des Falls (Situationskarten unter Arbeitsmaterial)",
    lerntext34: { titel: "Das Foul", text:
`Freitag, letzte Pause, Fußball auf dem Kleinfeld. Leon grätscht Max von hinten um. Max steht auf und starrt Leon an.

„Was guckst du so?“, sagt Leon. – „Das war ein Foul, du Idiot!“, ruft Max. – „Halt die Klappe!“ Leon kommt näher und rempelt Max mit der Schulter. Max schubst zurück. Ein paar Kinder rufen „Schlägerei!“ und holen ihre Handys raus.

Leon holt aus. In dem Moment pfeift die Pausenaufsicht. Beide müssen zur Schulleitung. Max erzählt später: „Ich wollte das gar nicht. Aber irgendwann konnte ich nicht mehr zurück.“

**Fragen zum Gespräch:**
1. Wie viele Stufen hatte der Streit? Zählt sie.
2. An welcher Stelle hätte Max aussteigen können? An welcher Leon?
3. Warum fühlt es sich oft so an, als könne man „nicht mehr zurück“?
4. Was haben die Zuschauer zum Streit beigetragen?
5. Was ist dir schon mal passiert – und wo hättest du aussteigen können? (freiwillig)` },
    uebungen: [
        { titel: "Treppe bauen", dauer: "6 Min",
          text: "Die Kinder bringen die Stufen des Falls in die richtige Reihenfolge – du schreibst sie auf die Treppe an der Tafel. Je höher die Stufe, desto schwerer ist das Aussteigen.\n\n- Foul\n- Böser Blick\n- „Was guckst du so?“\n- Beleidigung\n- Rempeln und Schubsen\n- Ausholen zum Schlag",
          quiz: "keine",
          folie: "Ein Streit wird Stufe für Stufe schlimmer. 🪜\n\nIn welcher Reihenfolge? Je höher die Stufe, desto schwerer ist das Aussteigen.",
          kern: ["34"] },
        { titel: "Ausstiegs-Punkte", dauer: "6 Min",
          text: "Jetzt markiert ihr gemeinsam mit grüner Kreide: Wo hätte man aussteigen können – und WIE genau? Für jede Stufe einen Satz oder eine Handlung sammeln (z. B. „Sorry, war keine Absicht“, weggehen, Schiri/Aufsicht holen, Hand hoch und „Stopp, ich hab keinen Bock auf Stress“). Frage zum Schluss: Auf welcher Stufe ist Aussteigen am leichtesten?",
          folie: "Wo hätte man **aussteigen** können – und **wie genau**? 🚪\n\nFür jede Stufe einen Satz oder eine Handlung." }
    ],
    ab34: { titel: "Meine Eskalationstreppe", aufgaben: [
        { typ: "luecken", text: "Denk an einen Streit, den du erlebt hast. Schreib die Stufen von unten nach oben auf.", nummern: true, saetze: ["Es fing an mit: ___", "Dann: ___", "Dann: ___", "Am Ende: ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Hier hätte ich aussteigen können: ___", "So hätte ich aussteigen können: ___"] },
        { typ: "ankreuzen", text: "Was hilft dir beim Aussteigen?", optionen: ["weggehen", "tief durchatmen", "„Stopp“ sagen", "eine Aufsicht holen", "Sorry sagen", "an die Folgen denken"], nebeneinander: true }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-wut-frueh",
    titel: "Wenn's in mir kocht",
    ziel34: "Die eigenen Wut-Signale früh erkennen und einen persönlichen Notfallplan haben",
    material: "Tafel: Wut-Thermometer von 0 bis 10\nKarte „Kasten-Atmen“ (Arbeitsmaterial)",
    materialIds: ["kasten-atmen"],
    lerntext34: { titel: "Zehn Sekunden", text:
`Emre hat einen Plan. Seit letzter Woche weiß er: Bei ihm fängt Wut im Bauch an. Erst wird es warm, dann ballt er die Fäuste, dann wird sein Gesicht heiß. Wenn er erst bei „Gesicht heiß“ ist, geht nichts mehr – dann haut er zu oder schmeißt Sachen.

Heute im Mathe-Unterricht sagt jemand hinter ihm: „Emre ist sowieso zu dumm dafür.“ Emre merkt das Warme im Bauch. Er denkt an seinen Plan: Fäuste auf, Füße fest auf den Boden, langsam ausatmen und bis zehn zählen. Dann hebt er die Hand und sagt zur Lehrerin: „Ich brauch kurz eine Pause.“ Er darf zwei Minuten an den Pausenplatz am Fenster.

Danach setzt er sich wieder hin. Er ist immer noch sauer – aber er hat niemanden verletzt und keinen Ärger bekommen. Zum ersten Mal seit Langem.

**Fragen zum Gespräch:**
1. Welche Signale hat Emre bei seiner Wut? In welcher Reihenfolge kommen sie?
2. Warum ist es wichtig, die Wut schon „im Bauch“ zu bemerken und nicht erst später?
3. Was genau war Emres Plan?
4. Wo spürst du Wut zuerst? (freiwillig)` },
    uebungen: [
        { titel: "Wut-Thermometer", dauer: "6 Min",
          text: "Male an der Tafel ein Thermometer von 0 bis 10. Gemeinsam sammeln: Was passiert im Körper bei 2? Bei 5? Bei 8? (z. B. 2 = genervt, Kiefer fest · 5 = heißer Kopf, laute Stimme · 8 = Fäuste, Tunnelblick). Wichtig: **Bis etwa 5 kann man noch gut bremsen** – danach wird es sehr schwer.",
          folie: "Wut-Thermometer 🌡️ von 0 bis 10.\n\nWas passiert in deinem Körper bei **2**? Bei **5**? Bei **8**?\n\nBis etwa 5 kann man noch gut bremsen." },
        { titel: "Notfall-Werkzeuge testen", dauer: "6 Min",
          text: "Alle probieren am Platz drei Werkzeuge aus und bewerten sie danach mit Daumen:\n\n- Kasten-Atmen: 4 Sekunden ein, 4 halten, 4 aus, 4 halten.\n- Fäuste 5 Sekunden ganz fest drücken – dann loslassen.\n- Füße fest auf den Boden drücken und 5 Dinge im Raum zählen, die blau sind.\n\nAbsprache für die Gruppe: Wer eine Pause braucht, zeigt das vereinbarte Zeichen (z. B. Hand mit „T“ für Time-out).",
          antworten: ["👍 hilft mir", "👎 hilft mir nicht"],
          folie: "Probier drei **Notfall-Werkzeuge** aus. 🧰\n\nDanach: Hilft dir das? 👍 oder 👎",
          kern: ["34"] }
    ],
    ab34: { titel: "Mein Wut-Notfallplan", aufgaben: [
        { typ: "tabelle", text: "So fühlt sich meine Wut an – schreib zu jeder Stufe, was du im Körper merkst:", spalten: ["Stufe", "Das merke ich in meinem Körper"], zeilen: [["leicht (1–3)", ""], ["mittel (4–6)", ""], ["stark (7–10)", ""]] },
        { typ: "luecken", text: "Mein Notfallplan – wenn ich bei Stufe 4 bin:", nummern: true, saetze: ["Zuerst: ___", "Dann: ___", "Wenn das nicht reicht: ___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Diese Person kann mir helfen: ___", "Mein Zeichen für „Ich brauche eine Pause“: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-gruppendruck",
    titel: "Alle machen mit – du auch?",
    ziel34: "Gruppendruck erkennen und Wege finden, nicht mitzumachen, ohne das Gesicht zu verlieren",
    material: "rote und grüne Karten\nPlakat „So kann ich Nein sagen“ (Arbeitsmaterial)",
    materialIds: ["rot-gruen", "nein-saetze"],
    lerntext34: { titel: "Die Jacke", text:
`Nach dem Sport. In der Umkleide hängt die neue Jacke von Paul. Paul ist neu in der Klasse und ziemlich still. Marvin grinst: „Los, wir schmeißen die Jacke in den Müll. Mal sehen, was er dann macht.“

Drei Jungs lachen und sind sofort dabei. Ali steht daneben. Eigentlich findet er das fies. Aber Marvin sagt: „Was ist, Ali? Bist du jetzt sein Freund, oder was? Oder traust du dich nicht?“ Alle schauen Ali an.

Ali merkt, wie sein Herz klopft. Er will nicht der Außenseiter sein. Er will aber auch nicht, dass Paul gleich vor dem Mülleimer steht und alle lachen.

**Fragen zum Gespräch:**
1. Warum fällt es Ali so schwer, Nein zu sagen?
2. Was will Marvin mit dem Satz „Traust du dich nicht?“ erreichen?
3. Welche Möglichkeiten hat Ali? Sammelt mindestens drei.
4. Was passiert, wenn EINER nicht mitmacht? Und wenn zwei nicht mitmachen?
5. Wann hast du schon mal etwas mitgemacht, was du eigentlich nicht wolltest? (freiwillig)` },
    uebungen: [
        { titel: "Was würdest du tun?", dauer: "7 Min",
          text: "Du liest Situationen vor. Die Kinder zeigen: grüne Karte = ich mache mit, rote Karte = ich mache nicht mit. Ehrlich sein ist erlaubt – niemand wird ausgelacht. Danach jeweils eine Frage: Was macht es schwer, Nein zu sagen?\n\n- Alle in der Gruppe schreiben etwas Gemeines über ein Kind in den Chat.\n- Die anderen wollen im Laden etwas einstecken, ohne zu bezahlen.\n- Alle machen sich über die Aussprache eines Kindes lustig.\n- Die Gruppe will nach der Schule ohne Bescheid zu sagen in den Park.\n- Alle lachen, als ein Kind gestolpert ist.",
          antworten: ["🟢 ich mache mit", "🔴 ich mache nicht mit"],
          folie: "Alle machen mit. Und du?\n\n🟢 **Ich mache mit** · 🔴 **Ich mache nicht mit**\n\nEhrlich sein ist erlaubt – niemand wird ausgelacht.",
          kern: ["34"] },
        { titel: "Ausstiegs-Sätze", dauer: "5 Min",
          text: "Gemeinsam Sätze sammeln, mit denen man aussteigt, **ohne uncool zu wirken**. Schreib sie an die Tafel:\n\n- „Nee, da hab ich keinen Bock drauf.“\n- „Lass mal, das gibt nur Ärger.“\n- „Macht ihr. Ich bin raus.“\n- Ablenken: „Kommt, wir gehen lieber Fußball spielen.“\n\nDann sagt jedes Kind seinen Lieblingssatz einmal laut – lässig, aber klar.",
          quiz: "liste",
          folie: "So steigst du aus – **ohne uncool zu wirken**:\n\nSag deinen Lieblingssatz einmal laut – lässig, aber klar." }
    ],
    ab34: { titel: "Ich bin raus", kontext: "Zum Fall: Marvin will die Jacke vom neuen Mitschüler Paul in den Müll werfen. Drei Jungs machen mit. Ali findet das fies – aber alle schauen ihn an.", aufgaben: [
        { typ: "ankreuzen", text: "Woran erkennst du Gruppendruck?", optionen: ["„Trau dich doch!“", "„Alle machen das.“", "„Sonst bist du nicht mehr dabei.“", "„Willst du mitmachen? Du musst nicht.“", "Alle schauen dich an und warten."] },
        { typ: "luecken", text: "Ali in der Umkleide – schreib drei Möglichkeiten auf:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Ausstiegs-Satz: ___", "Das macht es mir leichter, Nein zu sagen: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-handyvideo",
    titel: "Filmen, teilen, weiterleiten?",
    ziel34: "Verstehen, was Videos und Nachrichten im Klassenchat anrichten können, und wissen, was man stattdessen tun kann",
    material: "Tafel: vier Rollen „macht es“ – „macht mit“ – „schaut zu“ – „hilft“\nPlakat „Das können Zuschauer tun“ (Arbeitsmaterial)",
    materialIds: ["zuschauer-plakat"],
    lerntext34: { titel: "Das Video", text:
`Auf dem Schulhof gibt es Streit. Tom liegt am Boden, Jannik hält ihn fest. Einige Kinder stehen drumherum. Lara holt ihr Handy raus und filmt. „Das wird legendär!“, ruft jemand.

Am Abend ist das Video im Klassenchat. 23 Leute haben es gesehen. Einer schreibt „😂😂😂“, ein anderer „Tom heult wie ein Baby“. Jemand leitet es an die Parallelklasse weiter. Am nächsten Morgen kennt es die halbe Schule.

Tom will nicht mehr in die Schule. Seine Mutter geht zur Polizei. Jetzt gibt es auch für Lara und die, die das Video weitergeleitet haben, ein Gespräch – denn Menschen ohne Erlaubnis zu filmen und so etwas zu verbreiten ist verboten.

**Fragen zum Gespräch:**
1. Wer hat Tom in dieser Geschichte wehgetan? Nur Jannik?
2. Warum filmen Menschen so etwas – statt zu helfen?
3. Was hat das Weiterleiten für Tom bedeutet?
4. Was hätten Lara und die anderen stattdessen tun können?
5. Was macht ihr, wenn so etwas in eurem Chat landet?` },
    uebungen: [
        { titel: "Wer spielt welche Rolle?", dauer: "6 Min",
          text: "An der Tafel stehen vier Rollen: **macht es – macht mit – schaut zu – hilft**. Ihr ordnet die Personen aus dem Fall zu (Jannik, die Kinder drumherum, Lara, die Chat-Leute, der, der weiterleitet). Dann die Frage: Welche Rolle gab es im Fall gar nicht? (→ hilft)",
          folie: "Vier Rollen:\n\n**macht es · macht mit · schaut zu · hilft**\n\nWer aus der Geschichte hatte welche Rolle?" },
        { titel: "Was tun, wenn's im Chat landet?", dauer: "6 Min",
          text: "Gemeinsam einen Plan in vier Schritten an die Tafel schreiben:\n\n- Nicht anschauen, nicht liken, nicht kommentieren.\n- Auf keinen Fall weiterleiten.\n- Einem Erwachsenen zeigen (Eltern, Lehrkraft) – das ist kein Petzen.\n- Dem betroffenen Kind schreiben: „Ich find das nicht okay. Kann ich helfen?“\n\nFrage zum Schluss: Was davon kostet am meisten Mut?",
          quiz: "keine",
          folie: "Ein fieses Video landet im Chat. 📱\n\nWas machst du? Wir schreiben einen Plan in vier Schritten.",
          kern: ["34"] }
    ],
    ab34: { titel: "Filmen oder helfen?", kontext: "Zum Fall: Jannik hält Tom am Boden fest. Lara filmt. Abends ist das Video im Klassenchat und wird weitergeleitet.", aufgaben: [
        { typ: "zuordnen", text: "Verbinde die Person mit ihrer Rolle.", links: ["Jannik", "Lara", "Wer weiterleitet", "Wer nur zuschaut"], rechts: ["macht mit", "macht es", "schaut zu", "verbreitet es"] },
        { typ: "ankreuzen", text: "Ein peinliches Video von jemandem ist im Chat. Was ist richtig?", optionen: ["weiterleiten, ist doch lustig", "einem Erwachsenen zeigen", "„😂“ drunter schreiben", "nicht kommentieren und nicht teilen", "dem Kind schreiben, dass du zu ihm hältst"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Wenn ich sehe, dass jemand gefilmt wird, mache ich: ___", "Das könnte ich Tom schreiben: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-provokation",
    titel: "Provokation – nicht drauf einsteigen",
    ziel34: "Durchschauen, was Provokateure wollen, und ruhig reagieren können",
    material: "Tafel: „Was will der Provokateur?“\nSituationskarten (Arbeitsmaterial)",
    lerntext34: { titel: "Der Knopf", text:
`Yusuf weiß genau, welchen Knopf er bei Nico drücken muss. Er braucht nur zu sagen: „Na, hat dein Vater dich wieder nicht abgeholt?“ – und Nico explodiert. Jedes Mal. Nico brüllt, wirft den Stuhl um und landet im Trainingsraum. Yusuf sitzt grinsend auf seinem Platz.

Irgendwann erklärt Nicos Schulbegleiter ihm etwas: „Yusuf hat eine Fernbedienung für dich. Er drückt einen Knopf, und du machst genau das, was er will. Willst du ihm die Fernbedienung wirklich geben?“

Am nächsten Tag kommt der Spruch wieder. Nico atmet durch, schaut Yusuf an und sagt nur: „Langweilig.“ Dann dreht er sich weg. Yusuf versucht es noch zweimal. Dann gibt er auf.

**Fragen zum Gespräch:**
1. Was wollte Yusuf mit seinem Spruch erreichen?
2. Wer hatte am Ende die Macht – vorher und nachher?
3. Was ist mit der „Fernbedienung“ gemeint?
4. Warum war „Langweilig“ so wirksam?
5. Welcher Satz wäre DEIN Knopf? (Nur für dich – du musst ihn nicht sagen.)` },
    uebungen: [
        { titel: "Was will der Provokateur?", dauer: "5 Min",
          text: "An der Tafel sammeln: Was will jemand, der provoziert? (Aufmerksamkeit, Lacher, dich in Ärger bringen, sich stark fühlen, Langeweile vertreiben …) Dann: Was bekommt er, wenn du ausrastest? Was bekommt er, wenn du cool bleibst?",
          folie: "Was **will** jemand, der provoziert? 🎣\n\nWas bekommt er, wenn du ausrastest – und was, wenn du cool bleibst?" },
        { titel: "Cool-bleiben-Training", dauer: "8 Min",
          text: "Du liest eine harmlose „Provokation“ vor (keine echten Beleidigungen!). Ein Kind antwortet vom Platz mit einer der Cool-Antworten – ruhige Stimme, gerader Blick, dann wegdrehen. Danach Applaus. Vorher die Antworten an die Tafel schreiben: „Langweilig.“ · „Okay.“ · „Wenn du meinst.“ · „Kann sein.“ · Schulterzucken und weitermachen.\n\n- „Deine Schuhe sind voll hässlich.“\n- „Du kannst nicht mal Fußball spielen.“\n- „Haha, du hast eine Fünf.“\n- „Du bist voll das Baby.“\n- „Traust dich eh nicht.“",
          quiz: "karten",
          frage: "Antworte cool: ruhige Stimme, gerader Blick – dann wegdrehen.",
          folie: "Du bekommst einen blöden Spruch. Du antwortest **cool** 😎:\n\n„Langweilig.“ · „Okay.“ · „Wenn du meinst.“ · „Kann sein.“ · Schulterzucken\n\nRuhige Stimme, gerader Blick – dann wegdrehen.",
          kern: ["34"] }
    ],
    ab34: { titel: "Meine Fernbedienung gehört mir", aufgaben: [
        { typ: "ankreuzen", text: "Was will jemand, der dich provoziert? Kreuze an, was oft stimmt.", optionen: ["Er will, dass du ausrastest.", "Er will, dass andere lachen.", "Er will dir helfen.", "Er will, dass DU Ärger bekommst.", "Er will sich stark fühlen."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Knopf (ein Spruch, der mich schnell wütend macht): ___", "Meine Cool-Antwort darauf: ___", "Danach mache ich: ___"] },
        { typ: "tabelle", text: "Was passiert dann? Schreib in jede Spalte, was danach passieren kann.", spalten: ["Wenn ich ausraste …", "Wenn ich cool bleibe …"], zeilen: [["", ""], ["", ""]] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-mist-gebaut",
    titel: "Mist gebaut – und jetzt?",
    ziel34: "Ausreden von Verantwortung unterscheiden und Wiedergutmachung konkret planen",
    material: "Tafel: zwei Spalten „Ausrede“ und „Verantwortung“\nSituationskarten (Arbeitsmaterial)",
    lerntext34: { titel: "Das kaputte Tablet", text:
`Im Klassenraum liegen die Schul-Tablets. Benni und Kevin albern herum, werfen sich ein Mäppchen zu. Benni verfehlt – das Mäppchen trifft ein Tablet, es fällt vom Tisch. Das Display hat einen langen Sprung.

Kevin sagt sofort: „Ich war's nicht!“ Benni sagt: „Das lag sowieso schon am Rand.“ Als die Lehrerin fragt, sagt Benni: „Kevin hat angefangen.“ Kevin: „Benni hat geworfen.“ Am Ende glaubt die Lehrerin keinem von beiden – und beide bekommen Ärger.

Zwei Tage später geht Benni allein zur Lehrerin. „Ich hab das Mäppchen geworfen. Das war meine Schuld. Kann ich das irgendwie wiedergutmachen?“ Die Lehrerin ist überrascht. Sie überlegen gemeinsam: Benni hilft eine Woche lang beim Tablet-Dienst und schreibt einen Zettel für die Eltern.

**Fragen zum Gespräch:**
1. Welche Ausreden kommen im Fall vor? Zählt sie.
2. Warum suchen Menschen nach Ausreden?
3. Was hat sich verändert, als Benni die Verantwortung übernommen hat?
4. Ist „Sorry“ genug – oder gehört mehr dazu?
5. Warum ist Verantwortung übernehmen eigentlich stark und nicht schwach?` },
    uebungen: [
        { titel: "Ausrede oder Verantwortung?", dauer: "6 Min",
          text: "Du liest Sätze vor. Die Kinder zeigen Daumen runter (= Ausrede) oder Daumen hoch (= Verantwortung).\n\n- „Der hat angefangen.“\n- „Das war meine Schuld.“\n- „Das war doch nur Spaß.“\n- „Ich hab das gemacht, es tut mir leid.“\n- „Alle anderen machen das auch.“\n- „Ich war wütend, aber das war trotzdem nicht okay.“\n- „Der hat mich provoziert, da konnte ich nicht anders.“",
          antworten: ["👍 Verantwortung", "👎 Ausrede"],
          folie: "Ist das eine **Ausrede** 👎 – oder übernimmt jemand **Verantwortung** 👍?",
          kern: ["34"] },
        { titel: "Wiedergutmachen – aber wie?", dauer: "6 Min",
          text: "Sammelt zu drei Fällen konkrete Wiedergutmachungen (nicht nur „Sorry“): Jemandem das Pausenbrot weggenommen · Jemanden vor allen ausgelacht · Jemandem die Jacke dreckig gemacht. Regel: Die Wiedergutmachung soll zur Tat passen und dem anderen wirklich etwas bringen.",
          folie: "„Sorry“ reicht nicht immer. 🔧\n\nWie kann man es **wirklich** wieder gutmachen? Es soll zur Tat passen." }
    ],
    ab34: { titel: "Verantwortung statt Ausrede", kontext: "Zum Fall: Benni wirft aus Spaß ein Mäppchen, ein Tablet geht kaputt. Erst schieben Benni und Kevin die Schuld hin und her – später übernimmt Benni die Verantwortung.", aufgaben: [
        { typ: "tabelle", text: "Schreib zu jeder Ausrede einen Satz, der Verantwortung übernimmt.", spalten: ["Ausrede", "Verantwortung"], zeilen: [["„Der hat angefangen.“", ""], ["„War nur Spaß.“", ""], ["„Ich war's nicht!“", ""]] },
        { typ: "luecken", text: "Mein Wiedergutmachungs-Plan (für etwas, das wirklich passiert ist – oder ausgedacht):", nummern: true, saetze: ["Das ist passiert: ___", "Das sage ich: ___", "Das mache ich wieder gut: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-stark",
    titel: "Was ist eigentlich stark?",
    ziel34: "Körperliche Stärke von innerer Stärke unterscheiden und eigene Stärken entdecken",
    material: "Tafel: Stärke-Skala von 1 bis 10\nrote und grüne Karten",
    materialIds: ["rot-gruen"],
    lerntext34: { titel: "Zwei Arten von stark", text:
`Mehmet ist der Stärkste in der Klasse. Er kann zwanzig Liegestütze und gewinnt jedes Armdrücken. Wenn ihn jemand schief anschaut, zeigt er ihm, wer der Chef ist.

Beim Fußballturnier liegt ihre Schule hinten. Ein Spieler der anderen Mannschaft beleidigt Mehmet. Mehmet rastet aus, schubst ihn – rote Karte. Ohne ihn verliert die Mannschaft. Nach dem Spiel sitzt er allein in der Kabine.

Dann kommt Jonas rein, der Torwart. Jonas ist klein und kann kaum zwei Liegestütze. Er setzt sich neben Mehmet und sagt: „Ich war auch sauer. Aber ich bin froh, dass du in unserer Mannschaft bist. Nächstes Mal schaffen wir das.“ Mehmet sagt lange nichts. Dann: „Sorry, Mann. Das war dumm von mir.“

**Fragen zum Gespräch:**
1. Wer war in dieser Szene stark – und auf welche Art?
2. Was hat Mehmets Stärke im Spiel gebracht? Was hat sie gekostet?
3. Was braucht es, um wie Jonas zu reagieren?
4. Mehmet sagt am Ende „Sorry“. Ist das schwach oder stark?
5. Welche Art von Stärke hast du?` },
    uebungen: [
        { titel: "Wie stark ist das?", dauer: "7 Min",
          text: "Du liest Situationen vor, die Kinder zeigen mit den Fingern eine Zahl von 1 bis 10: Wie stark ist das? Danach vergleichen und diskutieren – oft liegen die Meinungen weit auseinander.\n\n- Jemanden verprügeln, der dich beleidigt hat.\n- Weggehen, obwohl alle „Feigling“ rufen.\n- Zugeben, dass man etwas nicht kann.\n- Einen Jüngeren beschützen.\n- Sich entschuldigen, obwohl der andere auch Schuld hat.\n- Hilfe holen, wenn jemand geschlagen wird.\n- Bei einem Streit nicht mitmachen.",
          quiz: "karten",
          frage: "Wie stark ist das? Zeig mit den Fingern: 1 bis 10.",
          folie: "Wie **stark** ist das? 💪\n\nZeig mit den Fingern eine Zahl von **1 bis 10**. Danach vergleichen wir.",
          kern: ["34"] },
        { titel: "Stärken-Runde", dauer: "5 Min",
          text: "Jedes Kind nennt eine innere Stärke von seinem linken Nachbarn (z. B. „Du gibst nicht auf“, „Du bist ehrlich“, „Du hilfst anderen“). Regel: nur echte, ernst gemeinte Stärken – Witze zählen nicht. Wer niemanden links hat, bekommt eine Stärke von dir.",
          folie: "Sag deinem linken Nachbarn eine **innere Stärke**:\n\n„Du gibst nicht auf.“ · „Du bist ehrlich.“ · „Du hilfst anderen.“\n\nNur echte, ernst gemeinte Stärken." }
    ],
    ab34: { titel: "Meine Stärke", aufgaben: [
        { typ: "tabelle", text: "Sortiere die Begriffe aus dem Wortspeicher: Was ist Muskel-Stärke, was ist innere Stärke?", spalten: ["Muskel-Stärke", "Innere Stärke"], zeilen: [["", ""], ["", ""], ["", ""], ["", ""]],
          woerter: ["Liegestütze", "Fehler zugeben", "Armdrücken gewinnen", "Nein sagen", "schwere Kisten tragen", "sich entschuldigen", "schnell rennen", "ruhig bleiben"] },
        { typ: "ankreuzen", text: "Welche innere Stärke hast du schon? Kreuze an.", optionen: ["ehrlich sein", "Nein sagen", "mich entschuldigen", "anderen helfen", "ruhig bleiben", "nicht aufgeben", "Fehler zugeben"], nebeneinander: true },
        { typ: "luecken", text: "", nummern: false, saetze: ["Diese innere Stärke will ich trainieren: ___", "So fange ich diese Woche an: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-koerpergrenzen",
    titel: "Stopp heißt Stopp",
    ziel34: "Körperliche Grenzen von sich und anderen ernst nehmen – auch beim Raufen und „Spaß“",
    material: "Stopp-Schild (Arbeitsmaterial)\nPlakat „So kann ich Nein sagen“",
    materialIds: ["stopp-schild", "nein-saetze"],
    lerntext34: { titel: "Schwitzkasten", text:
`Robin und Finn raufen oft in der Pause. Meistens lachen beide dabei. Heute nimmt Robin Finn in den Schwitzkasten. Finn lacht erst noch, dann bekommt er schlecht Luft. „Stopp!“, ruft er. Robin lacht: „Ach komm, du Weichei!“ und drückt weiter.

Finn bekommt Panik. Er tritt nach hinten und trifft Robin am Knie. Robin lässt los und schreit: „Spinnst du? Wir haben doch nur gespielt!“ Beide sind wütend. Finn hat danach rote Striemen am Hals.

Später redet die Lehrerin mit beiden. Robin sagt: „Ich hab nicht gemerkt, dass es ernst war.“ Finn sagt: „Ich hab doch Stopp gesagt!“

**Fragen zum Gespräch:**
1. Wann wurde aus Spaß Ernst? Woran hätte Robin es merken können?
2. Warum hat Robin weitergemacht, obwohl Finn „Stopp“ gesagt hat?
3. War Finns Tritt okay? Was hätte er sonst tun können?
4. Welche Regel brauchen Robin und Finn, wenn sie weiter raufen wollen?
5. Wo ist bei dir die Grenze, wenn dich jemand anfasst?` },
    uebungen: [
        { titel: "Abstand spüren", dauer: "6 Min",
          text: "Zwei Kinder, die freiwillig mitmachen, stehen sich vorn mit etwa vier Metern Abstand gegenüber. Kind A geht langsam Schritt für Schritt auf Kind B zu. Kind B hebt die Hand und sagt „Stopp“, sobald es ihm zu nah wird – Kind A bleibt SOFORT stehen. Markiere die Stelle mit Kreide oder Klebeband. Dann tauschen. Zwei, drei Paare probieren es, jedes Paar bekommt eine eigene Markierung. Beobachtung: Jeder hat einen anderen Abstand – und alle sind okay. Du leitest nur an.",
          folie: "Zwei Kinder stehen sich gegenüber. A geht **langsam** auf B zu.\n\nB sagt **„Stopp“**, wenn es zu nah ist – A bleibt **sofort** stehen. ✋\n\nJeder hat einen anderen Abstand – und alle sind okay." },
        { titel: "Rauf-Regeln", dauer: "6 Min",
          text: "Gemeinsam Regeln sammeln, damit Raufen fair bleibt – oder entscheiden, dass es bei euch gar nicht erlaubt ist. Beispiele an die Tafel:\n\n- Beide wollen es – vorher fragen.\n- „Stopp“ heißt SOFORT loslassen. Ohne Diskussion.\n- Nicht an Hals, Kopf, Bauch.\n- Wer nicht mehr mag, ist kein Weichei.\n- Wenn jemand weint oder schlecht Luft bekommt: sofort aufhören.",
          quiz: "keine",
          folie: "Damit Raufen fair bleibt – welche **Regeln** braucht ihr?\n\nOder ist Raufen bei euch ganz verboten?",
          kern: ["34"] }
    ],
    ab34: { titel: "Meine Grenze – deine Grenze", aufgaben: [
        { typ: "ankreuzen", text: "Woran merkst du, dass es dem anderen zu viel ist?", optionen: ["Er sagt „Stopp“ oder „Hör auf“.", "Er lacht nicht mehr.", "Er versucht sich zu befreien.", "Er wird rot oder bekommt schlecht Luft.", "Er wird still."] },
        { typ: "luecken", text: "Unsere Rauf-Regeln:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Wenn jemand nicht aufhört, obwohl ich Stopp sage, mache ich: ___"] }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-laestern",
    titel: "Lästern und Runtermachen",
    ziel34: "Verstehen, warum Menschen über andere lästern, und Lästern stoppen können",
    material: "Tafel: „Hinter dem Spruch steckt …“\nSituationskarten (Arbeitsmaterial)",
    lerntext34: { titel: "Die Schuhe", text:
`Sara kommt mit neuen Turnschuhen in die Schule – keine Markenschuhe, sondern welche vom Discounter. In der Pause zeigt Jana auf die Schuhe. „Boah, wo hast du die denn her? Vom Wühltisch?“ Ein paar Mädchen lachen. In der Pause tuscheln sie, und Sara hört ihren Namen.

Am Nachmittag schreibt Jana in die Gruppe: „Habt ihr Saras Schuhe gesehen? 🤢“ Sara ist auch in der Gruppe. Sie zieht die Schuhe am nächsten Tag nicht mehr an.

Was keiner weiß: Jana hat Ärger zu Hause und fühlt sich seit Wochen mies. Wenn sie über andere lacht, fühlt sie sich für einen Moment besser. Ihre Freundin Kim schreibt ihr später privat: „Das war echt fies. Sara hat dir nichts getan.“

**Fragen zum Gespräch:**
1. Warum lästert Jana über Sara?
2. Hilft es Jana wirklich? Wie lange?
3. Was macht das Lästern mit Sara?
4. Was hat Kim gemacht – und warum war das mutig?
5. Wie könnt ihr in eurer Gruppe Lästern stoppen?` },
    uebungen: [
        { titel: "Hinter dem Spruch steckt …", dauer: "6 Min",
          text: "An der Tafel sammeln: Warum machen Menschen andere runter? (sich selbst besser fühlen, dazugehören, Langeweile, Neid, eigene Probleme, Angst selbst Opfer zu werden …) Dann: Ist das eine Entschuldigung? Nein – aber eine Erklärung, die hilft zu verstehen.",
          folie: "Warum machen Menschen andere **runter**? 🤔\n\nIst das eine Entschuldigung?" },
        { titel: "Lästern stoppen", dauer: "6 Min",
          text: "Sätze sammeln, die Lästern stoppen, ohne selbst fies zu werden. Dann reihum vom Platz aus laut sagen:\n\n- „Lass mal, die ist doch gar nicht da.“\n- „Ich find das nicht witzig.“\n- „Was hat sie dir getan?“\n- Thema wechseln: „Habt ihr gestern das Spiel gesehen?“\n- Privat schreiben wie Kim.",
          quiz: "liste",
          folie: "So stoppst du Lästern – ohne selbst fies zu werden.\n\nSag einen Satz laut vom Platz.",
          kern: ["34"] }
    ],
    ab34: { titel: "Lästern stoppen", kontext: "Zum Fall: Jana lästert über Saras Schuhe – erst in der Pause, dann im Gruppenchat. Sara zieht die Schuhe nicht mehr an.", aufgaben: [
        { typ: "ankreuzen", text: "Warum lästern Menschen? Kreuze an, was du für wahr hältst.", optionen: ["Sie wollen dazugehören.", "Sie fühlen sich selbst schlecht.", "Sie sind neidisch.", "Es ist ihnen langweilig.", "Sie haben Angst, sonst selbst dran zu sein."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Was Sara jetzt helfen würde: ___", "Mein Satz, um Lästern zu stoppen: ___", "Das schreibe ich, wenn im Chat gelästert wird: ___"] },
        { typ: "schreiben", text: "Schreib Sara eine kurze Nachricht, die ihr guttut.", zeilen: 4 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-gaming",
    titel: "Wenn das Zocken wütend macht",
    ziel34: "Rage beim Zocken und Verlieren erkennen und Strategien für Frust beim Spielen entwickeln",
    material: "Tafel: „Rage-Momente“ und „Was hilft?“\nKarte „Kasten-Atmen“",
    materialIds: ["kasten-atmen"],
    lerntext34: { titel: "Game over", text:
`Luca zockt jeden Nachmittag. Heute läuft es schlecht. Drei Runden hintereinander wird er rausgekickt. Im Voice-Chat lacht einer: „Noob! Lösch das Spiel!“

Luca brüllt ins Headset, beschimpft den anderen und knallt den Controller auf den Boden. Ein Knopf bricht ab. Seine Mutter kommt rein, es gibt Streit, das Handy ist für zwei Tage weg. Am nächsten Morgen kommt Luca schon wütend in die Schule – und gerät in der ersten Stunde mit seinem Nachbarn aneinander.

Sein großer Cousin erzählt ihm später: „Kenn ich. Ich hab jetzt eine Regel: Nach zwei verlorenen Runden mach ich Pause. Und wer im Chat rumpöbelt, wird stummgeschaltet.“

**Fragen zum Gespräch:**
1. Was hat Luca wütend gemacht? Nur das Verlieren?
2. Welche Folgen hatte seine Wut – auch für den nächsten Tag?
3. Was hält ihr von der Regel des Cousins?
4. Warum macht Verlieren beim Zocken manchmal wütender als im echten Leben?
5. Was hilft dir, wenn du beim Spielen sauer wirst?` },
    uebungen: [
        { titel: "Rage-Momente", dauer: "5 Min",
          text: "Die Kinder erzählen (freiwillig): Wann werdet ihr beim Zocken richtig sauer? Du schreibst Stichworte an die Tafel (Lag, unfaire Gegner, Pöbeln im Chat, kurz vorm Ziel verlieren …). Dann: Was macht euer Körper dabei?",
          folie: "Wann wirst du beim **Zocken** richtig sauer? 🎮😡\n\nUnd was macht dein Körper dabei?" },
        { titel: "Anti-Rage-Plan", dauer: "7 Min",
          text: "Gemeinsam Strategien sammeln und abstimmen (Daumen), welche am besten klingen:\n\n- Nach zwei verlorenen Runden Pause machen.\n- Pöbler stummschalten oder melden.\n- Controller weglegen, bevor man ihn wirft.\n- Kurz aufstehen, Wasser trinken, ans Fenster.\n- Feste Spielzeit mit den Eltern abmachen – Wecker stellen.\n- Nicht mehr direkt vor dem Schlafen zocken.",
          antworten: ["👍 gute Idee", "👎 eher nicht"],
          folie: "Was hilft gegen **Rage**? 🎮\n\nIst das eine gute Idee? 👍 oder 👎",
          kern: ["34"] }
    ],
    ab34: { titel: "Mein Anti-Rage-Plan", kontext: "Zum Fall: Luca verliert beim Zocken, wird im Chat beleidigt, brüllt und macht den Controller kaputt. Am nächsten Tag ist er immer noch wütend.", aufgaben: [
        { typ: "luecken", text: "Ich als Spieler:", nummern: false, saetze: ["Ich spiele am liebsten: ___", "Ich werde sauer, wenn ___", "Das merke ich dann in meinem Körper: ___"] },
        { typ: "ankreuzen", text: "Das will ich ausprobieren:", optionen: ["Pause nach zwei verlorenen Runden", "Pöbler stummschalten", "Controller weglegen", "aufstehen und trinken", "Wecker für die Spielzeit", "nicht vor dem Schlafen zocken"] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Meine wichtigste Regel: ___"] },
        { typ: "schreiben", text: "Was würdest du Luca raten?", zeilen: 3 }
    ]}
})

);
})();
