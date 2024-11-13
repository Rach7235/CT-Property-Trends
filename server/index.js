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

// API to fetch sale year range for slider
app.get('/years', async (req, res) => {
    try {
        const years = await CTService.getYearRange();
        res.json(years);
    } catch (error) {
        console.error('Error retrieving years:', error.message);
        res.status(500).send('Error retrieving years');
        }
});

// API to submit user fields and generate query
app.post('/submit-and-query', async (req, res) => {
    try {
        // Extract form data from request body
        const formData = req.body;
        // Log the received form data to view its structure and values
        console.log('Received form data:', req.body);
        // Create and execute query
        const queryResults = await CTService.getQueryResults(formData);
        res.json(queryResults);
    } catch (error) {
        console.error('Error retrieving query results:', error.message);
        res.status(500).send('Error retrieving query results');
    }
})




