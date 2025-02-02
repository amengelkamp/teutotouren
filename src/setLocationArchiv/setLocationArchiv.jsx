
const [location, setLocation] = useState(""); //State für den Standort 
const [error, setError] = useState(""); //Abfangen von Fehlern wenn diese eintreten


const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const{ latitude, longitude } = position.coords; 
          console.log(position.coords);
          const locationString = `Lat: ${latitude}, Long: ${longitude}`; 
          setLocation(locationString); //Standort wird in den State geschrieben 
          setError(null); //Fehler wird zurückgesetzt wenn zuvor einer aufgetreten ist 
          setError("hallo") 
        },
      (err) => {
        console.error(err);
        setError("Standort konnte nicht ermittelt werden");
        alert("Dein Standort konnte nicht ermittelt werden");

      }
      );
    } else {
        setError("Geolocation konnte nicht ermittelt werden");

    }
};

export default setLocation;
