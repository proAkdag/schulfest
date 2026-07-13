# Escape Room · Schulfest

Statische Rätsel-Werkzeuge für eine Escape-Room-Station — erreichbar per QR-Code
auf Schüler-Smartphones. Self-contained HTML, kein CDN, kein Tracking, keine
Datenerhebung, offline-tauglich nach dem ersten Laden.

**Live:** https://proakdag.github.io/schulfest/

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Einstieg / Stations-Übersicht (QR-Ziel) |
| `caesar.html` | Interaktive Caesar-Scheibe (drehbar per Finger oder Tasten) |

## Neue Station ergänzen

1. Neue `<name>.html` im selben Stil anlegen (self-contained, keine externen Quellen).
2. In `index.html` eine neue Karte im `nav.stationen`-Block verlinken.
