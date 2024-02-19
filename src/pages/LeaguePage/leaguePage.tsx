import React from "react";
import {League} from '@backend/dbTypes'
import { LeaguesCard } from "./leaguesCard/leaguesCard"; 
import './leaguePage.css'
import { dataResponse } from "@backend/HTTPtypes";
import { AuthenticationResultType } from "@aws-sdk/client-cognito-identity-provider";



export function LeaguePage(props:{userData:dataResponse, authentication:string, reloadData:() => Promise<void>}){
    return (
        <div className="leaguePage">
            <LeaguesCard userData={props.userData} reloadData={props.reloadData} authentication={props.authentication}></LeaguesCard>
        </div>
    )
}