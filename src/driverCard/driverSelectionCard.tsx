import React, { OptionHTMLAttributes } from "react"
import { Card } from "../Util/card/card"
import { apiSportsDriver } from "@backend/apiSportsResponseTypes";

export function DriverSelectionCard(props:{drivers:apiSportsDriver[]}){
    
    const options = props.drivers.map((driver) => 
        <option value={driver.id}>{driver.name}</option>
    )

    const driverselection =
        <Card>
            <>
                <div className="driver">
                    <img></img>
                    <div>Tier</div>
                    <label htmlFor="drivers"> Choose Driver</label>
                    <select name="drivers" id="drivers">
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