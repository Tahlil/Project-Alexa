const Task = require('../models/task');
exports.getAddTask = (req, res, next) => {
  res.render('admin/add-task', {
    pageTitle: 'Add Product Admin',
    path: '/admin/add-product'
  });
};

exports.postAddTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const today = new Date();
  const staringTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ", " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const progress = 0;
  const task = new Task(title, description, staringTime, progress);
  task.save();
  res.redirect('/tasks');
};

exports.getTasks = (req, res, next) => {
  Task.fetchAll( tasks => {
    res.render('admin/tasks', {
      tasks: tasks,
      pageTitle: 'Admin Dashboard',
      path: '/admin/dashboard'
    });
  });
};