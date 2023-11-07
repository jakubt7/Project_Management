import React, { useState, useEffect } from 'react';
import './TaskList.scss';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const taskData = await fetch('http://localhost:8080/tasks');
  
          if (!taskData.ok) {
            console.log('There was an error fetching from the API');
          } else {
            const data = await taskData.json();
            setData(data);
          }
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchData();
    }, [data]);
  
    return (
      <div className="flex justify-center mt-5">
        <div className="w-5/6">
          <div className="bg-white p-4 shadow-md rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-2xl text-gray-800">Task List</h2>
              <Link to="/projects/create" className="btn bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded-lg">
                Add Task
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <table className="min-w-full m-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Task ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Assigned
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((task) => (
                    <tr className="border-b hover:bg-gray-100" key={task.task_id}>
                      <td className="px-4 py-2 whitespace-nowrap">{task.task_name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{task.project_name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{task.employee_name} {task.employee_lastname}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{task.task_status_name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                    <Link to={`/tasks/${task.task_id}`} className="text-blue-500 hover:underline hover:text-blue-700">
                      More
                    </Link>
                    <Link to={''} className="text-gray-500 hover:underline hover:text-gray-700 ml-4">
                      Edit
                    </Link>
                    <button
                      className="text-red-500 hover:underline hover:text-red-700 ml-4"
                    >
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
    
    
    
}

export default TaskList