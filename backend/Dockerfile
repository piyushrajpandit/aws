# SatyaDrishti Backend — Render Docker Deployment
# Docker context = repo root (Render default)
# All paths are relative to the repo root.

FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install tesseract system binary (works in Docker — apt-get has full write access here)
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        tesseract-ocr \
        tesseract-ocr-eng \
        libglib2.0-0 \
        libgl1-mesa-glx \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from backend/ subdirectory and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Start the server
CMD uvicorn main:app --host 0.0.0.0 --port $PORT
