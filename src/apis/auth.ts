import {authenticationRequest, newUserRequest, confirmUserRequest} from '@backend/HTTPtypes'
import {InitiateAuthResponse, AuthenticationResultType} from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { SignUpCommandOutput,} from '@aws-sdk/client-cognito-identity-provider/dist-types/commands/SignUpCommand';
import {newUserRoute} from './00routes'



export const login = async (creds:authenticationRequest):Promise<InitiateAuthResponse | string> => { //need to ask about error types aws
    const res = await fetch(newUserRoute + 'authPassword', {
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
    const res = await fetch(newUserRoute + 'newUser', {
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
    const res = await fetch(newUserRoute + 'confirmUser', {
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

export const refreshToken = async (token:string) : Promise< AuthenticationResultType | string>  => {
    const res  = await fetch(newUserRoute + 'refreshToken', {
        method : 'GET',
        mode : 'cors',
        headers : {
            "Content-Type": "application/json",
            "authorization": `Bearer${token}`
           },

    }
    )

    if(res.status == 400){
        return res.text()
    }
    return res.json()

}
