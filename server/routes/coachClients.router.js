const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all client information for coach views
router.get('/', (req, res) => {
    const sqlText = `SELECT *, CONCAT("client".first_name, ' ', "client".last_name) AS "full_name" FROM "client" WHERE "user_id" = $1;`;
    pool.query(sqlText, [req.user.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting coaches clients for the coach', error);
        res.sendStatus(500);
    })
});


module.exports = router;
