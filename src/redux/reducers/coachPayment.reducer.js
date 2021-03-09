const coachPaymentReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_COACH_PAYMENTS':
          return action.payload;
      
      default:
          return state;
  }
}

export default coachPaymentReducer;