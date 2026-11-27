<?php
/* ============================================================
   Leuchtturm – Daten für das Handy-Widget „Mein Tag“
   Liefert die Stunden der nächsten zwei Wochen als JSON:
   Stundenplan + Änderungen des Tages + Stunde aus dem Jahresplan
   (Sozialtraining/Lernangebot) + LRS-Kürzel + weitere Termine.
   Zugang nur mit dem Widget-Schlüssel (Mein Tag → Mein Stundenplan
   → Handy-Widget), gespeichert in material-daten/widget.json.
   Nur Melanies eigene Daten, nie die von Gast-Zugängen.
   ============================================================ */
date_default_timezone_set("Europe/Berlin");
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");
header("X-Robots-Tag: noindex");
function antwort($code, $daten){ http_response_code($code); echo json_encode($daten, JSON_UNESCAPED_UNICODE); exit; }

$DATEN = __DIR__ . "/material-daten";
function lesen($datei){
    global $DATEN;
    $f = "$DATEN/$datei";
    if (!file_exists($f)) return [];
    $d = json_decode((string)file_get_contents($f), true);
    return is_array($d) ? $d : [];
}

// ---------- Schlüssel prüfen ----------
$w = lesen("widget.json");
$k = (string)($_GET["k"] ?? "");
if (empty($w["schluessel"]) || !is_string($w["schluessel"]) || strlen($k) < 20 || !hash_equals($w["schluessel"], $k)) {
    usleep(400000);
    antwort(403, ["ok" => false, "fehler" => "Der Widget-Code stimmt nicht (mehr). Bitte im Leuchtturm unter Mein Tag → Mein Stundenplan → Handy-Widget neu verbinden."]);
}

// ---------- Daten laden ----------
$tp = lesen("tagesplan.json");
$sp = is_array($tp["stundenplan"] ?? null) ? $tp["stundenplan"] : [];
$tage = is_array($tp["tage"] ?? null) ? $tp["tage"] : [];
$zeiten = is_array($sp["zeiten"] ?? null) ? $sp["zeiten"] : array_map(fn($n) => ["id" => "z$n", "typ" => "stunde", "name" => (string)$n, "von" => "", "bis" => ""], range(1, 7));
$spTage = is_array($sp["tage"] ?? null) ? $sp["tage"] : [];

const ARTEN = [
    ""           => ["frei", "#b5c0c5"],
    "sozial"     => ["Sozialtraining", "#557428"],
    "lernangebot"=> ["Lernangebot", "#2e8b57"],
    "lrs"        => ["LRS-Förderung", "#7b5cc4"],
    "foerder"    => ["Fördergruppe", "#c05a96"],
    "vertretung" => ["Vertretung", "#e07a2f"],
    "unterricht" => ["Unterricht", "#2f4a1f"],
    "aufsicht"   => ["Aufsicht", "#b08a2e"],
    "termin"     => ["Termin / Besprechung", "#c0392b"],
    "sonstiges"  => ["Sonstiges", "#7c8a85"],
];
const KLASSEN_STANDARD = [["id" => "gs1", "name" => "GS1", "stufe" => "12"], ["id" => "gs2", "name" => "GS2", "stufe" => "12"], ["id" => "gs3", "name" => "GS3", "stufe" => "34"], ["id" => "gs4", "name" => "GS4", "stufe" => "34"]];

// Jahrespläne und eigene Stunden (Sozialtraining, Lernangebot, Vertretung)
$PLAENE = [];
$TITEL = [];   // Bereich → [id → Titel] aus den fertigen Vorlagen
foreach (["sozial" => ["sozialtraining.json", "sozial-einheiten"], "lernangebot" => ["lernangebot.json", "lernangebot-einheiten"], "vertretung" => ["vertretung.json", "vertretung-einheiten"]] as $b => [$datei, $praefix]) {
    $d = lesen($datei);
    $eigene = [];
    foreach ((array)($d["einheiten"] ?? []) as $e) if (is_array($e) && !empty($e["id"])) $eigene[] = ["id" => (string)$e["id"], "titel" => (string)($e["titel"] ?? ""), "ersetzt" => (string)($e["ersetzt"] ?? "")];
    $PLAENE[$b] = ["einheiten" => $eigene, "jahresplan" => is_array($d["jahresplan"] ?? null) ? $d["jahresplan"] : null];
    $TITEL[$b] = [];
    foreach (glob(__DIR__ . "/$praefix*.js") ?: [] as $f) {
        if (preg_match_all('/\bid:\s*"([^"]+)",\s*titel:\s*"((?:[^"\\\\]|\\\\.)*)"/', (string)file_get_contents($f), $m, PREG_SET_ORDER))
            foreach ($m as $x) $TITEL[$b][$x[1]] ??= stripcslashes($x[2]);
    }
}

