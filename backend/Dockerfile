# ── SatyaDrishti Backend — Render Docker Deployment ───────────────────────────
# Uses Tesseract OCR (free-tier safe: ~50MB RAM) via Docker system install.
# No apt-get in build command needed — it runs here during Docker image build.

FROM python:3.11-slim

# Prevent interactive prompts during apt
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# ── Install system dependencies (tesseract binary) ────────────────────────────
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        tesseract-ocr \
        tesseract-ocr-eng \
        libglib2.0-0 \
        libgl1-mesa-glx \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# ── Install Python dependencies ───────────────────────────────────────────────
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── Copy app source ───────────────────────────────────────────────────────────
COPY . .

# ── Start server ──────────────────────────────────────────────────────────────
CMD uvicorn main:app --host 0.0.0.0 --port $PORT
