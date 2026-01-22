# =========================
# Stage 1: Base image with UV
# =========================
FROM python:3.12-slim as base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install UV
RUN pip install uv

# Set working directory
WORKDIR /app

# =========================
# Stage 2: Install dependencies
# =========================
FROM base as dependencies

# Copy dependency files
COPY pyproject.toml uv.lock requirements.txt ./

# Install dependencies using UV
# UV can work with both pyproject.toml and requirements.txt
RUN uv pip install --system -r requirements.txt

# =========================
# Stage 3: Production image
# =========================
FROM base as production

# Copy installed dependencies from dependencies stage
COPY --from=dependencies /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=dependencies /usr/local/bin /usr/local/bin

# Copy application code
COPY main.py ./
COPY src/ ./src/
COPY setup.py ./

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/docs')" || exit 1

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]