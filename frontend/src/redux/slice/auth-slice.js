import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth-service";
import { setMessage } from "./message-slice";
import { showSuccess, showError } from "../../utills/toasterMessages";

const token = localStorage.getItem("token");

const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };
export const signupSlice = createAsyncThunk(
  "signup",
  async (
    { userName, email, password, idProof, fullName, file, mainRole },
    thunkAPI
  ) => {
    try {
      const response = await authService.register(
        userName,
        email,
        password,
        idProof,
        fullName,
        file,
        mainRole
      );
      thunkAPI.dispatch(showSuccess(response.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showError(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const loginSlice = createAsyncThunk(
  "login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authService.login(email, password);
      console.log("response", response);
      thunkAPI.dispatch(showSuccess(response.message));
      return { data: response.data };
    } catch (error) {
      console.log("---------------",error);
      const message =
        error.response && error.response.data && error.response.data.message || error.response.data.message
      thunkAPI.dispatch(showError(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logoutSlice = createAsyncThunk("logout", async () => {
  authService.logout();
});

export const forgetPasswordSlice = createAsyncThunk(
  "forgot-password",
  async ({ email }, thunkAPI) => {
    try {
      const response = await authService.forgetPassword(email);
      console.log("forgot password mail---------",response.message);
      thunkAPI.dispatch(showSuccess(response.message));
      return response.data;
    } catch (error) {
      console.log("---------------",error);
      const message =
      error.response && error.response.data && error.response.data.message || error.response.data.message
      thunkAPI.dispatch(showError(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signupSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signupSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [loginSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload.user;
    },
    [loginSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logoutSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [forgetPasswordSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [forgetPasswordSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
