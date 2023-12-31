import React, { useState } from "react";
import { Card } from "../../Util/card/card";
import './SignUpPage.css'
import { Input } from "../../Util/input/input";

export function SignUpPage(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginState, setloginState] = useState('login')

    const loginCard =
        <Card>
            <>
                <Input inputName="Username"></Input>
                <Input inputName="Password"></Input>
                <button>Login</button>
                <div>Not registered?</div>
                <button>Sign Up</button>
            </>
        </Card>

    const signUpCard = 
    <Card>
        <>
            <Input inputName="Username"></Input>
            <Input inputName="Password"></Input>
            <Input inputName="Retype Password"></Input>
            <button>Sign Up</button>
            <div>Already registered?</div>
            <button>Login</button> 
        </>
    </Card>


    return(
        <>
        <div className="signUpHeader">
            Header Comp
        </div>
        <div className="signUpBody">
            {loginCard}
        </div>
        <div className="signUpFooter">
            Footer comp
        </div>
        
        </>
    )
}