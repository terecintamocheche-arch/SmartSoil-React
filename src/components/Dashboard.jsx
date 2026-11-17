
import { useState } from "react";

function Dashboard({ selectedCrop, selectedSoil, thresholdData }) {
  const [moisture, setMoisture] = useState("");

  const hasSelection = selectedCrop && selectedSoil;

  const isBelowThreshold =
    thresholdData && moisture !== "" &&
    Number(moisture) <= thresholdData.threshold;

  return (
    <section className="dashboard" id="dashboard">
      <div className="section-heading">
        <p className="section-tag">FIELD MONITORING</p>
        <h2>Soil moisture dashboard</h2>
        <p>Enter your current soil moisture reading to assess your field.</p>
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
            <p>Selected crop: <strong>{selectedCrop}</strong></p>
            <p>Soil type: <strong>{selectedSoil}</strong></p>
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
              <h3>{moisture === "" ? "--" : `${moisture}%`}</h3>
            </div>
          </div>

          <div className="assessment-card">
            <label htmlFor="moisture">
              Enter current soil moisture (%)
            </label>

            <input
              type="number"
              id="moisture"
              min="0"
              max="100"
              step="0.1"
              value={moisture}
              onChange={(event) => setMoisture(event.target.value)}
              placeholder="e.g. 15"
            />

            {moisture !== "" && (
              <>
                {Number(moisture) < 0 || Number(moisture) > 100 ? (
                  <p>Please enter a value between 0 and 100.</p>
                ) : (
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
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;
