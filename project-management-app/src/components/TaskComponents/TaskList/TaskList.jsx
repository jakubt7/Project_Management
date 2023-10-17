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
      <div>
        <div className="aboveList">
          <h2>Task List</h2>
          <Link to="/projects/create" className="btn">
            Add Task
          </Link>
        </div>
        <div>
          {data.map((task) => (
            <Link
              to={`/tasks/${task.task_id}`}
              key={task.task_id}
              className="w-1/2 md:w-1/5 p-1"
            >
              <div className="bg-slate-50 rounded-xl p-3 bg-slate-300">
                <div className="text-center">
                  <div className="font-medium">
                    <div className="text-slate-950 dark:text-slate-950">
                      {task.task_name}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}

export default TaskList