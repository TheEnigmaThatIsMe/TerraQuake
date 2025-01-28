import React from 'react';
import { Filter } from '../types';
import {Box, Button, ButtonGroup, Typography} from "@mui/material";

type FilterSidebarProps = {
    filter: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filter, setFilter }) => (
    <Box style={{ backgroundColor: '#213547', padding: '1em' }}>
        <Typography variant={"h6"}>Earthquake Filters</Typography>
        <Box sx={{ marginTop: 2 }}>
            <Typography variant={"body1"}>Time Period</Typography>
            <ButtonGroup size="medium" variant="contained" orientation="vertical">
                {(['hour', 'day', 'week', 'month'] as Filter['period'][]).map((period) => (
                    <Button
                        key={period}
                        onClick={() => setFilter({ ...filter, period })}
                        style={{ display: 'block', margin: '5px 0' }}
                    >
                        Past {period.charAt(0).toUpperCase() + period.slice(1)}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
        <Box sx={{ marginTop: 2 }}>
            <Typography variant={"body1"}>Magnitude</Typography>
            <ButtonGroup size="medium" variant="contained" orientation="vertical">
                {(['significant', 'M4.5+', 'M2.5+', 'M1.0+', 'all'] as Filter['magnitude'][]).map((magnitude) => (
                    <Button
                        key={magnitude}
                        onClick={() => setFilter({ ...filter, magnitude })}
                        style={{ display: 'block', margin: '5px 0' }}
                    >
                        {`${magnitude}`}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    </Box>
);