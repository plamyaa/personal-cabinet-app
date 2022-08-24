import React from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootReducer } from "../../state/reducer";
import FormLogin from "./formLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const authState = useSelector<IRootReducer, boolean>(state => state.authToggle.isAuth);
  if (authState) {
    navigate("/contacts", { replace: true });
  }
  return (
    <Container sx={{
      width: '900px',
      height: '600px',
      display: 'grid',
      gridTemplateColumns: '450px 450px',
      padding: '0 !important',
    }}>
      <FormLogin />
      <Box
        component='img'
        sx={{
          width: '448px',
          height: 'inherit',
          margin: 'auto 0'
        }}
        src="login-image.jpg"
        alt='Login image'
      />
    </Container>
  )
}

export default LoginPage;