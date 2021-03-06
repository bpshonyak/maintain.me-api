const crypto = require('crypto');

const Project = require('../models/Project');

exports.createProject = (user_id, cb) => {

    const project = new Project(); // Create a new project
    project.members.push(user_id); // Add the creator as the initial member

    project.save((err, project) => {
        return cb(err, project);
    });

}

exports.getTasks = (project_id, cb) => {

    Project.findOne({ _id: project_id }, (err, existingProject) => {

        if (err)
            return cb(err);

        if (!existingProject) {

            var err = {
                  msg: 'Project could not be found.',
                  status: 500
            }

            return cb(err);

        } else {
            return cb(null, existingProject.tasks);
        }
    });

}

exports.addTask = (project_id, task, cb) => {

    Project.findOne({ _id: project_id }, (err, existingProject) => {

        if (err)
            return cb(err);

        if (!existingProject) {

            var err = {
                  msg: 'Project could not be found.',
                  status: 500
            }

            return cb(err);

        } else {

            task.id = 't' + crypto.randomBytes(20).toString('hex');

            existingProject.tasks.push(task);

            existingProject.save((err, project) => {
                return cb(err, project.tasks);
            });
        }
    });

}

exports.deleteTask = (project_id, task_id, cb) => {

    Project.findOne({ _id: project_id }, (err, existingProject) => {

        if (err)
            return cb(err);

        if (!existingProject) {

            var err = {
                  msg: 'Project could not be found.',
                  status: 500
            }

            return cb(err);

        } else {

            var taskIndex = existingProject.tasks.findIndex(function (task) {
                return task.id === task_id;
            });

            if (taskIndex === -1) {
                var err = {
                      msg: 'Task not found.',
                      status: 500
                }

                return cb(err);
            }

            existingProject.tasks.splice(taskIndex, 1);

            existingProject.save((err, project) => {
                return cb(err, project.tasks);
            });
        }
    });

}

exports.updateTask = (project_id, task, cb) => {

    Project.findOne({ _id: project_id }, (err, existingProject) => {

        if (err)
            return cb(err);

        if (!existingProject) {

            var err = {
                  msg: 'Project could not be found.',
                  status: 500
            }

            return cb(err);

        } else {

            var taskIndex = existingProject.tasks.findIndex(function (oldTask) {
                return oldTask.id === task.id;
            });

            if (taskIndex === -1) {
                var err = {
                      msg: 'Task not found.',
                      status: 500
                }

                return cb(err);
            }


            existingProject.tasks[taskIndex] = task;

            existingProject.save((err, project) => {
                return cb(err, project.tasks);
            });
        }
    });

}
