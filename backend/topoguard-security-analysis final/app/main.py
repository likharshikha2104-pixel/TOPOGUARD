from fastapi import FastAPI

from app.api.routes import router


app = FastAPI(
    title="TopoGuard Security Analysis",
    description="Network security analysis and risk assessment platform",
    version="1.0.0"
)


app.include_router(router)


@app.get("/")
def root():
    return {
        "status": "online",
        "message": "TopoGuard Security Analysis API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }