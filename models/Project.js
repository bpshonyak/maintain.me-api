const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

  members: Array,
  tasks: Array

}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
