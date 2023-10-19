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
  

    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options);
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
              <th>Status</th>
              <th>Starting date</th>
              <th>Finishing date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project) => (
              <tr key={project.project_id}>
                <td>{project.project_name}</td>
                <td>{project.project_status_name}</td>
                <td>{formatDate(project.start_date)}</td>
                <td>{formatDate(project.end_date)}</td>
                <td>
                  <Link to={`/projects/${project.project_id}`}>
                      <button>More</button>
                  </Link>
                  <button>
                  Edit
                </button>
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