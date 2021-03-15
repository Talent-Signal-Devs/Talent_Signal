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


const useStyles = makeStyles(() => ({
  tableRow: {
    backgroundColor: 'aliceblue',
    '&:hover': {
      opacity: '80%',
      backgroundColor: 'lightblue'
    }
  },
  table: {
    minWidth: '100px',
    width: '1200px',
    margin: 'auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
  },
}))

function AdminClientList(props) {

  const classes = useStyles();
  const clients = useSelector((store) => store.adminClientReducer);
  const [heading, setHeading] = useState('Admin Client List');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_CLIENTS' });
  }, []);

  const handleRowClick = (input) => {
    // dispatch({type: 'GET_CLIENT_DETAILS', payload: input})
    history.push(`/admin/clientDetails/${input}`);
  }

  return (
    <div>
      <div>
        <h2>{heading}</h2>
      </div>
      <br />
      <br />
      <div>
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contract ID</TableCell>
                <TableCell>Coach</TableCell>
                <TableCell>Coaching Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} onClick={() => {handleRowClick(client.id)}} className={classes.tableRow}>
                  <TableCell>{client.first_name} {client.last_name}</TableCell>
                  <TableCell>{client.contract_id}</TableCell>
                  <TableCell>{client.coach_first_name} {client.coach_last_name}</TableCell>
                  <TableCell>{client.coaching_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminClientList;
