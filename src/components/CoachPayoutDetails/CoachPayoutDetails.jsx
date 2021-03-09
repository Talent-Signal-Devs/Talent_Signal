import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

function CoachPayoutDetails(props) {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Coach Payout Details');

  
  useEffect(() => {
    // get payment details for this month. Can get them with the page.id because this is the payment confirmation number
    dispatch({type: 'FETCH_COACH_PAYMENT_DETAILS', payload: page.id})
  }, [])
  console.log(`page id is ${page.id}`);
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default CoachPayoutDetails;
