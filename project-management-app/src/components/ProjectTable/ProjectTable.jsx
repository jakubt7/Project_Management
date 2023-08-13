import React, { useState, useEffect } from "react";
import './ProjectTable.scss'
import { Link } from "react-router-dom";

const ProjectTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const projectData = await fetch("http://localhost:8080/projects");
  
          if (!projectData.ok) {
              console.log("There was an error fetching from the API")
          } else {
            const data = await projectData.json();
            setData(data);
          }
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchData();
    }, [data]);
  
    const handleDelete = async (id) => {
      if (
        confirm(
          "Deleting this project is irreversible. Do you want to cofirm the deletion?"
        ) == true
      ) {
        try {
          const response = await fetch(
            `http://localhost:8080/projects/delete/${id}`,
            {
              method: "DELETE",
            }
          );
  
          if (response.ok) {
            console.log("Project deleted successfully");
          } else {
            console.log("Error encountered while deleting the project")
          }
        } catch (error) {
          console.error(error.message);
        }
      } else {
        return false;
      }
    };
  
    const getStatus = (statusId) => {
      const statuses = [
        { id: 1, name: "Active" },
        { id: 2, name: "Completed" }
      ];
  
      const status = statuses.find((stat) => stat.id === statusId);
      return status ? status.name : "Unknown Status";
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
      }
  
    return (
      <div>
        <div className="aboveTable">
          <h2>Project List</h2>
          <Link to={"/projects/create"} className="btn">
            Add Project
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Starting date</th>
              <th>Finishing date</th>
              <th>Status</th>
              <th>Description</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => (
              <tr key={project.project_id}>
                <td>{project.project_name}</td>
                <td>{formatDate(project.start_date)}</td>
                <td>{formatDate(project.end_date)}</td>
                <td>{getStatus(project.project_status)}</td>
                <td>{project.project_description}</td>
                <td>
                  <Link to={`/`}>
                      <button>More</button>
                  </Link>
                  <button onClick={() => handleDelete(project.project_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default ProjectTable