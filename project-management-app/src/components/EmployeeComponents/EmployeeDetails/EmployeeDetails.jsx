import React, { useState, useEffect } from "react";
import "./EmployeeDetails.scss";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";

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


  return (
    <div className="employeeDetails">
      <AppHeader />
      <div className="flex justify-center h-screen mt-5">
        <div className="w-3/5">
          <div className=" border-solid border-2 border-black p-10 rounded-md">
          <div className="flex justify-between">
            <img
              src="https://via.placeholder.com/200"
              alt={`${employee_name} ${employee_lastname}`}
              className="employee-image rounded-2xl w-1/3"
            />
            <div className="ml-4 w-2/3 text-center self-center">
              <h2>
                {employee_name} {employee_lastname}
              </h2>
              <p><strong>Position: </strong> {employee_position}</p>
              <p><strong>Email: </strong>{employee_email}</p>
            </div>
          </div>
          <div className="employeeTasks mt-5">
            <h2 className="text-lg font-semibold">Assigned tasks</h2>
            <ul>
              {tasksData.map((task) => (
                <li key={task.task_id}>{task.task_name}</li>
              ))}
            </ul>
          </div>
          <div className="employeeTeams mt-5">
            <h2 className="text-lg font-semibold">Assigned teams</h2>
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

export default EmployeeDetails;
