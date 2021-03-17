const coachChart = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COACH_CHART':
            return action.payload;
        default:
            return state;
    }
}

export default coachChart;
