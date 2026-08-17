import socket


def get_hostname(ip: str):

    try:
        return socket.gethostbyaddr(ip)[0]

    except Exception:
        return None