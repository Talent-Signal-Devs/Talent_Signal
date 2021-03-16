import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
  header: {
    backgroundColor: '#0026FF',
    color: 'white',
  },
}))


function AdminCoachList(props) {

  const classes = useStyles();
  const coaches = useSelector((store) => store.adminCoachReducer);
  const [heading, setHeading] = useState('Admin Coach List');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_COACHES' });
  }, [])

  const columns = [
    {
      field: 'name',
      headerName: 'Full Name',
      flex: 1,
      sort: true,
      valueGetter: getFullName,
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
      field: 'start_date',
      headerName: 'Date Joined',
      flex: 1,
      sort: true,
      description: `Date the coach began with Talent Signal`,
      headerClassName: classes.header
    },
    {
      field: 'client_count',
      headerName: 'Client Count',
      flex: 1,
      sort: true,
      description: `Number of clients the coach works with`,
      headerClassName: classes.header
    },
    {
      field: 'approval',
      headerName: 'Registration Status',
      flex: 1,
      sort: true,
      description: `Whether the coach has activated their account`,
      valueGetter: getApproval,
      headerClassName: classes.header
    },
  ]

  function getFullName(params) {
    return `${params.getValue(`first_name` || '')} ${params.getValue(`last_name` || '')}`;
  }

  function getApproval(params) {
    let isApproved = params.getValue('is_approved');
    return isApproved ? 'Approved' : 'Pending';
  }

  const handleRowClick = (event) => {
    let coachId = event.row.id;
    history.push(`/admin/coachDetails/${coachId}`);
  }

  return (
    <div>
      <div>
        <h2>{heading}</h2>
      </div>
      <div style={{ width: '80%', display: 'flex', }} className={classes.root, "center_table"}>
        <DataGrid rowHeight={40} autoHeight={true} rows={coaches} columns={columns} pageSize={12} checkboxSelection={false} onRowClick={handleRowClick} />

      </div>
    </div>
  );
}

export default AdminCoachList;
