const coachPaymentDetailsReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_COACH_PAYMENT_DETAILS':
          return action.payload;
      
      default:
          return state;
  }
}

export default coachPaymentDetailsReducer;