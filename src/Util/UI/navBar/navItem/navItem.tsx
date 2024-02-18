import React from "react"
import './navItem.css'
import { States } from "../../../../App";

export function NavItem(props:{name:States, eventlistener:(state: States) => void}){

    const eventhandler = ()=>{
        props.eventlistener(props.name)
    }

    return (
        <div className="navItem" onClick={eventhandler}>
            {props.name}
        </div>
    )
}