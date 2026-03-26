import { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div className="section-heading">FEEDBACK</div>

      <div className="feedback-form">
        <input className="form-input" placeholder="Your Name" />

        <select className="form-select">
          <option>Select Zone</option>
          <option>Bloodmoon</option>
        </select>

        <div className="star-rating">
          {[1,2,3,4,5].map(num => (
            <button
              key={num}
              className={`star-btn ${rating >= num ? "active" : ""}`}
              onClick={() => setRating(num)}
            >
              💀
            </button>
          ))}
        </div>

        <textarea
          className="form-textarea"
          placeholder="Your experience..."
        />

        <button className="btn-full">SUBMIT</button>
      </div>
    </div>
  );
}