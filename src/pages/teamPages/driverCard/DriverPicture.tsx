import React from "react";


const images:string[] = []




export function DriverPicture(props:{driverName:string}){

    return (
        <img className="driverPicture" src={`./src/assets/driverImages/${props.driverName}.png`}></img>
    )
    

}