const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-task', adminController.getAddTask);

// /admin/products => GET
router.get('/dashboard', adminController.getTasks);

// /admin/add-product => POST
router.post('/add-task-to-file', adminController.postAddTask);

module.exports = router;