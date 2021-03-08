const adminClientReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_CLIENTS':
            return action.payload;
        
        default:
            return state;
    }
}

export default adminClientReducer;