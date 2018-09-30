'use strict'; // homework

// Initialize dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: '.env'});

// Initialize development dependencies
if (process.env.ENVIRONMENT === 'development') {
    const morgan = require('morgan');
    const cors = require('cors');
}

const app = express(); //app is express application

// JSON Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    useNewUrlParser: true
}).then(function(response) {
    console.log('Successfully connected to the database');
}).catch(function(error) {
    console.log('Error connecting to the database', error.message);
    process.exit();
});

// Define root route
app.get('/', function(req, res) {
    res.status(200).send('this is root');
});

app.get('/:name', function(req, res) {
    res.status(200).send('Name is ' + req.params.name);
});

app.get('/:name/:age/:gendre', function(req, res) {
    // res.write('Name is ' + req.params.name + '.\n');
    // res.write('Age is ' + req.params.age + '.');
    // res.end();
    // res.status(200).send('Name is ' + req.params.name + '. ' + '<br> Age is: ' + req.params.age);
    const input_params = req.params;

    const data = {
        name: input_params.name,
        age: input_params.age
    };

    res.status(200).json(data);
});

// Set running port
app.set('port', process.env.EXPRESS_PORT || 3000);

// Start the server
const server = app.listen(app.get('port'),process.env.EXPRESS_HOST, function() {
    console.log(`Server is running ON ${server.address().address}:${server.address().port}`);
});


