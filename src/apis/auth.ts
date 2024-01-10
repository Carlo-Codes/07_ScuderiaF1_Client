import {authenticationRequest, newUserRequest} from '@backend/HTTPtypes'
import CognitoIdentityServiceProvider, {InitiateAuthResponse} from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES } from 'react';

export const login = async (creds:authenticationRequest):Promise<CognitoIdentityServiceProvider.InitiateAuthResponse> => { //need to ask about error types aws
    const res = await fetch('http://localhost:7000/api/authPassword', {
       method : 'POST',
       mode : 'cors',
       headers : {
        "Content-Type": "application/json"
       },
       
       body: JSON.stringify(creds)
    })
    return res.json()
}



export const signUp = async (creds:newUserRequest) => {
    const res = await fetch('http://07_scuderiaf1/server/newUser', {
        method:'POST',
        body: JSON.stringify(creds)
    })
    return await res.json()
}

