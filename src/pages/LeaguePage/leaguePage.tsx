import React from "react";
import {League} from '@backend/dbTypes'
import { LeaguesCard } from "./leaguesCard/leaguesCard"; 
import './leaguePage.css'
import { dataResponse } from "@backend/HTTPtypes";
import { AuthenticationResultType } from "@aws-sdk/client-cognito-identity-provider";



export function LeaguePage(props:{userData:dataResponse, authentication:AuthenticationResultType}){
    return (
        <div className="leaguePage">
            <LeaguesCard userData={props.userData}></LeaguesCard>
        </div>
    )
}