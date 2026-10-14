<?php require __DIR__ . "/auth.php"; ?>
<?php
/* ============================================================
   Leuchtturm – Updates per Knopfdruck
   Holt die neuesten Dateien aus dem privaten GitHub-Repository,
   sichert vorher die alten Dateien und ersetzt sie dann.
   Nie angefasst werden: material-daten/, material-dateien/,
   update-backup/, auth.php und alle Konfigurationsdateien.
   ============================================================ */

@set_time_limit(120);
date_default_timezone_set("Europe/Berlin");
$DATEN   = __DIR__ . "/material-daten";
$CONFIG  = $DATEN . "/update-config.php";
$STAND   = $DATEN . "/update-stand.json";
$BACKUPS = __DIR__ . "/update-backup";
if (!is_dir($DATEN)) mkdir($DATEN, 0775, true);
if (!is_dir($BACKUPS)) mkdir($BACKUPS, 0775, true);
// Sicherungen nie direkt aus dem Web abrufbar
if (!file_exists("$BACKUPS/.htaccess")) @file_put_contents("$BACKUPS/.htaccess", "Require all denied\nDeny from all\n");

if (empty($_SESSION["update_csrf"])) $_SESSION["update_csrf"] = bin2hex(random_bytes(16));
$CSRF = $_SESSION["update_csrf"];

function h($s){ return htmlspecialchars((string)$s, ENT_QUOTES, "UTF-8"); }
function konfig(){ global $CONFIG; return file_exists($CONFIG) ? (include $CONFIG) : []; }
function stand(){ global $STAND; return file_exists($STAND) ? (json_decode(file_get_contents($STAND), true) ?: []) : []; }

// Welche Dateien dürfen ersetzt werden?
function erlaubt($pfad){
    if ($pfad === "" || strpos($pfad, "..") !== false || $pfad[0] === "/" || $pfad[0] === ".") return false;
    foreach (["material-daten/", "material-dateien/", "update-backup/", ".git", ".github/"] as $p) if (strpos($pfad, $p) === 0) return false;
    $name = strtolower(basename($pfad));
    if (in_array($name, ["auth.php", "config.php", "update-config.php", ".htaccess", "readme.md"], true)) return false;
    if (strpos($name, "config") !== false || strpos($name, "passwort") !== false) return false;
    $endung = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    return in_array($endung, ["php", "js", "css", "html", "svg", "png", "jpg", "jpeg", "webp", "gif", "woff2", "woff", "ttf", "ico"], true);
}

function github($url, $token, $binaer = false){
    $kopf = ["User-Agent: Leuchtturm-Update", "Accept: " . ($binaer ? "application/octet-stream" : "application/vnd.github+json"), "X-GitHub-Api-Version: 2022-11-28"];
    if ($token) $kopf[] = "Authorization: Bearer " . $token;
    if (function_exists("curl_init")) {
        $c = curl_init($url);
        curl_setopt_array($c, [CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_HTTPHEADER => $kopf, CURLOPT_TIMEOUT => 90, CURLOPT_CONNECTTIMEOUT => 15]);
        $antwort = curl_exec($c);
        $code = curl_getinfo($c, CURLINFO_HTTP_CODE);
        $fehler = curl_error($c);
        curl_close($c);
        if ($antwort === false) throw new Exception("Keine Verbindung zu GitHub: " . $fehler);
    } else {
        $ctx = stream_context_create(["http" => ["header" => implode("\r\n", $kopf), "timeout" => 90, "ignore_errors" => true, "follow_location" => 1]]);
        $antwort = @file_get_contents($url, false, $ctx);
        if ($antwort === false) throw new Exception("Keine Verbindung zu GitHub (der Server erlaubt keine Downloads).");
        preg_match('#HTTP/\S+\s+(\d{3})#', implode("\n", $http_response_header ?? []), $m);
        $code = (int)($m[1] ?? 0);
    }
    if ($code === 401 || $code === 403) throw new Exception("GitHub verweigert den Zugriff (Code $code). Ist der Zugangsschlüssel (Token) richtig und noch gültig?");
    if ($code === 404) throw new Exception("Repository oder Branch nicht gefunden (404). Bitte Konto, Repository und Branch prüfen.");
    if ($code >= 400) throw new Exception("GitHub antwortet mit Fehler $code.");
    return $antwort;
}

