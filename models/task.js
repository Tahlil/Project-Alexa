const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'tasks.json'
);

const getTasksFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Task {
  constructor(title, description, startingTime, progress) {
    this.title = title;
    this.description = description;
    this.startingTime = startingTime;
    this.progress = progress;
  }

  save() {
    getTasksFromFile(tasks => {
      tasks.push(this);
      fs.writeFile(p, JSON.stringify(tasks), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getTasksFromFile(cb);
  }

  static updateProgress(newProgress) {
    getTasksFromFile(tasks => {
      for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].title === "Pulse") {
          let tempCopy = tasks[index];
          tempCopy.progress = newProgress;
          tasks[index] = {};
          tasks[index] = tempCopy;
          console.log(tasks);
        }
      }
      fs.writeFile(p, JSON.stringify(tasks), err => {
        console.log(err);
      });
    });
  }
};
