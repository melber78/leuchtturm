<?php
// App-Beschreibung für Plaque Invaders (macht das Spiel als App installierbar)
header("Content-Type: application/manifest+json; charset=utf-8");
?>
{
  "name": "Plaque Invaders – Zahnputz-Spiel",
  "short_name": "Plaque Invaders",
  "description": "Zähneputzen als Weltraum-Spiel: Putzen feuert, Quatschen stört.",
  "id": "./",
  "start_url": "./",
  "scope": "./",
  "display": "fullscreen",
  "orientation": "portrait",
  "background_color": "#0b0820",
  "theme_color": "#0b0820",
  "lang": "de",
  "categories": [
    "games",
    "kids",
    "health"
  ],
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
