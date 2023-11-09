import React from 'react'
import './Teams.scss'
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
