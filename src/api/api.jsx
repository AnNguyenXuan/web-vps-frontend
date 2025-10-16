import axios from "axios";

const BASE_URL = "http://s3.click:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

// ✅ GẮN BEARER TOKEN CHO MỌI REQUEST (trừ khi skipAuth)
api.interceptors.request.use(
  (config) => {
    if (config.skipAuth) return config;
    const at = sessionStorage.getItem("accessToken");
    if (at) config.headers.Authorization = `Bearer ${at}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ AUTO-REFRESH KHI 401, SAU ĐÓ RETRY 1 LẦN
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const rt = sessionStorage.getItem("refreshToken");
      if (!rt) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // 🔁 ĐÚNG endpoint backend của bạn: /auth/refresh-token
          const { data } = await api.post(
            "/auth/refresh-token",
            { refreshToken: rt },
            { skipAuth: true }
          );
          const newAT = data?.accessToken;
          if (!newAT) throw new Error("No accessToken returned");

          sessionStorage.setItem("accessToken", newAT);
          // backend không trả refreshToken mới → giữ nguyên RT
          processQueue(null, newAT);
          isRefreshing = false;

          original.headers.Authorization = `Bearer ${newAT}`;
          return api(original);
        } catch (e) {
          isRefreshing = false;
          processQueue(e, null);
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          return Promise.reject(e);
        }
      }

      // đang refresh → xếp hàng đợi
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    return Promise.reject(error);
  }
);

export const handleError = (error) => {
  const fullURL = error.config?.baseURL
    ? `${error.config.baseURL}${error.config.url || ""}`
    : error.config?.url || "Unknown URL";

  if (error.response) {
    const data = error.response.data;
    const httpMethod = error.config?.method?.toUpperCase() || "UNKNOWN";
    const statusCode = error.response.status;

    // ▶️ parse 422 của FastAPI (nếu cần)
    if (statusCode === 422 && Array.isArray(data?.detail)) {
      const msg = data.detail
        .map((d) => {
          const path = Array.isArray(d.loc) ? d.loc.slice(1).join(".") : "";
          return path ? `${path}: ${d.msg}` : d.msg;
        })
        .join("; ");
      throw { success: false, message: msg, url: fullURL, method: httpMethod, status: statusCode };
    }

    const { success, error_code, message } = data || {};
    throw { success, error_code, message, url: fullURL, method: httpMethod, status: statusCode };
  } else if (error.request) {
    const httpMethod = error.config?.method?.toUpperCase() || "UNKNOWN";
    throw { success: false, message: "Không có phản hồi từ máy chủ.", url: fullURL, method: httpMethod, status: null };
  } else {
    throw error;
  }
};

export default api;
