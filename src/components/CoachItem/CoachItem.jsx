import { useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


const useStyles = makeStyles(() => ({
    check: {
        color: 'green'
    },
    delete: {
        color: 'red'
    },
    deny: {
        color: 'orange'
    }
}))


function CoachItem({ coach }) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const handleDelete = () => {
        dispatch({ type: 'DELETE_COACH', payload: coach.id });
    }

    const handleStatus= () => {
        dispatch({ type: 'TOGGLE_APPROVE', payload: coach.id });
    }
    return (
        <div>
            {coach.is_approved
                ? <Tooltip title="unapprove">
                    <IconButton onClick={handleStatus} className={classes.deny}>
                        <RemoveCircleIcon />
                    </IconButton>
                </Tooltip>
                : <Tooltip title="approve status">
                    <IconButton onClick={handleStatus} className={classes.check}>
                        <CheckIcon />
                    </IconButton>
                </Tooltip>
            }
            <Tooltip title="remove coach">
                <IconButton onClick={handleDelete} className={classes.delete}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}


export default CoachItem;