import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: '100px',
    width: '1200px',
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
}))


function CoachClientList() {
  
  const clients = useSelector((store) => store.coachClientReducer);
  const [heading, setHeading] = useState('Coach Client List');
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_CLIENTS' });
  }, []);

  return (
    <div>
      <h2>{heading}</h2>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Coaching Status</TableCell>
              <TableCell>Contract End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => 
              <TableRow key={client.id} className={classes.tableRow}>
                <TableCell>{client.first_name} {client.last_name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.coaching_status}</TableCell>
                <TableCell>{client.end_date}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CoachClientList;
