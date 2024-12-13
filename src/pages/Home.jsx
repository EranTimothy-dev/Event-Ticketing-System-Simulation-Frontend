import React from 'react'
import Configuration from '../Components/Configuration'
// import Logo from '../Components/Logo'
import ControlStop from '../Components/ControlStop'
import TicketInfo from '../Components/TicketInfo'
import LogDetails from '../Components/LogDetails'

function Home() {
  return (
    <div>
    <Configuration/>
    {/* <Logo/> */}
    <ControlStop/>
    <TicketInfo/>
    <LogDetails/>
    </div>
  )
}

export default Home
