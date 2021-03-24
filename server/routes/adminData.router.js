const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get data for bar graphs in the current year. 
router.get('/chart', rejectUnauthenticated, (req, res) => {

  const date = new Date()
  const year = date.getFullYear()

  const query = `SELECT payments.due_date, SUM(payments.amount) AS total_amount FROM payments
    WHERE payments.payment_status = 'complete' AND payments.due_date LIKE '${year}%'
    GROUP BY payments.due_date
    ORDER BY payments.due_date`

  pool
    .query(query)
    .then((response) => {
      // console.log(response.rows)
      let amountArray = []
      for (total of response.rows) {
        amountArray.push(total.total_amount * .25)
      }
      // console.log(amountArray)
      res.send(amountArray)
    })
    .catch(err => {
      console.log(err)
    })
});

// get data for donut graphs in the current year.
router.get('/donut', rejectUnauthenticated, (req, res) => {
  const date = new Date()
  const year = date.getFullYear()

  const query = `SELECT payments.payment_status, COUNT(payments.payment_status) FROM payments
    WHERE payments.due_date LIKE '${year}%'
    GROUP BY payments.payment_status`

  pool.query(query)
    .then((response) => {
      // console.log(response.rows)
      let labels = []
      let data = []
      for (item of response.rows) {
        labels.push(item.payment_status)
        data.push(item.count)
      }
      // console.log(labels, data)
      res.send({ labels: labels, data: data })
    })
    .catch(err => {
      console.log(err)
    })
});

module.exports = router;