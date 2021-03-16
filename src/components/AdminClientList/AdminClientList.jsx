import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ToolTip from '@material-ui/core/ToolTip';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from '@material-ui/data-grid';



const useStyles = makeStyles(() => ({
  tableRow: {
    backgroundColor: 'aliceblue',
    '&:hover': {
      opacity: '80%',
      backgroundColor: 'lightblue'
    }
  },
  table: {
    minWidth: '100px',
    width: '1200px',
    margin: 'auto',
    textAlign: 'center',
    borderCollapse: 'collapse',
  },
  header: {
    backgroundColor: '#0026FF',
    color: 'white',
  },
  cell: {
    align: 'center',
  }
}))

function AdminClientList(props) {

  const classes = useStyles();
  const clients = useSelector((store) => store.adminClientReducer);

  const [heading, setHeading] = useState('Admin Client List');

  const dispatch = useDispatch();
  const history = useHistory();

  //columns for datagrid
  const columns = [
    {
      field: 'full_name',
      headerName: 'Client',
      flex: .8,
      desription: 'Full name of client',
      headerClassName: classes.header,

    },
    {
      field: 'coach_full_name',
      headerName: 'Coach',
      flex: .8,
      desription: 'Full name of coach',
      headerClassName: classes.header,
    },
    {
      field: 'contract_id',
      headerName: 'Contract ID',
      flex: .7,
      desription: 'Unique ID of signed ISA held between you and the client',
      headerClassName: classes.header,
    },
    {
      field: 'coaching_status',
      headerName: 'Coaching Status',
      flex: .7,
      desription: 'Denotes whether client is currently receiving job coaching or is currently employed',
      headerClassName: classes.header,
    },
  ]

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_CLIENTS' });
  }, []);

  const handleRowClick = (input) => {
    // dispatch({type: 'GET_CLIENT_DETAILS', payload: input})
    history.push(`/admin/clientDetails/${input}`);
  }

  return (
    <div>
      <div>
        <h2>{heading}</h2>
      </div>
      <br />
      <br />
      <div>
        <div style={{ height: 600, width: '80%', display: 'flex', cursor: 'pointer'}} className="center_table">
          <DataGrid rows={clients} columns={columns} pageSize={15} checkboxSelection={false} onRowClick={(event)=>handleRowClick(event.row.id)}/>
        </div>
      </div>
    </div>
  );
}

export default AdminClientList;
