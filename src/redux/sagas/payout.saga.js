import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//GETs all unpaid dues from DB
function* getPayoutDetails() {
  try {
    console.log('in getPayoutDetails ')
    const response = yield axios.get('/api/csv')
    console.log('server response getting payouts', response.data)
    //goes to payout reducer
    yield put({type: 'SET_PAYMENT', payload: response.data})

  } catch (error) {
    console.error('error in getPayoutDetails saga:', error);
  }
}

//GETs all completed payouts from Ted to Coaches
function* getPayoutsHistory() {
  try {
    console.log('in getPayoutsHistory')
    const response = yield axios.get('/api/admin/paymentshistory')
    console.log('server response getting payoutsHistory', response.data)
    //goes to payout reducer
    yield put({type: 'SET_PAYOUTS_HISTORY', payload: response.data})

  } catch (error) {
    console.error('error in getPayoutsHistory saga:', error);
  }
}
//GET details for a specific payment by check no.
function* seeFullPaymentDetails(action) {
  try {
    console.log('in seeFullPaymentDetails saga');
    const response = yield axios.get(`/api/admin/paymentshistory/${action.payload}`)
    console.log('server response getting payoutsHistory', response.data)
    //goes to payout reducer
    yield put({type: 'SET_PAYOUTS_HISTORY_DETAIL', payload: response.data})

  } catch (error) {
    console.error('error in getPayoutsHistory saga:', error);
  }
}



function* payCoach(action){
    try{
        console.log('in payCoach with payload', action.payload)
        yield axios.put('/api/csv/pay', action.payload)
        yield put({type: 'GET_PAYMENT'})
    } catch(error){
        console.error('there was a problem in payCoach saga:', error)
    }
}


function* payoutSaga() {
  yield takeLatest('SEE_FULL_PAYMENT_DETAILS', seeFullPaymentDetails)
  yield takeLatest('GET_PAYMENT', getPayoutDetails);
  yield takeLatest('GET_PAYOUTS_HISTORY', getPayoutsHistory)
  yield takeLatest('PAY_COACH', payCoach);
}

export default payoutSaga;
