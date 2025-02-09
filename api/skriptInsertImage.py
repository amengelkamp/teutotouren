import sqlite3

def insert_image_in_all_rows(image_path):
    # Öffne das Bild und lese es als Binärdaten
    with open(image_path, "rb") as file:
        image_data = file.read()

    # Verbindung zur SQLite-Datenbank herstellen
    con = sqlite3.connect("../SQL/teutotourenDatabase.db")  

    # SQL-Statement, um das Bild in alle Zeilen der Tabelle 'etappen' zu setzen
    sql = "UPDATE etappen SET image1 = ?"


    cur = con.cursor()


    # ausführen von SQL Statement
    cur.execute(sql, (image_data,))

    # Änderungen speichern und Verbindung schließen
    con.commit()
    con.close()

    print("Bild wurde in alle Zeilen der Tabelle eingefügt!")

# Beispielaufruf:
insert_image_in_all_rows("hermannsdenkmal.jpg")
