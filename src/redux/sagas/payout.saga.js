import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fires from manualPackage
function* getPayoutDetails() {
  try {
    console.log('in csvSumbitManual with', action.payload)
    yield axios.get('/api/csv')
    const response = yield put({type: 'SET_PAYMENT', payload: response.data})

  } catch (error) {
    console.log('error in csvSubmit:', error);
  }
}

function* payoutSaga() {
  yield takeLatest('GET_PAYMENT', getPayoutDetails);
}

export default payoutSaga;
