const clientDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CLIENT_DETAILS':
            return action.payload;
        default: 
            return state;
    }
}

export default clientDetailsReducer;