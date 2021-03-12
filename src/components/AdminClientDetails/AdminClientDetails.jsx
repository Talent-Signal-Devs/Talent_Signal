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

      {clientDetails.first_name && (
        <>
          <div>
            <h2>{clientDetails.first_name} {clientDetails.last_name}</h2>
            <h3>{clientDetails.email}</h3>
            <h3>{clientDetails.phone}</h3>
            <h3>Coach: {clientDetails.coach_first_name} {clientDetails.coach_last_name}</h3>
            <h3>coaching status: {clientDetails.coaching_status}</h3>
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
                  {clientDetails.payments.map((payment, i) => (
                    <TableRow key={i}>
                      <TableCell>{payment.payment_id}</TableCell>
                      <TableCell>{new Date(payment.due_date).toLocaleDateString("en-us")}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.payment_status}</TableCell>
                    </TableRow>
                  ))}
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
