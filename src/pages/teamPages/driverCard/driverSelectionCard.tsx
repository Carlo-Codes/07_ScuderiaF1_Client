import React, { OptionHTMLAttributes, useState } from "react"
import { Card } from "../../../Util/card/card"
import { apiSportsDriver } from "@backend/apiSportsResponseTypes";
import './driverCard.css'
import { DriverPicture } from "./DriverPicture";
import { Team } from "@backend/dbTypes";
import { selectionParam } from "../teamPageBase";
import { TeamFrontEnd } from "../../../@types/frontEnd";

export function DriverSelectionCard(props:{selectionParam:selectionParam, driverOptions:JSX.Element[], currentTeam:TeamFrontEnd|undefined ,teamChangehandler:React.Dispatch<React.SetStateAction<TeamFrontEnd | undefined>>}){

    const [selection, setSelection] = useState('Select one...')

    const handleSelectionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let tempTeam = props.currentTeam

        if(!tempTeam){
            tempTeam = {}
        }

        const selectedI = e.target.options.selectedIndex
        const selectedName = e.target.options[selectedI].id //annoying because html id doesnt accept numbers so name is id
        const selectedID = e.target.options[selectedI].value

        const param = props.selectionParam.dbSelection
        tempTeam[param] = selectedID as unknown as number
        props.teamChangehandler(tempTeam)
        setSelection(selectedName);
    }
    


    const driverselection =
            <div className="selection Container">
                <div className="driverCard">
                    <div className="selectionParam">{props.selectionParam.clientName}</div>
                    <DriverPicture driverName={selection}></DriverPicture>
                    <select name="drivers" id="drivers" onChange={handleSelectionChange}>
                        <option value={""} selected disabled hidden>Select one...</option>
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