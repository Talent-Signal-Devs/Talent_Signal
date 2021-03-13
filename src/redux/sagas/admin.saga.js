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
        console.log(response.data)
        yield put({ type: 'SET_CLIENT_DETAILS', payload: response.data[0] })
    } catch (error) {
        console.log('error getting client details', error);
    }
}

function* getCoachDetails(action) {
    try {
        const coach = action.payload;
        const response = yield axios.get(`/api/admin/coach/${coach}`);
        yield put({type: 'SET_COACH_DETAILS', payload: response.data[0]});
    } catch (error) {
        console.log('error getting coach"s details', error);
    }
}

function* updateClientDetails(action) {
    try {
        const response = yield axios.put(`/api/admin/client/edit`, action.payload)
        console.log(response.data)
        yield put({ type: 'GET_CLIENT_DETAILS', payload: response.data[0].id})
    } catch(err) {
        console.log(err)
    }
}



function* adminSaga() {
    yield takeEvery('FETCH_ADMIN_CLIENTS', fetchAdminClients);
    yield takeEvery('FETCH_ADMIN_COACHES', fetchAdminCoaches);
    yield takeEvery('GET_CLIENT_DETAILS', getClientDetails);
    yield takeEvery('GET_COACH_DETAILS', getCoachDetails);
    yield takeEvery('UPDATE_CLIENT_DETAILS', updateClientDetails)
}

export default adminSaga;