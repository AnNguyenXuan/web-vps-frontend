import { NavLink } from "react-router-dom";

const itemCls = ({ isActive }) =>
  `block rounded px-3 py-2 text-sm transition ${
    isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
  }`;

export default function Control() {
  return (
    <aside className="w-64 shrink-0 border-r bg-white">
      <div className="p-3 border-b">
        <div className="text-xs font-medium text-gray-500 uppercase">Control</div>
      </div>

      <nav className="p-3 space-y-1">
        <NavLink to="/" end className={itemCls}>
          🏠 Dashboard / Home
        </NavLink>
        <NavLink to="/vps" className={itemCls}>
          🖥️ VPS Instances
        </NavLink>
        <NavLink to="/storage" className={itemCls}>
          🗄️ S3 Buckets
        </NavLink>
        <NavLink to="/domains" className={itemCls}>
          🌐 Domains
        </NavLink>
        <NavLink to="/billing" className={itemCls}>
          💳 Billing
        </NavLink>
        <NavLink to="/settings" className={itemCls}>
          ⚙️ Settings
        </NavLink>
      </nav>
    </aside>
  );
}
