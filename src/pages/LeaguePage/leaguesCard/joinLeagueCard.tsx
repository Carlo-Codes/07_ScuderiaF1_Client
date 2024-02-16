import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesCard.css'
import { dataResponse } from '@backend/HTTPtypes';
import { CustomTextInput } from '../../../Util/input/input';
import { useState } from 'react';

export function JoinLeagueCard(props:{userData:dataResponse}){
    const [inviteCode, setInviteCode] = useState('')

    return (
        <div className='joinLeagueCard'>
            <Card>
                <div className='joinleagueCardInternal'>
                    <div className='joinLeagueCardTitle'>
                        Join A League
                    </div>
                    <CustomTextInput inputName='inviteCode' inputType='text' changeHandler={setInviteCode} ></CustomTextInput>
                    <button>Join</button>


                </div>
            </Card>
        </div>
    )
}