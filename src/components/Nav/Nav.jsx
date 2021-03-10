import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import PaymentIcon from '@material-ui/icons/Payment';



function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/coach/dashboard">
        <h2 className="nav-title">Talent Signal Application</h2>
      </Link>
      <div>
       
       {/* Only shows when logged in */}
       {/* DELETE ME WHEN DONE WITH TESTING */}
       {!user.id && (
         <Link className="navLink" to ="/register">
           Register
         </Link>
       )}
        {/* Coach Nav Bar */}
        {user.clearance == 0 && (
          <>
            <Link className ="navLink" to="/coach/clientList">
              <AccountCircleIcon/>Clients
            </Link>
            <Link className="navLink" to="/coach/payoutDetails">
              <PaymentIcon/>Payouts
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
        
        {/* Admin Nav Bar */}
        {user.clearance > 0 && (
          <>
            <Link className ="navLink" to="/admin/addUser">
              Add User
            </Link>
            <Link className ="navLink" to="/admin/coachList">
              Coaches
            </Link>
            <Link className ="navLink" to="/admin/clientList">
              <AccountCircleIcon/>Clients
            </Link>
            <Link className="navLink" to="/admin/payouts">
              <PaymentIcon/>Payouts
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
