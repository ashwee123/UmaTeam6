export default function Topbar() {
  return (
    <div className="topbar-wrapper">
      <header className="topbar">
        <div className="topbar-left">
          <div className="page-title">HOME</div>
        </div>

        <div className="topbar-right">
          <div className="ticket-notice">
            🎃 HALLOWEEN SEASON OPEN
          </div>

          <button className="topbar-btn primary">LOGIN</button>
        </div>
      </header>
    </div>
  );
}