import React, { FunctionComponent, useState } from "react"
import {TrackCard} from './trackCard/trackCard'
import { Card } from "../../Util/card/card"
import { PropsWithChildren } from "react"
import { dataResponse, } from "@backend/HTTPtypes";
import { apiSportsRacesRes } from "@backend/apiSportsResponseTypes";
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import { DriverPointsCard } from "./driverCard/driverPointsCard";

interface teamBasePageProps{
    userData:dataResponse
}
export function TeamPageBase(props:{userData:dataResponse}){

    const [trackSelected, setTrackSelected] = useState<apiSportsRacesRes>()

    function generateCurrentTrack(){
        const date = Date.now() //change this for simulation
        let potentialnextRace;
        for(let i = 0; i < props.userData.raceData.length; i++){
            const race = props.userData.raceData[i]
            if(race.type == 'Race'){
                const raceDate = new Date(race.date).getUTCDate()
                if (raceDate > date){//if race is in th future
                    if(!potentialnextRace){
                        potentialnextRace = race;
                    } else{
                        const nextRaceDate = new Date(potentialnextRace.date).getUTCDate();
                        const timeTocurrentNextRace = nextRaceDate - date;
                        const timeToNewNextRace = raceDate - date;
                        if(timeToNewNextRace < timeTocurrentNextRace){
                            potentialnextRace = race;
                        }
                    }
                }
            }
        }
        setTrackSelected(potentialnextRace);
    }
    
    function generateDrivePointsCards(){

        if()
    }

    function generateDriverSelectionCards(){

        const SelectionParams = [
            "Tier 1",
            "Tier 2",
            "Tier 3",
            "DNF",
            "Fastest Lap"      
            ]

        const options = props.userData.driverData.map((driver, i) => 
        <option key={i} value={driver.driver.name}>{driver.driver.name}</option>
        )

        const driverSelectionCards = SelectionParams.map((param)=>{
            return (
                <DriverSelectionCard selectionParam={param} driverOptions={options}/>
            )
        })

        return driverSelectionCards
    }
    
    
    const teams = props.userData.raceData.map((race) => {
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
                    {}
                </>
            </Card>
        </div>
    )

}