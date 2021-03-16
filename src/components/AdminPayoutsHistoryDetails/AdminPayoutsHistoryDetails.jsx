import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom"
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


export default function AdminPayoutsDetailsHistory() {

    const dispatch = useDispatch()
    const params = useParams()
    const classes = useStyles()

    const details = useSelector(store=>store.payoutsHistory)

    const columns = [
        {
            field: 'client_name',
            headerName: 'Client Name',
            flex: 1,
            sortable: true,
            description: 'Name of client',
            headerClassName: classes.header,
        },
        {
            field: 'amount_paid',
            headerName: 'Amount Paid',
            flex: 1,
            sortable: true,
            description: '75% of the client\'s payment to Leif. This does not account for the 5% to Leif or the 20% in administrative fees to Talent Signal',
            headerClassName: classes.header,
        },
        {
            field: 'payout_date',
            headerName: 'Date Paid',
            flex: 1,
            sortable: true,
            description: 'Date payment was completed via Melio',
            headerClassName: classes.header,
        },
    ]

    useEffect(() => {
        dispatch({type: 'SEE_FULL_PAYMENT_DETAILS', payload: params.number})
      }, [])

    return(
        <>
        <h1>Payment Number:</h1>
        <h2>{params.number}</h2>
        <div className={classes.container}>
                <h1>History:</h1>
                <div style={{ height: 600, width: '80%', display: 'flex', cursor: 'pointer' }} className="center_table">
                    <DataGrid rows={details} columns={columns} pageSize={15} checkboxSelection={false} />
                </div>
            </div>

        </>
    )
}
