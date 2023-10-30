import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice";

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT } =
	authSlice.actions;
export const authReducer = authSlice.reducer;

const rootReducer = combineReducers({
	auth: authSlice.reducer,
});

export default rootReducer;
