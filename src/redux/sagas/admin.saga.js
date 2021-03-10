import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";


function* fetchAdminClients() {
    try {
        const response = yield axios.get('/api/admin/client');
        yield put({ type: 'SET_ADMIN_CLIENTS', payload: response.data });
    } catch (error) {
        console.log('error fetching clients for admin', error);
    }
}

function* fetchAdminCoaches() {
    try {
        const response = yield axios.get('/api/admin/coach');
        yield put({ type: 'SET_ADMIN_COACHES', payload: response.data });
    } catch (error) {
        console.log('error fetching coaches for admin', error);
    }
}

function* getClientDetails(action) {
    try {
        const client = action.payload;
        console.log(client)
        const response = yield axios.get(`/api/admin/client/${client}`);
        yield put({ type: 'SET_CLIENT_DETAILS', payload: response.data[0] })
    } catch (error) {
        console.log('error getting client details', error);
    }
}

function* toggleApprove(action) {
    try {
        const coach = action.payload;
        yield axios.put(`/api/admin/coach/${coach}`);
        yield put({ type: 'FETCH_ADMIN_COACHES' });
    } catch (error) {
        console.log('error changing coach"s registration status', error);
    }
}

function* deleteCoach(action) {
    try {
        const coach = action.payload;
        yield axios.delete(`/api/admin/coach/${coach}`);
        yield put({ type: 'FETCH_ADMIN_COACHES' });
    } catch (error) {
        console.log('error deleting coach', error);
    }
}
function* adminSaga() {
    yield takeEvery('FETCH_ADMIN_CLIENTS', fetchAdminClients);
    yield takeEvery('FETCH_ADMIN_COACHES', fetchAdminCoaches);
    yield takeEvery('GET_CLIENT_DETAILS', getClientDetails);
    yield takeEvery('TOGGLE_APPROVE', toggleApprove);
    yield takeEvery('DELETE_COACH', deleteCoach);
}

export default adminSaga;