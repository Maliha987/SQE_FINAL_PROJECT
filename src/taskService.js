const mockDb = require('./mockDB');

const taskService = {
  getAllTasks: () => mockDb.getAll(),
  getTaskById: (id) => mockDb.getById(id),
  createTask: (title, description, status = 'pending') => {
    if (!title || !description) throw new Error('Title and description are required');
    return mockDb.create({ title, description, status });
  },
  updateTask: (id, updatedFields) => mockDb.update(id, updatedFields),
  deleteTask: (id) => mockDb.delete(id),
  searchTasks: (keyword) => mockDb.search(keyword),
};

module.exports = taskService;
