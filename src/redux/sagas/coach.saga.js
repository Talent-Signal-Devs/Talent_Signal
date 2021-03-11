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

function* fetchCoachClients() {
    try {
        const response = yield axios.get('/api/coach/client')
        yield put({ type: 'SET_COACH_CLIENTS', payload: response.data})
    } catch(err) {
        console.log(error)
    }
}

function* coachSaga() {
    yield takeEvery('FETCH_COACH_PAYMENTS', fetchCoachPayments);
    yield takeEvery('FETCH_COACH_CLIENTS', fetchCoachClients)
}

export default coachSaga;