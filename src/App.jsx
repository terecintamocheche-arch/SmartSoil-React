import thresholdData from "./data/soil-moisture-thresholds.json";

function App() {
  return (
    <div>
      <h1>Welcome to SmartSoil</h1>
      <p>Total threshold records: {thresholdData.records.length}</p>
    </div>
  );
}

export default App;