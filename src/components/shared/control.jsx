import { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Caret({ open }) {
  return (
    <span
      className={`transition-transform duration-200 inline-block ml-auto ${
        open ? "rotate-90" : ""
      }`}
      aria-hidden="true"
    >
      ▸
    </span>
  );
}

export default function Control() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Cấu hình menu theo nhóm
  const sections = useMemo(
    () => [
      {
        id: "dk-dich-vu",
        title: "Đăng ký dịch vụ",
        items: [
          { to: "/object-storage/register", label: "Đăng ký S3" },
          { to: "/domains/register", label: "Đăng ký Tên miền" },
          // thêm nữa nếu cần...
        ],
      },
      {
        id: "ql-dich-vu",
        title: "Quản lý dịch vụ",
        items: [
          { to: "/object-storage/status", label: "Quản lý S3" },
          { to: "/domains/status", label: "Quản lý Tên miền" },
          { to: "/invoices", label: "Hóa đơn / Thanh toán" },
        ],
      },
      {
        id: "khac",
        title: "Khác",
        items: [
          { to: "/test", label: "Test API" },
        ],
      },
    ],
    []
  );

  const [openGroups, setOpenGroups] = useState(() => new Set([sections[0]?.id]));
  const toggleGroup = (id) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const linkBase =
    "block px-3 py-2 rounded border border-white/20";
  const linkActive = "bg-white/10 border-white/40";

  return (
    <div className="w-1/5 h-full shrink-0 border bg-cyan-800 text-gray-200 flex flex-col">
      <div className="p-3 border-b h-24 flex items-center">
        <div className="text-xs font-medium uppercase text-gray-300">Control</div>
      </div>

      <nav className="p-2 flex flex-col gap-y-2 bg-cyan-700 text-gray-100">
        {sections.map((sec) => {
          const isOpen = openGroups.has(sec.id);
          return (
            <div key={sec.id} className="rounded-lg border border-white/10 hover:bg-cyan-800">
              {/* Header nhóm */}
              <button
                type="button"
                onClick={() => toggleGroup(sec.id)}
                className="w-full flex items-center gap-2 px-3 py-2 font-medium"
                aria-expanded={isOpen}
                aria-controls={`section-${sec.id}`}
              >
                <span>{sec.title}</span>
                <Caret open={isOpen} />
              </button>

              {/* Danh sách con */}
              <div
                id={`section-${sec.id}`}
                className={`grid transition-[grid-template-rows] duration-200 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="p-2 pt-0 space-y-2">
                    {sec.items.map((it) => (
                      <li key={it.to}>
                        <NavLink
                          to={it.to}
                          className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                          }
                          end
                        >
                          {it.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Khu vực login/logout */}
      <div className="flex justify-between p-2 border border-white/20 mt-auto bg-cyan-700">
        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className="block border px-3 py-2 rounded hover:bg-white/10">
              Đăng nhập
            </NavLink>
            <NavLink to="/register" className="block border px-3 py-2 rounded hover:bg-white/10">
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
