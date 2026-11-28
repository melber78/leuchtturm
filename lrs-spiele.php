<?php $LT_GAST_BEREICH = "lrs"; require __DIR__ . "/gast-zugang.php";
/* ============================================================
   Leuchtturm – LRS-Lernspiele zum entspannten Üben
   Für die Stunde am iPad oder Handy. Passt sich dem Kind an:
   Klasse (Grundschrift nur Kl. 1–4), bekannte Buchstaben,
   Rechtschreib-Schwerpunkte aus dem Förderplan und Fehlerwörter
   aus der Förderkartei. Kein Zeitdruck, kein Verlieren.
   ============================================================ */
function spJson($datei){ if (!is_file($datei)) return []; $d = json_decode((string)file_get_contents($datei), true); return is_array($d) ? $d : []; }
$kinder = [];
$akten = spJson(lt_daten("akten.json"));
$kartei = spJson(lt_daten("foerderkartei.json"));
foreach (spJson(lt_daten("kinder.json")) as $k) {
    $code = (string)($k["code"] ?? ""); if ($code === "") continue;
    $a = is_array($akten[$code] ?? null) ? $akten[$code] : [];
    $woerter = [];
    foreach (($kartei[$code]["woerter"] ?? []) as $w) if ((int)($w["fach"] ?? 1) < 5 && trim((string)($w["wort"] ?? "")) !== "")
        $woerter[] = ["w" => trim((string)$w["wort"]), "sp" => array_values((array)($w["sp"] ?? []))];
    $kinder[] = ["code" => $code, "klasse" => (string)($a["klasse"] ?? $k["klasse"] ?? ""), "lb" => (string)($a["plan"]["lb"] ?? ""), "r" => array_values((array)($a["plan"]["r"] ?? [])), "woerter" => $woerter];
}
$JSON = JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP;
?><!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#2f4a1f">
<link rel="manifest" href="manifest.php">
<link rel="apple-touch-icon" href="app-icon-192.png">
<link rel="icon" type="image/png" href="app-icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>Lernspiele · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Andika:wght@400;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link rel="stylesheet" href="marke/mewe.css">
<style>
@font-face{ font-family:"Playwrite DE Grund"; font-weight:400; font-display:block; src:url("schriften/playwrite-de-grund-400.woff2") format("woff2"); }
@font-face{ font-family:"Fraunces"; font-weight:600; font-display:swap; src:url("schriften/fraunces-600.woff2") format("woff2"); }
@font-face{ font-family:"Fraunces"; font-weight:700; font-display:swap; src:url("schriften/fraunces-700.woff2") format("woff2"); }
:root{ --nacht:#2f4a1f; --moos:#557428; --salbei:#b3c69a; --salbeih:#edf2e3; --holz:#8a6a4b; --creme:#f8f4ec; --ink:#2d3530; --gold:#d9a23f; --rot:#b5583f;
    --wort:"Playwrite DE Grund", "Andika", sans-serif; }
