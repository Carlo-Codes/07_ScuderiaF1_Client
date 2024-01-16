import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesCard.css'
import { dataResponse } from '@backend/HTTPtypes';

export function LeaguesCard(props:{userData:dataResponse}){

    const leagueDivs = props.userData.participatingLeague.map((league)=>{
        return (
            <li key={league.id} className='leagueName'>
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