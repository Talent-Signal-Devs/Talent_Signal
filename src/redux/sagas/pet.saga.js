import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';


// Get all users pets and save in redux
function* fetchPets() {
    try {
        //go and get pets
        //the cookie comes along automatically
        const response = yield axios.get('/api/pets');
        console.log(response.data)
        //save in pet reducer!
        yield put({type: 'SET_PETS', payload: response.data })

    } catch (err) {
        console.error(err)
    }
}

function* petSaga() {
    yield takeEvery('FETCH_PETS', fetchPets);
}

export default petSaga;

