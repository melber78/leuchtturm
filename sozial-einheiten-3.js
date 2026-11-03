/* Leuchtturm – Sozialtraining: Vorlagen Teil 3 (Freundschaft, Regeln & Miteinander)
   Format wie in sozial-einheiten.js beschrieben. */
window.SOZIAL_VORLAGEN.push(

/* ============================== FREUNDSCHAFT ============================== */
SOZIAL_EINHEIT({
    id: "v-mitspielen-lassen",
    titel: "Komm, spiel mit!",
    kategorie: "Freundschaft",
    ziel12: "Merken, wie es sich anfühlt, ausgeschlossen zu sein, und andere zum Mitspielen einladen",
    ziel34: "Ausgrenzung erkennen und Wege finden, andere einzubeziehen",
    material: "Tafel für die Einladungs-Sätze und die Pausen-Ideen",
    lerntext12: { titel: "Der kleine Hase", text:
`Auf der Wiese spielen die Tiere Ball. Der Fuchs, der Bär und das Reh werfen sich den Ball zu.

Der kleine Hase kommt vorbei. „Darf ich mitspielen?“, fragt er. „Nein“, sagt der Bär. „Du bist viel zu klein.“

Der Hase setzt sich allein unter einen Baum. Er ist **traurig**. Seine Ohren hängen herunter.

Da kommt die Schildkröte. „Komm, spiel mit mir!“, sagt sie. Der Hase hüpft vor Freude.

Später fliegt der Ball der Tiere in einen Busch. Niemand kommt heran. Aber der Hase ist klein und schnell – er holt den Ball heraus! Da sagt der Bär: „Danke, Hase. Willst du jetzt mitspielen? Und die Schildkröte auch?“ Jetzt spielen alle zusammen.

**Nach dem Vorlesen:**
1. Warum durfte der Hase nicht mitspielen?
2. Wie hat sich der Hase gefühlt?
3. Was hat die Schildkröte gemacht?
4. Wie hat der Hase den anderen Tieren geholfen?` },
    lerntext34: { titel: "Der Club der Sterne", text:
`In der Klasse 4a gibt es einen neuen Club: den „Club der Sterne“. Wer mitmachen will, braucht einen bestimmten Glitzer-Sticker. In der Pause sitzen die Club-Mädchen zusammen und tuscheln. Wer keinen Sticker hat, darf nicht dazu.

Maya hat keinen. Jeden Tag steht sie in der Pause allein am Rand. Wenn sie sich dazusetzen will, heißt es: „Sorry, nur für Club-Mitglieder.“ Abends will Maya nicht mehr in die Schule.

Lisa ist im Club. Sie merkt, dass Maya immer stiller wird. Eines Tages sagt sie in der Club-Runde: „Ich finde das blöd. Wie würdet ihr euch fühlen, wenn ihr immer draußen bleiben müsstet?“ Erst sind alle still. Dann sagt Hanna: „Eigentlich war das nur Spaß.“ – „Für Maya nicht“, sagt Lisa.

Die Mädchen beschließen eine neue Club-Regel: **Jede, die mitmachen will, darf mitmachen.** Am nächsten Tag lädt Lisa Maya ein.

**Fragen zum Gespräch:**
1. Woran konnte man sehen, dass es Maya schlecht geht?
2. Warum war das für die Club-Mädchen „nur Spaß“, für Maya aber nicht?
3. Was hat Lisa Mutiges getan?
4. Ist es in Ordnung, einen besten Freund oder eine beste Freundin zu haben? Wo ist der Unterschied zum Ausgrenzen?` },
    uebungen: [
        { titel: "Wie fühlt sich das an?", fuer: "alle", dauer: "4 Min",
          text: "Alle schließen am Platz die Augen. Du erzählst langsam: „Stell dir vor, es ist Pause. Alle spielen. Du fragst: Darf ich mitspielen? – und alle sagen Nein. Du stehst allein da …“ Danach öffnen alle die Augen. Jedes Kind sagt ein Wort, wie es sich angefühlt hat. Schließe mit dem Gegenteil: „Jetzt sagt jemand: Komm, wir brauchen dich noch!“",
          folie: "Mach die Augen zu und hör gut zu. 👂\n\nDanach sagst du **ein Wort**: Wie hat es sich angefühlt?" },
        { titel: "Einladungs-Sätze", fuer: "alle", dauer: "4 Min",
          text: "Sammelt an der Tafel freundliche Einladungen: „Willst du mitspielen?“ – „Komm, wir brauchen noch jemanden!“ – „Du kannst in unser Team.“ Die Tischnachbarn üben sie: Einer sitzt „allein“, der andere lädt ihn ein. Dann wechseln.",
          folie: "Wie lädt man jemanden zum Mitspielen ein?\n\nÜbt mit eurem Nachbarn: Einer sitzt allein, der andere lädt ihn ein. Dann wechseln." },
        { titel: "Pausen-Ideen für alle", fuer: "34", dauer: "4 Min",
          text: "Die Kinder sammeln vom Platz aus Spiele, bei denen beliebig viele mitmachen können (Fangen, Seilspringen mit langem Seil, Ochs am Berg …) und eine Regel für die Klasse: „Wer fragt, darf mitmachen.“",
          folie: "Welche Spiele gehen mit **ganz vielen** Kindern?\n\nUnd unsere Regel: **„Wer fragt, darf mitmachen.“**" }
    ],
    ab12: {
      "titel": "Komm, spiel mit!",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "gesichter",
          "text": "Male: So fühlt sich der Hase allein – und so beim Mitspielen.",
          "gefuehle": [
            "traurig",
            "froh"
          ],
          "leer": true
        },
        {
          "typ": "daumen",
          "text": "Ein Kind steht allein. Was machst du? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Ich frage: „Willst du mitspielen?“",
            "Ich lache es aus.",
            "Ich gehe einfach weiter.",
            "Ich erkläre ihm unser Spiel."
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male ein Spiel, bei dem alle mitmachen können.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Niemand bleibt draußen", kontext: "Zur Geschichte: Maya darf nicht in den „Club der Sterne“ und steht jede Pause allein am Rand. Lisa setzt sich für sie ein.", aufgaben: [
        { typ: "luecken", text: "Versetze dich in Maya.", nummern: false,
          saetze: ["Maya fühlt sich ___", "Sie denkt: „___“"] },
        { typ: "tabelle", text: "Ausgrenzen (A) oder einladen (E)? Kreuze die richtige Spalte an.", spalten: ["Was passiert?", "A", "E"],
          zeilen: [["„Du darfst nur mitmachen, wenn du mir deine Chips gibst.“", "", ""], ["„Komm, du kannst in unser Team.“", "", ""], ["Alle drehen sich weg, als Tom kommt.", "", ""], ["„Wir sind schon zu viele, aber morgen bist du dabei.“", "", ""], ["„Mit dir spielt keiner.“", "", ""]] },
        { typ: "luecken", text: "Schreibe zwei Einladungs-Sätze, die du in der Pause sagen kannst.", nummern: true, saetze: ["„___“", "„___“"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-teilen",
    titel: "Teilen",
    kategorie: "Freundschaft",
    ziel12: "Erleben, dass Teilen Freude machen kann",
    ziel34: "Gerecht teilen und erkennen, was man nicht teilen muss",
    material: "Papierkreise als „Pizza“ (ein Kreis pro Kind) + Scheren\nTafel",
    lerntext12: { titel: "Mats und die Buntstifte", text:
`Mats hat neue Buntstifte. Es sind ganz viele Farben. Mats ist stolz.

Nele sitzt neben ihm. Sie hat ihre Stifte zu Hause vergessen. Sie soll eine Blume malen, aber sie hat keinen Stift.

Mats überlegt. „Das sind meine neuen Stifte“, denkt er. „Und wenn sie kaputtgehen?“ Dann sieht er Neles Gesicht. Sie ist traurig.

„Hier“, sagt Mats. „Wir können sie zusammen benutzen. Aber vorsichtig, ja?“ Nele strahlt. „Danke! Ich passe gut auf.“

Zusammen malen sie die schönsten Blumen. In der Pause teilt Nele ihren Apfel mit Mats.

**Nach dem Vorlesen:**
1. Warum hatte Nele keinen Stift?
2. Warum hat Mats zuerst gezögert?
3. Wie hat sich Nele gefühlt, als Mats geteilt hat?
4. Was hat Nele in der Pause gemacht?` },
    lerntext34: { titel: "Sieben Muffins für acht", text:
`Beim Klassenfest hat Aras Muffins gebacken. Es sind sieben Stück – aber in seiner Gruppe sind acht Kinder. „Ich habe sie gebacken, also bekomme ich zwei!“, sagt Aras. „Dann bekommen zwei andere gar keinen“, protestiert Jule.

Die Gruppe überlegt. Sophie schlägt vor, jeden Muffin in acht kleine Stücke zu schneiden. „Dann haben wir nur Krümel!“, lacht Ben. Schließlich sagt Mira: „Ich verzichte auf meinen, ich habe schon so viel Kuchen gegessen. Und Aras bekommt dafür als Dank die Schokostreusel vom Rest.“ Alle sind einverstanden.

Am Nachmittag will Ben Miras Notizbuch anschauen. „Wir teilen doch alles!“, sagt er. Mira hält das Buch fest. „Nein. Das ist mein Tagebuch. Das ist privat.“ Ben ist erst beleidigt – dann versteht er es.

**Fragen zum Gespräch:**
1. War Aras' Vorschlag fair? Warum oder warum nicht?
2. Welche Lösungen gab es? Welche findest du am besten?
3. Muss man alles teilen? Was gehört nur mir?
4. Ist „gerecht“ immer „gleich viel für jeden“?` },
    uebungen: [
        { titel: "Pizza teilen", fuer: "alle", dauer: "5 Min",
          text: "Jedes Kind bekommt einen Papierkreis als „Pizza“. Frage: „Du willst die Pizza mit deinem Tischnachbarn teilen – wie faltest du?“ Dann: „Jetzt kommen noch zwei Freunde!“ Kl. 1/2 falten halbe und viertel Pizzen. Kl. 3/4 überlegen zusätzlich: „Was, wenn drei Kinder kommen?“",
          folie: "Du hast einen Papierkreis – deine **Pizza** 🍕.\n\nTeil sie mit deinem Nachbarn: Wie faltest du?\nUnd jetzt kommen noch zwei Freunde dazu!" },
        { titel: "Teilen – ja oder nein?", fuer: "alle", dauer: "4 Min",
          text: "Du nennst Dinge, die Kinder zeigen Daumen hoch (kann man teilen), runter (lieber nicht) oder zur Seite (kommt drauf an):\n\n- Buntstifte\n- Zahnbürste\n- das Geheimnis meiner Freundin\n- mein Pausenbrot, wenn jemand nichts hat\n- mein Lieblingskuscheltier\n- ein Spiel in der Pause\n\nWichtig: Ich darf auch Nein sagen, wenn mir etwas sehr wichtig oder privat ist.",
          antworten: ["👍 kann man teilen", "👉 kommt drauf an", "👎 lieber nicht"],
          folie: "Kann man das **teilen**?\n\n👍 ja · 👉 kommt drauf an · 👎 lieber nicht\n\nDu darfst auch Nein sagen, wenn dir etwas sehr wichtig ist." },
        { titel: "Was ist gerecht?", fuer: "34", dauer: "3 Min",
          text: "Die Kinder überlegen vom Platz aus: Wie teilt man sieben Muffins gerecht auf acht Kinder auf? Sammelt mindestens drei Ideen und bewertet sie mit Daumen.",
          folie: "**7 Muffins** 🧁 – aber **8 Kinder**.\n\nWie kann man gerecht teilen? Sammelt mindestens drei Ideen." }
    ],
    ab12: {
      "titel": "Teilen macht froh",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "ankreuzen",
          "text": "Was kann man gut teilen? Kreuze an.",
          "optionen": [
            "[bild:wachsmal] Buntstifte",
            "[bild:zahnbuerste] Zahnbürste",
            "[bild:teddy] Spielzeug",
            "[bild:keks] Kekse",
            "[bild:fussball] Ball"
          ],
          "nebeneinander": true
        },
        {
          "typ": "gesichter",
          "text": "So fühlt sich Nele, als Mats teilt. Male das Gesicht an.",
          "gefuehle": [
            "froh"
          ],
          "leer": false
        },
        {
          "typ": "malen",
          "text": "Male, was du gern mit anderen teilst.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Gerecht teilen", aufgaben: [
        { typ: "luecken", text: "Sieben Muffins für acht Kinder: Schreibe zwei gerechte Lösungen.", nummern: true, saetze: ["___", "___"] },
        { typ: "tabelle", text: "Muss ich das teilen? Schreibe ja, nein oder kommt drauf an – und warum.", spalten: ["Was?", "Teilen? Warum?"],
          zeilen: [["Mein Tagebuch", ""], ["Die Stifte bei der Gruppenarbeit", ""], ["Mein Pausenbrot, wenn jemand nichts hat", ""], ["Die Lösung im Test", ""]] },
        { typ: "luecken", text: "Teilen …", nummern: false, saetze: ["… fällt mir leicht, wenn ___", "… fällt mir schwer, wenn ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-neue-freunde",
    titel: "Neue Freunde finden",
    kategorie: "Freundschaft",
    ziel12: "Mutig jemanden ansprechen und sich vorstellen",
    ziel34: "Gesprächsanfänge üben und Gemeinsamkeiten mit anderen entdecken",
    material: "Tafel für die Gesprächsstarter",
    lerntext12: { titel: "Das neue Kind", text:
`Heute ist ein neues Kind in der Klasse. Es heißt Noa. Noa sitzt ganz still auf seinem Platz. Er kennt niemanden.

In der Pause steht Noa allein. Kim sieht ihn. Kim ist ein bisschen aufgeregt. Aber dann geht sie zu Noa.

„Hallo, ich bin Kim. Wie heißt du?“ – „Ich heiße Noa.“ – „Was spielst du gern?“ – „Ich mag Katzen. Ich habe eine Katze. Sie heißt Mimi.“

„Ich habe auch eine Katze!“, ruft Kim. „Meine heißt Tiger.“ Beide lachen.

Jetzt reden sie die ganze Pause über ihre Katzen. Am Ende sagt Noa: „Morgen erzähle ich dir, was Mimi heute wieder angestellt hat.“

**Nach dem Vorlesen:**
1. Wie ging es Noa am ersten Tag?
2. Was hat Kim gesagt, um Noa kennenzulernen?
3. Was hatten Kim und Noa gemeinsam?
4. Wie kannst du ein neues Kind ansprechen?` },
    lerntext34: { titel: "Jakob zieht um", text:
`Jakob ist mit seiner Familie in eine neue Stadt gezogen. Alle seine Freunde wohnen jetzt weit weg. In der neuen Klasse fühlt er sich wie unsichtbar.

Am ersten Tag versucht er es: Er fragt zwei Jungen, ob er beim Fußball mitspielen darf. „Die Teams sind schon voll“, sagt einer. Jakob geht enttäuscht weg. Zu Hause sagt er: „Ich finde hier nie Freunde.“

Seine Mutter sagt: „Beim ersten Mal klappt es oft nicht. Gib nicht auf. Was magst du denn am liebsten?“ – „Lego“, sagt Jakob.

Am nächsten Tag sieht Jakob, dass Ole ein Lego-Heft im Ranzen hat. Er nimmt allen Mut zusammen: „Hey, baust du auch Lego? Was baust du gerade?“ Ole erzählt von seinem Raumschiff. Jakob erzählt von seiner Burg. Sie reden die ganze Pause.

Nach zwei Wochen besucht Jakob Ole zu Hause. Und beim Fußball ist er inzwischen auch dabei.

**Fragen zum Gespräch:**
1. Warum hat Jakob nach dem ersten Versuch aufgeben wollen?
2. Was hat beim zweiten Versuch geholfen?
3. Welche Fragen eignen sich gut, um jemanden kennenzulernen?
4. Wie kannst du einem neuen Kind in deiner Klasse helfen?` },
    uebungen: [
        { titel: "Hallo-Runde", fuer: "alle", dauer: "4 Min",
          text: "Die Kinder drehen sich zu ihrem Tischnachbarn: „Hallo, ich bin … Ich mag …“ Der andere antwortet und stellt eine Frage. Danach drehen sie sich zum Nachbarn auf der anderen Seite oder zum Tisch dahinter. Kl. 3/4 schauen auf Blickkontakt und Lächeln.",
          folie: "Dreh dich zu deinem Nachbarn:\n\n**„Hallo, ich bin … Ich mag …“**\n\nDer andere antwortet und stellt dir eine Frage.",
          folie34: "Dreh dich zu deinem Nachbarn:\n\n**„Hallo, ich bin … Ich mag …“**\n\nDer andere antwortet und stellt dir eine Frage. Achtet auf Blickkontakt und Lächeln. 🙂" },
        { titel: "Steh auf, wenn …", fuer: "alle", dauer: "5 Min",
          text: "Du liest die Sätze vor. Alle, die aufstehen, schauen sich kurz um: „Mit wem habe ich das gemeinsam?“ Dann setzen sich alle wieder. Zum Schluss dürfen Kinder eigene „Steh auf, wenn …“-Sätze vorschlagen.\n\n- Steh auf, wenn du gern Pizza isst.\n- Steh auf, wenn du ein Haustier hast.\n- Steh auf, wenn du Fußball magst.\n- Steh auf, wenn du Geschwister hast.\n- Steh auf, wenn du gern malst.\n- Steh auf, wenn du schon einmal umgezogen bist.",
          quiz: "karten",
          frage: "Steh auf, wenn das für dich stimmt – mit wem hast du das gemeinsam?",
          folie: "Steh auf, wenn das für dich stimmt! 🙋\n\nSchau dich um: **Mit wem hast du das gemeinsam?**" },
        { titel: "Gesprächsstarter", fuer: "34", dauer: "3 Min",
          text: "Sammelt an der Tafel gute erste Fragen: „Was spielst du gern?“ – „Hast du ein Haustier?“ – „Was ist dein Lieblingsessen?“ – „Wo wohnst du?“ Welche Fragen sind gut, welche eher unangenehm (z. B. „Warum bist du so klein?“)?",
          folie: "Was kann man fragen, wenn man jemanden **kennenlernen** will?\n\nWelche Fragen sind gut – welche eher unangenehm?" }
    ],
    ab12: {
      "titel": "Hallo, ich bin …",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "malen",
          "text": "Male dich. Was magst du gern? Male es dazu.",
          "bild": ""
        },
        {
          "typ": "daumen",
          "text": "So findest du neue Freunde. Ist das gut? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "lächeln",
            "„Hallo“ sagen",
            "fragen: „Spielst du mit?“",
            "schubsen"
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male dich und ein Kind, das du kennenlernen möchtest.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Wir haben etwas gemeinsam", aufgaben: [
        { typ: "tabelle", text: "Frage deinen Tischnachbarn. Kreuze an, was ihr gemeinsam habt.", spalten: ["Meine Frage", "Seine/ihre Antwort", "gleich?"],
          zeilen: [["Lieblingsessen?", "", "☐"], ["Lieblingstier?", "", "☐"], ["Hobby?", "", "☐"], ["___", "", "☐"]] },
        { typ: "luecken", text: "Drei gute Fragen, um jemanden kennenzulernen:", nummern: true, saetze: ["___", "___", "___"] },
        { typ: "luecken", text: "Was kannst du tun, wenn es beim ersten Mal nicht klappt?", nummern: false, saetze: ["___"] }
    ]}
}),

/* ============================== REGELN & MITEINANDER ============================== */
SOZIAL_EINHEIT({
    id: "v-hoeflichkeit",
    titel: "Bitte, danke, hallo",
    kategorie: "Regeln & Miteinander",
    ziel12: "Die Zauberwörter kennen und im Alltag benutzen",
    ziel34: "Höflich in verschiedenen Situationen handeln und die Wirkung beschreiben",
    material: "Ein Radiergummi oder ein kleiner Gegenstand für die Höflich-Kette",
    lerntext12: { titel: "Kobold Grummel", text:
`Im Wald wohnt Kobold Grummel. Grummel ist nie freundlich.

Er geht zum Bäcker-Igel und ruft: „Brot! Her damit!“ Der Igel schüttelt den Kopf. Er geht zur Eichhörnchen-Frau und ruft: „Nüsse! Sofort!“ Die Eichhörnchen-Frau dreht sich weg. Niemand gibt Grummel etwas.

Grummel setzt sich auf einen Stein und schmollt. Da kommt die kleine Maus. „Grummel, du musst die Zauberwörter sagen!“ – „Was für Zauberwörter?“ – „**Bitte** und **Danke**. Und **Hallo** sagen ist auch schön.“

Grummel probiert es. Er geht zum Igel. „Hallo, Igel. Bekomme ich bitte ein Brot?“ Der Igel lächelt und gibt ihm das größte Brot. „Danke!“, sagt Grummel. Und – Zauberei – er lächelt auch.

**Nach dem Vorlesen:**
1. Warum hat niemand Grummel etwas gegeben?
2. Welche Zauberwörter hat die Maus Grummel beigebracht?
3. Was ist passiert, als Grummel höflich gefragt hat?
4. Welche Zauberwörter kennst du noch?

**Tipp für dich:** Weitere Zauberwörter: Entschuldigung, gern geschehen, tschüss …` },
    lerntext34: { titel: "Das Land ohne Höflichkeit", text:
`Lilly wacht eines Morgens auf und alles ist anders. Ihr Bruder reißt ihr die Cornflakes aus der Hand: „Meins!“ Der Busfahrer schaut sie nicht an und brummt: „Weiter hinten!“ In der Bäckerei wirft ihr die Verkäuferin das Brötchen hin, ohne ein Wort zu sagen.

In der Schule ist es noch schlimmer. Niemand grüßt. Wer etwas will, ruft „Gib her!“. Wenn jemand angerempelt wird, sagt keiner „Entschuldigung“. Alle wirken schlecht gelaunt, und ständig gibt es Streit.

Am Abend ist Lilly erschöpft und traurig. Sie denkt: „Es sind doch nur ein paar kleine Wörter. Aber ohne sie fühlt sich alles kalt an.“

Dann klingelt ihr Wecker – es war nur ein Traum! Beim Frühstück sagt ihr Bruder: „Gibst du mir bitte die Milch?“ Lilly grinst breit. „Aber gern!“

**Fragen zum Gespräch:**
1. Wie war es im Land ohne Höflichkeit? Wie haben sich die Menschen gefühlt?
2. Warum haben die „kleinen Wörter“ so eine große Wirkung?
3. Bei wem bist du besonders höflich – und bei wem vergisst du es manchmal?
4. Ist Höflichkeit überall auf der Welt gleich?` },
    uebungen: [
        { titel: "Zauberwort-Detektive", fuer: "alle", dauer: "4 Min",
          text: "Du liest Sätze vor – mal höflich, mal unhöflich. Die Kinder zeigen Daumen hoch (höflich) oder runter (unhöflich). Bei unhöflichen Sätzen macht ein Kind daraus einen höflichen Satz.\n\n- „Gib mir den Stift!“\n- „Gibst du mir bitte deinen Stift?“\n- „Hä? Was?“\n- „Danke, dass du mir geholfen hast.“\n- „Weg da!“\n- „Darf ich bitte vorbei?“",
          antworten: ["👍 höflich", "👎 unhöflich"],
          folie: "Ist das **höflich** 👍 oder **unhöflich** 👎?\n\nWenn es unhöflich ist: Wie sagt man es besser?" },
        { titel: "Höflich-Kette", fuer: "alle", dauer: "5 Min",
          text: "Ein Radiergummi wandert von Platz zu Platz. Wer ihn weitergibt, sagt: „Bitte schön.“ Wer ihn bekommt: „Danke schön.“ Kl. 3/4 ergänzen einen netten Satz („Danke, du hast heute schön gemalt.“). Geht er einmal ganz herum, klatschen alle.",
          folie: "Der Radiergummi wandert von Platz zu Platz.\n\nWer ihn gibt: **„Bitte schön.“**\nWer ihn bekommt: **„Danke schön.“**",
          folie34: "Der Radiergummi wandert von Platz zu Platz.\n\nWer ihn gibt: **„Bitte schön.“** Wer ihn bekommt: **„Danke schön.“**\n\nUnd dazu ein netter Satz!" },
        { titel: "Höflich unterwegs", fuer: "34", dauer: "3 Min",
          text: "Welche höflichen Wörter und Gesten passen? Im Bus, wenn eine ältere Person einsteigt – beim Arzt – am Telefon mit Oma – wenn ich jemanden nicht verstanden habe („Wie bitte?“ statt „Hä?“). Die Kinder sammeln vom Platz aus.",
          folie: "Welche höflichen Wörter passen hier?\n\n🚌 im Bus · 🩺 beim Arzt · 📞 am Telefon mit Oma · 🤔 wenn ich jemanden nicht verstanden habe" }
    ],
    ab12: {
      "titel": "Meine Zauberwörter",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Ist das höflich? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "„Bitte!“",
            "„Gib her!“",
            "„Danke!“",
            "„Weg da!“",
            "„Hallo!“"
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male den Stern an. Sag deinem Nachbarn dein Lieblings-Zauberwort.",
          "bild": "stern"
        },
        {
          "typ": "malen",
          "text": "Male: Wem sagst du heute „Danke“?",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Höflich sein wirkt", aufgaben: [
        { typ: "tabelle", text: "Mach es höflich: Schreibe den Satz freundlich auf.", spalten: ["Unhöflich", "Höflich"],
          zeilen: [["„Gib mir das Salz!“", ""], ["„Hä? Was?“", ""], ["„Weg da!“", ""], ["„Ich will jetzt dran!“", ""]] },
        { typ: "luecken", text: "Wie fühlt sich der andere, wenn du höflich zu ihm bist?", nummern: false, saetze: ["___"] },
        { typ: "luecken", text: "„Danke“ in anderen Sprachen – frag in der Gruppe!", nummern: false,
          saetze: ["Auf ___ heißt danke: ___", "Auf ___ heißt danke: ___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-verantwortung",
    titel: "Verantwortung übernehmen",
    kategorie: "Regeln & Miteinander",
    ziel12: "Eine kleine Aufgabe für die Gruppe übernehmen und zuverlässig erledigen",
    ziel34: "Verstehen, was Verantwortung heißt, und zu eigenen Fehlern stehen",
    material: "Plakat „Unsere Dienste“ + Namensklammern\nEine Topfpflanze (für den Lerntext 1/2, falls vorhanden)",
    lerntext12: { titel: "Die Klassenpflanze", text:
`In der Klasse steht eine Pflanze. Sie heißt Fridolin. Diese Woche hat Tim den Gieß-Dienst.

Am Montag gießt Tim Fridolin. Am Dienstag auch. Aber am Mittwoch vergisst er es. Und am Donnerstag auch.

Am Freitag hängen Fridolins Blätter ganz schlapp herunter. Tim erschrickt. „Oh nein, das war meine Aufgabe!“

Tim könnte einfach nichts sagen. Aber er geht zur Lehrerin. „Ich habe vergessen, Fridolin zu gießen. Das tut mir leid.“ Die Lehrerin sagt: „Gut, dass du es sagst. Was können wir tun?“

Tim gießt Fridolin. Er stellt ihn in die Sonne. Und er malt sich einen Erinnerungs-Zettel. Nach ein paar Tagen steht Fridolin wieder gerade. Tim ist stolz.

**Nach dem Vorlesen:**
1. Was war Tims Aufgabe?
2. Was ist mit Fridolin passiert?
3. Was hat Tim gemacht, als er es gemerkt hat?
4. Welche Aufgabe hast du zu Hause oder in der Schule?` },
    lerntext34: { titel: "Die kaputte Scheibe", text:
`Selma, Paul und Deniz spielen nach der Schule Fußball auf der Wiese hinter den Häusern. Deniz schießt mit voller Wucht – der Ball fliegt am Tor vorbei und **klirr!** – mitten in das Kellerfenster von Herrn Schulze.

„Weg hier!“, ruft Paul, und alle drei rennen davon. Zu Hause kann Selma nicht stillsitzen. Es war zwar nicht ihr Schuss, aber sie hat mitgespielt. Und Herr Schulze ist immer nett zu ihnen.

Sie ruft Deniz an. „Wir müssen das sagen.“ Deniz will erst nicht. „Dann muss ich das bezahlen!“ – „Wir haben zusammen gespielt“, sagt Selma. „Dann stehen wir auch zusammen dazu.“

Am Abend klingeln Selma und Deniz bei Herrn Schulze. Deniz erklärt mit roten Ohren, was passiert ist. Herr Schulze ist erst ärgerlich. Dann sagt er: „Danke, dass ihr gekommen seid. Das ist mir mehr wert als die Scheibe.“ Die Kinder helfen ihm am Wochenende im Garten – und die Eltern teilen sich die Kosten.

**Fragen zum Gespräch:**
1. Warum sind die Kinder zuerst weggerannt?
2. Warum hat Selma sich verantwortlich gefühlt, obwohl sie nicht geschossen hat?
3. Was bedeutet „Verantwortung übernehmen“?
4. Wofür bist du schon verantwortlich – zu Hause und in der Schule?` },
    uebungen: [
        { titel: "Unsere Dienste", fuer: "alle", dauer: "7 Min",
          text: "Gemeinsam überlegt ihr Dienste für das Sozialtraining: Redestein-Wächter, Barometer-Helfer, Tafel-Dienst, Austeil-Dienst, Fenster und Licht, Zeitwächter (zeigt die letzten 5 Minuten an). Jedes Kind wählt einen Dienst und steckt seine Klammer ans Plakat. Kl. 3/4 schreiben die Dienste aufs Plakat, Kl. 1/2 malen ein Symbol dazu. Die Dienste wechseln jeden Monat.",
          folie: "Welche **Dienste** brauchen wir im Sozialtraining?\n\nSuch dir einen Dienst aus und steck deine Klammer ans Plakat." },
        { titel: "Wer ist verantwortlich?", fuer: "alle", dauer: "4 Min",
          text: "Du liest Situationen vor. Die Kinder legen die Hand auf die Brust („Das bin ich“) oder zeigen nach außen („Das ist jemand anderes“).\n\n- Mein Ranzen ist nicht gepackt.\n- Das Wetter ist schlecht.\n- Mein Hamster hat kein Futter.\n- Ich habe ein geliehenes Buch verloren.\n- Der Bus kommt zu spät.",
          quiz: "ampel",
          antworten: ["🙋 Das bin ich", "👉 jemand anderes"],
          folie: "Wer ist dafür verantwortlich?\n\n🙋 Hand auf die Brust = **Das bin ich.**\n👉 nach außen zeigen = **jemand anderes.**" }
    ],
    ab12: {
      "titel": "Ich kümmere mich",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "ankreuzen",
          "text": "Was machst du zu Hause? Kreuze an.",
          "optionen": [
            "[bild:besen] aufräumen",
            "[bild:loeffel] Tisch decken",
            "[bild:hamster] Tier füttern",
            "[bild:rucksack] Ranzen packen"
          ],
          "nebeneinander": true
        },
        {
          "typ": "malen",
          "text": "Male Fridolin, die Klassenpflanze.",
          "bild": ""
        },
        {
          "typ": "malen",
          "text": "Male, wie du deinen Dienst machst.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Ich stehe dazu", kontext: "Zur Geschichte: Beim Fußball schießt Deniz ein Kellerfenster kaputt, alle rennen weg. Selma überredet Deniz, es Herrn Schulze zu sagen – und geht mit.", aufgaben: [
        { typ: "luecken", text: "Was hat Selma getan? Was hätte sie noch tun können?", nummern: false,
          saetze: ["Selma hat ___", "Sie hätte auch ___"] },
        { typ: "tabelle", text: "Verantwortung übernehmen – aber wie?", spalten: ["Was ist passiert?", "Was tue ich?"],
          zeilen: [["Ich habe einen geliehenen Stift verloren.", ""], ["Ich habe vergessen, die Blumen zu gießen.", ""], ["Mein Ball ist in ein Blumenbeet gefallen und hat Blumen geknickt.", ""]] },
        { typ: "luecken", text: "Diese Woche übernehme ich Verantwortung für:", nummern: false, saetze: ["___"] }
    ]}
}),

SOZIAL_EINHEIT({
    id: "v-pause-fair",
    titel: "Pausen fair gestalten",
    kategorie: "Regeln & Miteinander",
    ziel12: "Einfache Pausenregeln kennen und fair mitspielen",
    ziel34: "Pausenkonflikte erkennen und faire Regeln für alle vorschlagen",
    material: "Pro Kind eine rote und eine grüne Karte\nPlakat „Unsere Pausen-Ideen“",
    lerntext12: { titel: "Das Klettergerüst", text:
`Auf dem Schulhof gibt es ein tolles Klettergerüst. Alle wollen hoch. Alle drängeln.

Jonas schubst Mila zur Seite. Mila schubst Leo. Leo fällt hin und weint. Keiner hat Spaß.

Da ruft die Pausenaufsicht: „Stopp! So geht das nicht. Wir machen eine **Schlange**. Einer nach dem anderen.“

Jetzt stellen sich alle an. Jonas ist zuerst dran, dann Mila, dann Leo. Wer oben war, stellt sich hinten wieder an. Niemand wird geschubst. Und jeder kommt dran.

Leo sagt: „So macht es viel mehr Spaß!“

**Nach dem Vorlesen:**
1. Was ist am Klettergerüst passiert?
2. Warum hatte am Anfang niemand Spaß?
3. Was hat die Pausenaufsicht vorgeschlagen?
4. Was war mit der Schlange-Regel besser?` },
    lerntext34: { titel: "Der Fußballplatz", text:
`An der Grundschule Lindenhof gibt es einen kleinen Fußballplatz. Jeden Tag ist er von den Viertklässlern besetzt. Wenn die Dritt- oder Zweitklässler fragen, heißt es: „Ihr seid zu schlecht“ oder „Wir waren zuerst da.“

Die 3b ist sauer. Ihre Klassensprecherin Amira bringt das Problem in den Schülerrat. Die Viertklässler protestieren: „Wir sind die Großen, wir dürfen das!“ Amira bleibt ruhig: „Der Platz gehört allen Kindern der Schule.“

Der Schülerrat macht einen Plan: Montag die 1. und 2. Klassen, Dienstag die 3. Klassen, Mittwoch die 4. Klassen, Donnerstag gemischte Teams, Freitag freies Spiel. Wer den Plan nicht einhält, muss eine Pause aussetzen.

Die Viertklässler murren erst. Aber am Donnerstag merken sie: In gemischten Teams macht es richtig Spaß – und ein Zweitklässler schießt das schönste Tor der Woche.

**Fragen zum Gespräch:**
1. Was war das Problem? Wer hatte darunter zu leiden?
2. Wie hat Amira das Problem gelöst? Was war daran klug?
3. Ist der Plan fair? Würdest du etwas ändern?
4. Gibt es bei euch auch Streit in der Pause? Worum?` },
    uebungen: [
        { titel: "Pausen-Ampel", fuer: "alle", dauer: "5 Min",
          text: "Du nennst Pausen-Situationen, die Kinder zeigen Grün (fair) oder Rot (unfair). Kl. 3/4 sagen, was man stattdessen tun kann.\n\n- Ich stelle mich hinten an.\n- Ich nehme den anderen den Ball weg.\n- Ich lasse ein Kind mitspielen.\n- Ich bestimme immer, was gespielt wird.\n- Ich hole Hilfe, wenn jemand weint.\n- Ich halte mich an die Spielregeln.",
          antworten: ["🟢 fair", "🔴 unfair"],
          folie: "Ist das in der Pause **fair** 🟢 oder **unfair** 🔴?",
          folie34: "Ist das in der Pause **fair** 🟢 oder **unfair** 🔴?\n\nWenn es unfair ist: Was kann man stattdessen tun?" },
        { titel: "Unser Pausen-Plan", fuer: "alle", dauer: "7 Min",
          text: "Die Kinder erzählen vom Platz aus, wo es in ihrer Pause Streit gibt (Klettergerüst, Ball, Schaukel …). Kl. 3/4 schlagen zu jedem Problem eine faire Regel vor, Kl. 1/2 malen dazu ein Symbol. Die besten Ideen kommen aufs Plakat – vielleicht sogar als Vorschlag für die ganze Schule.",
          folie12: "Wo gibt es in der Pause **Streit**? 🛝⚽\n\nErzähl – und mal ein Bild für unser Plakat.",
          folie34: "Wo gibt es in der Pause **Streit**? 🛝⚽\n\nErzähl – und schlag eine **faire Regel** vor." }
    ],
    ab12: {
      "titel": "Fair in der Pause",
      "gemeinsam": true,
      "aufgaben": [
        {
          "typ": "daumen",
          "text": "Ist das fair? Kreise ein: 👍 oder 👎.",
          "zeilen": [
            "Ich stelle mich an.",
            "Ich drängle mich vor.",
            "Ich lasse andere mitspielen.",
            "Ich nehme den Ball weg.",
            "Ich warte, bis ich dran bin."
          ],
          "art": "daumen"
        },
        {
          "typ": "malen",
          "text": "Male dein Lieblingsspiel in der Pause.",
          "bild": ""
        }
      ]
    },
    ab34: { titel: "Faire Pause für alle", aufgaben: [
        { typ: "luecken", text: "Worüber gibt es in eurer Pause Streit?", nummern: true, saetze: ["___", "___"] },
        { typ: "tabelle", text: "Erfinde eine faire Regel.", spalten: ["Problem", "Faire Regel"],
          zeilen: [["Die Großen nehmen immer den Fußballplatz.", ""], ["Am Klettergerüst wird gedrängelt.", ""], ["Ein Kind darf nie mitspielen.", ""]] },
        { typ: "luecken", text: "Wer hilft, wenn ein Streit in der Pause nicht aufhört?", nummern: false, saetze: ["___"] }
    ]}
})

);
