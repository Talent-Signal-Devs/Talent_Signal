import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AdminDashboard(props) {

  const dispatch = useDispatch()

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const coaches = useSelector((store) => store.adminCoachReducer);
  const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_COACHES' });
  }, []);

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AdminDashboard;
