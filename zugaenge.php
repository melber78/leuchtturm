<?php require __DIR__ . "/auth.php"; ?>
<?php
/* ============================================================
   Leuchtturm – Gast-Zugänge verwalten (nur für Melanie)
   Kolleginnen bekommen einen Code / Link und dürfen damit
   Sozialtraining, Lernangebot und/oder Vertretung testen.
   Gäste speichern in material-daten/gaeste/<id>/ – getrennt von dir.
   ============================================================ */
require_once __DIR__ . "/gast-zugang-pruefen.php";
date_default_timezone_set("Europe/Berlin");
function h($s){ return htmlspecialchars((string)$s, ENT_QUOTES, "UTF-8"); }
if (empty($_SESSION["zugang_csrf"])) $_SESSION["zugang_csrf"] = bin2hex(random_bytes(16));
$CSRF = $_SESSION["zugang_csrf"];

$liste = lt_gaesteLesen();
$neu = null; $meldung = "";
function ordnerLoeschen($dir){
    if (!is_dir($dir)) return;
    foreach (scandir($dir) as $f) { if ($f === "." || $f === "..") continue; $p = "$dir/$f"; is_dir($p) ? ordnerLoeschen($p) : @unlink($p); }
    @rmdir($dir);
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!hash_equals($CSRF, $_POST["csrf"] ?? "")) { $meldung = "Sitzung abgelaufen – bitte die Seite neu laden."; }
    else {
        $aktion = $_POST["aktion"] ?? "";
        $id = (string)($_POST["id"] ?? "");
        $idx = null; foreach ($liste as $i => $g) if (($g["id"] ?? "") === $id) $idx = $i;
        if ($aktion === "anlegen") {
            $bereiche = array_values(array_intersect(array_keys(LT_GAST_BEREICHE), (array)($_POST["bereiche"] ?? [])));
            $bis = !empty($_POST["dauerhaft"]) ? "" : (preg_match('/^\d{4}-\d{2}-\d{2}$/', $_POST["bis"] ?? "") ? $_POST["bis"] : date("Y-m-d", strtotime("+30 days")));
            if (!$bereiche) $meldung = "Bitte mindestens einen Bereich ankreuzen.";
            else {
                $code = lt_neuerCode();
                $g = ["id" => bin2hex(random_bytes(6)), "name" => mb_substr(trim((string)($_POST["name"] ?? "")), 0, 40), "bereiche" => $bereiche, "bis" => $bis,
                      "codeHash" => lt_codeHash($code), "erstellt" => date("Y-m-d H:i"), "zuletzt" => "", "gesperrt" => false, "v2" => true];
                $liste[] = $g; lt_gaesteSchreiben($liste);
                $neu = ["g" => $g, "code" => $code];
            }
        } elseif ($idx !== null) {
            if ($aktion === "code") { $code = lt_neuerCode(); $liste[$idx]["codeHash"] = lt_codeHash($code); $neu = ["g" => $liste[$idx], "code" => $code]; }
            elseif ($aktion === "dauerhaft") { $liste[$idx]["bis"] = ""; $liste[$idx]["gesperrt"] = false; $meldung = "Zugang gilt jetzt unbefristet."; }
            elseif ($aktion === "verlaengern") { $basis = max(time(), strtotime(($liste[$idx]["bis"] ?: date("Y-m-d")) . " 12:00")); $liste[$idx]["bis"] = date("Y-m-d", strtotime("+30 days", $basis)); $liste[$idx]["gesperrt"] = false; $meldung = "Verlängert bis " . date("d.m.Y", strtotime($liste[$idx]["bis"])) . "."; }
            elseif ($aktion === "sperren") { $liste[$idx]["gesperrt"] = empty($liste[$idx]["gesperrt"]); $meldung = $liste[$idx]["gesperrt"] ? "Zugang gesperrt." : "Zugang wieder aktiv."; }
            elseif ($aktion === "bereiche") { $b = array_values(array_intersect(array_keys(LT_GAST_BEREICHE), (array)($_POST["bereiche"] ?? []))); if ($b) { $liste[$idx]["bereiche"] = $b; $liste[$idx]["v2"] = true; $meldung = "Freigaben gespeichert."; } else $meldung = "Bitte mindestens einen Bereich ankreuzen."; }
            elseif ($aktion === "loeschen") { ordnerLoeschen(lt_gastOrdner($liste[$idx])); ordnerLoeschen(__DIR__ . "/material-dateien/gaeste/" . $liste[$idx]["id"]); array_splice($liste, $idx, 1); $meldung = "Zugang und seine gespeicherten Daten gelöscht."; }
            lt_gaesteSchreiben($liste);
        }
    }
}
$basisUrl = (( !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http") . "://" . ($_SERVER["HTTP_HOST"] ?? "") . rtrim(str_replace("\\", "/", dirname($_SERVER["SCRIPT_NAME"] ?? "/")), "/") . "/gast.php";
// Checkboxen je Gruppe (Grundschule, Tafelbilder, LRS-Förderung)
function bereichAuswahl($an, $name = ""){
    $html = "";
    foreach (LT_GAST_GRUPPEN as $gruppe => $liste) {
        $html .= '<div class="gruppe"><b>' . h($gruppe) . '</b><div class="checks">';
        foreach ($liste as $k => $n) $html .= '<label><input type="checkbox" name="bereiche[]" value="' . h($k) . '"' . (in_array($k, $an, true) ? " checked" : "") . '> ' . h($n) . '</label>';
        $html .= '</div></div>';
    }
    $wer = $name !== "" ? h($name) : "die Lehrkraft";
    return $html . '<p class="hilfe" style="margin-top:4px"><i class="fa-solid fa-lock"></i> In jedem Bereich arbeitet ' . $wer . ' mit eigenen, leeren Daten – deine Kinder-Akten, Materialien, Stundenpläne usw. sind für ' . $wer . ' nicht sichtbar.</p>';
}
// Freigaben inkl. älterer Zugänge (Lernangebot schloss die Tafelbilder ein)
function lt_gastBereiche($g){ $b = $g["bereiche"] ?? []; if (empty($g["v2"]) && in_array("lernangebot", $b, true)) $b = array_values(array_unique(array_merge($b, ["morgen", "buchstabenkurs", "leise"]))); return $b; }
function bereichNamen($g){ return implode(", ", array_map(fn($b) => preg_replace('/ \(.*\)$/', "", LT_GAST_BEREICHE[$b] ?? $b), lt_gastBereiche($g))); }
function status($g){
    if (!empty($g["gesperrt"])) return ["gesperrt", "rot"];
    if (!empty($g["bis"]) && strtotime($g["bis"] . " 23:59:59") < time()) return ["abgelaufen", "rot"];
    return ["aktiv", "gruen"];
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gast-Zugänge · Leuchtturm</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<style>
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4; --text:#1f2d36; --grau:#7c8a85; --schatten:0 6px 24px rgba(22,50,74,.1); }
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; }
.seite{ width:min(900px,94%); margin:30px auto 60px; }
a.zurueck{ color:var(--meer); font-weight:800; text-decoration:none; }
h1{ font-size:28px; font-weight:900; margin:12px 0 4px; }
.unter{ color:var(--grau); font-weight:700; margin:0 0 22px; }
.karte{ background:white; border-radius:20px; box-shadow:var(--schatten); padding:22px 24px; margin-bottom:20px; }
.karte h2{ margin:0 0 14px; font-size:19px; font-weight:900; }
label.feld{ display:block; font-weight:800; font-size:13px; color:#4a5866; margin:0 0 6px; }
input[type=text], input[type=date]{ font:700 16px "Nunito",sans-serif; padding:10px 12px; border:2px solid #d6dde3; border-radius:12px; width:100%; }
.reihe{ display:flex; gap:16px; flex-wrap:wrap; align-items:flex-end; }
.reihe > div{ flex:1 1 200px; }
.checks{ display:flex; gap:8px; flex-wrap:wrap; margin:6px 0 10px; }
.gruppe b{ display:block; font-size:13px; text-transform:uppercase; letter-spacing:.05em; color:var(--grau); margin-top:12px; }
details.aendern{ margin:-6px 0 10px; padding:0 0 10px; } details.aendern summary{ cursor:pointer; font-weight:800; color:var(--meer); font-size:14px; }
.checks label{ background:var(--schaum); border-radius:12px; padding:8px 14px; font-weight:800; display:flex; gap:8px; align-items:center; cursor:pointer; }
.btn{ font:900 15px "Nunito",sans-serif; background:var(--nacht); color:white; border:0; border-radius:12px; padding:10px 18px; cursor:pointer; display:inline-flex; gap:8px; align-items:center; }
.btn.klein{ font-size:13px; padding:7px 12px; background:#e9eef2; color:var(--nacht); }
.btn.rot{ background:#fdecea; color:#a3261c; }
.neu{ border:3px solid var(--gold); }
.code{ font:900 34px "Nunito",sans-serif; letter-spacing:.14em; color:var(--nacht); background:#fff7e6; border-radius:14px; padding:10px 18px; display:inline-block; margin:6px 0 12px; }
.link{ display:flex; gap:8px; margin-bottom:12px; } .link input{ flex:1; font-size:14px; }
textarea{ width:100%; font:600 14px/1.5 "Nunito",sans-serif; border:2px solid #d6dde3; border-radius:12px; padding:10px 12px; min-height:150px; }
.meldung{ background:#e8f5ec; color:#22693a; border-radius:12px; padding:10px 14px; font-weight:800; margin-bottom:16px; }
.gast{ display:flex; gap:14px; align-items:center; flex-wrap:wrap; border-top:1px solid #e3e8ec; padding:14px 0; }
.gast:first-of-type{ border-top:0; }
.gast .info{ flex:1 1 280px; }
.gast b{ font-size:17px; }
.gast small{ display:block; color:var(--grau); font-weight:700; }
.chip{ font-size:12px; font-weight:900; border-radius:999px; padding:3px 10px; margin-left:6px; }
.chip.gruen{ background:#e8f5ec; color:#22693a; } .chip.rot{ background:#fdecea; color:#a3261c; }
.aktionen{ display:flex; gap:6px; flex-wrap:wrap; } .aktionen form{ margin:0; }
.hilfe{ color:var(--grau); font-weight:700; font-size:14px; line-height:1.5; margin:10px 0 0; }
</style>
</head>
<body>
<main class="seite">
<a class="zurueck" href="index.php"><i class="fa-solid fa-arrow-left"></i> Leuchtturm</a>
<h1><i class="fa-solid fa-user-clock"></i> Gast-Zugänge</h1>
<p class="unter">Kolleginnen testen die Bereiche, die du freigibst – mit eigenem Code und eigenen, getrennten Daten. Deine Kinder-Akten, Materialien und Planungen sehen sie nie.</p>

<?php if ($meldung): ?><div class="meldung"><?= h($meldung) ?></div><?php endif; ?>

<?php if ($neu): $link = $basisUrl . "?code=" . rawurlencode($neu["code"]);
    $text = "Hallo" . ($neu["g"]["name"] ? " " . $neu["g"]["name"] : "") . ",\n\nhier ist dein Zugang zum Testen (" . bereichNamen($neu["g"]) . "):\n\n" . $link . "\n\nOder auf " . $basisUrl . " den Code eingeben: " . $neu["code"] . ($neu["g"]["bis"] ? "\nGültig bis " . date("d.m.Y", strtotime($neu["g"]["bis"])) . "." : "\nDer Zugang ist unbefristet.") . " Was du speicherst, siehst nur du – probier ruhig alles aus.\n\nViele Grüße\nMelanie"; ?>
<div class="karte neu">
    <h2><i class="fa-solid fa-key"></i> Zugang für <?= h($neu["g"]["name"] ?: "Gast") ?></h2>
    <div>Code:</div><div class="code"><?= h($neu["code"]) ?></div>
    <label class="feld">Link (meldet direkt an)</label>
    <div class="link"><input type="text" readonly value="<?= h($link) ?>" id="gLink"><button class="btn klein" type="button" onclick="kopieren('gLink', this)"><i class="fa-regular fa-copy"></i> Kopieren</button></div>
    <label class="feld">Nachricht zum Weitergeben</label>
    <textarea id="gText" readonly><?= h($text) ?></textarea>
    <div style="margin-top:10px"><button class="btn klein" type="button" onclick="kopieren('gText', this)"><i class="fa-regular fa-copy"></i> Nachricht kopieren</button></div>
    <p class="hilfe"><i class="fa-solid fa-circle-info"></i> Der Code wird nur jetzt angezeigt (er ist verschlüsselt gespeichert). Falls er verloren geht: unten „Neuer Code“.</p>
</div>
<?php endif; ?>

<form class="karte" method="post">
    <h2><i class="fa-solid fa-plus"></i> Neuen Zugang anlegen</h2>
    <input type="hidden" name="csrf" value="<?= h($CSRF) ?>"><input type="hidden" name="aktion" value="anlegen">
    <div class="reihe">
        <div><label class="feld">Name der Lehrkraft (z. B. „Frau Schulz“)</label><input type="text" name="name" maxlength="40" placeholder="Frau Schulz"></div>
        <div style="flex:0 1 200px"><label class="feld">Gültig bis</label><input type="date" name="bis" value="<?= date("Y-m-d", strtotime("+30 days")) ?>" min="<?= date("Y-m-d") ?>"><label style="display:flex;gap:6px;align-items:center;font-weight:800;margin-top:6px;font-size:14px"><input type="checkbox" name="dauerhaft" value="1" style="width:auto"> unbefristet</label></div>
    </div>
    <div>
        <?= bereichAuswahl(["sozial", "lernangebot", "vertretung", "morgen", "buchstabenkurs", "leise"]) ?>
    </div>
    <button class="btn" type="submit"><i class="fa-solid fa-key"></i> Zugang erstellen</button>
</form>

<div class="karte">
    <h2><i class="fa-solid fa-users"></i> Bestehende Zugänge</h2>
    <?php if (!$liste): ?><p class="hilfe" style="margin:0">Noch keine Gast-Zugänge.</p><?php endif; ?>
    <?php foreach ($liste as $g): [$st, $farbe] = status($g); ?>
    <div class="gast">
        <div class="info"><b><?= h($g["name"] ?: "Gast") ?></b><span class="chip <?= $farbe ?>"><?= $st ?></span>
            <small><?= h(bereichNamen($g)) ?> · <?= $g["bis"] ? "bis " . h(date("d.m.Y", strtotime($g["bis"]))) : "unbefristet" ?> · <?= $g["zuletzt"] ? "zuletzt angemeldet " . h(date("d.m.Y H:i", strtotime($g["zuletzt"]))) : "noch nicht angemeldet" ?></small></div>
        <div class="aktionen">
            <?php foreach ([["code", "fa-rotate", "Neuer Code", ""], ["verlaengern", "fa-calendar-plus", "+30 Tage", ""], ...($g["bis"] ? [["dauerhaft", "fa-infinity", "Unbefristet", ""]] : []), ["sperren", empty($g["gesperrt"]) ? "fa-lock" : "fa-lock-open", empty($g["gesperrt"]) ? "Sperren" : "Entsperren", ""], ["loeschen", "fa-trash", "Löschen", "rot"]] as [$a, $i, $t, $k]): ?>
            <form method="post" <?= $a === "loeschen" ? "onsubmit=\"return confirm('Zugang und alles, was dieser Gast gespeichert hat, löschen?')\"" : "" ?>><input type="hidden" name="csrf" value="<?= h($CSRF) ?>"><input type="hidden" name="aktion" value="<?= $a ?>"><input type="hidden" name="id" value="<?= h($g["id"]) ?>"><button class="btn klein <?= $k ?>" type="submit"><i class="fa-solid <?= $i ?>"></i> <?= $t ?></button></form>
            <?php endforeach; ?>
        </div>
    </div>
    <details class="aendern"><summary>Freigaben ändern</summary>
        <form method="post"><input type="hidden" name="csrf" value="<?= h($CSRF) ?>"><input type="hidden" name="aktion" value="bereiche"><input type="hidden" name="id" value="<?= h($g["id"]) ?>">
        <?= bereichAuswahl(lt_gastBereiche($g), $g["name"] ?? "") ?><button class="btn klein" type="submit"><i class="fa-solid fa-check"></i> Freigaben speichern</button></form>
    </details>
    <?php endforeach; ?>
    <p class="hilfe"><i class="fa-solid fa-shield-halved"></i> Gäste kommen nur in die angekreuzten Bereiche – und dort nur an ihre eigenen Daten. Updates und die Gast-Verwaltung bleiben immer gesperrt. Anmeldeseite für Gäste: <a href="gast.php"><?= h($basisUrl) ?></a></p>
</div>
</main>
<script>
function kopieren(id, knopf){
    const el = document.getElementById(id);
    el.select();
    const fertig = () => { const alt = knopf.innerHTML; knopf.innerHTML = '<i class="fa-solid fa-check"></i> Kopiert'; setTimeout(() => knopf.innerHTML = alt, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(el.value).then(fertig, () => { document.execCommand("copy"); fertig(); });
    else { document.execCommand("copy"); fertig(); }
}
</script>
</body>
</html>
