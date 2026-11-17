
import { useState } from "react";

function AnalysisForm({
  selectedCrop,
  selectedSoil,
  thresholdData,
  moisture,
  loading,
  error,
  onReadingSaved
}) {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const hasMoisture =
    typeof moisture === "number" && Number.isFinite(moisture);

  const isBelowThreshold =
    thresholdData &&
    hasMoisture &&
    moisture <= Number(thresholdData.threshold);

  async function saveReading() {
    if (!thresholdData || !hasMoisture) {
      setSaveMessage("No soil moisture reading available to save.");
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

      if (onReadingSaved) {
        onReadingSaved();
      }
    } catch (err) {
      setSaveMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="analysis-section">
      <div className="section-heading">
        <p className="section-tag">FIELD ANALYSIS</p>
        <h2>Irrigation Assessment</h2>
        <p>
          Review your field's current moisture conditions
          and irrigation recommendations.
        </p>
      </div>

      {loading ? (
        <p>Retrieving soil moisture readings...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : !hasMoisture ? (
        <p>No soil moisture reading is available.</p>
      ) : !thresholdData ? (
        <p>No matching threshold data was found.</p>
      ) : (
        <div className="analysis-card">
          <p>
            Selected crop: <strong>{selectedCrop}</strong>
          </p>

          <p>
            Soil type: <strong>{selectedSoil}</strong>
          </p>

          <p>
            Current moisture:{" "}
            <strong>{moisture.toFixed(2)}%</strong>
          </p>

          <p>
            Moisture threshold:{" "}
            <strong>{thresholdData.threshold}%</strong>
          </p>

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
            className="save-button"
            onClick={saveReading}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Reading"}
          </button>

          {saveMessage && <p>{saveMessage}</p>}
        </div>
      )}
    </section>
  );
}

export default AnalysisForm;
