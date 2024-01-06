import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesCard.css'

export function LeaguesCard(props:{leagues:League[]}){

    const leagueDivs = props.leagues.map((league)=>{
        return (
            <li className='leagueName'>
                {league.league_name}
            </li>
        )
    })

    return (
        <div className='LeagueCard'>
            <Card>
                <div className='leagueCardInternal'>
                    <div className='LeagueCardTitle'>
                        Leagues 
                    </div>
                    <ul className='LeagueList'>
                        {leagueDivs}
                    </ul>
                </div>
            </Card>
        </div>
    )
}