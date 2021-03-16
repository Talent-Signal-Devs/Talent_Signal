import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";


// get coach payments for coach dashboard table
function* fetchCoachPayments() {
    try {
        const response = yield axios.get('/api/coach/payments');
        yield put({type: 'SET_COACH_PAYMENTS', payload: response.data});
    } catch (error) {
        console.log('error fetching clients for admin', error);
    }
}

// get coach payments when "details" button clicked on dashboard table
function* fetchCoachPaymentDetailsNumber(action){
  const confirmation_number=action.payload;
  console.log('in paymentDetails Saga with ids',action.payload);
  try{
    const response = yield axios.get(`/api/coach/payments/${confirmation_number}`)
    yield put({type: 'SET_COACH_PAYMENT_DETAILS', payload: response.data})
  } catch(error){
    console.log('error in fetching client payment details, from dashboard', error);
  }
}



//get coach payments when select month/year input on payout details view
function* fetchCoachPaymentDetails(action){
  const date=action.payload;
  console.log('in fetchCoachParmentDetailsDate Saga');
  try{
    const response = yield axios.get(`/api/coach/payments/date/${date}`)
    yield put({type: 'SET_COACH_PAYMENT_DETAILS', payload: response.data})
  } catch(error){
    console.log('error in fetching client payment details with date', error);
  }
}

function* fetchCoachClients() {
    try {
        const response = yield axios.get('/api/coach/client')
        yield put({ type: 'SET_COACH_CLIENTS', payload: response.data})
    } catch(err) {
        console.log(error)
    }
}
//saga to get data for charts for coaches and their payment history
function* fetchCoachData() {
    try {
        console.log('in fetchCoachData')
        const response = yield axios.get('/api/coach/data')
        //sends data to chartData reducer
        yield put({ type: 'SET_CHART_DATA_COACH', payload: response.data})
    } catch(err) {
        console.log('error from fetchCoachData', error)
    }
}
//saga to get data for coaches and their history of statuses
function* fetchCoachDataHistory() {
    try {
        console.log('in fetchCoachDataHistory')
        const response = yield axios.get('/api/admin/paymentshistory/visual/graph')
        //sends data to chartData reducer
        yield put({ type: 'SET_CHART_DATA_COACH', payload: response.data})
    } catch(err) {
        console.log('error from fetchCoachData', err)
    }
}

function* coachSaga() {
    yield takeEvery('FETCH_COACH_PAYMENTS', fetchCoachPayments);
    yield takeEvery('FETCH_COACH_PAYMENT_DETAILS', fetchCoachPaymentDetails);
    yield takeEvery('FETCH_COACH_PAYMENT_DETAILS_NUMBER', fetchCoachPaymentDetailsNumber);
    yield takeEvery('FETCH_COACH_CLIENTS', fetchCoachClients);
    yield takeEvery('FETCH_COACH_DATA', fetchCoachData);
    yield takeEvery('FETCH_COACH_DATA_HISTORY', fetchCoachDataHistory);
}

export default coachSaga;
