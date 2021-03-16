
const payoutsHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PAYOUTS_HISTORY':
        let dataID = []
        let newID = 0;
        for(let object of action.payload){
            object.id = newID;
            object.payout_date = new Date(object.payout_date).toLocaleDateString();
            newID++;
            dataID.push(object)
        }
        return dataID;
      case 'SET_PAYOUTS_HISTORY_DETAIL':
        let details = []
        for(let object of action.payload){
            object.payout_date = new Date(object.payout_date).toLocaleDateString();
            details.push(object)
        }
        return action.payload;
      default:
        return state;
    }
  };

  // user will be on the redux state at:
  // state.user
  export default payoutsHistoryReducer;
