const express = require('express');
const oracledb = require('oracledb');
const app = express();

// Fill in your personal oracle information here. Don't forget to remove when uploading to Github for security purposes
const dbInfo = {
    user: 'your-oracle-username',
    password: 'your-oracle-password',
    connectString: 'oracle.cise.ufl.edu:1521/orcl'
};

app.listen(2000, () => {
    console.log('server successfully listening on port 2000')
})

// API to fetch town names for selection
app.get('/towns', async (req, res) => {
        try {
            const connection = await oracledb.getConnection(dbInfo);
            const towns = await connection.execute('SELECT Town FROM "M.ENGERT".Address')
            res.json(towns.rows);
        } catch (error) {
            res.status(500).send('Error fetching towns');
        }
 });

// API to fetch residential type names for selection
app.get('/residential-type', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbInfo);
        const residentialType = await connection.execute('SELECT Type_Name FROM "M.ENGERT".Residential_Type')
        res.json(residentialType.rows);
    } catch (error) {
        res.status(500).send('Error retrieving residential types');
    }
});

// function to test database connection
 /* async function run() {
    try {
        const connection = await oracledb.getConnection({
            user: 'your-oracle-username',
            password: 'your-oracle-password',
            connectString: 'oracle.cise.ufl.edu:1521/orcl'
        });

        console.log('Connected to the database!');

        const result = await connection.execute('SELECT * FROM borders');

        console.log(result.rows);

    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}
*/

// run();
