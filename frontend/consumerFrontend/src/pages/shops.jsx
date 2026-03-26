import InfoCard from "../components/InfoCard";

export default function Shops() {
  const shops = [
    // Uncanny Valley
    { icon: "🪆", label: "Replica Doll Works", sub: "Uncanny Valley" },
    { icon: "🏪", label: "Corner Store", sub: "Uncanny Valley" },
    // Bloodmoon Village
    { icon: "🔮", label: "Ritual Relics and Charms", sub: "Bloodmoon Village" },
    // Space Station X
    { icon: "📦", label: "Supply Depot", sub: "Space Station X" },
    { icon: "💻", label: "Tech Exchange", sub: "Space Station X" },
    // Camp Blackwood
    { icon: "🪙", label: "Joe's Trading Post", sub: "Camp Blackwood" },
    { icon: "🎒", label: "Camp Essentials", sub: "Camp Blackwood" },
    { icon: "🧟", label: "Monster Makeover", sub: "Camp Blackwood" },
    // Dead End District
    { icon: "🎵", label: "Blackout Records & Apparel", sub: "Dead End District" },
  ];

  return (
    <div className="page-body">
      <div className="section-heading">SHOPS</div>
      <div className="info-row">
        {shops.map((s, i) => (
          <InfoCard key={i} icon={s.icon} label={s.label} sub={s.sub} />
        ))}
      </div>
    </div>
  );
}