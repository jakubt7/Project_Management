import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [editedProject, setEditedProject] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [statuses, setStatuses] = useState([]);

  async function fetchProjectData() {
    try {
      const projectData = await fetch(
        `http://localhost:8080/projects/${projectId}`
      );
      if (!projectData.ok) {
      } else {
        const data = await projectData.json();
        setProjectData(data);
        setEditedProject(data);
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

  async function fetchStatuses() {
    try {
      const statusData = await fetch("http://localhost:8080/projectstatus");

      if (statusData.ok) {
        const statusList = await statusData.json();
        setStatuses(statusList);
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchProjectData();
    fetchTasksData();
    fetchTeamsData();
    fetchStatuses();
  }, [projectId]);

  const handleEditProject = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/projects/update/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProject),
        }
      );

      if (response.ok) {
        console.log("Project updated successfully!");
        setIsEditing(false);
        fetchProjectData();
        fetchTasksData();
        fetchTeamsData();
      } else {
        console.error("Failed to update project");
        console.log(editedProject);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setEditedProject((prevProject) => {
      let updatedValue;

      if (name === "start_date" || name === "end_date") {
        const date = new Date(value);
        const isoDate = date.toISOString();
        updatedValue = isoDate.slice(0, isoDate.indexOf("T"));
      } else {
        updatedValue = type === "number" ? parseFloat(value) : value;
      }

      return {
        ...prevProject,
        [name]: updatedValue,
      };
    });
  };

  useEffect(() => {
    console.log("After state update - editedProject:", editedProject);
  }, [editedProject]);
  

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  return (
    <div className="projectDetails">
      <AppHeader />
      <div className="flex justify-center h-screen mt-5">
        <div className="w-3/5">
          <div className="border-solid border-2 border-black p-10 rounded-md">
            <div className="flex justify-between">
              <img
                src="https://via.placeholder.com/150"
                alt={projectData.project_name}
                className="employee-image rounded-2xl w-1/3"
              />
              <div className="ml-4 w-2/3 text-center self-center">
                {isEditing ? (
                  <>
                    <h2 className="text-2xl font-semibold">
                      <input
                        type="text"
                        name="project_name"
                        value={editedProject.project_name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                    </h2>
                    <p>
                      <select
                        value={editedProject.project_status}
                        onChange={handleInputChange}
                        name="project_status"
                        className="mt-1 p-2 border rounded-md w-full"
                      >
                        {statuses.map((status) => (
                          <option
                            key={status.project_status_id}
                            value={status.project_status_id}
                          >
                            {status.project_status_name}
                          </option>
                        ))}
                      </select>
                    </p>
                    <p>
                      <textarea
                        name="project_description"
                        value={editedProject.project_description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                      ></textarea>
                    </p>
                    <p>
                      Start of the project:{" "}
                      <input
                        type="date"
                        name="start_date"
                        value={editedProject.start_date}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                    </p>
                    <p>
                      Anticipated date of completion:{" "}
                      <input
                        type="date"
                        name="end_date"
                        value={editedProject.end_date}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold">
                      {projectData.project_name}
                    </h2>
                    <p>{projectData.project_status_name}</p>
                    <p>{projectData.project_description}</p>
                    <p>
                      Start of the project: {formatDate(projectData.start_date)}
                    </p>
                    <p>
                      Anticipated date of completion:{" "}
                      {formatDate(projectData.end_date)}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="employeeTasks mt-5">
              <h2 className="text-lg font-semibold">
                Tasks associated with the project
              </h2>
              <ul>
                {tasksData.map((task) => (
                  <li key={task.task_id}>{task.task_name}</li>
                ))}
              </ul>
            </div>
            <div className="employeeTeams mt-5">
              <h2 className="text-lg font-semibold">
                Teams assigned to the project
              </h2>
              <ul>
                {teamsData.map((team) => (
                  <li key={team.team_id}>{team.team_name}</li>
                ))}
              </ul>
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
                        setEditedProject(projectData);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                      onClick={handleEditProject}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit project
                  </button>
                )}
                </>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
