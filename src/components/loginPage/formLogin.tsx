import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, FormControl, TextField } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { useDispatch } from "react-redux";
import { isAuth } from "../../state/actions";
import { ACCOUNT_URL } from "../../consts";

const FormLogin = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSingInClick = async () => {
    const response = await fetch(ACCOUNT_URL);
    const data = await response.json();
    if (login === data.login && password === data.password) {
      dispatch(isAuth());
    }
  }
  return (
    <Box sx={{
      margin: 'auto 40px',
    }}>
      <FormControl sx={{
        display: 'grid',
        gridTemplateColumns: '50px auto',
        rowGap: '20px',
        alignItems: 'center',
      }}>
        <AccountCircle sx={{ color: 'action.active' }} fontSize="large" />
        <TextField
          label="Login"
          variant="outlined"
          color="success"
          value={login}
          onChange={handleLoginChange}
        />
        <KeyIcon sx={{ color: 'action.active' }} fontSize="large" />
        <TextField
          label="Password"
          variant="outlined"
          type='password'
          color="success"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          variant="outlined"
          color="success"
          sx={{ gridColumnStart: '2' }}
          onClick={handleSingInClick}
        >Sign In</Button>
      </FormControl>
    </Box>
  );
}

export default FormLogin;