import React from "react"
import './navItem.css'

export function NavItem(props:{name:string, eventlistener:(state: string) => void}){

    const eventhandler = ()=>{
        props.eventlistener(props.name)
    }

    return (
        <div className="navItem" onClick={eventhandler}>
            {props.name}
        </div>
    )
}