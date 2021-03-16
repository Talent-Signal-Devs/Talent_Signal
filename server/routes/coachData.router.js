const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//info lives at '/api/coach/data'
//router to get payment history
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  if(req.user.clearance === 0){
  console.log('in coachData router for DVIZ')
  
  }
  else{
      res.sendStatus(403)
  }
});

module.exports = router;
