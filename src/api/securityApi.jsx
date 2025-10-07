import api, { handleError } from "./api";

const securityApi = {
  /**
   * Đăng nhập và lấy access token + refresh token
   * @param {string} username - Tên người dùng
   * @param {string} password - Mật khẩu
   * @returns {Promise<Object>} Đối tượng chứa access token và refresh token
   */
  login: async (username, password) => {
    try {
      const response = await api.post(
        "/auth/login",
        {
          username,
          password,
        }
      );
      const { accessToken, refreshToken } = response.data;

      // Lưu token vào localStorage
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Đăng xuất người dùng
   * @returns {Promise<Object>} Phản hồi từ server
   */
  logout: async () => {
    try {
      // Gửi yêu cầu logout tới server
      const response = await api.get("/auth/logout");

      // Xóa token khỏi localStorage
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Cấp lại Access Token từ Refresh Token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} Đối tượng chứa access token mới
   */
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post(
        "/auth/refresh-token",
        { refreshToken },
        { skipAuth: true }
      );
      const { accessToken } = response.data;

      // Cập nhật accessToken vào localStorage
      sessionStorage.setItem("accessToken", accessToken);

      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Cấp lại Refresh Token từ Refresh Token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} Đối tượng chứa referesh token mới
   */
  referesh_refreshToken: async (refreshToken) => {
    try {
      const response = await api.post(
        "/auth/refresh-refresh-token",
        { refreshToken },
        { skipAuth: true }
      );
      const { refereshRefereshToken } = response.data;

      // Cập nhật refereshRefereshToken vào localStorage
      sessionStorage.setItem("refereshRefereshToken", refereshRefereshToken);

      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Thay đổi mật khẩu
   * @param {string} currentPassword - Mật khẩu hiện tại
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise<Object>} Phản hồi từ server
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Xác thực mật khẩu
   * @param {string} password - Mật khẩu cần xác thực
   * @returns {Promise<Object>} Phản hồi từ server
   */
  verifyPassword: async (password) => {
    try {
      const response = await api.post("/auth/verify-password", {
        password,
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

export default securityApi;
