import React from 'react'
import {Card} from '../../../Util/card/card'
import './leaguesCard.css'

export function CreateLeagueCard(){
    return(
        <Card>
            <div className='createLeagueCardInternals'>

                <div className='LeagueCardTitle'>
                    Create A New League
                </div>

                <div className='CreateLeagueInput'>
                    <label htmlFor='leagueName'>LeagueName:</label>
                    <input type='text' id='leagueName'></input>
                </div>

                <div className='CreateLeagueInput'>
                    <label htmlFor='simulation'>Simulation</label>
                    <input type='checkbox' id='simulation'></input>
                </div>

                <div className='buttons'>
                    <button>Create New League</button>
                </div>
            </div>
        </Card>
    )
}