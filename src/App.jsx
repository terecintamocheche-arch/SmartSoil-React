import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [thresholds, setThresholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <h2>Loading soil data.........</h2>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar />
      <h1>Welcome to SmartSoil</h1>
      <p>Connected to JSON Server successfully</p>

      <h2>Total threshold records: {thresholds.length}</h2>

      <h3>Available soil moisture data</h3>

      {thresholds.slice(0, 5).map((record) => (
        <div key={record.id}>
          <p>Crop: {record.crop}</p>
          <p>Soil type: {record.soilType}</p>
          <p>Moisture threshold: {record.threshold}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
