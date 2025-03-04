import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const TaskList = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [activeColumn, setActiveColumn] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

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
      const taskData = await fetch("http://localhost:8080/tasks");

      if (!taskData.ok) {
        console.log("There was an error fetching from the API");
      } else {
        const data = await taskData.json();
        setData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchDataById(id) {
    try {
      const taskData = await fetch(`http://localhost:8080/tasks/user/${id}`);

      if (taskData.ok) {
        const task = await taskData.json();
        setData(task);
        console.log(task);
        setEditedTask(task);
      } else {
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      setEmployeeId(user.employee_id);
    }

    const fetchData = async () => {
      try {
        if (isAdmin) {
          const taskData = await fetch("http://localhost:8080/tasks");

          if (taskData.ok) {
            const data = await taskData.json();
            setData(data);
          } else {
            console.log("There was an error fetching from the API");
          }
        } else {
          const taskData = await fetch(
            `http://localhost:8080/tasks/user/${employeeId}`
          );

          if (taskData.ok) {
            const task = await taskData.json();
            setData(task);
          } else {
            console.log("Error fetching user-specific tasks");
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [isAdmin, employeeId]);

  const handleAddTask = async () => {
    fetchData();
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (
      confirm(
        "Deleting this task is irreversible. Do you want to confirm the deletion?"
      ) == true
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080/tasks/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Task deleted successfully");
        } else {
          console.log("Error encountered while deleting the task");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return false;
    }
    fetchData();
  };

  return (
    <div className="flex justify-center mt-5 mb-5">
      <div className="w-5/6">
        <div className="bg-white p-4 shadow-md rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-2xl text-gray-800">Task List</h2>
            <div className="border-solid border-gray-400 border-2 rounded-lg w-1/4 flex items-center">
              <input
                type="text"
                className="bg-white h-10 w-full px-4 rounded-lg focus:outline-none hover:cursor-pointer"
                placeholder="Search tasks"
                onChange={(e) => setSearchInput(e.target.value)}
              ></input>
              <SearchIcon className="mr-3 text-gray-500" />
            </div>
            {isAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Add Task
              </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <table className="min-w-full m-auto">
            <thead>
              <tr className="bg-gray-100">
                <th
                  onClick={() => sorting("task_name")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Task ID
                  {activeColumn === "task_name" && (
                    <ArrowDropDownIcon className="inline-block" />
                  )}
                </th>
                <th
                  onClick={() => sorting("project_name")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Project
                  {activeColumn === "project_name" && (
                    <ArrowDropDownIcon className="inline-block" />
                  )}
                </th>
                <th
                  onClick={() => sorting("employee_name")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Assigned
                  {activeColumn === "employee_name" && (
                    <ArrowDropDownIcon className="inline-block" />
                  )}
                </th>
                <th
                  onClick={() => sorting("task_status_name")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Status
                  {activeColumn === "task_status_name" && (
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
                .filter((task) => {
                  return searchInput.toLowerCase() === ""
                    ? task
                    : task.task_name.toLowerCase().includes(searchInput);
                })
                .map((task) => (
                  <tr className="border-b hover:bg-gray-100" key={task.task_id}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {task.task_name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {task.project_name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {task.employee_name} {task.employee_lastname}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {task.task_status_name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap flex items-center justify-center">
                      <Link
                        to={`/tasks/${task.task_id}`}
                        className="text-blue-500 hover:underline hover:text-blue-700"
                      >
                        <InfoIcon />
                      </Link>
                      {isAdmin && (
                        <div>
                          <DeleteIcon
                            className="text-red-500 hover:underline hover:text-red-700 ml-4"
                            onClick={() => handleDelete(task.task_id)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default TaskList;
