import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import {Button, InputBase, Box} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  button: {
    background: '#0026ff',
    color: '#f4f4f4',
    
  },
  input: {
    width: "100%",
    height: "40px",
    padding: '1rem',
    border: "2px solid #333",
    color: '#333',
    marginTop:'5px'
  }
})

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles()

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2 className="loginTitle">Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="email">
          Email:
        </label>
          <InputBase
            className = {classes.input}
            type="text"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Username (Email)"
          />
      </div>
      <div>
        
          <InputBase
            className={classes.input}
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
       
      </div>
      <Box mt={2}>
        <Button  color="primary" variant = "contained" type="submit" name="submit" value="Log In"> Log In
        </Button>
      </Box>
      
    </form>
  );
}

export default LoginForm;
