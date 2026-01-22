from langchain_huggingface import HuggingFaceEmbeddings


def download_hugging_face_embeddings(
    model_name: str = "sentence-transformers/all-MiniLM-L6-v2"
):
    """
    Download and initialize HuggingFace embeddings for text encoding.

    Args:
        model_name: HuggingFace model identifier

    Returns:
        HuggingFaceEmbeddings: Initialized embedding model
    """
    return HuggingFaceEmbeddings(model_name=model_name)
