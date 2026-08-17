import { Handle, Position } from "@xyflow/react";

function CustomNode({ data }) {
  return (
    <div
      style={{
        width: "160px",
        padding: "15px",
        border: "2px solid #333",
        borderRadius: "12px",
        background: "white",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div style={{ fontSize: "32px" }}>{data.icon}</div>

      <div
        style={{
          fontWeight: "bold",
          marginTop: "5px",
        }}
      >
        {data.label}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "#666",
          marginTop: "4px",
        }}
      >
        {data.type}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: data.status === "Online" ? "green" : "red",
          fontWeight: "bold",
          marginTop: "6px",
        }}
      >
        ● {data.status}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
