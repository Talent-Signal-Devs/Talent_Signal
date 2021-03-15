const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const csvRouter = require('./routes/csv.router');
const adminClientRouter = require('./routes/adminClient.router');
const adminCoachRouter = require('./routes/adminCoach.router');
const newUserRouter = require('./routes/newUser.router')
const adminPaymentRouter = require('./routes/adminPayment.router');
const coachPaymentsRouter = require('./routes/coachPayments.router');
const payoutsHistoryRouter = require('./routes/payoutsHistory.router');
const coachClientRouter = require('./routes/coachClients.router')
const adminDataRouter = require('./routes/adminData.router')



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/csv', csvRouter);
app.use('/api/admin/client', adminClientRouter);
app.use('/api/admin/coach', adminCoachRouter);
app.use('/api/admin/newUser', newUserRouter)
app.use('/api/admin/payment', adminPaymentRouter);
app.use('/api/coach/payments', coachPaymentsRouter);
app.use('/api/admin/paymentshistory', payoutsHistoryRouter);
app.use('/api/coach/client', coachClientRouter)
app.use('/api/admin/data', adminDataRouter)



// Serve static files
app.use(express.static('build'));
app.use(bodyParser.json({limit: '500kb'}));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


module.exports = app;
