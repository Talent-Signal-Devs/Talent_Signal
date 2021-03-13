import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import {useHistory} from 'react-router-dom'

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


  },
  button: {
    margin: '5px'
  }
}))

function AdminDashboard(props) {

  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const coaches = useSelector((store) => store.adminCoachReducer);



  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_COACHES' });
  }, []);

  return (
    <div>
      <div className={classes.container}>

      <h1>Welcome! Where would you like to go:</h1>

        <div className={classes.buttonContainer}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/addUser')}
          className={classes.button}>
          Add New Coach/Client
        </Button>

        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/coachList')}
          className={classes.button}>
          View Coaches
        </Button>

        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/clientList')}
          className={classes.button}>
          View Clients
        </Button>

        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/payouts')}
          className={classes.button}>
          Manage Payouts
        </Button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
