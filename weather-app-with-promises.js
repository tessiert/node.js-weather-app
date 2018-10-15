const yargs = require('yargs');
const axios = require('axios');

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

    var encodedAddress = encodeURIComponent(argv.address);
    var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=X49B68O9Ab2W453JbXi1S8jC9AswBGP7&location=${encodedAddress}`;

    axios.get(geocodeURL).then((response) => {
        if (response.data.info.statuscode !== 0) {
            throw new Error(message='Error:  Invalid Location specified');
        }

        var latitude = response.data.results[0].locations[0].latLng.lat
        var longitude = response.data.results[0].locations[0].latLng.lng
        var weatherURL = `https://api.darksky.net/forecast/b7e6ab1963787cc564ae9055b3b4b313/${latitude},${longitude}`
        
        raw_address = `${response.data.results[0].locations[0].street}, ${response.data.results[0].locations[0].adminArea5}, ${response.data.results[0].locations[0].adminArea3}, ${response.data.results[0].locations[0].postalCode}, ${response.data.results[0].locations[0].adminArea1}`;
        formatted_address  = raw_address.replace(/^,/g, '').trim()
        console.log(formatted_address);

        // Chain promises
        return axios.get(weatherURL);
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var feelsLike = response.data.currently.apparentTemperature;
        console.log(
            `It's currently ${temperature}, but feels like it's ${feelsLike}.`
            );
    }).catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Error:  Unable to connect to geolocation server.');
        }
        else {
            console.log(error.message);
        }
    });