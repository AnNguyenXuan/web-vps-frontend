import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full h-24 sticky top-0 bg-white text-black z-50 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">
          VPS Hosting Manager
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/vps"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            VPS
          </NavLink>
          <NavLink
            to="/storage"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            S3 Storage
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
