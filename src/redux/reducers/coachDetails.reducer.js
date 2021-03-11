const coachDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COACH_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default coachDetailsReducer;