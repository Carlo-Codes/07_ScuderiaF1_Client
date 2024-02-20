import React from "react";
import './card.css'

export function Card ({children}:{children:React.ReactElement}){
    return(
        <div className='cardClass'>
            {children}
        </div>
    )
}