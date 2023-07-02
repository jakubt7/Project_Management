import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config();


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getTeams() {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Teams`);
    return rows
}

export async function getTeam(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM Teams 
    WHERE team_id = ?`, [id])
    return rows[0]
}

export async function createTeam(name){
    const [result] = await pool.query(`
    INSERT INTO Teams (team_name)
    VALUES (?)
    `, [name])
    return result.insertId
}

export async function getEmployees() {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Employees`);
    return rows
}

export async function getEmployee(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM Employees 
    WHERE employee_id = ?`, [id])
    return rows[0]
}

export async function createEmployee(name, lastname, position, email){
    const [result] = await pool.query(`
    INSERT INTO Employees (employee_name, employee_lastname, employee_position, employee_email)
    VALUES (?, ?, ?, ?)
    `, [name, lastname, position, email])
    return result.insertId
}

export async function getTasks() {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Tasks`);
    return rows
}

export async function getTask(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM Tasks 
    WHERE task_id = ?`, [id])
    return rows[0]
}

export async function createTask(name, description, project_id, team_id, assignee_id, status, start_date, end_date){
    const [result] = await pool.query(`
    INSERT INTO Tasks (task_name, task_description, project_id, team_id, assignee_id, status, start_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, description, project_id, team_id, assignee_id, status, start_date, end_date])
    return result.insertId
}