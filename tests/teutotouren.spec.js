import { test, expect, request } from '@playwright/test';

// Testorte mit realen Koordinaten
const ORTE = {
    detmold:   { latitude: 51.9342, longitude: 8.8827 },  // Im Teutoburger Wald
    bielefeld: { latitude: 51.9806, longitude: 8.5317 },  // ~25 km
    osnabrueck:{ latitude: 52.2799, longitude: 8.0472 },  // ~60 km
    hannover:  { latitude: 52.3759, longitude: 9.7320 },  // ~100 km
    dortmund:  { latitude: 51.5136, longitude: 7.4653 },  // ~120 km
};

// ─── Helper ──────────────────────────────────────────────────────────────────

async function sucheOhneGPS(page) {
    await page.goto('/');
    await page.locator('.searchBtn').click();
    await page.waitForSelector('.etappenCard', { timeout: 10000 });
}

async function gpsErmittelnUndSuchen(page, mode, anreisezeit) {
    await page.locator('.positionGpsBtn').click();
    await expect(page.locator('.positionGpsBtn')).not.toBeDisabled({ timeout: 15000 });
    if (mode === 'auto') await page.locator('.segmentBtn', { hasText: 'Auto' }).click();
    if (anreisezeit) await page.locator('.anreisezeitSelect').selectOption(anreisezeit);
    await page.locator('.searchBtn').click();
}

// ─── Header ──────────────────────────────────────────────────────────────────

test.describe('Header', () => {
    test('Logo und Slogan sichtbar', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.teutotourenLogo')).toContainText('heimattouren');
        await expect(page.locator('.logoSlogan')).toContainText('Urlaub zuhause.');
    });

    test('Logo-Klick navigiert zur Startseite', async ({ page }) => {
        await page.goto('/etappe/1');
        await page.locator('.headerLogoBlock').click();
        await expect(page).toHaveURL('/');
    });

    test('Nav-Buttons vorhanden', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.headerNavBtn')).toHaveCount(3);
    });
});

// ─── Hero & Searchcard ────────────────────────────────────────────────────────

test.describe('Hero & Searchcard', () => {
    test('Hero-Bild lädt', async ({ page }) => {
        await page.goto('/');
        const img = page.locator('.heroImage');
        await expect(img).toBeVisible();
        const src = await img.getAttribute('src');
        expect(src).toContain('wandernImWald01_header.jpg');
    });

    test('Searchcard mit allen Feldern sichtbar', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.searchCard')).toBeVisible();
        await expect(page.locator('.searchFieldLabel').filter({ hasText: 'STARTPUNKT' })).toBeVisible();
        await expect(page.locator('.searchFieldLabel').filter({ hasText: 'REISEART' })).toBeVisible();
        await expect(page.locator('.searchFieldLabel').filter({ hasText: 'MAX. ANREISEZEIT' })).toBeVisible();
        await expect(page.locator('.searchBtn')).toBeVisible();
    });

    test('Suchen ohne GPS zeigt alle 9 Etappen', async ({ page }) => {
        await sucheOhneGPS(page);
        await expect(page.locator('.etappenCard')).toHaveCount(9);
    });
});

// ─── Filter: Dauer ────────────────────────────────────────────────────────────

