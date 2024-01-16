import {LeagueAndTeams,newLeagueRequest} from '@backend/HTTPtypes'

export async function createLeague(request:newLeagueRequest){
    const res = await fetch('http://localhost:7000/api/league/newLeague', {
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
