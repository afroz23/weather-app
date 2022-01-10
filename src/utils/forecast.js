const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const forecastUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=986ad8984eabe338173eff9bb1498dc3&units=metric`;
    request({ url: forecastUrl, json: true }, (error, { body } = {}) => {
        if (error) callback("unable to connect the weather app", undefined);
        else if (body.message)
            callback(
                "unable to detect this location please try another location",
                undefined,
            );
        else
            callback(
                undefined,
                `Clouds status: ${body.weather[0].description}, and the temperature of location is: ${body.main.temp}°C and Humidity is: ${body.main.humidity}% , and Min Temp: ${body.main.temp_min}°C, and Max temp: ${body.main.temp_max}°C`,
            );
    });
};

module.exports = forecast;
