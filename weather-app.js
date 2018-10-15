const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {
            demand: true,
            describe: 'Address of desired weather forecast',
            string: true
        }
    })
    .help()
    .alias('a', 'address')
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, geoResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    }
    else {
        console.log(geoResults.address);
        weather.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            }
            else {
                console.log(
                    `It's currently ${weatherResults.temperature}, but feels like it's ${weatherResults.feelsLike}.`
                    );
            }
        });
    }
});



