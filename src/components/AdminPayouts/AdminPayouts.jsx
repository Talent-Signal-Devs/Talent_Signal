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

  function payNow(userID, clientArray) {

    const payout = {
      user_id: userID,
      clients: clientArray
    }
    console.log(payout)
    dispatch({type: 'PAY_COACH', payload: payout})
  }


  return (
    <div>
      <h2>MADE IT</h2>
      <button onClick={()=>dispatchGet()}>GET STUFF</button>
      <table>
        <thead>
          <tr>

              <td>Coach</td>
              <td>Amount Owed</td>
              <td>Pay?</td>
          </tr>
        </thead>
        <tbody>
          {payout.map((debt)=>{
            return(
              <tr key={debt.user_id_array[0]}>
              <td>{debt.full_name}</td>
              <td>{debt.total_owed}</td>
              <td><button onClick={()=>payNow(debt.user_id_array[0], debt.clients)}>PAY NOW</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPayouts;
