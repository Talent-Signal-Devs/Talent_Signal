import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function AdminCoachList(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Admin Coach List');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AdminCoachList;
