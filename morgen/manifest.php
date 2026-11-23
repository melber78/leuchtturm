<?php header("Content-Type: application/manifest+json; charset=utf-8"); ?>
{
 "id": "guten-morgen-tafel",
 "name": "Guten Morgen! – Tafel",
 "short_name": "Guten Morgen",
 "start_url": "./",
 "scope": "./",
 "display": "fullscreen",
 "display_override": ["fullscreen", "standalone"],
 "orientation": "landscape",
 "background_color": "#eef2f6",
 "theme_color": "#16324a",
 "lang": "de",
 "icons": [
  { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" },
  { "src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
 ]
}
