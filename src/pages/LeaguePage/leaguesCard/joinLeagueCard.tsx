import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesCard.css'
import { dataResponse, joinLeagueRequest } from '@backend/HTTPtypes';
import { CustomTextInput } from '../../../Util/input/input';
import { useState } from 'react';
import { joinUserToLeague } from '../../../apis/user';
import { AuthenticationResultType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export function JoinLeagueCard(props:{userData:dataResponse, authentication:AuthenticationResultType}){
    const [inviteCode, setInviteCode] = useState('')
    const [status, setStatus] = useState('')

   async function joinLeagueHandler(){
        const req :joinLeagueRequest= {
            inviteCode : inviteCode,
            token:props.authentication.AccessToken!,
        }

        const res = await joinUserToLeague(req)
        if(res.ok){
            setStatus('League Joined')
        }else{
            setStatus("there's been an error")
        }
    }

    return (
        <div className='joinLeagueCard'>
            <Card>
                <div className='joinleagueCardInternal'>
                    <div className='joinLeagueCardTitle'>
                        Join A League
                    </div>
                    <CustomTextInput inputName='inviteCode' inputType='text' changeHandler={setInviteCode} ></CustomTextInput>
                    <div className='status'>{status}</div>
                    <button onClick={joinLeagueHandler}>Join</button>


                </div>
            </Card>
        </div>
    )
}