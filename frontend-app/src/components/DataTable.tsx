import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/axiosSetup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddModal from "./AddModal";
import { useCookies } from "react-cookie";
interface UserModel {
  email: string;
  id: number;
  name: string;
  password: string;
}
interface props {
  reload?: boolean;
}
const DataTable: React.FC = () => {
  const [cookies, setCookies] = useCookies();
  const token = cookies.token;
  const [data, setData] = useState<UserModel[]>([]);
  // modal open state
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (reason: string) => {
    setOpen(false);
    setUserUpdate({});
  };
  const [userUpdate, setUserUpdate] = useState({});

  const tableReload = () => getAllUsers();
  // get all user in table
  const getAllUsers = async () => {
    if (token != null) {
      const tableData = await custom_axios.get(ApiConstants.USER.FIND_ALL, {
        headers: { Authorization: "Bearer " + token },
      });
      setData(tableData.data);
    } else {
      console.log("token not found");
    }
  };
  // edit user in table
  const getUser = async (userId: number) => {
    if (userId != null || undefined) {
      try {
        const user = await custom_axios.get(
          ApiConstants.USER.FIND_BY_ID(userId),
          { headers: { Authorization: "Bearer " + token } }
        );
        setUserUpdate(user.data);
        setOpen(true);
      } catch (error) {
        toast.error("User not found");
      }
    }
  };
  // delete user in table
  const deleteUser = async (userId: number) => {
    const userDelete = await custom_axios.delete(
      ApiConstants.USER.DELETE_USER(userId),
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    getAllUsers();
    toast.success("User Deleted Successfully!!");
  };

  // reload with use effect
  useEffect(() => {
    if (data.length == 0) {
      getAllUsers();
    }
  }, []);
  return (
    <div>
      {token != null ? (
        <TableContainer
          component={Paper}
          sx={{ my: 10, mx: "auto", width: 1000, height: 400 }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="success"
                    variant="outlined"
                    aria-label="logo"
                    onClick={handleOpen}
                  >
                    add
                    <AddBoxIcon sx={{ ml: 1 }} />
                  </Button>{" "}
                </TableCell>
                <AddModal
                  open={open}
                  onClose={handleClose}
                  userData={userUpdate}
                  reloadTable={tableReload}
                ></AddModal>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ mr: 2 }}
                      size="small"
                      aria-label="logo"
                      color="warning"
                      variant="outlined"
                      onClick={() => getUser(row.id)}
                    >
                      edit
                      <EditIcon />
                    </Button>
                    <Button
                      size="small"
                      aria-label="logo"
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        deleteUser(row.id);
                      }}
                    >
                      Delete
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </div>
  );
};
export default DataTable;
