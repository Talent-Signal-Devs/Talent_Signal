const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
require('dotenv').config()
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN

const client = require('twilio')(accountSid, authToken)

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// router.post('/code', (req, res) => {
//   console.log('in code request router')
//   console.log(req.body.email)

//   client.verify
//         .services('VA3729f5257b25bacd7aff0b95c897c428')
//         .verifications.create({ to: 'jordan.ashbacher@gmail.com', channel: 'email'})
//         .then(verification => {
//             console.log(verification.sid)
//         })
// })

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  const email = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  // const code = req.body.code

  const connection = await pool.connect()

  try {
    await connection.query('BEGIN;')
    const query = `SELECT id FROM users
                    WHERE email = $1`

    const result = await connection.query(query, [email])

    if (result.rows[0].id > 0) {
      const queryText = `UPDATE "users" 
                          SET password = $1, is_approved = $2
                          WHERE email = $3
                          RETURNING id`;

      const result = await connection.query(queryText, [password, 'TRUE', email])
      await connection.query('COMMIT;')
      console.log(result.rows)
      res.sendStatus(201)
    }
  } catch(err) {
    console.log(err)
    await connection.query('ROLLBACK;')
    res.sendStatus(500)
  } finally {
    connection.release()
  }

});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
