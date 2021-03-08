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

// Admin Components 
import AdminDashboard from '../AdminDashboard/AdminDashboard'

// spike component
import ParseSpike from '../ParseSpike/ParseSpike'

//Add User Component
import UserForm from '../UserForm/UserForm'


import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Route>
          <ParseSpike path="/parsespike" exact/>
        </Route>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />

          {/* Visiting localhost:3000/about will show the about page. */}
         

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}


          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}


          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
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



          {/* Coach Component Routes */}
          <ProtectedRoute
            exact 
            path = '/coach/dashboard'
          >
            <CoachDashboard/>
          </ProtectedRoute>
          
          {/* Admins only suckas */}
          <ProtectedAdmin
            exact
            path = '/admin/dashboard'
          >
            <AdminDashboard/>
          </ProtectedAdmin>
         
          <Route path="/addUser" >
          <UserForm />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
