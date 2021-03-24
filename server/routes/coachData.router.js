const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// get coach data and payment history for charts 
router.get('/', rejectUnauthenticated, (req, res) => {

  if (req.user.clearance === 0) {
    const queryText = `
            SELECT SUM("payments".amount * .75), "payments".payout_date FROM "payments"
            JOIN "client" ON "payments".contract_id = "client".contract_id
            JOIN "users" ON "client".user_id = "users".id
            WHERE "users".id = $1
            GROUP BY "payments".payout_date
            ORDER BY "payments".payout_date ASC
            LIMIT 12;
            `
    pool.query(queryText, [req.user.id]).then((response) => {

      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let label = []
      let sum = []
      let incomplete
      //this block takes the time stamp, converts it to a number, then compares it against an array of months
      //if a payment hasn't been completed/if it's been cancelled, it's bundled as a null
      for (let object of response.rows) {
        if (object.payout_date) {
          let date = new Date(object.payout_date).getMonth();
          // console.log('date', date)
          label.push(months[date])
          sum.push(object.sum)
        }
        else {
          incomplete = object.sum
        }
      }
      res.send({ labels: label, sums: sum, incomplete: incomplete })
    })
  }
  else {
    res.sendStatus(403)
  }
});

module.exports = router;
