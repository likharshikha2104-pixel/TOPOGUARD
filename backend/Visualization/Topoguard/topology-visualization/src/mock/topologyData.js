export const topologyNodes = [
  {
    id: "router-1",
    type: "custom",
    position: { x: 350, y: 50 },
    data: {
      label: "Main Router",
      type: "Router",
      icon: "🌐",
      status: "Online",
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
    },
  },

  {
    id: "server-1",
    type: "custom",
    position: { x: 100, y: 400 },
    data: {
      label: "Server 01",
      type: "Server",
      icon: "🖥️",
      status: "Online",
    },
  },

  {
    id: "server-2",
    type: "custom",
    position: { x: 600, y: 400 },
    data: {
      label: "Server 02",
      type: "Server",
      icon: "🖥️",
      status: "Online",
    },
  },

  {
    id: "pc-1",
    type: "custom",
    position: { x: 350, y: 550 },
    data: {
      label: "Admin PC",
      type: "PC",
      icon: "💻",
      status: "Online",
    },
  },
];

export const topologyEdges = [
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
    id: "switch-server2",
    source: "switch-1",
    target: "server-2",
    animated: true,
  },

  {
    id: "switch-pc",
    source: "switch-1",
    target: "pc-1",
    animated: true,
  },
];
