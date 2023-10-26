import React from 'react'
import './Tasks.scss'
import TaskList from '../../components/TaskComponents/TaskList/TaskList'
import AppHeader from '../../components/AppHeader/AppHeader';

function Tasks() {
  return (
    <div className="app">
      <AppHeader />
      <div className="appContent">
       <TaskList />
      </div>
    </div>
  );
}

export default Tasks