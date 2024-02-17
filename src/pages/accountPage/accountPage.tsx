import React from "react";
import {League} from '@backend/dbTypes'
import { CreateLeagueCard } from "./LeagueSettings/createLeagueCard";
import './accountPage.css'
import { dataResponse } from "@backend/HTTPtypes";
import { AuthenticationResultType } from "@aws-sdk/client-cognito-identity-provider";
import { JoinLeagueCard } from "./LeagueSettings/joinLeagueCard"
import { MyLeaguesCard } from "./LeagueSettings/myleagueCard"

export function AccountPage(props:{userData:dataResponse, authentication:AuthenticationResultType}){
    function deleteStorage(){
        localStorage.clear();
    }

    return (
        <div className="accountPage">
            <MyLeaguesCard userData={props.userData}></MyLeaguesCard>
            <JoinLeagueCard userData={props.userData} authentication={props.authentication}></JoinLeagueCard>
            <CreateLeagueCard userData={props.userData} authentication = {props.authentication}></CreateLeagueCard>
            <button onClick={deleteStorage}>Sign Out</button>
        </div>
    )
}