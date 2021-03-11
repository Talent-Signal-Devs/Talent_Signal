const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET details for users who have paid Leif BUT for who coaches haven't been paid

//3/9 Do we want a query that also selects alt user statuses?
router.get('/', rejectUnauthenticated, (req, res) => {
  if (req.user.clearance === 1) {
    const queryText = `
  SELECT "user_id", CONCAT("users".first_name, ' ', "users".last_name) AS "full_name",
  SUM("amount") as "total_owed", ARRAY_AGG("payments".id) AS "clients" FROM  "users"
  JOIN "client" ON "users".id = "client".user_id
  JOIN "payments" ON "client".contract_id = "payments".contract_id
  WHERE "payment_status" = 'complete' AND "is_paid" = 'False'
  GROUP BY "full_name", "user_id";
  `
    pool.query(queryText).then((response) => {
      console.log(response);
      res.send(response.rows);
    }).catch((error) => {
      console.log('error getting payouts in csv.router')
      console.log(error);
      res.sendStatus(500);
    })
  }
  else {
    res.sendStatus(403)
  }

});


//route updating payments table, from unpaid to paid
//updates date paid, confirmation number, and boolean value

router.put('/pay', rejectUnauthenticated, async (req, res) => {
  //opens connection
  if (req.user.clearance === 1) {
    const connection = await pool.connect();
    try {

      const datePaid = req.body.date;
      const confirmationNumber = req.body.confirmation_number;

      let insert = await Promise.all(
        req.body.clients.map(async row => {
          const queryText = `
      UPDATE "payments"
      SET "payout_date" = $1, confirmation_number = $2, "is_paid" = NOT "is_paid"
      WHERE "id" = $3
  `
          await pool.query(queryText, [datePaid, confirmationNumber, row])
        }))
        console.log(insert)
      res.sendStatus(200)
    } catch (error) {
      //catches and logs errors
      console.error('error updating coach payments', error);
      res.sendStatus(500);
    }
    finally {
      //ends server connection
      connection.release();
    }
  }
  else {
    res.sendStatus(403)
  }
})

//route to post ALL the new CSV data
//updates data if the payment id already exists
//inserts if the payment ID isn't there already
router.post('/', rejectUnauthenticated, async (req, res) => {
  if (req.user.clearance == 1) {
    const connection = await pool.connect();
    try {
      const csv = req.body
      csv.shift()
      csv.pop()
      // console.log(csv)
      let insert = Promise.all(
      csv.map(async payment => {

        console.log(payment)

        let payment_id = payment.id
        let product_id = payment.product
        let due_date = payment.date
        let scheduled_date = payment.date_scheduled
        let amount = Number(payment.amount)
        let payment_status = payment.payment_status
        let pending_date = payment.pending_date
        let complete_date = payment.complete_date
        let contract_id = payment.contract_id
        let payment_fee = Number(payment.fee)

        const query = `INSERT INTO payments (payment_id, product_id, due_date, scheduled_date, amount, payment_status, pending_date, complete_date, contract_id, payment_fee)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    ON CONFLICT (payment_id)
                    DO
                      UPDATE SET product_id = $2, due_date = $3, scheduled_date = $4, amount = $5, payment_status = $6, pending_date = $7, complete_date = $8, contract_id = $9, payment_fee = $10`

        await pool
          .query(query, [payment_id, product_id, due_date, scheduled_date, amount, payment_status, pending_date, complete_date, contract_id, payment_fee])
      })
      )
      console.log(insert)
      res.sendStatus(200)
    } catch (error) {
      console.error('error parsing csv', error);
      res.sendStatus(500);
    }
    finally {
      connection.release();
    }
  }
  else {
    res.sendStatus(403)
  }

});

module.exports = router;
