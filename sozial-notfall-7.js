/* Notfall-Stillarbeit – Teil 7 („Klartext“ Kl. 3/4, Teil 2) · Format: sozial-notfall-0.js */
(function () {
const { blatt, schreib, kreuz, daumen, luecken, zuordnen, tabelle, stimmt, stunde } = window.NF;
const nur34 = (b1, b2, b3) => ({ "34": [b1, b2, b3] });

stunde("k-luegen", nur34(
    blatt("Die Ausrede",
        kreuz("Wo ist Niklas wirklich nach der Schule? Kreuze an.", ["bei Ben zum Hausaufgaben-Machen", "mit älteren Jungs am Bahnhof", "beim Fußballtraining", "zu Hause"]),
        schreib("Die Mutter sagt: „Ich weiß jetzt nicht mehr, wann ich dir glauben kann.“ Warum ist das für Niklas schlimmer als die Strafe?", 3),
        schreib("Warum glaubt ihm eine Woche später keiner, obwohl er wirklich krank ist?", 3)),
    blatt("Lügen und Vertrauen",
        daumen("Stimmt das? Kreise ein: 👍 oder 👎.", ["Eine Lüge ist schnell erzählt.", "Vertrauen ist sofort wieder da, wenn man sich entschuldigt.", "Wer oft lügt, dem glaubt man auch die Wahrheit nicht.", "Eine kleine Lüge hat nie Folgen.", "Vertrauen zurückholen dauert lange."]),
        schreib("Niklas findet die Strafe ungerecht: „Das war doch nur einmal!“ Was würdest du ihm antworten?", 3)),
    blatt("Vertrauen zurückholen",
        luecken("", ["Ich vertraue jemandem, wenn ___", "Mein Vertrauen ist weg, wenn ___", "Um Vertrauen zurückzuholen, kann man ___"]),
        schreib("Schreibe einen Plan für Niklas: Was kann er in den nächsten Wochen tun, damit seine Mutter ihm wieder glaubt?", 4))
));

stunde("k-erwachsene", nur34(
    blatt("Unfair!",
        kreuz("Was hat die Aufsicht nicht gesehen? Kreuze an.", ["dass Marie den Jungen geschubst hat", "dass der Junge Marie vorher zweimal geschubst hat", "dass Marie die Tür geknallt hat", "dass es geregnet hat"]),
        schreib("Was macht Marie, als sie reingeschickt wird? Was passiert danach?", 3),
        schreib("Die Sozialarbeiterin sagt: „Du hattest recht. Aber dir hat keiner mehr zugehört.“ Erkläre.", 3)),
    blatt("Gehört werden",
        tabelle("Wie wirkt das auf einen Erwachsenen? Schreibe: hört zu oder hört nicht mehr zu.", ["Marie …", "Wirkung"], [["schreit: „Sie haben keine Ahnung!“", ""], ["sagt: „Er hat mich vorher zweimal geschubst.“", ""], ["knallt die Tür", ""], ["bittet später um ein Gespräch", ""], ["holt ein Kind, das alles gesehen hat", ""]]),
        schreib("Wie hätte Marie es schaffen können, dass man ihr zuhört? Schreibe Schritt für Schritt.", 4)),
    blatt("Wenn es unfair ist",
        luecken("", ["Unfair behandelt fühle ich mich, wenn ___", "Dann mache ich oft ___", "Ein Erwachsener, mit dem ich in Ruhe reden kann: ___ (Name nicht nötig)"]),
        schreib("Schreibe einen Satz, mit dem du einem Erwachsenen ruhig sagen kannst, dass du etwas unfair findest.", 3))
));

stunde("k-ausgrenzung", nur34(
    blatt("Die Gruppe",
        kreuz("Woran merkt Anna, dass sie nicht dazugehören soll? Kreuze alles an, was stimmt.", ["„Hier ist kein Platz mehr.“", "Sie wird zum Geburtstag eingeladen.", "Ihr Stuhl steht plötzlich am Rand.", "Sie wird beim Sport als Letzte gewählt."]),
        schreib("Was passiert eine Woche später mit Charlotte?", 2),
        schreib("Charlotte merkt zum ersten Mal, wie sich Anna gefühlt haben muss. Was könnte sie jetzt tun?", 3)),
    blatt("Wie Ausgrenzung funktioniert",
        tabelle("Wie wird hier ausgegrenzt – und was könnte man dagegen tun?", ["Das passiert", "Dagegen kann man …"], [["Jemand wird aus dem Gruppenchat geworfen.", ""], ["„Hier ist kein Platz mehr.“", ""], ["Alle kichern, wenn sie kommt.", ""], ["Jemand wird nie gewählt.", ""]]),
        schreib("Warum kann es in einer Clique jeden treffen – auch die, die gerade dazugehören?", 3)),
    blatt("Drinnen oder draußen",
        luecken("", ["Ich gehöre gern zu einer Gruppe, weil ___", "Ich war auch schon mal draußen, als ___ (du darfst dir etwas ausdenken)", "Damit eine Gruppe fair ist, braucht sie ___"]),
        schreib("Schreibe einen Satz, mit dem du ein Kind wie Anna einladen könntest – auch wenn die anderen kichern.", 3))
));

stunde("k-wut-eisberg", nur34(
    blatt("Der Eisberg",
        kreuz("Was passiert, bevor Dennis explodiert? Kreuze alles an, was stimmt.", ["Er weiß die Lösung nicht.", "Jemand kichert.", "Er bekommt eine Eins.", "Er soll an der Tafel rechnen."]),
        schreib("Welche Gefühle stecken bei Dennis „unter Wasser“?", 3),
        schreib("Erkläre den Satz: „Wut ist oft ein Bodyguard für Gefühle, die wehtun.“", 3)),
    blatt("Unter der Wasserlinie",
        tabelle("Was könnte unter der Wut stecken? Schreibe ein mögliches Gefühl dazu.", ["Situation (man sieht Wut)", "Darunter steckt vielleicht …"], [["Ein Kind wirft das Heft weg, als es eine Fünf bekommt.", ""], ["Ein Kind brüllt, weil es beim Wählen übrig bleibt.", ""], ["Ein Kind schlägt zu, als jemand über seine Familie redet.", ""], ["Ein Kind ist wütend, weil der Vater wieder nicht kommt.", ""]]),
        schreib("Warum zeigen viele lieber Wut als Scham, Angst oder Traurigkeit?", 3)),
    blatt("Mein Eisberg",
        luecken("Denk an eine Situation, in der du wütend warst.", ["Das haben alle gesehen: ___", "Darunter war vielleicht: ___", "Geholfen hätte mir: ___"]),
        schreib("Mit wem kannst du über die Gefühle unter der Wasserlinie reden? Was brauchst du dafür?", 3))
));

stunde("k-rache", nur34(
    blatt("Zurückzahlen",
        tabelle("Was passiert an welchem Tag?", ["Tag", "Was passiert?"], [["Montag", ""], ["Dienstag", ""], ["Mittwoch", ""], ["Donnerstag", ""], ["Freitag", ""]]),
        schreib("„Keiner weiß mehr genau, worum es am Anfang ging.“ Warum ist das bei Rache oft so?", 3)),
    blatt("Der Rache-Kreis",
        schreib("Jeder denkt, er macht es „jetzt gerecht“. Warum wird es trotzdem jeden Tag schlimmer?", 3),
        tabelle("An welchem Tag hätte wer den Kreis stoppen können – und wie?", ["Tag / Wer?", "So hätte er stoppen können"], [["", ""], ["", ""], ["", ""]]),
        daumen("Stoppt das den Kreis? Kreise ein: 👍 oder 👎.", ["Einmal nicht zurückzahlen", "Es dem anderen „noch heftiger“ heimzahlen", "Einen Erwachsenen holen", "Freunde zum Mithelfen anstiften"])),
    blatt("Rache oder Lösung?",
        luecken("", ["Ich will mich rächen, wenn ___", "Rache fühlt sich kurz ___ an, aber danach ___", "Statt Rache kann ich ___"]),
        schreib("Ist es feige, sich nicht zu rächen? Schreibe deine Meinung und begründe sie.", 4))
));

stunde("k-freunde-echt", nur34(
    blatt("Kumpel",
        kreuz("Was fällt Kevin bei Carlo auf? Kreuze alles an, was stimmt.", ["Er bekommt geliehenes Geld nie zurück.", "Carlo bringt ihm die Hausaufgaben.", "Carlo macht vor anderen Witze über ihn.", "Er soll für Carlo Zigaretten holen."]),
        schreib("Was macht Marc für Kevin?", 2),
        schreib("Carlo sagt: „Du bist doch mein Kumpel.“ Warum benutzt er dieses Wort gerade dann?", 3)),
    blatt("Echt oder falsch?",
        tabelle("Echter Freund oder falscher Freund? Schreibe E oder F.", ["Verhalten", "E / F"], [["hört zu, wenn du Ärger hast", ""], ["will dauernd Geld, gibt nie etwas zurück", ""], ["lacht mit den anderen über dich", ""], ["sagt ehrlich, wenn du Mist baust", ""], ["bringt dich dazu, verbotene Sachen zu machen", ""], ["ist auch da, wenn es dir schlecht geht", ""]]),
        schreib("Warum bleiben manche bei falschen Freunden, obwohl sie es merken?", 3)),
    blatt("Meine Freunde",
        luecken("", ["Ein echter Freund ist für mich jemand, der ___", "Ich merke, dass mich jemand ausnutzt, wenn ___", "Ich bin ein echter Freund, weil ___"]),
        schreib("Was rätst du Kevin? Schreibe ihm ein paar Sätze.", 4))
));

stunde("k-konsequenzen", nur34(
    blatt("Ohne Regeln",
        kreuz("Was passiert in der Klasse ohne Regeln? Kreuze alles an, was stimmt.", ["Mia hat Kopfschmerzen vom Lärm.", "Alle arbeiten ruhig.", "Ein Fenster geht kaputt.", "Die Letzten bekommen nichts zu essen.", "Bei Streit greift keiner ein."]),
        schreib("Warum ist es überraschend, dass ausgerechnet Jonas Regeln fordert?", 2),
        schreib("Jonas sagt: „Aber nur Regeln, die Sinn machen.“ Was meint er?", 3)),
    blatt("Strafe oder Folge?",
        tabelle("Welche Folge wäre fair? Schreibe eine passende Konsequenz.", ["Das ist passiert", "Faire Folge"], [["Jemand macht absichtlich ein Fenster kaputt.", ""], ["Jemand nimmt allen das gute Essen weg.", ""], ["Jemand stört dauernd mit lauter Musik.", ""], ["Jemand beleidigt ein anderes Kind.", ""]]),
        schreib("Was ist der Unterschied zwischen einer Strafe und einer Wiedergutmachung?", 3)),
    blatt("Regeln, die Sinn machen",
        schreib("Schreibe drei Regeln für eure Klasse, die wirklich Sinn machen – mit Begründung.", 6),
        luecken("", ["Eine Regel, die ich ungerecht finde: ___", "Ich würde sie so ändern: ___"]))
));

stunde("k-gefuehle-zeigen", nur34(
    blatt("Hinter der Maske",
        kreuz("Wie zeigt Mo normalerweise, dass ihm „alles egal“ ist? Kreuze an.", ["Er lacht über eine Sechs.", "Er weint oft.", "Er sagt: „Juckt mich nicht.“", "Er erzählt jedem seine Sorgen."]),
        schreib("Warum schnauzt Mo Leon an, als der fragt, was los ist?", 3),
        schreib("Die Lehrerin sagt: „Weinen heißt, dass dir etwas wichtig war.“ Was hältst du von diesem Satz?", 3)),
    blatt("Harte Schale – weicher Kern",
        tabelle("Was zeigt man nach außen – und was ist vielleicht innen?", ["Außen (Maske)", "Innen (vielleicht)"], [["„Juckt mich nicht.“", ""], ["Lachen über eine schlechte Note", ""], ["„Lass mich!“", ""], ["cool tun, wenn alle zuschauen", ""]]),
        schreib("Warum glauben manche Jungen, dass sie keine Gefühle zeigen dürfen?", 3)),
    blatt("Meine Maske",
        luecken("", ["Ich setze eine „Maske“ auf, wenn ___", "Gefühle zeigen kann ich bei ___ (Name nicht nötig)", "Ein Gefühl, das ich nicht gern zeige: ___"]),
        schreib("Mo sagt: „Erzähl das bloß keinem.“ Schreibe auf, was du an Leons Stelle tun würdest, wenn du es erfährst.", 3))
));

stunde("k-neid", nur34(
    blatt("Das neue Handy",
        kreuz("Was macht Robin, als er neidisch ist? Kreuze alles an, was stimmt.", ["Er sagt: „Ist eh nur geklaut.“", "Er gratuliert.", "Er versteckt das Handy.", "Er fragt, ob er es mal anschauen darf."]),
        schreib("Warum hat Leandro das neue Handy? Was hätte er lieber?", 3),
        schreib("„Robin hatte nur das Handy gesehen.“ Was bedeutet dieser Satz?", 3)),
    blatt("Neid erkennen",
        daumen("Was passiert, wenn man neidisch ist? Kreise ein: 👍 kenne ich oder 👎 kenne ich nicht.", ["ein Stich im Bauch", "schlecht über den anderen reden", "mich selbst klein finden", "mehr haben wollen", "mich mit anderen vergleichen"]),
        schreib("Was kann man tun, wenn man neidisch ist – ohne jemandem zu schaden?", 3),
        schreib("Warum sagt das, was jemand hat, oft wenig darüber, wie es ihm wirklich geht?", 3)),
    blatt("Vergleichen",
        luecken("", ["Neidisch werde ich manchmal auf ___", "Dann denke ich über mich: ___", "Was ich habe und schätze: ___"]),
        schreib("Robin hat etwas falsch gemacht. Schreibe, wie er es bei Leandro wiedergutmachen könnte.", 3))
));

stunde("k-verpetzen", nur34(
    blatt("Das Messer",
        kreuz("Warum sagt Vincent erst nichts? Kreuze an.", ["Er findet das Messer cool.", "Er hat gelernt: Petzen ist das Schlimmste.", "Er weiß nicht, was ein Messer ist.", "Yannick hat ihm Geld gegeben."]),
        schreib("Warum hat Yannick das Messer dabei? Ist das eine gute Idee?", 3),
        schreib("Vincent kann abends nicht schlafen. Was geht ihm durch den Kopf?", 3)),
    blatt("Petzen oder schützen?",
        tabelle("Muss man hier einem Erwachsenen Bescheid sagen? Schreibe ja oder nein – und warum.", ["Situation", "ja / nein – warum?"], [["Ein Freund hat eine Waffe dabei.", ""], ["Jemand hat bei einem Test gespickt.", ""], ["Ein Kind wird regelmäßig abgezogen (erpresst).", ""], ["Jemand will einem anderen nach der Schule auflauern.", ""], ["Jemand hat sein Pausenbrot nicht aufgegessen.", ""]]),
        schreib("Was ist der Unterschied zwischen Petzen und Hilfe holen?", 3)),
    blatt("Was hätte ich gemacht?",
        luecken("", ["An Vincents Stelle hätte ich ___", "Es ist schwer, Bescheid zu sagen, weil ___", "Ich könnte es diesem Erwachsenen sagen: ___ (Name nicht nötig)"]),
        schreib("Yannick hat Angst vor den Sechstklässlern. Was hätte ihm wirklich geholfen?", 4))
));

stunde("k-schlichten", nur34(
    blatt("Am nächsten Morgen",
        kreuz("Warum findet das Gespräch erst am nächsten Morgen statt? Kreuze an.", ["Frau Fischer hatte vorher keine Zeit.", "Jetzt sind beide ruhig.", "Die Eltern mussten dabei sein.", "Es war schon Schulschluss."]),
        schreib("Welche drei Regeln gelten bei Frau Fischer?", 3),
        schreib("Was verabreden Jonas und Elias am Ende?", 2)),
    blatt("So klärt man einen Streit",
        tabelle("Bringe die Schritte in die richtige Reihenfolge (1–5).", ["Schritt", "Nr."], [["Jeder sagt, was er sich wünscht und was er wiedergutmachen kann.", ""], ["Beide werden erst getrennt und beruhigen sich.", ""], ["Einer erzählt, der andere hört zu – dann umgekehrt.", ""], ["Man verabredet eine Lösung.", ""], ["Jemand fasst zusammen, was beide gefühlt haben.", ""]]),
        schreib("Warum ist es wichtig, dass Frau Fischer „auf keiner Seite“ ist?", 3)),
    blatt("Mein Streit-Gespräch",
        luecken("Denk an einen Streit (echt oder ausgedacht).", ["Ich war sauer, weil ___", "Der andere hat sich vielleicht ___ gefühlt.", "Ich wünsche mir vom anderen: ___", "Ich kann wiedergutmachen: ___"]),
        schreib("Warum klappt so ein Gespräch nicht mitten in der Pause?", 2))
));

stunde("k-ruf", nur34(
    blatt("Der Neue Anfang",
        kreuz("Welchen Ruf hat Marlon an seiner alten Schule? Kreuze an.", ["der Klassenbeste", "der, der immer Stress macht", "der Lustigste", "der Schüchterne"]),
        schreib("Was macht Marlon in der ersten Woche an der neuen Schule anders?", 3),
        schreib("Marlon fragt sich: „Bin ich wirklich so – oder bin ich nur in diese Rolle gerutscht?“ Was denkst du?", 3)),
    blatt("Wie ein Ruf entsteht",
        daumen("Stimmt das? Kreise ein: 👍 oder 👎.", ["Ein Ruf entsteht schnell und geht langsam weg.", "Wer einen schlechten Ruf hat, war es immer.", "Andere sehen oft nur das, was sie erwarten.", "Man kann einen Ruf nie ändern.", "Kleine gute Taten können viel verändern."]),
        schreib("Wenn etwas kaputt ist, schauen alle zuerst Marlon an. Wie fühlt sich das an – auch wenn er es nicht war?", 3)),
    blatt("Wer ich sein will",
        luecken("", ["So sehen mich andere wohl: ___", "So bin ich wirklich: ___", "So möchte ich gesehen werden: ___", "Das kann ich diese Woche dafür tun: ___"]),
        schreib("Was können Lehrer und Mitschüler tun, damit jemand wie Marlon eine echte zweite Chance bekommt?", 3))
));
})();
