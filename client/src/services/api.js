import axios from 'axios';

const apiHost = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;


// Fetch towns
export const fetchTowns = async () => {
    try {
        const response = await axios.get(`${apiHost}/towns`);
        return response.data;
    } catch (error) {
        console.error('Error fetching towns:', error);
        throw error;
    }
};


// Fetch residential types
export const fetchResidentialTypes = async () => {
    try {
        const response = await axios.get(`${apiHost}/residential-type`);
        return response.data;
    } catch (error) {
        console.error('Error fetching residential types:', error);
        throw error;
    }
};

// Submit user fields to backend
export const submitForm = async (userData) => {
    try {
        const response = await axios.post(`${apiHost}/form-submission`, userData);
        return response.data;
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
};