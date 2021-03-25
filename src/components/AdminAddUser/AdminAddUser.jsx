import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
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
        margin: "5px",
    },
    formPageContainer: {
        display: "flex",
        flexFlow: "column",
        // justifyContent: "center",
        alignItems: "center",
        height: "100%",
        // border: '1px solid blue'
    },
    userFormContainer: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        background: '#ffffff',
        borderRadius: '10px',
        
    },
    userForm: {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: '10px',
        marginTop: '5px'
    },
    inputContainer: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: "10px",
        // border: "2px solid pink"
    },
    buttonContainer: {
        marginTop: "10px",
        // border: '1px solid blue',
        width: "100%",
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
    },
    input: {
        width: "25ch",
        margin: "10px",
    },
    buttonSubmit: {
        marginTop: "10px",
        // display: "block",
        width: "225px",
        background: "#0072cc",
        color: "#ffffff",
    },
    buttonCancel: {
        margin: "10px",
        // display: "block",
        width: "225px",
        background: '#001844',
        color: '#ffffff'
    },
    addUserTitle: {
        textTransform: 'uppercase',
        color: ''
    },
}))

function AdminAddUser(props) {
    const coaches = useSelector((store) => store.adminCoaches)
    const [heading, setHeading] = useState("Admin Add User")

    useEffect(() => {
        dispatch({ type: "FETCH_ADMIN_COACHES_DROPDOWN" })
    }, [])

    const classes = useStyles()
    const dispatch = useDispatch()

    const [userType, setUserType] = useState("")
    const [newCoach, setNewCoach] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        programID: "",
        startDate: "",
        business: "",
    })
    const [newClient, setNewClient] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        coachID: "",
        contractID: "",
        contractStatus: "",
        coachingStatus: "",
    })

    const addUser = (e) => {
        e.preventDefault()
        console.log(userType)
        if (userType === "coach") {
            dispatch({ type: "ADD_NEW_COACH", payload: newCoach })
            setNewCoach({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                programID: "",
                startDate: "",
                business: "",
            })
        } else if (userType === "client") {
            // console.log(newClient)
            dispatch({ type: "ADD_NEW_CLIENT", payload: newClient })
            setNewClient({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                coachID: "",
                contractID: "",
                contractStatus: "",
                coachingStatus: "",
            })
        }
    }

    const handleCoachChange = (e) => {
        const value = e.target.value
        setNewCoach({ ...newCoach, [e.target.name]: value })
    }

    const handleClientChange = (e) => {
        const value = e.target.value
        setNewClient({ ...newClient, [e.target.name]: value })
        // console.log(newClient)
    }

    const handleCancel = () => {
        setNewCoach({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            programID: "",
            startDate: "",
            business: "",
        })
        setNewClient({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            coachID: "",
            contractID: "",
            contractStatus: "",
            coachingStatus: "",
        })
        location.reload()
    }

    const fillCoachForm = () => {
        console.log('in fill coach form')
        setNewCoach({
            firstName: "Alexander",
            lastName: "O'Neal",
            email: "dontcriticizealexanderoneal@gmail.com",
            phone: "333-444-5555",
            programID: "funk42bfubw4",
            startDate: "3/1/2021",
            business: "The Time",
        })
    }

    const fillClientForm = () => {
        setNewClient({
            ...newClient,
            firstName: "Jesse",
            lastName: "Johnson",
            email: "jessejohnson@gmail.com",
            phone: "555-666-7777",
            contractID: "jesse",
        })
    }

    return (
        <div className={classes.formPageContainer}>
            <h1 className={classes.addUserTitle}>Add a new user</h1>
            <div className={classes.userFormContainer}>
                <form className={classes.userForm} onSubmit={addUser}>
                    <FormControl className={classes.input}>
                        <InputLabel id="user-type-label">Select User Type</InputLabel>
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
                        <div className={classes.inputContainer} >
                            <TextField
                                required
                                name="firstName"
                                label="First Name"
                                onChange={handleCoachChange}
                                value={newCoach.firstName}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="lastName"
                                label="Last Name"
                                onChange={handleCoachChange}
                                value={newCoach.lastName}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                onChange={handleCoachChange}
                                value={newCoach.email}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="phone"
                                label="Phone"
                                onChange={handleCoachChange}
                                value={newCoach.phone}
                                className={classes.input}
                            />

                            <TextField
                                required
                                name="programID"
                                label="Program ID"
                                onChange={handleCoachChange}
                                value={newCoach.programID}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="startDate"
                                label="Start Date"
                                onChange={handleCoachChange}
                                value={newCoach.startDate}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="business"
                                label="Business Name"
                                onChange={handleCoachChange}
                                value={newCoach.business}
                                className={classes.input}
                            />
                        </div>
                         <div className={classes.buttonContainer}>
                         <Button
                             type="submit"
                             variant="contained"
                             className={classes.buttonSubmit}
                         >
                             Add User
                         </Button>
                         <Button
                             onClick={handleCancel}
                             variant="contained"
                             className={classes.buttonCancel}
                         >
                             Cancel
                         </Button>
                     </div>
                     </>
                        
                    )}

                    {userType === "client" && (
                        <>
                        <div className={classes.inputContainer} >
                            <TextField
                                required
                                name="firstName"
                                label="First Name"
                                onChange={handleClientChange}
                                value={newClient.firstName}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="lastName"
                                label="Last Name"
                                onChange={handleClientChange}
                                value={newClient.lastName}
                                className={classes.input}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                onChange={handleClientChange}
                                value={newClient.email}
                                className={classes.input}
                            />
                            <TextField
                                name="phone"
                                label="Phone"
                                onChange={handleClientChange}
                                value={newClient.phone}
                                className={classes.input}
                            />
                            <TextField
                                name="contractID"
                                label="Contract ID"
                                onChange={handleClientChange}
                                value={newClient.contractID}
                                className={classes.input}
                            />
                            <FormControl className={classes.input}>
                                <InputLabel id="coach-select-label">
                                    Select a Coach
                                </InputLabel>
                                <Select
                                    labelId="coach-select-label"
                                    id="coach-select"
                                    name="coachID"
                                    value={newClient.coachID}
                                    onChange={(e) =>
                                        setNewClient({
                                            ...newClient,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    {coaches.map((coach) => {
                                        return (
                                            <MenuItem
                                                key={coach.id}
                                                value={coach.id}
                                            >
                                                {coach.first_name}{" "}
                                                {coach.last_name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.input}>
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
                                            ...newClient,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value={"open"}>Open</MenuItem>
                                    <MenuItem value={"active"}>Active</MenuItem>
                                    <MenuItem value={"closed"}>Closed</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.input}>
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
                                            ...newClient,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value={"in coaching"}>
                                        In Coaching
                                    </MenuItem>
                                    <MenuItem value={"working"}>
                                        Working
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                         <div className={classes.buttonContainer}>
                         <Button
                             type="submit"
                             variant="contained"
                             className={classes.buttonSubmit}
                         >
                             Add User
                         </Button>
                         <Button
                             onClick={handleCancel}
                             variant="contained"
                             className={classes.buttonCancel}
                         >
                             Cancel
                         </Button>
                     </div>
                     </>
                    )}
                   
                </form>
            </div>
        </div>
    )
}

export default AdminAddUser
