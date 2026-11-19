
import { useEffect, useState } from "react";
import AnalysisForm from "./AnalysisForm";

function Dashboard({
  selectedCrop,
  selectedSoil,
  thresholdData,
  onReadingSaved
}) {
  const [moisture, setMoisture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchMoisture() {
    setLoading(true);
    setError("");

    try {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=-2.75&longitude=39.50&hourly=soil_moisture_27_to_81cm&past_days=1&forecast_days=1&timezone=Africa%2FNairobi";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to retrieve soil moisture data.");
      }

      const data = await response.json();

      const times = data.hourly?.time;
      const readings = data.hourly?.soil_moisture_27_to_81cm;

      if (!times || !readings) {
        throw new Error("Soil moisture data is unavailable.");
      }

      let latestReading = null;

      for (let i = times.length - 1; i >= 0; i--) {
        if (
          new Date(times[i]) <= new Date() &&
          readings[i] !== null &&
          typeof readings[i] === "number"
        ) {
          latestReading = readings[i];
          break;
        }
      }

      if (latestReading === null) {
        throw new Error("No soil moisture reading is available.");
      }

      setMoisture(latestReading * 100);
    } catch (err) {
      setError(err.message);
      setMoisture(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMoisture();
  }, []);

  const hasSelection = selectedCrop && selectedSoil;

  return (
    <>
      <section className="dashboard" id="dashboard">

        <div className="section-heading">
          <p className="section-tag">FIELD MONITORING</p>
          <h2>Dashboard Page</h2>
          <p>
            Monitor your field measurements and crop-specific
            moisture thresholds.
          </p>
        </div>

        {!hasSelection ? (
          <p className="dashboard-message">
            Select a crop and soil type to view your field data.
          </p>
        ) : !thresholdData ? (
          <p className="dashboard-message">
            No matching threshold data was found.
          </p>
        ) : (
          <>
            <div className="dashboard-summary">
              <p>
                Selected crop: <strong>{selectedCrop}</strong>
              </p>

              <p>
                Soil type: <strong>{selectedSoil}</strong>
              </p>
            </div>

            <div className="dashboard-grid">
              <div className="metric-card">
                <p>Field Capacity</p>
                <h3>{thresholdData.fieldCapacity}%</h3>
              </div>

              <div className="metric-card">
                <p>Wilting Point</p>
                <h3>{thresholdData.wiltingPoint}%</h3>
              </div>

              <div className="metric-card">
                <p>Moisture Threshold</p>
                <h3>{thresholdData.threshold}%</h3>
              </div>

              <div className="metric-card">
                <p>Current Soil Moisture</p>
                <h3>
                  {loading
                    ? "Loading..."
                    : moisture !== null
                    ? `${moisture.toFixed(2)}%`
                    : "--"}
                </h3>
              </div>
            </div>

            {error && (
              <div className="dashboard-message">
                <p className="error-message">{error}</p>

                <button
                  onClick={fetchMoisture}
                  disabled={loading}
                >
                  {loading ? "Retrying..." : "Retry Reading"}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {hasSelection && thresholdData && (
        <AnalysisForm
          selectedCrop={selectedCrop}
          selectedSoil={selectedSoil}
          thresholdData={thresholdData}
          moisture={moisture}
          loading={loading}
          error={error}
          onReadingSaved={onReadingSaved}
        />
      )}
    </>
  );
}

export default Dashboard;
