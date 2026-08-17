from typing import List, Optional
from pydantic import BaseModel


class ScanRequest(BaseModel):
    target: str


class Finding(BaseModel):
    host: str
    port: int
    service: Optional[str] = None
    risk: str
    reason: str
    recommendation: str


class ScanResponse(BaseModel):
    target: str
    overall_risk: str
    risk_score: int
    total_findings: int
    findings: List[Finding]