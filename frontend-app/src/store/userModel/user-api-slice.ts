import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface UserModel {
  	id: number;
	email: string;
	name: string;
	password: string;
}
export interface CustomErrors {
	data: {
		message: any[];
	};
}
export const apiSlice = createApi({
	reducerPath: "apiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl:`${process.env.REACT_APP_REACT_BASE_URL}/API/user/`,
	}),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getAllUsers: builder.query<
			UserModel[],
			string
		>({
			query: (token: string) => {
				return {
					url: "getAllUsers",
					headers: {
						Authorization: "Bearer " + token,
					},
				};
			},
			providesTags: [
				{ type: "Users", id: "List" },
			],
		}),
		addUser: builder.mutation({
			query: (body: {
				token: string;
				userData: Partial<UserModel>;
			}) => {
				return {
					url: "createUser",
					method: "post",
					headers: {
						Authorization: "Bearer " + body.token,
					},
					body: body.userData,
				};
			},
			invalidatesTags: [
				{ type: "Users", id: "List" },
			],
		}),
		updateUser: builder.mutation({
			query: (body: {
				token: string;
				userData: Partial<UserModel>;
				userId: number;
			}) => {
				return {
					url: `updateUser/${body.userId}`,
					method: "PATCH",
					headers: {
						Authorization: "Bearer " + body.token,
					},
					body: body.userData,
				};
			},
			invalidatesTags: [
				{ type: "Users", id: "List" },
			],
		}),
		deleteUser: builder.mutation({
			query: (body: {
				token: string;
				userId: number;
			}) => {
				return {
					url: `deleteUser/${body.userId}`,
					method: "delete",
					headers: {
						Authorization: "Bearer " + body.token,
					},
				};
			},
			invalidatesTags: [
				{ type: "Users", id: "List" },
			],
		}),
	}),
});

export const {
	useGetAllUsersQuery,
	useAddUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
} = apiSlice;
