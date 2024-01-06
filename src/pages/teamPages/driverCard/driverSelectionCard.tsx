import React, { OptionHTMLAttributes, useState } from "react"
import { Card } from "../../../Util/card/card"
import { apiSportsDriver } from "@backend/apiSportsResponseTypes";
import './driverCard.css'
import { DriverPicture } from "./DriverPicture";

export function DriverSelectionCard(props:{selectionParam:string, driverOptions:JSX.Element[]}){

    const [selection, setSelection] = useState('Select one...')

    const handleSelectionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelection(e.target.value);
    }
    


    const driverselection =
        <Card>
            <>
                <div className="driverCard">
                    <div className="selectionParam">{props.selectionParam}</div>
                    <DriverPicture driverName={selection}></DriverPicture>
                    <label htmlFor="drivers"> Choose Driver </label>
                    <select name="drivers" id="drivers" defaultValue={selection} onChange={handleSelectionChange}>
                        {props.driverOptions}
                    </select>
                </div>
            </>
        </Card>



    return (
        <>
            {driverselection}
        </>

    ) 
}