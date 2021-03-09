import { useState } from "react"
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
    },
    userForm: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
    },
}))

const UserForm = () => {
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
        <>
            <h1>Add a new user:</h1>
            <div className={classes.userForm}>
                <form className={classes.root} onSubmit={addUser}>
                    <FormControl>
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
                            />
                            <TextField
                                required
                                name="lastName"
                                label="Last Name"
                                onChange={handleCoachChange}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                onChange={handleCoachChange}
                            />
                            <TextField
                                required
                                name="phone"
                                label="Phone"
                                onChange={handleCoachChange}
                            />

                            <TextField
                                required
                                name="programID"
                                label="Program ID"
                                onChange={handleCoachChange}
                            />
                            <TextField
                                required
                                name="startDate"
                                label="Start Date"
                                onChange={handleCoachChange}
                            />
                            <TextField
                                required
                                name="business"
                                label="Business Name"
                                onChange={handleCoachChange}
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
                            />
                            <TextField
                                required
                                name="lastName"
                                label="Last Name"
                                onChange={handleClientChange}
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                onChange={handleClientChange}
                            />
                            <TextField
                                required
                                name="phone"
                                label="Phone"
                                onChange={handleClientChange}
                            />
                            <FormControl>
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
        </>
    )
}

export default UserForm
