import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';
const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInputBase-input": {
      width: "25ch",
    },
    margin: "5px"
  },
  header: {
    backgroundColor: "#99C0FF",
    color: '#001844',
  },
  coachPageTitle: {
    position: 'relative',
    left: '14vh',
    marginTop: '40px'
  }
}))


function CoachClientList() {
  
  const clients = useSelector((store) => store.coachClients);
  const [heading, setHeading] = useState('Clients');
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
      description: `Denotes whether client is currently receiving job coaching or is currently employed`,
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
  ]

  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_CLIENTS' });
  }, []);

  const handleRowClick = (event) => {
    let userId = event.row.id;
    history.push(`/coach/clientDetails/${userId}`);
  }

  return (
    <div>
      <h2 className={classes.coachPageTitle}>{heading}</h2>
      <div>
        <div style={{ width: '85%', display: 'flex' }} className={classes.root, "center_table"}>
          <DataGrid rowHeight={40} autoHeight={true} rows={clients} columns={columns} pageSize={15} sortModel={[{ field: 'full_name', sort: 'asc' },]} checkboxSelection={false} onRowClick={handleRowClick} />
        </div>
      </div>
    </div>
  );
}

export default CoachClientList;
