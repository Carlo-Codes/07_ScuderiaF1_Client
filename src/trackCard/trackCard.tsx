import React from "react";
import {Card} from '../Util/card/card'

export function TrackCard(props:{trackName:string}){
    return (
        <Card>
            <img src={`src/assets/circuitImages/${props.trackName}.png`}></img>
        </Card>
    )
}