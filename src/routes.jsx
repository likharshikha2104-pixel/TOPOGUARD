// src/routes.jsx
import Dashboard from "./pages/Dashboard";
import Topology from "./pages/Topology";
import Devices from "./pages/Devices";
import Alerts from "./pages/Alerts";
import Vulnerabilities from "./pages/Vulnerabilities";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/topology",
    element: <Topology />,
  },
  {
    path: "/devices",
    element: <Devices />,
  },
  {
    path: "/alerts",
    element: <Alerts />,
  },
  {
    path: "/vulnerabilities",
    element: <Vulnerabilities />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;