function neuesterStand($k){
    $info = json_decode(github("https://api.github.com/repos/{$k['owner']}/{$k['repo']}/commits/" . rawurlencode($k["branch"]), $k["token"]), true);
    if (empty($info["sha"])) throw new Exception("Konnte den neuesten Stand nicht lesen.");
    return ["sha" => $info["sha"], "nachricht" => $info["commit"]["message"] ?? "", "datum" => $info["commit"]["committer"]["date"] ?? ""];
}

// Lädt das Repository als ZIP und liefert [pfad => inhalt] der erlaubten Dateien
function dateienHolen($k, $sha){
    if (!class_exists("ZipArchive")) throw new Exception("Auf dem Server fehlt die PHP-Erweiterung ZipArchive.");
    $zipDaten = github("https://api.github.com/repos/{$k['owner']}/{$k['repo']}/zipball/" . rawurlencode($sha), $k["token"], true);
    $tmp = tempnam(sys_get_temp_dir(), "lt");
    file_put_contents($tmp, $zipDaten);
    $zip = new ZipArchive();
    if ($zip->open($tmp) !== true) { @unlink($tmp); throw new Exception("Das Update-Paket ist beschädigt."); }
    $dateien = [];
    for ($i = 0; $i < $zip->numFiles; $i++) {
        $name = $zip->getNameIndex($i);
        if (substr($name, -1) === "/") continue;
        $pfad = preg_replace('#^[^/]+/#', "", $name);       // oberster Ordner „konto-repo-sha/“ weg
        if (erlaubt($pfad)) $dateien[$pfad] = $zip->getFromIndex($i);
    }
    $zip->close();
    @unlink($tmp);
    ksort($dateien);
    return $dateien;
}

function sicherung($pfade, $titel){
    global $BACKUPS;
    $ziel = $BACKUPS . "/" . date("Y-m-d_H-i-s") . "_" . preg_replace('/[^a-z0-9]/i', "", $titel);
    mkdir($ziel, 0775, true);
    foreach ($pfade as $p) {
        $quelle = __DIR__ . "/" . $p;
        if (!file_exists($quelle)) continue;
        if (!is_dir(dirname("$ziel/$p"))) mkdir(dirname("$ziel/$p"), 0775, true);
        copy($quelle, "$ziel/$p");
    }
    return basename($ziel);
}

