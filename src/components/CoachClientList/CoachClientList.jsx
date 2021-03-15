import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';
const useStyles = makeStyles(() => ({
  table: {
    minWidth: '50%',
    width: '80%',
    margin: 'auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
  },
  tableRow: {
    backgroundColor: 'aliceblue',
    '&:hover': {
      opacity: '80%',
      backgroundColor: 'lightblue'
    }
  },
  root: {
    "& .MuiInputBase-input": {
      width: "25ch",
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


function CoachClientList() {
  
  const clients = useSelector((store) => store.coachClientReducer);
  const [heading, setHeading] = useState('Coach Client List');
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // dataGrid column defs
  const columns = [
    {
      field: 'full_name',
      headerName: 'Client Name',
      flex: 1,
      sort: true,
      headerClassName: classes.header
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      sort: true,
      headerClassName: classes.header
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      sort: true,
      headerClassName: classes.header
    },
    {
      field: 'coaching_status',
      headerName: 'Coaching Status',
      flex: 1,
      sort: true,
      description: `Current coaching status of the client`,
      headerClassName: classes.header
    },
    {
      field: 'end_date',
      headerName: 'Contract End Date',
      flex: 1,
      sort: true,
      description: `End date of payments for the client`,
      headerClassName: classes.header
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: classes.header,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleDetails(params)}
        >
          Details
        </Button>
      )}
  ]

  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_CLIENTS' });
  }, []);

  const handleDetails = (input) => {
    let userId = input.row.id
    history.push(`/coach/clientDetails/${userId}`);
  } 

  const handleRowClick = (event) => {
    console.log(event.row.id);
  }

  return (
    <div>
      <h2>{heading}</h2>
      <div className={classes.container}>
        {/* <h1>History:</h1> */}
        <div style={{ height: 500, width: '85%', display: 'flex' }} className="center_table">
          <DataGrid rows={clients} columns={columns} pageSize={15} checkboxSelection={false} onRowClick={handleRowClick} />
        </div>
      </div>
    </div>
  );
}

export default CoachClientList;
