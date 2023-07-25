import React from 'react'
import './Home.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Graph from '../../components/Graph/Graph'

function Home() {
  return (
    <div className='home'>
        <Sidebar />
        <div className="mainContainer">
            <Navbar />
            <div className="graphs">
                <Graph />
                <Graph />
                <Graph />
                <Graph />
            </div>
        </div>
    </div>
  )
}

export default Home