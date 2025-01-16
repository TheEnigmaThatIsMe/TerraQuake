import React from 'react';
import { Filter } from '../types';

type FilterSidebarProps = {
    filter: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filter, setFilter }) => (
    <div style={{ width: '300px', backgroundColor: '#213547', padding: '10px', overflowY: 'auto' }}>
        <h2>Earthquake Filters</h2>
        <div>
            <h3>Time Period</h3>
            {(['hour', 'day', 'week', 'month'] as Filter['period'][]).map((period) => (
                <button
                    key={period}
                    onClick={() => setFilter({ ...filter, period })}
                    style={{ display: 'block', margin: '5px 0' }}
                >
                    Past {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
            ))}
        </div>
        <div>
            <h3>Magnitude</h3>
            {(['significant', '4.5', '2.5', '1.0', 'all'] as Filter['magnitude'][]).map((magnitude) => (
                <button
                    key={magnitude}
                    onClick={() => setFilter({ ...filter, magnitude })}
                    style={{ display: 'block', margin: '5px 0' }}
                >
                    M{magnitude}+ Earthquakes
                </button>
            ))}
        </div>
    </div>
);