const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get route to get the client information for the admin
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT "client".*, "users".first_name AS "coach_first_name", "users".last_name AS "coach_last_name"
    FROM "client"
    JOIN "payments" ON "payments".contract_id = "client".contract_id
    JOIN "users" ON "users".id = "client".user_id
    GROUP BY "client".id, "users".first_name, "users".last_name;`;

    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error getting client information', error);
            res.sendStatus(500);
        })
});



router.get('/:id', rejectUnauthenticated, (req, res) => {

    const clientID = req.params.id;

    const sqlText = `SELECT "client".*, JSON_AGG("payments".*) payments, "users".first_name AS "coach_first_name", "users".last_name AS "coach_last_name"
    FROM "client"
    JOIN "payments" ON "payments".contract_id = "client".contract_id
    JOIN "users" ON "users".id = "client".user_id
    WHERE "client".id = $1
    GROUP BY "client".id, "users".first_name, "users".last_name;`;

    pool.query(sqlText, [clientID])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error getting client details', error);
            res.sendStatus(500);
        })
})

module.exports = router;
