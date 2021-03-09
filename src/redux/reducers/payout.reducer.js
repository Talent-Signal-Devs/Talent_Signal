//connected to payout saga
const payoutReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PAYMENT':
            console.log('in payoutReducer with', action.payload)
            return action.payload;

        default:
            return state;
    }
}

export default payoutReducer;
