import socket


COMMON_PORTS = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    135: "MS RPC",
    139: "NetBIOS",
    443: "HTTPS",
    445: "SMB",
    3389: "RDP",
}


def check_port(ip: str, port: int, timeout: float = 0.5):
    """
    Check whether a TCP port is open on a discovered device.
    """

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)

    try:
        result = sock.connect_ex((ip, port))
        return result == 0

    except (socket.timeout, OSError):
        return False

    finally:
        sock.close()


def scan_ports(ip: str):
    """
    Scan selected common TCP ports on a local network device.
    """

    open_ports = []

    for port, service in COMMON_PORTS.items():

        if check_port(ip, port):

            open_ports.append({
                "port": port,
                "service": service,
                "status": "open"
            })

    return open_ports