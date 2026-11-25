/* Notfall-Stillarbeit – Teil 4 (Selbstwert & Stärken, Kommunikation) · Format: sozial-notfall-0.js */
(function () {
const { blatt, schreib, kreuz, daumen, luecken, zuordnen, tabelle, stimmt, gesichter, gefuehle, malen, stunde } = window.NF;

stunde("v-meine-staerken", {
    "12": [
        blatt("Erna, die Ente",
            stimmt("Stimmt das? Kreuze an.", ["Erna kann schnell rennen.", "Erna denkt: „Ich kann gar nichts.“", "Der Hut fällt ins Wasser.", "Erna holt den Hut zurück."]),
            zuordnen("Wer kann was gut? Verbinde.", ["der Hase", "das Eichhörnchen", "die Ente"], ["schwimmen", "klettern", "rennen"])),
        blatt("Jeder kann etwas",
            gesichter("Wie fühlt sich Erna? Male die Gesichter.", ["„Ich kann nichts.“", "am Teich"], true),
            kreuz("Was kannst du gut? Kreuze an.", ["malen", "rennen", "zuhören", "helfen", "lachen", "bauen"], true),
            schreib("Was kannst du noch gut?", 1)),
        blatt("Meine Stärke",
            luecken("", ["Ich kann gut ___"]),
            malen("Male dich, wie du etwas richtig gut kannst."))
    ],
    "34": [
        blatt("Die Stärken-Liste",
            kreuz("Warum denkt Oskar, dass er nichts kann? Kreuze alles an, was stimmt.", ["Er hat in Mathe eine Vier.", "Er hat keine Freunde.", "Er wird beim Sport als Letzter gewählt.", "Sein Diktat war voller Fehler."]),
            schreib("Welche Stärken stehen auf Oskars Zetteln? Schreibe drei auf.", 3),
            schreib("Frau Lindner sagt: „Stärken sind nicht nur Noten.“ Was meint sie?", 3)),
        blatt("Stärken gibt es viele",
            tabelle("Sortiere die Stärken aus dem Wortspeicher.", ["Schule & Sport", "Wie man mit anderen umgeht"], [["", ""], ["", ""], ["", ""], ["", ""]],
                ["gut rechnen", "zuhören", "schnell laufen", "trösten", "schön schreiben", "ehrlich sein", "gut zeichnen", "andere zum Lachen bringen"]),
            schreib("Warum sieht man die eigenen Stärken oft selbst nicht?", 3)),
        blatt("Meine Stärken-Liste",
            luecken("", ["Darin bin ich gut: ___", "Das sagen andere über mich: ___", "Diese Stärke zeige ich, wenn ich mit anderen zusammen bin: ___"]),
            schreib("Schreibe einem Kind aus deiner Klasse einen „Stärken-Zettel“ wie in der Geschichte (ohne Namen).", 3),
            schreib("Welche Stärke möchtest du noch entwickeln? Wie?", 2))
    ]
});

stunde("v-mutig-sein", {
    "12": [
        blatt("Leo, der leise Löwe",
            stimmt("Stimmt das? Kreuze an.", ["Leo brüllt ganz laut.", "Die anderen Löwen lachen Leo aus.", "Eine Maus steckt fest.", "Leo fragt den Elefanten um Hilfe."]),
            kreuz("Wer zieht die Maus heraus? Kreuze an.", ["der Löwe", "der Elefant", "die Eule"])),
        blatt("Mutig sein",
            gesichter("Wie fühlt sich Leo? Male die Gesichter.", ["vor dem Elefanten", "am Ende"], true),
            daumen("Ist das mutig? Kreise ein: 👍 oder 👎.", ["einem Kind helfen", "laut brüllen", "um Hilfe fragen", "„Stopp!“ sagen", "jemanden schubsen"])),
        blatt("Ich bin mutig",
            luecken("", ["Ich war mutig, als ___"]),
            malen("Male dich, wie du mutig bist."))
    ],
    "34": [
        blatt("Mutig oder leichtsinnig?",
            kreuz("Warum sagt die Lehrerin, dass Kevin leichtsinnig war? Kreuze an.", ["Er hat sich in Gefahr gebracht, um bewundert zu werden.", "Er hatte große Angst.", "Er hat Ben geholfen.", "Er war zu langsam."]),
            schreib("Was macht Jule, obwohl ihr Herz klopft?", 2),
            schreib("Warum nennt die Lehrerin Jule mutig – und nicht Kevin?", 3)),
        blatt("Mutig – leichtsinnig – feige?",
            tabelle("Was ist das? Schreibe: mutig, leichtsinnig oder wegschauen.", ["Situation", "Das ist …"], [["Bei Rot über eine volle Straße rennen, weil die anderen zuschauen", ""], ["Sagen „Das ist nicht lustig“, wenn jemand ausgelacht wird", ""], ["Weggehen, wenn alle über ein Kind herziehen, und nichts sagen", ""], ["Zugeben, dass man etwas kaputt gemacht hat", ""], ["Von einer hohen Mauer springen, weil jemand „Feigling“ ruft", ""]]),
            schreib("Alle anderen schauen weg, als Bens Kuscheltier geworfen wird. Warum tun Menschen das?", 3)),
        blatt("Mein Mut",
            luecken("", ["Mut bedeutet für mich ___", "Einmal war ich mutig, als ___", "Mut würde ich gern zeigen, wenn ___"]),
            schreib("Kennst du jemanden, der wirklich mutig ist? Schreibe, was er oder sie getan hat.", 4))
    ]
});

stunde("v-fehler-lernhelfer", {
    "12": [
        blatt("Pia und das Fahrrad",
            stimmt("Stimmt das? Kreuze an.", ["Pias Fahrrad hat Stützräder.", "Pia fällt hin.", "Papa ist auch oft hingefallen.", "Am Abend fährt Pia allein."]),
            kreuz("Was sagt Papa? Kreuze an.", ["„Du kannst das nie.“", "„Du kannst es noch nicht.“", "„Hör auf damit.“"])),
        blatt("Fehler helfen",
            gesichter("Wie fühlt sich Pia? Male die Gesichter.", ["hingefallen", "allein gefahren"], true),
            daumen("Was hilft beim Lernen? Kreise ein: 👍 oder 👎.", ["noch einmal probieren", "aufgeben", "um Hilfe bitten", "schimpfen und werfen", "üben, üben, üben"])),
        blatt("Das lerne ich gerade",
            luecken("", ["Ich kann noch nicht ___"]),
            malen("Male dich beim Üben."))
    ],
    "34": [
        blatt("Das Wörtchen „noch“",
            kreuz("Was flüstert Emil, als er die Fünf sieht? Kreuze an.", ["„Das war Pech.“", "„Ich bin zu dumm für Rechtschreibung.“", "„Die Lehrerin ist schuld.“", "„Egal, ich übe einfach.“"]),
            schreib("Frau Brandt sagt: „Der erste Satz ist eine Sackgasse. Der zweite ist ein Weg.“ Erkläre das.", 3),
            schreib("Was zeigen Emil seine Fehler? Was macht er dann?", 3)),
        blatt("Aus Fehlern lernen",
            tabelle("Mach aus jedem Sackgassen-Satz einen Weg-Satz.", ["Sackgasse", "Weg"], [["„Ich kann das nicht.“", ""], ["„Ich bin schlecht in Mathe.“", ""], ["„Das schaffe ich nie.“", ""], ["„Ich gebe auf.“", ""]]),
            schreib("Thomas Edison hat sehr viele Versuche gebraucht. Warum hat er nicht aufgegeben?", 3)),
        blatt("Meine Fehler – meine Lernhelfer",
            luecken("", ["Einen Fehler mache ich oft bei ___", "Das kann ich üben: ___", "Ich habe schon etwas gelernt, das am Anfang schwer war: ___"]),
            schreib("Schreibe dir selbst einen Satz, den du sagst, wenn etwas nicht klappt.", 2),
            schreib("Warum lachen manche Kinder über Fehler von anderen? Wie sollte man darauf reagieren?", 3))
    ]
});

stunde("v-stolz-auf-mich", {
    "12": [
        blatt("Junas Schleife",
            stimmt("Stimmt das? Kreuze an.", ["Juna will ihre Schuhe zubinden.", "Es klappt sofort.", "Juna übt jeden Morgen.", "Am Ende hält die Schleife."]),
            kreuz("Warum ist Juna stolz? Kreuze an.", ["Sie hat lange geübt und es geschafft.", "Sie hat neue Schuhe.", "Papa hat die Schleife gemacht."])),
        blatt("Stolz sein",
            gesichter("Wie fühlt sich Juna? Male die Gesichter.", ["Schleife geht auf", "Schleife hält"], true),
            daumen("Darauf kann man stolz sein. Kreise ein: 👍 oder 👎.", ["Ich habe lange geübt.", "Ich habe jemandem geholfen.", "Ich habe ein Kind ausgelacht.", "Ich habe nicht aufgegeben.", "Ich habe etwas Neues gelernt."])),
        blatt("Ich bin stolz",
            luecken("", ["Ich bin stolz, weil ___"]),
            malen("Male etwas, auf das du stolz bist."))
    ],
    "34": [
        blatt("Stolz oder Angeber?",
            kreuz("Warum gehen die Kinder von Leonie weg? Kreuze an.", ["Sie hat nicht gewonnen.", "Sie tut so, als wären alle anderen schlecht.", "Sie hat ihr Buch nicht gezeigt.", "Sie ist zu leise."]),
            schreib("Wie zeigt Max, dass er stolz ist? Was ist anders als bei Leonie?", 3),
            schreib("Max sagt erst „War nur Glück“ und dann „Danke, ich habe viel geübt.“ Warum ist der zweite Satz besser?", 3)),
        blatt("Stolz – angeben – kleinmachen",
            tabelle("Was ist das? Schreibe: stolz, angeben oder kleinmachen.", ["Satz", "Das ist …"], [["„Ich habe geübt und jetzt klappt es.“", ""], ["„Ihr seid alle schlechter als ich.“", ""], ["„Ach, das war nichts Besonderes.“ (nach viel Arbeit)", ""], ["„Ich freue mich über meine Zwei.“", ""], ["„Ich bin halt einfach der Beste.“", ""]]),
            schreib("Darf man zeigen, dass man stolz ist? Wo ist die Grenze zum Angeben?", 3)),
        blatt("Darauf bin ich stolz",
            luecken("", ["Darauf bin ich stolz: ___", "Dafür habe ich geübt / mich angestrengt: ___", "Wenn mich jemand lobt, sage ich ___"]),
            schreib("Fatma sagt Leonie ehrlich ihre Meinung. Schreibe auf, was Leonie jetzt tun könnte.", 4))
    ]
});

stunde("v-zuhoeren", {
    "12": [
        blatt("Olga, die Eule",
            stimmt("Stimmt das? Kreuze an.", ["Die Maus hat einen Käse gefunden.", "Der Fuchs hört gut zu.", "Olga schaut die Maus an.", "Olga redet dazwischen."]),
            kreuz("Warum erzählen alle Olga gern etwas? Kreuze an.", ["Sie ist groß.", "Sie hört richtig zu.", "Sie hat viel Käse."])),
        blatt("Richtig zuhören",
            daumen("So hört man richtig zu. Kreise ein: 👍 oder 👎.", ["anschauen", "dazwischenreden", "nicken", "laut klopfen", "eine Frage stellen"]),
            gesichter("Wie fühlt sich die Maus? Male die Gesichter.", ["beim Fuchs", "bei Olga"], true)),
        blatt("Ich höre zu",
            luecken("", ["Ich höre gut zu, wenn ___"]),
            malen("Male, wie du einem Kind richtig zuhörst."))
    ],
    "34": [
        blatt("Hörst du mir überhaupt zu?",
            kreuz("Woran merkt Ben, dass Lea nicht zuhört? Kreuze alles an, was stimmt.", ["Sie malt weiter.", "Sie fragt nach seiner Oma.", "Sie schaut aus dem Fenster.", "Sie wechselt das Thema."]),
            schreib("Was macht Kai, damit Ben merkt: Er hört mir zu? Nenne drei Dinge.", 3),
            schreib("Ben fühlt sich, „als hätte er mit einer Wand gesprochen“. Kennst du das Gefühl? Beschreibe.", 3)),
        blatt("Zuhören wie ein Profi",
            daumen("Ist das gutes Zuhören? Kreise ein: 👍 oder 👎.", ["Ich lege mein Handy weg.", "Ich erzähle sofort meine eigene Geschichte.", "Ich frage nach: „Wie meinst du das?“", "Ich gebe gleich Ratschläge.", "Ich sage mit eigenen Worten, was ich verstanden habe."]),
            schreib("Warum hilft es Ben, dass Kai nachfragt: „Wie geht es ihr jetzt?“", 3)),
        blatt("Ich und das Zuhören",
            luecken("", ["Zuhören fällt mir leicht bei ___", "Zuhören fällt mir schwer, wenn ___", "Ich merke, dass mir jemand zuhört, wenn ___"]),
            schreib("Lea entschuldigt sich am Nachmittag. Was hältst du von ihrer Entschuldigung? Begründe.", 3))
    ]
});

stunde("v-komplimente", {
    "12": [
        blatt("Die Kompliment-Kiste",
            stimmt("Stimmt das? Kreuze an.", ["Frau Sonne hat eine Kiste mitgebracht.", "Max hat gute Laune.", "Lina lobt Max' Papierflieger.", "Max lächelt am Ende."]),
            kreuz("Was sagt Max zu Paula? Kreuze an.", ["„Du hast mir deinen Stift geliehen.“", "„Du bist doof.“", "„Du hast schöne Schuhe.“"])),
        blatt("Nette Worte",
            daumen("Ist das ein Kompliment? Kreise ein: 👍 oder 👎.", ["„Du malst toll.“", "„Du bist zu langsam.“", "„Danke für deine Hilfe.“", "„Dein Lachen ist schön.“", "„Mit dir spiele ich nicht.“"]),
            gesichter("Wie fühlt sich Max? Male die Gesichter.", ["Arme verschränkt", "nach dem Kompliment"], true)),
        blatt("Mein Kompliment",
            luecken("", ["Ich finde toll, dass du ___"]),
            malen("Male, wie du einem Kind ein Kompliment machst."))
    ],
    "34": [
        blatt("Mehr als „Du bist cool“",
            kreuz("Warum geht Sophie Julians Kompliment nicht aus dem Kopf? Kreuze alles an, was stimmt.", ["Es war genau.", "Es war ehrlich.", "Es ging um ihr T-Shirt.", "Es ging um etwas, das sie getan hat."]),
            schreib("Was hat Julian an Sophie beobachtet?", 2),
            schreib("Warum „rauschen“ Sätze wie „Du bist cool“ an Sophie vorbei?", 3)),
        blatt("Gute Komplimente",
            tabelle("Mach die Komplimente genauer.", ["Allgemein", "Genau und ehrlich"], [["„Du bist nett.“", ""], ["„Du kannst gut Fußball.“", ""], ["„Cool gemacht.“", ""], ["„Du bist schlau.“", ""]]),
            schreib("Warum ist ein Kompliment für etwas, das jemand getan hat, oft mehr wert als eins über das Aussehen?", 3)),
        blatt("Komplimente und ich",
            luecken("", ["Ein Kompliment, über das ich mich gefreut habe: ___", "Wenn mir jemand ein Kompliment macht, fühle ich mich ___", "Komplimente zu machen finde ich ___, weil ___"]),
            schreib("Schreibe drei genaue Komplimente für Menschen aus deinem Leben (ohne Namen, z. B. „meine Oma“).", 4))
    ]
});

stunde("v-koerpersprache", {
    "12": [
        blatt("Was Bello erzählt",
            zuordnen("Was fühlt Bello? Verbinde.", ["Bello wedelt mit dem Schwanz.", "Bello versteckt sich unter dem Tisch.", "Bello knurrt und zeigt die Zähne."], ["[gesicht: wütend] wütend", "[gesicht: froh] froh", "[gesicht: ängstlich] Angst"]),
            stimmt("Stimmt das? Kreuze an.", ["Bello kann sprechen.", "Bello hat Angst vor dem Donner.", "Opa lässt die Schultern hängen."])),
        blatt("Der Körper spricht",
            gefuehle("Wie fühlt sich das Kind? Kreise ein Gesicht ein.", ["Ein Kind hüpft und lacht.", "Ein Kind lässt den Kopf hängen.", "Ein Kind stampft mit dem Fuß.", "Ein Kind zittert und versteckt sich."]),
            schreib("Woran sieht man, dass jemand froh ist?", 2)),
        blatt("Mein Körper",
            luecken("", ["Wenn ich froh bin, ___"]),
            malen("Male ein Kind, das wütend ist, und ein Kind, das froh ist."))
    ],
    "34": [
        blatt("Was der Körper verrät",
            kreuz("Was macht Lukas beim ersten Versuch? Kreuze alles an, was stimmt.", ["Er schaut auf den Boden.", "Er steht gerade.", "Er hält die Hände vor dem Bauch.", "Er murmelt leise."]),
            schreib("Welche Tipps gibt Frau Meier? Was passiert danach?", 3),
            schreib("Hanna sagt „Mir geht's gut“. Warum glaubt Lukas ihr nicht?", 3)),
        blatt("Körpersprache lesen",
            tabelle("Was könnte die Körpersprache bedeuten?", ["Das sieht man", "Das könnte es bedeuten"], [["verschränkte Arme, Blick weg", ""], ["Füße wippen, Blick zur Uhr", ""], ["aufrecht, lächelt, schaut dich an", ""], ["Fäuste geballt, Kiefer fest", ""], ["Schultern hochgezogen, leise Stimme", ""]]),
            schreib("Kann man Körpersprache falsch verstehen? Gib ein Beispiel.", 3)),
        blatt("Mein Körper spricht mit",
            luecken("", ["Wenn ich wütend bin, sieht man das an ___", "Wenn ich mich unsicher fühle, ___", "Ich wirke selbstbewusst, wenn ich ___"]),
            schreib("Lukas fragt nach: „Sicher? Du siehst traurig aus.“ Warum war das richtig? Was hättest du gesagt?", 4))
    ]
});

stunde("v-um-hilfe-bitten", {
    "12": [
        blatt("Ella und der hohe Schrank",
            stimmt("Stimmt das? Kreuze an.", ["Das Buch liegt auf dem Schrank.", "Ella steigt auf einen Stuhl.", "Der Stuhl wackelt.", "Ella fragt Mama."]),
            kreuz("Was sagt Papa? Kreuze an.", ["„Hilfe holen ist schlau.“", "„Mach das allein!“", "„Das Buch ist weg.“"])),
        blatt("Um Hilfe bitten",
            daumen("Brauchst du hier Hilfe? Kreise ein: 👍 ja oder 👎 nein.", ["Ich komme nicht an ein hohes Regal.", "Ich kann mir die Hände waschen.", "Ich verstehe die Aufgabe nicht.", "Mein Knie blutet.", "Ich kann meinen Namen schreiben."]),
            schreib("Wie fragt Ella nach Hilfe? Schreibe ihren Satz.", 2)),
        blatt("Ich bitte um Hilfe",
            luecken("", ["Hilfe bekomme ich von ___"]),
            malen("Male, wie dir jemand hilft."))
    ],
    "34": [
        blatt("Das schaffe ich allein!",
            kreuz("Warum fragt Tom nie um Hilfe? Kreuze an.", ["Er findet: Wer fragen muss, ist schwach.", "Er versteht alles.", "Niemand will ihm helfen.", "Er hat keine Zeit."]),
            schreib("Was erzählt die Oma über die Astronauten? Was will sie Tom damit sagen?", 3),
            schreib("Wie fragt Tom Luisa um Hilfe? Warum ist seine Frage so gut?", 3)),
        blatt("Gut um Hilfe bitten",
            tabelle("Schreibe zu jeder Situation eine genaue Bitte um Hilfe.", ["Situation", "Meine Bitte"], [["Du verstehst eine Matheaufgabe nicht.", ""], ["Jemand ärgert dich jeden Tag auf dem Schulweg.", ""], ["Du hast dein Pausenbrot vergessen.", ""], ["Du findest den Raum für Musik nicht.", ""]]),
            schreib("Am Ende hilft Tom Luisa in Englisch. Was zeigt das?", 2)),
        blatt("Hilfe und ich",
            luecken("", ["Um Hilfe zu bitten fällt mir schwer, wenn ___", "Am liebsten frage ich ___", "Ich kann anderen gut helfen bei ___"]),
            schreib("Tom nickt im Unterricht, als hätte er alles verstanden. Warum machen viele Kinder das? Was würdest du ihm raten?", 4))
    ]
});
})();
