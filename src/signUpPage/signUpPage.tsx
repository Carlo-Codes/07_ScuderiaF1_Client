import React from "react";
import { Card } from "../Util/card/card";
import './SignUpPage.css'
export function SignUpPage(){
    return(
        <>
        <div className="signUpHeader">
            Header Comp
        </div>
        <div className="signUpBody">
            <Card>
                <>
                    <div>
                        Username
                        <input></input>
                    </div>
                    <div>
                        Password
                        <></>
                    </div>
                </>
            </Card>
        </div>
        <div className="signUpFooter">
            Footer comp
        </div>
        
        </>
    )
}