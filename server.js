/**
 * Module dependencies.
 */
const express = require('express');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '.env'});

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

app.get('/projects', authenticate, getProjects);

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
