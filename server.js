require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 7000;
const RENDER_API_KEY = process.env.API_KEY; 


app.get('/', (req, res) => {
    res.send('Hello from Render!');
});

app.get('/services', async (req, res) => {
    try {
        if (!RENDER_API_KEY) {
            throw new Error("RENDER_API_KEY is missing in .env file");
        }
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                Authorization: `Bearer ${RENDER_API_KEY}`
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error details:", error); // הדפסת שגיאה מלאה עם פרטים
        if (error.response) {
            res.status(error.response.status).send(`Error fetching services: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            console.error("Request error:", error.request);
            res.status(500).send('Error fetching services: No response from server');
        } else {
            console.error('Error message:', error.message);
            res.status(500).send(`Error fetching services: ${error.message}`);
        }
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));