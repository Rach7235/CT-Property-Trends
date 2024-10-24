const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())

const PORT = 2000;

// Fill in your personal oracle information here.
// Don't forget to remove when uploading to Github for security purposes
// Need to change this and the port to environment variables
const dbInfo = {
    user: 'your-oracle-username',
    password: 'your-oracle-password',
    connectString: 'oracle.cise.ufl.edu:1521/orcl'
};

app.listen(PORT, () => {
    console.log('server successfully listening on port 2000')
})

// API to fetch town names for selection
app.get('/towns', async (req, res) => {
    let connection;
        try {
            const connection = await oracledb.getConnection(dbInfo);
            console.log('Database connected!')
            const result = await connection.execute('SELECT distinct Town FROM Address')
            // label, value is the format of the multiselect component
            // will be an array instead of a single value since user can select multiple things
            const towns = result.rows.map(row => ({ label: row[0], value: row[0] }));
            res.json(towns);
            console.log(towns)
        } catch (error) {
            console.error('Error fetching towns:', error.message);
            res.status(500).send('Error fetching towns');
        }
    finally {
            if (connection) {
                try {
                    // Close the connection after use
                    await connection.close();
                } catch (err) {
                    console.error('Error closing connection', err);
                }
            }
        }
 });

// API to fetch residential type names for selection
app.get('/residential-type', async (req, res) => {
    let connection;
    try {
        const connection = await oracledb.getConnection(dbInfo);
        console.log('Database connected!')
        const result = await connection.execute('SELECT Type_Name FROM Residential_Type')
        // label, value is the format of the multiselect component
        // will be an array instead of a single value since user can select multiple things
        const residentialTypes = result.rows.map(row => ({ label: row[0], value: row[0] }));
        res.json(residentialTypes);
        console.log(residentialTypes)
    } catch (error) {
        console.error('Error retrieving residential types:', error.message);
        res.status(500).send('Error retrieving residential types');
    }
   finally {
        if (connection) {
            try {
                // Close the connection after use
                await connection.close();
            } catch (err) {
                console.error('Error closing connection', err);
            }
        }
    }
});

// Function to receive user data for query formulation
app.post('/form-submission', async (req, res) => {
    try {
        // Extract form data from the request body
        const {
            year, minSalePrice, maxSalePrice, minSaleRatio, maxSaleRatio, minSaleYear, maxSaleYear,
            selectedTown, selectedResidentialType, trendQuery
        } = req.body;

        // Logging to ensure the data values are correct
        console.log('User Data:', {
            year, minSalePrice, maxSalePrice,
            minSaleRatio, maxSaleRatio, minSaleYear,
            maxSaleYear, selectedTown, selectedResidentialType, trendQuery
        });

        res.status(200).send('Form submission successful!')
    } catch (error) {
        console.error('Error retrieving form submission data:', error.message);
        res.status(500).send('Error retrieving form submission data');
    }
});


