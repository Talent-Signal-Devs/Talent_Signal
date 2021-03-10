import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';


function AdminCoachList(props) {
  
  const store = useSelector((store) => store.adminCoachReducer);
  const [heading, setHeading] = useState('Admin Coach List'); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_ADMIN_COACHES'});
  }, [])

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AdminCoachList;
