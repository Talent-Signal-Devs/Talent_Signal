import axios from "axios"
import { takeEvery, put } from "redux-saga/effects"

function* addNewCoach(action) {
    try {
        console.log(action.payload)
    } catch(err) {
        console.log(err)
    }
}

function* userForm() {
    yield takeEvery( 'ADD_NEW_COACH', addNewCoach)
}

export default userForm