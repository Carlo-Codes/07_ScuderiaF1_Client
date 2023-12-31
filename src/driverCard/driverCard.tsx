import React from "react";
import { Card } from "../Util/card/card";
import {apiSportsDriver} from '@backend/apiSportsResponseTypes'

export function DriverCard(props:{driver:apiSportsDriver}){
    
    
    const driver =
        <Card>
            <>
                <div className="driver">
                    <img></img>
                    {props.driver.name}
                </div>
            </>
        </Card>



    return (
        <>
            {driver}
        </>

    ) 
}