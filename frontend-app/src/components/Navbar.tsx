import {
  AppBar,
  Button,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

const Navbar = () => {
  let navigate = useNavigate();
  let userInfo: any;
  const [cookies, setCookies, removeCookie] = useCookies();
  const token: any = cookies.token;
  if (token != null) {
    userInfo = jwtDecode(token);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
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
              onClick={() => {
                navigate("/login");
              }}
            >
              LOGIN
            </Link>
          </Stack>
        ) : (
          <Stack direction="row" spacing={6}>
            <Typography variant="h6">Welcome:-{userInfo.email}</Typography>
            <Link
              component="button"
              variant="h6"
              underline="none"
              color="inherit"
              onClick={() => {
                removeCookie("token");
                navigate("/login");
              }}
            >
              LOGOUT
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
