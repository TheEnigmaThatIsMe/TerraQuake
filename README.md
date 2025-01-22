# TerraQuake

TerraQuake is a dynamic web application designed to provide users with real-time information about earthquakes around the world. It leverages data from the United States Geological Survey (USGS) and displays it interactively using GeoJSON.

---
## Features

### 🌍 Global Earthquake Data

- Fetch and display up-to-date earthquake information directly from the USGS Earthquake GeoJSON Feed.
- Includes detailed information about each earthquake, such as magnitude, location, depth, and time of occurrence.

### 🗺️ Interactive Visualizations

- View earthquake data on an interactive globe.
- Filter and explore earthquake details based on magnitude or time range.

### 🧰 Customizable Filters

- Utilize a sidebar to filter earthquake data by:
  - Magnitude thresholds.
  - Date range.

### 🛠️ Responsive and Intuitive UI
- Designed for seamless navigation across devices.
- Built with modern UI/UX principles.

---
## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/terraquake.git
    ```

2. Navigate to the project directory:
    ```bash
    cd terraquake
    ```

3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
---
## Running the Project

To start the development server:

```bash
npm run dev
# or
yarn start
```
The application will be accessible at http://localhost:5173

---
## USGS Earthquake GeoJSON Data

TerraQuake uses the GeoJSON feed provided by USGS. For more information about the data and available endpoints, visit the [USGS GeoJSON documentation](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

Example GeoJSON Structure
```JSON
{
  "type": "FeatureCollection",
  "metadata": {
    "generated": 1674321230000,
    "url": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
    "title": "USGS All Earthquakes, Past Week",
    "count": 100
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "mag": 4.5,
        "place": "5km SE of Volcano, Hawaii",
        "time": 1674321023000
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -155.292,
          19.380,
          1.5
        ]
      },
      "id": "hv72574562"
    }
  ]
}
```
---
## Acknowledgments

Thanks to [USGS](https://www.usgs.gov/programs/earthquake-hazards) for providing public earthquake data.

Libraries used in the project:

- React
- Three.js
- Other dependencies listed in package.json.

Happy exploring the Earth's tremors with TerraQuake! 🌎