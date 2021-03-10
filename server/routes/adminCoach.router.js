const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    // const sqlText = `SELECT "users".*, "client".*, "payouts".* FROM "users"
    // JOIN "client" ON "client".user_id = "users".id
    // JOIN "payouts" ON "payouts".user_id = "users".id
    // GROUP BY "client".id, "users".id, "payouts".id;`;
    
    const sqlText = `SELECT * FROM users
    WHERE clearance = 0
    ORDER BY last_name;`

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
