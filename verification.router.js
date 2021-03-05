require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioClient = require('twilio')(accountSid, authToken)

twilioClient.verify
    .services('VAef954ff50685181185cb8c27ccccd58b')
    .verifications.create({ to: 'jordan.ashbacher@gmail.com', channel: 'email'})
    .then(verification => {
        console.log(verification.sid)
    })

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