import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesSettings.css'
import { dataResponse } from '@backend/HTTPtypes';

export function MyLeaguesCard(props:{userData:dataResponse}){

    const myLeagueDivs = props.userData.userLeagues.map((league,i)=>{
        return (
            <li key={league.id} className='myLeague'>
                <div className='myLeagueCard'>
                    <div className='LeagueName'>{league.league_name}</div>
                    <div className='myLeagueInviteCode'>Invite : {league.inviteCode}</div>
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