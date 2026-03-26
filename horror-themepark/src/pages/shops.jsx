import InfoCard from "./InfoCard";

export default function Shops() {
  return (
    <div>
      <div className="section-heading">SHOPS</div>

      <div className="info-row">
        <InfoCard icon="👕" label="Apparel" sub="Clothing" />
        <InfoCard icon="🪆" label="Curiosity Shop" sub="Collectibles" />
        <InfoCard icon="📸" label="Scare Shots" sub="Photos" />
      </div>
    </div>
  );
}