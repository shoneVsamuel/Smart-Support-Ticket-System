import React, { useState } from "react";
import { classify, createTicket } from "../api";

export default function TicketForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");

  const handleClassify = async () => {
    const result = await classify(description);
    // Update dropdowns with LLM output
    if (result.category) setCategory(result.category);
    if (result.priority) setPriority(result.priority);
  };

  const handleSubmit = async () => {
    await createTicket({ title, description, category, priority });
    onSuccess();
    setTitle("");
    setDescription("");
    setCategory("general");
    setPriority("medium");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="button" onClick={handleClassify}>Classify</button>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="technical">Technical</option>
        <option value="billing">Billing</option>
        <option value="account">Account</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}