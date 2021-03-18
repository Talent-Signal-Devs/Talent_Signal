import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    backgroundColor: '#0352C0',
    color: 'white',
  },
  cell: {
    align: 'center',
  },
  headerContainer: {
    display: 'flex',
    width: '100%',
    flexFlow: 'column',
  },
  pageHeading: {
    position: 'relative',
    textTransform: 'uppercase',
    left: '19vh'
    
  },
}))

function AdminClientList(props) {

  const classes = useStyles();
  const clients = useSelector((store) => store.adminClientReducer);

  const [heading, setHeading] = useState('Clients');

  const dispatch = useDispatch();
  const history = useHistory();

  //columns for datagrid
  const columns = [
    {
      field: 'full_name',
      headerName: 'Client',
      flex: .8,
      description: 'Full name of client',
      headerClassName: classes.header,

    },
    {
      field: 'coach_full_name',
      headerName: 'Coach',
      flex: .8,
      description: 'Full name of coach',
      headerClassName: classes.header,
    },
    {
      field: 'contract_id',
      headerName: 'Contract ID',
      flex: .7,
      description: 'Unique ID of signed ISA held between Talent Signal and the job seeker',
      headerClassName: classes.header,
    },
    {
      field: 'coaching_status',
      headerName: 'Coaching Status',
      flex: .7,
      description: 'Denotes whether client is currently receiving job coaching or is currently employed',
      headerClassName: classes.header,
    },
  ]

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_CLIENTS' });
  }, []);

  const handleRowClick = (event) => {
    let input = event.row.id;
    history.push(`/admin/clientDetails/${input}`);
  }

  return (
    <div>
      <div className={classes.headerContainer}>
        <h1 className={classes.pageHeading}>{heading}</h1>
      </div>
      <br />
      <br />
      <div>
        <div style={{width: '80%', display: 'flex'}} className={classes.root, "center_table"}>
          <DataGrid rows={clients} columns={columns} autoHeight={true} pageSize={15} checkboxSelection={false} sortModel={[{ field: 'full_name', sort: 'asc' },]} onRowClick={handleRowClick}/>
        </div>
      </div>
    </div>
  );
}

export default AdminClientList;
