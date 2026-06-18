const db = require("../../config/dbConfig");

//Users Registration
exports.Register = async (data) => {
  const sql = `INSERT INTO users (email, password_hash, full_name, user_role)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id, email, full_name, user_role`;

  const params = [
    data.email,
    data.password_hash,
    data.full_name,
    data.user_role,
  ];
  const result = await db.query(sql, params);
  return result.rows[0];
};

// Find User By Email
exports.findByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = $1`;
  const result = await db.query(sql, [email]);
  return result.rows[0];
};

exports.getUsersbyID = async (id) => {
  const sql = `SELECT user_id, email, full_name, user_role  FROM users WHERE user_id = $1`;
  const result = await db.query(sql, [id]);
  return result.rows[0];
};

exports.getUsersbyNameorEmail = async (keyw) => {
  const sql = `SELECT user_id, email, full_name, user_role  FROM users WHERE user_role = 'Member'
  AND (full_name ILIKE $1 OR email ILIKE $1)`
  const result = await db.query(sql, [`%${keyw}%`]);
  return result.rows;
};