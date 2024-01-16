import React, { useState } from 'react'
import {Card} from '../../../Util/card/card'
import {createLeague} from '../../../apis/leagues'
import './leaguesCard.css'
import { dataResponse, newLeagueRequest } from '@backend/HTTPtypes'
import { CustomTextInput, CustomBooleanInput} from '../../../Util/input/input'
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider'

export function CreateLeagueCard(props:{userData:dataResponse, authentication:AuthenticationResultType}){

    const [leagueName, setLeagueName] = useState('')
    const [simulationStatus, setSimulationStatus] = useState(false)

    const createNewLeagueHandler = async () =>{
        const req: newLeagueRequest = {
            league_name:leagueName,
            simulation:simulationStatus,
            token:props.authentication.AccessToken!,
        }
        const res = await createLeague(req);
        console.log(res)
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

                <div className='CreateLeagueInput'>
                    <CustomBooleanInput inputName={'Simulation'} changeHandler={setSimulationStatus} inputType='checkbox'></CustomBooleanInput>

                </div>

                <div className='buttons'>
                    <button onClick={createNewLeagueHandler}>Create New League</button>
                </div>
            </div>
        </Card>
    )
}