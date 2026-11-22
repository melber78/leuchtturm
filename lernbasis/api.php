<?php
/* Lernbasis – speichert den Lernstand im Leuchtturm (für Handy + Tablet).
   Daten + Code liegen in material-daten/lernbasis/ und werden von Updates nie angefasst.
   Beim allerersten Start legt die App einen 4-stelligen Code fest.
   Code vergessen? Datei material-daten/lernbasis/code.php löschen → neuer Code beim nächsten Start. */

date_default_timezone_set('Europe/Berlin');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$dir = dirname(__DIR__) . '/material-daten/lernbasis';
if (!is_dir($dir)) @mkdir($dir, 0775, true);
if (!file_exists("$dir/.htaccess")) @file_put_contents("$dir/.htaccess", "Require all denied\nDeny from all\n");
$codeDatei = "$dir/code.php";
$hash = file_exists($codeDatei) ? (include $codeDatei) : null;

$a = $_GET['a'] ?? '';
if ($a === 'ping') { echo json_encode(['ok' => true, 'setup' => !$hash]); exit; }

/* ---------- Erinnerung per Push (ohne Zusatzbibliothek, VAPID) ---------- */
function b64u($s) { return rtrim(strtr(base64_encode($s), '+/', '-_'), '='); }
function vapid($dir) {
  $f = "$dir/vapid.php";
  if (file_exists($f)) return include $f;
  $k = openssl_pkey_new(['curve_name' => 'prime256v1', 'private_key_type' => OPENSSL_KEYTYPE_EC]);
  openssl_pkey_export($k, $pem);
  $d = openssl_pkey_get_details($k);
  $pub = "\x04" . str_pad($d['ec']['x'], 32, "\0", STR_PAD_LEFT) . str_pad($d['ec']['y'], 32, "\0", STR_PAD_LEFT);
  $v = ['pem' => $pem, 'pub' => b64u($pub)];
  file_put_contents($f, "<?php return " . var_export($v, true) . ";\n", LOCK_EX);
  return $v;
}
function derZuRoh($der) {
  $p = 2; if (ord($der[1]) & 0x80) $p = 2 + (ord($der[1]) & 0x7f);
  $rl = ord($der[$p + 1]); $r = substr($der, $p + 2, $rl); $p += 2 + $rl;
  $sl = ord($der[$p + 1]); $s = substr($der, $p + 2, $sl);
  return str_pad(ltrim($r, "\0"), 32, "\0", STR_PAD_LEFT) . str_pad(ltrim($s, "\0"), 32, "\0", STR_PAD_LEFT);
}
function pushSenden($endpoint, $v) {
  $u = parse_url($endpoint);
  $kopf = b64u(json_encode(['typ' => 'JWT', 'alg' => 'ES256']));
  $inhalt = b64u(json_encode(['aud' => $u['scheme'] . '://' . $u['host'], 'exp' => time() + 43200, 'sub' => 'mailto:lernbasis@mewe-studio.de']));
  openssl_sign("$kopf.$inhalt", $der, $v['pem'], OPENSSL_ALGO_SHA256);
  $jwt = "$kopf.$inhalt." . b64u(derZuRoh($der));
  $c = curl_init($endpoint);
  curl_setopt_array($c, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => '', CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => ['TTL: 43200', 'Urgency: high', 'Content-Length: 0', "Authorization: vapid t=$jwt, k={$v['pub']}"]]);
  curl_exec($c); $code = curl_getinfo($c, CURLINFO_HTTP_CODE); curl_close($c);
  return $code;
}
function anAlle($dir) {
  $f = "$dir/geraete.json"; $subs = file_exists($f) ? (json_decode(file_get_contents($f), true) ?: []) : [];
  $v = vapid($dir); $n = 0;
  foreach ($subs as $ep => $info) {
    $code = pushSenden($ep, $v);
    if ($code >= 200 && $code < 300) $n++;
    elseif ($code == 404 || $code == 410) unset($subs[$ep]);   // Gerät abgemeldet
  }
  file_put_contents($f, json_encode($subs), LOCK_EX);
  return $n;
}
if ($a === 'cron') {
  $kf = "$dir/cron-key.txt";
  if (!file_exists($kf) || !hash_equals(trim(file_get_contents($kf)), (string)($_GET['key'] ?? ''))) { http_response_code(403); echo json_encode(['err' => 'key']); exit; }
  $st = file_exists("$dir/stand.json") ? json_decode(file_get_contents("$dir/stand.json"), true) : [];
  $zeit = $st['set']['remind'] ?? '16:00';
  $heute = date('Y-m-d');
  $gesendet = @file_get_contents("$dir/erinnert.txt");
  if ($gesendet === $heute) { echo json_encode(['ok' => true, 'info' => 'heute schon erledigt']); exit; }
  if (!empty($st['days'][$heute])) { file_put_contents("$dir/erinnert.txt", $heute); echo json_encode(['ok' => true, 'info' => 'heute schon gelernt']); exit; }
  if (date('H:i') < $zeit) { echo json_encode(['ok' => true, 'info' => "noch nicht $zeit"]); exit; }
  $n = anAlle($dir);
  file_put_contents("$dir/erinnert.txt", $heute);
  echo json_encode(['ok' => true, 'gesendet' => $n]); exit;
}

