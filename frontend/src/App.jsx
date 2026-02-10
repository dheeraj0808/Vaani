import { useState } from 'react'
import MainLayout from './MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainLayout />
    </>
  )
}

export default App
