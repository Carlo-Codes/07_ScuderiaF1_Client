import React from "react";
import {Card} from '../../../Util/card/card'
import './trackCard.css'
export function TrackCard(props:{trackName:string, nextRaceHandler:()=>void, previousRaceHandler:()=>void, date:string}){
    return (
        <div className="trackSelectionCard">
            <div className="arrow" onClick={props.previousRaceHandler}>&#129092;</div>
        
            <div className="trackCardInternals">
                <div className="title">{props.trackName}</div>
                <div className="date">{props.date}</div>
                <img src={`src/assets/circuitImages/${props.trackName}.png`}></img>
            </div>    
        
        <div className="arrow" onClick={props.nextRaceHandler}>&#129094;</div>
        </div>
    )
}