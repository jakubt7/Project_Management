import React, { useState, useEffect } from 'react';
import './ProjectDetails.scss'; // You can adjust this for your styling
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import AppHeader from '../../AppHeader/AppHeader';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const projectData = await fetch(`http://localhost:8080/projects/${projectId}`);
        if (!projectData.ok) {
        } else {
          const data = await projectData.json();
          setProjectData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    async function fetchTasksData() {
      try {
        const tasksData = await fetch(`http://localhost:8080/projects/tasks/${projectId}`);
        if (!tasksData.ok) {
        } else {
          const data = await tasksData.json();
          setTasksData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    async function fetchTeamsData() {
      try {
        const teamsData = await fetch(`http://localhost:8080/projects/teams/${projectId}`);
        if (!teamsData.ok) {
        } else {
          const data = await teamsData.json();
          setTeamsData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchProjectData();
    fetchTasksData();
    fetchTeamsData();
  }, [projectId]);

  const {
    project_name,
    start_date,
    end_date,
    project_status_name,
    project_description,
  } = projectData;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="projectDetails">
      <AppHeader />
      <div className="flex justify-center h-screen mt-5">
        <div className="w-3/5">
        <div className=" border-solid border-2 border-black p-10 rounded-md">
          <div className='flex justify-between'>
          <img
            src="https://via.placeholder.com/150"
            alt={project_name}
            className="employee-image rounded-2xl w-1/3"
          />
          <div className='ml-4 w-2/3 text-center self-center'>
          <h2 className="text-2xl font-semibold">{project_name}</h2>
          <p>{project_status_name}</p>
          <p>{project_description}</p>
          <p>Start of the project: {formatDate(start_date)}</p>
          <p>Anticipated date of completion: {formatDate(end_date)}</p>
          </div>
        </div>
        <div className="employeeTasks mt-5">
          <h2 className="text-lg font-semibold">Tasks associated with the project</h2>
          <ul>
            {tasksData.map((task) => (
              <li key={task.task_id}>{task.task_name}</li>
            ))}
          </ul>
        </div>
        <div className="employeeTeams mt-5">
          <h2 className="text-lg font-semibold">Teams assigned to the project</h2>
          <ul>
            {teamsData.map((team) => (
              <li key={team.team_id}>{team.team_name}</li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProjectDetails;
