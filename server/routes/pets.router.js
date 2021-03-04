const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js')

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    console.log('/pet GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    //need to be logged in
    if(req.isAuthenticated()) {
        //get only pets for use who is logged in
        let queryText = `SELECT * FROM "pets" WHERE "user_id" = $1`;
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }


});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('/pet POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    const queryText = `
        INSERT INTO "pets" ("name", "user_id")
        VALUES ($1, $2)`

    pool.query(queryText, [req.body.name, req.user.id])
    
    res.sendStatus(200);
    
});

module.exports = router;