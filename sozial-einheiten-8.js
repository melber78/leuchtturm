/* ============================================================
   Leuchtturm – Sozialtraining: „Klartext“ Teil 3 – NUR Kl. 3/4
   Reihe „Auf Mutter gehen“: Familien-Beleidigungen und sexualisierte
   Schimpfwörter. Drei Stunden, die aufeinander aufbauen:
   1. Warum trifft das so? – Schutzsätze
   2. Was Schimpfwörter wirklich sagen
   3. Unsere Sprach-Regel (Vertrag + was tun, wenn's doch passiert)
   4. Wer am Boden liegt – Schluss! (Kopftritte, absolute Grenzen, Zuschauer)
   Die Wörter selbst stehen nirgends auf dem Papier („das H-Wort“).
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
    id: "k-mutter",
    titel: "Auf Mutter gehen – warum trifft das so hart?",
    ziel34: "Verstehen, warum Sprüche über die Familie so treffen, und sich mit Schutzsätzen wehren, ohne auszurasten",
    material: "Tafel: Eisberg „Warum trifft das?“\nPlakat „Familie ist tabu – meine Schutzsätze“ (Arbeitsmaterial)\nHinweis für dich: Die Wörter selbst werden nicht ausgesprochen und nicht angeschrieben – wir sagen „ein Spruch über die Mutter“ oder „das H-Wort“.",
    materialIds: ["schutzsaetze-familie"],
    lerntext34: { titel: "Der Spruch", text:
`Mittwoch, Hofpause. Ali und Kevin streiten sich, wer beim Fußball dran ist. Kevin merkt, dass er verliert. Da sagt er einen Spruch über Alis Mutter – einen von der übelsten Sorte. Ein paar Jungs johlen.

Ali sieht rot. Er stürzt sich auf Kevin, schlägt zu, immer wieder. Zwei Lehrer müssen ihn wegziehen. Kevin hat Nasenbluten.

Am nächsten Tag sitzt Alis Mutter im Büro der Schulleitung. Ali wird für drei Tage vom Unterricht ausgeschlossen. Als sie rausgehen, weint seine Mutter. „Ich musste mir heute freinehmen. Mein Chef war sauer. Und du sagst, du hast das für mich gemacht?“

Ali versteht die Welt nicht mehr. Er wollte seine Mutter verteidigen. Und jetzt ist sie es, die traurig ist.

Später sagt ihm sein Onkel: „Kevin kennt deine Mutter gar nicht. Der Spruch hat sie nicht getroffen. Aber was du danach gemacht hast – das hat sie getroffen.“

**Fragen zum Gespräch:**
1. Warum hat Kevin ausgerechnet einen Spruch über die Mutter gesagt?
2. Was wollte Kevin damit erreichen? Hat es geklappt?
3. Wen hat der Spruch wirklich getroffen – und wen hat Alis Reaktion getroffen?
4. Was meint der Onkel mit seinem Satz?
5. Was würde deine Mutter (oder wer für dich wichtig ist) sich wünschen, wie du reagierst?` },
    uebungen: [
        { titel: "Warum trifft das so?", dauer: "6 Min",
          text: "Male einen Eisberg an die Tafel. Oben steht: **Ein Spruch über die Mutter**. Darunter sammeln die Kinder, warum das so wehtut (sie ist der wichtigste Mensch · ich muss sie beschützen · das ist eine Frage der Ehre · vor allen bloßgestellt · ich kann mich nicht wehren, weil es Quatsch ist …).\n\nDann die entscheidende Frage: **Wer weiß genau, dass das bei euch der wunde Punkt ist?** (→ der Provokateur. Er sucht den Knopf, der am schnellsten wirkt.)",
          folie: "Ein Spruch über die **Mutter**. 🧊\n\nWarum tut das so weh?\n\nUnd: **Wer weiß genau, dass das dein wunder Punkt ist?**" },
        { titel: "Schutzsätze", dauer: "7 Min",
          text: "Gemeinsam Sätze sammeln, die zeigen: Meine Familie kriegst du nicht. Kurz, ruhig, ohne zurückzubeleidigen. Dann sagt jedes Kind seinen Lieblingssatz einmal laut vom Platz – mit fester Stimme und geradem Blick.\n\n- „Meine Mutter kennst du gar nicht.“\n- „Lass meine Familie da raus.“\n- „Das sagt mehr über dich als über sie.“\n- „Ich hab's gehört. Ich geb dir nicht, was du willst.“\n- Nichts sagen, umdrehen, zur Aufsicht gehen.",
          quiz: "liste",
          folie: "**Meine Familie kriegst du nicht.** 🛡️\n\nKurz, ruhig, ohne zurückzubeleidigen. Sag deinen Lieblingssatz laut." }
    ],
    ab34: { titel: "Meine Familie kriegst du nicht", aufgaben: [
        { typ: "ankreuzen", text: "Warum trifft ein Spruch über die Mutter so hart? Kreuze an, was für dich stimmt.", optionen: ["Sie ist mir am wichtigsten.", "Ich will sie beschützen.", "Es ist vor allen peinlich.", "Es geht um Ehre.", "Ich weiß nicht, was ich sagen soll."] },
        { typ: "tabelle", text: "Was passiert dann? Schreib in jede Spalte, was danach passieren kann.", spalten: ["Wenn ich ausraste …", "Wenn ich ruhig bleibe …"], zeilen: [["", ""], ["", ""]] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Mein Schutzsatz: ___", "Danach mache ich: ___"] },
        { typ: "schreiben", text: "Was würde deine Mutter (oder wer für dich wichtig ist) sich wünschen, wie du reagierst?", zeilen: 3 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-schimpfwoerter",
    titel: "Was Schimpfwörter wirklich sagen",
    ziel34: "Erkennen, wen Schimpfwörter eigentlich treffen – auch die, die man „einfach so“ sagt – und andere Wörter für Wut finden",
    material: "Pro Kind ein kleiner Zettel (anonym)\nTafel: fünf Felder „Familie – Mädchen & Frauen – Behinderung – Herkunft – Aussehen“\nHinweis für dich: Die Zettel liest du NICHT vor und schreibst die Wörter nicht an. Du ordnest sie nur den Feldern zu und zählst.",
    lerntext34: { titel: "Was heißt das eigentlich?", text:
`In der 4a sagen viele Jungs ständig das H-Wort. Beim Fußball, im Chat, sogar zu ihren besten Freunden. „Ist doch normal“, sagt Mert.

Eines Tages fragt die Lehrerin ganz ruhig: „Was bedeutet das Wort eigentlich?“ Es wird still. Keiner will es erklären. Mert grinst verlegen. Dann sagt Jule: „Das heißt, dass die Mutter von dem anderen eine Frau ist, die für Sex Geld bekommt. Man beleidigt damit gar nicht den Jungen – man beleidigt seine Mutter.“

Die Jungs schauen sich an. Jule sagt weiter: „Und wenn ihr das die ganze Zeit sagt, dann redet ihr über Mütter und Frauen, als wären sie Dreck. Auch über eure eigenen Schwestern und Mütter.“

Mert sagt nichts mehr. Später im Chat schreibt er: „Hab nie drüber nachgedacht.“

**Fragen zum Gespräch:**
1. Warum wollte niemand erklären, was das Wort bedeutet?
2. Wen beleidigt das H-Wort eigentlich?
3. Was meint Jule mit „als wären sie Dreck“?
4. Warum sagen Menschen Wörter, deren Bedeutung sie gar nicht genau kennen?
5. Macht es einen Unterschied, ob man ein Schimpfwort „im Spaß“ sagt?` },
    uebungen: [
        { titel: "Wörter-Check (anonym)", dauer: "7 Min",
          text: "Jedes Kind schreibt auf einen Zettel ein Schimpfwort, das es oft hört – ohne Namen. Du sammelst ein, liest NICHTS vor und machst bei jedem Zettel einen Strich in einem der fünf Felder an der Tafel: **Familie · Mädchen & Frauen · Behinderung · Herkunft · Aussehen**.\n\nDann schaut ihr gemeinsam auf die Striche: Welche Gruppe wird am meisten beleidigt? Wer davon sitzt vielleicht mit im Raum oder ist mit uns verwandt? Zettel danach sofort wegwerfen.",
          folie: "Schreib ein Schimpfwort auf, das du oft hörst – **ohne Namen**.\n\nNiemand liest es vor. Wir schauen nur: **Wen trifft es?**" },
        { titel: "Andere Wörter für Wut", dauer: "5 Min",
          text: "Wut muss raus – aber es geht auch ohne jemanden zu beleidigen. Sammelt zwei Listen:\n\n- **Frust-Wörter**, die niemanden treffen: „Mann ey!“, „Das nervt!“, „Ich raste gleich aus!“, „Boah!“\n- **Fantasie-Schimpfwörter**, die eher zum Lachen bringen als zum Prügeln: „Du Gurkenkopf“, „Du Socken-Dieb“, „Du Wasserkocher“.\n\nAbstimmung: Welches Fantasie-Wort wird unser Gruppenwort?",
          quiz: "keine",
          folie: "Wut muss raus – aber ohne jemanden zu beleidigen.\n\nWelche **Frust-Wörter** und **Fantasie-Schimpfwörter** fallen dir ein? 😄" }
    ],
    ab34: { titel: "Wen trifft das eigentlich?", aufgaben: [
        { typ: "zuordnen", text: "Schimpfwörter treffen oft ganze Gruppen. Verbinde.", links: ["Sprüche über die Mutter", "Wörter für Frauen", "„Spast“, „behindert“", "Sprüche über das Land"], rechts: ["Menschen mit Behinderung", "Familien", "Menschen anderer Herkunft", "Mädchen und Frauen"] },
        { typ: "ankreuzen", text: "Was stimmt?", optionen: ["Viele sagen Schimpfwörter, ohne die Bedeutung zu kennen.", "„Im Spaß“ gesagt tut es niemandem weh.", "Das H-Wort beleidigt eigentlich die Mutter.", "Wer beleidigt, zeigt etwas über sich selbst.", "Wörter können genauso wehtun wie Schläge."] },
        { typ: "luecken", text: "", nummern: false, saetze: ["Wenn ich wütend bin, sage ich stattdessen: ___", "Mein Fantasie-Schimpfwort: ___"] },
        { typ: "schreiben", text: "Was hast du heute über Schimpfwörter gelernt?", zeilen: 3 }
    ]}
}),

/* ------------------------------------------------------------ */
K({
    id: "k-sprachregel",
    titel: "Unsere Sprach-Regel: Familie ist tabu",
    ziel34: "Gemeinsam eine verbindliche Sprach-Regel aufstellen und festlegen, was passiert, wenn sie gebrochen wird",
    material: "Plakat „Unsere Gruppenregeln“ (leer, mit Unterschriften – Arbeitsmaterial)\nPlakat „Familie ist tabu – meine Schutzsätze“\nAntwortkarten (Ampelkarte)",
    materialIds: ["gruppenregeln-leer", "schutzsaetze-familie", "rot-gruen"],
    lerntext34: { titel: "Die 4b macht einen Deal", text:
`In der 4b gab es fast jeden Tag Prügeleien. Fast immer fing es mit einem Spruch über die Familie an. Die Lehrerin schlug vor: „Macht ihr selbst eine Regel. Ich schreibe nur mit.“

Die Klasse diskutierte lange. Am Ende stand auf dem Plakat: **„Familie ist tabu. Keine Sprüche über Mütter, Väter, Geschwister – auch nicht im Spaß.“** Darunter: Was passiert, wenn es doch jemand sagt? Erstens: Der andere sagt „Tabu!“ und geht weg. Zweitens: Wer den Spruch gesagt hat, muss sich am selben Tag entschuldigen. Drittens: Wer zurückschlägt, hat genauso Ärger wie der, der den Spruch gesagt hat.

Alle unterschrieben. Nach vier Wochen zählten sie: Statt fast jeden Tag gab es nur noch zwei Prügeleien – und beide Male hatte jemand nicht „Tabu!“ gesagt, sondern sofort zugeschlagen.

**Fragen zum Gespräch:**
1. Warum hat die Lehrerin die Regel nicht einfach selbst gemacht?
2. Warum steht „auch nicht im Spaß“ in der Regel?
3. Ist es fair, dass der, der zurückschlägt, genauso Ärger bekommt?
4. Was bringt das Wort „Tabu!“?
5. Würde so eine Regel bei uns funktionieren? Was müsste anders sein?` },
    uebungen: [
        { titel: "Regel aushandeln", dauer: "8 Min",
          text: "Jetzt macht ihr eure eigene Regel – du schreibst nur mit. Schritt für Schritt:\n\n- Was genau ist verboten? (Formulierung gemeinsam finden)\n- Was sagt man, wenn es doch passiert? (Stopp-Wort wie „Tabu!“)\n- Was passiert mit dem, der den Spruch gesagt hat?\n- Was passiert, wenn jemand zurückschlägt?\n\nAbstimmung mit roten und grünen Karten. Erst wenn alle grün zeigen (oder wenigstens keiner rot), kommt es aufs Plakat. Am Ende unterschreiben alle.",
          quiz: "keine",
          folie: "Wir machen **unsere eigene Regel**. 📜\n\nZum Schluss: Halte deine **Ampelkarte** hoch. Erst wenn keiner Rot zeigt, kommt sie aufs Plakat." },
        { titel: "Tabu-Training", dauer: "4 Min",
          text: "Kurzes Training vom Platz aus: Du sagst „Stell dir vor, jemand sagt einen Spruch über deine Familie.“ (Du sagst KEINEN Spruch!) Das Kind antwortet laut „Tabu!“, dreht sich weg und sagt, wohin es jetzt geht (Aufsicht, anderer Spielplatz …). Zwei, drei Kinder probieren es.",
          folie: "Stell dir vor, jemand sagt einen Spruch über deine Familie.\n\nDu sagst laut **„Tabu!“**, drehst dich weg und sagst, wohin du jetzt gehst." }
    ],
    ab34: { titel: "Unser Deal", aufgaben: [
        { typ: "luecken", text: "Unsere Sprach-Regel:", nummern: false, saetze: ["Bei uns ist verboten: ___", "Unser Stopp-Wort: ___"] },
        { typ: "tabelle", text: "Wenn es doch passiert: Was gilt dann für wen? Schreib es daneben.", spalten: ["Wer?", "Was passiert dann?"], zeilen: [["Wer den Spruch sagt", ""], ["Wer ihn hört", ""], ["Wer zurückschlägt", ""]] },
        { typ: "luecken", text: "Mein persönliches Versprechen:", nummern: false, saetze: ["Ich achte darauf, dass ich ___", "Wenn ich doch ausraste, mache ich es wieder gut, indem ich ___"] },
        { typ: "schreiben", text: "Unterschrift und Datum:", zeilen: 1 }
    ]}
})
,
/* ------------------------------------------------------------ */
K({
    id: "k-am-boden",
    titel: "Wer am Boden liegt – Schluss!",
    ziel34: "Begreifen, wie gefährlich Schläge und Tritte gegen den Kopf sind, die absolute Grenze kennen und als Zuschauer Hilfe holen",
    material: "Plakat „Die absoluten Grenzen“ (Arbeitsmaterial)\nTafel: „Was passiert im Kopf?“\nHinweis für dich: Keine Kampfszenen nachspielen. Wenn Kinder von eigenen schweren Prügeleien erzählen, nicht vertiefen – nach der Stunde ansprechen und mit Schulleitung/Schulsozialarbeit abstimmen.",
    materialIds: ["grenzen-gewalt"],
    materialien: { ohneAuto: true },
    lerntext34: { titel: "Ein Tritt zu viel", text:
`Nach der Schule an der Bushaltestelle. Erst gibt es Sprüche, dann fliegen Fäuste. Jason stolpert und fällt hin. Sein Gegner Marco tritt nach – einmal gegen den Rücken, dann gegen den Kopf. Die anderen stehen drumherum. Einige filmen.

Jason steht nicht mehr auf. Er ist kurz bewusstlos, dann übergibt er sich. Ein Erwachsener ruft den Rettungswagen. Im Krankenhaus stellen die Ärzte eine Gehirnerschütterung und eine Blutung im Kopf fest. Jason muss eine Woche bleiben. Noch Monate später hat er Kopfschmerzen und kann sich in der Schule schlecht konzentrieren.

Marco sagt später: „Ich wollte ihn nicht so schlimm verletzen. Ich war einfach so wütend.“ Trotzdem kommt die Polizei, das Jugendamt, und er muss die Schule wechseln. Und einer der Jungs, die zugeschaut haben, sagt leise: „Wir hätten früher was machen müssen.“

**Fragen zum Gespräch:**
1. Ab welchem Moment war aus einer Prügelei etwas Lebensgefährliches geworden?
2. Warum ist ein Tritt gegen den Kopf viel gefährlicher als ein Schlag gegen den Arm?
3. Marco sagt, er wollte das nicht. Ändert das etwas für Jason?
4. Was hätten die Zuschauer tun können – und wann?
5. Wo ist für euch die Grenze, die man NIE überschreitet?` },
    uebungen: [
        { titel: "Was passiert im Kopf?", dauer: "6 Min",
          text: "Du erklärst sachlich (Tafel): Das Gehirn schwimmt im Kopf wie ein Ei in einem Glas Wasser. Bei einem Schlag oder Tritt prallt es gegen den harten Schädel. Folgen können sein: Gehirnerschütterung, Blutung im Kopf, bleibende Schäden beim Lernen, Sprechen, Bewegen – im schlimmsten Fall Tod. **Wer am Boden liegt, kann sich nicht schützen.** Darum gilt überall auf der Welt, auch im Kampfsport: Kopf und am Boden sind tabu.\n\nFrage an die Kinder: Was war euch davon neu?",
          folie: "Das Gehirn schwimmt im Kopf wie ein **Ei im Wasserglas**. 🥚\n\nWas passiert bei einem Schlag oder Tritt?\n\n**Wer am Boden liegt, kann sich nicht schützen.**" },
        { titel: "Die absoluten Grenzen", dauer: "7 Min",
          text: "Gemeinsam die Grenzen festlegen, die bei euch NIE überschritten werden, und aufs Plakat schreiben. Vorschlag:\n\n- Nie gegen den Kopf schlagen oder treten.\n- Wer am Boden liegt: sofort Schluss.\n- Keine Gegenstände, keine Waffen.\n- Nie zu mehreren auf einen.\n\nDann der Zuschauer-Plan: **Nicht filmen – laut „Stopp!“ rufen – sofort einen Erwachsenen holen – wenn jemand nicht mehr reagiert: 112.** Jedes Kind sagt einmal laut vom Platz, was es als Zuschauer tun würde.",
          quiz: "keine",
          folie: "Welche Grenzen gelten bei uns **immer**? 🛑\n\nUnd was tust du als Zuschauer?" }
    ],
    ab34: { titel: "Die absoluten Grenzen", kontext: "Zum Fall: Bei einer Prügelei liegt Jason am Boden. Marco tritt ihm gegen den Kopf. Jason muss eine Woche ins Krankenhaus.", aufgaben: [
        { typ: "ankreuzen", text: "Was kann ein Tritt gegen den Kopf auslösen?", optionen: ["Gehirnerschütterung", "Blutung im Kopf", "Probleme beim Lernen", "bleibende Schäden", "nur eine Beule"], nebeneinander: true },
        { typ: "luecken", text: "Unsere absoluten Grenzen:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "Ich bin Zuschauer bei einer Prügelei. Ich mache:", nummern: true, saetze: ["___", "___", "Wenn jemand nicht mehr reagiert, rufe ich: ___"] },
        { typ: "schreiben", text: "Was würdest du Marco sagen, bevor er zutritt?", zeilen: 2 }
    ]}
})

);
})();
