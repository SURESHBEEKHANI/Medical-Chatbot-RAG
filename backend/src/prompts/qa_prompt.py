from langchain_core.prompts import ChatPromptTemplate


def create_qa_chat_prompt():
    """
    Create a ChatPromptTemplate for medical question answering.
    
    Returns:
        ChatPromptTemplate: Template with system and human messages
    """
    system_prompt = (
        "You are a question answering assistant. "
        "Use the retrieved context below. "
        "If you don't know the answer, say you don't know. "
        "Be concise (3 sentences max).\n\n"
        "{context}"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}")  # Must match the key in invoke()
        ]
    )
    return prompt
