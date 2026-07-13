# Escape Room · Schulfest

Statische Rätsel-Werkzeuge für eine Escape-Room-Station — erreichbar per QR-Code
auf Schüler-Smartphones. Self-contained HTML, kein CDN, kein Tracking, keine
Datenerhebung, offline-tauglich nach dem ersten Laden.

**Live:** https://proakdag.github.io/schulfest/

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Türwand: 4 Bereiche, jeder öffnet nur mit der richtigen Jahreszahl (QR-Ziel) |
| `raum1.html` – `raum4.html` | Die Rätsel-Räume hinter den Türen (Raum 1: Caesar-Scheibe) |
| `caesar.html` | Interaktive Caesar-Scheibe (drehbar per Finger oder Tasten) |

Geöffnete Türen merkt sich das Handy (localStorage) — beim Schulfest muss
niemand ein Jahr zweimal eingeben.

## Türen & Jahre ändern

Die Jahreszahlen stehen **absichtlich nicht im Quelltext** — nur gesalzene
SHA-256-Hashes (sonst genügt „Seite untersuchen" zum Schummeln).

1. **Frage ändern:** in `index.html` den Text im `<p class="frage">`-Element der Tür anpassen.
2. **Jahr ändern:** auf der Seite F12 → Konsole öffnen und ausführen
   (JAHR und TUER-Nummer einsetzen):

   ```js
   const jahr = '1903', tuer = '1';
   crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${jahr}·tuer${tuer}·schulfest`))
     .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('')));
   ```

   Die ausgegebene Zeichenkette als `data-hash` der jeweiligen Tür in
   `index.html` eintragen.

## Rätsel in die Räume legen

In `raum1.html` – `raum4.html` ist der Einfüge-Bereich im Quelltext markiert
(`RÄTSEL … HIER EINFÜGEN`). Self-contained bleiben: keine externen Quellen,
Bilder als `data:`-URI einbetten.
