const express = require('express');
const taskService = require('./taskService');

const router = express.Router();

router.get('/tasks', (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
});

router.get('/tasks/:id', (req, res) => {
  const task = taskService.getTaskById(parseInt(req.params.id, 10));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.post('/tasks', (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = taskService.createTask(title, description, status);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/tasks/:id', (req, res) => {
  const updatedTask = taskService.updateTask(parseInt(req.params.id, 10), req.body);
  if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
  res.json(updatedTask);
});

router.delete('/tasks/:id', (req, res) => {
  const success = taskService.deleteTask(parseInt(req.params.id, 10));
  if (!success) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

module.exports = router;
