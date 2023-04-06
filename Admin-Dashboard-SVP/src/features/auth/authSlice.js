import { createSlice } from "@reduxjs/toolkit";
import { registerAdmin, adminLogin } from "./authActions";

const adminToken = localStorage.getItem("adminToken");

const initialState = {
  loading: false,
  adminInfo: null,
  adminToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("adminToken");
      state.loading = false;
      state.adminInfo = null;
      state.adminToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.adminInfo = payload;
    },
  },

  extraReducers: {
    [adminLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [adminLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.adminInfo = payload;
      state.adminToken = payload.adminToken;
    },
    [adminLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user
    [registerAdmin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
