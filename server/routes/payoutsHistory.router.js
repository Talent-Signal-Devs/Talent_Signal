const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// /api/admin/paymentshistory is base address

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.user.clearance === 1) {
        const queryText = `
        SELECT "user_id", CONCAT("users".first_name, ' ', "users".last_name) AS "full_name",
        SUM("amount") as "total_owed", ARRAY_AGG("payments".id) AS "clients", "confirmation_number", "payout_date", "payments".id FROM  "users"
        JOIN "client" ON "users".id = "client".user_id
        JOIN "payments" ON "client".contract_id = "payments".contract_id
        WHERE "payment_status" = 'complete' AND "is_paid" = 'True'
        GROUP BY "full_name", "user_id", "confirmation_number", "payout_date", "payments".id;
        `
        pool.query(queryText).then((response)=>{
            console.log(response);
            res.send(response.rows);
        }).catch((error)=>{
            console.log('error getting history:', error);
            res.sendStatus(500)
        })

    }
    // GET route code here
    else {
        res.sendStatus(403)
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
