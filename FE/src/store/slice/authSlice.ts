import { setAuthToken } from "@/libs/API";
import { UserAPI } from "@/Types/UserAPI";
import { createSlice } from "@reduxjs/toolkit";

const intialState: UserAPI = {
	id: 0,
	email: "",
	// password: "",
	fullname: "",
	bio: "",
	profile_picture: "",
	username: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState: intialState,
	reducers: {
		AUTH_LOGIN: (_, action) => {
			const payload = action.payload;
			console.log(payload);
			setAuthToken(payload.token);
			localStorage.setItem("token", payload.token);

			const user: UserAPI = {
				id: payload.user.id,
				email: payload.user.email,
				fullname: payload.user.fullname,
				bio: payload.user.bio,
				profile_picture: payload.user.profile_picture,
				username: payload.user.username,
			};

			return user;
		},
		AUTH_CHECK: (_, action) => {
			const payload = action.payload;

			const user: UserAPI = {
				id: payload.id,
				fullname: payload.fullname,
				username: payload.username,
				email: payload.email,
				bio: payload.bio,
				profile_picture: payload.profile_picture,
			};

			return user;
		},
		AUTH_ERROR: () => {
			localStorage.removeItem("token");
		},
		AUTH_LOGOUT: () => {
			localStorage.removeItem("token");
		},
	},
});
