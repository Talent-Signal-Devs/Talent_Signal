import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
  coachDashboardContainer: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100vh',
    // paddingTop: '20px'
  },
  coachDashboardTitle: {
    position: 'relative',
    left: '9vw',
  },
  dashContainer: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  header: {
    backgroundColor: "#99C0FF",
    color: '#001844',
  },
  tableRow: {
    cursor: 'pointer'
  },
  coachChartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    marginTop: '40px'
  },
  coachDonutContainer: {
    display: 'relative',
    width: '50vh',
    height: '50vh',
    left: '50px',
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: '5px 5px 5px #BBBBBB'
  },
  coachBarContainer: {
    display: 'relative',
    width: '70vh',
    height: '50vh',
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
          '#FFE434',
          "#001844",
          '#99C0FF',
          '#CC1126',
          '#0026FF',
          '#311F99',

        ]
      }
    ]
  }
  const optionsDonut = {
    animation: {
      duration: 2000,
    },
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
    title: {
      display: true,
      text: `Client Payment Statuses`,
      fontSize: 24,
    },
  }

  const dataChart = {
    labels: coachChart.labels,
    datasets: [
      {
        label: '$ of Payout',
        data: coachChart.sums,
        backgroundColor: [
          "#001844",
          "#0352C0",
          "#0595F2",
          "#03AEF5",
          "#001844",
          "#0352C0",
          "#0595F2",
          "#03AEF5",
          "#001844",
          "#0352C0",
          "#0595F2",
          "#03AEF5",

        ],
        borderWidth: 1,
      },
    ],
  }

  const optionsChart = {
    animation: {
      duration: 2000,
    },
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
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [{
        gridLines: {
          display: false,
        },
      }]
    },
    title: {
      display: true,
      text: `Total Payouts`,
      fontSize: 24,
    },
  }

  const payments = useSelector((store) => store.coachPayments);

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
      headerName: 'Payment Received',
      flex: 1,
      sort: true,
      description: 'Payment amount received by coach from Talent Signal',
      valueFormatter: (params) => (`$${params.value.toFixed(2)}`),
      headerClassName: classes.header
    },
  ]
  // push pathname with confirmation number
  function handleDetails(number) {
    history.push({ pathname: `/coach/payoutDetails/${number}` })
  }


  return (
    <div className={classes.coachDashboardContainer}>
      <h1 className={classes.coachDashboardTitle}>Payout History</h1>
      <div className={classes.root, "center_table"} style={{ width: '80%', display: 'flex' }}>
        <DataGrid rowHeight={40} autoHeight={true} rows={payments} columns={columns} pageSize={12} sortModel={[{ field: 'payout_date', sort: 'desc' },]} checkboxSelection={false} onRowClick={(event) => handleDetails(event.row.confirmation_number)} />

      </div>
      <div className={classes.coachChartContainer}>
        <div className={classes.coachDonutContainer}>
          <Doughnut data={dataDonut} options={optionsDonut} />
        </div>
        <div className={classes.coachBarContainer}>
          <Bar data={dataChart} options={optionsChart} />
        </div>
      </div>
    </div>
  )
}

export default CoachDashboard;
