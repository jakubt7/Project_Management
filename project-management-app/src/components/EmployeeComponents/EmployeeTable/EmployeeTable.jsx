import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddEmployeeModal from "../AddEmployeeModal/AddEmployeeModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const EmployeeTable = () => {
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

  useEffect(() => {
    async function fetchData() {
      try {
        const employeesData = await fetch("http://localhost:8080/employees");

        if (!employeesData.ok) {
          console.log("There was an error fetching from the API");
        } else {
          const data = await employeesData.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  const handleAddEmployee = async () => {
    async function fetchData() {
      try {
        const employeesData = await fetch("http://localhost:8080/employees");

        if (!employeesData.ok) {
          console.log("There was an error fetching from the API");
        } else {
          const data = await employeesData.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (
      confirm(
        "Deleting this employee is irreversible. Do you want to cofirm the deletion?"
      ) == true
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080/employees/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Employee deleted successfully");
        } else {
          console.log("Error encountered while deleting the employee");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return false;
    }

    async function fetchData() {
      try {
        const employeesData = await fetch("http://localhost:8080/employees");

        if (!employeesData.ok) {
          console.log("There was an error fetching from the API");
        } else {
          const data = await employeesData.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  return (
    <div className="flex justify-center h-screen mt-5">
      <div className="w-5/6">
        <div className="bg-white shadow-md rounded-lg mb-4 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-2xl text-gray-800">Employee List</h2>
            <div className="border-solid border-gray-400 border-2 rounded-lg w-1/4 flex items-center">
              <input
                type="text"
                className="bg-white h-10 w-full px-4 rounded-lg focus:outline-none hover:cursor-pointer"
                placeholder="Search employees"
                onChange={(e) => setSearchInput(e.target.value)}
              />
               <SearchIcon className="mr-3 text-gray-500" />
            </div>
            {isAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Add Employee
              </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <table className="min-w-full m-auto rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th
                  onClick={() => sorting("employee_name")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  First Name
                  {activeColumn === "employee_name" && (
                    <ArrowDropDownIcon className="inline-block" />
                  )}
                </th>
                <th
                  onClick={() => sorting("employee_lastname")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Last Name
                  {activeColumn === "employee_lastname" && (
                    <ArrowDropDownIcon className="inline-block" />
                  )}
                </th>
                <th
                  onClick={() => sorting("employee_position")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Position
                  {activeColumn === "employee_position" && (
                    <ArrowDropDownIcon className="inline-block" />
                  )}
                </th>
                <th
                  onClick={() => sorting("employee_email")}
                  className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Email
                  {activeColumn === "employee_email" && (
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
                .filter((employee) => {
                  return searchInput.toLowerCase() === ""
                    ? employee
                    : employee.employee_name
                        .toLowerCase()
                        .includes(searchInput);
                })
                .map((employee) => (
                  <tr
                    key={employee.employee_id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.employee_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.employee_lastname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.employee_position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.employee_email}
                    </td>
                    <td className="whitespace-nowrap flex items-center justify-center">
                      <Link
                        to={`/employees/${employee.employee_id}`}
                        className="text-blue-500 hover:underline hover:text-blue-700"
                      >
                        <InfoIcon />
                      </Link>
                      {isAdmin && (
                        <div>
                          <DeleteIcon
                            className="text-red-500 hover:underline hover:text-red-700 ml-6"
                            onClick={() => handleDelete(employee.employee_id)}
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

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeTable;
