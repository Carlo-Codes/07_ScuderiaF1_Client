import {LeagueAndTeams,joinLeagueRequest,newLeagueRequest, dataResponse} from '@backend/HTTPtypes'
import {userRoute} from './00routes'

export async function joinUserToLeague(request:joinLeagueRequest){
    const res = await fetch(userRoute + )
}

export async function getData(accessToken:string):Promise<dataResponse|string>{
    const res = await fetch(userRoute + 'getData', {
       method : 'GET',
       headers : {
        "Content-Type": "application/json",
        "authorization": `Bearer${accessToken}`
       },
       
    })

    if(res.status == 400){
        return res.text()
    }
    return res.json()
}