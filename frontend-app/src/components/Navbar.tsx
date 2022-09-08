import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Modal,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Login from "./Login";

const Navbar = () => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  let navigate = useNavigate();
  let userInfo: any;
  const [cookies, setCookies, removeCookie] = useCookies();
  const token: any = cookies.token;
  if (token != null) {
    userInfo = jwtDecode(token);
  }
  // logout model
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // login model
  const [LoginOpen, setLoginOpen] = useState(false);
  const loginModelOpen = () => setLoginOpen(true);
  const loginModelClose = () => setLoginOpen(false);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <AdminPanelSettingsIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              component="button"
              variant="h6"
              underline="none"
              color="inherit"
              onClick={() => {
                navigate("/");
              }}
            >
              ADMIN DASHBOARD
            </Link>
          </Typography>
          {userInfo == undefined ? (
            <Stack direction="row" spacing={6}>
              <Link
                component="button"
                variant="h6"
                underline="none"
                color="inherit"
                onClick={loginModelOpen}
              >
                LOGIN
              </Link>
              <Login modelOpen={LoginOpen} modelClose={loginModelClose}></Login>
            </Stack>
          ) : (
            <Stack direction="row" spacing={6}>
              <Typography variant="h6">Welcome:-{userInfo.email}</Typography>
              <Link
                component="button"
                variant="h6"
                underline="none"
                color="inherit"
                onClick={handleOpen}
              >
                LOGOUT
              </Link>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      {/* logout model */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            ARE YOU SURE WANT TO LOGOUT!!!
          </Typography>
          <Stack sx={{ mt: 2 }} direction="row" spacing={3}>
            <Button
              sx={{ ml: 7 }}
              color="inherit"
              variant="contained"
              size="small"
              onClick={() => {
                removeCookie("token");
                navigate("/");
                handleClose();
              }}
            >
              YES
            </Button>
            <Button
              color="inherit"
              variant="contained"
              size="small"
              onClick={handleClose}
            >
              NO
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
