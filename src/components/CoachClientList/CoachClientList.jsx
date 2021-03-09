import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function CoachClientList(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Coach Client List');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default CoachClientList;
