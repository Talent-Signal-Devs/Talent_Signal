const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// get payments for a coach based with the user_id and if it has been paid yet. 
// the amount refers to total payment received. the coach only receives 75% of this. 
// In this data, we will also receive the confirmation number which we can use to get the details for that month. 
// for the monthly breakdown, select * from payments with the confirmation id. and also some stuff to get the client info up there as well. 
router.get('/', (req, res) => {
    const sqlText = `SELECT "payments".payout_date, SUM("amount" * 0.75) as "total_paid", ARRAY_AGG("payments".id), "payments".confirmation_number FROM "payments"
    JOIN "client" ON "client".contract_id = "payments".contract_id
    JOIN "users" ON "client".user_id = "users".id
    WHERE "client".user_id = $1 and "payments".is_paid = true
    GROUP BY "payments".payout_date , "payments".confirmation_number;`;

    pool.query(sqlText, [req.user.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting coaches payments for dashboard', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;