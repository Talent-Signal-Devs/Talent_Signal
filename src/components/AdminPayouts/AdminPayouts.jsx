import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux'


function AdminPayouts() {

  const dispatch = useDispatch()

  const payout = useSelector((store) => store.payout);

  function dispatchGet() {
    dispatch({type: 'GET_PAYMENT'})
    console.log(payout)
  }


  return (
    <div>
      <h2>MADE IT</h2>
      <button onClick={()=>dispatchGet()}>GET STUFF</button>
    </div>
  );
}

export default AdminPayouts;
