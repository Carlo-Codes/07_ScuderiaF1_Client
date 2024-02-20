import { LeaguesCard } from "./leaguesCard/leaguesCard"; 
import './leaguePage.css'
import { dataResponse } from "@backend/HTTPtypes";

export function LeaguePage(props:{userData:dataResponse, authentication:string, reloadData:() => Promise<void>}){
    return (
        <div className="leaguePage">
            <LeaguesCard userData={props.userData} reloadData={props.reloadData} authentication={props.authentication}></LeaguesCard>
        </div>
    )
}