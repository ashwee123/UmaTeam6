export default function AreaCard({ title, tag, desc, emoji, className }) {
  return (
    <div className="area-card">
      <div className={`area-card-banner ${className}`}>
        {emoji}
      </div>

      <div className="area-card-body">
        <div className="area-card-name">{title}</div>
        <div className="area-card-tag">{tag}</div>
        <div className="area-card-desc">{desc}</div>
      </div>
    </div>
  );
}