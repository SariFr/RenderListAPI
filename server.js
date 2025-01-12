require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 7000;
const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
    res.send('Hello from Render!');
});

app.get('/services', async (req, res) => {
    try {
        if (!API_KEY) {
            console.error("API_KEY is missing in .env file"); 
            return res.status(500).send('An internal error occurred.'); 
        }

        const response = await axios.get('https://api.render.com/v1/services', {
            headers: { Authorization: `Bearer ${API_KEY}` },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error details:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            return res.status(500).send('An internal error occurred.'); 
        } else if (error.request) {
            console.error("Request error:", error.request);
            return res.status(500).send('Failed to connect to Render API.'); 
        } else {
            console.error('Error message:', error.message);
            return res.status(500).send('An internal error occurred.'); 
        }
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));