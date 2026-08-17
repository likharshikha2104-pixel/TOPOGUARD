function DeviceDetails({ device, onClose }) {
  if (!device) {
    return (
      <div
        style={{
          width: "300px",
          padding: "20px",
          background: "#ffffff",
          borderLeft: "1px solid #ddd",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2>Device Details</h2>

        <p style={{ color: "#777" }}>
          Click a device in the topology to view its details.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        background: "#ffffff",
        borderLeft: "1px solid #ddd",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Device Details</h2>

        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "15px 0",
        }}
      >
        <div style={{ fontSize: "50px" }}>{device.icon}</div>

        <h3>{device.label}</h3>

        <div
          style={{
            color: device.status === "Online" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          ● {device.status}
        </div>
      </div>

      <hr />

      <p>
        <strong>Type:</strong> {device.type}
      </p>

      <p>
        <strong>IP Address:</strong> {device.ip}
      </p>

      <p>
        <strong>MAC Address:</strong> {device.mac}
      </p>

      <p>
        <strong>Location:</strong> {device.location}
      </p>
    </div>
  );
}

export default DeviceDetails;
