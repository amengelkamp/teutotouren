"""
Phase 1 Migration: Bilder aus DB raus, neue Spalten hinzufügen.
Einmalig ausführen aus dem api/ Ordner: python3 migrate_phase1.py
"""
import os
import sqlite3

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'SQL', 'teutotourenDatabase.db')

con = sqlite3.connect(DB_PATH)
cur = con.cursor()

existing = {row[1] for row in cur.execute("PRAGMA table_info(etappen)").fetchall()}

if 'image_path' not in existing:
    cur.execute("ALTER TABLE etappen ADD COLUMN image_path TEXT")
    print("Spalte image_path hinzugefügt")

if 'gpx_path' not in existing:
    cur.execute("ALTER TABLE etappen ADD COLUMN gpx_path TEXT")
    print("Spalte gpx_path hinzugefügt")

if 'oepnv_hinweis' not in existing:
    cur.execute("ALTER TABLE etappen ADD COLUMN oepnv_hinweis TEXT")
    print("Spalte oepnv_hinweis hinzugefügt")

if 'schwierigkeit' not in existing:
    cur.execute("ALTER TABLE etappen ADD COLUMN schwierigkeit TEXT")
    print("Spalte schwierigkeit hinzugefügt")

etappen_defaults = [
    (1,  "leicht",  "/images/etappe_01.jpg", "/gpx/etappe_01.gpx", "Rückfahrt ab Hörstel mit Bus 581 Richtung Rheine"),
    (2,  "mittel",  "/images/etappe_02.jpg", "/gpx/etappe_02.gpx", "Rückfahrt ab Tecklenburg mit Bus R51 Richtung Osnabrück"),
    (3,  "mittel",  "/images/etappe_03.jpg", "/gpx/etappe_03.gpx", "Rückfahrt ab Bad Iburg mit Bus 461 Richtung Osnabrück"),
    (4,  "schwer",  "/images/etappe_04.jpg", "/gpx/etappe_04.gpx", "Rückfahrt ab Borgholzhausen mit Bus R61 Richtung Bielefeld"),
    (5,  "schwer",  "/images/etappe_05.jpg", "/gpx/etappe_05.gpx", "Rückfahrt ab Bielefeld Hbf mit RB73 Richtung Osnabrück"),
    (6,  "schwer",  "/images/etappe_06.jpg", "/gpx/etappe_06.gpx", "Rückfahrt ab Oerlinghausen mit Bus 21 Richtung Bielefeld"),
    (7,  "mittel",  "/images/etappe_07.jpg", "/gpx/etappe_07.gpx", "Rückfahrt ab Oerlinghausen mit Bus 21 Richtung Bielefeld"),
    (8,  "mittel",  "/images/etappe_08.jpg", "/gpx/etappe_08.gpx", "Rückfahrt ab Hermannsdenkmal mit Bus 782 Richtung Detmold"),
    (9,  "schwer",  "/images/etappe_09.jpg", "/gpx/etappe_09.gpx", "Rückfahrt ab Leopoldstal mit Bus 782 Richtung Detmold"),
]

for etappe_id, schwierigkeit, image_path, gpx_path, oepnv_hinweis in etappen_defaults:
    cur.execute(
        "UPDATE etappen SET schwierigkeit=?, image_path=?, gpx_path=?, oepnv_hinweis=? WHERE id=?",
        (schwierigkeit, image_path, gpx_path, oepnv_hinweis, etappe_id)
    )

if 'image1' in existing:
    cur.execute("ALTER TABLE etappen DROP COLUMN image1")
    print("BLOB-Spalte image1 entfernt")

con.commit()
con.close()
print("Migration abgeschlossen.")
