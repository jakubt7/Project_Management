import React, { useState, useEffect } from "react";
import "./EmployeeDetails.scss";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { empId } = useParams();
  const [employeeData, setEmployeeData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const employeesData = await fetch(
          `http://localhost:8080/employees/${empId}`
        );
        if (!employeesData.ok) {
        } else {
          const data = await employeesData.json();
          setEmployeeData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    async function fetchTasksData() {
      try {
        const tasksData = await fetch(
          `http://localhost:8080/employees/tasks/${empId}`
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
          `http://localhost:8080/employees/teammembers/${empId}`
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

    fetchEmployeeData();
    fetchTasksData();
    fetchTeamsData();
  }, [empId]);


  const {
    employee_name,
    employee_lastname,
    employee_position,
    employee_email,
  } = employeeData;


  const getPositionName = (positionId) => {
    const positions = [
      { id: 1, name: "Boss" },
      { id: 2, name: "Frontend Developer" },
      { id: 3, name: "Backend Developer" },
    ];

    const position = positions.find((pos) => pos.id === positionId);
    return position ? position.name : "Unknown Position";
  };

  return (
    <div className="employeeDetails">
      <Sidebar />
      <div className="detailsContainer">
        <Navbar />
        <div className="employeeInfo">
          <img
            src="https://via.placeholder.com/150"
            alt={`${employee_name} ${employee_lastname}`}
            className="employee-image"
          />
          <h2>
            {employee_name} {employee_lastname}
          </h2>
          <p>Position: {getPositionName(employee_position)}</p>
          <p>Email: {employee_email}</p>
        </div>
        <div className="employeeTasks">
          <h2>Assigned tasks</h2>
          <ul>
            {tasksData.map((task) => (
              <li key={task.task_id}>{task.task_name}</li>
            ))}
          </ul>
          </div>
          <div className="employeeTeams">
          <h2>Assigned teams</h2>
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

export default EmployeeDetails;
