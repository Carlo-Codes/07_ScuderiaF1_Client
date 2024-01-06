import React from "react";
import {League} from '@backend/dbTypes'
import { CreateLeagueCard } from "./leaguesCard/createLeagueCard";
import { MyLeaguesCard } from "./leaguesCard/myleaguesCard";
import { LeaguesCard } from "./leaguesCard/leaguesCard"; 
import './leaguePage.css'

const league1 : League = {
    id:1,
    owner_user_id:1,
    league_name: "testleague 1",
    inviteCode: "htgrfedw"
}

const league2 : League = {
    id:2,
    owner_user_id:3,
    league_name: "testleague 2",
    inviteCode: "htgrfedw"
}

export function LeaguePage(){
    return (
        <div className="leaguePage">
            <LeaguesCard leagues={[league1,league2]}></LeaguesCard>
            <MyLeaguesCard leagues={[league1]}></MyLeaguesCard>
            <CreateLeagueCard></CreateLeagueCard>
        </div>
    )
}