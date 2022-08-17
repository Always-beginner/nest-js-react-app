import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/axiosSetup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddModal from "./AddModal";
interface UserModel {
  email: string;
  id: number;
  name: string;
  password: string;
}

const DataTable = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState<UserModel[]>([]);
  // modal open state
  const [open, setOpen] = useState<boolean>(false);

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
    if (data.length == 0) getAllUsers();
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
                <TableCell>Actions</TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="logo"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <AddBoxIcon />
                </IconButton>
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
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="logo"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="logo"
                      onClick={() => {
                        deleteUser(row.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AddModal open={open}></AddModal>
        </TableContainer>
      ) : (
        ""
      )}
    </div>
  );
};
export default DataTable;
