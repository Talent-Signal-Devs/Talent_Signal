import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

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
    width: '50vw',
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



function CoachDashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const payments = useSelector((store) => store.coachPaymentReducer);
  const [heading, setHeading] = useState('Coach Dashboard');
  
  // Details button routes to project details with the confirmation number for the get request
  function handleDetails(confirmation_number){
    history.push({pathname: `/coach/payoutDetails/${confirmation_number}`})
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_PAYMENTS' });
  }, [])


  return (
    <>
      <div>
        <h2>{heading}</h2>
      </div>
      <br />
      <br />
      <div>
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} 
                // onClick={() => handleRowClick(payment.confirmation_number)} 
                className={classes.tableRow}>
                  <TableCell>{payment.payout_date}</TableCell>
                  <TableCell>{payment.total_paid}</TableCell>
                  <TableCell><Button 
                    variant="contained"
                    color="primary"
                    onClick={() => handleDetails(payment.confirmation_number)}>Details</Button></TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
      </div>
    </>
  );
}

export default CoachDashboard;
