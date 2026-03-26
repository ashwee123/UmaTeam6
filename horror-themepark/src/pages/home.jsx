import { useState } from "react";
import Hero from "../components/homeVisitor";
import ZoneCard from "../components/areaCard";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const zones = [
    {
      title: "Uncanny Valley",
      tag: "Psychological Horror",
      desc: "Familiar places and people that feel slightly off. The Polar Express. The Shining. The Backrooms.",
      emoji: "👁️ 🪆 📺",
      className: "zone-uncanny",
    },
    {
      title: "Bloodmoon Village",
      tag: "Cults · Rituals · Supernatural",
      desc: "Satanic cults, rituals, and the supernatural. Midsommar. The Exorcist. The Conjuring.",
      emoji: "🌑 🕯️ 🩸",
      className: "zone-bloodmoon",
    },
    {
      title: "Space Station X",
      tag: "Sci-Fi Horror",
      desc: "Alien outbreaks, rogue AI, and the void of space. Alien. Gravity. The Thing. 2001.",
      emoji: "🚀 👾 🔬",
      className: "zone-space",
    },
    {
      title: "Camp Blackwood",
      tag: "Wilderness · Cryptids",
      desc: "A summer camp deep in creature-infested woods, far from civilization.",
      emoji: "🌲 🔦 🐾",
      className: "zone-blackwood",
    },
    {
      title: "Dead End District",
      tag: "Slashers · Serial Killers",
      desc: "Dark alleyways and dead ends haunted by slashers and serial killers.",
      emoji: "🔪 🪓 🚨",
      className: "zone-deadend",
    },
  ];

  return (
    <div className="page-body">
      <Hero />

      <div className="section-heading">THE FIVE ZONES OF TERROR</div>
      <div className="zones-grid">
        {zones.map((z, i) => (
          <ZoneCard key={i} {...z} />
        ))}
      </div>

      {/* Feedback at bottom of home */}
      <div className="home-feedback">
        <div className="home-feedback-inner">
          <div className="home-feedback-header">
            <div className="section-heading">LEAVE YOUR MARK</div>
            <p className="home-feedback-sub">Survived the night? Tell us how it went.</p>
          </div>

          {submitted ? (
            <div className="feedback-success">
              <div className="feedback-success-icon">💀</div>
              <div className="feedback-success-text">YOUR SUFFERING HAS BEEN RECORDED</div>
            </div>
          ) : (
            <div className="feedback-form-grid">
              <input className="form-input" placeholder="Your Name" />

              <select className="form-select">
                <option value="">Select Zone</option>
                <option value="uncanny">Uncanny Valley</option>
                <option value="bloodmoon">Bloodmoon Village</option>
                <option value="space">Space Station X</option>
                <option value="blackwood">Camp Blackwood</option>
                <option value="deadend">Dead End District</option>
              </select>

              <div className="star-rating">
                <span className="star-label">RATE YOUR FEAR</span>
                <div className="star-buttons">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={`star-btn ${rating >= num ? "active" : ""}`}
                      onClick={() => setRating(num)}
                    >
                      💀
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className="form-textarea"
                placeholder="Describe your experience in the dark..."
              />

              <button className="btn-submit" onClick={() => setSubmitted(true)}>
                SUBMIT TESTIMONY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}