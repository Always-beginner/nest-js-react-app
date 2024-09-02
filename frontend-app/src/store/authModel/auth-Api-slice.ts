import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log(process.env.REACT_APP_REACT_BASE_URL)
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl :`${process.env.REACT_APP_REACT_BASE_URL}/API/auth`,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "login",
          method: "post",
          body: body,
        };
      },
      invalidatesTags: [{ type: "Auth" }],
    }),
  }),
});
export const {useLoginUserMutation}= authApi;