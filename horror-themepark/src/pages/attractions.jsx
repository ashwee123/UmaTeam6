export default function Attractions() {
  const attractions = [
    // Uncanny Valley
    { name: "Broadcast Hijack", zone: "Uncanny Valley", type: "Show" },
    { name: "Escape the Backrooms", zone: "Uncanny Valley", type: "Ride" },
    { name: "Alternate Invasion", zone: "Uncanny Valley", type: "Ride" },
    // Bloodmoon Village
    { name: "Harvest Festival", zone: "Bloodmoon Village", type: "Show" },
    { name: "Pastor John's Sermon", zone: "Bloodmoon Village", type: "Show" },
    // Space Station X
    { name: "Cadet Training", zone: "Space Station X", type: "Arcade" },
    { name: "The Last Transmission", zone: "Space Station X", type: "Show" },
    { name: "Containment Breach", zone: "Space Station X", type: "Ride" },
    { name: "Zero-Gravity Situation", zone: "Space Station X", type: "Ride" },
    // Camp Blackwood
    { name: "Watchtower Drop", zone: "Camp Blackwood", type: "Ride" },
    { name: "Cryptid Hunt", zone: "Camp Blackwood", type: "Ride" },
    { name: "Trail Tour", zone: "Camp Blackwood", type: "Ride" },
    { name: "Activity Grounds", zone: "Camp Blackwood", type: "Arcade" },
    { name: "Camper Safety Orientation", zone: "Camp Blackwood", type: "Show" },
    // Dead End District
    { name: "Psych Ward Tour", zone: "Dead End District", type: "Show" },
  ];

  const typeColors = {
    Ride: "badge-green",
    Show: "badge-blue",
    Arcade: "badge-gold",
  };

  return (
    <div className="page-body">
      <div className="section-heading">ATTRACTIONS</div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Attraction</th>
            <th>Zone</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attractions.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.zone}</td>
              <td>
                <span className={`badge ${typeColors[a.type] || "badge-green"}`}>
                  {a.type}
                </span>
              </td>
              <td>
                <span className="badge badge-green">OPEN</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}