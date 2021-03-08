import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

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
            <Link className ="navLink" to="/coaches/clients">
              Clients
            </Link>
            <Link className="navLink" to="/coaches/payouts">
              Payouts
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
        
        {/* Admin Nav Bar */}
        {user.clearance > 0 && (
          <>
            <Link className ="navLink" to="/admin/coaches">
              Coaches
            </Link>
            <Link className ="navLink" to="/admin/clients">
              Clients
            </Link>
            <Link className="navLink" to="/admin/payouts">
              Payouts
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
