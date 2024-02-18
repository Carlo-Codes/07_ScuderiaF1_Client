import React from "react";
import {League} from '@backend/dbTypes'
import { CreateLeagueCard } from "./LeagueSettings/createLeagueCard";
import './accountPage.css'
import { dataResponse } from "@backend/HTTPtypes";
import { AuthenticationResultType } from "@aws-sdk/client-cognito-identity-provider";
import { JoinLeagueCard } from "./LeagueSettings/joinLeagueCard"
import { MyLeaguesCard } from "./LeagueSettings/myleagueCard"
import { States } from "../../App";

export function AccountPage(props:{userData:dataResponse, authentication:AuthenticationResultType ,  reloadData:() => Promise<void> , setLogin: React.Dispatch<React.SetStateAction<boolean>>}){
    function deleteStorage(){
        localStorage.clear();
        props.setLogin(false)
    }

    return (
        <div className="accountPage">
            <MyLeaguesCard userData={props.userData} authentication={props.authentication} reloadData={props.reloadData}></MyLeaguesCard>
            <JoinLeagueCard userData={props.userData} authentication={props.authentication} reloadData={props.reloadData}></JoinLeagueCard>
            <CreateLeagueCard userData={props.userData} authentication = {props.authentication} reloadData={props.reloadData}></CreateLeagueCard>
            <button onClick={deleteStorage}>Sign Out</button>
        </div>
    )
}