import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MultiSelect } from "react-multi-select-component";

export default function App() {
    // States to hold user selected variables
    const [year, setYear] = useState(2006);

    const [minSalePrice, setMinSalePrice] = useState('');
    const [maxSalePrice, setMaxSalePrice] = useState('');

    const [minSaleRatio, setMinSaleRatio] = useState('');
    const [maxSaleRatio, setMaxSaleRatio] = useState('');

    const [minSaleYear, setMinSaleYear] = useState('');
    const [maxSaleYear, setMaxSaleYear] = useState('');

    const [towns, setTowns] = useState([]);
    const [selectedTown, setSelectedTown] = useState([]);

    const [residentialType, setResidentialType] = useState([]);
    const [selectedResidentialType, setSelectedResidentialType] = useState([]);

    const [trendQuery, setTrendQuery] = useState('');

    // Below are the functions to capture the different user fields
    // event.target.value will constantly update the state value whenever a change occurs in the field

    // Function to capture year from slider
    const handleYear = (event) => {
        setYear(event.target.value);
    }

    // Function to capture minimum sales price
    const handleMinSalePrice = (event) => {
        setMinSalePrice(event.target.value);
    };

    // Function to capture maximum sales price
    const handleMaxSalePrice = (event) => {
        setMaxSalePrice(event.target.value);
    };

    // Function to capture minimum sales ratio
    const handleMinSaleRatio = (event) => {
        setMinSaleRatio(event.target.value);
    };

    // Function to capture maximum sales ratio
    const handleMaxSaleRatio = (event) => {
        setMaxSaleRatio(event.target.value);
    };

    // Function to capture minimum sale year
    const handleMinSaleYear = (event) => {
        setMinSaleYear(event.target.value);
    };

    // Function to capture maximum sale year
    const handleMaxSaleYear = (event) => {
        setMaxSaleYear(event.target.value);
    };

    // Function to capture town name
    const handleTown = (townArray) => {
        setSelectedTown(townArray);
    };

    // Function to capture residential type
    const handleResidentialType = (residentialTypeArray) => {
        setSelectedResidentialType(residentialTypeArray);
    };

    // Function to capture residential type
    const handleTrendQuery = (event) => {
        setTrendQuery(event.target.value);
    };

    // Function to fetch town names from backend
    useEffect(() => {
        const fetchTowns = () => {
            axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/towns`)
                .then(response => {
                    setTowns(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching towns:', error);
                });
        };
        fetchTowns();
    }, []);

    // Function to fetch residential type names from backend
    useEffect(() => {
        const fetchResidentialType = () => {
            axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/residential-type`)
                .then(response => {
                    setResidentialType(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching residential types:', error);
                });
        };
        fetchResidentialType();
    }, []);


    // Function to submit user fields to backend
     const handleSubmit =  async () => {
        // Schema for data from user fields
        const userData = {
            year,
            minSalePrice,
            maxSalePrice,
            minSaleRatio,
            maxSaleRatio,
            minSaleYear,
            maxSaleYear,
            selectedTown,
            selectedResidentialType,
            trendQuery
        };

        try {
            const response = await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/form-submission`, userData);
            console.log('Form submission successful!', response.data)
            alert('Form submission successful!');
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Form submission unsuccessful!');
        }
    };

    return (
            <div style={{padding: '20px'}}>
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="year-slider">Year: {year}</label>
                    <br/>
                    <input
                        type="range"
                        id="year-slider"
                        // Minimum sales year was 2006 in dataset
                        min="2006"
                        // Maximum sales year was 2021 in dataset
                        max="2021"
                        value={year}
                        // Year increments 1 at a time on the slider
                        step="1"
                        onChange={handleYear}
                    />
                </div>

                <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input1">Sales Price</label>
                        <input id="input1"
                               type="text"
                               value={minSalePrice}
                               placeholder="minimum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMinSalePrice}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <input type="text"
                               value={maxSalePrice}
                               placeholder="maximum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMaxSalePrice}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="select1">Town</label>
                        <MultiSelect
                            options = {towns}
                            value = {selectedTown}
                            onChange={handleTown}
                            labelledBy="Select Towns"
                        />
                    </div>
                </div>

                <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input3">Sales Year</label>
                        <input id="input2"
                               type="text"
                               value={minSaleYear}
                               placeholder="from"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMinSaleYear}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <input type="text"
                               value={maxSaleYear}
                               placeholder="to"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMaxSaleYear}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="select2">Residential Type</label>
                        <MultiSelect
                            options = {residentialType}
                            value = {selectedResidentialType}
                            onChange={handleResidentialType}
                            labelledBy="Select Residential Types"
                        />
                    </div>
                </div>

                <div style={{display: 'flex', gap: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input2">Sales Ratio</label>
                        <input id="input2"
                               type="text"
                               value={minSaleRatio}
                               placeholder="minimum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMinSaleRatio}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <input type="text"
                               value={maxSaleRatio}
                               placeholder="maximum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMaxSaleRatio}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="select3">Trend Selection</label>
                        <select value={trendQuery}
                                onChange={handleTrendQuery}>
                            <option value="">Select</option>
                            <option value="Avg Sales Amount">Average Sales Amount</option>
                            <option value="Total Sales Volume">Total Sales Volume</option>
                            <option value="Avg Sales Ratio">Average Sales Ratio</option>
                            <option value="Avg Assessed Value">Average Assessed Value</option>
                            <option value="Total Sales Volume mnth">Total Sales Volume Monthly</option>
                        </select>
                    </div>
                </div>
                <div style={{marginTop: '20px'}}>
                    <button
                            type="button"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'blue',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            onClick = {handleSubmit}
                          >
                        Submit
                    </button>
                </div>
            </div>
    );
}

