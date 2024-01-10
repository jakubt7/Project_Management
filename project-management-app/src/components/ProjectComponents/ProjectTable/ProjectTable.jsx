import React, { useState, useEffect } from "react";
import "./ProjectTable.scss";
import { Link } from "react-router-dom";
import AddProjectModal from "../AddProjectModal/AddProjectModal";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ProjectTable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [activeColumn, setActiveColumn] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    } else if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
    setActiveColumn(col);
  };


  async function fetchData() {
    try {
      const projectData = await fetch("http://localhost:8080/projects");

      if (!projectData.ok) {
        console.log("There was an error fetching from the API");
      } else {
        const data = await projectData.json();
        setData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
 
  

  useEffect(() => {
    fetchData();
  }, []);

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
          fetchData();

        } else {
          console.log("Error encountered while deleting the project");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return false;
    }
  };

  const handleAddProject = async () => {
    async function fetchData() {
      try {
        const projectData = await fetch("http://localhost:8080/projects");

        if (!projectData.ok) {
          console.log("There was an error fetching from the API");
        } else {
          const data = await projectData.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    setIsModalOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="w-5/6">
        <div className="bg-white p-4 shadow-md rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-2xl text-gray-800">Project List</h2>
            <div className="border-solid border-gray-400 border-2 rounded-lg w-1/4">
              <input
                type="text"
                class="bg-white h-10 w-full px-4 rounded-lg focus:outline-none hover:cursor-pointer"
                placeholder="Search projects"
                onChange={(e) => setSearchInput(e.target.value)}
              ></input>
            </div>
            {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Add Project
            </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <table className="min-w-full m-auto">
            <thead>
              <tr className="bg-gray-100">
                <th onClick={()=> sorting("project_name")} className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Name
                  {activeColumn === "project_name" && (
              <ArrowDropDownIcon className="inline-block" />
            )}
                </th>
                <th onClick={()=> sorting("project_status_name")} className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Status
                  {activeColumn === "project_status_name" && (
              <ArrowDropDownIcon className="inline-block" />
            )}
                </th>
                <th onClick={()=> sorting("start_date")} className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Starting date
                  {activeColumn === "start_date" && (
              <ArrowDropDownIcon className="inline-block" />
            )}
                </th>
                <th onClick={()=> sorting("end_date")} className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Finishing date
                  {activeColumn === "end_date" && (
              <ArrowDropDownIcon className="inline-block" />
            )}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
            {data
                .filter((project) => {
                  return searchInput.toLowerCase() === ""
                    ? project
                    : project.project_name
                        .toLowerCase()
                        .includes(searchInput);
                })
              .map((project) => (
                <tr
                  key={project.project_id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.project_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.project_status_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(project.start_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(project.end_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/projects/${project.project_id}`}
                      className="text-blue-500 hover:underline hover:text-blue-700"
                    >
                      More
                    </Link>
                    {isAdmin && (
                      <>
                    <Link
                      to={`/projects/edit/${project.project_id}`}
                      className="text-gray-500 hover:underline hover:text-gray-700 ml-4"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-500 hover:underline hover:text-red-700 ml-4"
                      onClick={() => handleDelete(project.project_id)}
                    >
                      Delete
                    </button>
                    </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
};

export default ProjectTable;
