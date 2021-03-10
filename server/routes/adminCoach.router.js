const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT "users".*, "client".*, "payouts".* FROM "user"
    JOIN "client" ON "client".user_id = "user".id
    JOIN "payouts" ON "payouts".user_id = "user".id
    GROUP BY "client".id, "user".id, "payouts".id;`;

    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting coaches for admin', error);
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
