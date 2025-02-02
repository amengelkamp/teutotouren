import time
from flask import Flask

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