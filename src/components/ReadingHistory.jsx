<div className="history-section">
  <h2>Reading History</h2>

  {history.length === 0 ? (
    <p>No saved readings yet.</p>
  ) : (
    history.map((item) => (
      <div className="history-card" key={item.id}>
        <h3>{item.crop}</h3>
        <p>Soil type: {item.soilType}</p>
        <p>Soil moisture: {item.soilMoisture}%</p>
        <p>Threshold: {item.threshold}%</p>
        <p>Status: {item.status}</p>
        <small>{new Date(item.date).toLocaleString()}</small>
      </div>
    ))
  )}
</div>