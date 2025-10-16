// src/pages/register.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";
import { handleError } from "../api/Api";

// ====== Validators khớp backend ======
const USERNAME_RULE =
  "3–20 ký tự, chỉ chữ/số/_ ; không bắt đầu/kết thúc bằng _.";
function validateUsername(u) {
  if (!u) return "Vui lòng nhập tên đăng nhập.";
  const v = u.trim();
  if (v.length < 3 || v.length > 20) return "Tên đăng nhập phải 3–20 ký tự.";
  if (!/^[A-Za-z0-9_]+$/.test(v))
    return "Chỉ được chứa chữ cái, số và dấu gạch dưới (_).";
  if (v.startsWith("_") || v.endsWith("_"))
    return "Không được bắt đầu hoặc kết thúc bằng dấu gạch dưới (_).";
  return "";
}

const PASSWORD_RULE =
  "6–18 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt, không có khoảng trắng.";
function validatePassword(pw) {
  if (!pw) return "Vui lòng nhập mật khẩu.";
  if (pw.length < 6 || pw.length > 18) return "Mật khẩu phải từ 6–18 ký tự.";
  if (pw.includes(" ")) return "Mật khẩu không được chứa khoảng trắng.";
  if (!/[A-Z]/.test(pw)) return "Phải có ít nhất 1 chữ hoa.";
  if (!/[a-z]/.test(pw)) return "Phải có ít nhất 1 chữ thường.";
  if (!/\d/.test(pw)) return "Phải có ít nhất 1 số.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw))
    return "Phải có ít nhất 1 ký tự đặc biệt.";
  return "";
}

function validateConfirm(pw, c) {
  if (!c) return "Vui lòng xác nhận mật khẩu.";
  if (pw !== c) return "Mật khẩu xác nhận không khớp.";
  return "";
}

function validatePhone(p) {
  if (!p) return ""; // tuỳ chọn
  const v = p.trim();
  if (!/^[0-9]+$/.test(v)) return "Số điện thoại chỉ gồm chữ số.";
  if (v.length < 10 || v.length > 15) return "SĐT 10–15 chữ số.";
  return "";
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const usernameError = useMemo(
    () => validateUsername(form.username),
    [form.username]
  );
  const pwError = useMemo(
    () => validatePassword(form.password),
    [form.password]
  );
  const confirmError = useMemo(
    () => validateConfirm(form.password, form.confirmPassword),
    [form.password, form.confirmPassword]
  );
  const phoneError = useMemo(() => validatePhone(form.phone), [form.phone]);

  const isFormInvalid =
    !!usernameError || !!pwError || !!confirmError || !!phoneError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isFormInvalid) {
      setError(
        usernameError || pwError || confirmError || phoneError || "Thiếu thông tin."
      );
      return;
    }

    try {
      setLoading(true);

      // CHÚ Ý: Không gửi field tuỳ chọn nếu trống (để tránh 422)
      const payload = {
        username: form.username.trim(),
        password: form.password,
        ...(form.email.trim() ? { email: form.email.trim() } : {}),
        ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
        ...(form.address.trim() ? { address: form.address.trim() } : {}),
      };

      const res = await userApi.createUser(payload); // POST /users/

      if (res?.id) {
        setSuccess("Đăng ký thành công! Đang chuyển hướng…");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setError("Không thể đăng ký. Vui lòng thử lại.");
      }
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra khi đăng ký.");
      // Debug thêm nếu cần:
      // console.log("Register error raw:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center justify-center bg-gray-50 min-h-screen flex">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Đăng ký tài khoản mới
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Tên đăng nhập{" "}
              <span className="text-gray-400">({USERNAME_RULE})</span>
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="vd: user_123"
              required
              aria-invalid={!!usernameError}
            />
            {usernameError && (
              <p className="text-red-500 text-xs mt-1">{usernameError}</p>
            )}
          </div>

          {/* Email (optional) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email (tuỳ chọn)
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="vd: you@example.com"
            />
          </div>

          {/* Phone (optional, digits only 10–15) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Số điện thoại (tuỳ chọn)
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Chỉ số, 10–15 ký tự"
              inputMode="numeric"
              pattern="[0-9]*"
              aria-invalid={!!phoneError}
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
          </div>

          {/* Address (optional) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Địa chỉ (tuỳ chọn)
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Tối đa 255 ký tự"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Mật khẩu{" "}
              <span className="text-gray-400">({PASSWORD_RULE})</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Nhập mật khẩu"
              required
              aria-invalid={!!pwError}
            />
            {pwError && <p className="text-red-500 text-xs mt-1">{pwError}</p>}
          </div>

          {/* Confirm password */}
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
              aria-invalid={!!confirmError}
            />
            {confirmError && (
              <p className="text-red-500 text-xs mt-1">{confirmError}</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading || isFormInvalid}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition duration-150"
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
