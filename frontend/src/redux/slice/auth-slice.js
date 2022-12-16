import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth-service";
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
      showSuccess(response.message);
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data.message
          : error.response.data.message;
      await showError(message);
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
      await showSuccess(response.message);
      return { data: response.access_token };
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data.message
          : error.response.data.message;
      await showError(message);
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
      await showSuccess(response.message);
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data.message
          : error.response.data.message;
      await showError(message);
      return thunkAPI.rejectWithValue();
    }
  }
);
export const otpSlice = createAsyncThunk(
  "otp",
  async ({ otp, email, verifyToken }, thunkAPI) => {
    try {
      const response = await authService.otp(otp, email, verifyToken);
      console.log("otp, email, verifyToken", otp, email, verifyToken);

      await showSuccess(response.message);
      
      return { email, verifyToken,otp };
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data.message
          : error.response.data.message;
      await showError(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const resetPasswordSlice = createAsyncThunk(
  "reset-password",
  async ({ password, confirmPassword, email, verifyToken }, thunkAPI) => {
    try {
      const response = await authService.resetPassword(
        password,
        confirmPassword,
        email,
        verifyToken
      );
      await showSuccess(response.message);
    } catch (error) {
      console.log("reset password==============",error);
      const message =
        error.response && error.response.data
          ? error.response.data.message
          : error.response.data.message;
      await showError(message);
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
    [otpSlice.fulfilled]: (state, action) => {
      state.otp=action.payload
    },
    [otpSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [resetPasswordSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.resetPassword=action.payload
    },
    [resetPasswordSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
