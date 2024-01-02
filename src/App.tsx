import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SignUpPage} from './signUpPage/signUpPage'
import {DriverCard} from './driverCard/driverCard'
import {DriverSelectionCard} from './driverCard/driverSelectionCard'
import {apiSportsDriver} from '@backend/apiSportsResponseTypes'

const driver:apiSportsDriver = {
  id: 1,
  name: 'Max Verstappen',
  abbr: 'ves',
  number: 1,
  image: "test image"
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DriverSelectionCard drivers={[driver]}></DriverSelectionCard>
    </>
  ) 
}

export default App
