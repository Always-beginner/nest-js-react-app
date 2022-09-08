import { authApi } from "./authModel/auth-Api-slice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./userModel/user-api-slice";
import userModelSliceReducer from "./userModel/userModel-slice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
export const store = configureStore({
  reducer: {
    usersModel: userModelSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
