import React, { useState, useEffect } from "react";
import "./TaskDetails.scss";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [data, setData] = useState([]);
  const [assigneeName, setAssigneeName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [editedTask, setEditedTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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
          setEditedTask(task);
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
      const employeeData = await fetch(
        `http://localhost:8080/employees/${employeeId}`
      );

      if (employeeData.ok) {
        const employee = await employeeData.json();
        setNameFunction(
          `${employee.employee_name} ${employee.employee_lastname}`
        );
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleEditTask = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (response.ok) {
        console.log("Task updated successfully!");
        setIsEditing(false);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    const updatedValue = type === "number" ? parseFloat(value) : value;

    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: updatedValue,
    }));
  };

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
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="taskDetails">
      <AppHeader />
      <div className="flex justify-center h-screen mt-5">
        <div className="w-3/5">
          <div className=" border-solid border-2 border-black p-10 rounded-md mb-5">
            <div>
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <h2 className="text-3xl text-center">Edit task</h2>
                    <hr className="mt-2 mb-2"></hr>
                  <p className="text-lg">
                    Task name: 
                  </p>
                    <input
                      type="text"
                      name="task_name"
                      value={editedTask.task_name}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Description:</p>
                    <textarea
                      name="task_description"
                      value={editedTask.task_description}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Project:</p>
                    <input
                      type="number"
                      name="project_id"
                      value={editedTask.project_id}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Team:</p>
                    <input
                      type="number"
                      name="team_id"
                      value={editedTask.team_id}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Assignee:</p>
                    <input
                      type="number"
                      name="assignee_id"
                      value={editedTask.assignee_id}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Status: </p>
                    <input
                      type="number"
                      name="status"
                      value={editedTask.status}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                  <p className="text-lg">
                    Start date: 
                  </p>
                    <input
                      type="date"
                      name="start_date"
                      value={formatDate(editedTask.start_date)}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                  <p className="text-lg">
                    End date: 
                  </p>
                    <input
                      type="date"
                      name="end_date"
                      value={editedTask.end_date}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                  <p className="text-lg">
                    Employee: 
                  </p>
                    <input
                      type="number"
                      name="employee_id"
                      value={editedTask.employee_id}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-2xl border-solid border-2 border-black p-5 rounded-md">
                    {editedTask.task_name}
                  </p>
                  <div className="mt-2">
                    <p className="text-lg">
                      Description: {editedTask.task_description}
                    </p>
                    <p className="text-lg">
                      Project: {editedTask.project_name}
                    </p>
                    <p className="text-lg">Team: {editedTask.team_name}</p>
                    <p className="text-lg">
                      Assignee: {editedTask.employee_name} {editedTask.employee_lastname}
                    </p>
                    <p className="text-lg">Status: {editedTask.task_status_name}</p>
                    <p className="text-lg">
                      Start Date: {formatDate(editedTask.start_date)}
                    </p>
                    <p className="text-lg">End Date: {formatDate(editedTask.end_date)}</p>
                    <p className="text-lg">
                      Employee: {editedTask.employee_name} {editedTask.employee_lastname}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <div className="mr-5">
                {isEditing ? (
                  <><button
                    className="p-3 w-40 bg-black text-white rounded-lg mr-2"
                    onClick={() => {setIsEditing(false)}}
                  >
                    Cancel
                  </button><button
                    className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                    onClick={handleEditTask}
                  >
                      Save
                    </button></>
                  
                ) : (
                  <button
                    className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit task
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
