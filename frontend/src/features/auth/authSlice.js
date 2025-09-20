import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "./authApi";

export const registration = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.registration(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res.data;
    } catch (error) {
      // return rejectWithValue(error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyEmail(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgot = createAsyncThunk(
  "auth/forgot",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.forgotPassword(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const reset = createAsyncThunk(
  "auth/reset",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPassword(token, {
        password: data.password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: null,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "error";
        state.user = {
          email: action.payload.email,
          username: action.payload.username,
        };
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(registration.fulfilled, (stat, action) => {
        stat.message = action.payload.message;
      })
      .addCase(verify.fulfilled, (stat, action) => {
        stat.message = action.payload.message;
      })
      .addCase(forgot.fulfilled, (stat, action) => {
        stat.message = action.payload.message;
      })
      .addCase(reset.fulfilled, (stat, action) => {
        stat.message = action.payload.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
