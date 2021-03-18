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
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
  header: {
    backgroundColor: '#0026FF',
    color: 'white',
  },
}))


function CoachClientDetails(props) {
  const classes = useStyles();
  const clientDetails = useSelector((store) => store.clientDetailsReducer);
  const [heading, setHeading] = useState('Coach Client Details');
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_CLIENT_DETAILS', payload: params.id });
  }, [])

  // variable to store the total money made for the coach
  let totalMoneyMade = [];
  // variable to store the values of the "amounts" in the payments table for each client   
  let totalPayout = [];
  let moneyMade = 0;

  if (clientDetails?.payments) {
    for (let payment of clientDetails.payments) {
      totalPayout.push(payment?.amount)
    }
    for (let i = 0; i < totalPayout.length; i++) {
      moneyMade += parseInt(totalPayout[i]);
    }
    totalMoneyMade.push(moneyMade);
  }

  // console.log(clientDetails.payments !== [null])

  // total money that the coach has brought in for the company
  let totalRevenue = totalMoneyMade[0] * 0.75;



  const columns = [
    {
      field: 'payment_id',
      headerName: 'Payment ID',
      flex: 1.5,
      sort: true,
      headerClassName: classes.header
    },
    {
      field: 'due_date',
      headerName: 'Due Date',
      flex: 1,
      sort: true,
      description: `Date the client's payment is due`,
      // valueFormatter: (params) => params.value.getFullYear(),
      // valueFormatter: (params: ValueFormatterParams) => (params.value as Date).getFullYear(),
      valueFormatter: (params) => new Date(params.value).toLocaleDateString("en-us"),
      type: 'date',
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
      headerName: 'Total Payment',
      flex: 1,
      sort: true,
      valueFormatter: (params) => (params.value.toFixed(2)),
      description: `Payment amount received by Talent Signal from job seeker`,
      headerClassName: classes.header
    },
    {
      field: 'total_paid',
      headerName: 'Payment Received',
      valueGetter: getTotalPaid,
      flex: 1,
      sort: true,
      description: `Payment amount received by coach from Talent Signal`,
      headerClassName: classes.header
    },
  ]

  //handles the value for 'total_paid' column
  function getTotalPaid(params) {
    let total = params.getValue('amount') * 0.75;
    let totalToFixed = total.toFixed(2);
    return totalToFixed;
  }

  return (
    <div>
      <h2>{heading}</h2>

      {clientDetails.first_name && (
        <>
          <div>
            <h2>{clientDetails.first_name} {clientDetails.last_name}</h2>
            <h3>{clientDetails.email}</h3>
            <h3>{clientDetails.phone}</h3>
            <h3>coaching status: {clientDetails.coaching_status}</h3>
            <h3>contract id: {clientDetails.contract_id}</h3>
          </div>
          <div>

            {clientDetails.payments[0] &&
              <>
                <div style={{ width: '80%', display: 'flex', }} className={classes.root, "center_table"}>
                  <DataGrid rowHeight={40} autoHeight={true} sortModel={[{ field: 'due_date', sort: 'desc' },]} rows={clientDetails.payments} columns={columns} pageSize={12} checkboxSelection={false} />
                </div>

                <h3>Total amount paid by client: ${moneyMade}</h3>
                <h3>Total money received: ${totalRevenue}</h3>
              </>}
          </div>
        </>
      )}
    </div>
  );
}

export default CoachClientDetails;
