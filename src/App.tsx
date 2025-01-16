import React from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { EarthquakeGlobeView } from './components/EarthquakeGlobeView';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import { Filter } from './types';

const App: React.FC = () => {
    const [filter, setFilter] = React.useState<Filter>({
        period: 'hour',
        magnitude: 'all',
    });

    const earthquakeData = useEarthquakeData(filter);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <FilterSidebar filter={filter} setFilter={setFilter} />
            <EarthquakeGlobeView earthquakeData={earthquakeData} />
        </div>
    );
};

export default App;