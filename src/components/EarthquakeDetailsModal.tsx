import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box} from '@mui/material';
import { EarthquakeFeature } from '../types';
import {DetailRow} from "./DetailRow.tsx";

type EarthquakeDetailsModalProps = {
    selectedEarthquake: EarthquakeFeature | null;
    modalIsOpen: boolean;
    closeModal: () => void;
};

export const EarthquakeDetailsModal: React.FC<EarthquakeDetailsModalProps> = ({ selectedEarthquake, modalIsOpen, closeModal }) => {
    if (!selectedEarthquake) return null;

    const { properties, geometry } = selectedEarthquake;

    return (
        <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth>
            <DialogTitle>Earthquake Details</DialogTitle>
            <DialogContent>
                <Box sx={{ marginBottom: 2 }}>
                    <DetailRow label="Location" value={properties.place} />
                    <DetailRow label="Magnitude" value={properties.mag} />
                    <DetailRow label="Time" value={new Date(properties.time).toLocaleString()} />
                    <DetailRow label="Updated" value={new Date(properties.updated).toLocaleString()} />
                    <DetailRow label="Timezone" value={properties.tz} />
                    <DetailRow label="Felt Reports" value={properties.felt} />
                    <DetailRow label="Alert Level" value={properties.alert} />
                    <DetailRow label="Significance" value={properties.sig} />
                    <DetailRow label="Number of Stations" value={properties.nst} />
                    <DetailRow label="Minimum Distance" value={properties.dmin} />
                    <DetailRow label="Event Type" value={properties.type} />
                    {geometry && (
                        <>
                            <DetailRow label="Coordinates" value={`${geometry.coordinates[1]}, ${geometry.coordinates[0]}`} />
                            <DetailRow label="Depth" value={`${geometry.coordinates[2]} km`} />
                        </>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};