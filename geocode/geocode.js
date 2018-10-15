const request = require('request');

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=X49B68O9Ab2W453JbXi1S8jC9AswBGP7&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to server.');
        }
        else if (body.info.statuscode !== 0) {
            callback('Invalid location specified')
        }
        else {
            raw_address = `${body.results[0].locations[0].street}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3}, ${body.results[0].locations[0].postalCode}, ${body.results[0].locations[0].adminArea1}`;
            formatted_address  = raw_address.replace(/^,/g, '').trim()
            callback(undefined, {
                address: formatted_address,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
    });

};

module.exports = {
    geocodeAddress
};

