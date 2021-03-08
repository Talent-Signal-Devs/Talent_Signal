import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function CoachPayoutDetails(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Coach Payout Details');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default CoachPayoutDetails;
