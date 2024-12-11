import React from 'react'
import Configuration from '../Components/Configuration'
import Logo from '../Components/Logo'
import ControlStop from '../Components/ControlStop'
import TicketInfo from '../Components/TicketInfo'
import TicketChart from '../Components/TicketChart'

function Home() {
  return (
    <div>
    <Configuration/>
    <Logo/>
    <ControlStop/>
    <TicketInfo/>
    <TicketChart/>
    </div>
  )
}

export default Home
