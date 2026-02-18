export async function classify(description) {
  const res = await fetch("/api/tickets/classify/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  return res.json();
}

export async function createTicket(data) {
  const res = await fetch("/api/tickets/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getTickets(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/tickets/?${query}`);
  return res.json();
}

export async function getStats() {
  const res = await fetch("/api/tickets/stats/");
  return res.json();
}