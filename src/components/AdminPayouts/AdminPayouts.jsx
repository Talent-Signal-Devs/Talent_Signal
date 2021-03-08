import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function AdminPayouts(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Admin Payouts');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AdminPayouts;
