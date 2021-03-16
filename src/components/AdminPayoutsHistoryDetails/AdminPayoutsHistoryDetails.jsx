import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { useParams } from "react-router-dom"


export default function AdminPayoutsDetailsHistory() {
    
    const dispatch = useDispatch()
    const params = useParams()




    console.log('details view')
    useEffect(() => {
        dispatch({type: 'SEE_FULL_PAYMENT_DETAILS', payload: params.number})
      }, [])

    return(
        <>
            {params.number}
        </>
    )
}
