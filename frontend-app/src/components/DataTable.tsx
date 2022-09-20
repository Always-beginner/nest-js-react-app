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
import React, { useState } from "react";
import { toast } from "react-toastify";
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
  useGetProductQuery,
} from "../store/userModel/user-api-slice";
import SellIcon from "@mui/icons-material/Sell";
import { useNavigate } from "react-router-dom";
const DataTable = () => {
  const [cookies, setCookies] = useCookies();
  const token = cookies.token;
  const navigate = useNavigate();
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
  const [userId, setUserId] = useState<string>();

  // get products
  const getProduct = (userId: string) => {
    if (userId != null || undefined) {
      console.log(userId);
      setUserId(userId);
    }
  };
  // get all user in table
  const { data } = useGetAllUsersQuery(token);
  if (data && data.length > 0) dispatch(setUsers(data));
  //delete user
  const [deleteUser] = useDeleteUserMutation();
  // edit user in table
  const getUser = async (userId: string) => {
    if (userId != null || undefined) {
      const findUser: any = users.find((user) => user.Id == userId && user);
      setUserUpdate(findUser);
      setOpen(true);
    } else {
      toast.info("UserId not found");
    }
  };
  // delete user in table
  const deleteUser1 = async (userId: string) => {
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
                  <TableCell>{row.Id}</TableCell>
                  <TableCell>{row.email__c}</TableCell>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.password__c}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ mr: 2 }}
                      size="small"
                      aria-label="logo"
                      color="warning"
                      variant="outlined"
                      onClick={() => getUser(row.Id)}
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
                        deleteUser1(row.Id);
                      }}
                    >
                      Delete
                      <DeleteIcon />
                    </Button>
                    <Button
                      sx={{ ml: 2 }}
                      size="small"
                      aria-label="logo"
                      color="info"
                      variant="outlined"
                      onClick={() => getProduct(row.Id)}
                    >
                      products
                      <SellIcon />
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
      {userId != null ? (
        <Products token={token} userId={userId}></Products>
      ) : (
        ""
      )}
    </div>
  );
};
interface productsModel {
  token: string;
  userId: string;
}
export const Products = (props: productsModel) => {
  const { data } = useGetProductQuery({
    token: props.token,
    userId: props.userId,
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default DataTable;
