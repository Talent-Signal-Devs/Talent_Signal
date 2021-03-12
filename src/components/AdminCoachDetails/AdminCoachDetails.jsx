import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ToolTip from '@material-ui/core/ToolTip';
import { makeStyles } from '@material-ui/core/styles';

function AdminCoachDetails(props) {

  const coachDetails = useSelector((store) => store.coachDetailsReducer);
  const [heading, setHeading] = useState('Admin Coach Details');
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_COACH_DETAILS', payload: params.id });
  }, [])

  // variable to store the total money made for the coach
  let totalMoneyMade = [];
  // variable to store the values of the "amounts" in the payments table for each client   
  let totalPayout = [];
  let moneyMade = 0;

  if (coachDetails.first_name) {
    for (let payment of coachDetails.payments) {
      totalPayout.push(payment.amount)
    }
    for (let i = 0; i < totalPayout.length; i++) {
      moneyMade += parseInt(totalPayout[i]);
    }      
    totalMoneyMade.push(moneyMade);

  }

  // total money that the coach has brought in for the company
  let totalRevenue = totalMoneyMade[0] * 0.25;

  return (
    <div>
      <h2>{heading}</h2>
      {coachDetails.first_name && (
        <>
          <div>
            <h2>{coachDetails.first_name} {coachDetails.last_name}</h2>
            <h3>{coachDetails.email}</h3>
            <h3>{coachDetails.phone}</h3>
            <h3>Total Payouts: ${totalMoneyMade}</h3>
            <h3>Total Revenue: ${totalRevenue}</h3>
          </div>
          <div>
            <h3>Client's:</h3>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Contract ID</TableCell>
                    <TableCell>Coaching Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coachDetails.clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.first_name} {client.last_name}</TableCell>
                      <TableCell>{client.contract_id}</TableCell>
                      <TableCell>{client.coaching_status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )

      }
    </div>
  )
}

export default AdminCoachDetails;
