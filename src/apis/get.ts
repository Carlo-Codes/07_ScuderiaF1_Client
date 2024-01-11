import {dataResponse} from '@backend/HTTPtypes'

export async function getData(accessToken:string):Promise<dataResponse|string>{
    const res = await fetch('http://localhost:7000/api/authPassword', {
       method : 'POST',
       mode : 'cors',
       headers : {
        "Content-Type": "application/json",
        "authorization": `Bearer ${accessToken}`
       },
       
    })

    if(res.status == 400){
        return res.text()
    }
    return res.json()
}