# =========================
# Imports
# =========================
from dotenv import load_dotenv
import os

# Load environment variables FIRST, before any other imports
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from src.routes import router

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LANGCHAIN_TRACING_V2=os.getenv("LANGCHAIN_TRACING_V2")
LANGCHAIN_API_KEY=os.getenv("LANGCHAIN_API_KEY")
LANGCHAIN_PROJECT=os.getenv("LANGCHAIN_PROJECT")


if not PINECONE_API_KEY or not GROQ_API_KEY:
    raise RuntimeError("❌ Missing required environment variables")

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["GROQ_API_KEY"] = GROQ_API_KEY
os.environ["LANGCHAIN_TRACING_V2"]="true"
os.environ["LANGCHAIN_API_KEY"]=LANGCHAIN_API_KEY

# =========================
# FastAPI App Setup
# =========================
app = FastAPI(
    title="Medical Chatbot API",
    description="RAG-based Medical Question Answering System",
    version="1.0.0",
)

# =========================
# CORS Configuration
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:8080",  # Actual Vite port
        "http://localhost:3000",  # Alternative port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router)


# =========================
# Run Server
# =========================
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
