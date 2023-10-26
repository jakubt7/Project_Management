import React from 'react'
import './Teams.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TeamList from '../../components/TeamComponents/TeamList/TeamList';
import AppHeader from '../../components/AppHeader/AppHeader';

function Teams() {
    return (
      <div className="app">
      <AppHeader />
      <div className="appContent">
       <TeamList />
      </div>
    </div>
      );
}

export default Teams
