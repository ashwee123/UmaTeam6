export default function Area() {
  const areas = [
    {
      name: "Uncanny Valley",
      tag: "Psychological Horror",
      emoji: "👁️",
      theme: "zone-uncanny",
      attractions: ["Broadcast Hijack (Show)", "Escape the Backrooms (Ride)", "Alternate Invasion (Ride)"],
      dining: ["Artificial Appetite Cafe", "Perfect Family Diner"],
      shops: ["Replica Doll Works", "Corner Store"]
    },
    {
      name: "Bloodmoon Village",
      tag: "Cults · Rituals · Supernatural",
      emoji: "🌑",
      theme: "zone-bloodmoon",
      attractions: ["Harvest Festival (Show)", "Pastor John’s Sermon (Show)"],
      dining: ["Great Feast Hall", "Crimson Tavern", "Moonlit Bakery"],
      shops: ["Ritual Relics and Charms"]
    },
    {
      name: "Space Station X",
      tag: "Sci-Fi Horror",
      emoji: "🚀",
      theme: "zone-space",
      attractions: ["Cadet Training (Arcade)", "The Last Transmission (Show)", "Containment Breach (Ride)", "Zero-Gravity Situation (Ride)"],
      dining: ["Orbit Mess Hall", "Cosmic Fuel Cafe"],
      shops: ["Supply Depot", "Tech Exchange"]
    },
    {
      name: "Camp Blackwood",
      tag: "Wilderness · Cryptids",
      emoji: "🌲",
      theme: "zone-blackwood",
      attractions: ["Watchtower Drop (Ride)", "Cryptid Hunt (Ride)", "Trail Tour (Ride)", "Activity Grounds (Arcade)", "Camper Safety Orientation (Show)"],
      dining: ["Dockside Grill", "Smores Stand", "Blackwood Lunch Hall"],
      shops: ["Joe's Trading Post", "Camp Essentials", "Monster Makeover"],    },
    {
      name: "Dead End District",
      tag: "Slashers · Serial Killers",
      emoji: "🔪",
      theme: "zone-deadend",
      attractions: ["Psych Ward Tour (Show)"],
      dining: ["Freddy Fazbears Pizzaria", "Billy’s Butcher Shop"],
      shops: ["Blackout Records & Apparel"]
    }
  ];

  return (
    <div className="page-body">
      <div className="section-heading">PARK AREAS</div>
      <div className="areas-grid">
        {areas.map((a, i) => (
          <div key={i} className={`area-card`}>
            <div className={`area-card-banner ${a.theme}`}>
              <span style={{ fontSize: 40 }}>{a.emoji}</span>
            </div>
            <div className="area-card-body">
              <div className="area-card-name">{a.name}</div>
              <div className="area-card-tag">{a.tag}</div>
              {a.attractions && (
                <div className="area-card-section">
                  <div className="area-card-subheading">Attractions</div>
                  {a.attractions.map((item, idx) => (
                    <div key={idx} className="area-card-desc">{item}</div>
                  ))}
                </div>
              )}
              {a.dining && (
                <div className="area-card-section">
                  <div className="area-card-subheading">Dining</div>
                  {a.dining.map((item, idx) => (
                    <div key={idx} className="area-card-desc">{item}</div>
                  ))}
                </div>
              )}
              {a.shops && (
                <div className="area-card-section">
                  <div className="area-card-subheading">Shops</div>
                  {a.shops.map((item, idx) => (
                    <div key={idx} className="area-card-desc">{item}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}