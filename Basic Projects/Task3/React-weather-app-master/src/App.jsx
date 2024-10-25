import { useState } from 'react'
import Wheather from './Wheather'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Wheather/>
    </>
  )
}

export default App
