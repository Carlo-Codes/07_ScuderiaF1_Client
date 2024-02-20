
import { apiSportsDriver } from "@backend/apiSportsResponseTypes";

import './driverCard.css'
import { DriverPicture } from "./DriverPicture";

export function DriverPointsCard(props:{driver:apiSportsDriver, selectionParam:string, points:number}){ //results to be changes to the type from db once designed


    const driverselection =

                <div className="driverCard">
                    <div className="selectionParam">{props.selectionParam}</div>
                    <DriverPicture driverName={props.driver.name}></DriverPicture>
                    <div className="points">
                        {props.points}
                    </div>
                </div>



    return (
        <>
            {driverselection}
        </>

    ) 
}