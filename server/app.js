import express from "express";
import cors from "cors";

import {
  getTeams, getTeam, createTeam, deleteTeam, 
  getEmployees, getEmployee, createEmployee,  deleteEmployee,  updateEmployee, getEmployeeTasks, getEmployeeTeamMembership, getEmployeePositions,
  getTasks, getTask,  createTask,  getTasksById,  updateTaskStatus, getTaskStatus, deleteTask, updateTask,
  getProjects, getProject, createProject,  deleteProject, getProjectTasks,  getProjectTeams,  getProjectsStatuses,  updateProject,
  getTeamMembers, getTeamMember,  createTeamMember, deleteTeamMember,
  handleLogin, getNotifications, createNotification, updateNotificationStatus, 
} from "./server.js";

const app = express();

// CORS ORIGIN PASS
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use(express.json());

////////////////////////////////////////////
// ERROR HANDLING

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

////////////////////////////////////////////
// CONNECTION TO PORT ANNOUNCEMENT

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// USER REQUESTS
app.post("/check-user", async (req, res) => {
  await handleLogin(req, res);
});

// NOTIFICATION REQUESTS
app.post("/notifications/create", async (req, res) => {
  const { employee_id, task_id } = req.body;

  try {
    const notificationId = await createNotification(employee_id, task_id);
    res.status(201).send({ notification_id: notificationId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create notification." });
  }
});

app.get("/notifications/:id", async (req, res) => {
  const id = req.params.id;
  const notifications = await getNotifications(id);
  res.send(notifications);
});

app.put("/notifications/update/:id", async (req, res) => {
  const id = req.params.id;

  const notificationUpdate = await updateNotificationStatus(id);

  if (notificationUpdate > 0) {
    res.send(`Notification with ID ${id} updated successfully`);
  } else {
    res.status(500).send(`Failed to update task with ID ${id}`);
  }
});

// TEAM REQUESTS

app.get("/teams", async (req, res) => {
  const teams = await getTeams();
  res.send(teams);
});

app.get("/teams/:id", async (req, res) => {
  const id = req.params.id;
  const team = await getTeam(id);
  res.send(team);
});

app.post("/teams", async (req, res) => {
  const { name } = req.body;
  const team = await createTeam(name);
  res.status(201).send(team);
});

app.delete("/teams/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteTeam(id);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to delete team.", message: error.message });
  }
});

////////////////////////////////////////////
// EMPLOYEE REQUESTS

app.get("/employees", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

app.get("/employees/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await getEmployee(id);
  res.send(employee);
});

app.post("/employees", async (req, res) => {
  const { name, lastname, position, email } = req.body;
  const employee = await createEmployee(name, lastname, position, email);
  res.status(201).send(employee);
});

app.delete("/employees/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteEmployee(id);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to delete employee.", message: error.message });
  }
});

app.put("/employees/update/:id", async (req, res) => {
  const {
    employee_name,
    employee_lastname,
    employee_position,
    employee_email,
  } = req.body;

  const empId = req.params.id;

  const empUpdate = await updateEmployee(
    employee_name,
    employee_lastname,
    employee_position,
    employee_email,
    empId
  );

  if (empUpdate > 0) {
    res.send(`Employee with ID ${empId} updated successfully`);
  } else {
    res.status(500).send(`Failed to update task with ID ${empId}`);
  }
});

app.get("/employees/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const task = await getEmployeeTasks(id);
  res.send(task);
});

app.get("/employeepositions", async (req, res) => {
  const positions = await getEmployeePositions();
  res.send(positions);
});

////////////////////////////////////////////
// TASK REQUESTS

app.get("/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const task = await getTask(id);
  res.send(task);
});

app.get("/tasks/user/:id", async (req, res) => {
  const id = req.params.id;
  const task = await getTasksById(id);
  res.send(task);
});

app.post("/tasks", async (req, res) => {
  const {
    name,
    description,
    project_id,
    team_id,
    assignee_id,
    status,
    start_date,
    end_date,
    employee_id,
  } = req.body;
  const task = await createTask(
    name,
    description,
    project_id,
    team_id,
    assignee_id,
    status,
    start_date,
    end_date,
    employee_id
  );
  res.status(201).send(task);
});

app.put("/tasks/update/:id", async (req, res) => {
  const {
    task_name,
    task_description,
    project_id,
    team_id,
    assignee_id,
    status,
    start_date,
    end_date,
  } = req.body;
  const taskId = req.params.id;

  const taskUpdate = await updateTask(
    task_name,
    task_description,
    project_id,
    team_id,
    assignee_id,
    status,
    start_date,
    end_date,
    taskId
  );

  if (taskUpdate > 0) {
    res.send(`Task with ID ${taskId} updated successfully`);
  } else {
    res.status(500).send(`Failed to update task with ID ${taskId}`);
  }
});

app.put("/tasks/update/status/:id", async (req, res) => {
  const { status } = req.body;

  const taskId = req.params.id;

  const taskUpdate = await updateTaskStatus(status, taskId);

  if (taskUpdate > 0) {
    res.send(`Task with ID ${taskId} updated successfully`);
  } else {
    res.status(500).send(`Failed to update task with ID ${taskId}`);
  }
});

app.get("/taskstatus", async (req, res) => {
  const taskstatus = await getTaskStatus();
  res.send(taskstatus);
});

app.delete("/tasks/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteTask(id);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to delete task.", message: error.message });
  }
});

////////////////////////////////////////////
// PROJECT REQUESTS

app.get("/projects", async (req, res) => {
  const projects = await getProjects();
  res.send(projects);
});

app.get("/projects/:id", async (req, res) => {
  const id = req.params.id;
  const project = await getProject(id);
  res.send(project);
});

app.get("/projects/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const project = await getProjectTasks(id);
  res.send(project);
});

app.get("/projects/teams/:id", async (req, res) => {
  const id = req.params.id;
  const project = await getProjectTeams(id);
  res.send(project);
});

app.post("/projects", async (req, res) => {
  const { name, start_date, end_date, status, description } = req.body;
  const project = await createProject(
    name,
    start_date,
    end_date,
    status,
    description
  );
  res.status(201).send(project);
});

app.delete("/projects/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteProject(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete employee." });
  }
});

app.get("/projectstatus", async (req, res) => {
  const projectstatus = await getProjectsStatuses();
  res.send(projectstatus);
});

app.put("/projects/update/:id", async (req, res) => {
  const {
    project_name,
    start_date,
    end_date,
    project_status,
    project_description,
  } = req.body;
  const projectId = req.params.id;

  const projectUpdate = await updateProject(
    project_name,
    start_date,
    end_date,
    project_status,
    project_description,
    projectId
  );

  if (projectUpdate > 0) {
    res.send(`Project with ID ${projectId} updated successfully`);
  } else {
    res.status(500).send(`Failed to update task with ID ${projectId}`);
  }
});

////////////////////////////////////////////
// TEAM MEMBER REQUESTS

app.get("/teammembers", async (req, res) => {
  const members = await getTeamMembers();
  res.send(members);
});

app.get("/teammembers/:id", async (req, res) => {
  const id = req.params.id;
  const member = await getTeamMember(id);
  res.send(member);
});

app.get("/employees/teammembers/:id", async (req, res) => {
  const id = req.params.id;
  const member = await getEmployeeTeamMembership(id);
  res.send(member);
});

app.post("/teammembers", async (req, res) => {
  const { team_id, employee_id } = req.body;
  const member = await createTeamMember(team_id, employee_id);
  res.status(201).send(member);
});

app.delete("/teammembers/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await deleteTeamMember(id);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to delete team.", message: error.message });
  }
});

