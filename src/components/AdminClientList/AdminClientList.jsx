import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function AdminClientList(props) {

  const clients = useSelector((store) => store.adminClientReducer);
  const [heading, setHeading] = useState('Admin Client List');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_CLIENTS' });
  })

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AdminClientList;
