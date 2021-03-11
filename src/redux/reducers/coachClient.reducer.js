const coachClientReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COACH_CLIENTS':
            return action.payload;
        
        default:
            return state;
    }
}

export default coachClientReducer;