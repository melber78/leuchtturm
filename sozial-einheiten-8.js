/* ============================================================
   Leuchtturm – Sozialtraining: „Klartext“ Teil 3 – NUR Kl. 3/4
   Reihe „Auf Mutter gehen“: Familien-Beleidigungen und sexualisierte
   Schimpfwörter. Drei Stunden, die aufeinander aufbauen:
   1. Warum trifft das so? – Cool-bleiben-Plan
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
    ziel34: "Verstehen, warum Sprüche über die Familie so treffen, und mit einem eigenen Cool-bleiben-Plan reagieren (Körper bremsen – Kopf-Satz – kurz antworten – weggehen), ohne auszurasten",
    material: "Plakat „Mein Cool-bleiben-Plan“ (Arbeitsmaterial)\nHinweis für dich: Die Wörter selbst werden nicht ausgesprochen und nicht angeschrieben – wir sagen „ein Spruch über die Mutter“ oder „das H-Wort“.",
    materialIds: ["schutzsaetze-familie"],
    lerntext34: { titel: "Der Spruch", text:
`Mittwoch, Hofpause. Anton und Kevin streiten sich, wer beim Fußball dran ist. Kevin merkt, dass er verliert. Da sagt er einen Spruch über Antons Mutter – einen von der übelsten Sorte. Ein paar Jungs johlen.

Anton sieht rot. Er stürzt sich auf Kevin, schlägt zu, immer wieder. Zwei Lehrer müssen ihn wegziehen. Kevin hat Nasenbluten.

Am nächsten Tag sitzt Antons Mutter im Büro der Schulleitung. Anton wird für drei Tage vom Unterricht ausgeschlossen. Als sie rausgehen, weint seine Mutter. „Ich musste mir heute freinehmen. Mein Chef war sauer. Und du sagst, du hast das für mich gemacht?“

Anton versteht die Welt nicht mehr. Er wollte seine Mutter verteidigen. Und jetzt ist sie es, die traurig ist.

Später sagt ihm sein Onkel: „Kevin kennt deine Mutter gar nicht. Der Spruch hat sie nicht getroffen. Aber was du danach gemacht hast – das hat sie getroffen.“

**Fragen zum Gespräch:**
1. Warum hat Kevin ausgerechnet einen Spruch über die Mutter gesagt?
2. Was wollte Kevin damit erreichen? Hat es geklappt?
3. Wen hat der Spruch wirklich getroffen – und wen hat Antons Reaktion getroffen?
4. Was meint der Onkel mit seinem Satz?
5. Was würde deine Mutter (oder wer für dich wichtig ist) sich wünschen, wie du reagierst?` },
    uebungen: [
        { titel: "Warum trifft das so?", dauer: "5 Min",
          text: "Auf der Folie stehen die Gründe, warum ein Spruch über die Mutter so wehtut. Lies sie einzeln vor und frag nach jedem: **Kennt ihr das?** (Daumen hoch, wer das kennt – niemand muss etwas erzählen.)\n\n- 💛 **Sie ist mir am wichtigsten.** Die Mutter ist für viele der wichtigste Mensch – wer sie angreift, trifft das Wichtigste.\n- 🛡️ **Ich will sie beschützen.** Sie ist nicht da und kann sich nicht wehren – also fühle ich mich zuständig.\n- 👀 **Alle haben es gehört.** Vor Zuschauern fühlt es sich an, als müsste ich sofort etwas tun, sonst bin ich der Verlierer.\n- 🔥 **Es geht um Ehre.** Viele haben gelernt: Wer so etwas stehen lässt, ist schwach.\n- 🤐 **Ich kann nichts beweisen.** Der Spruch ist Quatsch – aber dagegen reden hilft nicht. Das macht hilflos und wütend.\n- 🎯 **Und wer weiß genau, dass das dein wunder Punkt ist?** Der, der den Spruch macht. Er will dich steuern.\n\nZum Schluss die entscheidende Frage: **Wer weiß genau, dass das euer wunder Punkt ist?** → Der, der den Spruch macht. Er sucht den Knopf, der am schnellsten wirkt – nicht weil er etwas über deine Mutter weiß, sondern weil er **dich** steuern will.",
          quiz: "liste",
          folie: "Warum tut ein **Spruch über die Mutter** so weh – mehr als jede andere Beleidigung? 🤔",
          kern: ["34"],
          emoji: "🧊",
          warum: "Wir verstehen, warum Sprüche über die Familie so wehtun." },
        { titel: "Stimmt das?", dauer: "4 Min",
          text: "Auf den nächsten Folien kommt je ein Satz über die Geschichte. Du liest ihn vor, auf „3-2-1“ zeigen alle gleichzeitig Daumen hoch (stimmt) oder runter (stimmt nicht). Dann tippst du auf „Auflösen“ und lässt ein Kind kurz begründen.\n\n- Kevin kennt Antons Mutter.\n- Kevin wollte, dass Anton ausrastet.\n- Durch den Spruch ist Antons Mutter jetzt ein schlechterer Mensch.\n- Als Anton zugeschlagen hat, hat Kevin bekommen, was er wollte.\n- Wer ausrastet, beschützt seine Mutter.\n- Wer cool bleibt, hat entschieden – nicht der, der den Spruch gemacht hat.",
          quiz: "daumen",
          antworten: ["👍 stimmt", "👎 stimmt nicht"],
          loesungen: ["2", "1", "2", "1", "2", "1"],
          folie: "Gleich kommen **6 Sätze** über Anton und Kevin.\n\n👍 **Daumen hoch** = stimmt · 👎 **Daumen runter** = stimmt nicht\n\nAlle zeigen gleichzeitig – dann lösen wir auf.",
          kern: ["34"],
          emoji: "🤔",
          warum: "6 Sätze über Anton und Kevin: Stimmt das – oder nicht?" },
        { titel: "Mein Cool-bleiben-Plan", dauer: "5 Min",
          text: "Lange, kluge Sätze kommen in der Wut nicht raus – und wirken auf dem Hof oft schwach. Was hilft, ist ein kurzer Plan in **4 Schritten**, den man vorher kennt. Gehe die Schritte mit der Gruppe durch, jeder Schritt wird einmal **gemeinsam gemacht** (nicht nur besprochen):\n\n- ✊ **Körper bremsen:** Hände in die Hosentaschen oder hinter den Rücken, einen Schritt zurück, ganz lange ausatmen.\n- 🧠 **Kopf-Satz – nur in Gedanken:** „Der kennt meine Mutter gar nicht.“ · „Der will, dass ich ausraste.“ · „Wer cool bleibt, gewinnt.“\n- 😐 **Kurz und lässig antworten – oder gar nicht:** „Okay.“ · „Mhm.“ · „Langweilig.“ · Schulterzucken. Kein Wort über seine Familie!\n- 🚶 **Respekt-Abgang:** umdrehen, weggehen, zur Aufsicht oder zu jemandem, der dir guttut.\n\nDann sucht sich jedes Kind **seinen** Kopf-Satz und **seine** Kurz-Antwort aus und sagt sie einmal laut (die Kurz-Antwort mit Schulterzucken). Wichtig zu sagen: **Weggehen ist nicht feige.** Wer weggeht, hat entschieden – nicht der, der den Spruch gemacht hat.",
          quiz: "liste",
          folie: "Wer auf deine Familie geht, will dich **ausrasten** sehen. 🧊 Gib ihm das nicht – mit diesen 4 Schritten:",
          kern: ["34"],
          emoji: "🧊",
          warum: "Wir machen einen Plan, mit dem du cool bleibst – auch wenn's um deine Familie geht." },
        { titel: "Training mit dem Quatsch-Spruch", dauer: "6 Min",
          text: "Geübt wird **nie** mit einem echten Spruch – sondern mit einem Quatsch-Spruch, der niemandem wehtut. Du schreibst ihn an die Tafel, z. B. **„Deine Mutter trägt Socken!“** oder **„Deine Oma isst Nudeln!“**.\n\nEin Kind kommt nach vorn (freiwillig, per Glücksrad). **Du** sagst den Quatsch-Spruch – möglichst fies betont. Das Kind macht seinen Plan: Hände weg – ausatmen – Kurz-Antwort – Respekt-Abgang zur Tür. Die anderen achten auf **einen** Punkt: War der Körper ruhig?\n\nRunde 2 (für Mutige): Du legst nach („Hast du nicht gehört? Socken!“) – das Kind bleibt beim Plan und geht trotzdem. Applaus für jeden Abgang.\n\nZum Schluss: **Was war schwer?** Meist ist es der Moment, in dem die anderen johlen – genau das ist der Augenblick, in dem der Plan zählt.",
          quiz: "keine",
          folie: "**Training mit dem Quatsch-Spruch** 🧦\n\n„Deine Mutter trägt Socken!“\n\nHände weg – ausatmen – kurz antworten – **Respekt-Abgang**.",
          emoji: "🧦",
          warum: "Wir üben den Plan – mit einem Spruch, der niemandem wehtut." }
    ],
    ab34: { titel: "Meine Familie kriegst du nicht", aufgaben: [
        { typ: "ankreuzen", text: "Warum trifft ein Spruch über die Mutter so hart? Kreuze an, was für dich stimmt.", optionen: ["Sie ist mir am wichtigsten.", "Ich will sie beschützen.", "Es ist vor allen peinlich.", "Es geht um Ehre.", "Ich weiß nicht, was ich sagen soll."] },
        { typ: "tabelle", text: "Was passiert dann? Schreib in jede Spalte, was danach passieren kann.", spalten: ["Wenn ich ausraste …", "Wenn ich ruhig bleibe …"], zeilen: [["", ""], ["", ""]] },
        { typ: "luecken", text: "Mein Cool-bleiben-Plan:", nummern: false, saetze: ["✊ So bremse ich meinen Körper: ___", "🧠 Mein Kopf-Satz: ___", "😐 Meine Kurz-Antwort: ___", "🚶 Dahin gehe ich danach: ___"] },
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
`In der 4a sagen viele Jungs ständig das H-Wort. Beim Fußball, im Chat, sogar zu ihren besten Freunden. „Ist doch normal“, sagt Till.

Eines Tages fragt die Lehrerin ganz ruhig: „Was bedeutet das Wort eigentlich?“ Es wird still. Keiner will es erklären. Till grinst verlegen. Dann sagt Jule: „Das heißt, dass die Mutter von dem anderen eine Frau ist, die für Sex Geld bekommt. Man beleidigt damit gar nicht den Jungen – man beleidigt seine Mutter.“

Die Jungs schauen sich an. Jule sagt weiter: „Und wenn ihr das die ganze Zeit sagt, dann redet ihr über Mütter und Frauen, als wären sie Dreck. Auch über eure eigenen Schwestern und Mütter.“

Till sagt nichts mehr. Später im Chat schreibt er: „Hab nie drüber nachgedacht.“

**Fragen zum Gespräch:**
1. Warum wollte niemand erklären, was das Wort bedeutet?
2. Wen beleidigt das H-Wort eigentlich?
3. Was meint Jule mit „als wären sie Dreck“?
4. Warum sagen Menschen Wörter, deren Bedeutung sie gar nicht genau kennen?
5. Macht es einen Unterschied, ob man ein Schimpfwort „im Spaß“ sagt?` },
    uebungen: [
        { titel: "Wörter-Check (anonym)", dauer: "7 Min",
          text: "Jedes Kind schreibt auf einen Zettel ein Schimpfwort, das es oft hört – ohne Namen. Du sammelst ein, liest NICHTS vor und machst bei jedem Zettel einen Strich in einem der fünf Felder an der Tafel: **Familie · Mädchen & Frauen · Behinderung · Herkunft · Aussehen**.\n\nDann schaut ihr gemeinsam auf die Striche: Welche Gruppe wird am meisten beleidigt? Wer davon sitzt vielleicht mit im Raum oder ist mit uns verwandt? Zettel danach sofort wegwerfen.",
          folie: "Schreib ein Schimpfwort auf, das du oft hörst – **ohne Namen**.\n\nNiemand liest es vor. Wir schauen nur: **Wen trifft es?**",
          kern: ["34"],
          emoji: "🔍",
          warum: "Wir schauen, wen Schimpfwörter wirklich treffen." },
        { titel: "Andere Wörter für Wut", dauer: "5 Min",
          text: "Wut muss raus – aber es geht auch ohne jemanden zu beleidigen. Sammelt zwei Listen:\n\n- **Frust-Wörter**, die niemanden treffen: „Mann ey!“, „Das nervt!“, „Ich raste gleich aus!“, „Boah!“\n- **Fantasie-Schimpfwörter**, die eher zum Lachen bringen als zum Prügeln: „Du Gurkenkopf“, „Du Socken-Dieb“, „Du Wasserkocher“.\n\nAbstimmung: Welches Fantasie-Wort wird unser Gruppenwort?",
          quiz: "keine",
          folie: "Wut muss raus – aber ohne jemanden zu beleidigen.\n\nWelche **Frust-Wörter** und **Fantasie-Schimpfwörter** fallen dir ein? 😄",
          emoji: "😄",
          warum: "Wut muss raus – wir finden andere Wörter dafür." }
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
    material: "Plakat „Unsere Gruppenregeln“ (leer, mit Unterschriften – Arbeitsmaterial)\nPlakat „Mein Cool-bleiben-Plan“\nrote und grüne Karten",
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
          folie: "Wir machen **unsere eigene Regel**. 📜\n\nZum Schluss: Halte die **rote oder grüne Karte** hoch. Erst wenn keiner Rot zeigt, kommt sie aufs Plakat.",
          kern: ["34"],
          emoji: "📜",
          warum: "Wir machen gemeinsam unsere eigene Regel." },
        { titel: "Tabu-Training", dauer: "4 Min",
          text: "Kurzes Training vom Platz aus: Du sagst „Stell dir vor, jemand sagt einen Spruch über deine Familie.“ (Du sagst KEINEN Spruch!) Das Kind antwortet laut „Tabu!“, dreht sich weg und sagt, wohin es jetzt geht (Aufsicht, anderer Spielplatz …). Zwei, drei Kinder probieren es.",
          folie: "Stell dir vor, jemand sagt einen Spruch über deine Familie.\n\nDu sagst laut **„Tabu!“**, drehst dich weg und sagst, wohin du jetzt gehst.",
          emoji: "🛑",
          warum: "Wir üben, was du tust, wenn die Regel gebrochen wird." }
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
          folie: "Das Gehirn schwimmt im Kopf wie ein **Ei im Wasserglas**. 🥚\n\nWas passiert bei einem Schlag oder Tritt?\n\n**Wer am Boden liegt, kann sich nicht schützen.**",
          emoji: "🧠",
          warum: "Wir verstehen, warum Schläge gegen den Kopf so gefährlich sind." },
        { titel: "Die absoluten Grenzen", dauer: "7 Min",
          text: "Gemeinsam die Grenzen festlegen, die bei euch NIE überschritten werden, und aufs Plakat schreiben. Vorschlag:\n\n- Nie gegen den Kopf schlagen oder treten.\n- Wer am Boden liegt: sofort Schluss.\n- Keine Gegenstände, keine Waffen.\n- Nie zu mehreren auf einen.\n\nDann der Zuschauer-Plan: **Nicht filmen – laut „Stopp!“ rufen – sofort einen Erwachsenen holen – wenn jemand nicht mehr reagiert: 112.** Jedes Kind sagt einmal laut vom Platz, was es als Zuschauer tun würde.",
          quiz: "keine",
          folie: "Welche Grenzen gelten bei uns **immer**? 🛑\n\nUnd was tust du als Zuschauer?",
          kern: ["34"],
          emoji: "🛑",
          warum: "Wir legen Grenzen fest, die immer gelten." }
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
