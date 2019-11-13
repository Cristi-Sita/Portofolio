const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express()

const citySkyCodeReq = require("./findCitySkyCode"),
    skyKeySession = require("./flightSearchPost"),
    flightsSession = require("./flightSearchPoll"),
    predictedWheather = require("./predictedWheather");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '******', // your pass
    database: 'flightsearch'
});

connection.connect();

app.use(express.json());
app.use(cors());

let flightsData,
    // zone = "RO",
    // currency = "EUR",
    // lang = "en-US",
    // city = "Amsterdam",
    // inboundDate = "2019-10-20",  //  Examples of requested parameters for Skyscanner endpoint (these will be receive 
    // cabinClass = "economy",      //  from from)
    children = "0",
    infants = "0",                  //  Harcoded params, but this can be added on from
    groupPricing = "false";
// originPlace = "CLJ-sky",
// outboundDate = "2019-10-14",
// adults = "1";

//
// This function do all jobs with external API's
//

const flightsResponse = (zone, currency, lang, city, inboundDate, cabinClass, children, infants, groupPricing, originPlace,
    outboundDate, adults) => {

        // Request Skyscanner code for destination place

    return citySkyCodeReq(zone, currency, lang, city)
        .then((citySkyCode) => {
            destinationCode = citySkyCode.CityId;
            // console.log(destinationCode);
            return destinationCode;
        })
        //
        // With all Sky-code & needed params get a key for poll session 
        //
        .then(responseKey => skyKeySession(inboundDate, cabinClass, children, infants, groupPricing, zone, currency, lang,
            originPlace, destinationCode, outboundDate, adults)
            .then(skyKey => {
                keySession = skyKey;
                // console.log(keySession);
                return keySession;
            })
        )
        //   
        // Get flights data  based on previouse key  
        //
        .then(flightsResult => flightsSession(keySession)
            .then(flightsResponseData => {
                flightsData = flightsResponseData;
                console.log(flightsData.Query);
                return flightsData;
            })
        )
        .catch((error) => {
            console.log(error)
        })
};
//
// Async function to deal with rest of the work for which this api was made
//
const flights = async function detailedFlightsData(zone, currency, lang, city, inboundDate, cabinClass, children,
    infants, groupPricing, originPlace, outboundDate, adults, insertID) {

    const flightsDataResponse = await flightsResponse(zone, currency, lang, city, inboundDate, cabinClass, children,
        infants, groupPricing, originPlace, outboundDate, adults);

    let responseFlightsData = await flightsDataResponse;
    //
    // Obtain name from origin & destination locations (needed for more accuracy in Open Wheather API)
    //
    let originName = await responseFlightsData.Query.OriginPlace;
    let destinationName = responseFlightsData.Query.DestinationPlace;
    //
    // Call wheather module for both places (the purpose of this is only to inform users about 
    // what the weather might be like on the day of departure)
    //
    let wheatherOrigin = cityNameW(responseFlightsData.Places, originName);
    let wheatherDestination = cityNameW(responseFlightsData.Places, destinationName);

    // console.log({ wheatherOrigin, wheatherDestination });
    let wheathOrigin = await predictedWheather(wheatherOrigin);
    let wheathDestination = await predictedWheather(wheatherDestination);
    console.log(wheathOrigin.cnt);
    // console.log(wheathDestination);
    let insertData = JSON.stringify({
        responseFlightsData
    }),
        insertWhOrigin = JSON.stringify({
            wheathOrigin
        }),
        insertWhDestination = JSON.stringify({
            wheathDestination
        });
        //
        // All responses from API's are loaded in MySQL data base
        //
    connection.query('UPDATE flightsearch SET flightsData = ?, wheatherorigin = ?, wheatherdestination =? WHERE id = ?',
        [insertData, insertWhOrigin, insertWhDestination, insertID],
        function (err, result) {
            if (err) throw err;
            console.log(`Changed ${result.changedRows} row(s)`);
        });
    // console.log(responseFlightsData.Query);
    return responseFlightsData;
};
//
// This fct will find city name in Sky response (better handle with Open Wheather in diferent languages)
//
function cityNameW(locationArray, code) {
    if (code == 1780) return 'Constanta';
    const item = locationArray.find(item => {
        if (item.Id == code) {
            return true;
        };
    });

    // console.log({ item })

    if (item.Type == "City") return item.Name;
    return cityNameW(locationArray, item.ParentId)
};
//
// Get the last 5 entries in data base
//
app.get('/items', function (req, res) {
    connection.query('SELECT * FROM flightsearch ORDER BY id DESC LIMIT 5', function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.json(results);
        // console.log("Ok!");
    })
});
//
// Insert few of the params, from Front-end Form, into db & call the main function
//
app.post("/items", function (req, res) {
    // console.log(req.body);
    let items = req.body,
        insertItems = {
            origin: items.originPlace,
            destination: items.destinationPlace,
            outboundDate: items.outboundDate,
            inboundDate: items.inboundDate
        };
    connection.query("INSERT INTO flightsearch SET ?",
        insertItems,
        function (error, results) {
            if (error) throw error;
            let insertId = results.insertId;
            console.log(insertId, insertItems, items);
            res.json("results.insertID");
            let originCod = (elemn) => {
                let originPlace;
                if (elemn.originPlace === "Bucuresti") {
                    return originPlace = "OTP-sky"
                }
                else if (elemn.originPlace === "Cluj Napoca") { //
                    return "CLJ-sky"                            // Harcoded few options from my country
                }                                               // (Can bypass this but it's necessary to call findCitySkyCode
                else if (elemn.originPlace === "Constanta") {   // twice: one for origin & one for destination)
                    return originPlace = "CND-sky"              //
                }
                else if (elemn.originPlace === "Timisoara") {
                    return originPlace = "TSR-sky"
                };
                return originPlace;
            };
            let destination = (elemn) => {
                if (elemn.destinationPlace == 'Moscova') {
                    return 'Moscow'
                };
                if (elemn.destinationPlace == 'Londra') {
                    return 'London'
                };
                return elemn.destinationPlace
            };
            //
            // Prepare params received from Form & call async fct
            //
            let originPlace = originCod(items),
                city = destination(items),
                outboundDate = items.outboundDate,
                inboundDate = items.inboundDate,
                cabinClass = items.cabinClass,
                adults = items.adults,
                zone = items.country,
                currency = items.currency,
                lang = items.locale;

            // console.log(items);
            flights(zone, currency, lang, city, inboundDate, cabinClass, children,
                infants, groupPricing, originPlace, outboundDate, adults, insertId);

        });
});

app.put("/items/:id", function (req, res) {
    let updateItem = req.body;
    connection.query("UPDATE flightsearch SET ? WHERE id=?", [
        updateItem,                                             //
        req.params.id                                           // Update db (unused now maybe in the future)
    ],                                                          //
        function (error, res) {
            if (error) throw error;
            res.json()
        }
    );
});
//
// In case of error or incomplete response in db, from last search, delete this (request it's made automatic from
// front-end in case of error)
//
app.delete("/items/:id", function (req, res) {
    connection.query("DELETE FROM flightsearch WHERE id = LAST_INSERT_ID();",
        function (error, results) {
            if (error) throw error;
            res.json();
        }
    )
});

app.listen(8080);