test.describe('Filter: Dauer', () => {
    test('Slider auf 5 Std. reduziert Ergebnisse', async ({ page }) => {
        await page.goto('/');
        await page.locator('input[type="range"]').fill('5');
        await page.locator('.searchBtn').click();
        await page.waitForSelector('.etappenCard', { timeout: 10000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThan(9);
    });
});

// ─── Filter: Schwierigkeit ────────────────────────────────────────────────────

test.describe('Filter: Schwierigkeit', () => {
    test('"Leicht" zeigt nur leichte Etappen', async ({ page }) => {
        await page.goto('/');
        await page.locator('.schwierigkeitChip', { hasText: 'Leicht' }).click();
        await page.locator('.searchBtn').click();
        await page.waitForSelector('.etappenCard', { timeout: 10000 });
        const badges = page.locator('.cardBadge');
        const count = await badges.count();
        for (let i = 0; i < count; i++) {
            await expect(badges.nth(i)).toContainText('leicht');
        }
    });
});

// ─── GPS & Standortermittlung ─────────────────────────────────────────────────

test.describe('GPS-Button', () => {
    test.use({ geolocation: ORTE.detmold, permissions: ['geolocation'] });

    test('ermittelt Standort und zeigt Adresse', async ({ page }) => {
        await page.goto('/');
        await page.locator('.positionGpsBtn').click();
        await expect(page.locator('.positionGpsBtn')).not.toBeDisabled({ timeout: 15000 });
        const val = await page.locator('.positionInput').inputValue();
        expect(val).not.toBe('');
        expect(val).not.toContain('Wird ermittelt');
        expect(val).not.toContain('nicht verfügbar');
    });
});

// ─── Anreisezeit: konkrete Orte & Fahrzeiten ──────────────────────────────────
//
// Erwartete Fahrzeiten (HERE Routing, ohne Echtzeit-Traffic):
//   Detmold    → nächste Etappe: Auto ~10 Min,  Bahn ~25 Min
//   Bielefeld  → nächste Etappe: Auto ~30 Min,  Bahn ~45 Min
//   Osnabrück  → nächste Etappe: Auto ~60 Min,  Bahn ~90 Min
//   Hannover   → nächste Etappe: Auto ~90 Min,  Bahn ~120 Min
//   Dortmund   → nächste Etappe: Auto ~100 Min, Bahn ~150 Min

test.describe('Anreisezeit: Detmold (nah, ~10 Min Auto)', () => {
    test.use({ geolocation: ORTE.detmold, permissions: ['geolocation'] });

    test('Auto 30 Min — zeigt Etappen (Detmold ist direkt dabei)', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '30');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
    });

    test('Bahn 60 Min — zeigt Etappen (Detmold hat Bahn-Anschluss)', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'bahn', '60');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe('Anreisezeit: Bielefeld (~25 km, ~30 Min Auto)', () => {
    test.use({ geolocation: ORTE.bielefeld, permissions: ['geolocation'] });

    test('Auto 30 Min — findet Etappen im Teutoburger Wald', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '30');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
    });

    test('Auto 30 Min — alle Anreise-Chips ≤ 30 Min', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '30');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const chips = page.locator('.cardChip').filter({ hasText: 'Min. Anreise' });
        const count = await chips.count();
        for (let i = 0; i < count; i++) {
            const minutes = parseInt((await chips.nth(i).innerText()).match(/\d+/)?.[0] ?? '0');
            expect(minutes).toBeLessThanOrEqual(30);
        }
    });

    test('Bahn 60 Min — findet Etappen', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'bahn', '60');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe('Anreisezeit: Osnabrück (~60 km, ~60 Min Auto)', () => {
    test.use({ geolocation: ORTE.osnabrueck, permissions: ['geolocation'] });

    test('Auto 60 Min — findet noch Etappen', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '60');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
    });

    test('Auto 30 Min — findet weniger oder keine Etappen als bei 60 Min', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '60');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const mit60 = await page.locator('.etappenCard').count();

        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '30');
        await page.waitForTimeout(5000);
        const mit30 = await page.locator('.etappenCard').count();

        expect(mit30).toBeLessThanOrEqual(mit60);
    });
});

test.describe('Anreisezeit: Dortmund (weit, ~120 km)', () => {
    test.use({ geolocation: ORTE.dortmund, permissions: ['geolocation'] });

    test('Auto 60 Min — keine Etappen erreichbar', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '60');
        await page.waitForTimeout(8000);
        const cards = page.locator('.etappenCard');
        const count = await cards.count();
        expect(count).toBe(0);
    });

    test('Auto 120 Min — Etappen erreichbar', async ({ page }) => {
        await page.goto('/');
        await gpsErmittelnUndSuchen(page, 'auto', '120');
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
    });
});

