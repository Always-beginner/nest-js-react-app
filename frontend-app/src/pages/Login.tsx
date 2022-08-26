import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import custom_axios from "../axios/axiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { Input, InputBase } from "@mui/material";
import { InputUnstyled } from "@mui/base";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";

const Login = () => {
  let navigate = useNavigate();
  let email: any = useRef();
  let password: any = useRef();
  const [cookies, setCookies] = useCookies(["token"]);
  const loginApp = async () => {
    if (email.current.value == "" || password.current.value == "") {
      toast.info("Please fill the Information");
    }
    try {
      const res = await custom_axios.post(ApiConstants.LOGIN, {
        email: email.current.value,
        password: password.current.value,
      });
      setCookies("token", res.data.access_token, { path: "/", maxAge: 300 });
      toast.success("Login Successfully");
      navigate("/");
    } catch (error: any) {
      if (error.response.status == 401) toast.warn(error.response.data.message);
    }
  };

  const theme = createTheme();
  return (
    <div>
      <Navbar></Navbar>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
              }}
            ></Avatar>
            <Typography component="h1" variant="h5">
              Admin Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                inputRef={email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                inputRef={password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                onClick={loginApp}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;
