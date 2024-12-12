let tasks = []; // In-memory mock database
let nextId = 1; // Auto-increment ID for tasks

const mockDb = {
  getAll: () => tasks,
  getById: (id) => tasks.find((task) => task.id === id),
  create: (task) => {
    const newTask = { id: nextId++, ...task };
    tasks.push(newTask);
    return newTask;
  },
  update: (id, updatedFields) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return null;

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedFields };
    return tasks[taskIndex];
  },
  delete: (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return false;

    tasks.splice(taskIndex, 1);
    return true;
  },
  search: (keyword) => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(keyword.toLowerCase()) ||
        task.description.toLowerCase().includes(keyword.toLowerCase())
    );
  },
  reset: () => {
    tasks = [];
    nextId = 1;
  },
};

module.exports = mockDb;
