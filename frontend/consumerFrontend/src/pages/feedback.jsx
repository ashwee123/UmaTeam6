import { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(0);

  return (
    <div className="page-body">
      <div className="section-heading">FEEDBACK</div>

      <div className="feedback-form">
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

        <textarea
          className="form-textarea"
          placeholder="Your experience..."
        />

        <button className="btn-full">SUBMIT</button>
      </div>
    </div>
  );
}