import React from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { EarthquakeGlobeView } from './components/EarthquakeGlobeView';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import { Filter } from './types';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery} from "@mui/material";

const App: React.FC = () => {
    const isSmallScreen = useMediaQuery('(max-width:850px)');
    const [filter, setFilter] = React.useState<Filter>({
        period: 'day',
        magnitude: 'all',
    });

    const earthquakeData = useEarthquakeData(filter);
    const [modalIsOpen, setModalIsOpen] = React.useState(true);
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const renderModal = () => {
        if (isSmallScreen) {
            return (
                <Dialog open={modalIsOpen} onClose={closeModal}>
                    <DialogTitle>WARNING!</DialogTitle>
                    <DialogContent>
                        <Typography>This application is not designed for small screens. Please view on a larger device
                            for the full experience!</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            );
        }
    }

    return (
        <>
            {renderModal()}
            <Box style={{ display: 'flex', height: '100vh' }}>
                <FilterSidebar filter={filter} setFilter={setFilter} />
                <EarthquakeGlobeView earthquakeData={earthquakeData} />
            </Box>
        </>
    );
};

export default App;