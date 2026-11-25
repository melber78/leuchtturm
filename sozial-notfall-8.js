/* Notfall-Stillarbeit – Teil 8 („Klartext“ Kl. 3/4: Auf Mutter gehen, Schimpfwörter, Sprach-Regel, Am Boden)
   Wie in den Stunden: Die Wörter selbst stehen nirgends auf dem Papier. · Format: sozial-notfall-0.js */
(function () {
const { blatt, schreib, kreuz, daumen, luecken, tabelle, stunde } = window.NF;
const nur34 = (b1, b2, b3) => ({ "34": [b1, b2, b3] });

stunde("k-mutter", nur34(
    blatt("Der Spruch",
        kreuz("Wann sagt Kevin den Spruch über Antons Mutter? Kreuze an.", ["gleich am Anfang des Spiels", "als er merkt, dass er den Streit verliert", "nach der Pause im Klassenzimmer", "im Chat am Abend"]),
        schreib("Was passiert mit Anton nach der Prügelei? Und wie geht es seiner Mutter danach?", 3),
        schreib("Der Onkel sagt: „Der Spruch hat sie nicht getroffen. Aber was du danach gemacht hast – das hat sie getroffen.“ Erkläre.", 4)),
    blatt("Warum trifft das so?",
        schreib("Warum tut ein Spruch über die eigene Mutter oft mehr weh als jeder Spruch über einen selbst?", 3),
        schreib("Was wollte Kevin mit dem Spruch erreichen? Hat es geklappt?", 3),
        daumen("Hilft das in so einem Moment? Kreise ein: 👍 oder 👎.", ["Fäuste aufmachen, Füße fest auf den Boden", "Im Kopf sagen: „Der kennt meine Mutter gar nicht.“", "Sofort zuschlagen", "Kurz antworten („Ist mir zu blöd.“) und weggehen", "Einen noch schlimmeren Spruch zurückgeben"])),
    blatt("Mein Cool-bleiben-Plan",
        tabelle("Schreibe deinen eigenen Plan für den Moment, in dem jemand über deine Familie herzieht.", ["Schritt", "Das mache ich"], [["1. Körper bremsen", ""], ["2. Kopf-Satz", ""], ["3. Kurz antworten", ""], ["4. Weggehen – wohin?", ""]]),
        schreib("Was würde deine Mutter (oder wer für dich wichtig ist) sich wünschen, wie du reagierst?", 3))
));

stunde("k-schimpfwoerter", nur34(
    blatt("Was heißt das eigentlich?",
        kreuz("Was passiert, als die Lehrerin fragt, was das Wort bedeutet? Kreuze an.", ["Alle erklären es sofort.", "Es wird still, keiner will es erklären.", "Alle lachen laut.", "Die Lehrerin schreibt es an die Tafel."]),
        schreib("Jule sagt: „Man beleidigt damit gar nicht den Jungen.“ Wen beleidigt man – und warum ist das so schlimm?", 3),
        schreib("Till schreibt: „Hab nie drüber nachgedacht.“ Warum benutzen viele solche Wörter, ohne nachzudenken?", 3)),
    blatt("Was Wörter sagen",
        daumen("Stimmt das? Kreise ein: 👍 oder 👎.", ["Wörter, die alle sagen, sind automatisch harmlos.", "Manche Schimpfwörter machen Frauen und Mütter schlecht.", "Auch „im Spaß“ kommt die Bedeutung beim anderen an.", "Wenn man die Bedeutung kennt, kann man sich bewusst entscheiden.", "Unter besten Freunden ist jedes Wort okay."]),
        schreib("Jule sagt, dass man damit auch über die eigenen Schwestern und Mütter redet. Was meint sie?", 3)),
    blatt("Meine Sprache",
        luecken("", ["Wenn ich richtig sauer bin, sage ich oft ___ (ohne Schimpfwort aufschreiben)", "Statt eines Schimpfworts könnte ich sagen: „___“", "Mich stört an Schimpfwörtern, dass ___"]),
        schreib("Schreibe drei Sätze, mit denen man zeigen kann, dass man wütend ist – ganz ohne Schimpfwörter.", 4))
));

stunde("k-sprachregel", nur34(
    blatt("Die 4b macht einen Deal",
        kreuz("Womit fing es in der 4b fast immer an, bevor es eine Prügelei gab? Kreuze an.", ["mit Streit um den Ball", "mit einem Spruch über die Familie", "mit Streit im Unterricht", "mit einem Handyvideo"]),
        tabelle("Was steht auf dem Plakat: Was passiert, wenn es doch jemand sagt?", ["Nr.", "Regel"], [["1", ""], ["2", ""], ["3", ""]]),
        schreib("Warum war es wichtig, dass die Klasse die Regel selbst gemacht hat – und nicht die Lehrerin?", 3)),
    blatt("Funktioniert die Regel?",
        schreib("Nach vier Wochen gab es nur noch zwei Prügeleien. Was war bei diesen beiden Malen anders?", 3),
        schreib("Regel 3: Wer zurückschlägt, hat genauso Ärger wie der, der den Spruch gesagt hat. Ist das fair? Begründe.", 4),
        daumen("Passt das zur Regel „Familie ist tabu“? Kreise ein: 👍 oder 👎.", ["„Tabu!“ sagen und weggehen", "Sich am selben Tag entschuldigen", "„War doch nur Spaß!“", "Sofort zurückschlagen"])),
    blatt("Unsere Regel",
        luecken("", ["Für unsere Klasse wäre diese Regel ___, weil ___", "Am schwersten einzuhalten wäre für mich ___", "Mir würde helfen, wenn ___"]),
        schreib("Schreibe eine eigene Sprach-Regel für deine Klasse – mit dem, was passiert, wenn sie gebrochen wird.", 4))
));

stunde("k-am-boden", nur34(
    blatt("Ein Tritt zu viel",
        kreuz("Was machen die anderen, als Jason am Boden liegt? Kreuze an.", ["Sie gehen dazwischen.", "Sie stehen drumherum, einige filmen.", "Sie holen sofort einen Lehrer.", "Sie rufen den Rettungswagen."]),
        schreib("Welche Verletzungen hat Jason – und welche Folgen hat das noch Monate später?", 3),
        schreib("Marco sagt: „Ich wollte ihn nicht so schlimm verletzen.“ Warum ändert das nichts an den Folgen?", 3)),
    blatt("Absolute Grenzen",
        daumen("Stimmt das? Kreise ein: 👍 oder 👎.", ["Wer am Boden liegt, ist wehrlos – dann ist Schluss.", "Tritte gegen den Kopf können lebensgefährlich sein.", "Wer filmt, hilft niemandem.", "Wenn der andere angefangen hat, ist Nachtreten okay.", "Zuschauer können Hilfe holen oder laut „Stopp!“ rufen."]),
        schreib("Einer der Zuschauer sagt: „Wir hätten früher was machen müssen.“ Was hätten die Zuschauer tun können? Nenne drei Dinge.", 4)),
    blatt("Was ich tue",
        luecken("", ["Wenn ich sehe, dass jemand am Boden liegt, mache ich ___", "Hilfe hole ich bei ___", "Notruf für den Rettungswagen: ___"]),
        schreib("Warum ist es so schwer, in so einem Moment aufzuhören oder einzugreifen? Was kann dir helfen?", 4))
));
})();
