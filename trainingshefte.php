<?php require __DIR__ . "/auth.php"; ?>
<?php

// ---------------------------
// Speicherorte
// ---------------------------

$materialDatei = __DIR__ . "/material-daten/materialien.json";
$kinderDatei = __DIR__ . "/material-daten/kinder.json";

if (!is_dir(dirname($kinderDatei))) mkdir(dirname($kinderDatei), 0775, true);
if (!file_exists($materialDatei)) file_put_contents($materialDatei, json_encode([]));
if (!file_exists($kinderDatei)) file_put_contents($kinderDatei, json_encode([]));

// Baut die Weiterleitungs-URL zurück zur Kind-Ansicht, dabei bleiben
// die aktuell gesetzten Filter (Bereich/Klasse) erhalten.
function kindUrl($kindCode){
    $params = ["kind" => $kindCode];
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
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Trainingshefte · Leuchtturm</title>

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
</style>
</head>
<body>

<div class="wrap">

<a href="index.php" class="zurueck"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>

<header class="kopf">
<h1><i class="fa-solid fa-book-bookmark"></i> Trainingshefte</h1>
<p>Material pro Kind zuweisen — Dopplungen werden automatisch vermieden</p>
</header>

<div class="hinweis">
<i class="fa-solid fa-lock"></i>
Bitte hier <strong>keine echten Namen</strong> eintragen — nur ein Kürzel/Code, dessen Zuordnung du offline führst.
</div>

<div class="karte">
    <h2>Kinder / Trainingshefte</h2>

    <?php foreach ($fehler as $f): ?><div class="fehler"><?= htmlspecialchars($f) ?></div><?php endforeach; ?>

    <div class="kinder-liste" style="margin-bottom:18px;">
        <?php foreach ($alleKinder as $k): ?>
            <a href="?kind=<?= urlencode($k["code"]) ?>" class="kind-chip <?= $aktuellesKind === $k["code"] ? "aktiv" : "" ?>">
                <?= htmlspecialchars($k["code"]) ?>
                <span style="font-weight:400; opacity:.6;">(<?= count($k["hefte"]) ?>)</span>
                <i class="fa-solid fa-xmark loeschen" onclick="event.preventDefault(); if(confirm('Trainingsheft wirklich löschen?')) location.href='?kind_loeschen=<?= urlencode($k["code"]) ?>'"></i>
            </a>
        <?php endforeach; ?>
        <?php if (empty($alleKinder)): ?>
            <span style="color:#a0a0a0; font-weight:700; font-size:13px;">Noch keine Kinder angelegt.</span>
        <?php endif; ?>
    </div>

    <form method="POST" style="display:flex; gap:10px; align-items:flex-end;">
        <input type="hidden" name="aktion" value="kind_anlegen">
        <div style="flex:1;">
            <label>Neues Kürzel</label>
            <input type="text" name="code" placeholder="z.B. 3b-07">
        </div>
        <button type="submit" class="btn" style="margin-top:0;"><i class="fa-solid fa-plus"></i> Anlegen</button>
    </form>
</div>

<?php if ($kindDaten): ?>

<div class="spalten">

    <div class="karte">
        <h2>Verfügbares Material</h2>
        <form method="GET" class="filter-leiste">
            <input type="hidden" name="kind" value="<?= htmlspecialchars($aktuellesKind) ?>">
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
        </form>

        <div id="verf-bulk-leiste" style="display:none; align-items:center; gap:10px; background:#eef4f8; border-radius:14px; padding:10px 16px; margin-bottom:14px; flex-wrap:wrap;">
            <span id="verf-bulk-anzahl" style="font-weight:800; font-size:13px; color:var(--nacht);"></span>
            <button class="btn klein" onclick="bulkZuweisen()"><i class="fa-solid fa-plus"></i> Ausgewählte zuweisen</button>
            <button class="btn klein" style="background:#999;" onclick="verfAuswahlAufheben()">Auswahl aufheben</button>
        </div>

        <div class="mat-liste">
            <?php if (empty($verfuegbar)): ?>
                <div class="leer">Kein weiteres Material für diese Auswahl — entweder schon alles zugewiesen oder noch nichts hochgeladen.</div>
            <?php endif; ?>
            <?php foreach ($verfuegbar as $m): ?>
                <div class="mat-karte">
                    <div class="mat-hauptzeile">
                        <input type="checkbox" class="verf-checkbox" value="<?= htmlspecialchars($m["id"]) ?>" onchange="verfCheckboxGeaendert()" style="width:18px; height:18px; flex:none;">
                        <?= renderMatThumb($m, $BILD_TYPEN, $DATEI_ICONS) ?>
                        <div>
                            <h4><?= htmlspecialchars($m["titel"]) ?></h4>
                            <div class="mat-meta"><?= $BEREICHE[$m["bereich"]] ?? $m["bereich"] ?> · <?= $m["klasse"] === "alle" ? "Alle Klassen" : "Klasse " . $m["klasse"] ?></div>
                        </div>
                    </div>
                    <a class="btn-zuweisen" href="?kind=<?= urlencode($aktuellesKind) ?>&zuweisen=<?= urlencode($m["id"]) ?>"><i class="fa-solid fa-plus"></i> Zuweisen</a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="karte">
        <h2>Bereits zugewiesen (<?= count($kindDaten["hefte"]) ?>)</h2>
        <?php if (!empty($kindDaten["hefte"])): ?>
            <button class="btn" id="btn-heft-erstellen" onclick="erstelleTrainingsheft()"><i class="fa-solid fa-file-pdf"></i> Als ein PDF zusammenstellen &amp; drucken</button>
            <span id="heft-status" style="font-size:12px; color:#7c8a94; font-weight:700; margin-left:8px;"></span>
        <?php endif; ?>
        <div class="mat-liste" style="margin-top:14px;">
            <?php if (empty($kindDaten["hefte"])): ?>
                <div class="leer">Diesem Kind ist noch nichts zugewiesen.</div>
            <?php endif; ?>
            <?php foreach ($kindDaten["hefte"] as $h): ?>
                <?php $m = $materialById[$h["material_id"]] ?? null; ?>
                <?php if ($m): ?>
                    <div class="mat-karte">
                        <div class="mat-hauptzeile">
                            <?= renderMatThumb($m, $BILD_TYPEN, $DATEI_ICONS) ?>
                            <div>
                                <h4><?= htmlspecialchars($m["titel"]) ?></h4>
                                <div class="mat-meta"><?= $BEREICHE[$m["bereich"]] ?? $m["bereich"] ?> · zugewiesen am <?= htmlspecialchars($h["zugewiesen_am"]) ?></div>
                            </div>
                        </div>
                        <a class="btn-entfernen" href="?kind=<?= urlencode($aktuellesKind) ?>&entfernen=<?= urlencode($m["id"]) ?>" onclick="return confirm('Zuweisung entfernen?')"><i class="fa-solid fa-xmark"></i> Entfernen</a>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>

</div>

<script>
const HEFT_MATERIALIEN = <?php
    $heftDaten = [];
    foreach ($kindDaten["hefte"] ?? [] as $h) {
        $m = $materialById[$h["material_id"]] ?? null;
        if ($m) {
            $heftDaten[] = [
                "titel" => $m["titel"],
                "bereich" => $BEREICHE[$m["bereich"]] ?? $m["bereich"],
                "pfad" => "material-dateien/" . $m["gespeichert_als"],
                "dateiname" => $m["dateiname"],
                "endung" => strtolower(pathinfo($m["gespeichert_als"], PATHINFO_EXTENSION)),
            ];
        }
    }
    echo json_encode($heftDaten, JSON_UNESCAPED_UNICODE);
?>;
const KIND_KUERZEL = <?= json_encode($aktuellesKind ?? "", JSON_UNESCAPED_UNICODE) ?>;
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

<?php elseif (!empty($alleKinder)): ?>
    <div class="karte">
        <p style="text-align:center; color:#7c8a94; font-weight:700;">Wähle oben ein Kürzel aus, um das Trainingsheft zu verwalten.</p>
    </div>
<?php endif; ?>

</div>

</body>
</html>
