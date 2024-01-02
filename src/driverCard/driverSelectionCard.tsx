import React, { OptionHTMLAttributes, useState } from "react"
import { Card } from "../Util/card/card"
import { apiSportsDriver } from "@backend/apiSportsResponseTypes";
import './driverCard.css'
import { DriverPicture } from "./DriverPicture";

export function DriverSelectionCard(props:{drivers:apiSportsDriver[]}){

    const [selection, setSelection] = useState('Select one...')

    const handleSelectionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelection(e.target.value);
    }
    
    const options = props.drivers.map((driver) => 
        <option key={driver.id} value={driver.name}>{driver.name}</option>
    )
    options.push(
        <option key='00' hidden>Select one...</option>
    )

    const driverselection =
        <Card>
            <>
                <div className="driverCard">
                    <div>Tier</div>
                    <DriverPicture driverName={selection}></DriverPicture>
                    <label htmlFor="drivers"> Choose Driver </label>
                    <select name="drivers" id="drivers" defaultValue={selection} onChange={handleSelectionChange}>
                        {options}
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