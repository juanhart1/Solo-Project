const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const accuweatherController = require('../accuWeatherController.js');

app.use(bodyParser.urlencoded({ extended: true }));

//this is how I handle GET requests to my root directory
//takes 2x arguments
    //first arg is the route being requested by the client
    //second arg is a callback that takes in a request object parameter and a response object parameter
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile('/Users/juanhart1/Documents/CSNYC/week_5/solo_project/src/index.html');
});

app.post('/', accuweatherController.getLocationKey, accuweatherController.getEnvironmentals, (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(res.locals.environmentals);
});
//this is the port that my express application is listening on
app.listen(3000);