import React, {useState, useEffect} from 'react'
import './ProjectDetails.scss'
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const projectData = await fetch(
          `http://localhost:8080/projects/${projectId}`
        );
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
        const tasksData = await fetch(
          `http://localhost:8080/projects/tasks/${projectId}`
        );
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
        const teamsData = await fetch(
          `http://localhost:8080/projects/teams/${projectId}`
        );
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
    project_description
  } = projectData;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }


  return (
    <div className="employeeDetails">
      <Sidebar />
      <div className="detailsContainer">
        <Navbar />
        <div className="employeeInfo">
          <img
            src="https://via.placeholder.com/150"
            alt={`${project_name}`}
            className="employee-image"
          />
          <h2>
            {project_name}
          </h2>
          <p>{project_status_name}</p>
          <p>{project_description}</p>
          <p>Start of the project: {formatDate(start_date)}</p>
          <p>Anticipated date of completion: {formatDate(end_date)}</p>
        </div>
        <div className="employeeTasks">
          <h2>Tasks associated with the project</h2>
          <ul>
            {tasksData.map((task) => (
              <li key={task.task_id}>{task.task_name}</li>
            ))}
          </ul>
        </div>
        <div className="employeeTeams">
          <h2>Teams assigned to the project</h2>
          <ul>
            {teamsData.map((team) => (
              <li key={team.team_id}>{team.team_name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
