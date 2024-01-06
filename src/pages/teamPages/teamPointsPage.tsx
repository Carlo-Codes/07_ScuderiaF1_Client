import React from "react";
import {apiSportsDriver} from '@backend/apiSportsResponseTypes'
import { DriverPointsCard } from "./driverCard/driverPointsCard";
import {TrackCard} from "../teamPages/trackCard/trackCard"

export function TeamPointPage(){

    const driver:apiSportsDriver = {
        id: 1,
        name: 'Max Verstappen',
        abbr: 'ves',
        number: 1,
        image: "test image"
      }
      const driver2:apiSportsDriver = {
        id: 1,
        name: 'Charles Leclerc',
        abbr: 'ves',
        number: 1,
        image: "test image"
      }

      
    const SelectionParams = [
        "Tier 1",
        "Tier 2",
        "Tier 3",
        "DNF",
        "Fastest Lap"      
        ]
        
    let driverPointsCards:JSX.Element[] = []

    for(let i = 0; i < SelectionParams.length; i++){
        driverPointsCards.push(
            <DriverPointsCard key={i} tier="3" driver={driver} selectionParam={SelectionParams[i]} points={3} ></DriverPointsCard>
        )
    }

    return (
        <div className="teamCreationContainer">
            <TrackCard trackName="Circuit de Spa-Francorchamps"></TrackCard>
                {driverPointsCards}
            <button>Ok</button>
        </div>
    )
}