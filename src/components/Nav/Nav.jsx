import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import PaymentIcon from '@material-ui/icons/Payment';
import SportsIcon from '@material-ui/icons/Sports'
import HomeIcon from '@material-ui/icons/Home'



function Nav() {
  const user = useSelector((store) => store.user);
  const navLinkText = "payments";
  

  const handleClick = (e) =>{
    console.log('value of clicked', e);
  }
  return (
    <div className="nav">
      <div className='titleContainer'>
        <Link to="/coach/dashboard">
          <h2 className="nav-title">Talent Signal</h2>
        </Link>
      </div>
      <div className='linkContainer'>
       
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
            {/* -- use pathname for link to determine if arrive at payment details via navbar or by coach dashboard. See Coach Payout Details component for further explanation.  */}
            <Link className="navLink" value='payments' 
            to={{pathname: `/coach/payoutDetails/${navLinkText}`}}
            
            >
              <PaymentIcon/>Payouts
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
        
        {/* Admin Nav Bar */}
        {user.clearance > 0 && (
          <>
            <Link className ="navLink" to="/admin/dashboard">
            <HomeIcon /> <br/>Home
            </Link>
            <Link className ="navLink" to="/admin/addUser">
            <GroupIcon /> <br/>Add User
            </Link>
            <Link className ="navLink" to="/admin/coachList">
              <SportsIcon /><br/>Coaches
            </Link>
            <Link className ="navLink" to="/admin/clientList">
              <AccountCircleIcon/><br/>Clients
            </Link>
            <Link className="navLink" to="/admin/payouts">
              <PaymentIcon/><br/>Payouts
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
