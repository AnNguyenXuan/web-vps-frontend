import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Control() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  // Xử lý đăng xuất
  const handleLogout = () => {;
    // localStorage.removeItem("user"); // nếu bạn có lưu thêm user 
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-1/5 h-full shrink-0 border bg-cyan-700 text-gray-200 flex flex-col">
      <div className="p-3 border-b h-24 flex items-center">
        <div className="text-xs font-medium uppercase text-gray-300">Control</div>
      </div>

      {/* Stack dọc các item */}
      <nav className="p-2 flex flex-col gap-y-1 bg-cyan-800 text-gray-100">
        <NavLink
          to="/object-storage"
          className="block px-3 py-2 rounded border border-white/20 hover:bg-white/10"
        >
          Dịch vụ lưu trữ S3
        </NavLink>
        <NavLink
          to="/domains"
          className="block px-3 py-2 rounded border border-white/20 hover:bg-white/10"
        >
          Tên miền
        </NavLink>
      </nav>

      {/* Khu vực login/logout */}
      <div className="flex justify-between p-2 border-t border-white/20 mt-auto">
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/login"
              className="block px-3 py-2 rounded hover:bg-white/10"
            >
              Đăng nhập
            </NavLink>
            <NavLink
              to="/register"
              className="block px-3 py-2 rounded hover:bg-white/10"
            >
              Đăng ký
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="block px-3 py-2 rounded hover:bg-white/10 text-left w-full"
          >
            Đăng xuất
          </button>
        )}
      </div>
    </div>
  );
}
