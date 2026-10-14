<?php
// ---------------------------------------------------------------
// Förderkartei: Fehlerwörter-Kartei (Lernbox mit 5 Fächern) und
// Lernverlauf je Kind – gespeichert nur unter dem Kürzel aus den
// Trainingsheften (keine Namen). POST-Anfragen sind die Schnittstelle
// für die Seite selbst und für den Generator (lrs.php), Antwort JSON.
// ---------------------------------------------------------------

session_start();

$karteiDatei = __DIR__ . "/material-daten/foerderkartei.json";
$kinderDatei = __DIR__ . "/material-daten/kinder.json";

if (!is_dir(dirname($karteiDatei))) mkdir(dirname($karteiDatei), 0775, true);
if (!file_exists($karteiDatei)) file_put_contents($karteiDatei, "{}");
if (!file_exists($kinderDatei)) file_put_contents($kinderDatei, json_encode([]));

function fkJsonLesen($datei){
    $daten = json_decode((string)@file_get_contents($datei), true);
    return is_array($daten) ? $daten : [];
}

$SCHWERPUNKTE = ["schaerfung", "cktz", "dehnung", "ie", "sss", "auslaut", "aeau", "dasdass", "grossklein", "vf", "doppelvokal", "iglich", "spst", "silbenh", "chsx", "sonstige"];
$FUNKTIONEN = ["aufmerksamkeit", "optdiff", "optged", "optser", "akdiff", "akged", "akser", "koerper", "raum", "lesen", "worterarbeitung"];

// ===============================================================
// Schnittstelle (POST, JSON)
// ===============================================================
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header("Content-Type: application/json; charset=utf-8");
    $antwort = function ($ok, $daten = []) {
        echo json_encode(array_merge(["ok" => $ok], $daten), JSON_UNESCAPED_UNICODE);
        exit;
    };
    if (empty($_SESSION["leuchtturm_eingeloggt"])) {
        http_response_code(401);
        $antwort(false, ["fehler" => "Du bist nicht mehr eingeloggt. Bitte in einem neuen Tab neu einloggen."]);
    }

    $eingabe = json_decode((string)file_get_contents("php://input"), true);
    if (!is_array($eingabe)) $antwort(false, ["fehler" => "Ungültige Anfrage."]);

    $aktion = (string)($eingabe["aktion"] ?? "");
    $kind = trim((string)($eingabe["kind"] ?? ""));
    $codes = array_map(fn($k) => $k["code"], fkJsonLesen($kinderDatei));
    if (!in_array($kind, $codes, true)) {
        $antwort(false, ["fehler" => "Das Kürzel „" . $kind . "“ gibt es nicht. Bitte zuerst unter Trainingshefte anlegen."]);
    }

    $text = fn($wert, $max) => mb_substr(trim(preg_replace('/\s+/u', ' ', (string)$wert)), 0, $max);
    $datumOk = fn($d) => preg_match('/^\d{4}-\d{2}-\d{2}$/', (string)$d) ? (string)$d : date("Y-m-d");
    $zahl = function ($wert, $max) {
        if ($wert === null || $wert === "") return null;
        if (!is_numeric($wert)) return null;
        $z = (int)round((float)$wert);
        return ($z < 0 || $z > $max) ? null : $z;
    };
    $spListe = function ($liste) use ($SCHWERPUNKTE) {
        $liste = is_array($liste) ? $liste : [];
        $gut = array_values(array_unique(array_filter($liste, fn($k) => in_array($k, $SCHWERPUNKTE, true))));
        return $gut ?: ["sonstige"];
    };

    // Lesen – ändern – schreiben unter einer Sperre; beschädigte Datei wird nie überschrieben
    $fp = fopen($karteiDatei, "c+");
    if (!$fp) $antwort(false, ["fehler" => "Die Kartei-Datei konnte nicht geöffnet werden (Schreibrechte im Ordner material-daten?)."]);
    flock($fp, LOCK_EX);
    $inhalt = stream_get_contents($fp);
    $alle = json_decode($inhalt, true);
    if (!is_array($alle)) {
        if (trim((string)$inhalt) !== "" && trim((string)$inhalt) !== "[]") {
            flock($fp, LOCK_UN); fclose($fp);
            $antwort(false, ["fehler" => "Die Datei foerderkartei.json ist beschädigt – es wurde nichts geändert."]);
        }
        $alle = [];
    }
    $daten = $alle[$kind] ?? ["woerter" => [], "verlauf" => []];
    $daten["woerter"] = $daten["woerter"] ?? [];
    $daten["verlauf"] = $daten["verlauf"] ?? [];
    $geaendert = false;
    $meldung = "";

    switch ($aktion) {
        case "laden":
            break;

        case "woerter_hinzu":
            $neu = 0; $wieder = 0;
            foreach (array_slice((array)($eingabe["eintraege"] ?? []), 0, 200) as $e) {
                $wort = $text($e["wort"] ?? "", 40);
                if ($wort === "" || preg_match('/\s/u', $wort)) continue;
                $falsch = $text($e["falsch"] ?? "", 40);
                $gefunden = false;
                foreach ($daten["woerter"] as &$w) {
                    if ($w["wort"] !== $wort) continue;
                    // Wort war schon in der Kartei: wieder falsch geschrieben → zurück in Fach 1
                    $w["fach"] = 1;
                    $w["fehler"] = ($w["fehler"] ?? 1) + 1;
                    if ($falsch !== "" && !in_array($falsch, $w["falschschreibungen"] ?? [], true)) $w["falschschreibungen"][] = $falsch;
                    $gefunden = true; $wieder++;
                    break;
                }
                unset($w);
                if ($gefunden) continue;
                $daten["woerter"][] = [
                    "id" => uniqid("w_"),
                    "wort" => $wort,
                    "falschschreibungen" => $falsch !== "" ? [$falsch] : [],
                    "sp" => $spListe($e["sp"] ?? []),
                    "fach" => 1,
                    "seit" => date("Y-m-d"),
                    "geuebt" => null,
                    "richtig" => 0,
                    "fehler" => 1,
                ];
                $neu++;
            }
            $geaendert = ($neu + $wieder) > 0;
            $meldung = "$neu neu in der Kartei" . ($wieder ? ", $wieder schon vorhanden (zurück in Fach 1)" : "") . ".";
            break;

        case "wort_aendern":
            foreach ($daten["woerter"] as &$w) {
                if ($w["id"] !== ($eingabe["id"] ?? "")) continue;
                if (isset($eingabe["sp"])) $w["sp"] = $spListe($eingabe["sp"]);
                if (isset($eingabe["fach"])) $w["fach"] = max(1, min(5, (int)$eingabe["fach"]));
                $geaendert = true;
            }
            unset($w);
            break;

        case "wort_loeschen":
            $vorher = count($daten["woerter"]);
            $daten["woerter"] = array_values(array_filter($daten["woerter"], fn($w) => $w["id"] !== ($eingabe["id"] ?? "")));
            $geaendert = count($daten["woerter"]) !== $vorher;
            break;

        case "wort_ergebnis":
            // Lernbox: richtig → ein Fach weiter, falsch → zurück in Fach 1
            foreach ($daten["woerter"] as &$w) {
                if ($w["id"] !== ($eingabe["id"] ?? "")) continue;
                if (!empty($eingabe["richtig"])) { $w["fach"] = min(5, ($w["fach"] ?? 1) + 1); $w["richtig"] = ($w["richtig"] ?? 0) + 1; }
                else { $w["fach"] = 1; $w["fehler"] = ($w["fehler"] ?? 0) + 1; }
                $w["geuebt"] = date("Y-m-d");
                $geaendert = true;
            }
            unset($w);
            break;

        case "verlauf_hinzu":
            $e = (array)($eingabe["eintrag"] ?? []);
            $eintrag = [
                "id" => uniqid("v_"),
                "datum" => $datumOk($e["datum"] ?? ""),
                "diktat_fehler" => $zahl($e["diktat_fehler"] ?? null, 999),
                "diktat_woerter" => $zahl($e["diktat_woerter"] ?? null, 9999),
                "zahlentafel" => $zahl($e["zahlentafel"] ?? null, 3600),
                "geuebt" => array_values(array_filter((array)($e["geuebt"] ?? []), fn($k) => in_array($k, $SCHWERPUNKTE, true) || in_array($k, $FUNKTIONEN, true))),
                "notiz" => $text($e["notiz"] ?? "", 300),
            ];
            $daten["verlauf"][] = $eintrag;
            usort($daten["verlauf"], fn($a, $b) => strcmp($a["datum"], $b["datum"]));
            $geaendert = true;
            break;

        case "verlauf_loeschen":
            $vorher = count($daten["verlauf"]);
            $daten["verlauf"] = array_values(array_filter($daten["verlauf"], fn($v) => $v["id"] !== ($eingabe["id"] ?? "")));
            $geaendert = count($daten["verlauf"]) !== $vorher;
            break;

        default:
            flock($fp, LOCK_UN); fclose($fp);
            $antwort(false, ["fehler" => "Unbekannte Aktion."]);
    }

    if ($geaendert) {
        $alle[$kind] = $daten;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($alle, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        fflush($fp);
    }
    flock($fp, LOCK_UN);
    fclose($fp);
    $antwort(true, ["daten" => $daten, "meldung" => $meldung]);
}

