import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';


import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedAdmin from '../ProtectedAdmin/ProtectedAdmin';

import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';


// Coach Components
import CoachDashboard from '../CoachDashboard/CoachDashboard';
import CoachPayoutDetails from '../CoachPayoutDetails/CoachPayoutDetails';
import CoachClientList from '../CoachClientList/CoachClientList';
import CoachClientDetails from '../CoachClientDetails/CoachClientDetails';

// Admin Components
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminAddUser from '../AdminAddUser/AdminAddUser';
import AdminClientList from '../AdminClientList/AdminClientList';
import AdminClientDetails from '../AdminClientDetails/AdminClientDetails';
import AdminCoachList from '../AdminCoachList/AdminCoachList';
import AdminCoachDetails from '../AdminCoachDetails/AdminCoachDetails';
import AdminPayouts from '../AdminPayouts/AdminPayouts';
import AdminUpload from '../AdminUpload/AdminUpload'
import AdminPayoutsHistory from '../AdminPayoutsHistory/AdminPayoutsHistory'

// spike component
import ParseSpike from '../ParseSpike/ParseSpike'

//Add User Component
import UserForm from '../UserForm/UserForm'


import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2267F2"
    },
    secondary: {
      main: "#F26052"
    },
    background: {
      primary: "#eeeeee"
    }
  }
})

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme ={theme}>
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
          <Redirect exact from="/" to="/login" />

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/coach/dashboard"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/coach/dashboard"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/register"
            authRedirect="/coach/dashboard"
          >
            <RegisterPage/>

          </ProtectedRoute>



          {/* -------- Coach Component Routes ---------- */}
          <ProtectedRoute
            exact
            path = '/coach/dashboard'
          >
            <CoachDashboard/>
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path='/coach/payoutDetails/:id'>
            <CoachPayoutDetails/>
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path='/coach/clientList'>
            <CoachClientList/>
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path='/coach/clientDetails/:id'>
            <CoachClientDetails/>
          </ProtectedRoute>


          {/* -------- Admin Component Routes ---------- */}
          <ProtectedAdmin
            exact
            path = '/admin/dashboard'
          >
            <AdminDashboard/>
          </ProtectedAdmin>

          <Route path="/addUser" >
          <UserForm />
          </Route>

          <ProtectedAdmin
          exact
          path='/admin/addUser'>
            <AdminAddUser/>
          </ProtectedAdmin>

          <ProtectedAdmin
          exact
          path='/admin/clientList'>
            <AdminClientList/>
          </ProtectedAdmin>

          <ProtectedAdmin
          exact
          path='/admin/clientDetails/:id'>
            <AdminClientDetails/>
          </ProtectedAdmin>

          <ProtectedAdmin
          exact
          path='/admin/coachList'>
            <AdminCoachList/>
          </ProtectedAdmin>

          <ProtectedAdmin
          exact
          path='/admin/coachDetails/:id'>
            <AdminCoachDetails/>
          </ProtectedAdmin>

          <ProtectedAdmin
          exact
          path='/admin/payouts'>
            <AdminPayouts/>
          </ProtectedAdmin>

          <ProtectedAdmin
          exact
          path='/admin/upload'>
            <AdminUpload/>
          </ProtectedAdmin>
          <ProtectedAdmin
          exact
          path='/admin/payoutshistory'>
            <AdminPayoutsHistory/>
          </ProtectedAdmin>



          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
