import {Card} from '../../../Util/card/card'
import {Team, UserLeagueRelation} from '@backend/dbTypes'
import './leaguesCard.css'
import { dataResponse, getLeagueDataReq, getUsersinLeageReq, getUsersinLeageRes } from '@backend/HTTPtypes';
import { useEffect, useState } from 'react';
import { getTeamsInLeague, getUsersInLeague } from '../../../apis/leagues';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { SelectionParameters, SelectionParamsMap, selectionParam } from '@backend/frontEnd';

export function LeaguesCard(props:{userData:dataResponse, authentication:string, reloadData:() => Promise<void>}){

    interface userTeamsTotalPoints{
        username : string,
        userId:string,
        totalPoint?: number,
        teams?: Team[]
    }


    if(!props.userData.participatingLeague[0]){
        const noLeagueMessage=
            <div className='noLeagueMessage'>
                You're not in any Leagues! Join or create one on the Accounts Page
            </div>
        return noLeagueMessage
    }


    const [userTeamsTotalPoints, setUserTeamsTotalPoints] = useState<userTeamsTotalPoints[]>()
    const [selectedLeagueId, setSelectedLeagueId] = useState<number>(props.userData.participatingLeague[0].id)
    const [error, setError] = useState('')

   

    async function getTeamsinSelectedLeague(){
        if(props.authentication){

            const req:getLeagueDataReq = {
                id: selectedLeagueId,
                token : props.authentication
            }

            const teamData = await getTeamsInLeague(req) as Team[]
            if(teamData[0].id){
                return teamData
            } else{
                setError('error getting league')
            }
        }
    }
    async function getUsersInSelectedLeague(){
        if(props.authentication){

            const req:getUsersinLeageReq = {
                id: selectedLeagueId,
                token : props.authentication
            }

            const usersnames = await getUsersInLeague(req) as getUsersinLeageRes
            if(usersnames.users[0].user_id){
                return usersnames.users
            } else{
                setError('error getting league')
            }
        }
    }

    async function combineUsersTeamsinSelectedLeague(){
        let tempUserTeamsTotalPoints:userTeamsTotalPoints[] = []
        const teams = await getTeamsinSelectedLeague()
        const users = await getUsersInSelectedLeague()

        if(users && teams){
            for(let i = 0; i < users.length; i++){
                let uttp:userTeamsTotalPoints = {
                    userId:users[i].user_id,
                    username:users[i].username
                }
                const userTeams = teams.filter((team) => {
                    if(team.user_id === users[i].user_id){
                        return team
                    }
                })
                uttp.teams = userTeams
                tempUserTeamsTotalPoints.push(uttp)
            }
            return tempUserTeamsTotalPoints
        }
    }

    async function sumPoints(userTeamsPoints:userTeamsTotalPoints[]){

        for(let i = 0; i < userTeamsPoints.length; i++){
            let totalSore = 0
            const teams = userTeamsPoints[i].teams
            if(teams){
                for(let j = 0; j < teams?.length; j++){
                    let paramKey : keyof SelectionParameters
                    for(paramKey in SelectionParamsMap){
                        const param = SelectionParamsMap[paramKey].dbPoints
                        totalSore += teams[j][param] as number
                    }
                }
            }
            userTeamsPoints[i].totalPoint = totalSore
        }

        return userTeamsPoints
    }

    async function generateLeagueData(){
        const teamUser = await combineUsersTeamsinSelectedLeague()
        if(teamUser){
            const teamUserPoints = await sumPoints(teamUser)
            teamUserPoints.sort((a,b) => b.totalPoint! - a.totalPoint!)
            setUserTeamsTotalPoints(teamUserPoints)
        }
    }

    useEffect(()=>{
        generateLeagueData()
        
    }, [selectedLeagueId])

    async function handleLeagueChange(e:React.ChangeEvent<HTMLSelectElement>){
        const leagueId = Number(e.target.value)
        setSelectedLeagueId(Number(e.target.value))

    }
        


    const leagueOptions = props.userData.participatingLeague.map((league)=>{
        return (
            <option key={league.id} value={league.id} className='leagueName'>
                {league.league_name}
            </option>
        )
    })

    const tableRows = userTeamsTotalPoints?.map((user, i) => {
        let cssClass = 'leagueTableRow'
        if(i % 2 == 0){
            cssClass = 'leagueTableRowAlt'
        }
        const row = 
        <tr key={user.userId} className={cssClass}>
            <td>{user.username}</td>
            <td className='position'>{i+1}</td>
            <td className='points'>{user.totalPoint}</td>
        </tr>
        return row
    })

    const leagueTable = 
        <div className='leagueTableContainer'>
            <table>
                <tbody>
                <tr>                    
                    <th>Username</th>
                    <th>Position</th>
                    <th>Points</th>
                </tr>
                {tableRows}

                </tbody>
            </table> 
        </div>

    const selectLeagueDropdown = 
        <div className='selectLeagueContainer'>
            <select className='' onChange={handleLeagueChange}>
                {leagueOptions}
            </select>
        </div>

    
    return (
        <div className='LeagueCard'>
            <Card>
                <div className='leagueCardInternal'>
                    <div className='LeagueCardTitle'>
                        Leagues 
                    </div>
                    {selectLeagueDropdown}
                    {leagueTable}
                </div>
            </Card>
        </div>
    )
}