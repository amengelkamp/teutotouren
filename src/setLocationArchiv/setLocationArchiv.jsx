import axios from "axios";
const [location, setLocation] = useState(""); //State für den Standort 
const [lat, setLat] = useState(null);
const [lon, setLon] = useState(null);
const [error, setError] = useState(""); //Abfangen von Fehlern wenn diese eintreten


const HandleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          console.log(position.coords.latitude);

          const longitude = position.coords.longitude; 
          console.log(position.coords.longitude);

          setLat(latitude);
          setLon(longitude);

          //hier ans BE schicken 


          //vom BE den Standort als String holen. 

                    //const locationString = `Lat: ${latitude}, Long: ${longitude}`; 


          setError(null); //Fehler wird zurückgesetzt wenn zuvor einer aufgetreten ist  
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

const handleGetLocationName = async => {
  if (lat && lon) {
    try {
      const response = await axios.post ("http://127.0.0.1:5000", {
        latitude: lat, 
        longitude: lon,
      });

      setLocation(`Adresse: ${response.data.address}`);
    } catch (error) {
      setLocation("Die Adresse konnte nicht ermittelt werden.");
    }
    };
  }
}
return (


)


};

export default HandleGetLocation;
