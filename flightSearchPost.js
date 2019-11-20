const axios = require("axios");
const querystring = require('querystring');
//
//Send all required data at SkyScanners POST API to obtain a necessary key for search flights with requested params (origin,
// destination, date, passangers, etc.)
//

const keySkyFlights = (inboundDate, cabinClass, children, infants, groupPricing, country, currency, lang,
    originPlace, destinationPlace, outboundDate, adults) => {

    if (destinationPlace === 'error') return keySkyFlights = 'error';

    //Create POST method with all params to obtain SkyScanner key

    return axios({
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "your.key"
        },
        data: querystring.stringify({
            "inboundDate": inboundDate,
            "cabinClass": cabinClass,
            "children": children,
            "infants": infants,
            "groupPricing": groupPricing,
            "country": country,
            "currency": currency,
            "locale": lang,
            "originPlace": originPlace,
            "destinationPlace": destinationPlace,
            "outboundDate": outboundDate,
            "adults": adults
        }),
        url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0"
    })
        .then((response) => {
            const skyKeyArray = response.headers.location.split("/");
            skyKey = skyKeyArray[skyKeyArray.length - 1];
            console.log(response.status, skyKey)
            return skyKey;
        })
        .catch((error) => {
            console.log("Post was wrong", error.response.statusText, destinationPlace);
            return skyKey = 'error';
        });
};
//Export module
module.exports = keySkyFlights;