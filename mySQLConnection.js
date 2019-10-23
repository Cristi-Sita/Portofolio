const mysql = require('mysql');
const express = require('express')
//
//MySQL data base connection (search, post, delete, modify)
//

const app = express()
const connectDataBase = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Naiceface19!',
        database: 'flightsearch'
    });
    connection.connect();

    app.use(express.json());

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
        connection.query("INSERT INTO flightsearch SET ?", req.body, function (error, results) {
            if (error) throw error;
            // console.log(results);
            res.json("results.insertID");
        });
    });

    app.put("/items/:id", function (req, res) {
        connection.query("UPDATE flightsearch SET ? WHERE id=?", [
            req.body,
            req.params.id
        ],
            function (error, results) {
                if (error) throw error;
                res.json()
            }
        );
    });

    app.delete("/items/:id", function (req, res) {
        connection.query("DELETE FROM flightsearch WHERE id=?", req.params.id,
            function (error, results) {
                if (error) throw error;
                res.json()
            }
        );
    });
};
connectDataBase();
module.exports = connectDataBase;
// app.listen(8080);