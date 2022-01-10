const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoiZGVlcGVuZHJhMTgiLCJhIjoiY2tjYWdma3BzMWVuZDJ3bnhqdnBmbjhxNyJ9.gDjg-vefeUDRCyeRx3ijwA";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to the weather app", undefined);
        } else if (body.message || body.features.length == 0) {
            callback(
                "unable to find the location,try another location",
                undefined,
            );
        } else {
            const longitude = body.features[0].geometry.coordinates[0];
            const latitude = body.features[0].geometry.coordinates[1];
            const location = body.features[0].place_name;
            callback(undefined, { longitude, latitude, location });
        }
    });
};

module.exports = geocode;
