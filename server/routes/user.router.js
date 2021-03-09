const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const email = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const code = req.body.code

  client.verify
    .services('VAef954ff50685181185cb8c27ccccd58b')
    .verificationChecks.create({ to: email, code: code })
    .then(verification_check => {
      if (verification_check.status === "approved") {
        const queryText = `UPDATE "users" 
                            SET password = $1, is_approved = $2
                            RETURNING id`;
        pool
          .query(queryText, [password, 'TRUE'])
          .then((results) => {
            console.log(results.rows)
            res.sendStatus(201)
          })
          .catch((err) => {
            console.log('User registration failed: ', err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log(err)
    })

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
