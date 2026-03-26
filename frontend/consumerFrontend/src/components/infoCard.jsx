export default function InfoCard({ icon, label, sub, onClick }) {
  return (
    <div className="info-card" onClick={onClick}>
      <div className="info-card-icon">{icon}</div>
      <div className="info-card-label">{label}</div>
      <div className="info-card-sub">{sub}</div>
    </div>
  );
}