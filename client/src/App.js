import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
    const [year, setYear] = useState();

    const [minSalePrice, setMinSalePrice] = useState('');
    const [maxSalePrice, setMaxSalePrice] = useState('');

    const [minSaleRatio, setMinSaleRatio] = useState('');
    const [maxSaleRatio, setMaxSaleRatio] = useState('');

    const [minSaleYear, setMinSaleYear] = useState('');
    const [maxSaleYear, setMaxSaleYear] = useState('');

    const [towns, setTowns] = useState([]);
    const [selectedTown, setSelectedTown] = useState('');

    const [residentialType, setResidentialType] = useState([]);
    const [selectedResidentialType, setSelectedResidentialType] = useState('');

    const handleYear = (event) => {
        setYear(event.target.value);
    };

    const handleMinSalePrice = (event) => {
        setMinSalePrice(event.target.value);
    };

    const handleMaxSalePrice = (event) => {
        setMaxSalePrice(event.target.value);
    };

    const handleMinSaleRatio = (event) => {
        setMinSaleRatio(event.target.value);
    };

    const handleMaxSaleRatio = (event) => {
        setMaxSaleRatio(event.target.value);
    };

    const handleMinSaleYear = (event) => {
        setMinSaleYear(event.target.value);
    };

    const handleMaxSaleYear = (event) => {
        setMaxSaleYear(event.target.value);
    };

    const handleTown = (event) => {
        setSelectedTown(event.target.value);
    };

    const handleResidentialType = (event) => {
        setSelectedResidentialType(event.target.value);
    };


    useEffect(() => {
        const fetchTowns = async () => {
            try {
                const response = await fetch('/towns');
                const data = await response.json();
                setTowns(data);
            } catch (error) {
                console.error('Error fetching towns:', error);
            }
        };
        fetchTowns();
    }, []);

    useEffect(() => {
        const fetchResidentialType = async () => {
            try {
                const response = await fetch('/residential-type');
                const data = await response.json();
                setResidentialType(data);
            } catch (error) {
                console.error('Error fetching residential types:', error);
            }
        };
        fetchResidentialType();
    }, []);


    return (
        <div style={{padding: '20px'}}>
            <div style={{marginBottom: '20px'}}>
                <label htmlFor="year-slider">Year</label>
                <br />
                <input
                    type="range"
                    id="year-slider"
                    min="2006"
                    max="2021"
                    value={year}
                    onChange={handleYear}
                    // Year increments 1 at a time on the slider
                    step="1"
                />
            </div>

            <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <label htmlFor="input1">Sales Price</label>
                    <input id="input1"
                           type="text"
                           placeholder="minimum"
                           style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                           value={minSalePrice}
                           onChange={handleMinSalePrice}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <input type="text"
                           placeholder="maximum"
                           style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                           value={maxSalePrice}
                           onChange={handleMaxSalePrice}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <label htmlFor="select1">Town</label>
                    <select value={selectedTown} onChange={handleTown}>
                        {towns.map((towns, index) => (
                            <option key={index} value={towns.name}>
                                {towns.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{display: 'flex', gap: '20px',  marginBottom: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <label htmlFor="input3">Sales Year</label>
                    <input id="input2"
                           type="text"
                           placeholder="from"
                           style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                           value={minSaleYear}
                           onChange={handleMinSaleYear}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <input type="text"
                           placeholder="to"
                           style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                           value={maxSaleYear}
                           onChange={handleMaxSaleYear}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <label htmlFor="select2">Residential Type</label>
                <select value={selectedResidentialType} onChange={handleResidentialType}>
                    <option value="">Select</option>
                    {residentialType.map((residentialType, index) => (
                        <option key={index} value={residentialType.name}>
                            {residentialType.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <label htmlFor="input2">Sales Ratio</label>
                    <input id="input2"
                           type="text"
                           placeholder="minimum"
                           style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                           value={minSaleRatio}
                           onChange={handleMinSaleRatio}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                    <input type="text"
                           placeholder="maximum"
                           style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                           value={maxSaleRatio}
                           onChange={handleMaxSaleRatio}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <label htmlFor="select3">Trend Selection</label>
                <select name="TrendSelection">
                    <option value="Avg Sales Amount">Average Sales Amount</option>
                    <option value="Total Sales Volume">Total Sales Volume</option>
                    <option value="Avg Sales Ratio">Average Sales Ratio</option>
                    <option value="Avg Assessed Value">Average Assessed Value</option>
                    <option value="Total Sales Volume mnth">Total Sales Volume Monthly</option>
                </select>
                </div>
            </div>
        </div>
            );
            }

