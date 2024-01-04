import React from "react";
import {League, Team} from '@backend/dbTypes'
import { TeamRankCard } from "./TeamRankCard/teamRankCard";

const testTeam:Team = {
    id:1,
    team_name:"testTeam",
    tier1_driver_id: 1,
    tier2_driver_id:2,
    tier3_driver_id:3,
    dnf_driver_id:4,
    user_id:5,
    competion_id:2
}

export function LeagueRankingPage(props:{league:League}){
    return (
        <>
            <div className="leagueName">
                {props.league.league_name}
            </div>
            <div className="rankings">
                <TeamRankCard ranking={1} team={testTeam}></TeamRankCard>
                <TeamRankCard ranking={2} team={testTeam}></TeamRankCard>
                <TeamRankCard ranking={3} team={testTeam}></TeamRankCard>
                <TeamRankCard ranking={4} team={testTeam}></TeamRankCard>
            </div>
        </>
    )
}