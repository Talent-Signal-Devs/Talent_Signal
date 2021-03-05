const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
  // GET route code here
});


router.post('/', rejectUnauthenticated, async (req, res) => {
  // POST route code here
});

module.exports = router;