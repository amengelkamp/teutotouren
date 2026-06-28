import { test, expect } from '@playwright/test';

// Detmold koordinaten — mitten im Teutoburger Wald
const MOCK_COORDS = { latitude: 51.9342, longitude: 8.8827 };

test.describe('Header', () => {
    test('Logo und Slogan sichtbar', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.teutotourenLogo')).toContainText('teutotouren');
        await expect(page.locator('.logoSlogan')).toContainText('Wir planen. Du wanderst.');
    });

    test('Nav-Buttons vorhanden', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.headerNavBtn')).toHaveCount(3);
    });
});

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

    test('Suchen-Button ohne GPS zeigt Ergebnisse ohne Anreise-Filter', async ({ page }) => {
        await page.goto('/');
        await page.locator('.searchBtn').click();
        await expect(page.locator('.etappenGrid')).toBeVisible({ timeout: 10000 });
        const cards = page.locator('.etappenCard');
        await expect(cards).toHaveCount(9); // alle 9 Etappen
    });
});

test.describe('Filter: Dauer', () => {
    test('Dauer-Slider auf 5 Std. filtert Ergebnisse', async ({ page }) => {
        await page.goto('/');
        // Slider auf ~50% setzen (5 Std. von 1-10)
        const slider = page.locator('input[type="range"]');
        await slider.fill('5');
        await page.locator('.searchBtn').click();
        await page.waitForSelector('.etappenCard', { timeout: 10000 });
        const cards = page.locator('.etappenCard');
        const count = await cards.count();
        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThan(9);
    });
});

test.describe('Filter: Schwierigkeit', () => {
    test('Schwierigkeit "Leicht" filtert korrekt', async ({ page }) => {
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

test.describe('Filter: Anreisezeit mit GPS-Mock', () => {
    test.use({
        geolocation: MOCK_COORDS,
        permissions: ['geolocation'],
    });

    test('GPS-Button ermittelt Standort', async ({ page }) => {
        await page.goto('/');
        await page.locator('.positionGpsBtn').click();
        // Warten bis Laden fertig (Button nicht mehr disabled)
        await expect(page.locator('.positionGpsBtn')).not.toBeDisabled({ timeout: 15000 });
        const val = await page.locator('.positionInput').inputValue();
        expect(val).not.toBe('');
        expect(val).not.toContain('Wird ermittelt');
        expect(val).not.toContain('nicht verfügbar');
    });

    test('Anreisezeit-Filter mit GPS zeigt nur erreichbare Etappen', async ({ page }) => {
        await page.goto('/');
        // GPS ermitteln
        await page.locator('.positionGpsBtn').click();
        await expect(page.locator('.positionInput')).not.toHaveValue('', { timeout: 12000 });
        // Reiseart Auto, Anreisezeit 60 Min.
        await page.locator('.segmentBtn', { hasText: 'Auto' }).click();
        await page.locator('.anreisezeitSelect').selectOption('60');
        await page.locator('.searchBtn').click();
        // Ergebnisse abwarten (HERE API-Call braucht etwas)
        await page.waitForSelector('.etappenCard', { timeout: 20000 });
        const cards = page.locator('.etappenCard');
        const count = await cards.count();
        expect(count).toBeGreaterThan(0);
        // Alle Anreise-Chips müssen ≤ 60 Min. sein
        const chips = page.locator('.cardChip').filter({ hasText: 'Min. Anreise' });
        const chipCount = await chips.count();
        for (let i = 0; i < chipCount; i++) {
            const text = await chips.nth(i).innerText();
            const minutes = parseInt(text.match(/\d+/)?.[0] ?? '0');
            expect(minutes).toBeLessThanOrEqual(60);
        }
    });
});

test.describe('Ergebniskarten', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('.searchBtn').click();
        await page.waitForSelector('.etappenCard', { timeout: 10000 });
    });

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
        const cards = page.locator('.etappenCard');
        await expect(cards).toHaveCount(anzahl);
    });
});
