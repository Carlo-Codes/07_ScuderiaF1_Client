import {authenticationRequest, newUserRequest, confirmUserRequest} from '@backend/HTTPtypes'
import {InitiateAuthResponse, ConfirmSignUpResponse} from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { SignUpCommandOutput,} from '@aws-sdk/client-cognito-identity-provider/dist-types/commands/SignUpCommand';




export const login = async (creds:authenticationRequest):Promise<InitiateAuthResponse | string> => { //need to ask about error types aws
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


export const signUp = async (creds:newUserRequest): Promise<SignUpCommandOutput | string> => {
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


export const confirmUser = async (creds:confirmUserRequest): Promise <confirmUserRequest | string> => {
    const res = await fetch('http://localhost:7000/api/confirmUser', {
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
