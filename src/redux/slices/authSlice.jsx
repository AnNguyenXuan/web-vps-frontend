// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import securityApi from "../../api/securityApi";
import { saveTokens, clearTokens } from "../../utils/token";

export const login = createAsyncThunk("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const data = await securityApi.login(username, password);
    saveTokens(data.accessToken, data.refreshToken);
    return data;
  } catch (err) {
    return rejectWithValue(err.message || "Đăng nhập thất bại");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await securityApi.logout();
  clearTokens();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: sessionStorage.getItem("accessToken") || null,
    refreshToken: sessionStorage.getItem("refreshToken") || null,  
    isAuthenticated: !!sessionStorage.getItem("accessToken"),  
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
