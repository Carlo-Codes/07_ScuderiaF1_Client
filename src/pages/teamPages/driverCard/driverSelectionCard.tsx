import React, { OptionHTMLAttributes, useState } from "react"
import { Card } from "../../../Util/card/card"
import { apiSportsDriver } from "@backend/apiSportsResponseTypes";
import './driverCard.css'
import { DriverPicture } from "./DriverPicture";
import { Team } from "@backend/dbTypes";
import { selectionParam } from "../teamPageBase";
import { TeamFrontEnd } from "../../../@types/frontEnd";

export function DriverSelectionCard(props:{selectionParam:selectionParam, driverOptions:JSX.Element[], currentTeam:TeamFrontEnd|undefined ,updateTeamHandler:<K extends keyof TeamFrontEnd, V extends TeamFrontEnd[K]>(key: K, value: V)=>void}){

    const [selection, setSelection] = useState('Select one...')

    const handleSelectionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedI = e.target.options.selectedIndex
        const selectedName = e.target.options[selectedI].id //annoying because html id doesnt accept numbers so name is id
        const selectedID = e.target.options[selectedI].value

        const param = props.selectionParam.dbSelection

        props.updateTeamHandler(param,selectedID as unknown as number)
        setSelection(selectedName);
    }
    


    const driverselection =
            <div className="selection Container">
                <div className="driverCard">
                    <div className="selectionParam">{props.selectionParam.clientName}</div>
                    <DriverPicture driverName={selection}></DriverPicture>
                    <select name="drivers" id="drivers" defaultValue={"hidden"} onChange={handleSelectionChange}>
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