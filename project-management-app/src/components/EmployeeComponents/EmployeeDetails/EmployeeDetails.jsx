import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";

const EmployeeDetails = () => {
  const { empId } = useParams();
  const [employeeData, setEmployeeData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [positions, setPositions] = useState([]);

  async function fetchEmployeePositions() {
    try {
      const positionData = await fetch(
        `http://localhost:8080/employeepositions`
      );
      if (!positionData.ok) {
      } else {
        const data = await positionData.json();
        setPositions(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchEmployeeData() {
    try {
      const employeesData = await fetch(
        `http://localhost:8080/employees/${empId}`
      );
      if (!employeesData.ok) {
      } else {
        const data = await employeesData.json();
        setEmployeeData(data);
        setEditedEmployee(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchTasksData() {
    try {
      const tasksData = await fetch(
        `http://localhost:8080/employees/tasks/${empId}`
      );
      if (!tasksData.ok) {
      } else {
        const data = await tasksData.json();
        setTasksData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchTeamsData() {
    try {
      const teamsData = await fetch(
        `http://localhost:8080/employees/teammembers/${empId}`
      );
      if (!teamsData.ok) {
      } else {
        const data = await teamsData.json();
        setTeamsData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchEmployeeData();
    fetchTasksData();
    fetchTeamsData();
    fetchEmployeePositions();
  }, [empId]);

  const handleEditEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/employees/update/${empId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedEmployee),
        }
      );

      if (response.ok) {
        console.log("Employee updated successfully!");
        setIsEditing(false);
        fetchEmployeeData();
        fetchTasksData();
        fetchTeamsData();
        fetchEmployeePositions();
      } else {
        console.error("Failed to update employee");
        console.log(editedEmployee);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setEditedEmployee((prevEmployee) => {
      let updatedValue;

      updatedValue = type === "number" ? parseFloat(value) : value;

      return {
        ...prevEmployee,
        [name]: updatedValue,
      };
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  return (
    <div className="employeeDetails">
      <AppHeader />
      <div className="flex justify-center h-screen mt-5">
        <div className="w-3/5">
          <div className="border-solid border-2 border-black p-10 rounded-md">
            <div className="flex justify-between">
              <img
                src="https://via.placeholder.com/200"
                alt={`${employeeData.employee_name} ${employeeData.employee_lastname}`}
                className="employee-image rounded-2xl w-1/3"
              />
              <div className="ml-4 w-2/3 text-center self-center">
                {isEditing ? (
                  <>
                    <h2 className="text-2xl font-semibold">
                      <input
                        type="text"
                        name="employee_name"
                        value={editedEmployee.employee_name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                      <input
                        type="text"
                        name="employee_lastname"
                        value={editedEmployee.employee_lastname}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                    </h2>
                    <p>
                      <select
                        value={editedEmployee.employee_position}
                        onChange={handleInputChange}
                        name="employee_position"
                        className="mt-1 p-2 border rounded-md w-full"
                      >
                        {positions.map((position) => (
                          <option
                            key={position.employee_position_id}
                            value={position.employee_position_id}
                          >
                            {position.employee_position}
                          </option>
                        ))}
                      </select>
                    </p>
                    <p>
                      <input
                        type="text"
                        name="employee_email"
                        value={editedEmployee.employee_email}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold">
                      {employeeData.employee_name}{" "}
                      {employeeData.employee_lastname}
                    </h2>
                    <p>{employeeData.employee_position}</p>
                    <p>{employeeData.employee_email}</p>
                  </>
                )}
              </div>
            </div>
            <div className="employeeTasks mt-5">
              <h2 className="text-lg font-semibold">Assigned tasks</h2>
              <ul>
                {tasksData.map((task) => (
                  <li key={task.task_id}>{task.task_name}</li>
                ))}
              </ul>
            </div>
            <div className="employeeTeams mt-5">
              <h2 className="text-lg font-semibold">Assigned teams</h2>
              <ul>
                {teamsData.map((team) => (
                  <li key={team.team_id}>{team.team_name}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-4">
              <div className="mr-5">
                {isAdmin && (
                  <>
                    {isEditing ? (
                      <>
                        <button
                          className="p-3 w-40 bg-black text-white rounded-lg mr-2"
                          onClick={() => {
                            setIsEditing(false);
                            setEditedEmployee(employeeData);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                          onClick={handleEditEmployee}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        className="p-3 w-40 bg-blue-500 text-white rounded-lg"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit employee
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
