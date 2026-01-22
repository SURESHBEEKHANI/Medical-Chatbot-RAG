# Medical Chatbot (RAG) — FastAPI + React (Vite)

End-to-end **RAG-based medical Q&A** app:
- **Backend**: FastAPI (`backend/main.py`) + LangChain + Pinecone + Groq
- **Frontend**: React + Vite (`frontend/`)
- **API**: `POST /api/ask`, `GET /api/health`

## Prerequisites
- **Docker + Docker Compose** (recommended), or:
  - Python **3.12+** (backend)
  - Node.js **18+** (frontend)

## Environment variables
Create a `.env` file in the **repo root** (used by Docker Compose and loaded by the backend):

```ini
PINECONE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GROQ_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional (LangSmith / LangChain tracing)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LANGCHAIN_PROJECT=medical-chatbot
```

## Run with Docker (recommended)
From the repo root:

```bash
docker compose up -d --build
```

Open:
- **Frontend**: `http://localhost:8080`
- **Backend API**: `http://localhost:8000`
- **Swagger**: `http://localhost:8000/docs`

## Run locally (without Docker)

### Backend (FastAPI)
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`.

### Frontend (Vite)
In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` (Vite default).

## Build the Pinecone index (one-time)
If you want to (re)create embeddings and upsert into Pinecone:

```bash
cd backend
python store_index.py
```

## API
- `GET /api/health` — health check
- `POST /api/ask` — ask a medical question

Example:

```bash
curl -X POST "http://localhost:8000/api/ask" ^
  -H "Content-Type: application/json" ^
  -d "{\"question\":\"What are symptoms of dehydration?\"}"
```

## Tech stack
- **Backend**: Python, FastAPI, LangChain, Pinecone, Groq, SentenceTransformers
- **Frontend**: React, Vite, TypeScript, Tailwind, shadcn/ui

## AWS CI/CD deployment (GitHub Actions → ECR → EC2)
This repo includes a workflow at `.github/workflows/CICD.yml` that:
- Builds and pushes **backend** and **frontend** images to **Amazon ECR**
- Deploys to an **EC2 self-hosted GitHub Actions runner** using `docker compose -f docker-compose.prod.yml up -d`

### Required GitHub Secrets
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (recommended) or `AWS_DEFAULT_REGION`
- `ECR_REPO_BACKEND`
- `ECR_REPO_FRONTEND`
- `PINECONE_API_KEY`
- `GROQ_API_KEY`
- `LANGCHAIN_API_KEY` (optional)
- `LANGCHAIN_PROJECT` (optional)
