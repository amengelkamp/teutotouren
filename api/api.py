import time
from flask import Flask, Response
import json
import sqlite3
from flask_cors import CORS  # Hier wird Flask-CORS importiert, damit das frontend auf den BE Port zugreifen kann


app = Flask(__name__)
CORS(app)  # aktiviert CORS für alle Routen

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/position')
def get_current_position():
    return {'position': 'Steinhagen'}

@app.route("/trail")
def get_trails():
    return {"Startposition": "Rheine", "Endposition": "Hörstel-Bergeshövede"}

@app.route("/allTrails")
def get_all_trails():
    try: 
        con = sqlite3.connect("../SQL/teutotourenDatabase.db")
        con.row_factory = sqlite3.Row  # Zugriff auf Spalten per Namen
        cur = con.cursor()

        # Daten aus der Tabelle holen
        res = cur.execute("SELECT * FROM etappen")
        rows = res.fetchall()
        print(rows)
        con.close()  # Verbindung schließen

        # Daten in eine Liste von Dictionaries umwandeln
        data = [
            {
                "id": row["id"],
                "name": row["name"],
                "etappe_startpunkt": row["etappe_startpunkt"],
                "etappe_endpunkt": row["etappe_endpunkt"],
                "dauer": row["dauer"],
                "hoehenmeter": row["hoehenmeter"]
            }
        for row in rows
        ]

        # JSON mit UTF-8 und richtigen Umlauten
        json_data = json.dumps(data, ensure_ascii=False)

        return Response(json_data, content_type="application/json; charset=utf-8")
    
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500  # Fehler-Handling mit HTTP 500

