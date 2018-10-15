const request = require('request');

getWeather = (latitude, longitude, callback) => {

    request({
        url: `https://api.darksky.net/forecast/b7e6ab1963787cc564ae9055b3b4b313/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature
            });
        }
        else {
            callback('Unable to fetch weather forecast');
        }
    }); 
};

module.exports = {
    getWeather
};

