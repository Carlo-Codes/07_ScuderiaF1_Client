import React from "react"
import './input.css'

export function TextInput(props:{inputName:string, changeHandler:React.Dispatch<React.SetStateAction<string>>}){
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        props.changeHandler(e.target.value)
    }
    
    return(

        <div className="customInput">
                <label htmlFor={props.inputName}>{props.inputName}:</label>
                <input id={props.inputName} onChange={handleChange}></input>
        </div>
    )
}