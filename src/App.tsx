import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SignUpPage} from './pages/signUpPage/signUpPage'
import {DriverCard} from './driverCard/driverCard'
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import {apiSportsDriver} from '@backend/apiSportsResponseTypes'
import { TeamCreationPage } from './pages/teamCreationPage/teamCreationPage';
import { LeagueRankingPage } from './pages/leagueRankingPage/leagueRankingPage';
import {League, Team} from '@backend/dbTypes'
import { TeamPointPage } from './pages/teamPages/teamPointsPage';
import { LeaguePage } from './pages/LeaguePage/leaguePage';

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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <SignUpPage></SignUpPage>
    </>
  ) 
}

export default App
