import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fires from manualPackage
function* csvSubmitManual(action) {
  try {
    console.log('in csvSumbitManual with', action.payload)
    yield axios.post('/api/csv', action.payload);
    //JORDAN!! right now, this doesn't call because we don't get a response from the server
    //I think we'll need to use some async await stuff. But, once we send back a server response
    //this put will trigger automatically. for now, it will have to be triggered manually
    yield put({type: 'GET_PAYMENT'})


  } catch (error) {
    console.log('error in csvSubmit:', error);
  }
}

function* csvSaga() {
  yield takeLatest('ADD_NEW_CSV_MANUAL', csvSubmitManual);
}

export default csvSaga;
