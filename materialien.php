<?php require __DIR__ . "/auth.php"; ?>
<?php

// ---------------------------
// Speicherorte
// ---------------------------

$datenDatei = __DIR__ . "/material-daten/materialien.json";
$uploadOrdner = __DIR__ . "/material-dateien";

if (!is_dir(dirname($datenDatei))) mkdir(dirname($datenDatei), 0775, true);
if (!is_dir($uploadOrdner)) mkdir($uploadOrdner, 0775, true);
if (!file_exists($datenDatei)) file_put_contents($datenDatei, json_encode([]));

function ladeMaterialien($datei){
    $inhalt = file_get_contents($datei);
    $daten = json_decode($inhalt, true);
    return is_array($daten) ? $daten : [];
}

function speichereMaterialien($datei, $liste){
    $fp = fopen($datei, "c+");
    flock($fp, LOCK_EX);
    ftruncate($fp, 0);
    fwrite($fp, json_encode(array_values($liste), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
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

$ERLAUBTE_ENDUNGEN = ["pdf","doc","docx","ppt","pptx","xls","xlsx","jpg","jpeg","png","gif"];

// ---------------------------
// Upload verarbeiten
// ---------------------------

$fehler = [];
$erfolgAnzahl = 0;

if ($_SERVER["REQUEST_METHOD"] === "POST" && ($_POST["aktion"] ?? "") === "upload") {

    $titelPraefix = trim($_POST["titel"] ?? "");
    $bereich = $_POST["bereich"] ?? "sonstiges";
    $klasse = $_POST["klasse"] ?? "alle";
    $beschreibung = trim($_POST["beschreibung"] ?? "");
    $ordner = trim($_POST["ordner"] ?? "") ?: "Allgemein";

    if (!array_key_exists($bereich, $BEREICHE)) $fehler[] = "Ungültiger Funktionsbereich.";

    $hochgeladeneDateien = $_FILES["dateien"] ?? null;
    $anzahlDateien = $hochgeladeneDateien ? count(array_filter($hochgeladeneDateien["name"])) : 0;

    if ($anzahlDateien === 0) {
        $fehler[] = "Bitte mindestens eine Datei auswählen.";
    }

    if (empty($fehler)) {

        $liste = ladeMaterialien($datenDatei);
        $mehrereDateien = $anzahlDateien > 1;

        // Bereits vorhandene Datei-Hashes sammeln, um Dopplungen zu erkennen
        // (für älteres Material ohne gespeicherten Hash: einmalig nachberechnen)
        $vorhandeneHashes = [];
        $hashesNachtraeglichErgaenzt = false;
        foreach ($liste as &$bestehend) {
            if (empty($bestehend["hash"])) {
                $pfad = $uploadOrdner . "/" . $bestehend["gespeichert_als"];
                if (is_file($pfad)) {
                    $bestehend["hash"] = sha1_file($pfad);
                    $hashesNachtraeglichErgaenzt = true;
                }
            }
            if (!empty($bestehend["hash"])) $vorhandeneHashes[$bestehend["hash"]] = $bestehend["titel"];
        }
        unset($bestehend);
        if ($hashesNachtraeglichErgaenzt) speichereMaterialien($datenDatei, $liste);

        foreach ($hochgeladeneDateien["name"] as $index => $original) {

            if ($original === "" || $hochgeladeneDateien["error"][$index] === UPLOAD_ERR_NO_FILE) continue;

            $endung = strtolower(pathinfo($original, PATHINFO_EXTENSION));

            if (!in_array($endung, $ERLAUBTE_ENDUNGEN, true)) {
                $fehler[] = "„$original“ — Dateityp .$endung nicht erlaubt.";
                continue;
            }
            if ($hochgeladeneDateien["error"][$index] !== UPLOAD_ERR_OK) {
                $fehler[] = "„$original“ — Fehler beim Hochladen.";
                continue;
            }

            $tmpPfad = $hochgeladeneDateien["tmp_name"][$index];
            $hash = sha1_file($tmpPfad);

            if ($hash !== false && isset($vorhandeneHashes[$hash])) {
                $fehler[] = "„$original“ — identisch mit bereits vorhandenem Material „" . $vorhandeneHashes[$hash] . "“, übersprungen.";
                continue;
            }

            $id = uniqid("mat_");
            $gespeichertAls = $id . "." . $endung;

            if (!move_uploaded_file($tmpPfad, $uploadOrdner . "/" . $gespeichertAls)) {
                $fehler[] = "„$original“ — konnte nicht gespeichert werden.";
                continue;
            }

            // Titel: eigener Dateiname, ggf. mit gemeinsamem Präfix
            $basisName = pathinfo($original, PATHINFO_FILENAME);
            $basisName = str_replace(["_", "-"], " ", $basisName);
            $basisName = trim(preg_replace('/\s+/', ' ', $basisName));
            $basisName = mb_convert_case($basisName, MB_CASE_TITLE, "UTF-8");

            if ($titelPraefix !== "") {
                $titel = $mehrereDateien ? "$titelPraefix – $basisName" : $titelPraefix;
            } else {
                $titel = $basisName;
            }

            $liste[] = [
                "id" => $id,
                "titel" => $titel,
                "bereich" => $bereich,
                "klasse" => $klasse,
                "beschreibung" => $beschreibung,
                "ordner" => $ordner,
                "dateiname" => $original,
                "gespeichert_als" => $gespeichertAls,
                "hash" => $hash ?: null,
                "hochgeladen_am" => date("Y-m-d"),
            ];

            if ($hash !== false) $vorhandeneHashes[$hash] = $titel;

            $erfolgAnzahl++;
        }

        if ($erfolgAnzahl > 0) {
            speichereMaterialien($datenDatei, $liste);
        }
    }
}

// ---------------------------
// Löschen
// ---------------------------

if (isset($_GET["loeschen"])) {
    $liste = ladeMaterialien($datenDatei);
    foreach ($liste as $m) {
        if ($m["id"] === $_GET["loeschen"]) {
            @unlink($uploadOrdner . "/" . $m["gespeichert_als"]);
        }
    }
    $liste = array_filter($liste, fn($m) => $m["id"] !== $_GET["loeschen"]);
    speichereMaterialien($datenDatei, $liste);
    header("Location: materialien.php");
    exit;
}

if (isset($_GET["verschieben"])) {
    $liste = ladeMaterialien($datenDatei);
    $ausgewaehlt = $_GET["ordner_auswahl"] ?? "";
    $neuerName = trim($_GET["neuer_ordner_name"] ?? "");
    $zielOrdner = ($ausgewaehlt === "__neu__")
        ? ($neuerName !== "" ? $neuerName : "Allgemein")
        : ($ausgewaehlt !== "" ? $ausgewaehlt : "Allgemein");

    foreach ($liste as &$m) {
        if ($m["id"] === $_GET["verschieben"]) {
            $m["ordner"] = $zielOrdner;
        }
    }
    unset($m);
    speichereMaterialien($datenDatei, $liste);
    header("Location: materialien.php");
    exit;
}

if (isset($_GET["bulk_ids"]) && trim($_GET["bulk_ids"]) !== "") {
    $liste = ladeMaterialien($datenDatei);
    $idListe = array_filter(explode(",", $_GET["bulk_ids"]));
    $ausgewaehlt = $_GET["bulk_ordner_auswahl"] ?? "";
    $neuerName = trim($_GET["bulk_neuer_ordner_name"] ?? "");
    $zielOrdner = ($ausgewaehlt === "__neu__")
        ? ($neuerName !== "" ? $neuerName : "Allgemein")
        : ($ausgewaehlt !== "" ? $ausgewaehlt : "Allgemein");

    foreach ($liste as &$m) {
        if (in_array($m["id"], $idListe, true)) {
            $m["ordner"] = $zielOrdner;
        }
    }
    unset($m);
    speichereMaterialien($datenDatei, $liste);
    header("Location: materialien.php");
    exit;
}

// ---------------------------
// Liste + Filter
// ---------------------------

$alle = ladeMaterialien($datenDatei);
$filterBereich = $_GET["filter_bereich"] ?? "";
$filterKlasse = $_GET["filter_klasse"] ?? "";
$filterOrdner = $_GET["filter_ordner"] ?? "";
$suche = trim($_GET["suche"] ?? "");

// Vorhandene Ordner (für Filter-Dropdown und Autovervollständigung beim Upload)
$alleOrdner = array_unique(array_map(fn($m) => $m["ordner"] ?? "Allgemein", $alle));
sort($alleOrdner);

$gefiltert = array_filter($alle, function ($m) use ($filterBereich, $filterKlasse, $filterOrdner, $suche) {
    if ($filterBereich !== "" && $m["bereich"] !== $filterBereich) return false;
    if ($filterKlasse !== "" && $m["klasse"] !== $filterKlasse && $m["klasse"] !== "alle") return false;
    if ($filterOrdner !== "" && ($m["ordner"] ?? "Allgemein") !== $filterOrdner) return false;
    if ($suche !== "" && stripos($m["titel"] . " " . $m["beschreibung"], $suche) === false) return false;
    return true;
});

usort($gefiltert, fn($a, $b) => strcmp($b["hochgeladen_am"], $a["hochgeladen_am"]));
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Materialien · Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>

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

.karte{ background:var(--karte); border-radius:24px; box-shadow:var(--schatten); padding:24px; margin-bottom:20px; }
.karte h2{ font-size:20px; font-weight:900; margin:0 0 4px; }

label{ display:block; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.4px; color:#7c8a94; margin:12px 0 4px; }
input[type="text"], input[type="file"], select, textarea{
    width:100%; border:2px solid #ececec; border-radius:12px; padding:9px 14px;
    font-family:"Nunito",sans-serif; font-size:14px; font-weight:700; color:var(--text);
}
textarea{ min-height:60px; resize:vertical; font-weight:400; }

.zeile{ display:grid; gap:12px; }
.zeile.zwei{ grid-template-columns:1fr 1fr; }
.zeile.drei{ grid-template-columns:1fr 1fr 1fr; }
@media (max-width:700px){ .zeile.zwei, .zeile.drei{ grid-template-columns:1fr; } }

.btn{ border:none; border-radius:999px; padding:11px 24px; margin-top:16px; font-family:"Nunito",sans-serif; font-weight:800; font-size:14px; cursor:pointer; color:white; background:var(--nacht); transition:.15s; }
.btn:hover{ background:var(--gold); color:var(--nacht); }
.btn.klein{ padding:6px 14px; font-size:12px; margin-top:0; }

.fehler{ background:#fdeceb; color:#b3382f; border:2px solid #f3c4c0; border-radius:12px; padding:10px 16px; font-size:13px; font-weight:700; margin-bottom:12px; }
.erfolg{ background:#eaf8e9; color:#2f8a3d; border:2px solid #bfe6bd; border-radius:12px; padding:10px 16px; font-size:13px; font-weight:700; margin-bottom:12px; }

.filter-leiste{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px; }
.filter-leiste select, .filter-leiste input{ width:auto; min-width:160px; }

.material-liste{ display:flex; flex-direction:column; gap:12px; }
.material-karte{ background:white; border-radius:16px; box-shadow:var(--schatten); padding:16px 20px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
.material-hauptzeile{ display:flex; align-items:center; gap:16px; flex:1; min-width:0; }

.material-thumb{
    width:52px; height:68px; flex:none; border-radius:8px; overflow:hidden;
    background:#f4f6f8; border:1px solid #e4e8ec; display:flex; align-items:center; justify-content:center;
    position:relative; z-index:1; cursor:zoom-in;
}
.material-thumb img, .material-thumb canvas{ width:100%; height:100%; object-fit:cover; display:block; }
.material-thumb i{ font-size:22px; }
.material-thumb:hover{ overflow:visible; z-index:50; }
.material-thumb:hover img, .material-thumb:hover canvas{
    position:absolute; top:50%; left:0; width:380px; height:auto; max-height:80vh;
    transform:translateY(-50%); object-fit:contain; box-shadow:0 16px 48px rgba(0,0,0,.4);
    border-radius:8px; background:white; border:1px solid #ddd;
}
.material-info h4{ margin:0 0 6px; font-size:16px; font-weight:900; }
.material-info p{ margin:0 0 8px; font-size:13px; color:#5a6b74; }
.material-meta{ display:flex; gap:8px; flex-wrap:wrap; font-size:11px; font-weight:800; }
.material-meta span{ background:#eef4f8; color:var(--meer); padding:4px 10px; border-radius:999px; }
.material-aktionen{ display:flex; gap:10px; align-items:center; }
.material-aktionen a{ font-weight:800; font-size:13px; text-decoration:none; color:var(--meer); }
.material-aktionen a.loeschen{ color:#c0392b; }
.verschieben-form{ display:flex; gap:6px; align-items:center; }
.verschieben-form input, .verschieben-form select{ width:120px; padding:6px 10px; font-size:12px; }
.verschieben-form button{ padding:6px 10px; }

.leer{ text-align:center; padding:40px; color:#a0a0a0; font-weight:700; }
</style>
</head>
<body>

<div class="wrap">

<a href="index.php" class="zurueck"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>

<header class="kopf">
<h1><i class="fa-solid fa-folder-open"></i> Materialien</h1>
<p>Eigenes Material hochladen, kategorisieren und wiederfinden</p>
</header>

<div class="karte">
    <h2>Neues Material hochladen</h2>
    <p style="font-size:12px; color:#7c8a94; margin:-8px 0 12px;">Du kannst mehrere Dateien gleichzeitig auswählen — Funktionsbereich, Klasse und Beschreibung gelten dann für alle. Der Titel wird automatisch aus jedem Dateinamen gebildet (optional mit gemeinsamem Präfix).</p>

    <?php foreach ($fehler as $f): ?>
        <div class="fehler"><?= htmlspecialchars($f) ?></div>
    <?php endforeach; ?>
    <?php if ($erfolgAnzahl > 0): ?>
        <div class="erfolg">✅ <?= $erfolgAnzahl ?> Datei<?= $erfolgAnzahl > 1 ? "en" : "" ?> gespeichert.</div>
    <?php endif; ?>

    <form method="POST" enctype="multipart/form-data">
        <input type="hidden" name="aktion" value="upload">

        <label>Titel-Präfix (optional — leer lassen für automatische Titel aus den Dateinamen)</label>
        <input type="text" name="titel" placeholder="z.B. Silbenlesen">

        <div class="zeile drei">
            <div>
                <label>Ordner</label>
                <input type="text" name="ordner" list="ordner-liste" placeholder="z.B. Klasse 3b oder Silbentraining">
                <datalist id="ordner-liste">
                    <?php foreach ($alleOrdner as $o): ?>
                        <option value="<?= htmlspecialchars($o) ?>">
                    <?php endforeach; ?>
                </datalist>
            </div>
            <div>
                <label>Funktionsbereich</label>
                <select name="bereich">
                    <?php foreach ($BEREICHE as $wert => $label): ?>
                        <option value="<?= $wert ?>"><?= $label ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div>
                <label>Klassenstufe</label>
                <select name="klasse">
                    <option value="alle">Alle Klassen</option>
                    <?php for ($k = 1; $k <= 8; $k++): ?>
                        <option value="<?= $k ?>">Klasse <?= $k ?></option>
                    <?php endfor; ?>
                </select>
            </div>
        </div>

        <label>Dateien (Mehrfachauswahl möglich)</label>
        <input type="file" name="dateien[]" multiple>

        <label>Beschreibung (optional, gilt für alle ausgewählten Dateien)</label>
        <textarea name="beschreibung" placeholder="Kurze Notiz, z.B. worauf die Übung abzielt"></textarea>

        <button type="submit" class="btn"><i class="fa-solid fa-cloud-arrow-up"></i> Hochladen</button>
    </form>
</div>

<div class="karte">
    <h2>Bibliothek durchsuchen</h2>

    <form method="GET" class="filter-leiste">
        <input type="text" name="suche" placeholder="Suche nach Titel/Notiz..." value="<?= htmlspecialchars($suche) ?>">
        <select name="filter_ordner" onchange="this.form.submit()">
            <option value="">Alle Ordner</option>
            <?php foreach ($alleOrdner as $o): ?>
                <option value="<?= htmlspecialchars($o) ?>" <?= $filterOrdner === $o ? "selected" : "" ?>><?= htmlspecialchars($o) ?></option>
            <?php endforeach; ?>
        </select>
        <select name="filter_bereich" onchange="this.form.submit()">
            <option value="">Alle Bereiche</option>
            <?php foreach ($BEREICHE as $wert => $label): ?>
                <option value="<?= $wert ?>" <?= $filterBereich === $wert ? "selected" : "" ?>><?= $label ?></option>
            <?php endforeach; ?>
        </select>
        <select name="filter_klasse" onchange="this.form.submit()">
            <option value="">Alle Klassen</option>
            <?php for ($k = 1; $k <= 8; $k++): ?>
                <option value="<?= $k ?>" <?= $filterKlasse === (string)$k ? "selected" : "" ?>>Klasse <?= $k ?></option>
            <?php endfor; ?>
        </select>
        <button type="submit" class="btn klein">Filtern</button>
    </form>

    <div id="bulk-leiste" style="display:none; align-items:center; gap:10px; background:#eef4f8; border-radius:14px; padding:10px 16px; margin-bottom:14px; flex-wrap:wrap;">
        <span id="bulk-anzahl" style="font-weight:800; font-size:13px; color:var(--nacht);"></span>
        <select id="bulk-ordner-auswahl" onchange="
            const neuFeld = document.getElementById('bulk-neuer-ordner');
            neuFeld.style.display = this.value === '__neu__' ? 'inline-block' : 'none';
            if (this.value === '__neu__') neuFeld.focus();
        ">
            <?php foreach ($alleOrdner as $o): ?>
                <option value="<?= htmlspecialchars($o) ?>"><?= htmlspecialchars($o) ?></option>
            <?php endforeach; ?>
            <option value="__neu__">➕ Neuer Ordner...</option>
        </select>
        <input type="text" id="bulk-neuer-ordner" placeholder="Name eingeben..." style="display:none; padding:6px 10px; font-size:12px;">
        <button class="btn klein" onclick="bulkVerschieben()"><i class="fa-solid fa-folder-open"></i> Ausgewählte verschieben</button>
        <button class="btn klein" style="background:#999;" onclick="auswahlAufheben()">Auswahl aufheben</button>
    </div>

    <div class="material-liste">
        <?php if (empty($gefiltert)): ?>
            <div class="leer">Noch kein Material für diese Auswahl.</div>
        <?php endif; ?>

        <?php foreach ($gefiltert as $m): ?>
            <?php
                $endung = strtolower(pathinfo($m["gespeichert_als"], PATHINFO_EXTENSION));
                $bildTypen = ["jpg","jpeg","png","gif"];
                $dateiIcons = [
                    "pdf" => ["fa-file-pdf", "#c0392b"],
                    "doc" => ["fa-file-word", "#2b579a"], "docx" => ["fa-file-word", "#2b579a"],
                    "ppt" => ["fa-file-powerpoint", "#d24726"], "pptx" => ["fa-file-powerpoint", "#d24726"],
                    "xls" => ["fa-file-excel", "#217346"], "xlsx" => ["fa-file-excel", "#217346"],
                ];
            ?>
            <div class="material-karte">
                <div class="material-hauptzeile">
                    <input type="checkbox" class="material-checkbox" value="<?= htmlspecialchars($m["id"]) ?>" onchange="checkboxGeaendert()" style="width:18px; height:18px; flex:none;">
                    <div class="material-thumb"
                         data-typ="<?= in_array($endung, $bildTypen, true) ? "bild" : ($endung === "pdf" ? "pdf" : "sonstiges") ?>"
                         data-datei="material-dateien/<?= htmlspecialchars($m["gespeichert_als"]) ?>">
                        <?php if (in_array($endung, $bildTypen, true)): ?>
                            <img src="material-dateien/<?= htmlspecialchars($m["gespeichert_als"]) ?>" alt="">
                        <?php elseif ($endung === "pdf"): ?>
                            <i class="fa-solid fa-file-pdf" style="color:#c0392b;"></i>
                        <?php else: ?>
                            <i class="fa-solid <?= $dateiIcons[$endung][0] ?? "fa-file" ?>" style="color:<?= $dateiIcons[$endung][1] ?? "#999" ?>;"></i>
                        <?php endif; ?>
                    </div>
                    <div class="material-info">
                        <h4><?= htmlspecialchars($m["titel"]) ?></h4>
                        <?php if ($m["beschreibung"]): ?><p><?= htmlspecialchars($m["beschreibung"]) ?></p><?php endif; ?>
                        <div class="material-meta">
                            <span><i class="fa-solid fa-folder"></i> <?= htmlspecialchars($m["ordner"] ?? "Allgemein") ?></span>
                            <span><?= $BEREICHE[$m["bereich"]] ?? $m["bereich"] ?></span>
                            <span><?= $m["klasse"] === "alle" ? "Alle Klassen" : "Klasse " . $m["klasse"] ?></span>
                            <span><?= htmlspecialchars($m["hochgeladen_am"]) ?></span>
                        </div>
                    </div>
                </div>
                <div class="material-aktionen">
                    <form method="GET" class="verschieben-form" onsubmit="return true;">
                        <input type="hidden" name="verschieben" value="<?= htmlspecialchars($m["id"]) ?>">
                        <select name="ordner_auswahl" class="ordner-auswahl" onchange="
                            const neuFeld = this.nextElementSibling;
                            neuFeld.style.display = this.value === '__neu__' ? 'inline-block' : 'none';
                            if (this.value === '__neu__') neuFeld.focus();
                        ">
                            <?php foreach ($alleOrdner as $o): ?>
                                <option value="<?= htmlspecialchars($o) ?>" <?= ($m["ordner"] ?? "Allgemein") === $o ? "selected" : "" ?>><?= htmlspecialchars($o) ?></option>
                            <?php endforeach; ?>
                            <option value="__neu__">➕ Neuer Ordner...</option>
                        </select>
                        <input type="text" name="neuer_ordner_name" placeholder="Name eingeben..." style="display:none;">
                        <button type="submit" class="btn klein" title="In diesen Ordner verschieben"><i class="fa-solid fa-folder-open"></i></button>
                    </form>
                    <a href="material-dateien/<?= htmlspecialchars($m["gespeichert_als"]) ?>" target="_blank"><i class="fa-solid fa-download"></i> Öffnen</a>
                    <a href="?loeschen=<?= urlencode($m["id"]) ?>" class="loeschen" onclick="return confirm('Material wirklich löschen?')"><i class="fa-solid fa-trash"></i></a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

</div>

</body>

<script>

function checkboxGeaendert(){
    const ausgewaehlt = document.querySelectorAll(".material-checkbox:checked");
    const leiste = document.getElementById("bulk-leiste");
    if (ausgewaehlt.length > 0){
        leiste.style.display = "flex";
        document.getElementById("bulk-anzahl").textContent = ausgewaehlt.length + " ausgewählt";
    } else {
        leiste.style.display = "none";
    }
}

function auswahlAufheben(){
    document.querySelectorAll(".material-checkbox:checked").forEach(cb => cb.checked = false);
    checkboxGeaendert();
}

function bulkVerschieben(){
    const ids = [...document.querySelectorAll(".material-checkbox:checked")].map(cb => cb.value);
    if (ids.length === 0){
        alert("Bitte mindestens ein Material auswählen.");
        return;
    }
    const ordnerAuswahl = document.getElementById("bulk-ordner-auswahl").value;
    const neuerName = document.getElementById("bulk-neuer-ordner").value;

    const params = new URLSearchParams();
    params.set("bulk_ids", ids.join(","));
    params.set("bulk_ordner_auswahl", ordnerAuswahl);
    params.set("bulk_neuer_ordner_name", neuerName);

    window.location.href = "materialien.php?" + params.toString();
}

if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    document.querySelectorAll('.material-thumb[data-typ="pdf"]').forEach(async (thumb) => {
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

</html>
