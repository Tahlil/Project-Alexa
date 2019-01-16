const Task = require('../models/task');

exports.getTasks = (req, res, next) => {
  Task.fetchAll(tasks => {
    res.render('task/task-list', {
      tasks: tasks,
      pageTitle: 'Dashboard',
      path: '/tasks'
    });
  });
};

exports.getIndex = (req, res, next) => {
    res.render('task/home', {
      pageTitle: 'TaskMonitor',
      path: '/'
    });
};

exports.getAddTask = (req, res, next) => {
  res.render('task/add-task', {
    pageTitle: 'Add Task',
    path: '/add-task'
  });
};

exports.postAddTask = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const description = req.body.description;
  const today = new Date();
  const staringTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ", " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const progress = 0;
  const task = new Task(title, description, staringTime, progress);
  task.save();
  res.redirect('/tasks');
};

exports.updateProgress = (req, res, next) => {
  console.log("Start updating");
  console.log(req.body);
  Task.updateProgress(req.body.progress);
  // res.redirect('/');
};