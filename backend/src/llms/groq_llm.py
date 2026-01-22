import os
from langchain_groq import ChatGroq


def create_groq_llm(
    model: str = "openai/gpt-oss-20b",
    temperature: float = 0.0,
    max_tokens: int = 200,
) -> ChatGroq:
    """
    Create and return a configured Groq Chat LLM instance.

    Args:
        model: Model name to use
        temperature: Temperature for generation
        max_tokens: Maximum tokens in response

    Returns:
        ChatGroq: Configured LLM instance

    Raises:
        RuntimeError: If GROQ_API_KEY is missing.
    """
    if not os.getenv("GROQ_API_KEY"):
        raise RuntimeError(
            "GROQ_API_KEY environment variable is not set."
        )

    return ChatGroq(
        model=model,
        temperature=temperature,
        max_tokens=max_tokens,
    )
