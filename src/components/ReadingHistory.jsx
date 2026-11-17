
import { useEffect, useState } from "react";

function ReadingHistory({ refreshKey }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "http://localhost:3001/analyses"
        );

        if (!response.ok) {
          throw new Error("Failed to load reading history.");
        }

        const data = await response.json();

        setHistory(data.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [refreshKey]);

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
