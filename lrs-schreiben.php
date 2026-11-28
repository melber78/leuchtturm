<?php $LT_GAST_BEREICH = "lrs"; require __DIR__ . "/gast-zugang.php";
/* ============================================================
   Leuchtturm – Schreiben & Vorlagen für die LRS-Förderung
   Empfehlung Nachteilsausgleich, Einladung, Rückmeldung,
   Übungstipps für zu Hause, Elterninfo zum Start.
   Namen werden nur für den Druck eingetragen und nie gespeichert.
   ============================================================ */
function swJson($d){ if (!is_file($d)) return []; $j = json_decode((string)file_get_contents($d), true); return is_array($j) ? $j : []; }
$akten = swJson(lt_daten("akten.json"));
$kinder = [];
foreach (swJson(lt_daten("kinder.json")) as $k) { $c = (string)($k["code"] ?? ""); if ($c === "") continue; $a = $akten[$c] ?? [];
    $kinder[] = ["code" => $c, "klasse" => (string)($a["klasse"] ?? ""), "f" => $a["plan"]["f"] ?? [], "r" => $a["plan"]["r"] ?? [], "l" => $a["plan"]["l"] ?? []]; }
?><!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#2f4a1f">
<title>Schreiben & Vorlagen · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link rel="stylesheet" href="marke/mewe.css">
<script src="marke/stimme.js"></script>
<style>
@font-face{ font-family:"Fraunces"; font-weight:600; src:url("schriften/fraunces-600.woff2") format("woff2"); }
@font-face{ font-family:"Fraunces"; font-weight:700; src:url("schriften/fraunces-700.woff2") format("woff2"); }
:root{ --nacht:#2f4a1f; --moos:#557428; --salbeih:#edf2e3; --creme:#f8f4ec; --ink:#2d3530; --gold:#d9a23f; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:Nunito, sans-serif; background:var(--creme); color:var(--ink); }
.kopf{ background:var(--salbeih) url("marke/mewe-blatt-dezent.png") no-repeat right -10px center / auto 120%; padding:14px 18px 16px; }
.kopf-zeile{ max-width:1200px; margin:0 auto; display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
.kopf a{ color:var(--nacht); font-weight:800; text-decoration:none; }
.kopf h1{ font-family:Fraunces, Georgia, serif; color:var(--nacht); margin:0; font-size:clamp(24px, 5vw, 32px); }
main{ max-width:1200px; margin:0 auto; padding:18px; display:grid; grid-template-columns:minmax(300px, 420px) 1fr; gap:20px; align-items:start; }
@media (max-width:900px){ main{ grid-template-columns:1fr; } }
.karte{ background:#fff; border-radius:22px; padding:18px; box-shadow:0 4px 18px rgba(47,74,31,.07); }
.vorlagen{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px; }
.vorlagen button{ border:2px solid #dfe6d4; background:#fff; border-radius:999px; padding:8px 14px; font:inherit; font-weight:800; font-size:14px; cursor:pointer; color:var(--ink); }
.vorlagen button.an{ background:var(--moos); border-color:var(--moos); color:#fff; }
label{ display:block; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.4px; color:#7c8a94; margin:12px 0 4px; }
input[type=text], input[type=date], input[type=time], select, textarea{ width:100%; border:2px solid #ececec; border-radius:12px; padding:9px 12px; font:inherit; font-size:14.5px; font-weight:700; color:var(--ink); background:#fff; }
textarea{ min-height:80px; font-weight:600; }
.haken{ display:flex; gap:8px; align-items:flex-start; font-weight:700; font-size:14px; margin:6px 0; text-transform:none; letter-spacing:0; color:var(--ink); }
.haken input{ margin-top:3px; width:18px; height:18px; flex:0 0 auto; }
.gruppe{ border-top:1px solid #eef1e8; padding-top:6px; margin-top:10px; } .gruppe > b{ display:block; color:var(--nacht); font-size:14px; margin:6px 0 2px; }
.knopf{ border:0; border-radius:999px; padding:11px 22px; font:inherit; font-weight:900; background:var(--nacht); color:#fff; cursor:pointer; margin-top:14px; }
.hinweis{ background:#fff8e6; border:2px solid #f0dfb8; border-radius:14px; padding:10px 14px; font-size:13.5px; font-weight:700; color:#6b5427; margin-top:12px; }
.vorschau{ position:sticky; top:12px; overflow:hidden; }
.vorschau-rahmen{ width:100%; overflow:hidden; }
#blatt{ width:210mm; min-height:297mm; background:#fff; box-shadow:0 8px 30px rgba(0,0,0,.12); transform-origin:0 0; padding:16mm 18mm 18mm; position:relative; font-size:11.5pt; line-height:1.5; color:#2d3530; }
#blatt .b-kopf{ display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2.5px solid #557428; padding-bottom:8px; margin-bottom:16px; }
#blatt .b-kopf img{ height:46px; } #blatt .b-abs{ font-size:9pt; color:#56664a; line-height:1.35; }
#blatt h2{ font-family:Fraunces, Georgia, serif; color:#2f4a1f; font-size:19pt; margin:6px 0 10px; }
#blatt h3{ font-family:Fraunces, Georgia, serif; color:#2f4a1f; font-size:12.5pt; margin:14px 0 4px; padding:2px 10px; background:#edf2e3; border-radius:6px; }
#blatt .zeile{ display:grid; grid-template-columns:1fr 1fr; gap:2px 20px; font-size:10.5pt; }
#blatt ul{ margin:4px 0; padding-left:20px; } #blatt li{ margin:2px 0; }
#blatt .box{ border:1.5px solid #c9d4b8; border-radius:10px; padding:8px 12px; margin:8px 0; }
#blatt .unter{ display:grid; grid-template-columns:1fr 1fr; gap:36px; margin-top:34px; font-size:9pt; } #blatt .unter div{ border-top:1px solid #2d3530; padding-top:4px; }
#blatt .fuss{ position:absolute; left:18mm; right:18mm; bottom:9mm; font-size:8pt; color:#7c8a72; border-top:1px solid #dfe6d4; padding-top:4px; display:flex; justify-content:space-between; }
#blatt .abschnitt{ border-top:1.5px dashed #9aa98a; margin-top:18px; padding-top:10px; font-size:10.5pt; }
#blatt .ank{ display:inline-block; width:11px; height:11px; border:1.3px solid #2d3530; border-radius:2px; margin-right:6px; vertical-align:-1px; }
@media print{
    body{ background:#fff; } .kopf, .steuer, .vorschau > h2{ display:none !important; }
    main{ display:block; padding:0; } .vorschau{ position:static; box-shadow:none; padding:0; border-radius:0; } .vorschau-rahmen{ height:auto !important; overflow:visible; }
    #blatt{ transform:none !important; box-shadow:none; } @page{ size:A4; margin:0; }
}
</style>
</head>
<body>
<header class="kopf"><div class="kopf-zeile"><a href="<?= $LT_GAST ? "gast.php" : "index.php" ?>"><i class="fa-solid fa-arrow-left"></i> Leuchtturm</a><h1>Schreiben & Vorlagen</h1></div></header>
<main>
    <div class="karte steuer">
        <div class="vorlagen" id="vorlagen"></div>
        <label>Kind (Kürzel aus der Akte)</label>
        <select id="kind"><option value="">– ohne Akte –</option></select>
        <label>Name des Kindes (nur für den Druck, wird nicht gespeichert)</label>
        <input type="text" id="name" autocomplete="off">
        <label>Klasse</label><input type="text" id="klasse">
        <div id="felder"></div>
        <button class="knopf" onclick="window.print()"><i class="fa-solid fa-print"></i> Drucken / als PDF</button>
    </div>
    <div class="karte vorschau"><h2 style="font-family:Fraunces,Georgia,serif;color:var(--nacht);margin:0 0 10px;font-size:19px">Vorschau</h2><div class="vorschau-rahmen" id="rahmen"><div id="blatt"></div></div></div>
</main>
<script>
const KINDER = <?= json_encode($kinder, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) ?>;
const $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const nl = t => esc(t).replace(/\n/g, "<br>");
const datum = d => d ? d.split("-").reverse().join(".") : "";
const ICH = "Melanie Bernshausen", TITEL = "Diplomierte Legasthenietrainerin & Mediendidaktikerin (EÖDL)", SCHULE = "CJD Christophorusschule Weißenfels";
const heute = new Date().toISOString().slice(0, 10);
const schuljahr = (() => { const d = new Date(), j = d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1; return `${j}/${String(j + 1).slice(2)}`; })();

const SP = { schaerfung: "doppelte Mitlaute (Schärfung)", cktz: "ck und tz", dehnung: "Dehnungs-h", ie: "langes i (ie)", sss: "s, ss oder ß", auslaut: "Wortende b/p, d/t, g/k (Verlängern)", aeau: "ä/äu oder e/eu (Ableiten)", dasdass: "das oder dass", grossklein: "Groß- und Kleinschreibung", vf: "v oder f", doppelvokal: "aa, ee, oo", iglich: "-ig und -lich", spst: "sp und st", silbenh: "silbentrennendes h", chsx: "chs, x, ks",
    aufmerksamkeit: "Aufmerksamkeit und Konzentration", optdiff: "genaues Hinsehen (optische Differenzierung)", optged: "Merken von Wortbildern (optisches Gedächtnis)", optser: "Reihenfolgen sehen (optische Serialität)", akdiff: "genaues Hinhören (akustische Differenzierung)", akged: "Merken von Gehörtem (akustisches Gedächtnis)", akser: "Laut-Reihenfolgen hören (akustische Serialität)", koerper: "Körperschema / rechts-links", raum: "Raumlage (z. B. b/d)",
    buchstaben: "Buchstaben und Laute", silben: "Silben lesen", woerter: "Wörter lesen", saetze: "Sätze lesen", texte: "Texte lesen" };
// Übungstipps für zu Hause – ohne Technik, 10 Minuten
const TIPPS = {
    aufmerksamkeit: ["Feste kurze Übungszeit (10 Minuten), ohne Handy und Fernseher im Raum.", "Spiele wie „Ich sehe was, was du nicht siehst“, Memory oder Mikado."],
    optdiff: ["„Finde den Unterschied“-Bilder, Suchbilder in Zeitschriften.", "Buchstaben in der Zeitung einkreisen lassen (z. B. alle b in Blau, alle d in Rot)."],
    optged: ["Wort kurz zeigen, abdecken, aufschreiben lassen, vergleichen.", "Kim-Spiel: 6 Gegenstände ansehen, einer verschwindet – welcher?"],
    optser: ["Muster mit Perlen oder Steckern nachlegen.", "Buchstabensalat: Wort aus Buchstabenkärtchen legen."],
    akdiff: ["Reimwörter finden („Haus – Maus – …“).", "„Hörst du ein d oder ein t?“ – Wörter deutlich vorsprechen."],
    akged: ["„Ich packe meinen Koffer“ spielen.", "Einkaufsliste merken: 3–5 Dinge sagen, das Kind wiederholt."],
    akser: ["Wörter in Silben klatschen und mitsprechen.", "Laute eines Wortes nacheinander sagen: M-a-u-s."],
    koerper: ["Spiele mit „rechte Hand auf linkes Knie“.", "Wege beschreiben lassen: rechts, links, geradeaus."],
    raum: ["b, d, p, q mit dem Finger groß in die Luft oder auf den Rücken schreiben.", "Merkhilfe: Erst der Bauch, dann der Strich – „d“ wie „dick“."],
    buchstaben: ["Jeden Tag 3 Buchstaben wiederholen: Laut sagen, in die Luft schreiben.", "Dinge in der Wohnung suchen, die mit dem Laut anfangen."],
    silben: ["Silbenkärtchen (Ma, Mo, Mi …) laut lesen, dann zu Wörtern legen.", "Beim Lesen die Silben mit dem Finger schwingen."],
    woerter: ["Täglich 5 Minuten laut vorlesen lassen – kurze Wörter, dann Sätze.", "Abwechselnd lesen: ein Satz das Kind, ein Satz Sie."],
    saetze: ["Kurze Sätze lesen und dazu malen lassen.", "Satzanfänge vorlesen, das Kind liest weiter."],
    texte: ["Lieblingsbuch gemeinsam lesen – abwechselnd seitenweise.", "Nach dem Lesen 2 Fragen stellen: Wer? Was ist passiert?"],
    schaerfung: ["Wörter in Silben schwingen: Son-ne. Klingt der Selbstlaut kurz? Dann kommen zwei Mitlaute.", "Wörterpaare sortieren: Hüte/Hütte, Ofen/offen."],
    cktz: ["Merksatz: „Nach l, n, r – das merke ja – steht nie tz und nie ck.“", "Wörter mit ck und tz sammeln und in Silben trennen: Ja-cke, Kat-ze."],
    dehnung: ["Dehnungs-h-Wörter sind Merkwörter – auf Kärtchen schreiben und täglich 3 üben.", "Wortfamilien bilden: fahren – Fahrt – Fahrrad."],
    ie: ["Langes i hören: Lie-be (lang) – Kis-te (kurz).", "ie-Wörter mit Farbe markieren."],
    sss: ["Erst Vokal hören: kurz → ss (Fluss), lang → ß (Fuß).", "Wörter verlängern: Gras – Gräser, Fuß – Füße."],
    auslaut: ["Verlängern: Hund → Hunde, Berg → Berge – dann hört man den richtigen Laut.", "Beim Schreiben immer fragen: Wie heißt das Wort in der Mehrzahl?"],
    aeau: ["Ableiten: Bäume → Baum, Räder → Rad.", "Gibt es kein verwandtes Wort mit a/au, schreibt man e/eu."],
    dasdass: ["Ersatzprobe: Passt „dieses“ oder „welches“? Dann „das“, sonst „dass“.", "Sätze mit dass sammeln: „Ich hoffe, dass …“"],
    grossklein: ["Artikelprobe: Kann man der/die/das davorsetzen? Dann groß.", "In kurzen Texten alle Nomen farbig markieren."],
    vf: ["Merkwörter mit v sammeln: Vater, Vogel, viel, vier, von, vor, ver-.", "Wortbausteine ver- und vor- üben: verlaufen, vorlesen."],
    doppelvokal: ["Merkwörter mit aa, ee, oo auf Kärtchen: Boot, Meer, Haar.", "Wortbilder einprägen: ansehen – abdecken – schreiben – vergleichen."],
    iglich: ["Verlängern: lustig → lustiger. Dann hört man -ig oder -lich.", "Wörter sortieren: -ig oder -lich."],
    spst: ["Man hört „schp“ und „scht“, schreibt aber sp und st.", "Wörter sammeln: Spiel, Sport, Stein, Stuhl."],
    silbenh: ["Verlängern: Schuh → Schu-he, geht → ge-hen.", "Wörter in Silben schwingen und das h zeigen."],
    chsx: ["Merkwörter: Fuchs, wachsen, Hexe, Taxi, Keks.", "Wortbild einprägen und dreimal schreiben."],
};
const VORLAGEN = {
    nta: { titel: "Empfehlung Nachteilsausgleich", felder: () => `
        <label>An</label><input type="text" id="an" value="Klassenlehrkraft / Klassenkonferenz">
        <label>Schuljahr</label><input type="text" id="sj" value="${schuljahr}">
        <label>Grundlage</label><select id="grund"><option>Pädagogisches Gutachten / AFS-Testverfahren (EÖDL)</option><option>Beobachtungen in der LRS-Förderung</option><option>Fachärztliche bzw. schulpsychologische Diagnostik</option></select>
        <label>Fächer</label><input type="text" id="faecher" value="Deutsch und alle Fächer mit schriftlichen Leistungen">
        ${NTA.map((g, gi) => `<div class="gruppe"><b>${esc(g[0])}</b>${g[1].map((x, i) => `<label class="haken"><input type="checkbox" data-nta="${gi}-${i}"${x[1] ? " checked" : ""}> ${esc(x[0])}</label>`).join("")}</div>`).join("")}
        <label>Ergänzungen</label><textarea id="erg"></textarea>
        <label>Überprüfung empfohlen bis</label><input type="date" id="bis">
        <div class="hinweis">Die Entscheidung trifft die Klassenkonferenz. Ein Nachteilsausgleich wird dokumentiert, regelmäßig überprüft und nicht im Zeugnis vermerkt (Handreichung Nachteilsausgleich, Landesschulamt Sachsen-Anhalt).</div>` },
    einladung: { titel: "Einladung zum Gespräch", felder: () => `
        <label>Anrede</label><input type="text" id="anrede" value="Liebe Eltern">
        <label>Anlass</label><select id="anlass"><option>ein Kennenlerngespräch zum Start der LRS-Förderung</option><option>ein Gespräch über die bisherige Förderung</option><option>ein Gespräch über die Ergebnisse der Testung</option><option>ein Gespräch zum Halbjahr</option><option>ein Gespräch zum Förderplan</option></select>
        <label>Datum</label><input type="date" id="tag"><label>Uhrzeit</label><input type="time" id="zeit" value="14:00">
        <label>Ort</label><input type="text" id="ort" value="${SCHULE}, Förderraum">
        <label>Bitte mitbringen (optional)</label><input type="text" id="mit" placeholder="z. B. Hefte, Zeugnis, Befunde">
        <label>Rückmeldung bis</label><input type="date" id="rueck">` },
    rueckmeldung: { titel: "Rückmeldung an die Eltern", felder: () => `
        <label>Anrede</label><input type="text" id="anrede" value="Liebe Eltern">
        <label>Zeitraum</label><input type="text" id="zeitraum" placeholder="z. B. seit den Herbstferien">
        <label>Woran wir arbeiten</label><div id="sp-wahl"></div>
        <label>Was schon gut klappt</label><textarea id="gut" placeholder="z. B. liest kurze Wörter schon viel flüssiger"></textarea>
        <label>Woran wir noch üben</label><textarea id="noch"></textarea>
        <label>Wie Sie zu Hause helfen können</label><textarea id="hilfe">Bitte üben Sie an 4–5 Tagen pro Woche ca. 10 Minuten – lieber kurz und regelmäßig als selten und lang. Loben Sie jeden kleinen Fortschritt.</textarea>` },
    tipps: { titel: "Übungstipps für zu Hause", felder: () => `
        <label>Anrede</label><input type="text" id="anrede" value="Liebe Eltern">
        <label>Schwerpunkte (aus der Akte vorausgewählt)</label><div id="sp-wahl"></div>
        <label class="haken"><input type="checkbox" id="plan" checked> Wochenplan zum Abhaken mitdrucken</label>` },
    start: { titel: "Elterninfo zum Start", felder: () => `
        <label>Anrede</label><input type="text" id="anrede" value="Liebe Eltern">
        <label>Förderzeit</label><input type="text" id="wann" placeholder="z. B. dienstags, 3. Stunde">
        <label>Erreichbarkeit</label><input type="text" id="kontakt" placeholder="z. B. über das Sekretariat oder die Klassenlehrkraft">
        <label class="haken"><input type="checkbox" id="abschnitt" checked> Rückmeldeabschnitt mitdrucken</label>` },
};
const NTA = [
    ["Mehr Zeit und Umfang", [["Verlängerte Bearbeitungszeit bei schriftlichen Arbeiten", true], ["Weniger Aufgaben bei gleichem Anspruch", false], ["Arbeiten in Etappen bzw. individuelle Pausen", false]]],
    ["Hilfen bei Aufgabenstellung und Material", [["Aufgabenstellungen vorlesen", true], ["Langsameres Diktieren, deutliches Vor- und Nachsprechen", true], ["Vergrößerte, klar gegliederte Texte (größere Schrift, 1,5-zeilig, Zeilennummern)", true], ["Silbenbögen bei langen Wörtern", false], ["Schriftliche Vorlage statt Abschreiben von der Tafel", true]]],
    ["Veränderte Form der Leistungsfeststellung", [["Mündliche statt schriftlicher Leistung, wo die Rechtschreibung nicht bewertet wird", false], ["Arbeiten im Einzelsetting oder in kleiner Gruppe, ruhiger Raum", false], ["Unleserliches darf erläutert werden", true]]],
    ["Technische Hilfsmittel", [["Computer bzw. Tablet mit Rechtschreibhilfe", false], ["Vorlesefunktion oder digitale Texte", false], ["Wörterbuch mit Register", false]]],
    ["Bewertung", [["Rechtschreibfehler außerhalb des Deutschunterrichts nicht in die Fachnote einbeziehen", true], ["In Deutsch: Inhalt und Ausdruck getrennt von der Rechtschreibung würdigen (soweit zulässig)", false]]],
];
let vorlage = "nta";
$("#vorlagen").innerHTML = Object.entries(VORLAGEN).map(([k, v]) => `<button data-v="${k}">${esc(v.titel)}</button>`).join("");
$("#vorlagen").onclick = e => { const b = e.target.closest("[data-v]"); if (b){ vorlage = b.dataset.v; felderZeigen(); } };
KINDER.forEach(k => $("#kind").insertAdjacentHTML("beforeend", `<option value="${esc(k.code)}">${esc(k.code)}${k.klasse ? " · Kl. " + esc(k.klasse) : ""}</option>`));
$("#kind").onchange = () => { const k = kind(); if (k?.klasse) $("#klasse").value = k.klasse; felderZeigen(); };
const kind = () => KINDER.find(k => k.code === $("#kind").value);
function spWahl(){
    const el = $("#sp-wahl"); if (!el) return;
    const k = kind(), gew = k ? [...k.f, ...k.l, ...k.r] : [];
    const keys = [...gew, ...Object.keys(TIPPS).filter(x => !gew.includes(x))];
    el.innerHTML = `<div style="max-height:260px;overflow:auto;border:2px solid #ececec;border-radius:12px;padding:6px 10px">${keys.map(x => `<label class="haken"><input type="checkbox" data-sp="${x}"${gew.includes(x) ? " checked" : ""}> ${esc(SP[x] || x)}</label>`).join("")}</div>`;
}
function felderZeigen(){
    document.querySelectorAll("#vorlagen button").forEach(b => b.classList.toggle("an", b.dataset.v === vorlage));
    $("#felder").innerHTML = VORLAGEN[vorlage].felder();
    spWahl(); zeichnen();
}
const v = id => $(id) ? $(id).value : "";
const an = id => $(id) ? $(id).checked : false;
const gewaehlt = () => [...document.querySelectorAll("[data-sp]:checked")].map(c => c.dataset.sp);
const kindName = () => v("#name").trim() || "Ihr Kind";
function kopf(titel){ return `<div class="b-kopf"><div class="b-abs"><b>${ICH}</b><br>${TITEL}<br>LRS-Förderung · ${SCHULE}</div><img src="marke/mewe-leuchtturm.svg" alt=""></div><div style="text-align:right;font-size:10pt">Weißenfels, ${datum(heute)}</div><h2>${titel}</h2>`; }
const fuss = () => `<div class="fuss"><span>${ICH} · ${TITEL}</span><span>${SCHULE}</span></div>`;
const gruss = () => `<p style="margin-top:18px">Herzliche Grüße<br><br><b>${ICH}</b><br><span style="font-size:10pt">${TITEL}</span></p>`;
function zeichnen(){
    const b = $("#blatt"), nm = esc(v("#name").trim()), kl = esc(v("#klasse").trim());
    let h = "";
    if (vorlage === "nta"){
        const pkt = NTA.map((g, gi) => [g[0], g[1].filter((x, i) => an(`[data-nta="${gi}-${i}"]`)).map(x => x[0])]).filter(g => g[1].length);
        h = kopf("Empfehlung zum Nachteilsausgleich") + `<div class="zeile"><div>An: <b>${esc(v("#an"))}</b></div><div>Schuljahr: <b>${esc(v("#sj"))}</b></div><div>Schüler/in: <b>${nm || "____________________"}</b></div><div>Klasse: <b>${kl || "____"}</b></div></div>
            <p>Aufgrund der festgestellten besonderen Schwierigkeiten im Lesen und Rechtschreiben (Grundlage: ${esc(v("#grund"))}) empfehle ich für <b>${esc(v("#faecher"))}</b> folgende Maßnahmen des Nachteilsausgleichs:</p>
            ${pkt.map(g => `<h3>${esc(g[0])}</h3><ul>${g[1].map(x => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}
            ${v("#erg").trim() ? `<h3>Ergänzungen</h3><p>${nl(v("#erg"))}</p>` : ""}
            <div class="box" style="font-size:10pt">Die Maßnahmen gleichen die Beeinträchtigung aus, ohne die fachlichen Anforderungen zu senken. Über die Gewährung entscheidet die Klassenkonferenz. Ich empfehle, die Maßnahmen zu dokumentieren und ${v("#bis") ? `bis zum <b>${datum(v("#bis"))}</b>` : "regelmäßig"} zu überprüfen. Für Rückfragen stehe ich gern zur Verfügung.</div>
            <div class="unter"><div>Datum, ${ICH} (Legasthenietrainerin)</div><div>Kenntnisnahme Klassenlehrkraft</div></div>`;
    }
    if (vorlage === "einladung"){
        h = kopf("Einladung zum Gespräch") + `<p>${esc(v("#anrede"))},</p>
            <p>ich möchte Sie herzlich zu ${esc(v("#anlass"))} über <b>${nm || "Ihr Kind"}</b>${kl ? ` (Klasse ${kl})` : ""} einladen. Mir ist ein persönliches Gespräch wichtig, damit wir gemeinsam überlegen können, wie wir Ihr Kind am besten unterstützen.</p>
            <div class="box"><b>Termin:</b> ${datum(v("#tag")) || "________________"}, ${esc(v("#zeit"))} Uhr<br><b>Ort:</b> ${esc(v("#ort"))}${v("#mit").trim() ? `<br><b>Bitte mitbringen:</b> ${esc(v("#mit"))}` : ""}</div>
            <p>Das Gespräch dauert etwa 30 Minuten. Falls der Termin nicht passt, finden wir gern einen anderen.</p>${gruss()}
            <div class="abschnitt"><b>Rückmeldung</b>${v("#rueck") ? ` – bitte bis ${datum(v("#rueck"))} zurückgeben` : ""}<br><br>Name des Kindes: ________________________ Klasse: ______<br><br>
            <span class="ank"></span>Wir kommen gern zum Termin am ${datum(v("#tag")) || "__________"}.<br><span class="ank"></span>Der Termin passt leider nicht. Möglich wäre: ___________________________________<br><br>Unterschrift: ______________________________</div>`;
    }
    if (vorlage === "rueckmeldung"){
        const sp = gewaehlt();
        h = kopf("Rückmeldung zur LRS-Förderung") + `<div class="zeile"><div>Kind: <b>${nm || "____________________"}</b></div><div>Klasse: <b>${kl || "____"}</b></div></div>
            <p>${esc(v("#anrede"))},</p><p>gern gebe ich Ihnen eine kurze Rückmeldung, wie die Förderung ${v("#zeitraum").trim() ? esc(v("#zeitraum")) + " " : ""}läuft.</p>
            ${sp.length ? `<h3>Woran wir arbeiten</h3><ul>${sp.map(x => `<li>${esc(SP[x] || x)}</li>`).join("")}</ul>` : ""}
            ${v("#gut").trim() ? `<h3>Was schon gut klappt</h3><p>${nl(v("#gut"))}</p>` : ""}
            ${v("#noch").trim() ? `<h3>Woran wir noch üben</h3><p>${nl(v("#noch"))}</p>` : ""}
            ${v("#hilfe").trim() ? `<h3>Wie Sie zu Hause helfen können</h3><p>${nl(v("#hilfe"))}</p>` : ""}
            <p>Bei Fragen melden Sie sich gern – am liebsten besprechen wir das persönlich.</p>${gruss()}`;
    }
    if (vorlage === "tipps"){
        const sp = gewaehlt().filter(x => TIPPS[x]);
        h = kopf("Übungstipps für zu Hause") + `<p>${esc(v("#anrede"))},</p><p>hier finden Sie kleine Übungen, die zu dem passen, was wir gerade in der Förderung üben${nm ? ` (${nm})` : ""}. Sie brauchen dafür nur Papier, Stift und 10 Minuten – am besten an 4–5 Tagen pro Woche. Wichtig: in Ruhe, ohne Druck und mit viel Lob.</p>
            ${sp.slice(0, 6).map(x => `<h3>${esc(SP[x] || x)}</h3><ul>${TIPPS[x].map(t => `<li>${esc(t)}</li>`).join("")}</ul>`).join("") || "<p><i>Bitte links Schwerpunkte auswählen.</i></p>"}
            ${an("#plan") ? `<h3>Unser Übungsplan</h3><table style="width:100%;border-collapse:collapse;font-size:10pt"><tr>${["Woche", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map(t => `<th style="border:1px solid #c9d4b8;padding:4px">${t}</th>`).join("")}</tr>
                ${[1, 2, 3, 4].map(w => `<tr><td style="border:1px solid #c9d4b8;padding:8px 4px;text-align:center">${w}</td>${"<td style='border:1px solid #c9d4b8'></td>".repeat(7)}</tr>`).join("")}</table><p style="font-size:9.5pt;color:#56664a">Für jeden Übungstag darf Ihr Kind einen Haken oder Sticker machen.</p>` : ""}
            ${gruss()}`;
    }
    if (vorlage === "start"){
        h = kopf("Ihr Kind in der LRS-Förderung") + `<p>${esc(v("#anrede"))},</p>
            <p>${nm || "Ihr Kind"}${kl ? ` (Klasse ${kl})` : ""} nimmt ab sofort an der Förderung im Lesen und Rechtschreiben teil. Ich bin ${ICH}, ${TITEL}, und begleite Ihr Kind dabei an der ${SCHULE}.</p>
            <h3>Wie wir arbeiten</h3><p>Ich arbeite nach der <b>AFS-Methode</b> (EÖDL). Jede Stunde hat drei Teile:</p>
            <ul><li><b>Aufmerksamkeit:</b> Wir üben, sich gezielt auf eine Aufgabe zu konzentrieren.</li><li><b>Funktion:</b> Wir trainieren Sinneswahrnehmungen, die man zum Lesen und Schreiben braucht – genau hinsehen, hinhören, Reihenfolgen merken.</li><li><b>Symptom:</b> Wir üben gezielt die Fehlerschwerpunkte beim Lesen und Rechtschreiben.</li></ul>
            <h3>Ablauf</h3><ul><li>Zu Beginn schaue ich mir genau an, wo Ihr Kind steht, und erstelle einen Förderplan.</li><li>Die Förderstunden dauern 40 Minuten${v("#wann").trim() ? ` (${esc(v("#wann"))})` : ""}.</li><li>Etwa alle 6–8 Wochen überprüfe ich die Fortschritte und gebe Ihnen Rückmeldung.</li></ul>
            <h3>Was Sie tun können</h3><ul><li>Kurz und regelmäßig üben: 10 Minuten an 4–5 Tagen pro Woche.</li><li>Gemeinsam lesen und vorlesen – das Lesen soll Freude machen.</li><li>Fehler nicht schimpfen, sondern Fortschritte loben.</li></ul>
            ${v("#kontakt").trim() ? `<p><b>So erreichen Sie mich:</b> ${esc(v("#kontakt"))}</p>` : ""}${gruss()}
            ${an("#abschnitt") ? `<div class="abschnitt"><b>Bitte zurückgeben</b><br><br>Name des Kindes: ________________________ Klasse: ______<br><span class="ank"></span>Wir haben die Information zur LRS-Förderung erhalten.<br><span class="ank"></span>Wir wünschen uns ein persönliches Gespräch.<br><br>Datum, Unterschrift: ______________________________</div>` : ""}`;
    }
    b.innerHTML = h + fuss();
    skalieren();
}
function skalieren(){ const r = $("#rahmen"), b = $("#blatt"), f = Math.min(1, r.clientWidth / b.offsetWidth); b.style.transform = `scale(${f})`; r.style.height = b.offsetHeight * f + "px"; }
window.addEventListener("resize", skalieren);
document.querySelector(".steuer").addEventListener("input", zeichnen);
document.querySelector(".steuer").addEventListener("change", zeichnen);
const h = location.hash.slice(1); if (VORLAGEN[h]) vorlage = h;
felderZeigen();
</script>
</body>
</html>
