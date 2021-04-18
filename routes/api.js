const express = require('express');
const router = express.Router();
const connect = require("../config/sqlConfig");

router.get("/", (req, res) => {
    //res.json = echo json_encode(...) in PHP
    res.json({message: "you hit the api route"});
});

router.get("/users", (req, res) => {
    //run a sql query here
    //res.json(query result here)
    //echo a message
    res.json({message: "all users route"});
})

router.get("/movies", (req, res) => {
    connect.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT * FROM tbl_movies', function (error, results) {
            // When done with the connection, release it so that someone else can use it in the pool
            connection.release();
       
            // Handle error after the release.
            if (error) throw error;
       
                
            res.json(results);
        });
    });
})

//dynamic route handler that can accept a parameter
router.get("/movies/:id", (req, res) => {
    
    connect.query(`SELECT * FROM tbl_movies WHERE movies_id=${req.params.id}`, function (error, results) {

        if (error) throw error;

        console.log("results:", results);

        res.json(results);
      });
})


module.exports = router;