import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import ParseSpike from '../ParseSpike/ParseSpike'


function AdminPayouts() {

  //for now, this is our confirmation counter, just something to give us a "unique" number


  const dispatch = useDispatch()

  //holds data from DB on all payments not yet paid
  const payout = useSelector((store) => store.payout);

  //function that runs on button press. I want this to run after the CSV uploads, but it will require some async await stuff
  function dispatchGet() {
    dispatch({ type: 'GET_PAYMENT' })
    console.log(payout)
  }

  //paynow packages together all necessary info to be sent to the server when ted pays
  function payNow(userID, clientArray) {
    const newDate = new Date()
    const confirmationNumber = prompt('enter check number')
    if (confirmationNumber) {
      const payout = {
        user_id: userID,
        clients: clientArray,
        payout_date: newDate.toISOString(),
        confirmation_number: confirmationNumber
      }
      console.log(payout)
    dispatch({ type: 'PAY_COACH', payload: payout })
    }
  }


  return (

    <div>


      <h2>MADE IT</h2>
      <ParseSpike />
      <button onClick={() => dispatchGet()}>GET STUFF</button>
      <table>
        <thead>
          <tr>

            <td>Coach</td>
            <td>Amount Owed</td>
            <td>Pay?</td>
          </tr>
        </thead>
        <tbody>
          {payout.map((debt) => {
            return (
              <tr key={debt.user_id}>
                <td>{debt.full_name}</td>
                <td>{debt.total_owed}</td>
                <td><button onClick={() => payNow(debt.user_id, debt.clients)}>PAY NOW</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPayouts;
