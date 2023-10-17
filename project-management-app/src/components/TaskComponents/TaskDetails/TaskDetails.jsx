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
    project_id,
    team_id,
    assignee_id,
    status,
    start_date,
    end_date,
    employee_id
  } = data;

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
            <div>{project_id}</div>
            <div>{team_id}</div>
            <div>{assignee_id}</div>
            <div>{status}</div>
            <div>{start_date}</div>
            <div>{end_date}</div>
            <div>{employee_id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
