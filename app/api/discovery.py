from fastapi import APIRouter

from app.services.arp_scanner import scan_network
from app.services.network import (
    get_local_ip,
    get_network,
    get_gateway
)
from app.schemas.scan import ScanResponse


router = APIRouter(tags=["Network Discovery"])


@router.post("/scan", response_model=ScanResponse)
def scan():

    devices = scan_network()

    return ScanResponse(
        network=get_network(),
        local_ip=get_local_ip(),
        gateway=get_gateway(),
        device_count=len(devices),
        devices=devices
    )