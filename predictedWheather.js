const axios = require("axios");

const weatherForecast = (city) => {
    return axios({
        "method": "GET",
        "url": "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "b9c7c90ac5msh1d13934c747c5a9p1f4f81jsn20ae86b5fd64"
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
// weatherForecast("Cluj-Napoca,RO")
//     .then(() => console.log(predictedWheather));