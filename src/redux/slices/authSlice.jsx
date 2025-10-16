import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import securityApi from "@/api/securityApi";
import { saveTokens, clearTokens } from "@/utils/Token";

// Đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await securityApi.login(username, password);
      saveTokens(data.accessToken, data.refreshToken); // bạn đang lưu sessionStorage
      return data; // {accessToken, refreshToken, ...}
    } catch (err) {
      return rejectWithValue(err?.message || "Đăng nhập thất bại");
    }
  }
);

// Đăng xuất (luôn clear token, kể cả khi API lỗi)
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await securityApi.logout(); // có thể trả 401 nếu hết phiên -> không sao
  } catch (err) {
    // không fail hard; ta vẫn muốn clear token + reset state
    // return rejectWithValue(err?.message || "Đăng xuất thất bại"); // nếu bạn muốn hiện toast
  } finally {
    clearTokens();
  }
  return true; // fulfilled
});

// Đăng xuất cưỡng bức (khi refresh token hỏng, 401, v.v.)
export const forceLogout = createAction("auth/forceLogout");

const initialState = {
  user: null,
  accessToken: sessionStorage.getItem("accessToken") || null,
  refreshToken: sessionStorage.getItem("refreshToken") || null,
  isAuthenticated: !!sessionStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // (tùy chọn) cập nhật thông tin user sau khi gọi /me
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken || null;
        state.refreshToken = action.payload.refreshToken || null;
        state.isAuthenticated = !!action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đăng nhập thất bại";
      })

      // LOGOUT (thành công)
      .addCase(logout.fulfilled, () => ({
        ...initialState,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      }))
      // LOGOUT (API lỗi nhưng ta vẫn muốn reset)
      .addCase(logout.rejected, () => ({
        ...initialState,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      }))

      // FORCE LOGOUT (không gọi API)
      .addCase(forceLogout, () => {
        clearTokens();
        return {
          ...initialState,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        };
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
