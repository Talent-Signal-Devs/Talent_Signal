const donutData = (state = [], action) => {
    switch (action.type) {
        case 'SET_DONUT_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default donutData