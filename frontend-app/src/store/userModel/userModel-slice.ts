import { UserModel } from "./user-api-slice";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface userModelList {
  users: UserModel[];
}
const initialState: userModelList = {
  users: [],
};

const userModelSlice = createSlice({
  name: "userModel",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserModel[] | any>) {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userModelSlice.actions;
export default userModelSlice.reducer;
