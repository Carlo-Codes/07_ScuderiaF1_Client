import React from "react";
import {Card} from '../../../Util/card/card'
import './trackCard.css'
export function TrackCard(props:{trackName:string}){
    return (
        <div className="trackSelectionCard">
            <div className="arrow">&#129092;</div>
        
            <div className="trackCardInternals">
                <div className="title">{props.trackName}</div>
                <img src={`src/assets/circuitImages/${props.trackName}.png`}></img>
            </div>    
        
        <div className="arrow">&#129094;</div>
        </div>
    )
}