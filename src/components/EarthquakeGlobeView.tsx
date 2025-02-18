import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { EarthquakeData, EarthquakeFeature, GlobePoint, PointData } from '../types';
import { EarthquakeDetailsModal } from './EarthquakeDetailsModal';

type EarthquakeGlobeViewProps = {
    earthquakeData: EarthquakeData | null;
};

export const EarthquakeGlobeView: React.FC<EarthquakeGlobeViewProps> = ({ earthquakeData }) => {
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    const [points, setPoints] = useState<PointData[]>([]);
    const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeFeature | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (!earthquakeData) return;

        const newPoints = earthquakeData.features.map((feature) => {
            const [longitude, latitude] = feature.geometry.coordinates;
            const magnitude = feature.properties.mag ?? 0;
            const significance = feature.properties.sig ?? 0;

            const colorScale = (mag: number) => {
                const colors = [
                    '#00ff00', '#aaff00', '#ffaa00', '#ff5500', '#ff0000',
                ];
                return colors[Math.min(Math.floor(mag / 2), colors.length - 1)];
            };

            return {
                id: feature.id,
                lat: latitude,
                lng: longitude,
                altitude: significance / 2500, // typical values [0, 1000]
                radius: 0.2,
                color: colorScale(magnitude),
            };
        });

        setPoints(newPoints);
    }, [earthquakeData]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (_point: object) => {
        const globePoint = _point as GlobePoint;
        const earthquake = earthquakeData?.features.find(
            (feature) => feature.id === globePoint.id
        ) || null;
        if (earthquake) {
            setSelectedEarthquake(earthquake);
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedEarthquake(null);
    };

    return (
        <div>
            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                pointsData={points}
                pointAltitude="altitude"
                pointColor="color"
                pointRadius="radius"
                onPointClick={handleClick}
                animateIn={true}
                width={windowWidth - 200}
                height={window.innerHeight}
            />
            <EarthquakeDetailsModal
                selectedEarthquake={selectedEarthquake}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />
        </div>
    );
};
