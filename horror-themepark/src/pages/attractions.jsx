export default function Attractions() {
  return (
    <div>
      <div className="section-heading">ATTRACTIONS</div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Ride</th>
            <th>Zone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Descent</td>
            <td>Space X</td>
            <td><span className="badge badge-green">OPEN</span></td>
          </tr>
          <tr>
            <td>Moonride</td>
            <td>Bloodmoon</td>
            <td><span className="badge badge-red">CLOSED</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}