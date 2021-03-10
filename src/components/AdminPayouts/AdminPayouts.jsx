import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import './AdminPayouts.css'



function AdminPayouts() {

  const dispatch = useDispatch()
  const history = useHistory();

  //holds data from DB on all payments not yet paid
  const coachPayouts = useSelector((store) => store.payout);

  //modal
  const [visible, setVisible] = useState(false)
  const [check, setCheck] = useState('')
  const [payout, setPayout] = useState({})


  //paynow packages together all necessary info to be sent to the server when ted pays
  function preparePayout(userID, clientArray) {
    setVisible(true)
    const newDate = new Date()
      setPayout({
        user_id: userID,
        clients: clientArray,
        payout_date: newDate.toISOString(),
        confirmation_number: check
      })
      console.log(payout)
  }

  function submitPayout(){
    console.log('in submit with payout so far', payout)
    setVisible(false)

    dispatch({ type: 'PAY_COACH', payload: payout })
  }

  useEffect(()=>{
    setTimeout(dispatch({ type: 'GET_PAYMENT' }), 300);
  }, [])

  return (

    <div>
      <button onClick={()=>history.push('/admin/upload')}>Upload</button>
      {visible?
      <div className="modal">
          <input
            type="text"
            value={payout.confirmation_number}
            onChange={(event)=>setPayout({...payout, confirmation_number: event.target.value})}
            placeholder='check number'>
            </input>
            <button onClick={()=>submitPayout()}>Submit</button>
      </div> : <span></span>}

      {/* placeholder button for manual GET if list  doesn't load*/}
      <button onClick={() => dispatch({ type: 'GET_PAYMENT' })}>Refresh List</button>
      <table>
        <thead>
          <tr>

            <td>Coach</td>
            <td>Amount Owed</td>
            <td>Pay?</td>
          </tr>
        </thead>
        <tbody>
          {coachPayouts.map((debt) => {
            return (
              <tr key={debt.user_id}>
                <td>{debt.full_name}</td>
                <td>{debt.total_owed}</td>
                <td><button onClick={() => preparePayout(debt.user_id, debt.clients)}>PAY NOW</button></td>

              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  );
}

export default AdminPayouts;
