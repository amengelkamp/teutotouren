# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**heimattouren.de** — hiking web app for casual day-hikers across German regions. Users filter official, signposted hiking stages by travel time, duration, difficulty, and region. Stack: React (Vite) + Python Flask + SQLite.

## Development Setup

Two servers must run simultaneously:

```bash
# Terminal 1 — Flask API (port 5000), must be started from api/ directory
cd api && HERE_API_KEY=<key> python3 -m flask --app api run --port 5000
# Key is auto-loaded from api/.env via python-dotenv — just run:
cd api && python3 -m flask --app api run --port 5000

# Terminal 2 — Vite dev server (port 5173)
npm run dev
```

Vite proxies `/api/*` → `http://localhost:5000` and strips the `/api` prefix. So frontend calls `/api/allTrails` → Flask receives `/allTrails`.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run test         # Run all Playwright tests (needs both servers running)
npm run test:headed  # Tests with visible browser
npx playwright test --grep "Detailseite"  # Run single test group
```

Flask has no npm script for dev — start manually from `api/` with `python3 -m flask --app api run --port 5000`.

## Architecture

### Frontend (React/Vite)

`src/App.jsx` is the root. Uses `BrowserRouter` with two routes:
- `/` — `Startseite` (inline component in App.jsx): search card + results
- `/etappe/:id` — `EtappeDetail`

**Search flow:**
1. `SearchbarPart` holds the hero image, search card, and local `userCoords` state. Primary row always visible; secondary filters (Dauer, Schwierigkeit, Region) behind "Erweiterte Suchoptionen" toggle (progressive disclosure).
2. On "Suchen", calls `onSearch(userCoords)` → App sets `activeFilters` (includes coords, mode, anreisezeit)
3. `RoutesPart` renders `EtappenErgebnisse` with those filters
4. `EtappenErgebnisse` fetches `/api/allTrails` (dauer/schwierigkeit/region filter), then if `userCoords + anreisezeit` are set, calls `/api/traveltime` for each trail in parallel and filters by travel time

**State lifting:** `FormOfTravel`, `Anreisezeit`, and `FindPosition` are all controlled components — their state lives in `App.jsx` via `filters` object (`mode`, `anreisezeit`, `dauerMax`, `schwierigkeit`, `region`, `userCoords`). Default mode is `auto`.

**GPS:** `FindPosition` uses `navigator.geolocation` + Nominatim reverse geocoding. Calls `onCoordsChange(lat, lon)` when GPS succeeds.

**RegionShowcase:** Shown on homepage before search. 6 region cards with photos (gitignored, local only). Counts loaded from `/api/regionStats`. Clicking a region triggers search for that region directly.

### Backend (Flask)

Single file: `api/api.py`. Four endpoints:
- `GET /allTrails?dauer_max=&schwierigkeit=&region=` — returns all trails with optional filters
- `GET /trail/:id` — single trail with `start_lat`/`start_lon`, `gpx_path`, `laenge_km`, `typ`
- `GET /traveltime?user_lat=&user_lon=&trail_id=&mode=` — calls HERE Routing API, returns `{minutes}`
- `GET /regionStats` — returns `{region: count}` for all regions with trails

HERE transport mode mapping: `auto→car`, `bahn→transit`, `fuss→pedestrian`, `fahrrad→bicycle`. Transit uses `transit.router.hereapi.com`, all others use `router.hereapi.com`. Transit duration sums all sections (walk + train + walk).

### Database

SQLite at `SQL/teutotourenDatabase.db` (gitignored). Single table `etappen` with columns: `id, name, wanderweg, wanderweg_etappennummer, etappe_startpunkt, etappe_endpunkt, dauer, hoehenmeter, schwierigkeit, image_path, gpx_path, oepnv_hinweis, start_lat, start_lon, region, laenge_km, typ`.

`start_lat`/`start_lon` were geocoded via HERE Geocoding API (one-time migration, not in codebase as a script). GPX files in `public/gpx/`: 9 Hermannsweg tracks (`hermannsweg_etappe_0X.gpx`) from OSM Overpass, 32+ others (`wd_*.gpx`) scraped from wanderbares-deutschland.de.

### Secrets

`api/.env` holds `HERE_API_KEY` — gitignored. See `api/.env.example` for the required key. Flask loads it automatically via `python-dotenv`.

## Testing

Playwright tests in `tests/teutotouren.spec.js`. Both servers must be running. Tests use GPS mocks (`geolocation` + `permissions` in `test.use()`).

Test groups: Header, Hero & Searchcard, Filter (Dauer/Schwierigkeit), GPS-Button, Anreisezeit per Ort (Detmold/Bielefeld/Osnabrück/Dortmund), Ergebniskarten, Detailseite, API `/traveltime` Direkttests.

The `Anreisezeit` and API tests make real HERE API calls — they are slower (~3 min full suite) and depend on network.

## Roadmap

See `MVProadmap.md` in the repo root (gitignored, lives in parent dir `/home/alicia/ProductProjects/Teutotouren/`). Progress percentage is maintained at the top and updated each session. Currently at 82% — Phase 4 nearly done, Phase 5 (deployment) next.
