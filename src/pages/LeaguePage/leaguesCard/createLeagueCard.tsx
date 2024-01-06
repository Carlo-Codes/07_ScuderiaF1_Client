import React from 'react'
import {Card} from '../../../Util/card/card'

export function CreateLeagueCard(){
    return(
        <Card>
            <div className='createLeagueCardInternals'>
                <div className='createLeagueTitle'>
                    Create A New League
                </div>
                <label htmlFor='leagueName'>LeagueName:</label>
                <input type='text' id='leagueName'></input>
                <label htmlFor='simulation'>Simulation?</label>
                <input type='radio' id='simulation'></input>
            </div>
        </Card>
    )
}