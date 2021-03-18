const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get route to get the client information for the admin
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    // const sqlText = `SELECT "payments".payment_id, "payments".product_id, "payments".due_date, "payments".scheduled_date,
    //                  "payments".amount, "payments".payment_status, "payments".pending_date, "payments".complete_date, "payments".contract_id,
    //                  "payments".payment_fee, "payments".is_paid, "payments".confirmation_number, "payments".payout_date, "client".*,
    //                  "users".first_name AS "coach_first_name", "users".last_name AS "coach_last_name"
    //                  FROM "payments"
    //                  JOIN "client" ON "client".contract_id = "payments".contract_id
    //                  JOIN "users" ON "users".id = "client".user_id
    //                  ORDER BY "client".last_name;`;

    const sqlText = `SELECT STRING_AGG("payments".payment_id, '; '), "payments".contract_id, CONCAT("client".first_name, ' ', "client".last_name) AS "full_name",
    "client".*, CONCAT("users".first_name, ' ', "users".last_name) AS "coach_full_name",
    "users".first_name AS "coach_first_name", "users".last_name AS "coach_last_name"
    FROM "payments"
    RIGHT JOIN "client" ON "client".contract_id = "payments".contract_id
    JOIN "users" ON "users".id = "client".user_id
    GROUP BY payments.contract_id, client.id, users.first_name, users.last_name
    ORDER BY "client".last_name;`

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
    LEFT JOIN "payments" ON "payments".contract_id = "client".contract_id
    JOIN "users" ON "users".id = "client".user_id
    WHERE "client".id = $1
    GROUP BY "client".id, "users".first_name, "users".last_name;`;

    pool.query(sqlText, [clientID])
        .then((result) => {
        
          console.log('results are',result.rows);
          res.send(result.rows)
        })
        .catch((error) => {
            console.log('error getting client details', error);
            res.sendStatus(500);
        })
})

router.put('/edit', rejectUnauthenticated, (req, res) => {
    const query = `UPDATE client
                    SET first_name = $1, last_name = $2, email = $3, phone = $4, contract_id = $5, user_id = $6, contract_status = $7, coaching_status = $8
                    WHERE id = $9
                    RETURNING id`

    pool
    .query(query, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.contractID, req.body.coachID, req.body.contractStatus, req.body.coachingStatus, req.body.id])
    .then((response) => {
        console.log(response.rows)
        res.send(response.rows)

    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;
