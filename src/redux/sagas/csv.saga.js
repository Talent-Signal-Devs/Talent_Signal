import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fires from manualPackage
function* csvSubmitManual(action) {
  try {
    console.log('in csvSumbitManual with', action.payload)
    yield axios.post('/api/csv', action.payload);
    yield put({type: 'GET_PAYMENT'})


  } catch (error) {
    console.log('error in csvSubmit:', error);
  }
}

function* csvSaga() {
  yield takeLatest('ADD_NEW_CSV_MANUAL', csvSubmitManual);
}

export default csvSaga;
