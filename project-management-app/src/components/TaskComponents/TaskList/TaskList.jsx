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
              <Link to="/projects/create" className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                Add Task
              </Link>
            </div>
          </div>
        <div>
          <div className="flex justify-between text-center mb-2">
            <div className='w-1/4'>Task ID</div>
            <div className='w-1/4'>Project</div>
            <div className='w-1/4'>Assigned</div>
            <div className='w-1/4'>Status</div>
            </div>
          {data.map((task) => (
            <Link
              to={`/tasks/${task.task_id}`}
              key={task.task_id}
            >
              <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-300 mb-4 border border-slate-600">
                    <div className="flex justify-between font-medium text-center">
                      <div className='w-1/4'>{task.task_name}</div>
                      <div className='w-1/4'>{task.project_name}</div>
                      <div className='w-1/4'>{task.employee_name} {task.employee_lastname}</div>
                      <div className='w-1/4'>{task.task_status_name}</div>
                    </div>
                  </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    );
}

export default TaskList