const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT "payouts".*, "user".* FROM "payouts"
                     JOIN "user" ON "user".id = "payouts".user_id
                     ORDER BY "user".last_name;`;
    
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting coaches payouts', error);
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
