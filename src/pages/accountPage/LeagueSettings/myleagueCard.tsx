import {Card} from '../../../Util/card/card'
import {League} from '@backend/dbTypes'
import './leaguesSettings.css'
import { DeleteLeagueRequest, dataResponse } from '@backend/HTTPtypes';
import { deleteLeague } from '../../../apis/leagues';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

export function MyLeaguesCard(props:{userData:dataResponse, authentication:string, reloadData:() => Promise<void>}){

   const deleteLeagueHandler = async (id:number) => {
        if(confirm('Are you sure you want to delete this league?')){
            if(props.authentication){
                const req:DeleteLeagueRequest = {
                    leagueId:id,
                    token:props.authentication
                }
                const res = await deleteLeague(req)
                return res
            }
        }
    }

    const myLeagueRows = props.userData.userLeagues.map((league,i)=>{
        const delbtnHandler = async() => {
            await deleteLeagueHandler(league.id)
            await props.reloadData()
        }
        return (
            <tr key={league.id} className='myLeaguesRow'>
                    <td>{league.league_name}</td>
                    <td className='inviteCode'>{league.inviteCode}</td>
                    <td><button onClick={delbtnHandler}>Delete</button></td>
            </tr>
        )
    })

    const headers =                         
        <tr className='myLeaguesHeader'>
            <th>Name</th>
            <th>Invite Code</th>
            <th></th>
        </tr>
    
    function tableOnLeagues(){
        if(props.userData.userLeagues[0]){
            return(
                <table className='myLeaguesTable'>
                    {headers}
                    {myLeagueRows}
                </table>
            )

        }else {
            return (<div>You do not own any leagues</div>)
        }
    }

    return (
        <div className=''>
            <Card>
                <div className=''>
                    <div className=''>
                        My Leagues
                    </div>
                    {tableOnLeagues()}

                </div>
            </Card>
        </div>
    )
}