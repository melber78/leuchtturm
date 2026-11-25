/* Notfall-Stillarbeit – Teil 5 (Kooperation, Achtsamkeit, Vielfalt & Respekt) · Format: sozial-notfall-0.js */
(function () {
const { blatt, schreib, kreuz, daumen, luecken, zuordnen, tabelle, stimmt, gesichter, gefuehle, malen, stunde } = window.NF;

stunde("v-gemeinsam", {
    "12": [
        blatt("Die Riesenrübe",
            stimmt("Stimmt das? Kreuze an.", ["Der Großvater zieht die Rübe allein heraus.", "Die Großmutter hilft mit.", "Die anderen lachen über die Maus.", "Am Ende ist die Rübe draußen."]),
            kreuz("Wer hilft alles mit? Kreuze an.", ["Hund", "Katze", "Pferd", "Maus", "Kuh"], true)),
        blatt("Zusammen sind wir stark",
            daumen("Hilft das im Team? Kreise ein: 👍 oder 👎.", ["zusammen anpacken", "auslachen", "abwechseln", "allein bestimmen", "„Ich helfe mit!“"]),
            schreib("Warum hat es am Ende geklappt?", 2)),
        blatt("Mein Team",
            luecken("", ["Zusammen schaffen wir ___"]),
            malen("Male, wie alle an der Riesenrübe ziehen."))
    ],
    "34": [
        blatt("Das Floß",
            kreuz("Warum klappt es in Gruppe A nicht? Kreuze an.", ["Sie haben kein Material.", "Keiner spricht sich ab.", "Das Kuscheltier ist zu schwer.", "Sie sind zu wenige."]),
            schreib("Was macht Gruppe B anders? Nenne mindestens drei Dinge.", 3),
            schreib("Was tut Lars am Ende Gutes – und warum ist das klug?", 3)),
        blatt("Gute Teamarbeit",
            daumen("Hilft das einem Team? Kreise ein: 👍 oder 👎.", ["Erst planen, dann loslegen.", "Jeder macht, was er will.", "Auch komische Ideen anhören.", "Der Lauteste bestimmt alles.", "Aufgaben nach Stärken verteilen.", "Wer einen Fehler macht, wird ausgelacht."]),
            schreib("Lenas Idee klingt erst komisch – und dann klappt sie. Was lernst du daraus?", 3)),
        blatt("Ich im Team",
            luecken("", ["Im Team bin ich gut bei ___", "Mich nervt in Gruppen, wenn ___", "Ein gutes Team braucht ___"]),
            schreib("Ihr sollt zu viert ein Plakat gestalten. Schreibe einen Plan: Wer macht was?", 4))
    ]
});

stunde("v-gewinnen-verlieren", {
    "12": [
        blatt("Mias Memory",
            stimmt("Stimmt das? Kreuze an.", ["Mia gewinnt das erste Spiel.", "Mia wirft die Karten vom Tisch.", "Am nächsten Tag sagt Mia: „Gut gespielt.“", "In der dritten Runde gewinnt Mia."]),
            gesichter("Wie fühlt sich Mia? Male die Gesichter.", ["verloren", "gewonnen"], true)),
        blatt("Gut verlieren",
            daumen("Was ist fair? Kreise ein: 👍 oder 👎.", ["„Gut gespielt!“", "Karten werfen", "„Glückwunsch!“", "„Blödes Spiel!“", "„Noch eine Runde?“"]),
            schreib("Was sagt Mia, als sie wieder verliert?", 2)),
        blatt("Ich spiele fair",
            luecken("", ["Wenn ich verliere, sage ich ___"]),
            malen("Male dich, wie du fair spielst."))
    ],
    "34": [
        blatt("Das Finale",
            kreuz("Was macht Julian nach dem Abpfiff? Kreuze alles an, was stimmt.", ["Er wirft sich auf den Rasen.", "Er gratuliert der 4a.", "Er schimpft auf den Schiri.", "Er tritt gegen eine Trinkflasche."]),
            schreib("Was macht Lotta anders als Julian?", 2),
            schreib("Warum bekommen Lotta und Sina den Fair-Play-Pokal und nicht die Siegermannschaft?", 3)),
        blatt("Fair gewinnen – fair verlieren",
            tabelle("Fair oder unfair? Schreibe es dazu – und wie es besser geht.", ["Verhalten", "fair / unfair – besser wäre …"], [["„Verlierer, Verlierer!“ singen", ""], ["Dem anderen Team die Hand geben", ""], ["„Der Schiri war gegen uns!“", ""], ["Nach einem Sieg sagen: „Ihr wart auch stark.“", ""]]),
            schreib("Sina sagt: „Das hätte auch andersrum ausgehen können.“ Warum hilft dieser Gedanke?", 3)),
        blatt("Ich und das Verlieren",
            luecken("", ["Wenn ich verliere, fühle ich mich ___", "Dann mache ich oft ___", "Beim nächsten Mal will ich ___"]),
            schreib("Warum fällt Verlieren oft so schwer – besonders, wenn andere zuschauen?", 4))
    ]
});

stunde("v-jeder-ist-wichtig", {
    "12": [
        blatt("Das Tier-Orchester",
            stimmt("Stimmt das? Kreuze an.", ["Am Anfang klingt es schön.", "Die Maus denkt, sie kann nichts.", "Die Eule gibt der Maus eine Trommel.", "Ohne die Maus hätte es nicht geklappt."]),
            zuordnen("Wer macht welches Geräusch? Verbinde.", ["der Elefant", "der Frosch", "die Maus"], ["trommelt: bumm", "tutet: törööö", "quakt: quaaak"])),
        blatt("Jeder ist wichtig",
            gesichter("Wie fühlt sich die Maus? Male die Gesichter.", ["in der Ecke", "mit der Trommel"], true),
            schreib("Was ist die Aufgabe der Maus?", 2)),
        blatt("Meine Aufgabe",
            luecken("", ["In meiner Klasse bin ich wichtig, weil ___"]),
            malen("Male das Tier-Orchester."))
    ],
    "34": [
        blatt("Die Schülerzeitung",
            kreuz("Warum ist Finn zuerst nicht begeistert? Kreuze an.", ["Er findet die Gruppe doof.", "Er denkt, er kann nicht gut schreiben.", "Er hat keine Zeit.", "Er mag keine Zeitungen."]),
            zuordnen("Wer macht was? Verbinde.", ["Paula", "Felix", "Nele", "Finn"], ["fotografiert", "behält den Überblick", "zeichnet den Comic", "schreibt die Texte"]),
            schreib("Warum ist ihre Zeitung am Ende die beliebteste der Schule?", 3)),
        blatt("Jeder kann etwas beitragen",
            tabelle("Ihr plant ein Klassenfest. Welche Aufgabe passt zu welcher Stärke?", ["Stärke", "Passende Aufgabe"], [["kann gut organisieren", ""], ["ist kreativ, malt gern", ""], ["ist stark und packt gern an", ""], ["kann gut mit Kleinen umgehen", ""], ["bringt andere zum Lachen", ""]]),
            schreib("Felix sagt zu Finn: „Du siehst immer Sachen, die keinem auffallen.“ Warum war dieser Satz so wichtig?", 3)),
        blatt("Mein Beitrag",
            luecken("", ["In einem Team kann ich gut ___", "Andere unterschätzen mich manchmal bei ___", "Ich möchte gern einmal die Aufgabe ___ übernehmen."]),
            schreib("Kennst du jemanden, der im Team oft übersehen wird? Was könnte man tun, damit er oder sie auch mitmacht? (ohne Namen)", 4))
    ]
});

stunde("v-ruhig-werden", {
    "12": [
        blatt("Tilda, die Schildkröte",
            stimmt("Stimmt das? Kreuze an.", ["Tilda ist eine kleine Schildkröte.", "Die Affen sind ganz leise.", "Tilda zieht den Kopf in den Panzer.", "Im Panzer atmet Tilda langsam."]),
            kreuz("Was macht Tilda im Panzer? Kreuze an.", ["schreien", "langsam atmen", "schlafen"])),
        blatt("Der Schildkröten-Trick",
            gesichter("Wie fühlt sich Tilda? Male die Gesichter.", ["zappelig", "ruhig"], true),
            daumen("Was hilft, um ruhig zu werden? Kreise ein: 👍 oder 👎.", ["langsam atmen", "laut schreien", "Augen zumachen", "herumrennen", "an etwas Schönes denken"])),
        blatt("Ich werde ruhig",
            luecken("", ["Ruhig werde ich, wenn ___"]),
            malen("Male deinen ruhigen Ort."))
    ],
    "34": [
        blatt("Zu viel auf einmal",
            kreuz("Was kommt bei Nora an diesem Tag zusammen? Kreuze alles an, was stimmt.", ["ein Test", "Streit mit der besten Freundin", "ein Arztbesuch", "Klavierunterricht ohne Üben", "ein Umzug"]),
            schreib("Woran merkt Nora, dass es ihr zu viel wird?", 2),
            schreib("Erkläre das Kasten-Atmen so, dass ein jüngeres Kind es verstehen kann.", 3)),
        blatt("Die 5-4-3-2-1-Übung",
            tabelle("Mach die Übung jetzt still an deinem Platz und schreibe auf.", ["Ich …", "Das ist es"], [["sehe 5 Dinge:", ""], ["spüre 4 Dinge:", ""], ["höre 3 Dinge:", ""], ["rieche 2 Dinge:", ""], ["schmecke 1 Ding:", ""]]),
            schreib("Warum wird man durch diese Übung ruhiger?", 3)),
        blatt("Mein Ruhe-Plan",
            luecken("", ["Zu viel wird es mir, wenn ___", "Das merke ich an ___", "Mein bester Trick, um ruhig zu werden: ___"]),
            schreib("Nora macht das Kasten-Atmen heimlich unter dem Tisch. Wann könntest du so einen Trick heimlich nutzen?", 3))
    ]
});

stunde("v-alle-sinne", {
    "12": [
        blatt("Ein Spaziergang mit Opa",
            zuordnen("Was hat Lukas bemerkt? Verbinde.", ["sehen", "hören", "riechen", "fühlen"], ["nasse Erde", "rote Blätter", "raue Rinde", "einen Vogel"]),
            kreuz("Was schmeckt Lukas zu Hause? Kreuze an.", ["Kakao", "Zitrone", "Pilze"])),
        blatt("Mit allen Sinnen",
            zuordnen("Womit machst du das? Verbinde.", ["sehen", "hören", "riechen", "schmecken"], ["👃 Nase", "👀 Augen", "👅 Mund", "👂 Ohren"]),
            schreib("Was hörst du gerade jetzt? Schreibe es auf.", 2)),
        blatt("Meine Sinne",
            luecken("", ["Ich rieche gern ___"]),
            malen("Male etwas, das du gern siehst, hörst oder schmeckst."))
    ],
    "34": [
        blatt("Die Rosinen-Übung",
            kreuz("Was bemerkt Erik an der Rosine? Kreuze alles an, was stimmt.", ["viele kleine Falten", "sie knistert leise", "sie ist hart wie Stein", "sie riecht süß", "sie ist blau"]),
            schreib("Warum verdreht Erik am Anfang die Augen – und was denkt er am Ende?", 3),
            schreib("Frau Haas sagt: „Das nennt man achtsam sein.“ Was bedeutet achtsam?", 2)),
        blatt("Achtsam sein",
            tabelle("Wähle einen Gegenstand auf deinem Tisch (z. B. einen Stift) und untersuche ihn mit allen Sinnen.", ["Sinn", "Das bemerke ich"], [["sehen", ""], ["fühlen", ""], ["hören (z. B. klopfen)", ""], ["riechen", ""]]),
            schreib("Bei welchen Dingen im Alltag bist du oft gar nicht richtig bei der Sache? (z. B. beim Essen vor dem Bildschirm)", 3)),
        blatt("Ganz bei einer Sache",
            luecken("", ["Ganz bei der Sache bin ich, wenn ich ___", "Unruhig im Kopf werde ich, wenn ___", "Ein Moment, den ich mit allen Sinnen erlebt habe: ___"]),
            schreib("Beschreibe dein Lieblingsessen so genau, dass man es fast schmecken kann – mit allen Sinnen.", 4))
    ]
});

stunde("v-dankbarkeit", {
    "12": [
        blatt("Bennis Glücksglas",
            stimmt("Stimmt das? Kreuze an.", ["Benni hat ein Glücksglas.", "Er legt Zettel mit schönen Sachen hinein.", "Am Donnerstag scheint die Sonne.", "Am Sonntag ist das Glas halb voll."]),
            zuordnen("Was war an welchem Tag schön? Verbinde.", ["Montag", "Dienstag", "Mittwoch"], ["Regenbogen", "Pfannkuchen", "Höhle bauen"])),
        blatt("Danke sagen",
            gesichter("Wie fühlt sich Benni? Male die Gesichter.", ["Es regnet.", "Er liest die Zettel."], true),
            daumen("Wofür kann man danke sagen? Kreise ein: 👍 oder 👎.", ["leckeres Essen", "ein Freund", "jemand schubst mich", "ein schöner Tag", "jemand hilft mir"])),
        blatt("Mein Glücksglas",
            luecken("", ["Ich bin dankbar für ___"]),
            malen("Male dein Glücksglas mit drei schönen Sachen."))
    ],
    "34": [
        blatt("Der schlechteste Tag – oder?",
            kreuz("Was ist bei Marie schiefgegangen? Kreuze alles an, was stimmt.", ["Ihr Schirm ist kaputt.", "Sie hat ihr Pausenbrot vergessen.", "Sie hat eine Fünf geschrieben.", "Sie hat sich das Knie aufgeschürft."]),
            schreib("Welche drei guten Dinge findet Marie?", 3),
            schreib("„Das Schlechte sieht man sofort. Das Gute muss man manchmal suchen.“ Stimmst du zu? Begründe.", 3)),
        blatt("Drei gute Dinge",
            schreib("Schreibe drei Dinge auf, die heute (oder gestern) gut waren – auch kleine.", 4),
            tabelle("Wem könntest du danke sagen – und wofür?", ["Wem?", "Wofür?"], [["", ""], ["", ""], ["", ""]])),
        blatt("Danke",
            schreib("Schreibe einen kurzen Dankes-Brief an einen Menschen, der dir wichtig ist (du musst ihn nicht abschicken).", 7),
            luecken("", ["Dankbar sein fällt mir schwer, wenn ___"]))
    ]
});

stunde("v-alle-verschieden", {
    "12": [
        blatt("Der Streit der Buntstifte",
            stimmt("Stimmt das? Kreuze an.", ["Jeder Stift will der Wichtigste sein.", "Lisa malt zuerst nur mit Rot.", "Das rote Bild ist schön.", "Am Ende malt Lisa mit allen Stiften."]),
            zuordnen("Was malt Lisa mit welcher Farbe? Verbinde.", ["blau", "grün", "gelb", "rot"], ["Sonne", "Erdbeeren", "Himmel", "Wiese"])),
        blatt("Alle sind verschieden",
            daumen("Was ist richtig? Kreise ein: 👍 oder 👎.", ["Jeder ist anders.", "Nur einer ist wichtig.", "Zusammen sind wir bunt.", "Wer anders ist, darf nicht mitspielen.", "Jeder kann etwas."]),
            schreib("Was sagt der Blaue am Ende?", 2)),
        blatt("So bin ich",
            luecken("", ["Ich bin besonders, weil ___"]),
            malen("Male ein Bild mit ganz vielen Farben."))
    ],
    "34": [
        blatt("Unsere Klasse – ein Obstsalat",
            kreuz("Warum sitzt Mats zuerst stumm da? Kreuze an.", ["Er hat nichts mitgebracht.", "Er denkt, bei ihm ist alles „normal“.", "Er ist krank.", "Er mag die Klasse nicht."]),
            schreib("Was stellt sich bei Mats heraus? Warum staunen alle?", 3),
            schreib("Erkläre, was Frau Lange mit dem Obstsalat meint.", 3)),
        blatt("Verschieden und gleich",
            tabelle("Wie bist du – und wie ist ein anderes Kind aus deiner Klasse? (ohne Namen)", ["", "ich", "ein anderes Kind"], [["Das kann ich gut:", "", ""], ["Das esse ich gern:", "", ""], ["Das mache ich in der Freizeit:", "", ""], ["Das nervt mich:", "", ""]]),
            schreib("Was habt ihr gemeinsam, obwohl ihr verschieden seid?", 2),
            schreib("Warum streiten Menschen manchmal, weil jemand anders ist?", 3)),
        blatt("Das macht mich aus",
            luecken("", ["Das macht mich besonders: ___", "Das wissen die anderen in meiner Klasse noch nicht über mich: ___", "Wenn ich etwas mitbringen dürfte, das mich zeigt, wäre es ___"]),
            schreib("Was wäre, wenn alle in der Klasse genau gleich wären? Schreibe deine Gedanken.", 4))
    ]
});

stunde("v-auslachen", {
    "12": [
        blatt("Linas Brille",
            stimmt("Stimmt das? Kreuze an.", ["Lina hat eine neue Brille.", "Tom lacht Lina aus.", "Emma lacht mit.", "Tom entschuldigt sich."]),
            gesichter("Wie fühlt sich Lina? Male die Gesichter.", ["ausgelacht", "Brille wieder auf"], true)),
        blatt("Auslachen tut weh",
            daumen("Was machst du, wenn ein Kind ausgelacht wird? Kreise ein: 👍 oder 👎.", ["„Hör auf, das ist gemein!“", "mitlachen", "mich neben das Kind setzen", "wegschauen", "Hilfe holen"]),
            schreib("Was sagt Emma zu Tom?", 2)),
        blatt("Ich halte zu dir",
            luecken("", ["Wenn ein Kind ausgelacht wird, sage ich ___"]),
            malen("Male, wie Emma Lina hilft."))
    ],
    "34": [
        blatt("Nur Spaß?",
            kreuz("Woran erkennt Merle, dass es Mobbing ist? Kreuze an.", ["Es passiert immer wieder.", "Es passiert einmal.", "Es ist gegen einen.", "Er kann sich nicht wehren."]),
            schreib("Was machen die meisten anderen Kinder? Warum ist das auch ein Problem?", 3),
            schreib("Jonas sagt: „Das Schlimmste war, dass niemand etwas gesagt hat.“ Was meint er?", 3)),
        blatt("Spaß oder Mobbing?",
            tabelle("Ist das noch Spaß oder schon Mobbing? Schreibe S oder M – und warum.", ["Situation", "S / M – warum?"], [["Freunde necken sich, alle lachen, auch der Geneckte.", ""], ["Ein Kind wird jeden Tag nachgemacht.", ""], ["Der Ranzen eines Kindes wird immer wieder versteckt.", ""], ["Einmal ein blöder Witz, danach Entschuldigung.", ""]]),
            schreib("Merle, Erik und Lina tun zwei Dinge. Welche? Warum war es wichtig, zusammen zu handeln?", 3)),
        blatt("Was ich tun kann",
            luecken("", ["Wenn jemand ausgelacht wird, kann ich ___", "Es fällt mir schwer, etwas zu sagen, weil ___", "Ich kann mir Hilfe holen bei ___"]),
            schreib("Schreibe Jonas eine Nachricht, die ihm zeigt, dass er nicht allein ist.", 4))
    ]
});

stunde("v-hilfsbereitschaft", {
    "12": [
        blatt("Die Äpfel",
            stimmt("Stimmt das? Kreuze an.", ["Die Tüte der Frau reißt.", "Die Äpfel rollen über den Weg.", "Paul und Mia gehen einfach weiter.", "Paul findet einen Apfel unter der Bank."]),
            kreuz("Warum kann die Frau die Äpfel nicht aufheben? Kreuze an.", ["Ihr Rücken tut weh.", "Sie mag keine Äpfel.", "Sie hat keine Zeit."])),
        blatt("Helfen fühlt sich gut an",
            daumen("Ist das hilfsbereit? Kreise ein: 👍 oder 👎.", ["etwas aufheben", "Tür aufhalten", "auslachen", "tragen helfen", "einfach weitergehen"]),
            gesichter("Wie fühlen sich Paul und Mia am Ende? Male die Gesichter.", ["Paul", "Mia"], true)),
        blatt("Ich helfe",
            luecken("", ["Ich helfe gern bei ___"]),
            malen("Male, wie du jemandem hilfst."))
    ],
    "34": [
        blatt("Die Hilfe-Detektive",
            kreuz("Warum wird Paul am Mittwoch sauer? Kreuze an.", ["Lina hilft ihm gar nicht.", "Lina nimmt ihm einfach den Stift aus der Hand.", "Lina lacht ihn aus.", "Lina macht seine Aufgabe falsch."]),
            schreib("Was erklärt die Lehrerin über gute Hilfe?", 2),
            schreib("Was macht Lina am Donnerstag besser?", 2)),
        blatt("Gute Hilfe",
            daumen("Ist das gute Hilfe? Kreise ein: 👍 oder 👎.", ["„Soll ich dir helfen?“", "Die Aufgabe für jemanden komplett lösen", "Den Weg zeigen, wenn jemand sucht", "Helfen und dann vor allen damit angeben", "Zeigen, wie es geht, und dann selbst machen lassen"]),
            schreib("Warum möchte jemand manchmal etwas allein schaffen, obwohl es schwer ist?", 3)),
        blatt("Mein Hilfe-Tagebuch",
            tabelle("Plane eine Woche als Hilfe-Detektiv: Wem könntest du helfen?", ["Tag", "Wem und wie?"], [["Montag", ""], ["Dienstag", ""], ["Mittwoch", ""], ["Donnerstag", ""], ["Freitag", ""]]),
            luecken("", ["Helfen macht auch mich froh, weil ___"]))
    ]
});

stunde("v-gerecht", {
    "12": [
        blatt("Drei Kinder am Zaun",
            stimmt("Stimmt das? Kreuze an.", ["Tim ist groß.", "Ben ist groß.", "Jedes Kind bekommt zuerst eine Kiste.", "Am Ende können alle zuschauen."]),
            kreuz("Was macht Tim mit seiner Kiste? Kreuze an.", ["Er gibt sie Ben.", "Er stellt sich darauf.", "Er nimmt sie mit nach Hause."])),
        blatt("Gerecht",
            daumen("Ist das gerecht? Kreise ein: 👍 oder 👎.", ["Ein Kind mit Gips bekommt Hilfe beim Tragen.", "Der Stärkste bekommt am meisten.", "Wer Hunger hat, bekommt etwas.", "Nur einer darf immer bestimmen."]),
            schreib("Was heißt gerecht? Schreibe den Satz aus der Geschichte ab.", 2)),
        blatt("Jeder bekommt, was er braucht",
            luecken("", ["Ich brauche Hilfe bei ___"]),
            malen("Male die drei Kinder am Zaun mit ihren Kisten."))
    ],
    "34": [
        blatt("Warum bekommt Mia mehr Zeit?",
            kreuz("Warum findet Leon die extra Zeit unfair? Kreuze an.", ["Er findet, alle müssten gleich behandelt werden.", "Er braucht selbst mehr Zeit.", "Mia hat geschummelt.", "Er mag Mia nicht."]),
            schreib("Was zeigt das Beispiel mit dem Pflaster?", 3),
            schreib("Erkläre mit eigenen Worten den Unterschied zwischen „gleich“ und „gerecht“.", 3)),
        blatt("Gleich oder gerecht?",
            tabelle("Was ist hier gerecht? Schreibe deine Lösung.", ["Situation", "Gerechte Lösung"], [["Ein Kind im Rollstuhl will mit auf den Ausflug.", ""], ["Ein Kind versteht noch wenig Deutsch.", ""], ["Ein Kind hat sein Frühstück vergessen.", ""], ["Ein Kind ist sehr schnell fertig und langweilt sich.", ""]]),
            schreib("Kann es sein, dass etwas gleich ist, aber trotzdem ungerecht? Nenne ein Beispiel.", 3)),
        blatt("Gerechtigkeit und ich",
            luecken("", ["Ungerecht behandelt fühle ich mich, wenn ___", "Ich finde gerecht, dass ___", "Ich brauche manchmal etwas anderes als andere, zum Beispiel ___"]),
            schreib("Leon beschwert sich. Wie würdest du ihm die extra Zeit erklären, damit er es versteht?", 4))
    ]
});
})();
