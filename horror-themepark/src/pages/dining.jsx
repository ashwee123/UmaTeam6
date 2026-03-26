import InfoCard from "./InfoCard";

export default function Dining() {
  return (
    <div>
      <div className="section-heading">DINING</div>

      <div className="info-row">
        <InfoCard icon="🦴" label="Bone Yard BBQ" sub="Full meals" />
        <InfoCard icon="🧪" label="Lab 13 Bar" sub="Cocktails" />
        <InfoCard icon="🍄" label="Witch's Cauldron" sub="Stew & Soup" />
      </div>
    </div>
  );
}