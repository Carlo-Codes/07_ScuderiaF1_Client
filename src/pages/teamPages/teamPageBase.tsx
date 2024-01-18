import React, { FunctionComponent } from "react"
import {TrackCard} from './trackCard/trackCard'
import { Card } from "../../Util/card/card"
import { PropsWithChildren } from "react"
import { dataResponse } from "@backend/HTTPtypes";
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import { DriverPointsCard } from "./driverCard/driverPointsCard";

interface teamBasePageProps{
    userData:dataResponse
}
export const TeamPageBase:FunctionComponent<PropsWithChildren<teamBasePageProps>> = ({children, userData}) => {
    
    function generateDrivePointsCards(){
        //add points to team schema 
    }

    function generateDriverSelectionCards(){

        const SelectionParams = [
            "Tier 1",
            "Tier 2",
            "Tier 3",
            "DNF",
            "Fastest Lap"      
            ]

        const options = userData.driverData.map((driver, i) => 
        <option key={i} value={driver.driver.name}>{driver.driver.name}</option>
        )

        const driverSelectionCards = SelectionParams.map((param)=>{
            return (
                <DriverSelectionCard selectionParam={param} driverOptions={options}/>
            )
        })

        return driverSelectionCards
    }
    
    
    const teams = userData.raceData.map((race) => {
        if(race.type == 'Race'){
            const raceDate = new Date(race.date).getUTCDate()
            if(raceDate < Date.now()){
               
                return(
                    <div className="teamCreationCardInternals">
                    {}
                    <button>Ok</button>
                    </div>  
                )
            } else {
                return (
                        {}
                )
            }
        }
    })
    return (
        <div className="teamContainer">
            
            <Card>
                <>
                    <TrackCard trackName="Circuit de Spa-Francorchamps"></TrackCard>
                    {children}
                </>
            </Card>
        </div>
    )

}