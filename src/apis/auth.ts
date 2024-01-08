import {authenticationRequest, newUserRequest} from '@backend/HTTPtypes'
import * as AWS  from 'aws-sdk'

export const login = async (creds:authenticationRequest):Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> => {
    const res = await fetch('http://server/api/authPassword', {
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