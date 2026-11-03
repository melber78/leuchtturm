/* ============================================================
   Leuchtturm – Sozialtraining & Vertretung:
   Ausführlicher Stundenverlauf „Schritt für Schritt“ für die Lehrkraft.
   Wird automatisch aus den Inhalten jeder Stunde gebaut (Ziele,
   Lerntexte, Übungen, Arbeitsblätter, Material) – funktioniert also
   auch für eigene und angepasste Stunden.
   Benötigt aus sozial-stunden.php: esc, md, inline.
   ============================================================ */
"use strict";
(function () {

const CSS = `
.regie{ display:flex; flex-direction:column; gap:14px; }
.regie-vorher{ background:#fff8e6; border:2px solid #f6dfa6; border-radius:14px; padding:12px 16px; }
.regie-vorher h3, .regie-phase h3{ margin:0 0 6px; }
.regie-vorher ul{ margin:4px 0 0; padding-left:20px; }
.regie-vorher li{ margin:3px 0; }
.regie-phase{ display:grid; grid-template-columns:86px 1fr; gap:14px; border:2px solid #e3e9ee; border-radius:14px; padding:14px 16px; background:#fff; break-inside:avoid; }
.regie-zeit{ text-align:center; }
.regie-zeit b{ display:block; font-size:20px; color:#16324a; }
.regie-zeit span{ display:block; font-size:12px; font-weight:800; color:#7c8a85; text-transform:uppercase; letter-spacing:.04em; margin-top:2px; }
.regie-zweck{ font-style:italic; color:#55636a; margin:0 0 8px; font-weight:600; }
.regie-schritte{ margin:0; padding-left:22px; display:flex; flex-direction:column; gap:8px; }
.regie-schritte > li{ line-height:1.45; }
.regie-sag{ display:block; margin:5px 0 2px; background:#eef6fb; border-left:4px solid #3d7ea6; border-radius:0 10px 10px 0; padding:6px 10px; font-weight:700; color:#16324a; }
.regie-sag::before{ content:"🗣️ Sag: "; font-weight:900; }
.regie-tipp{ margin-top:10px; background:#f3f8f3; border-radius:10px; padding:8px 12px; font-size:.95em; }
.regie-tipp b{ color:#2e7d4f; }
.regie-text{ margin:6px 0 2px; padding:8px 12px; border:1.5px dashed #c9d6e3; border-radius:10px; background:#fbfcfd; font-size:.95em; }
.regie-text .md p{ margin:4px 0; }
.regie-ab{ margin:4px 0 0; padding-left:18px; }
.regie-ab li{ margin:2px 0; }
.regie-nachher{ background:#f4f6f8; border-radius:14px; padding:12px 16px; }
.regie-nachher ul{ margin:4px 0 0; padding-left:20px; }
@media (max-width:640px){ .regie-phase{ grid-template-columns:1fr; } .regie-zeit{ text-align:left; display:flex; gap:10px; align-items:baseline; } }
@media print{
  .lehrer-druck .regie{ gap:3mm; font-size:10pt; }
  .lehrer-druck .regie-phase{ grid-template-columns:20mm 1fr; padding:3mm 4mm; border-width:.4mm; }
  .lehrer-druck .regie-zeit b{ font-size:13pt; }
  .lehrer-druck .regie-sag, .lehrer-druck .regie-vorher, .lehrer-druck .regie-tipp{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}`;
function cssLaden(){ if (!document.getElementById("regieCss")) { const st = document.createElement("style"); st.id = "regieCss"; st.textContent = CSS; document.head.appendChild(st); } }

/* ---------- Bausteine ---------- */
const sag = t => `<span class="regie-sag">${inline(t)}</span>`;
const li = (t, ...extra) => `<li>${t}${extra.join("")}</li>`;
const tipp = t => `<div class="regie-tipp"><b>Achte darauf:</b> ${t}</div>`;
function teilen(text, marke){
    const s = String(text || "");
    const re = new RegExp("\\*\\*\\s*" + marke + "[^*]*\\*\\*", "i");
    const m = re.exec(s);
    if (!m) return [s.trim(), ""];
    return [s.slice(0, m.index).trim(), s.slice(m.index + m[0].length).trim()];
}
function schluesselwoerter(text){
    const w = [];
    String(text || "").replace(/\*\*([^*]{2,30})\*\*/g, (_, x) => { if (!/:$/.test(x.trim())) w.push(x.trim()); });
    return [...new Set(w)];
}
function fragenListe(text){
    return String(text || "").split("\n").map(z => z.trim()).filter(z => /^\d+\.\s+/.test(z)).map(z => z.replace(/^\d+\.\s+/, ""));
}
function kurzZiel(z){ return String(z || "").replace(/\.$/, ""); }
function phasenTyp(name){
    const n = String(name || "").toLowerCase();
    if (/ankommen|begrü/.test(n)) return "ankommen";
    if (/lerntext|einstieg|geschichte/.test(n)) return "lerntext";
    if (/arbeitsblatt/.test(n)) return "ab";
    if (/abschluss/.test(n)) return "abschluss";
    if (/übung|spiel/.test(n)) return "uebung";
    return "frei";
}
const TYP_NAMEN = { schreiben: "schreiben", ankreuzen: "ankreuzen", zuordnen: "verbinden", tabelle: "Tabelle ausfüllen", luecken: "Lücken füllen", gesichter: "Gesichter malen", malen: "malen", daumen: "einkreisen", gefuehle: "Gesicht einkreisen" };
function abAufgaben(ab, stufe){
    return ((ab && ab.aufgaben) || []).filter(a => {
        const nur = a.nur || ((a.typ === "luecken" || a.typ === "schreiben") ? "2" : "");
        return stufe !== "1" || !nur || nur === "1";
    });
}

/* ---------- Phasen ---------- */
function vorher(e, st, vertretung){
    const punkte = [];
    const gem = !(window.BEREICH && window.BEREICH.key === "vertretung");
    const ab = st === "12" ? (gem ? "das Arbeitsblatt <b>Kl. 1/2</b> (ein Blatt für alle, ohne Lesen und Schreiben)" : "die Arbeitsblätter <b>Kl. 1</b> (ohne Lesen/Schreiben) bzw. <b>Kl. 2</b> – je nach Kind") : "das Arbeitsblatt <b>Kl. 3/4</b>";
    punkte.push(`Drucke ${ab} – für jedes Kind eins und eins als Reserve.`);
    String(e.material || "").split("\n").map(z => z.trim()).filter(Boolean).forEach(m => punkte.push(inline(m)));
    const mats = window.sozialMaterial ? window.sozialMaterial.fuer(e) : [];
    if (mats.length) punkte.push("Arbeitsmaterial (unten auf der Stundenseite): " + mats.map(m => "„" + esc(m.titel.replace(/^Plakat:\s*/, "")) + "“").join(", ") + ".");
    if (!vertretung) punkte.push("Tafel: Stundenablauf-Karten, Gefühlsbarometer und Gesprächsregeln hängen, Redestein liegt bereit (Material unter „Rituale“).");
    if (window.sozialMedien && window.sozialMedien(e).length) punkte.push("Filmlink einmal öffnen und prüfen, ob er läuft.");
    punkte.push("Präsentation einmal starten und die Tafel testen – oder die Geschichte ausgedruckt bereitlegen.");
    punkte.push("Lies die Geschichte und die Übungen einmal selbst – dann kannst du frei erzählen statt abzulesen.");
    return `<div class="regie-vorher"><h3>✅ Vor der Stunde (ca. 10 Min Vorbereitung)</h3><ul>${punkte.map(p => `<li>${p}</li>`).join("")}</ul></div>`;
}

function ankommen(e, st, vertretung){
    const ziel = kurzZiel(st === "12" ? e.ziel12 : e.ziel34);
    if (vertretung) return { zweck: "Kurz Orientierung geben: Wer bist du, was passiert heute, welche Regeln gelten.", schritte: [
        li("Warte vorne, bis alle sitzen. Gib das Ruhezeichen (Hand hoch) und warte, bis es still ist."),
        li("Stell dich kurz vor.", sag("Hallo, ich bin heute eure Vertretung. Ich heiße … Wir machen heute zusammen etwas Schönes.")),
        li("Nenne zwei Regeln für die Stunde und zeige sie mit der Hand: melden statt reinrufen · am Platz bleiben."),
        li("Sag, was heute dran ist.", sag(`Heute geht es um „${e.titel}“. Unser Ziel: ${ziel}.`)),
    ], tipp: "Namen musst du dir nicht merken – frag beim Drankommen einfach nach dem Vornamen. Ein Sitzplan der Klasse hilft, falls vorhanden." };
    return { zweck: "Ankommen und Sicherheit durch das immer gleiche Ritual – und du siehst, wie die Gruppe heute drauf ist.", schritte: [
        li("Die Kinder setzen sich an ihren Platz. Du stehst vorne, hebst die Hand (Ruhezeichen) und wartest, bis alle still sind. Nicht reinrufen – einfach warten."),
        li("<b>Begrüßung:</b> Geh mit dem Redestein durch die Reihen. Das Kind, bei dem er liegt, steht kurz auf.",
            sag(st === "12" ? "Wer den Redestein hat, sagt: Hallo, ich bin da!" : "Wer den Redestein hat, sagt: Hallo, ich bin da – und heute freue ich mich auf …"), " Die anderen winken zurück."),
        li("<b>Gefühlsbarometer:</b> Die Kinder kommen nacheinander nach vorn und stecken ihre Klammer an.",
            sag("Wie geht es dir heute? Steck deine Klammer dahin, wo du gerade bist. Du musst nichts erklären."),
            st === "34" ? " Wer möchte, sagt einen Satz: „Ich bin heute …, weil …“" : " Kl. 1/2 zeigen nur."),
        li("<b>Thema ankündigen</b> und den Zeiger der Stundenablauf-Karten weiterschieben.", sag(`Heute geht es um „${e.titel}“. Unser Ziel: ${ziel}.`)),
    ], tipp: "Steckt ein Kind bei „traurig“ oder „wütend“: nicken und sagen „Danke, dass du es zeigst.“ Nicht vor der Gruppe nachfragen – lieber nach der Stunde kurz unter vier Augen." };
}

function lerntext(e, st){
    const lt = st === "12" ? e.lerntext12 : e.lerntext34;
    if (!lt || !lt.text) return null;
    const [geschichte, nachher12] = teilen(lt.text, "Nach dem Vorlesen");
    const [geschichte34, fragenTeil] = teilen(geschichte, "Fragen zum Gespräch");
    const fragen = fragenListe(fragenTeil || (st === "34" ? nachher12 : ""));
    const woerter = schluesselwoerter(geschichte34);
    const schritte = [
        li("Starte die Präsentation (<b>„Starten – Geschichte " + (st === "12" ? "Kl. 1/2" : "Kl. 3/4") + "“</b>) oder halte den ausgedruckten Text bereit. Schieb den Zeiger auf „Geschichte“."),
        li("Gib einen Hör-Auftrag, bevor du anfängst.", sag(st === "12" ? `Ich lese euch eine Geschichte vor: „${lt.titel}“. Hört gut zu – wie geht es den Kindern in der Geschichte?` : `Die Geschichte heißt „${lt.titel}“. Achtet darauf, was passiert und was die Personen fühlen. Danach sprechen wir darüber.`)),
        li("<b>Lies langsam und mit Pausen vor.</b>" + (woerter.length ? ` Bei den fett gedruckten Wörtern (${woerter.map(w => "„" + esc(w) + "“").join(", ")}) kurz innehalten und dein Gesicht passend machen – ${st === "12" ? "die Kinder dürfen das Gefühl mitmachen" : "schreib sie an die Tafel"}.` : "") + (st === "12" ? " Bei Kl. 1/2 darf die Vorlesestimme der Präsentation helfen." : "")),
    ];
    if (st === "12" && nachher12) schritte.push(li("<b>Nach dem Vorlesen:</b>", `<div class="regie-text"><div class="md">${md(nachher12)}</div></div>`));
    if (st === "34" && fragen.length) schritte.push(li("<b>Gespräch:</b> Stell die Fragen nacheinander. Der Redestein wandert; 2–3 Kinder pro Frage reichen.",
        `<div class="regie-text"><ol style="margin:2px 0;padding-left:18px">${fragen.map(f => `<li>${inline(f)}</li>`).join("")}</ol></div>`,
        " Die letzte (persönliche) Frage ist freiwillig."));
    if (st === "34" && !fragen.length && nachher12) schritte.push(li("<b>Nach dem Vorlesen:</b>", `<div class="regie-text"><div class="md">${md(nachher12)}</div></div>`));
    schritte.push(li("Lass ein, zwei Kinder in eigenen Worten nacherzählen – so merkst du, ob alle mitgekommen sind.", sag("Wer kann in zwei Sätzen erzählen, was in der Geschichte passiert ist?")));
    return { zweck: e.nur34 ? "Ein echter Fall aus dem Schulalltag – mit Abstand darüber reden fällt leichter als über sich selbst." : "Das Thema über eine Geschichte erleben – die Kinder fühlen mit der Figur mit, bevor sie selbst üben.", schritte,
        tipp: "Antworten nicht bewerten („Danke, das ist eine Idee.“). Stille Kinder dürfen mit dem Daumen antworten. „Ich passe“ ist erlaubt." };
}

function uebung(e, st, vertretung){
    const liste = (window.uebungenFuer ? window.uebungenFuer(e, st) : (e.uebungen || [])).filter(u => !u.fuer || u.fuer === "alle" || u.fuer === st);
    if (!liste.length) return null;
    const zus = u => !!(window.istZusatz && window.istZusatz(e, u, st));
    const mats = window.sozialMaterial ? window.sozialMaterial.fuer(e) : [];
    const schritte = [li("Schieb den Zeiger auf „Spiel & Übung“. Die Folie zeigt den Kindern, was zu tun ist – lies sie vor und erkläre in ein, zwei Sätzen. <b>Du musst nichts vormachen.</b>")];
    liste.forEach((u, i) => {
        const karten = mats.filter(m => m.uebung === u.titel || (m.auto && m.kopf === u.titel)).map(m => "„" + esc(m.titel) + "“");
        schritte.push(li(`${zus(u) ? '<span style="background:#eef1f3;color:#6b7880;border-radius:6px;padding:1px 6px;font-weight:800">Zusatz – nur wenn noch Zeit ist</span> ' : ""}<b>${esc(u.titel)}</b>${u.dauer ? ` (${esc(u.dauer)})` : ""}`,
            `<div class="regie-text"><div class="md">${md(window.stufenText ? window.stufenText(u, st) : u.text)}</div></div>`,
            karten.length ? `Material: ${karten.join(", ")} (unter Arbeitsmaterial).` : ""));
    });
    schritte.push(li("Kurz auswerten.", sag(vertretung ? "Was hat euch am meisten Spaß gemacht?" : "Wie war das für euch? Was war leicht, was war schwer?")));
    return { zweck: vertretung ? "Bewegung und gemeinsames Spiel – die Klasse kommt zusammen und hat Spaß." : "Das Thema selbst ausprobieren – erst spielen, dann darüber reden.", schritte,
        tipp: e.nur34
            ? "Bei echten Erlebnissen wird es schnell persönlich: Vorher ansagen, dass <b>keine Namen</b> von Kindern aus der Schule genannt werden („jemand aus meiner Klasse“). Wer etwas Belastendes erzählt (Gewalt, Bedrohung, Zuhause), nicht vor der Gruppe vertiefen – nach der Stunde allein ansprechen und ggf. weitergeben. Sprüche nicht wiederholen lassen, nur beschreiben („ein Spruch über die Familie“)."
            : "Alle Übungen gehen vom Platz aus. Wer nicht vorspielen möchte, darf raten oder zuschauen und später einsteigen. Fürs Drankommen hilft das Glücksrad „Wer ist dran?“ in der Präsentation." };
}

function arbeitsblatt(e, st){
    const ab = st === "12" ? e.ab12 : e.ab34;
    if (!ab) return null;
    const schritte = [
        li("Schieb den Zeiger auf „Arbeitsblatt“ und teile die Blätter aus.", sag(`Jetzt arbeitet jeder an seinem Platz: „${ab.titel}“. Wenn du Hilfe brauchst, heb die Hand – ich komme zu dir.`)),
    ];
    if (st === "12" && !(window.BEREICH && window.BEREICH.key === "vertretung")) {
        schritte.push(li("<b>Ein Blatt für alle (Kl. 1 und 2):</b> Lies jede Aufgabe vor – und bei Zeilen zum Einkreisen jede Zeile einzeln. Zeig dabei auf das Farbsymbol am Rand. Erst wenn alle eingekreist haben, liest du die nächste Zeile.",
            sag("Wir sind beim roten Kreis. Da steht: … Ist das gut? Kreise den Daumen ein."), `<ol class="regie-ab">${(ab.aufgaben || []).map(a => `<li>${a.text ? `${inline(a.text)} <i>(${TYP_NAMEN[a.typ] || a.typ})</i>` : esc(TYP_NAMEN[a.typ] || a.typ)}</li>`).join("")}</ol>`));
        schritte.push(li("Wer schneller fertig ist, malt die Bilder weiter aus. Kinder der Kl. 2 dürfen zu ihrem Bild ein Wort dazuschreiben."));
    } else if (st === "12") {
        const k1 = abAufgaben(ab, "1");
        schritte.push(li("<b>Kinder der Kl. 1 (Blatt ohne Lesen):</b> Lies jede Aufgabe gemeinsam vor und zeig auf das Farbsymbol am Rand.",
            sag("Wir sind beim roten Kreis. Da steht: …"), `<ol class="regie-ab">${k1.map(a => `<li>${a.text ? `${inline(a.text)} <i>(${TYP_NAMEN[a.typ] || a.typ})</i>` : esc(TYP_NAMEN[a.typ] || a.typ)}</li>`).join("")}</ol>`));
        schritte.push(li("<b>Kinder der Kl. 2:</b> Aufgaben gemeinsam lesen, dann allein arbeiten. Schreibaufgaben gibt es nur auf ihrem Blatt."));
    } else {
        schritte.push(li("Lest die Aufgaben einmal gemeinsam, dann arbeitet jeder allein.", `<ol class="regie-ab">${abAufgaben(ab, "34").map(a => `<li>${a.text ? `${inline(a.text)} <i>(${TYP_NAMEN[a.typ] || a.typ})</i>` : esc(TYP_NAMEN[a.typ] || a.typ)}</li>`).join("")}</ol>`));
    }
    schritte.push(li("Geh herum, lobe konkret („Du hast drei Ideen gefunden!“) und frag bei Unklarheiten nach, statt zu verbessern."));
    schritte.push(li("Wer früher fertig ist, gestaltet das Malfeld aus oder malt auf der Rückseite ein Bild zum Thema."));
    return { zweck: "Jedes Kind sichert für sich, was es gelernt hat – in seinem Tempo.", schritte,
        tipp: "Rechtschreibung nicht korrigieren – hier geht es um die Inhalte. Kinder, die nicht schreiben können, dürfen malen oder dir diktieren." };
}

function abschluss(e, st, vertretung){
    const ziel = kurzZiel(st === "12" ? e.ziel12 : e.ziel34);
    if (vertretung) return { zweck: "Ein guter Schluss: Ergebnisse würdigen, Ordnung herstellen.", schritte: [
        li("Ruhezeichen. Stifte weg."),
        li("2–3 Kinder zeigen ihr Arbeitsblatt oder erzählen kurz.", sag("Wer möchte zeigen, was er gemacht hat?")),
        li("<b>Applauswelle:</b> Zeig nacheinander auf jeden Platz, jedes Kind klatscht einmal – zum Schluss klatschen alle zusammen."),
        li("Plätze aufräumen, Blätter einsammeln oder in die Mappe."),
        li("Verabschieden.", sag("Danke, das war eine schöne Stunde mit euch!")),
    ], tipp: "Lege der Klassenlehrkraft einen Zettel hin: was ihr gemacht habt und ob etwas Besonderes war." };
    return { zweck: "Das Gelernte bündeln und die Stunde positiv beenden – die Kinder gehen mit einem guten Gefühl.", schritte: [
        li("Ruhezeichen, Stifte weg. Zeiger auf „Abschluss“."),
        st === "12"
            ? li("<b>Abschlussrunde:</b> Jedes Kind hält eine Gesichter-Karte hoch (super – geht so – schwierig).", sag("Wie hat dir die Stunde heute gefallen? Zeig es mit deiner Karte."))
            : li("<b>Abschlussrunde:</b> Der Redestein wandert, jedes Kind beendet einen Satz (Satzstreifen ziehen lassen).", sag("Heute habe ich gelernt …")),
        li("Fasse zusammen, was ihr geübt habt.", sag(`Das haben wir heute geübt: ${ziel}. Das könnt ihr ab jetzt auch in der Pause ausprobieren!`)),
        li("<b>Applauswelle:</b> Zeig nacheinander auf jeden Platz, jedes Kind klatscht einmal – zum Schluss klatschen alle zusammen."),
        li("Wenn die Gesprächsregeln gut geklappt haben: eine Murmel ins Glas (oder auf dem Plakat ausmalen).", sag("Ihr habt heute toll zugehört – dafür gibt es eine Murmel!")),
    ], tipp: "Endet die Stunde unruhig, lieber kürzer: nur Daumenrunde und Applaus. Das Ritual ist wichtiger als die Vollständigkeit." };
}

function nachher(vertretung){
    const fragen = vertretung
        ? ["Was hat gut geklappt, was würdest du beim nächsten Mal anders machen?", "Gab es etwas, das die Klassenlehrkraft wissen sollte?"]
        : ["Wer war heute still oder zurückgezogen? Wer hat sich etwas getraut?", "Gab es Streit oder besondere Momente? Wie wurde damit umgegangen?", "Was muss in der nächsten Stunde wieder aufgegriffen werden?"];
    return `<div class="regie-nachher"><h3 style="margin:0 0 4px">📝 Nach der Stunde (2 Min für dich)</h3><ul>${fragen.map(f => `<li>${f}</li>`).join("")}</ul></div>`;
}

/* ---------- Zusammenbauen ---------- */
function bauen(e, st){
    cssLaden();
    st = st === "34" ? "34" : "12";
    const vertretung = window.BEREICH && window.BEREICH.key === "vertretung";
    const bau = { ankommen, lerntext, uebung, ab: arbeitsblatt, abschluss };
    const phasen = (e.verlauf || []).map(v => {
        const typ = phasenTyp(v.phase);
        let p = bau[typ] ? bau[typ](e, st, vertretung) : null;
        if (!p) p = { zweck: "", schritte: [li(inline(st === "12" ? v.k12 : v.k34) || "–")], tipp: "" };
        return `<div class="regie-phase"><div class="regie-zeit"><b>${esc(v.zeit)}</b><span>Min · ${esc(v.phase)}</span></div>
            <div>${p.zweck ? `<p class="regie-zweck">${p.zweck}</p>` : ""}<ol class="regie-schritte">${p.schritte.join("")}</ol>${p.tipp ? tipp(p.tipp) : ""}</div></div>`;
    }).join("");
    return `<div class="regie">${vorher(e, st, vertretung)}${phasen}${nachher(vertretung)}</div>`;
}

window.sozialRegie = { bauen, cssLaden };
})();
