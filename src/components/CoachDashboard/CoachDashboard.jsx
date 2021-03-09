import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function CoachDashboard(props) {
  const dispatch = useDispatch();

  const coachPayments = useSelector((store) => store.coachPaymentReducer);
  const [heading, setHeading] = useState('Coach Dashboard');

  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_PAYMENTS' });
  }, [])

  
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default CoachDashboard;
