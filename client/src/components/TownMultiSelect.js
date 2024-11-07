import React from 'react';
import {MultiSelect} from 'react-multi-select-component';

// fix this
const TownMultiSelect = ({ towns = [], selectedTown, handleTown}) => {
    return (
        <MultiSelect
            options={towns}
            value={selectedTown}
            onChange={handleTown}
            labelledBy="Select Towns"
        />
    );
};

export default TownMultiSelect;