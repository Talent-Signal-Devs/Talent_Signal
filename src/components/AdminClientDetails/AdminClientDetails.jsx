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
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

function AdminClientDetails(props) {

  const params = useParams();
  const clientDetails = useSelector((store) => store.clientDetailsReducer);
  const [heading, setHeading] = useState('Admin Client Details');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_CLIENT_DETAILS', payload: params.id });
  }, [])



  return (
    <div>
      <h2>{heading}</h2>
      <br />
      <br />

      {clientDetails && (
        <>
          <div>
            <h2>{clientDetails.first_name} {clientDetails.last_name}</h2>
            <h3>{clientDetails.email}</h3>
            <h3>{clientDetails.phone}</h3>
            <h3>Coach: {clientDetails.coach_first_name} {clientDetails.coach_last_name}</h3>
            <h3>coaching status: {clientDetails.status}</h3>
            <h3>contract id: {clientDetails.contract_id}</h3>
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
                    <TableRow key={clientDetails.id}>
                      <TableCell>{clientDetails.payment_id}</TableCell>
                      <TableCell>{clientDetails.due_date}</TableCell>
                      <TableCell>{clientDetails.amount}</TableCell>
                      <TableCell>{clientDetails.payment_status}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminClientDetails;
