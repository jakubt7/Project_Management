import React from 'react'
import './Teams.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TeamList from '../../components/TeamComponents/TeamList/TeamList';

function Teams() {
    return (
        <div className="teams">
          <Sidebar />
          <div className="mainContainer">
            <Navbar />
            <TeamList />
          </div>
        </div>
      );
}

export default Teams
