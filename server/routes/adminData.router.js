const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {

    const date = new Date()
    const year = date.getFullYear()
  
    const query = `SELECT payments.due_date, SUM(payments.amount) AS total_amount FROM payments
    WHERE payments.payment_status = 'complete' AND payments.due_date LIKE '${year}%'
    GROUP BY payments.due_date
    ORDER BY payments.due_date`

    pool
    .query(query)
    .then((response) => {
        console.log(response.rows)
        let amountArray = []
        for (total of response.rows){
            amountArray.push(total.total_amount)
        }
        console.log(amountArray)
        res.send(amountArray)
    })
    .catch(err => {
        console.log(err)
    })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;