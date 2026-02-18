# Smart Support Ticket System

A full-stack Support Ticket System built as part of the Tech Intern – Full Stack Development assessment.

This application allows users to submit support tickets, automatically classify them using an LLM, filter/search tickets, and view aggregated statistics — all fully containerized using Docker.

---

## 🚀 Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Django ORM (database-level aggregation)

### Frontend
- React (Functional Components + Hooks)

### LLM Integration
- OpenAI API (or chosen LLM provider)
- Prompt-based classification
- Structured JSON output
- Graceful fallback handling

### Infrastructure
- Docker
- Docker Compose

---

## ✨ Features

### 1️⃣ Ticket Creation
- Title (required, max 200 characters)
- Description (required)
- Category (LLM auto-suggested but editable)
- Priority (LLM auto-suggested but editable)
- Status (default: open)
- Created timestamp auto-generated

### 2️⃣ LLM-Based Classification
- `/api/tickets/classify/` endpoint
- Accepts ticket description
- Returns:
  ```json
  {
    "suggested_category": "...",
    "suggested_priority": "..."
  }
