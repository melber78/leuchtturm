<?php require __DIR__ . "/auth.php"; ?>
<?php
/* ============================================================
   Leuchtturm – Handy-Widget-App herunterladen (Android, .apk)
   Die App wird bei GitHub automatisch gebaut (Branch widget-app)
   und hier mit dem Zugangsschlüssel aus den Update-Einstellungen
   abgeholt – so muss nichts von Hand hochgeladen werden.
   ?info=1 → nur Versionsangabe als JSON
   ============================================================ */
@set_time_limit(90);
$CONFIG = __DIR__ . "/material-daten/update-config.php";
$k = file_exists($CONFIG) ? (include $CONFIG) : [];
$k = (is_array($k) ? $k : []) + ["owner" => "", "repo" => "leuchtturm", "token" => ""];

function fehlerSeite($text){
    http_response_code(502);
    header("Content-Type: text/html; charset=utf-8");
    echo '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Widget-App</title></head>'
       . '<body style="font-family:system-ui,sans-serif;background:#f4f6f4;color:#16324a;padding:24px;max-width:560px;margin:auto">'
       . '<h2>Die App konnte nicht geladen werden</h2><p style="font-weight:600">' . htmlspecialchars($text) . '</p>'
       . '<p><a href="tagesplan.php#stundenplan" style="color:#3d7ea6;font-weight:700">← zurück zu Mein Tag</a></p></body></html>';
    exit;
}
function holen($k, $datei){
    $url = "https://api.github.com/repos/" . rawurlencode($k["owner"]) . "/" . rawurlencode($k["repo"]) . "/contents/" . $datei . "?ref=widget-app";
    $kopf = ["User-Agent: Leuchtturm-Widget", "Accept: application/vnd.github.raw", "X-GitHub-Api-Version: 2022-11-28"];
    if ($k["token"]) $kopf[] = "Authorization: Bearer " . $k["token"];
    if (function_exists("curl_init")) {
        $c = curl_init($url);
        curl_setopt_array($c, [CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_HTTPHEADER => $kopf, CURLOPT_TIMEOUT => 60, CURLOPT_CONNECTTIMEOUT => 15]);
        $daten = curl_exec($c); $code = curl_getinfo($c, CURLINFO_HTTP_CODE); curl_close($c);
    } else {
        $daten = @file_get_contents($url, false, stream_context_create(["http" => ["header" => implode("\r\n", $kopf), "timeout" => 60, "ignore_errors" => true]]));
        preg_match('#HTTP/\S+\s+(\d{3})#', implode("\n", $http_response_header ?? []), $m); $code = (int)($m[1] ?? 0);
    }
    if ($daten === false) return [0, null];
    return [$code, $daten];
}

if (!$k["owner"]) fehlerSeite("Die Verbindung zu GitHub ist noch nicht eingerichtet (Updates → Einstellungen).");

if (isset($_GET["info"])) {
    header("Content-Type: application/json; charset=utf-8");
    [$code, $daten] = holen($k, "version.json");
    $v = $code === 200 ? json_decode((string)$daten, true) : null;
    echo json_encode(is_array($v) ? $v + ["ok" => true] : ["ok" => false], JSON_UNESCAPED_UNICODE);
    exit;
}

[$code, $daten] = holen($k, "leuchtturm-widget.apk");
if ($code === 404) fehlerSeite("Die App ist noch nicht fertig gebaut. Bitte in ein paar Minuten noch einmal versuchen.");
if ($code === 401 || $code === 403) fehlerSeite("GitHub verweigert den Zugriff. Ist der Zugangsschlüssel in den Update-Einstellungen noch gültig?");
if ($code !== 200 || !$daten || substr($daten, 0, 2) !== "PK") fehlerSeite("GitHub antwortet nicht wie erwartet (Code $code). Bitte später noch einmal versuchen.");

header("Content-Type: application/vnd.android.package-archive");
header('Content-Disposition: attachment; filename="leuchtturm-widget.apk"');
header("Content-Length: " . strlen($daten));
header("Cache-Control: no-store");
echo $daten;
