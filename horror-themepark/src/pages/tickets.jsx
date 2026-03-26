import "../styles/tickets.css";

export default function Tickets() {
  const tickets = [
    {
      name: "Standard",
      price: "$49",
      tag: "First-Time Visitors",
      desc: "Perfect for first-time visitors or casual fun!",
      features: [
        "One-time park entry",
        "Access to main attractions",
        "Basic amenities & restrooms",
        "Access to food courts",
      ],
      note: "Great for a solo day or small group outing.",
      className: "standard",
      badge: null,
    },
    {
      name: "All-Zone Access",
      price: "$89",
      tag: "Most Popular",
      desc: "For visitors who want to explore everything!",
      features: [
        "Everything in Standard",
        "Access to all five zones",
        "Priority lines for selected rides",
        "Zone-specific experiences & shows",
      ],
      note: "Best for guests who don't want to miss any part of the park.",
      className: "allzone",
      badge: "MOST POPULAR",
    },
    {
      name: "VIP",
      price: "$149",
      tag: "Ultimate Experience",
      desc: "The ultimate experience for thrill-seekers!",
      features: [
        "Everything in All-Zone Access",
        "Front-of-line access for all rides",
        "Exclusive VIP lounge with refreshments",
        "Complimentary merchandise or souvenir",
        "Personalized tour & photo opportunities",
      ],
      note: "Perfect for a premium, stress-free experience.",
      className: "vip",
      badge: "PREMIUM",
    },
  ];

  return (
    <div className="page-body">
      <div className="section-heading">TICKETS &amp; PRICING</div>
      <p className="tickets-intro">
        Choose your level of terror. No refunds after entry.
      </p>

      <div className="tickets-row">
        {tickets.map((t, i) => (
          <div key={i} className={`ticket-card ${t.className}`}>
            {t.badge && <div className="ticket-badge">{t.badge}</div>}

            <div className="ticket-header">
              <div className="ticket-name">{t.name}</div>
              <div className="ticket-tag">{t.tag}</div>
              <div className="ticket-price">{t.price}</div>
              <div className="ticket-price-label">per person</div>
            </div>

            <div className="ticket-divider" />

            <p className="ticket-desc">{t.desc}</p>

            <ul className="ticket-features">
              {t.features.map((f, j) => (
                <li key={j} className="ticket-feature">
                  <span className="ticket-feature-icon">✦</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="ticket-spacer" />

            <p className="ticket-note">{t.note}</p>

            <button className={`ticket-btn ticket-btn-${t.className}`}>
              GET TICKETS
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}