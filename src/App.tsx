import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SignUpPage} from './signUpPage/signUpPage'
import {DriverCard} from './teamCreation/driverCard/driverCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DriverCard></DriverCard>
    </>
  ) 
}

export default App
