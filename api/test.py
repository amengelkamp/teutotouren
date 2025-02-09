import sqlite3
con = sqlite3.connect("../SQL/teutotourenDatabase.db")

cur = con.cursor()
res = cur.execute("SELECT * FROM etappen")
print(res.fetchall())