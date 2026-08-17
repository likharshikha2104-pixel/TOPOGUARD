from pydantic import BaseModel


class Port(BaseModel):
    port: int
    service: str
    status: str = "open"


class Device(BaseModel):
    id: int
    ip: str
    mac: str
    hostname: str | None = None
    vendor: str = "Unknown"
    device_type: str = "Unknown"
    open_ports: list[Port] = []
    status: str = "online"