// ---------- Hilfen (wie in tagesplan.php) ----------
function wochentag($d){ return (int)date("N", strtotime($d)); }
function montag($d){ return date("Y-m-d", strtotime($d . " -" . (wochentag($d) - 1) . " days")); }
function abWoche($d){
    global $sp;
    $st = (string)($sp["abStart"] ?? "");
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $st)) return "";
    $w = (int)round((strtotime(montag($d)) - strtotime(montag($st))) / (7 * 86400));
    return ((($w % 2) + 2) % 2) === 0 ? "A" : "B";
}
function klassenVon($b){
    global $PLAENE;
    $k = $PLAENE[$b]["jahresplan"]["klassen"] ?? null;
    return (is_array($k) && $k) ? $k : KLASSEN_STANDARD;
}
function klasseName($b, $id){
    if ($id === "") return "";
    foreach (["sozial", "lernangebot", $b] as $bb) if (isset(ARTEN[$bb])) foreach (klassenVon($bb) as $k) if (($k["id"] ?? "") === $id) return (string)($k["name"] ?? $id);
    if (preg_match('/^sek(\d+)$/', $id, $m)) return "SEK" . $m[1];
    return strtoupper($id);
}
function planEintrag($b, $d, $klasseId){
    global $PLAENE;
    $p = $PLAENE[$b]["jahresplan"] ?? null;
    if (!$p || !is_array($p["wochen"] ?? null)) return null;
    $w = $p["wochen"][montag($d)] ?? null;
    if (!is_array($w)) return null;
    if (!empty($w["frei"])) return ["frei" => true];
    $kl = null; foreach (klassenVon($b) as $k) if (($k["id"] ?? "") === $klasseId) $kl = $k;
    if (!$kl) return null;
    $x = (array)($w["klassen"][$kl["id"]] ?? []);
    $stufe = (string)($kl["stufe"] ?? "");
    $stufenThema = (is_array($w["einheiten"] ?? null) && array_key_exists($stufe, $w["einheiten"])) ? (string)($w["einheiten"][$stufe] ?? "") : (string)($w["einheit"] ?? "");
    return ["id" => (string)($x["einheit"] ?? "") ?: (!empty($p["jeKlasse"]) ? "" : $stufenThema)];
}
function einheitTitel($b, $id){
    global $PLAENE, $TITEL;
    if (!$b || !$id || !isset($PLAENE[$b])) return "";
    foreach ($PLAENE[$b]["einheiten"] as $e) if ($e["id"] === $id || $e["ersetzt"] === $id) return $e["titel"];
    return $TITEL[$b][$id] ?? "";
}
function slotInfo($d, $zid){
    global $spTage, $tage;
    $wt = wochentag($d);
    $def = (array)($spTage[$wt][$zid] ?? $spTage[(string)$wt][$zid] ?? []);
    if (!empty($def["nurWoche"])) { $a = abWoche($d); if ($a && $a !== $def["nurWoche"]) $def = []; }
    $ov = (array)($tage[$d]["slots"][$zid] ?? []);
    $geaendert = array_key_exists("art", $ov);
    $art = (string)($geaendert ? $ov["art"] : ($def["art"] ?? ""));
    $abW = !$geaendert && (!empty($def["ab"]) || !empty($def["nurWoche"])) ? (abWoche($d) ?: "?") : "";
    $klasse = (string)($geaendert ? ($ov["klasse"] ?? "") : ($abW === "B" ? ($def["klasseB"] ?? "") : ($def["klasse"] ?? "")));
    $titel = (string)($geaendert ? ($ov["titel"] ?? "") : ($def["titel"] ?? ""));
    $raum = (string)($geaendert && array_key_exists("raum", $ov) ? $ov["raum"] : ($def["raum"] ?? ""));
    $zweit = $geaendert && array_key_exists("zweit", $ov) ? !empty($ov["zweit"]) : !empty($def["zweit"]);
    $stunde = "";
    if (!empty($ov["einheit"]["id"])) $stunde = einheitTitel((string)($ov["einheit"]["b"] ?? ""), (string)$ov["einheit"]["id"]) ?: (string)($ov["einheit"]["titel"] ?? "");
    if ($stunde === "" && ($art === "sozial" || $art === "lernangebot") && $klasse !== "" && empty($ov["ohnePlan"])) {
        $p = planEintrag($art, $d, $klasse);
        if ($p && !empty($p["frei"])) $stunde = "laut Jahresplan frei";
        elseif ($p && $p["id"] !== "") $stunde = einheitTitel($art, $p["id"]);
    }
    return compact("art", "klasse", "titel", "raum", "zweit", "abW", "stunde", "geaendert") + ["aus" => !empty($ov["entfaellt"]), "notiz" => trim((string)($ov["notiz"] ?? ""))];
}

