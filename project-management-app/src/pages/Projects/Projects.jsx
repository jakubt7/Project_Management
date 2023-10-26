import React from 'react'
import './Projects.scss'
import ProjectTable from '../../components/ProjectComponents/ProjectTable/ProjectTable';
import AppHeader from '../../components/AppHeader/AppHeader';

function Projects() {
    return (
      <div className="app">
      <AppHeader />
      <div className="appContent">
       <ProjectTable />
      </div>
    </div>
      );
}

export default Projects