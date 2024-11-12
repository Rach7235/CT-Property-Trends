import axios from 'axios';
import * as constant from "../utils/const.js";

const apiHost = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;


// Fetch towns
export const fetchTowns = async () => {
    try {
        const response = await axios.get(`${apiHost}/${constant.Town}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching towns:', error);
        throw error;
    }
};


// Fetch residential types
export const fetchResidentialTypes = async () => {
    try {
        const response = await axios.get(`${apiHost}/${constant.resType}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching residential types:', error);
        throw error;
    }
};


// Submit form data and retrieve query results
export const submitFormAndQuery = async (userData) => {
     try {
         const response = await axios.post(`${apiHost}/${constant.queryResult}`, userData);
         return response.data;
     } catch (error) {
         console.error('Form submission and query error:', error);
         throw error;
     }
};