$meldung = ""; $fehler = ""; $vorschau = null;
$k = konfig();
$k += ["owner" => "", "repo" => "leuchtturm", "branch" => "main", "token" => ""];

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (!hash_equals($CSRF, $_POST["csrf"] ?? "")) throw new Exception("Sitzung abgelaufen – bitte die Seite neu laden.");
        $aktion = $_POST["aktion"] ?? "";

        if ($aktion === "speichern") {
            $neu = [
                "owner" => trim($_POST["owner"] ?? ""),
                "repo" => trim($_POST["repo"] ?? "leuchtturm"),
                "branch" => trim($_POST["branch"] ?? "main") ?: "main",
                "token" => trim($_POST["token"] ?? "") ?: $k["token"],
            ];
            if (!preg_match('/^[A-Za-z0-9_.-]+$/', $neu["owner"]) || !preg_match('/^[A-Za-z0-9_.-]+$/', $neu["repo"])) throw new Exception("Bitte GitHub-Konto und Repository-Namen prüfen.");
            file_put_contents($CONFIG, "<?php\nreturn " . var_export($neu, true) . ";\n");
            $k = $neu;
            $meldung = "Einstellungen gespeichert.";
        }

        if ($aktion === "pruefen" || $aktion === "installieren") {
            if (!$k["owner"]) throw new Exception("Bitte zuerst unten die GitHub-Einstellungen eintragen.");
            $neuester = $aktion === "installieren" && preg_match('/^[0-9a-f]{40}$/', $_POST["sha"] ?? "") ? ["sha" => $_POST["sha"], "nachricht" => $_POST["nachricht"] ?? "", "datum" => $_POST["datum"] ?? ""] : neuesterStand($k);
            $dateien = dateienHolen($k, $neuester["sha"]);
            $liste = [];
            foreach ($dateien as $pfad => $inhalt) {
                $lokal = __DIR__ . "/" . $pfad;
                $art = !file_exists($lokal) ? "neu" : (md5_file($lokal) === md5($inhalt) ? "gleich" : "geändert");
                $liste[] = ["pfad" => $pfad, "art" => $art, "groesse" => strlen($inhalt)];
            }

            if ($aktion === "pruefen") {
                $vorschau = ["stand" => $neuester, "liste" => $liste];
            } else {
                $gewaehlt = array_values(array_intersect(array_keys($dateien), (array)($_POST["dateien"] ?? [])));
                $gewaehlt = array_values(array_filter($gewaehlt, function($p) use ($dateien){ return !file_exists(__DIR__ . "/" . $p) || md5_file(__DIR__ . "/" . $p) !== md5($dateien[$p]); }));
                if (!$gewaehlt) throw new Exception("Keine geänderten Dateien ausgewählt – es gibt nichts zu installieren.");
                $backup = sicherung($gewaehlt, substr($neuester["sha"], 0, 7));
                $ok = 0;
                foreach ($gewaehlt as $p) {
                    $ziel = __DIR__ . "/" . $p;
                    if (!is_dir(dirname($ziel))) mkdir(dirname($ziel), 0775, true);
                    // erst als Temp-Datei schreiben, dann umbenennen (keine halb geschriebenen Dateien)
                    if (file_put_contents($ziel . ".neu", $dateien[$p]) !== false && rename($ziel . ".neu", $ziel)) $ok++;
                }
                file_put_contents($STAND, json_encode(["sha" => $neuester["sha"], "nachricht" => $neuester["nachricht"], "datum" => $neuester["datum"], "installiert" => date("c"), "backup" => $backup, "dateien" => $gewaehlt], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
                $meldung = "✅ $ok von " . count($gewaehlt) . " Dateien aktualisiert. Die alten Dateien sind gesichert (" . h($backup) . ").";
            }
        }

        if ($aktion === "zurueck") {
            $name = basename($_POST["backup"] ?? "");
            $ordner = $BACKUPS . "/" . $name;
            if (!$name || !is_dir($ordner)) throw new Exception("Sicherung nicht gefunden.");
            $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($ordner, FilesystemIterator::SKIP_DOTS));
            $n = 0;
            foreach ($it as $datei) {
                $p = ltrim(str_replace("\\", "/", substr($datei->getPathname(), strlen($ordner))), "/");
                if (!erlaubt($p)) continue;
                if (copy($datei->getPathname(), __DIR__ . "/" . $p)) $n++;
            }
            $meldung = "↩️ $n Dateien aus der Sicherung „" . h($name) . "“ wiederhergestellt.";
            @unlink($STAND);
        }
    }
} catch (Exception $e) {
    $fehler = $e->getMessage();
}

