import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function CoachClientDetails(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Coach Client Details');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default CoachClientDetails;
