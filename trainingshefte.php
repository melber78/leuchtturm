<?php require __DIR__ . "/auth.php"; ?>
<?php

// ---------------------------
// Speicherorte
// ---------------------------

$materialDatei = __DIR__ . "/material-daten/materialien.json";
$kinderDatei = __DIR__ . "/material-daten/kinder.json";
$aktenDatei = __DIR__ . "/material-daten/akten.json";
$karteiDatei = __DIR__ . "/material-daten/foerderkartei.json";

if (!is_dir(dirname($kinderDatei))) mkdir(dirname($kinderDatei), 0775, true);
if (!file_exists($materialDatei)) file_put_contents($materialDatei, json_encode([]));
if (!file_exists($kinderDatei)) file_put_contents($kinderDatei, json_encode([]));

// Baut die Weiterleitungs-URL zurück zur Kind-Ansicht, dabei bleiben
// die aktuell gesetzten Filter (Bereich/Klasse) erhalten.
function kindUrl($kindCode){
    $params = ["kind" => $kindCode, "tab" => $_GET["tab"] ?? "heft"];
    if (!empty($_GET["filter_bereich"])) $params["filter_bereich"] = $_GET["filter_bereich"];
    if (!empty($_GET["filter_klasse"])) $params["filter_klasse"] = $_GET["filter_klasse"];
    return "trainingshefte.php?" . http_build_query($params);
}

function ladeJson($datei){
    $inhalt = file_get_contents($datei);
    $daten = json_decode($inhalt, true);
    return is_array($daten) ? $daten : [];
}

