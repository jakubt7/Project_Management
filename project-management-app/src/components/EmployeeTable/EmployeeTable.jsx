import React, { useState, useEffect } from "react";

const EmployeeTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const employeesData = await fetch("http://localhost:8080/employees");

        if (!studentsData.ok) {

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

  return (
    <div>
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_lastname}</td>
              <td>{employee.employee_position}</td>
              <td>{employee.employee_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;