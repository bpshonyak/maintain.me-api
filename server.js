/**
 * Module dependencies.
 */
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '.env'});

/**
 * Controllers
 */
 const projectController = require('./controllers/project');

/**
 * JWT Authentication
 */
const authenticate = expressJwt({secret: process.env.SECRET});

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/**
 * Express configuration.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * API routes.
 */

app.get('/', function(req, res) {
    res.status(200).json({API: 'MAINTAIN.ME-API'});
});

// Project Routes
app.get('/project/create', authenticate, function(req, res) {

  var token = req.headers['authorization'].replace('bearer ', '');

  try {

    var decoded = jwt.verify(token, process.env.SECRET);

    projectController.createProject(decoded.id, function (err, project) {
      if(err)
        res.json(err);

      res.json(project);
    });

  } catch(err) {
    res.json(err);
  }

});

// Task Routes
app.post('/task/add', authenticate, function(req, res) {

  //TODO: Add task validation!

  var project_id = req.body.project_id;
  var task = req.body.task;

  projectController.addTask(project_id, task, function (err, tasks) {
    if(err)
      res.json(err);

    res.json(tasks);
  });

});

/**
 * Helper Funtions
 */

function getProjects(req, res) {
    res.json({
        'PurpleTree': {
            members: ['alex', 'tim', 'sarah']
        },
        'Swurveys': {
            members: ['bogdan', 'preston']
        }
    });
}

app.listen(3003, function () {
  console.log('Server listening on port 3003!');
});
