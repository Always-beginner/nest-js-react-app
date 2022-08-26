import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast } from "react-toastify";
import custom_axios from "../axios/axiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { useCookies } from "react-cookie";
import EditIcon from "@mui/icons-material/Edit";

interface props {
  open: boolean;
  onClose: any;
  userData: any;
  reloadTable: any;
}
const AddModal: React.FC<props> = ({
  open,
  onClose,
  userData,
  reloadTable,
}) => {
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
  const onReload = () => reloadTable();
  const [cookies, setCookies] = useCookies();

  const token = cookies.token;
  let userName: any = useRef();
  let email: any = useRef();
  let password: any = useRef();

  const addUser = async () => {
    if (
      userName.current.value == "" ||
      email.current.value == "" ||
      password.current.value == ""
    ) {
      toast.info("Please fill the Information");
    } else {
      try {
        const res = await custom_axios.post(
          ApiConstants.USER.ADD_USER,
          {
            name: userName.current.value,
            email: email.current.value,
            password: password.current.value,
          },
          { headers: { Authorization: "Bearer " + token } }
        );
        onClose();
        toast.success("User Add Successfully");
        onReload();
      } catch (error: any) {
        if (error.response.data.statusCode == 401) {
          toast.warn(error.response.data.message.toString());
        } else if (error.response.data.statusCode == 400) {
          toast.warn(error.response.data.message.toString());
        }
      }
    }
  };
  // update user
  const editUser = async () => {
    if (userData == null || undefined) {
      toast.info("User not found");
    }
    if (
      userName.current.value == "" ||
      email.current.value == "" ||
      password.current.value == ""
    ) {
      toast.info("Please fill the Information");
    } else {
      try {
        const res = await custom_axios.patch(
          ApiConstants.USER.UPDATE_USER(userData.id),
          {
            name: userName.current.value,
            email: email.current.value,
            password: password.current.value,
          },
          { headers: { Authorization: "Bearer " + token } }
        );
        onClose();
        toast.success("User Update Successfully");
        onReload();
      } catch (error: any) {
        if (error.response.data.statusCode == 401) {
          toast.warn(error.response.data.message.toString());
        } else if (error.response.data.statusCode == 400) {
          toast.warn(error.response.data.message.toString());
        }
      }
    }
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            {userData.id == null || undefined || ""
              ? "Add new User"
              : "Edit User"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              defaultValue={
                userData.id !== null || undefined || "" ? userData.name : ""
              }
              inputRef={userName}
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
              fullWidth
            ></TextField>
            <TextField
              defaultValue={
                userData.id !== null || undefined || "" ? userData.email : ""
              }
              inputRef={email}
              sx={{ mt: 2 }}
              id="email"
              fullWidth
              label="Email"
              type="email"
              autoComplete="email"
              required
            ></TextField>
            <TextField
              defaultValue={
                userData.id == null || undefined || "" ? "" : userData.password
              }
              inputRef={password}
              sx={{ mt: 2 }}
              id="password"
              fullWidth
              label="Password"
              type={
                userData.id == null || undefined || "" ? "password" : "text"
              }
              required
            ></TextField>
          </Typography>
          <Stack sx={{ mt: 2 }} direction="row" spacing={3}>
            {userData.id == null || undefined || "" ? (
              <Button
                color="success"
                variant="outlined"
                aria-label="logo"
                onClick={addUser}
              >
                Submit
                <PersonAddIcon sx={{ ml: 1 }}></PersonAddIcon>
              </Button>
            ) : (
              <Button
                color="warning"
                variant="outlined"
                aria-label="logo"
                onClick={editUser}
              >
                Save
                <EditIcon sx={{ ml: 1 }}></EditIcon>
              </Button>
            )}

            <Button
              color="error"
              variant="outlined"
              aria-label="logo"
              onClick={onClose}
            >
              Cancel
              <CancelIcon sx={{ ml: 1 }}></CancelIcon>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AddModal;
