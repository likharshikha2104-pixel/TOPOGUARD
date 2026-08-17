import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  useReactFlow,
} from "@xyflow/react";

import { useState } from "react";

import "@xyflow/react/dist/style.css";

import CustomNode from "./CustomNode";
import DeviceDetails from "../components/DeviceDetails";
import Toolbar from "../components/Toolbar";

const nodeTypes = {
  custom: CustomNode,
};

const nodes = [
  {
    id: "router-1",
    type: "custom",
    position: { x: 350, y: 50 },
    data: {
      label: "Main Router",
      type: "Router",
      icon: "🌐",
      status: "Online",
      ip: "192.168.1.1",
      mac: "AA:BB:CC:DD:EE:01",
      location: "Network Room",
    },
  },

  {
    id: "switch-1",
    type: "custom",
    position: { x: 350, y: 220 },
    data: {
      label: "Core Switch",
      type: "Switch",
      icon: "🔀",
      status: "Online",
      ip: "192.168.1.2",
      mac: "AA:BB:CC:DD:EE:02",
      location: "Network Room",
    },
  },

  {
    id: "server-1",
    type: "custom",
    position: { x: 100, y: 420 },
    data: {
      label: "Server 01",
      type: "Server",
      icon: "🖥️",
      status: "Online",
      ip: "192.168.1.10",
      mac: "AA:BB:CC:DD:EE:10",
      location: "Server Room",
    },
  },

  {
    id: "pc-1",
    type: "custom",
    position: { x: 350, y: 420 },
    data: {
      label: "Admin PC",
      type: "PC",
      icon: "💻",
      status: "Online",
      ip: "192.168.1.20",
      mac: "AA:BB:CC:DD:EE:20",
      location: "Admin Office",
    },
  },

  {
    id: "server-2",
    type: "custom",
    position: { x: 600, y: 420 },
    data: {
      label: "Server 02",
      type: "Server",
      icon: "🖥️",
      status: "Online",
      ip: "192.168.1.11",
      mac: "AA:BB:CC:DD:EE:11",
      location: "Server Room",
    },
  },
];

const edges = [
  {
    id: "router-switch",
    source: "router-1",
    target: "switch-1",
    animated: true,
  },

  {
    id: "switch-server1",
    source: "switch-1",
    target: "server-1",
    animated: true,
  },

  {
    id: "switch-pc",
    source: "switch-1",
    target: "pc-1",
    animated: true,
  },

  {
    id: "switch-server2",
    source: "switch-1",
    target: "server-2",
    animated: true,
  },
];

function NetworkGraphContent() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleNodeClick = (event, node) => {
    setSelectedDevice(node.data);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      {/* React Flow Area */}

      <div
        style={{
          flex: 1,
          height: "100%",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Controls />

          <Background />
        </ReactFlow>
      </div>

      {/* Functional Toolbar */}

      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          zIndex: 10,
        }}
      >
        <Toolbar onZoomIn={zoomIn} onZoomOut={zoomOut} onFitView={fitView} />
      </div>

      {/* Device Details */}

      <DeviceDetails
        device={selectedDevice}
        onClose={() => setSelectedDevice(null)}
      />
    </div>
  );
}

function NetworkGraph() {
  return (
    <ReactFlowProvider>
      <NetworkGraphContent />
    </ReactFlowProvider>
  );
}

export default NetworkGraph;
