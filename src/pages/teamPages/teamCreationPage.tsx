import React from "react";
import {apiSportsDriver} from '@backend/apiSportsResponseTypes'
import { DriverSelectionCard } from "./driverCard/driverSelectionCard";
import {TrackCard} from "../teamPages/trackCard/trackCard"

export function TeamCreationPage(){

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

    const driverSelectionList = [driver, driver2]
      
    const SelectionParams = [
        "Tier 1",
        "Tier 2",
        "Tier 3",
        "DNF",
        "Fastest Lap"      
        ]

    let driverSelectionCards:JSX.Element[] = []

    let Tier1_options = driverSelectionList.map((driver, i) => 
    <option key={i} value={driver.name}>{driver.name}</option>
    )

    Tier1_options.push(
        <option key='00' hidden>Select one...</option>
    )

    for(let i = 0; i < SelectionParams.length; i++){
        driverSelectionCards.push(
            <DriverSelectionCard key={i} selectionParam={SelectionParams[i]} driverOptions={Tier1_options}></DriverSelectionCard>
        )
    }

    return (
        <div className="teamCreationContainer">
            <TrackCard trackName="Circuit de Spa-Francorchamps"></TrackCard>
                {driverSelectionCards}
            <button>Ok</button>
        </div>
    )
}