
import { useEffect, useState } from "react";

function ReadingHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/analyses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load reading history.");
        }

        return response.json();
      })
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading reading history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="history-section" id="history">
      <div className="section-heading">
        <p className="section-tag">PREVIOUS RECORDS</p>
        <h2>Reading History</h2>
      </div>

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
            <small>
              {new Date(item.date).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </section>
  );
}

export default ReadingHistory;
