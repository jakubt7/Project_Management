import express from 'express'
import cors from 'cors';

import { getTeams, getTeam, createTeam, 
         getEmployees, getEmployee, createEmployee, deleteEmployee, 
         getTasks, getTask, createTask, 
         getProjects, getProject, createProject, 
         getTeamMembers, getTeamMember, createTeamMember, deleteProject, getEmployeeTasks, getEmployeeTeamMembership, getProjectTasks, getProjectTeams } from './server.js'

const app = express()

// CORS ORIGIN PASS
const corsOptions = {
    origin: 'http://localhost:5173',
  };
  
app.use(cors(corsOptions));

app.use(express.json())

// TEAM REQUESTS

app.get("/teams", async (req, res) => {
    const teams = await getTeams()
    res.send(teams)
})

app.get("/teams/:id", async (req, res) => {
    const id = req.params.id
    const team = await getTeam(id)
    res.send(team)
})

app.post("/teams", async (req, res) => {
    const { name } = req.body
    const team = await createTeam(name)
    res.status(201).send(team)
})

////////////////////////////////////////////
// EMPLOYEE REQUESTS

app.get("/employees", async (req, res) => {
    const employees = await getEmployees()
    res.send(employees)
})

app.get("/employees/:id", async (req, res) => {
    const id = req.params.id
    const employee = await getEmployee(id)
    res.send(employee)
})

app.get("/employees/tasks/:id", async (req, res) => {
    const id = req.params.id
    const task = await getEmployeeTasks(id)
    res.send(task)
})

app.post("/employees", async (req, res) => {
    const { name, lastname, position, email } = req.body
    const employee = await createEmployee(name, lastname, position, email)
    res.status(201).send(employee)
})

app.delete("/employees/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await deleteEmployee(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ error: "Failed to delete employee.", message: error.message });
    }
  });  

////////////////////////////////////////////
// TASK REQUESTS

app.get("/tasks", async (req, res) => {
    const tasks = await getTasks()
    res.send(tasks)
})

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id
    const task = await getTask(id)
    res.send(task)
})

app.post("/tasks", async (req, res) => {
    const { name, description, project_id, team_id, assignee_id, status, start_date, end_date } = req.body
    const task = await createTask(name, description, project_id, team_id, assignee_id, status, start_date, end_date)
    res.status(201).send(task)
})

////////////////////////////////////////////
// PROJECT REQUESTS

app.get("/projects", async (req, res) => {
    const projects = await getProjects()
    res.send(projects)
})

app.get("/projects/:id", async (req, res) => {
    const id = req.params.id
    const project = await getProject(id)
    res.send(project)
})

app.get("/projects/tasks/:id", async (req, res) => {
    const id = req.params.id
    const project = await getProjectTasks(id)
    res.send(project)
})

app.get("/projects/teams/:id", async (req, res) => {
    const id = req.params.id
    const project = await getProjectTeams(id)
    res.send(project)
})

app.post("/projects", async (req, res) => {
    const { name, start_date, end_date, status, description } = req.body
    const project = await createProject(name, start_date, end_date, status, description)
    res.status(201).send(project)
})

app.delete("/projects/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await deleteProject(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ error: "Failed to delete employee." });
    }
});  

////////////////////////////////////////////
// TEAM MEMBER REQUESTS

app.get("/teammembers", async (req, res) => {
    const members = await getTeamMembers()
    res.send(members)
})

app.get("/teammembers/:id", async (req, res) => {
    const id = req.params.id
    const member = await getTeamMember(id)
    res.send(member)
})

app.get("/employees/teammembers/:id", async (req, res) => {
    const id = req.params.id
    const member = await getEmployeeTeamMembership(id)
    res.send(member)
})

app.post("/teammembers", async (req, res) => {
    const { team_id, employee_id } = req.body
    const member = await createTeamMember(team_id, employee_id)
    res.status(201).send(member)
})

////////////////////////////////////////////
// ERROR HANDLING

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

////////////////////////////////////////////
// CONNECTION TO PORT ANNOUNCEMENT

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})