import { useState } from 'react'
import {Card} from '../../../Util/card/card'
import {createLeague} from '../../../apis/leagues'
import './leaguesSettings.css'
import { dataResponse, newLeagueRequest } from '@backend/HTTPtypes'
import { CustomTextInput} from '../../../Util/input/input'


export function CreateLeagueCard(props:{userData:dataResponse, authentication:string, reloadData:() => Promise<void>}){

    const [leagueName, setLeagueName] = useState('')

    const createNewLeagueHandler = async () =>{
        const req: newLeagueRequest = {
            league_name:leagueName,
            token:props.authentication,
        }
        await createLeague(req);
        await props.reloadData();
    }


    return(
        <Card key={'createLeague'}>
            <div className='createLeagueCardInternals'>

                <div className='LeagueCardTitle'>
                    Create A New League
                </div>

                <div className='CreateLeagueInput'>
                    <CustomTextInput inputName={'League Name'} changeHandler={setLeagueName} inputType='text'></CustomTextInput>
                </div>

                <div className='buttons'>
                    <button onClick={createNewLeagueHandler}>Create New League</button>
                </div>
            </div>
        </Card>
    )
}