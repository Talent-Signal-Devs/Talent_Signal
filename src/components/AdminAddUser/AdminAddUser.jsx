import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiInputBase-input": {
            width: "25ch",
            
        },
        margin: "5px"
    },
    formPageContainer: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    userFormContainer: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        // border: "2px solid blue"
    },
    userForm: {
      display: "flex",
      flexFlow: "row wrap"
    },
    input: {
      width: "25ch",
      margin: "10px"
    }
}))


function AdminAddUser(props) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Admin Add User');

  const classes = useStyles()
    const dispatch = useDispatch()

    const [userType, setUserType] = useState('')
    const [newCoach, setNewCoach] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        programID: '',
        startDate: '',
        business: '',
    })
    const [newClient, setNewClient] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        coach: '',
        contractID: '',
        contractStatus: '',
        coachingStatus: '',
    })

    const addUser = (e) => {
        e.preventDefault()
        console.log(userType)
        if (userType === "coach") {
            dispatch({ type: 'ADD_NEW_COACH', payload: newCoach })
            setNewCoach({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                programID: '',
                startDate: '',
                business: '',
            })
        } else if (userType === 'client') {
            dispatch({ type: 'ADD_NEW_CLIENT', payload: newClient})
            setNewClient({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                coach: '',
                contractID: '',
                contractStatus: '',
                coachingStatus: '',
            })
        }
    }

    const handleCoachChange = (e) => {
        const value = e.target.value
        setNewCoach({ ...newCoach, [e.target.name]: value })
    }

    const handleClientChange = (e) => {
        const value = e.target.value
        setNewClient({ ...newClient, [e.target.name]: value})
    }

  return (
    <div className={classes.formPageContainer}>
            <h1>Add a new user:</h1>
            <div className={classes.userFormContainer}>
                <form className={classes.userForm} onSubmit={addUser}>
                    <FormControl className={classes.input}>
                        <InputLabel id="user-type-label">User Type:</InputLabel>
                        <Select
                            labelId="user-type-label"
                            id="user-type"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <MenuItem value={"coach"}>Coach</MenuItem>
                            <MenuItem value={"client"}>Client</MenuItem>
                        </Select>
                    </FormControl>
                    {userType === "coach" && (
                        <>
                            <TextField
                                required
                                name="firstName"
                                label="First Name"
                                onChange={handleCoachChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="lastName"
                                label="Last Name"
                                onChange={handleCoachChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                onChange={handleCoachChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="phone"
                                label="Phone"
                                onChange={handleCoachChange}
                                className={classes.input}
                            />

                            <TextField
                                required
                                name="programID"
                                label="Program ID"
                                onChange={handleCoachChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="startDate"
                                label="Start Date"
                                onChange={handleCoachChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="business"
                                label="Business Name"
                                onChange={handleCoachChange}
                                className={classes.input}
                            />
                        </>
                    )}
                    {userType === "client" && (
                        <>
                            <TextField
                                required
                                name="firstName"
                                label="First Name"
                                onChange={handleClientChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="lastName"
                                label="Last Name"
                                onChange={handleClientChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                onChange={handleClientChange}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="phone"
                                label="Phone"
                                onChange={handleClientChange}
                                className={classes.input}
                            />
                            <FormControl className={classes.input}>
                                <InputLabel id="coach-select-label">
                                    Select a Coach
                                </InputLabel>
                                <Select
                                    labelId="coach-select-label"
                                    id="coach-select"
                                    name="coach"
                                    value={newClient.coach}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value={"coach"}>Coach 1</MenuItem>
                                    <MenuItem value={"client"}>Coach 2</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <FormControl>
                                <InputLabel id="contract-status-label">
                                    Contract Status
                                </InputLabel>
                            <Select
                                labelId="contract-status-label"
                                id="contract-status"
                                name="contractStatus"
                                value={newClient.contractStatus}
                                onChange={(e) =>
                                    setNewClient({
                                        ...state,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={"open"}>Open</MenuItem>
                                <MenuItem value={"active"}>Active</MenuItem>
                                <MenuItem value={"closed"}>Closed</MenuItem>
                            </Select>
                        </FormControl>
                            <FormControl>
                                <InputLabel id="coaching-status-label">
                                    Coaching Status
                                </InputLabel>
                            <Select
                                labelId="coaching-status-label"
                                id="coaching-status"
                                name="coachingStatus"
                                value={newClient.coachingStatus}
                                onChange={(e) =>
                                    setNewClient({
                                        ...state,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={"coach"}>In Coaching</MenuItem>
                                <MenuItem value={"client"}>Working</MenuItem>
                            </Select>
                        </FormControl> */}
                        </>
                    )}

                    <Button type="submit">Add User</Button>
                </form>
            </div>
        </div>
  );
}

export default AdminAddUser;
