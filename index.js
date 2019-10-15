const express = require("express");
const axios = require("axios");
const mysql = require('mysql');

const app = express()

const citySkyCodeReq = require("./findCitySkyCode"),
    skyKeySession = require("./flightSearchPost"),
    flightsSession = require("./flightSearchPoll"),
    predictedWheather = require("./predictedWheather");
// mySQLCollection = require("./mySQLConnection");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Naiceface19!',
    database: 'flightsearch'
});
connection.connect();

app.use(express.json());


let flightsData,
    cityObject,
    zone = "RO",
    currency = "EUR",
    lang = "en-US",
    // city = "Amsterdam",
    // inboundDate = "2019-10-20",
    cabinClass = "economy",
    children = "0",
    infants = "0",
    groupPricing = "false",
    // originPlace = "CLJ-sky",
    // outboundDate = "2019-10-14",
    adults = "1";


const flightsResponse = (zone, currency, lang, city, inboundDate, cabinClass, children, infants, groupPricing, originPlace,
    outboundDate, adults) => {
    return citySkyCodeReq(zone, currency, lang, city)
        .then((citySkyCode) => {
            destinationCode = citySkyCode.CityId;
            // console.log(destinationCode);
            return destinationCode;
        })
        .then(responseKey => skyKeySession(inboundDate, cabinClass, children, infants, groupPricing, zone, currency, lang,
            originPlace, destinationCode, outboundDate, adults)
            .then(skyKey => {
                keySession = skyKey;
                // console.log(keySession);
                return keySession;
            })
        )
        .then(flightsResult => flightsSession(keySession)
            .then(flightsResponseData => {
                flightsData = flightsResponseData;
                // console.log(flightsData);
                return flightsData;
            })
        )
        .catch((error) => {
            console.log(error)
        })
};

async function detailedFlightsData(originPlace, city, inboundDate, outboundDate) {
    const flightsDataResponse = await flightsResponse(zone, currency, lang, city, inboundDate, cabinClass, children, infants, groupPricing,
        originPlace, outboundDate, adults);
    let responseFlightsData = await flightsDataResponse;
    let originName = await responseFlightsData.Query.OriginPlace;
    let destinationName = responseFlightsData.Query.DestinationPlace;
    let wheatherOrigin = await cityNameW(responseFlightsData.Places, originName);
    let wheatherDestination = cityNameW(responseFlightsData.Places, destinationName);
    console.log(await predictedWheather(wheatherOrigin));
    console.log(await predictedWheather(wheatherDestination), responseFlightsData.Query);
    // console.log(responseFlightsData.Places);
};

function cityNameW(locationArray, code) {
    locationArray.find(item => {
        if (item.Id == code) {
            if (item.Type == "City") {
                return cityObject = item;
            };
        };
        newId = item.ParentId;
        return item.Id == code;
    });
    // console.log(cityObject);
    if (cityObject == null) {
        locationArray.find(item => {
            if (item.Id == newId) {
                if (item.Type == "City") {
                    return cityObject = item;
                };
            };
            return item.Id == newId;
        });
    };
    return cityObject = (cityObject.Id == 1780) ? 'Constanta' : cityObject.Name;
};

app.get('/items', function (req, res) {
    connection.query('SELECT * FROM flightsearchdata', function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.json(results);
    });
});

app.post("/items", function (req, res) {
    connection.query("INSERT INTO flightsearchdata SET ?", req.body, function (error, results) {
        if (error) throw error;
        res.json("results.insertID");
        let items = req.body;

        let originCod = (items) => {
            if (items.origin == "Bucuresti") { return originPlace = "OTP-sky" };
            if (items.origin == "Cluj Napoca") { return originPlace = "CLJ-sky" };
            if (items.origin == "Constanta") { return originPlace = "CND-sky" };
            if (items.origin == "Timisoara") { return originPlace = "TSR-sky" };
            return originPlace;
        };
        let destination = (items) => {
            return items.destination == 'Moscova' ? 'Moscow' : items.destination;
        };

        let outboundDate = items.outboundDate;
        let inboundDate = items.inboundDate;

        console.log(items);
        detailedFlightsData(originCod(items), destination(items), inboundDate, outboundDate);
    });
});

app.put("/items/:id", function (req, res) {
    connection.query("UPDATE flightsearchdata SET ? WHERE id=?", [
        req.body,
        req.params.id
    ],
        function (error, res) {
            if (error) throw error;
            res.json()
        }
    );
});

app.delete("/items/:id", function (req, res) {
    connection.query("DELETE FROM flightsearchdata WHERE id=?", req.params.id,
        function (error, res) {
            if (error) throw error;
            res.json()
        }
    );
});


app.listen(8080);