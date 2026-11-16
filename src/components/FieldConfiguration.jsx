
function FieldConfiguration({ crops, soilTypes, selectedCrop, selectedSoil, onCropChange, onSoilChange }) {
  return (
    <section className="configuration" id="configuration">
      <div className="section-heading">
        <p className="section-tag">FIELD SETTINGS</p>
        <h2>Configure your field</h2>
        <p>
          Select your crop and soil type to get irrigation recommendations.
        </p>
      </div>

      <div className="configuration-card">
        <div className="form-group">
          <label htmlFor="crop">Select crop</label>
          <select
            id="crop"
            value={selectedCrop}
            onChange={(event) => onCropChange(event.target.value)}
          >
            <option value="">Choose a crop</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="soil">Select soil type</label>
          <select
            id="soil"
            value={selectedSoil}
            onChange={(event) => onSoilChange(event.target.value)}
          >
            <option value="">Choose soil type</option>
            {soilTypes.map((soil) => (
              <option key={soil} value={soil}>
                {soil}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default FieldConfiguration;
