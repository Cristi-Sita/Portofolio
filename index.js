const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

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
app.use(cors());

let flightsData,
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
                console.log(flightsData.Query);
                return flightsData;
            })
        )
        // .then(() => console.log(flightsData.Status))
        .catch((error) => {
            console.log(error)
        })
};

const flights = async function detailedFlightsData(originPlace, city, inboundDate, outboundDate, insertID) {

    const flightsDataResponse = await flightsResponse(zone, currency, lang, city, inboundDate, cabinClass, children,
        infants, groupPricing, originPlace, outboundDate, adults);

    let responseFlightsData = await flightsDataResponse;
    let originName = await responseFlightsData.Query.OriginPlace;
    let destinationName = responseFlightsData.Query.DestinationPlace;
    let wheatherOrigin = cityNameW(responseFlightsData.Places, originName);
    let wheatherDestination = cityNameW(responseFlightsData.Places, destinationName);

    // console.log({ wheatherOrigin, wheatherDestination });

    console.log(await predictedWheather(wheatherOrigin));
    console.log(await predictedWheather(wheatherDestination));

    let insertData = JSON.stringify({
        responseFlightsData
    });
    connection.query('UPDATE flightsearch SET flightsData = ? WHERE id = ?', [insertData, insertID],
        function (err, result) {
            if (err) throw err;
            console.log(`Changed ${result.changedRows} row(s)`);
        });
    // console.log(responseFlightsData.Query);
    return responseFlightsData;
};

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

app.get('/items', function (req, res) {
    connection.query('SELECT * FROM flightsearch', function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.json(results);
    });
});

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
            console.log(insertId, insertItems);
            res.json("results.insertID");
            let originCod = (items) => {
                if (items.originPlace == "Bucuresti") {
                    return originPlace = "OTP-sky"
                };
                if (items.originPlace == "Cluj Napoca") {
                    return "CLJ-sky"
                };
                if (items.originPlace == "Constanta") {
                    return originPlace = "CND-sky"
                };
                if (items.originPlace == "Timisoara") {
                    return originPlace = "TSR-sky"
                };
                return originPlace;
            };
            let destination = (items) => {
                if (items.destinationPlace == 'Moscova') {
                    return 'Moscow'
                };
                if (items.destinationPlace == 'Londra') {
                    return 'London'
                };
                return items.destinationPlace
            };

            let outboundDate = items.outboundDate;
            let inboundDate = items.inboundDate;

            // console.log(items);
            flights(originCod(items), destination(items), inboundDate, outboundDate, insertId);

        });
});

app.put("/items/:id", function (req, res) {
    let updateItem = req.body;
    connection.query("UPDATE flightsearch SET ? WHERE id=?", [
        // req.body,
        updateItem,
        req.params.id
    ],
        function (error, res) {
            if (error) throw error;
            res.json()
        }
    );
});

app.delete("/items/:id", function (req, res) {
    connection.query("DELETE FROM flightsearch WHERE id=?", req.params.id,
        function (error, res) {
            if (error) throw error;
            res.json("results.deletedID")
        }
    );
});


app.listen(8080);