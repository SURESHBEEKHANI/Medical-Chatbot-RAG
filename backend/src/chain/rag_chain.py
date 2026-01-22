from langchain_core.output_parsers import StrOutputParser
from src.embeddings import download_hugging_face_embeddings
from src.prompts import create_qa_chat_prompt
from src.llms import create_groq_llm
from src.retrievers import create_pinecone_retriever


# Initialize components lazily
_embeddings = None
_prompt = None
_llm = None
_retriever = None
_output_parser = None


def _initialize_components():
    """Initialize RAG components on first use"""
    global _embeddings, _prompt, _llm, _retriever, _output_parser
    
    if _embeddings is None:
        _embeddings = download_hugging_face_embeddings()
        _prompt = create_qa_chat_prompt()
        _llm = create_groq_llm()
        _retriever = create_pinecone_retriever(_embeddings)
        _output_parser = StrOutputParser()


def rag_chain(question: str) -> str:
    """
    Execute the RAG pipeline for medical question answering.
    
    Args:
        question: Medical question from user
        
    Returns:
        Generated answer from LLM
        
    Raises:
        RuntimeError: If RAG pipeline fails
    """
    try:
        _initialize_components()
        
        docs = _retriever.invoke(question)
        context = "\n\n".join(doc.page_content for doc in docs)

        chain = _prompt | _llm | _output_parser

        return chain.invoke(
            {
                "context": context,
                "input": question,
            }
        )

    except Exception as e:
        raise RuntimeError(f"RAG pipeline failed: {str(e)}")
