import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const ProjectProgressPieChart = () => {
  const chartRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks");
        const data = await response.json();
        setTasks(data);


        const distinctProjects = [...new Set(data.map((task) => task.project_name))];
        setProjects(distinctProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && tasks.length > 0) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      const filteredTasks = selectedProject
        ? tasks.filter((task) => task.project_name === selectedProject)
        : tasks;

      const taskStatusCounts = filteredTasks.reduce((acc, task) => {
        const statusName = task.task_status_name;
        acc[statusName] = (acc[statusName] || 0) + 1;
        return acc;
      }, {});

      const statusNames = Object.keys(taskStatusCounts);
      const statusCounts = Object.values(taskStatusCounts);

      chartRef.current.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: statusNames,
          datasets: [
            {
              data: statusCounts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(54, 162, 235, 0.7)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    }
  }, [tasks, selectedProject]);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div>
      <label htmlFor="projectSelect">Project: </label>
      <select
        id="projectSelect"
        onChange={handleProjectChange}
        value={selectedProject}
      >
        <option value="" className="text-center">All Projects</option>
        {projects.map((projectName) => (
          <option key={projectName} value={projectName} className="text-center">
            {projectName}
          </option>
        ))}
      </select>
      <div className="relative w-96 h-96 m-auto">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default ProjectProgressPieChart;
