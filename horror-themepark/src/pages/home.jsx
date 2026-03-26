import Hero from "../components/homeVisitor";
import ZoneCard from "../components/areaCard";

export default function Home() {
  return (
    <div className="page-body">
      <Hero />

      <div className="section-heading">THE FIVE ZONES OF TERROR</div>

      <div className="zones-grid">
        <ZoneCard
          title="Bloodmoon Village"
          tag="Cults · Rituals"
          desc="A village frozen in time..."
          emoji="🌑 🕯️ 🩸"
          className="zone-bloodmoon"
        />

        <ZoneCard
          title="Dead End District"
          tag="Slashers"
          desc="A dead-end alley..."
          emoji="🔪 🪓 🚗"
          className="zone-deadend"
        />
      </div>
    </div>
  );
}