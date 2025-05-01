# Setup Instructions 

## Requirements
Make sure the following tools are installed on your system:

* Python 3 (with `venv`)
* Flask
* Node.js with `npm`
* (Optional) `sqlite3` for local database inspection


## Start the Frontend
* cd Teutotouren
* npm install       <!-- only needed once -->
* npm run dev


## Start backend 
* cd api
* python3 -m venv venv        <!-- only needed once -->
* source venv/bin/activate
* pip install -r requirements.txt   <!-- make sure this file exists -->
* flask run

## Open Database 
* open SQL 
* sqlite3 teutotourendatabase.db 

##  get All Trails as JSON - without Base64 overload 
* /repos/teutotouren/SQL$ curl http://127.0.0.1:5000/allTrails | jq 'del(.[].image1)'



