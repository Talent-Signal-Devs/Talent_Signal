const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//write GET route to populate dropdown router for GET coaches
router.get('/dropdown', rejectUnauthenticated, (req, res) => {
    if(req.user.clearance === 1){
    console.log('in dropdown')
    const queryText = `
        SELECT * FROM "users"
        WHERE "users".clearance = 0;
    `
    pool.query(queryText).then((response)=>{
        console.log(response);
        res.send(response.rows)
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500)
    })
} else{
    res.sendStatus(403)
}
})


router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const sqlText = `SELECT DISTINCT "users".*, COUNT(DISTINCT "client") AS "client_count" FROM "users"
    LEFT JOIN "client" ON "client".user_id = "users".id
    WHERE "users".clearance = 0
    GROUP BY "users".id;`;

    // const sqlText = `SELECT "users".*, "client".*, "payouts".* FROM "users"
    // JOIN "client" ON "client".user_id = "users".id
    // JOIN "payouts" ON "payouts".user_id = "users".id
    // GROUP BY "client".id, "users".id, "payouts".id;`;

    // const sqlText = `SELECT * FROM users
    // WHERE clearance = 0
    // ORDER BY last_name;`

    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error getting coaches for admin', error);
            res.sendStatus(500);
        })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {

    const coach = req.params.id;

    const sqlText = `SELECT "users".*, JSON_AGG(DISTINCT "client".*) AS clients, JSON_AGG(DISTINCT "payments".*) AS payments
    FROM "users"
    LEFT JOIN "client" ON "client".user_id = "users".id
    LEFT JOIN "payments" ON "payments".contract_id = "client".contract_id
    WHERE "users".id = $1 
    GROUP BY "users".id`;
    // const sqlText = `SELECT "users".*, JSON_AGG(DISTINCT "client".*) AS clients
    // FROM "users"
    // LEFT JOIN "client" ON "client".user_id = "users".id
    // WHERE "users".id = $1
    // GROUP BY "users".id`;

    pool.query(sqlText, [coach])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error getting coach"s details', error);
            res.sendStatus(500);
        })
})

router.put('/edit', rejectUnauthenticated, (req, res) => {
    const query = `UPDATE users
                    SET first_name = $1, last_name = $2, email = $3, phone = $4, program_id = $5, start_date = $6, business_name = $7
                    WHERE id = $8
                    RETURNING id`

    pool
    .query(query, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.programID, req.body.start_date, req.body.business_name, req.body.id ])
    .then((response) => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log(err)
    })
})



module.exports = router;
