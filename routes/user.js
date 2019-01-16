const path = require('path');

const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

router.get('/', taskController.getIndex);

router.get('/tasks', taskController.getTasks);

router.get('/add-task', taskController.getAddProduct);

router.post('/add-task-to-file', taskController.postAddTask);
module.exports = router;
