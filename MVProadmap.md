# Teutotouren MVP-Roadmap

**Gesamtfortschritt: 57% (27/47 Tasks abgeschlossen) — Phase 2b fertig ✓**
> Wird bei jeder Arbeitssession aktualisiert.

**Zielgruppe:** Casual Day-Hiker  
**Region:** Teutoburger Wald / Hermannsweg (MVP-Fokus)  
**Stack:** React (Vite) + Python Flask + SQLite  

---

## Phase 1 — Tech-Schulden & Datenbasis

- [x] Bilder aus SQLite raus → `/public/images/` Ordner, DB speichert nur Pfad
- [x] `jsonify` Import-Bug in `api.py` fixen
- [x] DB-Pfad absolut oder via Env-Variable, nicht relativ
- [x] `.venv` + `teutotourenDatabase.db` aus Git entfernen, `.gitignore` updaten
- [ ] GPX-Tracks beschaffen (Waymarked Trails / Overpass) — eine Datei pro Etappe
- [x] DB-Schema erweitern: `schwierigkeit`, `gpx_path`, `oepnv_hinweis`, `image_path`
- [x] Bestehendes Foto-Insert-Script auf neue Struktur migrieren

---

## Phase 2 — Suchfilter

- [x] Filter: Dauer in Stunden (primär) — Slider
- [x] Filter: Schwierigkeit — leicht / mittel / schwer (sekundär) — Buttons
- [x] Backend-Endpunkt `/allTrails` erweitert um Filterparameter
- [x] Frontend: Filter-UI in `SearchbarPart` einbauen
- [x] TravelLength (Reisezeit in Tagen) entfernt — nicht MVP-relevant

---

## Phase 2b — UI/UX Redesign (Orientierung: booking.com + urlaubsguru.de)

**Ziel:** Professioneller, vertrauenswürdiger Look der Nutzer sofort abholt.

### Hero & Suche
- [x] Hero-Section: Vollbild-Landschaftsfoto mit Suche als weißes Card-Overlay
- [x] Suchleiste als horizontale Pill-Row: Standort | Reiseart | Dauer | Schwierigkeit | Suchen-Button
- [x] Suchen-Button: grün, prominent, mit Lupe-Icon

### Ergebniskarten (wie urlaubsguru Deal-Cards)
- [x] Card-Layout statt Listenzeilen: großes Foto oben (16:9), Info darunter
- [x] Schwierigkeit als farbiger Badge oben-rechts auf dem Foto
- [x] Chips für Dauer, Höhenmeter, Etappennummer — kompakt, scanbar
- [x] ÖPNV-Hinweis als kleine Info-Zeile mit Bus-Icon unten in der Card
- [x] "Details →" CTA-Button pro Card (Link zur Detailseite Phase 4)
- [x] Hover-Effekt auf Cards (leichter Schatten / leichtes Hochziehen)

### Filter-Leiste über Ergebnissen (wie booking.com)
- [x] Horizontale Chip-Filterleiste direkt über den Ergebniskarten
- [~] Aktive Filter als geschlossene Chips mit X zum Entfernen — bewusst gestrichen (MVP: Filter direkt sichtbar im Searchcard)
- [x] Ergebnisanzahl anzeigen: "9 Etappen gefunden"

### Allgemein
- [x] Responsive: Mobile-First, Cards stacken auf < 768px
- [x] Farbpalette: Dunkelgrün `#184D47` (Header/Accent) + Weiß + helles Grau als Hintergrund
- [x] Schriftart: Google Font einbinden (Inter + Poppins)
- [x] Favicon + App-Titel im Browser-Tab

---

## Phase 3 — Anreisezeitberechnung

**APIs:** ORS (Auto/Fuß, kostenlos) + HERE Routing (Bahn/ÖPNV, 250k Req/Monat kostenlos, keine Kreditkarte)

- [ ] ORS API-Key besorgen (openrouteservice.org, kostenlos)
- [ ] HERE API-Key besorgen (developer.here.com, kostenlos, keine Kreditkarte)
- [ ] Backend: `/traveltime`-Endpunkt — nimmt Nutzerkoordinaten + Etappen-Startpunkt + Reiseart
- [ ] ORS-Aufruf für Auto / Fußweg → Fahrzeit in Minuten
- [ ] HERE Routing API für Bahn/ÖPNV → Fahrzeit in Minuten
- [ ] Frontend: Anreisezeit-Filter nutzt echte berechnete Zeit statt manuelle Auswahl
- [ ] Etappen filtern: nur anzeigen wenn Anreisezeit ≤ gewähltem Maximum

---

## Phase 4 — Detailseite

- [ ] `react-router-dom` installieren
- [ ] Route `/etappe/:id` anlegen
- [ ] `leaflet` installieren, Karte mit GPX-Track einbetten
- [ ] Höhenprofil aus GPX berechnen + anzeigen
- [ ] GPX-Download-Button
- [ ] ÖPNV-Hinweis pro Etappe anzeigen
- [ ] Backend: Endpunkt `/trail/:id` für Einzeletappe

---

## Phase 5 — Deployment

- [ ] Gespräch mit Sysadmin: Hetzner VPS Setup
- [ ] Flask hinter nginx, React-Build als statische Files
- [ ] SQLite-DB außerhalb des Repo auf Server
- [ ] Domain verknüpfen, HTTPS via Let's Encrypt

---

## Phase 6 — Distribution

- [ ] SEO: eine Seite pro Etappe, Titel/Meta auf "Hermannsweg Etappe X" optimiert
- [ ] Tourismusverband Teutoburger Wald kontaktieren
- [ ] Socials aufbauen (parallel, kein Blocker für Launch)

---

**Reihenfolge ist Pflicht** — Phase 1 blockiert alles andere. Phase 3 und 4 können parallel laufen wenn Phase 2 fertig.
