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

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  dashContainer: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  pickerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '2rem'
  },
  buttonContainer: {
    marginLeft: '2rem'
  },
  root: {
    "& .MuiInputBase-input": {
        width: "25ch",
    },
    "& .MuiDataGrid-row": {
      cursor: 'pointer',
      color: '#333'
    },
    margin: "5px"
},
  container: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: '#0026FF',
    color: 'white',
  },
  cell: {
    align: 'center',
  }
}))

function CoachPayoutDetails(props) {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const payments = useSelector((store) => store.coachPaymentDetailsReducer);
  const [heading, setHeading] = useState('Coach Payout Details');

  const [monthDate, setMonthDate] = useState('');

  const columns = [
    {
      field: 'full_name',
      headerName: 'Client Name',
      flex: 1,
      sort: true,
      headerClassName: classes.header
    },
    {
      field: 'scheduled_date',
      headerName: 'Scheduled Date',
      flex: 1,
      sort: true,
      description: `Date the client's payment was scheduled`,
      headerClassName: classes.header
    },
    {
      field: 'payment_status',
      headerName: 'Payment Status',
      flex: 1,
      sort: true,
      description: `Status of the payment`,
      headerClassName: classes.header
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      sort: true,
      description: `Payment amount received by Talent Signal`,
      headerClassName: classes.header
    },
    {
      field: 'total_paid',
      headerName: 'Total Paid',
      flex: 1,
      sort: true,
      description: `Payment amount received by coach from Talent Signal`,
      headerClassName: classes.header
    },
  ]

  const handleClick = () => {
    console.log('dispatch with ', monthDate);
    dispatch({ type: 'FETCH_COACH_PAYMENT_DETAILS', payload: monthDate })
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
  console.log(typeof page.id)
  console.log(`selected value is now ${monthDate}`);

  const handleRowClick = (event) => {
    let userId = event.row.clientId;
    history.push(`/coach/clientDetails/${userId}`);

  }

  return (
    <div>
      <h2>{heading}</h2>
      <div className={classes.pickerContainer}>
        <TextField
          id="pick month"
          label="Month Picker"
          type="month"
          value={monthDate}
          onChange={(event) => setMonthDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}>
            Get my DATA!
          </Button>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className={classes.container}>
        {/* <h1>History:</h1> */}
        <div style={{  width: '85%', display: 'flex' }} className={classes.root, "center_table"}>
          <DataGrid rowHeight={40} autoHeight={true} rows={payments} columns={columns} pageSize={5} checkboxSelection={false} onRowClick={handleRowClick} />
        </div>
      </div>
    </div>
  );
}

export default CoachPayoutDetails;
