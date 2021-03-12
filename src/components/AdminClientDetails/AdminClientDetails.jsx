import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import ToolTip from "@material-ui/core/ToolTip"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useHistory, useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(() => ({
  input: {
    width: "25ch",
    margin: "10px",
  },
}))

function AdminClientDetails(props) {
  const params = useParams()
  const classes = useStyles()

  const clientDetails = useSelector((store) => store.clientDetailsReducer)
  const coaches = useSelector((store) => store.adminCoachReducer)

  const [heading, setHeading] = useState("Admin Client Details")
  const [open, setOpen] = useState(false)
  // const [editMode, setEditMode] = useState(true)
  const [editClient, setEditClient] = useState({
    firstName: clientDetails.first_name,
    lastName: clientDetails.last_name,
    email: clientDetails.email,
    phone: clientDetails.phone,
    coachID: clientDetails.user_id,
    contractID: clientDetails.contract_id,
    contractStatus: clientDetails.contract_status,
    coachingStatus: clientDetails.coaching_status,
  })

  const handleClickOpen = () => {
    setOpen(true)
    setEditClient({
      firstName: clientDetails.first_name,
      lastName: clientDetails.last_name,
      email: clientDetails.email,
      phone: clientDetails.phone,
      coachID: clientDetails.user_id,
      contractID: clientDetails.contract_id,
      contractStatus: clientDetails.contract_status,
      coachingStatus: clientDetails.coaching_status,
    })
    dispatch({ type: "FETCH_ADMIN_COACHES" })

  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClientChange = (e) => {
    const value = e.target.value
    setEditClient({ ...editClient, [e.target.name]: value })
    console.log(editClient)
  }

  // const editDetails = () => {
  //     setEditMode(!editMode)
  //     dispatch({ type: "FETCH_ADMIN_COACHES" })
  // }

  const updateClient = () => {
    console.log(editClient)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: "GET_CLIENT_DETAILS", payload: params.id })
  }, [])

  return (
    <div>
      <h2>{heading}</h2>
      <br />
      <br />

      {clientDetails && (
        <>
          <div>
            <h2>
              {clientDetails.first_name}{" "}
              {clientDetails.last_name}
            </h2>
            <h3>{clientDetails.email}</h3>
            <h3>{clientDetails.phone}</h3>
            <h3>
              Coach: {clientDetails.coach_first_name}{" "}
              {clientDetails.coach_last_name}
            </h3>
            <h3>coaching status: {clientDetails.status}</h3>
            <h3>contract id: {clientDetails.contract_id}</h3>
            <Button onClick={handleClickOpen}>Edit Details</Button>
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
            <TextField
              name="firstName"
              onChange={handleClientChange}
              value={editClient.firstName}
            />
            <TextField
              name="lastName"
              onChange={handleClientChange}
              value={editClient.lastName}
            />
            <TextField
              name="email"
              onChange={handleClientChange}
              value={editClient.email}
            />
            <TextField
              name="phone"
              onChange={handleClientChange}
              value={editClient.phone}
            />
            <TextField
              name="contractID"
              onChange={handleClientChange}
              value={editClient.contractID}
            />
            <FormControl className={classes.input}>
              <InputLabel id="coach-select-label">
                Select a Coach
                                </InputLabel>
              <Select
                labelId="coach-select-label"
                id="coach-select"
                name="coachID"

                onChange={(e) => setEditClient({
                  ...editClient,
                  [e.target.name]: e.target.value
                })}
              >
                {coaches.map((coach) => {
                  return <MenuItem key={coach.id} value={coach.id}>
                    {coach.first_name} {coach.last_name}
                  </MenuItem>
                })}

              </Select>
            </FormControl>
            <Button onClick={updateClient}>Update Client</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Dialog>
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Payment ID</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={clientDetails.id}>
                    <TableCell>
                      {clientDetails.payment_id}
                    </TableCell>
                    <TableCell>
                      {clientDetails.due_date}
                    </TableCell>
                    <TableCell>
                      {clientDetails.amount}
                    </TableCell>
                    <TableCell>
                      {clientDetails.payment_status}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminClientDetails
