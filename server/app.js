import express from 'express'

import { getTeams, getTeam, createTeam, 
         getEmployees, getEmployee, createEmployee, getTasks, getTask, createTask } from './server.js'

const app = express()

app.use(express.json())

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

app.get("/employees", async (req, res) => {
    const employees = await getEmployees()
    res.send(employees)
})

app.get("/employees/:id", async (req, res) => {
    const id = req.params.id
    const employee = await getEmployee(id)
    res.send(employee)
})

app.post("/employees", async (req, res) => {
    const { name, lastname, position, email } = req.body
    const employee = await createEmployee(name, lastname, position, email)
    res.status(201).send(employee)
})

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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})