const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { object } = require('prop-types');

// /api/admin/paymentshistory is base address
// gets record of all payments
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.user.clearance === 1) {
        const queryText = `
        SELECT "user_id", CONCAT("users".first_name, ' ', "users".last_name) AS "full_name",
        (SUM("amount") * .75 )as "total_paid", ARRAY_AGG("payments".id) AS "clients", "confirmation_number", "payout_date" FROM  "users"
        JOIN "client" ON "users".id = "client".user_id
        JOIN "payments" ON "client".contract_id = "payments".contract_id
        WHERE "payment_status" = 'complete' AND "is_paid" = 'True'
        GROUP BY "full_name", "user_id", "confirmation_number", "payout_date"
        ORDER BY "payout_date" DESC;
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


router.get(`/:confirmationNumber`, rejectUnauthenticated, (req, res)=>{
    if (req.user.clearance === 1){
        const params = [Number(req.params.confirmationNumber)]
        const queryText = `
            SELECT CONCAT("users".first_name, ' ', "users".last_name) AS "coach_name", CONCAT("client".first_name, ' ', "client".last_name) AS "client_name",
            "payments".amount * .75 AS "amount_paid", "payments".payout_date, "payments".id AS "id" FROM "users"
            JOIN "client" ON "users".id = "client".user_id
            JOIN "payments" ON "client".contract_id = "payments".contract_id
            WHERE "payments".confirmation_number = $1
            ORDER BY "payout_date" DESC;
        `
        pool.query(queryText, params).then((response)=>{
            console.log(response);
            res.send(response.rows)
        }).catch((error)=>{
            console.log('error getting details', error);
            res.sendStatus(500)
        })
    }
    else{
        res.sendStatus(403)
    }
})


//gets data for chart.js, if admin it gets everything. if coach, it gets data specific to coach
router.get('/visual/graph', rejectUnauthenticated, (req, res)=>{
    if(req.user.clearance === 1){
        console.log('in VISUAL server')
        const queryText = `
        SELECT "payments".payment_status, COUNT("payments".payment_status) FROM "payments"
        GROUP BY "payments".payment_status;
        `
        pool.query(queryText).then((response)=>{
            console.log(response.rows);
            let responseObject = arraySorter(response.rows)
            res.send(responseObject)
        }).catch((error)=>{
            console.log(error);
            res.sendStatus(500)
        })
    }
    if(req.user.clearance === 0){
        console.log('in as coach to visual')
        const coachID = [req.user.id]
        const queryText = `
        SELECT "payments".payment_status, COUNT("payments".payment_status) FROM "payments"
        JOIN "client" ON "payments".contract_id = "client".contract_id
        JOIN "users" ON "users".id = "client".user_id
        WHERE "users".id = $1
        GROUP BY "payments".payment_status;
        `
        pool.query(queryText, coachID).then((response)=>{
            console.log(response.rows)
            let coachResponseObject = arraySorter(response.rows)
            res.send(coachResponseObject)
        }).catch((error)=>{
            console.log('error with coach statuses', error);
            res.sendStatus(500)
        })

    }
    else{
        res.sendStatus(403)
    }
})

//function used in visual/graph to sort data from DB
function arraySorter(array){
    let status = []
    let counter = []
    for(let object of array){
        status.push(object.payment_status);
        counter.push(object.count)
    }
    return {statuses: status, counters: counter}
}


module.exports = router;
