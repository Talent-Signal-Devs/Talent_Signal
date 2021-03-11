const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get route to get the client information for the admin
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT "payments".payment_id, "payments".product_id, "payments".due_date, "payments".scheduled_date, 
                     "payments".amount, "payments".payment_status, "payments".pending_date, "payments".complete_date, "payments".contract_id, 
                     "payments".payment_fee, "payments".is_paid, "payments".confirmation_number, "payments".payout_date, "client".*, 
                     "users".first_name AS "coach_first_name", "users".last_name AS "coach_last_name" 
                     FROM "payments"
                     RIGHT JOIN "client" ON "client".contract_id = "payments".contract_id
                     JOIN "users" ON "users".id = "client".user_id
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


router.get('/:id', rejectUnauthenticated, (req, res) => {

    const clientID = req.params.id;

    const sqlText = `SELECT "payments".payment_id, "payments".due_date, "payments".amount, "payments".payment_status,
                     "users".first_name AS "coach_first_name", "users".last_name AS "coach_last_name", "client".*
                     FROM "payments" 
                     JOIN "client" ON "client".contract_id = "payments".contract_id
                     JOIN "users" ON "users".id = "client".user_id
                     WHERE "client".id = $1;`;

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
