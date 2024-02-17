import {DeleteLeagueRequest, LeagueAndTeams,joinLeagueRequest,newLeagueRequest} from '@backend/HTTPtypes'
import {leagueRoute} from './00routes'

export async function createLeague(request:newLeagueRequest){
    const res = await fetch(leagueRoute + 'newLeague', {
        method : 'Post',
        headers : {
         "Content-Type": "application/json",
         "authorization": `Bearer${request.token}`
        },
        body : JSON.stringify({
            league_name:request.league_name,
        })
        
     })
     if(res.status == 400){
         return res.text()
     }
     return res.json()
}


export async function deleteLeague(request:DeleteLeagueRequest){
    const res = await fetch(leagueRoute + 'deleteLeague', {
        method : 'Post',
        headers : {
         "Content-Type": "application/json",
         "authorization": `Bearer${request.token}`
        },
        body : JSON.stringify(request)
        
     })
     if(res.status == 400){
         return res.text()
     }
     return res.text()
}