// LRS-Stunden aus den Kinder-Akten (nur Kürzel) – je Datum, Kinder zusammen in derselben Stunde bleiben zusammen
$LRS = [];
$kinderCodes = array_map(fn($k) => (string)($k["code"] ?? ""), lesen("kinder.json"));
$lrsAus = is_array($sp["lrsAus"] ?? null) ? $sp["lrsAus"] : [];
foreach (lesen("akten.json") as $code => $a) {
    $code = (string)$code;
    if (!in_array($code, $kinderCodes, true) || in_array($code, $lrsAus, true) || !is_array($a)) continue;
    foreach ((array)($a["stunden"] ?? []) as $st) {
        $d = (string)($st["datum"] ?? "");
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $d) || $d < date("Y-m-d")) continue;
        $LRS[$d][] = ["k" => $code, "id" => (string)($st["id"] ?? ""), "i" => trim((string)($st["inhalt"] ?? ""))];
    }
}
function lrsVerteilen($d, $lrsZeilen){
    global $LRS, $tage;
    $liste = $LRS[$d] ?? [];
    $zaehl = []; foreach ($liste as $x) if ($x["i"] !== "") $zaehl[$x["i"]] = ($zaehl[$x["i"]] ?? 0) + 1;
    $gruppen = [];
    foreach ($liste as $x) { $g = ($x["i"] !== "" && $zaehl[$x["i"]] > 1) ? substr(md5($x["i"]), 0, 10) : $x["id"]; $gruppen[$g][] = $x["k"]; }
    $erg = array_fill_keys(array_keys($lrsZeilen), []);
    if (!$lrsZeilen) return $erg;
    $fest = (array)($tage[$d]["lrsSlot"] ?? []);
    foreach ($gruppen as $g => $k) if (isset($fest[$g], $erg[$fest[$g]])) { $erg[$fest[$g]][] = $k; unset($gruppen[$g]); }
    foreach ($lrsZeilen as $zid => $titel) {
        $t = preg_split('/[\s,;+\/&]+/', mb_strtolower($titel));
        foreach ($gruppen as $g => $k) if (array_intersect(array_map("mb_strtolower", $k), $t)) { $erg[$zid][] = $k; unset($gruppen[$g]); }
    }
    foreach ($lrsZeilen as $zid => $titel) if (!$erg[$zid] && $gruppen) { $erg[$zid][] = reset($gruppen); unset($gruppen[key($gruppen)]); }
    $letzte = array_key_last($lrsZeilen);
    foreach ($gruppen as $k) $erg[$letzte][] = $k;
    return $erg;
}

