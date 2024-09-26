const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()


const app = express();
app.use(cors());

app.get('/mapbox-token', (req, res) => {
  // Send the token securely as part of the API response
  res.json({ token: process.env.MAPBOX_ACCESS_TOKEN });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

