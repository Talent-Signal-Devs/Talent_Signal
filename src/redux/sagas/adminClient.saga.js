import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";


function* fetchAdminClients() {
    try {
        const response = yield axios.get('/api/admin/client');
        yield put({type: 'SET_ADMIN_CLIENTS', payload: response.data});
    } catch (error) {
        console.log('error fetching clients for admin', error);
    }
}

function* adminSaga() {
    yield takeEvery('FETCH_ADMIN_CLIENTS', fetchAdminClients);
}

export default adminSaga;