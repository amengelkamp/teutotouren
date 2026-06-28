import os
import time
import json
import sqlite3
import requests
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__)
CORS(app)

HERE_API_KEY = os.environ.get("HERE_API_KEY", "")

HERE_TRANSPORT_MAP = {
    "auto": "car",
    "fuss": "pedestrian",
    "fahrrad": "bicycle",
    "bahn": "transit",
}

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'SQL', 'teutotourenDatabase.db')


def get_db():
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    return con


@app.route("/traveltime")
def get_traveltime():
    try:
        user_lat = float(request.args.get("user_lat"))
        user_lon = float(request.args.get("user_lon"))
        trail_id = int(request.args.get("trail_id"))
        mode = request.args.get("mode", "auto").lower()
    except (TypeError, ValueError):
        return jsonify({"error": "user_lat, user_lon, trail_id und mode erforderlich"}), 400

    con = get_db()
    row = con.execute("SELECT start_lat, start_lon FROM etappen WHERE id=?", (trail_id,)).fetchone()
    con.close()

    if row is None or row["start_lat"] is None:
        return jsonify({"error": "Etappe oder Koordinaten nicht gefunden"}), 404

    here_mode = HERE_TRANSPORT_MAP.get(mode, "car")
    origin = f"{user_lat},{user_lon}"
    destination = f"{row['start_lat']},{row['start_lon']}"

    if here_mode == "transit":
        r = requests.get(
            "https://transit.router.hereapi.com/v8/routes",
            params={"origin": origin, "destination": destination, "return": "travelSummary", "apiKey": HERE_API_KEY},
            timeout=8
        )
    else:
        r = requests.get(
            "https://router.hereapi.com/v8/routes",
            params={"transportMode": here_mode, "origin": origin, "destination": destination, "return": "summary", "apiKey": HERE_API_KEY},
            timeout=8
        )

    if r.status_code != 200:
        return jsonify({"error": "HERE API Fehler", "detail": r.text}), 502

    data = r.json()
    try:
        sections = data["routes"][0]["sections"]
        if here_mode == "transit":
            seconds = sum(s["travelSummary"]["duration"] for s in sections)
        else:
            seconds = sections[0]["summary"]["duration"]
        minutes = round(seconds / 60)
    except (KeyError, IndexError):
        return jsonify({"error": "Keine Route gefunden"}), 404

    return jsonify({"trail_id": trail_id, "mode": mode, "minutes": minutes})


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route("/allTrails")
def get_all_trails():
    dauer_max = None
    schwierigkeit = None

    try:
        import flask
        dauer_max = flask.request.args.get('dauer_max', type=float)
        schwierigkeit = flask.request.args.get('schwierigkeit')
        region = flask.request.args.get('region')
    except Exception:
        pass

    try:
        con = get_db()
        cur = con.cursor()

        query = "SELECT id, name, wanderweg, wanderweg_etappennummer, etappe_startpunkt, etappe_endpunkt, dauer, hoehenmeter, hoehenmeter_abstieg, schwierigkeit, image_path, gpx_path, oepnv_hinweis, region, laenge_km, typ FROM etappen WHERE 1=1"
        params = []

        if dauer_max is not None:
            query += " AND dauer <= ?"
            params.append(dauer_max)
        if schwierigkeit:
            query += " AND schwierigkeit = ?"
            params.append(schwierigkeit)
        if region:
            query += " AND region = ?"
            params.append(region)

        rows = cur.execute(query, params).fetchall()
        con.close()

        data = [
            {
                "id": row["id"],
                "name": row["name"],
                "wanderweg": row["wanderweg"],
                "etappennummer": row["wanderweg_etappennummer"],
                "etappe_startpunkt": row["etappe_startpunkt"],
                "etappe_endpunkt": row["etappe_endpunkt"],
                "dauer": row["dauer"],
                "hoehenmeter": row["hoehenmeter"],
                "schwierigkeit": row["schwierigkeit"],
                "image_path": row["image_path"],
                "gpx_path": row["gpx_path"],
                "oepnv_hinweis": row["oepnv_hinweis"],
                "region": row["region"],
                "laenge_km": row["laenge_km"],
                "typ": row["typ"],
                "hoehenmeter_abstieg": row["hoehenmeter_abstieg"],
            }
            for row in rows
        ]

        return Response(json.dumps(data, ensure_ascii=False), content_type="application/json; charset=utf-8")

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500


@app.route("/trail/<int:trail_id>")
def get_trail(trail_id):
    try:
        con = get_db()
        cur = con.cursor()
        row = cur.execute(
            "SELECT id, name, wanderweg, wanderweg_etappennummer, etappe_startpunkt, etappe_endpunkt, dauer, hoehenmeter, schwierigkeit, image_path, gpx_path, oepnv_hinweis, start_lat, start_lon, laenge_km, typ FROM etappen WHERE id = ?",
            (trail_id,)
        ).fetchone()
        con.close()

        if row is None:
            return jsonify({"error": "Etappe nicht gefunden"}), 404

        data = {
            "id": row["id"],
            "name": row["name"],
            "wanderweg": row["wanderweg"],
            "etappennummer": row["wanderweg_etappennummer"],
            "etappe_startpunkt": row["etappe_startpunkt"],
            "etappe_endpunkt": row["etappe_endpunkt"],
            "dauer": row["dauer"],
            "hoehenmeter": row["hoehenmeter"],
            "schwierigkeit": row["schwierigkeit"],
            "image_path": row["image_path"],
            "gpx_path": row["gpx_path"],
            "oepnv_hinweis": row["oepnv_hinweis"],
            "start_lat": row["start_lat"],
            "start_lon": row["start_lon"],
            "laenge_km": row["laenge_km"],
            "typ": row["typ"],
        }

        return Response(json.dumps(data, ensure_ascii=False), content_type="application/json; charset=utf-8")

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
