<?php
/* Lernbasis – speichert den Lernstand im Leuchtturm (für Handy + Tablet).
   Daten + Code liegen in material-daten/lernbasis/ und werden von Updates nie angefasst.
   Beim allerersten Start legt die App einen 4-stelligen Code fest.
   Code vergessen? Datei material-daten/lernbasis/code.php löschen → neuer Code beim nächsten Start. */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$dir = dirname(__DIR__) . '/material-daten/lernbasis';
if (!is_dir($dir)) @mkdir($dir, 0775, true);
if (!file_exists("$dir/.htaccess")) @file_put_contents("$dir/.htaccess", "Require all denied\nDeny from all\n");
$codeDatei = "$dir/code.php";
$hash = file_exists($codeDatei) ? (include $codeDatei) : null;

$a = $_GET['a'] ?? '';
if ($a === 'ping') { echo json_encode(['ok' => true, 'setup' => !$hash]); exit; }

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
