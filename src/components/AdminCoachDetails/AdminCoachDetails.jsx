import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
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
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInputBase-input": {
      width: "25ch",
    },
    "& .MuiDataGrid-row": {
      cursor: 'pointer',
      color: '#333'
    },
    margin: "5px"
  },
  header: {
    backgroundColor: '#0026FF',
    color: 'white',
  },
    input: {
      width: "25ch",
      margin: "10px",
    },
}))

function AdminCoachDetails(props) {
  const classes = useStyles();
  const history = useHistory();
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
    active: coachDetails.active
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
      active: coachDetails.active
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
  let totalMoneyMade = [];
  // variable to store the values of the "amounts" in the payments table for each client
  let totalPayout = [];
  let moneyMade = 0;



  if (coachDetails?.payments) {
    const filteredPayments = coachDetails?.payments.filter(function (el) {
      return el != null;
    });
    //checks if is_paid is true, if true, add to total, if false (failed, pending, or otherwise) do not add to total
    for (let payment of filteredPayments) {
      if (payment.is_paid) {
        totalPayout.push(payment?.amount)
      }
    }
    for (let i = 0; i < totalPayout.length; i++) {
      moneyMade += parseInt(totalPayout[i])
    }
    totalMoneyMade.push(moneyMade)
  }

  // total money that the coach has brought in for the company
  let totalRevenue = totalMoneyMade[0] * 0.25

  // ------DATAGRID-------
  const columns = [
    {
      field: 'name',
      headerName: 'Full Name',
      flex: 1,
      sort: true,
      valueGetter: getFullName,
      headerClassName: classes.header
    },
    {
      field: 'contract_id',
      headerName: 'Contract ID',
      flex: 1,
      sort: true,
      headerClassName: classes.header
    },
    {
      field: 'coaching_status',
      headerName: 'Coaching Status',
      flex: 1,
      sort: true,
      description: 'Current coaching status of the client',
      headerClassName: classes.header
    },
    {
      field: 'contract_status',
      headerName: 'Contract Status',
      description: 'Current contract status of the client',
      flex: 1,
      sort: true,
      headerClassName: classes.header
    },
  ]
  function getFullName(params) {
    return `${params.getValue(`first_name` || '')} ${params.getValue(`last_name` || '')}`;
  }

  function handleRowClick(event) {
    let clientId = event.row.id;
    history.push(`/admin/clientDetails/${clientId}`)
  }

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
            {totalRevenue > 1 && <h3>Product ID: {coachDetails.payments[0].product_id}</h3>}
            {coachDetails.active ? <h3>Coach Status: Active</h3> : <h3>Coach Status: Inactive</h3>}
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
            <FormControl className={classes.input}>
              <InputLabel id="coach-status">Change Status</InputLabel>
              <Select
                name="active"
                value={coachDetails.active}
                onChange={handleCoachChange}
                labelId="coach-status"
              >
                <MenuItem value={true}>Set Coach As Active</MenuItem>
                <MenuItem value={false}>Set Coach As Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={updateCoach}>Update Coach</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Dialog>

          <h3>Clients:</h3>
          {coachDetails.clients[0] &&
            <div style={{ width: '85%', display: 'flex' }} className={classes.root, "center_table"}>
              <DataGrid rowHeight={40} autoHeight={true} rows={coachDetails.clients} columns={columns} pageSize={5} checkboxSelection={false} onRowClick={handleRowClick} />
            </div>}
          {/* <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Contract ID</TableCell>
                    <TableCell>Coaching Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coachDetails?.clients.map((client) => (
                    <TableRow key={client?.id}>
                      <TableCell>
                        {client?.first_name}{" "}
                        {client?.last_name}
                      </TableCell>
                      <TableCell>
                        {client?.contract_id}
                      </TableCell>
                      <TableCell>
                        {client?.coaching_status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>  */}

        </>
      )}
    </div>
  )
}

export default AdminCoachDetails
