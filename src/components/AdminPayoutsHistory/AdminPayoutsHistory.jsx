import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DataGrid } from '@material-ui/data-grid';
import { createTrue } from 'typescript';



export default function AdminPayoutsHistory() {
    const payoutsHistory = useSelector(store => store.payoutsHistory)

    const columns = [
        { field: 'confirmation_number', headerName: 'Confirmation Number', width: 200, sortable: true },
        { field: 'full_name', headerName: 'Coach Name', width: 200, sortable: true },
        {
            field: 'payout_date',
            headerName: 'Date Paid',
            width: 200,
            sortable: true
        },
        { field: 'total_paid', headerName: 'Amount Paid', width: 200, sortable: true },
        // {
        //   field: 'action',
        //   headerName: 'Action',
        //   renderCell: (params) => (
        //     <button onClick={() => handleClick(params)}>
        //       Content
        //     </button>
        //   ),
        // }
    ];
  //  function handleClick(something){
  //    console.log(something.row.confirmation_number);
  //  }
    return (
        <>
            <h1>payout history</h1>
            <div style={{ height: 800, width: '100%' }}>
                <DataGrid rows={payoutsHistory} columns={columns} pageSize={15} checkboxSelection={false} />
            </div>
        </>
    )
}
