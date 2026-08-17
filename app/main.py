from fastapi import FastAPI

from app.api.discovery import router

app = FastAPI(
    title="TopoGuard Network Discovery API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def root():

    return {
        "status": "running",
        "module": "Network Discovery"
    }