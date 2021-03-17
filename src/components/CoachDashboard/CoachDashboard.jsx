import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


import { Doughnut, Bar } from 'react-chartjs-2';

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
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  }
}))



function CoachDashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const coachChart = useSelector((store) => store.coachChart)
  const coachDonut = useSelector((store) => store.coachDonut)

  const dataDonut = {
    labels: coachDonut.statuses,
    datasets: [
      {
        label: 'Status Ratio',
        data: coachDonut.counters,
        backgroundColor: [
          '#311F99',
          '#99C0FF',
          '#FFE434',
          '#CC1126',
          '#0026FF',
          '#311F99',

        ]
      }
    ]
  }
  const optionsDonut = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }


  const dataChart = {
    labels: coachChart.labels,
    datasets: [
      {
        label: '$ of Completed Payments',
        data: coachChart.sums,
        backgroundColor: [
          '#311F99',
          '#99C0FF',
          '#FFE434',
          '#CC1126',
          '#0026FF',
          '#311F99',
          '#99C0FF',
          '#FFE434',
          '#CC1126',
          '#0026FF',
          '#311F99',
          '#99C0FF',

        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  }

  const optionsChart = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }




  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_PAYMENT_HISTORY' })
    dispatch({ type: 'FETCH_COACH_DONUT' })
  }, [])



  return (
    <>
      <div>
        <h2>Coach Dashboard</h2>
      </div>
      <div>
        <Doughnut data={dataDonut} options={optionsDonut} />
        <Bar data={dataChart} options={optionsChart} />
      </div>
    </>
  )
}

export default CoachDashboard;
