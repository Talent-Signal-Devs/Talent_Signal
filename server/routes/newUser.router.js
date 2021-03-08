const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.post('/coach', (req, res) => {
    console.log(req.body)
})

router.post('/client', (req, res) => {
    console.log(req.body)
})

module.exports = router