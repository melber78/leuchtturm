/* Leuchtturm – Sozialtraining: Vorlagen Teil 5 (Kooperation, Achtsamkeit, Vielfalt & Respekt)
   Format wie in sozial-einheiten.js beschrieben. */
window.SOZIAL_VORLAGEN.push(

/* ============================== KOOPERATION & TEAMGEIST ============================== */
SOZIAL_EINHEIT({
    id: "v-gemeinsam",
    titel: "Gemeinsam schaffen wir das",
    kategorie: "Kooperation & Teamgeist",
    ziel12: "Erleben, dass man zusammen mehr schafft als allein",
    ziel34: "Zusammenarbeit planen: absprechen, Aufgaben verteilen, einander zuhören",
    material: "Pro Tischpaar ein Blatt Papier und EIN Stift",
    lerntext12: { titel: "Die Riesenrübe", text:
`Der Großvater hat eine Rübe gepflanzt. Die Rübe wächst und wächst. Sie wird riesengroß!

Der Großvater will die Rübe herausziehen. Er zieht und zieht – aber die Rübe bewegt sich nicht.

Er ruft die Großmutter. Die Großmutter zieht am Großvater, der Großvater zieht an der Rübe. Sie ziehen und ziehen – nichts.

Die Großmutter ruft das Enkelkind. Das Enkelkind ruft den Hund. Der Hund ruft die Katze. Alle ziehen – aber die Rübe bleibt stecken.

Da kommt eine kleine Maus. „Ich helfe mit!“ Die anderen lachen: „Du bist doch viel zu klein!“ Aber die Maus zieht an der Katze, die Katze am Hund, der Hund am Enkelkind, das Enkelkind an der Großmutter, die Großmutter am Großvater – **und hopp!** – die Rübe ist draußen!

**Nach dem Vorlesen:**
1. Warum ging die Rübe nicht heraus?
2. Wen haben sie alles zu Hilfe gerufen?
3. Warum haben die anderen über die Maus gelacht?
4. Wer hat die Rübe herausgezogen?` },
    lerntext34: { titel: "Das Floß", text:
`Beim Projekttag sollen zwei Gruppen aus Flaschen, Stöcken und Schnur ein Floß bauen, das ein Kuscheltier über den Teich trägt.

In Gruppe A fängt jeder sofort an. Lars bindet Flaschen zusammen, Mia sucht Stöcke, Jonah will lieber ein Segel bauen. Keiner spricht sich ab. Nach einer halben Stunde liegen drei halbe Flöße auf der Wiese – und keines schwimmt.

Gruppe B setzt sich zuerst zusammen. „Wer kann gut knoten?“, fragt Aylin. „Ich!“, sagt Tom. „Wer zeichnet einen Plan?“ – Lena. „Wer testet, ob es schwimmt?“ – Kemal. Sie hören sich gegenseitig zu, auch als Lena eine Idee hat, die erst komisch klingt: Die Flaschen mit dem Deckel nach unten. Es klappt!

Das Floß von Gruppe B trägt den Teddy sicher über den Teich. Gruppe A ist enttäuscht. Aber dann fragt Lars: „Zeigt ihr uns, wie ihr das gemacht habt?“ Am Ende schwimmen zwei Flöße.

**Fragen zum Gespräch:**
1. Warum hat es in Gruppe A nicht geklappt?
2. Was hat Gruppe B anders gemacht? Nenne mindestens drei Dinge.
3. Warum war es wichtig, dass Gruppe B Lenas komische Idee angehört hat?
4. Was hat Lars am Ende Gutes getan?` },
    uebungen: [
        { titel: "Ein Bild – ein Stift", fuer: "alle", dauer: "6 Min",
          text: "Die Tischnachbarn halten gemeinsam EINEN Stift und malen zusammen ein Haus mit Baum und Sonne – ohne zu sprechen! Danach sprechen sie: Wie hat es sich angefühlt? Wer hat geführt? Was hätte geholfen? In der zweiten Runde dürfen sie sich vorher absprechen. Was ist anders?",
          folie: "Haltet zu zweit **einen** Stift ✏️ und malt zusammen: Haus, Baum, Sonne.\n\n**Ohne zu sprechen!** Danach: Wie war das?",
          kern: ["12", "34"],
          emoji: "✏️",
          warum: "Zwei Kinder, ein Stift – klappt das zusammen?" },
        { titel: "Zählen bis zehn", fuer: "alle", dauer: "4 Min",
          text: "Alle sitzen am Platz und schließen die Augen. Die Gruppe soll gemeinsam bis 10 zählen – jedes Kind sagt irgendwann eine Zahl. Sprechen zwei gleichzeitig, beginnt ihr wieder bei 1. Es gibt keine Reihenfolge und keine Zeichen. Das klappt nur, wenn alle gut aufeinander hören.",
          folie: "Augen zu. Wir zählen zusammen bis **10**.\n\nJeder sagt irgendwann eine Zahl. Sprechen zwei gleichzeitig, fangen wir wieder bei 1 an. 🤫",
          emoji: "🔢",
          warum: "Wir schaffen etwas nur, wenn alle aufeinander hören." },
        { titel: "Team-Regeln", fuer: "34", dauer: "2 Min",
          text: "Die Kinder sammeln vom Platz aus drei Regeln für gute Teamarbeit (z. B. erst planen, alle Ideen anhören, Aufgaben verteilen).",
          folie: "Was braucht ein gutes **Team**? 🤝\n\nFindet drei Regeln.",
          emoji: "🤝",
          warum: "Wir überlegen, was ein gutes Team braucht." }
    ],
    ab12: {
      "titel": "Zusammen sind wir stark",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Hilft das im Team? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "zusammen helfen",
            "schubsen",
            "abwechseln",
            "zuhören",
            "allein bestimmen"
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male, wie alle zusammen an der Riesenrübe ziehen.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Teamarbeit planen", kontext: "Zur Geschichte: Zwei Gruppen bauen ein Floß. In Gruppe A fängt jeder einfach an, keiner spricht sich ab. Gruppe B verteilt zuerst die Aufgaben und hört sich gegenseitig zu.", aufgaben: [
        { typ: "tabelle", text: "Plane mit deinem Tischnachbarn ein Plakat über unsere Schule. Wer macht was?", spalten: ["Aufgabe", "Wer?"],
          zeilen: [["Überschrift schreiben", ""], ["Bilder malen", ""], ["Texte schreiben", ""], ["Alles aufkleben", ""], ["___", ""]] },
        { typ: "luecken", text: "Was hat Gruppe B besser gemacht als Gruppe A?", nummern: true, saetze: ["___", "___"] },
        { typ: "luecken", text: "Ein gutes Teammitglied …", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-gewinnen-verlieren",
    titel: "Gewinnen und verlieren",
    kategorie: "Kooperation & Teamgeist",
    ziel12: "Verlieren aushalten und fair gewinnen",
    ziel34: "Fair Play: ein guter Gewinner und ein guter Verlierer sein",
    material: "Tafel für die Fair-Play-Sätze",
    lerntext12: { titel: "Mias Memory", text:
`Mia spielt mit Opa und ihrem Bruder Jan Memory. Jan findet ein Paar nach dem anderen. Mia findet fast keins.

Am Ende hat Jan gewonnen. Mia wird ganz rot. Sie wirft die Karten vom Tisch und schreit: „Blödes Spiel! Ich spiele nie wieder mit!“

Jan hat keine Lust mehr. Opa sammelt die Karten auf. Er sagt ruhig: „Verlieren ist doof, das stimmt. Aber Karten werfen macht keinen Spaß – keinem.“

Am nächsten Tag spielen sie wieder. Mia verliert wieder. Diesmal atmet sie tief durch. Dann sagt sie: „Gut gespielt, Jan.“ Jan lächelt. „Danke. Noch eine Runde?“

In der dritten Runde gewinnt Mia. Jan sagt: „Glückwunsch!“ Und Mia sagt: „Du warst auch gut.“

**Nach dem Vorlesen:**
1. Was hat Mia gemacht, als sie verloren hat?
2. Wie haben sich Jan und Opa dabei gefühlt?
3. Was hat Mia beim zweiten Mal anders gemacht?
4. Wie fühlt sich Verlieren für dich an?` },
    lerntext34: { titel: "Das Finale", text:
`Beim Schulturnier steht die 4b im Finale gegen die 4a. Es ist knapp. Kurz vor Schluss schießt die 4a das 3:2. Abpfiff.

Can wirft sich auf den Rasen. „Der Schiri war gegen uns! Das war Abseits!“ Er tritt gegen eine Trinkflasche. Ein paar aus seinem Team schimpfen mit. Lotta dagegen geht zur 4a und gibt jedem die Hand. „Glückwunsch. Ihr habt gut gespielt.“

Bei der 4a jubeln alle. Ein paar Jungen tanzen vor der 4b herum und singen: „Verlierer, Verlierer!“ Da sagt ihre Kapitänin Sina: „Hört auf. Die waren genauso gut. Das hätte auch andersrum ausgehen können.“ Sie geht zu Can und sagt: „Euer zweites Tor war das schönste des ganzen Turniers.“

Can schaut sie an. Langsam steht er auf. „Danke“, murmelt er. „Und … Glückwunsch.“

Am Ende bekommt nicht die Siegermannschaft den Fair-Play-Pokal, sondern Lotta und Sina.

**Fragen zum Gespräch:**
1. Wie haben Can und Lotta auf die Niederlage reagiert?
2. Wie haben sich die Gewinner verhalten? Was hat Sina getan?
3. Warum haben Lotta und Sina den Fair-Play-Pokal bekommen?
4. Was hilft dir, wenn du nach dem Verlieren wütend oder traurig bist?` },
    uebungen: [
        { titel: "Schnick-Schnack-Schnuck-Turnier", fuer: "alle", dauer: "6 Min",
          text: "Die Tischnachbarn spielen Schere-Stein-Papier, drei Runden. Danach gilt: Der Gewinner sagt „Gut gespielt!“, der Verlierer sagt „Glückwunsch!“, und beide geben sich die Hand. Dann spielt jeder mit dem Kind am Nachbartisch. Achte darauf: Wer jubelt fair? Wer bleibt freundlich?",
          folie: "Spielt zu zweit **Schere – Stein – Papier** ✂️🪨📄, drei Runden.\n\nDanach: Gewinner sagt **„Gut gespielt!“**, Verlierer sagt **„Glückwunsch!“** – und Hand geben.",
          kern: ["12", "34"],
          emoji: "✂️",
          warum: "Wir spielen – und üben, fair zu gewinnen und zu verlieren." },
        { titel: "Fair-Play-Sätze", fuer: "alle", dauer: "3 Min",
          text: "Sammelt an der Tafel Sätze für gute Gewinner („Du warst auch gut.“ – „Das war knapp.“) und gute Verlierer („Glückwunsch!“ – „Nächstes Mal krieg ich dich!“ mit einem Lächeln).",
          folie: "Was sagt ein **guter Gewinner**? 🏆\nWas sagt ein **guter Verlierer**? 🤝",
          emoji: "🏅",
          warum: "Wir sammeln Sätze für gute Gewinner und Verlierer." },
        { titel: "Guter Gewinner?", fuer: "34", dauer: "3 Min",
          text: "Du nennst Verhalten, die Kinder zeigen Daumen hoch oder runter:\n\n- vor den Verlierern herumtanzen\n- dem anderen Team die Hand geben\n- dem Schiedsrichter die Schuld geben\n- dem Verlierer etwas Nettes sagen\n- nach dem Verlieren nie wieder mitspielen",
          antworten: ["👍 fair", "👎 nicht fair"],
          folie: "Macht das ein **guter Gewinner**?\n\n👍 ja · 👎 nein",
          loesungen: ["2", "1", "2", "1", "2"],
          emoji: "🤔",
          warum: "Wir prüfen: Ist das ein guter Gewinner?" }
    ],
    ab12: {
      "titel": "Gut gespielt!",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gesichter",
          "text": "So fühle ich mich, wenn ich gewinne – und wenn ich verliere. Male.",
          "gefuehle": [
            "froh",
            "traurig"
          ],
          "leer": true
        },
        {
          "typ": "daumen",
          "text": "Ist das ein guter Verlierer? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Er wirft die Karten weg.",
            "Er sagt: „Gut gespielt!“",
            "Er schreit und weint.",
            "Er spielt beim nächsten Mal wieder mit."
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male den Fair-Play-Pokal an.",
          "bild": "pokal"
        }
      ]
    },
    ab34: { titel: "Fair Play", aufgaben: [
        { typ: "tabelle", text: "Ist das fair? Schreibe ja oder nein.", spalten: ["Verhalten", "fair?"],
          zeilen: [["„Ihr seid Verlierer!“ singen", ""], ["Dem anderen Team gratulieren", ""], ["Dem Schiedsrichter die Schuld geben", ""], ["Sagen: „Das war knapp, ihr wart auch gut.“", ""], ["Nach dem Spiel wütend weglaufen", ""]] },
        { typ: "luecken", text: "Was kannst du tun, wenn du nach dem Verlieren richtig wütend bist?", nummern: true, saetze: ["___", "___"] },
        { typ: "luecken", text: "Fair Play bedeutet für mich:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-jeder-ist-wichtig",
    titel: "Jeder ist wichtig im Team",
    kategorie: "Kooperation & Teamgeist",
    ziel12: "Erkennen, dass jeder in der Gruppe wichtig ist",
    ziel34: "Unterschiedliche Fähigkeiten in einer Gruppe klug einsetzen",
    material: "Tafel",
    lerntext12: { titel: "Das Tier-Orchester", text:
`Die Tiere wollen ein Konzert geben. Der Elefant tutet mit seinem Rüssel: „Törööö!“ Der Vogel pfeift: „Piep-piep!“ Der Frosch quakt: „Quaaak!“

Aber jeder spielt, wann er will. Es klingt furchtbar! Alle halten sich die Ohren zu.

Die kleine Maus sitzt traurig in der Ecke. „Ich kann gar nichts. Ich bin zu leise für ein Orchester.“

Da hat die Eule eine Idee. Sie gibt der Maus eine winzige Trommel. „Du gibst den Takt: bumm – bumm – bumm. Und alle anderen hören auf dich.“

Die Maus trommelt. Der Elefant tutet im Takt, der Vogel pfeift im Takt, der Frosch quakt im Takt. Jetzt klingt es wunderschön!

Alle klatschen. „Ohne die Maus hätte es nicht geklappt“, sagt der Elefant.

**Nach dem Vorlesen:**
1. Warum klang das Konzert am Anfang furchtbar?
2. Warum war die Maus traurig?
3. Welche Aufgabe hat die Maus bekommen?
4. Warum war die Maus am Ende so wichtig?` },
    lerntext34: { titel: "Die Schülerzeitung", text:
`Die Klasse 4c soll eine Schülerzeitung machen. Finn ist nicht begeistert. „Ich kann doch nicht gut schreiben“, sagt er. „Ich mache so viele Fehler.“

In der Gruppe sind außer Finn noch Nele, Ahmed und Paula. Nele schlägt vor: „Lasst uns erst überlegen, wer was gut kann.“ Paula schreibt gern und schnell. Ahmed zeichnet die besten Comics der Schule. Nele ist super im Organisieren. Und Finn? „Du hast doch die tolle Kamera vom Geburtstag!“, sagt Ahmed. „Und du siehst immer Sachen, die keinem auffallen.“

Finn wird der Fotograf. Er fotografiert den Hausmeister bei der Arbeit, den Schulgarten und die Hühner von Herrn Krüger. Paula schreibt die Texte dazu, Ahmed zeichnet einen Comic, und Nele behält den Überblick.

Am Ende ist ihre Zeitung die beliebteste der ganzen Schule. Die Rektorin sagt: „Die Fotos sind großartig – wer hat die gemacht?“ Finn wird rot und grinst.

**Fragen zum Gespräch:**
1. Warum wollte Finn zuerst nicht mitmachen?
2. Was hat Nele klug gemacht?
3. Wäre die Zeitung auch so gut geworden, wenn alle dasselbe gemacht hätten?
4. Was kannst du in eine Gruppe einbringen?` },
    uebungen: [
        { titel: "Klang-Orchester", fuer: "alle", dauer: "6 Min",
          text: "Jedes Kind bekommt am Platz einen Körperklang: klatschen, schnipsen, auf den Tisch trommeln, summen, mit den Füßen stampfen, Hände reiben. Du dirigierst: Wen du anzeigst, der spielt. Zum Schluss macht ihr gemeinsam ein Gewitter: Hände reiben (Wind) – schnipsen (Tropfen) – auf die Oberschenkel klopfen (Regen) – stampfen (Donner) – und rückwärts wieder bis zur Stille.",
          folie: "Jeder bekommt einen Klang: 👏 klatschen · 🫰 schnipsen · 🥁 trommeln · 🎵 summen · 🦶 stampfen\n\nAuf das Zeichen spielst du. Zum Schluss machen wir zusammen ein **Gewitter**! ⛈️",
          kern: ["12", "34"],
          emoji: "🥁",
          warum: "Wir spielen zusammen – und jeder ist wichtig." },
        { titel: "Wer kann was?", fuer: "34", dauer: "4 Min",
          text: "Stellt euch vor, die Gruppe plant ein Fest. Die Kinder sagen vom Platz aus, welche Aufgabe sie übernehmen würden und warum (einladen, Musik, Spiele, Essen, Deko, Aufräumen). Kl. 1/2 zeigen am Platz, was sie gut können.",
          folie: "Wir planen ein **Fest** 🎉.\n\nWelche Aufgabe würdest du übernehmen – und warum?",
          emoji: "🎉",
          warum: "Wir planen ein Fest – jeder bringt etwas ein." }
    ],
    ab12: {
      "titel": "Jeder ist wichtig",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "ankreuzen",
          "text": "Welches Instrument möchtest du spielen? Kreuze an.",
          "optionen": [
            "[bild:trommel] Trommel",
            "[bild:trompete] Trompete",
            "[bild:floete] Flöte",
            "[bild:gitarre] Gitarre"
          ],
          "nebeneinander": true
        },
        {
          "typ": "malen",
          "text": "Male dich im Tier-Orchester.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Unser Team-Puzzle", kontext: "Zur Geschichte: Finn glaubt, er sei für die Schülerzeitung unwichtig, weil er nicht gern schreibt. Dann wird er der Fotograf der Gruppe.", aufgaben: [
        { typ: "tabelle", text: "Eure Gruppe macht eine Schülerzeitung. Wer kann was gut? Schreibe Namen aus der Gruppe.", spalten: ["Aufgabe", "Wer kann das gut?"],
          zeilen: [["Schreiben", ""], ["Fotografieren", ""], ["Zeichnen", ""], ["Organisieren", ""], ["Ideen haben", ""]] },
        { typ: "luecken", text: "Warum war Finn für die Zeitung wichtig, obwohl er nicht gern schreibt?", nummern: false, saetze: ["___"] },
        { typ: "luecken", text: "Das bringe ich in ein Team ein:", nummern: false, saetze: ["___"] }
    ]}
}),

/* ============================== ACHTSAMKEIT & RUHE ============================== */
SOZIAL_EINHEIT({
    id: "v-ruhig-werden",
    titel: "Ruhig werden",
    kategorie: "Achtsamkeit & Ruhe",
    ziel12: "Einfache Atem- und Entspannungsübungen kennen",
    ziel34: "Merken, wann ich Ruhe brauche, und passende Übungen auswählen",
    material: "Klangschale oder Glöckchen\nPro Kind ein Wattebausch oder eine Feder",
    lerntext12: { titel: "Tilda, die Schildkröte", text:
`Tilda ist eine kleine Schildkröte. Manchmal ist es ihr zu viel: Die Affen kreischen, die Vögel streiten, und alle rennen durcheinander. Dann wird Tilda ganz zappelig.

Aber Tilda kennt einen Trick. Sie zieht Kopf und Beine in ihren Panzer. Drinnen ist es still und dunkel.

Im Panzer atmet Tilda ganz langsam: einatmen … und ausatmen. Einatmen … und ausatmen. Einatmen … und ausatmen.

Dann kommt sie wieder heraus. Die Affen kreischen immer noch. Aber Tilda ist jetzt **ruhig**. Sie kann wieder überlegen, was sie tun will.

Das ist der Schildkröten-Trick. Den kannst du auch – auch ohne Panzer!

**Nach dem Vorlesen:**
1. Wann wird Tilda zappelig?
2. Was macht Tilda in ihrem Panzer?
3. Wie fühlt sich Tilda danach?
4. Wann könntest du den Schildkröten-Trick benutzen?` },
    lerntext34: { titel: "Zu viel auf einmal", text:
`Nora hat einen Tag, an dem alles zusammenkommt. In der ersten Stunde schreiben sie einen Test. In der Pause streitet sie sich mit ihrer besten Freundin. Nach der Schule hat sie Klavierunterricht, und sie hat nicht geübt. Am Nachmittag fühlt sie sich wie ein Topf, der gleich überkocht. Ihr Herz rast, sie kann sich auf nichts konzentrieren, und sie ist kurz davor zu weinen.

Die Schulsozialarbeiterin Frau Petersen bemerkt es. „Komm, wir probieren etwas aus.“ Sie zeigt Nora das Kasten-Atmen: vier Sekunden einatmen, vier halten, vier ausatmen, vier halten – und mit dem Finger malt sie dabei ein Quadrat in die Luft.

Dann die 5-4-3-2-1-Übung: „Nenne fünf Dinge, die du siehst. Vier, die du spürst. Drei, die du hörst. Zwei, die du riechst. Eins, das du schmeckst.“ Nora muss sich konzentrieren – und merkt plötzlich, dass ihr Herz langsamer schlägt.

Vor dem nächsten Test macht Nora das Kasten-Atmen ganz heimlich unter dem Tisch. Niemand merkt etwas. Aber sie fühlt sich viel ruhiger.

**Fragen zum Gespräch:**
1. Woran hat Nora gemerkt, dass ihr alles zu viel wird?
2. Wie funktionieren das Kasten-Atmen und die 5-4-3-2-1-Übung?
3. Warum helfen diese Übungen?
4. Was machst du, wenn dir alles zu viel wird?` },
    uebungen: [
        { titel: "Stille-Minute", fuer: "alle", dauer: "2 Min",
          text: "Du schlägst die Klangschale an. Alle sitzen ganz still, bis der Ton verklungen ist. Wer mag, schließt die Augen.",
          folie: "🔔 Hör zu, bis der Ton ganz weg ist.\n\nSitz ganz still. Wenn du magst, schließ die Augen.",
          emoji: "🔔",
          warum: "Wir werden ganz still – eine Minute lang." },
        { titel: "Schildkröten-Trick", fuer: "alle", dauer: "3 Min",
          text: "Alle sitzen am Platz, verschränken die Arme auf dem Tisch und legen den Kopf darauf – der „Panzer“. Drinnen atmen alle dreimal langsam ein und aus. Dann kommt die Schildkröte langsam wieder heraus. Zweimal wiederholen.",
          folie: "Arme auf den Tisch, Kopf darauf – das ist dein **Panzer** 🐢.\n\nDrinnen atmest du dreimal langsam ein und aus. Dann kommst du langsam wieder heraus.",
          kern: ["12"],
          emoji: "🐢",
          warum: "Wir lernen Tildas Trick zum Ruhigwerden." },
        { titel: "Feder-Atmen", fuer: "12", dauer: "3 Min",
          text: "Jedes Kind legt einen Wattebausch auf den Tisch und pustet ihn ganz langsam von einer Tischkante zur anderen – mit nur einem langen Atemzug. Wer schafft es am langsamsten?",
          folie: "Puste den Wattebausch ganz **langsam** über den Tisch – mit nur einem langen Atemzug. 🌬️",
          emoji: "🌬️",
          warum: "Wir atmen ganz langsam – mit einem Wattebausch." },
        { titel: "Kasten-Atmen", fuer: "34", dauer: "4 Min",
          text: "Alle malen mit dem Finger ein Quadrat in die Luft: Seite 1 = 4 Sekunden einatmen, Seite 2 = 4 Sekunden halten, Seite 3 = 4 Sekunden ausatmen, Seite 4 = 4 Sekunden halten. Du zählst leise mit. Viermal wiederholen.",
          folie: "Mal mit dem Finger ein Quadrat in die Luft ⬜:\n\n4 Sekunden **einatmen** · 4 **halten** · 4 **ausatmen** · 4 **halten**\n\nViermal.",
          kern: ["34"],
          emoji: "⬜",
          warum: "Wir lernen einen Atem-Trick, der überall hilft." }
    ],
    ab12: {
      "titel": "So werde ich ruhig",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "ankreuzen",
          "text": "Das macht mich ruhig. Kreuze an.",
          "optionen": [
            "[bild:teddy] kuscheln",
            "[bild:gitarre] Musik",
            "[bild:pinsel] malen",
            "[bild:baum] draußen sein",
            "[bild:buch] Buch anschauen"
          ],
          "nebeneinander": true
        },
        {
          "typ": "malen",
          "text": "Male die Ruhe-Wolke an. Male hinein, was dich ruhig macht.",
          "bild": "wolke"
        }
      ]
    },
    ab34: { titel: "Meine Ruhe-Werkzeuge", kontext: "Diese Übungen habt ihr ausprobiert: Stille-Minute (still sein, bis der Ton weg ist) · Schildkröten-Trick (Kopf auf die Arme, langsam atmen) · Kasten-Atmen (4 ein – 4 halten – 4 aus – 4 halten) · 5-4-3-2-1 (Dinge sehen, spüren, hören …).", aufgaben: [
        { typ: "luecken", text: "Ich merke, dass ich Ruhe brauche, wenn …", nummern: false, saetze: ["___"] },
        { typ: "tabelle", text: "Wie gut hat die Übung dir geholfen? Gib 1 bis 5 Sterne.", spalten: ["Übung", "Sterne (1–5)"],
          zeilen: [["Stille-Minute", ""], ["Schildkröten-Trick", ""], ["Kasten-Atmen", ""], ["5-4-3-2-1", ""]] },
        { typ: "luecken", text: "Probiere 5-4-3-2-1 jetzt aus:", nummern: false,
          saetze: ["5 Dinge, die ich sehe: ___", "4 Dinge, die ich spüre: ___", "3 Dinge, die ich höre: ___", "2 Dinge, die ich rieche: ___", "1 Ding, das ich schmecke: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-alle-sinne",
    titel: "Mit allen Sinnen",
    kategorie: "Achtsamkeit & Ruhe",
    ziel12: "Die fünf Sinne bewusst wahrnehmen",
    ziel34: "Achtsam wahrnehmen und genau beschreiben, was ich sehe, höre, fühle, rieche, schmecke",
    material: "Fühlsäckchen mit 4–5 Gegenständen (Stein, Feder, Kastanie, Schwamm, Löffel)\nPro Kind eine Rosine oder ein Apfelstück (Allergien und Unverträglichkeiten vorher abfragen!)",
    lerntext12: { titel: "Ein Spaziergang mit Opa", text:
`Lukas geht mit Opa spazieren. „Heute machen wir einen Sinne-Spaziergang“, sagt Opa.

„Was **siehst** du?“ Lukas schaut genau hin. Er sieht rote und gelbe Blätter und einen Käfer auf einem Stein.

„Was **hörst** du?“ Lukas ist ganz still. Er hört einen Vogel singen und das Rascheln der Blätter.

„Was **riechst** du?“ Lukas schnuppert. Es riecht nach nasser Erde und nach Pilzen.

„Was **fühlst** du?“ Lukas streicht über einen Baumstamm. Die Rinde ist rau und kühl.

Zu Hause trinken sie Kakao. „Und was **schmeckst** du?“, fragt Opa. „Süß und warm!“, lacht Lukas. „Opa, das war der schönste Spaziergang überhaupt.“

**Nach dem Vorlesen:**
1. Was hat Lukas gesehen?
2. Was hat Lukas gehört und gerochen?
3. Was hat Lukas gefühlt und geschmeckt?
4. Zeig am Platz, mit welchem Körperteil du siehst, hörst, riechst, fühlst und schmeckst.` },
    lerntext34: { titel: "Die Rosinen-Übung", text:
`„Heute essen wir eine Rosine“, sagt Frau Haas. Kerem verdreht die Augen. „Eine Rosine? Das dauert eine Sekunde.“

„Diesmal nicht“, sagt Frau Haas. „Wir essen sie, als hätten wir noch nie eine Rosine gesehen.“

Zuerst schauen alle die Rosine genau an. Kerem bemerkt die vielen kleinen Falten und dass sie im Licht fast rot glänzt. Dann fühlen sie: Sie ist klebrig und ein bisschen weich. Sie halten sie ans Ohr und drücken sie – sie knistert leise! Sie riechen daran: süß, ein bisschen wie Wein.

Dann legen alle die Rosine auf die Zunge, ohne zu kauen. Kerem spürt, wie sein Mund wässrig wird. Endlich darf er langsam kauen. Der Geschmack ist so stark, dass er staunt.

„Das war die intensivste Rosine meines Lebens“, sagt Kerem. Frau Haas lacht. „Das nennt man achtsam sein: ganz bei einer Sache, genau jetzt. Wir machen das viel zu selten.“

**Fragen zum Gespräch:**
1. Was hat Kerem an der Rosine entdeckt, was ihm vorher nie aufgefallen ist?
2. Was bedeutet „achtsam sein“?
3. Wobei bist du oft mit den Gedanken ganz woanders?
4. Wann könnte Achtsamkeit dir im Alltag helfen?` },
    uebungen: [
        { titel: "Fühl-Säckchen", fuer: "alle", dauer: "5 Min",
          text: "Das Säckchen wandert von Platz zu Platz. Jedes Kind greift hinein, ohne zu schauen, und beschreibt einen Gegenstand: Kl. 1/2 mit einem Wort (weich, hart, rund), Kl. 3/4 mit drei Eigenschaften. Die anderen raten, was es ist. Erst am Ende wird ausgepackt.",
          text12: "Das Säckchen wandert von Platz zu Platz. Jedes Kind greift hinein, ohne zu schauen, und beschreibt einen Gegenstand mit einem Wort (weich, hart, rund). Die anderen raten, was es ist. Erst am Ende wird ausgepackt.",
          text34: "Das Säckchen wandert von Platz zu Platz. Jedes Kind greift hinein, ohne zu schauen, und beschreibt einen Gegenstand mit drei Eigenschaften. Die anderen raten, was es ist. Erst am Ende wird ausgepackt.",
          folie12: "Greif in das Säckchen – **nicht schauen!** 👋\n\nSag ein Wort: Wie fühlt es sich an? Die anderen raten.",
          folie34: "Greif in das Säckchen – **nicht schauen!** 👋\n\nBeschreib den Gegenstand mit **drei** Eigenschaften. Die anderen raten.",
          kern: ["12"],
          emoji: "👋",
          warum: "Wir fühlen, ohne zu schauen." },
        { titel: "Achtsam essen", fuer: "alle", dauer: "6 Min",
          text: "Jedes Kind bekommt eine Rosine oder ein Apfelstück. Du leitest langsam an: anschauen – fühlen – ans Ohr halten – riechen – auf die Zunge legen, ohne zu kauen – ganz langsam kauen – schlucken. Danach erzählen die Kinder vom Platz aus, was sie bemerkt haben.",
          folie: "Du bekommst etwas zum Essen. Ganz langsam:\n\n👀 anschauen · ✋ fühlen · 👂 ans Ohr halten · 👃 riechen · 👅 auf die Zunge · langsam kauen",
          kern: ["34"],
          emoji: "🍎",
          warum: "Wir essen ganz langsam – mit allen Sinnen." }
    ],
    ab12: {
      "titel": "Meine fünf Sinne",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "ankreuzen",
          "text": "Was riecht gut? Kreuze an.",
          "optionen": [
            "[bild:rose] Blume",
            "[bild:pizza] Pizza",
            "[bild:seife] Seife",
            "[bild:zitrone] Zitrone",
            "[bild:kuchen] Kuchen"
          ],
          "nebeneinander": true
        },
        {
          "typ": "malen",
          "text": "Male etwas, das du heute Schönes gesehen, gehört oder gerochen hast.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Achtsam wahrnehmen", kontext: "In der Stunde hast du eine Rosine (oder ein Apfelstück) ganz langsam erkundet: anschauen, fühlen, ans Ohr halten, riechen, schmecken.", aufgaben: [
        { typ: "tabelle", text: "Beschreibe deine Rosine (oder dein Apfelstück) mit allen Sinnen.", spalten: ["Sinn", "Was ich wahrgenommen habe"],
          zeilen: [["Sehen", ""], ["Fühlen", ""], ["Hören", ""], ["Riechen", ""], ["Schmecken", ""]] },
        { typ: "luecken", text: "Wann bist du im Alltag ganz achtsam – ganz bei einer Sache?", nummern: false, saetze: ["___"] },
        { typ: "luecken", text: "Wobei möchtest du diese Woche achtsamer sein?", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-dankbarkeit",
    titel: "Dankbarkeit",
    kategorie: "Achtsamkeit & Ruhe",
    ziel12: "Schöne Dinge im Alltag bemerken und Danke sagen",
    ziel34: "Dankbarkeit als Haltung kennenlernen und ausdrücken",
    material: "Ein leeres Glas und kleine Zettel (Glücksglas für die Gruppe)\nKarten für die Danke-Karten",
    lerntext12: { titel: "Bennis Glücksglas", text:
`Benni hat ein leeres Glas. „Was willst du damit?“, fragt seine Schwester.

„Das ist mein Glücksglas“, sagt Benni. „Immer wenn etwas Schönes passiert, lege ich einen Zettel hinein.“

Am Montag hat Mama Pfannkuchen gemacht. Zettel ins Glas! Am Dienstag hat Benni mit seinem Freund eine Höhle gebaut. Zettel ins Glas! Am Mittwoch hat er einen Regenbogen gesehen. Zettel ins Glas!

Am Donnerstag ist Benni traurig. Es regnet, und er darf nicht raus. Da nimmt er sein Glücksglas und liest alle Zettel. Er muss lächeln. „So viele schöne Sachen!“

Am Sonntag ist das Glas schon halb voll. Benni sagt: „Danke für diese schöne Woche.“

**Nach dem Vorlesen:**
1. Wofür hat Benni sein Glücksglas?
2. Welche schönen Sachen hat Benni hineingelegt?
3. Was hat Benni gemacht, als er traurig war?
4. Was würdest du heute in dein Glücksglas legen?` },
    lerntext34: { titel: "Der schlechteste Tag – oder?", text:
`Selin ist sich sicher: Heute ist der schlechteste Tag der Welt. Morgens regnet es, ihr Schirm ist kaputt. In der Schule merkt sie, dass sie ihr Pausenbrot vergessen hat. Beim Sport fällt sie hin und schürft sich das Knie auf.

Abends sitzt sie schlecht gelaunt in ihrem Zimmer. Ihr Vater klopft. „Lass uns etwas ausprobieren. Schreib drei Dinge auf, die heute trotzdem gut waren.“ – „Da war nichts Gutes“, brummt Selin.

Dann denkt sie nach. Ihre Freundin Ida hat ihr Brot mit ihr geteilt. Auf dem Heimweg war ein riesiger Regenbogen am Himmel. Und als sie mit dem aufgeschürften Knie heimkam, hat Papa ihr einen Kakao gemacht.

Selin schaut auf ihren Zettel. „Eigentlich … war der Tag gar nicht so schlecht.“ Ihr Vater lächelt. „Das Schlechte sieht man sofort. Das Gute muss man manchmal suchen.“

Seitdem schreibt Selin jeden Abend drei gute Dinge in ein kleines Heft. Und am nächsten Tag bedankt sie sich bei Ida.

**Fragen zum Gespräch:**
1. Warum dachte Selin, der Tag sei nur schlecht gewesen?
2. Was hat sich verändert, als sie die drei guten Dinge aufgeschrieben hat?
3. Was meint Selins Vater mit seinem letzten Satz?
4. Wem könntest du heute Danke sagen?` },
    uebungen: [
        { titel: "Glücksmoment-Runde", fuer: "alle", dauer: "5 Min",
          text: "Jedes Kind nennt vom Platz aus einen schönen Moment von heute oder dieser Woche. Du schreibst jeden auf einen Zettel und legst ihn ins Glücksglas der Gruppe. Das Glas bleibt da und wird in den nächsten Wochen beim Ankommen weiter gefüllt.",
          folie: "Was war **heute** oder **diese Woche** schön für dich? ✨\n\nDein Moment kommt ins Glücksglas.",
          kern: ["12"],
          emoji: "✨",
          warum: "Wir erzählen, was diese Woche schön war." },
        { titel: "Danke-Karte", fuer: "alle", dauer: "6 Min",
          text: "Jedes Kind gestaltet eine Danke-Karte für einen Menschen an der Schule, an den man selten denkt: Hausmeister, Sekretärin, Küchenteam, Reinigungskraft, Busfahrer. Kl. 1/2 malen, Kl. 3/4 schreiben zwei Sätze. Die Karten werden gemeinsam überbracht.",
          folie12: "Für wen an unserer Schule möchtest du eine **Danke-Karte** malen? 💌",
          folie34: "Für wen an unserer Schule möchtest du eine **Danke-Karte** schreiben? 💌\n\nZwei Sätze reichen.",
          kern: ["34"],
          emoji: "💌",
          warum: "Wir sagen Danke – mit einer Karte." }
    ],
    ab12: {
      "titel": "Danke!",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "malen",
          "text": "Male die Danke-Sonne an. Male in die Mitte, wofür du dankbar bist.",
          "bild": "sonne"
        },
        {
          "typ": "malen",
          "text": "Male: Wem möchtest du Danke sagen?",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Drei gute Dinge", aufgaben: [
        { typ: "luecken", text: "Drei gute Dinge von heute – und warum sie gut waren:", nummern: true,
          saetze: ["___, weil ___", "___, weil ___", "___, weil ___"] },
        { typ: "luecken", text: "Schreibe einen kurzen Dankesbrief an jemanden in der Schule.", nummern: false,
          saetze: ["Liebe/r ___,", "danke, dass ___", "___", "Dein/e ___"] }
    ]}
}),

/* ============================== VIELFALT & RESPEKT ============================== */
SOZIAL_EINHEIT({
    id: "v-alle-verschieden",
    titel: "Alle sind verschieden",
    kategorie: "Vielfalt & Respekt",
    ziel12: "Unterschiede und Gemeinsamkeiten entdecken",
    ziel34: "Vielfalt als Bereicherung sehen und Vorurteile hinterfragen",
    material: "Eine Schachtel Buntstifte (für den Lerntext 1/2)\nTafel",
    lerntext12: { titel: "Der Streit der Buntstifte", text:
`In einer Federmappe wohnen viele Buntstifte. Eines Tages streiten sie.

„Ich bin der Beste“, sagt der Rote. „Ohne mich gibt es keine Erdbeeren!“ – „Quatsch“, sagt der Blaue. „Ohne mich gibt es keinen Himmel!“ – „Und ohne mich keine Sonne!“, ruft der Gelbe. Jeder will der Wichtigste sein.

Da kommt Lisa und will ein Bild malen. Sie nimmt nur den roten Stift. Sie malt einen roten Himmel, eine rote Wiese, eine rote Sonne. Das sieht komisch aus!

Dann nimmt Lisa alle Stifte. Sie malt einen blauen Himmel, eine grüne Wiese, eine gelbe Sonne und rote Erdbeeren. Jetzt ist das Bild wunderschön.

Die Stifte schauen sich an. „Zusammen sind wir am schönsten“, sagt der Blaue. Und alle nicken.

**Nach dem Vorlesen:**
1. Warum haben die Buntstifte gestritten?
2. Warum sah das erste Bild komisch aus?
3. Was war beim zweiten Bild anders?
4. Was ist an uns Menschen verschieden – und was ist gleich?` },
    lerntext34: { titel: "Unsere Klasse – ein Obstsalat", text:
`Frau Novak hat eine Idee: „Jeder bringt morgen etwas mit, das zeigt, was ihn ausmacht.“

Am nächsten Tag liegen viele Dinge auf dem Tisch. Yusuf hat ein Foto von seiner Familie in Syrien mitgebracht und erzählt, dass er Arabisch, Kurdisch und Deutsch spricht. Hanna zeigt ihre Schwimmmedaillen. Lea erzählt, dass sie zwei Mamas hat. Oleksandr hat ukrainische Süßigkeiten dabei. Ben hat einen selbstgebauten Roboter.

Nur Mats sitzt stumm da. „Ich hab nichts Besonderes. Bei mir ist alles normal.“ Frau Novak fragt nach. Es stellt sich heraus: Mats' Familie hat einen Bauernhof mit 60 Kühen, und Mats kann schon Trecker fahren. Alle staunen. „Das ist doch total besonders!“

Am Ende schreibt Frau Novak an die Tafel: „Unsere Klasse ist wie ein Obstsalat. Jede Frucht schmeckt anders – und gerade deshalb schmeckt er so gut.“

**Fragen zum Gespräch:**
1. Welche Unterschiede gab es in der Klasse? Welche Gemeinsamkeiten fallen dir ein?
2. Warum dachte Mats, an ihm sei nichts besonders?
3. Was meint Frau Novak mit dem Obstsalat?
4. Was macht dich besonders?` },
    uebungen: [
        { titel: "Gleich und verschieden", fuer: "alle", dauer: "6 Min",
          text: "Die Tischnachbarn suchen zwei Dinge, die sie gemeinsam haben, und zwei Dinge, die verschieden sind (Lieblingsessen, Geschwister, Hobbys, Sprachen …). Kl. 1/2 dürfen auch Äußeres nennen (Haarfarbe, Größe). Jedes Paar stellt eine Gemeinsamkeit und einen Unterschied vor.",
          folie: "Findet zu zweit:\n\n**2 Dinge, die gleich sind** und **2 Dinge, die verschieden sind**.",
          kern: ["12"],
          emoji: "👫",
          warum: "Wir finden heraus, was gleich und was anders ist." },
        { titel: "Sprachen-Runde", fuer: "alle", dauer: "4 Min",
          text: "Wie sagt man „Hallo“ und „Danke“ in anderen Sprachen? Kinder, die mehrere Sprachen sprechen, sind die Experten und bringen es den anderen bei. Alle sprechen es gemeinsam nach. (Wenn niemand eine weitere Sprache spricht: Englisch, Spanisch, Türkisch, Arabisch vorbereiten.)",
          folie: "Wie sagt man **„Hallo“** und **„Danke“** in anderen Sprachen? 🌍\n\nWer kann es uns beibringen?",
          emoji: "🌍",
          warum: "Wir lernen Hallo und Danke in vielen Sprachen." },
        { titel: "Vorurteil oder Tatsache?", fuer: "34", dauer: "3 Min",
          text: "Du liest Sätze vor, die Kinder entscheiden mit Daumen: Tatsache (hoch) oder Vorurteil (runter) – und sprechen darüber, warum Vorurteile unfair sind.\n\n- „Jungen weinen nicht.“\n- „Menschen haben verschiedene Hautfarben.“\n- „Mädchen können nicht gut Fußball spielen.“\n- „In Deutschland werden viele Sprachen gesprochen.“",
          quiz: "ampel",
          antworten: ["🟢 Tatsache", "🔴 Vorurteil"],
          folie: "Ist das eine **Tatsache** 🟢 oder ein **Vorurteil** 🔴?\n\nHalte die rote oder grüne Karte hoch.",
          kern: ["34"],
          loesungen: ["2", "1", "2", "1"],
          emoji: "🤔",
          warum: "Wir prüfen: Stimmt das – oder ist es ein Vorurteil?" }
    ],
    ab12: {
      "titel": "Ich bin ich – du bist du",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "malen",
          "text": "Male dich.",
          "bild": ""
        },
        {
          "typ": "malen",
          "text": "Male deinen Tischnachbarn. Was ist gleich, was ist anders?",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Vielfalt in unserer Gruppe", aufgaben: [
        { typ: "luecken", text: "Mein Tischnachbar und ich:", nummern: false,
          saetze: ["Das haben wir gemeinsam: ___", "Das ist bei uns verschieden: ___"] },
        { typ: "tabelle", text: "Vorurteil (V) oder Tatsache (T)? Kreuze die richtige Spalte an.", spalten: ["Satz", "V", "T"],
          zeilen: [["„Jungen weinen nicht.“", "", ""], ["„Menschen haben verschiedene Hautfarben.“", "", ""], ["„Mädchen können nicht Fußball spielen.“", "", ""], ["„Ältere Menschen verstehen nichts von Technik.“", "", ""]] },
        { typ: "luecken", text: "Was wäre, wenn alle Menschen gleich wären?", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-auslachen",
    titel: "Auslachen tut weh",
    kategorie: "Vielfalt & Respekt",
    ziel12: "Merken, dass Auslachen wehtut, und Mitlachen von Auslachen unterscheiden",
    ziel34: "Hänseln und Mobbing erkennen und wissen, was man als Zuschauer tun kann",
    material: "Tafel\nHinweis: Gibt es in der Gruppe ein Kind, das aktuell gehänselt wird, die Geschichten vorher anpassen und das Kind nicht vorführen.",
    lerntext12: { titel: "Linas Brille", text:
`Lina hat eine neue Brille. Sie ist blau und hat kleine Sterne an der Seite. Lina findet sie schön.

In der Schule zeigt Tom auf sie und lacht: „Haha, Brillenschlange! Brillenschlange!“ Ein paar Kinder lachen mit.

Lina setzt sich auf ihren Platz. Sie nimmt die Brille ab und versteckt sie. Ihr Bauch tut weh. Sie ist ganz **traurig**.

Emma setzt sich neben Lina. Dann sagt sie laut zu Tom: „Hör auf, das ist gemein! Lina sieht toll aus mit der Brille.“

Tom hört auf zu lachen. Er sieht, dass Lina weint. „Oh … ich wollte nur Spaß machen“, sagt er leise. „Für Lina war es aber kein Spaß“, sagt Emma. Tom entschuldigt sich.

Lina setzt ihre Brille wieder auf.

**Nach dem Vorlesen:**
1. Was hat Tom zu Lina gesagt?
2. Wie hat sich Lina gefühlt?
3. Was hat Emma gemacht?
4. Was ist der Unterschied zwischen mitlachen und auslachen?` },
    lerntext34: { titel: "Nur Spaß?", text:
`Seit Wochen nennen ein paar Kinder Jonas „Flohmarkt“, weil er oft Kleidung von seinem großen Bruder trägt. Am Anfang war es nur ab und zu. Inzwischen passiert es jeden Tag. In der Pause wird er nachgemacht, sein Ranzen wird versteckt, und wenn er etwas sagt, verdrehen alle die Augen.

Die meisten anderen Kinder machen nicht mit – aber sie lachen. Oder sie schauen weg. „Das ist doch nur Spaß“, sagt einer.

Amira beobachtet das schon lange. Eines Tages sieht sie, wie Jonas auf der Toilette weint. Sie spricht mit Kerem und Lina. „Das ist kein Spaß mehr. Das ist Mobbing: immer wieder, gegen einen, und er kann sich nicht wehren.“

Die drei beschließen etwas. In der nächsten Pause stellen sie sich zu Jonas. Als der Erste „Flohmarkt“ ruft, sagt Kerem: „Lass das. Das ist nicht witzig.“ Und nach der Pause gehen sie gemeinsam zu ihrer Lehrerin.

Es dauert noch ein paar Wochen. Aber dann hört es auf. Jonas sagt später: „Das Schlimmste war nicht das Lachen. Das Schlimmste war, dass niemand etwas gesagt hat.“

**Fragen zum Gespräch:**
1. Warum ist das, was mit Jonas passiert, kein Spaß mehr?
2. Woran erkennt man Mobbing?
3. Was können Zuschauer tun? Was haben Amira, Kerem und Lina gemacht?
4. Was meint Jonas mit seinem letzten Satz?` },
    uebungen: [
        { titel: "Mitlachen oder auslachen?", fuer: "alle", dauer: "4 Min",
          text: "Du liest Situationen vor, die Kinder zeigen Daumen hoch (Mitlachen – alle haben Spaß) oder runter (Auslachen – einer leidet):\n\n- Alle lachen über einen lustigen Witz.\n- Alle lachen, weil Paul sich verschrieben hat.\n- Lea macht eine Grimasse, und alle lachen mit ihr.\n- Alle lachen über Bens alte Schuhe.\n\nFrage: Woran merkt man den Unterschied? (Lacht das Kind selbst mit?)",
          antworten: ["👍 mitlachen", "👎 auslachen"],
          folie: "Haben **alle** Spaß 👍 – oder **leidet einer** 👎?",
          kern: ["12"],
          loesungen: ["1", "2", "1", "2"],
          emoji: "😄",
          warum: "Lachen ist schön – aber nicht immer. Wir prüfen den Unterschied." },
        { titel: "Was tun als Zuschauer?", fuer: "alle", dauer: "6 Min",
          text: "Sammelt an der Tafel, was Zuschauer tun können: nicht mitlachen – sich zum Kind stellen – „Hör auf!“ sagen – Hilfe holen – das Kind später trösten. Kl. 1/2 üben am Platz den Satz: „Hör auf, das ist gemein!“ (laut, deutlich, gerade sitzen). Kl. 3/4 überlegen, was man tun kann, wenn man sich allein nicht traut (sich mit anderen zusammentun).",
          folie: "Jemand wird ausgelacht. Was kannst **du** tun? 👀",
          folie12: "Jemand wird ausgelacht. Was kannst **du** tun? 👀\n\nÜbt den Satz: **„Hör auf, das ist gemein!“**",
          kern: ["34"],
          emoji: "👀",
          warum: "Wir überlegen, was du tun kannst, wenn jemand ausgelacht wird." }
    ],
    ab12: {
      "titel": "Lachen – aber richtig",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gesichter",
          "text": "Mitlachen macht froh. Auslachen macht traurig. Male die Gesichter an.",
          "gefuehle": [
            "froh",
            "traurig"
          ],
          "leer": false
        },
        {
          "typ": "daumen",
          "text": "Ein Kind wird ausgelacht. Was machst du? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Ich lache mit.",
            "Ich sage: „Hör auf, das ist gemein!“",
            "Ich hole Hilfe.",
            "Ich stelle mich zu dem Kind."
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male, wie du dem Kind hilfst.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Hinschauen statt mitlachen", aufgaben: [
        { typ: "tabelle", text: "Spaß (S) oder Hänseln (H)? Kreuze die richtige Spalte an.", spalten: ["Situation", "S", "H"],
          zeilen: [["Alle lachen über einen Witz, den Tim erzählt.", "", ""], ["Jeden Tag wird Mara wegen ihrer Zähne nachgemacht.", "", ""], ["Ole lacht selbst am meisten über sein Missgeschick.", "", ""], ["Im Klassenchat werden Fotos von Ali verspottet.", "", ""]] },
        { typ: "luecken", text: "Was ist Mobbing? Erkläre mit eigenen Worten.", nummern: false, saetze: ["___"] },
        { typ: "luecken", text: "Das kann ich als Zuschauer tun:", nummern: true, saetze: ["___", "___", "___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-hilfsbereitschaft",
    titel: "Hilfsbereit sein",
    kategorie: "Vielfalt & Respekt",
    ziel12: "Sehen, wo jemand Hilfe braucht, und helfen",
    ziel34: "Hilfe anbieten, ohne sich aufzudrängen, und ohne Gegenleistung helfen",
    material: "Namenszettel aller Kinder (für die geheimen Helfer)",
    lerntext12: { titel: "Die Äpfel", text:
`Eine alte Frau kommt vom Einkaufen. Sie trägt eine schwere Tüte. Plötzlich reißt die Tüte. Die Äpfel fallen heraus und rollen über den Weg!

Die Frau seufzt. Sie kann sich nicht gut bücken. Ihr Rücken tut weh.

Paul und Mia sehen das. „Komm, wir helfen!“, sagt Mia. Sie sammeln alle Äpfel auf. Paul findet sogar einen, der unter eine Bank gerollt ist.

„Danke, ihr zwei!“, sagt die Frau. „Das ist sehr lieb von euch.“ Mia hält ihre Jacke auf, und sie tragen die Äpfel bis zur Haustür.

Auf dem Weg nach Hause sagt Paul: „Helfen fühlt sich gut an, oder?“ Mia nickt. „Total!“

**Nach dem Vorlesen:**
1. Was ist der alten Frau passiert?
2. Warum konnte sie die Äpfel nicht allein aufheben?
3. Wie haben Paul und Mia geholfen?
4. Wo kannst du jemandem helfen?` },
    lerntext34: { titel: "Die Hilfe-Detektive", text:
`Die Klasse 3b macht eine Woche lang ein Experiment: Jeder wird „Hilfe-Detektiv“ und hilft jeden Tag mindestens einmal – ohne etwas dafür zu wollen.

Lina hilft am Montag dem Hausmeister, die Stühle hochzustellen. Am Dienstag bindet sie einem Erstklässler den Schuh zu. Am Mittwoch will sie Paul bei seinem Mathe-Arbeitsblatt helfen und nimmt ihm einfach den Stift aus der Hand. Paul wird sauer. „Ich wollte das allein schaffen!“

Lina ist verwirrt. „Ich wollte doch nur helfen.“ Ihre Lehrerin erklärt: „Gute Hilfe fragt erst: Soll ich dir helfen? Manchmal möchte jemand es allein versuchen – und das ist auch wichtig.“

Am Donnerstag fragt Lina einen Jungen, der vor dem Schwarzen Brett steht: „Suchst du was? Soll ich dir helfen?“ Er ist neu und findet den Musikraum nicht. Lina bringt ihn hin.

Am Freitag erzählen alle von ihren Erlebnissen. Die meisten sagen dasselbe: Helfen macht nicht nur den anderen froh, sondern auch einen selbst.

**Fragen zum Gespräch:**
1. Was ist am Mittwoch schiefgegangen? Warum?
2. Warum ist es wichtig, erst zu fragen?
3. Warum fühlt sich Helfen für den Helfer gut an?
4. Wo könntest du diese Woche ein Hilfe-Detektiv sein?` },
    uebungen: [
        { titel: "Wo wird Hilfe gebraucht?", fuer: "alle", dauer: "5 Min",
          text: "Du liest Situationen vor. Die Kinder sagen vom Platz aus: Braucht hier jemand Hilfe? Wie kann ich helfen? Muss ich vorher fragen?\n\n- Ein Kind hat seine Stifte fallen lassen.\n- Die Lehrerin trägt einen schweren Karton.\n- Ein Kind weint.\n- Jemand findet den Weg nicht.\n- Ein Kind will das Puzzle ganz allein lösen.",
          quiz: "karten",
          frage: "Braucht hier jemand Hilfe? Wie kannst du helfen – und musst du vorher fragen?",
          folie: "Braucht hier jemand **Hilfe**? 🤲\n\nWie kannst du helfen? Musst du vorher fragen?",
          kern: ["12"],
          emoji: "🤲",
          warum: "Wir schauen genau hin: Wo braucht jemand Hilfe?" },
        { titel: "Geheime Helfer", fuer: "alle", dauer: "4 Min",
          text: "Jedes Kind zieht verdeckt einen Namen und behält ihn für sich. Bis zur nächsten Stunde soll es diesem Kind heimlich etwas Gutes tun (helfen, etwas Nettes sagen, etwas leihen). In der nächsten Stunde beim Ankommen wird geraten: Wer war mein geheimer Helfer?",
          folie: "Zieh einen Namen – **psst, geheim!** 🤫\n\nTu diesem Kind bis zur nächsten Stunde heimlich etwas Gutes.",
          emoji: "🤫",
          warum: "Wir tun heimlich etwas Gutes." },
        { titel: "Erst fragen", fuer: "34", dauer: "3 Min",
          text: "Die Tischnachbarn üben: Einer tut so, als käme er bei etwas nicht weiter. Der andere fragt: „Soll ich dir helfen?“ – und akzeptiert auch ein „Nein danke, ich will es allein schaffen.“",
          folie: "Übt zu zweit: Einer kommt nicht weiter. Der andere fragt: **„Soll ich dir helfen?“**\n\nAuch „Nein danke“ ist okay.",
          kern: ["34"],
          emoji: "🙋",
          warum: "Helfen heißt auch: erst fragen." }
    ],
    ab12: {
      "titel": "Ich helfe gern",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "ankreuzen",
          "text": "Wo kannst du helfen? Kreuze an.",
          "optionen": [
            "[bild:loeffel] Tisch decken",
            "[bild:stift] Stifte aufheben",
            "[bild:tuer] Tür aufhalten",
            "[bild:besen] aufräumen"
          ],
          "nebeneinander": true
        },
        {
          "typ": "malen",
          "text": "Male, wie du jemandem hilfst.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Helfen – aber richtig", aufgaben: [
        { typ: "tabelle", text: "Wie kannst du helfen?", spalten: ["Situation", "So helfe ich"],
          zeilen: [["Ein Kind findet den Weg zur Turnhalle nicht.", ""], ["Einer Frau fällt die Einkaufstasche runter.", ""], ["Dein Freund versteht eine Aufgabe nicht.", ""]] },
        { typ: "luecken", text: "Warum ist es gut, erst zu fragen: „Soll ich dir helfen?“", nummern: false, saetze: ["___"] },
        { typ: "luecken", text: "Mein geheimer Helfer-Auftrag diese Woche:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-gerecht",
    titel: "Gerecht ist nicht immer gleich",
    kategorie: "Vielfalt & Respekt",
    ziel12: "Verstehen, dass manche Kinder mehr Hilfe brauchen als andere",
    ziel34: "Gleichheit und Gerechtigkeit unterscheiden",
    material: "Pflaster oder Pflaster aus Papier (für das Pflaster-Spiel)\nTafel: Zaun mit drei Kindern (groß, mittel, klein) und drei Kisten",
    lerntext12: { titel: "Drei Kinder am Zaun", text:
`Hinter einem hohen Zaun spielen die Großen Fußball. Drei Kinder wollen zuschauen: Tim ist groß, Ella ist mittel und Ben ist klein.

Tim kann über den Zaun schauen. Ella und Ben nicht.

Der Hausmeister bringt drei Kisten. Jedes Kind bekommt eine Kiste. Das ist **gleich**. Jetzt kann Ella auch schauen. Aber Ben ist immer noch zu klein!

Tim überlegt. „Ich brauche gar keine Kiste. Ben, nimm meine!“ Jetzt steht Ben auf zwei Kisten. Tim steht auf dem Boden, Ella auf einer Kiste.

Jetzt können alle drei zuschauen! Das ist **gerecht**: Jeder bekommt, was er braucht.

**Nach dem Vorlesen:**
1. Warum konnten Ella und Ben nicht über den Zaun schauen?
2. Was hat der Hausmeister gebracht?
3. Warum konnte Ben trotzdem noch nichts sehen?
4. Was hat Tim gemacht – und war das gerecht?

**Tipp für dich:** Male das Bild an der Tafel nach: Erst bekommt jeder eine Kiste (gleich). Dann bekommt jeder, was er braucht (gerecht).` },
    lerntext34: { titel: "Warum bekommt Mia mehr Zeit?", text:
`In der Klassenarbeit bekommt Mia zehn Minuten mehr Zeit als alle anderen. Und sie darf sich die Aufgaben vorlesen lassen. Nach der Stunde beschwert sich Leon: „Das ist unfair! Warum bekommt sie mehr Zeit? Wir müssten alle gleich behandelt werden!“

Frau Schröder fragt die Klasse: „Stellt euch vor, Kai hat sich das Knie aufgeschlagen. Soll ich dann jedem von euch ein Pflaster aufs Knie kleben – damit alle gleich behandelt werden?“ Die Klasse lacht. „Nein, natürlich nicht. Kai braucht das Pflaster.“

„Genau“, sagt Frau Schröder. „Mia hat eine Lese-Rechtschreib-Schwäche. Lesen strengt sie viel mehr an als euch. Die zusätzliche Zeit ist ihr Pflaster. Sie bekommt dadurch keinen Vorteil – sie bekommt die gleiche Chance wie ihr.“

Leon denkt nach. „Dann ist es wie bei Jakob mit der Brille. Der bekommt ja auch eine Brille und wir nicht.“ – „Ganz genau“, sagt Frau Schröder. „Gerecht heißt nicht, dass alle dasselbe bekommen. Gerecht heißt, dass jeder bekommt, was er braucht.“

**Fragen zum Gespräch:**
1. Warum fand Leon es zuerst unfair?
2. Was soll das Pflaster-Beispiel zeigen?
3. Was ist der Unterschied zwischen „gleich“ und „gerecht“?
4. Fallen dir weitere Beispiele ein? (Brille, Rollstuhlrampe, Übersetzung …)` },
    uebungen: [
        { titel: "Das Pflaster-Spiel", fuer: "alle", dauer: "5 Min",
          text: "Frag: „Wer hat sich schon mal am Ellbogen wehgetan?“ Ein Kind erzählt. Dann klebst du allen Kindern ein (Papier-)Pflaster auf den Ellbogen – „damit alle gleich behandelt werden“. Die Kinder merken schnell, dass das komisch ist. Gespräch: Wer braucht wirklich ein Pflaster? Was ist gerecht?",
          folie: "Wer hat sich schon mal wehgetan? 🩹",
          emoji: "🩹",
          warum: "Ein seltsames Spiel – mal sehen, ob es gerecht ist …" },
        { titel: "Die Kisten am Zaun", fuer: "12", dauer: "4 Min",
          text: "An der Tafel sind drei Kinder unterschiedlicher Größe hinter einem Zaun gemalt. Die Kinder kommen nacheinander nach vorn und malen Kisten so dazu, dass alle über den Zaun schauen können.",
          folie: "Drei Kinder wollen über den Zaun schauen.\n\nMal Kisten dazu – so, dass **alle** etwas sehen können. 📦",
          kern: ["12"],
          emoji: "📦",
          warum: "Wie können alle über den Zaun schauen?" },
        { titel: "Gleich oder gerecht?", fuer: "34", dauer: "4 Min",
          text: "Die Kinder überlegen vom Platz aus zu jeder Situation, was gerecht wäre:\n\n- Ein Kind im Rollstuhl will mit auf den Ausflug.\n- Ein Kind spricht erst seit einem Jahr Deutsch.\n- Ein Kind kann die Tafel nicht gut sehen.\n- Ein Kind hat zu Hause keinen ruhigen Platz für Hausaufgaben.",
          quiz: "karten",
          frage: "Was wäre hier gerecht?",
          folie: "**Gleich** heißt: Jeder bekommt dasselbe.\n**Gerecht** heißt: Jeder bekommt, was er braucht.\n\nWas wäre hier gerecht?",
          kern: ["34"],
          emoji: "⚖️",
          warum: "Gleich ist nicht immer gerecht. Wir überlegen." }
    ],
    ab12: {
      "titel": "Jeder bekommt, was er braucht",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "malen",
          "text": "Male drei Kinder am Zaun: groß, mittel und klein. Male so viele Kisten dazu, dass alle zuschauen können.",
          "bild": ""
        },
        {
          "typ": "gesichter",
          "text": "Jetzt können alle zuschauen. Male die Gesichter an.",
          "gefuehle": [
            "froh",
            "froh",
            "froh"
          ],
          "leer": false
        }
      ]
    },
    ab34: { titel: "Gleich oder gerecht?", kontext: "Zur Geschichte: Mia bekommt im Test mehr Zeit. Frau Schröder erklärt es mit dem Pflaster-Beispiel: Wer sich verletzt hat, bekommt ein Pflaster – nicht einfach alle.", aufgaben: [
        { typ: "luecken", text: "Erkläre das Pflaster-Beispiel mit eigenen Worten.", nummern: false, saetze: ["___", "___"] },
        { typ: "tabelle", text: "Was braucht das Kind, damit es gerecht ist?", spalten: ["Kind", "Was braucht es?"],
          zeilen: [["Lea sieht schlecht.", ""], ["Kian spricht erst seit einem Jahr Deutsch.", ""], ["Mia fällt das Lesen und Schreiben schwer.", ""], ["Tim sitzt im Rollstuhl.", ""]] },
        { typ: "luecken", text: "Gerecht ist für mich, wenn …", nummern: false, saetze: ["___"] }
    ]}
})

);
