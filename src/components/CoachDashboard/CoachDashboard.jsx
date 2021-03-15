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

import { DataGrid } from '@material-ui/data-grid';

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
  // function handleDetails(payoutDate){
  //   // dispatch here with confirmation # here. 
  //   let payoutMonthYear = payoutDate.substring(0,7)
  //   history.push({pathname: `/coach/payoutDetails/${payoutMonthYear}`})
    
  // }



  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_PAYMENTS' });
  }, [])

  const columns = [
    {
      field: 'payout_date',
      headerName: 'Payout Date',
      flex: 1,
      sort: true,
      description: 'Date that Talent Signal confirmed payment to coach'
    },
    {
      field: 'total_paid',
      headerName: 'Total Paid',
      flex: 1,
      sort: true,
      description: 'Total amount paid to coach by Talent Signal'
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='primary'
          onClick={()=> handleDetails(params)}
        >
          Details
        </Button>
      )
    }
  ]
  // push pathname with confirmation number
  function handleDetails(param){
    const number=param.row.confirmation_number
    history.push({pathname: `/coach/payoutDetails/${number}`})

  }

  return (
    <>
      <div>
        <h2>{heading}</h2>
      </div>
      <br />
      <br />
      {/* <div>
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
                    // onClick={() => handleDetails(payment.payout_date)}
                    >Details</Button></TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       
      </div> */}
      <div style={{ height: 600, width: '80%', display: 'flex' }}>
        <DataGrid
          rows={payments} columns={columns} pageSize={12} checkboxSelection={false} 
        >
        </DataGrid>
      </div>
    </>
  );
}

export default CoachDashboard;
