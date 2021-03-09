const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get route to get the client information for the admin
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT "client".*, "payments".*, "user".first_name AS "coach_first_name", "user".last_name AS "coach_last_name" FROM "client"
                     JOIN "payments" ON "payments".contract_id = "client".contract_id
                     JOIN "user" ON "user".id = "client".user_id
                     ORDER BY "client".last_name;`;
    
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting client information', error);
        res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
