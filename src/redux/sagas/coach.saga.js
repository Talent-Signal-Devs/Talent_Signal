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

//get coach payments when "details" button clicked on dashboard table
function* fetchCoachPaymentDetails(action){
  const confirmation_number=action.payload;
  try{
    const response = yield axios.get(`/api/coach/payments/${confirmation_number}`)
    yield put({type: 'SET_COACH_PAYMENT_DETAILS', payload: response.data})
  } catch(error){
    console.log('error in fetching client payment details', error);
  }
}

function* coachSaga() {
    yield takeEvery('FETCH_COACH_PAYMENTS', fetchCoachPayments);
    yield takeEvery('FETCH_COACH_PAYMENT_DETAILS', fetchCoachPaymentDetails);

}

export default coachSaga;