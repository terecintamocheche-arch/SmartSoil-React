
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FieldConfiguration from "./components/FieldConfiguration";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  const [thresholds, setThresholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");

  // Fetch threshold records from JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/thresholds")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch soil data");
        }

        return response.json();
      })
      .then((data) => {
        setThresholds(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Get available crops
  const crops = [
    ...new Set(thresholds.map((record) => record.crop)),
  ];

  // Get available soil types
  const soilTypes = [
    ...new Set(thresholds.map((record) => record.soilType)),
  ];

  // Find matching threshold
  const thresholdData = thresholds.find(
    (record) =>
      record.crop === selectedCrop &&
      record.soilType === selectedSoil
  );

  if (loading) {
    return <h2>Loading soil data...</h2>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar />

      <main>
        <Hero />

        <FieldConfiguration
          crops={crops}
          soilTypes={soilTypes}
          selectedCrop={selectedCrop}
          selectedSoil={selectedSoil}
          onCropChange={setSelectedCrop}
          onSoilChange={setSelectedSoil}
        />

        <Dashboard
          selectedCrop={selectedCrop}
          selectedSoil={selectedSoil}
          thresholdData={thresholdData}
        />

        <p>Total threshold records: {thresholds.length}</p>
      </main>
    </div>
  );
}

export default App;
