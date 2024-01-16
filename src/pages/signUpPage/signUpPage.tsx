import React, { useState } from "react";
import { Card } from "../../Util/card/card";
import './signUpPage.css'
import { CustomTextInput } from "../../Util/input/input";
import {authenticationRequest, newUserRequest} from '@backend/HTTPtypes'
import { login, signUp, confirmUser } from "../../apis/auth";
import { AuthenticationResultType,  } from '@aws-sdk/client-cognito-identity-provider'
import CognitoIdentityServiceProvider, {InitiateAuthResponse} from 'aws-sdk/clients/cognitoidentityserviceprovider'



export function SignUpPage(props:{setAppAccessToken:(token:AuthenticationResultType | undefined)=>void, setLoginStatus:React.Dispatch<React.SetStateAction<boolean>>, getInitialData:React.Dispatch<React.SetStateAction<void>>}){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [verificationCode, setVerificationCode] = useState('')

    const [loginState, setloginState] = useState(0)
    const [requestStatus, setRequestStatus] = useState('')

    enum LOGIN_STATE {
        login,
        signUp,
        verifyEmail
    }

    const changeStateHanler = (e:React.MouseEvent<HTMLButtonElement>) => {
        setloginState(Number(e.currentTarget.id))
    }

    const initLogin =  async () => {
        try{
            const res = await login({email:username, password:password} as newUserRequest)
            if(typeof res == 'string'){
                setRequestStatus(res)
                return
            }
            localStorage.setItem('authentication', JSON.stringify(res.AuthenticationResult))
            localStorage.setItem('loginDate', Date.now().toString())
            props.setAppAccessToken(res.AuthenticationResult);
            props.setLoginStatus(true);
        }
        catch(err:unknown){
            if(err instanceof Error){
                setRequestStatus(err.message)
            }
        }
    }

    const initSignUp = async () => {
        try{
            if(password != retypePassword){
                throw new Error("Passwords are not the same")
            }
            const res = await signUp({email:username, password:password} as newUserRequest)
            if(typeof res == 'string'){
                setRequestStatus(res)
                return
            }
            setloginState(LOGIN_STATE.verifyEmail)
            setRequestStatus('Please verify your email address, check your inbox')
        }catch(err:unknown){
            if(err instanceof Error){
                setRequestStatus(err.message)
            }
        }
    }

    const initVerify = async () => {
        try {
            const res = await confirmUser({email:username,code:verificationCode})
            if(typeof res == 'string'){
                setRequestStatus(res)
                return
            }
            setloginState(LOGIN_STATE.login)
            setRequestStatus('User Verified, Please Log in!')
        } catch (error) {
            
        }
    }




    const loginCard =
        <>
            <Card>
                <div className="interactionInternals">
                    <CustomTextInput inputName="Username" changeHandler={setUsername} inputType='email'></CustomTextInput>
                    <CustomTextInput inputName="Password" changeHandler={setPassword} inputType='password'></CustomTextInput>
                    <button onClick={initLogin}>Login</button>
                </div>
            </Card>

            <Card>
                <div className="stateChanger">
                    <div className="stateChangerTitle">Not registered?</div>
                    <button id={LOGIN_STATE.signUp.toString()} onClick={changeStateHanler}>Sign Up</button>
                </div>
            </Card>
        </>
    

    const signUpCard = 
        <>
            <Card>
                <div className="interactionInternals">
                    <CustomTextInput inputName="Username" changeHandler={setUsername} inputType='email'></CustomTextInput>
                    <CustomTextInput inputName="Password" changeHandler={setPassword} inputType='password' ></CustomTextInput>
                    <CustomTextInput inputName="Retype Password" changeHandler={setRetypePassword} inputType='password'></CustomTextInput>
                    <button onClick={initSignUp}>Sign Up</button>
                </div>
            </Card>

            <Card>
                <div className="stateChanger">
                    <div className="stateChangerTitle">Already registered?</div>
                    <button id={LOGIN_STATE.login.toString()} onClick={changeStateHanler}>Log In</button>
                    <div className="stateChangerTitle">Need to Verify Your Email?</div>
                    <button id={LOGIN_STATE.verifyEmail.toString()} onClick={changeStateHanler}>Verify</button>
                </div>

                
            </Card>
        </>
    
    const verifyEmailCard = 
        <>
            <Card>
                <div className="interactionInternals">
                    <CustomTextInput inputName="Username" changeHandler={setUsername} inputType='email'></CustomTextInput>
                    <CustomTextInput inputName="Varification Code" changeHandler={setVerificationCode} inputType='text' ></CustomTextInput>
                    <button onClick={initVerify}>Verify</button>
                </div>
            </Card>

            <Card>
                <div className="stateChanger">
                    <div className="stateChangerTitle">Already Verified?</div>
                    <button id={LOGIN_STATE.login.toString()} onClick={changeStateHanler}>Log In</button>
                </div>
            </Card>
        </>


    const stateRenderer = ()=>{
        if(loginState == LOGIN_STATE.login){
            return loginCard
        }
        if(loginState == LOGIN_STATE.signUp){
            return signUpCard
        }
        if(loginState == LOGIN_STATE.verifyEmail){
            return verifyEmailCard
        }
    }


    return(
        <div className="signUpPage">
            <div className="signUpHeader">
                Scuderia F1 logo
            </div>
            <div className="signUpBody">
                {stateRenderer()}
                <div className="requestStatus">{requestStatus}</div>
            </div>
            <div className="signUpFooter">
                by Carlo
            </div>
        </div>
    )
}