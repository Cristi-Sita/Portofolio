const axios = require("axios");
let flightsResponseData;
//
//Create a poll session with SkyScanner key for all flights with selected params (origin, destination, date, passangers, etc.)
//

// skyKey(example) = `d2b4f4d2-10ce-441a-bc10-fbb6f9bb0fe1`;

const flightsResponse = (skyKey) => {
    //Create GET method to obtain all SkyScanner data for flights search
    return axios({
        "method": "GET",
        "url": `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${skyKey}`,
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "b9c7c90ac5msh1d13934c747c5a9p1f4f81jsn20ae86b5fd64"
        }, "params": {
            "pageIndex": "0",
            "pageSize": "10"
        }
    })
        .then((response) => {
            flightsResponseData = response.data;
            // console.log(flightsResponseData);
            return flightsResponseData;
        })
        .catch((error) => {
            console.log("Pool was wrong.")
        })
};
//Export module
module.exports = flightsResponse;