// ===============================================================
// Seite
// ===============================================================
require __DIR__ . "/auth.php";
$kinderCodes = array_map(fn($k) => $k["code"], fkJsonLesen($kinderDatei));
$startKind = in_array($_GET["kind"] ?? "", $kinderCodes, true) ? $_GET["kind"] : ($kinderCodes[0] ?? "");
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Förderkartei · Leuchtturm</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Andika:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<style>
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4; --text:#1f2d36; --schatten:0 6px 24px rgba(22,50,74,.1); --gruen:#2f8a3d; --rot:#b3382f; }
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; line-height:1.5; }
.wrap{ width:min(1050px,95%); margin:30px auto 70px; }
.zurueck{ display:inline-block; margin-bottom:18px; color:#7c8a94; font-weight:800; font-size:13px; text-decoration:none; }
header.kopf{ background:linear-gradient(135deg, var(--nacht), var(--meer)); border-radius:24px; color:#fff; padding:26px 32px; box-shadow:var(--schatten); margin-bottom:18px; }
header.kopf h1{ font-size:30px; font-weight:900; margin:0 0 4px; }
header.kopf p{ font-size:14px; opacity:.9; font-weight:700; margin:0; }
.hinweis{ background:#fff8e6; border:2px solid var(--gold); border-radius:16px; padding:10px 18px; font-size:13px; font-weight:700; color:#7a5d00; margin-bottom:20px; display:flex; gap:10px; align-items:center; }
.karte{ background:#fff; border-radius:24px; box-shadow:var(--schatten); padding:22px 24px; margin-bottom:18px; }
.karte h2{ font-size:16px; font-weight:900; margin:0 0 12px; color:var(--nacht); text-transform:uppercase; letter-spacing:.4px; }
.karte p.klein{ font-size:13px; color:#7c8a94; margin:0 0 12px; }
label{ display:block; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.3px; color:#7c8a94; margin:10px 0 4px; }
input[type="text"], input[type="number"], input[type="date"], select, textarea{ width:100%; border:2px solid #ececec; border-radius:12px; padding:9px 14px; font-family:"Nunito",sans-serif; font-size:14px; color:var(--text); font-weight:700; }
textarea{ min-height:90px; resize:vertical; font-weight:400; }
.zeile{ display:grid; gap:12px; }
.zeile.zwei{ grid-template-columns:1fr 1fr; } .zeile.drei{ grid-template-columns:1fr 1fr 1fr; } .zeile.vier{ grid-template-columns:repeat(4,1fr); }
@media (max-width:760px){ .zeile.zwei, .zeile.drei, .zeile.vier{ grid-template-columns:1fr; } }
.btn{ border:none; border-radius:999px; padding:11px 22px; margin-top:12px; font-family:"Nunito",sans-serif; font-weight:800; font-size:14px; cursor:pointer; color:#fff; background:var(--nacht); transition:.15s; text-decoration:none; display:inline-flex; gap:8px; align-items:center; }
.btn:hover{ background:var(--gold); color:var(--nacht); }
.btn.sek{ background:var(--meer); } .btn.grau{ background:#9aa5ab; } .btn.gruen{ background:var(--gruen); } .btn.rot{ background:var(--rot); }
.btn.klein{ padding:6px 14px; font-size:12px; margin-top:0; }
.btn:disabled{ background:#c7cdd2; cursor:wait; }
.kinder{ display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.kind-chip{ border:2px solid #dde5ea; background:#fff; border-radius:999px; padding:7px 16px; font-weight:900; cursor:pointer; font-family:"Nunito",sans-serif; font-size:14px; color:var(--nacht); }
.kind-chip.aktiv{ background:var(--nacht); color:#fff; border-color:var(--nacht); }
.reiter{ display:flex; gap:8px; margin:0 0 16px; flex-wrap:wrap; }
.reiter button{ border:none; border-radius:999px; padding:10px 20px; font-family:"Nunito",sans-serif; font-weight:800; font-size:14px; cursor:pointer; background:#fff; color:var(--text); box-shadow:var(--schatten); }
.reiter button.aktiv{ background:var(--meer); color:#fff; }
.teil{ display:none; } .teil.aktiv{ display:block; }
.status{ font-size:13px; font-weight:800; margin-left:8px; }
.status.ok{ color:var(--gruen); } .status.fehler{ color:var(--rot); }
table.liste{ width:100%; border-collapse:collapse; font-size:14px; }
table.liste th{ text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:.3px; color:#7c8a94; padding:6px 8px; border-bottom:2px solid #eef2f5; }
table.liste td{ padding:6px 8px; border-bottom:1px solid #f0f3f5; vertical-align:middle; }
table.liste td select{ padding:5px 8px; font-size:13px; }
.wort{ font-family:"Andika",sans-serif; font-size:19px; font-weight:700; }
.falsch{ font-family:"Andika",sans-serif; color:var(--rot); text-decoration:line-through; text-decoration-thickness:1px; }
.stelle{ background:#FFE7A3; border-radius:4px; padding:0 1px; }
.faecher{ display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
.fach{ border:2px solid #dde5ea; border-radius:16px; padding:12px 8px; text-align:center; background:#f9fbfc; }
.fach b{ display:block; font-size:26px; color:var(--nacht); }
.fach span{ font-size:12px; font-weight:800; color:#7c8a94; }
.fach.gelernt{ background:#eaf5ec; border-color:#9cc7a4; }
.fach.fs1{ background:#fdf0ee; border-color:#efc2bc; }
.punkte{ display:inline-flex; gap:3px; } .punkte i{ width:10px; height:10px; border-radius:50%; background:#dde5ea; display:inline-block; } .punkte i.an{ background:var(--meer); }
.sp-chips{ display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; }
.sp-chip{ background:#e3eef8; color:#1d4f86; border-radius:999px; padding:3px 12px; font-size:12px; font-weight:800; }
.abfrage{ border:3px solid var(--meer); border-radius:20px; padding:22px; text-align:center; background:#f7fbfe; margin-top:14px; }
.abfrage .gross{ font-family:"Andika",sans-serif; font-size:56px; font-weight:700; letter-spacing:2px; margin:10px 0; min-height:80px; }
.abfrage .verdeckt{ color:transparent; text-shadow:0 0 22px rgba(22,50,74,.55); user-select:none; }
.leer{ color:#9aa5ab; font-weight:700; font-size:14px; padding:10px 0; }
.diagramme{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media (max-width:760px){ .diagramme{ grid-template-columns:1fr; } }
.diagramm{ border:2px solid #eef2f5; border-radius:16px; padding:10px; }
.diagramm h3{ font-size:13px; margin:0 0 4px; color:var(--nacht); }
.geuebt-wahl{ display:grid; grid-template-columns:repeat(3,1fr); gap:4px 14px; }
@media (max-width:760px){ .geuebt-wahl{ grid-template-columns:1fr 1fr; } }
.geuebt-wahl label{ display:flex; gap:6px; align-items:center; text-transform:none; letter-spacing:0; font-size:13px; color:var(--text); margin:0; font-weight:700; }
.gruppe-titel{ font-size:12px; font-weight:900; color:var(--meer); text-transform:uppercase; margin:10px 0 4px; grid-column:1 / -1; }
#druck{ display:none; }
#vorschau, #wortliste, #v-liste{ overflow-x:auto; }
@media (max-width:600px){
    .faecher{ grid-template-columns:repeat(3,1fr); }
    .abfrage .gross{ font-size:40px; }
    header.kopf{ padding:20px; } .karte{ padding:18px 16px; }
}

/* ===== Druck: Verlaufsbogen und Lernkarten ===== */
@media print{
    body{ background:#fff; }
    .wrap{ display:none !important; }
    #druck{ display:block !important; }
    @page{ size:A4; margin:12mm; }
}
.db-seite{ font-family:"Nunito",sans-serif; color:#1f2d36; break-after:page; }
.db-seite:last-child{ break-after:auto; }
.db-kopf{ display:flex; justify-content:space-between; align-items:flex-end; border-bottom:3px solid #16324a; padding-bottom:8px; margin-bottom:12px; }
.db-kopf h1{ font-size:24px; margin:0; color:#16324a; }
.db-kopf small{ font-size:12px; color:#4a5866; font-weight:700; }
.db-felder{ display:grid; grid-template-columns:repeat(4,1fr); gap:8px 16px; font-size:13px; margin-bottom:12px; }
.db-felder div{ border-bottom:1.5px solid #1f2d36; padding:2px 0; }
.db-felder b{ font-size:10px; text-transform:uppercase; color:#7c8a94; display:block; }
.db-seite h2{ font-size:14px; color:#16324a; margin:14px 0 6px; text-transform:uppercase; letter-spacing:.4px; }
.db-seite table{ width:100%; border-collapse:collapse; font-size:11.5px; }
.db-seite th, .db-seite td{ border:1px solid #c9d6e3; padding:4px 6px; text-align:left; vertical-align:top; }
.db-seite th{ background:#eef4f8; }
.db-diagramme{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.db-diagramme > div{ border:1px solid #c9d6e3; border-radius:8px; padding:6px; }
.db-linien div{ border-bottom:1px solid #8fa3b8; height:26px; }
.db-unterschrift{ display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-top:28px; font-size:11px; color:#4a5866; }
.db-unterschrift div{ border-top:1.5px solid #1f2d36; padding-top:3px; }
.lk-gitter{ display:grid; grid-template-columns:repeat(3,1fr); border-top:1.5px dashed #8fa3b8; border-left:1.5px dashed #8fa3b8; }
.lk-karte{ height:44mm; border-right:1.5px dashed #8fa3b8; border-bottom:1.5px dashed #8fa3b8; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:6px; text-align:center; }
.lk-karte .w{ font-family:"Andika",sans-serif; font-size:26px; font-weight:700; }
.lk-karte .t{ font-size:10.5px; color:#4a5866; font-weight:700; }
.lk-karte .f{ font-size:9px; color:#9aa5ab; }
</style>
</head>
<body>
<div class="wrap">
<a href="index.php" class="zurueck"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>

<header class="kopf">
<h1><i class="fa-solid fa-box-archive"></i> Förderkartei</h1>
<p>Fehlerwörter-Lernbox &amp; Lernverlauf je Kind</p>
</header>

<div class="hinweis">
<i class="fa-solid fa-user-secret"></i>
Gespeichert wird nur unter dem Kürzel aus den Trainingsheften – bitte keine Namen und keine Diagnosen eintragen.
</div>

<div class="karte">
    <h2><i class="fa-solid fa-child"></i> Kind (Kürzel)</h2>
    <?php if (!$kinderCodes): ?>
        <p class="klein">Noch kein Kürzel angelegt. Lege zuerst unter <a href="trainingshefte.php">Trainingshefte</a> ein Kürzel an (z. B. „3b-07“).</p>
    <?php else: ?>
        <div class="kinder" id="kinder">
            <?php foreach ($kinderCodes as $c): ?>
                <button class="kind-chip<?= $c === $startKind ? " aktiv" : "" ?>" data-kind="<?= htmlspecialchars($c) ?>"><?= htmlspecialchars($c) ?></button>
            <?php endforeach; ?>
            <a href="trainingshefte.php" class="btn grau klein" style="margin-left:auto;"><i class="fa-solid fa-plus"></i> Kürzel anlegen</a>
        </div>
    <?php endif; ?>
</div>

<?php if ($kinderCodes): ?>
<div class="reiter">
    <button class="aktiv" data-teil="kartei"><i class="fa-solid fa-box-archive"></i> Fehlerwörter-Kartei</button>
    <button data-teil="verlauf"><i class="fa-solid fa-chart-line"></i> Lernverlauf</button>
</div>

<!-- ===================== Kartei ===================== -->
<div class="teil aktiv" id="teil-kartei">

    <div class="karte">
        <h2><i class="fa-solid fa-pen-to-square"></i> Fehlerwörter eintragen</h2>
        <p class="klein">Ein Wort pro Zeile oder mit Komma getrennt – immer <b>richtig geschrieben</b>. Wenn du die Fehlschreibung dazuschreibst, wird der Schwerpunkt genauer erkannt: <code>Fahne (Fane)</code>, <code>Fane → Fahne</code> oder <code>Fahne/Fane</code> (wie im Diktat-Tool).</p>
        <textarea id="eingabe" placeholder="Fahne (Fane)&#10;Sonne (Sone)&#10;Hund (Hunt)&#10;Fuchs"></textarea>
        <button class="btn sek" onclick="vorschauZeigen()"><i class="fa-solid fa-wand-magic-sparkles"></i> Prüfen &amp; Schwerpunkte zuordnen</button>
        <div id="vorschau"></div>
    </div>

    <div class="karte">
        <h2><i class="fa-solid fa-boxes-stacked"></i> Lernbox</h2>
        <p class="klein">Richtig geschrieben → ein Fach weiter. Falsch → zurück in Fach 1. Fällig: Fach 1 jede Stunde, Fach 2 nach 2 Tagen, Fach 3 nach 4, Fach 4 nach 7 Tagen. Fach 5 = gelernt.</p>
        <div class="faecher" id="faecher"></div>
        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:12px;">
            <button class="btn" onclick="abfrageStarten(false)"><i class="fa-solid fa-play"></i> Fällige Wörter abfragen</button>
            <button class="btn sek" onclick="abfrageStarten(true)"><i class="fa-solid fa-layer-group"></i> Alle offenen Wörter (Fach 1–4)</button>
            <label style="display:flex; gap:6px; align-items:center; text-transform:none; letter-spacing:0; font-size:13px; color:var(--text); margin:12px 0 0;"><input type="checkbox" id="selbst"> Selbst üben: Wort wird vorgelesen und erst nach dem Schreiben aufgedeckt</label>
        </div>
        <div id="abfrage"></div>
    </div>

    <div class="karte">
        <h2><i class="fa-solid fa-list"></i> Wörter in der Kartei</h2>
        <div class="sp-chips" id="sp-uebersicht"></div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin:12px 0;">
            <a class="btn klein" id="link-blaetter" href="lrs.php"><i class="fa-solid fa-file-pen"></i> Arbeitsblätter mit diesen Wörtern</a>
            <button class="btn sek klein" onclick="lernkartenDrucken()"><i class="fa-solid fa-scissors"></i> Lernkarten für die Box drucken</button>
            <label style="display:flex; gap:6px; align-items:center; text-transform:none; letter-spacing:0; font-size:13px; color:var(--text); margin:0;"><input type="checkbox" id="gelernte-zeigen"> gelernte Wörter (Fach 5) anzeigen</label>
        </div>
        <div id="wortliste"></div>
    </div>
</div>

<!-- ===================== Lernverlauf ===================== -->
<div class="teil" id="teil-verlauf">
    <div class="karte">
        <h2><i class="fa-solid fa-plus"></i> Eintrag für eine Fördereinheit</h2>
        <div class="zeile vier">
            <div><label>Datum</label><input type="date" id="v-datum"></div>
            <div><label>Diktat: Fehler</label><input type="number" min="0" id="v-fehler" placeholder="z. B. 7"></div>
            <div><label>Diktat: Wörter gesamt</label><input type="number" min="0" id="v-woerter" placeholder="z. B. 50"></div>
            <div><label>Zahlentafel (Sekunden)</label><input type="number" min="0" id="v-zahlentafel" placeholder="z. B. 85"></div>
        </div>
        <label>Heute geübt</label>
        <div class="geuebt-wahl" id="v-geuebt"></div>
        <label>Kurze Beobachtung (ohne Namen/Diagnosen)</label>
        <input type="text" id="v-notiz" maxlength="300" placeholder="z. B. Verlängern bei Auslaut jetzt selbstständig angewendet">
        <button class="btn" onclick="verlaufSpeichern()"><i class="fa-solid fa-floppy-disk"></i> Eintrag speichern</button>
        <span class="status" id="v-status"></span>
    </div>

    <div class="karte">
        <h2><i class="fa-solid fa-chart-line"></i> Entwicklung</h2>
        <div class="diagramme">
            <div class="diagramm"><h3>Diktat: Fehler je 100 Wörter <small>(ohne Wortzahl: Fehleranzahl)</small></h3><div id="d-diktat"></div></div>
            <div class="diagramm"><h3>Zahlentafel: Zeit in Sekunden</h3><div id="d-zahlentafel"></div></div>
        </div>
        <button class="btn sek" onclick="verlaufsbogenDrucken()"><i class="fa-solid fa-print"></i> Verlaufsbogen drucken (für Elterngespräch / Gutachten)</button>
    </div>

    <div class="karte">
        <h2><i class="fa-solid fa-table"></i> Alle Einträge</h2>
        <div id="v-liste"></div>
    </div>
</div>
<?php endif; ?>
</div>

<div id="druck"></div>

<script src="rs-einordnung.js"></script>
<script>
const FUNKTIONEN = {
    aufmerksamkeit: "Aufmerksamkeit", optdiff: "Optische Differenzierung", optged: "Optisches Gedächtnis", optser: "Optische Serialität",
    akdiff: "Akustische Differenzierung", akged: "Akustisches Gedächtnis", akser: "Akustische Serialität",
    koerper: "Körperschema", raum: "Raumorientierung", lesen: "Lesen (Silbentext)", worterarbeitung: "Worterarbeitung",
};
const FAELLIG_NACH = { 1: 0, 2: 2, 3: 4, 4: 7 };   // Tage seit dem letzten Üben

let kind = <?= json_encode($startKind, JSON_UNESCAPED_UNICODE) ?>;
let daten = { woerter: [], verlauf: [] };
let vorschauListe = [];

const esc = t => String(t ?? "").replace(/[&<>"']/g, z => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[z]));
const heute = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const tageSeit = d => d ? Math.floor((Date.parse(heute()) - Date.parse(d)) / 86400000) : 999;
const datumDE = d => d ? d.split("-").reverse().join(".") : "–";

async function api(aktion, extra = {}){
    const antwort = await fetch("foerderkartei.php", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aktion, kind, ...extra }),
    });
    let j;
    try { j = await antwort.json(); } catch (e) { throw new Error("Der Server hat unerwartet geantwortet."); }
    if (!j.ok) throw new Error(j.fehler || "Fehler beim Speichern.");
    daten = j.daten;
    return j;
}

async function laden(){
    if (!kind) return;
    try { await api("laden"); } catch (e) { alert(e.message); }
    document.getElementById("link-blaetter").href = "lrs.php?kartei=" + encodeURIComponent(kind);
    allesZeichnen();
}

function allesZeichnen(){
    faecherZeichnen();
    wortlisteZeichnen();
    verlaufZeichnen();
}

/* ---------- Kartei ---------- */

// Markiert im Wort die Rechtschreibstelle des ersten Schwerpunkts
function wortMitStelle(wort, sp){
    const t = (typeof rs_treffer === "function" ? rs_treffer(wort) : []).find(x => sp.includes(x.key));
    if (!t) return esc(wort);
    return esc(wort.slice(0, t.start)) + `<span class="stelle">${esc(wort.slice(t.start, t.ende))}</span>` + esc(wort.slice(t.ende));
}

function spAuswahl(aktuell, attr){
    return `<select ${attr}>${Object.entries(RS_NAMEN).map(([k, v]) => `<option value="${k}" ${k === aktuell ? "selected" : ""}>${esc(v.kurz)}</option>`).join("")}</select>`;
}

function vorschauZeigen(){
    vorschauListe = rs_eingabeLesen(document.getElementById("eingabe").value);
    const box = document.getElementById("vorschau");
    if (!vorschauListe.length){ box.innerHTML = `<p class="leer">Keine Wörter erkannt.</p>`; return; }
    box.innerHTML = `<table class="liste" style="margin-top:14px;"><thead><tr><th>Wort</th><th>Fehlschreibung</th><th>Schwerpunkt (automatisch – änderbar)</th><th></th></tr></thead><tbody>` +
        vorschauListe.map((e, i) => `<tr><td class="wort">${wortMitStelle(e.wort, e.sp)}</td><td>${e.falsch ? `<span class="falsch">${esc(e.falsch)}</span>` : "–"}</td>
            <td>${spAuswahl(e.sp[0], `onchange="vorschauListe[${i}].sp = [this.value]"`)}${e.sp.length > 1 ? ` <small style="color:#7c8a94;">auch: ${e.sp.slice(1).map(k => RS_NAMEN[k].kurz).join(", ")}</small>` : ""}</td>
            <td><button class="btn grau klein" onclick="vorschauListe.splice(${i},1); vorschauNeu()">✕</button></td></tr>`).join("") +
        `</tbody></table><button class="btn gruen" id="uebernehmen-knopf" onclick="vorschauUebernehmen()"><i class="fa-solid fa-box-archive"></i> ${vorschauListe.length} Wörter in die Kartei übernehmen</button><span class="status" id="uebernehmen-status"></span>`;
}
function vorschauNeu(){
    document.getElementById("eingabe").value = vorschauListe.map(e => e.falsch ? `${e.wort} (${e.falsch})` : e.wort).join("\n");
    const sp = vorschauListe.map(e => e.sp);
    vorschauZeigen();
    vorschauListe.forEach((e, i) => e.sp = sp[i]);
}

async function vorschauUebernehmen(){
    const knopf = document.getElementById("uebernehmen-knopf"), st = document.getElementById("uebernehmen-status");
    knopf.disabled = true;
    try {
        const j = await api("woerter_hinzu", { eintraege: vorschauListe });
        st.className = "status ok"; st.textContent = "✅ " + j.meldung;
        document.getElementById("eingabe").value = "";
        vorschauListe = [];
        setTimeout(() => { document.getElementById("vorschau").innerHTML = ""; }, 2500);
        allesZeichnen();
    } catch (e){ st.className = "status fehler"; st.textContent = "⚠️ " + e.message; }
    finally { knopf.disabled = false; }
}

function istFaellig(w){
    if (w.fach >= 5) return false;
    return tageSeit(w.geuebt) >= FAELLIG_NACH[w.fach];
}

function faecherZeichnen(){
    const zahl = f => daten.woerter.filter(w => w.fach === f).length;
    const faellig = daten.woerter.filter(istFaellig).length;
    document.getElementById("faecher").innerHTML = [1, 2, 3, 4, 5].map(f =>
        `<div class="fach ${f === 5 ? "gelernt" : (f === 1 ? "fs1" : "")}"><b>${zahl(f)}</b><span>${f === 5 ? "Fach 5 · gelernt ⭐" : "Fach " + f}</span></div>`).join("") +
        `<div style="grid-column:1/-1; font-size:13px; font-weight:800; color:var(--meer);">Heute fällig: ${faellig} ${faellig === 1 ? "Wort" : "Wörter"}</div>`;
}

function wortlisteZeichnen(){
    const gelernte = document.getElementById("gelernte-zeigen").checked;
    const liste = daten.woerter.filter(w => gelernte || w.fach < 5);
    const zaehler = {};
    daten.woerter.forEach(w => { const k = w.sp[0]; zaehler[k] = (zaehler[k] || 0) + 1; });
    document.getElementById("sp-uebersicht").innerHTML = Object.entries(zaehler).sort((a, b) => b[1] - a[1])
        .map(([k, n]) => `<span class="sp-chip">${esc(RS_NAMEN[k]?.kurz || k)}: ${n}</span>`).join("") || "";
    const box = document.getElementById("wortliste");
    if (!liste.length){ box.innerHTML = `<p class="leer">${daten.woerter.length ? "Alle Wörter sind gelernt. 🎉" : "Noch keine Wörter in der Kartei."}</p>`; return; }
    const gruppen = {};
    liste.forEach(w => (gruppen[w.sp[0]] = gruppen[w.sp[0]] || []).push(w));
    box.innerHTML = `<table class="liste"><thead><tr><th>Wort</th><th>so geschrieben</th><th>Schwerpunkt</th><th>Fach</th><th>zuletzt geübt</th><th></th></tr></thead><tbody>` +
        Object.keys(RS_NAMEN).filter(k => gruppen[k]).map(k => gruppen[k].map(w => `<tr>
            <td class="wort">${wortMitStelle(w.wort, w.sp)}</td>
            <td>${(w.falschschreibungen || []).map(f => `<span class="falsch">${esc(f)}</span>`).join(", ") || "–"}</td>
            <td>${spAuswahl(w.sp[0], `onchange="wortAendern('${w.id}', {sp:[this.value]})"`)}</td>
            <td><span class="punkte" title="Fach ${w.fach}">${[1, 2, 3, 4, 5].map(f => `<i class="${f <= w.fach ? "an" : ""}"></i>`).join("")}</span></td>
            <td style="font-size:12px;">${datumDE(w.geuebt)}${istFaellig(w) ? ' <b style="color:var(--meer);">fällig</b>' : ""}</td>
            <td><button class="btn grau klein" title="löschen" onclick="wortLoeschen('${w.id}')"><i class="fa-solid fa-trash"></i></button></td></tr>`).join("")).join("") +
        `</tbody></table>`;
}

async function wortAendern(id, felder){
    try { await api("wort_aendern", { id, ...felder }); allesZeichnen(); } catch (e){ alert(e.message); }
}
async function wortLoeschen(id){
    const w = daten.woerter.find(x => x.id === id);
    if (!confirm(`„${w ? w.wort : ""}“ aus der Kartei löschen?`)) return;
    try { await api("wort_loeschen", { id }); allesZeichnen(); } catch (e){ alert(e.message); }
}

/* ---------- Abfrage (Lernbox) ---------- */
let abfrage = null;

function abfrageStarten(alle){
    const liste = daten.woerter.filter(w => alle ? w.fach < 5 : istFaellig(w));
    if (!liste.length){ document.getElementById("abfrage").innerHTML = `<p class="leer">Heute ist nichts fällig. 🎉 Mit „Alle offenen Wörter“ kannst du trotzdem üben.</p>`; return; }
    abfrage = { liste: liste.sort(() => Math.random() - 0.5), pos: 0, richtig: 0, falsch: 0, offen: false };
    abfrageZeigen();
}

function vorlesen(text){
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.8;
    speechSynthesis.speak(u);
}

function abfrageZeigen(){
    const box = document.getElementById("abfrage");
    if (!abfrage) { box.innerHTML = ""; return; }
    if (abfrage.pos >= abfrage.liste.length){
        box.innerHTML = `<div class="abfrage"><div style="font-size:22px; font-weight:900;">Fertig! ✅ ${abfrage.richtig} richtig · ${abfrage.falsch} noch üben</div>
            <p class="klein" style="margin-top:8px;">Die Wörter sind in die passenden Fächer gewandert.</p><button class="btn grau" onclick="abfrage=null; abfrageZeigen()">Schließen</button></div>`;
        return;
    }
    const w = abfrage.liste[abfrage.pos];
    const selbst = document.getElementById("selbst").checked;
    const verdeckt = selbst && !abfrage.offen;
    box.innerHTML = `<div class="abfrage">
        <div style="font-size:13px; font-weight:800; color:#7c8a94;">Wort ${abfrage.pos + 1} von ${abfrage.liste.length} · Fach ${w.fach} · ${esc(RS_NAMEN[w.sp[0]]?.name || "")}</div>
        <div class="gross ${verdeckt ? "verdeckt" : ""}">${verdeckt ? esc(w.wort) : wortMitStelle(w.wort, w.sp)}</div>
        <div style="font-size:14px; color:#4a5866; font-weight:700;">${selbst ? (verdeckt ? "Hör zu, schreibe das Wort auf und decke dann auf." : "Vergleiche Buchstabe für Buchstabe.") : "Diktiere das Wort. Das Kind schreibt – dann gemeinsam vergleichen."} · Tipp: ${esc(RS_NAMEN[w.sp[0]]?.tipp || "")}</div>
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn sek" onclick="vorlesen(abfrage.liste[abfrage.pos].wort)"><i class="fa-solid fa-volume-high"></i> Vorlesen</button>
            ${verdeckt ? `<button class="btn" onclick="abfrage.offen=true; abfrageZeigen()"><i class="fa-solid fa-eye"></i> Aufdecken</button>`
            : `<button class="btn gruen" onclick="abfrageErgebnis(true)"><i class="fa-solid fa-check"></i> Richtig</button>
               <button class="btn rot" onclick="abfrageErgebnis(false)"><i class="fa-solid fa-xmark"></i> Noch üben</button>`}
        </div></div>`;
    if (selbst && verdeckt) vorlesen(w.wort);
}

async function abfrageErgebnis(richtig){
    const w = abfrage.liste[abfrage.pos];
    try {
        await api("wort_ergebnis", { id: w.id, richtig });
        richtig ? abfrage.richtig++ : abfrage.falsch++;
        abfrage.pos++; abfrage.offen = false;
        faecherZeichnen(); wortlisteZeichnen(); abfrageZeigen();
    } catch (e){ alert(e.message); }
}

/* ---------- Lernkarten drucken ---------- */
function lernkartenDrucken(){
    const liste = daten.woerter.filter(w => w.fach < 5);
    if (!liste.length){ alert("Keine offenen Wörter in der Kartei."); return; }
    const seiten = [];
    for (let i = 0; i < liste.length; i += 18) seiten.push(liste.slice(i, i + 18));
    document.getElementById("druck").innerHTML = seiten.map(s => `<div class="db-seite">
        <div class="db-kopf"><h1>Meine Lernwörter · ${esc(kind)}</h1><small>Ausschneiden · in die Lernbox · Fach 1</small></div>
        <div class="lk-gitter">${s.map(w => `<div class="lk-karte"><div class="w">${wortMitStelle(w.wort, w.sp)}</div><div class="t">${esc(RS_NAMEN[w.sp[0]]?.kurz || "")} – ${esc(RS_NAMEN[w.sp[0]]?.tipp || "")}</div><div class="f">seit ${datumDE(w.seit)}</div></div>`).join("")}</div>
    </div>`).join("");
    drucken();
}

function drucken(){
    const los = () => setTimeout(() => window.print(), 100);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(los); else los();
}

/* ---------- Lernverlauf ---------- */
function geuebtAuswahlAufbauen(){
    const rs = Object.entries(RS_NAMEN).filter(([k]) => k !== "sonstige");
    document.getElementById("v-geuebt").innerHTML =
        `<div class="gruppe-titel">Funktionstraining &amp; Lesen</div>` +
        Object.entries(FUNKTIONEN).map(([k, n]) => `<label><input type="checkbox" value="${k}"> ${esc(n)}</label>`).join("") +
        `<div class="gruppe-titel">Rechtschreib-Schwerpunkte</div>` +
        rs.map(([k, v]) => `<label><input type="checkbox" value="${k}"> ${esc(v.kurz)}</label>`).join("");
}
const geuebtName = k => FUNKTIONEN[k] || RS_NAMEN[k]?.kurz || k;

async function verlaufSpeichern(){
    const st = document.getElementById("v-status");
    const eintrag = {
        datum: document.getElementById("v-datum").value || heute(),
        diktat_fehler: document.getElementById("v-fehler").value,
        diktat_woerter: document.getElementById("v-woerter").value,
        zahlentafel: document.getElementById("v-zahlentafel").value,
        geuebt: [...document.querySelectorAll("#v-geuebt input:checked")].map(c => c.value),
        notiz: document.getElementById("v-notiz").value,
    };
    if (!eintrag.diktat_fehler && !eintrag.zahlentafel && !eintrag.geuebt.length && !eintrag.notiz.trim()){
        st.className = "status fehler"; st.textContent = "Bitte mindestens ein Feld ausfüllen."; return;
    }
    try {
        await api("verlauf_hinzu", { eintrag });
        st.className = "status ok"; st.textContent = "✅ Gespeichert.";
        ["v-fehler", "v-woerter", "v-zahlentafel", "v-notiz"].forEach(id => document.getElementById(id).value = "");
        document.querySelectorAll("#v-geuebt input").forEach(c => c.checked = false);
        verlaufZeichnen();
    } catch (e){ st.className = "status fehler"; st.textContent = "⚠️ " + e.message; }
}

async function verlaufLoeschen(id){
    if (!confirm("Diesen Eintrag löschen?")) return;
    try { await api("verlauf_loeschen", { id }); verlaufZeichnen(); } catch (e){ alert(e.message); }
}

function diktatWert(v){
    if (v.diktat_fehler == null) return null;
    return v.diktat_woerter ? Math.round(v.diktat_fehler / v.diktat_woerter * 1000) / 10 : v.diktat_fehler;
}

// Einfaches Liniendiagramm als SVG
function diagramm(punkte, einheit, breite = 460, hoehe = 200){
    if (!punkte.length) return `<p class="leer">Noch keine Werte.</p>`;
    const L = 40, R = 12, O = 14, U = 34;
    const ys = punkte.map(p => p.y);
    const min = 0;
    const roh = Math.max(...ys, 1) * 1.1 / 4;
    const stufe = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500].find(s => s >= roh) || Math.ceil(roh);
    const max = stufe * 4;
    const x = i => L + (punkte.length === 1 ? (breite - L - R) / 2 : i * (breite - L - R) / (punkte.length - 1));
    const y = w => O + (1 - (w - min) / (max - min)) * (hoehe - O - U);
    let svg = `<svg viewBox="0 0 ${breite} ${hoehe}" width="100%" style="max-width:${breite}px; display:block; font-family:Nunito,Arial,sans-serif;">`;
    for (let k = 0; k <= 4; k++){
        const w = min + (max - min) * k / 4;
        svg += `<line x1="${L}" x2="${breite - R}" y1="${y(w)}" y2="${y(w)}" stroke="#e6ecf1"/><text x="${L - 6}" y="${y(w) + 4}" font-size="11" text-anchor="end" fill="#7c8a94">${Math.round(w * 10) / 10}</text>`;
    }
    svg += `<polyline fill="none" stroke="#3d7ea6" stroke-width="3" stroke-linejoin="round" points="${punkte.map((p, i) => `${x(i)},${y(p.y)}`).join(" ")}"/>`;
    const schritt = Math.max(1, Math.ceil(punkte.length / 8));
    punkte.forEach((p, i) => {
        svg += `<circle cx="${x(i)}" cy="${y(p.y)}" r="4.5" fill="#16324a"/>`;
        if (i % schritt === 0 || i === punkte.length - 1) svg += `<text x="${x(i)}" y="${hoehe - 12}" font-size="10.5" text-anchor="middle" fill="#4a5866">${p.x.slice(8, 10)}.${p.x.slice(5, 7)}.</text>`;
    });
    svg += `<text x="${L}" y="${hoehe - 1}" font-size="10" fill="#9aa5ab">${esc(einheit)}</text></svg>`;
    return svg;
}

function verlaufZeichnen(){
    const v = daten.verlauf;
    document.getElementById("d-diktat").innerHTML = diagramm(v.filter(e => diktatWert(e) != null).map(e => ({ x: e.datum, y: diktatWert(e) })), "Fehler (je 100 Wörter)");
    document.getElementById("d-zahlentafel").innerHTML = diagramm(v.filter(e => e.zahlentafel != null).map(e => ({ x: e.datum, y: e.zahlentafel })), "Sekunden");
    const box = document.getElementById("v-liste");
    if (!v.length){ box.innerHTML = `<p class="leer">Noch keine Einträge.</p>`; return; }
    box.innerHTML = `<table class="liste"><thead><tr><th>Datum</th><th>Diktat</th><th>Zahlentafel</th><th>Geübt</th><th>Beobachtung</th><th></th></tr></thead><tbody>` +
        [...v].reverse().map(e => `<tr><td>${datumDE(e.datum)}</td>
            <td>${e.diktat_fehler != null ? `${e.diktat_fehler} Fehler${e.diktat_woerter ? ` / ${e.diktat_woerter} Wörter <small>(${diktatWert(e)} je 100)</small>` : ""}` : "–"}</td>
            <td>${e.zahlentafel != null ? e.zahlentafel + " s" : "–"}</td>
            <td style="font-size:12px;">${(e.geuebt || []).map(geuebtName).map(esc).join(", ") || "–"}</td>
            <td style="font-size:12px;">${esc(e.notiz) || "–"}</td>
            <td><button class="btn grau klein" onclick="verlaufLoeschen('${e.id}')"><i class="fa-solid fa-trash"></i></button></td></tr>`).join("") + `</tbody></table>`;
}

function verlaufsbogenDrucken(){
    const v = daten.verlauf;
    const woerter = daten.woerter;
    const zeitraum = v.length ? `${datumDE(v[0].datum)} – ${datumDE(v[v.length - 1].datum)}` : "–";
    const proSp = {};
    woerter.forEach(w => { const k = w.sp[0]; proSp[k] = proSp[k] || { n: 0, gelernt: 0 }; proSp[k].n++; if (w.fach >= 5) proSp[k].gelernt++; });
    const geuebtZaehler = {};
    v.forEach(e => (e.geuebt || []).forEach(k => geuebtZaehler[k] = (geuebtZaehler[k] || 0) + 1));
    const diktate = v.filter(e => diktatWert(e) != null);
    const tafeln = v.filter(e => e.zahlentafel != null);
    const entwicklung = (liste, wert, einheit) => liste.length >= 2
        ? `von ${wert(liste[0])} auf ${wert(liste[liste.length - 1])} ${einheit}` : (liste.length ? `${wert(liste[0])} ${einheit}` : "–");

    document.getElementById("druck").innerHTML = `<div class="db-seite">
        <div class="db-kopf"><h1>Lernverlaufsbogen</h1><small>Leuchtturm · LRS-Förderung nach dem AFS-Modell</small></div>
        <div class="db-felder">
            <div><b>Kürzel</b>${esc(kind)}</div>
            <div><b>Name (handschriftlich)</b>&nbsp;</div>
            <div><b>Zeitraum</b>${zeitraum}</div>
            <div><b>Fördereinheiten erfasst</b>${v.length}</div>
        </div>
        <h2>Entwicklung</h2>
        <div class="db-diagramme">
            <div><b style="font-size:11px;">Diktat: Fehler je 100 Wörter</b> <span style="font-size:11px;">(${entwicklung(diktate, diktatWert, "")})</span>${diagramm(diktate.map(e => ({ x: e.datum, y: diktatWert(e) })), "Fehler", 460, 180)}</div>
            <div><b style="font-size:11px;">Zahlentafel: Sekunden</b> <span style="font-size:11px;">(${entwicklung(tafeln, e => e.zahlentafel, "s")})</span>${diagramm(tafeln.map(e => ({ x: e.datum, y: e.zahlentafel })), "Sekunden", 460, 180)}</div>
        </div>
        <h2>Fehlerwörter-Kartei</h2>
        <table><thead><tr><th>Schwerpunkt</th><th>Wörter</th><th>davon sicher (Fach 5)</th><th>Schwerpunkt</th><th>Wörter</th><th>davon sicher</th></tr></thead><tbody>
            ${(() => { const z = Object.keys(RS_NAMEN).filter(k => proSp[k]).map(k => [RS_NAMEN[k].name, proSp[k].n, proSp[k].gelernt]);
                if (!z.length) return `<tr><td colspan="6">Keine Wörter erfasst.</td></tr>`;
                let html = ""; for (let i = 0; i < z.length; i += 2){ const a = z[i], b = z[i + 1] || ["", "", ""]; html += `<tr><td>${esc(a[0])}</td><td>${a[1]}</td><td>${a[2]}</td><td>${esc(b[0])}</td><td>${b[1]}</td><td>${b[2]}</td></tr>`; }
                return html + `<tr><th>Gesamt</th><th>${woerter.length}</th><th>${woerter.filter(w => w.fach >= 5).length}</th><th colspan="3"></th></tr>`; })()}
        </tbody></table>
        <h2>Geübte Bereiche</h2>
        <p style="font-size:12px; margin:0;">${Object.entries(geuebtZaehler).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${esc(geuebtName(k))} (${n}×)`).join(" · ") || "–"}</p>
        <h2>Einzelne Einheiten</h2>
        <table><thead><tr><th style="width:70px;">Datum</th><th style="width:110px;">Diktat</th><th style="width:70px;">Zahlentafel</th><th>Geübt</th><th>Beobachtung</th></tr></thead><tbody>
            ${v.map(e => `<tr><td>${datumDE(e.datum)}</td><td>${e.diktat_fehler != null ? `${e.diktat_fehler} F.${e.diktat_woerter ? ` / ${e.diktat_woerter} W. (${diktatWert(e)})` : ""}` : "–"}</td><td>${e.zahlentafel != null ? e.zahlentafel + " s" : "–"}</td><td>${(e.geuebt || []).map(geuebtName).map(esc).join(", ")}</td><td>${esc(e.notiz)}</td></tr>`).join("") || `<tr><td colspan="5">Keine Einträge.</td></tr>`}
        </tbody></table>
        <h2>Bemerkungen</h2>
        <div class="db-linien"><div></div><div></div><div></div></div>
        <div class="db-unterschrift"><div>Ort, Datum</div><div>Unterschrift Legasthenietrainerin</div></div>
    </div>`;
    drucken();
}

/* ---------- Start ---------- */
if (kind){
    document.querySelectorAll(".kind-chip").forEach(b => b.addEventListener("click", () => {
        kind = b.dataset.kind;
        document.querySelectorAll(".kind-chip").forEach(x => x.classList.toggle("aktiv", x === b));
        history.replaceState(null, "", "foerderkartei.php?kind=" + encodeURIComponent(kind));
        abfrage = null; abfrageZeigen();
        document.getElementById("vorschau").innerHTML = "";
        laden();
    }));
    document.querySelectorAll(".reiter button").forEach(b => b.addEventListener("click", () => {
        document.querySelectorAll(".reiter button").forEach(x => x.classList.toggle("aktiv", x === b));
        document.querySelectorAll(".teil").forEach(t => t.classList.toggle("aktiv", t.id === "teil-" + b.dataset.teil));
    }));
    document.getElementById("gelernte-zeigen").addEventListener("change", wortlisteZeichnen);
    document.getElementById("v-datum").value = heute();
    geuebtAuswahlAufbauen();
    if (location.hash === "#verlauf") document.querySelector('.reiter button[data-teil="verlauf"]').click();
    laden();
}
</script>
</body>
</html>