$in  = json_decode(file_get_contents('php://input'), true) ?: [];
$pin = (string)($in['pin'] ?? '');

// Erster Start: Code festlegen
if (!$hash) {
  if (!preg_match('/^\d{4}$/', $pin)) { echo json_encode(['err' => 'pin']); exit; }
  $hash = password_hash($pin, PASSWORD_DEFAULT);
  file_put_contents($codeDatei, "<?php return " . var_export($hash, true) . ";\n", LOCK_EX);
}

// Schutz gegen Durchprobieren: nach 10 Fehlversuchen 10 Minuten Pause
$lock = "$dir/fehlversuche.json";
$f = @json_decode(@file_get_contents($lock), true) ?: ['n' => 0, 't' => 0];
if ($f['n'] >= 10 && time() - $f['t'] < 600) { http_response_code(429); echo json_encode(['err' => 'warten']); exit; }
if (!password_verify($pin, $hash)) {
  @file_put_contents($lock, json_encode(['n' => $f['n'] + 1, 't' => time()]));
  echo json_encode(['err' => 'pin']); exit;
}
if ($f['n']) @unlink($lock);

$file = "$dir/stand.json";
if ($a === 'vapid') { echo json_encode(['ok' => true, 'key' => vapid($dir)['pub']]); exit; }
if ($a === 'sub') {
  $sub = $in['sub'] ?? null;
  if (!is_array($sub) || empty($sub['endpoint']) || !preg_match('~^https://~', $sub['endpoint'])) { echo json_encode(['err' => 'daten']); exit; }
  $f = "$dir/geraete.json"; $subs = file_exists($f) ? (json_decode(file_get_contents($f), true) ?: []) : [];
  $subs[$sub['endpoint']] = ['seit' => date('Y-m-d'), 'geraet' => substr((string)($in['dev'] ?? ''), 0, 120)];
  file_put_contents($f, json_encode($subs), LOCK_EX);
  echo json_encode(['ok' => true]); exit;
}
if ($a === 'testpush') { echo json_encode(['ok' => true, 'n' => anAlle($dir)]); exit; }
if ($a === 'cronkey') {
  $kf = "$dir/cron-key.txt";
  if (!file_exists($kf)) file_put_contents($kf, bin2hex(random_bytes(16)));
  echo json_encode(['ok' => true, 'key' => trim(file_get_contents($kf))]); exit;
}
if ($a === 'load') {
  $st = file_exists($file) ? json_decode(file_get_contents($file), true) : null;
  echo json_encode(['ok' => true, 'state' => $st], JSON_UNESCAPED_UNICODE); exit;
}
if ($a === 'save') {
  $st = $in['state'] ?? null;
  if (!is_array($st)) { echo json_encode(['err' => 'daten']); exit; }
  $cur = file_exists($file) ? json_decode(file_get_contents($file), true) : null;
  if ($cur && ($cur['updated'] ?? 0) > ($st['updated'] ?? 0)) { echo json_encode(['ok' => true, 'aelter' => true]); exit; }
  $json = json_encode($st, JSON_UNESCAPED_UNICODE);
  if (strlen($json) > 3000000) { echo json_encode(['err' => 'zu gross']); exit; }
  file_put_contents("$file.tmp", $json, LOCK_EX);
  rename("$file.tmp", $file);
  $bk = "$dir/sicherung-" . date('Y-m-d') . ".json";   // eine Sicherung pro Tag, 60 Tage aufbewahrt
  if (!file_exists($bk)) @copy($file, $bk);
  foreach (glob("$dir/sicherung-*.json") as $old) if (filemtime($old) < time() - 60 * 86400) @unlink($old);
  echo json_encode(['ok' => true]); exit;
}
echo json_encode(['err' => 'aktion']);
