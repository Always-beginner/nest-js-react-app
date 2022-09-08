import custom_axios from "../axios/axiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLoginUserMutation } from "../store/authModel/auth-Api-slice";
interface LoginModelProps {
  modelOpen: any;
  modelClose: any;
}
const Login = (props: LoginModelProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
  };
  let navigate = useNavigate();
  let email: any = useRef();
  let password: any = useRef();
  const [cookies, setCookies] = useCookies(["token"]);
  // login hook
  const [loginUser] = useLoginUserMutation();
  const loginApp = async () => {
    if (email.current.value == "" || password.current.value == "") {
      toast.info("Please fill the Information");
    } else {
      await loginUser({
        email: email.current.value,
        password: password.current.value,
      })
        .unwrap()
        .then((token) => {
          setCookies("token", token.access_token, {
            path: "/",
            maxAge: 300,
          });
          props.modelClose();
          toast.success("Login Successfully");
          navigate("/");
        })
        .catch((error) => toast.warn(error.data.message.toString()));
    }
  };

  return (
    <Modal open={props.modelOpen} onClose={props.modelClose}>
      <Box sx={style}>
        <IconButton
          onClick={props.modelClose}
          color="error"
          size="large"
          sx={{ alignSelf: "end" }}
        >
          <CancelIcon></CancelIcon>
        </IconButton>
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
    </Modal>
  );
};

export default Login;
