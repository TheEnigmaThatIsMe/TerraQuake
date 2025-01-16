import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { EarthquakeData, PointData } from '../types';

type EarthquakeGlobeViewProps = {
    earthquakeData: EarthquakeData | null;
};

export const EarthquakeGlobeView: React.FC<EarthquakeGlobeViewProps> = ({ earthquakeData }) => {
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    const [points, setPoints] = useState<PointData[]>([]);

    useEffect(() => {
        if (!earthquakeData) return;

        const newPoints = earthquakeData.features.map((feature) => {
            const [longitude, latitude, depth] = feature.geometry.coordinates;
            const magnitude = feature.properties.mag || 0;

            const colorScale = (mag: number) => {
                const colors = [
                    '#00ff00', '#aaff00', '#ffaa00', '#ff5500', '#ff0000',
                ];
                return colors[Math.min(Math.floor(mag / 2), colors.length - 1)];
            };

            return {
                lat: latitude,
                lng: longitude,
                altitude: depth / 100,
                radius: 0.2,
                color: colorScale(magnitude),
            };
        });

        setPoints(newPoints);
    }, [earthquakeData]);

    return (
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            pointsData={points}
            pointAltitude="altitude"
            pointColor="color"
            pointRadius="radius"
            animateIn={true}
        />
    );
};