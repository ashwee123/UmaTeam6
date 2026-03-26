import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

// --- Mock data (replace with real API calls) ---
const MOCK_USERS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "manager" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "employee" },
  { id: 4, name: "Dan Brown", email: "dan@example.com", role: "visitor" },
];

const ROLES = ["visitor", "employee", "manager", "admin"];

const ROLE_COLORS = {
  visitor: "#6b7280",
  employee: "#2563eb",
  manager: "#7c3aed",
  admin: "#dc2626",
};

// --- Sub-components ---

function UserManagement({ users, setUsers }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "visitor" });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    if (editingId !== null) {
      setUsers(users.map((u) => (u.id === editingId ? { ...u, ...form } : u)));
      setEditingId(null);
    } else {
      setUsers([...users, { id: Date.now(), ...form }]);
    }
    setForm({ name: "", email: "", role: "visitor" });
    setShowForm(false);
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>User Management</h2>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: "", email: "", role: "visitor" }); }}>
          {showForm ? "Cancel" : "+ Add User"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editingId !== null ? "Edit User" : "New User"}</h3>
          <div className="form-row">
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="btn-primary" onClick={handleSubmit}>
              {editingId !== null ? "Save" : "Create"}
            </button>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className="role-badge" style={{ backgroundColor: ROLE_COLORS[u.role] }}>
                  {u.role}
                </span>
              </td>
              <td>
                <button className="btn-ghost" onClick={() => handleEdit(u)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoleAssignment({ users, setUsers }) {
  const handleRoleChange = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Role Assignment</h2>
      </div>

      <div className="role-legend">
        {ROLES.map((r) => (
          <div key={r} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: ROLE_COLORS[r] }} />
            <span>{r} — {
              r === "visitor" ? "View public info only" :
              r === "employee" ? "View schedules" :
              r === "manager" ? "Edit schedules + view staff" :
              "Full CRUD access"
            }</span>
          </div>
        ))}
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className="role-badge" style={{ backgroundColor: ROLE_COLORS[u.role] }}>
                  {u.role}
                </span>
              </td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                >
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContentManagement() {
  const [items, setItems] = useState([
    { id: 1, title: "Park Opening Hours", type: "announcement", published: true },
    { id: 2, title: "Summer Event Banner", type: "banner", published: false },
    { id: 3, title: "Attraction: Roller Coaster", type: "attraction", published: true },
  ]);
  const [form, setForm] = useState({ title: "", type: "announcement" });
  const [showForm, setShowForm] = useState(false);

  const togglePublish = (id) =>
    setItems(items.map((i) => (i.id === id ? { ...i, published: !i.published } : i)));

  const deleteItem = (id) => setItems(items.filter((i) => i.id !== id));

  const addItem = () => {
    if (!form.title) return;
    setItems([...items, { id: Date.now(), ...form, published: false }]);
    setForm({ title: "", type: "announcement" });
    setShowForm(false);
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Content Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Content"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <div className="form-row">
            <input
              placeholder="Content Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {["announcement", "banner", "attraction", "ticket"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button className="btn-primary" onClick={addItem}>Create</button>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td><span className="type-tag">{item.type}</span></td>
              <td>
                <span className={`status-dot ${item.published ? "published" : "draft"}`}>
                  {item.published ? "Published" : "Draft"}
                </span>
              </td>
              <td>
                <button className="btn-ghost" onClick={() => togglePublish(item.id)}>
                  {item.published ? "Unpublish" : "Publish"}
                </button>
                <button className="btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([
    { id: 1, employee: "Carol White", shift: "Mon 9am–5pm", area: "Entrance" },
    { id: 2, employee: "Bob Smith", shift: "Tue 12pm–8pm", area: "Rides" },
  ]);
  const [form, setForm] = useState({ employee: "", shift: "", area: "" });
  const [showForm, setShowForm] = useState(false);

  const addSchedule = () => {
    if (!form.employee || !form.shift) return;
    setSchedules([...schedules, { id: Date.now(), ...form }]);
    setForm({ employee: "", shift: "", area: "" });
    setShowForm(false);
  };

  const deleteSchedule = (id) => setSchedules(schedules.filter((s) => s.id !== id));

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Schedule Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Shift"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <div className="form-row">
            <input
              placeholder="Employee Name"
              value={form.employee}
              onChange={(e) => setForm({ ...form, employee: e.target.value })}
            />
            <input
              placeholder="Shift (e.g. Mon 9am–5pm)"
              value={form.shift}
              onChange={(e) => setForm({ ...form, shift: e.target.value })}
            />
            <input
              placeholder="Area"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            />
            <button className="btn-primary" onClick={addSchedule}>Add</button>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Shift</th>
            <th>Area</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => (
            <tr key={s.id}>
              <td>{s.employee}</td>
              <td>{s.shift}</td>
              <td>{s.area}</td>
              <td>
                <button className="btn-danger" onClick={() => deleteSchedule(s.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Main Admin Page ---

const TABS = ["User Management", "Role Assignment", "Content", "Schedule"];

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState(MOCK_USERS);

  if (!user || user.role !== "admin") return <Navigate to="/" />;

  return (
    <>
      <style>{`
        .admin-page {
          padding: 2rem;
          font-family: 'Segoe UI', system-ui, sans-serif;
          color: #111827;
          max-width: 1100px;
          margin: 0 auto;
        }
        .admin-header {
          margin-bottom: 2rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
        }
        .admin-header p {
          color: #6b7280;
          margin: 0;
          font-size: 0.9rem;
        }
        .tab-bar {
          display: flex;
          gap: 0.25rem;
          border-bottom: 2px solid #e5e7eb;
          margin-bottom: 2rem;
        }
        .tab-btn {
          padding: 0.6rem 1.2rem;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          color: #6b7280;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: color 0.15s, border-color 0.15s;
        }
        .tab-btn.active {
          color: #dc2626;
          border-bottom-color: #dc2626;
        }
        .tab-btn:hover:not(.active) {
          color: #374151;
        }
        .admin-section {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 1.5rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .section-header h2 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }
        .form-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.25rem;
        }
        .form-card h3 {
          margin: 0 0 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .form-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .form-row input, .form-row select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          flex: 1;
          min-width: 140px;
          background: #fff;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        .admin-table th {
          text-align: left;
          padding: 0.6rem 0.75rem;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .admin-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #f3f4f6;
          color: #374151;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: #f9fafb; }
        .role-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #fff;
          text-transform: capitalize;
        }
        .type-tag {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          background: #eff6ff;
          color: #1d4ed8;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        .status-dot {
          font-size: 0.8rem;
          font-weight: 500;
        }
        .status-dot.published { color: #16a34a; }
        .status-dot.draft { color: #9ca3af; }
        .btn-primary {
          padding: 0.5rem 1rem;
          background: #dc2626;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .btn-primary:hover { background: #b91c1c; }
        .btn-ghost {
          padding: 0.35rem 0.75rem;
          background: none;
          border: 1px solid #d1d5db;
          border-radius: 5px;
          font-size: 0.8rem;
          cursor: pointer;
          margin-right: 0.4rem;
          color: #374151;
          transition: background 0.15s;
        }
        .btn-ghost:hover { background: #f3f4f6; }
        .btn-danger {
          padding: 0.35rem 0.75rem;
          background: none;
          border: 1px solid #fca5a5;
          border-radius: 5px;
          font-size: 0.8rem;
          cursor: pointer;
          color: #dc2626;
          transition: background 0.15s;
        }
        .btn-danger:hover { background: #fef2f2; }
        .role-legend {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
          font-size: 0.85rem;
          color: #374151;
        }
        .legend-item { display: flex; align-items: center; gap: 0.5rem; }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Logged in as <strong>{user.email || user.name}</strong> · {user.role}</p>
        </div>

        <div className="tab-bar">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 0 && <UserManagement users={users} setUsers={setUsers} />}
        {activeTab === 1 && <RoleAssignment users={users} setUsers={setUsers} />}
        {activeTab === 2 && <ContentManagement />}
        {activeTab === 3 && <ScheduleManagement />}
      </div>
    </>
  );
}