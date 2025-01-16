export type Filter = {
    period: 'hour' | 'day' | 'week' | 'month';
    magnitude: 'significant' | '4.5' | '2.5' | '1.0' | 'all';
};

export type EarthquakeFeature = {
    type: 'Feature';
    properties: {
        mag: number | null; // Magnitude of the earthquake
        place: string; // Location description
        time: number; // Time of the earthquake in milliseconds since epoch
        updated: number; // Last update time in milliseconds
        tz: number | null; // Timezone offset
        url: string; // URL to more details
        detail: string; // URL to detailed JSON
        felt?: number; // Number of reports of people feeling the earthquake
        cdi?: number; // Community Determined Intensity
        mmi?: number; // Maximum Mercalli Intensity
        alert?: string; // Alert level
        status: string; // Status of the event
        tsunami?: number; // Tsunami warning flag
        sig: number; // Significance of the event
        net: string; // Network identifier
        code: string; // Event code
        ids: string; // List of event IDs
        sources: string; // Data source
        types: string; // Event types
        nst?: number; // Number of stations reporting
        dmin?: number; // Minimum distance to the earthquake
        rms?: number; // Root mean square of travel times
        gap?: number; // Gap between seismic stations
        magType: string; // Type of magnitude
        type: string; // Event type
    };
    geometry: {
        type: 'Point';
        coordinates: [number, number, number]; // [longitude, latitude, depth]
    };
    id: string;
};

export type EarthquakeData = {
    type: 'FeatureCollection';
    metadata: {
        generated: number; // Timestamp of data generation
        url: string; // URL of the data
        title: string; // Title of the dataset
        api: string; // API version
        count: number; // Number of features in the dataset
        status: number; // Status code
    };
    bbox: [number, number, number, number, number, number]; // Bounding box for the dataset
    features: EarthquakeFeature[]; // List of earthquake features
};

export type PointData = {
    lat: number;
    lng: number;
    altitude: number;
    radius: number;
    color: string;
};

export type GlobePoint = {
    altitude: number;
    color: string;
    id: string;
    lat: number;
    lng: number;
    radius: number;
}
