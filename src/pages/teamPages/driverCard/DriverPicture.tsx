import React from "react";


const images:string[] = []




export function DriverPicture(props:{driverName:string}){

    if(props.driverName != "Select one..."){
        return (
            <img className="driverPicture" src={`./src/assets/driverImages/${props.driverName}.png`}></img>
        )
    }
    else{
        return (
            <></>
        )
    }
    

}