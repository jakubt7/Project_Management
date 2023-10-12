import React from 'react'
import './Tasks.scss'
import TaskList from '../../components/TaskComponents/TaskList/TaskList'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

function Tasks() {
  return (
    <div className="tasks">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        <TaskList />
      </div>
    </div>
  );
}

export default Tasks