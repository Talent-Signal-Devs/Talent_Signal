import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

function CoachPayoutDetails(props) {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Coach Payout Details');

  console.log(`page id is ${page.id}`);
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default CoachPayoutDetails;
