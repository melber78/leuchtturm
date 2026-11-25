<?php
require __DIR__ . "/bausteine.php";
require_once __DIR__ . "/../gast-zugang-pruefen.php";
header("Content-Type: application/manifest+json; charset=utf-8");
$b = (string)($_GET["b"] ?? "");
if (!isset(LT_BAUSTEINE[$b])) $b = "";
$name = $b ? LT_BAUSTEINE[$b][0] : "Tafelbilder";
$kurz = $b ? preg_replace('/ \(.*\)$/', "", LT_BAUSTEINE[$b][0]) : "Tafelbilder";
echo json_encode([
    "id" => "leuchtturm-tafel-" . ($b ?: "start"),
    "name" => $name, "short_name" => mb_substr($kurz, 0, 20),
    // Startadresse mit Code: Löscht der Tafel-Browser seine Cookies, meldet sich die App beim Öffnen selbst wieder an
    "start_url" => "./?" . http_build_query(array_filter(["b" => $b, "c" => (is_string($_COOKIE["lt_tafel_gast"] ?? null) && lt_gastPerCode($_COOKIE["lt_tafel_gast"])) ? $_COOKIE["lt_tafel_gast"] : (lt_tafelZugang() ? $_COOKIE["lt_tafel"] : "")])), "scope" => "./",
    "display" => "fullscreen", "display_override" => ["fullscreen", "standalone"], "orientation" => "landscape",
    "background_color" => "#eef2f6", "theme_color" => "#16324a", "lang" => "de",
    "icons" => [
        ["src" => "icons/" . ($b ?: "start") . "-192.png", "sizes" => "192x192", "type" => "image/png"],
        ["src" => "icons/" . ($b ?: "start") . "-512.png", "sizes" => "512x512", "type" => "image/png"],
        ["src" => "icons/" . ($b ?: "start") . "-512.png", "sizes" => "512x512", "type" => "image/png", "purpose" => "maskable"],
    ],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