// ---------- Tage zusammenstellen ----------
$ergebnis = [];
for ($i = 0; $i < 15; $i++) {
    $d = date("Y-m-d", strtotime("today +$i days"));
    $wt = wochentag($d);
    $tag = (array)($tage[$d] ?? []);
    $eintraege = [];
    if ($wt <= 5) {
        $infos = [];
        foreach ($zeiten as $z) if (is_array($z) && isset($z["id"])) $infos[$z["id"]] = slotInfo($d, (string)$z["id"]);
        $lrsZeilen = [];
        foreach ($zeiten as $z) if (($z["typ"] ?? "") !== "pause" && isset($infos[$z["id"]]) && $infos[$z["id"]]["art"] === "lrs" && !$infos[$z["id"]]["aus"]) $lrsZeilen[$z["id"]] = $infos[$z["id"]]["titel"];
        $lrs = lrsVerteilen($d, $lrsZeilen);
        foreach ($zeiten as $z) {
            if (!is_array($z) || !isset($infos[$z["id"]])) continue;
            $x = $infos[$z["id"]];
            $pause = ($z["typ"] ?? "") === "pause";
            if ($pause && $x["art"] === "") continue;
            [$artName, $farbe] = ARTEN[$x["art"]] ?? ARTEN["sonstiges"];
            if ($x["art"] === "aufsicht" && $pause) $artName = "Hofpausenaufsicht";
            $wer = implode(" · ", array_filter([klasseName($x["art"], $x["klasse"]), $x["titel"]], "strlen"));
            $kinder = array_map(fn($g) => implode(" + ", $g), $lrs[$z["id"]] ?? []);
            if ($kinder && implode(" ", $kinder) === trim($x["titel"])) $kinder = [];   // steht schon in der Überschrift
            $info = array_filter([
                $x["stunde"],
                $kinder ? implode(" · ", $kinder) : "",
                $x["raum"] !== "" ? "Raum " . $x["raum"] : "",
                $x["zweit"] ? "Zweitbesetzung" : "",
                $x["geaendert"] && !$x["aus"] ? "heute geändert" : "",
            ], "strlen");
            $eintraege[] = [
                "nr" => $pause ? "" : (string)($z["name"] ?? ""),
                "von" => (string)($z["von"] ?? ""), "bis" => (string)($z["bis"] ?? ""),
                "titel" => $x["art"] === "" ? "Freistunde" : $artName . ($wer !== "" ? " · " . $wer : ""),
                "info" => implode(" · ", $info),
                "farbe" => $farbe, "art" => $x["art"], "frei" => $x["art"] === "", "aus" => $x["aus"],
            ];
        }
        // Freistunden nur zwischen belegten Stunden zeigen
        while ($eintraege && $eintraege[0]["frei"]) array_shift($eintraege);
        while ($eintraege && end($eintraege)["frei"]) array_pop($eintraege);
    }
    // Weitere Termine des Tages (auch am Wochenende)
    foreach ((array)($tag["extra"] ?? []) as $x) {
        if (!is_array($x) || trim((string)($x["titel"] ?? "")) === "") continue;
        $eintraege[] = ["nr" => "", "von" => (string)($x["von"] ?? ""), "bis" => (string)($x["bis"] ?? ""), "titel" => trim((string)$x["titel"]), "info" => "Termin", "farbe" => "#c0392b", "art" => "extra", "frei" => false, "aus" => false];
    }
    // nach Uhrzeit sortieren (ohne Uhrzeit ans Ende), Reihenfolge des Stundenplans bleibt bei gleicher Zeit
    $pos = 0; foreach ($eintraege as &$e) $e["_p"] = $pos++; unset($e);
    usort($eintraege, fn($a, $b) => [($a["von"] ?: "99:99"), $a["_p"]] <=> [($b["von"] ?: "99:99"), $b["_p"]]);
    foreach ($eintraege as &$e) unset($e["_p"]); unset($e);
    $offen = 0; foreach ((array)($tag["todos"] ?? []) as $t) if (is_array($t) && empty($t["ok"]) && trim((string)($t["t"] ?? "")) !== "") $offen++;
    $ergebnis[] = ["datum" => $d, "wochentag" => $wt, "ab" => abWoche($d), "eintraege" => $eintraege, "todos" => $offen];
}

antwort(200, ["ok" => true, "version" => 1, "stand" => date("c"), "tage" => $ergebnis]);
