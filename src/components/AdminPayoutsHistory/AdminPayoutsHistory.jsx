import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles"

import { Doughnut } from 'react-chartjs-2';

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
    header: {
        backgroundColor: '#0026FF',
        color: 'white',
    },
    cell: {
        align: 'center',
    }
}))




export default function AdminPayoutsHistory() {

    const history = useHistory();
    const dispatch = useDispatch();

    const payoutsHistory = useSelector(store => store.payoutsHistory)
    const chartData = useSelector(store=>store.chartData)
    const classes = useStyles()

    const data = {
        labels: chartData.statuses,
        datasets: [
            {
                label: 'Status Ratio',
                data: chartData.counters,
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
    const options = {
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

    const columns = [
        {
            field: 'confirmation_number',
            headerName: 'Confirmation Number',
            flex: 1,
            sortable: true,
            description: 'Unique confirmation number, used in Melio when paying job coaches',
            headerClassName: classes.header,
        },

        {
            field: 'full_name',
            headerName: 'Coach Name',
            flex: 1,
            sortable: true,
            description: 'First and last name of job coach',
            headerClassName: classes.header,
        },

        {
            field: 'payout_date',
            headerName: 'Date Paid',
            flex: 1,
            sortable: true,
            description: 'Date payment submitted to coach in Melio',
            type: 'date',
            headerClassName: classes.header,
        },
        {
            field: 'total_paid',
            headerName: 'Amount Paid',
            flex: 1,
            sortable: true,
            valueFormatter: (params) => (params.value.toFixed(2)),
            description: 'Total paid to coach on a specific date',
            headerClassName: classes.header,
        },
    ];

    //used to get payment details
    function handleRowClick(number){
        console.log('going to new page', number)
        history.push(`/admin/payoutshistory/${number}`)
    }

    useEffect(()=>{
        dispatch({type: 'GET_PAYOUTS_HISTORY'});
        dispatch({type: 'GET_PAYOUTS_VISUAL'})
    }, [])

    return (
        <>
            <div className={classes.container}>
                <h1>History:</h1>
                <div style={{ height: 600, width: '80%', display: 'flex', cursor: 'pointer' }} className="center_table">
                    <DataGrid rows={payoutsHistory} columns={columns} pageSize={15} checkboxSelection={false} sortModel={[{ field: 'payout_date', sort: 'desc' },]} onRowClick={(event)=>handleRowClick(event.row.confirmation_number)} />
                </div>
            </div>
            <Doughnut data={data} options={options} />
        </>
    )
}
