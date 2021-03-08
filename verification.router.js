require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio')
const client = new twilio(accountSid, authToken)


//SMS TEST
// client.messages.create({
//   body: 'Test from Node',
//   to: '+15634191418',
//   from: '+12567829813'
// })
// .then((message) => console.log(message.sid))
// .catch(err => {
//   console.log(err)
// })

//EMAIL TEST
client.verify
    .services('VAef954ff50685181185cb8c27ccccd58b')
    .verifications.create({ to: 'jordan.ashbacher@gmail.com', channel: 'email'})
    .then(verification => {
        console.log(verification.sid)
    })
    .catch(err => {
      console.log(err)
    })

// client.verify
//   .services('VAef954ff50685181185cb8c27ccccd58b')
//   .verificationChecks.create({ to: 'jordan.ashbacher@gmail.com', code: '270378'})
//   .then(verification_check => console.log(verification_check.status))
//   .catch(err => console.log(err))

/**
 * GET route template
 */
// router.get('/', (req, res) => {
//   // GET route code here
// });

// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   // POST route code here
// });

// module.exports = router;