html.sek, html.druck{ --wort:"Atkinson Hyperlegible", "Andika", sans-serif; }
*{ box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
body{ margin:0; font-family:Nunito, sans-serif; background:var(--creme); color:var(--ink); min-height:100vh; }
button{ font:inherit; color:inherit; cursor:pointer; }
.kopf{ background:var(--salbeih) url("marke/mewe-blatt-dezent.png") no-repeat right -10px center / auto 120%; padding:14px 18px 16px; }
.kopf-zeile{ max-width:980px; margin:0 auto; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.kopf a.zurueck{ color:var(--nacht); font-weight:800; text-decoration:none; }
.kopf h1{ font-family:Fraunces, Georgia, serif; color:var(--nacht); margin:0; font-size:clamp(24px, 5vw, 32px); }
main{ max-width:980px; margin:0 auto; padding:18px; }
.karte{ background:#fff; border-radius:22px; padding:18px; box-shadow:0 4px 18px rgba(47,74,31,.07); margin-bottom:16px; }
.karte h2{ font-family:Fraunces, Georgia, serif; color:var(--nacht); margin:0 0 10px; font-size:21px; }
.hilfe{ color:#68745f; font-weight:600; font-size:14.5px; margin:4px 0 0; }
.zeile{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
select{ font:inherit; font-weight:700; padding:10px 12px; border-radius:12px; border:2px solid #dfe6d4; background:#fff; color:var(--ink); }
.chip{ border:2px solid #dfe6d4; background:#fff; border-radius:999px; padding:8px 14px; font-weight:800; font-size:14.5px; }
.chip.an{ background:var(--moos); border-color:var(--moos); color:#fff; }
.spiele{ display:grid; grid-template-columns:repeat(auto-fill, minmax(230px, 1fr)); gap:14px; }
.rs-kurz{ padding:12px 18px; } .rs-kurz summary > span:first-child{ font-size:15.5px; }
.einst-lk{ margin-top:10px; } .einst-lk summary{ cursor:pointer; font-weight:800; color:#8a6a4b; font-size:14px; list-style:none; } .einst-lk summary::-webkit-details-marker{ display:none; } .rs-kurz summary{ list-style:none; cursor:pointer; display:flex; justify-content:space-between; gap:10px; align-items:center; font-weight:800; color:var(--nacht); }
.rs-kurz summary::-webkit-details-marker{ display:none; } .rs-kurz .rs-aendern{ color:#8a6a4b; text-decoration:underline; font-size:14px; flex:0 0 auto; }
.rs-kurz[open] .rs-aendern{ visibility:hidden; }
.sp-gruppe{ font-family:Fraunces, Georgia, serif; color:var(--nacht); font-size:20px; margin:18px 4px 10px; }
.spiel{ text-align:left; border:0; background:#fff; border-radius:22px; padding:18px; box-shadow:0 4px 18px rgba(47,74,31,.07); display:flex; gap:14px; align-items:flex-start; transition:transform .15s; }
.spiel:hover{ transform:translateY(-2px); }
.spiel .ico{ flex:0 0 52px; height:52px; border-radius:16px; background:var(--salbeih); display:grid; place-items:center; font-size:24px; color:var(--moos); }
.spiel b{ display:block; font-family:Fraunces, Georgia, serif; font-size:19px; color:var(--nacht); margin-bottom:3px; }
.spiel span{ color:#68745f; font-weight:600; font-size:14px; }
.spiel[disabled]{ opacity:.45; cursor:default; transform:none; }
.garten{ font-size:26px; letter-spacing:2px; }

/* ---------- Spielfläche ---------- */
#buehne{ position:fixed; inset:0; background:var(--creme); display:none; flex-direction:column; z-index:50; }
#buehne.an{ display:flex; }
.b-kopf{ display:flex; align-items:center; gap:12px; padding:12px 16px; padding-top:max(12px, env(safe-area-inset-top)); }
.b-energie{ font-weight:900; color:#b07a12; background:#fff6df; border-radius:999px; padding:8px 14px; }
.b-kopf .runde{ flex:1; font-weight:800; color:#68745f; }
.rund{ width:48px; height:48px; border-radius:50%; border:0; background:#fff; box-shadow:0 3px 12px rgba(47,74,31,.1); font-size:19px; color:var(--nacht); flex:0 0 auto; }
.b-mitte{ flex:1; display:flex; gap:24px; align-items:center; justify-content:center; padding:10px 18px 24px; overflow:auto; }
.feld{ flex:1; width:100%; max-width:760px; display:flex; flex-direction:column; align-items:center; gap:22px; text-align:center; }
.pflanze{ flex:0 0 120px; align-self:stretch; display:flex; align-items:flex-end; justify-content:center; }
.pflanze svg{ width:120px; height:auto; max-height:100%; }
@media (max-width:700px){ .b-mitte{ flex-direction:column-reverse; gap:6px; } .pflanze{ flex:0 0 auto; align-self:center; } .pflanze svg{ width:auto; height:110px; } }
.wort{ font-family:var(--wort); font-size:clamp(38px, 9vw, 72px); line-height:1.35; color:var(--ink); letter-spacing:.02em; word-break:break-word; }
html.sek .wort{ letter-spacing:.04em; }
.satz{ font-family:var(--wort); font-size:clamp(24px, 5vw, 38px); line-height:1.5; }
.luecke{ display:inline-block; min-width:1.4em; border-bottom:4px solid var(--salbei); color:var(--moos); padding:0 .08em; }
.luecke.ok{ border-color:var(--moos); background:var(--salbeih); border-radius:8px 8px 0 0; }
.antworten{ display:flex; flex-wrap:wrap; gap:14px; justify-content:center; width:100%; }
.antwort{ min-width:120px; min-height:78px; padding:12px 22px; border-radius:20px; border:3px solid #dfe6d4; background:#fff; font-family:var(--wort); font-size:clamp(24px, 5vw, 36px); box-shadow:0 4px 0 #dfe6d4; transition:transform .08s; }
.antwort:active{ transform:translateY(3px); box-shadow:0 1px 0 #dfe6d4; }
.antwort.klein{ font-family:Nunito, sans-serif; font-size:17px; font-weight:800; min-height:84px; max-width:330px; flex:1 1 220px; }
.antwort.ok{ border-color:var(--moos); background:var(--salbeih); box-shadow:0 4px 0 var(--moos); }
.antwort.nein{ border-color:#e6c3b5; background:#fbf1ec; animation:wackeln .35s; }
@keyframes wackeln{ 25%{ transform:translateX(-6px); } 75%{ transform:translateX(6px); } }
.hinweis{ background:#fff7e6; border:2px solid #f0dfb8; border-radius:16px; padding:12px 16px; font-weight:700; max-width:600px; color:#6b5427; }
.weiter{ border:0; background:var(--moos); color:#fff; border-radius:18px; padding:16px 30px; font-weight:900; font-size:19px; box-shadow:0 4px 0 var(--nacht); }
.bild{ width:min(42vw, 190px); height:min(42vw, 190px); }
.bild svg{ width:100%; height:100%; }
.vorlesen{ border:0; background:#fff; border-radius:50%; width:58px; height:58px; font-size:22px; color:var(--moos); box-shadow:0 3px 12px rgba(47,74,31,.12); }
.kacheln{ display:flex; flex-wrap:wrap; gap:10px; justify-content:center; }
.kachel{ min-width:64px; height:72px; padding:0 14px; border-radius:16px; border:3px solid #dfe6d4; background:#fff; font-family:var(--wort); font-size:32px; box-shadow:0 4px 0 #dfe6d4; }
.kachel.weg{ visibility:hidden; }
.kachel.nein{ animation:wackeln .35s; border-color:#e6c3b5; }
.ziel{ display:flex; gap:6px; justify-content:center; flex-wrap:wrap; min-height:84px; align-items:flex-end; }
.ziel .platz{ min-width:46px; height:76px; border-bottom:4px solid var(--salbei); font-family:var(--wort); font-size:40px; display:flex; align-items:flex-end; justify-content:center; padding:0 4px; color:var(--moos); }
.ziel .platz.voll{ color:var(--ink); border-color:var(--moos); }
.ziel.silben .platz{ min-width:90px; }
.blitz{ min-height:120px; display:flex; align-items:center; justify-content:center; }
.blitz .punkt{ width:18px; height:18px; border-radius:50%; background:var(--salbei); }
.memory{ display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; width:100%; max-width:min(640px, 72vh); }
.mkarte{ aspect-ratio:1/1; border-radius:16px; border:0; background:var(--salbei) url("marke/mewe-blatt.png") no-repeat center / 46%; box-shadow:0 4px 0 #8fa874; font-family:var(--wort); font-size:clamp(20px, 5vw, 32px); padding:6px; overflow:hidden; }
.mkarte.offen{ background:#fff; box-shadow:0 4px 0 #dfe6d4; border:3px solid #dfe6d4; }
.mkarte.fertig{ background:var(--salbeih); box-shadow:none; border:3px solid var(--salbei); opacity:.75; }
.mkarte svg{ width:80%; height:80%; }
.spalten{ display:grid; gap:12px; width:100%; }
.ende h2{ font-family:Fraunces, Georgia, serif; color:var(--nacht); font-size:clamp(28px, 6vw, 40px); margin:0; }
.ende .liste{ font-family:var(--wort); font-size:24px; line-height:1.6; }
.einst{ display:flex; gap:8px; align-items:center; font-weight:800; color:#68745f; }
.einst button{ border:2px solid #dfe6d4; background:#fff; border-radius:10px; width:38px; height:38px; font-weight:900; }
</style>
</head>
<body>
<header class="kopf"><div class="kopf-zeile">
    <a class="zurueck" href="<?= $LT_GAST ? "gast.php" : "index.php" ?>"><i class="fa-solid fa-arrow-left"></i> Leuchtturm</a>
    <h1>Lernspiele</h1>
</div></header>
<main>
    <div class="karte">
        <h2>Wer spielt?</h2>
        <div class="zeile">
            <select id="kind"><option value="">Ohne Kind – frei wählen</option></select>
            <select id="klasse"><?php for ($i = 1; $i <= 9; $i++) echo "<option value=\"$i\">Klasse $i</option>"; ?></select>
            <select id="schrift"><option value="grund">Grundschrift</option><option value="druck">Druckschrift</option></select>
            <select id="lesestand" title="Lesestand"><option value="auto">Lesestand: automatisch</option><option value="vor">liest noch nicht</option><option value="liest">liest schon</option></select>
        </div>
        <p class="hilfe" id="kind-info">Wählst du ein Kind, passen sich die Spiele an: bekannte Buchstaben, Schwerpunkte aus dem Förderplan und Fehlerwörter aus der Förderkartei.</p>
        <div id="garten" class="garten" style="margin-top:8px"></div>
        <details class="einst-lk"><summary>⚙️ Einstellungen für dich</summary>
        <label class="hilfe" style="display:flex;gap:8px;align-items:center;margin-top:8px"><input type="checkbox" id="freispiel"> Action-Spiele ohne Energie freigeben (Freispiel)</label>
        <label class="hilfe" style="display:flex;gap:8px;align-items:center;margin-top:4px"><input type="checkbox" id="alle-welten"> Weltenreise: alle Welten offen</label></details>
    </div>
    <details class="karte rs-kurz" id="rs-karte">
        <summary><span>✏️ Schwerpunkt: <b id="rs-name"></b></span><span class="rs-aendern">ändern</span></summary>
        <div class="zeile" id="rs-wahl" style="margin-top:12px"></div>
        <p class="hilfe">Kommt automatisch aus dem Förderplan (★). Nur ändern, wenn heute etwas anderes dran ist.</p>
    </details>
    <div id="spiele"></div>
</main>

<div id="buehne">
    <div class="b-kopf">
        <button class="rund" id="b-zu" title="Zurück zur Auswahl"><i class="fa-solid fa-xmark"></i></button>
        <div class="runde" id="b-titel"></div>
        <div class="b-energie" id="b-energie">⚡ 0</div>
        <button class="rund" id="b-ton" title="Töne an/aus"><i class="fa-solid fa-volume-high"></i></button>
        <button class="rund" id="b-voll" title="Vollbild"><i class="fa-solid fa-expand"></i></button>
    </div>
    <div class="b-mitte"><div class="feld" id="feld"></div><div class="pflanze" id="pflanze"></div></div>
</div>

<script src="bilder.js"></script>
<script src="lrs-spiele-daten.js"></script>
<script>
const KINDER = <?= json_encode($kinder, $JSON) ?>;
const $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const mischen = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const merken = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e){} };
const laden = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e){ return d; } };

/* Wortpaare „Wort|Hilfswort“ (Verlängern / Ableiten) aufteilen */
const SP_HILFE = {};
Object.entries(SP_RS).forEach(([k, d]) => ["treffer", "kontrast"].forEach(t => { d[t] = d[t].map(e => { if (!e.includes("|")) return e; const [w, h] = e.split("|"); if (h && h !== "–") SP_HILFE[w] = h; return w; }); }));
function hilfe(k, w){
    const h = SP_HILFE[w]; if (!h) return "";
    return k === "aeau" ? `Ableiten: <b>${esc(h)}</b>` : `Verlängern: <b>${esc(h)}</b>`;
}

/* ---------- Kind & Einstellungen ---------- */
const BK_REIHE = "m a l i o e s n r t u d h ei w k au b f g sch p z ch ä ö ü eu j v ie pf st sp qu x y c".split(" ");
let S = { kind: null, klasse: 2, rs: "schaerfung", ton: laden("sp-ton", true) };
const sek = () => S.klasse >= 5;
function buchstaben(){ const lb = (S.kind?.lb || "").toLowerCase().split(/[\s,;]+/).filter(Boolean); return lb.length >= 3 ? lb : null; }
function schriftSetzen(){
    const w = laden("lt-ws-schrift-spiele", "grund");
    $("#schrift").value = w;
    document.documentElement.classList.toggle("sek", sek());
    document.documentElement.classList.toggle("druck", w === "druck");
    $("#schrift").style.display = sek() ? "none" : "";
}
KINDER.forEach(k => $("#kind").insertAdjacentHTML("beforeend", `<option value="${esc(k.code)}">${esc(k.code)}${k.klasse ? " · Kl. " + esc(k.klasse) : ""}</option>`));
$("#kind").value = laden("sp-kind", "");
function kindSetzen(){
    S.kind = KINDER.find(k => k.code === $("#kind").value) || null;
    merken("sp-kind", S.kind ? S.kind.code : "");
    const kl = parseInt(S.kind?.klasse, 10);
    if (kl) $("#klasse").value = Math.min(9, Math.max(1, kl));
    S.klasse = parseInt($("#klasse").value, 10) || 2;
    if (S.kind && S.kind.r.length){ const r = S.kind.r.find(x => SP_RS[x]); if (r) S.rs = r; }
    const lb = buchstaben();
    $("#kind-info").textContent = S.kind
        ? [lb ? `🔤 ${lb.length} Buchstaben` : "", S.kind.woerter.length ? `📦 ${S.kind.woerter.length} Fehlerwörter` : "", S.kind.r.length ? `★ ${S.kind.r.filter(x => SP_RS[x]).length} Schwerpunkte` : ""].filter(Boolean).join(" · ") || "Passt sich an Klasse und Förderplan an."
        : "Wählst du ein Kind, passen sich die Spiele an: bekannte Buchstaben, Schwerpunkte aus dem Förderplan und Fehlerwörter aus der Förderkartei.";
    $("#lesestand").value = laden("sp-lesestand-" + (S.kind?.code || "_"), "auto"); $("#lesestand").style.display = sek() ? "none" : "";
    schriftSetzen(); rsZeigen(); spieleZeigen(); gartenZeigen();
}
$("#kind").onchange = kindSetzen;
// Lesestand: „liest noch nicht“ → Hör- und Bildspiele zuerst, Weltenreise auf dem Hörpfad
function vorleser(){ const v = laden("sp-lesestand-" + (S.kind?.code || "_"), "auto"); if (v !== "auto") return v === "vor";
    if (sek()) return false; const lb = buchstaben(); return S.klasse <= 1 && (!lb || lb.length < 8) || (!!S.kind && !S.kind.r.length && (!lb || lb.length < 5) && S.klasse <= 2); }
$("#lesestand").onchange = () => { merken("sp-lesestand-" + (S.kind?.code || "_"), $("#lesestand").value); rsZeigen(); };
$("#freispiel").checked = laden("sp-freispiel", false); $("#freispiel").onchange = () => merken("sp-freispiel", $("#freispiel").checked);
$("#alle-welten").checked = laden("sp-alle-welten", false); $("#alle-welten").onchange = () => { merken("sp-alle-welten", $("#alle-welten").checked); if (window.arKarten) arKarten(); };
$("#klasse").onchange = () => { S.klasse = parseInt($("#klasse").value, 10); schriftSetzen(); spieleZeigen(); };
$("#schrift").onchange = () => { merken("lt-ws-schrift-spiele", $("#schrift").value); schriftSetzen(); };
function rsZeigen(){
    const eigene = S.kind ? S.kind.r.filter(x => SP_RS[x]) : [];
    const keys = [...eigene, ...Object.keys(SP_RS).filter(k => !eigene.includes(k))];
    $("#rs-wahl").innerHTML = keys.map(k => `<button class="chip${k === S.rs ? " an" : ""}" data-rs="${k}">${eigene.includes(k) ? "★ " : ""}${esc(SP_RS[k].name)}</button>`).join("");
    $("#rs-wahl").querySelectorAll("[data-rs]").forEach(b => b.onclick = () => { S.rs = b.dataset.rs; $("#rs-karte").open = false; rsZeigen(); });
    $("#rs-name").textContent = (eigene.includes(S.rs) ? "★ " : "") + SP_RS[S.rs].name;
    // für Anfänger ohne Lesen spielt der Schwerpunkt keine Rolle
    $("#rs-karte").style.display = typeof vorleser === "function" && vorleser() ? "none" : "";
}
function gartenZeigen(){
    const n = laden("sp-garten-" + (S.kind?.code || "_"), 0);
    $("#garten").innerHTML = n ? (sek() ? `<span class="hilfe" style="font-size:15px">${n} Runden geschafft</span>` : "🌼".repeat(Math.min(n, 30)) + (n > 30 ? ` <span class="hilfe">+${n - 30}</span>` : "")) : "";
}

/* ---------- Wortmaterial ---------- */
const EINHEITEN = ["sch", "ch", "ck", "ie", "ei", "au", "eu", "äu", "pf", "qu"];
function grapheme(w){
    const t = []; let i = 0;
    while (i < w.length){ const e = EINHEITEN.find(x => w.slice(i, i + x.length).toLowerCase() === x); const n = e ? e.length : 1; t.push(w.slice(i, i + n)); i += n; }
    return t;
}
function bilder(){
    return Object.entries(window.LT_BILDER || {}).filter(([k, b]) => /^[A-ZÄÖÜ][a-zäöüß]+$/.test(b[0]) && b[0].length <= 9).map(([k, b]) => ({ w: b[0], svg: b[2] }));
}
function lesbar(w){ const lb = buchstaben(); if (!lb) return true; const s = new Set(lb); return grapheme(w.toLowerCase()).every(g => s.has(g) || (g === "ß" && s.has("s"))); }
function rsWoerter(k){ const d = SP_RS[k]; return [...d.treffer, ...d.kontrast].filter(w => w && w !== "–" && !w.includes("*") && !/\s/.test(w)); }
function kindWoerter(k){ return S.kind ? S.kind.woerter.filter(x => !k || (x.sp || []).includes(k)).map(x => x.w) : []; }

/* ---------- Silben ---------- */
let trenner = null;
(function(){ const a = document.createElement("script"); a.src = "https://cdn.jsdelivr.net/npm/hyphen@1.10.6/hyphen.js";
    a.onload = () => { const b = document.createElement("script"); b.src = "https://cdn.jsdelivr.net/npm/hyphen@1.10.6/patterns/de-1996.js";
        b.onload = () => { try { trenner = window.createHyphenator(window.hyphenationPatternsDe1996, { hyphenChar: "|", minWordLength: 3 }); } catch (e){} }; document.head.appendChild(b); };
    document.head.appendChild(a); })();
function silbenAuto(wort){
    const V = "aeiouäöüyAEIOUÄÖÜY", E = ["sch", "ch", "ck", "ph", "qu"], t = []; let i = 0;
    while (i < wort.length){ const r = wort.slice(i).toLowerCase(), e = E.find(x => r.startsWith(x)); if (e){ t.push({ s: wort.substr(i, e.length), v: false }); i += e.length; } else { t.push({ s: wort[i], v: V.includes(wort[i]) }); i++; } }
    const k = []; for (let a = 0; a < t.length; a++){ if (!t[a].v) continue; let e = a; while (e + 1 < t.length && t[e + 1].v) e++; k.push([a, e]); a = e; }
    if (k.length < 2) return [wort];
    const sch = []; for (let n = 0; n < k.length - 1; n++){ const ke = k[n + 1][0] - k[n][1] - 1; sch.push(ke <= 1 ? k[n][1] + 1 : k[n + 1][0] - 1); }
    const s = []; let st = 0; sch.forEach(x => { s.push(t.slice(st, x).map(y => y.s).join("")); st = x; }); s.push(t.slice(st).map(y => y.s).join("")); return s;
}
function silben(w){
    let t; try { t = trenner ? trenner(w).split("|") : silbenAuto(w); } catch (e){ t = silbenAuto(w); }
    const r = []; t.forEach(x => { if (x.length > 2 && /^[aeiouäöü][bcdfghjklmnpqrstvwxzß][aeiouäöüy]/i.test(x) && !/^(un|er|um|ur|an|ob)/i.test(x)) r.push(x[0], x.slice(1)); else r.push(x); });
    return r.filter(Boolean);
}

/* ---------- Vorlesen & Töne ---------- */
function sprechen(t){ try { const u = new SpeechSynthesisUtterance(t); u.lang = "de-DE"; u.rate = .85; const v = speechSynthesis.getVoices().find(x => /^de/i.test(x.lang)); if (v) u.voice = v; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e){} }
let ac = null;
function ton(gut){
    if (!S.ton) return;
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const t = ac.currentTime;
        (gut ? [523, 659, 784] : [330, 294]).forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * .09); g.gain.linearRampToValueAtTime(gut ? .12 : .06, t + i * .09 + .02); g.gain.exponentialRampToValueAtTime(.001, t + i * .09 + .35);
            o.connect(g).connect(ac.destination); o.start(t + i * .09); o.stop(t + i * .09 + .4); }); } catch (e){}
}

/* ---------- Pflanze (wächst mit jeder richtigen Antwort) ---------- */
function pflanze(n, max){
    const p = Math.min(1, n / max), h = 30 + p * 150, top = 200 - h;
    let blaetter = "";
    const zahl = Math.floor(p * 6);
    for (let i = 0; i < zahl; i++){
        const y = 196 - (i + 1) * (h / 7), r = i % 2 ? 1 : -1;
        blaetter += `<path d="M60 ${y} q ${r * 26} -6 ${r * 34} -24 q ${r * -22} 2 ${r * -34} 24z" fill="${i % 3 === 2 ? "#8a6a4b" : "#557428"}" opacity=".92"/>`;
    }
    const bluete = p >= 1 ? (sek() ? `<circle cx="60" cy="${top}" r="11" fill="#d9a23f"/>`
        : `<g transform="translate(60 ${top})">${[0, 60, 120, 180, 240, 300].map(a => `<ellipse rx="9" ry="17" transform="rotate(${a}) translate(0 -14)" fill="#f3d27a"/>`).join("")}<circle r="9" fill="#d9a23f"/></g>`)
        : `<ellipse cx="60" cy="${top}" rx="7" ry="10" fill="#7f9c4f"/>`;
    return `<svg viewBox="0 0 120 230" aria-hidden="true"><path d="M8 206 q52 -14 104 0 v24 h-104z" fill="#d8c8ae"/>
        <path d="M60 204 C ${56} ${204 - h / 3}, ${64} ${204 - h * 2 / 3}, 60 ${top}" stroke="#557428" stroke-width="5" fill="none" stroke-linecap="round"/>${blaetter}${bluete}</svg>`;
}

/* ---------- Spiel-Ablauf (ohne Zeitdruck, Fehler → Tipp → zweiter Versuch) ---------- */
let R = null;   // laufende Runde
function energie(){ return laden("sp-energie-" + (S.kind?.code || "_"), 0); }
function energieDazu(n){ const e = Math.min(99, energie() + n); merken("sp-energie-" + (S.kind?.code || "_"), e); const el = $("#b-energie"); if (el) el.textContent = "⚡ " + e; return e; }
function rundeStarten(spiel){
    const aufgaben = spiel.machen();
    if (!aufgaben.length){ alert("Dafür gibt es gerade nicht genug passende Wörter. Wähle einen anderen Schwerpunkt oder trage mehr bekannte Buchstaben ein."); return; }
    R = { spiel, warte: aufgaben, max: aufgaben.length, gut: 0, ersterVersuch: 0, nochmal: [], wiederholt: new Set(), energie: 0 };
    $("#buehne").classList.add("an"); document.body.style.overflow = "hidden";
    $("#b-energie").textContent = "⚡ " + energie();
    naechste();
}
function naechste(){
    $("#pflanze").innerHTML = pflanze(R.gut, R.max);
    $("#b-titel").textContent = R.max > 1 ? `${R.spiel.titel} · ${R.gut} von ${R.max}` : R.spiel.titel;
    if (!R.warte.length) return ende();
    const a = R.warte.shift();
    if (a.typ === "memory"){
        return memoryZeigen(a, $("#feld"), () => { ton(true); R.gut++; R.ersterVersuch++; R.energie += 4; energieDazu(4); setTimeout(naechste, 700); });
    }
    AG.zeigen($("#feld"), a, r => {
        ton(true); R.gut++;
        const e = r.erst ? 2 : 1; R.energie += e; energieDazu(e);
        if (r.erst) R.ersterVersuch++;
        else if (!R.wiederholt.has(a.w)){ R.wiederholt.add(a.w); R.nochmal.push(a.w); R.warte.push({ ...a }); R.max++; }   // kommt später noch einmal
        naechste();
    }, { beiFehler: () => ton(false) });
}
function ende(){
    const n = laden("sp-garten-" + (S.kind?.code || "_"), 0) + 1;
    merken("sp-garten-" + (S.kind?.code || "_"), n);
    $("#b-titel").textContent = R.spiel.titel;
    $("#feld").innerHTML = `<div class="ende">
        <h2>${sek() ? "Runde geschafft." : "Deine Pflanze blüht!"}</h2>
        <p class="hilfe" style="font-size:18px">${R.ersterVersuch} von ${R.max} gleich beim ersten Mal · <b style="color:#b07a12">⚡ +${R.energie} Energie</b></p>
        ${R.nochmal.length ? `<p class="hilfe" style="margin-top:14px">Die haben wir zweimal geübt:</p><div class="liste">${R.nochmal.map(esc).join(" · ")}</div>` : ""}
        <div class="zeile" style="justify-content:center;margin-top:22px"><button class="weiter" id="e-nochmal">Noch eine Runde</button><button class="antwort klein" style="flex:0 0 auto" id="e-zu">Fertig</button></div></div>`;
    $("#e-nochmal").onclick = () => rundeStarten(R.spiel);
    $("#e-zu").onclick = schliessen;
    gartenZeigen();
}
function schliessen(){ $("#buehne").classList.remove("an"); document.body.style.overflow = ""; try { speechSynthesis.cancel(); } catch (e){} if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }
$("#b-zu").onclick = schliessen;
$("#b-ton").onclick = () => { S.ton = !S.ton; merken("sp-ton", S.ton); $("#b-ton").innerHTML = `<i class="fa-solid fa-volume-${S.ton ? "high" : "xmark"}"></i>`; };
$("#b-ton").innerHTML = `<i class="fa-solid fa-volume-${S.ton ? "high" : "xmark"}"></i>`;
$("#b-voll").onclick = () => { const e = document.documentElement; if (document.fullscreenElement) document.exitFullscreen(); else if (e.requestFullscreen) e.requestFullscreen().catch(() => {}); };

/* ---------- Rechtschreibung: Lücken ---------- */
function cut(w, i, len, opts){ const r = len ? w.substr(i, len) : "–"; return { vor: w.slice(0, i), richtig: r, nach: w.slice(i + len), opts: [...new Set(opts.includes(r) ? opts : [r, ...opts])] }; }
const gross = (c, x) => c === c.toUpperCase() && c !== c.toLowerCase() ? x[0].toUpperCase() + x.slice(1) : x;
const LUECKE = {
    schaerfung: w => { let m = /(bb|dd|ff|gg|ll|mm|nn|pp|rr|tt|ss)/.exec(w); if (m) return cut(w, m.index, 2, [m[0][0], m[0]]);
        m = /[aeiouäöü]([bdfglmnprt])(?=[aeiouäöü])/i.exec(w); return m ? cut(w, m.index + 1, 1, [m[1], m[1] + m[1]]) : null; },
    cktz: w => { let m = /ck|tz/.exec(w); if (m) return cut(w, m.index, 2, m[0] === "ck" ? ["k", "ck"] : ["z", "tz"]);
        const i = w.slice(1).search(/[kz]/); if (i < 0) return null; const c = w[i + 1]; return cut(w, i + 1, 1, c === "k" ? ["k", "ck"] : ["z", "tz"]); },
    dehnung: w => { let m = /([aeiouäöü])h(?![aeiouäöü])/i.exec(w); if (m) return cut(w, m.index, 2, [m[1], m[1] + "h"]);
        m = /[aeiouäöü](?=[lmnr])/i.exec(w); return m ? cut(w, m.index, 1, [m[0], m[0] + "h"]) : null; },
    ie: w => { let m = /ie/i.exec(w); if (m) return cut(w, m.index, 2, [gross(m[0][0], "i"), gross(m[0][0], "ie")]);
        m = /i/i.exec(w); return m ? cut(w, m.index, 1, [gross(m[0], "i"), gross(m[0], "ie")]) : null; },
    sss: w => { let m = /ß|ss/.exec(w); if (!m){ m = /[aeiouäöü]s/.exec(w); if (m) m = { index: m.index + 1, 0: "s" }; } return m ? cut(w, m.index, m[0].length, ["s", "ss", "ß"]) : null; },
    auslaut: w => { const c = w.slice(-1), p = { b: ["b", "p"], p: ["b", "p"], d: ["d", "t"], t: ["d", "t"], g: ["g", "k"], k: ["g", "k"] }[c]; return p && !/(ck|nk|rk|lk|st|cht|tt)$/.test(w) ? cut(w, w.length - 1, 1, p) : null; },
    aeau: w => { let m = /äu|eu/i.exec(w); if (m) return cut(w, m.index, 2, [gross(m[0][0], "äu"), gross(m[0][0], "eu")]);
        m = /ä/i.exec(w) || /e/i.exec(w); return m ? cut(w, m.index, 1, [gross(m[0], "ä"), gross(m[0], "e")]) : null; },
    vf: w => { const m = /[vf]/i.exec(w); return m ? cut(w, m.index, 1, [gross(m[0], "v"), gross(m[0], "f")]) : null; },
    doppelvokal: w => { let m = /aa|ee|oo/.exec(w); if (m) return cut(w, m.index, 2, [m[0][0], m[0], m[0][0] + "h"]);
        m = /[aeo]/i.exec(w); return m && !/[aeo][hu]|ei|eu/i.test(w.substr(m.index, 2)) ? cut(w, m.index, 1, [m[0], m[0] + m[0], m[0] + "h"]) : null; },
    iglich: w => { const m = /(lich|ig)(?=(er|e|en|es)?$)/.exec(w); return m ? cut(w, m.index, m[1].length, ["ig", "lich"]) : null; },
    spst: w => { if (/^sch/i.test(w)) return null; const m = /^(sp|st)/i.exec(w); return m ? cut(w, 0, 2, [m[0], gross(m[0][0], "sch" + m[0][1])]) : null; },
    silbenh: w => { let m = /([aeiouäöü])h([aeiouäöü])/.exec(w); if (m) return cut(w, m.index + 1, 1, ["h", "–"]);
        m = /(au|eu|ei|äu|[aeouäöü])(?=e[nrl]?$)/.exec(w); return m ? cut(w, m.index + m[1].length, 0, ["h", "–"]) : null; },
    chsx: w => { const m = /chs|cks|ks|x/i.exec(w); return m ? cut(w, m.index, m[0].length, ["chs", "x", "ks", "cks"]) : null; },
    dasdass: s => { const m = /\*(das|dass|Das|Dass)\*/.exec(s); if (!m) return null; const t = s.replace(/\*/g, ""), i = m.index;
        return { vor: t.slice(0, i), richtig: m[1], nach: t.slice(i + m[1].length), opts: [gross(m[1][0], "das"), gross(m[1][0], "dass")], satz: true }; },
    grossklein: s => { const m = /\*([^*]+)\*/.exec(s); if (!m) return null; const t = s.replace(/\*/g, ""), i = m.index, c = m[1][0];
        return { vor: t.slice(0, i), richtig: c, nach: t.slice(i + 1), opts: [c.toUpperCase(), c.toLowerCase()], satz: true }; },
};
/* ---------- Anlaut ---------- */
function anlaut(w){ const g = grapheme(w)[0].toLowerCase(); return g; }
function anlautAufgaben(n){
    const lb = buchstaben();
    const erlaubt = new Set(lb || BK_REIHE);
    const pool = bilder().filter(b => !/^(sp|st|ch|qu|c|y|x|v)/i.test(b.w) && erlaubt.has(anlaut(b.w)));
    const auswahl = [...erlaubt].filter(z => z.length <= 3 && !["sp", "st", "qu", "c", "y", "x"].includes(z));
    return mischen(pool).slice(0, n).map(b => {
        const r = anlaut(b.w), andere = mischen(auswahl.filter(z => z !== r)).slice(0, 2);
        return { ...b, richtig: r, opts: mischen([r, ...andere]), anzeige: b.w };
    });
}
/* ---------- Silben-Puzzle ---------- */
function silbenAufgaben(n){
    let pool;
    if (sek()) pool = mischen([...kindWoerter(), ...Object.keys(SP_RS).flatMap(rsWoerter)]).filter(w => silben(w).length >= 3).map(w => ({ w }));
    else pool = mischen(bilder().filter(b => silben(b.w).length >= 2 && lesbar(b.w)));
    const set = new Set(); return pool.filter(x => !set.has(x.w) && set.add(x.w)).slice(0, n).map(x => ({ ...x, teile: silben(x.w), anzeige: x.w }));
}
/* ---------- Memory ---------- */
function memoryAufgaben(art){
    let paare = [];
    if (art === "gk"){ const lb = (buchstaben() || BK_REIHE.slice(0, 14)).filter(z => z.length === 1 && !"ß".includes(z));
        paare = mischen(lb).slice(0, 6).map(z => [z.toUpperCase(), z]); }
    if (art === "reim") paare = mischen(SP_REIME.filter(p => p.every(lesbar))).slice(0, 6);
    if (art === "reimbild"){ const m = {}; bilder().forEach(b => { m[b.w] = m[b.w] || b; });
        const R = [["Maus", "Haus"], ["Hose", "Rose"], ["Igel", "Spiegel"], ["Schwein", "Stein"], ["Wal", "Schal"], ["Raupe", "Lupe"], ["Taube", "Schraube"], ["Zitrone", "Krone"], ["Rakete", "Trompete"], ["Giraffe", "Affe"], ["Erdbeere", "Schere"], ["Schlange", "Zange"], ["Mais", "Eis"], ["Hund", "Mund"], ["Tisch", "Fisch"], ["Topf", "Kopf"]].filter(p => m[p[0]] && m[p[1]]);
        const gesehen = new Set(); paare = mischen(R).filter(p => !gesehen.has(p[0]) && !gesehen.has(p[1]) && (gesehen.add(p[0]), gesehen.add(p[1]), true)).slice(0, 6).map(([a, b]) => [{ svg: m[a].svg, w: a }, { svg: m[b].svg, w: b }]); }
    if (art === "bild") paare = mischen(bilder().filter(b => lesbar(b.w) && b.w.length <= 7)).slice(0, 6).map(b => [{ svg: b.svg, w: b.w }, b.w]);
    return paare.length >= 3 ? [{ typ: "memory", paare, w: "" }] : [];
}
function memoryZeigen(a, feld, fertig){
    const karten = mischen(a.paare.flatMap((p, i) => [{ p: i, inhalt: p[0] }, { p: i, inhalt: p[1] }]));
    let offen = [], gefunden = 0, sperre = false;
    feld.innerHTML = `<div class="memory" id="mem"></div>`;
    karten.forEach(k => {
        const b = document.createElement("button"); b.className = "mkarte";
        const zeig = () => { b.classList.add("offen"); b.innerHTML = typeof k.inhalt === "object" ? k.inhalt.svg : esc(k.inhalt); };
        b.onclick = () => {
            if (sperre || b.classList.contains("offen")) return;
            zeig(); offen.push({ k, b });
            if (typeof k.inhalt === "object") sprechen(k.inhalt.w); else if (!sek() && k.inhalt.length > 1) sprechen(k.inhalt);
            if (offen.length === 2){
                const [x, y] = offen; offen = [];
                if (x.k.p === y.k.p){ ton(true); setTimeout(() => { x.b.classList.add("fertig"); y.b.classList.add("fertig"); }, 400); gefunden++;
                    $("#pflanze").innerHTML = pflanze(gefunden, a.paare.length);
                    if (gefunden === a.paare.length) setTimeout(() => fertig(true), 700); }
                else { sperre = true; setTimeout(() => { [x, y].forEach(o => { o.b.classList.remove("offen"); o.b.innerHTML = ""; }); sperre = false; }, 1100); }
            }
        };
        $("#mem").appendChild(b);
    });
}

/* ---------- Spieleliste ---------- */
const SPIELE = [
    { id: "v-reim", gruppe: "vor", titel: "Reime hören", ico: "fa-ear-listen", text: "Bild ansehen, zuhören: Was reimt sich? Ganz ohne Lesen.", gs: true, machen: () => AG.reimHoerAufg(8) },
    { id: "v-klatsch", gruppe: "vor", titel: "Silben klatschen", ico: "fa-hands-clapping", text: "Wort hören, mitklatschen: Wie viele Silben?", gs: true, machen: () => AG.klatschAufg(8) },
    { id: "v-anlaut", gruppe: "vor", titel: "Anfangslaute hören", ico: "fa-volume-high", text: "Welches Bild fängt genauso an? Nur hören, keine Buchstaben.", gs: true, machen: () => AG.anlautHoerAufg(8) },
    { id: "v-robo", gruppe: "vor", titel: "Robo-Sprache", ico: "fa-robot", text: "Robo spricht in Silben – welches Bild meint er?", gs: true, machen: () => AG.syntheseAufg(8) },
    { id: "v-detektiv", gruppe: "vor", titel: "Laut-Detektiv", ico: "fa-magnifying-glass", text: "Hörst du am Anfang ein M? Daumen hoch oder runter.", gs: true, machen: () => AG.lautJaNeinAufg(10) },
    { id: "v-mem", gruppe: "vor", titel: "Memory: Reimbilder", ico: "fa-clone", text: "Bilder aufdecken, zuhören – welche reimen sich?", gs: true, machen: () => memoryAufgaben("reimbild") },
    { id: "strategie", titel: "Rechtschreib-Strategie", ico: "fa-route", text: "Hören, Strategie anwenden, Lücke füllen – mit Tipp, wenn es hakt.", gs: true, sek: true, rs: true, machen: () => AG.rsAufgaben(S.rs, 10) },
    { id: "merk", titel: "Merk- & Fehlerwörter", ico: "fa-eye", text: "Wortbild ansehen, abdecken, aufbauen. Mit den Fehlerwörtern aus der Förderkartei.", gs: true, sek: true, machen: () => AG.merkAufgaben(8) },
    { id: "silben", titel: "Silben-Puzzle", ico: "fa-shoe-prints", text: "Silben in die richtige Reihenfolge legen und mitschwingen.", gs: true, sek: true, machen: () => AG.silbenAufg(8) },
    { id: "bildwort", titel: "Bild & Wort", ico: "fa-image", text: "Genau lesen: Welches Wort passt zum Bild? Nur echte Wörter.", gs: true, machen: () => AG.bildWortAufg(10) },
    { id: "blitz", titel: "Blitzlesen", ico: "fa-bolt", text: "Das Wort blitzt kurz auf – welches Bild gehört dazu?", gs: true, machen: () => AG.blitzAufg(10) },
    { id: "anlaut", titel: "Anlaut finden", ico: "fa-ear-listen", text: "Bild ansehen, Wort hören: Mit welchem Laut fängt es an?", gs: true, machen: () => AG.anlautAufg(10) },
    { id: "reim", titel: "Reimwörter", ico: "fa-music", text: "Was reimt sich? Laut sprechen und aufs Ende hören.", gs: true, machen: () => AG.reimAufg(8) },
    { id: "mem-gk", titel: "Memory: Groß & klein", ico: "fa-clone", text: "Großbuchstabe und Kleinbuchstabe finden zusammen.", gs: true, machen: () => memoryAufgaben("gk") },
    { id: "mem-bild", titel: "Memory: Bild & Wort", ico: "fa-images", text: "Wort lesen und das passende Bild finden.", gs: true, machen: () => memoryAufgaben("bild") },
    { id: "mem-reim", titel: "Memory: Reime", ico: "fa-music", text: "Welche Wörter reimen sich?", gs: true, machen: () => memoryAufgaben("reim") },
];
function spieleZeigen(){
    const liste = SPIELE.filter(s => sek() ? s.sek : s.gs);
    const karte = s => `<button class="spiel" data-spiel="${s.id}"><div class="ico"><i class="fa-solid ${s.ico}"></i></div><div><b>${esc(s.titel)}</b><span>${esc(s.text)}${s.rs ? ` <br><em>Schwerpunkt: ${esc(SP_RS[S.rs].name)}</em>` : ""}</span></div></button>`;
    const vor = liste.filter(s => s.gruppe === "vor"), rest = liste.filter(s => s.gruppe !== "vor"), zuerstVor = vorleser();
    const block = (t, l) => l.length ? `<h3 class="sp-gruppe">${t}</h3><div class="spiele">${l.map(karte).join("")}</div>` : "";
    $("#spiele").innerHTML = zuerstVor ? block("Für Anfänger – ganz ohne Lesen", vor) + block("Mit Lesen und Schreiben", rest) : block("Lesen und Schreiben", rest) + block("Für Anfänger – ganz ohne Lesen", vor);
    $("#spiele").querySelectorAll("[data-spiel]").forEach(b => b.onclick = () => rundeStarten(SPIELE.find(s => s.id === b.dataset.spiel)));
    if (window.arKarten) arKarten();
}
const _rsZeigen = rsZeigen; rsZeigen = function(){ _rsZeigen(); spieleZeigen(); };
kindSetzen();
</script>
<script src="lrs-aufgaben.js"></script>
<script src="lrs-arcade.js"></script>
<script>arKarten();</script>
<script src="lrs-welten.js"></script>
</body>
</html>
