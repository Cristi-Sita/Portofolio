const axios = require("axios");
let flightsResponseData;
//
// Create a poll session with SkyScanner key for all flights with selected params (origin, destination, date,
//passangers, etc.)
//

// skyKey(example) = `d2b4f4d2-10ce-441a-bc10-fbb6f9bb0fe1`;

const flightsResponse = (skyKey) => {

    if (skyKey === 'error') return flightsResponseData = 'error';

    //Create GET method to obtain all SkyScanner data for flights search

    return axios({
        "method": "GET",
        "url": `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${skyKey}`,
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "your.key"            
        }, "params": {
            "sortType": "price",
            "sortOrder": "asc",
            "pageIndex": "0",
            "pageSize": "10"
        }
    })
        .then((response) => {
            flightsResponseData = response.data;
            console.log(flightsResponseData.Status);
            return flightsResponseData;
        })                                              //
        .then((response) => {                           //For complet data must repeat "GET" until Status is 
            if (response.Status != "UpdatesComplete") { //UpdatesComplete
                return flightsResponse(skyKey);         //
            }
            flightsResponseData = response;
            console.log(response.Status, skyKey);
            return flightsResponseData;
        })
        .catch((error) => {
            console.log("Poll was wrong.", error.response);
            return flightsResponseData = 'error';
        });
};

//Exporting module

module.exports = flightsResponse;
