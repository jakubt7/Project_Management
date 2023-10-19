import React, { useState, useEffect } from "react";
import "./EmployeeTable.scss";
import { Link } from "react-router-dom";

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
    <div>
      <div className="aboveTable">
        <h2>Employee List</h2>
        <Link to={"/employees/create"} className="btn">
          Add Employee
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_lastname}</td>
              <td>{employee.employee_position}</td>
              <td>{employee.employee_email}</td>
              <td>
                <Link to={`/employees/${employee.employee_id}`}>
                    <button>More</button>
                </Link>
                <button>
                  Edit
                </button>
                <button onClick={() => handleDelete(employee.employee_id)}>
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

export default EmployeeTable;
