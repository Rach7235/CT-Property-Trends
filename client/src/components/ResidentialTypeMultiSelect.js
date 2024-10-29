
import React from 'react';
import {MultiSelect} from 'react-multi-select-component';

// fix this
const ResidentialTypeMultiSelect = ({ residentialType = [], selectedResidentialType, handleResidentialType }) => {
    return (
        <MultiSelect
            options={residentialType}
            value={selectedResidentialType}
            onChange={handleResidentialType}
            labelledBy="Select Residential Types"
        />
    );
};

export default ResidentialTypeMultiSelect;