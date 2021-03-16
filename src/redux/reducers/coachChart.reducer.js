const coachChart = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHART_DATA_COACH':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default coachChart;
