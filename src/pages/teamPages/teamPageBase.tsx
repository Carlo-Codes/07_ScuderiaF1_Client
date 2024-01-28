import React, { FunctionComponent, useEffect, useState } from "react"
import {TrackCard} from './trackCard/trackCard'
import { Card } from "../../Util/card/card"
import { PropsWithChildren } from "react"
import { dataResponse, newLeagueRequest, newTeamRequest, } from "@backend/HTTPtypes";
import { apiSportsRacesRes } from "@backend/apiSportsResponseTypes";
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import { DriverPointsCard } from "./driverCard/driverPointsCard";
import { RacesApiStore, IdriverTiers, Team } from "@backend/dbTypes";
import { TeamFrontEnd } from "../../@types/frontEnd";
import { postNewTeam } from "../../apis/post";
import { AuthenticationResultType,  } from '@aws-sdk/client-cognito-identity-provider'


export interface selectionParam {
    dbSelection:keyof TeamFrontEnd,
    dbPoints:keyof TeamFrontEnd,
    clientName:string
}

interface SelectionParameters {
    tier1:selectionParam,
    tier2:selectionParam,
    tier3:selectionParam,
    dnf:selectionParam,
    fastestLap:selectionParam

}


export function TeamPageBase(props:{userData:dataResponse, authData:AuthenticationResultType|undefined}){

    const [trackSelected, setTrackSelected] = useState<apiSportsRacesRes>()
    const [allRaces, setAllRaces] = useState<apiSportsRacesRes[]>();
    const [trackTeam, setTrackTeam] = useState<TeamFrontEnd>()
    const [globalDate, setDate] = useState<number>(1687465115000) //change this for simulation
   
    
    
    
    useEffect (()=>{
        initPage();
    },[])




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
    
    function postNewTeamEventHandler(){
        if(props.authData && props.authData.AccessToken){
            const newTeamRequest = trackTeam as newTeamRequest
            postNewTeam(props.authData.AccessToken,newTeamRequest)

        }
    }

    function generateDriverCards(){
        
        if(trackSelected){
            const raceDate = new Date(trackSelected.date).valueOf()
            if(raceDate > globalDate!){//if race is in the future

                const selectionCards = 
                <div className="selection Conatiner">
                    {generateDriverSelectionCards()}
                    <button onClick={postNewTeamEventHandler}>Save Team</button>
                </div>

                return selectionCards
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
        <option key={i} value={driver.driver.id} id={driver.driver.name}>{driver.driver.name}</option> 
        )

        const driverTiers = props.userData.driverTiers
        let tierKey : keyof typeof driverTiers;

        interface IdriverTierOptinsJSX extends IdriverTiers {
            tier1:{
                drivers: JSX.Element[]
            },
            tier2:{
                drivers: JSX.Element[]
            },
            tier3:{
                drivers: JSX.Element[]
            },
        }
        const driverTierOptions: IdriverTierOptinsJSX= {
            
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

        //generating the options
        for(tierKey in driverTiers){ //here
            const drivers = driverTiers[tierKey].drivers 
            if(drivers){
                for(let i = 0; i < drivers.length; i++){
                    const driverObj = props.userData.driverData.filter((driver)=>{
                        if(driver.driver.id === drivers[i].id){
                            return driver
                        }
                    })[0]
                    driverTierOptions[tierKey].drivers!.push(
                        <option key={i} value={driverObj.driver.id} id={driverObj.driver.name}>{driverObj.driver.name}</option>
                    )
                }
            }
        }
        
        //generating the cards
        const driverSelectionCards:JSX.Element[] = []
        let paramKey : keyof SelectionParameters
        for(paramKey in SelectionParams){
            const parameter = SelectionParams[paramKey];
            if(paramKey === 'dnf'|| paramKey === 'fastestLap'){
                driverSelectionCards.push(
                    <DriverSelectionCard currentTeam = {trackTeam} selectionParam={parameter} driverOptions={GeneralOptions} teamChangehandler = {setTrackTeam}/>
                )   
            }else{
                driverSelectionCards.push(
                    <DriverSelectionCard  currentTeam = {trackTeam} selectionParam={parameter} driverOptions={driverTierOptions[paramKey].drivers} teamChangehandler = {setTrackTeam}/>
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