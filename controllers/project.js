const Project = require('../models/Project');

exports.createProject = (user_id, cb) => {

    const project = new Project(); // Create a new project
    project.members.push(user_id); // Add the creator as the initial member

    project.save((err, project) => {
        return cb(err, project);
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

            existingProject.tasks.push(task);

            existingProject.save((err, project) => {
                return cb(err, project.tasks);
            });
        }
    });

}