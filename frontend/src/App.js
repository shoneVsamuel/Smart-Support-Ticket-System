import React, { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatsDashboard from "./components/StatsDashboard";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Trigger refresh for ticket list and stats
  const handleUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Smart Support Ticket System</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Create Ticket</h2>
        <TicketForm onSuccess={handleUpdate} />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <StatsDashboard key={refreshKey} />
      </section>

      <section>
        <TicketList key={refreshKey} onUpdate={handleUpdate} />
      </section>
    </div>
  );
}