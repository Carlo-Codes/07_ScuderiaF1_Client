import {Card} from '../../../Util/card/card'
import './leaguesSettings.css'
import { dataResponse, joinLeagueRequest } from '@backend/HTTPtypes';
import { CustomTextInput } from '../../../Util/input/input';
import { useState } from 'react';
import { joinUserToLeague } from '../../../apis/user';


export function JoinLeagueCard(props:{userData:dataResponse, authentication:string, reloadData:() => Promise<void>}){
    const [inviteCode, setInviteCode] = useState('')
    const [status, setStatus] = useState('')

   async function joinLeagueHandler(){
        const req :joinLeagueRequest= {
            inviteCode : inviteCode,
            token:props.authentication,
        }

        const res = await joinUserToLeague(req)
        if(res.ok){
            setStatus('League Joined')
            props.reloadData()
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
                    <div className='inviteInputContainer'>
                        <CustomTextInput inputName='inviteCode' inputType='text' changeHandler={setInviteCode} ></CustomTextInput>
                    </div>
                    <div className='status'>{status}</div>
                    <button onClick={joinLeagueHandler}>Join</button>


                </div>
            </Card>
        </div>
    )
}