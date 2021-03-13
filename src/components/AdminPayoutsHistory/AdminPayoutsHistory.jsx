import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles"

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
    const payoutsHistory = useSelector(store => store.payoutsHistory)
    const classes = useStyles()

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
            description: 'Total paid to coach on a specific date',
            headerClassName: classes.header,
        },
    ];
        // {
        //   field: 'action',
        //   headerName: 'Action',
        //   renderCell: (params) => (
        //     <button onClick={() => handleClick(params)}>
        //       Content
        //     </button>
        //   ),
        // }
  //  function handleClick(something){
  //    console.log(something.row.confirmation_number);
  //  }
    return (
        <>
            <div className={classes.container}>
                <h1>History:</h1>
                <div style={{ height: 600, width: '80%', display: 'flex' }} className="center_table">
                    <DataGrid rows={payoutsHistory} columns={columns} pageSize={15} checkboxSelection={false}/>
                </div>
            </div>
        </>
    )
}
