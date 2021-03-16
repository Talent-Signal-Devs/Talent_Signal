import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ToolTip from '@material-ui/core/ToolTip';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  tableRow: {
    backgroundColor: 'aliceblue',
    '&:hover': {
      opacity: '80%',
      backgroundColor: 'lightblue'
    },
  },
  table: {
    minWidth: '100px',
    width: '1200px',
    margin: 'auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
  },
}))


function AdminCoachList(props) {

  const classes = useStyles();
  const coaches = useSelector((store) => store.adminCoachReducer);
  const [heading, setHeading] = useState('Admin Coach List');
  const [seeActiveCoaches, setSeeActiveCoaches] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_COACHES' });
  }, [])

  const handleRowClick = (input) => {
    history.push(`/admin/coachDetails/${input}`);
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
      <div>
        <h2>{heading}</h2>
      </div>
      <div>
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
        <br/>
        <br/>
        <div>
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
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminCoachList;
