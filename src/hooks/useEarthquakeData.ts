import { useState, useEffect } from 'react';
import axios from 'axios';
import {EarthquakeData, Filter} from '../types';

export const useEarthquakeData = (filter: Filter) => {
    const [data, setData] = useState<EarthquakeData | null>(null);

    useEffect(() => {
        const fetchEarthquakeData = async () => {
            const baseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';
            const url = `${baseUrl}/${filter.magnitude}_${filter.period}.geojson`;
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching earthquake data:', error);
            }
        };

        fetchEarthquakeData();
    }, [filter]);

    return data;
};