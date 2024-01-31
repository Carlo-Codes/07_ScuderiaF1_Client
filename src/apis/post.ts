import {newTeamRequest} from '@backend/HTTPtypes'

export async function postNewTeam(accessToken:string, newTeam:newTeamRequest ):Promise<string>{
    const res = await fetch('http://localhost:7000/api/team/newTeam', {
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
    const res = await fetch('http://localhost:7000/api/team/updateTeam', {
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