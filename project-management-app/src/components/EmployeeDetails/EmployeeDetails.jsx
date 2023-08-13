import React, { useState, useEffect } from "react";
import "./EmployeeDetails.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { empId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const employeesData = await fetch(
          `http://localhost:8080/employees/${empId}`
        );

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
  }, [empId]);

  const { employee_name, employee_lastname, employee_position, employee_email } = data;

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
    <div className="employeeDetails">
      <Sidebar />
      <div className="detailsContainer">
        <Navbar />
        <div className="employeeInfo">
        <img
          src="https://via.placeholder.com/150" // Placeholder image URL
          alt={`${employee_name} ${employee_lastname}`}
          className="employee-image"
        />
          <h2>
            {employee_name} {employee_lastname}
          </h2>
          <p>Position: {getPositionName(employee_position)}</p>
          <p>Email: {employee_email}</p>
        </div>
        <div className="employeeTasks">
          <h2>Assigned tasks</h2>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
