import InfoCard from "../components/InfoCard";

export default function Dining() {
  const dining = [
    // Uncanny Valley
    { icon: "☕", label: "Artificial Appetite Cafe", sub: "Uncanny Valley" },
    { icon: "🍽️", label: "Perfect Family Diner", sub: "Uncanny Valley" },
    // Bloodmoon Village
    { icon: "🍖", label: "Great Feast Hall", sub: "Bloodmoon Village" },
    { icon: "🍺", label: "Crimson Tavern", sub: "Bloodmoon Village" },
    { icon: "🥐", label: "Moonlit Bakery", sub: "Bloodmoon Village" },
    // Space Station X
    { icon: "🛸", label: "Orbit Mess Hall", sub: "Space Station X" },
    { icon: "⚗️", label: "Cosmic Fuel Cafe", sub: "Space Station X" },
    // Camp Blackwood
    { icon: "🐟", label: "Dockside Grill", sub: "Camp Blackwood" },
    { icon: "🔥", label: "S'mores Stand", sub: "Camp Blackwood" },
    { icon: "🥪", label: "Blackwood Lunch Hall", sub: "Camp Blackwood" },
    // Dead End District
    { icon: "🍕", label: "Freddy Fazbear's Pizzeria", sub: "Dead End District" },
    { icon: "🥩", label: "Billy's Butcher Shop", sub: "Dead End District" },
  ];

  return (
    <div className="page-body">
      <div className="section-heading">DINING</div>
      <div className="info-row">
        {dining.map((d, i) => (
          <InfoCard key={i} icon={d.icon} label={d.label} sub={d.sub} />
        ))}
      </div>
    </div>
  );
}