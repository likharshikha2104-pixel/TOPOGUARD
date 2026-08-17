function Legend() {
  return (
    <div className="topology-legend">
      <div className="legend-title">Status</div>

      <div className="legend-item">
        <span className="legend-dot online-dot"></span>
        Online
      </div>

      <div className="legend-item">
        <span className="legend-dot offline-dot"></span>
        Offline
      </div>
    </div>
  );
}

export default Legend;
