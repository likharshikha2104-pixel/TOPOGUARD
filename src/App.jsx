import NetworkGraph from "./graph/NetworkGraph";
import Legend from "./components/Legend";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="topoguard-header">
        <div>
          <h1>TopoGuard</h1>
          <p>Network Topology Monitor</p>
        </div>

        <div className="network-status">
          <span className="status-dot"></span>
          Network Online
        </div>
      </header>

      {/* Dashboard Statistics */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-title">Total Devices</div>
          <div className="stat-value">5</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Online Devices</div>
          <div className="stat-value online">5</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Offline Devices</div>
          <div className="stat-value offline">0</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Connections</div>
          <div className="stat-value">4</div>
        </div>
      </section>

      {/* Topology */}
      <main className="topology-container">
        <div className="topology-content">
          <NetworkGraph />

          <Legend />
        </div>
      </main>
    </div>
  );
}

export default App;
