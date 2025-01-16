import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import {EarthquakeData, EarthquakeFeature, GlobePoint, PointData} from '../types';

type EarthquakeGlobeViewProps = {
    earthquakeData: EarthquakeData | null;
};

export const EarthquakeGlobeView: React.FC<EarthquakeGlobeViewProps> = ({ earthquakeData }) => {
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    const [points, setPoints] = useState<PointData[]>([]);
    const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeFeature | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
                id: feature.id,
                lat: latitude,
                lng: longitude,
                altitude: depth / 100,
                radius: 0.2,
                color: colorScale(magnitude),
            };
        });

        setPoints(newPoints);
    }, [earthquakeData]);

    const handleClick = (_point: object, _event: MouseEvent, coords: { lat: number; lng: number; altitude: number; }) => {
        const globePoint = _point as GlobePoint;
        const earthquake = earthquakeData?.features.find(
            (feature) => feature.id === globePoint.id
        ) || null;
        if(earthquake) {
            console.log("Found earthquake:", earthquake);
            setSelectedEarthquake(earthquake);
            setModalIsOpen(true);
        } else {
            console.log(_point);
            console.log("Nothing found at ", coords);
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
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                pointsData={points}
                pointAltitude="altitude"
                pointColor="color"
                pointRadius="radius"
                onPointClick={handleClick}
                animateIn={true}
            />
            <Dialog open={modalIsOpen} onClose={closeModal}>
                <DialogTitle>Earthquake Details</DialogTitle>
                <DialogContent>
                    {selectedEarthquake && (
                        <div>
                            <p><strong>Location:</strong> {selectedEarthquake.properties.place}</p>
                            <p><strong>Magnitude:</strong> {selectedEarthquake.properties.mag}</p>
                            <p><strong>Time:</strong> {new Date(selectedEarthquake.properties.time).toLocaleString()}</p>
                            <p><strong>Depth:</strong> {selectedEarthquake.geometry.coordinates[2]} km</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};