
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

  return (
    <section className="history-section" id="history">
      <div className="section-heading">
        <p className="section-tag">PREVIOUS RECORDS</p>
        <h2>Reading History</h2>
        <p>View your previously saved soil moisture readings.</p>
      </div>

      {loading ? (
        <p>Loading reading history...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : history.length === 0 ? (
        <p>No saved readings yet.</p>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Soil Type</th>
                <th>Soil Moisture</th>
                <th>Threshold</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.crop}</td>
                  <td>{item.soilType}</td>
                  <td>{item.soilMoisture}%</td>
                  <td>{item.threshold}%</td>
                  <td>{item.status}</td>
                  <td>
                    {new Date(item.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ReadingHistory;
