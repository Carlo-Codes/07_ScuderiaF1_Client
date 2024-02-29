import './trackCard.css'
export function TrackCard(props:{trackName:string|undefined, nextRaceHandler:()=>void, previousRaceHandler:()=>void, date:string|undefined}){
    return (
        <div className="trackSelectionCard">
            <div className="arrow" onClick={props.previousRaceHandler}>&#129092;</div>
        
            <div className="trackCardInternals">
                <div className="title">{props.trackName}</div>
                <div className="date">{props.date}</div>
                <img src={`./assets/circuitImages/${props.trackName}.png`}></img>
            </div>    
        
        <div className="arrow" onClick={props.nextRaceHandler}>&#129094;</div>
        </div>
    )
}