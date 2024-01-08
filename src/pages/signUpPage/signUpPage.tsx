import React, { useState } from "react";
import { Card } from "../../Util/card/card";
import './signUpPage.css'
import { TextInput } from "../../Util/input/input";
import {authenticationRequest, newUserRequest} from '@backend/HTTPtypes'
import { login } from "../../apis/auth";

export function SignUpPage(props:{setAppAccessToken:React.Dispatch<React.SetStateAction<string|undefined>>}){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')

    const [loginState, setloginState] = useState(true)

    const switchLoginState = () => {
        setloginState(!loginState)
    }

    const credentials:newUserRequest | authenticationRequest ={
        email:username,
        password:password
    }


    const initLogin =  async () => {
        const res = await login(credentials)
        props.setAppAccessToken(res.AuthenticationResult?.AccessToken)
    }




    const loginCard =
        <>
            <Card>
                <div className="interactionInternals">
                    <TextInput inputName="Username" changeHandler={setUsername}></TextInput>
                    <TextInput inputName="Password" changeHandler={setPassword}></TextInput>
                    <button onClick={initLogin}>Login</button>
                </div>
            </Card>

            <Card>
                <div className="stateChanger">
                    <div className="stateChangerTitle">Not registered?</div>
                    <button onClick={switchLoginState}>Sign Up</button>
                </div>
            </Card>
        </>
        

    const signUpCard = 
        <>
            <Card>
                <div className="interactionInternals">
                    <TextInput inputName="Username" changeHandler={setUsername}></TextInput>
                    <TextInput inputName="Password" changeHandler={setPassword}></TextInput>
                    <TextInput inputName="Retype Password" changeHandler={setRetypePassword}></TextInput>
                    <button>Sign Up</button>
                </div>
            </Card>

            <Card>
                <div className="stateChanger">
                    <div className="stateChangerTitle">Already registered?</div>
                    <button onClick={switchLoginState}>Log In</button>
                </div>
            </Card>
        </>

    const stateRenderer = ()=>{
        if(loginState){
            return loginCard
        }else {
            return signUpCard
        }       
    }
    return(
        <div className="signUpPage">
            <div className="signUpHeader">
                Scuderia F1 logo
            </div>
            <div className="signUpBody">
                {stateRenderer()}
            </div>
            <div className="signUpFooter">
                by Carlo
            </div>
        </div>
    )
}