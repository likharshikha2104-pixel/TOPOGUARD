function Toolbar({ onZoomIn, onZoomOut, onFitView }) {
  return (
    <div className="topology-toolbar">
      <div className="toolbar-title">Network Topology</div>

      <div className="toolbar-actions">
        <button onClick={onZoomIn}>＋ Zoom In</button>

        <button onClick={onZoomOut}>－ Zoom Out</button>

        <button onClick={onFitView}>⛶ Fit View</button>
      </div>
    </div>
  );
}

export default Toolbar;
