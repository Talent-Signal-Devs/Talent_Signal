import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './AdminPayouts.css'


const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInputBase-input": {
      width: "25ch",

    },
    margin: "5px"
  },
  container: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    width: 500,
    margin: 'auto',
    justifyContent: 'space-around',
    backgroundColor: '#DDDDDD',
    padding: '20px 0',
    borderRadius: '5px',
    marginTop: '20px'

  },
  button: {
    margin: '5px'
  },
  table: {
    minWidth: '50%',
    width: '80%',
    margin: 'auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
    marginTop: '25px',
  },
  tableRow: {
    backgroundColor: 'aliceblue',
    '&:hover': {
      opacity: '80%',
      backgroundColor: 'lightblue'
    }
  },
  header: {
    backgroundColor: '#99C0FF',
    color: '#001844',
  },
  dialog: {
    border: '1px solid #99C0FF'
  }
}))



function AdminPayouts() {

  const dispatch = useDispatch()
  const history = useHistory();
  const classes = useStyles()

  //holds data from DB on all payments not yet paid
  const coachPayouts = useSelector((store) => store.payout);

  //modal controller
  const [visible, setVisible] = useState(false)
  const [confirmNumber, setConfirmNumber] = useState('')


  //paynow packages together all necessary info to be sent to the server when ted pays
  function preparePayout(clientArray) {
    const date = new Date()
    setConfirmNumber(date.getTime())
    const newCheck =
    {
      date: date.toISOString(),
      clients: clientArray,
      confirmation_number: date.getTime()
    }

    console.log('new check equals', newCheck)
    dispatch({ type: 'PAY_COACH', payload: newCheck })
    setVisible(true)

  }

  //navs to payouts history view, gets ALL payouts
  function handlePayoutsHistory() {
    history.push('/admin/payoutshistory')
  }

  //loads payments
  useEffect(() => {
    setTimeout(() => dispatch({ type: 'GET_PAYMENT' }), 400);
  }, [])

  return (

    <div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => history.push('/admin/upload')}>
          Upload New CSV
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => handlePayoutsHistory()}>
          View Payout History
        </Button>

      </div>

      {visible ?
        <Dialog
          open={true}
          className={classes.dialog}
          >
      <DialogTitle id="alert-dialog-title">{"Payout Confirmation Number"}</DialogTitle>
      <DialogContent>
        <DialogContentText >
          Use this number in Melio to link your payout histories
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          {confirmNumber}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setVisible(false)} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog> : <span></span>}

      {/* placeholder button for manual GET if list  doesn't load*/}
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Coach</TableCell>
              <TableCell className={classes.header}>Amount Owed</TableCell>
              <TableCell className={classes.header}></TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {coachPayouts.map((debt) => {
              return (
                <TableRow key={debt.user_id}>
                  <TableCell>{debt.full_name}</TableCell>
                  <TableCell>${debt.total_owed * .75}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => preparePayout(debt.clients)}>
                      PAY NOW
                    </Button>
                  </TableCell>

                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>

    </div>
  );
}

export default AdminPayouts;
