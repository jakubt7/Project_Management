import React from 'react'
import './Projects.scss'
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import ProjectTable from '../../components/ProjectTable/ProjectTable';

function Projects() {
    return (
        <div className="projects">
          <Sidebar />
          <div className="mainContainer">
            <Navbar />
            <ProjectTable />
          </div>
        </div>
      );
}

export default Projects