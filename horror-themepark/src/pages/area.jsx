export default function Area() {
  const zones = [
    { name: "Bloodmoon Village", desc: "Cults · Rituals" },
    { name: "Dead End District", desc: "Slashers · Urban Horror" },
    { name: "Uncanny Valley", desc: "Psychological Horror" },
    { name: "Space Station X", desc: "Sci-Fi Horror" },
    { name: "Camp Blackwood", desc: "Wilderness Horror" },
  ];

  return (
    <div>
      <div className="section-heading">PARK ZONES</div>
      <div className="zones-grid">
        {zones.map((z, i) => (
          <div key={i} className="zone-card">
            <div className="zone-card-body">
              <div className="zone-card-name">{z.name}</div>
              <div className="zone-card-desc">{z.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}