$stand = stand();
$sicherungen = array_reverse(array_values(array_filter(scandir($BACKUPS), function($d) use ($BACKUPS){ return $d[0] !== "." && is_dir("$BACKUPS/$d"); })));
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Leuchtturm – Updates</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<style>
:root{ --nacht:#16324a; --meer:#3d7ea6; --gold:#f2a93b; --schaum:#f4f6f4; --text:#1f2d36; --schatten:0 6px 24px rgba(22,50,74,.1); }
*{ box-sizing:border-box; }
body{ margin:0; background:var(--schaum); color:var(--text); font-family:"Nunito",sans-serif; }
.wrap{ width:min(820px,94%); margin:36px auto 60px; }
a.zurueck{ color:var(--meer); font-weight:800; text-decoration:none; }
h1{ font-size:28px; font-weight:900; margin:18px 0 6px; }
.sub{ color:#7c8a85; font-weight:700; margin:0 0 22px; }
.karte{ background:#fff; border-radius:20px; box-shadow:var(--schatten); padding:22px 24px; margin-bottom:20px; }
.karte h2{ font-size:17px; font-weight:900; margin:0 0 12px; color:var(--nacht); }
.btn{ display:inline-flex; align-items:center; gap:8px; background:var(--nacht); color:#fff; border:0; border-radius:999px; padding:12px 22px; font:800 15px "Nunito",sans-serif; cursor:pointer; }
.btn.gold{ background:var(--gold); color:var(--nacht); }
.btn.klein{ padding:8px 14px; font-size:13px; background:var(--meer); }
.ok{ background:#e6f4ea; color:#1e6b34; border-radius:14px; padding:12px 16px; font-weight:800; margin-bottom:16px; }
.fehler{ background:#fdecea; color:#a3261b; border-radius:14px; padding:12px 16px; font-weight:800; margin-bottom:16px; }
label{ display:block; font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:.4px; color:#5b6b75; margin:10px 0 4px; }
input[type=text], input[type=password]{ width:100%; padding:11px 13px; border:2px solid #dfe6ec; border-radius:12px; font:700 15px "Nunito",sans-serif; }
.zeile{ display:grid; grid-template-columns:1fr 1fr 120px; gap:12px; }
@media (max-width:600px){ .zeile{ grid-template-columns:1fr; } }
table{ width:100%; border-collapse:collapse; font-size:14px; }
td, th{ padding:7px 8px; border-bottom:1px solid #edf1f4; text-align:left; }
.art-neu{ color:#1e6b34; font-weight:900; } .art-geändert{ color:#b06a00; font-weight:900; } .art-gleich{ color:#9aa7b0; }
.hinweis{ font-size:13px; color:#6b7a84; }
code{ background:#eef2f5; padding:1px 6px; border-radius:6px; }
</style>
</head>
<body>
<div class="wrap">
<a class="zurueck" href="index.php"><i class="fa-solid fa-arrow-left"></i> Zurück zum Leuchtturm</a>
<h1><i class="fa-solid fa-cloud-arrow-down" style="color:var(--meer);"></i> Updates</h1>
<p class="sub">Neue Versionen des Leuchtturms mit einem Klick installieren.</p>

<?php if ($meldung): ?><div class="ok"><?= $meldung ?></div><?php endif; ?>
<?php if ($fehler): ?><div class="fehler"><i class="fa-solid fa-triangle-exclamation"></i> <?= h($fehler) ?></div><?php endif; ?>

<div class="karte">
    <h2>Installierter Stand</h2>
    <?php if ($stand): ?>
        <p style="margin:0;"><b><?= h(strtok($stand["nachricht"], "\n")) ?></b><br>
        <span class="hinweis">Version <?= h(substr($stand["sha"], 0, 7)) ?> · installiert am <?= h(date("d.m.Y, H:i", strtotime($stand["installiert"]))) ?> Uhr · <?= count($stand["dateien"] ?? []) ?> Dateien</span></p>
    <?php else: ?>
        <p class="hinweis" style="margin:0;">Noch kein Update über diese Seite installiert.</p>
    <?php endif; ?>
    <form method="post" style="margin-top:16px;">
        <input type="hidden" name="csrf" value="<?= h($CSRF) ?>">
        <button class="btn gold" name="aktion" value="pruefen"><i class="fa-solid fa-magnifying-glass"></i> Nach Updates suchen</button>
    </form>
</div>

<?php if ($vorschau): $geaendert = array_filter($vorschau["liste"], function($x){ return $x["art"] !== "gleich"; }); ?>
<div class="karte">
    <h2>Neuester Stand: <?= h(strtok($vorschau["stand"]["nachricht"], "\n")) ?></h2>
    <p class="hinweis" style="margin-top:-6px;">Version <?= h(substr($vorschau["stand"]["sha"], 0, 7)) ?> vom <?= h(date("d.m.Y, H:i", strtotime($vorschau["stand"]["datum"]))) ?> Uhr</p>
    <?php if (!$geaendert): ?>
        <div class="ok" style="margin:0;">Alles ist aktuell – es gibt nichts zu installieren.</div>
    <?php else: ?>
    <form method="post">
        <input type="hidden" name="csrf" value="<?= h($CSRF) ?>">
        <input type="hidden" name="sha" value="<?= h($vorschau["stand"]["sha"]) ?>">
        <input type="hidden" name="nachricht" value="<?= h($vorschau["stand"]["nachricht"]) ?>">
        <input type="hidden" name="datum" value="<?= h($vorschau["stand"]["datum"]) ?>">
        <table>
            <tr><th style="width:30px;"></th><th>Datei</th><th>Änderung</th><th style="text-align:right;">Größe</th></tr>
            <?php foreach ($vorschau["liste"] as $d): if ($d["art"] === "gleich") continue; ?>
            <tr><td><input type="checkbox" name="dateien[]" value="<?= h($d["pfad"]) ?>" checked></td><td><code><?= h($d["pfad"]) ?></code></td>
                <td class="art-<?= h($d["art"]) ?>"><?= h($d["art"]) ?></td><td style="text-align:right;"><?= number_format($d["groesse"] / 1024, 0, ",", ".") ?> KB</td></tr>
            <?php endforeach; ?>
        </table>
        <p class="hinweis"><?= count($vorschau["liste"]) - count($geaendert) ?> weitere Dateien sind bereits aktuell. Deine Daten (Materialien, Kartei, Trainingshefte) werden nie verändert. Vor dem Installieren werden die alten Dateien gesichert.</p>
        <button class="btn" name="aktion" value="installieren"><i class="fa-solid fa-download"></i> Jetzt installieren</button>
    </form>
    <?php endif; ?>
</div>
<?php endif; ?>

<div class="karte">
    <h2>Sicherungen</h2>
    <?php if (!$sicherungen): ?>
        <p class="hinweis" style="margin:0;">Noch keine Sicherungen vorhanden.</p>
    <?php else: ?>
    <p class="hinweis" style="margin-top:0;">Falls nach einem Update etwas nicht stimmt: Sicherung wählen und die vorherigen Dateien zurückholen.</p>
    <form method="post" style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;" onsubmit="return confirm('Die Dateien aus dieser Sicherung wiederherstellen?');">
        <input type="hidden" name="csrf" value="<?= h($CSRF) ?>">
        <select name="backup" style="padding:9px 12px; border:2px solid #dfe6ec; border-radius:12px; font:700 14px Nunito,sans-serif;">
            <?php foreach (array_slice($sicherungen, 0, 15) as $s): ?><option value="<?= h($s) ?>"><?= h($s) ?></option><?php endforeach; ?>
        </select>
        <button class="btn klein" name="aktion" value="zurueck"><i class="fa-solid fa-rotate-left"></i> Wiederherstellen</button>
    </form>
    <?php endif; ?>
</div>

<details class="karte" <?= $k["owner"] ? "" : "open" ?>>
    <summary style="cursor:pointer; font-weight:900; color:var(--nacht);">GitHub-Einstellungen <?= $k["owner"] ? "(eingerichtet: " . h($k["owner"] . "/" . $k["repo"]) . ")" : "– bitte einmalig einrichten" ?></summary>
    <form method="post" autocomplete="off">
        <input type="hidden" name="csrf" value="<?= h($CSRF) ?>">
        <div class="zeile">
            <div><label>GitHub-Konto</label><input type="text" name="owner" value="<?= h($k["owner"]) ?>" placeholder="z. B. melanie-b"></div>
            <div><label>Repository</label><input type="text" name="repo" value="<?= h($k["repo"]) ?>"></div>
            <div><label>Branch</label><input type="text" name="branch" value="<?= h($k["branch"]) ?>"></div>
        </div>
        <label>Zugangsschlüssel (Token, nur Lesen)</label>
        <input type="password" name="token" placeholder="<?= $k["token"] ? "gespeichert – leer lassen, um ihn zu behalten" : "github_pat_…" ?>">
        <p class="hinweis">Der Schlüssel wird nur auf deinem Server gespeichert und nirgends angezeigt.</p>
        <button class="btn klein" name="aktion" value="speichern"><i class="fa-solid fa-floppy-disk"></i> Speichern</button>
    </form>
</details>
</div>
</body>
</html>
