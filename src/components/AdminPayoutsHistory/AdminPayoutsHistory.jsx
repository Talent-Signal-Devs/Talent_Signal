import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'

export default function AdminPayoutsHistory () {
    const payoutsHistory = useSelector(store=>store.payoutsHistory)

    return (
        <>
        <h1>payout history</h1>
        <table>
        <thead>
          <tr>

            <td>Coach</td>
            <td>Amount Paid</td>
            <td>Confirmation Number</td>
            <td>Date Payed</td>
          </tr>
        </thead>
        <tbody>
          {payoutsHistory.map((debt) => {
            return (
              <tr key={debt.user_id}>
                <td>{debt.full_name}</td>
                <td>{debt.total_owed * .75}</td>
                <td>{debt.confirmation_number}</td>
                <td>{new Date(debt.payout_date).toLocaleDateString()}</td>

              </tr>
            )
          })}
        </tbody>
      </table>
        </>
    )
}
