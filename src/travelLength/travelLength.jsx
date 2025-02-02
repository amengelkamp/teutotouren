const TravelLength = () => {
    return (
        <div className="travelLength">
            <input 
                type="text"
                placeholder="Max. Anreisezeit in Stunden"
                className="locationInput"
                />
                  <button className="CounterUp">{"\u2191"}</button>
                  <button className="CounterDown">{"\u2193"}</button></div>
    )
}
export default TravelLength;