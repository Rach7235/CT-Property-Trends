// This file receives API requests from the front end and makes function calls to CTService.js for querying the database

const express = require('express');
const CTService = require('./services/CTService'); // Import services
const ServConst = require('./constants/ServConst'); // Import constants
const cors = require('cors');
const db = require("./db"); // Import db
const app = express();
app.use(cors())
app.use(express.json())


let connection;
// Retrieve port number from .env
app.listen(process.env.PORT, async () => {
    console.log(`server successfully listening on port ${process.env.PORT}`)
    connection = await db.startConnection()
})

// API to fetch town names for selection
app.get(`/${ServConst.Town}`, async (req, res) => {
    try {
        const towns = await CTService.getTowns(connection);
        res.json(towns);
    } catch (error) {
        console.error('Error fetching towns:', error.message);
        res.status(500).send('Error fetching towns');
    }
});


// API to fetch residential type names for selection
app.get(`/${ServConst.resType}`, async (req, res) => {
    try {
        const residentialTypes = await CTService.getResidentialTypes(connection);
        res.json(residentialTypes);
    } catch (error) {
        console.error('Error retrieving residential types:', error.message);
        res.status(500).send('Error retrieving residential types');
    }
});

// API to fetch sale year range for slider
app.get(`/${ServConst.Year}`, async (req, res) => {
    try {
        const years = await CTService.getYearRange(connection);
        res.json(years);
    } catch (error) {
        console.error('Error retrieving years:', error.message);
        res.status(500).send('Error retrieving years');
        }
});

// API to submit user fields and generate query
app.post(`/${ServConst.queryRequest}`, async (req, res) => {
    try {
        // Extract form data from request body
        const formData = req.body;
        // Log the received form data to view its structure and values
        console.log('Received form data:', req.body);
        // Create and execute query
        const geoJson = await CTService.getQueryResults(formData, connection);
        res.json(geoJson);

        console.log('RESULTS:', geoJson); //TEST CODE: Prints results to console. (To be removed later)
    } catch (error) {
        console.error('Error retrieving query results:', error.message);
        res.status(500).send('Error retrieving query results');
    }
})

async function signalHandler(signal) {
    console.log(`Received ${signal}, closing db connection.`);
    await db.closeConnection(connection);

    process.exit()
}

// Call signalHandler and close db connection on exit
process.on('SIGINT', signalHandler)
process.on('SIGTERM', signalHandler)
process.on('SIGQUIT', signalHandler)


