import React from "react";
import {Card} from "../../../Util/card/card"
import {Team} from '@backend/dbTypes'
export function TeamRankCard(props:{ranking:number, team:Team}){
    return (
        <Card>
            <>
                <div className="ranking">{props.ranking}</div>
                <div className="teamName">{props.team.team_name}</div>
            </>
        </Card>
    )
}