// ─── Ergebniskarten ───────────────────────────────────────────────────────────

test.describe('Ergebniskarten', () => {
    test.beforeEach(async ({ page }) => { await sucheOhneGPS(page); });

    test('Karten zeigen Name, Route, Chips und CTA', async ({ page }) => {
        const card = page.locator('.etappenCard').first();
        await expect(card.locator('.cardTitle')).not.toBeEmpty();
        await expect(card.locator('.cardRoute')).toContainText('→');
        await expect(card.locator('.cardChip').first()).toBeVisible();
        await expect(card.locator('.cardCta')).toContainText('Details');
    });

    test('Ergebnisanzahl stimmt mit Kartenanzahl überein', async ({ page }) => {
        const anzahlText = await page.locator('.ergebnisAnzahl').innerText();
        const anzahl = parseInt(anzahlText);
        await expect(page.locator('.etappenCard')).toHaveCount(anzahl);
    });

    test('"Details ansehen" navigiert zur Detailseite', async ({ page }) => {
        await page.locator('.etappenCard').first().locator('.cardCta').click();
        await expect(page).toHaveURL(/\/etappe\/\d+/);
    });
});

// ─── Phase 4: Detailseite ─────────────────────────────────────────────────────

test.describe('Detailseite', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/etappe/1');
        await page.waitForSelector('.detailPage', { timeout: 20000 });
        // Warten bis Daten geladen (kein Ladespinner mehr)
        await page.waitForFunction(
            () => !document.querySelector('.detailStatus'),
            { timeout: 15000 }
        );
    });

    test('Lädt korrekt unter /etappe/1', async ({ page }) => {
        await expect(page).toHaveURL('/etappe/1');
        await expect(page.locator('.detailPage')).toBeVisible();
    });

    test('Zeigt Etappenname und Route', async ({ page }) => {
        await expect(page.locator('.detailTitle')).not.toBeEmpty();
        await expect(page.locator('.detailRoute')).toContainText('→');
    });

    test('Zeigt alle drei Stat-Boxen (Dauer, Höhenmeter, Etappe)', async ({ page }) => {
        const stats = page.locator('.detailStat');
        await expect(stats).toHaveCount(3);
        await expect(stats.nth(0).locator('.detailStatVal')).toContainText('Std.');
        await expect(stats.nth(1).locator('.detailStatVal')).toContainText('m');
        await expect(stats.nth(2).locator('.detailStatVal')).toContainText('Etappe');
    });

    test('Zeigt ÖPNV-Hinweis', async ({ page }) => {
        await expect(page.locator('.detailOepnv')).toBeVisible();
        await expect(page.locator('.detailOepnv')).not.toBeEmpty();
    });

    test('Leaflet-Karte rendert', async ({ page }) => {
        await expect(page.locator('.detailMap')).toBeVisible();
        await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 8000 });
    });

    test('GPX-Sektion sichtbar', async ({ page }) => {
        await expect(page.locator('.detailGpxSection')).toBeVisible();
    });

    test('Zurück-Button navigiert zur Startseite', async ({ page }) => {
        await page.locator('.detailBack').click();
        await expect(page).toHaveURL('/');
    });

    test('Schwierigkeits-Badge sichtbar', async ({ page }) => {
        await expect(page.locator('.detailBadge')).toBeVisible();
    });
});

// ─── API: /traveltime Direkttests ─────────────────────────────────────────────

