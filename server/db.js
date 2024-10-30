//This file handles opening and closing the database connection

const oracledb = require('oracledb');

// Retrieve login info from .env
const dbInfo = {
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    connectString: process.env.CONNECT_STRING
};

const startConnection = async () => {
    try {
        const connection = await oracledb.getConnection(dbInfo);
        console.log('Database connected!')
        return connection;
    }
    catch (err) {
        console.error('Error starting connection', err);
    }
};

const closeConnection = async (connection) => {
    if (connection) {
        try {
            // Close the connection after use
            await connection.close();
            console.log('Database disconnected!')
        }
        catch (err) {
            console.error('Error closing connection', err);
        }
    }
};


module.exports = {
    startConnection,
    closeConnection
};