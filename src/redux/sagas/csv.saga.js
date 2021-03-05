import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fires from manualPackage
function* csvSubmitManual(action) {
  try {
    console.log('in csvSubmitManual with', action.payload)


  } catch (error) {
    console.log('error in csvSubmit:', error);
  }
}
//fires from autoPackage
function* csvSubmitAuto(action) {
  try {
    console.log('in csvSubmitAuto with:', action.payload)

  } catch (error) {
    console.log('error in csvSubmit:', error);
  }
}

function* csvSaga() {
  yield takeLatest('ADD_NEW_CSV_AUTO', csvSubmitAuto);
  yield takeLatest('ADD_NEW_CSV_MANUAL', csvSubmitManual);
}

export default csvSaga;
