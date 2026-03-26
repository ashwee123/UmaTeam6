import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Sidebar() {
  const { user } = useAuth();

  const role = user?.role || "visitor";

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Park Zones", path: "/area" },
    { label: "Tickets", path: "/tickets" },
  ];

  // 🔥 Role-based additions
  if (role === "employee") {
    navItems.push({ label: "Schedule", path: "/schedule" });
  }

  if (role === "manager") {
    navItems.push({ label: "Manage Staff", path: "/staff" });
  }

  if (role === "admin") {
    navItems.push({ label: "Admin Panel", path: "/admin" });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">☽ NIGHTFALL</div>
        <div className="logo-sub">Where Fear Lives</div>
      </div>

      <div className="sidebar-user-badge">
        <div className="user-avatar">👁</div>
        <div className="user-info">
          <div className="user-name">{user?.name || "Guest"}</div>
          <div className="user-role">{role}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-nav-link${isActive ? " active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}