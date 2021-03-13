import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import ToolTip from "@material-ui/core/ToolTip"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"

function AdminCoachDetails(props) {
    const coachDetails = useSelector((store) => store.coachDetailsReducer)

    const [heading, setHeading] = useState("Admin Coach Details")
    const [open, setOpen] = useState(false)
    const [newCoachDetails, setNewCoachDetails] = useState({
        id: coachDetails.id,
        firstName: coachDetails.first_name,
        lastName: coachDetails.last_name,
        email: coachDetails.email,
        phone: coachDetails.phone,
        programID: coachDetails.program_id,
        startDate: coachDetails.start_date,
        business: coachDetails.business_name,
    })

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: "GET_COACH_DETAILS", payload: params.id })
    }, [])

    const handleClickOpen = () => {
        setOpen(true)
        setNewCoachDetails({
            id: coachDetails.id,
            firstName: coachDetails.first_name,
            lastName: coachDetails.last_name,
            email: coachDetails.email,
            phone: coachDetails.phone,
            programID: coachDetails.program_id,
            startDate: coachDetails.start_date,
            business: coachDetails.business_name,
        })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCoachChange = (e) => {
        setNewCoachDetails({
            ...newCoachDetails,
            [e.target.name]: e.target.value,
        })
    }

    const updateCoach = (e) => {
        e.preventDefault()
        dispatch({ type: "UPDATE_COACH_DETAILS", payload: newCoachDetails })
        handleClose()
    }

    // variable to store the total money made for the coach
    let totalMoneyMade = []
    // variable to store the values of the "amounts" in the payments table for each client
    let totalPayout = []
    let moneyMade = 0

    if (coachDetails.first_name) {
        for (let payment of coachDetails.payments) {
            totalPayout.push(payment.amount)
        }
        for (let i = 0; i < totalPayout.length; i++) {
            moneyMade += parseInt(totalPayout[i])
        }
        totalMoneyMade.push(moneyMade)
    }

    // total money that the coach has brought in for the company
    let totalRevenue = totalMoneyMade[0] * 0.25

    return (
        <div>
            <h2>{heading}</h2>
            {coachDetails.first_name && (
                <>
                    <div>
                        <h2>
                            {coachDetails.first_name} {coachDetails.last_name}
                        </h2>
                        <h3>{coachDetails.email}</h3>
                        <h3>{coachDetails.phone}</h3>
                        <h3>Total Payouts: ${totalMoneyMade}</h3>
                        <h3>Total Revenue: ${totalRevenue}</h3>
                        <Button onClick={handleClickOpen}>Edit Details</Button>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Edit Details
                        </DialogTitle>
                        <TextField
                            name="firstName"
                            onChange={handleCoachChange}
                            value={newCoachDetails.firstName}
                        />
                        <TextField
                            name="lastName"
                            onChange={handleCoachChange}
                            value={newCoachDetails.lastName}
                        />
                        <TextField
                            name="email"
                            onChange={handleCoachChange}
                            value={newCoachDetails.email}
                        />
                        <TextField
                            name="phone"
                            onChange={handleCoachChange}
                            value={newCoachDetails.phone}
                        />
                        <TextField
                            name="programID"
                            onChange={handleCoachChange}
                            value={newCoachDetails.programID}
                        />
                        <TextField
                            name="startDate"
                            onChange={handleCoachChange}
                            value={newCoachDetails.startDate}
                        />
                        <TextField
                            name="business"
                            onChange={handleCoachChange}
                            value={newCoachDetails.business}
                        />
                        <Button onClick={updateCoach}>Update Coach</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Dialog>

                    <div>
                        <h3>Client's:</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Contract ID</TableCell>
                                        <TableCell>Coaching Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {coachDetails.clients.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>
                                                {client.first_name}{" "}
                                                {client.last_name}
                                            </TableCell>
                                            <TableCell>
                                                {client.contract_id}
                                            </TableCell>
                                            <TableCell>
                                                {client.coaching_status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminCoachDetails
