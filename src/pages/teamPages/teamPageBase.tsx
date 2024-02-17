import React, { FunctionComponent, useEffect, useState } from "react"
import {TrackCard} from './trackCard/trackCard'
import { Card } from "../../Util/card/card"
import { PropsWithChildren } from "react"
import { dataResponse, newLeagueRequest, newTeamRequest, } from "@backend/HTTPtypes";
import { apiSportsRacesRes } from "@backend/apiSportsResponseTypes";
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import { DriverPointsCard } from "./driverCard/driverPointsCard";
import { RacesApiStore, IdriverTiers, Team } from "@backend/dbTypes";
import { TeamFrontEnd, SelectionParameters, SelectionParamsMap} from "@backend/frontEnd"
import { postNewTeam, updateTeam } from "../../apis/team";
import { AuthenticationResultType,  } from '@aws-sdk/client-cognito-identity-provider'



export function TeamPageBase(props:{userData:dataResponse, authData:AuthenticationResultType|undefined, setUserData:React.Dispatch<React.SetStateAction<dataResponse | undefined>>, reloadData:() => Promise<void>}){

    const [trackSelected, setTrackSelected] = useState<apiSportsRacesRes>()
    const [allRaces, setAllRaces] = useState<apiSportsRacesRes[]>();
    const [savedTrackTeam, setSavedTrackTeam] = useState<Team>()
    const [trackTeam, setTrackTeam] = useState<TeamFrontEnd>()//more like "EditedTemValues"
    const [globalDate, setDate] = useState<number>(1690751045000) //change this for simulation
    
    function updateTrackTeam<K extends keyof TeamFrontEnd, V extends TeamFrontEnd[K]>(key:K, value: V):void{
        let tempTeam = trackTeam || {} as TeamFrontEnd
        tempTeam[key] = value
        setTrackTeam(tempTeam)
    }
    
    function updateTeamsInUserData(newTeam: Team){
        let userDataCopy = props.userData
        let userTeamsCopy = props.userData.userTeams.map((team) => {
            if(team.competition_id === newTeam.competition_id){
                return newTeam
            }else{
                return team
            }
        })
        userDataCopy.userTeams = userTeamsCopy
        props.setUserData(userDataCopy)
    }
    
    useEffect (()=>{
        initPage();
    },[])

    function initPage(){
        getRaces()
        
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
        updateTrackTeam('competition_id',potentialnextRace.id)
        findUserTeamForTrack(potentialnextRace.id)
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


    function findUserTeamForTrack(competition_id:number){
        const team = props.userData.userTeams.filter((team)=>{
            if(team.competition_id === competition_id){
                return team
            }
        })
        if(team[0]){
            setSavedTrackTeam(team[0])
        } else {
            setSavedTrackTeam(undefined)
        }
        
    }
    
    async function postTeamEventHandler(){
        if(props.authData && props.authData.AccessToken){
            const newTeamRequest = trackTeam as newTeamRequest
            if(!savedTrackTeam){
                
                const newTeam = await postNewTeam(props.authData.AccessToken,newTeamRequest) as unknown as Team[]
                updateTeamsInUserData(newTeam[0])
            }else{
                const updatedTeam = {...savedTrackTeam, ...trackTeam} as newTeamRequest
                const newTeam = await updateTeam(props.authData.AccessToken,updatedTeam) as unknown as Team[]
                updateTeamsInUserData(newTeam[0])
            }
            await props.reloadData()

        }
    }

    function generateDriverCards(){
        
        if(trackSelected){
            const raceDate = new Date(trackSelected.date).valueOf()
            if(raceDate > globalDate!){//if race is in the future

                const selectionCards = 
                <div className="selection Conatiner">
                    {generateDriverSelectionCards()}
                    <button onClick={postTeamEventHandler}>Save Team</button>
                </div>

                return selectionCards
            } else{
                return generateDriverpontsCard();
            }
        }
    }

    function generateDriverpontsCard(){
        let driverPointsCards:JSX.Element[] = []
        if(savedTrackTeam){
            let paramKey : keyof SelectionParameters
            for(paramKey in SelectionParamsMap){
                const param = SelectionParamsMap[paramKey]
                const Points = savedTrackTeam[param.dbPoints]
                const driverID = savedTrackTeam[param.dbSelection]
                const driver = props.userData.driverData.filter((driver)=>{
                    if (driver.driver.id === driverID as number){
                        return driver
                    }
                })

                driverPointsCards.push(
                    <DriverPointsCard key={paramKey} selectionParam={SelectionParamsMap[paramKey].clientName} driver={driver[0].driver} points={Points as number} ></DriverPointsCard>
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
        for(paramKey in SelectionParamsMap){
            const parameter = SelectionParamsMap[paramKey];      
           const key = paramKey + " " + trackSelected?.id
            
            if(paramKey === 'dnf'|| paramKey === 'fastestLap'){
                driverSelectionCards.push(
                    <DriverSelectionCard key={key} userData={props.userData} savedTeam = {savedTrackTeam} selectionParam={parameter} driverOptions={GeneralOptions} updateTeamHandler = {updateTrackTeam}/>
                )   
            }else{
                driverSelectionCards.push(
                    <DriverSelectionCard key={key} userData={props.userData} savedTeam = {savedTrackTeam} selectionParam={parameter} driverOptions={driverTierOptions[paramKey].drivers} updateTeamHandler = {updateTrackTeam}/>
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
            updateTrackTeam('competition_id',nextRace.id)
            findUserTeamForTrack(nextRace.id)
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
            updateTrackTeam('competition_id',nextRace.id)
            findUserTeamForTrack(nextRace.id)
        }
    }



    return (
        <div className="teamContainer">
            
            <Card>
                <>
                    <TrackCard trackName={trackSelected?.circuit.name!} nextRaceHandler={nextRaceHandler} previousRaceHandler={previousRaceHandler} date={trackSelected?.date!}></TrackCard>
                    {generateDriverCards()}
                </>
            </Card>
        </div>
    )

}