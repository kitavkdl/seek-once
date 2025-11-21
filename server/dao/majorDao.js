// majorDao.js
const db = require('../db'); // <- your pg Pool/Client export

async function getAllMajors() {
  const query = 'SELECT id, dept, major_name, specialization FROM major';
  const { rows } = await db.query(query);
  return rows;
}

async function getMajorById(id) {
  const query =
    'SELECT id, dept, major_name, specialization FROM major WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0] || null;
}

module.exports = {
  getAllMajors,
  getMajorById,
};
