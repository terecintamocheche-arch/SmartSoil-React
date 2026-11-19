
# SmartSoil 
### Centre Pivot Irrigation Assistant

## 1. Project Overview

SmartSoil is a web-based irrigation assistant designed to support better irrigation decisions in agriculture.

The application helps users understand soil moisture conditions by comparing current soil moisture estimates with crop-specific moisture thresholds based on selected crop and soil types.

Its goal is to support informed irrigation decisions and encourage more efficient water management.

## 2. Features

- **Crop Selection:** Choose from different crops, including maize, beans, tomatoes, wheat and more.
- **Soil Selection:** Select a soil type to retrieve the corresponding soil moisture thresholds.
- **Soil Moisture Monitoring:** Retrieve modelled soil moisture estimates using the Open-Meteo API.
- **Field Measurements:** Display field capacity, wilting point, moisture threshold and current soil moisture.
- **Reading History:** Save soil moisture readings and view previously saved records in a table.
- **Multiple Pages:** Navigate between Home, Dashboard, Reading History and About pages.

## 3. Technologies Used

- React – Building the user interface.
- Vite – Development environment and build tool.
- JavaScript – Application functionality.
- CSS – Styling and responsive layouts.
- React Router – Navigation between application pages.
- JSON Server – Providing a local API for soil threshold data and saved readings.
- Open-Meteo API – Retrieving modelled soil moisture estimates.

## 4. How SmartSoil Works

1. The user opens the Dashboard.
2. The user selects a crop and soil type.
3. The application retrieves the matching soil moisture threshold from the local API.
4. The application retrieves a modelled soil moisture estimate from Open-Meteo.
5. The dashboard displays the field measurements.
6. The user can save the reading.
7. Saved readings are stored through JSON Server and displayed on the Reading History page.

**Note:** Soil moisture values are modelled estimates from Open-Meteo, not direct measurements from physical soil sensors.

## 5. Installation and Setup

### Prerequisites

- Node.js
- npm

### Step 1: Clone the repository

```bash
git clone https://github.com/terecintamocheche-arch/SmartSoil-React.git
```

### Step 2: Navigate into the project folder

```bash
cd SmartSoil-React
```

### Step 3: Install dependencies

```bash
npm install
```

## 6. Running the Application

SmartSoil requires two terminal sessions.

### Terminal 1: Start JSON Server

```bash
npm run server
```

JSON Server runs at:

http://localhost:3001

### Terminal 2: Start the React application

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

