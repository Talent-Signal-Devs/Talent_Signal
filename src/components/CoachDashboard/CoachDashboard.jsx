import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


import { Doughnut, Bar } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInputBase-input": {
        width: "25ch",
    },
    "& .MuiDataGrid-row": {
      cursor: 'pointer',
      color: 'white',
    },
    margin: "5px"
},
  coachDashboardContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100vh'
  },
  dashContainer: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  header: {
    backgroundColor: '#0026FF',
    color: 'white',
  },
  tableRow: {
    cursor: 'pointer'
  },
  coachChartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    marginTop: '20px'
  },
  coachDonutContainer: {
    display: 'relative',
    width: '60vh',
    height: '60vh',
    left: '50px',
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: '5px 5px 5px #BBBBBB'
  },
  coachBarContainer: {
    display: 'relative',
    width: '80vh',
    height: '60vh',
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: '5px 5px 5px #BBBBBB'
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
    responsive: true,
        maintainAspectRatio: false,
        aspectRation: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
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
    responsive: true,
        maintainAspectRatio: false,
        aspectRation: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return "$" + value
          },
          },
        },
      ],
    },
  }





  const payments = useSelector((store) => store.coachPaymentReducer);
  const [heading, setHeading] = useState('Coach Dashboard');


  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_PAYMENT_HISTORY' })
    dispatch({ type: 'FETCH_COACH_DONUT' })
    dispatch({ type: 'FETCH_COACH_PAYMENTS' })
  }, [])


  const columns = [
    {
      field: 'payout_date',
      headerName: 'Payout Date',
      flex: 1,
      sort: true,
      description: 'Date that Talent Signal confirmed payment to coach',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString("en-us"),
      headerClassName: classes.header
    },
    {
      field: 'total_paid',
      headerName: 'Total Paid',
      flex: 1,
      sort: true,
      description: 'Total amount paid to coach by Talent Signal',
      valueFormatter: (params) => (params.value.toFixed(2)),
      headerClassName: classes.header
    },
  ]
  // push pathname with confirmation number
  function handleDetails(number){
    history.push({pathname: `/coach/payoutDetails/${number}`})
  }


  return (
    <div className={classes.coachDashboardContainer}>

      <div className={classes.coachChartContainer}>
        <div className={classes.coachDonutContainer}>
          <Doughnut data={dataDonut} options={optionsDonut} />
        </div>
        <div className={classes.coachBarContainer}>
          <Bar data={dataChart} options={optionsChart} />
        </div>
      </div>
      <div className={classes.root, "center_table"} style={{  width: '80%', display: 'flex'}}>
        <DataGrid rowHeight={40} autoHeight={true} rows={payments} columns={columns} pageSize={12} sortModel={[{ field: 'payout_date', sort: 'desc' },]} checkboxSelection={false} onRowClick={(event)=>handleDetails(event.row.confirmation_number)}/>

      </div>
    </div>
  )
}

export default CoachDashboard;
