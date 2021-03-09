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
    console.error('error in csvSubmit:', error);
  }
}

function* payCoach(action){
    try{
        console.log('in payCoach with payload', action.payload)
        yield axios.put('/api/csv/pay', action.payload)
        yield put({type: 'GET'})
    } catch(error){
        console.error('there was a problem in payCoach')
    }
}


function* payoutSaga() {
  yield takeLatest('GET_PAYMENT', getPayoutDetails);
  yield takeLatest('PAY_COACH', payCoach);
}

export default payoutSaga;
