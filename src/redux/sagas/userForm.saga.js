import axios from "axios"
import { takeEvery, put } from "redux-saga/effects"

function* addNewCoach(action) {
    try {
        yield axios.post(`/api/admin/newUser/coach`, action.payload)
        yield put({ type: 'FETCH_ADMIN_COACHES'})
    } catch(err) {
        console.log(err)
    }
}

function* addNewClient(action) {
    try {
        yield axios.post(`/api/admin/newUser/client`, action.payload)
        yield put({ type: 'FETCH_ADMIN_CLIENTS'})
    } catch(err) {
        console.log(err)
    }
}

function* userForm() {
    yield takeEvery( 'ADD_NEW_COACH', addNewCoach)
    yield takeEvery( 'ADD_NEW_CLIENT', addNewClient)
}

export default userForm