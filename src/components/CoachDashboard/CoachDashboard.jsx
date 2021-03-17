import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';

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
  dashContainer: {
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  header: {
    backgroundColor: '#0026FF',
    color: 'white',
  },
  tableRow: {
    cursor: 'pointer'
  }
}))



function CoachDashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const payments = useSelector((store) => store.coachPaymentReducer);
  const [heading, setHeading] = useState('Coach Dashboard');

  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_PAYMENTS' });
  }, [])

  const columns = [
    {
      field: 'payout_date',
      headerName: 'Payout Date',
      flex: 1,
      sort: true,
      description: 'Date that Talent Signal confirmed payment to coach',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString("en-us"),
      headerClassName: classes.header
    },
    {
      field: 'total_paid',
      headerName: 'Total Paid',
      flex: 1,
      sort: true,
      description: 'Total amount paid to coach by Talent Signal',
      valueFormatter: (params) => (params.value.toFixed(2)),
      headerClassName: classes.header
    },
  ]
  // push pathname with confirmation number
  function handleDetails(number){
    history.push({pathname: `/coach/payoutDetails/${number}`})
  }

  return (
    <>
      <div>
        <h2>{heading}</h2>
      </div>
      <br />
      <br />
      <div className={classes.root, "center_table"} style={{  width: '80%', display: 'flex'}}>
        <DataGrid rowHeight={40} autoHeight={true} rows={payments} columns={columns} pageSize={12} checkboxSelection={false} onRowClick={(event)=>handleDetails(event.row.confirmation_number)}/>
      </div>
    </>
  );
}

export default CoachDashboard;
