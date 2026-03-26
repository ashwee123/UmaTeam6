export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">☽ NIGHTFALL</div>
        <div className="logo-sub">Where Fear Lives</div>
      </div>

      <div className="sidebar-user-badge">
        <div className="user-avatar">👁</div>
        <div className="user-info">
          <div className="user-name">Guest</div>
          <div className="user-role">Visitor</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* later: map nav items */}
      </nav>
    </aside>
  );
}