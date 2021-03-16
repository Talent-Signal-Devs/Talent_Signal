import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';

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
    width: '50vw',
    margin: 'auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
  },
  dashContainer: {
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  }
}))



function CoachDashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const coachChart = useSelector((store) => store.chartData)




  useEffect(() => {
    dispatch({type: 'FETCH_COACH_DATA'})
    dispatch({type: 'FETCH_COACH_DATA_HISTORY'})
  }, [])



  return (
    <>
      <div>
        <h2>Coach Dashboard</h2>
      </div>
      <div>

      </div>
    </>
  )
}

export default CoachDashboard;
