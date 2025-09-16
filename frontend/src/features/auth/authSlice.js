import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./authApi";

// const initialState = {
//   value: 0,
// };
export const registration = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.registration(data);
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
      const res = await authAPI.login(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.verifyEmail(data);
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
      const res = await authAPI.forgotPassword(data);
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
      const res = await authAPI.resetPassword(token, data);
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
    loading: false,
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
        state.user = {
          email: action.payload.email,
          userName: action.payload.userName,
        };
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(forgot.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
