import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//GETs all unpaid dues from DB
function* getPayoutDetails() {
  try {
    console.log('in getPayoutDetails DO YOU WORK!!')
    const response = yield axios.get('/api/csv')
    console.log('server response getting payouts', response.data)
    //goes to payout reducer
    yield put({type: 'SET_PAYMENT', payload: response.data})

  } catch (error) {
    console.log('error in csvSubmit:', error);
  }
}

function* payoutSaga() {
  yield takeLatest('GET_PAYMENT', getPayoutDetails);
}

export default payoutSaga;
