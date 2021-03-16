const coachDonut = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COACH_DONUT':
            return action.payload;
        default:
            return state;
    }
}

export default coachDonut;
