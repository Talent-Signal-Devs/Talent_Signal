import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

function CoachPayoutDetails(props) {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Coach Payout Details');

  const [monthDate, setMonthDate] =useState('');

  const handleClick = () => {
    console.log('dispatch with ', monthDate);
    dispatch({type: 'FETCH_COACH_PAYMENT_DETAILS', payload: monthDate})
  }

  useEffect(() => {
    // If arrived via navbar, the page.id will = payments. Just sit here and wait for user to select a month. 
    if (page.id == 'payments') {
      console.log('Do nothing and select the dropdown month selector');
    }
    // get payment details for this month. Can get them with the page.id because this is the payment confirmation number from the Dashboard
    else {
      dispatch({ type: 'FETCH_COACH_PAYMENT_DETAILS', payload: page.id })
    }
  }, [])
  console.log(`page id is ${page.id}`);
  console.log(`selected value is now ${monthDate}`);
  return (
    <div>
      <TextField
        id="pick month"
        label="Month Picker"
        type="month"
        value={monthDate}
        onChange={(event)=>setMonthDate(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClick}>
        Get my DATA!
      </Button>
      <h2>{heading}</h2>
    </div>
  );
}

export default CoachPayoutDetails;
