import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SignUpPage} from './signUpPage/signUpPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUpPage/>
    </>
  )
}

export default App
