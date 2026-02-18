# Smart Support Ticket System

A full-stack Support Ticket System built as part of the Tech Intern – Full Stack Development assessment.

The application allows users to:
- Submit support tickets
- Automatically classify tickets using an LLM
- Filter and search tickets
- View aggregated statistics
- Run the entire stack using Docker

---

## 🚀 Tech Stack

Backend:
- Django
- Django REST Framework
- PostgreSQL

Frontend:
- React (Functional Components + Hooks)

LLM:
- Gemini 2.5-Flash model (via API)

Infrastructure:
- Docker
- Docker Compose

---

# 🛠 Setup Instructions

## Option 1: Run with Docker (Recommended)

### Prerequisites
- Docker installed
- Docker Compose installed
- OpenAI API Key

### Steps

1. Clone the repository:
   git clone <repo_url>
   cd smart-support-ticket-system

2. Set environment variable for LLM API key:

   On Windows (CMD):
   set OPENAI_API_KEY=your_api_key_here

   On Mac/Linux:
   export OPENAI_API_KEY=your_api_key_here

3. Build and start services:
   docker-compose up --build

4. Access:
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:3000

---

## Option 2: Run Without Docker (Manual Setup)

### Backend

1. Navigate to backend:
   cd backend

2. Create virtual environment:
   python -m venv tsvenv
   tsvenv\Scripts\activate  (Windows)

3. Install dependencies:
   pip install -r requirements.txt

4. Apply migrations:
   python manage.py migrate

5. Run server:
   python manage.py runserver

---

### Frontend

1. Navigate to frontend:
   cd frontend

2. Install dependencies:
   npm install

3. Start frontend:
   npm start

---

# 🧠 LLM Used and Why

### LLM Used:
Gemini 2.5-Flash model (via API)

### Why This Model:

- Reliable structured output when prompted with strict JSON format
- Strong natural language understanding for ticket categorization
- Fast inference suitable for real-time classification
- Easy integration via REST API

The model is prompted to return:

{
  "suggested_category": "...",
  "suggested_priority": "..."
}

The system validates the output strictly against allowed enums.

If the LLM:
- Fails
- Returns invalid JSON
- Returns invalid enum values

The system gracefully falls back to:
- Category → "general"
- Priority → "medium"

This ensures ticket creation never breaks due to LLM failure.

---

# 🏗 Design Decisions

## 1. Separate LLM Classification Endpoint

The classification logic is exposed as:

/api/tickets/classify/

Reason:
- Allows suggestion before final submission
- Improves user experience
- Keeps business logic modular
- Easier to test independently

---

## 2. Database-Level Aggregation

All statistics are computed using Django ORM aggregation:

- Count()
- Avg()
- Annotate()
- TruncDay()

Reason:
- Ensures SQL-level grouping
- Avoids Python loops over querysets
- Scales better for large datasets
- Demonstrates understanding of ORM capabilities

No Python-side aggregation is used.

---

## 3. Dockerized Architecture

The project includes:
- Backend container
- Frontend container
- PostgreSQL container

Reason:
- Ensures reproducibility
- Simplifies evaluation
- One-command startup
- Clean separation of services

---

## 4. Environment-Based Configuration

Sensitive values (API keys) are:
- Not hardcoded
- Loaded via environment variables

Reason:
- Security best practice
- Production-ready approach

---

# 📊 Features Implemented

- Create support tickets
- Auto-classify tickets using LLM
- Editable category and priority
- Filter by category, priority, status
- Search by title and description
- Update ticket status
- View statistics dashboard
- Fully Dockerized setup

---

# 👤 Author

Shone V Samuel
