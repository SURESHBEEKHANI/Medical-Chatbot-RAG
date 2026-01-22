from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


def load_pdf_file(data: str = "data/"):
    """
    Load PDF files from a directory.
    
    Args:
        data: Path to directory containing PDF files
        
    Returns:
        List of loaded documents
    """
    loader = DirectoryLoader(
        data,
        glob="**/*.pdf",
        loader_cls=PyPDFLoader
    )
    documents = loader.load()
    return documents


def text_split(documents, chunk_size: int = 500, chunk_overlap: int = 20):
    """
    Split documents into smaller text chunks.
    
    Args:
        documents: List of documents to split
        chunk_size: Size of each chunk
        chunk_overlap: Overlap between chunks
        
    Returns:
        List of text chunks
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    chunks = text_splitter.split_documents(documents)
    return chunks
