const { createPool, addStudent, getStudent, averageGrade } = require('./students');

let pool;

beforeAll(() => { pool = createPool(); });
beforeEach(async () => { await pool.query('TRUNCATE students RESTART IDENTITY'); });
afterAll(async () => { await pool.end(); });

test('ajout et lecture', async () => {
  const id = await addStudent(pool, 'Amel', 15);
  expect(await getStudent(pool, id)).toEqual({ name: 'Amel', grade: 15 });
});

test('etudiant inexistant', async () => {
  expect(await getStudent(pool, 999)).toBeNull();
});

test('moyenne', async () => {
  await addStudent(pool, 'Amel', 10);
  await addStudent(pool, 'Karim', 14);
  expect(await averageGrade(pool)).toBe(12);
});
