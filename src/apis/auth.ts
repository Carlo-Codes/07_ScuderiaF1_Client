import {authenticationRequest, newUserRequest} from '@backend/HTTPtypes'
import CognitoIdentityServiceProvider, {InitiateAuthResponse} from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";



export const login = async (creds:authenticationRequest):Promise<CognitoIdentityServiceProvider.InitiateAuthResponse | string> => { //need to ask about error types aws
    const res = await fetch('http://localhost:7000/api/authPassword', {
       method : 'POST',
       mode : 'cors',
       headers : {
        "Content-Type": "application/json"
       },
       
       body: JSON.stringify(creds)
    })

    if(res.status == 400){
        return res.text()
    }

    return res.json()
    
}



export const signUp = async (creds:newUserRequest): Promise<SignUpCommand | string> => {
    const res = await fetch('http://localhost:7000/api/newUser', {
       method : 'POST',
       mode : 'cors',
       headers : {
        "Content-Type": "application/json"
       },
       
       body: JSON.stringify(creds)
    })

    if(res.status == 400){
        return res.text()
    }

    return res.json()
    
}



