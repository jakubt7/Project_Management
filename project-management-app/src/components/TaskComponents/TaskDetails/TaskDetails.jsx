import React, { useState, useEffect } from "react";
import "./TaskDetails.scss";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [data, setData] = useState([]);
  const [assigneeName, setAssigneeName] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const taskData = await fetch(`http://localhost:8080/tasks/${taskId}`);

        if (taskData.ok) {
          const task = await taskData.json();
          setData(task);
          console.log(task);

          fetchEmployeeName(task.assignee_id, setAssigneeName);
          fetchEmployeeName(task.employee_id, setEmployeeName);
        } else {
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [taskId]);

  async function fetchEmployeeName(employeeId, setNameFunction) {
    try {
      const employeeData = await fetch(`http://localhost:8080/employees/${employeeId}`);

      if (employeeData.ok) {
        const employee = await employeeData.json();
        setNameFunction(`${employee.employee_name} ${employee.employee_lastname}`);
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }


  const {
    task_name,
    task_description,
    project_name,
    assignee_id,
    employee_id,
    employee_name,
    employee_lastname,
    task_status_name,
    start_date,
    end_date,
  } = data;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  return (
    <div className="taskDetails">
      <AppHeader />
      <div className="flex justify-center h-screen mt-5">
        <div className="w-3/5">
          <div className=" border-solid border-2 border-black p-10 rounded-md">
          <div className="flex justify-between">
            <img
              src="https://via.placeholder.com/200"
              className="employee-image rounded-2xl w-1/3"
            />
            <div className="ml-4 w-2/3 text-center self-center">
              <h2>
              {task_name}
              </h2>
              <p>{task_description}</p>
              <p><strong>Project: </strong>{project_name}</p>
              <p><strong>Assigned to: </strong>{assigneeName}</p>
              <p><strong>Status: </strong>{task_status_name}</p>
              <p><strong>Assigned on: </strong>{formatDate(start_date)}</p>
              <p><strong>Due date: </strong>{formatDate(end_date)}</p>
              <p><strong>Assigned by: </strong>{employeeName}</p>
            </div>
          </div>
          {/* <div className="employeeTeams mt-5">
            <h2 className="text-lg font-semibold">Assigned teams</h2>
            <ul>
              {data.map((task) => (
                <li key={task.team_id}>{team_name}</li>
              ))}
            </ul>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
