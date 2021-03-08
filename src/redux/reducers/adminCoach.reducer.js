const adminCoachReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_COACHES':
            return action.payload;
        
        default:
            return state;
    }
}

export default adminCoachReducer;