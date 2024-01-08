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
    FROM Teams
    ORDER BY team_id ASC`);
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
  FROM Employees 
  INNER JOIN employeepositions 
  ON employees.employee_position = employeepositions.employee_position_id
  ORDER BY employees.employee_id ASC`);
  return rows;
}

export async function getEmployee(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Employees 
    INNER JOIN employeepositions 
    ON employees.employee_position = employeepositions.employee_position_id
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
        DELETE FROM Employees
        WHERE employee_id = ?
      `,
    [employeeId]
  );

  return result.affectedRows === 1;
}

export async function getEmployeePositions() {
  const [rows] = await pool.query(`
  SELECT * 
  FROM EmployeePositions `);
  return rows;
}

export async function updateEmployee(
  employee_name,
  employee_lastname,
  employee_position,
  employee_email,
  employee_id
) {
  const [result] = await pool.query(
    `
    UPDATE employees 
    SET 
    employee_name = ?,
    employee_lastname = ?,
    employee_position = ?,
    employee_email = ?
    WHERE employee_id = ?
  `,
    [
      employee_name,
      employee_lastname,
      employee_position,
      employee_email,
      employee_id,
    ]
  );
  return result.affectedRows;
}

////////////////////////////////////////////
// TASK REQUESTS

export async function getTasks() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Tasks
    INNER JOIN Projects ON tasks.project_id = projects.project_id
    INNER JOIN Employees ON tasks.employee_id = employees.employee_id
    INNER JOIN TaskStatus ON tasks.status = taskstatus.task_status_id
    ORDER BY tasks.task_id ASC`);
  return rows;
}

export async function getTask(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Tasks 
    INNER JOIN Projects 
    ON tasks.project_id = projects.project_id
    INNER JOIN Teams
    ON tasks.team_id = teams.team_id
    INNER JOIN Employees
    ON tasks.assignee_id = employees.employee_id
    INNER JOIN TaskStatus
    ON tasks.status = taskstatus.task_status_id
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
    WHERE employee_id = ?
    ORDER BY tasks.task_id ASC`,
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
  end_date,
  employee_id
) {
  const [result] = await pool.query(
    `
    INSERT INTO Tasks (task_name, task_description, project_id, team_id, assignee_id, status, start_date, end_date, employee_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      employee_id,
    ]
  );
  return result.insertId;
}

export async function updateTask(
  task_name,
  task_description,
  project_id,
  team_id,
  assignee_id,
  status,
  start_date,
  end_date,
  employee_id,
  task_id
) {
  const [result] = await pool.query(
    `
    UPDATE tasks 
    SET 
      task_name = ?,
      task_description = ?,
      project_id = ?,
      team_id = ?,
      assignee_id = ?,
      status = ?,
      start_date = ?,
      end_date = ?,
      employee_id = ?
    WHERE task_id = ?;
  `,
    [
      task_name,
      task_description,
      project_id,
      team_id,
      assignee_id,
      status,
      start_date,
      end_date,
      employee_id,
      task_id,
    ]
  );
  return result.affectedRows;
}

export async function getTaskStatus() {
  const [rows] = await pool.query(`
  SELECT * 
  FROM TaskStatus `);
  return rows;
}

export async function deleteTask(taskId) {
  const [result] = await pool.query(
    `
        DELETE FROM Tasks
        WHERE task_id = ?
      `,
    [taskId]
  );

  return result.affectedRows === 1;
}

////////////////////////////////////////////
// PROJECT REQUESTS

export async function getProjects() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Projects
    INNER JOIN ProjectStatus
    ON Projects.project_status = ProjectStatus.project_status_id
    ORDER BY projects.project_id ASC`);
  return rows;
}

export async function getProject(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Projects
    INNER JOIN ProjectStatus
    ON Projects.project_status = ProjectStatus.project_status_id 
    WHERE project_id = ?`,
    [id]
  );
  return rows[0];
}

export async function getProjectTasks(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Tasks 
    WHERE project_id = ? 
    ORDER BY tasks.task_id ASC`,
    [id]
  );
  return rows;
}

export async function getProjectTeams(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM TeamMembers 
    INNER JOIN teams ON teammembers.team_id = teams.team_id
    WHERE project_id = ? 
    ORDER BY teammembers.team_member_id ASC`,
    [id]
  );
  return rows;
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

export async function getProjectsStatuses() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM ProjectStatus`);
  return rows;
}

export async function updateProject(
  project_name,
  start_date,
  end_date,
  project_status,
  project_description,
  project_id
) {
  const [result] = await pool.query(
    `
    UPDATE projects 
    SET 
    project_name = ?,
    start_date = ?,
    end_date = ?,
    project_status = ?,
    project_description = ?
    WHERE project_id = ?
  `,
    [
      project_name,
      start_date,
      end_date,
      project_status,
      project_description,
      project_id,
    ]
  );
  return result.affectedRows;
}

////////////////////////////////////////////
// TEAM MEMBER REQUESTS

export async function getTeamMembers() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM TeamMembers
    ORDER BY teammembers.team_member_id ASC`);
  return rows;
}

export async function getTeamMember(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM TeamMembers
    INNER JOIN Employees
    ON teammembers.employee_id = employees.employee_id
    INNER JOIN Teams
    ON teammembers.team_id = teams.team_id
    WHERE teammembers.team_id = ?`,
    [id]
  );
  return rows;
}

export async function getEmployeeTeamMembership(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM TeamMembers 
    INNER JOIN Teams ON teammembers.team_id = teams.team_id WHERE teammembers.employee_id = ?
    ORDER BY teammembers.team_member_id ASC`,
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

export async function deleteTeamMember(teamId) {
  const [result] = await pool.query(
    `
        DELETE FROM TeamMembers
        WHERE team_member_id = ?
      `,
    [teamId]
  );

  return result.affectedRows === 1;
}
