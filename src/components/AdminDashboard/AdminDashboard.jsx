import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { Bar, Doughnut } from "react-chartjs-2"
import { AutorenewTwoTone } from "@material-ui/icons"

const useStyles = makeStyles(() => ({
    // root: {
    //   "& .MuiInputBase-input": {
    //     width: "25ch",

    //   },
    //   margin: "5px"
    // },
    dashboard: {
        height: "100%",
    },
    container: {
        display: "flex",
        flexFlow: "column",
        // justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "50px",
        marginTop: "50px",
        // border: '1px solid blue',
        width: "80%",
    },
    blueButton: {
        margin: "5px",
        background: '#001844',
        height: "100px",
        width: "250px",
        fontSize: "20px",
        boxShadow: '5px 5px 5px #BBBBBB'
    },
    chartContainer: {
        display: "flex",
        // flexFlow: 'column',
        justifyContent: "space-around",
        // alignItems: 'center',
        height: "100%",
        width: "100%",
        // marginLeft: '20px',
        // border: '1px solid blue'
    },
    barContainer: {
        position: "relative",
        height: "60vh",
        width: "80vh",
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: '5px 5px 5px #BBBBBB'
    },
    donutContainer: {
        position: "relative",
        height: "50vh",
        width: "80vh",
        // top: "50px",
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: '5px 5px 5px #BBBBBB'
    },
    coachInfoContainer: {
      position: 'relative',
      left: '13vw',
      bottom: '50px',
      background: '#0072cc',
      color: '#ffffff',
      borderRadius: '10px',
      height: '200px',
      width: '35vh',
      textAlign: 'center',
      boxShadow: '5px 5px 5px #BBBBBB'
    },
    clientInfoContainer: {
      position: 'relative',
      background: "#cce3f5",
      color: '#001844',
      borderRadius: '10px',
      left: '33vw',
      bottom: '134px',
      height: '200px',
      width: '35vh',
      textAlign: 'center',
      boxShadow: '5px 5px 5px #BBBBBB'
    },
}))

function AdminDashboard(props) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()

    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const coaches = useSelector((store) => store.adminCoachReducer)
    const clients = useSelector((store) => store.adminClientReducer)
    const chartData = useSelector((store) => store.adminChart)
    const donutData = useSelector((store) => store.adminDonut)

    const date = new Date()
    const year = date.getFullYear()
    const totalCoaches = coaches.length
    const totalClients = clients.length

    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "$ of Gross Revenue",
                data: chartData,
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
            },
        ],
    }

    const options = {
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
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                },
            ],
        },
        title: {
            display: true,
            text: `Total Monthly Revenue - ${year}`,
            fontSize: 24,
        },
    }

    const dataDonut = {
        labels: donutData.labels,
        datasets: [
            {
                label: "Status Ratio",
                data: donutData.data,
                backgroundColor: [
                    "#001844",
                    "#99C0FF",
                    "#FFC74A",
                    "#CC1126",
                    "#0026FF",
                    "#311F99",
                ],
            },
        ],
    }
    const optionsDonut = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        display: false,
                        // callback: function() {
                        //   return undefined
                        // }
                    },
                    gridLines: {
                        display: false,
                    },
                },
            ],
        },
        title: {
            display: true,
            text: `Payment Status - ${year}`,
            fontSize: 24,
        },
    }

    useEffect(() => {
        dispatch({ type: "FETCH_CHART_DATA" })
        dispatch({ type: "FETCH_DONUT_DATA" })
        dispatch({ type: "FETCH_ADMIN_COACHES" })
        dispatch({ type: "FETCH_ADMIN_CLIENTS" })
    }, [])

    return (
        <div>
            <div className={classes.container}>
                {/* <h1>Welcome! Where would you like to go:</h1> */}

                <div className={classes.buttonContainer}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push("/admin/addUser")}
                        className={classes.blueButton}
                    >
                        Add New Coach/Client
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push("/admin/coachList")}
                        className={classes.blueButton}
                    >
                        View Coaches
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push("/admin/clientList")}
                        className={classes.blueButton}
                    >
                        View Clients
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push("/admin/payouts")}
                        className={classes.blueButton}
                    >
                        Manage Payouts
                    </Button>
                </div>
                <div className={classes.chartContainer}>
                    <div className={classes.barContainer}>
                        <Bar data={data} options={options} />
                    </div>
                    <div className={classes.donutContainer}>
                        <Doughnut data={dataDonut} options={optionsDonut} />
                    </div>
                </div>
                <div className={classes.coachInfoContainer}>
                  <h1 className={classes.infoText}>Active Coaches: {totalCoaches}</h1>
                </div>
                <div className={classes.clientInfoContainer}>
                  <h1 className={classes.infoText}>Total Clients: {totalClients}</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
