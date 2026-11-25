/* Notfall-Stillarbeit – Teil 3 (Freundschaft, Regeln & Miteinander) · Format: sozial-notfall-0.js */
(function () {
const { blatt, schreib, kreuz, daumen, luecken, zuordnen, tabelle, stimmt, gesichter, gefuehle, malen, stunde } = window.NF;
const fairUnfair = (text, saetze) => ({ ...tabelle(text, ["Was passiert?", "fair", "unfair"], saetze.map(s => [s, "", ""])), kreuz: [1, 2] });

stunde("v-mitspielen-lassen", {
    "12": [
        blatt("Der kleine Hase",
            stimmt("Stimmt das? Kreuze an.", ["Der Hase darf gleich mitspielen.", "Der Bär sagt: „Du bist zu klein.“", "Die Schildkröte spielt mit dem Hasen.", "Der Hase holt den Ball aus dem Busch."]),
            gesichter("Male: So fühlt sich der Hase unter dem Baum – und so am Ende.", ["unter dem Baum", "am Ende"], true)),
        blatt("Darf ich mitspielen?",
            zuordnen("Wer hat was gemacht? Verbinde.", ["der Bär", "die Schildkröte", "der Hase"], ["holt den Ball.", "sagt zuerst Nein.", "spielt mit dem Hasen."]),
            daumen("Was ist nett? Kreise ein: 👍 oder 👎.", ["„Komm, spiel mit!“", "„Du bist zu klein.“", "„Wir brauchen noch jemanden.“", "„Geh weg!“", "„Ich zeige dir das Spiel.“"]),
            schreib("Ein Kind steht allein. Was sagst du zu ihm?", 2)),
        blatt("Ich lade ein",
            luecken("", ["Ich spiele gern ___", "Mitspielen darf ___"]),
            malen("Male dich und ein anderes Kind beim Spielen."))
    ],
    "34": [
        blatt("Der Club der Sterne",
            kreuz("Warum darf Maya nicht in den Club? Kreuze an.", ["Sie ist zu jung für den Club.", "Sie hat keinen Glitzer-Sticker.", "Sie hat sich mit Lisa gestritten.", "Sie will lieber allein sein."]),
            schreib("Woran merkt man, dass es Maya schlecht geht? Nenne zwei Dinge.", 2),
            schreib("Hanna sagt: „Das war nur Spaß.“ Lisa antwortet: „Für Maya nicht.“ Erkläre, was Lisa meint.", 3)),
        blatt("Fair oder unfair?",
            fairUnfair("Fair oder unfair? Kreuze an.", ["Zwei Kinder spielen Schach – das geht nur zu zweit.", "Alle drehen sich weg, wenn Ida kommt.", "„Nur wer teure Schuhe hat, darf mitspielen.“", "„Das Team ist voll – nächste Runde bist du dabei.“", "Ein Kind wird beim Wählen absichtlich immer übergangen."]),
            schreib("Ist es okay, einen besten Freund oder eine beste Freundin zu haben? Wo ist der Unterschied zum Ausgrenzen?", 4)),
        blatt("Niemand bleibt draußen",
            luecken("Denk an eine Situation, in der jemand draußen bleiben musste (du darfst auch etwas Ausgedachtes schreiben).", ["Das ist passiert: ___", "Die Person hat sich ___ gefühlt.", "Geholfen hätte, wenn ___"]),
            schreib("Schreibe eine Regel für die Pause, damit niemand allein bleibt.", 2),
            schreib("Was kannst du tun, wenn du morgen ein Kind allein am Rand stehen siehst?", 3))
    ]
});

stunde("v-teilen", {
    "12": [
        blatt("Mats und die Buntstifte",
            stimmt("Stimmt das? Kreuze an.", ["Mats hat neue Buntstifte.", "Nele hat ihre Stifte dabei.", "Mats teilt seine Stifte.", "Nele teilt ihren Apfel."]),
            kreuz("Warum ist Nele traurig? Kreuze an.", ["Sie hat keinen Stift.", "Sie hat Hunger.", "Sie hat sich wehgetan."])),
        blatt("Teilen macht froh",
            gesichter("Wie fühlt sich Nele? Male die Gesichter.", ["ohne Stift", "mit Stift"], true),
            daumen("Was ist gut? Kreise ein: 👍 oder 👎.", ["Ich leihe meinen Stift aus.", "Ich nehme alle Stifte für mich.", "Wir malen zusammen.", "Ich passe auf geliehene Sachen auf.", "Ich mache einen Stift kaputt."]),
            schreib("Was hast du schon einmal geteilt?", 2)),
        blatt("Ich teile",
            luecken("", ["Ich teile gern ___"]),
            malen("Male, wie du etwas mit einem anderen Kind teilst."))
    ],
    "34": [
        blatt("Sieben Muffins für acht",
            kreuz("Was ist das Problem in der Gruppe? Kreuze an.", ["Die Muffins schmecken nicht.", "Es gibt sieben Muffins, aber acht Kinder.", "Aras will gar nichts abgeben.", "Jule hat die Muffins vergessen."]),
            schreib("Wie löst Mira das Problem? Warum sind alle einverstanden?", 3),
            schreib("Mira teilt ihr Tagebuch nicht. Ist das in Ordnung? Begründe.", 3)),
        blatt("Was muss man teilen?",
            tabelle("Sortiere die Dinge aus dem Wortspeicher: Was kann man teilen – was gehört nur mir?", ["Kann man teilen", "Gehört nur mir / ist privat"], [["", ""], ["", ""], ["", ""], ["", ""]],
                ["Pausenbrot", "Tagebuch", "Passwort", "Buntstifte", "Spielzeit am Klettergerüst", "Geheimnis einer Freundin", "Ball", "Handy-PIN"]),
            schreib("Aras sagt: „Ich habe gebacken, also bekomme ich zwei!“ Ist das gerecht? Schreibe deine Meinung.", 3)),
        blatt("Gerecht teilen",
            luecken("", ["Teilen fällt mir leicht bei ___", "Teilen fällt mir schwer bei ___, weil ___", "Einmal hat jemand mit mir geteilt: ___"]),
            schreib("Fünf Kinder, aber nur drei Tablets für ein Spiel. Schreibe einen fairen Plan.", 4))
    ]
});

stunde("v-neue-freunde", {
    "12": [
        blatt("Das neue Kind",
            stimmt("Stimmt das? Kreuze an.", ["Noa ist neu in der Klasse.", "Noa kennt schon alle.", "Kim geht zu Noa.", "Beide haben eine Katze."]),
            zuordnen("Wie heißen die Katzen? Verbinde.", ["Noas Katze", "Kims Katze"], ["heißt Tiger.", "heißt Mimi."])),
        blatt("Hallo, wie heißt du?",
            gesichter("Wie fühlt sich Noa? Male die Gesichter.", ["allein", "mit Kim"], true),
            daumen("So findet man Freunde. Kreise ein: 👍 oder 👎.", ["„Hallo, wie heißt du?“", "Ich drehe mich weg.", "„Was spielst du gern?“", "Ich lache das Kind aus.", "„Willst du mitspielen?“"]),
            schreib("Was fragst du ein neues Kind?", 2)),
        blatt("Mein Freund, meine Freundin",
            luecken("", ["Ich mag gern ___"]),
            malen("Male dich und ein Kind, mit dem du gern spielst."))
    ],
    "34": [
        blatt("Jakob zieht um",
            kreuz("Warum fühlt sich Jakob in der neuen Klasse „wie unsichtbar“? Kreuze an.", ["Er kennt dort niemanden.", "Er sitzt ganz hinten.", "Er ist zu klein.", "Er will keine Freunde."]),
            schreib("Beim ersten Versuch klappt es nicht. Was rät ihm seine Mutter?", 2),
            schreib("Wie schafft es Jakob am nächsten Tag, mit Ole ins Gespräch zu kommen?", 3)),
        blatt("Gesprächsstarter",
            daumen("Guter Start für ein Gespräch? Kreise ein: 👍 oder 👎.", ["„Hey, was spielst du da?“", "„Warum bist du so komisch?“", "„Cooles T-Shirt – magst du die Band?“", "„Du bist doch der Neue, oder? Langweilig hier, was?“", "„Willst du bei uns mitspielen?“"]),
            schreib("Jemand antwortet nur kurz: „Weiß nicht.“ Was kannst du dann machen?", 3),
            schreib("Warum hat Jakob nicht aufgegeben? Was hat ihm geholfen?", 3)),
        blatt("Ich und neue Leute",
            luecken("", ["Neue Leute anzusprechen finde ich ___", "Am meisten interessiere ich mich für ___", "Darüber könnte ich mit einem neuen Kind reden: ___"]),
            schreib("Ein neues Kind kommt in deine Klasse. Schreibe drei Dinge, die du tun kannst, damit es sich wohlfühlt.", 4))
    ]
});

stunde("v-hoeflichkeit", {
    "12": [
        blatt("Kobold Grummel",
            stimmt("Stimmt das? Kreuze an.", ["Grummel ist immer freundlich.", "Der Igel gibt Grummel zuerst kein Brot.", "Die Maus erklärt die Zauberwörter.", "Am Ende lächelt Grummel."]),
            kreuz("Welche Zauberwörter sagt die Maus? Kreuze an.", ["Bitte", "Gib her", "Danke", "Hallo", "Sofort"], true)),
        blatt("Die Zauberwörter",
            daumen("Höflich oder unhöflich? Kreise ein: 👍 oder 👎.", ["„Gibst du mir bitte den Kleber?“", "„Her damit!“", "„Danke für deine Hilfe.“", "„Guten Morgen!“", "„Weg da!“"]),
            luecken("Setze das richtige Zauberwort ein: Bitte – Danke – Hallo", ["Kannst du mir ___ helfen?", "___ für das Geschenk!", "___, Oma!"])),
        blatt("Ich bin höflich",
            schreib("Welches Zauberwort sagst du heute? Schreibe es.", 1),
            malen("Male, wie du jemandem „Danke“ sagst."))
    ],
    "34": [
        blatt("Das Land ohne Höflichkeit",
            kreuz("Was passiert in Lillys Traum? Kreuze alles an, was stimmt.", ["Der Bruder reißt ihr die Cornflakes weg.", "Der Busfahrer grüßt freundlich.", "Niemand sagt „Entschuldigung“.", "In der Schule ist alles friedlich.", "Ständig gibt es Streit."]),
            schreib("Lilly denkt: „Ohne die kleinen Wörter fühlt sich alles kalt an.“ Erkläre, was sie damit meint.", 3),
            schreib("Warum grinst Lilly beim Frühstück so breit?", 2)),
        blatt("Höflich – aber wie?",
            zuordnen("Was passt? Verbinde die Situation mit dem höflichen Satz.", ["Du rempelst jemanden an.", "Du brauchst einen Stift.", "Jemand hält dir die Tür auf.", "Du kommst morgens in die Klasse."], ["„Guten Morgen!“", "„Danke!“", "„Entschuldigung!“", "„Kann ich bitte einen Stift haben?“"]),
            schreib("Schreibe den unhöflichen Satz höflich auf: „Gib her, das ist meins!“", 2),
            schreib("Ist Höflichkeit nur etwas für Kleine? Schreibe deine Meinung und begründe sie.", 3)),
        blatt("Mein Tag mit Höflichkeit",
            luecken("", ["Zu Hause sage ich oft ___", "Mir fällt Höflichkeit schwer, wenn ___", "Ich merke, dass jemand höflich zu mir ist, wenn ___"]),
            schreib("Schreibe auf, wie dein Morgen im „Land ohne Höflichkeit“ wäre – vom Aufstehen bis zur Schule.", 5))
    ]
});

stunde("v-verantwortung", {
    "12": [
        blatt("Die Klassenpflanze",
            stimmt("Stimmt das? Kreuze an.", ["Die Pflanze heißt Fridolin.", "Tim hat den Gieß-Dienst.", "Tim gießt jeden Tag.", "Tim sagt es der Lehrerin."]),
            kreuz("Was macht Tim, damit er nicht mehr vergisst? Kreuze an.", ["Er malt einen Erinnerungs-Zettel.", "Er gibt den Dienst ab.", "Er schimpft mit der Pflanze."])),
        blatt("Das war meine Aufgabe",
            gesichter("Wie fühlt sich Tim? Male die Gesichter.", ["schlappe Pflanze", "Pflanze steht wieder"], true),
            daumen("Verantwortung übernehmen. Kreise ein: 👍 oder 👎.", ["„Das war ich. Es tut mir leid.“", "Ich sage nichts und gehe weg.", "Ich mache es wieder gut.", "Ich sage: „Das war jemand anders.“", "Ich mache meinen Dienst."]),
            schreib("Welchen Dienst hast du in der Klasse oder zu Hause?", 2)),
        blatt("Mein Dienst",
            luecken("", ["Ich kümmere mich um ___"]),
            malen("Male dich bei deinem Dienst."))
    ],
    "34": [
        blatt("Die kaputte Scheibe",
            kreuz("Warum kann Selma zu Hause nicht stillsitzen? Kreuze an.", ["Sie hat die Scheibe selbst kaputt geschossen.", "Sie hat mitgespielt und Herr Schulze ist immer nett.", "Sie hat Angst vor Hannes.", "Sie will den Ball zurück."]),
            schreib("Hannes will es zuerst nicht sagen. Warum nicht?", 2),
            schreib("Herr Schulze sagt: „Das ist mir mehr wert als die Scheibe.“ Was meint er?", 3)),
        blatt("Wer ist verantwortlich?",
            tabelle("Wer trägt Verantwortung? Schreibe deine Antwort in die rechte Spalte.", ["Situation", "Wer ist verantwortlich – und was sollte er tun?"], [["Du leihst dir ein Buch und es wird nass.", ""], ["Dein Hund macht auf den Gehweg.", ""], ["Eure Gruppe lässt den Werkraum unordentlich zurück.", ""], ["Dein Freund schubst jemanden, du lachst mit.", ""]]),
            schreib("Paul ruft: „Weg hier!“ und rennt davon. Was hätte er besser gemacht?", 3)),
        blatt("Ich stehe dazu",
            luecken("", ["Einmal habe ich Mist gebaut und es zugegeben: ___", "Danach habe ich mich ___ gefühlt.", "Zugeben ist schwer, weil ___"]),
            schreib("Schreibe auf, wofür du in deinem Leben schon Verantwortung trägst (zu Hause, in der Schule, bei Freunden).", 4))
    ]
});

stunde("v-pause-fair", {
    "12": [
        blatt("Das Klettergerüst",
            stimmt("Stimmt das? Kreuze an.", ["Alle drängeln am Klettergerüst.", "Leo fällt hin und weint.", "Die Aufsicht sagt: „Macht eine Schlange.“", "Am Ende wird wieder geschubst."]),
            kreuz("Was ist die neue Regel? Kreuze an.", ["Der Stärkste darf zuerst.", "Einer nach dem anderen.", "Keiner darf klettern."])),
        blatt("Faire Pause",
            daumen("Fair oder nicht fair? Kreise ein: 👍 oder 👎.", ["Ich stelle mich hinten an.", "Ich schubse, damit ich zuerst dran bin.", "Ich warte, bis ich dran bin.", "Ich lasse ein kleines Kind vor.", "Ich drängle mich vor."]),
            gesichter("Wie fühlt sich Leo? Male die Gesichter.", ["beim Drängeln", "in der Schlange"], true)),
        blatt("Meine Pause",
            luecken("", ["In der Pause spiele ich gern ___"]),
            malen("Male eine faire Pause auf dem Schulhof."))
    ],
    "34": [
        blatt("Der Fußballplatz",
            kreuz("Was ist das Problem auf dem Schulhof? Kreuze an.", ["Der Fußballplatz ist kaputt.", "Die Viertklässler besetzen den Platz jeden Tag.", "Niemand will Fußball spielen.", "Die Aufsicht verbietet Fußball."]),
            schreib("Merle bleibt ruhig und bringt das Problem in den Schülerrat. Warum ist das klüger als ein Streit auf dem Platz?", 3),
            schreib("Was merken die Viertklässler am Donnerstag?", 2)),
        blatt("Ein fairer Plan",
            fairUnfair("Fair oder unfair? Kreuze an.", ["„Wir waren zuerst da, also gehört der Platz uns – jeden Tag.“", "Jede Klasse hat einen festen Tag.", "Die Großen bestimmen alle Regeln allein.", "Wer sich nicht an den Plan hält, setzt eine Pause aus.", "„Ihr seid zu schlecht, ihr dürft nicht mitspielen.“"]),
            schreib("Auf eurem Schulhof gibt es Streit um die Tischtennisplatte. Schreibe einen fairen Plan.", 4)),
        blatt("Meine Pause",
            luecken("", ["In der Pause ärgere ich mich manchmal über ___", "Eine faire Lösung wäre ___", "Ich kann dazu beitragen, indem ich ___"]),
            schreib("Stell dir vor, du bist im Schülerrat. Welches Pausen-Problem würdest du ansprechen – und wie?", 4))
    ]
});
})();
