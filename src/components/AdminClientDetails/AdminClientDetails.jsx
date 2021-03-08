import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function AdminClientDetails(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Admin Client Details');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AdminClientDetails;
