const db = require("../../config/dbConfig");

exports.createProject = async (data) => {
  const sql = `INSERT INTO projects (project_name, description, created_by)
    VALUES ($1, $2, $3)
    RETURNING project_ID, project_name, description, created_by`;

  const params = [data.project_name, data.description, data.created_by];

  const result = await db.query(sql, params);
  return result.rows[0];
};

exports.getProjects = async (id) => {
  const sql = `SELECT project_id, project_name FROM projects WHERE created_by = $1`;
  const result = await db.query(sql, [id]);
  return result.rows;
};

exports.getMemberProjects = async (id) => {
  const sql = `SELECT p.* FROM projects p
    INNER JOIN project_members pm ON p.project_id = pm.project_id
    WHERE pm.user_id = $1
    ORDER BY p.created_at DESC`;

  const result = await db.query(sql, [id]);
  return result.rows;
};

exports.getDetailProject = async (id) => {
  const sql = `SELECT * FROM projects WHERE project_id = $1`;
  const result = await db.query(sql, [id]);
  return result.rows[0];
};

exports.findProjectbyID = async (id) => {
  const sql = `SELECT * FROM projects WHERE project_id = $1`;
  const result = await db.query(sql, [id]);
  return result.rows[0];
};

exports.updateProjectInfo = async (data) => {
  const sql = `UPDATE projects SET project_name = $1, description = $2
    WHERE project_id = $3 AND created_by = $4
    RETURNING *`;

  const params = [
    data.project_name,
    data.description,
    data.project_id,
    data.created_by,
  ];
  const result = await db.query(sql, params);
  return result.rows[0];
};

exports.deleteProject = async (projectId) => {
  const client = await db.pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`DELETE FROM tasks WHERE project_id = $1`, [projectId]);
    await client.query(`DELETE FROM project_members WHERE project_id = $1`, [projectId]);

    const result = await client.query(
      `DELETE FROM projects WHERE project_id = $1 RETURNING *`,
      [projectId],
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
