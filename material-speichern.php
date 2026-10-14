<?php
// ---------------------------------------------------------------
// Speichert ein im Generator erzeugtes Arbeitsblatt-PDF in der
// Materialien-Bibliothek – im gleichen Format wie materialien.php –
// und weist es auf Wunsch direkt einem Trainingsheft zu.
// Wird von lrs.php per fetch() aufgerufen, antwortet mit JSON.
// ---------------------------------------------------------------

session_start();
header("Content-Type: application/json; charset=utf-8");

function antwort($ok, $daten = []){
    echo json_encode(array_merge(["ok" => $ok], $daten), JSON_UNESCAPED_UNICODE);
    exit;
}

// Eigene Login-Prüfung statt auth.php: eine Weiterleitung auf login.php
// würde der Generator nicht verstehen, eine klare Meldung schon.
if (empty($_SESSION["leuchtturm_eingeloggt"])) {
    http_response_code(401);
    antwort(false, ["fehler" => "Du bist nicht mehr eingeloggt. Bitte in einem neuen Tab neu einloggen und dann noch einmal speichern."]);
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    antwort(false, ["fehler" => "Nur POST erlaubt."]);
}

// ---------------------------
// Speicherorte (wie materialien.php / trainingshefte.php)
// ---------------------------

$materialDatei = __DIR__ . "/material-daten/materialien.json";
$kinderDatei   = __DIR__ . "/material-daten/kinder.json";
$uploadOrdner  = __DIR__ . "/material-dateien";

if (!is_dir(dirname($materialDatei))) mkdir(dirname($materialDatei), 0775, true);
if (!is_dir($uploadOrdner)) mkdir($uploadOrdner, 0775, true);
if (!file_exists($materialDatei)) file_put_contents($materialDatei, json_encode([]));
if (!file_exists($kinderDatei)) file_put_contents($kinderDatei, json_encode([]));

