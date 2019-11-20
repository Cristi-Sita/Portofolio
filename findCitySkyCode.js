const axios = require("axios");
let citySkyCode;
// let zone = "RO",
//     currency = "EUR",
//     lang = "en-US",
//     city = "Rome";

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
            "x-rapidapi-key": "your.key"
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
            return citySkyCode = 'error'
        });
};
// findCitySkyCode(zone, currency, lang, city).then(() => console.log(citySkyCode));

//Export module
module.exports = findCitySkyCode;