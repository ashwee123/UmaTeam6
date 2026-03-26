export default function Tickets() {
  return (
    <div>
      <div className="section-heading">TICKETS</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
        <div className="panel">
          <div className="panel-body">
            <div className="stat-value">$49</div>
            <div>Standard</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-body">
            <div className="stat-value">$89</div>
            <div>All Zones</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-body">
            <div className="stat-value">$149</div>
            <div>VIP</div>
          </div>
        </div>
      </div>
    </div>
  );
}