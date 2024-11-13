import React, { useEffect, useState } from 'react';
import {fetchTowns, fetchResidentialTypes, submitFormAndQuery, fetchYears} from '../services/api.js';
import TownMultiSelect from '../components/TownMultiSelect';
import ResidentialTypeMultiSelect from '../components/ResidentialTypeMultiSelect';
import {MultiSelect} from 'react-multi-select-component';



export default function FormPage() {
    // States to hold user selected variables
    const [year, setYear] = useState(2007);
    const [yearRange, setYearRange] = useState({min: 2007, max: 2021});

    // Tracks if user has started typing so verification error messages hide until interaction
    const [isTyping, setIsTyping] = useState(false);

    const [minSalePrice, setMinSalePrice] = useState('');
    const [minSalePriceVerify, setMinSalePriceVerify] = useState(false);
    const [minSalePriceErrorMessage, setMinSalePriceErrorMessage] = useState('');
    const [maxSalePrice, setMaxSalePrice] = useState('');
    const [maxSalePriceVerify, setMaxSalePriceVerify] = useState(false);
    const [maxSalePriceErrorMessage, setMaxSalePriceErrorMessage] = useState('');


    const [minSaleRatio, setMinSaleRatio] = useState('');
    const [minSaleRatioVerify, setMinSaleRatioVerify] = useState(false);
    const [maxSaleRatio, setMaxSaleRatio] = useState('');
    const [maxSaleRatioVerify, setMaxSaleRatioVerify] = useState(false);

    const [minSaleYear, setMinSaleYear] = useState('');
    const [minSalesYearErrorMessage, setSalesYearMinErrorMessage] = useState('');
    const [minSaleYearVerify, setMinSaleYearVerify] = useState(false);
    const [maxSaleYear, setMaxSaleYear] = useState('');
    const [maxSaleYearVerify, setMaxSaleYearVerify] = useState(false);
    const [maxSalesYearErrorMessage, setSalesYearMaxErrorMessage] = useState('');


    const [towns, setTowns] = useState([]);
    const [townOptions, setTownOptions] = useState([]);
    const [selectedTown, setSelectedTown] = useState([]);

    const [residentialType, setResidentialType] = useState([]);
    const [selectedResidentialType, setSelectedResidentialType] = useState([]);
    const [residentialTypeOptions, setResidentialTypeOptions] = useState([]);

    const [trendQuery, setTrendQuery] = useState('');
    const [trendQueryVerify, setTrendQueryVerify] = useState(false);

    // Below are the functions to capture the different user fields
    // event.target.value will constantly update the state value whenever a change occurs in the field

    // Function to capture year from slider
    const handleYear = (event) => {
        const year = event.target.value;
        setYear(year);
    }

    // Function to capture minimum sales price
    const handleMinSalePrice = (event) => {
        const minSalePrice = event.target.value;
        setIsTyping(true);
        setMinSalePrice(minSalePrice);

        // Must be a number and cannot be negative
        // ^/d*$ is regex that allows zero or more digits
        // Can be zero digits if user wants to leave field empty
        if (/^\d*$/.test(minSalePrice) && Number(minSalePrice) >= 0) {
            setMinSalePriceVerify(true);
        }
        else {
            setMinSalePriceVerify(false);
        }

        // Check that the minimum sales price is less than the maximum sales price inputted by user
        if (Number(minSalePrice) > Number(maxSalePrice) && maxSalePrice !=='') {
            setMinSalePriceErrorMessage("Minimum sales price must be less than maximum sales price.");
        }
        // Clear error message when valid
        else {
            setMinSalePriceErrorMessage('');
        }
    };

    // Function to capture maximum sales price
    const handleMaxSalePrice = (event) => {
            const maxSalePrice = event.target.value;
            setIsTyping(true);
            setMaxSalePrice(maxSalePrice);

            // Price must be a number and cannot be negative Number(maxSalePrice) >= 0
            // ^/d*$ is regex that allows zero or more digits
            // Can be zero digits if user wants to leave field empty
            if (/^\d*$/.test(maxSalePrice) && Number(maxSalePrice) >= 0) {
                setMaxSalePriceVerify(true);
            }
            else {
                setMaxSalePriceVerify(false);
            }

        // Check that the maximum sales price is greater than the minimum sales price inputted by user
        if (Number(maxSalePrice) < Number(minSalePrice) && minSalePrice !== '') {
            setMaxSalePriceErrorMessage("Maximum sales price must be greater than minimum sales price.");
        }
        // Clear error message when valid
        else {
            setMaxSalePriceErrorMessage('');
        }
    };

        // Function to capture minimum sales ratio
        const handleMinSaleRatio = (event) => {
            const minSaleRatio = event.target.value;
            setIsTyping(true);
            setMinSaleRatio(minSaleRatio);

            // Sales Ratio must be a floating point number
            // \d(\.\d{1,6})? is regex that requires 1 digit before decimal point and up to 6 digits after (range from the dataset)
            // | or allows an empty field with ^$
            if (/^$|^\d\.\d{1,6}$/.test(minSaleRatio)) {
                setMinSaleRatioVerify(true);
            }
            else {
                setMinSaleRatioVerify(false);
            }
        };

        // Function to capture maximum sales ratio
        const handleMaxSaleRatio = (event) => {
            const maxSaleRatio = event.target.value;
            setMaxSaleRatio(maxSaleRatio);

            // Sales Ratio must be a floating point number
            // \d(\.\d{1,6})? is regex that requires 1 digit before decimal point and up to 6 digits after (range from the dataset)
            // | or allows an empty field with ^$
            if (/^$|^\d\.\d{1,6}$/.test(maxSaleRatio)) {
                setMaxSaleRatioVerify(true);
            }
            else {
                setMaxSaleRatioVerify(false);
            }
        };

        // Function to capture minimum sale year
        const handleMinSaleYear = (event) => {
            const minSaleYear = event.target.value;
            setIsTyping(true);
            setMinSaleYear(minSaleYear);

            // Must be a number between years 2006 - 2021 (inclusive) and cannot be negative
            // ^/d*$ is regex that allows zero or more digits.
            // Can be zero digits if user wants to leave field empty
            if (/^\d*$/.test(minSaleYear) && (minSaleYear === "" || (Number(minSaleYear) >= 2006 && Number(minSaleYear) <= 2021))) {
                setMinSaleYearVerify(true);
            }
            else {
                setMinSaleYearVerify(false);
            }

            // Check that minimum sales year is less than maximum sales year
            if (Number(minSaleYear) > Number(maxSaleYear) && maxSaleYear !== '') {
                setSalesYearMinErrorMessage('Minimum sales year must be less than maximum sales year.');
            } else {
                // Clear error message when valid
                setSalesYearMinErrorMessage('');
            }
        };

        // Function to capture maximum sale year
        const handleMaxSaleYear = (event) => {
            const maxSaleYear = event.target.value;
            setIsTyping(true);
            setMaxSaleYear(maxSaleYear);

            // Must be a number between years 2006 - 2021 (inclusive) and cannot be negative
            // ^/d*$ is regex that allows zero or more digits
            // Can be zero digits if user wants to leave field empty
            if (/^\d*$/.test(maxSaleYear) && (maxSaleYear === "" || (Number(maxSaleYear) >= 2006 && Number(maxSaleYear) <= 2021))) {
                setMaxSaleYearVerify(true);
            }
            else {
                setMaxSaleYearVerify(false);
            }

            // Check that maximum sales year is greater than minimum sales year
            if (Number(maxSaleYear) < Number(minSaleYear) && minSaleYear !== '') {
                setSalesYearMaxErrorMessage('Maximum sales year must be greater than minimum sales year.');
            } else {
                // Clear error message when valid
                setSalesYearMaxErrorMessage('');
            }
        };

        // Function to capture town name
        const handleTown = (townArray) => {
            setSelectedTown(townArray);
        };

        // Function to capture residential type
        const handleResidentialType = (residentialTypeArray) => {
            setSelectedResidentialType(residentialTypeArray);
        };

        // Function to capture trend query
        const handleTrendQuery = (event) => {
            const trendQuery = event.target.value;
            setTrendQuery(trendQuery);

            // Trend query cannot be empty
            // trim removes whitespace characters
            if (trendQuery !== "") {
                setTrendQueryVerify(true);
            }
            else {
                setTrendQueryVerify(false);
            }
        };

    // Function to clear the user input
    // Useful if user wants to make another query without refreshing/leaving the page or deleting all their input
    const clearInput = () => {
        setYear('');
        setMinSalePrice('');
        setMaxSalePrice('');
        setMinSaleRatio('');
        setMaxSaleRatio('');
        setMinSaleYear('');
        setMaxSaleYear('');
        setSelectedTown([]);
        setSelectedResidentialType([]);
        setTrendQuery('');
        alert("Fields successfully cleared!")
    };

        // Function to fetch town names from backend
        useEffect(() => {
            const getTowns = async () => {
                try {
                    const towns = await fetchTowns();
                    setTowns(towns);
                    // Set options for the component
                    setTownOptions(towns);
                    // Select all towns by default
                    setSelectedTown(towns);
                    console.log(towns);
                } catch (error) {
                    console.error('Error fetching towns:', error);
                }
            };
            getTowns();
        }, []);


        // Function to fetch residential type names from backend
        useEffect(() => {
            const getResidentialTypes = async () => {
                try {
                    const residentialType = await fetchResidentialTypes();
                    setResidentialType(residentialType);
                    // Set options for the component
                    setResidentialTypeOptions(residentialType);
                    // Select all residential types by default
                    setSelectedResidentialType(residentialType);
                    console.log(residentialType);
                } catch (error) {
                    console.error('Failed to fetch residential types:', error);
                }
            };
            getResidentialTypes();
        }, []);

        // Function to fetch sale year range for slider from backend
        useEffect(() => {
            const getYearRange = async () => {
                const range = await fetchYears();
                setYearRange(range);
            }
            getYearRange();
            }, []);

        // Function to submit user fields to backend
        const handleSubmit = async () => {
            // Ensure all fields are valid
            if (minSaleYearVerify &&
                maxSaleYearVerify &&
                minSalePriceVerify &&
                maxSalePriceVerify &&
                minSaleRatioVerify &&
                maxSaleRatioVerify &&
                trendQueryVerify) {
                    try {
                        const queryResults = await submitFormAndQuery ({
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
                });
                // Ensure values are correct
                console.log('Query Results:', queryResults);
                alert('Form submission and query generation successful!');
                } catch (error) {
                    console.error('Form submission and query error:', error);
                    alert('Form submission unsuccessful!');
                }
            } else {
                alert('Please ensure all fields are valid before submitting.');
            }
         }

        return (
            <div style={{padding: '20px'}}>
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="year-slider">Year: {year}</label>
                    <br/>
                    <input
                        type="range"
                        id="year-slider"
                        // Minimum sales year was 2007 in dataset
                        max={yearRange.maximumYear}
                        // Maximum sales year was 2022 in dataset
                        min={yearRange.minimumYear}
                        value={year}
                        // Year increments 1 at a time on the slider
                        step="1"
                        onChange={handleYear}
                        style={{
                            width: '300px',
                            height: '20px',
                        }}
                    />
                </div>

                <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input1">Sales Price Minimum</label>
                        <input id="input1"
                               type="text"
                               value={minSalePrice}
                               placeholder="minimum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMinSalePrice}
                        />
                        {!minSalePriceVerify && isTyping && !minSalePriceErrorMessage && (
                            <p style={{ color: 'red' }}>Please enter a valid non-negative number.</p>
                        )}
                         {minSalePriceErrorMessage && (
                            <p style={{ color: 'red' }}>{minSalePriceErrorMessage}</p>
                         )}
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input3">Sales Price Maximum</label>
                        <input type="text"
                               value={maxSalePrice}
                               placeholder="maximum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMaxSalePrice}
                        />
                        {!maxSalePriceVerify && isTyping && !maxSalePriceErrorMessage && (
                            <p style={{color: 'red'}}>Please enter a valid non-negative number.</p>
                        )}
                        {maxSalePriceErrorMessage  && (
                            <p style={{ color: 'red' }}>{maxSalePriceErrorMessage}</p>
                        )}
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="select1">Town</label>
                        <MultiSelect
                            options={townOptions}
                            value={selectedTown}
                            onChange={handleTown}
                            labelledBy="Select Towns"
                        />
                    </div>
                </div>

                <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input3">Sales Year Minimum</label>
                        <input id="input2"
                               type="text"
                               value={minSaleYear}
                               placeholder="from"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMinSaleYear}
                        />
                        {!minSaleYearVerify && isTyping && !minSalesYearErrorMessage && (
                            <p style={{ color: 'red' }}>Sales year must be between 2006 and 2021</p>
                        )}
                        {minSalesYearErrorMessage && (
                            <p style={{ color: 'red' }}>{minSalesYearErrorMessage}</p>
                        )}
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input2">Sales Year Maximum</label>
                        <input type="text"
                               value={maxSaleYear}
                               placeholder="to"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMaxSaleYear}
                        />
                        {!maxSaleYearVerify && isTyping && !maxSalesYearErrorMessage && (
                            <p style={{color: 'red'}}>Sales year must be between 2006 and 2021</p>
                        )}
                        {maxSalesYearErrorMessage && (
                            <p style={{ color: 'red' }}>{maxSalesYearErrorMessage}</p>
                        )}
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="select2">Residential Type</label>
                        <MultiSelect
                            options={residentialTypeOptions}
                            value={selectedResidentialType}
                            onChange={handleResidentialType}
                            labelledBy="Select Residential Types"
                        />
                    </div>
                </div>

                <div style={{display: 'flex', gap: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input2">Sales Ratio Minimum</label>
                        <input id="input2"
                               type="text"
                               value={minSaleRatio}
                               placeholder="minimum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMinSaleRatio}
                        />
                        {!minSaleRatioVerify && isTyping && (
                            <p style={{color: 'red'}}>Please enter a floating point number. Must have 1 digit before decimal and between 1-6 after</p>
                        )}
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="input2">Sales Ratio Maximum</label>
                        <input type="text"
                               value={maxSaleRatio}
                               placeholder="maximum"
                               style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                               onChange={handleMaxSaleRatio}
                        />
                        {!maxSaleRatioVerify && isTyping && (
                            <p style={{color: 'red'}}>Please enter a floating point number. Must have 1 digit before
                                decimal and between 1-6 after</p>
                        )}
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <label htmlFor="select3">Trend Selection</label>
                        <select value={trendQuery}
                                onChange={handleTrendQuery}>
                            <option value="Avg Sales Amount">Average Sales Amount</option>
                            <option value="Total Sales Volume">Total Sales Volume</option>
                            <option value="Avg Sales Ratio">Average Sales Ratio</option>
                            <option value="Avg Assessed Value">Average Assessed Value</option>
                            <option value="Total Sales Volume mnth">Total Sales Volume Monthly</option>
                        </select>
                    </div>
                </div>
                <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
                    <button
                        type="button"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#0047AB',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#0047AB',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={clearInput}
                    >
                        Clear
                    </button>
                </div>
            </div>
        );
    }


