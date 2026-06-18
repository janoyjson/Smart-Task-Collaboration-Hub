const db = require("../../config/dbConfig");

exports.createTask = async (data) => {
  const sql = `INSERT INTO tasks (project_id, title, task_description, assigned_to, due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  const params = [
    data.project_id,
    data.title,
    data.task_description,
    data.assigned_to,
    data.due_date,
  ];

  const result = await db.query(sql, params);
  return result.rows[0];
};

exports.getTasksByProject = async (projectId) => {
  const sql = `SELECT * FROM tasks WHERE project_id = $1`;
  const result = await db.query(sql, [projectId]);
  return result.rows;
};

exports.findTaskByID = async (id) => {
  const sql = `SELECT * FROM tasks WHERE taskID = $1`;
  const result = await db.query(sql, [id]);
  return result.rows[0];
};

exports.updateTask = async (data) => {
  const sql = `UPDATE tasks
    SET title = $1, task_description = $2, assigned_to = $3, due_date = $4
    WHERE taskID = $5
    RETURNING *`;

  const params = [
    data.title,
    data.task_description,
    data.assigned_to,
    data.due_date,
    data.task_id,
  ];

  const result = await db.query(sql, params);
  return result.rows[0];
};

exports.updateTaskStatus = async (taskId, newStatus) => {
  const sql = `UPDATE tasks SET task_status = $1 WHERE taskID = $2 RETURNING *`;
  const result = await db.query(sql, [newStatus, taskId]);
  return result.rows[0];
};

exports.deleteTask = async (taskId) => {
  const sql = `DELETE FROM tasks WHERE taskID = $1 RETURNING *`;
  const result = await db.query(sql, [taskId]);
  return result.rows[0];
};