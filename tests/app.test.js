const request = require('supertest');
const { app, startServer } = require('../src/index'); // Adjust path if needed

let server;

beforeAll(() => {
  server = startServer(); // Start the server before tests
});

afterAll(() => {
  server.close(); // Stop the server after tests
});

describe('Task Management API', () => {
  test('Should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'This is a test task', status: 'pending' });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });

  test('Should fetch all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Should return 404 for a non-existent task', async () => {
    const response = await request(app).get('/api/tasks/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Task not found');
  });

  test('Should update a task', async () => {
    const task = await request(app)
      .post('/api/tasks')
      .send({ title: 'Update Test', description: 'Update test task' });

    const updatedTask = await request(app)
      .put(`/api/tasks/${task.body.id}`)
      .send({ title: 'Updated Task Title' });
    
    expect(updatedTask.status).toBe(200);
    expect(updatedTask.body.title).toBe('Updated Task Title');
  });

  test('Should delete a task', async () => {
    const task = await request(app)
      .post('/api/tasks')
      .send({ title: 'Delete Test', description: 'Delete test task' });

    const response = await request(app).delete(`/api/tasks/${task.body.id}`);
    expect(response.status).toBe(204);
  });
});
