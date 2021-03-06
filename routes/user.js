const path = require('path');

const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

router.get('/', taskController.getIndex);

router.get('/tasks', taskController.getTasks);

router.get('/add-task', taskController.getAddTask);

router.post('/add-task-to-file', taskController.postAddTask);

router.post('/updateProgress', taskController.updateProgress);
module.exports = router;
