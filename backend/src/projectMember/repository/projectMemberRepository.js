const db = require("../../config/dbConfig");

exports.addMemberToProject = async (data) => {
  const sql = `INSERT INTO project_members (project_id, user_id)
    VALUES ($1, $2)
    RETURNING *`;

  const result = await db.query(sql, [data.project_id, data.user_id]);
  return result.rows[0];
};

exports.findMemberByProjectAndUser = async (projectId, userId) => {
  const sql = `SELECT * FROM project_members
    WHERE project_id = $1 AND user_id = $2`;

  const result = await db.query(sql, [projectId, userId]);
  return result.rows[0];
};

exports.deleteMemberFromProject = async (projectId, userId) => {
  const sql = `DELETE FROM project_members WHERE project_id = $1 AND user_id = $2
    RETURNING *`;

  const result = await db.query(sql, [projectId, userId]);
  return result.rows[0];
};