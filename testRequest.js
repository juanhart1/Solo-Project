const request = require('request');

request('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=7EsSOT60Ecugt0lAwcD5oi7Gv2RZo9ko&q=neworleans', (err, response) => {
    if (err) console.log('pancakes');
    else {
        const parsedBody = JSON.parse(response.body);
        const locationKey = parsedBody[0].Key;
        return locationKey;
    }
})