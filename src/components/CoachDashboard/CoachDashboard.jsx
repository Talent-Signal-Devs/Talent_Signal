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
      color: '#333'
    },
    margin: "5px"
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





  const payments = useSelector((store) => store.coachPaymentReducer);
  const [heading, setHeading] = useState('Coach Dashboard');


  useEffect(() => {
    dispatch({ type: 'FETCH_COACH_PAYMENT_HISTORY' })
    dispatch({ type: 'FETCH_COACH_DONUT' })
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
    <>
      <div>
        <h2>Coach Dashboard</h2>
      </div>

      <div>
        <Doughnut data={dataDonut} options={optionsDonut} />
        <Bar data={dataChart} options={optionsChart} />

      <br />
      <br />
      </div>
      <div className={classes.root, "center_table"} style={{  width: '80%', display: 'flex'}}>
        <DataGrid rowHeight={40} autoHeight={true} rows={payments} columns={columns} pageSize={12} checkboxSelection={false} onRowClick={(event)=>handleDetails(event.row.confirmation_number)}/>

      </div>
    </>
  )
}

export default CoachDashboard;
