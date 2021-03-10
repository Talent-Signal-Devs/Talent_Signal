const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT "users".*, COUNT("client") AS "client_count", "payments".product_id FROM "users"
    JOIN "client" ON "client".user_id = "users".id
    JOIN "payments" ON "payments".contract_id = "client".contract_id
    WHERE "users".clearance = 0
    GROUP BY "users".id, "payments".product_id;`;

    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting coaches for admin', error);
        res.sendStatus(500);
    })
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
    const coach = req.params.id;

    const sqlText = `UPDATE "users" SET "is_approved" = NOT "is_approved" WHERE "id" = $1;`;

    pool.query(sqlText, [coach])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error changing coach"s registration status', error);
        res.sendStatus(500);
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const coach = req.params.id;

    const sqlText = `DELETE FROM "users" WHERE "id" = $1;`;

    pool.query(sqlText, [coach])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error deleting coach', error);
        res.sendStatus(500);
    })
})

module.exports = router;
