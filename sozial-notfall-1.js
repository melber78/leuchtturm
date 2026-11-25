/* Notfall-Stillarbeit – Teil 1 (Grundstunden + Gefühle, Konflikte lösen) · Format: sozial-notfall-0.js */
(function () {
const { blatt, schreib, kreuz, daumen, luecken, zuordnen, tabelle, stimmt, gesichter, gefuehle, malen, stunde } = window.NF;

stunde("v-gefuehle-erkennen", {
    "12": [
        blatt("Paul und der verlorene Ball",
            stimmt("Stimmt das? Kreuze an.", ["Paul hat einen roten Ball.", "Paul findet den Ball sofort.", "Tom hat den Ball gefunden.", "Am Ende spielen beide zusammen."]),
            gesichter("Wie fühlt sich Paul? Male die Gesichter.", ["Ball weg", "Tom hat den Ball", "am Ende"], true)),
        blatt("Gefühle erkennen",
            zuordnen("Welches Gefühl passt? Verbinde.", ["Paul spielt mit dem Ball.", "Der Ball ist weg.", "Paul stampft mit dem Fuß."], ["[gesicht: wütend] wütend", "[gesicht: froh] froh", "[gesicht: traurig] traurig"]),
            gefuehle("Wie fühlst du dich? Kreise ein Gesicht ein.", ["Ich bekomme ein Geschenk.", "Mein Eis fällt runter.", "Jemand nimmt mir etwas weg.", "Es ist dunkel und es knackt."])),
        blatt("Meine Gefühle",
            luecken("", ["Ich bin froh, wenn ___"]),
            malen("Male dich, wenn du froh bist."))
    ],
    "34": [
        blatt("Lena und der erste Tag",
            kreuz("Woran merkt Lena ihre Angst? Kreuze alles an, was in der Geschichte steht.", ["Ihr Herz klopft schnell.", "Sie bekommt Kopfweh.", "Ihre Hände sind feucht.", "Im Bauch kribbelt es.", "Sie muss lachen."]),
            schreib("Was verändert sich, als Jonas sie zum Mitspielen einlädt?", 3),
            schreib("Lena sagt: „Am Anfang war mein Bauch ganz komisch.“ Was meint sie damit?", 2)),
        blatt("Gefühle im Körper",
            tabelle("Wo spürst du diese Gefühle im Körper? Schreibe es auf.", ["Gefühl", "So merke ich es im Körper"], [["Angst", ""], ["Wut", ""], ["Freude", ""], ["Traurigkeit", ""], ["Aufregung", ""]]),
            schreib("Woran kannst du bei einem anderen Kind erkennen, dass es traurig ist – auch wenn es nichts sagt?", 3)),
        blatt("Ich und meine Gefühle",
            luecken("", ["Ich werde schnell wütend, wenn ___", "Ich bin richtig froh, wenn ___", "Wenn ich Angst habe, hilft mir ___"]),
            schreib("Welches Gefühl zeigst du anderen nicht gern? Warum ist das so? (Du musst nichts Privates schreiben.)", 4))
    ]
});

stunde("v-streit-loesen", {
    "12": [
        blatt("Die Schaukel",
            stimmt("Stimmt das? Kreuze an.", ["Max schubst Ella weg.", "Ella haut Max.", "Ella sagt „Stopp!“ und geht weg.", "Max sagt: „Tut mir leid.“"]),
            kreuz("Wann reden Ella und Max? Kreuze an.", ["mitten im Streit", "nach der Pause, wenn alle ruhig sind", "gar nicht"])),
        blatt("Erst raus, dann reden",
            daumen("Was hilft bei Streit? Kreise ein: 👍 oder 👎.", ["„Stopp!“ sagen", "hauen", "weggehen", "Hilfe holen", "schreien und treten"]),
            gesichter("Wie fühlt sich Ella? Male die Gesichter.", ["nach dem Schubsen", "nach dem Reden"], true)),
        blatt("Mein Stopp",
            schreib("Was sagst du, wenn dich jemand schubst?", 1),
            malen("Male dich, wie du „Stopp!“ sagst."))
    ],
    "34": [
        blatt("Kein Tor!",
            kreuz("Woran merkt Konrad, dass er kurz vorm Explodieren ist? Kreuze an.", ["Sein Kopf wird heiß.", "Er muss gähnen.", "Sein Kiefer und seine Fäuste sind fest.", "Er hat Hunger."]),
            schreib("Warum ist es für Konrad so schwer, wegzugehen?", 3),
            schreib("Was hilft Konrad an der Bank, wieder ruhig zu werden?", 2)),
        blatt("Die Streit-Ampel",
            tabelle("Was ist hier dran? Schreibe: grün (Stopp sagen / nicht beachten), gelb (weggehen) oder rot (Erwachsenen holen).", ["Situation", "Ampel"], [["Jemand nennt dich „Schnecke“.", ""], ["Du merkst: Gleich haue ich zu.", ""], ["Einer droht, dich nach der Schule zu verprügeln.", ""], ["Jemand drängelt sich in der Schlange vor.", ""], ["Zwei schlagen auf ein Kind ein.", ""]]),
            schreib("Warum klappt das Klären erst nach der Pause – und nicht mitten im Streit?", 3)),
        blatt("Mein Streit-Plan",
            luecken("", ["Bei Streit merke ich die Wut zuerst an ___", "Weggehen fällt mir schwer, weil ___", "Dahin kann ich gehen, um ruhig zu werden: ___", "Mit dieser Person kann ich danach reden: ___"]),
            schreib("Die anderen lachen, als Konrad weggeht. Schreibe ihm einen Satz, der ihm Mut macht.", 3))
    ]
});

stunde("v-freundschaft", {
    "12": [
        blatt("Der kleine Igel sucht einen Freund",
            stimmt("Stimmt das? Kreuze an.", ["Der Hase will mit dem Igel spielen.", "Das Eichhörnchen hat Nüsse verloren.", "Der Igel hilft beim Suchen.", "Am Ende hat der Igel einen Freund."]),
            gesichter("Wie fühlt sich der Igel? Male die Gesichter.", ["beim Hasen", "beim Eichhörnchen"], true)),
        blatt("Ein guter Freund",
            daumen("Was macht ein guter Freund? Kreise ein: 👍 oder 👎.", ["Er hilft dir.", "Er lacht dich aus.", "Er teilt mit dir.", "Er hört dir zu.", "Er sagt: „Du bist doof.“"]),
            schreib("Wie hat der Igel einen Freund gefunden?", 2)),
        blatt("Mein Freund, meine Freundin",
            luecken("", ["Ein guter Freund ist ___"]),
            malen("Male dich und einen Freund oder eine Freundin."))
    ],
    "34": [
        blatt("Das geplatzte Versprechen",
            kreuz("Warum ist Ida enttäuscht und wütend? Kreuze an.", ["Mila hat ihr Pausenbrot gegessen.", "Mila ist nicht gekommen und war mit Paula im Kino.", "Das Schwimmbad hatte zu.", "Paula hat Ida ausgelacht."]),
            schreib("Was sagt Mila am Montag? Warum ist das eine gute Entschuldigung?", 3),
            schreib("Ida denkt erst: „Mit der rede ich nie wieder!“ Warum entscheidet sie sich am Ende anders?", 3)),
        blatt("Was ist echte Freundschaft?",
            daumen("Passt das zu echter Freundschaft? Kreise ein: 👍 oder 👎.", ["Wir können auch mal streiten und uns wieder vertragen.", "Sie erzählt meine Geheimnisse weiter.", "Er hält zu mir, wenn andere über mich lachen.", "Ich darf keine anderen Freunde haben.", "Sie sagt mir ehrlich, wenn ich Mist baue."]),
            schreib("Darf man mehrere Freunde haben? Was hätte Mila tun sollen, als Paula sie ins Kino eingeladen hat?", 4)),
        blatt("Freundschaft und ich",
            luecken("", ["Ein guter Freund oder eine gute Freundin ist für mich ___", "Ich bin ein guter Freund / eine gute Freundin, weil ___", "In einer Freundschaft verzeihe ich nicht, wenn ___"]),
            schreib("Schreibe auf, was du tust, um eine Freundschaft zu „reparieren“, wenn es Streit gab.", 4))
    ]
});

stunde("v-regeln-miteinander", {
    "12": [
        blatt("Die Stadt ohne Ampeln",
            stimmt("Stimmt das? Kreuze an.", ["In Wirrwarr gibt es keine Ampeln.", "Alle sind ganz ruhig.", "Lotta malt ein Schild.", "Am Ende hat niemand mehr Angst."]),
            kreuz("Was steht auf Lottas Schild? Kreuze an.", ["Rot heißt gehen.", "Rot heißt stehen. Grün heißt gehen.", "Alle dürfen rennen."])),
        blatt("Regeln helfen",
            daumen("Ist das eine gute Regel? Kreise ein: 👍 oder 👎.", ["Wir hören einander zu.", "Der Lauteste bestimmt.", "Wir räumen auf.", "Wir tun niemandem weh.", "Wer zuerst kommt, darf alles nehmen."]),
            gesichter("Wie fühlen sich die Leute? Male die Gesichter.", ["ohne Regeln", "mit Regeln"], true)),
        blatt("Unsere Regel",
            luecken("", ["Eine wichtige Regel ist ___"]),
            malen("Male, wie eine Regel uns hilft."))
    ],
    "34": [
        blatt("Die Insel ohne Regeln",
            kreuz("Was geht am dritten Tag schief? Kreuze alles an, was stimmt.", ["Die Kokosnüsse sind fast alle weg.", "Ein Schiff holt sie ab.", "Das Feuer ist aus.", "Die Kinder streiten nur noch.", "Die Kleinsten haben am meisten gegessen."]),
            schreib("Welche drei Regeln beschließen die Kinder?", 3),
            schreib("Moritz sagt: „Mit Regeln fühle ich mich freier als ohne.“ Wie kann das sein?", 3)),
        blatt("Gute Regeln",
            tabelle("Warum gibt es diese Regeln? Schreibe den Grund dazu.", ["Regel", "Wozu ist sie gut?"], [["Im Schulhaus wird nicht gerannt.", ""], ["Wer spricht, wird nicht unterbrochen.", ""], ["Handys bleiben im Unterricht aus.", ""], ["Bei Streit holen wir einen Erwachsenen.", ""]]),
            schreib("Marie will Regeln, „die wir alle gut finden“. Warum ist das wichtig?", 3)),
        blatt("Meine Insel-Regeln",
            schreib("Du strandest mit deiner Klasse auf einer Insel. Schreibe fünf Regeln für euer Inselleben.", 6),
            luecken("", ["Diese Regel an unserer Schule finde ich sinnvoll: ___", "Diese Regel verstehe ich nicht: ___"]))
    ]
});

stunde("v-wut-werkzeugkasten", {
    "12": [
        blatt("Vulki, der kleine Vulkan",
            stimmt("Stimmt das? Kreuze an.", ["Vulki ist immer wütend.", "Wenn Vulki Feuer spuckt, laufen alle weg.", "Die Eule hilft Vulki.", "Am Ende bleibt das Feuer drin."]),
            kreuz("Was rät die Eule? Kreuze an.", ["tief atmen", "Feuer spucken", "bis zehn zählen", "kurz weggehen"], true)),
        blatt("Mein Wut-Werkzeugkasten",
            daumen("Was hilft bei Wut? Kreise ein: 👍 oder 👎.", ["tief atmen", "hauen", "bis zehn zählen", "Wasser trinken", "Sachen kaputt machen"]),
            gesichter("Wie fühlt sich Vulki? Male die Gesichter.", ["beim Feuer", "am Ende"], true)),
        blatt("Mein Werkzeug",
            luecken("", ["Wenn ich wütend bin, hilft mir ___"]),
            malen("Male dich, wie du deine Wut in den Griff bekommst."))
    ],
    "34": [
        blatt("Jonas und die Wutwelle",
            kreuz("Woran spürt Jonas die Wutwelle? Kreuze alles an, was stimmt.", ["Sein Gesicht wird heiß.", "Er wird müde.", "Seine Hände werden zu Fäusten.", "Sein Herz rast.", "Er muss weinen."]),
            schreib("Was bedeutet „Stopp – Atmen – Denken“? Erkläre in eigenen Worten.", 3),
            schreib("„Die Wut war trotzdem da. Aber diesmal hat er entschieden, was passiert.“ Was heißt das?", 3)),
        blatt("Hilft das – oder wird es schlimmer?",
            daumen("Hilft das bei Wut? Kreise ein: 👍 hilft oder 👎 macht es schlimmer.", ["kurz rausgehen", "zurückbeleidigen", "dreimal tief atmen", "gegen die Wand treten", "einen Schluck Wasser trinken", "später sagen, was mich geärgert hat"]),
            schreib("Jonas denkt: „Wenn ich haue, hat Kevin gewonnen.“ Stimmst du zu? Begründe.", 3)),
        blatt("Mein eigener Werkzeugkasten",
            tabelle("Fülle deinen Werkzeugkasten aus.", ["Wenn …", "… dann mache ich"], [["mein Körper heiß wird,", ""], ["mich jemand auslacht,", ""], ["ich verliere,", ""], ["ich ungerecht behandelt werde,", ""]]),
            luecken("", ["Mein bestes Werkzeug ist ___", "Diese Woche probiere ich aus: ___"]))
    ]
});

stunde("v-traurig-troesten", {
    "12": [
        blatt("Emmas Luftballon",
            stimmt("Stimmt das? Kreuze an.", ["Emmas Ballon ist blau.", "Der Wind nimmt den Ballon mit.", "Ben lacht Emma aus.", "Ben gibt Emma ein Taschentuch."]),
            gesichter("Wie fühlt sich Emma? Male die Gesichter.", ["Ballon weg", "Ben ist da"], true)),
        blatt("So kann ich trösten",
            daumen("Was tröstet? Kreise ein: 👍 oder 👎.", ["neben das Kind setzen", "auslachen", "„Das ist echt doof.“", "„Stell dich nicht so an!“", "ein Taschentuch geben"]),
            schreib("Was hat Ben gemacht, um Emma zu trösten?", 2)),
        blatt("Trost für dich",
            luecken("", ["Mich tröstet ___"]),
            malen("Male, wie du ein trauriges Kind tröstest."))
    ],
    "34": [
        blatt("Der leere Käfig",
            kreuz("Woran merkt man, dass es Finn nicht gut geht? Kreuze an.", ["Er ist ganz still.", "Er spielt laut Fußball.", "Er bleibt in der Pause sitzen.", "Er schaut aus dem Fenster."]),
            schreib("Leon sagt: „Ist doch nur ein Kaninchen.“ Warum fühlt sich Finn danach noch schlechter?", 3),
            schreib("Was macht Greta anders als Leon?", 3)),
        blatt("Trösten – aber richtig",
            daumen("Hilft das einem traurigen Menschen? Kreise ein: 👍 oder 👎.", ["„Willst du erzählen?“", "„Wein doch nicht, das ist peinlich.“", "Einfach da sein und zuhören.", "„Mir ging es mal noch schlechter.“", "„Das tut mir echt leid.“"]),
            schreib("Warum kann es manchmal besser sein, erst einmal gar nichts zu sagen?", 3)),
        blatt("Wenn ich traurig bin",
            luecken("", ["Wenn ich traurig bin, möchte ich, dass ___", "Gar nicht hilft mir, wenn jemand ___", "Ich kann gut trösten, indem ich ___"]),
            schreib("Schreibe Finn eine kurze Nachricht, die ihn tröstet.", 4))
    ]
});

stunde("v-angst-okay", {
    "12": [
        blatt("Bruno und die Nacht",
            stimmt("Stimmt das? Kreuze an.", ["Bruno ist ein kleiner Hase.", "Es knackt in der Nacht.", "Mama Bär schimpft mit Bruno.", "Der Kuschelhase hilft Bruno."]),
            kreuz("Was hat geknackt? Kreuze an.", ["ein Monster", "der alte Schrank", "ein Hund"])),
        blatt("Angst haben ist okay",
            daumen("Was hilft bei Angst? Kreise ein: 👍 oder 👎.", ["ein kleines Licht", "jemanden rufen", "tief atmen", "ausgelacht werden", "das Kuscheltier halten"]),
            gesichter("Wie fühlt sich Bruno? Male die Gesichter.", ["im Dunkeln", "mit Licht"], true)),
        blatt("Mein Mutmacher",
            luecken("", ["Wenn ich Angst habe, hilft mir ___"]),
            malen("Male deinen Mutmacher."))
    ],
    "34": [
        blatt("Mila im Kletterwald",
            kreuz("Woran merkt Mila ihre Angst? Kreuze an.", ["Ihre Knie werden weich.", "Sie lacht laut.", "Ihr Mund ist trocken.", "Sie bekommt Hunger."]),
            schreib("Die Trainerin sagt: „Angst ist wie ein Alarm.“ Erkläre, was sie damit meint.", 3),
            schreib("Wie schafft es Mila am Ende doch, zu klettern?", 2)),
        blatt("Schützt mich die Angst?",
            tabelle("Ist die Angst hier ein Schutz oder ein zu lauter Alarm? Schreibe: Schutz oder zu laut.", ["Situation", "Schutz / zu laut"], [["Angst vor einer heißen Herdplatte", ""], ["Angst, vor der Klasse vorzulesen", ""], ["Angst vor einem bellenden, fremden Hund", ""], ["Angst, ein neues Kind anzusprechen", ""], ["Angst, über eine rote Ampel zu gehen", ""]]),
            schreib("Marvin ruft „Angsthase!“. Was denkst du über so einen Spruch?", 3)),
        blatt("Mutig mit meiner Angst",
            luecken("", ["Mutig sein heißt für mich ___", "Davor hatte ich mal Angst und habe es trotzdem geschafft: ___", "Ein kleiner Schritt, den ich als Nächstes wagen will: ___"]),
            schreib("Schreibe einen Mutmacher-Satz, den du dir selbst sagen kannst, wenn du Angst hast.", 2),
            schreib("Wem kannst du von deiner Angst erzählen? Warum gerade dieser Person?", 2))
    ]
});

stunde("v-empathie", {
    "12": [
        blatt("Der Turm",
            stimmt("Stimmt das? Kreuze an.", ["Lio baut einen Turm.", "Ella stößt den Turm mit Absicht um.", "Lio ist traurig.", "Ella hilft beim neuen Turm."]),
            gesichter("Wie fühlt sich Lio? Male die Gesichter.", ["Turm ist hoch", "Turm fällt um", "neuer Turm"], true)),
        blatt("Wie fühlt sich der andere?",
            gefuehle("Wie fühlt sich das Kind? Kreise ein Gesicht ein.", ["Ein Kind bekommt ein Lob.", "Ein Kind wird ausgelacht.", "Einem Kind wird das Spielzeug weggenommen.", "Ein Kind hört ein lautes Gewitter."]),
            schreib("Was hat Ella gedacht, als der Turm umgefallen ist?", 2)),
        blatt("Ich helfe dir",
            luecken("", ["Wenn ein Kind traurig ist, kann ich ___"]),
            malen("Male, wie du einem anderen Kind hilfst."))
    ],
    "34": [
        blatt("Zwei Seiten einer Geschichte",
            kreuz("Was denkt Lara zuerst über Tim? Kreuze an.", ["Er ist krank.", "Er ist eingebildet.", "Er ist müde.", "Er ist schüchtern."]),
            schreib("Was ist in Wirklichkeit mit Tim los?", 2),
            schreib("Was lernst du aus der Geschichte über das schnelle Urteilen?", 3)),
        blatt("Die Perspektiv-Brille",
            tabelle("Setz die Perspektiv-Brille auf: Was könnte der Grund sein?", ["Das siehst du", "Mögliche Gründe"], [["Ein Kind antwortet dir nicht.", ""], ["Dein Freund ist heute total schlecht gelaunt.", ""], ["Ein Mitschüler kommt jeden Tag zu spät.", ""], ["Jemand lacht nicht über deinen Witz.", ""]]),
            schreib("Wie kannst du herausfinden, was in einem anderen Menschen vorgeht, ohne zu raten?", 3)),
        blatt("Mit anderen Augen",
            luecken("Denk an eine Situation, in der dich jemand falsch verstanden hat.", ["Das ist passiert: ___", "Der andere dachte: ___", "In Wirklichkeit war es so: ___"]),
            schreib("Schreibe einen Satz, mit dem du nachfragen kannst, statt schnell zu urteilen.", 2),
            schreib("Warum ist es manchmal schwer, sich in andere hineinzuversetzen?", 3))
    ]
});

stunde("v-petzen-hilfe", {
    "12": [
        blatt("Die Klettergerüst-Geschichte",
            stimmt("Stimmt das? Kreuze an.", ["Tom spielt mit einem roten Stift.", "Mia muss das der Lehrerin sagen.", "Ben fällt vom Klettergerüst.", "Paul holt Hilfe."]),
            kreuz("Wann hole ich Hilfe? Kreuze an.", ["Jemand ist in Gefahr.", "Jemand hat einen roten Stift.", "Jemandem tut etwas weh."])),
        blatt("Hilfe holen",
            daumen("Muss ich Hilfe holen? Kreise ein: 👍 ja oder 👎 nein.", ["Ein Kind blutet.", "Ein Kind isst Schokolade.", "Zwei Kinder hauen sich.", "Ein Kind malt mit Bleistift.", "Ein Kind klettert auf das Fensterbrett."]),
            gesichter("Wie fühlt sich Ben? Male die Gesichter.", ["gefallen", "Hilfe ist da"], true)),
        blatt("Ich hole Hilfe",
            luecken("", ["Ich hole Hilfe bei ___"]),
            malen("Male, wie du Hilfe holst."))
    ],
    "34": [
        blatt("Ist Lukas eine Petze?",
            kreuz("Was passiert jeden Tag mit Jannes? Kreuze an.", ["Er wird nach Hause gebracht.", "Zwei Ältere nehmen ihm die Mütze weg.", "Er vergisst seine Mütze.", "Er spielt mit den Älteren Fangen."]),
            schreib("Welche drei Hilfe-Fragen stellt sich Lukas?", 3),
            schreib("Was ist der Unterschied zwischen Petzen und Hilfe holen? Schreibe es in eigenen Worten.", 3)),
        blatt("Petzen oder Hilfe holen?",
            tabelle("Petzen oder Hilfe holen? Schreibe P oder H.", ["Situation", "P / H"], [["Ein Kind wird jeden Tag erpresst, sein Geld abzugeben.", ""], ["Dein Banknachbar hat seine Hausaufgaben nicht gemacht.", ""], ["Ein Mitschüler hat ein Messer dabei.", ""], ["Jemand hat in der Pause einen Kaugummi gekaut.", ""], ["Ein Kind wird im Klassenchat fertiggemacht.", ""]]),
            schreib("„Sag bloß nichts, sonst bist du eine Petze!“ Warum sagen Täter so etwas?", 3)),
        blatt("Mein Hilfe-Plan",
            luecken("", ["Bei Problemen in der Schule kann ich zu ___ gehen.", "Außerhalb der Schule kann ich mich an ___ wenden.", "Hilfe holen fällt mir schwer, weil ___"]),
            schreib("Jannes hat nie etwas gesagt. Warum schweigen Kinder, denen es schlecht geht, oft?", 4))
    ]
});

stunde("v-entschuldigen", {
    "12": [
        blatt("Das Malwasser",
            stimmt("Stimmt das? Kreuze an.", ["Lea malt einen Regenbogen.", "Sam macht das Bild mit Absicht nass.", "Das erste „’Tschuldigung“ ist zu schnell.", "Sam hilft beim neuen Bild."]),
            gesichter("Wie fühlt sich Lea? Male die Gesichter.", ["Bild ist nass", "neues Bild"], true)),
        blatt("Richtig entschuldigen",
            daumen("Ist das eine echte Entschuldigung? Kreise ein: 👍 oder 👎.", ["„Es tut mir leid. Ich helfe dir.“", "„’Tschuldigung“ – und weglaufen", "das Kind dabei anschauen", "„Selber schuld!“", "es wiedergutmachen"]),
            schreib("Was hat Sam beim zweiten Mal anders gemacht?", 2)),
        blatt("Es tut mir leid",
            luecken("", ["Es tut mir leid, dass ___"]),
            malen("Male, wie zwei Kinder sich wieder vertragen."))
    ],
    "34": [
        blatt("Das verratene Geheimnis",
            kreuz("Wie kam das Geheimnis in die halbe Klasse? Kreuze an.", ["Charlotte hat es selbst erzählt.", "Nora hat es Paula erzählt, Paula hat es weitergesagt.", "Jonas hat es gehört.", "Es stand im Klassenchat."]),
            schreib("Was macht Noras Entschuldigung zu einer guten Entschuldigung? Nenne drei Dinge.", 3),
            schreib("Charlotte sagt: „Ich brauche ein bisschen Zeit.“ Ist das in Ordnung? Begründe.", 3)),
        blatt("Die vier Teile einer Entschuldigung",
            zuordnen("Verbinde die Teile einer Entschuldigung mit Noras Sätzen.", ["sagen, was ich getan habe", "zugeben, dass es falsch war", "zeigen, dass ich die Gefühle verstehe", "es wiedergutmachen"], ["„Du hast mir vertraut.“", "„Ich sage den anderen, sie sollen dich in Ruhe lassen.“", "„Ich habe dein Geheimnis weitererzählt.“", "„Ich verstehe, dass du wütend bist.“"]),
            schreib("Warum fällt Verzeihen manchmal schwerer als Entschuldigen?", 3)),
        blatt("Meine Entschuldigung",
            schreib("Denk an etwas, das du falsch gemacht hast (oder denk dir etwas aus). Schreibe eine echte Entschuldigung mit allen vier Teilen.", 6),
            luecken("", ["Verzeihen kann ich leicht, wenn ___", "Verzeihen fällt mir schwer, wenn ___"]))
    ]
});

stunde("v-kompromisse", {
    "12": [
        blatt("Die rote Schaukel",
            stimmt("Stimmt das? Kreuze an.", ["Mia und Tom wollen beide schaukeln.", "Am ersten Tag schaukeln beide.", "Am zweiten Tag wechseln sie sich ab.", "Tom zählt bis 20."]),
            kreuz("Warum darf am ersten Tag keiner schaukeln? Kreuze an.", ["Die Schaukel ist kaputt.", "Mia und Tom streiten.", "Es regnet."])),
        blatt("Abwechseln",
            daumen("Ist das eine gute Lösung? Kreise ein: 👍 oder 👎.", ["abwechseln", "zerren und schreien", "zusammen spielen", "der Stärkere gewinnt", "bis 20 zählen und tauschen"]),
            gesichter("Wie fühlen sich Mia und Tom? Male die Gesichter.", ["auf der Bank", "beim Abwechseln"], true)),
        blatt("Wir teilen uns",
            luecken("", ["Wir können uns abwechseln bei ___"]),
            malen("Male, wie zwei Kinder sich abwechseln."))
    ],
    "34": [
        blatt("Zoo oder Schwimmbad?",
            kreuz("Was ist das Problem in der Klasse 3a? Kreuze an.", ["Niemand will einen Wandertag.", "Es steht 11 zu 11.", "Die Lehrerin will nicht mitfahren.", "Der Zoo ist geschlossen."]),
            schreib("Was ist ein Kompromiss? Schreibe es in eigenen Worten.", 2),
            schreib("Warum stimmen am Ende alle 22 Kinder zu, obwohl niemand alles bekommt?", 3)),
        blatt("Kompromisse finden",
            tabelle("Finde für jeden Streit einen Kompromiss.", ["Streit", "Unser Kompromiss"], [["Du willst Fußball, dein Freund will Basketball.", ""], ["Zwei Geschwister wollen beide vorne im Auto sitzen.", ""], ["Ihr wollt verschiedene Filme schauen.", ""], ["Beide wollen das letzte Stück Pizza.", ""]]),
            schreib("Wann ist ein Kompromiss keine gute Lösung? Hast du ein Beispiel?", 3)),
        blatt("Ich und Kompromisse",
            luecken("", ["Nachgeben fällt mir schwer, wenn ___", "Einmal haben wir einen guten Kompromiss gefunden: ___", "Bei einem Kompromiss ist mir wichtig, dass ___"]),
            schreib("Emil ruft: „Dann fahren wir eben gar nicht!“ Was würdest du ihm antworten?", 3))
    ]
});

stunde("v-nein-sagen", {
    "12": [
        blatt("Lotte sagt Nein",
            stimmt("Stimmt das? Kreuze an.", ["Paul kitzelt Lotte.", "Am Anfang ist es lustig.", "Lotte sagt nichts.", "Paul hört sofort auf."]),
            kreuz("Was sagt Lotte? Kreuze an.", ["„Mach weiter!“", "„Nein! Hör auf! Das will ich nicht!“", "„Ist mir egal.“"])),
        blatt("Mein Bauch sagt Nein",
            daumen("Darf ich hier Nein sagen? Kreise ein: 👍 ja oder 👎 nein.", ["Jemand kitzelt mich zu lange.", "Jemand will meine Hand festhalten.", "Jemand sagt: „Komm, wir ärgern das Kind!“", "Jemand will mich umarmen, aber ich will nicht."]),
            gesichter("Wie fühlt sich Lotte? Male die Gesichter.", ["lustig", "nicht mehr lustig"], true)),
        blatt("Ich sage Nein",
            schreib("Schreibe dein lautes Nein.", 1),
            malen("Male dich, wie du laut „Nein!“ sagst."))
    ],
    "34": [
        blatt("Die Mutprobe",
            kreuz("Was soll Elias machen? Kreuze an.", ["einen Klingelstreich bei Frau Berger", "Basketball spielen", "einen Ball klauen", "Frau Berger helfen"]),
            schreib("Warum fällt es Elias so schwer, Nein zu sagen?", 3),
            schreib("Was passiert, nachdem Elias Nein gesagt hat?", 3)),
        blatt("Nein sagen – aber wie?",
            tabelle("Schreibe zu jeder Situation einen klaren Nein-Satz.", ["Situation", "Mein Nein"], [["„Lass mich mal von dir abschreiben.“", ""], ["„Komm, wir schließen den Neuen aus der Gruppe aus.“", ""], ["„Gib mir dein Handy, ich will was nachschauen.“", ""], ["„Sei kein Baby, mach mit!“", ""]]),
            schreib("Carlo sagt nach Elias auch Nein. Warum macht es einen großen Unterschied, wenn einer anfängt?", 3)),
        blatt("Mein Bauch-Gefühl",
            luecken("", ["Mein Bauch sagt Nein, wenn ___", "Nein sagen fällt mir schwer bei ___", "Hinterher fühle ich mich, wenn ich Nein gesagt habe, ___"]),
            schreib("„Alle haben das schon gemacht.“ Warum ist das kein guter Grund, mitzumachen?", 3))
    ]
});
})();