function speichereJson($datei, $daten){
    $fp = fopen($datei, "c+");
    flock($fp, LOCK_EX);
    ftruncate($fp, 0);
    fwrite($fp, json_encode(array_values($daten), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    flock($fp, LOCK_UN);
    fclose($fp);
}

$BEREICHE = [
    "aufmerksamkeit" => "Aufmerksamkeit/Konzentration",
    "optdiff"        => "Optische Differenzierung",
    "optged"         => "Optisches Gedächtnis",
    "optser"         => "Optische Serialität",
    "akdiff"         => "Akustische Differenzierung",
    "akged"          => "Akustisches Gedächtnis",
    "akser"          => "Akustische Serialität",
    "koerper"        => "Körperschema",
    "raum"           => "Raumorientierung",
    "foerderplan"    => "Förderpläne & Stunden",
    "symptom"        => "Symptomtraining",
    "sozialtraining" => "Sozialtraining",
    "sonstiges"      => "Sonstiges",
];

// ---------------------------
// Neues Kind anlegen
// ---------------------------

$fehler = [];

if ($_SERVER["REQUEST_METHOD"] === "POST" && ($_POST["aktion"] ?? "") === "kind_anlegen") {
    $code = trim($_POST["code"] ?? "");
    if ($code === "") {
        $fehler[] = "Bitte ein Kürzel eingeben.";
    } else {
        $kinder = ladeJson($kinderDatei);
        $existiert = false;
        foreach ($kinder as $k) if ($k["code"] === $code) $existiert = true;
        if ($existiert) {
            $fehler[] = "Dieses Kürzel gibt es schon.";
        } else {
            $kinder[] = ["code" => $code, "hefte" => []];
            speichereJson($kinderDatei, $kinder);
            header("Location: trainingshefte.php?kind=" . urlencode($code));
            exit;
        }
    }
}

// ---------------------------
// Kind löschen
// ---------------------------

if (isset($_GET["kind_loeschen"])) {
    $kinder = ladeJson($kinderDatei);
    $kinder = array_filter($kinder, fn($k) => $k["code"] !== $_GET["kind_loeschen"]);
    speichereJson($kinderDatei, $kinder);
    $akten = json_decode((string)@file_get_contents($aktenDatei), true);
    if (is_array($akten) && isset($akten[$_GET["kind_loeschen"]])) {
        unset($akten[$_GET["kind_loeschen"]]);
        file_put_contents($aktenDatei, json_encode((object)$akten, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    }
    header("Location: trainingshefte.php");
    exit;
}

// ---------------------------
// Material zuweisen / entfernen
// ---------------------------

if (isset($_GET["zuweisen"]) && isset($_GET["kind"])) {
    $kinder = ladeJson($kinderDatei);
    foreach ($kinder as &$k) {
        if ($k["code"] === $_GET["kind"]) {
            $schonDrin = false;
            foreach ($k["hefte"] as $h) if ($h["material_id"] === $_GET["zuweisen"]) $schonDrin = true;
            if (!$schonDrin) {
                $k["hefte"][] = ["material_id" => $_GET["zuweisen"], "zugewiesen_am" => date("Y-m-d")];
            }
        }
    }
    unset($k);
    speichereJson($kinderDatei, $kinder);
    header("Location: " . kindUrl($_GET["kind"]));
    exit;
}

if (isset($_GET["zuweisen_bulk"]) && isset($_GET["kind"])) {
    $idListe = array_filter(explode(",", $_GET["zuweisen_bulk"]));
    $kinder = ladeJson($kinderDatei);
    foreach ($kinder as &$k) {
        if ($k["code"] === $_GET["kind"]) {
            $bereitsDrin = array_column($k["hefte"], "material_id");
            foreach ($idListe as $matId) {
                if (!in_array($matId, $bereitsDrin, true)) {
                    $k["hefte"][] = ["material_id" => $matId, "zugewiesen_am" => date("Y-m-d")];
                    $bereitsDrin[] = $matId;
                }
            }
        }
    }
    unset($k);
    speichereJson($kinderDatei, $kinder);
    header("Location: " . kindUrl($_GET["kind"]));
    exit;
}

if (isset($_GET["entfernen"]) && isset($_GET["kind"])) {
    $kinder = ladeJson($kinderDatei);
    foreach ($kinder as &$k) {
        if ($k["code"] === $_GET["kind"]) {
            $k["hefte"] = array_values(array_filter($k["hefte"], fn($h) => $h["material_id"] !== $_GET["entfernen"]));
        }
    }
    unset($k);
    speichereJson($kinderDatei, $kinder);
    header("Location: " . kindUrl($_GET["kind"]));
    exit;
}

// ---------------------------
// Daten für Anzeige
// ---------------------------

$alleKinder = ladeJson($kinderDatei);
$alleMaterialien = ladeJson($materialDatei);
$aktuellesKind = $_GET["kind"] ?? null;

$kindDaten = null;
if ($aktuellesKind) {
    foreach ($alleKinder as $k) if ($k["code"] === $aktuellesKind) $kindDaten = $k;
}

$zugewieseneIds = $kindDaten ? array_column($kindDaten["hefte"], "material_id") : [];

$filterBereich = $_GET["filter_bereich"] ?? "";
$filterKlasse = $_GET["filter_klasse"] ?? "";

$verfuegbar = array_filter($alleMaterialien, function ($m) use ($zugewieseneIds, $filterBereich, $filterKlasse) {
    if (in_array($m["id"], $zugewieseneIds, true)) return false;
    if ($filterBereich !== "" && $m["bereich"] !== $filterBereich) return false;
    if ($filterKlasse !== "" && $m["klasse"] !== $filterKlasse && $m["klasse"] !== "alle") return false;
    return true;
});

$materialById = [];
foreach ($alleMaterialien as $m) $materialById[$m["id"]] = $m;

$BILD_TYPEN = ["jpg","jpeg","png","gif"];
$DATEI_ICONS = [
    "doc" => ["fa-file-word", "#2b579a"], "docx" => ["fa-file-word", "#2b579a"],
    "ppt" => ["fa-file-powerpoint", "#d24726"], "pptx" => ["fa-file-powerpoint", "#d24726"],
    "xls" => ["fa-file-excel", "#217346"], "xlsx" => ["fa-file-excel", "#217346"],
];

function renderMatThumb($m, $BILD_TYPEN, $DATEI_ICONS){
    $endung = strtolower(pathinfo($m["gespeichert_als"], PATHINFO_EXTENSION));
    $pfad = "material-dateien/" . htmlspecialchars($m["gespeichert_als"]);

    if (in_array($endung, $BILD_TYPEN, true)) {
        return '<div class="mat-thumb" data-typ="bild" data-datei="' . $pfad . '"><img src="' . $pfad . '" alt=""></div>';
    }
    if ($endung === "pdf") {
        return '<div class="mat-thumb" data-typ="pdf" data-datei="' . $pfad . '"><i class="fa-solid fa-file-pdf" style="color:#c0392b;"></i></div>';
    }
    $icon = $DATEI_ICONS[$endung] ?? ["fa-file", "#999"];
    return '<div class="mat-thumb" data-typ="sonstiges"><i class="fa-solid ' . $icon[0] . '" style="color:' . $icon[1] . ';"></i></div>';
}

// ---------------------------
// Kinder-Akte: Förderplan, Stunden, Lernbox
// ---------------------------
$TABS = ["uebersicht" => ["Übersicht", "fa-house"], "plan" => ["Förderplan", "fa-compass"], "heft" => ["Trainingsheft", "fa-book-bookmark"], "kartei" => ["Lernbox & Verlauf", "fa-box-archive"], "stunden" => ["Stunden", "fa-calendar-check"]];
$tab = isset($TABS[$_GET["tab"] ?? ""]) ? $_GET["tab"] : "uebersicht";
$akte = ["klasse" => "", "plan" => [], "erledigt" => (object)[], "stunden" => []];
$kartei = ["woerter" => [], "verlauf" => []];
if ($kindDaten) {
    $alleAkten = json_decode((string)@file_get_contents($aktenDatei), true);
    if (is_array($alleAkten) && isset($alleAkten[$aktuellesKind])) $akte = array_merge($akte, $alleAkten[$aktuellesKind]);
    $akte["erledigt"] = (object)($akte["erledigt"] ?? []);
    $akte["plan"] = array_merge(["von" => "", "bis" => "", "f" => [], "r" => [], "ziele" => [], "notiz" => "", "geaendert" => ""], (array)$akte["plan"]);
    $alleKartei = json_decode((string)@file_get_contents($karteiDatei), true);
    if (is_array($alleKartei) && isset($alleKartei[$aktuellesKind])) $kartei = array_merge($kartei, $alleKartei[$aktuellesKind]);
}
$erledigtIds = array_keys((array)$akte["erledigt"]);
$heftAnzahl = $kindDaten ? count(array_filter($kindDaten["hefte"], fn($h) => isset($materialById[$h["material_id"]]))) : 0;
$heftErledigt = $kindDaten ? count(array_filter($kindDaten["hefte"], fn($h) => isset($materialById[$h["material_id"]]) && in_array($h["material_id"], $erledigtIds, true))) : 0;
function tabUrl($kind, $tab){ return "trainingshefte.php?" . http_build_query(["kind" => $kind, "tab" => $tab]); }
function h($s){ return htmlspecialchars((string)$s, ENT_QUOTES, "UTF-8"); }
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= $kindDaten ? h($aktuellesKind) . " · " : "" ?>Kinder-Akten · Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="rs-einordnung.js"></script>

<style>

:root{
    --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4;
    --karte:#ffffff; --text:#1f2d36; --schatten:0 6px 24px rgba(22,50,74,.1);
}
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; line-height:1.5; }
.wrap{ width:min(1150px,95%); margin:30px auto 70px; }
.zurueck{ display:inline-block; margin-bottom:18px; color:#7c8a94; font-weight:800; font-size:13px; text-decoration:none; }
header.kopf{ background:linear-gradient(135deg, var(--nacht), var(--meer)); border-radius:24px; color:white; padding:26px 32px; box-shadow:var(--schatten); margin-bottom:20px; }
header.kopf h1{ font-size:30px; font-weight:900; margin:0 0 4px; }
header.kopf p{ font-size:14px; opacity:.9; font-weight:700; margin:0; }

.hinweis{ background:#fff8e6; border:2px solid var(--gold); border-radius:16px; padding:10px 18px; font-size:13px; font-weight:700; color:#7a5d00; margin-bottom:20px; display:flex; gap:10px; align-items:center; }

.karte{ background:var(--karte); border-radius:24px; box-shadow:var(--schatten); padding:24px; margin-bottom:20px; }
.karte h2{ font-size:20px; font-weight:900; margin:0 0 4px; }

label{ display:block; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.4px; color:#7c8a94; margin:12px 0 4px; }
input[type="text"], select{ width:100%; border:2px solid #ececec; border-radius:12px; padding:9px 14px; font-family:"Nunito",sans-serif; font-size:14px; font-weight:700; color:var(--text); }

.btn{ border:none; border-radius:999px; padding:11px 24px; margin-top:16px; font-family:"Nunito",sans-serif; font-weight:800; font-size:14px; cursor:pointer; color:white; background:var(--nacht); transition:.15s; }
.btn:hover{ background:var(--gold); color:var(--nacht); }
.btn.klein{ padding:6px 14px; font-size:12px; margin-top:0; }

.fehler{ background:#fdeceb; color:#b3382f; border:2px solid #f3c4c0; border-radius:12px; padding:10px 16px; font-size:13px; font-weight:700; margin-bottom:12px; }

.kinder-liste{ display:flex; gap:10px; flex-wrap:wrap; }
.kind-chip{ display:inline-flex; align-items:center; gap:8px; background:white; border:2px solid #ececec; border-radius:999px; padding:8px 16px; font-weight:800; text-decoration:none; color:var(--text); box-shadow:var(--schatten); }
.kind-chip.aktiv{ border-color:var(--nacht); background:#eef4f8; color:var(--nacht); }
.kind-chip i.loeschen{ color:#c0392b; opacity:.6; cursor:pointer; }
.kind-chip i.loeschen:hover{ opacity:1; }

.spalten{ display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:start; }
@media (max-width:900px){ .spalten{ grid-template-columns:1fr; } }

.filter-leiste{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:14px; }
.filter-leiste select{ width:auto; min-width:150px; }

.mat-liste{ display:flex; flex-direction:column; gap:10px; }
.mat-karte{ background:white; border-radius:14px; box-shadow:var(--schatten); padding:14px 16px; display:flex; justify-content:space-between; align-items:center; gap:10px; }
.mat-hauptzeile{ display:flex; align-items:center; gap:12px; flex:1; min-width:0; }

.mat-thumb{
    width:42px; height:56px; flex:none; border-radius:7px; overflow:hidden;
    background:#f4f6f8; border:1px solid #e4e8ec; display:flex; align-items:center; justify-content:center;
    position:relative; z-index:1; cursor:zoom-in;
}
.mat-thumb img, .mat-thumb canvas{ width:100%; height:100%; object-fit:cover; display:block; }
.mat-thumb i{ font-size:18px; }
.mat-thumb:hover{ overflow:visible; z-index:50; }
.mat-thumb:hover img, .mat-thumb:hover canvas{
    position:absolute; top:50%; left:0; width:360px; height:auto; max-height:80vh;
    transform:translateY(-50%); object-fit:contain; box-shadow:0 16px 48px rgba(0,0,0,.4);
    border-radius:8px; background:white; border:1px solid #ddd;
}
.mat-karte h4{ margin:0 0 4px; font-size:14px; font-weight:900; }
.mat-karte .mat-meta{ font-size:11px; color:#7c8a94; font-weight:700; }
.mat-karte a.btn-zuweisen{ font-size:12px; font-weight:800; color:white; background:var(--nacht); border-radius:999px; padding:6px 14px; text-decoration:none; white-space:nowrap; }
.mat-karte a.btn-entfernen{ font-size:12px; font-weight:800; color:#c0392b; text-decoration:none; white-space:nowrap; }

.leer{ text-align:center; padding:30px; color:#a0a0a0; font-weight:700; font-size:13px; }

/* ---------- Kinder-Akte ---------- */
.akte-kopf{ display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:14px; }
.akte-kopf h2{ font-size:26px; margin:0; }
.akte-kopf .klasse{ display:flex; align-items:center; gap:8px; font-size:13px; font-weight:800; color:#7c8a94; }
.akte-kopf .klasse select{ width:auto; padding:6px 10px; }
.reiter{ display:flex; gap:6px; flex-wrap:wrap; margin-bottom:20px; }
.reiter a{ display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:999px; background:white; box-shadow:var(--schatten); color:var(--text); font-weight:800; font-size:14px; text-decoration:none; }
.reiter a.aktiv{ background:var(--nacht); color:white; }
.reiter a .zahl{ background:#eef4f8; color:var(--nacht); border-radius:999px; padding:0 8px; font-size:12px; }
.reiter a.aktiv .zahl{ background:rgba(255,255,255,.2); color:white; }
.kacheln{ display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:18px; }
.kachel{ background:white; border-radius:22px; box-shadow:var(--schatten); padding:20px 22px; display:flex; flex-direction:column; gap:10px; }
.kachel h3{ margin:0; font-size:16px; font-weight:900; display:flex; align-items:center; gap:8px; color:var(--nacht); }
.kachel h3 i{ color:var(--meer); }
.kachel .gross{ font-size:30px; font-weight:900; color:var(--nacht); line-height:1; }
.kachel .klein{ font-size:13px; color:#7c8a94; font-weight:700; }
.kachel .aktionen{ margin-top:auto; display:flex; gap:8px; flex-wrap:wrap; }
.knopf{ display:inline-flex; align-items:center; gap:7px; border:0; border-radius:999px; padding:8px 15px; font:800 13px "Nunito",sans-serif; text-decoration:none; cursor:pointer; background:#eef4f8; color:var(--nacht); }
.knopf.voll{ background:var(--nacht); color:white; }
.knopf.gold{ background:var(--gold); color:var(--nacht); }
.knopf:hover{ filter:brightness(.95); }
.balken{ height:10px; background:#eef1f4; border-radius:999px; overflow:hidden; }
.balken > span{ display:block; height:100%; background:linear-gradient(90deg, var(--meer), #6bcb77); border-radius:999px; }
.sp-chips{ display:flex; flex-wrap:wrap; gap:6px; }
.sp-chip{ font-size:12px; font-weight:800; padding:4px 10px; border-radius:999px; background:#eef4f8; color:var(--nacht); }
.sp-chip.rs{ background:#fff3dc; color:#7a5200; }
.leer-text{ font-size:13px; color:#a0a7ad; font-weight:700; }
/* Förderplan */
.plan-raster{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:14px; }
@media (max-width:760px){ .plan-raster{ grid-template-columns:1fr; } }
input[type=date], input[type=number], textarea{ width:100%; border:2px solid #ececec; border-radius:12px; padding:9px 12px; font:700 14px "Nunito",sans-serif; color:var(--text); }
textarea{ resize:vertical; min-height:62px; font-weight:600; }
.wahl-chips{ display:flex; flex-wrap:wrap; gap:8px; }
.wahl-chips label{ margin:0; text-transform:none; letter-spacing:0; display:inline-flex; align-items:center; gap:6px; background:#f4f6f8; border:2px solid #e4e8ec; border-radius:999px; padding:6px 12px; font-size:13px; font-weight:800; color:var(--text); cursor:pointer; }
.wahl-chips label.an{ background:#eef4f8; border-color:var(--meer); color:var(--nacht); }
.wahl-chips input{ display:none; }
.ziel{ border:2px solid #e9edf1; border-radius:18px; padding:14px 16px; display:grid; grid-template-columns:200px 1fr 1fr; gap:10px 14px; align-items:start; position:relative; }
@media (max-width:860px){ .ziel{ grid-template-columns:1fr; } }
.ziel .unten{ grid-column:1 / -1; display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
.ziel .unten select, .ziel .unten input{ width:auto; }
.ziel .weg{ position:absolute; top:8px; right:10px; background:none; border:0; color:#c0392b; cursor:pointer; font-size:16px; opacity:.6; }
.stand-offen{ border-left:6px solid #d5dbe1; } .stand-teilweise{ border-left:6px solid var(--gold); } .stand-erreicht{ border-left:6px solid #3aa35b; }
.speicher-leiste{ position:sticky; bottom:12px; background:var(--nacht); color:white; border-radius:18px; padding:12px 18px; display:flex; align-items:center; gap:12px; flex-wrap:wrap; box-shadow:0 10px 30px rgba(22,50,74,.35); z-index:20; }
.speicher-leiste .status{ font-size:13px; font-weight:700; opacity:.9; }
/* Stunden */
.stunde{ border:2px solid #e9edf1; border-radius:18px; padding:14px 16px; display:grid; grid-template-columns:150px 1fr; gap:6px 16px; }
@media (max-width:700px){ .stunde{ grid-template-columns:1fr; } }
.stunde .datum{ font-weight:900; color:var(--nacht); }
.stunde .dauer{ font-size:12px; color:#7c8a94; font-weight:800; }
.stunde .inhalt{ font-size:14px; white-space:pre-line; }
.erledigt-box{ display:flex; align-items:center; gap:6px; font-size:12px; font-weight:800; color:#3aa35b; cursor:pointer; white-space:nowrap; }
.erledigt-box input{ width:18px; height:18px; accent-color:#3aa35b; }
.mat-karte.erledigt{ opacity:.6; }
.mat-karte.erledigt h4{ text-decoration:line-through; }
.gruppe-titel{ font-size:12px; font-weight:900; color:var(--meer); text-transform:uppercase; letter-spacing:.4px; margin:10px 0 2px; }
.fach-reihe{ display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; }
.fach-reihe div{ background:#f4f6f8; border-radius:12px; text-align:center; padding:8px 4px; font-size:11px; font-weight:800; color:#7c8a94; }
.fach-reihe b{ display:block; font-size:22px; color:var(--nacht); }
.verlauf-tab{ width:100%; border-collapse:collapse; font-size:14px; }
.verlauf-tab th, .verlauf-tab td{ text-align:left; padding:7px 8px; border-bottom:1px solid #edf1f4; }
/* Druck: nur der Förderplan */
#druck-plan{ display:none; }
@media print{
    body{ background:white; }
    body > .wrap{ display:none !important; }
    #druck-plan{ display:block; font-family:"Nunito",sans-serif; color:#1E2A36; font-size:12.5px; }
    @page{ size:A4; margin:14mm 14mm 16mm; }
}
.dp-kopf{ display:flex; justify-content:space-between; align-items:flex-end; border-bottom:3px solid #16324a; padding-bottom:8px; margin-bottom:12px; }
.dp-kopf h1{ font-size:22px; margin:0; }
.dp-felder{ display:grid; grid-template-columns:repeat(2, 1fr); gap:6px 24px; margin-bottom:12px; }
.dp-felder span{ display:inline-block; min-width:150px; border-bottom:1px solid #444; }
.dp-tab{ width:100%; border-collapse:collapse; margin:8px 0 12px; }
.dp-tab th, .dp-tab td{ border:1px solid #9aa7b4; padding:6px 7px; vertical-align:top; text-align:left; }
.dp-tab th{ background:#eef2f6; font-size:11.5px; }
.dp-unterschriften{ display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; margin-top:34px; }
.dp-unterschriften div{ border-top:1px solid #444; padding-top:4px; font-size:11px; color:#555; }
</style>
</head>
<body>

<div class="wrap">

<a href="index.php" class="zurueck"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>

<header class="kopf">
<h1><i class="fa-solid fa-folder-open"></i> Kinder-Akten</h1>
<p>Förderplan, Trainingsheft, Lernbox und Stunden – alles zu einem Kürzel an einem Ort</p>
</header>

<div class="hinweis">
<i class="fa-solid fa-lock"></i>
Bitte hier <strong>keine echten Namen</strong> eintragen — nur ein Kürzel/Code, dessen Zuordnung du offline führst.
</div>

<div class="karte">
    <?php foreach ($fehler as $f): ?><div class="fehler"><?= h($f) ?></div><?php endforeach; ?>
    <div class="kinder-liste" style="margin-bottom:14px;">
        <?php foreach ($alleKinder as $k): ?>
            <a href="<?= h(tabUrl($k["code"], $tab)) ?>" class="kind-chip <?= $aktuellesKind === $k["code"] ? "aktiv" : "" ?>">
                <?= h($k["code"]) ?>
                <i class="fa-solid fa-xmark loeschen" title="Akte löschen" onclick="event.preventDefault(); if(confirm('Akte <?= h($k["code"]) ?> mit Trainingsheft-Zuordnung, Förderplan und Stunden löschen?\n(Das Material selbst und die Lernbox bleiben erhalten.)')) location.href='?kind_loeschen=<?= urlencode($k["code"]) ?>'"></i>
            </a>
        <?php endforeach; ?>
        <?php if (empty($alleKinder)): ?><span class="leer-text">Noch keine Kinder angelegt.</span><?php endif; ?>
    </div>
    <form method="POST" style="display:flex; gap:10px; align-items:flex-end; max-width:460px;">
        <input type="hidden" name="aktion" value="kind_anlegen">
        <div style="flex:1;"><label style="margin-top:0;">Neues Kürzel</label><input type="text" name="code" placeholder="z.B. 3b-07"></div>
        <button type="submit" class="btn" style="margin-top:0;"><i class="fa-solid fa-plus"></i> Anlegen</button>
    </form>
</div>

<?php if ($kindDaten): ?>

<div class="akte-kopf">
    <h2><i class="fa-solid fa-user-graduate" style="color:var(--meer);"></i> <?= h($aktuellesKind) ?></h2>
    <div class="klasse">Klasse
        <select id="akte-klasse" onchange="akte_klasse(this.value)">
            <option value="">–</option>
            <?php for ($k = 1; $k <= 8; $k++): ?><option value="<?= $k ?>" <?= (string)$akte["klasse"] === (string)$k ? "selected" : "" ?>><?= $k ?></option><?php endfor; ?>
        </select>
    </div>
</div>

<nav class="reiter">
    <?php foreach ($TABS as $key => [$titel, $icon]):
        $zahl = $key === "heft" ? $heftAnzahl : ($key === "stunden" ? count($akte["stunden"]) : ($key === "kartei" ? count(array_filter($kartei["woerter"], fn($w) => ($w["fach"] ?? 1) < 5)) : null)); ?>
        <a href="<?= h(tabUrl($aktuellesKind, $key)) ?>" class="<?= $tab === $key ? "aktiv" : "" ?>"><i class="fa-solid <?= $icon ?>"></i> <?= $titel ?><?= $zahl ? ' <span class="zahl">' . $zahl . '</span>' : "" ?></a>
    <?php endforeach; ?>
</nav>

<?php if ($tab === "uebersicht"):
    $plan = $akte["plan"];
    $ziele = $plan["ziele"] ?? [];
    $zErreicht = count(array_filter($ziele, fn($z) => ($z["stand"] ?? "") === "erreicht"));
    $offen = array_filter($kartei["woerter"], fn($w) => ($w["fach"] ?? 1) < 5);
    $letzteStunden = array_slice($akte["stunden"], 0, 3);
?>
<div class="kacheln">
    <div class="kachel">
        <h3><i class="fa-solid fa-compass"></i> Förderplan</h3>
        <?php if (!$plan["f"] && !$plan["r"] && !$ziele): ?>
            <p class="leer-text" style="margin:0;">Noch kein Förderplan. Lege die Schwerpunkte fest – oder übernimm sie aus dem Gutachten über den Generator.</p>
        <?php else: ?>
            <div class="klein"><?= $plan["von"] ? "Zeitraum " . h(date("d.m.Y", strtotime($plan["von"]))) . ($plan["bis"] ? " – " . h(date("d.m.Y", strtotime($plan["bis"]))) : "") : "Zeitraum noch offen" ?></div>
            <div class="sp-chips" id="ue-chips"></div>
            <?php if ($ziele): ?>
                <div class="klein"><?= $zErreicht ?> von <?= count($ziele) ?> Zielen erreicht</div>
                <div class="balken"><span style="width:<?= round($zErreicht / max(1, count($ziele)) * 100) ?>%;"></span></div>
            <?php endif; ?>
        <?php endif; ?>
        <div class="aktionen"><a class="knopf voll" href="<?= h(tabUrl($aktuellesKind, "plan")) ?>"><i class="fa-solid fa-pen"></i> Förderplan bearbeiten</a></div>
    </div>
    <div class="kachel">
        <h3><i class="fa-solid fa-book-bookmark"></i> Trainingsheft</h3>
        <div class="gross"><?= $heftErledigt ?> <span style="font-size:16px; color:#7c8a94;">/ <?= $heftAnzahl ?> bearbeitet</span></div>
        <div class="balken"><span style="width:<?= round($heftErledigt / max(1, $heftAnzahl) * 100) ?>%;"></span></div>
        <div class="aktionen">
            <a class="knopf gold" href="lrs.php?paket=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-wand-magic-sparkles"></i> Förderpaket erzeugen</a>
            <a class="knopf" href="<?= h(tabUrl($aktuellesKind, "heft")) ?>"><i class="fa-solid fa-plus"></i> Material zuweisen</a>
        </div>
    </div>
    <div class="kachel">
        <h3><i class="fa-solid fa-box-archive"></i> Lernbox & Verlauf</h3>
        <div class="gross"><?= count($offen) ?> <span style="font-size:16px; color:#7c8a94;">Wörter in Arbeit</span></div>
        <div class="klein"><?= count($kartei["woerter"]) - count($offen) ?> Wörter sicher (Fach 5) · <?= count($kartei["verlauf"]) ?> Verlaufseinträge</div>
        <div class="aktionen"><a class="knopf" href="foerderkartei.php?kind=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-arrow-up-right-from-square"></i> Lernbox öffnen</a></div>
    </div>
    <div class="kachel">
        <h3><i class="fa-solid fa-calendar-check"></i> Stunden</h3>
        <?php if (!$letzteStunden): ?><p class="leer-text" style="margin:0;">Noch keine Stunde eingetragen.</p><?php endif; ?>
        <?php foreach ($letzteStunden as $st): ?>
            <div class="klein" style="color:var(--text);"><b><?= h(date("d.m.Y", strtotime($st["datum"]))) ?></b> · <?= h(mb_strimwidth(str_replace("\n", " · ", $st["inhalt"]), 0, 80, "…")) ?></div>
        <?php endforeach; ?>
        <div class="aktionen">
            <a class="knopf voll" href="lrs.php?stunde=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-layer-group"></i> Stunde planen</a>
            <a class="knopf" href="<?= h(tabUrl($aktuellesKind, "stunden")) ?>">Alle Stunden</a>
        </div>
    </div>
</div>

<?php elseif ($tab === "plan"): ?>
<div class="karte">
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
        <div>
            <h2>Förderplan</h2>
            <p class="klein" style="margin:0; color:#7c8a94; font-weight:700;">Schwerpunkte, Ziele und Maßnahmen. Tipp: Im Gutachten „Förderplan im Generator öffnen“ und dort „Für <?= h($aktuellesKind) ?> speichern“ – dann sind die Schwerpunkte schon gesetzt.</p>
        </div>
        <button class="knopf" onclick="plan_drucken()"><i class="fa-solid fa-print"></i> Förderplan drucken</button>
    </div>
    <div class="plan-raster" style="margin-top:14px;">
        <div><label>Zeitraum von</label><input type="date" id="p-von"></div>
        <div><label>bis</label><input type="date" id="p-bis"></div>
        <div><label>Zuletzt geändert</label><div id="p-geaendert" style="font-weight:800; padding:10px 0;">–</div></div>
    </div>
    <label style="margin-top:18px;">Funktionsbereiche (AFS)</label>
    <div class="wahl-chips" id="p-f"></div>
    <label style="margin-top:14px;">Rechtschreib-Schwerpunkte</label>
    <div class="wahl-chips" id="p-r"></div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:22px; gap:10px; flex-wrap:wrap;">
        <h2 style="font-size:18px;">Ziele & Maßnahmen</h2>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="knopf" onclick="plan_vorschlaege()"><i class="fa-solid fa-lightbulb"></i> Ziele zu den Schwerpunkten vorschlagen</button>
            <button class="knopf" onclick="plan_zielNeu()"><i class="fa-solid fa-plus"></i> Eigenes Ziel</button>
        </div>
    </div>
    <div id="p-ziele" style="display:flex; flex-direction:column; gap:12px; margin-top:12px;"></div>

    <label style="margin-top:18px;">Notizen (Absprachen, Rahmenbedingungen, Nachteilsausgleich …)</label>
    <textarea id="p-notiz" rows="4"></textarea>
</div>
<div class="speicher-leiste">
    <button class="knopf gold" onclick="plan_speichern()"><i class="fa-solid fa-floppy-disk"></i> Förderplan speichern</button>
    <a class="knopf" href="lrs.php?paket=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-wand-magic-sparkles"></i> Passendes Förderpaket erzeugen</a>
    <span class="status" id="p-status">Änderungen werden erst mit „Speichern“ übernommen.</span>
</div>
<div id="druck-plan"></div>

<?php elseif ($tab === "heft"): ?>
<div class="spalten">
    <div class="karte">
        <h2>Verfügbares Material</h2>
        <form method="GET" class="filter-leiste">
            <input type="hidden" name="kind" value="<?= h($aktuellesKind) ?>">
            <input type="hidden" name="tab" value="heft">
            <select name="filter_bereich" onchange="this.form.submit()">
                <option value="">Alle Bereiche</option>
                <?php foreach ($BEREICHE as $wert => $label): ?><option value="<?= $wert ?>" <?= $filterBereich === $wert ? "selected" : "" ?>><?= $label ?></option><?php endforeach; ?>
            </select>
            <select name="filter_klasse" onchange="this.form.submit()">
                <option value="">Alle Klassen</option>
                <?php for ($k = 1; $k <= 8; $k++): ?><option value="<?= $k ?>" <?= $filterKlasse === (string)$k ? "selected" : "" ?>>Klasse <?= $k ?></option><?php endfor; ?>
            </select>
        </form>
        <div id="verf-bulk-leiste" style="display:none; align-items:center; gap:10px; background:#eef4f8; border-radius:14px; padding:10px 16px; margin-bottom:14px; flex-wrap:wrap;">
            <span id="verf-bulk-anzahl" style="font-weight:800; font-size:13px; color:var(--nacht);"></span>
            <button class="btn klein" onclick="bulkZuweisen()"><i class="fa-solid fa-plus"></i> Ausgewählte zuweisen</button>
            <button class="btn klein" style="background:#999;" onclick="verfAuswahlAufheben()">Auswahl aufheben</button>
        </div>
        <div class="mat-liste">
            <?php if (empty($verfuegbar)): ?><div class="leer">Kein weiteres Material für diese Auswahl — entweder schon alles zugewiesen oder noch nichts hochgeladen.</div><?php endif; ?>
            <?php foreach ($verfuegbar as $m): ?>
                <div class="mat-karte">
                    <div class="mat-hauptzeile">
                        <input type="checkbox" class="verf-checkbox" value="<?= h($m["id"]) ?>" onchange="verfCheckboxGeaendert()" style="width:18px; height:18px; flex:none;">
                        <?= renderMatThumb($m, $BILD_TYPEN, $DATEI_ICONS) ?>
                        <div><h4><?= h($m["titel"]) ?></h4><div class="mat-meta"><?= $BEREICHE[$m["bereich"]] ?? h($m["bereich"]) ?> · <?= $m["klasse"] === "alle" ? "Alle Klassen" : "Klasse " . h($m["klasse"]) ?></div></div>
                    </div>
                    <a class="btn-zuweisen" href="?kind=<?= urlencode($aktuellesKind) ?>&tab=heft&zuweisen=<?= urlencode($m["id"]) ?>"><i class="fa-solid fa-plus"></i> Zuweisen</a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="karte">
        <h2>Im Trainingsheft (<?= $heftErledigt ?>/<?= $heftAnzahl ?> bearbeitet)</h2>
        <div class="balken" style="margin:8px 0 12px;"><span id="heft-balken" style="width:<?= round($heftErledigt / max(1, $heftAnzahl) * 100) ?>%;"></span></div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <?php if (!empty($kindDaten["hefte"])): ?><button class="btn" style="margin-top:0;" id="btn-heft-erstellen" onclick="erstelleTrainingsheft()"><i class="fa-solid fa-file-pdf"></i> Als ein PDF drucken</button><?php endif; ?>
            <a class="knopf gold" href="lrs.php?paket=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-wand-magic-sparkles"></i> Förderpaket erzeugen</a>
            <label style="margin:0; text-transform:none; letter-spacing:0; display:flex; gap:6px; align-items:center; font-size:13px;"><input type="checkbox" id="nur-offen" onchange="heft_filter()"> nur offene</label>
            <span id="heft-status" style="font-size:12px; color:#7c8a94; font-weight:700;"></span>
        </div>
        <div class="mat-liste" style="margin-top:14px;">
            <?php if (empty($kindDaten["hefte"])): ?><div class="leer">Diesem Kind ist noch nichts zugewiesen.</div><?php endif; ?>
            <?php
            // nach Bereich gruppiert, Bereiche in der Reihenfolge der Liste
            $gruppen = [];
            foreach ($kindDaten["hefte"] as $hh) { $m = $materialById[$hh["material_id"]] ?? null; if ($m) $gruppen[$m["bereich"]][] = [$hh, $m]; }
            uksort($gruppen, fn($a, $b) => array_search($a, array_keys($BEREICHE)) <=> array_search($b, array_keys($BEREICHE)));
            foreach ($gruppen as $bereich => $eintraege): ?>
                <div class="gruppe-titel"><?= $BEREICHE[$bereich] ?? h($bereich) ?></div>
                <?php foreach ($eintraege as [$hh, $m]): $fertig = in_array($m["id"], $erledigtIds, true); ?>
                    <div class="mat-karte <?= $fertig ? "erledigt" : "" ?>" data-id="<?= h($m["id"]) ?>">
                        <div class="mat-hauptzeile">
                            <?= renderMatThumb($m, $BILD_TYPEN, $DATEI_ICONS) ?>
                            <div><h4><?= h($m["titel"]) ?></h4><div class="mat-meta">zugewiesen am <?= h(date("d.m.Y", strtotime($hh["zugewiesen_am"]))) ?><?= $fertig ? " · bearbeitet am " . h(date("d.m.Y", strtotime(((array)$akte["erledigt"])[$m["id"]]))) : "" ?></div></div>
                        </div>
                        <label class="erledigt-box"><input type="checkbox" <?= $fertig ? "checked" : "" ?> onchange="heft_erledigt('<?= h($m["id"]) ?>', this)"> bearbeitet</label>
                        <a class="btn-entfernen" href="?kind=<?= urlencode($aktuellesKind) ?>&tab=heft&entfernen=<?= urlencode($m["id"]) ?>" onclick="return confirm('Zuweisung entfernen?')" title="Aus dem Heft entfernen"><i class="fa-solid fa-xmark"></i></a>
                    </div>
                <?php endforeach; ?>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<?php elseif ($tab === "kartei"):
    $faecher = [1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0];
    foreach ($kartei["woerter"] as $w) $faecher[max(1, min(5, (int)($w["fach"] ?? 1)))]++;
    $verlauf = array_reverse($kartei["verlauf"]);
?>
<div class="kacheln">
    <div class="kachel">
        <h3><i class="fa-solid fa-box-archive"></i> Lernbox</h3>
        <div class="fach-reihe"><?php foreach ($faecher as $f => $n): ?><div><b><?= $n ?></b>Fach <?= $f ?></div><?php endforeach; ?></div>
        <div class="klein">Fach 1 = neu/falsch · Fach 5 = sicher</div>
        <div class="aktionen">
            <a class="knopf voll" href="foerderkartei.php?kind=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-arrow-up-right-from-square"></i> Lernbox öffnen</a>
            <a class="knopf" href="lrs.php?kartei=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-wand-magic-sparkles"></i> Blätter mit diesen Wörtern</a>
        </div>
    </div>
    <div class="kachel" style="grid-column:span 2;">
        <h3><i class="fa-solid fa-chart-line"></i> Lernverlauf</h3>
        <?php if (!$verlauf): ?><p class="leer-text" style="margin:0;">Noch keine Einträge. Werte trägst du in der Lernbox unter „Lernverlauf“ ein.</p>
        <?php else: ?>
        <table class="verlauf-tab"><tr><th>Datum</th><th>Diktat</th><th>Zahlentafel</th><th>Notiz</th></tr>
            <?php foreach (array_slice($verlauf, 0, 8) as $v): ?>
                <tr><td><?= h(date("d.m.Y", strtotime($v["datum"]))) ?></td>
                    <td><?= $v["diktat_fehler"] !== null ? h($v["diktat_fehler"]) . " Fehler" . ($v["diktat_woerter"] ? " / " . h($v["diktat_woerter"]) . " Wörter" : "") : "–" ?></td>
                    <td><?= $v["zahlentafel"] !== null ? h($v["zahlentafel"]) . " Sek." : "–" ?></td><td><?= h($v["notiz"] ?? "") ?></td></tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
        <div class="aktionen"><a class="knopf" href="foerderkartei.php?kind=<?= urlencode($aktuellesKind) ?>#verlauf">Verlauf mit Diagramm</a></div>
    </div>
</div>

<?php elseif ($tab === "stunden"): ?>
<div class="karte">
    <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
        <h2>Stunden</h2>
        <a class="knopf voll" href="lrs.php?stunde=<?= urlencode($aktuellesKind) ?>"><i class="fa-solid fa-layer-group"></i> Neue Stunde im Generator planen</a>
    </div>
    <p class="klein" style="margin:4px 0 14px; color:#7c8a94; font-weight:700;">Im Generator kannst du eine zusammengestellte Stunde mit einem Klick hier eintragen. Oder du trägst sie direkt hier ein.</p>
    <details style="margin-bottom:16px;">
        <summary class="knopf" style="list-style:none;"><i class="fa-solid fa-plus"></i> Stunde von Hand eintragen</summary>
        <div class="plan-raster" style="margin-top:12px;">
            <div><label>Datum</label><input type="date" id="s-datum" value="<?= date("Y-m-d") ?>"></div>
            <div><label>Dauer (Minuten)</label><input type="number" id="s-dauer" value="40" min="5" max="240"></div>
        </div>
        <label>Inhalte</label><textarea id="s-inhalt" placeholder="z. B. Zahlentafel · Schärfung: Lückenwörter · Lernbox"></textarea>
        <label>Beobachtung</label><textarea id="s-beob"></textarea>
        <button class="knopf voll" style="margin-top:10px;" onclick="stunde_neu()"><i class="fa-solid fa-floppy-disk"></i> Eintragen</button>
    </details>
    <div id="stunden-liste" style="display:flex; flex-direction:column; gap:12px;"></div>
</div>
<?php endif; ?>

<script>
const AKTE_KIND = <?= json_encode($aktuellesKind, JSON_UNESCAPED_UNICODE) ?>;
let AKTE = <?= json_encode($akte, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) ?>;
const AF_FUNKTIONEN = { aufmerksamkeit: "Aufmerksamkeit/Konzentration", optdiff: "Optische Differenzierung", optged: "Optisches Gedächtnis", optser: "Optische Serialität",
    akdiff: "Akustische Differenzierung", akged: "Akustisches Gedächtnis", akser: "Akustische Serialität", koerper: "Körperschema", raum: "Raumorientierung" };
const AF_WEITERE = { lesen: "Lesen", schreiben: "Schreiben/Abschreiben", sonstiges: "Sonstiges" };
const AF_RS = Object.fromEntries(Object.entries(typeof RS_NAMEN !== "undefined" ? RS_NAMEN : {}).filter(([k]) => k !== "sonstige").map(([k, v]) => [k, v.name]));
function af_name(k){ return AF_FUNKTIONEN[k] || AF_RS[k] || AF_WEITERE[k] || k; }
function af_esc(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function af_datum(d){ return d ? d.split("-").reverse().join(".") : ""; }

// Vorschläge: Ziel (was das Kind können soll) und Maßnahmen (wie wir es üben)
const AF_VORSCHLAG = {
    aufmerksamkeit: ["Das Kind lenkt seine Aufmerksamkeit gezielt auf eine Aufgabe und hält sie 10–15 Minuten.", "Zahlentafeln und Konzentrationsblätter auf Zeit, Regelwechsel, kurze Bewegungspausen; Zeiten im Verlauf festhalten."],
    optdiff: ["Ähnliche Buchstaben, Formen und Wortbilder werden sicher unterschieden (z. B. b/d, m/n).", "Formen-, Buchstaben- und Bilder-Detektiv, Wortpaare vergleichen, Fehler in der Reihe finden."],
    optged: ["Wortbilder und Formen werden kurz eingeprägt und sicher wiedergegeben.", "Merkspiele mit Bildern und Wörtern, „Was hat sich verändert?“, Wortbilder abdecken und aufschreiben."],
    optser: ["Reihenfolgen von Zeichen, Buchstaben und Bildern werden sicher erfasst und fortgesetzt.", "Muster und Bilderreihen fortsetzen, Buchstabensalat, Alphabet-Lücken, Punktebilder abzeichnen."],
    akdiff: ["Ähnlich klingende Laute und Silben werden sicher unterschieden (z. B. d/t, g/k, b/p).", "Minimalpaare, Anlaut-/Endlaut-Übungen, Buchstabenerarbeitung mit Lautgebärden."],
    akged: ["Gehörtes wird behalten und vollständig wiedergegeben (Wortfolgen, Sätze).", "Wortfolgen und Zahlenspannen merken, Satzgedächtnis, „Ich packe meinen Koffer“."],
    akser: ["Laut- und Silbenfolgen werden in der richtigen Reihenfolge erfasst.", "Silben schwingen, Laute in Reihenfolge legen, gehörte Reihenfolgen nachbauen."],
    koerper: ["Rechts und links am eigenen Körper werden sicher benannt.", "Körperübungen mit Seitenangabe, Zeigen und Benennen, Bewegungsanweisungen."],
    raum: ["Raumlage und Richtungen werden sicher erkannt (oben/unten, b/d, p/q).", "Spiegel-Detektiv, Raumlage-Blätter, Spiegelbild ergänzen, Labyrinth und Wege."],
    schaerfung: ["Nach kurzem Vokal wird der Konsonant verdoppelt (Schärfung).", "Silben schwingen, kurz/lang hören, Lückenwörter, Wörter sortieren, Fehlerdetektiv."],
    cktz: ["ck und tz werden nach kurzem Vokal richtig gesetzt, nach l, n, r nicht.", "Regelkarte, Wörter sortieren (ck/k, tz/z), Lückenwörter, Partnerdiktat."],
    dehnung: ["Häufige Wörter mit Dehnungs-h werden als Merkwörter sicher geschrieben.", "Merkwortkartei, Wortfamilien, Lückenwörter, Lernbox mit Dehnungs-h-Wörtern."],
    ie: ["Langes i wird als ie geschrieben (Ausnahmen als Merkwörter).", "Silben schwingen (lang/kurz), Wörter sortieren, Lückenwörter, Merkwörter mit i."],
    sss: ["s, ss und ß werden nach Vokallänge und Klang richtig gewählt.", "Vokallänge bestimmen, Wörter sortieren, Verlängern, Lückenwörter."],
    auslaut: ["Am Wortende wird durch Verlängern geprüft: b/p, d/t, g/k.", "Verlängerungsprobe üben (Hund → Hunde), Fehlerdetektiv, Wörter sortieren."],
    aeau: ["ä und äu werden durch Ableiten vom Stammwort gefunden.", "Ableitungsprobe (Bäume → Baum), Wortfamilien, Lückenwörter."],
    dasdass: ["das und dass werden mit der Ersatzprobe richtig unterschieden.", "Ersatzprobe (dieses/welches), Satzkarten sortieren, Lückensätze."],
    grossklein: ["Nomen werden mit der Artikelprobe erkannt und großgeschrieben.", "Artikelprobe, Nomen-Detektiv, Satzanfänge, Großschreibung im eigenen Text prüfen."],
    vf: ["Wörter mit v (ver-/vor-, Merkwörter) werden richtig geschrieben.", "Merkwortliste, Wortbausteine ver-/vor-, Lückenwörter."],
    doppelvokal: ["Wörter mit aa, ee, oo werden als Merkwörter sicher geschrieben.", "Merkwortkartei, Wortbilder einprägen, Lückenwörter."],
    iglich: ["Die Endungen -ig und -lich werden durch Verlängern richtig gesetzt.", "Verlängerungsprobe (lustig → lustiger), Wörter sortieren, Lückenwörter."],
    spst: ["sp und st am Wortanfang werden richtig geschrieben (nicht schp/scht).", "Hören und schreiben, Wörter sortieren, Wortbausteine."],
    silbenh: ["Das silbentrennende h wird durch Verlängern erkannt.", "Verlängern (Schuh → Schuhe), Silben schwingen, Lückenwörter."],
    chsx: ["Wörter mit chs, x und ks werden als Merkwörter sicher geschrieben.", "Merkwortkartei, Wortbilder, Lückenwörter."],
};

async function akte_api(daten){
    const r = await fetch("akte.php", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: AKTE_KIND, ...daten }) });
    const j = await r.json().catch(() => ({ ok: false, fehler: "Keine gültige Antwort vom Server. Liegt akte.php im Leuchtturm-Ordner?" }));
    if (!j.ok) throw new Error(j.fehler || "Fehler");
    AKTE = j.akte;
    return j;
}
async function akte_klasse(k){ try { await akte_api({ aktion: "klasse", klasse: k }); } catch (e){ alert(e.message); } }

/* --- Übersicht --- */
(function(){
    const el = document.getElementById("ue-chips");
    if (!el) return;
    el.innerHTML = [...(AKTE.plan.f || []).map(k => `<span class="sp-chip">${af_esc(af_name(k))}</span>`), ...(AKTE.plan.r || []).map(k => `<span class="sp-chip rs">${af_esc(af_name(k))}</span>`)].join("");
})();

/* --- Förderplan --- */
function plan_chips(id, namen, gewaehlt){
    const el = document.getElementById(id);
    el.innerHTML = Object.entries(namen).map(([k, n]) => `<label class="${gewaehlt.includes(k) ? "an" : ""}"><input type="checkbox" value="${k}" ${gewaehlt.includes(k) ? "checked" : ""}>${af_esc(n)}</label>`).join("");
    el.addEventListener("change", e => { e.target.closest("label").classList.toggle("an", e.target.checked); plan_geaendert(); });
}
function plan_gewaehlt(id){ return [...document.querySelectorAll(`#${id} input:checked`)].map(c => c.value); }
function plan_bereichOptionen(wert){
    const gruppen = [["Schwerpunkte dieses Plans", [...plan_gewaehlt("p-f"), ...plan_gewaehlt("p-r")]], ["Funktionsbereiche", Object.keys(AF_FUNKTIONEN)], ["Rechtschreibung", Object.keys(AF_RS)], ["Weitere", Object.keys(AF_WEITERE)]];
    return gruppen.map(([t, keys]) => keys.length ? `<optgroup label="${t}">${keys.map(k => `<option value="${k}" ${k === wert ? "selected" : ""}>${af_esc(af_name(k))}</option>`).join("")}</optgroup>` : "").join("");
}
function plan_zielHtml(z){
    return `<div class="ziel stand-${z.stand || "offen"}" data-id="${af_esc(z.id || "")}">
        <button class="weg" title="Ziel entfernen" onclick="this.closest('.ziel').remove(); plan_geaendert();"><i class="fa-solid fa-trash"></i></button>
        <div><label style="margin-top:0;">Bereich</label><select class="z-bereich">${plan_bereichOptionen(z.bereich)}</select></div>
        <div><label style="margin-top:0;">Ziel – das soll das Kind können</label><textarea class="z-ziel" rows="2">${af_esc(z.ziel)}</textarea></div>
        <div><label style="margin-top:0;">Maßnahmen – so üben wir</label><textarea class="z-massnahme" rows="2">${af_esc(z.massnahme)}</textarea></div>
        <div class="unten">
            <label style="margin:0;">Stand</label>
            <select class="z-stand" onchange="this.closest('.ziel').className = 'ziel stand-' + this.value">${["offen", "teilweise", "erreicht"].map(s => `<option ${s === (z.stand || "offen") ? "selected" : ""}>${s}</option>`).join("")}</select>
            <label style="margin:0 0 0 10px;">Überprüfung am</label><input type="date" class="z-pruefung" value="${af_esc(z.pruefung || "")}">
            <input type="text" class="z-beob" placeholder="Beobachtung zur Überprüfung" value="${af_esc(z.beobachtung || "")}" style="flex:1; min-width:200px;">
        </div>
    </div>`;
}
function plan_zieleLesen(){
    return [...document.querySelectorAll("#p-ziele .ziel")].map(z => ({
        id: z.dataset.id, bereich: z.querySelector(".z-bereich").value, ziel: z.querySelector(".z-ziel").value, massnahme: z.querySelector(".z-massnahme").value,
        stand: z.querySelector(".z-stand").value, pruefung: z.querySelector(".z-pruefung").value, beobachtung: z.querySelector(".z-beob").value,
    }));
}
function plan_zielNeu(z = { bereich: "sonstiges", ziel: "", massnahme: "", stand: "offen" }){
    document.getElementById("p-ziele").insertAdjacentHTML("beforeend", plan_zielHtml(z));
    plan_geaendert();
}
function plan_vorschlaege(){
    const vorhanden = new Set(plan_zieleLesen().map(z => z.bereich));
    const neu = [...plan_gewaehlt("p-f"), ...plan_gewaehlt("p-r")].filter(k => !vorhanden.has(k) && AF_VORSCHLAG[k]);
    if (!neu.length){ alert(plan_gewaehlt("p-f").length + plan_gewaehlt("p-r").length ? "Zu allen gewählten Schwerpunkten gibt es schon ein Ziel." : "Bitte zuerst oben Schwerpunkte auswählen."); return; }
    const bis = document.getElementById("p-bis").value;
    neu.forEach(k => plan_zielNeu({ bereich: k, ziel: AF_VORSCHLAG[k][0], massnahme: AF_VORSCHLAG[k][1], stand: "offen", pruefung: bis }));
    document.getElementById("p-status").textContent = `${neu.length} Ziele vorgeschlagen – du kannst sie anpassen. Speichern nicht vergessen!`;
}
let plan_ungespeichert = false;
function plan_geaendert(){ plan_ungespeichert = true; const st = document.getElementById("p-status"); if (st) st.textContent = "Ungespeicherte Änderungen."; }
async function plan_speichern(){
    const st = document.getElementById("p-status");
    st.textContent = "Wird gespeichert …";
    try {
        const j = await akte_api({ aktion: "plan_speichern", plan: { von: document.getElementById("p-von").value, bis: document.getElementById("p-bis").value,
            f: plan_gewaehlt("p-f"), r: plan_gewaehlt("p-r"), ziele: plan_zieleLesen(), notiz: document.getElementById("p-notiz").value } });
        plan_ungespeichert = false;
        st.textContent = "✅ " + j.meldung;
        document.getElementById("p-geaendert").textContent = af_datum(AKTE.plan.geaendert);
        // neue Ziele bekommen ihre feste ID vom Server
        const karten = document.querySelectorAll("#p-ziele .ziel");
        (AKTE.plan.ziele || []).forEach((z, i) => { if (karten[i]) karten[i].dataset.id = z.id; });
    } catch (e){ st.textContent = "⚠️ " + e.message; }
}
function plan_drucken(){
    const ziele = plan_zieleLesen().filter(z => z.ziel || z.massnahme);
    const klasse = document.getElementById("akte-klasse").value;
    const sp = [...plan_gewaehlt("p-f"), ...plan_gewaehlt("p-r")].map(af_name);
    const druck = document.getElementById("druck-plan");
    if (druck.parentElement !== document.body) document.body.appendChild(druck);
    druck.innerHTML = `
        <div class="dp-kopf"><h1>Förderplan Lese-Rechtschreib-Förderung</h1><div>Leuchtturm · AFS-Methode</div></div>
        <div class="dp-felder">
            <div>Name (handschriftlich): <span>&nbsp;</span></div><div>Kürzel: <b>${af_esc(AKTE_KIND)}</b></div>
            <div>Klasse: <b>${af_esc(klasse || "____")}</b></div><div>Zeitraum: <b>${af_datum(document.getElementById("p-von").value) || "________"} – ${af_datum(document.getElementById("p-bis").value) || "________"}</b></div>
        </div>
        <div><b>Förderschwerpunkte:</b> ${sp.length ? af_esc(sp.join(" · ")) : "–"}</div>
        <table class="dp-tab"><thead><tr><th style="width:17%;">Bereich</th><th style="width:28%;">Ziel</th><th style="width:30%;">Maßnahmen</th><th style="width:12%;">Überprüfung</th><th>Stand</th></tr></thead>
        <tbody>${ziele.map(z => `<tr><td>${af_esc(af_name(z.bereich))}</td><td>${af_esc(z.ziel)}</td><td>${af_esc(z.massnahme)}</td><td>${af_datum(z.pruefung)}</td><td>${af_esc(z.stand)}${z.beobachtung ? `<br><small>${af_esc(z.beobachtung)}</small>` : ""}</td></tr>`).join("") || `<tr><td colspan="5" style="height:120px;"></td></tr>`}</tbody></table>
        ${document.getElementById("p-notiz").value.trim() ? `<div><b>Notizen / Absprachen:</b><br>${af_esc(document.getElementById("p-notiz").value).replace(/\n/g, "<br>")}</div>` : ""}
        <div class="dp-unterschriften"><div>Datum, Legasthenietrainerin</div><div>Klassenlehrkraft</div><div>Erziehungsberechtigte</div></div>`;
    window.print();
}
if (document.getElementById("p-ziele")){
    const p = AKTE.plan;
    document.getElementById("p-von").value = p.von || "";
    document.getElementById("p-bis").value = p.bis || "";
    document.getElementById("p-notiz").value = p.notiz || "";
    document.getElementById("p-geaendert").textContent = p.geaendert ? af_datum(p.geaendert) : "noch nie";
    plan_chips("p-f", AF_FUNKTIONEN, p.f || []);
    plan_chips("p-r", AF_RS, p.r || []);
    document.getElementById("p-ziele").innerHTML = (p.ziele || []).map(plan_zielHtml).join("");
    document.querySelector(".wrap").addEventListener("input", e => { if (e.target.closest("#p-ziele, #p-notiz, #p-von, #p-bis")) plan_geaendert(); });
    window.addEventListener("beforeunload", e => { if (plan_ungespeichert){ e.preventDefault(); e.returnValue = ""; } });
}

/* --- Trainingsheft: bearbeitet abhaken --- */
async function heft_erledigt(id, cb){
    const karte = cb.closest(".mat-karte");
    try {
        await akte_api({ aktion: "erledigt", material_id: id, an: cb.checked });
        karte.classList.toggle("erledigt", cb.checked);
        const alle = document.querySelectorAll(".mat-karte[data-id]").length, fertig = document.querySelectorAll(".mat-karte[data-id].erledigt").length;
        document.getElementById("heft-balken").style.width = Math.round(fertig / Math.max(1, alle) * 100) + "%";
        heft_filter();
    } catch (e){ cb.checked = !cb.checked; alert(e.message); }
}
function heft_filter(){
    const nurOffen = document.getElementById("nur-offen") && document.getElementById("nur-offen").checked;
    document.querySelectorAll(".mat-karte[data-id]").forEach(k => k.style.display = nurOffen && k.classList.contains("erledigt") ? "none" : "");
}

/* --- Stunden --- */
function stunden_zeigen(){
    const el = document.getElementById("stunden-liste");
    if (!el) return;
    const liste = AKTE.stunden || [];
    el.innerHTML = liste.length ? liste.map(s => `<div class="stunde" data-id="${af_esc(s.id)}">
        <div><div class="datum">${af_datum(s.datum)}</div><div class="dauer">${s.dauer} Minuten</div>
            <button class="knopf" style="margin-top:8px; padding:5px 10px; font-size:12px; color:#c0392b; background:#fdeceb;" onclick="stunde_loeschen('${af_esc(s.id)}')"><i class="fa-solid fa-trash"></i></button></div>
        <div><div class="inhalt">${af_esc(s.inhalt) || '<span class="leer-text">ohne Inhaltsangabe</span>'}</div>
            <label>Beobachtung</label><textarea rows="2" onchange="stunde_beob('${af_esc(s.id)}', this.value)" placeholder="Wie lief die Stunde? (wird beim Verlassen des Feldes gespeichert)">${af_esc(s.beobachtung)}</textarea></div>
    </div>`).join("") : `<div class="leer">Noch keine Stunden eingetragen.</div>`;
}
async function stunde_neu(){
    try {
        await akte_api({ aktion: "stunde_hinzu", stunde: { datum: document.getElementById("s-datum").value, dauer: document.getElementById("s-dauer").value,
            inhalt: document.getElementById("s-inhalt").value, beobachtung: document.getElementById("s-beob").value } });
        document.getElementById("s-inhalt").value = ""; document.getElementById("s-beob").value = "";
        stunden_zeigen();
    } catch (e){ alert(e.message); }
}
async function stunde_beob(id, wert){ try { await akte_api({ aktion: "stunde_aendern", id, stunde: { beobachtung: wert } }); } catch (e){ alert(e.message); } }
async function stunde_loeschen(id){
    if (!confirm("Diese Stunde aus der Akte löschen?")) return;
    try { await akte_api({ aktion: "stunde_loeschen", id }); stunden_zeigen(); } catch (e){ alert(e.message); }
}
stunden_zeigen();
</script>

<?php if ($tab === "heft"): ?>
<script>
const HEFT_MATERIALIEN = <?php
    $heftDaten = [];
    foreach ($kindDaten["hefte"] ?? [] as $hh) {
        $m = $materialById[$hh["material_id"]] ?? null;
        if ($m) $heftDaten[] = ["titel" => $m["titel"], "bereich" => $BEREICHE[$m["bereich"]] ?? $m["bereich"], "pfad" => "material-dateien/" . $m["gespeichert_als"], "dateiname" => $m["dateiname"], "endung" => strtolower(pathinfo($m["gespeichert_als"], PATHINFO_EXTENSION))];
    }
    echo json_encode($heftDaten, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
?>;
const KIND_KUERZEL = AKTE_KIND;
</script>
<script>
if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    document.querySelectorAll('.mat-thumb[data-typ="pdf"]').forEach(async (thumb) => {
        try {
            const pdf = await pdfjsLib.getDocument(thumb.dataset.datei).promise;
            const seite = await pdf.getPage(1);
            const viewport = seite.getViewport({ scale: 1 });
            const skalierung = 550 / viewport.width;
            const skalierterViewport = seite.getViewport({ scale: skalierung });

            const canvas = document.createElement("canvas");
            canvas.width = skalierterViewport.width;
            canvas.height = skalierterViewport.height;
            const context = canvas.getContext("2d");

            await seite.render({ canvasContext: context, viewport: skalierterViewport }).promise;
            thumb.innerHTML = "";
            thumb.appendChild(canvas);
        } catch (e) {
            thumb.innerHTML = '<i class="fa-solid fa-file-pdf" style="color:#c0392b;"></i>';
        }
    });
}
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"></script>
<script>

function verfCheckboxGeaendert(){
    const ausgewaehlt = document.querySelectorAll(".verf-checkbox:checked");
    const leiste = document.getElementById("verf-bulk-leiste");
    if (ausgewaehlt.length > 0){
        leiste.style.display = "flex";
        document.getElementById("verf-bulk-anzahl").textContent = ausgewaehlt.length + " ausgewählt";
    } else {
        leiste.style.display = "none";
    }
}

function verfAuswahlAufheben(){
    document.querySelectorAll(".verf-checkbox:checked").forEach(cb => cb.checked = false);
    verfCheckboxGeaendert();
}

function bulkZuweisen(){
    const ids = [...document.querySelectorAll(".verf-checkbox:checked")].map(cb => cb.value);
    if (ids.length === 0){
        alert("Bitte mindestens ein Material auswählen.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("kind", KIND_KUERZEL);
    params.set("zuweisen_bulk", ids.join(","));

    window.location.href = "trainingshefte.php?" + params.toString();
}

async function erstelleTrainingsheft(){
    const status = document.getElementById("heft-status");
    const btn = document.getElementById("btn-heft-erstellen");
    btn.disabled = true;
    status.textContent = "Erstelle PDF ...";

    try {
        const { PDFDocument, StandardFonts, rgb } = PDFLib;
        const heftDoc = await PDFDocument.create();
        const fontFett = await heftDoc.embedFont(StandardFonts.HelveticaBold);
        const fontNormal = await heftDoc.embedFont(StandardFonts.Helvetica);

        const nichtEinbettbar = HEFT_MATERIALIEN.filter(m => !["pdf","jpg","jpeg","png"].includes(m.endung));

        // ---- Deckblatt ----
        const deckblatt = heftDoc.addPage([595.28, 841.89]); // A4
        const { width, height } = deckblatt.getSize();

        deckblatt.drawRectangle({ x:0, y:height-140, width, height:140, color: rgb(0.086,0.196,0.29) });
        deckblatt.drawText("Leuchtturm", { x:50, y:height-70, size:26, font:fontFett, color: rgb(1,1,1) });
        deckblatt.drawText("Trainingsheft", { x:50, y:height-105, size:16, font:fontNormal, color: rgb(1,1,1) });

        deckblatt.drawText(`Kürzel: ${KIND_KUERZEL}`, { x:50, y:height-190, size:14, font:fontFett });
        deckblatt.drawText(`Erstellt am: ${new Date().toLocaleDateString("de-DE")}`, { x:50, y:height-212, size:12, font:fontNormal });
        deckblatt.drawText(`Enthält ${HEFT_MATERIALIEN.length} Material(ien):`, { x:50, y:height-244, size:12, font:fontFett });

        let zeileY = height - 268;
        HEFT_MATERIALIEN.forEach((m, i) => {
            if (zeileY < 60) return;
            deckblatt.drawText(`${i+1}. ${m.titel} (${m.bereich})`, { x:60, y:zeileY, size:10, font:fontNormal });
            zeileY -= 16;
        });

        if (nichtEinbettbar.length > 0){
            zeileY -= 10;
            deckblatt.drawText("Separat zu öffnen (Word/PowerPoint/Excel):", { x:50, y:zeileY, size:11, font:fontFett, color: rgb(0.6,0.2,0.1) });
            zeileY -= 16;
            nichtEinbettbar.forEach(m => {
                if (zeileY < 40) return;
                deckblatt.drawText(`• ${m.titel} — ${m.dateiname}`, { x:60, y:zeileY, size:10, font:fontNormal });
                zeileY -= 15;
            });
        }

        // ---- Materialien anhängen ----
        for (const m of HEFT_MATERIALIEN){
            status.textContent = "Verarbeite: " + m.titel;
            try {
                if (m.endung === "pdf"){
                    const bytes = await fetch(m.pfad).then(r => r.arrayBuffer());
                    const quellDoc = await PDFDocument.load(bytes);
                    const seiten = await heftDoc.copyPages(quellDoc, quellDoc.getPageIndices());
                    seiten.forEach(s => heftDoc.addPage(s));
                } else if (["jpg","jpeg","png"].includes(m.endung)){
                    const bytes = await fetch(m.pfad).then(r => r.arrayBuffer());
                    const bild = m.endung === "png" ? await heftDoc.embedPng(bytes) : await heftDoc.embedJpg(bytes);
                    const seite = heftDoc.addPage([595.28, 841.89]);
                    const skala = Math.min(495 / bild.width, 700 / bild.height, 1);
                    const w = bild.width * skala, h = bild.height * skala;
                    seite.drawImage(bild, { x:(595.28-w)/2, y:(841.89-h)/2, width:w, height:h });
                }
            } catch (fehler) {
                console.error("Fehler bei", m.titel, fehler);
            }
        }

        const pdfBytes = await heftDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Trainingsheft_${KIND_KUERZEL}.pdf`;
        link.click();

        status.textContent = "Fertig! Download gestartet.";
    } catch (fehler) {
        console.error(fehler);
        status.textContent = "Fehler beim Erstellen — siehe Konsole.";
    }

    btn.disabled = false;
}

</script>


<?php endif; ?>

<?php elseif (!empty($alleKinder)): ?>
    <div class="karte"><p style="text-align:center; color:#7c8a94; font-weight:700;">Wähle oben ein Kürzel aus, um die Akte zu öffnen.</p></div>
<?php endif; ?>

</div>
</body>
</html>