// Liest eine JSON-Liste, lässt sie von $aendern bearbeiten und schreibt sie zurück –
// alles unter einer Sperre, damit sich zwei gleichzeitige Speichervorgänge nicht überschreiben.
// Ist die Datei beschädigt, wird nichts geschrieben (statt sie mit einer leeren Liste zu überschreiben).
function jsonAktualisieren($datei, callable $aendern){
    $fp = fopen($datei, "c+");
    if (!$fp) return [false, "Datei konnte nicht geöffnet werden."];
    flock($fp, LOCK_EX);

    $inhalt = stream_get_contents($fp);
    $daten = json_decode($inhalt, true);
    if (!is_array($daten)) {
        if (trim((string)$inhalt) !== "") {
            flock($fp, LOCK_UN);
            fclose($fp);
            return [false, "Die Datei " . basename($datei) . " ist beschädigt – es wurde nichts geändert."];
        }
        $daten = [];
    }

    $ergebnis = $aendern($daten);

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode(array_values($daten), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return [true, $ergebnis];
}

// ---------------------------
// Eingaben prüfen
// ---------------------------

$KLASSEN = ["alle", "1", "2", "3", "4", "5", "6", "7", "8"];
// Bereiche wie in materialien.php (inkl. Körperschema, Raumorientierung, Förderpläne & Stunden, Sonstiges)
$BEREICHE = ["aufmerksamkeit", "optdiff", "optged", "optser", "akdiff", "akged", "akser", "symptom", "koerper", "raum", "foerderplan", "sonstiges"];
$MAX_GROESSE = 25 * 1024 * 1024; // 25 MB

$datei = $_FILES["pdf"] ?? null;
if (!$datei && (int)($_SERVER["CONTENT_LENGTH"] ?? 0) > 0 && empty($_POST)) {
    // Anfrage größer als post_max_size: PHP verwirft dann alles
    antwort(false, ["fehler" => "Das PDF ist größer, als dein Webserver annimmt (Grenze: " . ini_get("post_max_size") . "). Bitte weniger Blätter auf einmal speichern."]);
}
if ($datei && in_array($datei["error"] ?? 0, [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true)) {
    antwort(false, ["fehler" => "Das PDF ist größer, als dein Webserver annimmt (Grenze: " . ini_get("upload_max_filesize") . "). Bitte weniger Blätter auf einmal speichern – oder beim Webhoster „upload_max_filesize“ erhöhen."]);
}
if (!$datei || ($datei["error"] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    antwort(false, ["fehler" => "Das PDF ist nicht beim Server angekommen (Upload-Fehler " . ($datei["error"] ?? "–") . ")."]);
}
if ($datei["size"] > $MAX_GROESSE) {
    antwort(false, ["fehler" => "Das PDF ist größer als 25 MB."]);
}
$kopf = file_get_contents($datei["tmp_name"], false, null, 0, 5);
if ($kopf !== "%PDF-") {
    antwort(false, ["fehler" => "Die Datei ist kein gültiges PDF."]);
}

$kuerzen = fn($text, $max) => mb_substr(trim(preg_replace('/\s+/', ' ', (string)$text)), 0, $max);

$titel        = $kuerzen($_POST["titel"] ?? "", 150) ?: "Worterarbeitung";
$ordner       = $kuerzen($_POST["ordner"] ?? "", 80) ?: "Worterarbeitung";
$beschreibung = $kuerzen($_POST["beschreibung"] ?? "", 500);
$klasse       = in_array($_POST["klasse"] ?? "", $KLASSEN, true) ? $_POST["klasse"] : "alle";
$bereich      = in_array($_POST["bereich"] ?? "", $BEREICHE, true) ? $_POST["bereich"] : "symptom";
$kindCode     = trim($_POST["kind"] ?? "");
// Fingerabdruck des Blatt-Inhalts aus dem Generator (erkennt doppeltes Speichern derselben Blätter)
$inhaltHash   = preg_match('/^ws-[0-9a-f]{16}-\d{1,9}$/', $_POST["inhalt_hash"] ?? "") ? $_POST["inhalt_hash"] : null;

$dateiname = preg_replace('/[^\p{L}\p{N}]+/u', "_", $titel);
$dateiname = trim($dateiname, "_") ?: "Worterarbeitung";
$dateiname = mb_substr($dateiname, 0, 80) . ".pdf";

// ---------------------------
// Material speichern (Doppelungen über den Datei-Hash erkennen, wie in materialien.php)
// ---------------------------

$hash = sha1_file($datei["tmp_name"]);
$neueId = uniqid("mat_");
$gespeichertAls = $neueId . ".pdf";

[$ok, $ergebnis] = jsonAktualisieren($materialDatei, function (&$liste) use ($hash, $inhaltHash, $neueId, $gespeichertAls, $datei, $uploadOrdner, $titel, $klasse, $bereich, $beschreibung, $ordner, $dateiname) {
    foreach ($liste as $m) {
        $gleicheDatei  = !empty($m["hash"]) && $m["hash"] === $hash;
        $gleicheBlaetter = $inhaltHash !== null && ($m["inhalt_hash"] ?? null) === $inhaltHash;
        if ($gleicheDatei || $gleicheBlaetter) {
            return ["id" => $m["id"], "titel" => $m["titel"], "schon_da" => true];
        }
    }
    if (!move_uploaded_file($datei["tmp_name"], $uploadOrdner . "/" . $gespeichertAls)) {
        return ["fehler" => "Das PDF konnte nicht im Ordner material-dateien gespeichert werden (Schreibrechte?)."];
    }
    $liste[] = [
        "id" => $neueId,
        "titel" => $titel,
        "bereich" => $bereich,
        "klasse" => $klasse,
        "beschreibung" => $beschreibung,
        "ordner" => $ordner,
        "dateiname" => $dateiname,
        "gespeichert_als" => $gespeichertAls,
        "hash" => $hash,
        "inhalt_hash" => $inhaltHash,
        "hochgeladen_am" => date("Y-m-d"),
    ];
    return ["id" => $neueId, "titel" => $titel, "schon_da" => false];
});

if (!$ok) antwort(false, ["fehler" => $ergebnis]);
if (isset($ergebnis["fehler"])) antwort(false, ["fehler" => $ergebnis["fehler"]]);

$materialId = $ergebnis["id"];
$rueckmeldung = [
    "id" => $materialId,
    "titel" => $ergebnis["titel"],
    "schon_da" => $ergebnis["schon_da"],
    "kind" => null,
];

// ---------------------------
// Optional: direkt einem Trainingsheft zuweisen (ohne Doppelungen, wie trainingshefte.php)
// ---------------------------

if ($kindCode !== "") {
    [$ok2, $zuweisung] = jsonAktualisieren($kinderDatei, function (&$kinder) use ($kindCode, $materialId) {
        foreach ($kinder as &$k) {
            if ($k["code"] !== $kindCode) continue;
            if (in_array($materialId, array_column($k["hefte"], "material_id"), true)) return "schon_zugewiesen";
            $k["hefte"][] = ["material_id" => $materialId, "zugewiesen_am" => date("Y-m-d")];
            return "zugewiesen";
        }
        unset($k);
        return "kind_fehlt";
    });

    if (!$ok2) {
        $rueckmeldung["hinweis"] = "Gespeichert, aber die Zuweisung zum Trainingsheft hat nicht geklappt: " . $zuweisung;
    } elseif ($zuweisung === "kind_fehlt") {
        $rueckmeldung["hinweis"] = "Gespeichert, aber das Trainingsheft „" . $kindCode . "“ gibt es nicht mehr.";
    } else {
        $rueckmeldung["kind"] = $kindCode;
        $rueckmeldung["kind_status"] = $zuweisung;
    }
}

antwort(true, $rueckmeldung);
