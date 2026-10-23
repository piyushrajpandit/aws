"""
SatyaDrishti FastAPI Server
Main entrypoint for the Python backend.
"""

from contextlib import asynccontextmanager
import asyncio
import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

_backend_dir = Path(__file__).resolve().parent
if str(_backend_dir) not in sys.path:
    sys.path.insert(0, str(_backend_dir))

# ── Database (must be imported BEFORE lifespan uses them) ─────────────────────
from database import Base, engine, run_migrations
import models.db_models  # Ensure all ORM models are registered

# ── Routers ───────────────────────────────────────────────────────────────────
from api.routes.database_api import router as database_router
from api.routes.extraction_api import router as extraction_router
from api.routes.email_api import router as email_router
from api.routes.crawler_api import router as crawler_router
from api.routes.regulatory_api import router as regulatory_router
from services.ecommerce_crawler_service import crawler_service


# ─── Background Crawler Daemon ────────────────────────────────────────────────

async def _autonomous_crawler_loop():
    """Autonomous background worker: runs daily batch of 5 products without human intervention."""
    # Allow server 5 seconds to warm up before first run
    await asyncio.sleep(5)
    while True:
        try:
            if crawler_service.auto_schedule_active:
                crawler_service.log_event("INFO", "[Autonomous Daemon] Waking up for scheduled daily 5-product batch")
                await crawler_service.run_batch(batch_size=5)
            # Sleep configured hours (default 24 h)
            sleep_seconds = crawler_service.get_status().get("interval_hours", 24) * 3600
            await asyncio.sleep(sleep_seconds)
        except asyncio.CancelledError:
            break
        except Exception as e:
            crawler_service.log_event("ERROR", f"[Autonomous Daemon] Uncaught error in scheduler loop: {e}")
            await asyncio.sleep(60)  # back-off on unexpected errors


# ─── Lifespan (replaces deprecated @app.on_event) ─────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup / shutdown lifecycle handler."""
    # ── Startup ──────────────────────────────────────────────────────────────
    try:
        Base.metadata.create_all(bind=engine)
        run_migrations()
        print("[Database] Schema synchronized and migrated successfully.")
    except Exception as e:
        print(f"[Database] Schema sync warning: {e}")

    crawler_task = asyncio.create_task(_autonomous_crawler_loop())

    yield  # server is live

    # ── Shutdown ─────────────────────────────────────────────────────────────
    crawler_task.cancel()
    try:
        await crawler_task
    except asyncio.CancelledError:
        pass


# ─── FastAPI Application ──────────────────────────────────────────────────────

app = FastAPI(
    title="SatyaDrishti Regulatory Intelligence API",
    description="Backend API for Legal Metrology, OCR Verification, and Consumer Protection Enforcement",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for the frontend (Vite dev server and Vercel deployment).
#
# IMPORTANT: allow_credentials=True CANNOT be combined with allow_origins=["*"].
# The CORS spec requires explicit origins (not wildcard) when credentials are
# sent.  Since this API uses no cookies / auth headers from the browser, we
# keep the wildcard and leave credentials disabled — the correct setting for a
# public regulatory data API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,   # Must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Mount Routers ────────────────────────────────────────────────────────────
app.include_router(database_router)
app.include_router(extraction_router)
app.include_router(email_router)
app.include_router(crawler_router)
app.include_router(regulatory_router)


# ─── Health Check ─────────────────────────────────────────────────────────────

@app.api_route("/", methods=["GET", "HEAD"])
@app.api_route("/health", methods=["GET", "HEAD"])
def health_check():
    return {
        "status": "healthy",
        "service": "SatyaDrishti Regulatory Backend",
        "database": "PostgreSQL / SQLite Storage Engine Active",
        "crawler_scheduler": "Active (Autonomous Daily 5-Product Batch)",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
