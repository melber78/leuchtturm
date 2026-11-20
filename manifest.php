<?php
// App-Beschreibung für Handy/iPad („Zum Home-Bildschirm“)
header("Content-Type: application/manifest+json; charset=utf-8");
echo json_encode([
    "name" => "Leuchtturm",
    "short_name" => "Leuchtturm",
    "description" => "LRS-Förderung, Sozialtraining und Lernangebot",
    "start_url" => "index.php",
    "scope" => "./",
    "display" => "standalone",
    "background_color" => "#f4f6f4",
    "theme_color" => "#16324a",
    "lang" => "de",
    "icons" => [
        ["src" => "app-icon-192.png", "sizes" => "192x192", "type" => "image/png", "purpose" => "any"],
        ["src" => "app-icon-512.png", "sizes" => "512x512", "type" => "image/png", "purpose" => "any"],
        ["src" => "app-icon-512.png", "sizes" => "512x512", "type" => "image/png", "purpose" => "maskable"],
    ],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
