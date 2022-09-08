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
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUsers } from "../store/userModel/userModel-slice";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../store/userModel/user-api-slice";

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";

interface deleteError {
  data?: any;
  message?: any;
}
const DataTable = () => {
  const [cookies, setCookies] = useCookies();
  const token = cookies.token;

  const users = ([] = useAppSelector((state) => state.usersModel.users));

  const dispatch = useAppDispatch();
  // modal open state
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (reason: string) => {
    setOpen(false);
    setUserUpdate({});
  };
  const [userUpdate, setUserUpdate] = useState({});

  // get all user in table
  const { data, isLoading, isFetching } = useGetAllUsersQuery(token);
  if (data && data.length > 0) dispatch(setUsers(data));
  //delete user
  const [deleteUser] = useDeleteUserMutation();
  // edit user in table
  const getUser = async (userId: number) => {
    if (userId != null || undefined) {
      const findUser: any = users.find((user) => user.id == userId && user);
      setUserUpdate(findUser);
      setOpen(true);
    } else {
      toast.info("UserId not found");
    }
  };
  // delete user in table
  const deleteUser1 = async (userId: number) => {
    if ((userId != null || undefined) && (token != null || undefined)) {
      await deleteUser({ token, userId })
        .unwrap()
        .then((payload) => {
          toast.success("Deleted Successfully");
        })
        .catch((error) => toast.error(error.data.message));
    }
  };
  return (
    <div>
      {token != null ? (
        <TableContainer
          component={Paper}
          sx={{ my: 10, mx: "auto", width: 1000, height: 400 }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>"Number of User fetch": {users.length}</TableRow>
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
                ></AddModal>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row: any) => (
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
                        deleteUser1(row.id);
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
