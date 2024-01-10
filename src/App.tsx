import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SignUpPage} from './pages/signUpPage/signUpPage'
import {DriverCard} from './driverCard/driverCard'
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import {apiSportsDriver} from '@backend/apiSportsResponseTypes'
import { TeamCreationPage } from './pages/teamPages/teamCreationPage';
import { LeagueRankingPage } from './pages/leagueRankingPage/leagueRankingPage';
import {League, Team} from '@backend/dbTypes'
import { TeamPointPage } from './pages/teamPages/teamPointsPage';
import { LeaguePage } from './pages/LeaguePage/leaguePage';
import {NavBar} from './Util/UI/navBar/navBar'
import {dataResponse} from '@backend/HTTPtypes'
import {login} from './apis/auth'

const driver:apiSportsDriver = {
  id: 1,
  name: 'Max Verstappen',
  abbr: 'ves',
  number: 1,
  image: "test image"
}
const driver2:apiSportsDriver = {
  id: 1,
  name: 'Charles Leclerc',
  abbr: 'ves',
  number: 1,
  image: "test image"
}

const testLeague:League={
  id:1,
  owner_user_id:3,
  league_name:"testLeague",
  inviteCode:"hgfdsa"
}

export interface navItemInterface{
  name:string,
  stateChanger:(state: string) => void
}

export function App() {
  const [LogInState, setLogin] = useState(false)
  const [state, setState] = useState('Leagues')
  const [userData, setUserData] = useState<dataResponse>()
  const [accessToken, setAccessToken] = useState<string>()

  const stateChanger = (state:string)=>{
    setState(state)
  }



  enum States {
    Login = 'Login',
    Home = 'Home',
    Leagues = 'Leagues',
    Account = 'Account',
    Teams = 'Teams',
  }
 
  const navItems:navItemInterface[] = [
    {
      name:States.Home,
      stateChanger:stateChanger
    },
    {
      name:States.Leagues,
      stateChanger:stateChanger
    },
    {
      name:States.Account,
      stateChanger:stateChanger
    }
  ]

  let page: React.ReactNode

  if(state == States.Home){

  }
  if(state == States.Leagues){
    page = <LeaguePage></LeaguePage>
  }
  if(state == States.Account){

  }
  if(state == States.Teams){
    page = <TeamPointPage></TeamPointPage>
  }


  if(LogInState){
    return (
      <>
         <NavBar navItems={navItems}>
          {page}
         </NavBar>
      </>
    )   
  } else{
    return (
      <SignUpPage setAppAccessToken={setAccessToken} setLoginStatus = {setLogin}></SignUpPage>
    )
  }
}


