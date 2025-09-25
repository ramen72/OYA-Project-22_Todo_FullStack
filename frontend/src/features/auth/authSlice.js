import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "./authApi";

// ================== Async Thunks ==================

// Registration
export const registration = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.registration(data);
      return res.data;
    } catch (error) {
      // return rejectWithValue(error); // As per Sir
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res.data;
    } catch (error) {
      // return rejectWithValue(error); // As per Sir
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Verify Email
export const verify = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyEmail(data);
      return res.data;
    } catch (error) {
      // return rejectWithValue(error); // As per Sir
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Forgot Password
export const forgot = createAsyncThunk(
  "auth/forgot",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.forgotPassword(data);
      return res.data;
    } catch (error) {
      // return rejectWithValue(error); // As per sir
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Reset Password
export const reset = createAsyncThunk(
  "auth/reset",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPassword(token, {
        password: data.password,
      });
      return res.data;
    } catch (error) {
      // return rejectWithValue(error); // As per Sir
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// ================== Slice ==================
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
      // state.user = null; //as per sir
      // state.accessToken = null; //as per sir
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.message = "Logged out successfully";
    },
    // UI থেকে error মুছে দিতে।
    clearError: (state) => {
      state.error = null;
    },

    // UI থেকে message মুছে দিতে।
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== LOGIN ==========
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
          username: action.payload.username,
        };
        state.accessToken = action.payload.accessToken;
        // state.message = "error"; // As per sir
        state.message = "Login successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload.error; // As per Sir
        state.error = action.payload?.message || "Login failed"; // New
      })

      // ========== REGISTRATION ==========
      // New
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        // state.message = action.payload.message; // As per Sir
        state.message = action.payload.message || "Registration successful"; // New
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      // ========== VERIFY ==========
      .addCase(verify.fulfilled, (state, action) => {
        // stat.message = action.payload.message; //As per sir
        state.message = action.payload.message || "Verification successful"; // new
      })
      //new
      .addCase(verify.rejected, (state, action) => {
        state.error = action.payload?.message || "Verification failed";
      })

      // ========== FORGOT ==========
      .addCase(forgot.fulfilled, (state, action) => {
        // state.message = action.payload.message; // As per Sir
        state.message = action.payload.message || "Password reset link sent"; // new
      })
      .addCase(forgot.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Password reset request failed";
      })

      // ========== RESET ==========
      .addCase(reset.fulfilled, (state, action) => {
        // state.message = action.payload.message; // As per Sir
        state.error = state.message =
          action.payload.message || "Password reset successful"; // new
      })
      .addCase(reset.rejected, (state, action) => {
        state.error = action.payload?.message || "Password reset failed"; //new
      });
  },
});

// ================== Export ==================
// Action creators are generated for each case reducer function
export const { logout, clearError, clearMessage } = authSlice.actions;

export default authSlice.reducer;
