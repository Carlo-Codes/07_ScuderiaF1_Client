import {newTeamRequest} from '@backend/HTTPtypes'
import {teamRoute} from './00routes'

export async function postNewTeam(accessToken:string, newTeam:newTeamRequest ):Promise<string>{
    const res = await fetch(teamRoute + 'newTeam', {
       method : 'POST',
       headers : {
        "Content-Type": "application/json",
        "authorization": `Bearer${accessToken}`
       },
       body: JSON.stringify(newTeam)
       
    })

    if(res.status == 400){
        return res.text()
    }
    return res.json()
}

export async function updateTeam(accessToken:string, newTeam:newTeamRequest ):Promise<string>{
    const res = await fetch(teamRoute + 'updateTeam', {
       method : 'POST',
       headers : {
        "Content-Type": "application/json",
        "authorization": `Bearer${accessToken}`
       },
       body: JSON.stringify(newTeam)
       
    })

    if(res.status == 400){
        return res.text()
    }
    return res.json()
}