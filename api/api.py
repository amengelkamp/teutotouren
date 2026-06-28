import os
import time
import json
import sqlite3
from flask import Flask, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'SQL', 'teutotourenDatabase.db')


def get_db():
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    return con


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
    except Exception:
        pass

    try:
        con = get_db()
        cur = con.cursor()

        query = "SELECT id, name, wanderweg, wanderweg_etappennummer, etappe_startpunkt, etappe_endpunkt, dauer, hoehenmeter, schwierigkeit, image_path, gpx_path, oepnv_hinweis FROM etappen WHERE 1=1"
        params = []

        if dauer_max is not None:
            query += " AND dauer <= ?"
            params.append(dauer_max)
        if schwierigkeit:
            query += " AND schwierigkeit = ?"
            params.append(schwierigkeit)

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
            "SELECT id, name, wanderweg, wanderweg_etappennummer, etappe_startpunkt, etappe_endpunkt, dauer, hoehenmeter, schwierigkeit, image_path, gpx_path, oepnv_hinweis FROM etappen WHERE id = ?",
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
        }

        return Response(json.dumps(data, ensure_ascii=False), content_type="application/json; charset=utf-8")

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
