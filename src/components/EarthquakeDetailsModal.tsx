import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { EarthquakeFeature } from '../types';

type EarthquakeDetailsModalProps = {
    selectedEarthquake: EarthquakeFeature | null;
    modalIsOpen: boolean;
    closeModal: () => void;
};

export const EarthquakeDetailsModal: React.FC<EarthquakeDetailsModalProps> = ({ selectedEarthquake, modalIsOpen, closeModal }) => {
    if (!selectedEarthquake) return null;

    const { properties, geometry } = selectedEarthquake;

    return (
        <Dialog open={modalIsOpen} onClose={closeModal}>
            <DialogTitle>Earthquake Details</DialogTitle>
            <DialogContent>
                <div>
                    {properties.place && <p><strong>Location:</strong> {properties.place}</p>}
                    {properties.mag !== null && <p><strong>Magnitude:</strong> {properties.mag}</p>}
                    {properties.time > 0 && <p><strong>Time:</strong> {new Date(properties.time).toLocaleString()}</p>}
                    {properties.updated > 0 && <p><strong>Updated:</strong> {new Date(properties.updated).toLocaleString()}</p>}
                    {properties.tz !== null && <p><strong>Timezone:</strong> {properties.tz}</p>}
                    {properties.url && <p><strong>URL:</strong> <a href={properties.url} target="_blank" rel="noopener noreferrer">Event Page</a></p>}
                    {properties.felt !== undefined && properties.felt > 0 && <p><strong>Felt Reports:</strong> {properties.felt}</p>}
                    {properties.alert && <p><strong>Alert Level:</strong> {properties.alert}</p>}
                    {properties.sig > 0 && <p><strong>Significance:</strong> {properties.sig}</p>}
                    {properties.nst && <p><strong>Number of Stations:</strong> {properties.nst}</p>}
                    {properties.dmin && <p><strong>Minimum Distance:</strong> {properties.dmin}</p>}
                    {properties.type && <p><strong>Event Type:</strong> {properties.type}</p>}
                    {geometry && (
                        <>
                            <p><strong>Coordinates:</strong> {geometry.coordinates[1]}, {geometry.coordinates[0]}</p>
                            <p><strong>Depth:</strong> {geometry.coordinates[2]} km</p>
                        </>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};