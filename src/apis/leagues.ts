import {DeleteLeagueRequest, LeagueAndTeams,getLeagueDataReq,getTeamsinLeageReq,getUsersinLeageReq,getUsersinLeageRes,joinLeagueRequest,newLeagueRequest} from '@backend/HTTPtypes'
import {leagueRoute} from './00routes'
import { League, Team} from '@backend/dbTypes';

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

export async function getLeague(request:getLeagueDataReq){
    const res= await fetch(leagueRoute + 'getLeague', {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "authorization": `Bearer${request.token}`
           },
        body : JSON.stringify(request)
        
    })
    if(res.status == 400){
        return res.text()
    }
    return res.json() as Promise<League>
}



export async function getTeamsInLeague(request:getTeamsinLeageReq){
    const res= await fetch(leagueRoute + 'getTeamsInLeague', {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "authorization": `Bearer${request.token}`
           },
        body : JSON.stringify(request)
        
    })
    if(res.status == 400){
        return res.text()
    }
    return res.json() as Promise<Team[]>
}


export async function getUsersInLeague(request:getUsersinLeageReq){
    const res= await fetch(leagueRoute + 'getUsersinLeague', {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "authorization": `Bearer${request.token}`
           },
        body : JSON.stringify(request)
        
    })
    if(res.status == 400){
        return res.text()
    }
    return res.json() as Promise<getUsersinLeageRes>
}
