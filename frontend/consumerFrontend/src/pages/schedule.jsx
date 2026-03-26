export default function Schedule() {
  return (
    <div>
      <div className="section-heading">SCHEDULE</div>

      <div className="schedule-week">
        {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((day, i) => (
          <div key={i} className="schedule-day">
            <div className="day-label">{day}</div>
            <div className="day-shift">6PM–12AM</div>
          </div>
        ))}
      </div>
    </div>
  );
}