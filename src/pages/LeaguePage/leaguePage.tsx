import React from "react";
import {League} from '@backend/dbTypes'
import { CreateLeagueCard } from "./leaguesCard/createLeagueCard";
import { MyLeaguesCard } from "./leaguesCard/myleaguesCard";
import { LeaguesCard } from "./leaguesCard/leaguesCard"; 
import './leaguePage.css'
import { dataResponse } from "@backend/HTTPtypes";
import { AuthenticationResultType } from "@aws-sdk/client-cognito-identity-provider";
import { JoinLeagueCard } from "./leaguesCard/joinLeagueCard";


export function LeaguePage(props:{userData:dataResponse, authentication:AuthenticationResultType}){
    return (
        <div className="leaguePage">
            <LeaguesCard userData={props.userData}></LeaguesCard>
            <MyLeaguesCard userData={props.userData}></MyLeaguesCard>
            <JoinLeagueCard userData={props.userData} authentication={props.authentication}></JoinLeagueCard>
            <CreateLeagueCard userData={props.userData} authentication = {props.authentication}></CreateLeagueCard>
        </div>
    )
}