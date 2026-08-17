from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.scanner.network import scan_target
from app.analyzer.security import analyze_scan


router = APIRouter()


class ScanRequest(BaseModel):
    target: str


@router.post("/scan")
def scan(request: ScanRequest):

    try:
        scan_result = scan_target(request.target)

        analysis_result = analyze_scan(scan_result)

        return analysis_result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )