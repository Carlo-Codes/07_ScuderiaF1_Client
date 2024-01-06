import React from "react"
import './input.css'

export function TextInput(props:{inputName:string}){
    return(
        <div className="customInput">
                <label htmlFor={props.inputName}>{props.inputName}:</label>
                <input id={props.inputName}></input>
        </div>
    )
}