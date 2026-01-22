import os
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore


def create_pinecone_retriever(
    embeddings,
    index_name: str = "medical-chatbot",
    dimension: int = 384,
    metric: str = "cosine",
    cloud: str = "aws",
    region: str = "us-east-1",
    k: int = 3,
):
    """
    Create or load a Pinecone index and return a LangChain retriever.

    Args:
        embeddings: LangChain embedding function.
        index_name: Pinecone index name.
        dimension: Embedding vector dimension.
        metric: Similarity metric.
        cloud: Cloud provider.
        region: Cloud region.
        k: Number of similar documents to retrieve.

    Returns:
        BaseRetriever: LangChain retriever instance with similarity search.

    Raises:
        RuntimeError: If PINECONE_API_KEY is missing.
    """
    api_key = os.getenv("PINECONE_API_KEY")
    if not api_key:
        raise RuntimeError("PINECONE_API_KEY environment variable is not set.")

    pc = Pinecone(api_key=api_key)

    if not pc.has_index(index_name):
        pc.create_index(
            name=index_name,
            dimension=dimension,
            metric=metric,
            spec=ServerlessSpec(
                cloud=cloud,
                region=region,
            ),
        )

    vectorstore = PineconeVectorStore.from_existing_index(
        index_name=index_name,
        embedding=embeddings,
    )

    return vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": k},
    )
