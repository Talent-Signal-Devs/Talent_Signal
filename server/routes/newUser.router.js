const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

router.post('/coach', async (req, res) => {
    console.log(req.body)

    const connection = await pool.connect()

    try {
        await connection.query('BEGIN;')
        const query = `INSERT INTO "users" (first_name, last_name, email, phone, start_date, business_name, program_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`

        await connection.query(query, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.startDate, req.body.business, req.body.programID])

        await connection.query('COMMIT;')

        client.verify
        .services('VAef954ff50685181185cb8c27ccccd58b')
        .verifications.create({ to: req.body.email, channel: 'email'})
        .then(verification => {
            console.log(verification.sid)
        })
        
        res.sendStatus(201)

    } catch(err) {
        console.log(err)
        await connection.query('ROLLBACK;')
        res.sendStatus(500)
    } finally {
        connection.release()
    }
    
})

router.post('/client', (req, res) => {
    console.log(req.body)
})

module.exports = router