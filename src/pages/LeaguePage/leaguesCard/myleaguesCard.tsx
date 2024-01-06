import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesCard.css'

export function MyLeaguesCard(props:{leagues:League[]}){

    const myLeagueDivs = props.leagues.map((league)=>{
        return (
            <li className='myLeague'>
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