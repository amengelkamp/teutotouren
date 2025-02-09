import time
from flask import Flask
import sqlite3


app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/position')
def get_current_position():
    return {'position': 'Steinhagen',}

@app.route("/trail")
def get_trails():
    return {"Startposition": "Rheine", "Endposition": "Hörstel-Bergeshövede"}

@app.route("/allTrails")
def get_all_trails():
    con = sqlite3.connect("../SQL/teutotourenDatabase.db")
    cur = con.cursor()
    res = cur.execute("SELECT * FROM etappen")
    all = res.fetchall()
    return all