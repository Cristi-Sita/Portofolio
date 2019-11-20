const axios = require("axios");

const weatherForecast = (city) => {
    return axios({
        "method": "GET",
        "url": "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "your.key"
        }, "params": {
            "q": city,
            "cnt": "16",
            "units": "metric",
            "lang": "ro"
        }
    })
        .then((response) => {
            predictedWheather = response.data;
            return predictedWheather;
        })
        .catch((error) => {
            console.log(error)
        })
};
module.exports = weatherForecast;