test.describe('RegionShowcase', () => {
    test('Teutoburger Wald zeigt Routenanzahl aus DB', async ({ page, request }) => {
        const res = await request.get('http://localhost:5000/regionStats');
        const stats = await res.json();
        expect(stats['Teutoburger Wald']).toBeGreaterThan(0);

        await page.goto('/');
        const teutoCard = page.locator('.regionCard', { hasText: 'Teutoburger Wald' });
        await expect(teutoCard).toBeVisible();
        const subText = teutoCard.locator('.regionCardSub');
        await expect(subText).toContainText(`${stats['Teutoburger Wald']} Wege`);
    });

    test('Regionen ohne Wege zeigen "Demnächst"', async ({ page, request }) => {
        const res = await request.get('http://localhost:5000/regionStats');
        const stats = await res.json();
        await page.goto('/');

        for (const region of ['Schwarzwald', 'Eifel', 'Harz', 'Sauerland', 'Rheinsteig']) {
            const count = stats[region] ?? 0;
            const card = page.locator('.regionCard, .regionCardDisabled', { hasText: region });
            if (count === 0) {
                await expect(card.locator('.regionCardSub')).toContainText('Demnächst');
            } else {
                await expect(card.locator('.regionCardSub')).toContainText(`${count} Wege`);
            }
        }
    });

    test('Klick auf Teutoburger Wald zeigt Ergebnisse', async ({ page }) => {
        await page.goto('/');
        await page.locator('.regionCard', { hasText: 'Teutoburger Wald' }).click();
        await page.waitForSelector('.etappenCard', { timeout: 10000 });
        const count = await page.locator('.etappenCard').count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe('API: /traveltime Fahrzeiten', () => {
    // Erwartete Fahrzeiten mit ±20 Min. Toleranz wegen HERE-Echtzeit-Varianz

    test('Detmold → Etappe 6 (Bielefeld, nah): Auto < 40 Min', async ({ request }) => {
        const res = await request.get('http://localhost:5000/traveltime', {
            params: { user_lat: 51.9342, user_lon: 8.8827, trail_id: 6, mode: 'auto' }
        });
        const data = await res.json();
        expect(data.minutes).toBeGreaterThan(0);
        expect(data.minutes).toBeLessThan(40);
    });

    test('Detmold → Etappe 6 (Bielefeld): Bahn < 120 Min', async ({ request }) => {
        const res = await request.get('http://localhost:5000/traveltime', {
            params: { user_lat: 51.9342, user_lon: 8.8827, trail_id: 6, mode: 'bahn' }
        });
        const data = await res.json();
        expect(data.minutes).toBeGreaterThan(0);
        expect(data.minutes).toBeLessThan(120);
    });

    test('Dortmund → Etappe 6 (Bielefeld, weit): Auto > 60 Min', async ({ request }) => {
        const res = await request.get('http://localhost:5000/traveltime', {
            params: { user_lat: 51.5136, user_lon: 7.4653, trail_id: 6, mode: 'auto' }
        });
        const data = await res.json();
        expect(data.minutes).toBeGreaterThan(60);
    });

    test('Hannover → Etappe 1 (Rheine, weit): Auto > 70 Min', async ({ request }) => {
        const res = await request.get('http://localhost:5000/traveltime', {
            params: { user_lat: 52.3759, user_lon: 9.7320, trail_id: 1, mode: 'auto' }
        });
        const data = await res.json();
        expect(data.minutes).toBeGreaterThan(70);
    });

    test('Osnabrück → Etappe 3 (Tecklenburg, mittel): Auto 20-80 Min', async ({ request }) => {
        const res = await request.get('http://localhost:5000/traveltime', {
            params: { user_lat: 52.2799, user_lon: 8.0472, trail_id: 3, mode: 'auto' }
        });
        const data = await res.json();
        expect(data.minutes).toBeGreaterThan(20);
        expect(data.minutes).toBeLessThan(80);
    });

    test('Bahn ist langsamer als Auto (Hannover → Etappe 1)', async ({ request }) => {
        const auto = await (await request.get('http://localhost:5000/traveltime', {
            params: { user_lat: 52.3759, user_lon: 9.7320, trail_id: 1, mode: 'auto' }
        })).json();
        const bahn = await (await request.get('http://localhost:5000/traveltime', {
            params: { user_lat: 52.3759, user_lon: 9.7320, trail_id: 1, mode: 'bahn' }
        })).json();
        expect(bahn.minutes).toBeGreaterThanOrEqual(auto.minutes);
    });
});
