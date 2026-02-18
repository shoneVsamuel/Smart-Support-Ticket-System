import React, { useState, useEffect } from "react";
import { getTickets } from "../api";

export default function TicketList({ onUpdate }) {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
    search: "",
  });

  const fetchTickets = async () => {
    const data = await getTickets(filters);
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await fetch(`/api/tickets/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTickets();
    if (onUpdate) onUpdate();
  };

  return (
    <div>
      <h2>Tickets</h2>
      <div style={{ marginBottom: "1rem" }}>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="billing">Billing</option>
          <option value="technical">Technical</option>
          <option value="account">Account</option>
          <option value="general">General</option>
        </select>

        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description.length > 100 ? ticket.description.slice(0, 100) + "..." : ticket.description}</p>
            <p>
              <strong>Category:</strong> {ticket.category} | <strong>Priority:</strong> {ticket.priority} | <strong>Status:</strong> {ticket.status}
            </p>
            <p><small>{new Date(ticket.created_at).toLocaleString()}</small></p>

            <div>
              <button onClick={() => handleStatusUpdate(ticket.id, "open")}>Open</button>
              <button onClick={() => handleStatusUpdate(ticket.id, "in_progress")}>In Progress</button>
              <button onClick={() => handleStatusUpdate(ticket.id, "resolved")}>Resolved</button>
              <button onClick={() => handleStatusUpdate(ticket.id, "closed")}>Closed</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}