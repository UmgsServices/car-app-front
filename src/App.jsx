import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./assets/styles/styles.css"

import './App.css'

import Login from './pages/unAuthenticated/login'
import Authenticated from './routers/authenticated'
import UnAuthenticated from './routers/unAuthenticated'
import useAuth from './hook/useAuth'


function App() {
  const [count, setCount] = useState(0)
  function ActiveRouter() {
    const { isAuthenticated } = useAuth();
  
    if (!isAuthenticated) return <UnAuthenticated />;
    // else return <AuthenticatedRouter />;
    else return <Authenticated />;
  }
  return (
    <>
    <ActiveRouter/>

    </>
  )
 
}
export default App




