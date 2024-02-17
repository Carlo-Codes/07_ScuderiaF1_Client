import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesSettings.css'
import { DeleteLeagueRequest, dataResponse } from '@backend/HTTPtypes';
import { deleteLeague } from '../../../apis/leagues';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

export function MyLeaguesCard(props:{userData:dataResponse, authentication:AuthenticationResultType, reloadData:() => Promise<void>}){

   const deleteLeagueHandler = async (id:number) => {
        if(confirm('Are you sure you want to delete this league?')){
            if(props.authentication.AccessToken){
                const req:DeleteLeagueRequest = {
                    leagueId:id,
                    token:props.authentication.AccessToken
                }
                const res = await deleteLeague(req)
                return res
            }
        }
    }

    const myLeagueDivs = props.userData.userLeagues.map((league,i)=>{
        const delbtnHandler = async() => {
            await deleteLeagueHandler(league.id)
            await props.reloadData()
        }
        return (
            <li key={league.id} className='myLeague'>
                <div className='myLeagueCard'>
                    <div className='LeagueName'>{league.league_name}</div>
                    <div className='myLeagueInviteCode'>Invite : {league.inviteCode}</div>
                    <button onClick={delbtnHandler}>Delete</button>
                </div>
            </li>
        )
    })

    return (
        <div className='LeagueCard'>
            <Card>
                <div className='leagueCardInternal'>
                    <div className='LeagueCardTitle'>
                        My Leagues
                    </div>
                    <ul className='LeagueList'>
                        {myLeagueDivs}
                    </ul>
                </div>
            </Card>
        </div>
    )
}