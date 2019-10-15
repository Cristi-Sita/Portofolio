const axios = require("axios");
let citySkyCode;
// let zone = "RO",
//     currency = "EUR",
//     lang = "en-US",
//     city = "Roma";

//
//Find city code or airport used in SkyScanners API.
//

const findCitySkyCode = (zone, currency, lang, city) => {
    const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${zone}/${currency}/${lang}/`;
    //Create GET method to obtain SkyScanner code from the real city name.
    return axios({
        "method": "GET",
        "url": url,
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "b9c7c90ac5msh1d13934c747c5a9p1f4f81jsn20ae86b5fd64"
        }, "params": {
            "query": city
        }
    })
        .then((response) => {
            citySkyCodes = response.data
            citySkyCode = (citySkyCodes) => {
                return citySkyCode = (citySkyCodes.Places[0].CityId === "-sky") ? citySkyCodes.Places[1] : citySkyCodes.Places[0];
            };
            citySkyCode(citySkyCodes);
            // console.log(citySkyCode);
            return citySkyCode;
        })
        .catch((error) => {
            console.log("Wrong city name.")
        });
};
// findCitySkyCode(zone, currency, lang, city).then(() => console.log(citySkyCode));
//Export module
module.exports = findCitySkyCode;