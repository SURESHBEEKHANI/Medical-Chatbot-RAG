# Docker Setup Guide - Medical Chatbot RAG System

## Overview
This guide explains how to run the Medical Chatbot RAG System using Docker and Docker Compose.

## Prerequisites
- Docker (v20.10 or higher)
- Docker Compose (v2.0 or higher)
- Environment variables configured in `.env` file

## Quick Start

### 1. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual API keys
PINECONE_API_KEY=your_pinecone_api_key
GROQ_API_KEY=your_groq_api_key
LANGCHAIN_API_KEY=your_langchain_api_key
```

### 2. Build and Run
```bash
# Development mode (with hot reload)
docker-compose up -d

# Production mode (with Nginx reverse proxy)
docker-compose --profile production up -d
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Production (Nginx): http://localhost:80

## Services

### Backend Service
- **Image**: Python 3.10 slim
- **Port**: 8000
- **Framework**: FastAPI
- **Dependencies**: LangChain, Pinecone, Groq, Sentence Transformers

**Environment Variables**:
- `PINECONE_API_KEY`: Pinecone database API key
- `GROQ_API_KEY`: Groq LLM API key
- `LANGCHAIN_TRACING_V2`: Enable LangChain tracing (true/false)
- `LANGCHAIN_API_KEY`: LangChain API key
- `LANGCHAIN_PROJECT`: LangChain project name

### Frontend Service
- **Image**: Node 20 Alpine
- **Port**: 3000
- **Framework**: React + Vite + TypeScript
- **Build Tool**: Bun/npm

**Environment Variables**:
- `VITE_API_BASE_URL`: Backend API URL

### Nginx Service (Optional - Production)
- **Port**: 80, 443
- **Role**: Reverse proxy, load balancing, SSL termination

## Common Commands

### Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Restart a service
docker-compose restart backend

# Rebuild images
docker-compose build --no-cache
```

### Production

```bash
# Start with production profile (includes Nginx)
docker-compose --profile production up -d

# Scale backend service (if using load balancer)
docker-compose up -d --scale backend=3

# Check service health
docker-compose ps
```

### Debugging

```bash
# Execute command in running container
docker-compose exec backend bash
docker-compose exec frontend sh

# View detailed container info
docker-compose ps -a

# Inspect volumes
docker volume ls

# Remove all containers and volumes
docker-compose down -v
```

## Docker Images Explained

### Backend Dockerfile (Multi-stage)
- **Stage 1 (Builder)**: Installs Python dependencies
- **Stage 2 (Final)**: Contains only runtime dependencies and application code
- **Benefits**: Smaller final image size, faster deployment

### Frontend Dockerfile (Multi-stage)
- **Stage 1 (Builder)**: Installs Node dependencies and builds the application
- **Stage 2 (Final)**: Serves built files using `serve` package
- **Benefits**: Production-optimized, minimal overhead

## Docker Compose Configuration

### Key Features:
- **Networks**: Isolated bridge network for service communication
- **Health Checks**: Automatic container health monitoring
- **Restart Policy**: Services automatically restart on failure
- **Volumes**: Persistent storage and live code reload
- **Depends On**: Service startup ordering
- **Profiles**: Optional services (e.g., production nginx)

### Networks
Services communicate via `medical-chatbot-network`:
- Backend → Pinecone (external)
- Frontend → Backend (internal via Docker DNS)
- Nginx → Frontend & Backend (only in production)

## Environment-Specific Configurations

### Development
```bash
docker-compose up -d
```
- Live code reloading
- Full debug logging
- Direct service access
- No SSL

### Production
```bash
docker-compose --profile production up -d
```
- Optimized images
- Nginx reverse proxy
- SSL ready (configure in nginx.conf)
- Rate limiting enabled
- Access logs enabled

## Troubleshooting

### Services not communicating
```bash
# Check network connectivity
docker-compose exec backend curl http://frontend:3000
docker-compose exec frontend curl http://backend:8000
```

### Port already in use
```bash
# Find process using port
netstat -tlnp | grep :8000

# Or modify docker-compose.yml ports
```

### Containers keep restarting
```bash
# Check logs
docker-compose logs backend

# Increase restart delay
# Edit docker-compose.yml and adjust restart policy
```

### Memory/CPU issues
```bash
# Add resource limits to docker-compose.yml:
# services:
#   backend:
#     deploy:
#       resources:
#         limits:
#           cpus: '1.0'
#           memory: 512M
```

## Performance Optimization

### Backend
- Multi-stage builds reduce image size
- Health checks ensure container availability
- Resource limits prevent resource exhaustion

### Frontend
- Alpine base image (small footprint)
- Production-optimized Vite build
- `serve` package for efficient static file serving

### Nginx
- Connection pooling
- Gzip compression
- Caching headers
- Rate limiting

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file with real keys
   - Use `.env.example` as template
   - Rotate API keys regularly

2. **Container Security**
   - Run as non-root user (add to Dockerfile)
   - Minimal base images (Alpine, slim)
   - Regular security updates

3. **Network Security**
   - Isolated Docker network
   - HTTPS in production (configure nginx.conf)
   - Rate limiting enabled

4. **Data Security**
   - Use Docker secrets for sensitive data
   - Implement backup strategy for volumes
   - Encrypt data in transit

## Deployment

### Local Testing
```bash
docker-compose up -d
# Test at http://localhost:3000
```

### Remote Server (Linux)
```bash
# SSH into server
ssh user@server

# Clone repository
git clone <repo-url>
cd Medical-Chatbot-RAG-System

# Setup environment
cp .env.example .env
# Edit .env with production values

# Deploy with production profile
docker-compose --profile production up -d
```

### Cloud Platforms

**AWS EC2**:
```bash
docker-compose --profile production up -d
# Configure security groups for ports 80, 443
```

**Digital Ocean App Platform**:
- Add docker-compose.yml to app spec
- Set environment variables in dashboard

**Azure Container Instances**:
```bash
az container create --resource-group myGroup \
  --file docker-compose.yml
```

## Monitoring

### View Real-time Metrics
```bash
docker stats
```

### Log Management
```bash
# Centralized logs
docker-compose logs --tail=100 -f
```

## Cleanup

```bash
# Remove all containers
docker-compose down

# Remove with volumes (WARNING: deletes data)
docker-compose down -v

# Remove unused images
docker image prune -a

# Remove all Docker resources (WARNING: destructive)
docker system prune -a --volumes
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/docker)
- [Nginx Configuration](https://nginx.org/en/docs)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Docker and service logs
3. Consult official documentation
4. Open an issue on the project repository
