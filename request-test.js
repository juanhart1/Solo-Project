const request = require('request');

let dailyForecast;

request('http://dataservice.accuweather.com/forecasts/v1/daily/1day/349727?apikey=7EsSOT60Ecugt0lAwcD5oi7Gv2RZo9ko&details=true', (err, response) => {
    if (err) console.log('pancakes');
    else {
        const parsedBody = JSON.parse(response.body);
        console.log(parsedBody.DailyForecasts[0].AirAndPollen);
    }
    dailyForecast = response;
});