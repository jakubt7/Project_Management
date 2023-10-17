import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

////////////////////////////////////////////
// TEAM REQUESTS

export async function getTeams() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Teams`);
  return rows;
}

export async function getTeam(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Teams 
    WHERE team_id = ?`,
    [id]
  );
  return rows[0];
}

export async function createTeam(name) {
  const [result] = await pool.query(
    `
    INSERT INTO Teams (team_name)
    VALUES (?)
    `,
    [name]
  );
  return result.insertId;
}

////////////////////////////////////////////
// EMPLOYEE REQUESTS

export async function getEmployees() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Employees`);
  return rows;
}

export async function getEmployee(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Employees 
    WHERE employee_id = ?`,
    [id]
  );
  return rows[0];
}

export async function createEmployee(name, lastname, position, email) {
  const [result] = await pool.query(
    `
    INSERT INTO Employees (employee_name, employee_lastname, employee_position, employee_email)
    VALUES (?, ?, ?, ?)
    `,
    [name, lastname, position, email]
  );
  return result.insertId;
}

export async function deleteEmployee(employeeId) {
  const [result] = await pool.query(
    `
        DELETE FROM TeamMembers
        WHERE employee_id = ?
        DELETE FROM Employees
        WHERE employee_id = ?
      `,
    [employeeId, employeeId]
  );

  return result.affectedRows === 1;
}

////////////////////////////////////////////
// TASK REQUESTS

export async function getTasks() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Tasks`);
  return rows;
}

export async function getTask(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Tasks 
    WHERE task_id = ?`,
    [id]
  );
  return rows[0];
}

export async function getEmployeeTasks(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Tasks 
    WHERE employee_id = ?`,
    [id]
  );
  return rows;
}

export async function createTask(
  name,
  description,
  project_id,
  team_id,
  assignee_id,
  status,
  start_date,
  end_date
) {
  const [result] = await pool.query(
    `
    INSERT INTO Tasks (task_name, task_description, project_id, team_id, assignee_id, status, start_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      description,
      project_id,
      team_id,
      assignee_id,
      status,
      start_date,
      end_date,
    ]
  );
  return result.insertId;
}

////////////////////////////////////////////
// PROJECT REQUESTS

export async function getProjects() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Projects`);
  return rows;
}

export async function getProject(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Projects 
    WHERE project_id = ?`,
    [id]
  );
  return rows[0];
}

export async function createProject(
  name,
  start_date,
  end_date,
  status,
  description
) {
  const [result] = await pool.query(
    `
    INSERT INTO Projects (project_name, start_date, end_date, project_status, project_description)
    VALUES (?, ?, ?, ?, ?)
    `,
    [name, start_date, end_date, status, description]
  );
  return result.insertId;
}

export async function deleteProject(projectId) {
  const [result] = await pool.query(
    `
        DELETE FROM Projects
        WHERE project_id = ?
      `,
    [projectId]
  );

  return result.affectedRows === 1;
}

////////////////////////////////////////////
// TEAM MEMBER REQUESTS

export async function getTeamMembers() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM TeamMembers`);
  return rows;
}

export async function getTeamMember(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM TeamMembers 
    WHERE team_id = ?`,
    [id]
  );
  return rows;
}

export async function getEmployeeTeamMembership(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM TeamMembers 
    INNER JOIN Teams ON teammembers.team_id = teams.team_id WHERE teammembers.employee_id = ?`,
    [id]
  );
  return rows;
}

export async function createTeamMember(team_id, employee_id) {
  const [result] = await pool.query(
    `
    INSERT INTO TeamMembers (team_id, employee_id)
    VALUES (?, ?)
    `,
    [team_id, employee_id]
  );
  return result.insertId;
}
