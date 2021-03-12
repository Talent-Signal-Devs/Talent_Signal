import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DataGrid } from '@material-ui/data-grid';



export default function AdminPayoutsHistory() {
    const payoutsHistory = useSelector(store => store.payoutsHistory)

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'full_name', headerName: 'Coach Name', width: 200, sortable: true },
        { field: 'confirmation_number', headerName: 'Confirmation Number', width: 200, sortable: true },
        {
            field: 'payout_date',
            headerName: 'Date',
            width: 200,
            sortable: true
        },
    ];



    // const dealPayouts = (array) => {
    //     const tableData = []
    //     let counter = 0
    //     for (let payment in array) {
    //         const tablePayment = {
    //             id: counter++,
    //             coachName: payment.full_name,
    //             confirmationNumber: payment.confirmation_number,
    //             date: new Date(payment.payout_date).toLocaleDateString(),
    //         }
    //         tableData.push(tablePayment)
    //     }
    //     return tableData;
    // }

    // const rows = dealPayouts(payoutsHistory)

    return (
        <>
            <h1>payout history</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={payoutsHistory} columns={columns} pageSize={15} checkboxSelection />
            </div>
        </>
    )
}
