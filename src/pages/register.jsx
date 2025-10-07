import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";
import { handleError } from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
      };
      const res = await userApi.createUser(payload);

      if (res?.id) {
        setSuccess("Đăng ký thành công! Đang chuyển hướng...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("Không thể đăng ký. Vui lòng thử lại.");
      }
    } catch (err) {
      const handled = handleError(err);
      setError(handled?.message || "Có lỗi xảy ra khi đăng ký.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center justify-center bg-gray-50 h-full flex">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Đăng ký tài khoản mới
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Nhập email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-150"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-500 text-sm hover:underline">
            Đã có tài khoản? Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}
