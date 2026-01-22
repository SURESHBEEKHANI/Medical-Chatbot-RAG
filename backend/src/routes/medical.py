from fastapi import APIRouter, HTTPException
from src.models import MedicalQuery, MedicalAnswer
from src.chain import rag_chain


router = APIRouter(prefix="/api", tags=["Medical Q&A"])


@router.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint"""
    return {"status": "✅ Medical Chatbot API is running"}


@router.post("/ask", response_model=MedicalAnswer)
def ask_medical_question(payload: MedicalQuery):
    """
    Ask a medical question and get an AI-generated answer.
    
    Args:
        payload: Contains the medical question
        
    Returns:
        MedicalAnswer: AI-generated medical response
        
    Raises:
        HTTPException: If question is empty or RAG pipeline fails
    """
    if not payload.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    try:
        answer = rag_chain(payload.question)
        return MedicalAnswer(answer=answer)

    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"ERROR in /ask endpoint: {error_details}")
        raise HTTPException(status_code=500, detail=f"RAG Error: {str(e)}")
