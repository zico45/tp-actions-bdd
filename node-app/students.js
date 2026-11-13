const { Pool } = require('pg');

function createPool() {
  return new Pool({
    host: 'localhost', port: 5432, database: 'tp',
    user: 'postgres', password: 'postgres',
  });
}

async function addStudent(pool, name, grade) {
  const r = await pool.query(
    'INSERT INTO students (name, grade) VALUES ($1, $2) RETURNING id',
    [name, grade]
  );
  return r.rows[0].id;
}

async function getStudent(pool, id) {
  const r = await pool.query('SELECT name, grade FROM students WHERE id = $1', [id]);
  if (r.rows.length === 0) return null;
  return { name: r.rows[0].name, grade: parseFloat(r.rows[0].grade) };
}

async function averageGrade(pool) {
  const r = await pool.query('SELECT AVG(grade) AS avg FROM students');
  return r.rows[0].avg === null ? null : parseFloat(r.rows[0].avg);
}

module.exports = { createPool, addStudent, getStudent, averageGrade };
