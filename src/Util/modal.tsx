import React, { ReactChildren, ReactPropTypes } from "react";

export function Modal ({children}:{children:React.ReactElement}){
    return(
        <div className="modal">
            {children}
            <button>Close</button>
        </div>
    )
}