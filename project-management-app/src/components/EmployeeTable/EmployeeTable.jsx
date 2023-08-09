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
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return false;
    }
  };

  const getPositionName = (positionId) => {
    const positions = [
      { id: 1, name: "Boss" },
      { id: 2, name: "Frontend Developer" },
      { id: 3, name: "Backend Developer" },
    ];

    const position = positions.find((pos) => pos.id === positionId);
    return position ? position.name : "Unknown Position";
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
            <th>Name</th>
            <th>Last Name</th>
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
              <td>{getPositionName(employee.employee_position)}</td>
              <td>{employee.employee_email}</td>
              <td>
                <Link to={`/employees/${employee.employee_id}`}>
                    <button>More</button>
                </Link>
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
