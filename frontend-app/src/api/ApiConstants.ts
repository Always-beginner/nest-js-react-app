export const ApiConstants = {
  LOGIN: "/API/auth/login",
  USER: {
    FIND_ALL: "API/user/getAllUsers",
    FIND_BY_ID: (userID: number) => {
      return "/API/user/" + userID;
    },
    ADD_USER: "/API/user/createUser",
    UPDATE_USER: (userID: number) => {
      return "/API/user/updateUser/" + userID;
    },
    DELETE_USER: (userID: number) => {
      return "/API/user/deleteUser/" + userID;
    },
  },
};
