import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

function AdminClientDetails(props) {

  const clientDetails = useSelector((store) => store.clientDetailsReducer);
  const [heading, setHeading] = useState('Admin Client Details');

  

  return (
    <div>
      <h2>{heading}</h2>
      <br />
      <br />
      <div>
        <h2>{clientDetails[0].first_name} {clientDetails[0].last_name}</h2>
        <h3>{clientDetails[0].email}</h3>
        <h3>{clientDetails[0].phone}</h3>
        <h3>Coach: {clientDetails[0].coach_first_name} {clientDetails[0].coach_last_name}</h3>
        <h3>coaching status: {clientDetails[0].status}</h3>
        <h3>contract id: {clientDetails[0].contract_id}</h3>
      </div>
      <div>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientDetails.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.payment_id}</TableCell>
                  <TableCell>{client.due_date}</TableCell>
                  <TableCell>{client.amount}</TableCell>
                  <TableCell>{client.payment_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminClientDetails;
