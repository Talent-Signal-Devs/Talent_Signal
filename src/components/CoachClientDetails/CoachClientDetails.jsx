import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function CoachClientDetails(props) {

  const clientDetails = useSelector((store) => store.clientDetailsReducer);
  const [heading, setHeading] = useState('Coach Client Details');
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_CLIENT_DETAILS', payload: params.id });
  }, [])

  return (
    <div>
      <h2>{heading}</h2>

      {clientDetails && (
        <>
          <div>
            <h2>{clientDetails.first_name} {clientDetails.last_name}</h2>
            <h3>{clientDetails.email}</h3>
            <h3>{clientDetails.phone}</h3>
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
                    <TableCell>Payment Status</TableCell>
                    <TableCell>Total Payment</TableCell>
                    <TableCell>Payout Received</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={clientDetails.id}>
                    <TableCell>{clientDetails.payment_id}</TableCell>
                    <TableCell>{new Date(clientDetails.due_date).toLocaleDateString("en-us")}</TableCell>
                    <TableCell>{clientDetails.payment_status}</TableCell>
                    <TableCell>${clientDetails.amount}</TableCell>
                    <TableCell>${clientDetails.amount * 0.75}</TableCell>
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

export default CoachClientDetails;
