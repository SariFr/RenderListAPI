const renderApi = require('@api/render-api');
const http =  require('http')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000; // Use process.env.PORT (default to 10000 if not set)





// renderApi.listServices({includePreviews: 'true', limit: '20'})
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));


  app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
  });
  
// יצירת endpoint שמחזיר את רשימת השירותים
renderApi.auth('rnd_r4og6UaKbyq4FvJyQc70B03Ip6BP');

app.get('/services', async (req, res) => {
    try {
      // קריאה ל-API לקבלת רשימת השירותים
      const { data } = await renderApi.listServices({
        includePreviews: 'true',
        limit: '20'
      });
  
      // שליחת הרשימה כתגובה בפורמט JSON
      res.status(200).json({
        success: true,
        services: data
      });
    } catch (err) {
      // טיפול בשגיאות ושליחת הודעה מתאימה ללקוח
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch services',
        error: err.message
      });
    }
  });
  
  // הפעלת השרת
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  