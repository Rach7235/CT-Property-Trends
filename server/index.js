// This file receives API requests from the front end and makes function calls to CTService.js for querying the database

const express = require('express');
const CTService = require('./services/CTService'); // Import services
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())

// Retrieve port number from .env
app.listen(process.env.PORT, () => {
    console.log(`server successfully listening on port ${process.env.PORT}`)
})

// API to fetch town names for selection
app.get('/towns', async (req, res) => {
    try {
        const towns = await CTService.getTowns();
        res.json(towns);
    } catch (error) {
        console.error('Error fetching towns:', error.message);
        res.status(500).send('Error fetching towns');
    }
});


// API to fetch residential type names for selection
app.get('/residential-type', async (req, res) => {
    try {
        const residentialTypes = await CTService.getResidentialTypes();
        res.json(residentialTypes);
    } catch (error) {
        console.error('Error retrieving residential types:', error.message);
        res.status(500).send('Error retrieving residential types');
    }
});

// Used to temporarily store form data for use in making the specified query
let formData;

// Function to receive user data for query formulation
app.post('/form-submission', async (req, res) => {
    try {
        // Extract form data from the request body
        const {
            year, minSalePrice, maxSalePrice, minSaleRatio, maxSaleRatio, minSaleYear, maxSaleYear,
            selectedTown, selectedResidentialType, trendQuery
        } = req.body;

        formData = {
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

        // Logging to ensure the data values are correct
        console.log('User Data:', formData);

        res.status(200).send('Form submission successful!')
    } catch (error) {
        console.error('Error retrieving form submission data:', error.message);
        res.status(500).send('Error retrieving form submission data');
    }
});

// API to fetch the selected query results
app.get('/query', async (req, res) => {
    try {
        const queryResults = await CTService.getQueryResults(formData);
        res.json(queryResults);
    } catch (error) {
        console.error('Error retrieving query results:', error.message);
        res.status(500).send('Error retrieving query results');
    }
});
