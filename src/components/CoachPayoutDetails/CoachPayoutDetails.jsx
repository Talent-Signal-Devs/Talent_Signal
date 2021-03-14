import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  tableRow: {
    backgroundColor: 'aliceblue',
    '&:hover': {
      opacity: '80%',
      backgroundColor: 'lightblue'
    }
  },
  table: {
    minWidth: '100px',
    width: '90vw',
    margin: 'auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
  },
  dashContainer: {
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  }
}))

function CoachPayoutDetails(props) {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const payments = useSelector((store) => store.coachPaymentDetailsReducer);
  const [heading, setHeading] = useState('Coach Payout Details');

  const [monthDate, setMonthDate] =useState('');

  const handleClick = () => {
    console.log('dispatch with ', monthDate);
    dispatch({type: 'FETCH_COACH_PAYMENT_DETAILS', payload: monthDate})
  }

  useEffect(() => {
    // If arrived via navbar, the page.id will = payments. Just sit here and wait for user to select a month. 
    if (page.id == 'payments') {
      console.log('Do nothing and select the dropdown month selector');
    }
    // get payment details for this month. Can get them with the page.id because this is the payment confirmation number from the Dashboard
    else {
      dispatch({ type: 'FETCH_COACH_PAYMENT_DETAILS_NUMBER', payload: page.id })
    }
  }, [])
  console.log(`page id is ${page.id}`);
  console.log(`selected value is now ${monthDate}`);
  return (
    <div>
      <TextField
        id="pick month"
        label="Month Picker"
        type="month"
        value={monthDate}
        onChange={(event)=>setMonthDate(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button 
        variant="contained"
        color="primary"
        onClick={handleClick}>
        Get my DATA!
      </Button>
      <h2>{heading}</h2>
      <br></br>
      <br></br>
      <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client Name</TableCell>
                <TableCell>Scheduled Date</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Total Paid</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} 
                // onClick={() => handleRowClick(payment.confirmation_number)} 
                className={classes.tableRow}>
                  <TableCell>{payment.full_name}</TableCell>
                  <TableCell>{payment.scheduled_date}</TableCell>
                  <TableCell>{payment.payment_status}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.total_paid}</TableCell>
                  <TableCell><Button 
                    variant="contained"
                    color="primary"
                    // onClick={() => handleDetails(payment.payout_date)}
                    >Details</Button></TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}

export default CoachPayoutDetails;
