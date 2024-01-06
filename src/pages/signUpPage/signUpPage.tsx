import React, { useState } from "react";
import { Card } from "../../Util/card/card";
import './signUpPage.css'
import { TextInput } from "../../Util/input/input";

export function SignUpPage(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginState, setloginState] = useState('login')

    const loginCard =
        <>
            <Card>
                <div className="interactionInternals">
                    <TextInput inputName="Username"></TextInput>
                    <TextInput inputName="Password"></TextInput>
                    <button>Login</button>
                </div>
            </Card>

            <Card>
                <div className="stateChanger">
                    <div className="stateChangerTitle">Not registered?</div>
                    <button>Sign Up</button>
                </div>
            </Card>
        </>
        

    const signUpCard = 
        <>
            <Card>
                <div className="interactionInternals">
                    <TextInput inputName="Username"></TextInput>
                    <TextInput inputName="Password"></TextInput>
                    <TextInput inputName="Retype Password"></TextInput>
                    <button>Sign Up</button>
                </div>
            </Card>

            <Card>
                <div className="stateChanger">
                    <div className="stateChangerTitle">Already registered?</div>
                    <button>Log In</button>
                </div>
            </Card>
        </>


    return(
        <div className="signUpPage">
            <div className="signUpHeader">
                Scuderia F1 logo
            </div>
            <div className="signUpBody">
                {signUpCard}
            </div>
            <div className="signUpFooter">
                by Carlo
            </div>
        </div>
    )
}