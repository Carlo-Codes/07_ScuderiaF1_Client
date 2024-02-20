import React, {useState } from "react"
import './driverCard.css'
import { DriverPicture } from "./DriverPicture";

import {selectionParam } from "@backend/frontEnd" ;
import { dataResponse } from "@backend/HTTPtypes";
import { Team } from "@backend/dbTypes";


export function DriverSelectionCard(props:{userData:dataResponse, selectionParam:selectionParam, driverOptions:JSX.Element[], savedTeam:Team|undefined, updateTeamHandler:<K extends keyof Team, V extends Team[K]>(key: K, value: V)=>void}){

    let currentSelection = 'hidden'
    if(props.savedTeam){
        const savedTeamdriverId = props.savedTeam[props.selectionParam.dbSelection]
        if(savedTeamdriverId){
            currentSelection = getDriverNamefromID(savedTeamdriverId as number)
        }
    }
    const [selection, setSelection] = useState<string>(currentSelection)

    const handleSelectionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedI = e.target.options.selectedIndex
        const selectedName = e.target.options[selectedI].id //annoying because html id doesnt accept numbers so name is id
        const selectedID = e.target.options[selectedI].value

        const param = props.selectionParam.dbSelection

        props.updateTeamHandler(param,selectedID as unknown as number)
        setSelection(selectedName);
    }
    
    function getDriverNamefromID(id:number):string{
        const hidden = 'hidden'
        const driver = props.userData.driverData.filter((driver)=>{
            if(driver.driver.id == id){
                return driver
            }
            })[0]
        if(driver?.driver.name){
            return (driver.driver.name)
        
        } else {
            return hidden
        }

    }

    function getIdFromName(){
       const driver = props.userData.driverData.filter((driver)=>{
        if (driver.driver.name === selection){
            return driver
        }
       })[0]
       if(driver){
        return driver.driver.id as unknown as string
       }else{
        return selection
       }
       
    }

    const driverselection =
            <div className="selection Container">
                <div className="driverCard">
                    <div className="selectionParam">{props.selectionParam.clientName}</div>
                    <DriverPicture driverName={selection as string}></DriverPicture>
                    <select name="drivers" id="drivers" defaultValue={getIdFromName()} onChange={handleSelectionChange}>
                        <option value={"hidden"} id="hidden" disabled hidden>Select one...</option>
                        {props.driverOptions}
                    </select>
                </div>
            </div>



    return (
        <>
            {driverselection}
        </>

    ) 
}