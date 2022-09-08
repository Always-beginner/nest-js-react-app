import { useRef } from "react";
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
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../store/userModel/user-api-slice";

interface ModelProps {
  open: boolean;
  onClose: any;
  userData: any;
}
const AddModal = (props: ModelProps) => {
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

  const [cookies, setCookies] = useCookies();

  const token = cookies.token;
  let userName: any = useRef();
  let email: any = useRef();
  let password: any = useRef();

  // add new user
  const [addUser] = useAddUserMutation();
  // edit user
  const [updateUser] = useUpdateUserMutation();
  const addUser2 = async () => {
    if (
      userName.current.value == "" ||
      email.current.value == "" ||
      password.current.value == ""
    ) {
      toast.info("Please fill the Information");
    } else {
      await addUser({
        token: token,
        userData: {
          name: userName.current.value,
          email: email.current.value,
          password: password.current.value,
        },
      })
        .unwrap()
        .then((payload) => {
          props.onClose();
          toast.success("User Add Successfully");
        })
        .catch((error) => toast.error(error.data.message.toString()));
    }
  };
  // update user
  const editUser = async () => {
    if (props.userData == null || undefined) {
      toast.info("User not found");
    }
    if (
      userName.current.value == "" ||
      email.current.value == "" ||
      password.current.value == ""
    ) {
      toast.info("Please fill the Information");
    } else {
      updateUser({
        token: token,
        userData: {
          name: userName.current.value,
          email: email.current.value,
          password: password.current.value,
        },
        userId: props.userData.id,
      })
        .unwrap()
        .then(() => {
          props.onClose();
          toast.success("Updated Successfully");
        })
        .catch((error) => toast.error(error.data.message.toString()));
    }
  };
  return (
    <div>
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            {props.userData.id == null || undefined || ""
              ? "Add new User"
              : "Edit User"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              defaultValue={
                props.userData.id !== null || undefined || ""
                  ? props.userData.name
                  : ""
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
                props.userData.id !== null || undefined || ""
                  ? props.userData.email
                  : ""
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
                props.userData.id == null || undefined || ""
                  ? ""
                  : props.userData.password
              }
              inputRef={password}
              sx={{ mt: 2 }}
              id="password"
              fullWidth
              label="Password"
              type={
                props.userData.id == null || undefined || ""
                  ? "password"
                  : "text"
              }
              required
            ></TextField>
          </Typography>
          <Stack sx={{ mt: 2 }} direction="row" spacing={3}>
            {props.userData.id == null || undefined || "" ? (
              <Button
                color="success"
                variant="outlined"
                aria-label="logo"
                onClick={addUser2}
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
              onClick={props.onClose}
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
