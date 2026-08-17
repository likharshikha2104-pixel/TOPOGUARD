from pydantic import BaseModel
from app.schemas.device import Device


class ScanResponse(BaseModel):
    network: str
    local_ip: str
    gateway: str | None = None
    device_count: int
    devices: list[Device]
