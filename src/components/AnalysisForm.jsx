
import { useState } from "react";

function AnalysisForm({
  selectedCrop,
  selectedSoil,
  thresholdData,
  moisture,
  loading,
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
    if (loading || !thresholdData || !hasMoisture) {
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
    <div className="save-reading">
      <button
        className="save-button"
        onClick={saveReading}
        disabled={saving || loading || !hasMoisture}
      >
        {saving ? "Saving..." : "Save Reading"}
      </button>

      {saveMessage && <p>{saveMessage}</p>}
    </div>
  );
}

export default AnalysisForm;
