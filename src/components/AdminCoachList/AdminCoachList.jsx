import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    margin: "5px",
    background: '#ffffff'
},
  headerContainer: {
    display: 'flex',
    width: '100%',
    flexFlow: 'column',
  },
  statusSelectContainer: {
    position: 'relative',
    left: '19vh',
  },
  header: {
    backgroundColor: '#0352C0',
    color: 'white',
  },
  pageHeading: {
    position: 'relative',
    textTransform: 'uppercase',
    left: '19vh',
  },
}))


function AdminCoachList(props) {

  const classes = useStyles();
  const coaches = useSelector((store) => store.adminCoachReducer);
  const [heading, setHeading] = useState('Coaches');
  const [seeActiveCoaches, setSeeActiveCoaches] = useState(true);
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

  const activeCoaches = [];
  const nonActiveCoaches = [];

  for (let coach of coaches) {
    if (coach.active) {
      activeCoaches.push(coach);
    } else if (coach.active === false) {
      nonActiveCoaches.push(coach);
    }
  }


  const handleChange = (event) => {
    setSeeActiveCoaches(event.target.value);
  }

  return (
    <div>
      <div className={classes.headerContainer}>
      <div>
        <h1 className={classes.pageHeading}>{heading}</h1>
      </div>
       <div className={classes.statusSelectContainer}>
        <FormControl>
          <Select
            labelId="coach-select"
            value={seeActiveCoaches}
            onChange={handleChange}
          >
            <MenuItem value={true}>Active Coaches</MenuItem>
            <MenuItem value={false}>Inactive Coaches</MenuItem>
          </Select>
        </FormControl>
        </div>
        </div>
        <br/>
        <br/>
        {/*<div>
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Date Joined</TableCell>
                <TableCell>Number of Clients</TableCell>
                <TableCell>Registration Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seeActiveCoaches
                ? activeCoaches.map((coach) => (
                  <ToolTip title="click for details">
                    <TableRow key={coach.id} className={classes.tableRow} onClick={() => { handleRowClick(coach.id) }}>
                      <TableCell>{coach.first_name} {coach.last_name}</TableCell>
                      <TableCell>{coach.email}</TableCell>
                      <TableCell>{coach.phone}</TableCell>
                      <TableCell>{coach.start_date}</TableCell>
                      <TableCell>{coach.client_count}</TableCell>
                      <TableCell>
                        {coach.is_approved ? <h4>Approved</h4> : <h4>pending</h4>}
                      </TableCell>
                    </TableRow>
                  </ToolTip>))

                : nonActiveCoaches.map((coach) => (
                  <ToolTip title="click for details">
                    <TableRow key={coach.id} className={classes.tableRow} onClick={() => { handleRowClick(coach.id) }}>
                      <TableCell>{coach.first_name} {coach.last_name}</TableCell>
                      <TableCell>{coach.email}</TableCell>
                      <TableCell>{coach.phone}</TableCell>
                      <TableCell>{coach.start_date}</TableCell>
                      <TableCell>{coach.client_count}</TableCell>
                      <TableCell>
                        {coach.is_approved ? <h4>Approved</h4> : <h4>pending</h4>}
                      </TableCell>
                    </TableRow>
                  </ToolTip>
                ))}
            </TableBody>
          </Table>
        </TableContainer> */}

      {seeActiveCoaches 
      ? <div style={{ width: '80%', display: 'flex', }} className={classes.root, "center_table"}>
        <DataGrid rowHeight={40} autoHeight={true} rows={activeCoaches} columns={columns} pageSize={12} checkboxSelection={false} onRowClick={handleRowClick} />

      </div>
      : <div style={{ width: '80%', display: 'flex', }} className={classes.root, "center_table"}>
      <DataGrid rowHeight={40} autoHeight={true} rows={nonActiveCoaches} columns={columns} pageSize={12} checkboxSelection={false} onRowClick={handleRowClick} />

    </div>}
    </div>
  );
}

export default AdminCoachList;
