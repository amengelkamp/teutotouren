import requests

def get_city_from_coords(lat, lon):
    url = "https://nominatim.openstreetmap.org/reverse"
    params = {
        "lat": lat,
        "lon": lon, 
        "format": "json",
        "addressdetails": 1
    }