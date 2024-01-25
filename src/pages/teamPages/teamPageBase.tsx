import React, { FunctionComponent, useEffect, useState } from "react"
import {TrackCard} from './trackCard/trackCard'
import { Card } from "../../Util/card/card"
import { PropsWithChildren } from "react"
import { dataResponse, } from "@backend/HTTPtypes";
import { apiSportsRacesRes } from "@backend/apiSportsResponseTypes";
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import { DriverPointsCard } from "./driverCard/driverPointsCard";
import { RacesApiStore, IdriverTiers, Team } from "@backend/dbTypes";


export function TeamPageBase(props:{userData:dataResponse}){

    const [trackSelected, setTrackSelected] = useState<apiSportsRacesRes>()
    const [allRaces, setAllRaces] = useState<apiSportsRacesRes[]>();
    const [trackTeam, setTrackTeam] = useState<Team>()
    const [globalDate, setDate] = useState<number>(1687465115000) //change this for simulation
    
    
    
    useEffect (()=>{
        initPage();
    },[])


    interface selectionParam {
        dbSelection:keyof Team,
        dbPoints:keyof Team,
        clientName:string
    }

    interface SelectionParameters {
        tier1:selectionParam,
        tier2:selectionParam,
        tier3:selectionParam,
        dnf:selectionParam,
        fastestLap:selectionParam

    }

    const SelectionParams:SelectionParameters = {  //somehow make this self updating if changes? maps names to db colums
       
            tier1:{
            dbSelection:"tier1_driver_id",
            dbPoints:"tier1_points",
            clientName: "Tier 1",
            }
        ,
        
            tier2:{
           dbSelection:"tier2_driver_id",
           dbPoints:"tier2_points",
           clientName: "Tier 2"
           }
        ,
        
            tier3:{
           dbSelection:"tier3_driver_id",
           dbPoints:"tier3_points",
           clientName: "Tier 3"
           }
        ,
        
            dnf:{
           dbSelection:"dnf_driver_id",
           dbPoints:"dnf_points",
           clientName: "DNF"
           }
        ,
        
            fastestLap:{
            dbSelection:"fastest_lap_driver_id",
            dbPoints: "fastest_lap_points",
            clientName: "Fastest Lap"
           }
        
    }




    function initPage(){
        getRaces()
        findUserTeamForTrack();
    }


    function getRaces(){ //including selected races
        let potentialnextRace:apiSportsRacesRes|undefined;
        let allRacesStore:apiSportsRacesRes[] = []
        for(let i = 0; i < props.userData.raceData.length; i++){
            const race = props.userData.raceData[i]
            if(race.type == 'Race'){
                allRacesStore.push(race)
                const closerRaceTest = selectRaceIfClosest(race, potentialnextRace)
                if(closerRaceTest){
                    potentialnextRace = closerRaceTest
                }
            }
        }
        if(!potentialnextRace){
            potentialnextRace = allRacesStore[allRacesStore.length - 1]
        }

        setAllRaces(allRacesStore)
        setTrackSelected(potentialnextRace)
    }


    function selectRaceIfClosest(race:apiSportsRacesRes, potentialnextRace:apiSportsRacesRes|undefined){
        const raceDate = new Date(race.date).valueOf(); 
            if (raceDate > globalDate!){//if race is in th future
                if(!potentialnextRace){
                    return race;
                } else{
                    const nextRaceDate = new Date(potentialnextRace.date).valueOf();
                    const timeTocurrentNextRace = nextRaceDate;
                    const timeToNewNextRace = raceDate;
                    if(timeToNewNextRace < timeTocurrentNextRace){
                        return race;
                    }
                }
            }
        }


    function findUserTeamForTrack(){
        const team = props.userData.userTeams.filter((team)=>{
            if(team.competion_id === trackSelected?.id){
                return team
            }
        })

        setTrackTeam(team[0])
    }
    
    function generateDriverCards(){
        
        if(trackSelected){
            const raceDate = new Date(trackSelected.date).valueOf()
            if(raceDate > globalDate!){//if race is in the future
                return generateDriverSelectionCards();
            } else{
                return generateDriverpontsCard();
            }
        }
    }

    function generateDriverpontsCard(){
        let driverPointsCards:JSX.Element[] = []
        if(trackTeam){
            let paramKey : keyof SelectionParameters
            for(paramKey in SelectionParams){
                const param = SelectionParams[paramKey]
                const Points = trackTeam[param.dbPoints]
                const driverID = trackTeam[param.dbSelection]
                const driver = props.userData.driverData.filter((driver)=>{
                    if (driver.driver.id = driverID as number){
                        return driver
                    }
                })

                driverPointsCards.push(
                    <DriverPointsCard key={paramKey} selectionParam={SelectionParams[paramKey].clientName} driver={driver[0].driver} points={Points as number} ></DriverPointsCard>
                )
            }
    
        }else{
            return <div className="noTeam">No Team Submmited</div>
        }
        return driverPointsCards
    }

    function generateDriverSelectionCards(){
        const GeneralOptions = props.userData.driverData.map((driver, i) =>  
        <option key={i} value={driver.driver.name}>{driver.driver.name}</option>
        )

        const driverTiers = props.userData.driverTiers
        let tierKey : keyof typeof driverTiers;

        const driverTierOptions: typeof driverTiers = {
            
            tier1:{
                drivers: [] as JSX.Element[]
            },
            tier2:{
                drivers: [] as JSX.Element[]
            },
            tier3:{
                drivers: [] as JSX.Element[]
            },
        }

        for(tierKey in driverTiers){ //here
            const driverIds = driverTiers[tierKey].drivers as number[]
            for(let i = 0; i < driverIds.length; i++){
                const driverObj = props.userData.driverData.filter((driver)=>{
                    if(driver.driver.id === driverIds[i]){
                        return driver
                    }
                })[0]
                driverTierOptions[tierKey].drivers.push(
                    <option key={i} value={driverObj.driver.name}>{driverObj.driver.name}</option>
                )
            }
        }
        
        
        const driverSelectionCards:JSX.Element[] = []
        let paramKey : keyof SelectionParameters
        for(paramKey in SelectionParams){
            const parameter = SelectionParams[paramKey];
            if(paramKey === 'dnf'|| paramKey === 'fastestLap'){
                driverSelectionCards.push(
                    <DriverSelectionCard selectionParam={parameter.clientName} driverOptions={GeneralOptions}/>
                )   
            }else{
                driverSelectionCards.push(
                    <DriverSelectionCard selectionParam={parameter.clientName} driverOptions={driverTierOptions[paramKey].drivers}/>
                )   
            }       
        }

        return driverSelectionCards
    }
    

    function nextRaceHandler(){ //would be better if i just sorted the array
        let nextRace:apiSportsRacesRes|undefined = undefined
        const currentRaceDate = new Date(trackSelected!.date).valueOf();
        for (let i = 0; i < allRaces!.length; i++){
            const tempRaceDate = new Date(allRaces![i].date).valueOf();
            if(tempRaceDate>currentRaceDate){
                if(!nextRace){
                    nextRace = allRaces![i]
                }else{
                    const currentNextRaceDate = new Date(nextRace.date).valueOf();
                    if (tempRaceDate<currentNextRaceDate){
                        nextRace = allRaces![i]
                    }
                }
            }
        }
        if(nextRace){
            setTrackSelected(nextRace)
        }
    }

    function previousRaceHandler(){//would be better if i just sorted the array
        let nextRace:apiSportsRacesRes|undefined = undefined
        const currentRaceDate = new Date(trackSelected!.date).valueOf();
        for (let i = 0; i < allRaces!.length; i++){
            const tempRaceDate = new Date(allRaces![i].date).valueOf();
            if(tempRaceDate<currentRaceDate){
                if(!nextRace){
                    nextRace = allRaces![i]
                }else{
                    const currentNextRaceDate = new Date(nextRace.date).valueOf();
                    if (tempRaceDate>currentNextRaceDate){
                        nextRace = allRaces![i]
                    }
                }
            }
        }
        if(nextRace){
            setTrackSelected(nextRace)
        }
    }



    return (
        <div className="teamContainer">
            
            <Card>
                <>
                    <TrackCard trackName={trackSelected?.circuit.name!} nextRaceHandler={nextRaceHandler} previousRaceHandler={previousRaceHandler} date={trackSelected?.date}></TrackCard>
                    {generateDriverCards()}
                </>
            </Card>
        </div>
    )

}