import React, { useState, useEffect } from "react";
import "./TaskDetails.scss";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";
import ChangeStatusModal from "../ChangeStatusModal/ChangeStatusModal";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [data, setData] = useState([]);
  const [assigneeName, setAssigneeName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [editedTask, setEditedTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  async function fetchStatuses() {
    try {
      const statusData = await fetch("http://localhost:8080/taskstatus");

      if (statusData.ok) {
        const statusList = await statusData.json();
        setStatuses(statusList);
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchEmployees() {
    try {
      const employeesData = await fetch("http://localhost:8080/employees");

      if (employeesData.ok) {
        const employeesList = await employeesData.json();
        setEmployees(employeesList);
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchTeams() {
    try {
      const teamsData = await fetch("http://localhost:8080/teams");

      if (teamsData.ok) {
        const teamsList = await teamsData.json();
        setTeams(teamsList);
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchProjects() {
    try {
      const projectsData = await fetch("http://localhost:8080/projects");

      if (projectsData.ok) {
        const projectsList = await projectsData.json();
        setProjects(projectsList);
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }

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

  const handleUpdateStatus = () => {
    setIsEditingStatus(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    fetchProjects();
    fetchEmployees();
    fetchStatuses();
    fetchTeams();
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
      const response = await fetch(
        `http://localhost:8080/tasks/update/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTask),
        }
      );

      if (response.ok) {
        console.log("Task updated successfully!");
        setIsEditing(false);
        fetchData();
      } else {
        console.error("Failed to update task");
        console.log(editedTask);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    let updatedValue;

    if (name === "start_date" || name === "end_date") {
      const date = new Date(value);
      const isoDate = date.toISOString();
      updatedValue = isoDate.slice(0, isoDate.indexOf("T"));
    } else {
      updatedValue =
        type === "number" ? parseFloat(value) : type === "date" ? value : value;
    }

    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: updatedValue,
    }));
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

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
                    <p className="text-lg">Task name:</p>
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
                    <select
                      value={editedTask.project_id}
                      onChange={handleInputChange}
                      name="project_id"
                      className="mt-1 p-2 border rounded-md w-full"
                    >
                      {projects.map((project) => (
                        <option
                          key={project.project_id}
                          value={project.project_id}
                        >
                          {project.project_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Team:</p>
                    <select
                      value={editedTask.team_id}
                      onChange={handleInputChange}
                      name="team_id"
                      className="mt-1 p-2 border rounded-md w-full"
                    >
                      {teams.map((team) => (
                        <option key={team.team_id} value={team.team_id}>
                          {team.team_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Assignee:</p>
                    <select
                      value={editedTask.assignee_id}
                      onChange={handleInputChange}
                      name="assignee_id"
                      className="mt-1 p-2 border rounded-md w-full"
                    >
                      {employees.map((employee) => (
                        <option
                          key={employee.employee_id}
                          value={employee.employee_id}
                        >
                          {employee.employee_name} {employee.employee_lastname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Status: </p>
                    <select
                      value={editedTask.status}
                      onChange={handleInputChange}
                      name="status"
                      className="mt-1 p-2 border rounded-md w-full"
                    >
                      {statuses.map((status) => (
                        <option
                          key={status.task_status_id}
                          value={status.task_status_id}
                        >
                          {status.task_status_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">Start date:</p>
                    <input
                      type="date"
                      name="start_date"
                      value={editedTask.start_date}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-lg">End date:</p>
                    <input
                      type="date"
                      name="end_date"
                      value={editedTask.end_date}
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
                      Assignee: {editedTask.employee_name}{" "}
                      {editedTask.employee_lastname}
                    </p>
                    <p className="text-lg">
                      Status: {editedTask.task_status_name}
                    </p>
                    <p className="text-lg">
                      Start Date: {formatDate(editedTask.start_date)}
                    </p>
                    <p className="text-lg">
                      End Date: {formatDate(editedTask.end_date)}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <div className="mr-5">
                {isAdmin && (
                  <>
                    {isEditing ? (
                      <>
                        <button
                          className="p-3 w-40 bg-black text-white rounded-lg mr-2"
                          onClick={() => {
                            setIsEditing(false);
                            setEditedTask(data);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                          onClick={handleEditTask}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit task
                      </button>
                    )}
                  </>
                )}
                <button
                  className="ml-5 p-3 w-40 bg-green-500 text-white rounded-lg"
                  onClick={() => {
                    setSelectedTaskId(taskId);
                    setIsEditingStatus(true);
                  }}
                >
                  Change status
                </button>
                <ChangeStatusModal
                  isOpen={isEditingStatus}
                  onClose={() => setIsEditingStatus(false)}
                  taskId={selectedTaskId}
                  onChangeStatus={handleUpdateStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
