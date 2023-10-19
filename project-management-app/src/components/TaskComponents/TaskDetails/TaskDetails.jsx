import React, { useState, useEffect } from "react";
import "./TaskDetails.scss";
import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const taskData = await fetch(`http://localhost:8080/tasks/${taskId}`);

        if (!taskData.ok) {
        } else {
          const data = await taskData.json();
          setData(data);
          console.log(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [taskId]);



  const {
    task_name,
    task_description,
    project_name,
    team_name,
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
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="taskDetails">
      <Sidebar />
      <div className="detailsContainer">
        <Navbar />
        <div className="taskInfo">
          <div>
            Task Information
            <div>{task_name}</div>
            <div>{task_description}</div>
            <div>{project_name}</div>
            <div>{team_name}</div>
            <div>{employee_name} {employee_lastname}</div>
            <div>{task_status_name}</div>
            <div>{formatDate(start_date)}</div>
            <div>{formatDate(end_date)}</div>
            <div>{employee_name} {employee_lastname}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
