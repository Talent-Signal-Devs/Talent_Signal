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
import CoachItem from '../CoachItem/CoachItem';


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
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_COACHES' });
  }, [])

  const handleRowClick = (input) => {
    history.push(`/admin/coachDetails/${input}`);
  }

  return (
    <div>
      <div>
        <h2>{heading}</h2>
      </div>
      <div>
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Date Joined</TableCell>
                <TableCell>Number of Clients</TableCell>
                <TableCell>Registration Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coaches.map((coach) => (
                <ToolTip title="click for details">
                  <TableRow key={coach.id} className={classes.tableRow}>
                    <TableCell onClick={() => { handleRowClick(coach.id) }}>{coach.first_name} {coach.last_name}</TableCell>
                    <TableCell onClick={() => { handleRowClick(coach.id) }}>{coach.email}</TableCell>
                    <TableCell onClick={() => { handleRowClick(coach.id) }}>{coach.phone}</TableCell>
                    <TableCell onClick={() => { handleRowClick(coach.id) }}>{coach.product_id}</TableCell>
                    <TableCell onClick={() => { handleRowClick(coach.id) }}>{coach.start_date}</TableCell>
                    <TableCell onClick={() => { handleRowClick(coach.id) }}>{coach.client_count}</TableCell>
                    <TableCell onClick={() => { handleRowClick(coach.id) }}>
                      {coach.is_approved ? <h4>Approved</h4> : <h4>pending</h4>}
                    </TableCell>
                    <TableCell><CoachItem coach={coach} /></TableCell>
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
