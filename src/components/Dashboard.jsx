
import { useEffect, useState } from "react";

function Dashboard({ selectedCrop, selectedSoil, thresholdData }) {
  const [moisture, setMoisture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const hasSelection = selectedCrop && selectedSoil;

  // Fetch soil moisture from Open-Meteo
  useEffect(() => {
    async function fetchMoisture() {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=-2.75&longitude=39.50&hourly=soil_moisture_27_to_81cm&past_days=1&forecast_days=1&timezone=Africa%2FNairobi";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Unable to retrieve soil moisture data.");
        }

        const data = await response.json();

        const times = data.hourly.time;
        const readings = data.hourly.soil_moisture_27_to_81cm;

        let latestReading = null;

        for (let i = times.length - 1; i >= 0; i--) {
          if (
            new Date(times[i]) <= new Date() &&
            readings[i] !== null
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
      } finally {
        setLoading(false);
      }
    }

    fetchMoisture();
  }, []);

  const isBelowThreshold =
    thresholdData &&
    moisture !== null &&
    moisture <= thresholdData.threshold;

  // Save reading to JSON Server
  async function saveReading() {
    if (!thresholdData || moisture === null) {
      setSaveMessage("No soil moisture reading available.");
      return;
    }

    setSaving(true);
    setSaveMessage("");

    const reading = {
      crop: selectedCrop,
      soilType: selectedSoil,
      soilMoisture: Number(moisture.toFixed(2)),
      threshold: thresholdData.threshold,
      status: isBelowThreshold
        ? "Below moisture threshold"
        : "Above moisture threshold",
      date: new Date().toISOString()
    };

    try {
      const response = await fetch(
        "http://localhost:3001/analyses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reading)
        }
      );

      if (!response.ok) {
        throw new Error("Unable to save reading.");
      }

      await response.json();
      setSaveMessage("Reading saved successfully!");
    } catch (err) {
      setSaveMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="dashboard" id="dashboard">

      <div className="section-heading">
        <p className="section-tag">FIELD MONITORING</p>
        <h2>Soil moisture dashboard</h2>
        <p>
          Monitor soil moisture and receive crop-specific
          irrigation recommendations.
        </p>
      </div>

      {!hasSelection ? (
        <p className="dashboard-message">
          Select a crop and soil type to view your field assessment.
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
              <p>Field capacity</p>
              <h3>{thresholdData.fieldCapacity}%</h3>
            </div>

            <div className="metric-card">
              <p>Wilting point</p>
              <h3>{thresholdData.wiltingPoint}%</h3>
            </div>

            <div className="metric-card">
              <p>Moisture threshold</p>
              <h3>{thresholdData.threshold}%</h3>
            </div>

            <div className="metric-card">
              <p>Current soil moisture</p>
              <h3>
                {loading
                  ? "Loading..."
                  : moisture !== null
                  ? `${moisture.toFixed(2)}%`
                  : "--"}
              </h3>
            </div>

          </div>

          <div className="assessment-card">
            <h3>Irrigation assessment</h3>

            {loading ? (
              <p>Retrieving soil moisture readings...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : moisture !== null ? (
              <>
                <h3>
                  {isBelowThreshold
                    ? "Below moisture threshold"
                    : "Above moisture threshold"}
                </h3>

                <p>
                  {isBelowThreshold
                    ? "Soil moisture is at or below the selected crop threshold. Check field conditions and your irrigation plan."
                    : "Soil moisture is above the selected crop threshold. Continue monitoring field conditions before irrigating."}
                </p>

                <button
                  onClick={saveReading}
                  disabled={saving}
                  className="save-button"
                >
                  {saving ? "Saving..." : "Save Reading"}
                </button>

                {saveMessage && <p>{saveMessage}</p>}
              </>
            ) : (
              <p>No soil moisture reading is available.</p>
            )}
          </div>
        </>
      )}

    </section>
  );
}

export default Dashboard;
