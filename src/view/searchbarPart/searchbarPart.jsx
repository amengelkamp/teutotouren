import position from "../../position/position";
import anreisezeit from "../../anreisezeit/anreisezeit";
import setLocation from "./setLocation/setLocation";
import formOfTravel from "../../formOfTravel/formOfTravel";
import travelLength from "../../travelLength/travelLength";
import vacationLength from "../../vacationLength/vacationLength";

const SearchbarPart = () => {
    return (
        <div className="searchbarPart">
                <img 
                    className="wandernImWald01" 
                    src="./wandernImWald01.jpg" 
                    alt="Wandern im Wald 01" 
                />
                <div className="searchbarWithFilters">
                    <anreisezeit
                        Anreisezeit={Anreisezeit}
                    />
                    <position
                        Position={Position}
                    />      
                    <formOfTravel
                        formOfTravel={formOfTravel}
                    />
                    <travelLength 
                        travelLength={travelLength}
                    />
                    <vacationLength 
                        vacationLength={vacationLength}
                    />
                    <button className="searchButton">Suchen</button>
                </div>
                </div>
                </div>
            )
    }

export default SearchbarPart;