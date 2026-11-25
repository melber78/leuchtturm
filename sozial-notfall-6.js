/* Notfall-Stillarbeit – Teil 6 („Klartext“ Kl. 3/4, Teil 1) · Format: sozial-notfall-0.js */
(function () {
const { blatt, schreib, kreuz, daumen, luecken, zuordnen, tabelle, stimmt, stunde } = window.NF;
const nur34 = (b1, b2, b3) => ({ "34": [b1, b2, b3] });

stunde("k-respekt", nur34(
    blatt("Der Boss vom Schulhof",
        kreuz("Warum machen die anderen Platz, wenn Kai kommt? Kreuze an.", ["Sie mögen ihn sehr.", "Sie haben Angst, geschubst oder „Opfer“ genannt zu werden.", "Er ist der Beste im Tischtennis.", "Die Lehrer haben es so bestimmt."]),
        schreib("Woran merkt man, dass Luisa wirklich respektiert wird? Nenne zwei Dinge.", 3),
        schreib("Als Kai zwei Wochen fehlt, vermisst ihn keiner. Was sagt das über seinen „Respekt“?", 3)),
    blatt("Respekt oder Angst?",
        tabelle("Echter Respekt oder Angst? Schreibe R oder A – und warum.", ["Situation", "R / A – warum?"], [["Alle lachen über seine Witze, weil sie sonst Ärger kriegen.", ""], ["Jüngere holen sie, wenn es Streit gibt.", ""], ["Keiner widerspricht ihm, weil er droht.", ""], ["Man kann sich darauf verlassen, was er verspricht.", ""], ["Alle machen Platz, wenn sie kommt.", ""]]),
        schreib("Was ist der Unterschied zwischen „Jemand hat Angst vor mir“ und „Jemand respektiert mich“?", 3)),
    blatt("Wie ich respektiert werden will",
        luecken("", ["Eine Person, die ich respektiere: ___ (Name nicht nötig)", "Ich respektiere sie, weil ___", "So möchte ich respektiert werden: ___"]),
        schreib("Welche drei Dinge kannst du tun, damit andere dich wirklich respektieren – ohne Angst zu machen?", 4))
));

stunde("k-sprueche", nur34(
    blatt("Nur Spaß?",
        kreuz("Ab wann ist das „Battle“ kein Spaß mehr für Lennart? Kreuze an.", ["bei den Sprüchen über Fußball", "beim Spruch über seine alten Turnschuhe", "erst beim Schubsen", "gar nicht – es war die ganze Zeit Spaß"]),
        schreib("Warum wird es härter, als die anderen um sie herumstehen und johlen?", 3),
        schreib("Hannes schreit: „War doch nur Spaß!“ Hat er recht? Begründe.", 3)),
    blatt("Wo ist die Grenze?",
        daumen("Ist das noch Spaß unter Freunden? Kreise ein: 👍 noch okay oder 👎 Grenze überschritten.", ["Sprüche über den Lieblingsverein", "Sprüche über die Familie", "Sprüche über Kleidung, die sich jemand nicht leisten kann", "Witze, über die beide lachen", "Weitermachen, obwohl der andere still wird"]),
        schreib("Woran merkst du, dass ein Spruch beim anderen zu weit gegangen ist? Nenne Zeichen.", 3),
        schreib("Was hätte Lennart statt Schubsen tun können?", 2)),
    blatt("Meine Grenze",
        luecken("", ["Ein Spruch über ___ trifft mich richtig.", "Wenn jemand zu weit geht, kann ich sagen: „___“", "Wenn ich merke, dass ich zu weit gegangen bin, sage ich: „___“"]),
        schreib("Schreibe eine Regel für „Spruch-Battles“, mit der alle leben könnten.", 3))
));

stunde("k-eskalation", nur34(
    blatt("Das Foul",
        tabelle("Schreibe die Stufen der Eskalation in die richtige Reihenfolge (1 = Anfang).", ["Was passiert?", "Stufe"], [["Max schubst zurück.", ""], ["Leon grätscht Max von hinten um.", ""], ["„Halt die Klappe!“", ""], ["Leon holt aus.", ""], ["„Was guckst du so?“", ""], ["„Das war ein Foul, du Idiot!“", ""]]),
        schreib("Max sagt: „Irgendwann konnte ich nicht mehr zurück.“ Was meint er damit?", 3)),
    blatt("Die Treppe runter",
        tabelle("Wo hätten Leon oder Max aussteigen können? Schreibe, was sie stattdessen hätten tun können.", ["Stufe", "Aussteigen – so geht's"], [["nach dem Foul", ""], ["bei „Was guckst du so?“", ""], ["beim Rempeln", ""]]),
        schreib("Ein paar Kinder rufen „Schlägerei!“ und holen ihre Handys raus. Wie machen die Zuschauer alles schlimmer?", 3)),
    blatt("Meine Ausstiege",
        luecken("", ["Bei Streit merke ich an ___, dass es gleich eskaliert.", "Mein Ausstiegs-Satz: „___“", "Am schwersten ist das Aussteigen für mich, wenn ___"]),
        schreib("Warum ist es auf den unteren Stufen viel leichter auszusteigen als oben?", 3),
        schreib("Was kannst du als Zuschauer tun, damit ein Streit nicht weiter hochgeht?", 3))
));

stunde("k-wut-frueh", nur34(
    blatt("Zehn Sekunden",
        tabelle("Wie fängt Henris Wut an? Schreibe die Reihenfolge seiner Wut-Zeichen auf.", ["Stufe", "Henri merkt …"], [["1", ""], ["2", ""], ["3", ""]]),
        schreib("Welche Schritte macht Henri, als er das Warme im Bauch spürt?", 3),
        schreib("Warum ist es wichtig, dass Henri die Wut schon bei Stufe 1 bemerkt?", 3)),
    blatt("Früh bremsen",
        daumen("Hilft das, die Wut früh zu bremsen? Kreise ein: 👍 oder 👎.", ["Fäuste aufmachen", "Dem anderen sofort etwas zurückrufen", "Füße fest auf den Boden, langsam ausatmen", "Um eine kurze Pause bitten", "Immer weiter an den Spruch denken"]),
        schreib("Henri ist danach „immer noch sauer“. Ist sein Plan trotzdem gelungen? Begründe.", 3)),
    blatt("Meine Wut-Zeichen",
        tabelle("Wie fängt deine Wut an? Fülle deine eigene Wut-Treppe aus.", ["Stufe", "Das merke ich", "Das tue ich dann"], [["1 – es fängt an", "", ""], ["2 – es wird mehr", "", ""], ["3 – kurz vorm Platzen", "", ""]]),
        luecken("", ["Der beste Moment, um zu bremsen, ist bei mir ___", "Dafür brauche ich von Erwachsenen ___"]))
));

stunde("k-gruppendruck", nur34(
    blatt("Die Jacke",
        kreuz("Was hat Marvin vor? Kreuze an.", ["Pauls Jacke verstecken, damit sie nicht geklaut wird.", "Pauls Jacke in den Müll werfen.", "Paul eine Jacke schenken.", "Die Jacke anprobieren."]),
        schreib("Was denkt Anton eigentlich? Warum fällt es ihm trotzdem schwer, Nein zu sagen?", 3),
        schreib("Mit welchen Sätzen setzt Marvin Anton unter Druck?", 2)),
    blatt("Was kann Anton tun?",
        tabelle("Was passiert, wenn Anton …", ["Anton …", "Was passiert dann wohl?"], [["mitmacht", ""], ["nur zuschaut und nichts sagt", ""], ["sagt: „Lasst den Quatsch“", ""], ["leise einen Erwachsenen holt", ""]]),
        schreib("Warum machen bei so etwas oft alle mit, obwohl viele es eigentlich fies finden?", 3)),
    blatt("Ich und die Gruppe",
        luecken("", ["Dazugehören ist mir wichtig, weil ___", "Ich lasse mich unter Druck setzen, wenn ___", "Ein Satz, mit dem ich mich rausnehmen kann: „___“"]),
        schreib("Schreibe das Ende der Geschichte so, wie du es dir wünschst.", 5))
));

stunde("k-handyvideo", nur34(
    blatt("Das Video",
        kreuz("Was passiert mit dem Video? Kreuze alles an, was stimmt.", ["Es landet im Klassenchat.", "Lara löscht es sofort.", "Es wird an die Parallelklasse weitergeleitet.", "Am nächsten Morgen kennt es die halbe Schule."]),
        schreib("Wie geht es Tom am nächsten Tag? Warum?", 3),
        schreib("Warum gibt es auch für Lara und die, die weitergeleitet haben, ein Gespräch?", 3)),
    blatt("Filmen – teilen – weiterleiten",
        daumen("Was ist richtig? Kreise ein: 👍 oder 👎.", ["Ein Video weiterleiten ist egal, ich hab es ja nicht gefilmt.", "Menschen ohne Erlaubnis zu filmen ist verboten.", "Bei einer Schlägerei zuerst Hilfe holen statt filmen.", "Wenn alle es teilen, ist es okay.", "Ein Lach-Emoji unter so einem Video tut auch weh."]),
        schreib("Was hätten die Kinder auf dem Schulhof tun sollen, statt zu filmen?", 3)),
    blatt("Mein Handy – meine Verantwortung",
        luecken("", ["Wenn ich so ein Video bekomme, mache ich ___", "Ich möchte nie, dass jemand von mir ___ filmt.", "Im Klassenchat ist mir wichtig, dass ___"]),
        schreib("Schreibe drei Regeln für euren Klassenchat.", 4))
));

stunde("k-provokation", nur34(
    blatt("Der Knopf",
        kreuz("Was passiert jedes Mal, wenn Nico provoziert wird? Kreuze an.", ["Er lacht darüber.", "Er explodiert und landet im Trainingsraum.", "Er geht zur Lehrerin.", "Er ignoriert es."]),
        schreib("Erkläre das Bild mit der Fernbedienung in eigenen Worten.", 3),
        schreib("Warum gibt Matti am Ende auf?", 2)),
    blatt("Nicht drauf einsteigen",
        tabelle("Welche Reaktion gibt dem anderen die Fernbedienung – welche nimmt sie ihm weg? Schreibe gibt oder nimmt.", ["Reaktion", "gibt / nimmt"], [["Stuhl umwerfen", ""], ["„Langweilig.“ und wegdrehen", ""], ["zurückbeleidigen", ""], ["tief durchatmen und weitermachen", ""], ["weinen und schreien", ""]]),
        schreib("Warum macht jemand überhaupt Provokationen? Was hat er davon?", 3)),
    blatt("Mein Knopf",
        luecken("", ["Mein „Knopf“ ist, wenn jemand ___ (du musst es nicht genau schreiben).", "Wenn jemand meinen Knopf drückt, sage ich ab jetzt: „___“", "Danach mache ich ___"]),
        schreib("Nicht drauf einsteigen ist schwer. Was hilft dir dabei – und was brauchst du von den Erwachsenen?", 4))
));

stunde("k-mist-gebaut", nur34(
    blatt("Das kaputte Tablet",
        kreuz("Was passiert, als die Lehrerin fragt? Kreuze an.", ["Benni gibt es sofort zu.", "Beide schieben die Schuld auf den anderen.", "Kevin sagt die Wahrheit.", "Niemand sagt etwas."]),
        schreib("Warum glaubt die Lehrerin am Ende keinem von beiden?", 2),
        schreib("Was macht Benni zwei Tage später? Warum ist das mutig?", 3)),
    blatt("Ausreden oder Verantwortung?",
        tabelle("Ausrede oder Verantwortung? Schreibe A oder V.", ["Satz", "A / V"], [["„Ich war's nicht!“", ""], ["„Das lag sowieso schon am Rand.“", ""], ["„Das war meine Schuld.“", ""], ["„Der hat angefangen.“", ""], ["„Kann ich das wiedergutmachen?“", ""]]),
        schreib("Warum suchen viele zuerst eine Ausrede, wenn sie Mist gebaut haben?", 3)),
    blatt("Wiedergutmachen",
        luecken("", ["Als ich mal Mist gebaut habe, habe ich zuerst ___", "Am schwersten ist das Zugeben, weil ___", "Wiedergutmachen könnte ich, indem ich ___"]),
        schreib("Benni hilft eine Woche beim Tablet-Dienst. Warum ist so eine Wiedergutmachung besser als nur eine Strafe?", 4))
));

stunde("k-stark", nur34(
    blatt("Zwei Arten von stark",
        kreuz("Warum verliert die Mannschaft? Kreuze an.", ["Jonas hält schlecht.", "Frederik bekommt die rote Karte, weil er ausrastet.", "Es regnet.", "Der Schiri ist unfair."]),
        schreib("Was macht Jonas in der Kabine?", 2),
        schreib("Wer ist in dieser Geschichte wirklich stark? Begründe deine Meinung.", 3)),
    blatt("Was ist stark?",
        tabelle("Ist das stark – oder nur laut? Schreibe deine Meinung.", ["Verhalten", "stark / nicht stark – warum?"], [["zwanzig Liegestütze schaffen", ""], ["nach einer Beleidigung ruhig bleiben", ""], ["„Sorry, das war dumm von mir“ sagen", ""], ["Jemandem zeigen, „wer der Chef ist“", ""], ["Einen Freund trösten, obwohl man selbst sauer ist", ""]]),
        schreib("Frederik sagt am Ende: „Sorry, Mann.“ Warum ist das auch eine Art von Stärke?", 2)),
    blatt("Meine Stärke",
        luecken("", ["Körperlich stark bin ich bei ___", "Innerlich stark war ich, als ___", "Stärker werden möchte ich bei ___"]),
        schreib("Schreibe auf, was „stark sein“ für dich bedeutet – mit einem Beispiel.", 4))
));

stunde("k-koerpergrenzen", nur34(
    blatt("Schwitzkasten",
        kreuz("Was passiert, als Finn „Stopp!“ ruft? Kreuze an.", ["Robin lässt sofort los.", "Robin lacht und drückt weiter.", "Die Lehrerin kommt.", "Finn lacht weiter."]),
        schreib("Warum tritt Finn nach hinten?", 2),
        schreib("Robin sagt: „Ich hab nicht gemerkt, dass es ernst war.“ Finn sagt: „Ich hab doch Stopp gesagt!“ Wer hat recht? Begründe.", 4)),
    blatt("Stopp heißt Stopp",
        daumen("Stimmt das? Kreise ein: 👍 oder 👎.", ["Wenn einer „Stopp“ sagt, hört man sofort auf.", "Wer lacht, meint Stopp nicht ernst.", "Auch beim Raufen gibt es Grenzen.", "„Weichei“ sagen ist okay, wenn man spielt.", "Am Hals drücken ist immer gefährlich."]),
        schreib("Schreibe zwei Regeln fürs Raufen, damit niemand verletzt wird.", 3)),
    blatt("Meine Grenzen",
        luecken("", ["Ich mag es nicht, wenn jemand ___", "Ich zeige meine Grenze, indem ich ___", "Wenn jemand nicht aufhört, hole ich ___"]),
        schreib("Was kannst du tun, wenn du siehst, dass jemand beim Raufen nicht mehr lacht?", 3))
));

stunde("k-laestern", nur34(
    blatt("Die Schuhe",
        kreuz("Wie reagiert Sara auf das Lästern? Kreuze an.", ["Sie lacht mit.", "Sie zieht die Schuhe am nächsten Tag nicht mehr an.", "Sie schreibt zurück.", "Sie geht zur Polizei."]),
        schreib("Was weiß keiner über Jana? Warum lacht sie über andere?", 3),
        schreib("Ist Jana damit entschuldigt? Begründe deine Meinung.", 3)),
    blatt("Lästern – was tun?",
        tabelle("Was könnten diese Personen tun?", ["Person", "Das könnte sie tun"], [["Ein Mädchen, das mitgelacht hat", ""], ["Jemand in der Gruppe, der die Nachricht liest", ""], ["Kim, Janas Freundin", ""], ["Sara", ""]]),
        schreib("Warum fühlt sich Lästern im Chat oft noch schlimmer an als auf dem Schulhof?", 3)),
    blatt("Ich und das Lästern",
        luecken("", ["Wenn über jemanden gelästert wird, fühle ich mich ___", "Ich habe auch schon mal ___ (du musst nichts verraten)", "Ab heute mache ich, wenn gelästert wird: ___"]),
        schreib("Kim schreibt Jana privat. Warum ist das mutig? Schreibe eine eigene Nachricht an Jana.", 4))
));

stunde("k-gaming", nur34(
    blatt("Game over",
        kreuz("Was passiert, nachdem Luca im Chat ausgelacht wird? Kreuze alles an, was stimmt.", ["Er macht eine Pause.", "Er brüllt und beschimpft den anderen.", "Er knallt den Controller auf den Boden.", "Das Handy ist für zwei Tage weg."]),
        schreib("Wie wirkt sich der Ärger vom Nachmittag auf den nächsten Schultag aus?", 3),
        schreib("Welche zwei Regeln hat Lucas Cousin?", 2)),
    blatt("Wut beim Zocken",
        daumen("Hilft das beim Zocken? Kreise ein: 👍 oder 👎.", ["Nach zwei verlorenen Runden Pause machen", "Im Chat zurückpöbeln", "Pöbler stummschalten", "Weiterspielen, bis man endlich gewinnt", "Vor dem Schlafen nicht mehr zocken"]),
        schreib("Warum macht verlieren beim Zocken manchmal wütender als im echten Spiel?", 3)),
    blatt("Meine Zock-Regeln",
        luecken("", ["Beim Zocken werde ich wütend, wenn ___", "Das merke ich an ___", "Meine Pause-Regel: ___"]),
        schreib("Schreibe drei Regeln für dich selbst, damit das Zocken Spaß macht und dich nicht wütend in die Schule schickt.", 4))
));
})();
