const express = require('express');
const oracledb = require('oracledb');

const app = express();

app.listen(2000, () => {
    console.log('server successfully listening on port 2000')
})

app.get('/', (req, res) => {
    res.send('Hello from the server!')
})

app.get('/data', async (req, res) => {
    async function fetchData() {
        try {
            const connection = await oracledb.getConnection({
                user: 'your_oracle_username',
                password: 'your_oracle_password',
                connectString: 'oracle.cise.ufl.edu:1521/orcl' // we all created this
            });

            // Doesn't totally work yet, trying to test oracle connection with a query
            const result = await connection.execute('SELECT * FROM TEST')
            return result;
        } catch (error) {
            return error;
        }
    }
    fetchData().then(Res => {res.send(Res);})
        .catch(error => {res.send(error)})
});

