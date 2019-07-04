const request = require('request');
const breathe_easyDB = require('./postgresql-raw');
const locationAPI = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ilOxdjYC1k8CIyAZ8rrFQLtmeGEClZZc&q=chicago`;
const forecastAPI = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/348308?apikey=ilOxdjYC1k8CIyAZ8rrFQLtmeGEClZZc&details=true`

//accuWeatherController is the object containing 2x methods that deal with accessing the accuweather API
const accuWeatherController = {
    //getLocationKey method is what takes user inputted city and queries the accuweather API to get the locationKey associated with that city
    getLocationKey: (req, res, next) => {
        //request is where I sent a GET request to the accuweather api
        //I added my apikey to the url string as a parameter
        //I also tried adding a template literal to dynamically insert city inputted by client
        //didn't work
        //takes 2x arguments
        //url to query
        //callback
        //callbacks takes an err that will be present if query is unsuccessful
        //returns information if successful
        request(locationAPI, (err, response) => {
            //if request unsuccessful, will execute code in conditional
            if (err) throw new Error(err);
            //else, it was successful and we execute code in conditional
            else {
                //this is us parsing the response.body we get back from the API
                const parsedBody = JSON.parse(response.body);
                //this is us accessing that parsed response.body, which is an array
                //I go inside the object stored at the 0 index and pull out the Key, which is the location key
                const locationKey = parsedBody[0].Key;
                //I add a property named locationKey to the res.locals object and assign it the value of the location key returned from accuweather API
                res.locals.locationKey = locationKey;
                //I add a property named city to the res.locals object and assign it the value of the 'chicago'
                //this is just hard-coded for proof of concept
                res.locals.city = 'chicago';
                return next();
            }
        })
    },
    getEnvironmentals: (req, res, next) => {
        //request is where I sent a GET request to the accuweather api
        //I added my apikey to the url string as a parameter
        //I also tried adding a template literal to dynamically insert city inputted by client
        //didn't work
        //takes 2x arguments
        //url to query
        //callback
        //callbacks takes an err that will be present if query is unsuccessful
        //returns information if successful
        request(forecastAPI, (err, response) => {
            if (err) console.log('waffles');
            else {
                //this is us parsing the response.body we get back from the API
                const parsedBody = JSON.parse(response.body);
                //this is me grabbing all necessary info out of that parsedBody
                const environmentals = parsedBody.DailyForecasts[0].AirAndPollen;
                //figure out a way to iterate over the environmentals array of object
                //this variable stores the city I'm getting the forecase for
                const {city} = res.locals;
                //added property to res.locals named environmentals that stores the environmentals returned from the
                res.locals.environmentals = environmentals;
                environmentals.forEach(environmental => {
                    //destructue each element that I've got access to
                    //pull out the name, value, category value, & category
                    const {Name, Value, Category, CategoryValue} = environmental;
                    //created a queryObject to pass to my query method on my database object
                    //text property is where I store my SQL query to insert info into the db
                    //values property is where I specify the information to be inserted
                    let queryObject = {
                        text: 'INSERT INTO forecastForCities (city, Name, Value, Category, CategoryValue) Values($1, $2, $3, $4, $5)',
                        values: [city, Name, Value, Category, CategoryValue]
                    };
                    //breathe_easyDB is a promise that will return a reference to my db if I successfully connect to it
                    //it's availble as the argument passed to the callback that I pass to .then
                    breathe_easyDB.then(database => {
                        //database has a query method that will perform SQL queries to the db
                        database.query(queryObject, (err, result) => {
                            //if unsuccessful query, err will be present
                            if (err) throw new Error(err);
                            //if successful query, invoke next piece of middleware
                            next();
                        })
                    })
                })
            }
        })
    }
};

module.exports = accuWeatherController;