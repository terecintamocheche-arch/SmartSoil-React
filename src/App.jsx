
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import ReadingHistory from "./components/ReadingHistory";
import Footer from "./components/Footer";
import About from "./components/About";

import "./App.css";

function App() {
  const [thresholds, setThresholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");

  const [refreshHistory, setRefreshHistory] = useState(0);

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

  const crops = [
    ...new Set(thresholds.map((record) => record.crop)),
  ];

  const soilTypes = [
    ...new Set(thresholds.map((record) => record.soilType)),
  ];

  const thresholdData = thresholds.find(
    (record) =>
      record.crop === selectedCrop &&
      record.soilType === selectedSoil
  );

  return (
    <div>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Hero />} />

          <Route
            path="/dashboard"
            element={
              loading ? (
                <h2>Loading soil data...</h2>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <Dashboard
                  crops={crops}
                  soilTypes={soilTypes}
                  selectedCrop={selectedCrop}
                  selectedSoil={selectedSoil}
                  onCropChange={setSelectedCrop}
                  onSoilChange={setSelectedSoil}
                  thresholdData={thresholdData}
                  onReadingSaved={() =>
                    setRefreshHistory((prev) => prev + 1)
                  }
                />
              )
            }
          />

          <Route
            path="/history"
            element={
              <ReadingHistory refreshKey={refreshHistory} />
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
