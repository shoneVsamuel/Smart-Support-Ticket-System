import React, { useEffect, useState } from "react";
import { getStats } from "../api";

export default function StatsDashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const data = await getStats();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h2>Stats Dashboard</h2>
      <p>Total Tickets: {stats.total_tickets}</p>
      <p>Open Tickets: {stats.open_tickets}</p>
      <p>Average Tickets per Day: {stats.avg_tickets_per_day.toFixed(2)}</p>

      <h3>Priority Breakdown</h3>
      <ul>
        {stats.priority_breakdown.map((p) => (
          <li key={p.priority}>{p.priority}: {p.count}</li>
        ))}
      </ul>

      <h3>Category Breakdown</h3>
      <ul>
        {stats.category_breakdown.map((c) => (
          <li key={c.category}>{c.category}: {c.count}</li>
        ))}
      </ul>
    </div>
  );
}