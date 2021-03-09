import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function AdminAddUser(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Admin Add User');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AdminAddUser;
