# 3D NASA Weather & Flood Alert Globe (MVP)

An interactive 3D globe application that visualizes real-time meteorological conditions and natural disaster alerts using authoritative NASA datasets. Users can rotate the globe, select specific coordinates, and view localized weather forecasts and active flood warnings.

## 🌟 MVP Features

* **Interactive 3D Interface:** A WebGL-powered 3D sphere representing Earth, equipped with smooth rotation, zooming, and coordinate raycasting.
* **Real-Time Texturing:** The globe's surface is dynamically generated using the most recent 24-hour full-disc images of Earth from space.
* **Disaster & Flood Alerts:** Active natural events (floods, severe storms, wildfires) are plotted as interactive markers directly on the globe.
* **Localized Weather Data:** Clicking on a specific region retrieves localized temperature, humidity, and wind conditions.

## 🛠️ Tech Stack

**Frontend**
* **Three.js / WebGL:** For rendering the interactive 3D sphere, handling coordinate math, and raycasting for user clicks.

**Backend**
* **Python (FastAPI):** Serves as a fast, asynchronous middleware to aggregate and filter payload data from multiple NASA APIs before serving it to the frontend.

**Data Providers (NASA APIs)**
* **EONET (Earth Observatory Natural Event Tracker):** Provides live GeoJSON feeds for mapping active floods and storms.
* **EPIC (Earth Polychromatic Imaging Camera):** Supplies daily satellite imagery to texture the 3D base globe.
* **POWER (Prediction Of Worldwide Energy Resources):** Delivers precise meteorological data (temperature, wind) based on user-clicked coordinates.
* **GIBS (Global Imagery Browse Services):** Used for draping near-real-time map tiles (e.g., precipitation, clouds) over the 3D mesh.

## 🏗️ Architecture & Implementation Strategy

### 1. Base Globe Texturing (EPIC)
The backend fetches the daily image array from the NASA EPIC API. The frontend parses the latest image URL, loads it via `THREE.TextureLoader()`, and applies it as the `map` property to a `MeshStandardMaterial`.

### 2. Fetching Disaster Data (EONET)
The Python backend polls the EONET endpoint (`/api/v3/events?category=floods,severeStorms`) and serves a cleaned JSON array containing event names and `[longitude, latitude]` coordinates to the frontend.

### 3. Spatial Mapping (2D to 3D)
To map the 2D latitude and longitude coordinates from EONET onto the 3D Three.js sphere, the application uses spherical coordinate conversion (converting degrees to radians first):
```javascript
x = R * Math.cos(lat) * Math.cos(lon)
y = R * Math.sin(lat)
z = R * Math.cos(lat) * Math.sin(lon)
```

### 4. Interactive Markers
Smaller 3D meshes (e.g., glowing pins) are instantiated at the calculated `(x, y, z)` positions. A `THREE.Raycaster` detects user interaction; when a pin is clicked, a UI dashboard overlay displays the specific alert data.

## 🚀 Setup & Installation

**1. Clone the repository**
```bash
git clone https://github.com/Ponskio0/nasa-weather-globe.git
cd nasa-weather-globe
```

**2. Backend Setup (Python)**
Initialize a virtual environment and install dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install fastapi uvicorn requests
```
Run the local server:
```bash
uvicorn main:app --reload
```

**3. Frontend Setup**
*(Include your preferred bundler instructions here, e.g., Vite or Webpack)*
```bash
npm install
npm run dev
```

## 📝 Roadmap / Future Scope
* Implement custom machine learning models (via scikit-learn) to predict localized flood risks based on historical data.
* High-resolution terrain displacement mapping (bump maps) for geographical realism.
* Saved user profiles for tracking favorite cities or regions.

---