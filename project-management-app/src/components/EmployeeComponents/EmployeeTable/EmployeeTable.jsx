import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const EmployeeTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const employeesData = await fetch("http://localhost:8080/employees");

        if (!employeesData.ok) {
            console.log("There was an error fetching from the API")
        } else {
          const data = await employeesData.json();
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
        "Deleting this employee is irreversible. Do you want to confirm the deletion?"
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
          console.log("Error encountered while deleting employee")
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return false;
    }
  };

  
  return (
    <div className="flex justify-center h-screen mt-5">
      <div className="w-5/6">
        <div className="bg-white shadow-md rounded-lg mb-4 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-2xl text-gray-800">Employee List</h2>
            <Link to="/employees/create" className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Add Employee
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <table className="min-w-full m-auto rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee) => (
                <tr key={employee.employee_id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{employee.employee_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.employee_lastname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.employee_position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.employee_email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/employees/${employee.employee_id}`} className="text-blue-500 hover:underline hover:text-blue-700">
                      More
                    </Link>
                    <Link to={`/employees/edit/${employee.employee_id}`} className="text-gray-500 hover:underline hover:text-gray-700 ml-4">
                      Edit
                    </Link>
                    <button className="text-red-500 hover:underline hover:text-red-700 ml-4" onClick={() => handleDelete(employee.employee_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
